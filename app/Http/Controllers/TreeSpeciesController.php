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
                    'photo_path' => $s->photo_path,
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
        $species = TreeSpecies::active()->orderBy('common_name', 'asc')->get();

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
        $species = TreeSpecies::active()->find($id);

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
            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('tree-species', 'public');
                $data['photo_path'] = '/storage/' . $path;
            }
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
            'photo_path' => ['nullable', 'string', 'max:255'],
            'reference_source' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        return DB::transaction(function () use ($species, $request, $validated) {
            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('tree-species', 'public');
                $validated['photo_path'] = '/storage/' . $path;
            }
            $species->update($validated);

            return response()->json([
                'success' => true,
                'message' => "Data jenis pohon '{$species->common_name}' berhasil diperbarui.",
                'species' => $species,
            ]);
        });
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
