<?php

namespace App\Http\Controllers;

use App\Models\PlantingActivity;
use App\Models\TreeMaintenanceLog;
use App\Models\TreeSpecies;
use App\Models\TreeSurvey;
use Illuminate\Http\Request;

class TreeReportController extends Controller
{
    /**
     * Ekspor Laporan Ringkasan Penanaman dan Kelangsungan Hidup ke CSV.
     */
    public function exportPlantingSummaryCsv()
    {
        $activities = PlantingActivity::with(['items.species', 'scene', 'surveys' => fn($q) => $q->orderBy('survey_date', 'desc')])
            ->orderBy('activity_date', 'desc')
            ->get();

        $csvRows = [];
        $csvRows[] = ['Kode Batch', 'Nama Kegiatan', 'Tanggal Tanam', 'Zona Lokasi', 'Panorama Ref', 'Total Bibit Awal', 'Spesies Ditanam', 'Survei Terakhir', 'Tanaman Hidup', 'Kelangsungan Hidup (%)', 'Bibit Penyulaman', 'Pelaksana'];

        foreach ($activities as $act) {
            $latest = $act->latest_survey;
            $spList = $act->items->map(fn($it) => "{$it->species?->common_name} ({$it->quantity} {$it->unit})")->join('; ');
            $survivalRate = $act->survival_rate !== null ? "{$act->survival_rate}%" : 'Data Belum Lengkap';

            $csvRows[] = [
                $act->batch_code,
                $act->name,
                $act->activity_date?->format('Y-m-d') ?? '',
                $act->location_zone,
                $act->scene?->name ?? 'Belum terhubung',
                $act->total_initial_seedlings,
                $spList,
                $latest?->survey_date?->format('Y-m-d') ?? 'Belum ada survei',
                $latest?->alive_count ?? '-',
                $survivalRate,
                $act->total_replacements_count,
                $act->organizer,
            ];
        }

        return $this->downloadCsvResponse($csvRows, 'laporan_penanaman_pohon_' . date('Ymd_His') . '.csv');
    }

    /**
     * Ekspor Master Jenis Pohon ke CSV.
     */
    public function exportSpeciesCsv()
    {
        $species = TreeSpecies::withCount('activityItems')->orderBy('common_name')->get();
        $csvRows = [];
        $csvRows[] = ['ID Spesies', 'Nama Umum', 'Nama Ilmiah', 'Nama Lokal', 'Famili', 'Status Asal', 'Fungsi Ekologis', 'Total Ditanam (Bibit)', 'Status Aktif'];

        foreach ($species as $s) {
            $csvRows[] = [
                $s->id,
                $s->common_name,
                $s->scientific_name,
                $s->local_name ?? '-',
                $s->family ?? '-',
                $s->origin_status,
                $s->ecological_function ?? '-',
                $s->total_planted_count,
                $s->is_active ? 'Aktif' : 'Nonaktif',
            ];
        }

        return $this->downloadCsvResponse($csvRows, 'master_jenis_pohon_' . date('Ymd_His') . '.csv');
    }

    /**
     * Ekspor Catatan Survei Pemantauan ke CSV.
     */
    public function exportSurveysCsv()
    {
        $surveys = TreeSurvey::with(['activity', 'species'])->orderBy('survey_date', 'desc')->get();
        $csvRows = [];
        $csvRows[] = ['ID Survei', 'Tanggal Survei', 'Kode Batch', 'Zona Lokasi', 'Spesies Spesifik', 'Bibit Hidup Awal', 'Mati', 'Hilang', 'Belum Diperiksa', 'Kondisi Kesehatan', 'Tinggi Rata-rata (cm)', 'Diameter (cm)', 'Petugas', 'Catatan Lapangan'];

        foreach ($surveys as $srv) {
            $csvRows[] = [
                $srv->id,
                $srv->survey_date?->format('Y-m-d'),
                $srv->activity?->batch_code ?? '-',
                $srv->activity?->location_zone ?? '-',
                $srv->species?->common_name ?? 'Seluruh Batch',
                $srv->alive_count,
                $srv->dead_count,
                $srv->missing_count,
                $srv->uninspected_count,
                $srv->health_condition,
                $srv->average_height_cm ?? '-',
                $srv->average_diameter_cm ?? '-',
                $srv->inspector_name,
                $srv->field_notes ?? '-',
            ];
        }

        return $this->downloadCsvResponse($csvRows, 'catatan_survei_pemantauan_' . date('Ymd_His') . '.csv');
    }

    /**
     * Helper membuat response stream CSV.
     */
    protected function downloadCsvResponse(array $rows, string $fileName)
    {
        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$fileName}\"",
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0',
        ];

        $callback = function () use ($rows) {
            $handle = fopen('php://output', 'w');
            // Tulis BOM UTF-8 agar Excel membuka teks karakter dengan benar
            fprintf($handle, chr(0xEF).chr(0xBB).chr(0xBF));
            foreach ($rows as $row) {
                fputcsv($handle, $row, ';');
            }
            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
