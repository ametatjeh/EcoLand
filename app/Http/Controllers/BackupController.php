<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImportBackupRequest;
use App\Models\Hotspot;
use App\Models\Scene;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BackupController extends Controller
{
    /**
     * Ekspor konfigurasi seluruh hotspot ke format JSON standar (Persyaratan 9).
     */
    public function export()
    {
        $hotspots = Hotspot::orderBy('scene_id')->orderBy('created_at')->get();
        $scenes = Scene::select('id', 'name')->get();

        $backupPayload = [
            'exportType' => 'marzipano_hotspots_backup',
            'version' => '1.1.0',
            'exportedAt' => now()->toIso8601String(),
            'project' => 'Virtual Tour Kawasan Penanaman Pohon ±2 Hektare Aceh',
            'totalHotspots' => $hotspots->count(),
            'validScenes' => $scenes->pluck('id')->all(),
            'data' => [
                'version' => '1.1.0',
                'lastUpdated' => now()->toIso8601String(),
                'hotspots' => $hotspots->map->toFrontendArray()->values()->all(),
            ],
        ];

        return response()->json($backupPayload, 200, [
            'Content-Disposition' => 'attachment; filename="vtour_hotspots_backup_' . date('Ymd_His') . '.json"',
        ]);
    }

    /**
     * Impor cadangan konfigurasi hotspot dari berkas JSON (Persyaratan 9).
     * Dilengkapi validasi referensi scene dan perlindungan terhadap penimpaan data yang tidak disengaja.
     */
    public function import(ImportBackupRequest $request)
    {
        $rawHotspots = $request->input('hotspots') ?? $request->input('data.hotspots');
        $confirmOverwrite = (bool) $request->input('confirm_overwrite', false);

        // 1. Perlindungan Penimpaan Data (Anti-Accidental Overwrite Protection)
        $existingCount = Hotspot::count();
        if ($existingCount > 0 && !$confirmOverwrite) {
            return response()->json([
                'success' => false,
                'requires_confirmation' => true,
                'message' => "Perlindungan Penimpaan Data Aktif: Database saat ini memiliki {$existingCount} hotspot aktif. " .
                             "Untuk mencegah hilangnya perubahan secara tidak sengaja, tambahkan opsi 'confirm_overwrite: true' untuk melanjutkan impor.",
                'existingCount' => $existingCount,
                'importCount' => count($rawHotspots),
            ], 409); // 409 Conflict
        }

        // 2. Validasi Referensi Scene (Scene Reference Validation)
        $validSceneIds = Scene::pluck('id')->all();
        $invalidSourceScenes = [];
        $invalidTargetScenes = [];

        foreach ($rawHotspots as $idx => $hs) {
            $sceneId = $hs['sceneId'] ?? $hs['scene_id'] ?? null;
            if (!$sceneId || !in_array($sceneId, $validSceneIds)) {
                $invalidSourceScenes[] = "Baris {$idx}: sceneId '{$sceneId}' tidak ada di database";
            }

            $type = $hs['type'] ?? 'link';
            $target = $hs['target'] ?? $hs['target_scene_id'] ?? null;
            if ($type === 'link' && $target && !in_array($target, $validSceneIds)) {
                $invalidTargetScenes[] = "Baris {$idx}: target scene '{$target}' tidak terdaftar";
            }
        }

        if (!empty($invalidSourceScenes) || !empty($invalidTargetScenes)) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi integritas berkas cadangan gagal: Terdapat referensi scene yang tidak cocok dengan proyek.',
                'errors' => [
                    'invalid_source_scenes' => array_unique($invalidSourceScenes),
                    'invalid_target_scenes' => array_unique($invalidTargetScenes),
                ],
            ], 422);
        }

        // 3. Eksekusi Impor dalam Database Transaction
        return DB::transaction(function () use ($rawHotspots, $confirmOverwrite) {
            if ($confirmOverwrite) {
                // Bersihkan hotspot lama dengan aman
                Hotspot::truncate();
            }

            $imported = [];
            foreach ($rawHotspots as $hs) {
                $type = $hs['type'] ?? 'link';
                $id = !empty($hs['id']) ? $hs['id'] : (($type === 'link' ? 'link' : 'info') . '-' . Str::random(8));

                $hotspot = Hotspot::create([
                    'id' => $id,
                    'scene_id' => $hs['sceneId'] ?? $hs['scene_id'],
                    'type' => $type,
                    'yaw' => (float) ($hs['yaw'] ?? 0.0),
                    'pitch' => (float) ($hs['pitch'] ?? 0.0),
                    'rotation' => (float) ($hs['rotation'] ?? 0.0),
                    'target_scene_id' => ($type === 'link') ? ($hs['target'] ?? $hs['target_scene_id'] ?? null) : null,
                    'title' => $hs['title'] ?? null,
                    'text' => $hs['text'] ?? null,
                    'icon' => $hs['icon'] ?? ($type === 'link' ? 'arrow' : 'info'),
                    'is_active' => isset($hs['isActive']) ? (bool) $hs['isActive'] : (isset($hs['is_active']) ? (bool) $hs['is_active'] : true),
                    'status' => $hs['status'] ?? 'published',
                    'source' => $hs['source'] ?? 'backup_import',
                ]);

                $imported[] = $hotspot;
            }

            return response()->json([
                'success' => true,
                'message' => "Berhasil memulihkan " . count($imported) . " hotspot dari berkas cadangan!",
                'count' => count($imported),
            ]);
        });
    }
}
