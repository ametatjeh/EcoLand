<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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

    /**
     * Albums this photo belongs to (many-to-many).
     */
    public function albums(): BelongsToMany
    {
        return $this->belongsToMany(
            GalleryAlbum::class,
            'gallery_album_photos',
            'planting_zone_photo_id',
            'gallery_album_id'
        )->withPivot('sort_order')->withTimestamps();
    }

    public function getFileUrlAttribute(): string
    {
        if (empty($this->file_path)) {
            return '';
        }
        if (str_starts_with($this->file_path, 'http://') || str_starts_with($this->file_path, 'https://')) {
            return $this->file_path;
        }
        $clean = ltrim($this->file_path, '/');
        if (str_starts_with($clean, 'storage/')) {
            return '/' . $clean;
        }
        return '/storage/' . $clean;
    }

    public function getThumbnailUrlAttribute(): string
    {
        if (!empty($this->thumbnail_path)) {
            if (str_starts_with($this->thumbnail_path, 'http://') || str_starts_with($this->thumbnail_path, 'https://')) {
                return $this->thumbnail_path;
            }
            $clean = ltrim($this->thumbnail_path, '/');
            if (str_starts_with($clean, 'storage/')) {
                return '/' . $clean;
            }
            return '/storage/' . $clean;
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
