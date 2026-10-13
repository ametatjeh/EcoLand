<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Cegah masalah tampilan CSS rusak/tidak termuat akibat file public/hot kedaluwarsa
        $hotPath = public_path('hot');
        if (file_exists($hotPath)) {
            $hotUrl = trim((string) file_get_contents($hotPath));
            $parsed = parse_url($hotUrl);
            $rawHost = $parsed['host'] ?? '127.0.0.1';
            $host = trim($rawHost, '[]');
            $port = (int) ($parsed['port'] ?? 5173);

            $isLive = false;
            $conn = @fsockopen($host, $port, $errno, $errstr, 0.05);
            if ($conn) {
                $isLive = true;
                fclose($conn);
            } elseif ($host === '::1' || $host === 'localhost') {
                $conn = @fsockopen('127.0.0.1', $port, $errno, $errstr, 0.05);
                if ($conn) {
                    $isLive = true;
                    fclose($conn);
                }
            }

            if (!$isLive) {
                // Server Vite offline/stale, hapus file hot agar Laravel menggunakan manifest build secara sempurna
                @unlink($hotPath);
            }
        }
    }
}
