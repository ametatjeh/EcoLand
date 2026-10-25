/**
 * Public Gallery Module for EcoZone 360 / Eco Land
 * Album-based gallery: shows album covers → click to view album photos → lightbox.
 * Backward compatible: falls back to flat photo grid if no albums exist.
 */

import { ApiService } from '../services/api.js';
import { formatDateDisplay } from '../utils/date.js';

// ─── State ──────────────────────────────────────────────────
let cachedAlbums = [];
let cachedPublicPhotos = [];
let cachedZones = [];
let currentZoneFilter = 'all';
let currentCategoryFilter = 'all';
let currentSearchTerm = '';
let currentLightboxIndex = -1;
let filteredAlbums = [];
let filteredPhotos = [];
let isLightboxListenersAttached = false;
let currentViewMode = 'albums'; // 'albums' | 'album-detail' | 'photos'
let currentAlbumId = null;
let currentAlbumData = null;

// Fallback high-contrast dark placeholder SVG if image is broken or missing
const FALLBACK_PHOTO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375" viewBox="0 0 600 375" fill="%230b1511"><rect width="600" height="375" fill="%2307120e"/><rect x="4" y="4" width="592" height="367" rx="16" fill="none" stroke="%2310b981" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="8 8"/><circle cx="230" cy="150" r="34" fill="%2310b981" fill-opacity="0.25"/><path d="M120 300l110-120 80 80 55-60 115 100H120z" fill="%2310b981" fill-opacity="0.18"/></svg>`;

export function getAlbumParamFromHash() {
  const hash = window.location.hash || '';
  if (!hash.startsWith('#galeri') && !hash.startsWith('#album')) return null;

  const clean = hash.replace(/^#\/?/, '').trim();
  const [routePart, queryPart] = clean.split('?');
  const params = new URLSearchParams(queryPart || '');

  if (params.get('album')) {
    return params.get('album').trim();
  }
  if (params.get('id')) {
    return params.get('id').trim();
  }

  if (routePart.startsWith('galeri/')) {
    const sub = routePart.slice(7).trim();
    const albumSub = sub.replace(/^album\//, '').trim();
    if (albumSub) return albumSub;
  }
  if (routePart.startsWith('album/')) {
    const sub = routePart.slice(6).trim();
    if (sub) return sub;
  }

  return null;
}

export async function initPublicGallery(containerId = 'public-gallery-container', initialAlbumParam = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const targetAlbumParam = initialAlbumParam || getAlbumParamFromHash();

  // Pasang listener hashchange satu kali untuk deep-linking album
  if (!window._galleryHashBound) {
    window._galleryHashBound = true;
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#galeri') || hash.startsWith('#album')) {
        const albumParam = getAlbumParamFromHash();
        if (albumParam) {
          if (!currentAlbumData || (currentAlbumData.slug !== albumParam && String(currentAlbumData.id) !== String(albumParam))) {
            loadAlbumDetail(albumParam, false);
          }
        } else {
          if (currentViewMode !== 'albums') {
            navigateBackToAlbums(false);
          }
        }
      }
    });
  }

  // Jika container sudah ter-render sebelumnya
  const existingGrid = document.getElementById('gallery-grid-container');
  if (existingGrid && cachedAlbums.length > 0) {
    if (targetAlbumParam) {
      if (!currentAlbumData || (currentAlbumData.slug !== targetAlbumParam && String(currentAlbumData.id) !== String(targetAlbumParam))) {
        await loadAlbumDetail(targetAlbumParam, false);
      }
    } else {
      if (currentViewMode !== 'albums') {
        navigateBackToAlbums(false);
      }
    }
    return;
  }

  container.innerHTML = `
    <div class="gallery-wrapper">
      <!-- Section Header Hero Banner -->
      <div id="gallery-hero-banner" class="hero-section text-center relative overflow-hidden${targetAlbumParam ? ' hidden' : ''}" style="padding: 36px 24px 32px; margin-bottom: 28px;">
        <div class="hero-badge" style="margin-bottom: 14px;">
          <span>📸</span> Dokumentasi Visual &amp; Silvikultur Kawasan
        </div>
        <h1 class="hero-title" style="font-size: 34px; margin-bottom: 12px; font-weight: 800;">
          Galeri Foto Kawasan Restorasi
        </h1>
        <p class="hero-subtitle text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed text-center" style="margin-bottom: 20px;">
          Dokumentasi visual perkembangan kawasan pemulihan lahan &plusmn;2 hektare, pelaksanaan silvikultur, pertumbuhan tutupan tajuk pohon, dan pemantauan kelestarian berkala.
        </p>

        <!-- Hero Quick Stats Bar -->
        <div class="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs">
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span id="gallery-stat-total" class="font-semibold">Memuat Album...</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300">
            <span>🏞️</span>
            <span id="gallery-stat-zones">Kawasan Konservasi</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300">
            <span>🏷️</span>
            <span id="gallery-stat-categories">Kategori Silvikultur</span>
          </div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300">
            <span>⭐</span>
            <span>Arsip Resmi Terverifikasi</span>
          </div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="gallery-filter-bar">
        <!-- 1. Search Box -->
        <div class="gallery-search-box">
          <span class="gallery-search-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            id="gallery-search-input"
            placeholder="Cari album, judul, keterangan..."
            class="gallery-search-field"
            autocomplete="off"
            aria-label="Pencarian galeri foto"
          />
          <button id="gallery-search-clear" class="gallery-search-clear" style="display: none;" title="Hapus pencarian">✕</button>
        </div>

        <!-- 2. Controls Group -->
        <div class="gallery-filters-group">
          <!-- Filter Kawasan -->
          <div class="gallery-filter-pill" title="Filter berdasarkan kawasan penanaman">
            <span class="gallery-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3l4 8 5-5 5 15H2L8 3z"></path>
              </svg>
            </span>
            <span class="gallery-pill-label">Kawasan:</span>
            <select id="gallery-filter-zone" class="gallery-pill-select" aria-label="Filter Kawasan">
              <option value="all">Semua Kawasan</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Filter Kategori -->
          <div class="gallery-filter-pill" title="Filter berdasarkan kategori dokumentasi">
            <span class="gallery-pill-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <circle cx="7" cy="7" r="1.5"></circle>
              </svg>
            </span>
            <span class="gallery-pill-label">Kategori:</span>
            <select id="gallery-filter-category" class="gallery-pill-select" aria-label="Filter Kategori">
              <option value="all">Semua Kategori</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Counter Badge -->
          <span class="gallery-count-badge" id="gallery-count-badge" title="Total yang ditampilkan">
            <span id="gallery-count-num">0</span> <span id="gallery-count-label">Album</span>
          </span>

          <!-- Reset Filter Button -->
          <button id="gallery-reset-btn" class="gallery-reset-btn" style="display: none;" title="Reset filter & pencarian">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            Reset
          </button>
        </div>
      </div>

      <!-- Album Detail Container (hidden initially) -->
      <div id="gallery-album-back-bar" class="hidden" style="margin-bottom: 20px;">
        <div id="gallery-album-detail-info"></div>
      </div>

      <!-- Grid Container -->
      <div id="gallery-grid-container" class="min-h-[320px]">
        <div class="flex items-center justify-center py-24 text-slate-400 gap-3">
          <span class="loading-spinner"></span>
          <span class="text-sm font-medium">Memuat album galeri...</span>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal Container -->
    <div id="gallery-lightbox-modal" class="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl hidden flex flex-col justify-between select-none" role="dialog" aria-modal="true" aria-label="Penampil Foto Kawasan">
      <!-- Lightbox Header -->
      <div class="lightbox-header-bar flex items-center justify-between px-5 sm:px-8 py-4 bg-slate-900/95 border-b border-white/10 text-white z-30 shrink-0">
        <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span class="text-xs sm:text-sm font-semibold text-white/90 hidden sm:inline-flex items-center gap-2">
            <span>📸</span> Galeri Restorasi
          </span>
          <span class="text-slate-600 hidden sm:inline">•</span>
          <span id="lightbox-counter" class="text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">1 / 1</span>
          <span id="lightbox-category-badge" class="text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700">Kategori</span>
          <span id="lightbox-cover-badge" class="hidden text-xs sm:text-sm font-bold text-amber-950 bg-amber-400 px-3 py-1 rounded-lg border border-amber-300">⭐ Foto Sampul</span>
        </div>

        <div class="flex items-center gap-3">
          <kbd class="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
            <span>Navigasi</span> <span>←</span> <span>→</span> <span class="ml-1 font-bold text-slate-200">ESC</span>
          </kbd>
          <button id="btn-close-lightbox" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/25 text-slate-200 hover:text-rose-300 border border-white/15 hover:border-rose-500/40 transition-all cursor-pointer font-bold text-xs sm:text-sm" aria-label="Tutup penampil foto (Escape)">
            <span>Tutup</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Lightbox Main Stage -->
      <div class="relative flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer" id="lightbox-stage">
        <!-- Prev Button -->
        <button id="btn-lightbox-prev" class="absolute left-3 sm:left-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto sebelumnya (Panah Kiri)" title="Sebelumnya (←)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- Main Displayed Image Wrapper -->
        <div class="relative max-w-5xl w-full flex items-center justify-center cursor-default transition-transform duration-200" id="lightbox-img-wrapper">
          <div id="lightbox-loading-spinner" class="absolute inset-0 flex items-center justify-center z-10 hidden">
            <span class="loading-spinner"></span>
          </div>
          <div class="relative inline-block max-w-full">
            <img id="lightbox-img" src="" alt="" class="max-h-[64vh] sm:max-h-[70vh] md:max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/15 transition-all duration-300 block" />
            
            <!-- Raw resolution button positioned at bottom-right inside photo -->
            <a
              id="lightbox-raw-btn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="lightbox-raw-btn absolute bottom-3.5 right-3.5 z-20 font-semibold text-slate-200 hover:text-white flex items-center gap-2 text-xs sm:text-sm active:scale-95 transition-all duration-200 cursor-pointer"
              title="Buka foto dalam resolusi penuh di tab baru"
            >
              <span>Resolusi Asli</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <div id="lightbox-error-msg" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 shadow-2xl max-w-md">
            <span class="text-4xl mb-3 block">⚠️</span>
            <h4 class="font-bold text-white text-base">Gagal Memuat Gambar</h4>
            <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">Berkas foto tidak dapat diakses atau belum tersedia di server.</p>
          </div>
        </div>

        <!-- Next Button -->
        <button id="btn-lightbox-next" class="absolute right-3 sm:right-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto berikutnya (Panah Kanan)" title="Berikutnya (→)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Filmstrip Thumbnail Strip -->
      <div id="lightbox-thumb-strip" class="px-5 sm:px-8 py-3 bg-slate-950/85 border-t border-white/10 flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto z-20 shrink-0">
      </div>

    </div>
  `;

  // Load zones for dropdown
  try {
    const zonesRes = await ApiService.getPublicZones();
    cachedZones = zonesRes.zones || [];
    const zoneSelect = document.getElementById('gallery-filter-zone');
    if (zoneSelect && cachedZones.length > 0) {
      zoneSelect.innerHTML = '<option value="all">Semua Kawasan</option>';
      cachedZones.forEach((z) => {
        const opt = document.createElement('option');
        opt.value = z.id;
        opt.textContent = z.name;
        opt.title = `${z.name} (${z.zone_code})`;
        zoneSelect.appendChild(opt);
      });
    }
  } catch (err) {
    console.warn('Gagal memuat kawasan untuk filter galeri:', err);
  }

  // Try loading albums first, with optional target album deep link
  await loadAlbumsOrPhotos(targetAlbumParam);

  // Attach toolbar listeners
  const zoneSelect = document.getElementById('gallery-filter-zone');
  const catSelect = document.getElementById('gallery-filter-category');
  const searchInput = document.getElementById('gallery-search-input');
  const clearBtn = document.getElementById('gallery-search-clear');
  const resetBtn = document.getElementById('gallery-reset-btn');
  const backBtn = document.getElementById('gallery-back-to-albums');

  if (zoneSelect) {
    zoneSelect.addEventListener('change', (e) => {
      currentZoneFilter = e.target.value;
      applyFilters();
    });
  }

  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      currentCategoryFilter = e.target.value;
      applyFilters();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearchTerm = '';
        searchInput.focus();
        applyFilters();
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetAllFilters();
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      navigateBackToAlbums(true);
    });
  }

  // Setup Lightbox bindings
  setupLightboxListeners();
}

// ─── Data Loading ────────────────────────────────────────────

async function loadAlbumsOrPhotos(targetAlbumParam = null) {
  const gridContainer = document.getElementById('gallery-grid-container');
  if (!gridContainer) return;

  try {
    // Try albums first
    const albumRes = await ApiService.getPublicAlbums();
    cachedAlbums = albumRes.albums || [];

    if (cachedAlbums.length > 0) {
      populateCategoryDropdownFromAlbums(cachedAlbums);
      updateHeroStatsAlbums(cachedAlbums);

      const target = targetAlbumParam || getAlbumParamFromHash();
      if (target) {
        await loadAlbumDetail(target, false);
      } else {
        currentViewMode = 'albums';
        applyFilters();
      }
    } else {
      // Fallback: load flat photos (backward compatible)
      currentViewMode = 'photos';
      const res = await ApiService.getAllPublicPhotos();
      cachedPublicPhotos = res.photos || [];
      populateCategoryDropdownFromPhotos(cachedPublicPhotos);
      updateHeroStatsPhotos(cachedPublicPhotos, cachedZones);
      applyFilters();
    }
  } catch (err) {
    console.error('Error loading gallery:', err);
    gridContainer.innerHTML = `
      <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-8 text-center text-sm">
        <p class="font-semibold mb-1">Gagal memuat data galeri</p>
        <p class="text-xs text-red-300">${escapeHtml(err.message)}</p>
      </div>
    `;
  }
}

export async function loadAlbumDetail(albumIdOrSlug, updateUrl = true) {
  const gridContainer = document.getElementById('gallery-grid-container');
  if (!gridContainer) return;

  gridContainer.innerHTML = `
    <div class="flex items-center justify-center py-24 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-sm font-medium">Memuat foto album kegiatan...</span>
    </div>
  `;

  try {
    const res = await ApiService.getPublicAlbumDetail(albumIdOrSlug);
    currentAlbumData = res.album;
    currentAlbumId = currentAlbumData.slug || currentAlbumData.id;
    currentViewMode = 'album-detail';

    if (updateUrl) {
      const albumKey = encodeURIComponent(currentAlbumData.slug || currentAlbumData.id);
      const targetHash = `#galeri?album=${albumKey}`;
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
    }

    // Set photos for this album
    filteredPhotos = (currentAlbumData.photos || []).map(p => ({
      ...p,
      zone: p.zone || currentAlbumData.zone || null,
    }));

    // Hide hero banner and filter bar when viewing album detail
    const heroBanner = document.getElementById('gallery-hero-banner');
    if (heroBanner) heroBanner.classList.add('hidden');
    const filterBar = document.querySelector('.gallery-filter-bar');
    if (filterBar) filterBar.classList.add('hidden');

    // Show album detail header
    showAlbumDetailHeader(currentAlbumData);

    // Update counter
    const countNum = document.getElementById('gallery-count-num');
    const countLabel = document.getElementById('gallery-count-label');
    if (countNum) countNum.textContent = filteredPhotos.length;
    if (countLabel) countLabel.textContent = 'Foto';

    renderPhotoGrid();
  } catch (err) {
    console.error('Error loading album detail:', err);
    // Hide hero banner and filter bar even on error state
    const heroBanner = document.getElementById('gallery-hero-banner');
    if (heroBanner) heroBanner.classList.add('hidden');
    const filterBar = document.querySelector('.gallery-filter-bar');
    if (filterBar) filterBar.classList.add('hidden');

    gridContainer.innerHTML = `
      <div class="bg-slate-900/80 border border-red-500/30 text-red-300 rounded-2xl p-8 text-center text-sm max-w-lg mx-auto shadow-xl my-8">
        <span class="text-4xl block mb-2">📁</span>
        <h4 class="font-bold text-white text-base mb-1">Album Tidak Ditemukan</h4>
        <p class="text-xs text-slate-400 mb-5 leading-relaxed">
          Album yang Anda tuju (<strong>${escapeHtml(String(albumIdOrSlug))}</strong>) belum dipublikasikan atau tautan tidak valid.
        </p>
        <button id="btn-err-back-to-albums" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg transition-all cursor-pointer">
          ← Kembali ke Semua Album
        </button>
      </div>
    `;
    const errBackBtn = document.getElementById('btn-err-back-to-albums');
    if (errBackBtn) {
      errBackBtn.addEventListener('click', () => navigateBackToAlbums(true));
    }
  }
}

export function navigateBackToAlbums(updateUrl = true) {
  currentViewMode = 'albums';
  currentAlbumId = null;
  currentAlbumData = null;

  if (updateUrl) {
    if (window.location.hash.includes('album=') || window.location.hash.includes('album/')) {
      window.history.pushState(null, '', '#galeri');
    }
  }

  // Restore hero banner and filter bar
  const heroBanner = document.getElementById('gallery-hero-banner');
  if (heroBanner) heroBanner.classList.remove('hidden');
  const filterBar = document.querySelector('.gallery-filter-bar');
  if (filterBar) filterBar.classList.remove('hidden');

  // Hide album detail header
  const backBar = document.getElementById('gallery-album-back-bar');
  if (backBar) backBar.classList.add('hidden');

  // Restore counter label
  const countLabel = document.getElementById('gallery-count-label');
  if (countLabel) countLabel.textContent = 'Album';

  applyFilters();
}

function showAlbumDetailHeader(album) {
  const backBar = document.getElementById('gallery-album-back-bar');
  const detailInfo = document.getElementById('gallery-album-detail-info');
  if (!backBar) return;

  backBar.classList.remove('hidden');

  if (detailInfo) {
    const zoneName = album.zone ? album.zone.name : '';
    const actDate = album.activity_date ? formatDateIndo(album.activity_date) : '';
    const albumSlug = album.slug || album.id;
    const cleanBase = window.location.origin + window.location.pathname.replace(/\/+$/, '');
    const directUrl = `${cleanBase}/#galeri?album=${encodeURIComponent(albumSlug)}`;

    detailInfo.innerHTML = `
      <div style="background: rgba(15, 28, 22, 0.9); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 16px; padding: 20px 24px; margin-bottom: 8px;">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 6px; line-height: 1.3;">
              📸 ${escapeHtml(album.title)}
            </h2>
            ${album.description ? `<p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 10px;">${escapeHtml(album.description)}</p>` : ''}
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span style="padding: 4px 12px; border-radius: 9999px; font-weight: 600; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7;">
                ${escapeHtml(album.category || 'Dokumentasi')}
              </span>
              ${zoneName ? `
                <span style="padding: 4px 12px; border-radius: 9999px; font-weight: 500; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #cbd5e1;">
                  🏞️ ${escapeHtml(zoneName)}
                </span>
              ` : ''}
              ${actDate ? `
                <span style="padding: 4px 12px; border-radius: 9999px; font-weight: 500; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); color: #6ee7b7;">
                  📅 ${actDate}
                </span>
              ` : ''}
              <span style="padding: 4px 12px; border-radius: 9999px; font-weight: 600; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #e2e8f0;">
                ${album.photos_count || album.photos?.length || 0} Foto
              </span>
            </div>
          </div>

          <!-- Back to All Albums Button -->
          <div class="flex items-center gap-2.5 shrink-0">
            <button
              id="gallery-back-to-albums"
              type="button"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30 hover:border-emerald-500 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              title="Kembali ke daftar semua album galeri"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Kembali ke Semua Album</span>
            </button>
          </div>
        </div>
      </div>
    `;

    // Attach back button listener
    const backBtn = document.getElementById('gallery-back-to-albums');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        navigateBackToAlbums(true);
      });
    }
  }
}

// ─── Clipboard Copy Helper ───────────────────────────────────

export function copyAlbumShareUrl(slugOrId, triggerBtn = null) {
  const cleanBase = window.location.origin + window.location.pathname.replace(/\/+$/, '');
  const shareUrl = `${cleanBase}/#galeri?album=${encodeURIComponent(slugOrId)}`;

  const doSuccessFeedback = () => {
    if (triggerBtn) {
      const origHtml = triggerBtn.innerHTML;
      triggerBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
      setTimeout(() => {
        triggerBtn.innerHTML = origHtml;
      }, 1800);
    }
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl).then(doSuccessFeedback).catch(() => {
      copyFallback(shareUrl);
      doSuccessFeedback();
    });
  } else {
    copyFallback(shareUrl);
    doSuccessFeedback();
  }
}

function copyFallback(text) {
  const tempInput = document.createElement('textarea');
  tempInput.value = text;
  tempInput.style.position = 'fixed';
  tempInput.style.opacity = '0';
  document.body.appendChild(tempInput);
  tempInput.focus();
  tempInput.select();
  try {
    document.execCommand('copy');
  } catch (e) {}
  document.body.removeChild(tempInput);
}

// ─── Stats & Dropdowns ───────────────────────────────────────

function updateHeroStatsAlbums(albums) {
  const statTotal = document.getElementById('gallery-stat-total');
  const statZones = document.getElementById('gallery-stat-zones');
  const statCats = document.getElementById('gallery-stat-categories');

  if (statTotal) statTotal.textContent = `${albums.length} Album Kegiatan`;
  if (statZones) {
    const zoneCount = new Set(albums.map(a => a.planting_zone_id).filter(Boolean)).size || cachedZones.length || 1;
    statZones.textContent = `${zoneCount} Kawasan Restorasi`;
  }
  if (statCats) {
    const catCount = new Set(albums.map(a => a.category).filter(Boolean)).size;
    statCats.textContent = `${catCount > 0 ? catCount : '7'} Kategori`;
  }
}

function updateHeroStatsPhotos(photos, zones) {
  const statTotal = document.getElementById('gallery-stat-total');
  const statZones = document.getElementById('gallery-stat-zones');
  const statCats = document.getElementById('gallery-stat-categories');

  if (statTotal) statTotal.textContent = `${photos.length} Foto Dokumentasi`;
  if (statZones) {
    const zoneCount = new Set(photos.map(p => p.planting_zone_id).filter(Boolean)).size || zones.length || 1;
    statZones.textContent = `${zoneCount} Kawasan Restorasi`;
  }
  if (statCats) {
    const catCount = new Set(photos.map(p => p.category).filter(Boolean)).size;
    statCats.textContent = `${catCount > 0 ? catCount : '7'} Kategori Silvikultur`;
  }
}

function populateCategoryDropdownFromAlbums(albums) {
  const catSelect = document.getElementById('gallery-filter-category');
  if (!catSelect) return;

  const categories = new Set();
  albums.forEach(a => {
    if (a.category && a.category.trim()) categories.add(a.category.trim());
  });

  const defaultCats = [
    'Kondisi Kawasan', 'Kegiatan Penanaman', 'Pertumbuhan Tanaman',
    'Pemantauan', 'Perawatan', 'Fasilitas', 'Dokumentasi Lainnya',
  ];
  defaultCats.forEach(c => categories.add(c));

  catSelect.innerHTML = '<option value="all">Semua Kategori</option>';
  Array.from(categories).sort().forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
  });
}

function populateCategoryDropdownFromPhotos(photos) {
  const catSelect = document.getElementById('gallery-filter-category');
  if (!catSelect) return;

  const categories = new Set();
  photos.forEach(p => {
    if (p.category && p.category.trim()) categories.add(p.category.trim());
  });

  const defaultCats = [
    'Lanskap & Topografi', 'Kegiatan Penanaman', 'Bibit & Spesies',
    'Pertumbuhan Vegetasi', 'Pemantauan', 'Perawatan', 'Kondisi Kawasan',
  ];
  defaultCats.forEach(c => categories.add(c));

  catSelect.innerHTML = '<option value="all">Semua Kategori</option>';
  Array.from(categories).sort().forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    catSelect.appendChild(opt);
  });
}

// ─── Filtering ───────────────────────────────────────────────

function resetAllFilters() {
  currentZoneFilter = 'all';
  currentCategoryFilter = 'all';
  currentSearchTerm = '';
  const zoneSelect = document.getElementById('gallery-filter-zone');
  const catSelect = document.getElementById('gallery-filter-category');
  const searchInput = document.getElementById('gallery-search-input');
  if (zoneSelect) zoneSelect.value = 'all';
  if (catSelect) catSelect.value = 'all';
  if (searchInput) searchInput.value = '';
  applyFilters();
}

function applyFilters() {
  if (currentViewMode === 'album-detail') {
    // In album detail view, filters aren't applied to photos within album
    return;
  }

  if (currentViewMode === 'albums') {
    filteredAlbums = cachedAlbums.filter(a => {
      if (currentZoneFilter !== 'all' && a.planting_zone_id !== currentZoneFilter) return false;
      if (currentCategoryFilter !== 'all' && a.category !== currentCategoryFilter) return false;
      if (currentSearchTerm) {
        const matchTitle = (a.title || '').toLowerCase().includes(currentSearchTerm);
        const matchDesc = (a.description || '').toLowerCase().includes(currentSearchTerm);
        const matchCat = (a.category || '').toLowerCase().includes(currentSearchTerm);
        const matchZone = (a.zone?.name || '').toLowerCase().includes(currentSearchTerm);
        if (!matchTitle && !matchDesc && !matchCat && !matchZone) return false;
      }
      return true;
    });

    const countNum = document.getElementById('gallery-count-num');
    const countLabel = document.getElementById('gallery-count-label');
    if (countNum) countNum.textContent = filteredAlbums.length;
    if (countLabel) countLabel.textContent = 'Album';
    renderAlbumGrid();
  } else {
    // Flat photos mode (backward compatible)
    filteredPhotos = cachedPublicPhotos.filter(p => {
      if (currentZoneFilter !== 'all' && p.planting_zone_id !== currentZoneFilter) return false;
      if (currentCategoryFilter !== 'all' && p.category !== currentCategoryFilter) return false;
      if (currentSearchTerm) {
        const matchTitle = (p.title || '').toLowerCase().includes(currentSearchTerm);
        const matchCaption = (p.caption || '').toLowerCase().includes(currentSearchTerm);
        const matchZone = (p.zone?.name || '').toLowerCase().includes(currentSearchTerm);
        const matchCat = (p.category || '').toLowerCase().includes(currentSearchTerm);
        if (!matchTitle && !matchCaption && !matchZone && !matchCat) return false;
      }
      return true;
    });

    const countNum = document.getElementById('gallery-count-num');
    const countLabel = document.getElementById('gallery-count-label');
    if (countNum) countNum.textContent = filteredPhotos.length;
    if (countLabel) countLabel.textContent = 'Foto';
    renderPhotoGrid();
  }

  // Update UI elements
  const resetBtn = document.getElementById('gallery-reset-btn');
  if (resetBtn) {
    const hasFilter = currentZoneFilter !== 'all' || currentCategoryFilter !== 'all' || currentSearchTerm.length > 0;
    resetBtn.style.display = hasFilter ? 'inline-flex' : 'none';
  }
  const clearBtn = document.getElementById('gallery-search-clear');
  if (clearBtn) {
    clearBtn.style.display = currentSearchTerm.length > 0 ? 'flex' : 'none';
  }
}

// ─── Album Grid Rendering ────────────────────────────────────

function renderAlbumGrid() {
  const gridContainer = document.getElementById('gallery-grid-container');
  if (!gridContainer) return;

  if (filteredAlbums.length === 0) {
    gridContainer.innerHTML = `
      <div class="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center text-slate-300 max-w-lg mx-auto my-6 shadow-xl">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
          📷
        </div>
        <h4 class="text-lg font-bold text-white mb-2">Tidak Ada Album Ditemukan</h4>
        <p class="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
          Tidak ditemukan album yang sesuai dengan filter atau pencarian Anda.
        </p>
        <button id="gallery-empty-reset" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          Reset Semua Filter
        </button>
      </div>
    `;
    const emptyResetBtn = document.getElementById('gallery-empty-reset');
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);
    return;
  }

  gridContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
      ${filteredAlbums.map(album => {
        const coverUrl = resolveCoverUrl(album);
        const zoneName = album.zone ? album.zone.name : '';
        const actDate = album.activity_date ? formatDateIndo(album.activity_date) : '';
        const photoCount = album.photos_count ?? album.photo_count ?? 0;

        return `
          <div
            class="gallery-album-card group"
            data-album-id="${album.id}"
            data-album-slug="${album.slug || album.id}"
            style="display: flex; flex-direction: column; justify-content: space-between; background: rgba(15, 28, 22, 0.9); border: 1px solid rgba(16, 185, 129, 0.22); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); cursor: pointer; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;"
          >
            <div>
              <!-- Album Cover Image (16:10 aspect ratio) -->
              <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; background: #070d0a;">
                <img
                  src="${coverUrl}"
                  alt="${escapeHtml(album.title || 'Album Kegiatan')}"
                  loading="lazy"
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
                  class="gallery-img"
                  onerror="this.onerror=null; this.src='${FALLBACK_PHOTO_SVG}';"
                />

                <!-- Overlay gradient -->
                <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%); pointer-events: none;"></div>

                <!-- Top Badges -->
                <div style="position: absolute; top: 12px; left: 12px; right: 12px; display: flex; align-items: center; justify-content: space-between; z-index: 2; pointer-events: none;">
                  <span style="font-size: 11.5px; padding: 4px 12px; border-radius: 9999px; font-weight: 600; background: rgba(9, 20, 15, 0.88); backdrop-filter: blur(8px); border: 1px solid rgba(16, 185, 129, 0.4); color: #6ee7b7; box-shadow: 0 2px 8px rgba(0,0,0,0.5);">
                    ${escapeHtml(album.category || 'Dokumentasi')}
                  </span>
                  <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 700; background: rgba(9, 20, 15, 0.88); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 4px;">
                    <span>📷</span> ${photoCount} Foto
                  </span>
                </div>

                <!-- Bottom album icon overlay -->
                <div style="position: absolute; bottom: 12px; right: 12px; z-index: 2; pointer-events: none;">
                  <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(16, 185, 129, 0.2); backdrop-filter: blur(8px); border: 1px solid rgba(16, 185, 129, 0.4); display: flex; align-items: center; justify-content: center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Content Details -->
              <div style="padding: 18px 20px 14px;">
                <h3 style="font-size: 17px; font-weight: 700; color: #ffffff; margin-bottom: 8px; line-height: 1.35; transition: color 0.2s ease;">
                  ${escapeHtml(album.title || 'Album Kegiatan')}
                </h3>
                ${album.description ? `
                  <p style="font-size: 13px; color: var(--clr-text-muted); line-height: 1.6; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${escapeHtml(album.description)}
                  </p>
                ` : ''}

                <!-- Metadata -->
                <div style="display: flex; flex-direction: column; gap: 6px; padding: 10px 12px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px;">
                  ${zoneName ? `
                    <div style="display: flex; align-items: flex-start; gap: 7px; color: #cbd5e1;">
                      <span style="font-size: 13px; line-height: 1.2;">🏞️</span>
                      <span style="font-weight: 500; line-height: 1.35; color: #e2e8f0;">${escapeHtml(zoneName)}</span>
                    </div>
                  ` : ''}
                  ${actDate ? `
                    <div style="display: flex; align-items: center; gap: 7px; color: var(--clr-text-dim);">
                      <span style="font-size: 13px; line-height: 1.2;">📅</span>
                      <span>Kegiatan: <strong style="color: #6ee7b7; font-weight: 600;">${actDate}</strong></span>
                    </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- Footer Action -->
            <div style="padding: 12px 18px 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: center; gap: 8px;">
              <button
                type="button"
                class="btn-view-album"
                data-album-slug="${album.slug || album.id}"
                style="flex: 1; display: flex; justify-content: center; align-items: center; gap: 8px; font-weight: 600; font-size: 13px; padding: 9px 14px; border-radius: 10px; background: rgba(16, 185, 129, 0.12); color: #ecfdf5; border: 1px solid rgba(16, 185, 129, 0.3); cursor: pointer; transition: all 0.2s ease;"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Buka Album (${photoCount} Foto)</span>
                <span style="margin-left: 2px; transition: transform 0.2s ease;">→</span>
              </button>
              <button
                type="button"
                class="btn-copy-album-link-card"
                data-album-slug="${album.slug || album.id}"
                title="Salin tautan langsung album ini"
                style="padding: 9px 12px; border-radius: 10px; background: rgba(255,255,255,0.06); color: #94a3b8; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; justify-content: center;"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach album card click handlers
  gridContainer.querySelectorAll('.gallery-album-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-copy-album-link-card')) return;
      const albumSlug = card.getAttribute('data-album-slug') || card.getAttribute('data-album-id');
      if (albumSlug) loadAlbumDetail(albumSlug, true);
    });
  });

  // Attach quick copy buttons on cards
  gridContainer.querySelectorAll('.btn-copy-album-link-card').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const slug = btn.getAttribute('data-album-slug');
      if (slug) copyAlbumShareUrl(slug, btn);
    });
  });
}

function resolveCoverUrl(album) {
  // 1. cover_url from appended attribute
  if (album.cover_url) return normalizeUrl(album.cover_url);
  // 2. resolved_cover_url from controller
  if (album.resolved_cover_url) return normalizeUrl(album.resolved_cover_url);
  // 3. cover_photo object
  if (album.cover_photo) {
    const cp = album.cover_photo;
    return normalizeUrl(cp.file_url || cp.thumbnail_url || cp.file_path || '');
  }
  return FALLBACK_PHOTO_SVG;
}

function normalizeUrl(url) {
  if (!url) return FALLBACK_PHOTO_SVG;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/') || url.startsWith('data:')) {
    return url;
  }
  return '/' + url;
}

// ─── Photo Grid Rendering ────────────────────────────────────

function renderPhotoGrid() {
  const gridContainer = document.getElementById('gallery-grid-container');
  if (!gridContainer) return;

  if (filteredPhotos.length === 0) {
    gridContainer.innerHTML = `
      <div class="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center text-slate-300 max-w-lg mx-auto my-6 shadow-xl">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
          📷
        </div>
        <h4 class="text-lg font-bold text-white mb-2">Tidak Ada Foto Ditemukan</h4>
        <p class="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
          ${currentViewMode === 'album-detail' ? 'Album ini belum memiliki foto.' : 'Tidak ditemukan foto yang sesuai dengan filter.'}
        </p>
        ${currentViewMode === 'album-detail' ? `
          <button id="gallery-empty-back" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Kembali ke Album
          </button>
        ` : `
          <button id="gallery-empty-reset" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            Reset Semua Filter
          </button>
        `}
      </div>
    `;

    const emptyResetBtn = document.getElementById('gallery-empty-reset');
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAllFilters);
    const emptyBackBtn = document.getElementById('gallery-empty-back');
    if (emptyBackBtn) emptyBackBtn.addEventListener('click', navigateBackToAlbums);
    return;
  }

  // 3-Column Responsive Grid
  gridContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
      ${filteredPhotos.map((photo, index) => {
    const zoneName = photo.zone ? photo.zone.name : 'Kawasan Penanaman';
    const docDate = photo.documented_at ? formatDateIndo(photo.documented_at) : formatDateDisplay(photo.created_at);
    let rawUrl = photo.thumbnail_url || photo.file_url || photo.file_path || '';
    let imgUrl = rawUrl;
    if (imgUrl && !imgUrl.startsWith('http://') && !imgUrl.startsWith('https://') && !imgUrl.startsWith('/')) {
      imgUrl = '/' + imgUrl;
    }

    return `
          <div
            class="gallery-card point-card group relative overflow-hidden rounded-2xl cursor-pointer"
            data-index="${index}"
            style="aspect-ratio: 16 / 10; background: #070d0a; border: 1px solid rgba(16, 185, 129, 0.22); box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;"
          >
            <!-- Thumbnail Media -->
            <img
              src="${imgUrl}"
              alt="${escapeHtml(photo.alt_text || photo.title || 'Foto Kawasan')}"
              loading="lazy"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
              class="gallery-img w-full h-full object-cover group-hover:scale-105"
            />

            ${photo.is_cover ? `
              <div class="absolute top-3 left-3 z-2 pointer-events-none">
                <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 700; background: #f59e0b; color: #1e1b4b; box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 4px;">
                  <span>⭐</span> Sampul
                </span>
              </div>
            ` : ''}
          </div>
        `;
  }).join('')}
    </div>
  `;

  // Attach card clicks to open lightbox
  gridContainer.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        openLightbox(idx);
      }
    });
  });
}

// ─── Lightbox ────────────────────────────────────────────────

function setupLightboxListeners() {
  const modal = document.getElementById('gallery-lightbox-modal');
  const btnClose = document.getElementById('btn-close-lightbox');
  const btnPrev = document.getElementById('btn-lightbox-prev');
  const btnNext = document.getElementById('btn-lightbox-next');

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (btnPrev) btnPrev.addEventListener('click', (e) => { e.stopPropagation(); prevLightboxPhoto(); });
  if (btnNext) btnNext.addEventListener('click', (e) => { e.stopPropagation(); nextLightboxPhoto(); });

  // Backdrop click closes lightbox
  const stage = document.getElementById('lightbox-stage');
  const imgWrapper = document.getElementById('lightbox-img-wrapper');
  if (stage) {
    stage.addEventListener('click', (e) => {
      if (e.target === stage) {
        closeLightbox();
      }
    });
  }
  if (imgWrapper) {
    imgWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Prevent multiple bindings if initPublicGallery is called again
  if (!isLightboxListenersAttached) {
    isLightboxListenersAttached = true;

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      const activeModal = document.getElementById('gallery-lightbox-modal');
      if (!activeModal || activeModal.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevLightboxPhoto();
      else if (e.key === 'ArrowRight') nextLightboxPhoto();
    });

    // Touch swipe support on lightbox stage
    if (stage) {
      let touchStartX = 0;
      stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      stage.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) prevLightboxPhoto();
          else nextLightboxPhoto();
        }
      }, { passive: true });
    }
  }
}

function openLightbox(index) {
  if (index < 0 || index >= filteredPhotos.length) return;
  currentLightboxIndex = index;

  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  updateLightboxContent();
}

function closeLightbox() {
  const modal = document.getElementById('gallery-lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  currentLightboxIndex = -1;
}

function prevLightboxPhoto() {
  if (filteredPhotos.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
  updateLightboxContent();
}

function nextLightboxPhoto() {
  if (filteredPhotos.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % filteredPhotos.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  if (currentLightboxIndex < 0 || currentLightboxIndex >= filteredPhotos.length) return;
  const photo = filteredPhotos[currentLightboxIndex];

  const img = document.getElementById('lightbox-img');
  const spinner = document.getElementById('lightbox-loading-spinner');
  const title = document.getElementById('lightbox-title');
  const caption = document.getElementById('lightbox-caption');
  const zoneName = document.getElementById('lightbox-zone-name');
  const date = document.getElementById('lightbox-date');
  const counter = document.getElementById('lightbox-counter');
  const catBadge = document.getElementById('lightbox-category-badge');
  const coverBadge = document.getElementById('lightbox-cover-badge');
  const rawBtn = document.getElementById('lightbox-raw-btn');
  const errorMsg = document.getElementById('lightbox-error-msg');
  const btnPrev = document.getElementById('btn-lightbox-prev');
  const btnNext = document.getElementById('btn-lightbox-next');

  // Show/hide navigation arrows based on count
  if (btnPrev && btnNext) {
    const showNav = filteredPhotos.length > 1;
    btnPrev.style.display = showNav ? 'flex' : 'none';
    btnNext.style.display = showNav ? 'flex' : 'none';
  }

  let fullUrl = photo.file_url || photo.file_path || photo.thumbnail_url || '';
  if (fullUrl && !fullUrl.startsWith('http://') && !fullUrl.startsWith('https://') && !fullUrl.startsWith('/')) {
    fullUrl = '/' + fullUrl;
  }

  if (img) {
    img.classList.remove('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');
    if (spinner) spinner.classList.remove('hidden');

    img.onload = () => {
      if (spinner) spinner.classList.add('hidden');
    };
    img.onerror = () => {
      if (spinner) spinner.classList.add('hidden');
      img.classList.add('hidden');
      if (errorMsg) errorMsg.classList.remove('hidden');
    };
    img.src = fullUrl;
    img.alt = photo.alt_text || photo.title || 'Foto Kawasan';
  }

  if (title) title.textContent = photo.title || 'Dokumentasi Kawasan';
  if (caption) caption.textContent = photo.caption || 'Foto dokumentasi resmi penanaman kawasan restorasi.';
  if (zoneName) {
    const zName = photo.zone ? photo.zone.name : 'Kawasan Penanaman';
    zoneName.innerHTML = `<span>🏞️</span> <span class="truncate max-w-[220px]">${escapeHtml(zName)}</span>`;
  }
  if (date) {
    const docDate = photo.documented_at ? formatDateIndo(photo.documented_at) : formatDateDisplay(photo.created_at);
    date.innerHTML = `<span>📅</span> <span>${escapeHtml(docDate)}</span>`;
  }
  if (counter) counter.textContent = `Foto ${currentLightboxIndex + 1} dari ${filteredPhotos.length}`;
  
  if (catBadge) {
    const albumTitle = (currentAlbumData && currentAlbumData.title) || (photo.album && photo.album.title) || '';
    catBadge.textContent = albumTitle || photo.category || 'Dokumentasi';
    if (albumTitle) {
      catBadge.title = `Album: ${albumTitle}`;
    }
  }

  if (coverBadge) {
    if (photo.is_cover) {
      coverBadge.classList.remove('hidden');
    } else {
      coverBadge.classList.add('hidden');
    }
  }

  if (rawBtn) {
    rawBtn.href = fullUrl || '#';
  }

  // Render thumbnail strip
  renderLightboxThumbStrip();
}

function renderLightboxThumbStrip() {
  const strip = document.getElementById('lightbox-thumb-strip');
  if (!strip) return;

  if (filteredPhotos.length <= 1) {
    strip.style.display = 'none';
    return;
  }
  strip.style.display = 'flex';

  strip.innerHTML = filteredPhotos.map((p, idx) => {
    const isActive = idx === currentLightboxIndex;
    let url = p.thumbnail_url || p.file_url || p.file_path || '';
    if (url && !url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('/')) {
      url = '/' + url;
    }
    return `
      <button
        type="button"
        class="lightbox-thumb-btn shrink-0 w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
          isActive
            ? 'border-emerald-400 ring-2 ring-emerald-500/50 scale-105 opacity-100 shadow-md'
            : 'border-white/10 opacity-50 hover:opacity-90 hover:border-white/40'
        }"
        data-thumb-index="${idx}"
        title="${escapeHtml(p.title || `Foto ${idx + 1}`)}"
        aria-label="Lihat foto ${idx + 1}"
      >
        <img src="${url}" class="w-full h-full object-cover" alt="" onerror="this.onerror=null; this.src='${FALLBACK_PHOTO_SVG}';" />
      </button>
    `;
  }).join('');

  strip.querySelectorAll('.lightbox-thumb-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-thumb-index'), 10);
      if (!isNaN(idx)) {
        currentLightboxIndex = idx;
        updateLightboxContent();
      }
    });
  });

  // Smoothly center the active thumbnail in view
  const activeBtn = strip.querySelector(`[data-thumb-index="${currentLightboxIndex}"]`);
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// ─── Utilities ───────────────────────────────────────────────

function formatDateIndo(dateStr) {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
