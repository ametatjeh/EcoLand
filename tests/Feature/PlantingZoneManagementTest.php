<?php

namespace Tests\Feature;

use App\Models\PlantingZone;
use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\TreeSpecies;
use App\Models\Scene;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PlantingZoneManagementTest extends TestCase
{
    use RefreshDatabase;

    protected User $admin;
    protected string $adminToken;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin Sistem',
            'username' => 'admin',
            'email' => 'admin@vtour.local',
            'password' => Hash::make('admin123'),
            'role' => 'administrator',
        ]);

        $this->adminToken = $this->admin->createToken('admin_token')->plainTextToken;
    }

    public function test_admin_can_create_new_planting_zone_with_unique_code()
    {
        $payload = [
            'zone_code' => 'KW-ACEH-02',
            'name' => 'Kawasan Restorasi Lereng Jantho',
            'category' => 'Konservasi Lereng',
            'description' => 'Plot percontohan penanaman bibit pohon kayu keras.',
            'planting_purpose' => 'Pengendalian erosi tanah dan tangkapan air.',
            'status' => 'active',
            'address' => 'Desa Jantho Baru',
            'city' => 'Aceh Besar',
            'province' => 'Aceh',
            'area_size' => 1.5,
            'area_unit' => 'ha',
            'measurement_method' => 'Pengukuran terestrial teodolit',
            'organization' => 'IKHW Aceh',
            'person_in_charge' => 'Bustami, S.Hut',
            'latitude' => 5.281900,
            'longitude' => 95.612000,
            'is_published' => true,
        ];

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/zones', $payload);

        $res->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonPath('zone.zone_code', 'KW-ACEH-02');

        $this->assertDatabaseHas('planting_zones', [
            'zone_code' => 'KW-ACEH-02',
            'name' => 'Kawasan Restorasi Lereng Jantho',
            'status' => 'active',
        ]);

        // Duplicate code rejection
        $resDup = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/zones', $payload);

        $resDup->assertStatus(422)
            ->assertJsonValidationErrors(['zone_code']);
    }

    public function test_zone_can_be_created_without_gps_coordinates()
    {
        $payload = [
            'zone_code' => 'KW-NO-GPS',
            'name' => 'Kawasan Blok C Belum Berkoordinat',
            'status' => 'preparation',
            'area_size' => 5000,
            'area_unit' => 'm2',
            'is_published' => false,
        ];

        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/zones', $payload);

        $res->assertStatus(201)
            ->assertJsonPath('success', true);

        $this->assertDatabaseHas('planting_zones', [
            'zone_code' => 'KW-NO-GPS',
            'latitude' => null,
            'longitude' => null,
        ]);
    }

    public function test_zone_with_existing_activities_cannot_be_permanently_deleted_and_uses_archive()
    {
        $zone = PlantingZone::create([
            'zone_code' => 'KW-DATA-01',
            'name' => 'Kawasan Aktif Berkelanjutan',
            'status' => 'active',
            'area_size' => 2.0,
            'area_unit' => 'ha',
            'is_published' => true,
        ]);

        PlantingActivity::create([
            'planting_zone_id' => $zone->id,
            'batch_code' => 'BATCH-TEST-01',
            'name' => 'Penanaman Kayu Merbau',
            'activity_date' => '2026-03-01',
            'person_in_charge' => 'Koordinator Lapangan',
            'organizer' => 'IKHW Aceh',
            'location_zone' => 'Blok Konservasi',
            'status' => 'terlaksana',
        ]);

        // Attempt DELETE - should auto-archive instead of hard delete
        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->deleteJson("/api/admin/zones/{$zone->id}");

        $res->assertStatus(200)
            ->assertJsonPath('action', 'archived');

        // Zone still exists in database and is marked archived
        $this->assertDatabaseHas('planting_zones', [
            'id' => $zone->id,
            'is_archived' => 1,
        ]);

        // Toggle archive endpoint
        $archiveRes = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson("/api/admin/zones/{$zone->id}/archive");

        $archiveRes->assertStatus(200)
            ->assertJsonPath('success', true);
    }

    public function test_multiple_zones_isolate_activities_and_species()
    {
        $zoneA = PlantingZone::create([
            'zone_code' => 'KW-A',
            'name' => 'Kawasan A',
            'status' => 'active',
            'area_size' => 1.0,
            'area_unit' => 'ha',
            'is_published' => true,
        ]);

        $zoneB = PlantingZone::create([
            'zone_code' => 'KW-B',
            'name' => 'Kawasan B',
            'status' => 'active',
            'area_size' => 3.0,
            'area_unit' => 'ha',
            'is_published' => true,
        ]);

        $species = TreeSpecies::create([
            'common_name' => 'Merbau Aceh',
            'scientific_name' => 'Intsia bijuga',
        ]);

        $actA = PlantingActivity::create([
            'planting_zone_id' => $zoneA->id,
            'batch_code' => 'BATCH-A-01',
            'name' => 'Penanaman Zona A',
            'activity_date' => '2026-04-01',
            'person_in_charge' => 'Koordinator Lapangan A',
            'organizer' => 'IKHW Aceh',
            'location_zone' => 'Blok A',
            'status' => 'terlaksana',
        ]);
        PlantingActivityItem::create([
            'planting_activity_id' => $actA->id,
            'tree_species_id' => $species->id,
            'quantity' => 150,
        ]);

        $actB = PlantingActivity::create([
            'planting_zone_id' => $zoneB->id,
            'batch_code' => 'BATCH-B-01',
            'name' => 'Penanaman Zona B',
            'activity_date' => '2026-04-02',
            'person_in_charge' => 'Koordinator Lapangan B',
            'organizer' => 'IKHW Aceh',
            'location_zone' => 'Blok B',
            'status' => 'terlaksana',
        ]);
        PlantingActivityItem::create([
            'planting_activity_id' => $actB->id,
            'tree_species_id' => $species->id,
            'quantity' => 300,
        ]);

        $this->assertEquals(150, $zoneA->getTotalInitialSeedlings());
        $this->assertEquals(300, $zoneB->getTotalInitialSeedlings());
    }

    public function test_public_zones_endpoint_only_returns_published_data_without_internal_notes()
    {
        PlantingZone::create([
            'zone_code' => 'KW-PUB-01',
            'name' => 'Kawasan Publik Terverifikasi',
            'description' => 'Deskripsi program publik',
            'internal_notes' => 'Catatan internal rahasia staf',
            'status' => 'active',
            'area_size' => 2.0,
            'area_unit' => 'ha',
            'is_published' => true,
        ]);

        PlantingZone::create([
            'zone_code' => 'KW-DRAFT-01',
            'name' => 'Kawasan Draft Belum Siap',
            'status' => 'preparation',
            'area_size' => 1.0,
            'area_unit' => 'ha',
            'is_published' => false,
        ]);

        $res = $this->getJson('/api/zones');

        $res->assertStatus(200)
            ->assertJsonMissing(['internal_notes' => 'Catatan internal rahasia staf'])
            ->assertJsonMissing(['zone_code' => 'KW-DRAFT-01']);

        // Check that KW-PUB-01 is present
        $zonesList = collect($res->json('zones'));
        $this->assertTrue($zonesList->contains('zone_code', 'KW-PUB-01'));
        $this->assertFalse($zonesList->contains('zone_code', 'KW-DRAFT-01'));
    }

    public function test_admin_activity_log_recorded_on_zone_creation()
    {
        $res = $this->withHeader('Authorization', "Bearer {$this->adminToken}")
            ->postJson('/api/admin/zones', [
                'zone_code' => 'KW-LOG-01',
                'name' => 'Kawasan Audit Log',
                'status' => 'active',
                'area_size' => 1.0,
                'area_unit' => 'ha',
            ]);

        $res->assertStatus(201);

        $this->assertDatabaseHas('activity_logs', [
            'action' => 'create',
            'module' => 'zones',
        ]);
    }
}
