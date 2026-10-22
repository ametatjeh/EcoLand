<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\RateLimiter;
use Tests\TestCase;

class AdminRecaptchaLoginTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin Sec',
            'username' => 'adminsec',
            'email' => 'adminsec@ecoland.local',
            'password' => Hash::make('SecretPass123!'),
            'role' => 'administrator',
        ]);

        RateLimiter::clear('login:adminsec|127.0.0.1');
    }

    private function configureRecaptcha(array $overrides = []): void
    {
        Config::set('services.recaptcha.enabled', $overrides['enabled'] ?? true);
        Config::set('services.recaptcha.site_key', $overrides['site_key'] ?? 'test-site-key');
        Config::set('services.recaptcha.secret_key', $overrides['secret_key'] ?? 'test-secret-key');
        Config::set('services.recaptcha.score_threshold', $overrides['score_threshold'] ?? 0.5);
        Config::set('services.recaptcha.login_action', $overrides['login_action'] ?? 'login');
        Config::set('services.recaptcha.allowed_hostnames', $overrides['allowed_hostnames'] ?? 'ecoland.local');
    }

    /**
     * Test 1 — Valid reCAPTCHA: score >= threshold, action = login, hostname valid, success = true
     */
    public function test_1_valid_recaptcha_allows_login(): void
    {
        $this->configureRecaptcha();

        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
                'score' => 0.9,
                'action' => 'login',
                'hostname' => 'ecoland.local',
                'challenge_ts' => now()->toIso8601String(),
            ], 200),
        ]);

        $response = $this->post('/login', [
            'username' => 'adminsec',
            'password' => 'SecretPass123!',
            'recaptcha_token' => 'valid-token-string',
        ]);

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($this->admin);
        Http::assertSent(fn ($request) => str_contains($request->url(), 'siteverify'));
    }

    /**
     * Test 2 — Score rendah: score < threshold ditolak
     */
    public function test_2_low_score_recaptcha_is_rejected(): void
    {
        $this->configureRecaptcha(['score_threshold' => 0.5]);

        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
                'score' => 0.3,
                'action' => 'login',
                'hostname' => 'ecoland.local',
                'challenge_ts' => now()->toIso8601String(),
            ], 200),
        ]);

        $response = $this->from('/login')->post('/login', [
            'username' => 'adminsec',
            'password' => 'SecretPass123!',
            'recaptcha_token' => 'low-score-token',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('error', 'Verifikasi keamanan gagal. Silakan coba lagi.');
        $this->assertGuest();
    }

    /**
     * Test 3 — Action salah: action != login ditolak
     */
    public function test_3_wrong_action_recaptcha_is_rejected(): void
    {
        $this->configureRecaptcha(['login_action' => 'login']);

        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
                'score' => 0.9,
                'action' => 'register',
                'hostname' => 'ecoland.local',
                'challenge_ts' => now()->toIso8601String(),
            ], 200),
        ]);

        $response = $this->from('/login')->post('/login', [
            'username' => 'adminsec',
            'password' => 'SecretPass123!',
            'recaptcha_token' => 'wrong-action-token',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('error', 'Verifikasi keamanan gagal. Silakan coba lagi.');
        $this->assertGuest();
    }

    /**
     * Test 4 — Hostname salah: hostname tidak terdaftar ditolak
     */
    public function test_4_wrong_hostname_recaptcha_is_rejected(): void
    {
        $this->configureRecaptcha(['allowed_hostnames' => 'ecoland.local']);

        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
                'score' => 0.9,
                'action' => 'login',
                'hostname' => 'malicious-phishing.com',
                'challenge_ts' => now()->toIso8601String(),
            ], 200),
        ]);

        $response = $this->from('/login')->post('/login', [
            'username' => 'adminsec',
            'password' => 'SecretPass123!',
            'recaptcha_token' => 'foreign-hostname-token',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('error', 'Verifikasi keamanan gagal. Silakan coba lagi.');
        $this->assertGuest();
    }

    /**
     * Test 5 — Token invalid: Google mengembalikan success = false
     */
    public function test_5_invalid_token_recaptcha_is_rejected(): void
    {
        $this->configureRecaptcha();

        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => false,
                'error-codes' => ['invalid-input-response'],
            ], 200),
        ]);

        $response = $this->from('/login')->post('/login', [
            'username' => 'adminsec',
            'password' => 'SecretPass123!',
            'recaptcha_token' => 'invalid-token',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('error', 'Verifikasi keamanan gagal. Silakan coba lagi.');
        $this->assertGuest();
    }

    /**
     * Test 6 — Token expired: challenge timestamp lebih dari batas toleransi (120 detik)
     */
    public function test_6_expired_token_recaptcha_is_rejected(): void
    {
        $this->configureRecaptcha();

        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
                'score' => 0.9,
                'action' => 'login',
                'hostname' => 'ecoland.local',
                'challenge_ts' => now()->subMinutes(10)->toIso8601String(),
            ], 200),
        ]);

        $response = $this->from('/login')->post('/login', [
            'username' => 'adminsec',
            'password' => 'SecretPass123!',
            'recaptcha_token' => 'stale-expired-token',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('error', 'Verifikasi keamanan gagal. Silakan coba lagi.');
        $this->assertGuest();
    }

    /**
     * Test 7 — reCAPTCHA disabled pada development: login dapat diuji tanpa memanggil Google
     */
    public function test_7_recaptcha_disabled_on_development_allows_login(): void
    {
        $this->configureRecaptcha(['enabled' => false]);

        Http::fake();

        $response = $this->post('/login', [
            'username' => 'adminsec',
            'password' => 'SecretPass123!',
        ]);

        $response->assertStatus(200);
        $this->assertAuthenticatedAs($this->admin);
        Http::assertNothingSent();
    }

    /**
     * Test 8 — Rate limit: repeated login attempts dibatasi (5 per menit)
     */
    public function test_8_rate_limiting_blocks_repeated_failed_attempts(): void
    {
        $this->configureRecaptcha(['enabled' => false]);

        // Attempt 5 failed logins
        for ($i = 0; $i < 5; $i++) {
            $response = $this->from('/login')->post('/login', [
                'username' => 'adminsec',
                'password' => 'WrongPassword!',
            ]);
            $response->assertRedirect('/login');
            $response->assertSessionHas('error', 'Email atau kata sandi tidak valid.');
        }

        // 6th attempt should be blocked by RateLimiter
        $response = $this->from('/login')->post('/login', [
                'username' => 'adminsec',
                'password' => 'WrongPassword!',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('error');
        $this->assertStringContainsString('Terlalu banyak percobaan masuk', session('error'));
    }

    /**
     * Test 9 — CSRF protection aktif pada form web login
     */
    public function test_9_csrf_protection_is_active_for_login(): void
    {
        $this->withoutMiddleware(\App\Http\Middleware\EnsureAdminSessionActive::class);

        $response = $this->get('/login');
        $response->assertStatus(200);
        $response->assertSee('name="_token"', false);
    }

    /**
     * Test 10 — Auto logout: 30 menit inactivity diarahkan ke logout dengan pesan timeout
     */
    public function test_10_auto_logout_after_30_minutes_inactivity(): void
    {
        Config::set('session.admin_idle_timeout', 30);

        $past = time() - (31 * 60); // 31 menit yang lalu

        $response = $this->actingAs($this->admin, 'web')
            ->withSession(['admin_last_activity' => $past])
            ->get('/health');

        $response->assertRedirect('/login');
        $response->assertSessionHas('warning', 'Sesi Anda telah berakhir karena tidak ada aktivitas selama 30 menit. Silakan login kembali.');
        $this->assertGuest('web');
    }
}
