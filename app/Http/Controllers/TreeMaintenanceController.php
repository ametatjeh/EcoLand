<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTreeMaintenanceRequest;
use App\Models\PlantingActivity;
use App\Models\TreeMaintenanceLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TreeMaintenanceController extends Controller
{
    /**
     * Daftar kegiatan perawatan dan penyulaman.
     */
    public function index(Request $request)
    {
        $query = TreeMaintenanceLog::with(['activity.scene', 'species'])
            ->orderBy('maintenance_date', 'desc');

        if ($request->filled('planting_activity_id') && $request->planting_activity_id !== 'all') {
            $query->where('planting_activity_id', $request->planting_activity_id);
        }

        if ($request->filled('action_type') && $request->action_type !== 'all') {
            $query->where('action_type', $request->action_type);
        }

        if ($request->filled('start_date')) {
            $query->whereDate('maintenance_date', '>=', $request->start_date);
        }

        if ($request->filled('end_date')) {
            $query->whereDate('maintenance_date', '<=', $request->end_date);
        }

        $logs = $query->get();

        return response()->json([
            'success' => true,
            'total' => $logs->count(),
            'logs' => $logs->map(function ($log) {
                return [
                    'id' => $log->id,
                    'maintenance_date' => $log->maintenance_date?->format('Y-m-d'),
                    'planting_activity_id' => $log->planting_activity_id,
                    'batch_code' => $log->activity?->batch_code,
                    'activity_name' => $log->activity?->name,
                    'location_zone' => $log->activity?->location_zone,
                    'scene_name' => $log->activity?->scene?->name,
                    'species_name' => $log->species?->common_name,
                    'action_type' => $log->action_type,
                    'action_type_label' => ucfirst(str_replace('_', ' ', $log->action_type)),
                    'plants_handled_count' => $log->plants_handled_count,
                    'replacement_plants_count' => $log->replacement_plants_count,
                    'action_reason' => $log->action_reason,
                    'officer_or_team' => $log->officer_or_team,
                    'cost' => $log->cost,
                    'photo_before_path' => $log->photo_before_path,
                    'photo_after_path' => $log->photo_after_path,
                    'notes' => $log->notes,
                ];
            }),
        ]);
    }

    /**
     * Simpan catatan perawatan / penyulaman baru.
     * Persyaratan 6: Penyulaman dicatat terpisah agar riwayat kelangsungan hidup tidak tercampur.
     */
    public function store(StoreTreeMaintenanceRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $data = $request->validated();
            $log = TreeMaintenanceLog::create($data);

            return response()->json([
                'success' => true,
                'message' => "Kegiatan perawatan ({$log->action_type}) berhasil dicatat.",
                'log' => $log->load(['activity.scene', 'species']),
            ], 201);
        });
    }

    /**
     * Detail satu kegiatan perawatan.
     */
    public function show(string $id)
    {
        $log = TreeMaintenanceLog::with(['activity.scene', 'species'])->find($id);

        if (!$log) {
            return response()->json(['success' => false, 'message' => 'Catatan perawatan tidak ditemukan.'], 404);
        }

        return response()->json([
            'success' => true,
            'log' => $log,
        ]);
    }

    /**
     * Perbarui catatan perawatan.
     */
    public function update(Request $request, string $id)
    {
        $log = TreeMaintenanceLog::find($id);

        if (!$log) {
            return response()->json(['success' => false, 'message' => 'Catatan perawatan tidak ditemukan.'], 404);
        }

        $validated = $request->validate([
            'planting_activity_id' => ['sometimes', 'string', 'exists:planting_activities,id'],
            'tree_species_id' => ['nullable', 'string', 'exists:tree_species,id'],
            'maintenance_date' => ['sometimes', 'date'],
            'action_type' => ['sometimes', 'string', 'in:penyiraman,penyiangan,pemupukan,perlindungan_bibit,pengendalian_gangguan,penyulaman'],
            'plants_handled_count' => ['nullable', 'integer', 'min:0'],
            'replacement_plants_count' => ['nullable', 'integer', 'min:0'],
            'action_reason' => ['nullable', 'string'],
            'officer_or_team' => ['sometimes', 'string', 'max:255'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'photo_before_path' => ['nullable', 'string', 'max:255'],
            'photo_after_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ]);

        return DB::transaction(function () use ($log, $validated) {
            $log->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Catatan perawatan berhasil diperbarui.',
                'log' => $log->fresh(['activity.scene', 'species']),
            ]);
        });
    }

    /**
     * Hapus catatan perawatan.
     */
    public function destroy(string $id)
    {
        $log = TreeMaintenanceLog::find($id);

        if (!$log) {
            return response()->json(['success' => false, 'message' => 'Catatan perawatan tidak ditemukan.'], 404);
        }

        return DB::transaction(function () use ($log) {
            $log->delete();

            return response()->json([
                'success' => true,
                'message' => 'Catatan perawatan berhasil dihapus.',
            ]);
        });
    }
}
