<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $query = ActivityLog::query();

        if ($request->filled('module') && $request->module !== 'all') {
            $query->where('module', $request->module);
        }

        if ($request->filled('action')) {
            $query->where('action', 'like', '%' . $request->action . '%');
        }

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('description', 'like', $term)
                  ->orWhere('user_name', 'like', $term)
                  ->orWhere('target_id', 'like', $term);
            });
        }

        $logs = $query->orderBy('created_at', 'desc')->paginate($request->input('per_page', 25));

        return response()->json([
            'success' => true,
            'logs' => $logs->items(),
            'pagination' => [
                'current_page' => $logs->currentPage(),
                'last_page' => $logs->lastPage(),
                'per_page' => $logs->perPage(),
                'total' => $logs->total(),
            ],
        ]);
    }
}
