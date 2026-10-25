<?php

namespace App\Http\Controllers;

use App\Models\PlantingZone;
use App\Models\TreeSpecies;
use App\Models\Scene;
use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\TreeSurvey;
use App\Models\TreeMaintenanceLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Services\ActivityLogger;
use App\Models\PlantingZonePhoto;
use Illuminate\Support\Facades\Storage;

class PlantingZoneController extends Controller
{
    /**
     * Endpoint Publik: Daftar kawasan aktif yang dipublikasikan
     */
    public function publicIndex()
    {
        $zones = PlantingZone::published()
            ->withCount(['activities', 'scenes'])
            ->with('photos')
            ->orderBy('created_at', 'asc')
            ->get();

        $data = $zones->map(function ($zone) {
            return [
                'id' => $zone->id,
                'zone_code' => $zone->zone_code,
                'name' => $zone->name,
                'category' => $zone->category,
                'description' => $zone->description,
                'planting_purpose' => $zone->planting_purpose,
                'status' => $zone->status,
                'address' => $zone->address,
                'city' => $zone->city,
                'province' => $zone->province,
                'latitude' => $zone->latitude,
                'longitude' => $zone->longitude,
                'area_size' => $zone->area_size,
                'area_unit' => $zone->area_unit,
                'area_in_ha' => $zone->getAreaInHa(),
                'activities_count' => $zone->activities_count,
                'total_initial_seedlings' => $zone->getTotalInitialSeedlings(),
                'species_count' => $zone->getUniqueSpeciesCount(),
                'survival_rate' => $zone->calculateSurvivalRate(),
                'scenes_count' => $zone->scenes_count,
                'main_photo_path' => $zone->main_photo_path ?? $zone->photos->firstWhere('is_cover', true)?->file_url ?? $zone->photos->first()?->file_url,
            ];
        });

        $totalAreaHa = (float) $zones->sum(fn ($zone) => (float) $zone->getAreaInHa());
        $totalAreaM2 = (float) round($totalAreaHa * 10000, 2);

        $publishedZoneIds = $zones->pluck('id');
        $totalSeedlings = (int) PlantingActivityItem::whereHas('activity', function ($q) use ($publishedZoneIds) {
            $q->whereIn('planting_zone_id', $publishedZoneIds);
        })->sum('quantity');
        if ($totalSeedlings === 0 && PlantingActivityItem::count() > 0) {
            $totalSeedlings = (int) PlantingActivityItem::sum('quantity');
        }

        $totalSpecies = TreeSpecies::active()->count();
        if ($totalSpecies === 0 && TreeSpecies::count() > 0) {
            $totalSpecies = TreeSpecies::count();
        }
        if ($totalSpecies === 0) {
            $totalSpecies = 6;
        }

        return response()->json([
            'success' => true,
            'total' => $data->count(),
            'summary' => [
                'total_zones' => $data->count(),
                'total_area_ha' => round($totalAreaHa, 4),
                'total_area_m2' => $totalAreaM2,
                'total_trees' => $totalSeedlings,
                'total_seedlings' => $totalSeedlings,
                'total_species' => $totalSpecies,
            ],
            'zones' => $data,
        ]);
    }

    /**
     * Endpoint Publik: Detail satu kawasan yang dipublikasikan
     */
    public function publicShow($id)
    {
        $zone = PlantingZone::published()
            ->where(function ($q) use ($id) {
                $q->where('id', $id)->orWhere('zone_code', $id);
            })
            ->with(['scenes' => fn($q) => $q->orderBy('sequence', 'asc'), 'photos'])
            ->first();

        if (!$zone) {
            return response()->json([
                'success' => false,
                'message' => 'Kawasan penanaman tidak ditemukan atau belum dipublikasikan.',
            ], 404);
        }

        $activityIds = $zone->activities()->pluck('id');
        $plantedSpecies = PlantingActivityItem::whereIn('planting_activity_id', $activityIds)
            ->with('species')
            ->get()
            ->groupBy('tree_species_id')
            ->map(function ($items) {
                $first = $items->first();
                return [
                    'species_id' => $first->tree_species_id,
                    'local_name' => $first->species->local_name ?? '-',
                    'scientific_name' => $first->species->scientific_name ?? '-',
                    'total_quantity' => $items->sum('quantity'),
                ];
            })->values();

        return response()->json([
            'success' => true,
            'zone' => [
                'id' => $zone->id,
                'zone_code' => $zone->zone_code,
                'name' => $zone->name,
                'category' => $zone->category,
                'description' => $zone->description,
                'planting_purpose' => $zone->planting_purpose,
                'status' => $zone->status,
                'address' => $zone->address,
                'village' => $zone->village,
                'district' => $zone->district,
                'city' => $zone->city,
                'province' => $zone->province,
                'latitude' => $zone->latitude,
                'longitude' => $zone->longitude,
                'access_notes' => $zone->access_notes,
                'area_size' => $zone->area_size,
                'area_unit' => $zone->area_unit,
                'area_in_ha' => $zone->getAreaInHa(),
                'organization' => $zone->organization,
                'person_in_charge' => $zone->person_in_charge,
                'main_photo_path' => $zone->main_photo_path ?? $zone->photos->firstWhere('is_cover', true)?->file_url ?? $zone->photos->first()?->file_url,
                'gallery_photos' => $zone->gallery_photos ?? [],
                'total_initial_seedlings' => $zone->getTotalInitialSeedlings(),
                'species_count' => $plantedSpecies->count(),
                'survival_rate' => $zone->calculateSurvivalRate(),
                'scenes' => $zone->scenes->map(fn($s) => [
                    'id' => $s->id,
                    'name' => $s->name,
                    'sequence' => $s->sequence,
                    'thumbnail_path' => $s->thumbnail_path,
                ]),
                'species_list' => $plantedSpecies,
            ],
        ]);
    }

    /**
     * Endpoint Admin: Daftar seluruh kawasan dengan pencarian & filter
     */
    public function index(Request $request)
    {
        $query = PlantingZone::withCount(['activities', 'scenes'])->with('photos');

        // Search
        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                  ->orWhere('zone_code', 'like', $term)
                  ->orWhere('village', 'like', $term)
                  ->orWhere('district', 'like', $term)
                  ->orWhere('city', 'like', $term)
                  ->orWhere('organization', 'like', $term);
            });
        }

        // Filter Status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter Arsip
        if ($request->has('archived')) {
            if ($request->archived === 'true' || $request->archived === '1') {
                $query->where('is_archived', true);
            } elseif ($request->archived === 'false' || $request->archived === '0') {
                $query->where('is_archived', false);
            }
            // jika 'all', tidak difilter sehingga kawasan aktif dan arsip tampil
        } else {
            // default tetap menampilkan semua kawasan di admin kecuali ditentukan
        }

        // Sorting
        $sortBy = $request->input('sort_by', 'created_at');
        $sortDir = $request->input('sort_dir', 'desc');
        $query->orderBy($sortBy, $sortDir);

        $zones = $query->get();

        $formatted = $zones->map(function ($zone) {
            return [
                'id' => $zone->id,
                'zone_code' => $zone->zone_code,
                'name' => $zone->name,
                'category' => $zone->category,
                'description' => $zone->description,
                'planting_purpose' => $zone->planting_purpose,
                'status' => $zone->status,
                'address' => $zone->address,
                'city' => $zone->city,
                'province' => $zone->province,
                'latitude' => $zone->latitude,
                'longitude' => $zone->longitude,
                'area_size' => $zone->area_size,
                'area_unit' => $zone->area_unit,
                'area_in_ha' => $zone->getAreaInHa(),
                'activities_count' => $zone->activities_count,
                'photos_count' => $zone->photos->count(),
                'surveys_count' => TreeSurvey::whereIn('planting_activity_id', $zone->activities()->pluck('id'))->count(),
                'total_initial_seedlings' => $zone->getTotalInitialSeedlings(),
                'species_count' => $zone->getUniqueSpeciesCount(),
                'survival_rate' => $zone->calculateSurvivalRate(),
                'scenes_count' => $zone->scenes_count,
                'person_in_charge' => $zone->person_in_charge,
                'organization' => $zone->organization,
                'main_photo_path' => $zone->main_photo_path ?? $zone->photos->firstWhere('is_cover', true)?->file_url ?? $zone->photos->first()?->file_url,
                'is_published' => $zone->is_published,
                'is_archived' => $zone->is_archived,
                'created_at' => $zone->created_at->format('Y-m-d H:i'),
            ];
        });

        // Summary metrics
        $allActive = PlantingZone::where('is_archived', false)->get();
        $totalAreaHa = $allActive->sum(fn($z) => $z->getAreaInHa());
        $totalSeedlings = $allActive->sum(fn($z) => $z->getTotalInitialSeedlings());

        return response()->json([
            'success' => true,
            'summary' => [
                'total_zones' => $allActive->count(),
                'total_area_ha' => round($totalAreaHa, 2),
                'total_seedlings' => $totalSeedlings,
            ],
            'total' => $formatted->count(),
            'zones' => $formatted,
        ]);
    }

    /**
     * Endpoint Admin: Simpan kawasan baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'zone_code' => 'required|string|max:100|unique:planting_zones,zone_code',
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'planting_purpose' => 'nullable|string',
            'status' => 'required|in:preparation,active,monitoring,completed',
            'address' => 'nullable|string',
            'village' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'access_notes' => 'nullable|string',
            'area_size' => 'required|numeric|min:0',
            'area_unit' => 'required|in:ha,m2',
            'measurement_method' => 'nullable|string|max:255',
            'measurement_date' => 'nullable|date',
            'land_condition_notes' => 'nullable|string',
            'person_in_charge' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'planting_target' => 'nullable|integer|min:0',
            'internal_notes' => 'nullable|string',
            'main_photo_path' => 'nullable|string|max:255',
            'gallery_photos' => 'nullable|array',
            'is_published' => 'boolean',
            'scene_ids' => 'nullable|array',
            'scene_ids.*' => 'string|exists:scenes,id',
        ], [
            'zone_code.unique' => 'Kode kawasan sudah digunakan. Silakan gunakan kode unik.',
            'name.required' => 'Nama kawasan wajib diisi.',
            'area_size.required' => 'Luas lahan wajib diisi.',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $sceneIds = $validated['scene_ids'] ?? [];
            unset($validated['scene_ids']);

            $zone = PlantingZone::create($validated);

            if (!empty($sceneIds)) {
                Scene::whereIn('id', $sceneIds)->update(['planting_zone_id' => $zone->id]);
            }

            ActivityLogger::log('create', 'zones', "Menambahkan kawasan penanaman baru '{$zone->name}' ({$zone->zone_code})", $zone->id, [
                'area_size' => $zone->area_size,
                'area_unit' => $zone->area_unit,
                'status' => $zone->status,
            ]);

            return response()->json([
                'success' => true,
                'message' => "Kawasan penanaman '{$zone->name}' berhasil ditambahkan.",
                'zone' => $zone,
            ], 201);
        });
    }

    /**
     * Endpoint Admin: Detail komprehensif satu kawasan (8 Tab UI)
     */
    public function show($id)
    {
        $zone = PlantingZone::where(function ($q) use ($id) {
            $q->where('id', $id)->orWhere('zone_code', $id);
        })->with(['scenes' => fn($q) => $q->orderBy('sequence', 'asc')])->first();

        if (!$zone) {
            return response()->json([
                'success' => false,
                'message' => 'Kawasan penanaman tidak ditemukan.',
            ], 404);
        }

        $activityIds = $zone->activities()->pluck('id');

        // 1. Activities with items & tree species
        $activities = PlantingActivity::where('planting_zone_id', $zone->id)
            ->with(['items.species', 'scene'])
            ->orderBy('activity_date', 'desc')
            ->get();

        // 2. Species aggregated in this zone
        $speciesItems = PlantingActivityItem::whereIn('planting_activity_id', $activityIds)
            ->with('species')
            ->get()
            ->groupBy('tree_species_id')
            ->map(function ($items) {
                $species = $items->first()->species;
                return [
                    'id' => $species->id ?? null,
                    'local_name' => $species->local_name ?? '-',
                    'scientific_name' => $species->scientific_name ?? '-',
                    'family' => $species->family ?? '-',
                    'total_initial_quantity' => $items->sum('quantity'),
                    'batches_count' => $items->count(),
                ];
            })->values();

        // 3. Surveys in this zone
        $surveys = TreeSurvey::whereIn('planting_activity_id', $activityIds)
            ->with('activity')
            ->orderBy('survey_date', 'desc')
            ->get();

        // 4. Maintenance logs in this zone
        $maintenanceLogs = TreeMaintenanceLog::whereIn('planting_activity_id', $activityIds)
            ->with('activity')
            ->orderBy('maintenance_date', 'desc')
            ->get();

        $survivalRate = $zone->calculateSurvivalRate();
        $totalInitialSeedlings = $zone->getTotalInitialSeedlings();

        return response()->json([
            'success' => true,
            'zone' => $zone,
            'summary' => [
                'area_in_ha' => $zone->getAreaInHa(),
                'activities_count' => $activities->count(),
                'total_initial_seedlings' => $totalInitialSeedlings,
                'unique_species_count' => $speciesItems->count(),
                'survival_rate' => $survivalRate,
                'total_surveys' => $surveys->count(),
                'total_maintenance' => $maintenanceLogs->count(),
                'scenes_count' => $zone->scenes->count(),
                'latest_survey_date' => $surveys->first()?->survey_date?->format('Y-m-d'),
            ],
            'land_info' => [
                'area_size' => $zone->area_size,
                'area_unit' => $zone->area_unit,
                'area_in_ha' => $zone->getAreaInHa(),
                'measurement_method' => $zone->measurement_method,
                'measurement_date' => $zone->measurement_date?->format('Y-m-d'),
                'land_condition_notes' => $zone->land_condition_notes,
                'address' => $zone->address,
                'village' => $zone->village,
                'district' => $zone->district,
                'city' => $zone->city,
                'province' => $zone->province,
                'latitude' => $zone->latitude,
                'longitude' => $zone->longitude,
                'access_notes' => $zone->access_notes,
            ],
            'activities' => $activities,
            'species' => $speciesItems,
            'surveys' => $surveys,
            'maintenance' => $maintenanceLogs,
            'gallery' => [
                'main_photo' => $zone->main_photo_path ?? $zone->photos()->where('is_cover', true)->value('file_path'),
                'photos' => $zone->photos()->with('uploader:id,name,username')->get(),
            ],
            'scenes' => $zone->scenes->map(fn($s) => [
                'id' => $s->id,
                'name' => $s->name,
                'sequence' => $s->sequence,
                'status' => $s->status,
                'thumbnail_path' => $s->thumbnail_path,
                'hotspots_count' => $s->hotspots()->count(),
            ]),
        ]);
    }

    /**
     * Endpoint Admin: Perbarui kawasan
     */
    public function update(Request $request, $id)
    {
        $zone = PlantingZone::findOrFail($id);

        $validated = $request->validate([
            'zone_code' => "required|string|max:100|unique:planting_zones,zone_code,{$zone->id},id",
            'name' => 'required|string|max:255',
            'category' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'planting_purpose' => 'nullable|string',
            'status' => 'required|in:preparation,active,monitoring,completed',
            'address' => 'nullable|string',
            'village' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'access_notes' => 'nullable|string',
            'area_size' => 'required|numeric|min:0',
            'area_unit' => 'required|in:ha,m2',
            'measurement_method' => 'nullable|string|max:255',
            'measurement_date' => 'nullable|date',
            'land_condition_notes' => 'nullable|string',
            'person_in_charge' => 'nullable|string|max:255',
            'organization' => 'nullable|string|max:255',
            'start_date' => 'nullable|date',
            'planting_target' => 'nullable|integer|min:0',
            'internal_notes' => 'nullable|string',
            'main_photo_path' => 'nullable|string|max:255',
            'gallery_photos' => 'nullable|array',
            'is_published' => 'boolean',
            'scene_ids' => 'nullable|array',
            'scene_ids.*' => 'string|exists:scenes,id',
        ]);

        return DB::transaction(function () use ($zone, $validated) {
            $sceneIds = $validated['scene_ids'] ?? null;
            unset($validated['scene_ids']);

            $zone->update($validated);

            if ($sceneIds !== null) {
                // Dissociate old scenes not in sceneIds
                Scene::where('planting_zone_id', $zone->id)->whereNotIn('id', $sceneIds)->update(['planting_zone_id' => null]);
                // Associate newly chosen scenes
                if (!empty($sceneIds)) {
                    Scene::whereIn('id', $sceneIds)->update(['planting_zone_id' => $zone->id]);
                }
            }

            ActivityLogger::log('update', 'zones', "Memperbarui informasi kawasan penanaman '{$zone->name}' ({$zone->zone_code})", $zone->id, [
                'area_size' => $zone->area_size,
                'status' => $zone->status,
            ]);

            return response()->json([
                'success' => true,
                'message' => "Data kawasan '{$zone->name}' berhasil diperbarui.",
                'zone' => $zone,
            ]);
        });
    }

    /**
     * Endpoint Admin: Hapus aman kawasan (hanya jika data terkait sudah dihapus / tidak terikat)
     */
    public function destroy($id)
    {
        $zone = PlantingZone::findOrFail($id);

        $activityIds = $zone->activities()->pluck('id');
        $activitiesCount = $activityIds->count();
        $photosCount = $zone->photos()->count();
        $surveysCount = TreeSurvey::whereIn('planting_activity_id', $activityIds)->count();
        $maintenanceCount = TreeMaintenanceLog::whereIn('planting_activity_id', $activityIds)->count();
        $scenesCount = $zone->scenes()->count();

        // Cek jika kawasan masih memiliki link data terkait
        $blockingReasons = [];
        if ($photosCount > 0) {
            $blockingReasons[] = "{$photosCount} foto galeri dokumentasi";
        }
        if ($activitiesCount > 0) {
            $blockingReasons[] = "{$activitiesCount} kegiatan penanaman";
        }
        if ($surveysCount > 0) {
            $blockingReasons[] = "{$surveysCount} data sensus / pemantauan";
        }
        if ($maintenanceCount > 0) {
            $blockingReasons[] = "{$maintenanceCount} log perawatan & penyulaman";
        }
        if ($scenesCount > 0) {
            $blockingReasons[] = "{$scenesCount} scene panorama 360°";
        }

        if (!empty($blockingReasons)) {
            $reasonsList = implode(', ', $blockingReasons);
            return response()->json([
                'success' => false,
                'message' => "Kawasan '{$zone->name}' tidak dapat dihapus karena masih terhubung dengan {$reasonsList}. Harap hapus atau lepaskan link data terkait terlebih dahulu.",
                'details' => [
                    'photos_count' => $photosCount,
                    'activities_count' => $activitiesCount,
                    'surveys_count' => $surveysCount,
                    'maintenance_count' => $maintenanceCount,
                    'scenes_count' => $scenesCount,
                ],
            ], 422);
        }

        $zoneName = $zone->name;
        $zoneCode = $zone->zone_code;
        $zone->delete();

        ActivityLogger::log('delete', 'zones', "Menghapus kawasan penanaman '{$zoneName}' ({$zoneCode})", (string) $id);

        return response()->json([
            'success' => true,
            'action' => 'deleted',
            'message' => "Kawasan '{$zoneName}' berhasil dihapus.",
        ]);
    }

    /**
     * Endpoint Admin: Toggle Arsip Kawasan
     */
    public function archive($id)
    {
        $zone = PlantingZone::findOrFail($id);
        $newStatus = !$zone->is_archived;
        $zone->update(['is_archived' => $newStatus]);

        $label = $newStatus ? 'diarsipkan' : 'diaktifkan kembali';
        ActivityLogger::log($newStatus ? 'archive' : 'unarchive', 'zones', "Kawasan penanaman '{$zone->name}' ({$zone->zone_code}) {$label}", $zone->id);

        return response()->json([
            'success' => true,
            'is_archived' => $newStatus,
            'message' => "Kawasan '{$zone->name}' berhasil {$label}.",
        ]);
    }

    /**
     * Endpoint Admin: Hubungkan panorama ke kawasan
     */
    public function linkScenes(Request $request, $id)
    {
        $zone = PlantingZone::findOrFail($id);

        $request->validate([
            'scene_ids' => 'required|array',
            'scene_ids.*' => 'string|exists:scenes,id',
        ]);

        Scene::whereIn('id', $request->scene_ids)->update(['planting_zone_id' => $zone->id]);

        ActivityLogger::log('link_scenes', 'zones', "Menghubungkan " . count($request->scene_ids) . " panorama ke kawasan '{$zone->name}'", $zone->id, [
            'scene_ids' => $request->scene_ids,
        ]);

        return response()->json([
            'success' => true,
            'message' => count($request->scene_ids) . " panorama berhasil dihubungkan ke kawasan '{$zone->name}'.",
        ]);
    }

    /**
     * Endpoint Publik: Foto galeri terpublikasi untuk satu kawasan
     */
    public function publicPhotos($id)
    {
        $zone = PlantingZone::published()
            ->where(function ($q) use ($id) {
                $q->where('id', $id)->orWhere('zone_code', $id);
            })
            ->first();

        if (!$zone) {
            return response()->json([
                'success' => false,
                'message' => 'Kawasan penanaman tidak ditemukan.',
            ], 404);
        }

        $photos = PlantingZonePhoto::where('planting_zone_id', $zone->id)
            ->published()
            ->orderBy('sort_order', 'asc')
            ->orderBy('documented_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'zone' => [
                'id' => $zone->id,
                'zone_code' => $zone->zone_code,
                'name' => $zone->name,
            ],
            'total' => $photos->count(),
            'photos' => $photos,
        ]);
    }

    /**
     * Endpoint Publik: Seluruh foto galeri terpublikasi dari semua kawasan aktif
     */
    public function allPublicPhotos(Request $request)
    {
        $query = PlantingZonePhoto::published()
            ->with(['zone' => fn($q) => $q->select('id', 'zone_code', 'name', 'category', 'status')])
            ->whereHas('zone', fn($q) => $q->published());

        if ($request->filled('planting_zone_id') && $request->planting_zone_id !== 'all') {
            $query->where('planting_zone_id', $request->planting_zone_id);
        }

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('caption', 'like', $term)
                  ->orWhere('alt_text', 'like', $term);
            });
        }

        $photos = $query->orderBy('sort_order', 'asc')
            ->orderBy('documented_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'total' => $photos->count(),
            'photos' => $photos,
        ]);
    }

    /**
     * Endpoint Admin: Daftar foto untuk suatu kawasan
     */
    public function getPhotos($id, Request $request)
    {
        $zone = PlantingZone::findOrFail($id);

        $query = PlantingZonePhoto::where('planting_zone_id', $zone->id)
            ->with('uploader:id,name,username');

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('caption', 'like', $term)
                  ->orWhere('alt_text', 'like', $term);
            });
        }

        $photos = $query->orderBy('sort_order', 'asc')
            ->orderBy('documented_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'zone' => [
                'id' => $zone->id,
                'zone_code' => $zone->zone_code,
                'name' => $zone->name,
                'main_photo_path' => $zone->main_photo_path ?? $photos->firstWhere('is_cover', true)?->file_url ?? $photos->first()?->file_url,
            ],
            'total' => $photos->count(),
            'photos' => $photos,
        ]);
    }

    /**
     * Endpoint Admin: Unggah satu atau beberapa foto ke kawasan
     */
    public function uploadPhotos(Request $request, $id)
    {
        $zone = PlantingZone::findOrFail($id);

        $request->validate([
            'photos' => 'nullable|array',
            'photos.*' => 'file|mimes:jpeg,jpg,png,webp|max:5120',
            'photo' => 'nullable|file|mimes:jpeg,jpg,png,webp|max:5120',
            'title' => 'nullable|string|max:255',
            'titles' => 'nullable|array',
            'titles.*' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'captions' => 'nullable|array',
            'captions.*' => 'nullable|string',
            'alt_text' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'documented_at' => 'nullable|date',
            'cover_index' => 'nullable|integer',
            'is_cover' => 'nullable|boolean',
            'is_published' => 'nullable|boolean',
        ]);

        $files = [];
        if ($request->hasFile('photos')) {
            $files = $request->file('photos');
        } elseif ($request->hasFile('photo')) {
            $files = [$request->file('photo')];
        }

        if (empty($files)) {
            return response()->json([
                'success' => false,
                'message' => 'Pilih setidaknya satu file foto valid (JPG, PNG, atau WebP, maks 5 MB).',
            ], 422);
        }

        $maxSortOrder = PlantingZonePhoto::where('planting_zone_id', $zone->id)->max('sort_order') ?? 0;
        $savedPhotos = [];
        $isFirstPhotoForZone = PlantingZonePhoto::where('planting_zone_id', $zone->id)->count() === 0;

        $category = $request->input('category') ?: 'Kondisi Kawasan';
        $categorySlug = Str::slug($category) ?: 'kondisi-kawasan';
        $titles = $request->input('titles', []);
        $captions = $request->input('captions', []);
        $coverIndex = $request->has('cover_index') ? (int) $request->input('cover_index') : null;
        $requestIsCover = $request->boolean('is_cover');

        foreach ($files as $index => $file) {
            // Tentukan Judul Foto / Label individual atau fallback
            $fileTitle = null;
            if (is_array($titles) && isset($titles[$index]) && trim($titles[$index]) !== '') {
                $fileTitle = trim($titles[$index]);
            } elseif ($request->filled('title')) {
                $fileTitle = count($files) > 1 ? trim($request->input('title')) . ' #' . ($index + 1) : trim($request->input('title'));
            } else {
                $fileTitle = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            }

            // Bangun path penyimpanan berdasarkan Kategori dan Judul Foto / Label
            $titleSlug = Str::slug($fileTitle) ?: 'foto';
            $extension = strtolower($file->getClientOriginalExtension() ?: 'jpg');
            $uniqueName = $titleSlug . '_' . date('Ymd_His') . '_' . Str::random(6) . '.' . $extension;
            $directory = "zones/{$zone->id}/photos/{$categorySlug}";
            $storedPath = $file->storeAs($directory, $uniqueName, 'public');

            // Tentukan apakah foto ini adalah sampul
            $isCover = false;
            if ($coverIndex !== null) {
                $isCover = ($index === $coverIndex);
            } elseif ($requestIsCover && $index === 0) {
                $isCover = true;
            } elseif ($isFirstPhotoForZone && $index === 0 && empty($zone->main_photo_path)) {
                $isCover = true;
            }

            $photoCaption = is_array($captions) && isset($captions[$index]) ? $captions[$index] : $request->input('caption');
            $photoAlt = $request->input('alt_text') ?: $fileTitle;

            $photo = PlantingZonePhoto::create([
                'planting_zone_id' => $zone->id,
                'file_path' => '/storage/' . $storedPath,
                'thumbnail_path' => '/storage/' . $storedPath,
                'title' => $fileTitle,
                'caption' => $photoCaption,
                'alt_text' => $photoAlt,
                'category' => $category,
                'documented_at' => $request->input('documented_at') ?: now()->toDateString(),
                'sort_order' => $maxSortOrder + $index + 1,
                'is_cover' => $isCover,
                'is_published' => $request->has('is_published') ? $request->boolean('is_published') : true,
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'uploaded_by' => $request->user()?->id,
            ]);

            if ($isCover) {
                PlantingZonePhoto::where('planting_zone_id', $zone->id)
                    ->where('id', '!=', $photo->id)
                    ->update(['is_cover' => false]);
                $zone->update(['main_photo_path' => $photo->file_url]);
            }

            $savedPhotos[] = $photo;
        }

        ActivityLogger::log('upload_photos', 'zones', "Mengunggah " . count($savedPhotos) . " foto ke kawasan '{$zone->name}'", $zone->id, [
            'count' => count($savedPhotos),
            'zone_id' => $zone->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => count($savedPhotos) . " foto berhasil diunggah ke kawasan '{$zone->name}'.",
            'photos' => $savedPhotos,
        ], 201);
    }

    /**
     * Endpoint Admin: Perbarui metadata foto (atau ganti file)
     */
    public function updatePhoto(Request $request, $id, $photoId)
    {
        $zone = PlantingZone::findOrFail($id);
        $photo = PlantingZonePhoto::where('planting_zone_id', $zone->id)->findOrFail($photoId);

        $request->validate([
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'alt_text' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'documented_at' => 'nullable|date',
            'is_published' => 'nullable|boolean',
            'is_cover' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'photo' => 'nullable|file|mimes:jpeg,jpg,png,webp|max:5120',
        ]);

        // Ganti file jika disediakan (dengan format path berdasarkan kategori dan judul foto)
        if ($request->hasFile('photo')) {
            $newFile = $request->file('photo');
            $categoryVal = $request->input('category') ?: $photo->category ?: 'Kondisi Kawasan';
            $categorySlug = Str::slug($categoryVal) ?: 'kondisi-kawasan';
            $fileTitle = $request->input('title') ?: $photo->title ?: pathinfo($newFile->getClientOriginalName(), PATHINFO_FILENAME);
            $titleSlug = Str::slug($fileTitle) ?: 'foto';
            $extension = strtolower($newFile->getClientOriginalExtension() ?: 'jpg');
            $uniqueName = $titleSlug . '_' . date('Ymd_His') . '_' . Str::random(6) . '.' . $extension;
            $directory = "zones/{$zone->id}/photos/{$categorySlug}";
            $storedPath = $newFile->storeAs($directory, $uniqueName, 'public');

            // Hapus file lama setelah file baru berhasil disimpan
            if ($photo->file_path && str_starts_with($photo->file_path, '/storage/')) {
                $oldRel = str_replace('/storage/', '', $photo->file_path);
                Storage::disk('public')->delete($oldRel);
            }

            $photo->file_path = '/storage/' . $storedPath;
            $photo->thumbnail_path = '/storage/' . $storedPath;
            $photo->file_size = $newFile->getSize();
            $photo->mime_type = $newFile->getMimeType();
        }

        if ($request->has('title')) $photo->title = $request->input('title');
        if ($request->has('caption')) $photo->caption = $request->input('caption');
        if ($request->has('alt_text')) $photo->alt_text = $request->input('alt_text');
        if ($request->has('category')) $photo->category = $request->input('category');
        if ($request->has('documented_at')) $photo->documented_at = $request->input('documented_at');
        if ($request->has('sort_order')) $photo->sort_order = (int) $request->input('sort_order');
        if ($request->has('is_published')) $photo->is_published = $request->boolean('is_published');

        if ($request->has('is_cover')) {
            $isCover = $request->boolean('is_cover');
            $photo->is_cover = $isCover;
            if ($isCover) {
                PlantingZonePhoto::where('planting_zone_id', $zone->id)
                    ->where('id', '!=', $photo->id)
                    ->update(['is_cover' => false]);
                $zone->update(['main_photo_path' => $photo->file_url]);
            }
        }

        $photo->save();

        ActivityLogger::log('update_photo', 'zones', "Memperbarui foto #{$photo->id} pada kawasan '{$zone->name}'", $zone->id, [
            'photo_id' => $photo->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Metadata foto berhasil diperbarui.',
            'photo' => $photo,
        ]);
    }

    /**
     * Endpoint Admin: Atur foto sebagai sampul kawasan
     */
    public function setCoverPhoto($id, $photoId)
    {
        $zone = PlantingZone::findOrFail($id);
        $photo = PlantingZonePhoto::where('planting_zone_id', $zone->id)->findOrFail($photoId);

        PlantingZonePhoto::where('planting_zone_id', $zone->id)->update(['is_cover' => false]);
        $photo->update(['is_cover' => true]);
        $zone->update(['main_photo_path' => $photo->file_url]);

        ActivityLogger::log('set_cover_photo', 'zones', "Menjadikan foto #{$photo->id} sebagai sampul kawasan '{$zone->name}'", $zone->id, [
            'photo_id' => $photo->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => "Foto sampul kawasan '{$zone->name}' berhasil diperbarui.",
            'cover_photo' => $photo,
        ]);
    }

    /**
     * Endpoint Admin: Hapus foto dengan aman
     */
    public function deletePhoto($id, $photoId)
    {
        $zone = PlantingZone::findOrFail($id);
        $photo = PlantingZonePhoto::where('planting_zone_id', $zone->id)->findOrFail($photoId);

        $wasCover = $photo->is_cover;
        $photoPath = $photo->file_path;

        $photo->delete();

        // Hapus fisik jika ada di storage public
        if ($photoPath && str_starts_with($photoPath, '/storage/')) {
            $rel = str_replace('/storage/', '', $photoPath);
            Storage::disk('public')->delete($rel);
        }

        // Jika foto yang dihapus adalah sampul, pilih foto lain yang masih ada
        if ($wasCover) {
            $nextCover = PlantingZonePhoto::where('planting_zone_id', $zone->id)->first();
            if ($nextCover) {
                $nextCover->update(['is_cover' => true]);
                $zone->update(['main_photo_path' => $nextCover->file_url]);
            } else {
                $zone->update(['main_photo_path' => null]);
            }
        }

        ActivityLogger::log('delete_photo', 'zones', "Menghapus foto #{$photoId} dari kawasan '{$zone->name}'", $zone->id);

        return response()->json([
            'success' => true,
            'message' => 'Foto berhasil dihapus.',
        ]);
    }

    /**
     * Endpoint Admin: Atur ulang urutan foto
     */
    public function reorderPhotos(Request $request, $id)
    {
        $zone = PlantingZone::findOrFail($id);
        $request->validate([
            'photo_ids' => 'required|array',
            'photo_ids.*' => 'integer|exists:planting_zone_photos,id',
        ]);

        foreach ($request->photo_ids as $order => $pId) {
            PlantingZonePhoto::where('planting_zone_id', $zone->id)
                ->where('id', $pId)
                ->update(['sort_order' => $order]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Urutan foto berhasil disimpan.',
        ]);
    }
}

