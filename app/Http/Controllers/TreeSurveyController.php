<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTreeSurveyRequest;
use App\Models\PlantingActivity;
use App\Models\TreeSurvey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TreeSurveyController extends Controller
{
    /**
     * Daftar survei pemantauan untuk admin.
     */
    public function index(Request $request)
    {
        $query = TreeSurvey::with(['activity.plantingZone', 'activity.scene', 'species'])
            ->orderBy('survey_date', 'desc');

        if ($request->filled('planting_activity_id') && $request->planting_activity_id !== 'all') {
            $query->where('planting_activity_id', $request->planting_activity_id);
        }

        if ($request->filled('tree_species_id') && $request->tree_species_id !== 'all') {
            $query->where('tree_species_id', $request->tree_species_id);
        }

        if ($request->filled('health_condition') && $request->health_condition !== 'all') {
            $query->where('health_condition', $request->health_condition);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('survey_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('survey_date', '<=', $request->end_date);
        }

        $surveys = $query->get();

        return response()->json([
            'success' => true,
            'total' => $surveys->count(),
            'surveys' => $surveys->map(function ($s) {
                $initial = $s->activity?->total_initial_seedlings ?? 0;
                $survivalRate = $initial > 0 ? max(0.0, min(100.0, round(($s->alive_count / $initial) * 100, 2))) : null;

                return [
                    'id' => $s->id,
                    'survey_date' => $s->survey_date?->format('Y-m-d'),
                    'planting_activity_id' => $s->planting_activity_id,
                    'batch_code' => $s->activity?->batch_code,
                    'activity_name' => $s->activity?->name,
                    'planting_zone_id' => $s->activity?->planting_zone_id,
                    'planting_zone_name' => $s->activity?->plantingZone?->name,
                    'location_zone' => $s->activity?->location_zone,
                    'scene_name' => $s->activity?->scene?->name,
                    'species_name' => $s->species?->common_name,
                    'initial_seedlings' => $initial,
                    'alive_count' => $s->alive_count,
                    'dead_count' => $s->dead_count,
                    'missing_count' => $s->missing_count,
                    'uninspected_count' => $s->uninspected_count,
                    'survival_rate' => $survivalRate,
                    'health_condition' => $s->health_condition,
                    'average_height_cm' => $s->average_height_cm,
                    'average_diameter_cm' => $s->average_diameter_cm,
                    'inspector_name' => $s->inspector_name,
                    'field_notes' => $s->field_notes,
                    'recommendations' => $s->recommendations,
                    'is_verified' => $s->is_verified,
                    'is_estimate' => $s->is_estimate,
                ];
            }),
        ]);
    }

    /**
     * Detail satu survei pemantauan.
     */
    public function show(string $id)
    {
        $survey = TreeSurvey::with(['activity.scene', 'species'])->find($id);

        if (!$survey) {
            return response()->json(['success' => false, 'message' => 'Catatan survei tidak ditemukan.'], 404);
        }

        $initial = $survey->activity?->total_initial_seedlings ?? 0;
        $survivalRate = $initial > 0 ? max(0.0, min(100.0, round(($survey->alive_count / $initial) * 100, 2))) : null;

        return response()->json([
            'success' => true,
            'survey' => $survey,
            'initial_seedlings' => $initial,
            'survival_rate' => $survivalRate,
        ]);
    }

    /**
     * Simpan catatan survei baru.
     * Persyaratan 5: Survei baru TIDAK BOLEH menimpa survei lama; disimpan sebagai rekam historis terpisah.
     */
    public function store(StoreTreeSurveyRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();

            $activity = PlantingActivity::findOrFail($data['planting_activity_id']);
            $initial = $activity->total_initial_seedlings;

            // Validasi: jumlah tanaman hidup dari kelompok awal tidak boleh melampaui bibit awal kelompok itu
            if ($data['alive_count'] > $initial && $initial > 0) {
                return response()->json([
                    'success' => false,
                    'message' => "Jumlah tanaman hidup ({$data['alive_count']}) melebihi total bibit awal yang ditanam ({$initial}). Jika terdapat tanaman pengganti dari penyulaman, catat di modul Perawatan & Penyulaman.",
                ], 422);
            }

            $survey = TreeSurvey::create($data);

            return response()->json([
                'success' => true,
                'message' => "Survei pemantauan tanggal {$survey->survey_date->format('d/m/Y')} berhasil dicatat.",
                'survey' => $survey->load(['activity.scene', 'species']),
            ], 201);
        });
    }

    /**
     * Perbarui catatan survei.
     */
    public function update(Request $request, string $id)
    {
        $survey = TreeSurvey::find($id);

        if (!$survey) {
            return response()->json(['success' => false, 'message' => 'Catatan survei tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'planting_activity_id' => ['sometimes', 'string', 'exists:planting_activities,id'],
            'tree_species_id' => ['nullable', 'string', 'exists:tree_species,id'],
            'survey_date' => ['sometimes', 'date'],
            'alive_count' => ['sometimes', 'integer', 'min:0'],
            'dead_count' => ['sometimes', 'integer', 'min:0'],
            'missing_count' => ['sometimes', 'integer', 'min:0'],
            'uninspected_count' => ['sometimes', 'integer', 'min:0'],
            'average_height_cm' => ['nullable', 'numeric', 'min:0'],
            'average_diameter_cm' => ['nullable', 'numeric', 'min:0'],
            'health_condition' => ['sometimes', 'string', 'in:sangat_baik,baik,sedang,merana,terserang_hama'],
            'damage_symptoms' => ['nullable', 'string'],
            'photo_path' => ['nullable', 'string', 'max:255'],
            'inspector_name' => ['sometimes', 'string', 'max:255'],
            'field_notes' => ['nullable', 'string'],
            'recommendations' => ['nullable', 'string'],
            'is_verified' => ['nullable', 'boolean'],
            'is_estimate' => ['nullable', 'boolean'],
        ]);

        $actId = $validated['planting_activity_id'] ?? $survey->planting_activity_id;
        $activity = PlantingActivity::find($actId);
        $initial = $activity?->total_initial_seedlings ?? 0;
        $alive = $validated['alive_count'] ?? $survey->alive_count;

        if ($initial > 0 && $alive > $initial) {
            return response()->json([
                'success' => false,
                'message' => "Jumlah tanaman hidup ({$alive}) melebihi total bibit awal yang ditanam ({$initial}). Jika terdapat tanaman pengganti dari penyulaman, catat di modul Perawatan & Penyulaman.",
            ], 422);
        }

        return DB::transaction(function () use ($survey, $validated) {
            $survey->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Catatan survei berhasil diperbarui.',
                'survey' => $survey->fresh(['activity.scene', 'species']),
            ]);
        });
    }

    /**
     * Hapus catatan survei.
     */
    public function destroy(string $id)
    {
        $survey = TreeSurvey::find($id);

        if (!$survey) {
            return response()->json(['success' => false, 'message' => 'Catatan survei tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($survey) {
            $survey->delete();

            return response()->json([
                'success' => true,
                'message' => 'Catatan survei pemantauan berhasil dihapus.',
            ]);
        });
    }
}
