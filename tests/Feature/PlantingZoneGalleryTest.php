<?php

namespace Tests\Feature;

use App\Models\PlantingZone;
use App\Models\PlantingZonePhoto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PlantingZoneGalleryTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected string $adminToken;
    protected PlantingZone $zone;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('public');

        $this->admin = User::create([
            'name' => 'Admin Sistem',
            'username' => 'admin',
            'email' => 'admin@ikhw.org',
            'password' => Hash::make('admin123'),
            'role' => 'administrator',
        ]);

        $this->adminToken = $this->admin->createToken('admin_token')->plainTextToken;

        $this->zone = PlantingZone::create([
            'id' => 'KW-TEST-01',
            'zone_code' => 'KW-TEST-01',
            'name' => 'Kawasan Konservasi Hutan Mangrove',
            'category' => 'Konservasi Mangrove',
            'description' => 'Kawasan restorasi mangrove pesisir.',
            'status' => 'active',
            'is_published' => true,
            'is_archived' => false,
        ]);
    }

    public function test_public_can_fetch_all_published_photos()
    {
        PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/KW-TEST-01/photos/test1.jpg',
            'title' => 'Bibit Mangrove Baru',
            'category' => 'Kondisi Kawasan',
            'is_published' => true,
        ]);

        PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/KW-TEST-01/photos/test2.jpg',
            'title' => 'Foto Internal Draft',
            'category' => 'Pemantauan',
            'is_published' => false,
        ]);

        $res = $this->getJson('/api/photos');
        $res->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonCount(1, 'photos');
    }

    public function test_public_can_fetch_photos_by_zone()
    {
        PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/KW-TEST-01/photos/photo1.jpg',
            'title' => 'Penanaman Bersama Relawan',
            'is_published' => true,
        ]);

        $res = $this->getJson("/api/zones/{$this->zone->id}/photos");
        $res->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonCount(1, 'photos');
    }

    public function test_admin_can_upload_photo_to_zone()
    {
        $file = UploadedFile::fake()->image('dokumentasi_lahan.jpg', 800, 600)->size(1500);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/zones/{$this->zone->id}/photos", [
                'photos' => [$file],
                'title' => 'Kondisi Lahan Terkini',
                'category' => 'Kondisi Kawasan',
                'caption' => 'Pengukuran plot awal penanaman',
                'documented_at' => '2026-10-12',
                'is_published' => true,
                'is_cover' => true,
            ]);

        $res->assertStatus(201)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('planting_zone_photos', [
            'planting_zone_id' => $this->zone->id,
            'title' => 'Kondisi Lahan Terkini',
            'category' => 'Kondisi Kawasan',
            'is_cover' => 1,
        ]);

        $this->zone->refresh();
        $this->assertNotNull($this->zone->main_photo_path);
    }

    public function test_invalid_file_type_is_rejected()
    {
        $fakePdf = UploadedFile::fake()->create('document.pdf', 500, 'application/pdf');

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/zones/{$this->zone->id}/photos", [
                'photos' => [$fakePdf],
            ]);

        $res->assertStatus(422)
            ->assertJsonValidationErrors(['photos.0']);
    }

    public function test_admin_can_set_photo_as_cover()
    {
        $photo1 = PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/test1.jpg',
            'title' => 'Foto 1',
            'is_cover' => true,
        ]);

        $photo2 = PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/test2.jpg',
            'title' => 'Foto 2',
            'is_cover' => false,
        ]);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/zones/{$this->zone->id}/photos/{$photo2->id}/set-cover");

        $res->assertStatus(200)
            ->assertJson(['success' => true]);

        $photo1->refresh();
        $photo2->refresh();
        $this->assertFalse((bool)$photo1->is_cover);
        $this->assertTrue((bool)$photo2->is_cover);
    }

    public function test_admin_can_update_photo_metadata()
    {
        $photo = PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/test.jpg',
            'title' => 'Judul Lama',
            'category' => 'Kondisi Kawasan',
        ]);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->putJson("/api/admin/zones/{$this->zone->id}/photos/{$photo->id}", [
                'title' => 'Judul Baru Diperbarui',
                'caption' => 'Keterangan lengkap diperbarui',
                'category' => 'Kegiatan Penanaman',
            ]);

        $res->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('planting_zone_photos', [
            'id' => $photo->id,
            'title' => 'Judul Baru Diperbarui',
            'category' => 'Kegiatan Penanaman',
        ]);
    }

    public function test_admin_can_delete_photo()
    {
        $photo = PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/KW-TEST-01/photos/del.jpg',
            'title' => 'Foto Dihapus',
        ]);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->deleteJson("/api/admin/zones/{$this->zone->id}/photos/{$photo->id}");

        $res->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertSoftDeleted('planting_zone_photos', [
            'id' => $photo->id,
        ]);
    }
}
