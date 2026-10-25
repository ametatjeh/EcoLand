<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class UserLastLoginTest extends TestCase
{
    use RefreshDatabase;

    private User $admin;

    protected function setUp(): void
    {
        parent::setUp();

        $this->admin = User::create([
            'name' => 'Admin Test',
            'username' => 'admintest',
            'email' => 'admin@ecoland.local',
            'password' => Hash::make('Secret123!'),
            'role' => 'administrator',
        ]);
    }

    /**
     * 1. Pengguna baru/belum pernah login memiliki nilai last_login_at NULL.
     */
    public function test_new_user_has_null_last_login_at(): void
    {
        $this->assertNull($this->admin->last_login_at);
    }

    /**
     * 2. Login berhasil via API memperbarui last_login_at.
     */
    public function test_api_login_success_updates_last_login_at(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-10-26 10:00:00'));

        $this->assertNull($this->admin->last_login_at);

        $response = $this->postJson('/api/auth/login', [
            'username' => 'admintest',
            'password' => 'Secret123!',
        ]);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        $this->admin->refresh();
        $this->assertNotNull($this->admin->last_login_at);
        $this->assertEquals('2026-10-26 10:00:00', $this->admin->last_login_at->toDateTimeString());
    }

    /**
     * 3. Login berhasil via Web form memperbarui last_login_at.
     */
    public function test_web_login_success_updates_last_login_at(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-10-26 11:30:00'));

        $this->assertNull($this->admin->last_login_at);

        $response = $this->post('/login', [
            'username' => 'admintest',
            'password' => 'Secret123!',
        ]);

        $response->assertStatus(200);

        $this->admin->refresh();
        $this->assertNotNull($this->admin->last_login_at);
        $this->assertEquals('2026-10-26 11:30:00', $this->admin->last_login_at->toDateTimeString());
    }

    /**
     * 4. Login gagal tidak memperbarui last_login_at.
     */
    public function test_failed_login_does_not_update_last_login_at(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-10-26 12:00:00'));

        // API login gagal
        $responseApi = $this->postJson('/api/auth/login', [
            'username' => 'admintest',
            'password' => 'WrongPassword',
        ]);
        $responseApi->assertStatus(401);

        $this->admin->refresh();
        $this->assertNull($this->admin->last_login_at);

        // Web login gagal
        $responseWeb = $this->from('/login')->post('/login', [
            'username' => 'admintest',
            'password' => 'WrongPassword',
        ]);
        $responseWeb->assertStatus(302);

        $this->admin->refresh();
        $this->assertNull($this->admin->last_login_at);
    }

    /**
     * 5. Login via Google OAuth SSO memperbarui last_login_at.
     */
    public function test_google_oauth_login_updates_last_login_at(): void
    {
        Carbon::setTestNow(Carbon::parse('2026-10-26 14:15:00'));

        $googleUser = Mockery::mock(SocialiteUser::class);
        $googleUser->shouldReceive('getId')->andReturn('google-unique-uid-12345');
        $googleUser->shouldReceive('getEmail')->andReturn('admin@ecoland.local');
        $googleUser->shouldReceive('getName')->andReturn('Admin Test');
        $googleUser->shouldReceive('getAvatar')->andReturn('https://lh3.googleusercontent.com/photo.jpg');

        $driver = Mockery::mock(\Laravel\Socialite\Contracts\Provider::class);
        $driver->shouldReceive('stateless')->andReturnSelf();
        $driver->shouldReceive('redirectUrl')->andReturnSelf();
        $driver->shouldReceive('user')->andReturn($googleUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($driver);

        config([
            'services.google.client_id' => 'mock-client-id',
            'services.google.client_secret' => 'mock-client-secret',
        ]);

        $this->assertNull($this->admin->last_login_at);

        $response = $this->get('/auth/google/callback');
        $response->assertStatus(200);

        $this->admin->refresh();
        $this->assertNotNull($this->admin->last_login_at);
        $this->assertEquals('2026-10-26 14:15:00', $this->admin->last_login_at->toDateTimeString());
    }

    /**
     * 6. Navigasi, verify token, atau refresh halaman tidak memperbarui last_login_at.
     */
    public function test_page_refresh_and_session_verify_do_not_update_last_login_at(): void
    {
        $initialTime = Carbon::parse('2026-10-26 09:00:00');
        $this->admin->forceFill(['last_login_at' => $initialTime])->save();

        // 1 jam kemudian, user aktif melakukan verifikasi sesi / berpindah halaman
        Carbon::setTestNow(Carbon::parse('2026-10-26 10:00:00'));

        $token = $this->admin->createToken('admin_session', ['admin'])->plainTextToken;

        $response = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/auth/verify');

        $response->assertStatus(200);

        $this->admin->refresh();
        // Nilai last_login_at harus tetap 09:00:00
        $this->assertEquals('2026-10-26 09:00:00', $this->admin->last_login_at->toDateTimeString());
    }

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        Mockery::close();
        parent::tearDown();
    }
}
