<?php

namespace Database\Seeders;

use App\Models\PlantingZone;
use App\Models\PlantingZonePhoto;
use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\TreeSpecies;
use App\Models\TreeSurvey;
use App\Models\TreeMaintenanceLog;
use App\Models\Hotspot;
use App\Models\Scene;
use App\Models\AppSetting;
use App\Models\ActivityLog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DemoSystemDataSeeder extends Seeder
{
    /**
     * Run the database seeds for full demo data with photos.
     */
    public function run(): void
    {
        // 1. Update Foto pada Master Jenis Pohon
        $speciesPhotos = [
            'merbau-aceh' => '/storage/demo/merbau.jpg',
            'geurundong' => '/storage/demo/geurundong.jpg',
            'gaharu-lokal' => '/storage/demo/gaharu.jpg',
            'jeumpa-aceh' => '/storage/demo/jeumpa.jpg',
            'trembesi' => '/storage/demo/trembesi.jpg',
            'salam-hutan' => '/storage/demo/salam.jpg',
        ];

        foreach ($speciesPhotos as $id => $path) {
            TreeSpecies::where('id', $id)->update(['photo_path' => $path]);
        }

        // 2. Update Kawasan Utama dengan Foto Utama & Galeri
        $zone = PlantingZone::first();
        if ($zone) {
            $zone->update([
                'main_photo_path' => '/storage/demo/kawasan_aceh.jpg',
                'gallery_photos' => [
                    '/storage/demo/kawasan_aceh.jpg',
                    '/storage/demo/penanaman_batch1.jpg',
                    '/storage/demo/merbau.jpg',
                    '/storage/demo/trembesi.jpg',
                ],
                'planting_target' => 1000,
            ]);
            $zoneId = $zone->id;
        } else {
            $zoneId = 'KW-ACEH-01';
            PlantingZone::create([
                'id' => $zoneId,
                'zone_code' => $zoneId,
                'name' => 'Kawasan Konservasi & Silvikultur ±2 Hektare Aceh',
                'category' => 'Konservasi & Silvikultur',
                'description' => 'Kawasan percontohan restorasi ekosistem berbasis vegetasi asli Aceh seluas ±2 hektare.',
                'planting_purpose' => 'Konservasi tanah lereng, restorasi tutupan kanopi, dan pengayaan pakan satwa kanopi.',
                'status' => 'active',
                'address' => 'Jl. Banda Aceh - Meulaboh, Pesisir Barat Aceh',
                'village' => 'Gampong Penanaman',
                'district' => 'Kecamatan Konservasi',
                'city' => 'Kabupaten Aceh Besar',
                'province' => 'Aceh',
                'latitude' => 5.4818556,
                'longitude' => 95.5840917,
                'area_size' => 2.0,
                'area_unit' => 'ha',
                'measurement_method' => 'Survei Lapangan & Deskriptif Patok Referensi',
                'person_in_charge' => 'Ir. Teuku Iskandar, M.Si',
                'organization' => 'IKHW Aceh',
                'planting_target' => 1000,
                'main_photo_path' => '/storage/demo/kawasan_aceh.jpg',
                'gallery_photos' => [
                    '/storage/demo/kawasan_aceh.jpg',
                    '/storage/demo/penanaman_batch1.jpg',
                    '/storage/demo/merbau.jpg',
                    '/storage/demo/trembesi.jpg',
                ],
                'is_published' => true,
            ]);
        }

        // 2b. Seed Foto Dokumentasi Galeri Kawasan (PlantingZonePhoto)
        $photosData = [
            [
                'file_path' => '/storage/demo/kawasan_aceh.jpg',
                'title' => 'Lanskap Kawasan Konservasi & Silvikultur Aceh',
                'caption' => 'Pemandangan lanskap kawasan percontohan restorasi ekosistem seluas ±2 hektare di pesisir barat Aceh.',
                'alt_text' => 'Lanskap kawasan penanaman silvikultur Aceh',
                'category' => 'Lanskap & Topografi',
                'is_cover' => true,
                'sort_order' => 1,
                'documented_at' => '2026-03-12',
            ],
            [
                'file_path' => '/storage/demo/penanaman_batch1.jpg',
                'title' => 'Kegiatan Penanaman Bibit Pohon Tahap Awal',
                'caption' => 'Aktivitas penanaman perdana 1.000 bibit pohon lokal bersama Kelompok Tani Hutan Bina Lestari dan BPDASHL.',
                'alt_text' => 'Dokumentasi penanaman bibit pohon tahap awal',
                'category' => 'Kegiatan Penanaman',
                'is_cover' => false,
                'sort_order' => 2,
                'documented_at' => '2026-03-12',
            ],
            [
                'file_path' => '/storage/demo/merbau.jpg',
                'title' => 'Bibit Pohon Merbau Aceh (Intsia bijuga)',
                'caption' => 'Bibit merbau aceh berkualitas tinggi siap tanam pada Blok A lereng konservasi tanah.',
                'alt_text' => 'Bibit pohon merbau aceh di lokasi tanam',
                'category' => 'Bibit & Spesies',
                'is_cover' => false,
                'sort_order' => 3,
                'documented_at' => '2026-04-10',
            ],
            [
                'file_path' => '/storage/demo/trembesi.jpg',
                'title' => 'Pohon Peneduh Trembesi (Samanea saman)',
                'caption' => 'Pertumbuhan vegetasi kanopi peneduh untuk menyerap karbon dan menahan limpasan air hujan.',
                'alt_text' => 'Pertumbuhan tajuk trembesi peneduh',
                'category' => 'Pertumbuhan Vegetasi',
                'is_cover' => false,
                'sort_order' => 4,
                'documented_at' => '2026-05-18',
            ],
        ];

        foreach ($photosData as $pData) {
            PlantingZonePhoto::updateOrCreate(
                [
                    'planting_zone_id' => $zoneId,
                    'file_path' => $pData['file_path'],
                ],
                [
                    'thumbnail_path' => $pData['file_path'],
                    'title' => $pData['title'],
                    'caption' => $pData['caption'],
                    'alt_text' => $pData['alt_text'],
                    'category' => $pData['category'],
                    'is_cover' => $pData['is_cover'],
                    'is_published' => true,
                    'sort_order' => $pData['sort_order'],
                    'documented_at' => $pData['documented_at'],
                ]
            );
        }

        // 3. Kegiatan Penanaman (Batch Awal 1.000 Bibit)
        $activityId = 'ACT-KW-01-A';
        $activity = PlantingActivity::updateOrCreate(
            ['id' => $activityId],
            [
                'batch_code' => 'BATCH-2026-001',
                'name' => 'Penanaman Restorasi Blok A & B Kawasan ±2 Ha Aceh',
                'activity_date' => '2026-03-12',
                'planting_zone_id' => $zoneId,
                'location_zone' => 'Blok A (Konservasi Lereng) & Blok B (Pengayaan Pakan Satwa)',
                'person_in_charge' => 'Ir. Teuku Iskandar, M.Si',
                'organizer' => 'IKHW Aceh & BPDASHL Krueng Aceh',
                'photo_path' => '/storage/demo/penanaman_batch1.jpg',
                'notes' => 'Pencatatan batch awal 1.000 bibit pohon lokal endemik dan pengayaan pakan satwa.',
            ]
        );

        // Rincian Item Penanaman (Items)
        $itemsData = [
            ['tree_species_id' => 'merbau-aceh', 'quantity' => 250, 'seed_source' => 'Persemaian Permanen BPDASHL'],
            ['tree_species_id' => 'geurundong', 'quantity' => 200, 'seed_source' => 'Bibit Cabutan Alami Terverifikasi'],
            ['tree_species_id' => 'gaharu-lokal', 'quantity' => 150, 'seed_source' => 'Pusat Pembibitan Kehutanan Aceh'],
            ['tree_species_id' => 'jeumpa-aceh', 'quantity' => 100, 'seed_source' => 'Koleksi Pembibitan IKHW Aceh'],
            ['tree_species_id' => 'trembesi', 'quantity' => 150, 'seed_source' => 'Balai Pembibitan Tanaman Hutan'],
            ['tree_species_id' => 'salam-hutan', 'quantity' => 150, 'seed_source' => 'KTH Bina Lestari'],
        ];

        PlantingActivityItem::where('planting_activity_id', $activityId)->delete();
        foreach ($itemsData as $item) {
            PlantingActivityItem::create([
                'planting_activity_id' => $activityId,
                'tree_species_id' => $item['tree_species_id'],
                'quantity' => $item['quantity'],
                'unit' => 'batang',
                'seed_source' => $item['seed_source'],
                'notes' => 'Bibit awal sehat dan bertunas kuat.',
            ]);
        }

        // 4. Survei Pemantauan (Sensus Lapangan 6 Bulan Pasca Tanam)
        $surveyId = 'SRV-KW-01-01';
        TreeSurvey::updateOrCreate(
            ['id' => $surveyId],
            [
                'planting_activity_id' => $activityId,
                'survey_date' => '2026-09-15',
                'alive_count' => 880,
                'dead_count' => 80,
                'missing_count' => 40,
                'uninspected_count' => 0,
                'average_height_cm' => 135.5,
                'average_diameter_cm' => 3.2,
                'health_condition' => 'sehat',
                'damage_symptoms' => 'Sebagian bibit di lereng tergerus limpasan air hujan deras, beberapa helai daun terserang ulat grayak.',
                'photo_path' => '/storage/demo/penanaman_batch1.jpg',
                'inspector_name' => 'Dr. Cut Mutia, S.Hut (Pengendali Ekosistem Hutan)',
                'field_notes' => 'Tingkat kelulusan hidup awal mencapai 88%, pertumbuhan kanopi vegetatif sangat memuaskan.',
                'recommendations' => 'Lakukan pemupukan kompos susulan, perbaikan ajir bambu, dan penyulaman 100 bibit pengganti.',
                'is_verified' => true,
                'is_estimate' => false,
            ]
        );

        // 5. Perawatan & Tindakan Silvikultur
        TreeMaintenanceLog::updateOrCreate(
            ['id' => 'MNT-KW-01-01'],
            [
                'planting_activity_id' => $activityId,
                'maintenance_date' => '2026-06-10',
                'action_type' => 'penyiangan',
                'plants_handled_count' => 950,
                'replacement_plants_count' => 0,
                'action_reason' => 'Pengendalian gulma ilalang dan semak perdu penyaing bibit muda.',
                'officer_or_team' => 'Kelompok Tani Hutan Bina Lestari',
                'photo_before_path' => '/storage/demo/kawasan_aceh.jpg',
                'photo_after_path' => '/storage/demo/penanaman_batch1.jpg',
                'notes' => 'Pembersihan piringan tanaman radius 1 meter dan penambahan mulsa daun.',
            ]
        );

        TreeMaintenanceLog::updateOrCreate(
            ['id' => 'MNT-KW-01-02'],
            [
                'planting_activity_id' => $activityId,
                'maintenance_date' => '2026-09-28',
                'action_type' => 'penyulaman',
                'plants_handled_count' => 120,
                'replacement_plants_count' => 100,
                'action_reason' => 'Penggantian bibit mati dan hilang hasil sensus lapangan September 2026.',
                'officer_or_team' => 'Tim Silvikultur IKHW Aceh',
                'cost' => 2500000,
                'photo_before_path' => '/storage/demo/kawasan_aceh.jpg',
                'photo_after_path' => '/storage/demo/penanaman_batch1.jpg',
                'notes' => 'Bibit sulaman dicatat terpisah agar tidak membiaskan formula kelangsungan hidup kelompok awal.',
            ]
        );

        // 6. Hubungkan Hotspot Informasi Marzipano ke Spesies Pohon & Kawasan
        $hotspots = Hotspot::all();
        $speciesKeys = array_keys($speciesPhotos);
        $idx = 0;
        foreach ($hotspots as $h) {
            $h->planting_zone_id = $zoneId;
            if ($h->type === 'info') {
                $spKey = $speciesKeys[$idx % count($speciesKeys)];
                $h->tree_species_id = $spKey;
                $h->planting_activity_id = $activityId;
                $idx++;
            }
            $h->save();
        }

        // 7. Pengaturan Logo & Identitas Aplikasi
        $existingLogo = AppSetting::getVal('app_logo');
        if (empty($existingLogo) || str_contains($existingLogo, '205509')) {
            AppSetting::setVal('app_logo', '/storage/settings/app_logo_20261018_112619.png', 'general', 'Logo Aplikasi', 'image');
        }
        if (!AppSetting::getVal('app_name')) {
            AppSetting::setVal('app_name', 'EcoLand - Virtual Tour 360°', 'general', 'Nama Aplikasi', 'text');
        }
        if (!AppSetting::getVal('organization_name')) {
            AppSetting::setVal('organization_name', 'IKHW Aceh & Mitra Konservasi', 'general', 'Nama Lembaga', 'text');
        }

        // 8. Bersihkan dummy scene/hotspot uji jika ada
        Hotspot::whereIn('scene_id', ['scene-01', 'scene-02'])->orWhere('id', 'hs-sebelum-backup')->delete();
        Scene::whereIn('id', ['scene-01', 'scene-02'])->delete();

        // 9. Audit Log / Jejak Aktivitas Riil
        ActivityLog::create([
            'user_name' => 'Administrator',
            'action' => 'Penyulaman Bibit Pohon',
            'module' => 'SILVIKULTUR',
            'target_id' => 'MNT-KW-01-02',
            'description' => 'Penyulaman 100 bibit pohon pengganti (Merbau & Geurundong) di Blok A Kawasan ±2 Ha.',
            'created_at' => now()->subDays(2),
        ]);

        ActivityLog::create([
            'user_name' => 'Dr. Cut Mutia, S.Hut',
            'action' => 'Verifikasi Sensus Pemantauan',
            'module' => 'PEMANTAUAN',
            'target_id' => 'SRV-KW-01-01',
            'description' => 'Verifikasi sensus kelangsungan hidup: 880 hidup dari 1.000 bibit awal (Survival Rate 88.0%).',
            'created_at' => now()->subDays(5),
        ]);

        ActivityLog::create([
            'user_name' => 'Ir. Teuku Iskandar, M.Si',
            'action' => 'Pencatatan Batch Penanaman',
            'module' => 'PENANAMAN',
            'target_id' => 'ACT-KW-01-A',
            'description' => 'Pencatatan kegiatan penanaman awal 1.000 bibit pohon di Kawasan Konservasi Aceh.',
            'created_at' => now()->subDays(10),
        ]);

        ActivityLog::create([
            'user_name' => 'Administrator',
            'action' => 'Pembaruan Foto & Galeri Kawasan',
            'module' => 'KAWASAN',
            'target_id' => $zoneId,
            'description' => 'Foto utama dan 4 foto galeri dokumentasi lapangan berhasil diperbarui.',
            'created_at' => now()->subDays(14),
        ]);
    }
}
