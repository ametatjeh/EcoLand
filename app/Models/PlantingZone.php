<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class PlantingZone extends Model
{
    use SoftDeletes;

    protected $table = 'planting_zones';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'zone_code',
        'name',
        'category',
        'description',
        'planting_purpose',
        'status',
        'address',
        'village',
        'district',
        'city',
        'province',
        'latitude',
        'longitude',
        'access_notes',
        'area_size',
        'area_unit',
        'measurement_method',
        'measurement_date',
        'land_condition_notes',
        'person_in_charge',
        'organization',
        'start_date',
        'planting_target',
        'internal_notes',
        'main_photo_path',
        'gallery_photos',
        'is_published',
        'is_archived',
    ];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
        'area_size' => 'float',
        'planting_target' => 'integer',
        'is_published' => 'boolean',
        'is_archived' => 'boolean',
        'gallery_photos' => 'array',
        'measurement_date' => 'date:Y-m-d',
        'start_date' => 'date:Y-m-d',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($zone) {
            if (empty($zone->id)) {
                $zone->id = 'KW-' . strtoupper(Str::random(8));
            }
            if (empty($zone->zone_code)) {
                $zone->zone_code = 'KW-' . strtoupper(Str::random(6));
            }
        });
    }

    public function activities(): HasMany
    {
        return $this->hasMany(PlantingActivity::class, 'planting_zone_id', 'id');
    }

    public function scenes(): HasMany
    {
        return $this->hasMany(Scene::class, 'planting_zone_id', 'id');
    }

    public function hotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class, 'planting_zone_id', 'id');
    }

    public function photos(): HasMany
    {
        return $this->hasMany(PlantingZonePhoto::class, 'planting_zone_id', 'id')
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc');
    }

    public function coverPhoto()
    {
        return $this->hasOne(PlantingZonePhoto::class, 'planting_zone_id', 'id')
            ->where('is_cover', true);
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true)->where('is_archived', false);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_archived', false);
    }

    /**
     * Luas dalam Hektare untuk kalkulasi konsisten
     */
    public function getAreaInHa(): float
    {
        if (strtolower($this->area_unit) === 'm2' || strtolower($this->area_unit) === 'meter persegi') {
            return round($this->area_size / 10000, 4);
        }
        return (float) $this->area_size;
    }

    /**
     * Hitung total bibit awal ditanam di kawasan ini
     */
    public function getTotalInitialSeedlings(): int
    {
        return (int) PlantingActivityItem::whereIn(
            'planting_activity_id',
            $this->activities()->pluck('id')
        )->sum('quantity');
    }

    /**
     * Hitung jumlah jenis pohon unik di kawasan ini
     */
    public function getUniqueSpeciesCount(): int
    {
        return (int) PlantingActivityItem::whereIn(
            'planting_activity_id',
            $this->activities()->pluck('id')
        )->distinct('tree_species_id')->count('tree_species_id');
    }

    /**
     * Hitung tingkat kelulusan hidup (survival rate) terkini
     */
    public function calculateSurvivalRate(): ?float
    {
        $activityIds = $this->activities()->pluck('id');
        $totalInitial = (int) PlantingActivityItem::whereIn('planting_activity_id', $activityIds)->sum('quantity');

        if ($totalInitial <= 0) {
            return null;
        }

        // Ambil survei terakhir untuk setiap kegiatan di kawasan ini
        $latestSurveys = TreeSurvey::whereIn('planting_activity_id', $activityIds)
            ->orderBy('survey_date', 'desc')
            ->get()
            ->unique('planting_activity_id');

        if ($latestSurveys->isEmpty()) {
            return null;
        }

        $aliveCount = $latestSurveys->sum('alive_count');
        return round(($aliveCount / $totalInitial) * 100, 2);
    }
}
