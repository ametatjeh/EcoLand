<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class TreeSurvey extends Model
{
    protected $table = 'tree_surveys';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'survey_date',
        'planting_activity_id',
        'tree_species_id',
        'alive_count',
        'dead_count',
        'missing_count',
        'uninspected_count',
        'average_height_cm',
        'average_diameter_cm',
        'health_condition',
        'damage_symptoms',
        'photo_path',
        'inspector_name',
        'field_notes',
        'recommendations',
        'is_verified',
        'is_estimate',
    ];

    protected $casts = [
        'survey_date' => 'date',
        'alive_count' => 'integer',
        'dead_count' => 'integer',
        'missing_count' => 'integer',
        'uninspected_count' => 'integer',
        'average_height_cm' => 'float',
        'average_diameter_cm' => 'float',
        'is_verified' => 'boolean',
        'is_estimate' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($survey) {
            if (empty($survey->id)) {
                $survey->id = 'SRV-' . strtoupper(Str::random(8));
            }
        });
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(PlantingActivity::class, 'planting_activity_id', 'id');
    }

    public function species(): BelongsTo
    {
        return $this->belongsTo(TreeSpecies::class, 'tree_species_id', 'id');
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }
}
