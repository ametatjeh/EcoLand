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
     * Format data publik yang aman (tanpa data sensitif internal)
     */
    public function toPublicArray(): array
    {
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
            'total_planted' => $this->total_planted_count,
            'activities_count' => $this->plantingActivities()->count(),
            'scenes' => $this->plantingActivities()
                ->whereNotNull('scene_id')
                ->with('scene')
                ->get()
                ->map(fn($a) => [
                    'activity_id' => $a->id,
                    'scene_id' => $a->scene_id,
                    'scene_name' => $a->scene?->name,
                    'zone' => $a->location_zone,
                ])->unique('scene_id')->values(),
        ];
    }
}
