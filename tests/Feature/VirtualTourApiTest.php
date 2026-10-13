<?php

namespace Tests\Feature;

use App\Models\Hotspot;
use App\Models\Scene;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class VirtualTourApiTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected string $adminToken;
    protected Scene $sceneA;
    protected Scene $sceneB;

    protected function setUp(): void
    {
        parent::setUp();

        // 1. Buat User Administrator
        $this->admin = User::create([
            'name' => 'Admin Test',
            'username' => 'admin',
            'email' => 'admin@test.local',
            'password' => Hash::make('admin123'),
            'role' => 'administrator',
        ]);

        $this->adminToken = $this->admin->createToken('test_token')->plainTextToken;

        // 2. Buat Dummy Scenes
        $this->sceneA = Scene::create([
            'id' => 'scene-01',
            'name' => 'Scene Titik 1',
            'sequence' => 1,
            'status' => 'tersedia',
            'panorama_path' => '/tours/point1/panorama.jpg',
            'initial_yaw' => 0.5,
            'initial_pitch' => 0.1,
            'initial_fov' => 1.4,
        ]);

        $this->sceneB = Scene::create([
            'id' => 'scene-02',
            'name' => 'Scene Titik 2',
            'sequence' => 2,
            'status' => 'tersedia',
            'panorama_path' => '/tours/point2/panorama.jpg',
            'initial_yaw' => 1.2,
            'initial_pitch' => -0.2,
            'initial_fov' => 1.4,
        ]);
    }

    /**
     * Test 1: Autentikasi Administrator (Login Sukses & Gagal)
     */
    public function test_admin_can_login_with_valid_credentials()
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'admin',
            'password' => 'admin123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure(['token', 'user']);
    }

    public function test_login_fails_with_invalid_credentials()
    {
        $response = $this->postJson('/api/auth/login', [
            'username' => 'admin',
            'password' => 'wrong_password',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
            ]);
    }

    /**
     * Test 2: Otorisasi Server-Side (Endpoint penulisan dilindungi)
     */
    public function test_guest_cannot_create_or_modify_hotspots()
    {
        // Akses tanpa token harus ditolak 401 Unauthorized
        $response = $this->postJson('/api/admin/hotspots', [
            'scene_id' => $this->sceneA->id,
            'type' => 'info',
            'yaw' => 0.2,
            'pitch' => 0.1,
            'title' => 'Hotspot Ilegal',
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test 3: CRUD Hotspot (Create, Read, Update, Delete)
     */
    public function test_admin_can_create_and_manage_hotspot()
    {
        // Create Info Hotspot
        $response = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/hotspots', [
                'scene_id' => $this->sceneA->id,
                'type' => 'info',
                'yaw' => 0.25,
                'pitch' => -0.15,
                'title' => 'Pohon Seulanga',
                'text' => 'Tanaman konservasi daerah.',
                'status' => 'draft',
            ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'hotspot' => [
                    'sceneId' => 'scene-01',
                    'type' => 'info',
                    'title' => 'Pohon Seulanga',
                    'status' => 'draft',
                ],
            ]);

        $hotspotId = $response->json('hotspot.id');

        // Update Hotspot
        $updateRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->putJson("/api/admin/hotspots/{$hotspotId}", [
                'title' => 'Pohon Seulanga Diperbarui',
            ]);

        $updateRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'hotspot' => [
                    'title' => 'Pohon Seulanga Diperbarui',
                ],
            ]);

        // Delete Hotspot (file panorama aman tidak terhapus)
        $deleteRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->deleteJson("/api/admin/hotspots/{$hotspotId}");

        $deleteRes->assertStatus(200);
        $this->assertDatabaseMissing('hotspots', ['id' => $hotspotId]);
    }

    /**
     * Test 4: Validasi Scene Tujuan (Menolak target scene yang tidak ada)
     */
    public function test_validates_destination_scene_on_link_hotspot()
    {
        $response = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/hotspots', [
                'scene_id' => $this->sceneA->id,
                'type' => 'link',
                'yaw' => 0.5,
                'pitch' => 0.1,
                'target_scene_id' => 'scene-tidak-ada-di-database',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['target_scene_id']);
    }

    /**
     * Test 5: Duplikasi Hotspot
     */
    public function test_can_duplicate_hotspot_as_draft()
    {
        $original = Hotspot::create([
            'id' => 'link-asli',
            'scene_id' => $this->sceneA->id,
            'type' => 'link',
            'yaw' => 0.5,
            'pitch' => 0.1,
            'target_scene_id' => $this->sceneB->id,
            'title' => 'Menuju Titik 2',
            'status' => 'published',
            'is_active' => true,
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/hotspots/{$original->id}/duplicate");

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'hotspot' => [
                    'sceneId' => 'scene-01',
                    'target' => 'scene-02',
                    'status' => 'draft', // Hasil duplikasi berstatus draft
                ],
            ]);

        $this->assertNotEquals($original->id, $response->json('hotspot.id'));
    }

    /**
     * Test 6: Perubahan Posisi Yaw dan Pitch
     */
    public function test_can_update_hotspot_yaw_pitch_position()
    {
        $hs = Hotspot::create([
            'id' => 'hs-posisi',
            'scene_id' => $this->sceneA->id,
            'type' => 'info',
            'yaw' => 0.1,
            'pitch' => 0.1,
            'status' => 'published',
        ]);

        $response = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->patchJson("/api/admin/hotspots/{$hs->id}/position", [
                'yaw' => 1.57,
                'pitch' => -0.45,
                'rotation' => 3.14,
            ]);

        $response->assertStatus(200);

        $hs->refresh();
        $this->assertEquals(1.57, $hs->yaw);
        $this->assertEquals(-0.45, $hs->pitch);
    }

    /**
     * Test 7: Pemisahan Draf vs Publikasi (Pengunjung hanya menerima versi terpublikasi)
     */
    public function test_draft_hotspots_are_hidden_from_public_until_published()
    {
        // Buat 1 draft hotspot dan 1 published hotspot
        $draftHs = Hotspot::create([
            'id' => 'hs-draft',
            'scene_id' => $this->sceneA->id,
            'type' => 'info',
            'yaw' => 0.1,
            'pitch' => 0.1,
            'title' => 'Info Rahasia Draf',
            'status' => 'draft',
            'is_active' => true,
        ]);

        $publishedHs = Hotspot::create([
            'id' => 'hs-published',
            'scene_id' => $this->sceneA->id,
            'type' => 'info',
            'yaw' => 0.8,
            'pitch' => 0.2,
            'title' => 'Info Resmi Publik',
            'status' => 'published',
            'is_active' => true,
        ]);

        // 1. Cek endpoint publik: Draf TIDAK BOLEH muncul
        $publicRes = $this->getJson('/api/hotspots');
        $publicRes->assertStatus(200);

        $hotspotIds = collect($publicRes->json('hotspots'))->pluck('id')->all();
        $this->assertContains('hs-published', $hotspotIds);
        $this->assertNotContains('hs-draft', $hotspotIds);

        // 2. Publikasikan draf
        $publishRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/hotspots/{$draftHs->id}/publish");

        $publishRes->assertStatus(200);

        // 3. Cek kembali endpoint publik: Sekarang draf telah muncul
        $publicResAfter = $this->getJson('/api/hotspots');
        $updatedIds = collect($publicResAfter->json('hotspots'))->pluck('id')->all();
        $this->assertContains('hs-draft', $updatedIds);
    }

    /**
     * Test 8: Cadangan JSON Ekspor & Impor (Proteksi Overwrite & Validasi Referensi)
     */
    public function test_backup_export_and_import_with_integrity_and_overwrite_protection()
    {
        Hotspot::create([
            'id' => 'hs-sebelum-backup',
            'scene_id' => $this->sceneA->id,
            'type' => 'info',
            'yaw' => 0.3,
            'pitch' => 0.1,
            'status' => 'published',
            'is_active' => true,
        ]);

        // 1. Ekspor Cadangan
        $exportRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->getJson('/api/admin/backup/export');

        $exportRes->assertStatus(200)
            ->assertJsonStructure([
                'exportType',
                'data' => ['hotspots'],
            ]);

        $backupData = $exportRes->json();

        // 2. Uji Proteksi Overwrite: Impor tanpa confirm_overwrite saat DB ada data harus ditolak 409
        $conflictRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/backup/import', $backupData);

        $conflictRes->assertStatus(409)
            ->assertJson(['requires_confirmation' => true]);

        // 3. Uji Validasi Referensi: Impor dengan scene target yang tidak ada harus ditolak 422
        $invalidPayload = [
            'confirm_overwrite' => true,
            'hotspots' => [
                [
                    'sceneId' => 'scene-fiktif-99',
                    'type' => 'info',
                    'yaw' => 0.0,
                    'pitch' => 0.0,
                ],
            ],
        ];

        $invalidRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/backup/import', $invalidPayload);

        $invalidRes->assertStatus(422);

        // 4. Impor Valid dengan konfirmasi
        $backupData['confirm_overwrite'] = true;
        $validImportRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/backup/import', $backupData);

        $validImportRes->assertStatus(200)
            ->assertJson(['success' => true]);
    }
}
