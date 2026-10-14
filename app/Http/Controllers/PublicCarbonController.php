<?php

namespace App\Http\Controllers;

use App\Services\CarbonCalculationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicCarbonController extends Controller
{
    protected CarbonCalculationService $carbonService;

    public function __construct(CarbonCalculationService $carbonService)
    {
        $this->carbonService = $carbonService;
    }

    /**
     * Endpoint publik read-only untuk ringkasan akuntansi karbon, grafik, dan transparansi data.
     * GET /api/carbon/public-summary
     */
    public function summary(Request $request): JsonResponse
    {
        $zoneId = $request->query('zone_id');
        $data = $this->carbonService->getPublicCarbonSummary($zoneId);

        return response()->json($data);
    }
}
