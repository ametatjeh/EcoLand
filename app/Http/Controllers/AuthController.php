<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use App\Models\User;
use App\Services\RecaptchaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Login administrator dan generate Sanctum bearer token.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Username dan password wajib diisi.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('username', $request->username)
            ->orWhere('email', $request->username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Username atau password admin salah!',
            ], 401);
        }

        // Pastikan hanya role administrator yang diizinkan
        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak: Akun tidak memiliki hak akses administrator.',
            ], 403);
        }

        // Catat waktu login terakhir pengguna
        $user->forceFill(['last_login_at' => now()])->save();

        // Hapus token lama jika ada agar bersih
        $user->tokens()->where('name', 'admin_session')->delete();

        // Buat token Sanctum baru
        $token = $user->createToken('admin_session', ['admin'])->plainTextToken;

        // Inisialisasi timestamp aktivitas admin di session & Redis
        $now = time();
        if ($request->hasSession()) {
            $request->session()->put('admin_last_activity', $now);
        }
        try {
            \Illuminate\Support\Facades\Cache::put("admin_last_activity:{$user->id}", $now, 1920);
        } catch (\Throwable $e) {}

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    /**
     * Verifikasi status autentikasi token saat ini.
     */
    public function verify(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $token = null;
            if (!$request->bearerToken() && method_exists($user, 'createToken')) {
                // Bersihkan token lama (>24 jam) tanpa menghapus token aktif yang mungkin sedang dipakai tab/request lain
                $user->tokens()->where('name', 'admin_session')->where('created_at', '<', now()->subHours(24))->delete();
                $token = $user->createToken('admin_session', ['admin'])->plainTextToken;
            }

            return response()->json([
                'authenticated' => true,
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ]);
        }

        return response()->json(['authenticated' => false], 401);
    }

    /**
     * Logout dan cabut token saat ini.
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $token = $user->currentAccessToken();
            if ($token && is_object($token) && method_exists($token, 'delete')) {
                $token->delete();
            }
            try {
                \Illuminate\Support\Facades\Cache::forget("admin_last_activity:{$user->id}");
            } catch (\Throwable $e) {}
        }

        if ($request->hasSession()) {
            $request->session()->forget('admin_last_activity');
        }

        return response()->json([
            'success' => true,
            'message' => 'Berhasil logout',
        ]);
    }

    /**
     * Tampilkan halaman login visual Eco Land.
     */
    public function showLoginForm(RecaptchaService $recaptchaService)
    {
        if (Auth::check() && Auth::user()->isAdmin()) {
            return redirect('/#admin/dashboard');
        }

        $appLogo = AppSetting::getVal('app_logo');
        $recaptchaEnabled = $recaptchaService->isEnabled();
        $recaptchaSiteKey = $recaptchaService->getSiteKey();

        return view('auth.login', compact('appLogo', 'recaptchaEnabled', 'recaptchaSiteKey'));
    }

    /**
     * Proses autentikasi formulir web login Eco Land dengan proteksi reCAPTCHA v3 & Rate Limiting.
     */
    public function loginWeb(Request $request, RecaptchaService $recaptchaService)
    {
        $username = trim((string) $request->input('username', ''));
        $throttleKey = Str::transliterate(Str::lower($username) . '|' . $request->ip());

        // 1. Rate Limiting: Maksimal 5 percobaan gagal per 60 detik
        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);

            Log::warning('login_rate_limited', [
                'ip' => $request->ip(),
                'identifier' => Str::mask($username, '*', 2, -2),
                'available_in' => $seconds,
                'timestamp' => now()->toIso8601String(),
            ]);

            return back()->withInput($request->only('username'))
                ->with('error', "Terlalu banyak percobaan masuk yang gagal. Silakan coba kembali dalam {$seconds} detik.");
        }

        // 2. Validasi input form
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
            'recaptcha_token' => 'nullable|string',
        ], [
            'username.required' => 'Email atau username administrator wajib diisi.',
            'password.required' => 'Kata sandi wajib diisi.',
        ]);

        if ($validator->fails()) {
            RateLimiter::hit($throttleKey, 60);
            return back()->withInput($request->only('username'))
                ->with('error', $validator->errors()->first());
        }

        // 3. Verifikasi Google reCAPTCHA v3 Server-Side
        if ($recaptchaService->isEnabled()) {
            $recaptchaToken = $request->input('recaptcha_token') ?: $request->input('g-recaptcha-response');
            $recaptchaResult = $recaptchaService->verify($recaptchaToken, $request->ip(), 'login');

            if (!($recaptchaResult['success'] ?? false)) {
                RateLimiter::hit($throttleKey, 60);

                Log::warning('recaptcha_login_failed', [
                    'ip' => $request->ip(),
                    'identifier' => Str::mask($username, '*', 2, -2),
                    'action' => $recaptchaResult['action'] ?? null,
                    'score_category' => isset($recaptchaResult['score']) ? ($recaptchaResult['score'] < 0.5 ? 'low' : 'acceptable') : 'none',
                    'reason_code' => $recaptchaResult['error_code'] ?? 'verification_failed',
                    'timestamp' => now()->toIso8601String(),
                ]);

                return back()->withInput($request->only('username'))
                    ->with('error', 'Verifikasi keamanan gagal. Silakan coba lagi.');
            }
        }

        // 4. Autentikasi Kredensial Administrator
        $user = User::where('username', $username)
            ->orWhere('email', $username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            RateLimiter::hit($throttleKey, 60);
            return back()->withInput($request->only('username'))
                ->with('error', 'Email atau kata sandi tidak valid.');
        }

        if (!$user->isAdmin()) {
            RateLimiter::hit($throttleKey, 60);
            return back()->withInput($request->only('username'))
                ->with('error', 'Akses ditolak: Akun Anda tidak memiliki hak akses administrator Eco Land.');
        }

        // 5. Autentikasi Sukses: Bersihkan Rate Limiter
        RateLimiter::clear($throttleKey);

        // Catat waktu login terakhir pengguna
        $user->forceFill(['last_login_at' => now()])->save();

        // Login ke Web Session Laravel (Remember Me dinonaktifkan demi kepatuhan keamanan sesi Admin)
        Auth::login($user, false);
        $request->session()->regenerate();

        // Inisialisasi timestamp aktivitas administrator di session & Redis
        $now = time();
        $request->session()->put('admin_last_activity', $now);
        try {
            \Illuminate\Support\Facades\Cache::put("admin_last_activity:{$user->id}", $now, 1920);
        } catch (\Throwable $e) {}

        // Buat token Sanctum untuk sinkronisasi SPA
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
            ],
        ]);
    }

    /**
     * Logout dari sesi web.
     */
    public function logoutWeb(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            try {
                \Illuminate\Support\Facades\Cache::forget("admin_last_activity:{$user->id}");
            } catch (\Throwable $e) {}
            Auth::logout();
        }

        $request->session()->forget('admin_last_activity');
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('success', 'Anda telah keluar dari sesi administrator Eco Land.');
    }

    /**
     * Perpanjang durasi sesi administrator aktif (Keep-Alive Ping).
     */
    public function keepAlive(Request $request)
    {
        $user = $request->user() ?: Auth::user();

        if (!$user || !method_exists($user, 'isAdmin') || !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'authenticated' => false,
                'message' => 'Unauthenticated or not an administrator',
            ], 401);
        }

        $timeoutMinutes = (int) config('session.admin_idle_timeout', 30);
        $warningMinutes = (int) config('session.admin_idle_warning', 5);
        $now = time();

        if ($request->hasSession()) {
            $request->session()->put('admin_last_activity', $now);
        }

        try {
            \Illuminate\Support\Facades\Cache::put(
                "admin_last_activity:{$user->id}",
                $now,
                ($timeoutMinutes * 60) + 120
            );
        } catch (\Throwable $e) {}

        return response()->json([
            'success' => true,
            'authenticated' => true,
            'message' => 'Sesi administrator berhasil diperpanjang.',
            'idle_timeout_minutes' => $timeoutMinutes,
            'idle_warning_minutes' => $warningMinutes,
            'last_activity' => $now,
            'expires_at' => $now + ($timeoutMinutes * 60),
        ]);
    }
}
