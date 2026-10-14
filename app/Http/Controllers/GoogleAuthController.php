<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\InvalidStateException;

class GoogleAuthController extends Controller
{
    /**
     * Dapatkan URL callback redirect Google OAuth yang sesuai dengan konteks domain/request.
     */
    public function getRedirectUrl(): string
    {
        $currentHost = request()->getHost();
        $configured = config('services.google.redirect');

        // 1. Prioritas domain produksi utama Eco Land (selalu HTTPS dan tanpa port internal)
        if ($currentHost === 'scooby.nagakecil.site') {
            return 'https://scooby.nagakecil.site/auth/google/callback';
        }

        // 2. Jika konfigurasi eksplisit di .env memiliki host yang cocok dengan request host saat ini
        if (!empty($configured)) {
            $parsed = parse_url($configured);
            $configuredHost = $parsed['host'] ?? null;

            if ($configuredHost === $currentHost) {
                return $configured;
            }
        }

        // 3. Deteksi otomatis untuk lingkungan lokal / development
        $isHttps = request()->isSecure() || request()->header('x-forwarded-proto') === 'https';
        $scheme = $isHttps ? 'https' : 'http';
        $port = (int) request()->getPort();

        // Jangan sertakan port standar HTTP (80) atau HTTPS (443) atau port 0
        $isStandardPort = ($scheme === 'http' && $port === 80) || ($scheme === 'https' && $port === 443) || $port === 0;

        // Jika bukan host lokal, jangan pernah sertakan port (karena domain publik biasanya di balik reverse proxy)
        $isLocalHost = in_array($currentHost, ['localhost', '127.0.0.1', '::1'], true) || str_ends_with($currentHost, '.local');
        if (!$isLocalHost) {
            $isStandardPort = true;
        }

        $hostWithPort = $isStandardPort ? $currentHost : "{$currentHost}:{$port}";

        return "{$scheme}://{$hostWithPort}/auth/google/callback";
    }

    /**
     * Arahkan pengguna ke halaman OAuth Google.
     */
    public function redirect()
    {
        $clientId = config('services.google.client_id');
        $clientSecret = config('services.google.client_secret');

        // Jika kredensial Google belum dikonfigurasi pada .env
        if (empty($clientId) || empty($clientSecret)) {
            Log::info('Google SSO attempted but GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not configured in .env');
            return redirect()->route('login')->with('warning', 'Google SSO belum dikonfigurasi pada environment ini. Silakan isi GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET pada berkas .env untuk mengaktifkan OAuth Google.');
        }

        try {
            $redirectUrl = $this->getRedirectUrl();
            return Socialite::driver('google')
                ->stateless()
                ->redirectUrl($redirectUrl)
                ->redirect();
        } catch (\Throwable $e) {
            Log::error('Gagal menginisiasi Google OAuth redirect: ' . $e->getMessage());
            return redirect()->route('login')->with('error', 'Terjadi kesalahan saat menghubungi layanan Google: ' . $e->getMessage());
        }
    }

    /**
     * Tangani callback dari Google OAuth.
     */
    public function callback(Request $request)
    {
        // Tangani jika pengguna membatalkan otorisasi pada layar consent Google
        if ($request->has('error')) {
            $errorCode = $request->query('error');
            Log::info("Google SSO consent was denied or canceled: {$errorCode}");
            return redirect()->route('login')->with('warning', 'Autentikasi dengan akun Google dibatalkan.');
        }

        $clientId = config('services.google.client_id');
        $clientSecret = config('services.google.client_secret');
        if (empty($clientId) || empty($clientSecret)) {
            return redirect()->route('login')->with('warning', 'Google SSO belum dikonfigurasi.');
        }

        $redirectUrl = $this->getRedirectUrl();

        try {
            /** @var \Laravel\Socialite\Two\User $googleUser */
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->redirectUrl($redirectUrl)
                ->user();
        } catch (\Throwable $e) {
            Log::warning('Google SSO callback failure: ' . $e->getMessage(), [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'redirect_url' => $redirectUrl,
            ]);
            return redirect()->route('login')->with('error', 'Gagal memproses respons autentikasi Google: ' . $e->getMessage());
        }

        $email = strtolower(trim((string) $googleUser->getEmail()));
        $googleId = (string) $googleUser->getId();

        // Validasi ketersediaan email dari Google
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->route('login')->with('error', 'Akun Google Anda tidak menyediakan alamat email yang valid.');
        }

        // Pastikan kolom google_id dan avatar tersedia pada database secara aman dan idempotent
        $hasGoogleId = $this->ensureGoogleColumnsExist();

        // Cari akun pengguna yang sudah terdaftar
        $user = null;

        // 1. Cari berdasarkan google_id yang sudah pernah ditautkan (hanya jika kolom tersedia di schema)
        if ($hasGoogleId && !empty($googleId)) {
            try {
                $user = User::where('google_id', $googleId)->first();
            } catch (\Throwable $e) {
                Log::warning('Error querying user by google_id: ' . $e->getMessage());
                $user = null;
            }
        }

        // 2. Jika belum ditemukan dengan google_id, cari berdasarkan email terdaftar (case-insensitive)
        if (!$user) {
            $user = User::whereRaw('LOWER(email) = ?', [$email])->first();
        }

        // KEAMANAN: Jangan izinkan pendaftaran otomatis akun baru untuk akun asing
        if (!$user) {
            Log::info("Google SSO rejected: Akun Google {$email} belum terdaftar di sistem Eco Land.");
            return redirect()->route('login')->with('error', "Akun Google ({$email}) belum terdaftar sebagai administrator atau staf Eco Land. Silakan hubungi pengelola sistem untuk mendaftarkan akun Anda.");
        }

        // Pastikan akun memiliki hak akses panel
        if (!$user->isAdmin()) {
            Log::warning("Google SSO rejected: Pengguna {$email} (ID: {$user->id}) tidak memiliki hak akses sistem.");
            return redirect()->route('login')->with('error', 'Akses ditolak: Akun Anda tidak memiliki hak akses administrator Eco Land.');
        }

        // Tautkan google_id ke akun yang sah jika kolom tersedia pada tabel users
        if ($hasGoogleId && !empty($googleId)) {
            if (empty($user->google_id) || $user->google_id !== $googleId) {
                // Cegah duplikasi google_id pada akun lain
                $existingWithSameGoogleId = User::where('google_id', $googleId)->where('id', '!=', $user->id)->first();
                if ($existingWithSameGoogleId) {
                    return redirect()->route('login')->with('error', 'Akun Google ini telah terhubung dengan akun lain di Eco Land.');
                }
                $user->google_id = $googleId;
            }

            // Update foto avatar jika tersedia dan pengguna belum punya avatar lokal
            if (Schema::hasColumn('users', 'avatar') && $googleUser->getAvatar() && empty($user->avatar)) {
                $user->avatar = $googleUser->getAvatar();
            }

            // Simpan perubahan tautan google_id tanpa menyentuh password lokal existing
            $user->save();
        }

        // Login ke Web Session
        Auth::login($user, true);
        $request->session()->regenerate();

        // Generate Sanctum Bearer Token untuk frontend SPA
        $user->tokens()->where('name', 'admin_session')->delete();
        $token = $user->createToken('admin_session', ['admin'])->plainTextToken;

        return view('auth.sso-success', [
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'avatar' => $user->avatar,
            ],
        ]);
    }

    /**
     * Pastikan kolom google_id dan avatar tersedia pada tabel users secara aman dan idempotent.
     */
    protected function ensureGoogleColumnsExist(): bool
    {
        try {
            if (Schema::hasTable('users')) {
                if (!Schema::hasColumn('users', 'google_id')) {
                    Schema::table('users', function (Blueprint $table) {
                        $table->string('google_id')->nullable()->unique();
                    });
                }
                if (!Schema::hasColumn('users', 'avatar')) {
                    Schema::table('users', function (Blueprint $table) {
                        $table->string('avatar')->nullable();
                    });
                }
                return Schema::hasColumn('users', 'google_id');
            }
            return false;
        } catch (\Throwable $e) {
            Log::warning('Notice: Could not automatically ensure google_id/avatar columns in users table: ' . $e->getMessage());
            return Schema::hasColumn('users', 'google_id');
        }
    }
}
