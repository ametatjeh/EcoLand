<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use App\Services\ActivityLogger;
use Illuminate\Http\Request;

class AppSettingController extends Controller
{
    public function index()
    {
        $settings = AppSetting::all()->groupBy('group');
        return response()->json([
            'success' => true,
            'settings' => $settings,
            'flat' => AppSetting::pluck('value', 'key'),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->input('settings', []);
        if (!is_array($data)) {
            return response()->json(['success' => false, 'message' => 'Format pengaturan tidak valid'], 422);
        }

        foreach ($data as $key => $value) {
            AppSetting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => is_bool($value) ? ($value ? '1' : '0') : (string) $value,
                    'updated_at' => now(),
                ]
            );
        }

        ActivityLogger::log('update', 'settings', 'Memperbarui pengaturan sistem dan identitas organisasi', null, $data);

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan aplikasi berhasil disimpan.',
            'flat' => AppSetting::pluck('value', 'key'),
        ]);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|file|mimes:jpeg,jpg,png,webp,svg|max:2048',
        ]);

        $file = $request->file('logo');
        $extension = $file->getClientOriginalExtension() ?: 'png';
        $filename = 'app_logo_' . date('Ymd_His') . '.' . strtolower($extension);
        $storedPath = $file->storeAs('settings', $filename, 'public');
        $logoUrl = '/storage/' . $storedPath;

        AppSetting::updateOrCreate(
            ['key' => 'app_logo'],
            [
                'value' => $logoUrl,
                'group' => 'general',
                'label' => 'Logo Aplikasi',
                'type' => 'image',
                'updated_at' => now(),
            ]
        );

        ActivityLogger::log('update', 'settings', 'Mengunggah logo aplikasi baru: ' . $logoUrl, null, ['app_logo' => $logoUrl]);

        return response()->json([
            'success' => true,
            'message' => 'Logo aplikasi berhasil diunggah.',
            'logo_url' => $logoUrl,
            'flat' => AppSetting::pluck('value', 'key'),
        ]);
    }

    public function removeLogo(Request $request)
    {
        AppSetting::updateOrCreate(
            ['key' => 'app_logo'],
            [
                'value' => '',
                'group' => 'general',
                'label' => 'Logo Aplikasi',
                'type' => 'image',
                'updated_at' => now(),
            ]
        );

        ActivityLogger::log('update', 'settings', 'Menghapus kustom logo aplikasi (kembali ke ikon default)', null, ['app_logo' => '']);

        return response()->json([
            'success' => true,
            'message' => 'Logo aplikasi berhasil direset ke default.',
            'logo_url' => null,
            'flat' => AppSetting::pluck('value', 'key'),
        ]);
    }
}
