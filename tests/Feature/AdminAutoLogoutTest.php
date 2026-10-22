<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tests\TestCase;

class AdminAutoLogoutTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin Eco Security',
            'username' => 'adminsec',
            'email' => 'adminsec@ecoland.local',
            'password' => Hash::make('SecretPass123!'),
            'role' => 'administrator',
        ]);
    }

    /**
     * 1. Pengguna terautentikasi memiliki sesi aktif dan timestamp aktivitas diperbarui.
     */
    public function test_authenticated_admin_active_session_updates_activity_timestamp(): void
    {
        Config::set('session.admin_idle_timeout', 30);

        $now = time();

        $response = $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => $now - 60]) // 1 menit yang lalu
            ->get('/health');

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($this->admin, 'web');
        $this->assertGreaterThanOrEqual($now, session('admin_last_activity'));
    }

    /**
     * 2. Pengguna yang diam selama 24 menit (di bawah 30 menit) TIDAK di-logout.
     */
    public function test_inactive_session_before_timeout_is_not_logged_out(): void
    {
        Config::set('session.admin_idle_timeout', 30);

        $past = time() - (24 * 60); // 24 menit yang lalu

        $response = $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => $past])
            ->get('/health');

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($this->admin, 'web');
    }

    /**
     * 3. Sesi yang tidak aktif selama 30 menit atau lebih otomatis di-logout,
     * session di-invalidate, dan diarahkan ke login dengan pesan peringatan.
     */
    public function test_expired_session_triggers_auto_logout_and_redirects_to_login(): void
    {
        Config::set('session.admin_idle_timeout', 30);

        $expiredTime = time() - (31 * 60); // 31 menit yang lalu (sudah expired)

        $response = $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => $expiredTime])
            ->get('/admin/dashboard');

        // Otomatis diarahkan ke halaman login
        $response->assertRedirect(route('login'));
        $response->assertSessionHas('warning', 'Sesi Anda telah berakhir karena tidak ada aktivitas selama 30 menit. Silakan login kembali.');

        // User harus benar-benar sudah tidak authenticated
        $this->assertGuest('web');
    }

    /**
     * 4. Permintaan API/AJAX dengan sesi yang sudah expired mengembalikan status 401
     * dengan flag session_expired: true dan redirect_url.
     */
    public function test_expired_session_on_api_returns_401_json_error(): void
    {
        Config::set('session.admin_idle_timeout', 30);

        $expiredTime = time() - (35 * 60); // 35 menit yang lalu
        \Illuminate\Support\Facades\Cache::put("admin_last_activity:{$this->admin->id}", $expiredTime);

        $response = $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => $expiredTime])
            ->getJson('/api/auth/verify');

        $response->assertStatus(401);
        $response->assertJson([
            'success' => false,
            'authenticated' => false,
            'session_expired' => true,
        ]);
        $response->assertJsonPath('redirect_url', route('login'));

        $this->assertGuest('web');
    }

    /**
     * 5. Endpoint Keep-Alive (/admin/session/keep-alive dan /api/auth/session-ping)
     * berhasil memperpanjang sesi dan mereset waktu aktivitas.
     */
    public function test_keep_alive_endpoint_refreshes_session_timestamp(): void
    {
        Config::set('session.admin_idle_timeout', 30);
        Config::set('session.admin_idle_warning', 5);

        $past = time() - (25 * 60); // 25 menit yang lalu (fase warning)

        $response = $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => $past])
            ->postJson('/admin/session/keep-alive');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'authenticated' => true,
            'idle_timeout_minutes' => 30,
            'idle_warning_minutes' => 5,
        ]);

        $this->assertAuthenticatedAs($this->admin, 'web');
        $this->assertGreaterThan($past, session('admin_last_activity'));
    }

    /**
     * 6. Endpoint API Keep-Alive (/api/auth/session-ping) berfungsi untuk klien SPA.
     */
    public function test_api_session_ping_endpoint_refreshes_spa_session(): void
    {
        Config::set('session.admin_idle_timeout', 30);

        $token = $this->admin->createToken('admin_session', ['admin'])->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer {$token}")
            ->postJson('/api/auth/session-ping');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'authenticated' => true,
        ]);
    }

    /**
     * 7. Halaman publik (beranda, info, katalog, dll) tidak terpengaruh oleh timeout inaktivitas admin.
     */
    public function test_public_pages_are_accessible_freely_without_admin_timeout(): void
    {
        $response = $this->get('/health');
        $response->assertStatus(200);

        $response = $this->get('/api/scenes');
        $response->assertStatus(200);
    }

    /**
     * 8. Security Audit Logging mencatat event admin_auto_logout saat sesi kedaluwarsa
     * tanpa membocorkan rahasia atau password.
     */
    public function test_security_logging_records_auto_logout_without_secrets(): void
    {
        Config::set('session.admin_idle_timeout', 30);

        Log::shouldReceive('warning')
            ->once()
            ->with('admin_auto_logout', \Mockery::on(function ($data) {
                return isset($data['user_id'])
                    && $data['user_id'] === $this->admin->id
                    && isset($data['reason'])
                    && $data['reason'] === 'inactivity_timeout'
                    && !isset($data['password'])
                    && !isset($data['token'])
                    && !isset($data['session_id']);
            }));

        $expiredTime = time() - (32 * 60);

        $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => $expiredTime])
            ->get('/admin/dashboard');

        $this->assertGuest('web');
    }
}
