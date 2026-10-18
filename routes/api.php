<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SceneController;
use App\Http\Controllers\HotspotController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\PlantingZoneController;
use App\Http\Controllers\TreeSpeciesController;
use App\Http\Controllers\PlantingActivityController;
use App\Http\Controllers\TreeSurveyController;
use App\Http\Controllers\TreeMaintenanceController;
use App\Http\Controllers\TreeDashboardController;
use App\Http\Controllers\TreeReportController;
use App\Http\Controllers\TreeImportExportController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\AppSettingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PublicCarbonController;

// ─── Public Routes ──────────────────────────────────────────────
Route::get('/scenes', [SceneController::class, 'index']);
Route::get('/scenes/custom', [SceneController::class, 'getCustomNames']);
Route::get('/scenes/{id}', [SceneController::class, 'show']);
Route::get('/hotspots', [HotspotController::class, 'getPublicHotspots']);
Route::get('/scenes/{sceneId}/hotspots', [HotspotController::class, 'getScenePublicHotspots']);

// Public Kawasan Penanaman & Galeri Foto
Route::get('/zones', [PlantingZoneController::class, 'publicIndex']);
Route::get('/zones/{id}', [PlantingZoneController::class, 'publicShow']);
Route::get('/zones/{id}/photos', [PlantingZoneController::class, 'publicPhotos']);
Route::get('/photos', [PlantingZoneController::class, 'allPublicPhotos']);

// Public Tree Species Catalog & Settings
Route::get('/tree-species', [TreeSpeciesController::class, 'publicIndex']);
Route::get('/tree-species/{id}', [TreeSpeciesController::class, 'publicShow']);
Route::get('/settings/public', [AppSettingController::class, 'index']);

// Public Monitoring Karbon
Route::get('/carbon/public-summary', [PublicCarbonController::class, 'summary']);

// Ekspor Laporan CSV & Unduhan Template (Dapat diakses langsung via link browser maupun terautentikasi)
Route::get('/admin/trees/reports/summary/csv', [TreeReportController::class, 'exportPlantingSummaryCsv']);
Route::get('/admin/trees/reports/species/csv', [TreeReportController::class, 'exportSpeciesCsv']);
Route::get('/admin/trees/reports/surveys/csv', [TreeReportController::class, 'exportSurveysCsv']);
Route::get('/admin/trees/import/template/{type}', [TreeImportExportController::class, 'downloadTemplate']);
Route::get('/admin/backup/export', [BackupController::class, 'export']);
Route::get('/backup/export', [BackupController::class, 'export']);

// Auth routes
Route::post('/auth/login', [AuthController::class, 'login']);

// ─── Protected Routes (Admin) ───────────────────────────────────
Route::middleware(['auth:sanctum,web'])->group(function () {
    Route::get('/auth/verify', [AuthController::class, 'verify']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Hotspot endpoints (matches frontend editor)
    Route::post('/hotspots', [HotspotController::class, 'saveOrBatch']);
    Route::post('/scenes/rename', [SceneController::class, 'rename']);
    Route::post('/backup/import', [BackupController::class, 'import']);

    // Admin Hotspot, Scene, Zones, Trees, Settings Management
    Route::prefix('admin')->group(function () {
        // 1. Hotspots
        Route::get('/hotspots', [HotspotController::class, 'adminIndex']);
        Route::post('/hotspots', [HotspotController::class, 'store']);
        Route::get('/hotspots/{id}', [HotspotController::class, 'adminShow']);
        Route::put('/hotspots/{id}', [HotspotController::class, 'update']);
        Route::delete('/hotspots/{id}', [HotspotController::class, 'destroy']);
        Route::post('/hotspots/{id}/duplicate', [HotspotController::class, 'duplicate']);
        Route::patch('/hotspots/{id}/position', [HotspotController::class, 'updatePosition']);
        Route::patch('/hotspots/{id}/toggle-active', [HotspotController::class, 'toggleActive']);
        Route::post('/hotspots/{id}/publish', [HotspotController::class, 'publish']);
        Route::post('/hotspots/publish-all', [HotspotController::class, 'publishAll']);

        // 2. Scenes
        Route::get('/scenes', [SceneController::class, 'index']);
        Route::put('/scenes/{id}', [SceneController::class, 'update']);
        Route::patch('/scenes/{id}/rename', [SceneController::class, 'rename']);

        // 3. Modul Manajemen Kawasan & Galeri Foto
        Route::get('/zones', [PlantingZoneController::class, 'index']);
        Route::post('/zones', [PlantingZoneController::class, 'store']);
        Route::get('/zones/{id}', [PlantingZoneController::class, 'show']);
        Route::put('/zones/{id}', [PlantingZoneController::class, 'update']);
        Route::delete('/zones/{id}', [PlantingZoneController::class, 'destroy']);
        Route::post('/zones/{id}/archive', [PlantingZoneController::class, 'archive']);
        Route::post('/zones/{id}/link-scenes', [PlantingZoneController::class, 'linkScenes']);
        Route::get('/zones/{id}/photos', [PlantingZoneController::class, 'getPhotos']);
        Route::post('/zones/{id}/photos', [PlantingZoneController::class, 'uploadPhotos']);
        Route::put('/zones/{id}/photos/{photoId}', [PlantingZoneController::class, 'updatePhoto']);
        Route::delete('/zones/{id}/photos/{photoId}', [PlantingZoneController::class, 'deletePhoto']);
        Route::post('/zones/{id}/photos/{photoId}/set-cover', [PlantingZoneController::class, 'setCoverPhoto']);
        Route::post('/zones/{id}/photos/reorder', [PlantingZoneController::class, 'reorderPhotos']);

        // 4. Cadangan & Pemulihan
        Route::post('/backup/import', [BackupController::class, 'import']);

        // 5. Pengaturan & Identitas Organisasi
        Route::get('/settings', [AppSettingController::class, 'index']);
        Route::post('/settings', [AppSettingController::class, 'update']);
        Route::put('/settings', [AppSettingController::class, 'update']);
        Route::post('/settings/logo', [AppSettingController::class, 'uploadLogo']);
        Route::delete('/settings/logo', [AppSettingController::class, 'removeLogo']);

        // 6. Pengguna & Hak Akses
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);

        // 7. Log Aktivitas
        Route::get('/activity-logs', [ActivityLogController::class, 'index']);

        // 8. Modul Data Penanaman dan Pemantauan Pohon
        Route::prefix('trees')->group(function () {
            // Dashboard Penanaman
            Route::get('/dashboard', [TreeDashboardController::class, 'index']);

            // Master Jenis Pohon
            Route::get('/species', [TreeSpeciesController::class, 'index']);
            Route::post('/species', [TreeSpeciesController::class, 'store']);
            Route::get('/species/{id}', [TreeSpeciesController::class, 'show']);
            Route::put('/species/{id}', [TreeSpeciesController::class, 'update']);
            Route::delete('/species/{id}', [TreeSpeciesController::class, 'destroy']);

            // Kegiatan Penanaman
            Route::get('/activities', [PlantingActivityController::class, 'index']);
            Route::post('/activities', [PlantingActivityController::class, 'store']);
            Route::get('/activities/{id}', [PlantingActivityController::class, 'show']);
            Route::put('/activities/{id}', [PlantingActivityController::class, 'update']);
            Route::delete('/activities/{id}', [PlantingActivityController::class, 'destroy']);
            Route::post('/activities/items/{id}/correct', [PlantingActivityController::class, 'correctItem']);

            // Pemantauan Pertumbuhan
            Route::get('/surveys', [TreeSurveyController::class, 'index']);
            Route::post('/surveys', [TreeSurveyController::class, 'store']);
            Route::get('/surveys/{id}', [TreeSurveyController::class, 'show']);
            Route::put('/surveys/{id}', [TreeSurveyController::class, 'update']);
            Route::delete('/surveys/{id}', [TreeSurveyController::class, 'destroy']);

            // Perawatan dan Penyulaman
            Route::get('/maintenance', [TreeMaintenanceController::class, 'index']);
            Route::post('/maintenance', [TreeMaintenanceController::class, 'store']);
            Route::get('/maintenance/{id}', [TreeMaintenanceController::class, 'show']);
            Route::put('/maintenance/{id}', [TreeMaintenanceController::class, 'update']);
            Route::delete('/maintenance/{id}', [TreeMaintenanceController::class, 'destroy']);

            // Impor dan Ekspor Data
            Route::post('/import/preview', [TreeImportExportController::class, 'previewImport']);
            Route::post('/import/execute', [TreeImportExportController::class, 'executeImport']);
        });
    });
});
