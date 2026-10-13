<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHotspotRequest;
use App\Http\Requests\UpdateHotspotRequest;
use App\Http\Requests\UpdatePositionRequest;
use App\Models\Hotspot;
use App\Models\Scene;
use App\Services\HotspotAdapter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class HotspotController extends Controller
{
    protected HotspotAdapter $adapter;

    public function __construct(HotspotAdapter $adapter)
    {
        $this->adapter = $adapter;
    }

    /**
     * Endpoint Publik: Hanya menyajikan hotspot yang BERSTATUS PUBLISHED dan AKTIF.
     * Pengunjung umum tidak dapat melihat versi draft.
     */
    public function getPublicHotspots()
    {
        $hotspots = $this->adapter->getUnifiedHotspots(null, true);

        return response()->json([
            'version' => '1.1.0',
            'lastUpdated' => now()->toIso8601String(),
            'total' => count($hotspots),
            'hotspots' => $hotspots,
        ]);
    }

    /**
     * Endpoint Publik: Hotspot per scene tertentu (hanya published).
     */
    public function getScenePublicHotspots(string $sceneId)
    {
        $hotspots = $this->adapter->getUnifiedHotspots($sceneId, true);

        return response()->json([
            'sceneId' => $sceneId,
            'total' => count($hotspots),
            'hotspots' => $hotspots,
        ]);
    }

    /**
     * Endpoint Admin: Daftar seluruh hotspot (draft, published, aktif, non-aktif).
     */
    public function adminIndex(Request $request)
    {
        $query = Hotspot::query();

        if ($request->filled('scene_id')) {
            $query->where('scene_id', $request->scene_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('text', 'like', $term)
                  ->orWhere('id', 'like', $term);
            });
        }

        $hotspots = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'total' => $hotspots->count(),
            'counts' => [
                'published' => Hotspot::where('status', 'published')->count(),
                'draft' => Hotspot::where('status', 'draft')->count(),
                'active' => Hotspot::where('is_active', true)->count(),
            ],
            'hotspots' => $hotspots->map->toFrontendArray(),
        ]);
    }

    /**
     * Endpoint Admin: Detail satu hotspot.
     */
    public function adminShow(string $id)
    {
        $hotspot = Hotspot::with(['scene', 'targetScene'])->find($id);

        if (!$hotspot) {
            return response()->json(['success' => false, 'message' => 'Hotspot tidak ditemukan.'], 404);
        }

        return response()->json([
            'success' => true,
            'hotspot' => $hotspot->toFrontendArray(),
        ]);
    }

    /**
     * Endpoint Admin: Tambah hotspot baru (CRUD).
     */
    public function store(StoreHotspotRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();

            if (empty($data['id'])) {
                $prefix = $data['type'] === 'link' ? 'link' : 'info';
                $data['id'] = $prefix . '-' . Str::random(8);
            }

            // Default status adalah draft jika tidak ditentukan secara eksplisit
            $data['status'] = $data['status'] ?? 'draft';
            $data['is_active'] = $data['is_active'] ?? true;
            $data['source'] = 'admin';

            $hotspot = Hotspot::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Hotspot berhasil dibuat' . ($hotspot->status === 'draft' ? ' sebagai draf' : ''),
                'hotspot' => $hotspot->toFrontendArray(),
            ], 201);
        });
    }

    /**
     * Endpoint Admin: Simpan batch / Sinkronisasi seluruh hotspot dari visual editor.
     */
    public function saveOrBatch(Request $request)
    {
        $rawHotspots = $request->input('hotspots');

        if (!is_array($rawHotspots)) {
            return response()->json([
                'success' => false,
                'message' => 'Format payload tidak valid: hotspots harus berupa array.',
            ], 422);
        }

        return DB::transaction(function () use ($rawHotspots, $request) {
            $validSceneIds = Scene::pluck('id')->all();
            $processed = [];

            foreach ($rawHotspots as $item) {
                if (empty($item['sceneId']) || !in_array($item['sceneId'], $validSceneIds)) {
                    continue; // Lewati jika scene asal tidak ada
                }

                $type = $item['type'] ?? 'link';
                $targetId = ($type === 'link') ? ($item['target'] ?? null) : null;

                // Validasi scene tujuan untuk link hotspot
                if ($type === 'link' && $targetId && !in_array($targetId, $validSceneIds)) {
                    throw new \InvalidArgumentException("Scene tujuan '{$targetId}' tidak valid untuk hotspot '{$item['id']}'.");
                }

                $id = !empty($item['id']) ? $item['id'] : (($type === 'link' ? 'link' : 'info') . '-' . Str::random(8));

                $hotspot = Hotspot::updateOrCreate(
                    ['id' => $id],
                    [
                        'scene_id' => $item['sceneId'],
                        'type' => $type,
                        'yaw' => (float) ($item['yaw'] ?? 0.0),
                        'pitch' => (float) ($item['pitch'] ?? 0.0),
                        'rotation' => (float) ($item['rotation'] ?? 0.0),
                        'target_scene_id' => $targetId,
                        'title' => $item['title'] ?? null,
                        'text' => $item['text'] ?? null,
                        'icon' => $item['icon'] ?? ($type === 'link' ? 'arrow' : 'info'),
                        'info_source_type' => $item['infoSourceType'] ?? 'manual',
                        'tree_species_id' => $item['treeSpeciesId'] ?? null,
                        'planting_activity_id' => $item['plantingActivityId'] ?? null,
                        'display_settings' => $item['displaySettings'] ?? null,
                        'is_active' => isset($item['isActive']) ? (bool) $item['isActive'] : true,
                        'status' => $item['status'] ?? 'published',
                        'source' => $item['source'] ?? 'admin',
                    ]
                );

                $processed[] = $hotspot;
            }

            return response()->json([
                'success' => true,
                'message' => 'Data hotspot berhasil disimpan permanen di database',
                'count' => count($processed),
                'lastUpdated' => now()->toIso8601String(),
            ]);
        });
    }

    /**
     * Endpoint Admin: Perbarui hotspot (CRUD).
     */
    public function update(UpdateHotspotRequest $request, string $id)
    {
        $hotspot = Hotspot::find($id);

        if (!$hotspot) {
            return response()->json(['success' => false, 'message' => 'Hotspot tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($request, $hotspot) {
            $data = $request->validated();
            $hotspot->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Hotspot berhasil diperbarui.',
                'hotspot' => $hotspot->toFrontendArray(),
            ]);
        });
    }

    /**
     * Endpoint Admin: Hapus hotspot.
     * Persyaratan 11: File panorama dan tile TIDAK BOLEH dihapus ketika hotspot dihapus!
     */
    public function destroy(string $id)
    {
        $hotspot = Hotspot::find($id);

        if (!$hotspot) {
            return response()->json(['success' => false, 'message' => 'Hotspot tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($hotspot) {
            $deletedId = $hotspot->id;
            // Hanya hapus baris data hotspot di DB, tidak menyentuh filesystem panorama/tiles
            $hotspot->delete();

            return response()->json([
                'success' => true,
                'message' => "Hotspot '{$deletedId}' berhasil dihapus dari database. File panorama tetap aman.",
            ]);
        });
    }

    /**
     * Endpoint Admin: Duplikasi hotspot (Persyaratan 3).
     */
    public function duplicate(string $id)
    {
        $original = Hotspot::find($id);

        if (!$original) {
            return response()->json(['success' => false, 'message' => 'Hotspot asal tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($original) {
            $clone = $original->replicate();
            $clone->id = $original->type . '-copy-' . Str::random(6);
            $clone->title = ($original->title ? $original->title : 'Hotspot') . ' (Salinan)';
            // Beri sedikit pergeseran posisi yaw agar tidak saling bertumpuk sempurna
            $clone->yaw = fmod($original->yaw + 0.15, M_PI);
            $clone->status = 'draft'; // Duplikasi otomatis masuk ke draf
            $clone->save();

            return response()->json([
                'success' => true,
                'message' => "Hotspot berhasil diduplikasi sebagai draf baru dengan ID '{$clone->id}'.",
                'hotspot' => $clone->toFrontendArray(),
            ], 201);
        });
    }

    /**
     * Endpoint Admin: Perubahan posisi yaw/pitch (Persyaratan 3).
     */
    public function updatePosition(UpdatePositionRequest $request, string $id)
    {
        $hotspot = Hotspot::find($id);

        if (!$hotspot) {
            return response()->json(['success' => false, 'message' => 'Hotspot tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($request, $hotspot) {
            $hotspot->yaw = (float) $request->input('yaw');
            $hotspot->pitch = (float) $request->input('pitch');
            if ($request->has('rotation')) {
                $hotspot->rotation = (float) $request->input('rotation');
            }
            $hotspot->save();

            return response()->json([
                'success' => true,
                'message' => 'Posisi yaw/pitch hotspot berhasil diperbarui.',
                'hotspot' => $hotspot->toFrontendArray(),
            ]);
        });
    }

    /**
     * Endpoint Admin: Toggle status aktif (Persyaratan 3).
     */
    public function toggleActive(string $id)
    {
        $hotspot = Hotspot::find($id);

        if (!$hotspot) {
            return response()->json(['success' => false, 'message' => 'Hotspot tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($hotspot) {
            $hotspot->is_active = !$hotspot->is_active;
            $hotspot->save();

            $statusText = $hotspot->is_active ? 'diaktifkan' : 'dinonaktifkan';

            return response()->json([
                'success' => true,
                'message' => "Hotspot berhasil {$statusText}.",
                'isActive' => $hotspot->is_active,
                'hotspot' => $hotspot->toFrontendArray(),
            ]);
        });
    }

    /**
     * Endpoint Admin: Publikasi draf hotspot (Persyaratan 3 & 8).
     */
    public function publish(string $id)
    {
        $hotspot = Hotspot::find($id);

        if (!$hotspot) {
            return response()->json(['success' => false, 'message' => 'Hotspot tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($hotspot) {
            $hotspot->status = 'published';
            $hotspot->save();

            return response()->json([
                'success' => true,
                'message' => "Hotspot '{$hotspot->id}' berhasil dipublikasikan dan kini tampil untuk pengunjung.",
                'hotspot' => $hotspot->toFrontendArray(),
            ]);
        });
    }

    /**
     * Endpoint Admin: Publikasi seluruh draf hotspot secara massal.
     */
    public function publishAll()
    {
        return DB::transaction(function () {
            $count = Hotspot::where('status', 'draft')->update(['status' => 'published']);

            return response()->json([
                'success' => true,
                'message' => "Berhasil memublikasikan {$count} draf hotspot secara serentak.",
                'publishedCount' => $count,
            ]);
        });
    }
}
