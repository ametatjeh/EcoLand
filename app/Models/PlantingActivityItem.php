<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlantingActivityItem extends Model
{
    protected $table = 'planting_activity_items';

    protected $fillable = [
        'planting_activity_id',
        'tree_species_id',
        'quantity',
        'unit',
        'seed_source',
        'notes',
        'correction_log',
    ];

    protected $casts = [
        'quantity' => 'integer',
    ];

    public function activity(): BelongsTo
    {
        return $this->belongsTo(PlantingActivity::class, 'planting_activity_id', 'id');
    }

    public function species(): BelongsTo
    {
        return $this->belongsTo(TreeSpecies::class, 'tree_species_id', 'id');
    }

    /**
     * Catat koreksi jumlah awal jika ada kesalahan administrasi
     */
    public function applyCorrection(int $newQuantity, string $reason, string $adminName): void
    {
        $old = $this->quantity;
        $timestamp = now()->toIso8601String();
        $logEntry = "[{$timestamp}] Koreksi dari {$old} menjadi {$newQuantity} {$this->unit}. Alasan: {$reason} (Oleh: {$adminName})\n";

        $this->correction_log = ($this->correction_log ? $this->correction_log : '') . $logEntry;
        $this->quantity = $newQuantity;
        $this->save();
    }
}
