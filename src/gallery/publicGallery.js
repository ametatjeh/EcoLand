/**
 * Public Gallery Module for EcoZone 360
 * Menampilkan galeri foto kawasan publik dengan filter kawasan, kategori, pencarian, dan lightbox interaktif.
 */

import { ApiService } from '../services/api.js';

let cachedPublicPhotos = [];
let cachedZones = [];
let currentZoneFilter = 'all';
let currentCategoryFilter = 'all';
let currentSearchTerm = '';
let currentLightboxIndex = -1;
let filteredPhotos = [];

export async function initPublicGallery(containerId = 'public-gallery-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="gallery-wrapper py-6">
      <div class="section-header text-center mb-8">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          📸 Dokumentasi Visual
        </span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Galeri Foto Kawasan</h2>
        <p class="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-2">
          Dokumentasi visual kawasan penanaman, kegiatan, dan perkembangan tanaman berdasarkan foto yang tersedia.
        </p>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="gallery-toolbar bg-slate-900/70 border border-slate-800 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div class="flex flex-wrap items-center gap-2.5">
          <div class="flex items-center gap-1.5 text-xs text-slate-400 font-medium mr-1">
            <span>Filter Kawasan:</span>
          </div>
          <select id="gallery-filter-zone" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500">
            <option value="all">Semua Kawasan</option>
          </select>

          <div class="flex items-center gap-1.5 text-xs text-slate-400 font-medium ml-2 mr-1">
            <span>Kategori:</span>
          </div>
          <select id="gallery-filter-category" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500">
            <option value="all">Semua Kategori</option>
            <option value="Kondisi Kawasan">Kondisi Kawasan</option>
            <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
            <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
            <option value="Pemantauan">Pemantauan</option>
            <option value="Perawatan">Perawatan</option>
            <option value="Fasilitas">Fasilitas</option>
            <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
          </select>
        </div>

        <div class="relative min-w-[220px]">
          <span class="absolute inset-y-0 left-3 flex items-center text-slate-500 text-sm">🔍</span>
          <input
            type="text"
            id="gallery-search-input"
            placeholder="Cari foto..."
            class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-3 py-2 outline-none focus:border-emerald-500 placeholder-slate-500"
          />
        </div>
      </div>

      <!-- Grid Foto Galeri -->
      <div id="gallery-grid-container" class="min-h-[300px]">
        <div class="flex items-center justify-center py-20 text-slate-400 gap-2">
          <span class="animate-spin text-xl">⏳</span> Memuat galeri foto...
        </div>
      </div>
    </div>

    <!-- Lightbox Modal Container -->
    <div id="gallery-lightbox-modal" class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md hidden flex flex-col justify-between" role="dialog" aria-modal="true" aria-label="Penampil Foto Kawasan">
      <!-- Lightbox Header -->
      <div class="flex items-center justify-between px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 text-white select-none z-20">
        <div class="flex items-center gap-3">
          <span id="lightbox-counter" class="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">1 / 1</span>
          <span id="lightbox-category-badge" class="text-xs font-medium text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">Kategori</span>
        </div>
        <button id="btn-close-lightbox" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 transition cursor-pointer font-bold text-sm" aria-label="Tutup penampil foto (Escape)">
          <span>Tutup</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Lightbox Main Stage -->
      <div class="relative flex-1 flex items-center justify-center p-4 overflow-hidden select-none cursor-pointer" id="lightbox-stage">
        <!-- Prev Button -->
        <button id="btn-lightbox-prev" class="absolute left-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition hover:scale-110 cursor-pointer" aria-label="Foto sebelumnya">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- Main Displayed Image (Stops propagation so clicking backdrop closes) -->
        <div class="max-w-5xl max-h-[75vh] flex items-center justify-center transition-all duration-300 cursor-default" id="lightbox-img-wrapper">
          <img id="lightbox-img" src="" alt="" class="max-h-[72vh] max-w-full rounded-xl object-contain shadow-2xl border border-slate-800/80" />
          <div id="lightbox-error-msg" class="hidden bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400">
            <span class="text-3xl mb-2 block">⚠️</span>
            <p class="font-semibold text-white text-sm">Gagal memuat gambar foto</p>
            <p class="text-xs text-slate-400 mt-1">Berkas gambar tidak ditemukan atau belum tersedia.</p>
          </div>
        </div>

        <!-- Next Button -->
        <button id="btn-lightbox-next" class="absolute right-4 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-xl transition hover:scale-110 cursor-pointer" aria-label="Foto berikutnya">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Lightbox Footer (Info & Caption) -->
      <div class="px-6 py-4 bg-slate-900/90 border-t border-slate-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 z-20 select-none">
        <div>
          <h3 id="lightbox-title" class="text-base font-bold text-white leading-snug">Judul Foto</h3>
          <p id="lightbox-caption" class="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">Deskripsi foto</p>
        </div>
        <div class="flex items-center gap-4 text-xs text-slate-400 shrink-0">
          <span id="lightbox-zone-name">🏞️ Kawasan</span>
          <span id="lightbox-date">📅 Tanggal</span>
        </div>
      </div>
    </div>
  `;

  // Load zones for dropdown
  try {
    const zonesRes = await ApiService.getPublicZones();
    cachedZones = zonesRes.zones || [];
    const zoneSelect = document.getElementById('gallery-filter-zone');
    if (zoneSelect && cachedZones.length > 0) {
      cachedZones.forEach((z) => {
        const opt = document.createElement('option');
        opt.value = z.id;
        opt.textContent = `${z.name} (${z.zone_code})`;
        zoneSelect.appendChild(opt);
      });
    }
  } catch (err) {
    console.warn('Gagal memuat kawasan untuk filter galeri:', err);
  }

  // Load photos
  await loadAndRenderPhotos();

  // Attach toolbar listeners
  const zoneSelect = document.getElementById('gallery-filter-zone');
  const catSelect = document.getElementById('gallery-filter-category');
  const searchInput = document.getElementById('gallery-search-input');

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

  // Setup Lightbox bindings
  setupLightboxListeners();
}

async function loadAndRenderPhotos() {
  const gridContainer = document.getElementById('gallery-grid-container');
  if (!gridContainer) return;

  try {
    const res = await ApiService.getAllPublicPhotos();
    cachedPublicPhotos = res.photos || [];
    applyFilters();
  } catch (err) {
    console.error('Error loading gallery photos:', err);
    gridContainer.innerHTML = `
      <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-8 text-center text-sm">
        <p class="font-semibold mb-1">Gagal memuat data galeri foto</p>
        <p class="text-xs text-red-300">${escapeHtml(err.message)}</p>
      </div>
    `;
  }
}

function applyFilters() {
  filteredPhotos = cachedPublicPhotos.filter((p) => {
    // Zone filter
    if (currentZoneFilter !== 'all' && p.planting_zone_id !== currentZoneFilter) {
      return false;
    }
    // Category filter
    if (currentCategoryFilter !== 'all' && p.category !== currentCategoryFilter) {
      return false;
    }
    // Search filter
    if (currentSearchTerm) {
      const matchTitle = (p.title || '').toLowerCase().includes(currentSearchTerm);
      const matchCaption = (p.caption || '').toLowerCase().includes(currentSearchTerm);
      const matchZone = (p.zone?.name || '').toLowerCase().includes(currentSearchTerm);
      const matchCat = (p.category || '').toLowerCase().includes(currentSearchTerm);
      if (!matchTitle && !matchCaption && !matchZone && !matchCat) {
        return false;
      }
    }
    return true;
  });

  renderPhotoGrid();
}

function renderPhotoGrid() {
  const gridContainer = document.getElementById('gallery-grid-container');
  if (!gridContainer) return;

  if (filteredPhotos.length === 0) {
    gridContainer.innerHTML = `
      <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <div class="text-4xl mb-3">📷</div>
        <h4 class="text-base font-bold text-white mb-1">Belum Ada Foto Dokumentasi</h4>
        <p class="text-xs text-slate-400 max-w-md mx-auto">
          Tidak ditemukan foto yang sesuai dengan filter yang dipilih atau belum ada foto yang dipublikasikan.
        </p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      ${filteredPhotos.map((photo, index) => {
        const zoneName = photo.zone ? photo.zone.name : 'Kawasan Penanaman';
        const docDate = photo.documented_at ? formatDateIndo(photo.documented_at) : '-';
        const imgUrl = photo.file_url || photo.file_path;

        return `
          <div
            class="gallery-card group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col cursor-pointer"
            data-index="${index}"
          >
            <!-- Thumbnail Box -->
            <div class="relative aspect-4/3 bg-slate-950 overflow-hidden">
              <img
                src="${imgUrl}"
                alt="${escapeHtml(photo.alt_text || photo.title || 'Foto Kawasan')}"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onerror="this.src='/favicon.svg'"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span class="text-xs font-semibold text-white flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                  🔍 Perbesar
                </span>
              </div>
              <div class="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                <span class="text-[10px] font-semibold bg-slate-900/80 backdrop-blur-sm text-emerald-400 border border-slate-700/80 px-2 py-0.5 rounded-md">
                  ${escapeHtml(photo.category || 'Dokumentasi')}
                </span>
                ${photo.is_cover ? `
                  <span class="text-[10px] font-semibold bg-amber-500/90 text-slate-950 px-2 py-0.5 rounded-md font-bold">
                    ⭐ Sampul
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  ${escapeHtml(photo.title || 'Dokumentasi Kawasan')}
                </h4>
                ${photo.caption ? `
                  <p class="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    ${escapeHtml(photo.caption)}
                  </p>
                ` : ''}
              </div>
              <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span class="truncate max-w-[140px] text-slate-400">🏞️ ${escapeHtml(zoneName)}</span>
                <span>📅 ${docDate}</span>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach card click to open lightbox
  gridContainer.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        openLightbox(idx);
      }
    });
  });
}

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
      // If clicked directly on stage (outside image wrapper)
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

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal || modal.classList.contains('hidden')) return;
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
  const title = document.getElementById('lightbox-title');
  const caption = document.getElementById('lightbox-caption');
  const zoneName = document.getElementById('lightbox-zone-name');
  const date = document.getElementById('lightbox-date');
  const counter = document.getElementById('lightbox-counter');
  const catBadge = document.getElementById('lightbox-category-badge');

  const errorMsg = document.getElementById('lightbox-error-msg');

  if (img) {
    img.classList.remove('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');
    img.onerror = () => {
      img.classList.add('hidden');
      if (errorMsg) errorMsg.classList.remove('hidden');
    };
    img.src = photo.file_url || photo.file_path;
    img.alt = photo.alt_text || photo.title || 'Foto Kawasan';
  }
  if (title) title.textContent = photo.title || 'Dokumentasi Kawasan';
  if (caption) caption.textContent = photo.caption || '-';
  if (zoneName) zoneName.textContent = `🏞️ ${photo.zone ? photo.zone.name : 'Kawasan Penanaman'}`;
  if (date) date.textContent = `📅 ${photo.documented_at ? formatDateIndo(photo.documented_at) : '-'}`;
  if (counter) counter.textContent = `${currentLightboxIndex + 1} / ${filteredPhotos.length}`;
  if (catBadge) catBadge.textContent = photo.category || 'Dokumentasi';
}

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
