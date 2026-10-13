<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class PlantingZonePhoto extends Model
{
    use SoftDeletes;

    protected $table = 'planting_zone_photos';

    protected $fillable = [
        'planting_zone_id',
        'file_path',
        'thumbnail_path',
        'title',
        'caption',
        'alt_text',
        'category',
        'documented_at',
        'sort_order',
        'is_cover',
        'is_published',
        'file_size',
        'mime_type',
        'uploaded_by',
    ];

    protected $casts = [
        'is_cover' => 'boolean',
        'is_published' => 'boolean',
        'sort_order' => 'integer',
        'file_size' => 'integer',
        'documented_at' => 'date:Y-m-d',
    ];

    protected $appends = [
        'file_url',
        'thumbnail_url',
    ];

    public function zone(): BelongsTo
    {
        return $this->belongsTo(PlantingZone::class, 'planting_zone_id', 'id');
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by', 'id');
    }

    public function getFileUrlAttribute(): string
    {
        if (empty($this->file_path)) {
            return '';
        }
        if (str_starts_with($this->file_path, 'http://') || str_starts_with($this->file_path, 'https://') || str_starts_with($this->file_path, '/')) {
            return $this->file_path;
        }
        return '/storage/' . ltrim($this->file_path, '/');
    }

    public function getThumbnailUrlAttribute(): string
    {
        if (!empty($this->thumbnail_path)) {
            if (str_starts_with($this->thumbnail_path, 'http://') || str_starts_with($this->thumbnail_path, 'https://') || str_starts_with($this->thumbnail_path, '/')) {
                return $this->thumbnail_path;
            }
            return '/storage/' . ltrim($this->thumbnail_path, '/');
        }
        return $this->file_url;
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeCover(Builder $query): Builder
    {
        return $query->where('is_cover', true);
    }
}
