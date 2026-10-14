<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\TestCase;

class AuthAndGoogleSsoTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Halaman login terbuka dengan baik dan menampilkan elemen desain Eco Land.
     */
    public function test_login_page_renders_successfully_with_eco_land_branding(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertSee('Eco Land');
        $response->assertSee('Land and Green Space Management System');
        $response->assertSee('Masuk ke Eco Land');
        $response->assertSee('Atau masuk dengan');
        $response->assertSee('Masuk dengan Google');
        $response->assertSee('auth/google/redirect');
        $response->assertSee('Kembali');
    }

    /**
     * Login web berhasil dengan kredensial administrator yang valid.
     */
    public function test_web_login_succeeds_with_valid_admin_credentials(): void
    {
        $admin = User::create([
            'name' => 'Admin Test',
            'username' => 'admintest',
            'email' => 'admintest@ecoland.local',
            'password' => Hash::make('secret123'),
            'role' => 'administrator',
        ]);

        $response = $this->post('/login', [
            'username' => 'admintest',
            'password' => 'secret123',
        ]);

        $response->assertStatus(200);
        $response->assertSee('Menghubungkan Sesi Eco Land');
        $this->assertAuthenticatedAs($admin);
    }

    /**
     * Login web gagal jika kredensial salah.
     */
    public function test_web_login_fails_with_invalid_credentials(): void
    {
        $response = $this->from('/login')->post('/login', [
            'username' => 'nonexistent',
            'password' => 'wrongpass',
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('error');
        $this->assertGuest();
    }

    /**
     * Google SSO mengembalikan peringatan jika kredensial belum dikonfigurasi pada .env.
     */
    public function test_google_redirect_warns_when_credentials_not_configured(): void
    {
        config(['services.google.client_id' => '']);
        config(['services.google.client_secret' => '']);

        $response = $this->get('/auth/google/redirect');

        $response->assertRedirect('/login');
        $response->assertSessionHas('warning');
    }

    /**
     * Google SSO mengarahkan ke OAuth Google jika kredensial sudah dikonfigurasi.
     */
    public function test_google_redirect_initiates_oauth_when_credentials_present(): void
    {
        config(['services.google.client_id' => 'dummy-client-id.apps.googleusercontent.com']);
        config(['services.google.client_secret' => 'dummy-secret']);

        $response = $this->get('/auth/google/redirect');

        $response->assertStatus(302);
        $this->assertStringContainsString('accounts.google.com', $response->headers->get('Location'));
    }

    /**
     * Google SSO menolak pengguna yang belum terdaftar dan tidak membuat akun admin otomatis.
     */
    public function test_google_callback_rejects_unregistered_user_without_creating_admin(): void
    {
        config(['services.google.client_id' => 'dummy-id']);
        config(['services.google.client_secret' => 'dummy-secret']);

        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-id-unregistered-999');
        $socialiteUser->shouldReceive('getEmail')->andReturn('stranger@example.com');
        $socialiteUser->shouldReceive('getName')->andReturn('Unknown Stranger');
        $socialiteUser->shouldReceive('getAvatar')->andReturn(null);

        $provider = Mockery::mock(\Laravel\Socialite\Two\GoogleProvider::class);
        $provider->shouldReceive('stateless')->andReturnSelf();
        $provider->shouldReceive('redirectUrl')->andReturnSelf();
        $provider->shouldReceive('user')->andReturn($socialiteUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $response->assertRedirect('/login');
        $response->assertSessionHas('error');

        // Pastikan akun baru TIDAK dibuat di database
        $this->assertDatabaseMissing('users', [
            'email' => 'stranger@example.com',
        ]);
        $this->assertGuest();
    }

    /**
     * Google SSO mengautentikasi pengguna terdaftar yang sah dan menautkan google_id.
     */
    public function test_google_callback_authenticates_registered_admin_user(): void
    {
        config(['services.google.client_id' => 'dummy-id']);
        config(['services.google.client_secret' => 'dummy-secret']);

        $admin = User::create([
            'name' => 'Existing Admin',
            'username' => 'existingadmin',
            'email' => 'admin.real@ecoland.local',
            'password' => Hash::make('securepass'),
            'role' => 'administrator',
        ]);

        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-id-12345678');
        $socialiteUser->shouldReceive('getEmail')->andReturn('admin.real@ecoland.local');
        $socialiteUser->shouldReceive('getName')->andReturn('Existing Admin');
        $socialiteUser->shouldReceive('getAvatar')->andReturn('https://google.com/avatar.jpg');

        $provider = Mockery::mock(\Laravel\Socialite\Two\GoogleProvider::class);
        $provider->shouldReceive('stateless')->andReturnSelf();
        $provider->shouldReceive('redirectUrl')->andReturnSelf();
        $provider->shouldReceive('user')->andReturn($socialiteUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $response->assertStatus(200);
        $response->assertSee('Menghubungkan Sesi Eco Land');

        // Verifikasi pengguna diautentikasi dan google_id ditautkan
        $this->assertAuthenticatedAs($admin);
        $admin->refresh();
        $this->assertEquals('google-id-12345678', $admin->google_id);
        $this->assertEquals('https://google.com/avatar.jpg', $admin->avatar);
    }

    /**
     * Logout web menghapus sesi pengguna dan mengarahkan kembali ke login.
     */
    public function test_web_logout_terminates_session(): void
    {
        $admin = User::create([
            'name' => 'Logout Admin',
            'username' => 'logoutadmin',
            'email' => 'logout@ecoland.local',
            'password' => Hash::make('password'),
            'role' => 'administrator',
        ]);

        $this->actingAs($admin);

        $response = $this->post('/logout');

        $response->assertRedirect('/login');
        $this->assertGuest();
    }

    /**
     * Pengguna dengan peran petugas_penanaman dapat masuk melalui Google SSO.
     */
    public function test_google_callback_authenticates_registered_staff_with_petugas_role(): void
    {
        config(['services.google.client_id' => 'dummy-id']);
        config(['services.google.client_secret' => 'dummy-secret']);

        $staff = User::create([
            'name' => 'Petugas Lapangan',
            'username' => 'petugaslapangan',
            'email' => 'petugas@ecoland.local',
            'password' => Hash::make('securepass'),
            'role' => 'petugas_penanaman',
        ]);

        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-id-staff-555');
        $socialiteUser->shouldReceive('getEmail')->andReturn('Petugas@Ecoland.local'); // mixed case email
        $socialiteUser->shouldReceive('getName')->andReturn('Petugas Lapangan');
        $socialiteUser->shouldReceive('getAvatar')->andReturn(null);

        $provider = Mockery::mock(\Laravel\Socialite\Two\GoogleProvider::class);
        $provider->shouldReceive('stateless')->andReturnSelf();
        $provider->shouldReceive('redirectUrl')->andReturnSelf();
        $provider->shouldReceive('user')->andReturn($socialiteUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $response->assertStatus(200);
        $response->assertSee('Menghubungkan Sesi Eco Land');
        $this->assertAuthenticatedAs($staff);
    }

    /**
     * Google SSO menangani autentikasi Google stateless secara langsung.
     */
    public function test_google_callback_handles_stateless_authentication_smoothly(): void
    {
        config(['services.google.client_id' => 'dummy-id']);
        config(['services.google.client_secret' => 'dummy-secret']);

        $admin = User::create([
            'name' => 'State Test Admin',
            'username' => 'statetestadmin',
            'email' => 'state.admin@ecoland.local',
            'password' => Hash::make('securepass'),
            'role' => 'administrator',
        ]);

        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-id-state-777');
        $socialiteUser->shouldReceive('getEmail')->andReturn('state.admin@ecoland.local');
        $socialiteUser->shouldReceive('getName')->andReturn('State Test Admin');
        $socialiteUser->shouldReceive('getAvatar')->andReturn(null);

        $provider = Mockery::mock(\Laravel\Socialite\Two\GoogleProvider::class);
        $provider->shouldReceive('stateless')->andReturnSelf();
        $provider->shouldReceive('redirectUrl')->andReturnSelf();
        $provider->shouldReceive('user')->andReturn($socialiteUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        $response->assertStatus(200);
        $response->assertSee('Menghubungkan Sesi Eco Land');
        $this->assertAuthenticatedAs($admin);
    }

    /**
     * Google SSO menangani skenario tabel users yang belum memiliki kolom google_id secara self-healing.
     */
    public function test_google_callback_recovers_gracefully_when_google_id_column_is_initially_missing(): void
    {
        config(['services.google.client_id' => 'dummy-id']);
        config(['services.google.client_secret' => 'dummy-secret']);

        // Simulasikan kondisi database lama di mana kolom google_id belum dimigrasikan
        if (\Illuminate\Support\Facades\Schema::hasColumn('users', 'google_id')) {
            \Illuminate\Support\Facades\Schema::table('users', function (\Illuminate\Database\Schema\Blueprint $table) {
                try {
                    $table->dropUnique('users_google_id_unique');
                } catch (\Throwable $e) {}
                $table->dropColumn('google_id');
            });
        }
        if (\Illuminate\Support\Facades\Schema::hasColumn('users', 'avatar')) {
            \Illuminate\Support\Facades\Schema::table('users', function (\Illuminate\Database\Schema\Blueprint $table) {
                $table->dropColumn('avatar');
            });
        }

        $admin = User::create([
            'name' => 'Legacy Admin',
            'username' => 'legacyadmin',
            'email' => 'legacy.admin@ecoland.local',
            'password' => Hash::make('securepass'),
            'role' => 'administrator',
        ]);

        $socialiteUser = Mockery::mock(SocialiteUser::class);
        $socialiteUser->shouldReceive('getId')->andReturn('google-id-legacy-999');
        $socialiteUser->shouldReceive('getEmail')->andReturn('legacy.admin@ecoland.local');
        $socialiteUser->shouldReceive('getName')->andReturn('Legacy Admin');
        $socialiteUser->shouldReceive('getAvatar')->andReturn(null);

        $provider = Mockery::mock(\Laravel\Socialite\Two\GoogleProvider::class);
        $provider->shouldReceive('stateless')->andReturnSelf();
        $provider->shouldReceive('redirectUrl')->andReturnSelf();
        $provider->shouldReceive('user')->andReturn($socialiteUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $response = $this->get('/auth/google/callback');

        // Pastikan tidak melempar QueryException 1054 dan login berhasil
        $response->assertStatus(200);
        $response->assertSee('Menghubungkan Sesi Eco Land');
        $this->assertAuthenticatedAs($admin);

        // Pastikan kolom google_id berhasil dibuat secara otomatis
        $this->assertTrue(\Illuminate\Support\Facades\Schema::hasColumn('users', 'google_id'));
    }
}
