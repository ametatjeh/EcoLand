<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
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
            return redirect()->route('login')->with('warning', 'Google SSO belum dikonfigurasi pada environment lokal. Silakan isi GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET pada berkas .env untuk mengaktifkan OAuth Google.');
        }

        try {
            return Socialite::driver('google')->redirect();
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

        try {
            /** @var \Laravel\Socialite\Two\User $googleUser */
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            Log::warning('Google SSO callback failure: ' . $e->getMessage(), [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
            return redirect()->route('login')->with('error', 'Gagal memproses respons autentikasi Google. Silakan coba kembali atau gunakan email dan kata sandi.');
        }

        $email = $googleUser->getEmail();
        $googleId = $googleUser->getId();

        // Validasi ketersediaan email dari Google
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return redirect()->route('login')->with('error', 'Akun Google Anda tidak menyediakan alamat email yang valid.');
        }

        // Cari akun pengguna yang sudah terdaftar
        // 1. Cari berdasarkan google_id yang sudah pernah ditautkan
        $user = User::where('google_id', $googleId)->first();

        // 2. Jika belum ditautkan dengan google_id, cari berdasarkan email terdaftar
        if (!$user) {
            $user = User::where('email', $email)->first();
        }

        // KEAMANAN: Jangan izinkan pendaftaran otomatis akun baru sebagai administrator!
        if (!$user) {
            Log::info("Google SSO rejected: Akun Google {$email} belum terdaftar di sistem Eco Land.");
            return redirect()->route('login')->with('error', "Akun Google ({$email}) belum diizinkan mengakses Eco Land. Silakan hubungi pengelola untuk mendaftarkan akun Anda.");
        }

        // Pastikan akun memiliki hak akses administrator
        if (!$user->isAdmin()) {
            Log::warning("Google SSO rejected: Pengguna {$email} (ID: {$user->id}) tidak memiliki peran administrator.");
            return redirect()->route('login')->with('error', 'Akses ditolak: Akun Anda tidak memiliki hak akses administrator Eco Land.');
        }

        // Tautkan google_id ke akun yang sah jika belum terhubung
        if (empty($user->google_id) || $user->google_id !== $googleId) {
            // Cegah duplikasi google_id pada akun lain
            $existingWithSameGoogleId = User::where('google_id', $googleId)->where('id', '!=', $user->id)->first();
            if ($existingWithSameGoogleId) {
                return redirect()->route('login')->with('error', 'Akun Google ini telah terhubung dengan akun lain di Eco Land.');
            }
            $user->google_id = $googleId;
        }

        // Update foto avatar jika tersedia
        if ($googleUser->getAvatar() && empty($user->avatar)) {
            $user->avatar = $googleUser->getAvatar();
        }

        $user->save();

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
}
