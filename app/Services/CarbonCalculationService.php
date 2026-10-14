<?php

namespace App\Services;

use App\Models\PlantingZone;
use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\TreeSurvey;
use App\Models\TreeSpecies;
use Illuminate\Support\Collection;

class CarbonCalculationService
{
    /**
     * Fraksi karbon standar IPCC (2006/2019 Refinement): 47% dari biomassa kering adalah karbon.
     */
    public const CARBON_FRACTION = 0.47;

    /**
     * Faktor konversi C ke CO2e (rasio massa molekul 44/12).
     */
    public const CO2_CONVERSION_FACTOR = 44 / 12; // ~3.6667

    /**
     * Rasio Akar-Pucuk (Root-to-Shoot Ratio / R) default IPCC untuk hutan tropis basah / tanaman muda.
     */
    public const ROOT_TO_SHOOT_RATIO = 0.24;

    /**
     * Nilai estimasi berat jenis kayu (wood specific gravity / rho dalam g/cm3)
     * bersumber dari database ICRAF Wood Density & Balai Riset Standardisasi.
     */
    protected array $defaultWoodDensities = [
        'merbau-aceh' => 0.68,   // Intsia bijuga (kayu keras padat)
        'geurundong' => 0.42,    // Spondias pinnata (kayu lunak-sedang cepat tumbuh)
        'gaharu-lokal' => 0.40,  // Aquilaria malaccensis (kayu ringan beraroma)
        'jeumpa-aceh' => 0.46,   // Magnolia champaca
        'trembesi' => 0.52,      // Samanea saman
        'salam-hutan' => 0.60,   // Syzygium polyanthum
        'jengkol-hutan' => 0.54, // Archidendron pauciflorum
    ];

    /**
     * Hitung ringkasan akuntansi karbon publik secara komprehensif dan read-only.
     */
    public function getPublicCarbonSummary(?string $zoneId = null): array
    {
        // 1. Data Kawasan
        $zoneQuery = PlantingZone::published();
        if ($zoneId && $zoneId !== 'all') {
            $zoneQuery->where('id', $zoneId);
        }
        $zones = $zoneQuery->get();
        $zoneIds = $zones->pluck('id');

        $totalAreaHa = (float) $zones->sum(fn($z) => $z->getAreaInHa());
        $totalAreaM2 = (float) round($totalAreaHa * 10000, 2);

        // 2. Data Kegiatan Penanaman & Item Bibit
        $activitiesQuery = PlantingActivity::with(['items.species', 'surveys']);
        if ($zoneId && $zoneId !== 'all') {
            $activitiesQuery->where('planting_zone_id', $zoneId);
        } else {
            $activitiesQuery->where(function ($q) use ($zoneIds) {
                $q->whereIn('planting_zone_id', $zoneIds)->orWhereNull('planting_zone_id');
            });
        }
        $activities = $activitiesQuery->get();
        $activityIds = $activities->pluck('id');

        $activityItems = PlantingActivityItem::with('species')
            ->whereIn('planting_activity_id', $activityIds)
            ->get();

        $totalInitialSeedlings = (int) $activityItems->sum('quantity');

        // 3. Data Pemantauan Survei Terbaru
        $surveys = TreeSurvey::whereIn('planting_activity_id', $activityIds)
            ->where('is_verified', true)
            ->orderBy('survey_date', 'desc')
            ->get();

        $distinctSurveyDates = $surveys->pluck('survey_date')->unique()->filter()->values();
        $totalSurveyPeriods = $distinctSurveyDates->count();

        $latestSurvey = $surveys->first();

        $totalAlive = 0;
        $totalDead = 0;
        $totalMissing = 0;
        $totalUninspected = 0;
        $avgHeightCm = 0.0;
        $avgDiameterCm = 0.0;
        $latestSurveyDate = null;

        if ($latestSurvey) {
            $totalAlive = (int) $latestSurvey->alive_count;
            $totalDead = (int) $latestSurvey->dead_count;
            $totalMissing = (int) $latestSurvey->missing_count;
            $totalUninspected = (int) $latestSurvey->uninspected_count;
            $avgHeightCm = (float) $latestSurvey->average_height_cm;
            $avgDiameterCm = (float) $latestSurvey->average_diameter_cm;
            $latestSurveyDate = $latestSurvey->survey_date ? $latestSurvey->survey_date->format('Y-m-d') : null;
        }

        $totalSurveyedStatus = $totalAlive + $totalDead + $totalMissing + $totalUninspected;
        $survivalRate = $totalInitialSeedlings > 0 ? round(($totalAlive / $totalInitialSeedlings) * 100, 2) : 0.0;

        // 4. Hitung Estimasi Karbon per Spesies Berbasis Persamaan Allometrik Tropis
        // Menggunakan formula allometrik Chave et al. (2014) untuk biomassa pohon muda tropis
        $speciesBreakdown = [];
        $totalAgbKg = 0.0;
        $totalBgbKg = 0.0;
        $totalBiomassKg = 0.0;
        $totalCarbonStockKg = 0.0;

        // Distribusikan pohon hidup proporsional ke spesies yang tertanam
        $speciesGroups = $activityItems->groupBy('tree_species_id');

        foreach ($speciesGroups as $spId => $items) {
            $plantedCount = (int) $items->sum('quantity');
            $speciesModel = $items->first()->species;
            $speciesName = $speciesModel ? $speciesModel->common_name : $spId;
            $scientificName = $speciesModel ? $speciesModel->scientific_name : '';
            $woodDensity = $this->defaultWoodDensities[$spId] ?? 0.55;

            // Proporsi pohon hidup per spesies (berdasarkan survival rate keseluruhan)
            $estimatedAlive = $totalInitialSeedlings > 0
                ? (int) round(($plantedCount / $totalInitialSeedlings) * $totalAlive)
                : 0;

            // Parameter pohon dari survei: diameter (cm) dan tinggi (m)
            $d = $avgDiameterCm > 0 ? $avgDiameterCm : 3.0; // cm
            $h = $avgHeightCm > 0 ? ($avgHeightCm / 100.0) : 1.35; // meter

            // AGB per pohon (kg) = 0.0673 * (rho * D^2 * H)^0.976
            $inner = $woodDensity * pow($d, 2) * $h;
            $agbPerTreeKg = 0.0673 * pow($inner, 0.976);
            $bgbPerTreeKg = $agbPerTreeKg * self::ROOT_TO_SHOOT_RATIO;
            $biomassPerTreeKg = $agbPerTreeKg + $bgbPerTreeKg;
            $carbonPerTreeKg = $biomassPerTreeKg * self::CARBON_FRACTION;
            $co2ePerTreeKg = $carbonPerTreeKg * self::CO2_CONVERSION_FACTOR;

            $speciesTotalAgbKg = $agbPerTreeKg * $estimatedAlive;
            $speciesTotalBgbKg = $bgbPerTreeKg * $estimatedAlive;
            $speciesTotalBiomassKg = $speciesTotalAgbKg + $speciesTotalBgbKg;
            $speciesTotalCarbonKg = $speciesTotalBiomassKg * self::CARBON_FRACTION;
            $speciesTotalCo2eKg = $speciesTotalCarbonKg * self::CO2_CONVERSION_FACTOR;

            $totalAgbKg += $speciesTotalAgbKg;
            $totalBgbKg += $speciesTotalBgbKg;
            $totalBiomassKg += $speciesTotalBiomassKg;
            $totalCarbonStockKg += $speciesTotalCarbonKg;

            $speciesBreakdown[] = [
                'species_id' => $spId,
                'name' => $speciesName,
                'scientific_name' => $scientificName,
                'planted_count' => $plantedCount,
                'estimated_alive' => $estimatedAlive,
                'wood_density' => $woodDensity,
                'carbon_stock_kg' => round($speciesTotalCarbonKg, 2),
                'co2e_kg' => round($speciesTotalCo2eKg, 2),
                'co2e_ton' => round($speciesTotalCo2eKg / 1000.0, 4),
            ];
        }

        $totalCarbonStockTon = round($totalCarbonStockKg / 1000.0, 3);
        $totalCo2eTon = round(($totalCarbonStockKg * self::CO2_CONVERSION_FACTOR) / 1000.0, 3);

        // 5. Perubahan Stok Karbon (Delta C)
        // Menurut instruksi metodologi ketat: Delta C HANYA boleh bernilai numerik jika ada minimal 2 periode pengukuran
        $hasDeltaC = ($totalSurveyPeriods >= 2);
        $deltaC = null;
        $deltaCStatus = 'belum_tersedia';
        $deltaCMessage = 'Memerlukan minimal 2 periode survei lapangan berkala untuk menghitung perubahan stok karbon (ΔC).';

        // 6. Data Tren Penanaman Aktual
        $plantingTrends = $activities->map(function ($act) {
            return [
                'activity_id' => $act->id,
                'batch_code' => $act->batch_code,
                'activity_date' => $act->activity_date ? $act->activity_date->format('Y-m-d') : null,
                'period_label' => $act->activity_date ? $act->activity_date->format('M Y') : 'N/A',
                'trees_planted' => (int) $act->items->sum('quantity'),
                'zone_name' => $act->zone ? $act->zone->name : 'Kawasan Lamteuba',
            ];
        });

        // 7. Tabel Rincian Kawasan untuk Publik
        $zonesTable = $zones->map(function ($z) use ($activities, $latestSurvey, $totalCarbonStockTon, $totalCo2eTon, $survivalRate) {
            $act = $activities->where('planting_zone_id', $z->id)->first() ?? $activities->first();
            $planted = $act ? (int) $act->items->sum('quantity') : 0;
            return [
                'id' => $z->id,
                'name' => $z->name,
                'zone_code' => $z->zone_code,
                'area_ha' => (float) $z->getAreaInHa(),
                'planted_trees' => $planted,
                'latest_survey_date' => $latestSurvey && $latestSurvey->survey_date ? $latestSurvey->survey_date->format('d M Y') : 'Belum disurvei',
                'survival_rate' => $survivalRate,
                'data_completeness' => 'Lengkap (Periode Baseline 1)',
                'carbon_stock_ton_c' => $totalCarbonStockTon,
                'co2e_ton' => $totalCo2eTon,
                'carbon_status' => 'Estimasi Awal Biomassa Tegakan Muda',
                'delta_c' => 'Menunggu Periode 2',
            ];
        });

        return [
            'success' => true,
            'metadata' => [
                'as_of_date' => now()->format('Y-m-d H:i:s'),
                'methodology_reference' => 'Kandidat ARR Framework (Verra VM0047 v1.1 Principles)',
                'allometric_model' => 'Chave et al. (2014) Pantropical Moist Forest Equation',
                'carbon_fraction' => self::CARBON_FRACTION,
                'root_to_shoot_ratio' => self::ROOT_TO_SHOOT_RATIO,
                'disclaimer' => 'Hasil estimasi merupakan stok karbon vegetasi awal berbasis sensus bibit pohon muda. Angka ini BUKAN kredit karbon terverifikasi dan tidak dapat diklaim sebagai unit offset sebelum verifikasi independen pihak ketiga.',
            ],
            'indicators' => [
                'total_area_ha' => $totalAreaHa,
                'total_area_m2' => $totalAreaM2,
                'total_zones' => $zones->count(),
                'total_trees_planted' => $totalInitialSeedlings,
                'total_alive_trees' => $totalAlive,
                'total_dead_trees' => $totalDead,
                'total_missing_trees' => $totalMissing,
                'total_uninspected_trees' => $totalUninspected,
                'survival_rate' => $survivalRate,
                'average_height_cm' => $avgHeightCm,
                'average_diameter_cm' => $avgDiameterCm,
                'carbon_stock_ton_c' => $totalCarbonStockTon,
                'carbon_stock_co2e_ton' => $totalCo2eTon,
                'delta_c_ton' => $deltaC,
                'delta_c_status' => $deltaCStatus,
                'delta_c_message' => $deltaCMessage,
                'total_survey_periods' => $totalSurveyPeriods,
                'latest_survey_date' => $latestSurveyDate,
                'planting_date' => $activities->first()?->activity_date?->format('Y-m-d') ?? '2026-10-01',
            ],
            'charts' => [
                'planting_progress' => $plantingTrends,
                'tree_condition' => [
                    'alive' => $totalAlive,
                    'dead' => $totalDead,
                    'missing' => $totalMissing,
                    'uninspected' => $totalUninspected,
                    'total' => $totalSurveyedStatus,
                ],
                'carbon_trend' => [
                    'has_trend' => $hasDeltaC,
                    'periods_count' => $totalSurveyPeriods,
                    'empty_message' => 'Menunggu pengukuran survei lapangan periode kedua untuk menampilkan grafik tren perubahan stok karbon berkelanjutan (ΔC).',
                    'data_points' => $hasDeltaC ? [] : [],
                ],
                'species_composition' => $speciesBreakdown,
            ],
            'zones_table' => $zonesTable,
        ];
    }
}
