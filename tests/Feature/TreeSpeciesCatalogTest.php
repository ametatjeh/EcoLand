<?php

namespace Tests\Feature;

use App\Models\PlantingActivity;
use App\Models\PlantingActivityItem;
use App\Models\PlantingZone;
use App\Models\TreeSpecies;
use App\Models\TreeSurvey;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TreeSpeciesCatalogTest extends TestCase
{
    use RefreshDatabase;

    protected TreeSpecies $activeSpecies;
    protected TreeSpecies $inactiveSpecies;
    protected PlantingZone $zone;
    protected PlantingActivity $activity;

    protected function setUp(): void
    {
        parent::setUp();

        $this->zone = PlantingZone::create([
            'id' => 'KW-TEST-KATALOG',
            'zone_code' => 'KW-TEST-KATALOG',
            'name' => 'Kawasan Restorasi Uji',
            'category' => 'Konservasi',
            'status' => 'active',
            'is_published' => true,
        ]);

        $this->activeSpecies = TreeSpecies::create([
            'id' => 'merbau-aceh',
            'common_name' => 'Merbau',
            'scientific_name' => 'Intsia bijuga',
            'local_name' => 'Merbau Aceh / Bak Ipil',
            'family' => 'Fabaceae',
            'origin_status' => 'lokal_asli',
            'description' => 'Pohon kanopi utama restorasi pesisir dan perbukitan.',
            'ecological_function' => 'Mencegah erosi tanah lereng dan penyerap karbon tinggi.',
            'benefits' => 'Peneduh tanah dan penghasil biomassa serasah.',
            'photo_path' => '/storage/demo/merbau.jpg',
            'reference_source' => 'Flora Malesiana & Balai Pengelolaan DAS',
            'is_active' => true,
        ]);

        $this->inactiveSpecies = TreeSpecies::create([
            'id' => 'spesies-draft',
            'common_name' => 'Spesies Draft',
            'scientific_name' => 'Species draftus',
            'origin_status' => 'introduksi',
            'is_active' => false,
        ]);

        $this->activity = PlantingActivity::create([
            'id' => 'ACT-TEST-01',
            'batch_code' => 'BATCH-TEST-001',
            'name' => 'Penanaman Uji Coba Blok A',
            'activity_date' => '2026-03-12',
            'planting_zone_id' => $this->zone->id,
            'location_zone' => 'Blok A',
            'person_in_charge' => 'Ir. Teuku Iskandar',
            'organizer' => 'IKHW Aceh & Mitra Konservasi',
        ]);

        PlantingActivityItem::create([
            'planting_activity_id' => $this->activity->id,
            'tree_species_id' => $this->activeSpecies->id,
            'quantity' => 250,
            'unit' => 'batang',
            'seed_source' => 'Persemaian Permanen',
        ]);
    }

    /**
     * Test endpoint publik daftar katalog hanya mengembalikan spesies aktif dengan format terstruktur.
     */
    public function test_public_catalog_index_returns_active_species_with_factual_data(): void
    {
        $response = $this->getJson('/api/tree-species');

        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('total', 1)
            ->assertJsonFragment(['common_name' => 'Merbau', 'scientific_name' => 'Intsia bijuga'])
            ->assertJsonMissing(['common_name' => 'Spesies Draft']);

        $speciesData = collect($response->json('species'))->firstWhere('id', 'merbau-aceh');
        $this->assertNotNull($speciesData);
        $this->assertTrue($speciesData['has_planted_data']);
        $this->assertEquals(250, $speciesData['total_planted']);
        $this->assertEquals('Jenis Asli / Lokal', $speciesData['origin_status_label']);
        $this->assertCount(1, $speciesData['plantings']);
    }

    /**
     * Test endpoint publik detail mengembalikan spesies aktif dan 404 untuk spesies tidak aktif/tidak ada.
     */
    public function test_public_species_show_returns_detail_or_404(): void
    {
        // 1. Spesies aktif berhasil dibuka
        $response = $this->getJson('/api/tree-species/merbau-aceh');
        $response->assertStatus(200)
            ->assertJsonPath('success', true)
            ->assertJsonPath('species.common_name', 'Merbau')
            ->assertJsonPath('species.total_planted', 250);

        // 2. Spesies non-aktif menghasilkan 404
        $inactiveResponse = $this->getJson('/api/tree-species/spesies-draft');
        $inactiveResponse->assertStatus(404)
            ->assertJsonPath('success', false);

        // 3. ID acak tidak ditemukan menghasilkan 404
        $notFoundResponse = $this->getJson('/api/tree-species/pohon-fiktif');
        $notFoundResponse->assertStatus(404)
            ->assertJsonPath('success', false);
    }

    /**
     * Test survei pemantauan terverifikasi terhubung secara faktual ke detail spesies.
     */
    public function test_survey_data_is_accurately_reflected_in_species_catalog(): void
    {
        // Tambahkan survei lapangan
        TreeSurvey::create([
            'id' => 'SRV-TEST-01',
            'planting_activity_id' => $this->activity->id,
            'tree_species_id' => $this->activeSpecies->id,
            'survey_date' => '2026-09-15',
            'alive_count' => 220,
            'dead_count' => 20,
            'missing_count' => 10,
            'health_condition' => 'sehat',
            'average_height_cm' => 140.0,
            'inspector_name' => 'Dr. Cut Mutia, S.Hut',
            'is_verified' => true,
        ]);

        $response = $this->getJson('/api/tree-species/merbau-aceh');
        $response->assertStatus(200);

        $survey = $response->json('species.latest_survey');
        $this->assertNotNull($survey);
        $this->assertEquals('spesies', $survey['scope']);
        $this->assertEquals(220, $survey['alive_count']);
        $this->assertEquals(20, $survey['dead_count']);
        $this->assertEquals(10, $survey['missing_count']);
        $this->assertEquals(88.0, $survey['survival_rate']);
        $this->assertEquals('Dr. Cut Mutia, S.Hut', $survey['inspector_name']);
    }

    /**
     * Test web route /katalog-pohon/{slug} mengarahkan spesies aktif ke hash detail dan 404 jika tidak ditemukan.
     */
    public function test_web_route_katalog_pohon_redirects_or_returns_404(): void
    {
        // 1. Slug valid dialihkan ke SPA hash dengan parameter
        $res = $this->get('/katalog-pohon/merbau-aceh');
        $res->assertStatus(302)
            ->assertRedirect('/#katalog?species=merbau-aceh');

        // 2. Slug nonaktif menghasilkan 404
        $resInactive = $this->get('/katalog-pohon/spesies-draft');
        $resInactive->assertStatus(404);

        // 3. Slug tidak ada menghasilkan 404
        $resNotFound = $this->get('/katalog-pohon/tidak-ada-dalam-database');
        $resNotFound->assertStatus(404);
    }

    /**
     * Test web route /katalog/{slug} mengarahkan spesies aktif ke hash detail dan 404 jika tidak ditemukan.
     */
    public function test_web_route_katalog_slug_redirects_or_returns_404(): void
    {
        $res = $this->get('/katalog/merbau-aceh');
        $res->assertStatus(302)
            ->assertRedirect('/#katalog?species=merbau-aceh');

        $resNotFound = $this->get('/katalog/spesies-fiktif');
        $resNotFound->assertStatus(404);
    }
}
