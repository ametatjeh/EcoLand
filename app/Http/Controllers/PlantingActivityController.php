<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantingActivityRequest;
use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PlantingActivityController extends Controller
{
    /**
     * Daftar kegiatan penanaman untuk admin.
     */
    public function index(Request $request)
    {
        $query = PlantingActivity::with(['scene', 'items.species', 'surveys' => fn($q) => $q->orderBy('survey_date', 'desc')])
            ->orderBy('activity_date', 'desc');

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                  ->orWhere('batch_code', 'like', $term)
                  ->orWhere('location_zone', 'like', $term)
                  ->orWhere('organizer', 'like', $term);
            });
        }

        if ($request->filled('location_zone') && $request->location_zone !== 'all') {
            $query->where('location_zone', $request->location_zone);
        }

        if ($request->filled('planting_zone_id') && $request->planting_zone_id !== 'all') {
            $query->where('planting_zone_id', $request->planting_zone_id);
        }

        if ($request->filled('scene_id') && $request->scene_id !== 'all') {
            $query->where('scene_id', $request->scene_id);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('activity_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('activity_date', '<=', $request->end_date);
        }

        if ($request->filled('tree_species_id') && $request->tree_species_id !== 'all') {
            $query->whereHas('items', fn($q) => $q->where('tree_species_id', $request->tree_species_id));
        }

        $activities = $query->get();

        return response()->json([
            'success' => true,
            'total' => $activities->count(),
            'activities' => $activities->map(function ($act) {
                return [
                    'id' => $act->id,
                    'batch_code' => $act->batch_code,
                    'name' => $act->name,
                    'activity_date' => $act->activity_date?->format('Y-m-d'),
                    'person_in_charge' => $act->person_in_charge,
                    'organizer' => $act->organizer,
                    'location_zone' => $act->location_zone,
                    'scene_id' => $act->scene_id,
                    'scene_name' => $act->scene?->name,
                    'total_initial_seedlings' => $act->total_initial_seedlings,
                    'latest_alive_count' => $act->latest_survey?->alive_count,
                    'survival_rate' => $act->survival_rate,
                    'surveys_count' => $act->surveys->count(),
                    'total_replacements' => $act->total_replacements_count,
                    'species_list' => $act->items->map(fn($it) => [
                        'species_id' => $it->tree_species_id,
                        'common_name' => $it->species?->common_name,
                        'quantity' => $it->quantity,
                        'unit' => $it->unit,
                    ]),
                ];
            }),
        ]);
    }

    /**
     * Detail satu kegiatan penanaman.
     */
    public function show(string $id)
    {
        $activity = PlantingActivity::with([
            'scene',
            'items.species',
            'surveys' => fn($q) => $q->orderBy('survey_date', 'desc'),
            'maintenanceLogs' => fn($q) => $q->orderBy('maintenance_date', 'desc'),
        ])->find($id);

        if (!$activity) {
            return response()->json(['success' => false, 'message' => 'Kegiatan penanaman tidak ditemukan.'], 404);
        }

        return response()->json([
            'success' => true,
            'activity' => $activity,
            'total_initial_seedlings' => $activity->total_initial_seedlings,
            'survival_rate' => $activity->survival_rate,
            'total_replacements' => $activity->total_replacements_count,
            'latest_survey' => $activity->latest_survey,
        ]);
    }

    /**
     * Simpan kegiatan penanaman baru beserta rincian bibit awal.
     */
    public function store(StorePlantingActivityRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();
            $itemsData = $data['items'];
            unset($data['items']);

            $activity = PlantingActivity::create($data);

            foreach ($itemsData as $item) {
                PlantingActivityItem::create([
                    'planting_activity_id' => $activity->id,
                    'tree_species_id' => $item['tree_species_id'],
                    'quantity' => $item['quantity'],
                    'unit' => $item['unit'] ?? 'batang',
                    'seed_source' => $item['seed_source'] ?? null,
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => "Kegiatan penanaman '{$activity->name}' ({$activity->batch_code}) berhasil dicatat.",
                'activity' => $activity->load(['items.species', 'scene']),
            ], 201);
        });
    }

    /**
     * Perbarui data kegiatan penanaman.
     */
    public function update(Request $request, string $id)
    {
        $activity = PlantingActivity::find($id);

        if (!$activity) {
            return response()->json(['success' => false, 'message' => 'Kegiatan penanaman tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'activity_date' => ['sometimes', 'date'],
            'person_in_charge' => ['sometimes', 'string', 'max:255'],
            'organizer' => ['sometimes', 'string', 'max:255'],
            'location_zone' => ['sometimes', 'string', 'max:255'],
            'scene_id' => ['nullable', 'string', 'exists:scenes,id'],
            'photo_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        return DB::transaction(function () use ($activity, $validated) {
            $activity->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Data kegiatan penanaman berhasil diperbarui.',
                'activity' => $activity->load(['items.species', 'scene']),
            ]);
        });
    }

    /**
     * Fitur Koreksi Bibit Awal (Persyaratan 3):
     * Memperbarui jumlah bibit awal yang salah input dengan pencatatan alasan dan logging.
     */
    public function correctItem(Request $request, int $itemId)
    {
        $item = PlantingActivityItem::with('activity', 'species')->find($itemId);

        if (!$item) {
            return response()->json(['success' => false, 'message' => 'Rincian bibit kegiatan tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'new_quantity' => ['required', 'integer', 'min:1'],
            'reason' => ['required', 'string', 'min:5'],
        ]);

        $adminName = $request->user()?->name ?? 'Administrator';

        return DB::transaction(function () use ($item, $validated, $adminName) {
            $item->applyCorrection($validated['new_quantity'], $validated['reason'], $adminName);

            return response()->json([
                'success' => true,
                'message' => "Koreksi jumlah bibit awal berhasil dicatat.",
                'item' => $item,
            ]);
        });
    }

    /**
     * Hapus kegiatan penanaman.
     */
    public function destroy(string $id)
    {
        $activity = PlantingActivity::find($id);

        if (!$activity) {
            return response()->json(['success' => false, 'message' => 'Kegiatan penanaman tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($activity) {
            $batchCode = $activity->batch_code;
            $activity->delete();

            return response()->json([
                'success' => true,
                'message' => "Kegiatan penanaman batch '{$batchCode}' berhasil dihapus.",
            ]);
        });
    }
}
