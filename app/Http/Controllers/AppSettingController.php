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
}
