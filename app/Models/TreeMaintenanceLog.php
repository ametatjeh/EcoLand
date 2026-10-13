<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class TreeMaintenanceLog extends Model
{
    protected $table = 'tree_maintenance_logs';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'maintenance_date',
        'planting_activity_id',
        'tree_species_id',
        'action_type',
        'plants_handled_count',
        'replacement_plants_count',
        'action_reason',
        'officer_or_team',
        'cost',
        'photo_before_path',
        'photo_after_path',
        'notes',
    ];

    protected $casts = [
        'maintenance_date' => 'date',
        'plants_handled_count' => 'integer',
        'replacement_plants_count' => 'integer',
        'cost' => 'float',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($log) {
            if (empty($log->id)) {
                $log->id = 'MNT-' . strtoupper(Str::random(8));
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
}
