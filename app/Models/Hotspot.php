<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class Hotspot extends Model
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'scene_id',
        'type',
        'yaw',
        'pitch',
        'rotation',
        'target_scene_id',
        'title',
        'text',
        'icon',
        'info_source_type',
        'tree_species_id',
        'planting_activity_id',
        'planting_zone_id',
        'display_settings',
        'is_active',
        'status',
        'version_id',
        'source',
    ];

    protected $casts = [
        'yaw' => 'float',
        'pitch' => 'float',
        'rotation' => 'float',
        'is_active' => 'boolean',
        'display_settings' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($hotspot) {
            if (empty($hotspot->id)) {
                $prefix = $hotspot->type === 'link' ? 'link' : 'info';
                $hotspot->id = $prefix . '-' . Str::random(8);
            }
        });
    }

    public function scene(): BelongsTo
    {
        return $this->belongsTo(Scene::class, 'scene_id', 'id');
    }

    public function targetScene(): BelongsTo
    {
        return $this->belongsTo(Scene::class, 'target_scene_id', 'id');
    }

    public function treeSpecies(): BelongsTo
    {
        return $this->belongsTo(TreeSpecies::class, 'tree_species_id', 'id');
    }

    public function plantingActivity(): BelongsTo
    {
        return $this->belongsTo(PlantingActivity::class, 'planting_activity_id', 'id');
    }

    public function plantingZone(): BelongsTo
    {
        return $this->belongsTo(PlantingZone::class, 'planting_zone_id', 'id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    public function scopeDraft(Builder $query): Builder
    {
        return $query->where('status', 'draft');
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeForScene(Builder $query, string $sceneId): Builder
    {
        return $query->where('scene_id', $sceneId);
    }

    /**
     * Hasilkan judul dan teks dinamis berdasarkan info_source_type
     */
    public function getResolvedContent(): array
    {
        $title = $this->title;
        $text = $this->text;

        if ($this->type === 'info') {
            if ($this->info_source_type === 'tree_species' && $this->treeSpecies) {
                $sp = $this->treeSpecies;
                $title = $sp->common_name . ($sp->scientific_name ? " (<i>{$sp->scientific_name}</i>)" : "");
                $details = [];
                if ($sp->local_name) $details[] = "<b>Nama Lokal:</b> {$sp->local_name}";
                if ($sp->family) $details[] = "<b>Famili:</b> {$sp->family}";
                $details[] = "<b>Status Asal:</b> " . ($sp->origin_status === 'lokal_asli' ? 'Jenis Lokal / Asli' : ($sp->origin_status === 'introduksi' ? 'Introduksi' : 'Belum Diverifikasi'));
                if ($sp->ecological_function) $details[] = "<b>Fungsi Ekologis:</b> {$sp->ecological_function}";
                if ($sp->benefits) $details[] = "<b>Manfaat:</b> {$sp->benefits}";
                if ($sp->total_planted_count > 0) $details[] = "<b>Total Ditanam di Kawasan:</b> {$sp->total_planted_count} bibit";
                if ($sp->description) $details[] = "<p>{$sp->description}</p>";
                $text = implode('<br>', $details);
            } elseif ($this->info_source_type === 'planting_activity' && $this->plantingActivity) {
                $act = $this->plantingActivity;
                $title = "Zona Penanaman: {$act->location_zone}";
                $details = [
                    "<b>Kelompok / Batch:</b> {$act->batch_code}",
                    "<b>Kegiatan:</b> {$act->name}",
                    "<b>Tanggal Tanam:</b> " . ($act->activity_date ? $act->activity_date->format('d/m/Y') : '-'),
                    "<b>Pelaksana:</b> {$act->organizer}",
                    "<b>Total Bibit Awal:</b> {$act->total_initial_seedlings} bibit",
                ];
                $spList = $act->items->map(fn($it) => "• {$it->species?->common_name}: {$it->quantity} {$it->unit}")->join('<br>');
                if ($spList) {
                    $details[] = "<b>Komposisi Jenis:</b><br>{$spList}";
                }
                $text = implode('<br>', $details);
            } elseif ($this->info_source_type === 'latest_survey' && $this->plantingActivity) {
                $act = $this->plantingActivity;
                $survey = $act->latest_survey;
                $title = "Pemantauan Tanaman: {$act->location_zone}";
                if ($survey) {
                    $rateStr = $act->survival_rate !== null ? "{$act->survival_rate}%" : "Data belum lengkap";
                    $details = [
                        "<b>Kelompok:</b> {$act->batch_code} ({$act->name})",
                        "<b>Tanggal Pemeriksaan:</b> " . ($survey->survey_date ? $survey->survey_date->format('d/m/Y') : '-'),
                        "<b>Tanaman Hidup Kelompok Awal:</b> {$survey->alive_count} dari {$act->total_initial_seedlings} bibit",
                        "<b>Kelangsungan Hidup Kelompok Awal:</b> {$rateStr}",
                        "<b>Tanaman Mati / Hilang:</b> {$survey->dead_count} mati, {$survey->missing_count} hilang",
                        "<b>Kondisi Kesehatan:</b> " . ucfirst(str_replace('_', ' ', $survey->health_condition)),
                    ];
                    if ($act->total_replacements_count > 0) {
                        $details[] = "<i>(Tercatat {$act->total_replacements_count} bibit penyulaman/pengganti secara terpisah)</i>";
                    }
                    if ($survey->field_notes) $details[] = "<b>Catatan Lapangan:</b> {$survey->field_notes}";
                    $text = implode('<br>', $details);
                } else {
                    $text = "Belum ada survei pemantauan terverifikasi untuk kelompok penanaman ini.";
                }
            }
        }

        return ['title' => $title, 'text' => $text];
    }

    /**
     * Format into the schema expected by the frontend / Marzipano editor
     */
    public function toFrontendArray(): array
    {
        $resolved = $this->getResolvedContent();

        return [
            'id' => $this->id,
            'sceneId' => $this->scene_id,
            'type' => $this->type,
            'yaw' => (float) $this->yaw,
            'pitch' => (float) $this->pitch,
            'rotation' => (float) $this->rotation,
            'target' => $this->target_scene_id,
            'title' => $resolved['title'],
            'text' => $resolved['text'],
            'rawTitle' => $this->title,
            'rawText' => $this->text,
            'icon' => $this->icon ?? ($this->type === 'link' ? 'arrow' : 'info'),
            'infoSourceType' => $this->info_source_type ?? 'manual',
            'treeSpeciesId' => $this->tree_species_id,
            'plantingActivityId' => $this->planting_activity_id,
            'displaySettings' => $this->display_settings,
            'status' => $this->status,
            'isActive' => (bool) $this->is_active,
            'source' => $this->source,
            'versionId' => $this->version_id,
            'updatedAt' => $this->updated_at ? $this->updated_at->toIso8601String() : null,
        ];
    }
}
