<?php

namespace App\Http\Controllers;

use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\TreeMaintenanceLog;
use App\Models\TreeSpecies;
use App\Models\TreeSurvey;
use App\Models\PlantingZone;
use App\Models\Scene;
use App\Models\Hotspot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TreeDashboardController extends Controller
{
    /**
     * Data indikator utama, metrik, visualisasi, dan analitik penanaman pohon.
     */
    public function index(Request $request)
    {
        // 1. Metrik Dasar
        $zoneId = $request->input('planting_zone_id');
        $filterZone = ($zoneId && $zoneId !== 'all');

        $totalZones = PlantingZone::active()->count();
        $totalScenes = Scene::count();
        $totalHotspots = Hotspot::count();

        $activitiesQuery = PlantingActivity::with([
            'items',
            'surveys' => fn($q) => $q->where('is_verified', true)->orderBy('survey_date', 'desc'),
            'maintenanceLogs' => fn($q) => $q->where('action_type', 'penyulaman'),
        ]);

        if ($filterZone) {
            $activitiesQuery->where('planting_zone_id', $zoneId);
        }

        $activities = $activitiesQuery->get();
        $activityIds = $activities->pluck('id');

        $totalInitialSeedlings = $filterZone
            ? (int) PlantingActivityItem::whereIn('planting_activity_id', $activityIds)->sum('quantity')
            : (int) PlantingActivityItem::sum('quantity');

        $totalSpecies = $filterZone
            ? PlantingActivityItem::whereIn('planting_activity_id', $activityIds)->distinct('tree_species_id')->count('tree_species_id')
            : TreeSpecies::count();

        $totalActivities = $activities->count();
        $monitoredBatchesCount = $activities->filter(fn($a) => $a->surveys->isNotEmpty())->count();

        // 2. Perhitungan Tanaman Hidup & Kelangsungan Hidup Kelompok Awal Berdasarkan Survei Terbaru

        $totalAliveInitial = 0;
        $totalDeadInitial = 0;
        $totalMissingInitial = 0;
        $surveyedInitialSeedlings = 0;
        $needsInspection = [];
        $today = now();

        foreach ($activities as $act) {
            $actInitial = $act->total_initial_seedlings;
            $latest = $act->surveys->first(); // Survei terverifikasi paling mutakhir

            if ($latest) {
                $totalAliveInitial += $latest->alive_count;
                $totalDeadInitial += $latest->dead_count;
                $totalMissingInitial += $latest->missing_count;
                $surveyedInitialSeedlings += $actInitial;

                $survivalRate = $actInitial > 0 ? round(($latest->alive_count / $actInitial) * 100, 2) : 0;
                $daysSince = $latest->survey_date ? $today->diffInDays($latest->survey_date) : 999;

                // Kelompok yang perlu diperiksa kembali: > 30 hari atau survival < 70%
                if ($daysSince > 30 || $survivalRate < 70) {
                    $needsInspection[] = [
                        'id' => $act->id,
                        'batch_code' => $act->batch_code,
                        'name' => $act->name,
                        'location_zone' => $act->location_zone,
                        'last_survey_date' => $latest->survey_date?->format('Y-m-d'),
                        'days_since_survey' => $daysSince,
                        'survival_rate' => $survivalRate,
                        'reason' => $survivalRate < 70 ? 'Kelangsungan hidup rendah (<70%)' : 'Belum diperiksa lebih dari 30 hari',
                    ];
                }
            } else {
                // Belum pernah disurvei
                $needsInspection[] = [
                    'id' => $act->id,
                    'batch_code' => $act->batch_code,
                    'name' => $act->name,
                    'location_zone' => $act->location_zone,
                    'last_survey_date' => null,
                    'days_since_survey' => $act->activity_date ? $today->diffInDays($act->activity_date) : null,
                    'survival_rate' => null,
                    'reason' => 'Belum pernah disurvei sejak penanaman',
                ];
            }
        }

        // Total bibit penyulaman (dipisahkan secara eksplisit agar tidak mencemari indikator kelompok awal)
        $totalReplacements = (int) TreeMaintenanceLog::where('action_type', 'penyulaman')->sum('replacement_plants_count');

        // Indikator Kelangsungan Hidup Kelompok Awal
        $overallSurvivalRate = null;
        $survivalRateStatus = 'data_belum_lengkap';

        if ($surveyedInitialSeedlings > 0) {
            $calc = ($totalAliveInitial / $surveyedInitialSeedlings) * 100.0;
            $overallSurvivalRate = max(0.0, min(100.0, round($calc, 2)));
            $survivalRateStatus = 'terverifikasi';
        }

        // 3. Distribusi Jumlah Bibit Menurut Jenis Pohon
        $speciesDistribution = TreeSpecies::withCount(['activityItems as total_planted' => function ($q) {
            $q->select(DB::raw('COALESCE(SUM(quantity), 0)'));
        }])
        ->orderBy('total_planted', 'desc')
        ->limit(10)
        ->get()
        ->map(fn($s) => [
            'id' => $s->id,
            'common_name' => $s->common_name,
            'scientific_name' => $s->scientific_name,
            'total_planted' => (int) $s->total_planted,
        ]);

        // 4. Tren Penanaman Per Bulan (kompatibel MySQL & SQLite)
        $driver = DB::getDriverName();
        $dateExpression = $driver === 'sqlite'
            ? "strftime('%Y-%m', activity_date)"
            : "DATE_FORMAT(activity_date, '%Y-%m')";

        $plantingTrends = PlantingActivity::select(
            DB::raw("{$dateExpression} as period"),
            DB::raw("COUNT(id) as activity_count")
        )
        ->groupBy('period')
        ->orderBy('period', 'asc')
        ->get();

        // 5. Riwayat Pemantauan & Perawatan Terkini
        $recentSurveys = TreeSurvey::with(['activity', 'species'])
            ->orderBy('survey_date', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($s) => [
                'id' => $s->id,
                'survey_date' => $s->survey_date?->format('Y-m-d'),
                'batch_code' => $s->activity?->batch_code,
                'alive_count' => $s->alive_count,
                'health_condition' => $s->health_condition,
                'inspector_name' => $s->inspector_name,
            ]);

        $recentMaintenance = TreeMaintenanceLog::with(['activity', 'species'])
            ->orderBy('maintenance_date', 'desc')
            ->limit(5)
            ->get()
            ->map(fn($m) => [
                'id' => $m->id,
                'maintenance_date' => $m->maintenance_date?->format('Y-m-d'),
                'batch_code' => $m->activity?->batch_code,
                'action_type' => $m->action_type,
                'plants_handled_count' => $m->plants_handled_count,
                'replacement_plants_count' => $m->replacement_plants_count,
                'officer_or_team' => $m->officer_or_team,
            ]);

        // Distribusi Penanaman Menurut Kawasan
        $zoneDistribution = PlantingZone::with(['activities.items'])->get()->map(function ($zone) {
            $total = $zone->activities->sum(function ($act) {
                return $act->items->sum('quantity');
            });
            return [
                'id' => $zone->id,
                'name' => $zone->name,
                'zone_code' => $zone->zone_code,
                'total_planted' => (int) $total,
            ];
        });

        return response()->json([
            'success' => true,
            'indicators' => [
                'total_zones' => $totalZones,
                'total_scenes' => $totalScenes,
                'total_hotspots' => $totalHotspots,
                'monitored_batches_count' => $monitoredBatchesCount,
                'total_initial_seedlings' => $totalInitialSeedlings,
                'total_species' => $totalSpecies,
                'total_activities' => $totalActivities,
                'total_alive_initial' => $totalAliveInitial,
                'total_dead_initial' => $totalDeadInitial,
                'total_missing_initial' => $totalMissingInitial,
                'surveyed_initial_seedlings' => $surveyedInitialSeedlings,
                'total_replacements' => $totalReplacements, // Terpisah dari kelompok awal!
                'survival_rate' => $overallSurvivalRate,
                'survival_rate_status' => $survivalRateStatus,
            ],
            'charts' => [
                'species_distribution' => $speciesDistribution,
                'zone_distribution' => $zoneDistribution,
                'planting_trends' => $plantingTrends,
            ],
            'needs_inspection' => $needsInspection,
            'recent_surveys' => $recentSurveys,
            'recent_maintenance' => $recentMaintenance,
        ]);
    }
}
