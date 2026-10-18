<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Scene extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'sequence',
        'status',
        'planting_zone_id',
        'description',
        'panorama_path',
        'thumbnail_path',
        'preview_path',
        'latitude',
        'longitude',
        'face_size',
        'initial_yaw',
        'initial_pitch',
        'initial_fov',
        'levels_json',
    ];

    protected $casts = [
        'sequence' => 'integer',
        'face_size' => 'integer',
        'latitude' => 'float',
        'longitude' => 'float',
        'initial_yaw' => 'float',
        'initial_pitch' => 'float',
        'initial_fov' => 'float',
        'levels_json' => 'array',
    ];

    public function plantingZone()
    {
        return $this->belongsTo(PlantingZone::class, 'planting_zone_id', 'id');
    }

    public function hotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class, 'scene_id', 'id');
    }

    public function publishedHotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class, 'scene_id', 'id')
            ->where('status', 'published')
            ->where('is_active', true);
    }

    public function draftHotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class, 'scene_id', 'id')
            ->where('status', 'draft');
    }

    /**
     * Convert to Marzipano-compatible scene structure
     */
    public function toMarzipanoArray(bool $publishedOnly = true): array
    {
        $hotspotsQuery = $publishedOnly ? $this->publishedHotspots : $this->hotspots;

        $linkHotspots = [];
        $infoHotspots = [];

        foreach ($hotspotsQuery as $hs) {
            if ($hs->type === 'link') {
                $linkHotspots[] = [
                    'id' => $hs->id,
                    'yaw' => (float) $hs->yaw,
                    'pitch' => (float) $hs->pitch,
                    'rotation' => (float) $hs->rotation,
                    'target' => $hs->target_scene_id,
                    'title' => $hs->title,
                    'icon' => $hs->icon ?? 'arrow',
                    'status' => $hs->status,
                    'isActive' => (bool) $hs->is_active,
                ];
            } else {
                $infoHotspots[] = [
                    'id' => $hs->id,
                    'yaw' => (float) $hs->yaw,
                    'pitch' => (float) $hs->pitch,
                    'title' => $hs->title,
                    'text' => $hs->text,
                    'icon' => $hs->icon ?? 'info',
                    'status' => $hs->status,
                    'isActive' => (bool) $hs->is_active,
                ];
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'sequence' => $this->sequence,
            'status' => $this->status,
            'planting_zone_id' => $this->planting_zone_id,
            'description' => $this->description,
            'panorama' => $this->panorama_path,
            'panorama_path' => $this->panorama_path,
            'thumbnail' => $this->thumbnail_path,
            'preview' => $this->preview_path,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'faceSize' => $this->face_size,
            'levels' => $this->levels_json ?? [],
            'initial_yaw' => (float) $this->initial_yaw,
            'initial_pitch' => (float) $this->initial_pitch,
            'initial_fov' => (float) $this->initial_fov,
            'initialViewParameters' => [
                'yaw' => (float) $this->initial_yaw,
                'pitch' => (float) $this->initial_pitch,
                'fov' => (float) $this->initial_fov,
            ],
            'initialView' => [
                'yaw' => (float) $this->initial_yaw,
                'pitch' => (float) $this->initial_pitch,
                'fov' => (float) $this->initial_fov,
            ],
            'linkHotspots' => $linkHotspots,
            'infoHotspots' => $infoHotspots,
        ];
    }
}
