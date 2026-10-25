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

    public function test_admin_can_upload_multiple_photos_with_paths_structured_by_category_and_title()
    {
        $file1 = UploadedFile::fake()->image('pemandangan_timur.jpg', 640, 480);
        $file2 = UploadedFile::fake()->image('plot_bibit_cemara.jpg', 640, 480);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/zones/{$this->zone->id}/photos", [
                'photos' => [$file1, $file2],
                'titles' => ['Panorama Bukit Hijau', 'Bibit Cemara Laut Siap Tanam'],
                'category' => 'Lanskap & Topografi',
                'caption' => 'Dokumentasi survei lapangan blok 2',
                'cover_index' => 1, // Foto ke-2 jadi sampul
                'is_published' => true,
            ]);

        $res->assertStatus(201)
            ->assertJson(['success' => true])
            ->assertJsonCount(2, 'photos');

        $photos = PlantingZonePhoto::where('planting_zone_id', $this->zone->id)->orderBy('id')->get();
        $this->assertCount(2, $photos);

        // Foto 1: title "Panorama Bukit Hijau", category "Lanskap & Topografi"
        // Path harus mengandung slug kategori "lanskap-topografi" dan slug judul "panorama-bukit-hijau"
        $this->assertEquals('Panorama Bukit Hijau', $photos[0]->title);
        $this->assertEquals('Lanskap & Topografi', $photos[0]->category);
        $this->assertFalse($photos[0]->is_cover);
        $this->assertStringContainsString('/storage/zones/' . $this->zone->id . '/photos/lanskap-topografi/panorama-bukit-hijau_', $photos[0]->file_path);

        // Foto 2: title "Bibit Cemara Laut Siap Tanam", cover_index = 1 -> is_cover = true
        $this->assertEquals('Bibit Cemara Laut Siap Tanam', $photos[1]->title);
        $this->assertTrue($photos[1]->is_cover);
        $this->assertStringContainsString('/storage/zones/' . $this->zone->id . '/photos/lanskap-topografi/bibit-cemara-laut-siap-tanam_', $photos[1]->file_path);

        // Main photo path zone juga diperbarui ke foto 2
        $this->zone->refresh();
        $this->assertEquals($photos[1]->file_url, $this->zone->main_photo_path);
    }

    public function test_admin_can_update_photo_file_with_structured_path()
    {
        $photo = PlantingZonePhoto::create([
            'planting_zone_id' => $this->zone->id,
            'file_path' => '/storage/zones/KW-TEST-01/photos/old_file.jpg',
            'title' => 'Foto Lama',
            'category' => 'Kondisi Kawasan',
        ]);

        $newImage = UploadedFile::fake()->image('foto_baru_lahan.jpg', 800, 600);

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/zones/{$this->zone->id}/photos/{$photo->id}", [
                '_method' => 'PUT',
                'photo' => $newImage,
                'title' => 'Vegetasi Terkini Blok B',
                'category' => 'Pertumbuhan Vegetasi',
            ]);

        $res->assertStatus(200)
            ->assertJson(['success' => true]);

        $photo->refresh();
        $this->assertEquals('Vegetasi Terkini Blok B', $photo->title);
        $this->assertEquals('Pertumbuhan Vegetasi', $photo->category);
        $this->assertStringContainsString('/storage/zones/' . $this->zone->id . '/photos/pertumbuhan-vegetasi/vegetasi-terkini-blok-b_', $photo->file_path);
    }
}
