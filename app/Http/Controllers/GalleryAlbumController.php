<?php

namespace App\Http\Controllers;

use App\Models\GalleryAlbum;
use App\Models\PlantingZonePhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GalleryAlbumController extends Controller
{
    // ─── Public Endpoints ────────────────────────────────────

    /**
     * Public: Daftar album yang dipublikasikan, dengan sampul dan jumlah foto.
     */
    public function publicIndex(Request $request)
    {
        $query = GalleryAlbum::published()
            ->with([
                'coverPhoto' => fn($q) => $q->select('id', 'file_path', 'thumbnail_path', 'title', 'alt_text'),
                'zone' => fn($q) => $q->select('id', 'zone_code', 'name', 'category'),
            ])
            ->withCount('photos');

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('planting_zone_id') && $request->planting_zone_id !== 'all') {
            $query->where('planting_zone_id', $request->planting_zone_id);
        }

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('description', 'like', $term);
            });
        }

        $albums = $query->orderBy('sort_order', 'asc')
            ->orderBy('activity_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Resolve cover_url for albums without explicit cover
        $albums->each(function ($album) {
            if (!$album->cover_photo_id && !$album->relationLoaded('photos')) {
                $firstPhoto = $album->photos()->first();
                if ($firstPhoto) {
                    $album->setAttribute('resolved_cover_url', $firstPhoto->file_url);
                }
            }
        });

        return response()->json([
            'success' => true,
            'total' => $albums->count(),
            'albums' => $albums,
        ]);
    }

    /**
     * Public: Detail album + seluruh foto di dalamnya.
     */
    public function publicShow($id)
    {
        $query = GalleryAlbum::with([
            'coverPhoto',
            'zone' => fn($q) => $q->select('id', 'zone_code', 'name', 'category'),
            'photos' => fn($q) => $q->published()
                ->with(['zone' => fn($zq) => $zq->select('id', 'zone_code', 'name', 'category')]),
        ]);

        // Pengunjung publik hanya melihat album yang dipublikasikan; admin dapat melihat preview draft
        if (!Auth::check()) {
            $query->where('is_published', true);
        }

        $album = $query->where(function ($q) use ($id) {
            if (is_numeric($id)) {
                $q->where('id', (int) $id)->orWhere('slug', (string) $id);
            } else {
                $q->where('slug', (string) $id);
            }
        })->firstOrFail();

        return response()->json([
            'success' => true,
            'album' => $album,
        ]);
    }

    // ─── Admin Endpoints ─────────────────────────────────────

    /**
     * Admin: Daftar semua album (termasuk unpublished).
     */
    public function index(Request $request)
    {
        $query = GalleryAlbum::with([
            'coverPhoto' => fn($q) => $q->select('id', 'file_path', 'thumbnail_path', 'title'),
            'zone' => fn($q) => $q->select('id', 'zone_code', 'name'),
            'creator' => fn($q) => $q->select('id', 'name', 'username'),
        ])->withCount('photos');

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('planting_zone_id') && $request->planting_zone_id !== 'all') {
            $query->where('planting_zone_id', $request->planting_zone_id);
        }

        if ($request->filled('status') && $request->status !== 'all') {
            if ($request->status === 'published') {
                $query->where('is_published', true);
            } elseif ($request->status === 'draft') {
                $query->where('is_published', false);
            }
        }

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('description', 'like', $term);
            });
        }

        $albums = $query->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'total' => $albums->count(),
            'albums' => $albums,
        ]);
    }

    /**
     * Admin: Buat album baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'organizer' => 'nullable|string|max:255',
            'planting_zone_id' => 'nullable|string|max:100',
            'location_name' => 'nullable|string|max:255',
            'activity_date' => 'nullable|date',
            'is_published' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'photo_ids' => 'nullable|array',
            'photo_ids.*' => 'integer|exists:planting_zone_photos,id',
            'cover_photo_id' => 'nullable|integer|exists:planting_zone_photos,id',
        ]);

        return DB::transaction(function () use ($validated, $request) {
            $album = GalleryAlbum::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? null,
                'category' => $validated['category'] ?? 'Dokumentasi Lainnya',
                'organizer' => $validated['organizer'] ?? null,
                'planting_zone_id' => $validated['planting_zone_id'] ?? null,
                'location_name' => $validated['location_name'] ?? null,
                'activity_date' => $validated['activity_date'] ?? null,
                'sort_order' => $validated['sort_order'] ?? 0,
                'is_published' => $validated['is_published'] ?? true,
                'created_by' => Auth::id(),
            ]);

            // Attach photos if provided
            $photoIds = $validated['photo_ids'] ?? [];
            if (!empty($photoIds)) {
                $pivotData = [];
                foreach ($photoIds as $index => $photoId) {
                    $pivotData[$photoId] = ['sort_order' => $index];
                }
                $album->photos()->attach($pivotData);
            }

            // Set cover photo
            if (!empty($validated['cover_photo_id'])) {
                $album->update(['cover_photo_id' => $validated['cover_photo_id']]);
            } elseif (!empty($photoIds)) {
                $album->update(['cover_photo_id' => $photoIds[0]]);
            }

            $album->load(['photos', 'coverPhoto', 'zone', 'creator']);
            $album->loadCount('photos');

            return response()->json([
                'success' => true,
                'message' => 'Album berhasil dibuat.',
                'album' => $album,
            ], 201);
        });
    }

    /**
     * Admin: Detail satu album.
     */
    public function show($id)
    {
        $album = GalleryAlbum::with([
            'photos' => fn($q) => $q->with(['zone' => fn($zq) => $zq->select('id', 'zone_code', 'name', 'category')]),
            'coverPhoto',
            'zone' => fn($q) => $q->select('id', 'zone_code', 'name'),
            'creator' => fn($q) => $q->select('id', 'name', 'username'),
        ])
            ->withCount('photos')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'album' => $album,
        ]);
    }

    /**
     * Admin: Update album metadata.
     */
    public function update(Request $request, $id)
    {
        $album = GalleryAlbum::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string|max:100',
            'organizer' => 'nullable|string|max:255',
            'planting_zone_id' => 'nullable|string|max:100',
            'location_name' => 'nullable|string|max:255',
            'activity_date' => 'nullable|date',
            'is_published' => 'nullable|boolean',
            'sort_order' => 'nullable|integer',
            'cover_photo_id' => 'nullable|integer|exists:planting_zone_photos,id',
        ]);

        $album->update($validated);

        $album->load(['photos', 'coverPhoto', 'zone', 'creator']);
        $album->loadCount('photos');

        return response()->json([
            'success' => true,
            'message' => 'Album berhasil diperbarui.',
            'album' => $album,
        ]);
    }

    /**
     * Admin: Hapus album (soft delete). Foto tidak dihapus, hanya relasi pivot.
     */
    public function destroy($id)
    {
        $album = GalleryAlbum::findOrFail($id);
        $album->photos()->detach();
        $album->delete();

        return response()->json([
            'success' => true,
            'message' => 'Album berhasil dihapus.',
        ]);
    }

    /**
     * Admin: Tambah foto ke album.
     */
    public function addPhotos(Request $request, $id)
    {
        $album = GalleryAlbum::findOrFail($id);

        $validated = $request->validate([
            'photo_ids' => 'required|array|min:1',
            'photo_ids.*' => 'integer|exists:planting_zone_photos,id',
        ]);

        $existingIds = $album->photos()->pluck('planting_zone_photos.id')->toArray();
        $maxSort = $album->photos()->max('gallery_album_photos.sort_order') ?? -1;

        $pivotData = [];
        foreach ($validated['photo_ids'] as $photoId) {
            if (!in_array($photoId, $existingIds)) {
                $maxSort++;
                $pivotData[$photoId] = ['sort_order' => $maxSort];
            }
        }

        if (!empty($pivotData)) {
            $album->photos()->attach($pivotData);
        }

        // Set cover if album has none
        if (!$album->cover_photo_id) {
            $firstPhoto = $album->photos()->orderBy('gallery_album_photos.sort_order')->first();
            if ($firstPhoto) {
                $album->update(['cover_photo_id' => $firstPhoto->id]);
            }
        }

        $album->load('photos');
        $album->loadCount('photos');

        return response()->json([
            'success' => true,
            'message' => count($pivotData) . ' foto ditambahkan ke album.',
            'album' => $album,
        ]);
    }

    /**
     * Admin: Hapus foto dari album (hanya pivot, foto asli tetap ada).
     */
    public function removePhoto($id, $photoId)
    {
        $album = GalleryAlbum::findOrFail($id);
        $album->photos()->detach($photoId);

        // Reset cover if removed photo was cover
        if ($album->cover_photo_id == $photoId) {
            $firstPhoto = $album->photos()->orderBy('gallery_album_photos.sort_order')->first();
            $album->update(['cover_photo_id' => $firstPhoto?->id]);
        }

        $album->load('photos');
        $album->loadCount('photos');

        return response()->json([
            'success' => true,
            'message' => 'Foto dihapus dari album.',
            'album' => $album,
        ]);
    }

    /**
     * Admin: Set foto sampul album.
     */
    public function setCover(Request $request, $id)
    {
        $album = GalleryAlbum::findOrFail($id);

        $validated = $request->validate([
            'photo_id' => 'required|integer|exists:planting_zone_photos,id',
        ]);

        $album->update(['cover_photo_id' => $validated['photo_id']]);

        $album->load('coverPhoto');

        return response()->json([
            'success' => true,
            'message' => 'Foto sampul album berhasil diubah.',
            'album' => $album,
        ]);
    }

    /**
     * Admin: Reorder foto dalam album.
     */
    public function reorderPhotos(Request $request, $id)
    {
        $album = GalleryAlbum::findOrFail($id);

        $validated = $request->validate([
            'photo_ids' => 'required|array|min:1',
            'photo_ids.*' => 'integer',
        ]);

        DB::transaction(function () use ($album, $validated) {
            foreach ($validated['photo_ids'] as $index => $photoId) {
                DB::table('gallery_album_photos')
                    ->where('gallery_album_id', $album->id)
                    ->where('planting_zone_photo_id', $photoId)
                    ->update(['sort_order' => $index]);
            }
        });

        $album->load('photos');

        return response()->json([
            'success' => true,
            'message' => 'Urutan foto berhasil diperbarui.',
            'album' => $album,
        ]);
    }

    /**
     * Admin: Daftar semua foto yang tersedia (untuk dipilih ke album).
     */
    public function availablePhotos(Request $request)
    {
        $query = PlantingZonePhoto::with([
            'zone' => fn($q) => $q->select('id', 'zone_code', 'name', 'category'),
        ]);

        if ($request->filled('planting_zone_id') && $request->planting_zone_id !== 'all') {
            $query->where('planting_zone_id', $request->planting_zone_id);
        }

        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $term = '%' . $request->search . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('caption', 'like', $term);
            });
        }

        // Exclude photos already in a specific album
        if ($request->filled('exclude_album_id')) {
            $albumId = $request->exclude_album_id;
            $query->whereDoesntHave('albums', fn($q) => $q->where('gallery_albums.id', $albumId));
        }

        $photos = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'total' => $photos->count(),
            'photos' => $photos,
        ]);
    }

    /**
     * Admin: Unggah beberapa file foto langsung ke album kegiatan.
     */
    public function uploadPhotos(Request $request, $id)
    {
        $album = GalleryAlbum::findOrFail($id);

        $request->validate([
            'photos' => 'required_without:photo|array|max:20',
            'photos.*' => 'file|image|mimes:jpeg,jpg,png,webp|max:5120',
            'photo' => 'nullable|file|image|mimes:jpeg,jpg,png,webp|max:5120',
            'titles' => 'nullable|array',
            'captions' => 'nullable|array',
            'alt_texts' => 'nullable|array',
            'is_cover' => 'nullable|boolean',
        ], [
            'photos.*.image' => 'Setiap file harus berupa gambar yang valid.',
            'photos.*.mimes' => 'Format gambar yang diizinkan hanya JPG, JPEG, PNG, atau WebP.',
            'photos.*.max' => 'Ukuran setiap gambar tidak boleh melebihi 5 MB.',
            'photos.max' => 'Maksimal 20 foto dapat diunggah dalam satu kali proses.',
        ]);

        $files = [];
        if ($request->hasFile('photos')) {
            $files = $request->file('photos');
        } elseif ($request->hasFile('photo')) {
            $files = [$request->file('photo')];
        }

        if (empty($files)) {
            return response()->json([
                'success' => false,
                'message' => 'Pilih setidaknya satu file foto valid (JPG, PNG, atau WebP, maks 5 MB).',
            ], 422);
        }

        $maxSort = $album->photos()->max('gallery_album_photos.sort_order') ?? -1;
        $titles = $request->input('titles', []);
        $captions = $request->input('captions', []);
        $altTexts = $request->input('alt_texts', []);
        $requestIsCover = $request->boolean('is_cover');

        $newPhotos = [];

        DB::transaction(function () use (
            $album, $files, $maxSort, $titles, $captions, $altTexts, $requestIsCover, $request, &$newPhotos
        ) {
            $currentOrder = $maxSort;

            foreach ($files as $index => $file) {
                $currentOrder++;

                $fileTitle = null;
                if (is_array($titles) && isset($titles[$index]) && trim($titles[$index]) !== '') {
                    $fileTitle = trim($titles[$index]);
                } elseif ($request->filled('title')) {
                    $fileTitle = count($files) > 1 ? trim($request->input('title')) . ' #' . ($index + 1) : trim($request->input('title'));
                } else {
                    $fileTitle = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                }

                $photoCaption = is_array($captions) && isset($captions[$index]) ? trim($captions[$index]) : $request->input('caption');
                $photoAlt = is_array($altTexts) && isset($altTexts[$index]) ? trim($altTexts[$index]) : ($request->input('alt_text') ?: $fileTitle);

                $extension = strtolower($file->getClientOriginalExtension() ?: 'jpg');
                $titleSlug = Str::slug($fileTitle) ?: 'foto';
                $uniqueName = $titleSlug . '_' . date('Ymd_His') . '_' . Str::random(6) . '.' . $extension;
                $directory = "gallery/albums/{$album->id}/photos";
                $storedPath = $file->storeAs($directory, $uniqueName, 'public');

                $photo = PlantingZonePhoto::create([
                    'planting_zone_id' => $album->planting_zone_id,
                    'file_path' => '/storage/' . $storedPath,
                    'thumbnail_path' => '/storage/' . $storedPath,
                    'title' => $fileTitle,
                    'caption' => $photoCaption,
                    'alt_text' => $photoAlt,
                    'category' => $album->category ?: 'Dokumentasi Lainnya',
                    'documented_at' => $album->activity_date ?: now()->toDateString(),
                    'sort_order' => $currentOrder,
                    'is_cover' => false,
                    'is_published' => true,
                    'file_size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                    'uploaded_by' => Auth::id(),
                ]);

                $album->photos()->attach($photo->id, ['sort_order' => $currentOrder]);
                $newPhotos[] = $photo;

                if (($requestIsCover && $index === 0) || !$album->cover_photo_id) {
                    $album->update(['cover_photo_id' => $photo->id]);
                }
            }
        });

        $album->load(['photos', 'coverPhoto']);
        $album->loadCount('photos');

        return response()->json([
            'success' => true,
            'message' => count($newPhotos) . ' foto kegiatan berhasil diunggah ke album.',
            'album' => $album,
            'new_photos' => $newPhotos,
        ], 201);
    }

    /**
     * Admin: Perbarui keterangan foto (caption, alt text, judul).
     */
    public function updatePhotoMetadata(Request $request, $id, $photoId)
    {
        $album = GalleryAlbum::findOrFail($id);
        $photo = $album->photos()->findOrFail($photoId);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
            'alt_text' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer',
        ]);

        $photo->update([
            'title' => array_key_exists('title', $validated) ? $validated['title'] : $photo->title,
            'caption' => array_key_exists('caption', $validated) ? $validated['caption'] : $photo->caption,
            'alt_text' => array_key_exists('alt_text', $validated) ? $validated['alt_text'] : $photo->alt_text,
        ]);

        if (isset($validated['sort_order'])) {
            $album->photos()->updateExistingPivot($photoId, ['sort_order' => $validated['sort_order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Keterangan foto berhasil diperbarui.',
            'photo' => $photo,
        ]);
    }

    /**
     * Admin: Hapus foto secara permanen jika tidak digunakan di album/fitur lain.
     */
    public function deletePhotoPermanently(Request $request, $id, $photoId)
    {
        $album = GalleryAlbum::findOrFail($id);
        $photo = $album->photos()->findOrFail($photoId);

        // Periksa apakah foto digunakan di album lain
        $otherAlbumsCount = $photo->albums()->where('gallery_albums.id', '!=', $album->id)->count();

        // Lepas dari album ini
        $album->photos()->detach($photoId);

        if ($album->cover_photo_id == $photoId) {
            $firstPhoto = $album->photos()->orderBy('gallery_album_photos.sort_order')->first();
            $album->update(['cover_photo_id' => $firstPhoto?->id]);
        }

        if ($otherAlbumsCount > 0) {
            return response()->json([
                'success' => true,
                'message' => 'Foto dikeluarkan dari album ini. Berkas fisik tetap disimpan karena tercatat pada album lain.',
            ]);
        }

        // Jika foto diunggah khusus album, bersihkan file fisiknya secara aman
        if ($photo->file_path && str_contains($photo->file_path, 'gallery/albums/')) {
            $relativePath = str_replace('/storage/', '', $photo->file_path);
            Storage::disk('public')->delete($relativePath);
        }

        $photo->delete();

        return response()->json([
            'success' => true,
            'message' => 'Foto dan berkasnya berhasil dihapus secara permanen.',
        ]);
    }
}
