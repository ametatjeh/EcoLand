<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTreeSpeciesRequest;
use App\Models\TreeSpecies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TreeSpeciesController extends Controller
{
    /**
     * Daftar master jenis pohon untuk admin.
     */
    public function index(Request $request)
    {
        $query = TreeSpecies::withCount(['activityItems', 'surveys']);

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('common_name', 'like', $term)
                  ->orWhere('scientific_name', 'like', $term)
                  ->orWhere('local_name', 'like', $term)
                  ->orWhere('family', 'like', $term);
            });
        }

        if ($request->filled('origin_status') && $request->origin_status !== 'all') {
            $query->where('origin_status', $request->origin_status);
        }

        if ($request->has('is_active') && $request->is_active !== 'all') {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $species = $query->orderBy('common_name', 'asc')->get();

        return response()->json([
            'success' => true,
            'total' => $species->count(),
            'species' => $species->map(function ($s) {
                return [
                    'id' => $s->id,
                    'common_name' => $s->common_name,
                    'scientific_name' => $s->scientific_name,
                    'local_name' => $s->local_name,
                    'family' => $s->family,
                    'origin_status' => $s->origin_status,
                    'ecological_function' => $s->ecological_function,
                    'benefits' => $s->benefits,
                    'description' => $s->description,
                    'photo_path' => $s->photo_path ?: ($s->photos_list[0] ?? null),
                    'gallery_photos' => $s->photos_list,
                    'reference_source' => $s->reference_source,
                    'is_active' => $s->is_active,
                    'total_planted' => $s->total_planted_count,
                    'activities_count' => $s->activity_items_count,
                    'created_at' => $s->created_at?->toIso8601String(),
                ];
            }),
        ]);
    }

    /**
     * Endpoint Publik: Daftar jenis pohon yang aktif untuk pengunjung.
     */
    public function publicIndex()
    {
        $species = TreeSpecies::active()
            ->with(['activityItems.activity.plantingZone', 'activityItems.activity.scene', 'surveys'])
            ->orderBy('common_name', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'total' => $species->count(),
            'species' => $species->map->toPublicArray(),
        ]);
    }

    /**
     * Endpoint Publik: Detail jenis pohon untuk pengunjung.
     */
    public function publicShow(string $id)
    {
        $species = TreeSpecies::active()
            ->with(['activityItems.activity.plantingZone', 'activityItems.activity.scene', 'surveys'])
            ->find($id);

        if (!$species) {
            return response()->json([
                'success' => false,
                'message' => 'Jenis pohon tidak ditemukan atau belum disetujui untuk publikasi.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'species' => $species->toPublicArray(),
        ]);
    }

    /**
     * Detail lengkap satu jenis pohon untuk admin.
     */
    public function show(string $id)
    {
        $species = TreeSpecies::with([
            'plantingActivities' => fn($q) => $q->orderBy('activity_date', 'desc'),
            'surveys' => fn($q) => $q->orderBy('survey_date', 'desc'),
        ])->find($id);

        if (!$species) {
            return response()->json(['success' => false, 'message' => 'Jenis pohon tidak ditemukan.'], 404);
        }

        return response()->json([
            'success' => true,
            'species' => $species,
            'photos_list' => $species->photos_list,
            'total_planted' => $species->total_planted_count,
        ]);
    }

    /**
     * Tambah master jenis pohon baru.
     */
    public function store(StoreTreeSpeciesRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();
            
            $photoData = $this->resolvePhotosPayload($request);
            if (!empty($photoData['gallery_photos'])) {
                $data['gallery_photos'] = $photoData['gallery_photos'];
                $data['photo_path'] = $photoData['photo_path'];
            } elseif ($request->filled('photo_path')) {
                $data['photo_path'] = $request->photo_path;
                $data['gallery_photos'] = [$request->photo_path];
            }

            unset($data['photos'], $data['existing_photos'], $data['cover_photo']);
            $species = TreeSpecies::create($data);

            return response()->json([
                'success' => true,
                'message' => "Jenis pohon '{$species->common_name}' ({$species->scientific_name}) berhasil ditambahkan.",
                'species' => $species,
            ], 201);
        });
    }

    /**
     * Perbarui master jenis pohon.
     */
    public function update(Request $request, string $id)
    {
        $species = TreeSpecies::find($id);

        if (!$species) {
            return response()->json(['success' => false, 'message' => 'Jenis pohon tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'common_name' => ['sometimes', 'string', 'max:255'],
            'scientific_name' => ['sometimes', 'string', 'max:255', 'unique:tree_species,scientific_name,' . $id],
            'local_name' => ['nullable', 'string', 'max:255'],
            'family' => ['nullable', 'string', 'max:255'],
            'origin_status' => ['sometimes', 'string', 'in:lokal_asli,introduksi,belum_diverifikasi'],
            'ecological_function' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'max:5120'],
            'photo_path' => ['nullable', 'string', 'max:255'],
            'cover_photo' => ['nullable', 'string', 'max:255'],
            'gallery_photos' => ['nullable'],
            'existing_photos' => ['nullable'],
            'reference_source' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        return DB::transaction(function () use ($species, $request, $validated) {
            $hasPhotoInput = $request->hasFile('photos') 
                || $request->hasFile('photo') 
                || $request->has('existing_photos') 
                || $request->has('gallery_photos') 
                || $request->filled('cover_photo') 
                || $request->filled('photo_path');

            if ($hasPhotoInput) {
                $photoData = $this->resolvePhotosPayload(
                    $request,
                    $species->gallery_photos ?: ($species->photo_path ? [$species->photo_path] : []),
                    $species->photo_path
                );
                $validated['gallery_photos'] = $photoData['gallery_photos'];
                $validated['photo_path'] = $photoData['photo_path'];
            }

            unset($validated['photos'], $validated['existing_photos'], $validated['cover_photo']);
            $species->update($validated);

            return response()->json([
                'success' => true,
                'message' => "Data jenis pohon '{$species->common_name}' berhasil diperbarui.",
                'species' => $species,
            ]);
        });
    }

    /**
     * Memproses multi-upload berkas foto dan sinkronisasi gallery_photos serta photo_path (cover).
     */
    protected function resolvePhotosPayload(Request $request, ?array $currentGallery = [], ?string $currentCover = null): array
    {
        // 1. Ambil daftar existing photos jika dikirimkan (bisa array atau JSON string)
        $existing = [];
        if ($request->has('existing_photos')) {
            $input = $request->input('existing_photos');
            if (is_string($input)) {
                $decoded = json_decode($input, true);
                $existing = is_array($decoded) ? $decoded : [];
            } elseif (is_array($input)) {
                $existing = $input;
            }
        } elseif ($request->has('gallery_photos') && is_array($request->input('gallery_photos'))) {
            $existing = $request->input('gallery_photos');
        } elseif (!empty($currentGallery)) {
            $existing = $currentGallery;
        } elseif ($currentCover) {
            $existing = [$currentCover];
        }

        // Filter URLs yang valid (string)
        $gallery = array_values(array_filter($existing, fn($p) => is_string($p) && trim($p) !== ''));

        // 2. Simpan file baru dari photos[] (multiple)
        $newUploadedUrls = [];
        if ($request->hasFile('photos')) {
            $files = $request->file('photos');
            if (!is_array($files)) {
                $files = [$files];
            }
            foreach ($files as $file) {
                if ($file && $file->isValid()) {
                    $path = $file->store('tree-species', 'public');
                    $url = '/storage/' . $path;
                    $newUploadedUrls[] = $url;
                    $gallery[] = $url;
                }
            }
        }

        // 3. Fallback jika ada single file 'photo'
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            if ($file && $file->isValid()) {
                $path = $file->store('tree-species', 'public');
                $singleUrl = '/storage/' . $path;
                $newUploadedUrls[] = $singleUrl;
                if (!in_array($singleUrl, $gallery)) {
                    $gallery[] = $singleUrl;
                }
            }
        }

        // 4. Jika ada manual photo_path baru yang diinput dan belum ada di list
        if ($request->filled('photo_path')) {
            $manualPath = trim($request->input('photo_path'));
            if ($manualPath && !in_array($manualPath, $gallery)) {
                $gallery[] = $manualPath;
            }
        }

        // Hapus duplikasi path
        $gallery = array_values(array_unique($gallery));

        // 5. Tentukan foto sampul utama (photo_path)
        $cover = null;
        if ($request->has('cover_photo_new_index')) {
            $idx = (int) $request->input('cover_photo_new_index');
            if (isset($newUploadedUrls[$idx])) {
                $cover = $newUploadedUrls[$idx];
            }
        }
        if (!$cover && $request->filled('cover_photo') && in_array($request->input('cover_photo'), $gallery)) {
            $cover = $request->input('cover_photo');
        } elseif (!$cover && $request->filled('photo_path') && in_array($request->input('photo_path'), $gallery)) {
            $cover = $request->input('photo_path');
        } elseif (!$cover && !empty($gallery)) {
            $cover = $gallery[0];
        }

        return [
            'gallery_photos' => $gallery,
            'photo_path' => $cover,
        ];
    }

    /**
     * Hapus master jenis pohon (hanya jika belum terkait kegiatan penanaman).
     */
    public function destroy(string $id)
    {
        $species = TreeSpecies::find($id);

        if (!$species) {
            return response()->json(['success' => false, 'message' => 'Jenis pohon tidak ditemukan.'], 404);
        }

        if ($species->activityItems()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak dapat menghapus: Jenis pohon ini sudah tercatat dalam kegiatan penanaman. Anda dapat menonaktifkan statusnya.',
            ], 422);
        }

        return DB::transaction(function () use ($species) {
            $name = $species->common_name;
            $species->delete();

            return response()->json([
                'success' => true,
                'message' => "Jenis pohon '{$name}' berhasil dihapus dari master data.",
            ]);
        });
    }
}
