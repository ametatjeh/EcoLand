<?php

namespace Tests\Feature;

use App\Models\GalleryAlbum;
use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\PlantingZone;
use App\Models\PlantingZonePhoto;
use App\Models\TreeMaintenanceLog;
use App\Models\TreeSpecies;
use App\Models\TreeSurvey;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminSecurityHardeningTest extends TestCase
{
    use RefreshDatabase;

    private User $adminUser;
    private string $adminToken;
    private User $regularUser;
    private string $regularToken;
    private PlantingZone $zone;
    private TreeSpecies $species;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');

        // Admin User
        $this->adminUser = User::create([
            'name' => 'Super Administrator',
            'username' => 'superadmin',
            'email' => 'admin@ecoland.local',
            'password' => Hash::make('AdminPass123!'),
            'role' => 'administrator',
        ]);
        $this->adminToken = $this->adminUser->createToken('admin_session', ['admin'])->plainTextToken;

        // Regular Non-Admin User (Public / Member)
        $this->regularUser = User::create([
            'name' => 'Regular Member',
            'username' => 'regularuser',
            'email' => 'user@ecoland.local',
            'password' => Hash::make('UserPass123!'),
            'role' => 'user',
        ]);
        $this->regularToken = $this->regularUser->createToken('user_session')->plainTextToken;

        // Baseline Master Data
        $this->zone = PlantingZone::create([
            'id' => 'KW-TEST-SEC',
            'zone_code' => 'KW-TEST-SEC',
            'name' => 'Kawasan Hutan Lindung Uji',
            'category' => 'Konservasi',
            'status' => 'active',
            'area_size' => 2.5,
            'area_unit' => 'ha',
            'is_published' => true,
        ]);

        $this->species = TreeSpecies::create([
            'id' => 'sp-merbau-sec',
            'common_name' => 'Merbau Aceh Uji',
            'scientific_name' => 'Intsia bijuga Test',
            'origin_status' => 'lokal_asli',
            'is_active' => true,
        ]);
    }

    private function adminHeaders(): array
    {
        return [
            'Authorization' => "Bearer {$this->adminToken}",
            'Accept' => 'application/json',
        ];
    }

    private function regularHeaders(): array
    {
        return [
            'Authorization' => "Bearer {$this->regularToken}",
            'Accept' => 'application/json',
        ];
    }

    /**
     * 1. Akses tanpa autentikasi wajib ditolak 401 Unauthorized.
     */
    public function test_unauthenticated_requests_are_rejected_with_401(): void
    {
        $endpoints = [
            'GET' => [
                '/api/admin/albums',
                '/api/admin/zones',
                '/api/admin/trees/species',
                '/api/admin/trees/activities',
                '/api/admin/trees/surveys',
                '/api/admin/trees/maintenance',
            ],
            'POST' => [
                '/api/admin/albums',
                '/api/admin/zones',
                '/api/admin/trees/species',
                '/api/admin/trees/activities',
                '/api/admin/trees/surveys',
                '/api/admin/trees/maintenance',
            ],
        ];

        foreach ($endpoints['GET'] as $url) {
            $this->getJson($url)->assertStatus(401);
        }

        foreach ($endpoints['POST'] as $url) {
            $this->postJson($url, [])->assertStatus(401);
        }
    }

    /**
     * 2. Pengguna terautentikasi tanpa izin admin (role=user) wajib ditolak 403 Forbidden.
     */
    public function test_authenticated_non_admin_is_rejected_with_403(): void
    {
        $endpoints = [
            '/api/admin/albums',
            '/api/admin/zones',
            '/api/admin/trees/species',
            '/api/admin/trees/activities',
            '/api/admin/trees/surveys',
            '/api/admin/trees/maintenance',
        ];

        foreach ($endpoints as $url) {
            $res = $this->withHeaders($this->regularHeaders())->getJson($url);
            $res->assertStatus(403);
            $res->assertJson([
                'success' => false,
            ]);
        }
    }

    /**
     * 3. Pengguna admin yang berwenang dapat mengakses daftar (200) dan membuat resource (201).
     */
    public function test_authorized_admin_can_access_and_create_resources(): void
    {
        // Akses daftar 200
        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/albums')->assertStatus(200);
        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/zones')->assertStatus(200);
        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/trees/species')->assertStatus(200);

        // Buat Album 201
        $albumRes = $this->withHeaders($this->adminHeaders())->postJson('/api/admin/albums', [
            'title' => 'Album Penanaman Bersama Mitra',
            'category' => 'Kegiatan Penanaman',
            'planting_zone_id' => $this->zone->id,
            'is_published' => true,
        ]);
        $albumRes->assertStatus(201);
        $albumRes->assertJsonPath('success', true);
    }

    /**
     * 4. Akses ID yang tidak ditemukan wajib mengembalikan 404 Not Found.
     */
    public function test_nonexistent_ids_return_404(): void
    {
        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/albums/999999')->assertStatus(404);
        $this->withHeaders($this->adminHeaders())->putJson('/api/admin/albums/999999', ['title' => 'Test'])->assertStatus(404);
        $this->withHeaders($this->adminHeaders())->deleteJson('/api/admin/albums/999999')->assertStatus(404);

        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/zones/ZONE-NONEXISTENT')->assertStatus(404);
        $this->withHeaders($this->adminHeaders())->putJson('/api/admin/zones/ZONE-NONEXISTENT', ['name' => 'Test'])->assertStatus(404);

        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/trees/species/sp-notfound')->assertStatus(404);
        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/trees/activities/act-notfound')->assertStatus(404);
        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/trees/surveys/srv-notfound')->assertStatus(404);
        $this->withHeaders($this->adminHeaders())->getJson('/api/admin/trees/maintenance/mtn-notfound')->assertStatus(404);
    }

    /**
     * 5. Proteksi manipulasi ID foto lintas entitas (Cross-Album / Cross-Zone ID Tampering).
     */
    public function test_cross_entity_photo_tampering_is_prevented(): void
    {
        // Buat 2 Album berbeda
        $albumA = GalleryAlbum::create(['title' => 'Album A', 'is_published' => true]);
        $albumB = GalleryAlbum::create(['title' => 'Album B', 'is_published' => true]);

        // Buat Foto untuk Album B
        $photoB = PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/test_b.jpg',
            'title' => 'Foto Khusus Album B',
            'category' => 'Kondisi Kawasan',
        ]);
        $albumB->photos()->attach($photoB->id, ['sort_order' => 0]);

        // Coba perbarui metadata foto B melalui Album A (harus 404 karena foto B bukan anggota Album A)
        $tamperUpdateRes = $this->withHeaders($this->adminHeaders())
            ->putJson("/api/admin/albums/{$albumA->id}/photos/{$photoB->id}", [
                'title' => 'Hacked Title',
            ]);
        $tamperUpdateRes->assertStatus(404);

        // Coba hapus permanen foto B melalui Album A (harus 404)
        $tamperDeleteRes = $this->withHeaders($this->adminHeaders())
            ->deleteJson("/api/admin/albums/{$albumA->id}/photos/{$photoB->id}/permanent");
        $tamperDeleteRes->assertStatus(404);
    }

    /**
     * 6. Validasi relasi asing yang tidak valid (Invalid Foreign Key) wajib ditolak 422.
     */
    public function test_invalid_foreign_key_relations_are_rejected_with_422(): void
    {
        // Album dengan planting_zone_id tidak terdaftar
        $resAlbum = $this->withHeaders($this->adminHeaders())->postJson('/api/admin/albums', [
            'title' => 'Album Relasi Gaib',
            'planting_zone_id' => 'ZONE-DOES-NOT-EXIST',
        ]);
        $resAlbum->assertStatus(422);

        // Activity dengan tree_species_id tidak terdaftar
        $resActivity = $this->withHeaders($this->adminHeaders())->postJson('/api/admin/trees/activities', [
            'batch_code' => 'BATCH-SEC-01',
            'name' => 'Kegiatan Uji Invalid Species',
            'activity_date' => '2026-03-01',
            'person_in_charge' => 'Mandor Test',
            'organizer' => 'Tim Konservasi',
            'location_zone' => 'Zona Inti',
            'items' => [
                [
                    'tree_species_id' => 'SP-DOES-NOT-EXIST',
                    'quantity' => 50,
                ],
            ],
        ]);
        $resActivity->assertStatus(422);
    }

    /**
     * 7. Validasi status dan aturan bisnis yang tidak diizinkan wajib ditolak 422.
     */
    public function test_disallowed_status_and_business_rules_are_rejected(): void
    {
        // Status kawasan di luar whitelist enum (preparation, active, monitoring, completed)
        $resZone = $this->withHeaders($this->adminHeaders())->postJson('/api/admin/zones', [
            'zone_code' => 'KW-STATUS-ERR',
            'name' => 'Kawasan Status Error',
            'status' => 'status_ilegal',
            'area_size' => 1.0,
            'area_unit' => 'ha',
        ]);
        $resZone->assertStatus(422);

        // Buat kegiatan penanaman dengan 10 bibit
        $activity = PlantingActivity::create([
            'id' => 'ACT-SEC-RULE',
            'batch_code' => 'BATCH-RULE-01',
            'name' => 'Batch 10 Bibit',
            'activity_date' => '2026-01-10',
            'person_in_charge' => 'Petugas',
            'organizer' => 'Relawan',
            'location_zone' => 'Blok A',
        ]);
        PlantingActivityItem::create([
            'planting_activity_id' => $activity->id,
            'tree_species_id' => $this->species->id,
            'quantity' => 10,
        ]);

        // Aturan bisnis sensus: Tanaman hidup (alive_count = 25) melebihi bibit awal (10) -> DITOLAK 422
        $resSurvey = $this->withHeaders($this->adminHeaders())->postJson('/api/admin/trees/surveys', [
            'planting_activity_id' => $activity->id,
            'survey_date' => '2026-02-10',
            'alive_count' => 25,
            'dead_count' => 0,
            'missing_count' => 0,
            'health_condition' => 'baik',
            'inspector_name' => 'Sensus Officer',
        ]);
        $resSurvey->assertStatus(422);
        $resSurvey->assertJsonPath('success', false);
    }

    /**
     * 8. Penolakan penghapusan data yang masih memiliki dependensi aktif (Integritas Referensial).
     */
    public function test_deletion_rejected_when_dependencies_exist(): void
    {
        // 1. Kawasan memiliki kegiatan penanaman
        PlantingActivity::create([
            'id' => 'ACT-ZONE-DEP',
            'planting_zone_id' => $this->zone->id,
            'batch_code' => 'BATCH-DEP-01',
            'name' => 'Penanaman Terikat Kawasan',
            'activity_date' => '2026-01-01',
            'person_in_charge' => 'PIC',
            'organizer' => 'Org',
            'location_zone' => 'Blok 1',
        ]);

        $deleteZoneRes = $this->withHeaders($this->adminHeaders())->deleteJson("/api/admin/zones/{$this->zone->id}");
        $deleteZoneRes->assertStatus(422);
        $deleteZoneRes->assertJsonPath('success', false);
        $this->assertDatabaseHas('planting_zones', ['id' => $this->zone->id]);

        // 2. Jenis pohon memiliki rekaman bibit dalam kegiatan
        PlantingActivityItem::create([
            'planting_activity_id' => 'ACT-ZONE-DEP',
            'tree_species_id' => $this->species->id,
            'quantity' => 20,
        ]);

        $deleteSpeciesRes = $this->withHeaders($this->adminHeaders())->deleteJson("/api/admin/trees/species/{$this->species->id}");
        $deleteSpeciesRes->assertStatus(422);
        $deleteSpeciesRes->assertJsonPath('success', false);
        $this->assertDatabaseHas('tree_species', ['id' => $this->species->id]);
    }

    /**
     * 9. Penghapusan album aman (hanya melepas pivot, tidak menghapus foto fisik kawasan).
     */
    public function test_album_deletion_detaches_pivot_safely(): void
    {
        $album = GalleryAlbum::create([
            'title' => 'Album yang akan dihapus',
            'is_published' => true,
        ]);

        $photo = PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/safe_photo.jpg',
            'title' => 'Foto yang harus tetap ada',
            'category' => 'Kondisi Kawasan',
        ]);

        $album->photos()->attach($photo->id, ['sort_order' => 0]);

        // Hapus album
        $res = $this->withHeaders($this->adminHeaders())->deleteJson("/api/admin/albums/{$album->id}");
        $res->assertStatus(200);

        // Verifikasi: Foto fisik tetap tersimpan di database
        $this->assertDatabaseHas('planting_zone_photos', ['id' => $photo->id]);
        // Verifikasi: Relasi pivot terlepas bersih
        $this->assertDatabaseMissing('gallery_album_photos', [
            'gallery_album_id' => $album->id,
            'planting_zone_photo_id' => $photo->id,
        ]);
    }
}
