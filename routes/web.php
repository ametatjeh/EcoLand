<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // Tangani file public/hot kedaluwarsa secara aman tanpa menghapus jika server masih aktif
    $hotPath = public_path('hot');
    if (file_exists($hotPath)) {
        $hotUrl = trim(file_get_contents($hotPath));
        $parsed = parse_url($hotUrl);
        $rawHost = $parsed['host'] ?? '127.0.0.1';
        $host = trim($rawHost, '[]');
        $port = (int) ($parsed['port'] ?? 5173);

        $isLive = false;
        $connection = @fsockopen($host, $port, $errno, $errstr, 0.1);
        if ($connection) {
            $isLive = true;
            fclose($connection);
        } elseif ($host === '::1' || $host === 'localhost') {
            $connection = @fsockopen('127.0.0.1', $port, $errno, $errstr, 0.1);
            if ($connection) {
                $isLive = true;
                fclose($connection);
            }
        }

        if (!$isLive) {
            // Server Vite tidak merespons, hapus hot file kedaluwarsa agar fallback ke build assets
            @unlink($hotPath);
        }
    }

    $publishedZones = \App\Models\PlantingZone::published()->get();
    $publishedZoneIds = $publishedZones->pluck('id');
    $totalAreaHa = (float) $publishedZones->sum(fn ($z) => $z->getAreaInHa());
    $totalAreaM2 = (float) round($totalAreaHa * 10000, 2);

    $totalSeedlings = (int) \App\Models\PlantingActivityItem::whereHas('activity', function ($q) use ($publishedZoneIds) {
        $q->whereIn('planting_zone_id', $publishedZoneIds);
    })->sum('quantity');
    if ($totalSeedlings === 0 && \App\Models\PlantingActivityItem::count() > 0) {
        $totalSeedlings = (int) \App\Models\PlantingActivityItem::sum('quantity');
    }

    $initialAreaSummary = [
        'total_area_ha' => round($totalAreaHa, 4),
        'total_area_m2' => $totalAreaM2,
        'total_zones' => $publishedZones->count(),
        'total_trees' => $totalSeedlings,
        'total_seedlings' => $totalSeedlings,
    ];

    if (view()->exists('app')) {
        return view('app', compact('initialAreaSummary'));
    }

    $indexPath = public_path('../index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }

    return response()->json([
        'status' => 'online',
        'application' => 'Eco Land API Backend',
        'version' => '1.0.0',
        'framework' => 'Laravel ' . app()->version(),
    ]);
});

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'framework' => 'Laravel ' . app()->version(),
        'php' => PHP_VERSION,
        'database' => config('database.default'),
        'timestamp' => now()->toIso8601String(),
    ]);
});

// ─────────────────────────────────────────────────────────────
// Eco Land Authentication & Google OAuth Routes
// ─────────────────────────────────────────────────────────────
Route::get('/login', [\App\Http\Controllers\AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'loginWeb'])->name('login.post');
Route::match(['get', 'post'], '/logout', [\App\Http\Controllers\AuthController::class, 'logoutWeb'])->name('logout');

Route::get('/auth/google/redirect', [\App\Http\Controllers\GoogleAuthController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [\App\Http\Controllers\GoogleAuthController::class, 'callback'])->name('auth.google.callback');

// ─────────────────────────────────────────────────────────────
// File Streaming Fallback for Production (aaPanel/Nginx/Symlink safety)
// ─────────────────────────────────────────────────────────────
Route::get('/storage/{path}', function (string $path) {
    // Prevent directory traversal
    $cleanPath = str_replace(['..', "\0"], '', $path);
    $cleanPath = ltrim($cleanPath, '/\\');

    // 1. Primary: storage/app/public/ (tempat upload Laravel)
    $storageFile = storage_path('app/public/' . $cleanPath);
    if (file_exists($storageFile) && is_file($storageFile)) {
        return response()->file($storageFile, [
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }

    // 2. Fallback: public/storage/ (jika file fisik tersimpan langsung di folder public)
    $publicFile = public_path('storage/' . $cleanPath);
    if (file_exists($publicFile) && is_file($publicFile)) {
        return response()->file($publicFile, [
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }

    abort(404, 'File not found');
})->where('path', '.*')->name('storage.local');

