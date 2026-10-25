<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Str;

class TreeSpecies extends Model
{
    protected $table = 'tree_species';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'local_name',
        'common_name',
        'scientific_name',
        'family',
        'origin_status',
        'ecological_function',
        'benefits',
        'description',
        'photo_path',
        'reference_source',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($species) {
            if (empty($species->id)) {
                $species->id = Str::slug($species->common_name ?: $species->scientific_name);
                // Cegah tabrakan slug ID
                if (static::where('id', $species->id)->exists()) {
                    $species->id .= '-' . Str::random(4);
                }
            }
        });
    }

    public function activityItems(): HasMany
    {
        return $this->hasMany(PlantingActivityItem::class, 'tree_species_id', 'id');
    }

    public function plantingActivities(): BelongsToMany
    {
        return $this->belongsToMany(
            PlantingActivity::class,
            'planting_activity_items',
            'tree_species_id',
            'planting_activity_id'
        )->withPivot(['quantity', 'unit', 'seed_source', 'notes'])->withTimestamps();
    }

    public function surveys(): HasMany
    {
        return $this->hasMany(TreeSurvey::class, 'tree_species_id', 'id');
    }

    public function maintenanceLogs(): HasMany
    {
        return $this->hasMany(TreeMaintenanceLog::class, 'tree_species_id', 'id');
    }

    public function hotspots(): HasMany
    {
        return $this->hasMany(Hotspot::class, 'tree_species_id', 'id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Hitung total bibit awal yang tercatat pernah ditanam
     */
    public function getTotalPlantedCountAttribute(): int
    {
        return (int) $this->activityItems()->sum('quantity');
    }

    /**
     * Format data publik yang aman (tanpa data sensitif internal), faktual, dan transparan
     */
    public function toPublicArray(): array
    {
        // 1. Data kegiatan penanaman
        $activityItems = $this->relationLoaded('activityItems')
            ? $this->activityItems
            : $this->activityItems()->with(['activity.plantingZone', 'activity.scene'])->get();

        $hasPlanted = $activityItems->isNotEmpty();
        $totalPlanted = $hasPlanted ? (int) $activityItems->sum('quantity') : null;

        $plantings = $activityItems->map(function ($it) {
            $act = $it->activity;
            return [
                'activity_id' => $act?->id,
                'batch_code' => $act?->batch_code,
                'activity_name' => $act?->name,
                'activity_date' => $act?->activity_date?->format('Y-m-d'),
                'quantity' => $it->quantity,
                'unit' => $it->unit ?? 'batang',
                'seed_source' => $it->seed_source,
                'location_zone' => $act?->location_zone,
                'zone_id' => $act?->planting_zone_id,
                'zone_name' => $act?->plantingZone?->name,
                'person_in_charge' => $act?->person_in_charge,
                'organizer' => $act?->organizer,
                'scene_id' => $act?->scene_id,
                'scene_name' => $act?->scene?->name,
            ];
        })->values();

        // 2. Data survei pemantauan faktual
        $surveys = $this->relationLoaded('surveys')
            ? $this->surveys
            : $this->surveys()->orderBy('survey_date', 'desc')->get();

        $latestSpeciesSurvey = $surveys->where('is_verified', true)->first() ?: $surveys->first();

        $latestSurveyData = null;
        if ($latestSpeciesSurvey) {
            $initial = $totalPlanted ?: 0;
            $rate = ($initial > 0) ? round(($latestSpeciesSurvey->alive_count / $initial) * 100, 1) : null;
            $latestSurveyData = [
                'scope' => 'spesies',
                'scope_label' => 'Sensus Spesifik Spesies',
                'survey_id' => $latestSpeciesSurvey->id,
                'survey_date' => $latestSpeciesSurvey->survey_date?->format('Y-m-d'),
                'alive_count' => $latestSpeciesSurvey->alive_count,
                'dead_count' => $latestSpeciesSurvey->dead_count,
                'missing_count' => $latestSpeciesSurvey->missing_count,
                'uninspected_count' => $latestSpeciesSurvey->uninspected_count,
                'health_condition' => $latestSpeciesSurvey->health_condition,
                'survival_rate' => $rate,
                'average_height_cm' => $latestSpeciesSurvey->average_height_cm,
                'average_diameter_cm' => $latestSpeciesSurvey->average_diameter_cm,
                'inspector_name' => $latestSpeciesSurvey->inspector_name,
                'field_notes' => $latestSpeciesSurvey->field_notes,
                'is_verified' => (bool) $latestSpeciesSurvey->is_verified,
            ];
        } else {
            // Cek survei kelompok penanaman (batch-level) dari kegiatan yang diikuti
            $relatedSurveys = $activityItems->map(fn($it) => $it->activity?->latest_survey)
                ->filter()
                ->sortByDesc('survey_date')
                ->values();

            $batchSurvey = $relatedSurveys->first();
            if ($batchSurvey) {
                $batchInitial = $batchSurvey->activity?->total_initial_seedlings ?: 0;
                $batchRate = ($batchInitial > 0) ? round(($batchSurvey->alive_count / $batchInitial) * 100, 1) : null;
                $latestSurveyData = [
                    'scope' => 'batch',
                    'scope_label' => 'Pemantauan Kelompok Batch',
                    'batch_code' => $batchSurvey->activity?->batch_code,
                    'activity_name' => $batchSurvey->activity?->name,
                    'survey_id' => $batchSurvey->id,
                    'survey_date' => $batchSurvey->survey_date?->format('Y-m-d'),
                    'alive_count' => $batchSurvey->alive_count,
                    'dead_count' => $batchSurvey->dead_count,
                    'missing_count' => $batchSurvey->missing_count,
                    'uninspected_count' => $batchSurvey->uninspected_count,
                    'health_condition' => $batchSurvey->health_condition,
                    'survival_rate' => $batchRate,
                    'average_height_cm' => $batchSurvey->average_height_cm,
                    'average_diameter_cm' => $batchSurvey->average_diameter_cm,
                    'inspector_name' => $batchSurvey->inspector_name,
                    'field_notes' => $batchSurvey->field_notes,
                    'is_verified' => (bool) $batchSurvey->is_verified,
                    'scope_note' => 'Catatan: Data survei tercatat pada tingkat kelompok penanaman (batch). Sensus spesifik per individu jenis pohon belum tersedia.',
                ];
            }
        }

        // 3. Titik panorama
        $scenes = $activityItems
            ->whereNotNull('activity.scene_id')
            ->map(fn($it) => [
                'activity_id' => $it->activity?->id,
                'scene_id' => $it->activity?->scene_id,
                'scene_name' => $it->activity?->scene?->name,
                'zone' => $it->activity?->location_zone,
            ])->unique('scene_id')->values();

        return [
            'id' => $this->id,
            'local_name' => $this->local_name,
            'common_name' => $this->common_name,
            'scientific_name' => $this->scientific_name,
            'family' => $this->family,
            'origin_status' => $this->origin_status,
            'origin_status_label' => match($this->origin_status) {
                'lokal_asli' => 'Jenis Asli / Lokal',
                'introduksi' => 'Jenis Introduksi',
                default => 'Belum Diverifikasi',
            },
            'ecological_function' => $this->ecological_function,
            'benefits' => $this->benefits,
            'description' => $this->description,
            'photo_path' => $this->photo_path,
            'reference_source' => $this->reference_source,
            'has_planted_data' => $hasPlanted,
            'total_planted' => $totalPlanted,
            'activities_count' => $activityItems->count(),
            'plantings' => $plantings,
            'latest_survey' => $latestSurveyData,
            'scenes' => $scenes,
        ];
    }
}
