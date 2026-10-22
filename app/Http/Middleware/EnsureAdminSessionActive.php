<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminSessionActive
{
    /**
     * Handle an incoming request.
     * Memeriksa inaktivitas sesi administrator. Jika melebihi batas waktu (default 30 menit),
     * sesi akan otomatis di-logout, session Redis di-invalidate, dan diarahkan ke login.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user() ?: Auth::user();

        // Terapkan perlindungan hanya untuk pengguna administrator terautentikasi
        if ($user && method_exists($user, 'isAdmin') && $user->isAdmin()) {
            $timeoutMinutes = (int) config('session.admin_idle_timeout', 30);
            $timeoutSeconds = $timeoutMinutes * 60;
            $now = time();

            // Ambil timestamp aktivitas terakhir dari Session atau Redis Cache
            $lastActivity = null;
            if ($request->hasSession()) {
                $lastActivity = $request->session()->get('admin_last_activity');
            }

            if (!$lastActivity && $user) {
                try {
                    $lastActivity = Cache::get("admin_last_activity:{$user->id}");
                } catch (\Throwable $e) {
                    $lastActivity = null;
                }
            }

            // Jika ada riwayat aktivitas sebelumnya, evaluasi durasi inaktivitas
            if ($lastActivity !== null) {
                $idleSeconds = $now - (int) $lastActivity;

                if ($idleSeconds >= $timeoutSeconds) {
                    // 1. Audit Security Logging (tanpa password/token/credential/session ID)
                    Log::warning('admin_auto_logout', [
                        'user_id' => $user->id,
                        'username' => $user->username,
                        'idle_seconds' => $idleSeconds,
                        'timeout_seconds' => $timeoutSeconds,
                        'timestamp' => now()->toIso8601String(),
                        'reason' => 'inactivity_timeout',
                    ]);

                    // 2. Bersihkan timestamp di session & Redis/Cache
                    if ($request->hasSession()) {
                        $request->session()->forget('admin_last_activity');
                    }
                    try {
                        Cache::forget("admin_last_activity:{$user->id}");
                    } catch (\Throwable $e) {}

                    // 3. Cabut token Sanctum administrator
                    if (method_exists($user, 'currentAccessToken') && $user->currentAccessToken()) {
                        $token = $user->currentAccessToken();
                        if (is_object($token) && method_exists($token, 'delete')) {
                            $token->delete();
                        }
                    }
                    $user->tokens()->where('name', 'admin_session')->delete();

                    // 4. Logout dan Invalidate Sesi Server
                    try {
                        if (Auth::guard('web')->check()) {
                            Auth::guard('web')->logout();
                        } elseif (method_exists(Auth::guard(), 'logout')) {
                            Auth::guard()->logout();
                        }
                    } catch (\Throwable $e) {}

                    if ($request->hasSession()) {
                        $request->session()->invalidate();
                        $request->session()->regenerateToken();
                    }

                    // 5. Kembalikan respon sesuai tipe request
                    $message = "Sesi Anda telah berakhir karena tidak ada aktivitas selama {$timeoutMinutes} menit. Silakan login kembali.";

                    if ($request->expectsJson() || $request->is('api/*')) {
                        return response()->json([
                            'success' => false,
                            'authenticated' => false,
                            'session_expired' => true,
                            'message' => $message,
                            'redirect_url' => route('login'),
                        ], 401);
                    }

                    return redirect()->route('login')->with('warning', $message);
                }
            }

            // Perbarui timestamp aktivitas terbaru di Session dan Redis/Cache
            if ($request->hasSession()) {
                $request->session()->put('admin_last_activity', $now);
            }
            try {
                Cache::put("admin_last_activity:{$user->id}", $now, $timeoutSeconds + 120);
            } catch (\Throwable $e) {}
        }

        return $next($request);
    }
}
