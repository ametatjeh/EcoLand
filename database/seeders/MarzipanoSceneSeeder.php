<?php

namespace Database\Seeders;

use App\Models\Hotspot;
use App\Models\Scene;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class MarzipanoSceneSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Data Scene Definitif dari Hasil Export Resmi Marzipano Tool
        $scenesData = [
            [
                'id' => '0-1-pano_20261004_100402_6',
                'name' => '1. PANO_20261004_100402_6',
                'sequence' => 1,
                'status' => 'tersedia',
                'description' => 'Panorama titik 1 kawasan penanaman pohon. Terdapat info hotspot Pohon Scooby Doo.',
                'panorama_path' => '/tiles/0-1-pano_20261004_100402_6/preview.jpg',
                'thumbnail_path' => '/tiles/0-1-pano_20261004_100402_6/preview.jpg',
                'preview_path' => '/tiles/0-1-pano_20261004_100402_6/preview.jpg',
                'latitude' => 5.481350,
                'longitude' => 95.583550,
                'face_size' => 896,
                'initial_yaw' => 0.7176204122520318,
                'initial_pitch' => 0.1800948515498284,
                'initial_fov' => 1.3945993259187417,
                'levels_json' => [
                    ['tileSize' => 256, 'size' => 256, 'fallbackOnly' => true],
                    ['tileSize' => 512, 'size' => 512],
                    ['tileSize' => 512, 'size' => 1024],
                ],
            ],
            [
                'id' => '1-2-pano_20261004_100722_7',
                'name' => '2. PANO_20261004_100722_7',
                'sequence' => 2,
                'status' => 'tersedia',
                'description' => 'Panorama titik 2 kawasan penanaman pohon. Menghubungkan ke Titik 1 dan Titik 3.',
                'panorama_path' => '/tiles/1-2-pano_20261004_100722_7/preview.jpg',
                'thumbnail_path' => '/tiles/1-2-pano_20261004_100722_7/preview.jpg',
                'preview_path' => '/tiles/1-2-pano_20261004_100722_7/preview.jpg',
                'latitude' => 5.481480,
                'longitude' => 95.583680,
                'face_size' => 896,
                'initial_yaw' => 1.5115493233731163,
                'initial_pitch' => 0.1525186886522647,
                'initial_fov' => 1.3945993259187417,
                'levels_json' => [
                    ['tileSize' => 256, 'size' => 256, 'fallbackOnly' => true],
                    ['tileSize' => 512, 'size' => 512],
                    ['tileSize' => 512, 'size' => 1024],
                ],
            ],
            [
                'id' => '2-3-pano_20261004_095925_3',
                'name' => '3. PANO_20261004_095925_3',
                'sequence' => 3,
                'status' => 'tersedia',
                'description' => 'Panorama titik 3 kawasan penanaman pohon. Terdapat info hotspot Senso Supra Natural dan Pintu Welcome.',
                'panorama_path' => '/tiles/2-3-pano_20261004_095925_3/preview.jpg',
                'thumbnail_path' => '/tiles/2-3-pano_20261004_095925_3/preview.jpg',
                'preview_path' => '/tiles/2-3-pano_20261004_095925_3/preview.jpg',
                'latitude' => 5.481610,
                'longitude' => 95.583810,
                'face_size' => 896,
                'initial_yaw' => 0.37979756719106206,
                'initial_pitch' => 0.04846658243499746,
                'initial_fov' => 1.3945993259187417,
                'levels_json' => [
                    ['tileSize' => 256, 'size' => 256, 'fallbackOnly' => true],
                    ['tileSize' => 512, 'size' => 512],
                    ['tileSize' => 512, 'size' => 1024],
                ],
            ],
            [
                'id' => '3-4-pano_20261004_101937_11',
                'name' => '4. PANO_20261004_101937_11',
                'sequence' => 4,
                'status' => 'tersedia',
                'description' => 'Panorama titik 4 kawasan penanaman pohon. Terdapat info hotspot Master Magic.',
                'panorama_path' => '/tiles/3-4-pano_20261004_101937_11/preview.jpg',
                'thumbnail_path' => '/tiles/3-4-pano_20261004_101937_11/preview.jpg',
                'preview_path' => '/tiles/3-4-pano_20261004_101937_11/preview.jpg',
                'latitude' => 5.481740,
                'longitude' => 95.583940,
                'face_size' => 896,
                'initial_yaw' => 0.6722519287210993,
                'initial_pitch' => 0.18301033113915643,
                'initial_fov' => 1.3945993259187417,
                'levels_json' => [
                    ['tileSize' => 256, 'size' => 256, 'fallbackOnly' => true],
                    ['tileSize' => 512, 'size' => 512],
                    ['tileSize' => 512, 'size' => 1024],
                ],
            ],
            [
                'id' => '4-32-pano_20261004_095509_0',
                'name' => '3.2 PANO_20261004_095509_0',
                'sequence' => 5,
                'status' => 'tersedia',
                'description' => 'Panorama titik 3.2 kawasan penanaman pohon.',
                'panorama_path' => '/tiles/4-32-pano_20261004_095509_0/preview.jpg',
                'thumbnail_path' => '/tiles/4-32-pano_20261004_095509_0/preview.jpg',
                'preview_path' => '/tiles/4-32-pano_20261004_095509_0/preview.jpg',
                'latitude' => 5.481870,
                'longitude' => 95.584070,
                'face_size' => 896,
                'initial_yaw' => 0.0,
                'initial_pitch' => 0.0,
                'initial_fov' => 1.5707963267948966,
                'levels_json' => [
                    ['tileSize' => 256, 'size' => 256, 'fallbackOnly' => true],
                    ['tileSize' => 512, 'size' => 512],
                    ['tileSize' => 512, 'size' => 1024],
                ],
            ],
            [
                'id' => '5-5-pano_20261004_103130_17-2',
                'name' => '5. PANO_20261004_103130_17 (2)',
                'sequence' => 6,
                'status' => 'tersedia',
                'description' => 'Panorama titik 5 kawasan penanaman pohon. Terdapat info hotspot Pengusaha Madu Rimba.',
                'panorama_path' => '/tiles/5-5-pano_20261004_103130_17-2/preview.jpg',
                'thumbnail_path' => '/tiles/5-5-pano_20261004_103130_17-2/preview.jpg',
                'preview_path' => '/tiles/5-5-pano_20261004_103130_17-2/preview.jpg',
                'latitude' => 5.482000,
                'longitude' => 95.584200,
                'face_size' => 896,
                'initial_yaw' => 2.8857007275322193,
                'initial_pitch' => -0.238303625498979,
                'initial_fov' => 1.3945993259187417,
                'levels_json' => [
                    ['tileSize' => 256, 'size' => 256, 'fallbackOnly' => true],
                    ['tileSize' => 512, 'size' => 512],
                    ['tileSize' => 512, 'size' => 1024],
                ],
            ],
        ];

        foreach ($scenesData as $s) {
            Scene::updateOrCreate(['id' => $s['id']], $s);
        }

        // 2. Muat Data Hotspot Awal yang Tersedia di public/data/hotspots.json jika ada
        $hotspotsFile = public_path('data/hotspots.json');
        if (File::exists($hotspotsFile)) {
            $json = json_decode(File::get($hotspotsFile), true);
            if (!empty($json['hotspots']) && is_array($json['hotspots'])) {
                foreach ($json['hotspots'] as $hs) {
                    Hotspot::updateOrCreate(
                        ['id' => $hs['id']],
                        [
                            'scene_id' => $hs['sceneId'],
                            'type' => $hs['type'],
                            'yaw' => (float) $hs['yaw'],
                            'pitch' => (float) $hs['pitch'],
                            'rotation' => (float) ($hs['rotation'] ?? 0.0),
                            'target_scene_id' => $hs['target'] ?? null,
                            'title' => $hs['title'] ?? null,
                            'text' => $hs['text'] ?? null,
                            'icon' => $hs['icon'] ?? ($hs['type'] === 'link' ? 'arrow' : 'info'),
                            'is_active' => isset($hs['isActive']) ? (bool) $hs['isActive'] : true,
                            'status' => $hs['status'] ?? 'published',
                            'source' => $hs['source'] ?? 'export',
                        ]
                    );
                }
            }
        }
    }
}
