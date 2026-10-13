<?php

namespace App\Services;

use App\Models\Hotspot;
use App\Models\Scene;
use Illuminate\Support\Collection;

class HotspotAdapter
{
    /**
     * Satukan hotspot hasil export Marzipano Tool dengan hotspot dinamis database
     * tanpa duplikasi, dengan pemisahan draft vs published.
     *
     * @param string|null $sceneId
     * @param bool $publishedOnly
     * @return array
     */
    public function getUnifiedHotspots(?string $sceneId = null, bool $publishedOnly = true): array
    {
        $query = Hotspot::with([
            'treeSpecies',
            'plantingActivity.items.species',
            'plantingActivity.surveys',
            'plantingActivity.maintenanceLogs',
        ]);

        if ($sceneId) {
            $query->where('scene_id', $sceneId);
        }

        if ($publishedOnly) {
            $query->where('status', 'published')->where('is_active', true);
        }

        $dbHotspots = $query->orderBy('created_at', 'asc')->get();

        // Indeks untuk deduplikasi
        $unified = [];
        $seenSignatures = [];

        foreach ($dbHotspots as $hs) {
            $sig = $this->generateSignature($hs->scene_id, $hs->type, $hs->yaw, $hs->pitch, $hs->target_scene_id);
            if (!isset($seenSignatures[$sig])) {
                $seenSignatures[$sig] = true;
                $unified[] = $hs->toFrontendArray();
            }
        }

        return $unified;
    }

    /**
     * Adaptasi data export Marzipano Tool ke model database
     */
    public function adaptExportSceneData(array $sceneExportData): array
    {
        $adaptedHotspots = [];
        $sceneId = $sceneExportData['id'] ?? '';

        // Link hotspots
        foreach ($sceneExportData['linkHotspots'] ?? [] as $idx => $link) {
            $adaptedHotspots[] = [
                'id' => $link['id'] ?? ('link-' . $sceneId . '-' . $idx),
                'scene_id' => $sceneId,
                'type' => 'link',
                'yaw' => (float) ($link['yaw'] ?? 0.0),
                'pitch' => (float) ($link['pitch'] ?? 0.0),
                'rotation' => (float) ($link['rotation'] ?? 0.0),
                'target_scene_id' => $link['target'] ?? null,
                'title' => $link['title'] ?? null,
                'icon' => 'arrow',
                'is_active' => true,
                'status' => 'published',
                'source' => 'export',
            ];
        }

        // Info hotspots
        foreach ($sceneExportData['infoHotspots'] ?? [] as $idx => $info) {
            $adaptedHotspots[] = [
                'id' => $info['id'] ?? ('info-' . $sceneId . '-' . $idx),
                'scene_id' => $sceneId,
                'type' => 'info',
                'yaw' => (float) ($info['yaw'] ?? 0.0),
                'pitch' => (float) ($info['pitch'] ?? 0.0),
                'rotation' => 0.0,
                'target_scene_id' => null,
                'title' => $info['title'] ?? '',
                'text' => $info['text'] ?? '',
                'icon' => 'info',
                'is_active' => true,
                'status' => 'published',
                'source' => 'export',
            ];
        }

        return $adaptedHotspots;
    }

    /**
     * Buat signature unik untuk mencegah duplikasi posisi / tujuan
     */
    protected function generateSignature(string $sceneId, string $type, float $yaw, float $pitch, ?string $target): string
    {
        $roundedYaw = round($yaw, 4);
        $roundedPitch = round($pitch, 4);
        $targetKey = $target ?? 'none';
        return "{$sceneId}_{$type}_{$roundedYaw}_{$roundedPitch}_{$targetKey}";
    }
}
