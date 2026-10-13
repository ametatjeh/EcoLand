<?php

namespace App\Http\Controllers;

use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\TreeSpecies;
use App\Models\TreeSurvey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TreeImportExportController extends Controller
{
    /**
     * Download template CSV resmi untuk impor data penanaman.
     */
    public function downloadTemplate(string $type = 'species')
    {
        if ($type === 'species') {
            $rows = [
                ['common_name', 'scientific_name', 'local_name', 'family', 'origin_status', 'ecological_function', 'benefits', 'description'],
                ['Bungur', 'Lagerstroemia speciosa', 'Bungur Aceh', 'Lythraceae', 'lokal_asli', 'Peneduh dan perlindungan sempadan', 'Kayu dan ornamen', 'Pohon berkanopi lebat bunga ungu.'],
                ['Trembesi', 'Samanea saman', 'Kayu Ambon', 'Fabaceae', 'introduksi', 'Peneduh jalan dan penyerap karbon tinggi', 'Kayu perkakas', 'Pohon besar berdaun majemuk.'],
            ];
            $filename = 'template_impor_jenis_pohon.csv';
        } else {
            $rows = [
                ['batch_code', 'activity_name', 'activity_date', 'person_in_charge', 'organizer', 'location_zone', 'scientific_name', 'quantity', 'unit'],
                ['BATCH-2026-01', 'Penanaman Blok Utara', '2026-10-15', 'Teuku Fajar', 'IKHW Aceh', 'Area Penanaman 01', 'Lagerstroemia speciosa', '50', 'batang'],
                ['BATCH-2026-01', 'Penanaman Blok Utara', '2026-10-15', 'Teuku Fajar', 'IKHW Aceh', 'Area Penanaman 01', 'Samanea saman', '30', 'batang'],
            ];
            $filename = 'template_impor_kegiatan_penanaman.csv';
        }

        $headers = [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ];

        return response()->stream(function () use ($rows) {
            $h = fopen('php://output', 'w');
            fprintf($h, chr(0xEF).chr(0xBB).chr(0xBF));
            foreach ($rows as $r) {
                fputcsv($h, $r, ';');
            }
            fclose($h);
        }, 200, $headers);
    }

    /**
     * Pratinjau (Preview) & Validasi Data Impor CSV sebelum disimpan permanen.
     */
    public function previewImport(Request $request)
    {
        $request->validate([
            'file' => ['required', 'file', 'mimes:csv,txt', 'max:5120'],
            'type' => ['required', 'string', 'in:species,activities'],
        ]);

        $file = $request->file('file');
        $type = $request->input('type');

        $content = file_get_contents($file->getRealPath());
        $lines = array_filter(explode("\n", str_replace("\r", "", $content)));

        if (count($lines) < 2) {
            return response()->json([
                'success' => false,
                'message' => 'Berkas CSV kosong atau tidak memiliki baris data.',
            ], 422);
        }

        $delimiter = strpos($lines[0], ';') !== false ? ';' : ',';
        $header = str_getcsv(array_shift($lines), $delimiter);
        $header = array_map('trim', $header);

        $validRows = [];
        $invalidRows = [];

        if ($type === 'species') {
            $existingScientific = TreeSpecies::pluck('id', 'scientific_name')->all();

            foreach ($lines as $lineNum => $line) {
                if (trim($line) === '') continue;
                $row = str_getcsv($line, $delimiter);
                $rowData = array_combine(array_slice($header, 0, count($row)), $row);

                $commonName = trim($rowData['common_name'] ?? '');
                $scientificName = trim($rowData['scientific_name'] ?? '');
                $originStatus = trim($rowData['origin_status'] ?? 'belum_diverifikasi');

                $errors = [];
                if (!$commonName) $errors[] = 'common_name wajib diisi';
                if (!$scientificName) $errors[] = 'scientific_name wajib diisi';
                if ($scientificName && isset($existingScientific[$scientificName])) {
                    $errors[] = "Spesies '{$scientificName}' sudah ada di database (duplikasi)";
                }
                if (!in_array($originStatus, ['lokal_asli', 'introduksi', 'belum_diverifikasi'])) {
                    $errors[] = 'origin_status harus lokal_asli, introduksi, atau belum_diverifikasi';
                }

                if (!empty($errors)) {
                    $invalidRows[] = [
                        'line' => $lineNum + 2,
                        'data' => $rowData,
                        'errors' => $errors,
                    ];
                } else {
                    $validRows[] = [
                        'line' => $lineNum + 2,
                        'common_name' => $commonName,
                        'scientific_name' => $scientificName,
                        'local_name' => trim($rowData['local_name'] ?? ''),
                        'family' => trim($rowData['family'] ?? ''),
                        'origin_status' => $originStatus,
                        'ecological_function' => trim($rowData['ecological_function'] ?? ''),
                        'benefits' => trim($rowData['benefits'] ?? ''),
                        'description' => trim($rowData['description'] ?? ''),
                    ];
                }
            }
        } else {
            // Activities import
            $speciesMap = TreeSpecies::pluck('id', 'scientific_name')->all();
            $existingBatches = PlantingActivity::pluck('id', 'batch_code')->all();

            foreach ($lines as $lineNum => $line) {
                if (trim($line) === '') continue;
                $row = str_getcsv($line, $delimiter);
                $rowData = array_combine(array_slice($header, 0, count($row)), $row);

                $batchCode = trim($rowData['batch_code'] ?? '');
                $activityName = trim($rowData['activity_name'] ?? '');
                $activityDate = trim($rowData['activity_date'] ?? '');
                $scientificName = trim($rowData['scientific_name'] ?? '');
                $quantity = (int) ($rowData['quantity'] ?? 0);

                $errors = [];
                if (!$batchCode) $errors[] = 'batch_code wajib diisi';
                if (!$activityName) $errors[] = 'activity_name wajib diisi';
                if (!$activityDate || !strtotime($activityDate)) $errors[] = 'activity_date tidak valid (format: YYYY-MM-DD)';
                if ($quantity <= 0) $errors[] = 'quantity harus lebih besar dari 0';
                if (!$scientificName || !isset($speciesMap[$scientificName])) {
                    $errors[] = "Spesies '{$scientificName}' tidak ditemukan di master data";
                }

                if (!empty($errors)) {
                    $invalidRows[] = [
                        'line' => $lineNum + 2,
                        'data' => $rowData,
                        'errors' => $errors,
                    ];
                } else {
                    $validRows[] = [
                        'line' => $lineNum + 2,
                        'batch_code' => $batchCode,
                        'name' => $activityName,
                        'activity_date' => $activityDate,
                        'person_in_charge' => trim($rowData['person_in_charge'] ?? '-'),
                        'organizer' => trim($rowData['organizer'] ?? '-'),
                        'location_zone' => trim($rowData['location_zone'] ?? 'Area Penanaman'),
                        'tree_species_id' => $speciesMap[$scientificName],
                        'scientific_name' => $scientificName,
                        'quantity' => $quantity,
                        'unit' => trim($rowData['unit'] ?? 'batang'),
                    ];
                }
            }
        }

        return response()->json([
            'success' => true,
            'type' => $type,
            'total_rows' => count($validRows) + count($invalidRows),
            'valid_count' => count($validRows),
            'invalid_count' => count($invalidRows),
            'valid_preview' => array_slice($validRows, 0, 10),
            'valid_data' => $validRows,
            'invalid_rows' => $invalidRows,
            'ready_to_import' => count($validRows) > 0,
        ]);
    }

    /**
     * Eksekusi Simpan Data Impor setelah konfirmasi admin.
     * Tidak menghapus data lama yang sudah ada.
     */
    public function executeImport(Request $request)
    {
        $request->validate([
            'type' => ['required', 'string', 'in:species,activities'],
            'data' => ['required', 'array', 'min:1'],
            'confirm' => ['required', 'boolean', 'accepted'],
        ]);

        $type = $request->input('type');
        $rows = $request->input('data');

        return DB::transaction(function () use ($type, $rows) {
            $insertedCount = 0;

            if ($type === 'species') {
                foreach ($rows as $item) {
                    TreeSpecies::create([
                        'common_name' => $item['common_name'],
                        'scientific_name' => $item['scientific_name'],
                        'local_name' => $item['local_name'] ?: null,
                        'family' => $item['family'] ?: null,
                        'origin_status' => $item['origin_status'] ?? 'belum_diverifikasi',
                        'ecological_function' => $item['ecological_function'] ?: null,
                        'benefits' => $item['benefits'] ?: null,
                        'description' => $item['description'] ?: null,
                        'is_active' => true,
                    ]);
                    $insertedCount++;
                }
            } else {
                // Group by batch_code
                $grouped = collect($rows)->groupBy('batch_code');
                foreach ($grouped as $batchCode => $items) {
                    $first = $items->first();
                    $activity = PlantingActivity::firstOrCreate(
                        ['batch_code' => $batchCode],
                        [
                            'name' => $first['name'],
                            'activity_date' => $first['activity_date'],
                            'person_in_charge' => $first['person_in_charge'],
                            'organizer' => $first['organizer'],
                            'location_zone' => $first['location_zone'],
                        ]
                    );

                    foreach ($items as $it) {
                        PlantingActivityItem::create([
                            'planting_activity_id' => $activity->id,
                            'tree_species_id' => $it['tree_species_id'],
                            'quantity' => $it['quantity'],
                            'unit' => $it['unit'] ?? 'batang',
                        ]);
                        $insertedCount++;
                    }
                }
            }

            return response()->json([
                'success' => true,
                'message' => "Berhasil mengimpor {$insertedCount} data ke database tanpa merusak data lama.",
                'count' => $insertedCount,
            ]);
        });
    }
}
