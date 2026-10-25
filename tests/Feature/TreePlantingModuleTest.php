<?php

namespace Tests\Feature;

use App\Models\Hotspot;
use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\Scene;
use App\Models\TreeMaintenanceLog;
use App\Models\TreeSpecies;
use App\Models\TreeSurvey;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class TreePlantingModuleTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected string $adminToken;
    protected Scene $scene;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin IKHW',
            'username' => 'admin_test',
            'email' => 'admin_test@local.id',
            'password' => Hash::make('password123'),
            'role' => 'administrator',
        ]);

        $this->adminToken = $this->admin->createToken('test_tree_token')->plainTextToken;

        $this->scene = Scene::create([
            'id' => '0-1-pano_20261004_100402_6',
            'name' => '1. PANO_Titik_1',
            'sequence' => 1,
            'status' => 'tersedia',
            'panorama_path' => '/tiles/0-1/preview.jpg',
            'initial_yaw' => 0.7,
            'initial_pitch' => 0.1,
            'initial_fov' => 1.4,
        ]);
    }

    /**
     * Skenario 1: Admin dapat menambahkan jenis pohon (dengan cek unik nama ilmiah).
     */
    public function test_admin_can_add_tree_species_and_prevent_duplicates()
    {
        // 1. Tambah jenis pohon pertama
        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/trees/species', [
                'common_name' => 'Bungur',
                'scientific_name' => 'Lagerstroemia speciosa',
                'local_name' => 'Bungur Aceh',
                'family' => 'Lythraceae',
                'origin_status' => 'lokal_asli',
                'ecological_function' => 'Peneduh dan penstabil tanah sempadan',
                'benefits' => 'Kayu perkakas dan tanaman estetika',
            ]);

        $res->assertStatus(201)
            ->assertJson([
                'success' => true,
                'species' => [
                    'common_name' => 'Bungur',
                    'scientific_name' => 'Lagerstroemia speciosa',
                ],
            ]);

        // 2. Duplikasi spesies dengan nama ilmiah sama harus ditolak
        $duplicateRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/trees/species', [
                'common_name' => 'Bungur Duplikat',
                'scientific_name' => 'Lagerstroemia speciosa',
                'origin_status' => 'lokal_asli',
            ]);

        $duplicateRes->assertStatus(422)
            ->assertJsonValidationErrors(['scientific_name']);
    }

    /**
     * Skenario 2 & 3: Admin dapat mencatat kegiatan dengan beberapa jenis pohon,
     * dan jumlah bibit awal tersimpan secara historis serta dapat dikoreksi.
     */
    public function test_admin_can_record_activity_with_multiple_species_and_correct_initial_quantity()
    {
        $sp1 = TreeSpecies::create([
            'id' => 'bungur',
            'common_name' => 'Bungur',
            'scientific_name' => 'Lagerstroemia speciosa',
            'origin_status' => 'lokal_asli',
        ]);

        $sp2 = TreeSpecies::create([
            'id' => 'trembesi',
            'common_name' => 'Trembesi',
            'scientific_name' => 'Samanea saman',
            'origin_status' => 'introduksi',
        ]);

        // Simpan kegiatan dengan 2 jenis pohon
        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/trees/activities', [
                'batch_code' => 'BATCH-2026-01',
                'name' => 'Penanaman Sesi 1 Kawasan Aceh',
                'activity_date' => '2026-10-15',
                'person_in_charge' => 'Teuku Fajar',
                'organizer' => 'Tim IKHW Aceh',
                'location_zone' => 'Area Penanaman 01',
                'scene_id' => $this->scene->id,
                'items' => [
                    ['tree_species_id' => $sp1->id, 'quantity' => 100, 'unit' => 'batang'],
                    ['tree_species_id' => $sp2->id, 'quantity' => 50, 'unit' => 'batang'],
                ],
            ]);

        $res->assertStatus(201)
            ->assertJson([
                'success' => true,
                'activity' => [
                    'batch_code' => 'BATCH-2026-01',
                    'location_zone' => 'Area Penanaman 01',
                ],
            ]);

        $activity = PlantingActivity::where('batch_code', 'BATCH-2026-01')->first();
        $this->assertNotNull($activity);
        $this->assertEquals(150, $activity->total_initial_seedlings);

        // Uji Koreksi Jumlah Bibit Awal
        $firstItem = $activity->items()->first();
        $correctRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/trees/activities/items/{$firstItem->id}/correct", [
                'new_quantity' => 110,
                'reason' => 'Koreksi penambahan 10 bibit yang belum terhitung pada saat bongkar muat.',
            ]);

        $correctRes->assertStatus(200);
        $firstItem->refresh();
        $this->assertEquals(110, $firstItem->quantity);
        $this->assertStringContainsString('Koreksi penambahan 10 bibit', $firstItem->correction_log);

        // Uji Update Kegiatan dan Detail Jenis Pohon (Memastikan string ID diterima dan data diperbarui tanpa duplikasi)
        $updateRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->putJson("/api/admin/trees/activities/{$activity->id}", [
                'name' => 'Penanaman Pohon Blok Utara Kawasan (Diperbarui)',
                'activity_date' => '2026-08-16',
                'location_zone' => 'Area Penanaman 01 - Revisi',
                'person_in_charge' => 'Koordinator Lapangan',
                'organizer' => 'Tim IKHW Aceh',
                'notes' => 'Catatan revisi kegiatan penanaman.',
                'items' => [
                    ['id' => $firstItem->id, 'tree_species_id' => $sp1->id, 'quantity' => 120, 'unit' => 'batang'],
                    ['tree_species_id' => $sp2->id, 'quantity' => 60, 'unit' => 'batang'],
                ],
            ]);

        $updateRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Data kegiatan penanaman berhasil diperbarui.',
            ]);

        $activity->refresh();
        $this->assertEquals('Penanaman Pohon Blok Utara Kawasan (Diperbarui)', $activity->name);
        $this->assertEquals(180, $activity->total_initial_seedlings);
        $this->assertEquals(2, $activity->items()->count());

        // Uji validasi penolakan ketika tree_species_id tidak valid
        $invalidRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->putJson("/api/admin/trees/activities/{$activity->id}", [
                'items' => [
                    ['tree_species_id' => 'spesies-tidak-ada', 'quantity' => 10],
                ],
            ]);
        $invalidRes->assertStatus(422);
    }

    /**
     * Skenario 4 & 5: Admin dapat mencatat beberapa survei pada tanggal berbeda
     * dan survei lama tidak tertimpa.
     */
    public function test_multiple_surveys_on_different_dates_do_not_overwrite_historical_records()
    {
        $sp = TreeSpecies::create([
            'id' => 'jeumpa',
            'common_name' => 'Cempaka Kuning (Jeumpa)',
            'scientific_name' => 'Magnolia champaca',
            'origin_status' => 'lokal_asli',
        ]);

        $act = PlantingActivity::create([
            'id' => 'ACT-TEST-01',
            'batch_code' => 'BATCH-JEUMPA-01',
            'name' => 'Penanaman Pohon Jeumpa',
            'activity_date' => '2026-09-01',
            'person_in_charge' => 'Iskandar',
            'organizer' => 'IKHW',
            'location_zone' => 'Zona Utara',
        ]);

        PlantingActivityItem::create([
            'planting_activity_id' => $act->id,
            'tree_species_id' => $sp->id,
            'quantity' => 100,
        ]);

        // Survei 1 (Bulan ke-1)
        $srv1 = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/trees/surveys', [
                'survey_date' => '2026-10-01',
                'planting_activity_id' => $act->id,
                'alive_count' => 95,
                'dead_count' => 5,
                'health_condition' => 'sangat_baik',
                'inspector_name' => 'Surveyor A',
            ]);
        $srv1->assertStatus(201);

        // Survei 2 (Bulan ke-2)
        $srv2 = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/trees/surveys', [
                'survey_date' => '2026-11-01',
                'planting_activity_id' => $act->id,
                'alive_count' => 88,
                'dead_count' => 10,
                'missing_count' => 2,
                'health_condition' => 'baik',
                'inspector_name' => 'Surveyor B',
            ]);
        $srv2->assertStatus(201);

        // Verifikasi bahwa ada 2 catatan survei historis terpisah
        $this->assertEquals(2, TreeSurvey::where('planting_activity_id', $act->id)->count());

        $act->refresh();
        // Survei terbaru harus bertanggal 2026-11-01 dengan 88 hidup
        $this->assertEquals('2026-11-01', $act->latest_survey->survey_date->format('Y-m-d'));
        $this->assertEquals(88, $act->latest_survey->alive_count);

        // Uji Update Tanggal Survei dan Serialisasi API YYYY-MM-DD
        $surveyRecord = TreeSurvey::where('planting_activity_id', $act->id)->first();
        $updateSrvRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->putJson("/api/admin/trees/surveys/{$surveyRecord->id}", [
                'survey_date' => '2026-10-15',
                'alive_count' => 96,
                'dead_count' => 4,
            ]);

        $updateSrvRes->assertStatus(200);
        $surveyRecord->refresh();
        $this->assertEquals('2026-10-15', $surveyRecord->survey_date->format('Y-m-d'));
        $this->assertEquals('2026-10-15', $surveyRecord->toArray()['survey_date']);
    }

    /**
     * Skenario 6 & 7: Perhitungan kelangsungan hidup mengikuti rumus:
     * (tanaman hidup kelompok awal / bibit awal ditanam) * 100%.
     * Bibit penyulaman disimpan terpisah dan TIDAK mencemari persentase kelompok awal.
     */
    public function test_survival_rate_formula_and_replanting_separation()
    {
        $sp = TreeSpecies::create([
            'id' => 'ulin',
            'common_name' => 'Ulin',
            'scientific_name' => 'Eusideroxylon zwageri',
            'origin_status' => 'lokal_asli',
        ]);

        $act = PlantingActivity::create([
            'id' => 'ACT-ULIN',
            'batch_code' => 'BATCH-ULIN',
            'name' => 'Penanaman Ulin',
            'activity_date' => '2026-08-01',
            'person_in_charge' => 'Zulkifli',
            'organizer' => 'IKHW',
            'location_zone' => 'Zona Inti',
        ]);

        PlantingActivityItem::create([
            'planting_activity_id' => $act->id,
            'tree_species_id' => $sp->id,
            'quantity' => 200, // 200 bibit awal
        ]);

        // Survei: 160 hidup dari 200 bibit awal (160 / 200 = 80%)
        TreeSurvey::create([
            'id' => 'SRV-ULIN-1',
            'survey_date' => '2026-09-15',
            'planting_activity_id' => $act->id,
            'alive_count' => 160,
            'dead_count' => 40,
            'health_condition' => 'baik',
            'inspector_name' => 'Petugas M',
            'is_verified' => true,
        ]);

        // Penyulaman: Menanam 40 bibit pengganti
        $maintRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/trees/maintenance', [
                'maintenance_date' => '2026-09-20',
                'planting_activity_id' => $act->id,
                'action_type' => 'penyulaman',
                'replacement_plants_count' => 40,
                'plants_handled_count' => 40,
                'officer_or_team' => 'Tim Penyulam IKHW',
                'action_reason' => 'Penyulaman 40 bibit yang mati karena kekeringan.',
            ]);
        $maintRes->assertStatus(201);

        $act->refresh();

        // 1. Total bibit awal tetap 200 (tidak berubah)
        $this->assertEquals(200, $act->total_initial_seedlings);

        // 2. Bibit penyulaman tercatat 40 secara terpisah
        $this->assertEquals(40, $act->total_replacements_count);

        // 3. Kelangsungan hidup kelompok awal tetap 80% (160 / 200 * 100), BUKAN (160+40)/200
        $this->assertEquals(80.0, $act->survival_rate);

        // 4. Periksa pada API dashboard
        $dashRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->getJson('/api/admin/trees/dashboard');

        $dashRes->assertStatus(200)
            ->assertJson([
                'indicators' => [
                    'total_initial_seedlings' => 200,
                    'total_alive_initial' => 160,
                    'total_replacements' => 40,
                    'survival_rate' => 80.0,
                    'survival_rate_status' => 'terverifikasi',
                ],
            ]);
    }

    /**
     * Skenario 8 & 9: Hotspot Marzipano dapat terhubung ke jenis pohon atau kegiatan penanaman,
     * dan konten dinamis terpublikasi tampil di API Marzipano dan halaman publik.
     */
    public function test_hotspot_integrates_with_tree_data_and_reflects_in_marzipano()
    {
        $sp = TreeSpecies::create([
            'id' => 'mahoni',
            'common_name' => 'Mahoni',
            'scientific_name' => 'Swietenia mahagoni',
            'local_name' => 'Mahoni',
            'family' => 'Meliaceae',
            'origin_status' => 'introduksi',
            'ecological_function' => 'Peneduh kanopi tinggi',
            'is_active' => true,
        ]);

        $act = PlantingActivity::create([
            'id' => 'ACT-MAHONI',
            'batch_code' => 'BATCH-MHN',
            'name' => 'Penanaman Blok Mahoni',
            'activity_date' => '2026-10-01',
            'person_in_charge' => 'Fajar',
            'organizer' => 'IKHW',
            'location_zone' => 'Zona Barat',
            'scene_id' => $this->scene->id,
        ]);

        PlantingActivityItem::create([
            'planting_activity_id' => $act->id,
            'tree_species_id' => $sp->id,
            'quantity' => 75,
        ]);

        // Buat hotspot info yang merujuk ke data master pohon
        $hs = Hotspot::create([
            'id' => 'info-tree-mahoni',
            'scene_id' => $this->scene->id,
            'type' => 'info',
            'yaw' => 0.45,
            'pitch' => 0.12,
            'info_source_type' => 'tree_species',
            'tree_species_id' => $sp->id,
            'status' => 'published',
            'is_active' => true,
        ]);

        // Ambil dari endpoint publik Marzipano: konten harus ter-resolve dinamis
        $res = $this->getJson('/api/hotspots');
        $res->assertStatus(200);

        $hotspotItem = collect($res->json('hotspots'))->firstWhere('id', 'info-tree-mahoni');
        $this->assertNotNull($hotspotItem);
        $this->assertStringContainsString('Mahoni', $hotspotItem['title']);
        $this->assertStringContainsString('Peneduh kanopi tinggi', $hotspotItem['text']);
        $this->assertStringContainsString('75 bibit', $hotspotItem['text']);

        // Halaman publik jenis pohon
        $pubRes = $this->getJson('/api/tree-species');
        $pubRes->assertStatus(200)
            ->assertJsonFragment(['common_name' => 'Mahoni', 'scientific_name' => 'Swietenia mahagoni']);
    }

    /**
     * Skenario 10: Ekspor Laporan CSV memberikan hasil yang sesuai.
     */
    public function test_can_export_planting_reports_to_csv()
    {
        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->get('/api/admin/trees/reports/summary/csv');

        $res->assertStatus(200);
        $this->assertStringContainsString('text/csv', $res->headers->get('content-type'));
    }

    /**
     * Skenario 11: Validasi data impor CSV menolak data tidak valid.
     */
    public function test_import_preview_rejects_invalid_data()
    {
        // Buat temporary CSV dengan data salah (jumlah 0, spesies tidak ada)
        $csvContent = "batch_code;activity_name;activity_date;scientific_name;quantity\n" .
                      "BATCH-ERR;Kegiatan Salah;2026-10-10;Spesies Tidak Ada;-5\n";

        $tempFile = tempnam(sys_get_temp_dir(), 'csv_test');
        file_put_contents($tempFile, $csvContent);

        $uploaded = new \Illuminate\Http\UploadedFile($tempFile, 'test.csv', 'text/csv', null, true);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->post('/api/admin/trees/import/preview', [
                'type' => 'activities',
                'file' => $uploaded,
            ]);

        $res->assertStatus(200)
            ->assertJson([
                'success' => true,
                'invalid_count' => 1,
                'valid_count' => 0,
            ]);

        unlink($tempFile);
    }

    /**
     * Skenario 12: Pengguna non-admin tidak dapat mengubah data.
     */
    public function test_non_admin_cannot_access_or_modify_tree_data()
    {
        $res = $this->postJson('/api/admin/trees/species', [
            'common_name' => 'Spesies Palsu',
            'scientific_name' => 'Fakus treeus',
            'origin_status' => 'lokal_asli',
        ]);

        $res->assertStatus(401);
    }

    /**
     * Skenario 13: Admin dapat mengunggah lebih dari 1 berkas foto untuk spesies pohon.
     */
    public function test_admin_can_upload_multiple_photos_for_tree_species()
    {
        Storage::fake('public');

        $file1 = \Illuminate\Http\UploadedFile::fake()->image('daun_jeumpa.jpg', 600, 400);
        $file2 = \Illuminate\Http\UploadedFile::fake()->image('bunga_jeumpa.jpg', 600, 400);
        $file3 = \Illuminate\Http\UploadedFile::fake()->image('pohon_jeumpa.jpg', 600, 400);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->post('/api/admin/trees/species', [
                'common_name' => 'Jeumpa Uji Multi',
                'scientific_name' => 'Magnolia ujiensis',
                'origin_status' => 'lokal_asli',
                'photos' => [$file1, $file2, $file3],
            ]);

        $res->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $species = TreeSpecies::where('scientific_name', 'Magnolia ujiensis')->first();
        $this->assertNotNull($species);
        $this->assertCount(3, $species->gallery_photos);
        $this->assertEquals($species->gallery_photos[0], $species->photo_path);

        // Update: upload file tambahan dan simpan foto yang ada
        $file4 = \Illuminate\Http\UploadedFile::fake()->image('buah_jeumpa.jpg', 600, 400);
        $updateRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->post("/api/admin/trees/species/{$species->id}", [
                '_method' => 'PUT',
                'common_name' => 'Jeumpa Uji Multi Updated',
                'scientific_name' => 'Magnolia ujiensis',
                'origin_status' => 'lokal_asli',
                'existing_photos' => json_encode([$species->gallery_photos[0], $species->gallery_photos[1]]),
                'photos' => [$file4],
            ]);

        $updateRes->assertStatus(200);
        $species->refresh();
        $this->assertCount(3, $species->gallery_photos);
    }
}
