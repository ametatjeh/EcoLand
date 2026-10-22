<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class RecaptchaService
{
    /**
     * URL Endpoint Verifikasi Google reCAPTCHA v3.
     */
    protected const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

    /**
     * Cek apakah Google reCAPTCHA diaktifkan pada konfigurasi.
     */
    public function isEnabled(): bool
    {
        return (bool) config('services.recaptcha.enabled', false);
    }

    /**
     * Dapatkan Site Key publik untuk frontend.
     */
    public function getSiteKey(): string
    {
        return (string) config('services.recaptcha.site_key', '');
    }

    /**
     * Verifikasi token reCAPTCHA v3 terhadap server Google.
     *
     * @param string|null $token Token respon yang dikirim oleh frontend grecaptcha.execute
     * @param string|null $clientIp Alamat IP klien (opsional)
     * @param string|null $expectedAction Action yang diharapkan (default: login)
     * @return array Hasil evaluasi verifikasi
     */
    public function verify(?string $token, ?string $clientIp = null, ?string $expectedAction = null): array
    {
        // 1. Jika dinonaktifkan (misal: development / local testing), loloskan otomatis
        if (!$this->isEnabled()) {
            return [
                'success' => true,
                'score' => 1.0,
                'action' => $expectedAction ?: 'login',
                'hostname' => 'localhost',
                'reason' => 'recaptcha_disabled',
            ];
        }

        // 2. Token wajib ada jika reCAPTCHA diaktifkan
        if (empty($token)) {
            return [
                'success' => false,
                'error_code' => 'missing_token',
                'reason' => 'Token reCAPTCHA tidak disertakan.',
            ];
        }

        // 3. Secret key wajib tersedia di server
        $secretKey = config('services.recaptcha.secret_key');
        if (empty($secretKey)) {
            Log::error('recaptcha_configuration_error', [
                'message' => 'RECAPTCHA_SECRET_KEY belum dikonfigurasikan di environment server.',
                'timestamp' => now()->toIso8601String(),
            ]);

            return [
                'success' => false,
                'error_code' => 'missing_secret_key',
                'reason' => 'Konfigurasi keamanan reCAPTCHA server belum lengkap.',
            ];
        }

        $expectedAction = $expectedAction ?: config('services.recaptcha.login_action', 'login');
        $scoreThreshold = (float) config('services.recaptcha.score_threshold', 0.5);

        // 4. Request Verifikasi ke Google API
        try {
            $payload = [
                'secret' => $secretKey,
                'response' => $token,
            ];
            if ($clientIp) {
                $payload['remoteip'] = $clientIp;
            }

            $response = Http::asForm()
                ->timeout(5)
                ->post(self::VERIFY_URL, $payload);

            if (!$response->successful()) {
                Log::warning('recaptcha_network_error', [
                    'status_code' => $response->status(),
                    'timestamp' => now()->toIso8601String(),
                ]);

                return [
                    'success' => false,
                    'error_code' => 'http_error_' . $response->status(),
                    'reason' => 'Gagal menghubungi server Google reCAPTCHA.',
                ];
            }

            $data = $response->json();
        } catch (\Throwable $e) {
            Log::error('recaptcha_exception', [
                'error' => $e->getMessage(),
                'timestamp' => now()->toIso8601String(),
            ]);

            return [
                'success' => false,
                'error_code' => 'connection_exception',
                'reason' => 'Terjadi kesalahan jaringan saat memvalidasi reCAPTCHA.',
            ];
        }

        // 5. Validasi status 'success' dari Google
        if (!($data['success'] ?? false)) {
            $errorCodes = $data['error-codes'] ?? [];
            return [
                'success' => false,
                'error_code' => !empty($errorCodes) ? implode(',', $errorCodes) : 'verification_failed',
                'reason' => 'Verifikasi reCAPTCHA Google ditolak.',
            ];
        }

        // 6. Validasi Action (harus persis sesuai action 'login')
        $actualAction = $data['action'] ?? null;
        if ($actualAction !== $expectedAction) {
            return [
                'success' => false,
                'error_code' => 'action_mismatch',
                'action' => $actualAction,
                'expected_action' => $expectedAction,
                'reason' => "Action reCAPTCHA tidak sesuai: {$actualAction} !== {$expectedAction}",
            ];
        }

        // 7. Validasi Hostname (jika didefinisikan pada konfigurasi)
        $allowedHostnames = config('services.recaptcha.allowed_hostnames');
        if (!empty($allowedHostnames)) {
            $allowedList = array_map('trim', explode(',', $allowedHostnames));
            $actualHostname = $data['hostname'] ?? '';

            if (!in_array($actualHostname, $allowedList, true)) {
                return [
                    'success' => false,
                    'error_code' => 'hostname_mismatch',
                    'hostname' => $actualHostname,
                    'reason' => "Hostname '{$actualHostname}' tidak terdaftar dalam domain yang diizinkan.",
                ];
            }
        }

        // 8. Validasi Challenge Timestamp (Token Freshness: maksimal 2 menit / 120 detik)
        if (!empty($data['challenge_ts'])) {
            $challengeTime = strtotime($data['challenge_ts']);
            if ($challengeTime && (time() - $challengeTime) > 120) {
                return [
                    'success' => false,
                    'error_code' => 'token_expired',
                    'reason' => 'Token reCAPTCHA sudah kedaluwarsa (lebih dari 2 menit).',
                ];
            }
        }

        // 9. Validasi Skor reCAPTCHA v3 (Robot vs Human)
        $score = isset($data['score']) ? (float) $data['score'] : 0.0;
        if ($score < $scoreThreshold) {
            return [
                'success' => false,
                'score' => $score,
                'threshold' => $scoreThreshold,
                'error_code' => 'score_below_threshold',
                'reason' => "Skor reCAPTCHA ({$score}) berada di bawah ambang batas ({$scoreThreshold}).",
            ];
        }

        // 10. Seluruh validasi berhasil lolos
        return [
            'success' => true,
            'score' => $score,
            'action' => $actualAction,
            'hostname' => $data['hostname'] ?? null,
            'challenge_ts' => $data['challenge_ts'] ?? null,
            'reason' => 'verified',
        ];
    }
}
