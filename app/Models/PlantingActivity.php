<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class PlantingActivity extends Model
{
    protected $table = 'planting_activities';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'batch_code',
        'name',
        'activity_date',
        'person_in_charge',
        'organizer',
        'location_zone',
        'planting_zone_id',
        'scene_id',
        'photo_path',
        'notes',
    ];

    protected $casts = [
        'activity_date' => 'date:Y-m-d',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($activity) {
            if (empty($activity->id)) {
                $activity->id = 'ACT-' . strtoupper(Str::random(8));
            }
        });
    }

    public function plantingZone(): BelongsTo
    {
        return $this->belongsTo(PlantingZone::class, 'planting_zone_id', 'id');
    }

    public function scene(): BelongsTo
    {
        return $this->belongsTo(Scene::class, 'scene_id', 'id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(PlantingActivityItem::class, 'planting_activity_id', 'id');
    }

    public function treeSpecies(): BelongsToMany
    {
        return $this->belongsToMany(
            TreeSpecies::class,
            'planting_activity_items',
            'planting_activity_id',
            'tree_species_id'
        )->withPivot(['quantity', 'unit', 'seed_source', 'notes'])->withTimestamps();
    }

    public function surveys(): HasMany
    {
        return $this->hasMany(TreeSurvey::class, 'planting_activity_id', 'id')
            ->orderBy('survey_date', 'desc');
    }

    public function maintenanceLogs(): HasMany
    {
        return $this->hasMany(TreeMaintenanceLog::class, 'planting_activity_id', 'id')
            ->orderBy('maintenance_date', 'desc');
    }

    public function hotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class, 'planting_activity_id', 'id');
    }

    /**
     * Total bibit awal kelompok penanaman
     */
    public function getTotalInitialSeedlingsAttribute(): int
    {
        return (int) $this->items()->sum('quantity');
    }

    /**
     * Survei terbaru yang telah diverifikasi
     */
    public function getLatestSurveyAttribute(): ?TreeSurvey
    {
        return $this->surveys()->where('is_verified', true)->first();
    }

    /**
     * Jumlah tanaman pengganti dari penyulaman (dipisahkan secara jelas)
     */
    public function getTotalReplacementsCountAttribute(): int
    {
        return (int) $this->maintenanceLogs()
            ->where('action_type', 'penyulaman')
            ->sum('replacement_plants_count');
    }

    /**
     * Perhitungan kelangsungan hidup kelompok awal:
     * Persentase = (jumlah hidup awal ÷ jumlah bibit awal ditanam) × 100%
     * Tidak memasukkan tanaman penyulaman, dibatasi 0% s/d 100%.
     */
    public function getSurvivalRateAttribute(): ?float
    {
        $initial = $this->total_initial_seedlings;
        $latest = $this->latest_survey;

        if ($initial <= 0 || !$latest) {
            return null; // Data belum lengkap
        }

        $rate = ($latest->alive_count / $initial) * 100.0;
        return max(0.0, min(100.0, round($rate, 2)));
    }
}
