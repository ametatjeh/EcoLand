<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Request;

class ActivityLogger
{
    public static function log(string $action, string $module, string $description, ?string $targetId = null, ?array $details = null, ?object $user = null): ?ActivityLog
    {
        try {
            $currentUser = $user ?? request()->user();
            return ActivityLog::create([
                'user_id' => $currentUser?->id,
                'user_name' => $currentUser?->name ?? ($currentUser?->username ?? 'Administrator'),
                'action' => $action,
                'module' => $module,
                'target_id' => $targetId,
                'description' => $description,
                'details' => $details,
                'ip_address' => Request::ip(),
                'user_agent' => substr((string) Request::userAgent(), 0, 255),
                'created_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Silently fail logging if error so it doesn't break business operations
            return null;
        }
    }
}
