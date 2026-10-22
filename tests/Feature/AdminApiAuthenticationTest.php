<?php

namespace Tests\Feature;

use App\Models\PlantingZone;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminApiAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;
    private string $adminToken;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin Test',
            'username' => 'admintest',
            'email' => 'admintest@ecoland.local',
            'password' => Hash::make('Secret123!'),
            'role' => 'administrator',
        ]);

        $this->adminToken = $this->admin->createToken('admin_session', ['admin'])->plainTextToken;

        PlantingZone::create([
            'name' => 'Kawasan Uji Coba',
            'zone_code' => 'TEST-01',
            'status' => 'active',
            'area_size' => 2.0,
            'is_published' => true,
        ]);
    }

    /**
     * Unauthenticated guest must be rejected with 401 on private admin endpoints.
     */
    public function test_guest_is_rejected_on_admin_api_endpoints(): void
    {
        $endpoints = [
            '/api/admin/settings',
            '/api/admin/zones?sort_by=name&sort_dir=asc',
            '/api/admin/trees/activities?per_page=100',
            '/api/admin/trees/dashboard',
            '/api/admin/trees/species',
        ];

        foreach ($endpoints as $url) {
            $response = $this->getJson($url);
            $response->assertStatus(401);
            $response->assertJson([
                'message' => 'Unauthenticated.',
            ]);
        }
    }

    /**
     * Authenticated admin via Sanctum Bearer token can access all admin API endpoints.
     */
    public function test_authenticated_admin_via_sanctum_token_can_access_endpoints(): void
    {
        $headers = [
            'Authorization' => "Bearer {$this->adminToken}",
            'Accept' => 'application/json',
        ];

        $endpoints = [
            '/api/admin/settings',
            '/api/admin/zones?sort_by=name&sort_dir=asc',
            '/api/admin/trees/activities?per_page=100',
            '/api/admin/trees/dashboard',
            '/api/admin/trees/species',
        ];

        foreach ($endpoints as $url) {
            $response = $this->withHeaders($headers)->getJson($url);
            $response->assertStatus(200);
        }
    }

    /**
     * Authenticated admin via Laravel Web Session can access admin API endpoints (Stateful SPA).
     */
    public function test_authenticated_admin_via_web_session_can_access_endpoints(): void
    {
        $endpoints = [
            '/api/admin/settings',
            '/api/admin/zones?sort_by=name&sort_dir=asc',
            '/api/admin/trees/activities?per_page=100',
            '/api/admin/trees/dashboard',
            '/api/admin/trees/species',
        ];

        foreach ($endpoints as $url) {
            $response = $this->actingAs($this->admin, 'web')
                ->withSession(['admin_last_activity' => time()])
                ->getJson($url);

            $response->assertStatus(200);
        }
    }

    /**
     * Auth verify endpoint returns sync token for session users.
     */
    public function test_auth_verify_returns_synced_token_for_web_session_admin(): void
    {
        $response = $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => time()])
            ->getJson('/api/auth/verify');

        $response->assertStatus(200);
        $response->assertJson([
            'authenticated' => true,
            'user' => [
                'id' => $this->admin->id,
                'username' => 'admintest',
                'role' => 'administrator',
            ],
        ]);
        $this->assertNotNull($response->json('token'));
    }

    /**
     * Public tree-species catalog endpoint is accessible by guests without 401.
     */
    public function test_public_tree_species_catalog_is_accessible_to_guests(): void
    {
        $response = $this->getJson('/api/tree-species');
        $response->assertStatus(200);
    }

    /**
     * Logout revokes access to protected endpoints.
     */
    public function test_logout_revokes_access_to_admin_endpoints(): void
    {
        // Admin logs out
        $response = $this->withHeaders([
            'Authorization' => "Bearer {$this->adminToken}",
            'Accept' => 'application/json',
        ])->postJson('/api/auth/logout');

        $response->assertStatus(200);

        // Reset auth state in test container
        auth()->forgetGuards();

        // Accessing admin endpoint with revoked/deleted token returns 401
        $check = $this->withHeaders([
            'Authorization' => "Bearer {$this->adminToken}",
            'Accept' => 'application/json',
        ])->getJson('/api/admin/trees/species');

        $check->assertStatus(401);
    }
}
