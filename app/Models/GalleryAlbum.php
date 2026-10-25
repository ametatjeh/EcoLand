<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class GalleryAlbum extends Model
{
    use SoftDeletes;

    protected $table = 'gallery_albums';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'category',
        'organizer',
        'cover_photo_id',
        'planting_zone_id',
        'location_name',
        'activity_date',
        'is_published',
        'sort_order',
        'created_by',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'sort_order' => 'integer',
        'activity_date' => 'date:Y-m-d',
        'cover_photo_id' => 'integer',
    ];

    protected $appends = [
        'cover_url',
        'photo_count',
        'public_url',
        'share_url',
    ];

    /**
     * Auto-generate slug from title on creating.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($album) {
            if (empty($album->slug)) {
                $base = Str::slug($album->title ?: 'album', '-');
                if (empty($base)) {
                    $base = 'album-' . strtolower(Str::random(6));
                }
                $slug = $base;
                $counter = 1;
                while (static::withTrashed()->where('slug', $slug)->exists()) {
                    $slug = $base . '-' . $counter;
                    $counter++;
                }
                $album->slug = $slug;
            }
        });
    }

    // ─── Relationships ───────────────────────────────────────

    /**
     * Photos in this album (many-to-many via pivot).
     */
    public function photos(): BelongsToMany
    {
        return $this->belongsToMany(
            PlantingZonePhoto::class,
            'gallery_album_photos',
            'gallery_album_id',
            'planting_zone_photo_id'
        )
            ->withPivot('sort_order')
            ->withTimestamps()
            ->orderByPivot('sort_order', 'asc');
    }

    /**
     * The designated cover photo.
     */
    public function coverPhoto(): BelongsTo
    {
        return $this->belongsTo(PlantingZonePhoto::class, 'cover_photo_id');
    }

    /**
     * Associated planting zone (optional).
     */
    public function zone(): BelongsTo
    {
        return $this->belongsTo(PlantingZone::class, 'planting_zone_id');
    }

    /**
     * User who created the album.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // ─── Accessors ───────────────────────────────────────────

    /**
     * Resolve cover URL: explicit cover → first photo in album → fallback empty.
     */
    public function getCoverUrlAttribute(): string
    {
        // 1. Explicit cover photo
        if ($this->cover_photo_id && $this->relationLoaded('coverPhoto') && $this->coverPhoto) {
            return $this->coverPhoto->file_url;
        }

        // Lazy-load cover
        if ($this->cover_photo_id) {
            $cover = PlantingZonePhoto::find($this->cover_photo_id);
            if ($cover) {
                return $cover->file_url;
            }
        }

        // 2. First photo in album
        if ($this->relationLoaded('photos') && $this->photos->isNotEmpty()) {
            return $this->photos->first()->file_url;
        }

        return '';
    }

    /**
     * Number of photos in this album.
     */
    public function getPhotoCountAttribute(): int
    {
        if ($this->relationLoaded('photos')) {
            return $this->photos->count();
        }
        return $this->photos()->count();
    }

    /**
     * Relative public URL for the album.
     */
    public function getPublicUrlAttribute(): string
    {
        return '/#galeri?album=' . ($this->slug ?: $this->id);
    }

    /**
     * Absolute share URL for the album.
     */
    public function getShareUrlAttribute(): string
    {
        return url('/#galeri?album=' . ($this->slug ?: $this->id));
    }

    // ─── Scopes ──────────────────────────────────────────────

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
