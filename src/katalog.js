/**
 * Katalog Jenis Pohon Kawasan Restorasi — Eco Land
 * Dokumentasi resmi jenis pohon yang terdaftar dan ditanam dalam kegiatan restorasi kawasan.
 * Menyajikan informasi setiap spesies, foto dokumentasi, nama ilmiah, jumlah bibit ditanam,
 * serta kondisi kelangsungan hidup berdasarkan catatan penanaman dan hasil survei lapangan yang terverifikasi.
 */
import { ApiService } from './services/api.js';
import { formatDateDisplay } from './utils/date.js';

let cachedPublicSpecies = [];
let onJumpToSceneCallback = null;
let currentContainerId = 'public-tree-catalog-container';
let currentMode = 'list'; // 'list' | 'detail' | 'not-found'
let currentSpeciesId = null;
let detailSlideTimer = null;

function clearDetailSlideTimer() {
  if (detailSlideTimer) {
    clearInterval(detailSlideTimer);
    detailSlideTimer = null;
  }
}

let currentSearchTerm = '';
let currentOriginFilter = 'all';
let currentFamilyFilter = 'all';

// Lightbox modal state untuk foto spesies di katalog
let currentLightboxIndex = -1;
let currentLightboxPhotos = [];
let currentLightboxSpecies = null;
let isCatalogLightboxBound = false;

/**
 * Inisialisasi modul katalog publik.
 */
export async function initPublicTreeCatalog(containerId = 'public-tree-catalog-container', onJumpToScene = null, initialSpeciesId = null) {
  currentContainerId = containerId;
  onJumpToSceneCallback = onJumpToScene;

  // Baca parameter spesifik dari hash jika ada
  const hashParam = getSpeciesIdFromHash();
  currentSpeciesId = initialSpeciesId || hashParam || null;

  // Pasang listener hashchange satu kali untuk deep linking
  if (!window._treeCatalogHashBound) {
    window._treeCatalogHashBound = true;
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#katalog')) {
        const sid = getSpeciesIdFromHash();
        if (sid !== currentSpeciesId) {
          clearDetailSlideTimer();
          currentSpeciesId = sid;
          renderCatalogState();
        }
      } else {
        clearDetailSlideTimer();
      }
    });
  }

  await loadAndRenderCatalog();
}

/**
 * Ekstraksi ID atau slug spesies dari URL hash
 */
function getSpeciesIdFromHash() {
  const hash = window.location.hash || '';
  if (!hash.startsWith('#katalog')) return null;

  const clean = hash.replace(/^#\/?/, '').trim();
  const [routePart, queryPart] = clean.split('?');
  const params = new URLSearchParams(queryPart || '');

  if (params.get('species')) {
    return params.get('species').trim();
  }

  if (routePart && routePart.startsWith('katalog/')) {
    const sub = routePart.slice(8).trim();
    if (sub) return sub;
  }

  if (routePart && routePart.startsWith('katalog-pohon/')) {
    const sub = routePart.slice(14).trim();
    if (sub) return sub;
  }

  return null;
}

/**
 * Muat data katalog dari API publik
 */
export async function loadAndRenderCatalog() {
  const container = document.getElementById(currentContainerId);
  if (!container) return;

  // Render initial loading state
  container.innerHTML = `
    <div class="catalog-wrapper">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 340px; gap: 14px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span>
        <span style="font-size: 14px;">Memuat data katalog jenis pohon restorasi...</span>
      </div>
    </div>
  `;

  try {
    const res = await ApiService.getPublicTreeSpecies();
    cachedPublicSpecies = res.species || [];
    renderCatalogState();
  } catch (err) {
    container.innerHTML = `
      <div class="catalog-wrapper">
        <div style="padding: 32px 24px; text-align: center; background: rgba(239, 68, 68, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.25);">
          <span style="font-size: 36px; display: block; margin-bottom: 8px;">⚠️</span>
          <h3 style="color: var(--clr-danger); font-size: 18px; margin-bottom: 6px;">Gagal Memuat Katalog Jenis Pohon</h3>
          <p style="font-size: 13px; color: var(--clr-text-muted); max-width: 500px; margin: 0 auto 16px;">${escapeHtml(err.message || 'Terjadi gangguan saat menghubungi server basis data.')}</p>
          <button id="btn-retry-catalog" class="btn-primary-action btn-sm">Coba Muat Ulang</button>
        </div>
      </div>
    `;
    document.getElementById('btn-retry-catalog')?.addEventListener('click', () => loadAndRenderCatalog());
  }
}

/**
 * Mengarahkan render ke list atau detail berdasarkan state saat ini
 */
function renderCatalogState() {
  clearDetailSlideTimer();
  const container = document.getElementById(currentContainerId);
  if (!container) return;

  if (currentSpeciesId) {
    const species = cachedPublicSpecies.find((s) => String(s.id).toLowerCase() === String(currentSpeciesId).toLowerCase());
    if (species) {
      currentMode = 'detail';
      renderSpeciesDetailView(container, species);
    } else {
      currentMode = 'not-found';
      renderSpeciesNotFoundView(container, currentSpeciesId);
    }
  } else {
    currentMode = 'list';
    renderCatalogListView(container);
  }
}

/**
 * ─────────────────────────────────────────────────────────────
 * TAMPILAN 1: DAFTAR KATALOG UTAMA (GRID & FILTER)
 * ─────────────────────────────────────────────────────────────
 */
function renderCatalogListView(container) {
  // Ambil daftar famili unik yang benar-benar tercatat di database
  const availableFamilies = [...new Set(cachedPublicSpecies.map((s) => s.family).filter(Boolean))].sort();

  container.innerHTML = `
    <div class="catalog-wrapper">
      <!-- Section Header Hero Banner -->
      <div class="hero-section text-center relative overflow-hidden" style="padding: 32px 24px; margin-bottom: 28px; background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.14) 0%, rgba(10, 24, 20, 0.8) 75%); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.6);">
        <div class="hero-badge" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--clr-primary-light); margin-bottom: 12px;">
          <span>🌳</span> Flora & Silvikultur Kawasan
        </div>
        <h1 class="hero-title" style="font-size: 30px; font-weight: 800; color: #ffffff; margin-bottom: 12px; line-height: 1.25;">
          Katalog Jenis Pohon Kawasan Restorasi
        </h1>
        <p class="hero-subtitle" style="font-size: 14px; line-height: 1.65; color: #cbd5e1; max-width: 860px; margin: 0 auto; text-align: center;">
          Dokumentasi jenis pohon yang terdaftar dan ditanam dalam kegiatan restorasi kawasan. Katalog ini menyajikan informasi setiap spesies, dilengkapi foto dokumentasi, nama ilmiah, jumlah bibit yang ditanam, serta kondisi kelangsungan hidup berdasarkan catatan penanaman dan hasil survei lapangan yang terverifikasi.
        </p>
      </div>

      <!-- Filters & Search Toolbar (Mengikuti gaya & struktur .gallery-filter-bar pada #galeri) -->
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
            id="catalog-search-input"
            placeholder="Cari nama umum, ilmiah, lokal, famili..."
            class="gallery-search-field"
            value="${escapeHtml(currentSearchTerm)}"
            autocomplete="off"
            aria-label="Pencarian jenis pohon"
          />
          <button id="catalog-search-clear" class="gallery-search-clear" style="display: ${currentSearchTerm ? 'flex' : 'none'};" title="Hapus pencarian">✕</button>
        </div>

        <!-- 2. Controls Group -->
        <div class="gallery-filters-group">
          <!-- Status Asal Pill -->
          <div class="gallery-filter-pill" title="Filter berdasarkan status asal pohon">
            <span class="gallery-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <span class="gallery-pill-label">Status:</span>
            <select id="catalog-filter-origin" class="gallery-pill-select" aria-label="Filter Status Asal">
              <option value="all" ${currentOriginFilter === 'all' ? 'selected' : ''}>Semua Status</option>
              <option value="lokal_asli" ${currentOriginFilter === 'lokal_asli' ? 'selected' : ''}>Jenis Asli / Lokal</option>
              <option value="introduksi" ${currentOriginFilter === 'introduksi' ? 'selected' : ''}>Jenis Introduksi</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Famili Pill -->
          ${availableFamilies.length > 0 ? `
            <div class="gallery-filter-pill" title="Filter berdasarkan famili botani">
              <span class="gallery-pill-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <circle cx="7" cy="7" r="1.5"></circle>
                </svg>
              </span>
              <span class="gallery-pill-label">Famili:</span>
              <select id="catalog-filter-family" class="gallery-pill-select" aria-label="Filter Famili">
                <option value="all" ${currentFamilyFilter === 'all' ? 'selected' : ''}>Semua Famili</option>
                ${availableFamilies.map((fam) => `<option value="${escapeHtml(fam)}" ${currentFamilyFilter === fam ? 'selected' : ''}>${escapeHtml(fam)}</option>`).join('')}
              </select>
              <span class="gallery-pill-chevron">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          ` : ''}

          <!-- Counter Badge & Reset Button (Meta Group) -->
          <div class="gallery-filters-meta">
            <span class="gallery-count-badge" id="catalog-counter-badge" title="Total spesies ditampilkan">
              ${cachedPublicSpecies.length} Spesies
            </span>

            <button id="catalog-reset-filters" class="gallery-reset-btn" style="display: ${isFilterActive() ? 'inline-flex' : 'none'};" title="Reset filter & pencarian">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Grid Kartu Spesies -->
      <div id="catalog-species-grid" style="min-height: 280px;">
        <!-- Populated via applyCatalogFilters -->
      </div>
    </div>
  `;

  bindCatalogListEvents();
  applyCatalogFilters();
}

/**
 * Event bindings untuk pencarian dan filter
 */
function bindCatalogListEvents() {
  const searchInput = document.getElementById('catalog-search-input');
  const clearBtn = document.getElementById('catalog-search-clear');
  const originSelect = document.getElementById('catalog-filter-origin');
  const familySelect = document.getElementById('catalog-filter-family');
  const resetBtn = document.getElementById('catalog-reset-filters');

  searchInput?.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.toLowerCase().trim();
    if (clearBtn) clearBtn.style.display = currentSearchTerm ? 'flex' : 'none';
    applyCatalogFilters();
  });

  clearBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      currentSearchTerm = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      applyCatalogFilters();
    }
  });

  originSelect?.addEventListener('change', (e) => {
    currentOriginFilter = e.target.value;
    applyCatalogFilters();
  });

  familySelect?.addEventListener('change', (e) => {
    currentFamilyFilter = e.target.value;
    applyCatalogFilters();
  });

  resetBtn?.addEventListener('click', () => {
    currentSearchTerm = '';
    currentOriginFilter = 'all';
    currentFamilyFilter = 'all';
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';
    if (originSelect) originSelect.value = 'all';
    if (familySelect) familySelect.value = 'all';
    applyCatalogFilters();
  });
}

function isFilterActive() {
  return currentSearchTerm.length > 0 || currentOriginFilter !== 'all' || currentFamilyFilter !== 'all';
}

/**
 * Saring data spesies dan render grid
 */
function applyCatalogFilters() {
  const grid = document.getElementById('catalog-species-grid');
  const counterBadge = document.getElementById('catalog-counter-badge');
  const resetBtn = document.getElementById('catalog-reset-filters');

  if (!grid) return;

  const filtered = cachedPublicSpecies.filter((sp) => {
    // 1. Status asal filter
    if (currentOriginFilter !== 'all' && sp.origin_status !== currentOriginFilter) {
      return false;
    }
    // 2. Famili filter
    if (currentFamilyFilter !== 'all' && sp.family !== currentFamilyFilter) {
      return false;
    }
    // 3. Search text
    if (currentSearchTerm) {
      const matchCommon = (sp.common_name || '').toLowerCase().includes(currentSearchTerm);
      const matchScientific = (sp.scientific_name || '').toLowerCase().includes(currentSearchTerm);
      const matchLocal = (sp.local_name || '').toLowerCase().includes(currentSearchTerm);
      const matchFamily = (sp.family || '').toLowerCase().includes(currentSearchTerm);
      if (!matchCommon && !matchScientific && !matchLocal && !matchFamily) {
        return false;
      }
    }
    return true;
  });

  if (counterBadge) {
    counterBadge.textContent = `${filtered.length} dari ${cachedPublicSpecies.length} Spesies`;
  }
  if (resetBtn) {
    resetBtn.style.display = isFilterActive() ? 'inline-flex' : 'none';
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="padding: 60px 24px; text-align: center; background: rgba(11, 20, 16, 0.6); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 16px;">
        <span style="font-size: 42px; display: block; margin-bottom: 12px;">🌱</span>
        <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px;">Jenis pohon tidak ditemukan</h3>
        <p style="font-size: 13.5px; color: var(--clr-text-muted); max-width: 480px; margin: 0 auto 18px; line-height: 1.5;">
          ${isFilterActive() ? 'Tidak ada jenis pohon yang sesuai dengan kriteria pencarian dan filter Anda saat ini.' : 'Belum ada data master jenis pohon yang dipublikasikan dalam sistem.'}
        </p>
        ${isFilterActive() ? `
          <button id="btn-empty-reset" class="btn-secondary-action btn-sm">Tampilkan Semua Jenis Pohon</button>
        ` : ''}
      </div>
    `;
    document.getElementById('btn-empty-reset')?.addEventListener('click', () => {
      currentSearchTerm = '';
      currentOriginFilter = 'all';
      currentFamilyFilter = 'all';
      const searchInput = document.getElementById('catalog-search-input');
      const originSelect = document.getElementById('catalog-filter-origin');
      const familySelect = document.getElementById('catalog-filter-family');
      if (searchInput) searchInput.value = '';
      if (originSelect) originSelect.value = 'all';
      if (familySelect) familySelect.value = 'all';
      applyCatalogFilters();
    });
    return;
  }

  grid.innerHTML = `
    <div class="catalog-species-grid-inner">
      ${filtered.map((sp) => renderSpeciesCard(sp)).join('')}
    </div>
  `;

  // Pasang event pada tombol Lihat Profil
  grid.querySelectorAll('.btn-view-species-profile').forEach((btn) => {
    btn.addEventListener('click', () => {
      const spId = btn.getAttribute('data-id');
      navigateToSpeciesDetail(spId);
    });
  });
}

/**
 * Normalisasi URL foto agar selalu menghasilkan path yang valid tanpa double prefix
 */
function formatPhotoUrl(src) {
  if (!src || typeof src !== 'string') return '';
  src = src.trim();
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;

  src = src.replace(/^.*?\/storage\/app\/public\//, '');
  while (src.startsWith('/storage/storage/')) {
    src = src.replace('/storage/storage/', '/storage/');
  }
  while (src.startsWith('/public/storage/')) {
    src = src.replace('/public/storage/', '/storage/');
  }

  if (src.startsWith('/storage/')) return src;
  if (src.startsWith('storage/')) return '/' + src;
  if (src.startsWith('/')) {
    if (src.startsWith('/demo/')) return '/storage' + src;
    return src;
  }
  return '/storage/' + src;
}

/**
 * Render satu kartu jenis pohon
 */
function renderSpeciesCard(sp) {
  const originLabel = sp.origin_status_label || (sp.origin_status === 'lokal_asli' ? 'Jenis Asli / Lokal' : 'Jenis Introduksi');
  const originBadgeClass = sp.origin_status === 'lokal_asli' ? 'pill-success' : 'pill-info';

  // Periksa ketersediaan foto aktual
  const hasPhoto = Boolean(sp.photo_path && sp.photo_path.trim());
  let photoSrc = hasPhoto ? formatPhotoUrl(sp.photo_path) : '';

  // Jumlah bibit ditanam secara faktual
  let plantedText = 'Data belum tersedia';
  let plantedColor = 'var(--clr-text-muted)';
  if (sp.has_planted_data && sp.total_planted !== null && sp.total_planted > 0) {
    plantedText = `${formatNumber(sp.total_planted)} bibit ditanam`;
    plantedColor = 'var(--clr-primary-light)';
  } else if (sp.has_planted_data && sp.total_planted === 0) {
    plantedText = '0 bibit tercatat';
  }

  return `
    <div class="point-card catalog-card group" style="display: flex; flex-direction: column; justify-content: space-between; background: rgba(15, 28, 22, 0.88); border: 1px solid rgba(16, 185, 129, 0.18); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;">
      <div>
        <!-- Bagian Foto Dokumentasi -->
        <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; background: #070d0a;">
          ${hasPhoto ? `
            <img
              src="${photoSrc}"
              alt="Dokumentasi ${escapeHtml(sp.common_name)} (${escapeHtml(sp.scientific_name)})"
              loading="lazy"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
              onerror="this.parentElement.innerHTML = getNeutralPhotoPlaceholderHtml();"
            />
          ` : getNeutralPhotoPlaceholderHtml()}

          <!-- Badge Status Asal (Overlay) -->
          <div style="position: absolute; top: 12px; left: 12px; z-index: 2;">
            <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
              ${escapeHtml(originLabel)}
            </span>
          </div>
        </div>

        <!-- Konten Informasi Pohon -->
        <div style="padding: 18px 20px 14px;">
          <!-- Nama Umum & Nama Ilmiah -->
          <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 4px; line-height: 1.3;">
            ${escapeHtml(sp.common_name)}
          </h2>

          <div style="font-size: 13px; font-style: italic; color: var(--clr-primary-light); font-weight: 500; margin-bottom: 10px;">
            ${escapeHtml(sp.scientific_name)}
          </div>

          <!-- Metadata Lokal & Famili -->
          <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px; font-size: 12.5px;">
            <div style="color: var(--clr-text-muted);">
              <span style="color: var(--clr-text-dim);">Nama Daerah:</span>
              <strong style="color: #e2e8f0; font-weight: 500;">${escapeHtml(sp.local_name || 'Data belum tersedia')}</strong>
            </div>
            ${sp.family ? `
              <div style="color: var(--clr-text-muted);">
                <span style="color: var(--clr-text-dim);">Famili:</span>
                <span style="color: #cbd5e1;">${escapeHtml(sp.family)}</span>
              </div>
            ` : ''}
          </div>

          <!-- Kuantitas Penanaman (Faktual) -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.06); margin-bottom: 14px;">
            <div style="font-size: 11px; color: var(--clr-text-dim); text-transform: uppercase; font-weight: 600;">Bibit Ditanam</div>
            <div style="font-size: 13px; font-weight: 700; color: ${plantedColor};">
              ${plantedText}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Tombol Aksi -->
      <div style="padding: 12px 20px 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: flex-end; align-items: center;">
        <button
          type="button"
          class="btn-view-species-profile btn-secondary-action btn-sm"
          data-id="${escapeHtml(sp.id)}"
          style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 10px; background: rgba(16, 185, 129, 0.12); color: #ecfdf5; border: 1px solid rgba(16, 185, 129, 0.3); cursor: pointer; transition: all 0.2s ease;"
        >
          Lihat Profil Jenis Pohon <span>→</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Placeholder visual netral ketika foto tidak tersedia
 */
function getNeutralPhotoPlaceholderHtml() {
  return `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(6, 12, 10, 0.95) 100%); color: var(--clr-text-dim); padding: 16px;">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6; margin-bottom: 6px; color: var(--clr-primary-light);">
        <path d="M12 2a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.7 8.6L12 22l2.3-2.4C18.2 18.6 21 15.1 21 11a9 9 0 0 0-9-9z"></path>
        <path d="M12 7v10"></path>
        <path d="M8 11l4-4 4 4"></path>
      </svg>
      <span style="font-size: 12px; font-weight: 500; color: #94a3b8;">Foto belum tersedia</span>
      <span style="font-size: 10.5px; color: #64748b; margin-top: 2px;">Menunggu verifikasi dokumentasi lapangan</span>
    </div>
  `;
}

/**
 * Navigasi menuju halaman detail profil pohon
 */
function navigateToSpeciesDetail(speciesId) {
  clearDetailSlideTimer();
  currentSpeciesId = speciesId;
  window.location.hash = `#katalog?species=${encodeURIComponent(speciesId)}`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderCatalogState();
}

/**
 * Navigasi kembali ke daftar katalog utama
 */
function backToCatalogList() {
  clearDetailSlideTimer();
  currentSpeciesId = null;
  window.location.hash = '#katalog';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderCatalogState();
}

/**
 * ─────────────────────────────────────────────────────────────
 * TAMPILAN 2: HALAMAN DETAIL PROFIL JENIS POHON
 * ─────────────────────────────────────────────────────────────
 */
function renderSpeciesDetailView(container, sp) {
  const originLabel = sp.origin_status_label || (sp.origin_status === 'lokal_asli' ? 'Jenis Asli / Lokal' : 'Jenis Introduksi');
  const originBadgeClass = sp.origin_status === 'lokal_asli' ? 'pill-success' : 'pill-info';

  const hasPhoto = Boolean(sp.photo_path && sp.photo_path.trim());
  let photoSrc = hasPhoto ? formatPhotoUrl(sp.photo_path) : '';

  // Kumpulan foto galeri untuk auto slider
  const rawPhotos = Array.isArray(sp.gallery_photos) && sp.gallery_photos.length > 0
    ? sp.gallery_photos
    : (photoSrc ? [photoSrc] : []);

  const photos = rawPhotos.map((p) => formatPhotoUrl(p)).filter(Boolean);
  const hasPhotos = photos.length > 0;

  // Ringkasan penanaman
  const plantings = sp.plantings || [];
  const hasPlanted = sp.has_planted_data && sp.total_planted !== null && sp.total_planted > 0;
  const totalPlantedStr = hasPlanted ? `${formatNumber(sp.total_planted)} bibit (batang)` : 'Data belum tersedia';

  // Ringkasan survei pemantauan
  const survey = sp.latest_survey;

  container.innerHTML = `
    <div class="catalog-wrapper catalog-detail-page">
      <!-- Breadcrumb & Tombol Kembali -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
        <nav aria-label="Breadcrumb" style="font-size: 13px; color: var(--clr-text-muted); display: flex; align-items: center; gap: 8px;">
          <button id="btn-breadcrumb-back" class="btn-text-btn" style="color: var(--clr-primary-light); text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; font-size: 13px; font-weight: 500;">
            ← Katalog Jenis Pohon
          </button>
          <span style="color: var(--clr-text-dim);">/</span>
          <span style="color: #f8fafc; font-weight: 600;">${escapeHtml(sp.common_name)}</span>
        </nav>

        <button
          id="btn-back-to-catalog"
          type="button"
          class="btn-secondary-action btn-sm"
          style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer;"
        >
          <span>←</span> Kembali ke Katalog Jenis Pohon
        </button>
      </div>

      <!-- Header Hero Profil Spesies -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; background: rgba(15, 28, 22, 0.85); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; padding: 24px; margin-bottom: 28px; box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.6);">
        <!-- Kolom Kiri: Foto Dokumentasi (Auto Slider) -->
        <div>
          ${!hasPhotos ? `
            <div style="width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: #070d0a; border: 1px solid rgba(255, 255, 255, 0.1); position: relative;">
              ${getNeutralPhotoPlaceholderHtml()}
              <div style="position: absolute; top: 12px; left: 12px; z-index: 5;">
                <span style="font-size: 11px; padding: 4px 12px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
                  ${escapeHtml(originLabel)}
                </span>
              </div>
            </div>
          ` : photos.length === 1 ? `
            <div
              class="catalog-photo-zoomable"
              data-photo-index="0"
              style="width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: #070d0a; border: 1px solid rgba(255, 255, 255, 0.1); position: relative; cursor: pointer;"
              title="Klik untuk melihat foto dalam layar penuh (fullscreen lightbox)"
            >
              <img
                src="${escapeHtml(photos[0])}"
                alt="Foto Dokumentasi ${escapeHtml(sp.common_name)} (${escapeHtml(sp.scientific_name)})"
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
                onerror="this.parentElement.innerHTML = getNeutralPhotoPlaceholderHtml();"
              />
              <div style="position: absolute; top: 12px; left: 12px; z-index: 5;">
                <span style="font-size: 11px; padding: 4px 12px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
                  ${escapeHtml(originLabel)}
                </span>
              </div>
              <!-- Hint Icon Zoom Fullscreen (Kanan Bawah) -->
              <div style="position: absolute; bottom: 12px; right: 12px; z-index: 5; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 4px 8px; display: flex; align-items: center; gap: 5px; color: #e2e8f0; font-size: 11px; font-weight: 600; pointer-events: none;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <span>Perbesar</span>
              </div>
            </div>
          ` : `
            <div id="catalog-species-slider-box" style="width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: #070d0a; border: 1px solid rgba(255, 255, 255, 0.1); position: relative; user-select: none;">
              ${photos.map((pUrl, pIdx) => `
                <div
                  class="catalog-slide-item catalog-photo-zoomable"
                  data-photo-index="${pIdx}"
                  style="position: absolute; inset: 0; opacity: ${pIdx === 0 ? '1' : '0'}; transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1); pointer-events: ${pIdx === 0 ? 'auto' : 'none'}; z-index: ${pIdx === 0 ? '2' : '1'}; cursor: pointer;"
                  title="Klik untuk melihat foto dalam layar penuh (fullscreen lightbox)"
                >
                  <img
                    src="${escapeHtml(pUrl)}"
                    alt="Foto Dokumentasi ${escapeHtml(sp.common_name)} (${pIdx + 1}/${photos.length})"
                    style="width: 100%; height: 100%; object-fit: cover;"
                    onerror="this.src='/favicon.svg'"
                  />
                </div>
              `).join('')}

              <!-- Badge Asal Spesies (Kiri Atas) -->
              <div style="position: absolute; top: 12px; left: 12px; z-index: 10;">
                <span style="font-size: 11px; padding: 4px 12px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
                  ${escapeHtml(originLabel)}
                </span>
              </div>

              <!-- Counter Foto & Hint Zoom (Kanan Atas) -->
              <div style="position: absolute; top: 12px; right: 12px; z-index: 10; display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 11px; padding: 3px 8px; border-radius: 9999px; font-weight: 600; background: rgba(0,0,0,0.75); color: #34d399; border: 1px solid rgba(52,211,153,0.3); backdrop-filter: blur(4px); box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  <span>Klik Layar Penuh</span>
                </span>
                <span id="catalog-species-photo-counter" style="font-size: 11px; padding: 3px 10px; border-radius: 9999px; font-weight: 600; background: rgba(0,0,0,0.75); color: #fff; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px); box-shadow: 0 2px 8px rgba(0,0,0,0.5);">
                  1 / ${photos.length} Foto
                </span>
              </div>

              <!-- Tombol Navigasi Kiri / Kanan -->
              <button
                type="button"
                id="btn-slider-prev"
                aria-label="Foto Sebelumnya"
                style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 20px; line-height: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; backdrop-filter: blur(4px); transition: all 0.2s;"
              >‹</button>
              <button
                type="button"
                id="btn-slider-next"
                aria-label="Foto Berikutnya"
                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 20px; line-height: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; backdrop-filter: blur(4px); transition: all 0.2s;"
              >›</button>

              <!-- Titik Indikator Slide (Bawah Tengah) -->
              <div style="position: absolute; bottom: 12px; left: 0; right: 0; display: flex; justify-content: center; align-items: center; gap: 6px; z-index: 10;">
                ${photos.map((_, pIdx) => `
                  <button
                    type="button"
                    class="slider-dot-btn"
                    data-slide-target="${pIdx}"
                    aria-label="Pindah ke foto ${pIdx + 1}"
                    style="width: ${pIdx === 0 ? '22px' : '8px'}; height: 8px; border-radius: 9999px; background: ${pIdx === 0 ? '#10b981' : 'rgba(255,255,255,0.5)'}; border: none; padding: 0; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 1px 4px rgba(0,0,0,0.6);"
                  ></button>
                `).join('')}
              </div>
            </div>
          `}
        </div>

        <!-- Kolom Kanan: Identitas & Metrik Faktual -->
        <div style="display: flex; flex-direction: column; justify-content: flex-start; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 20px;">🌿</span>
              <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-primary-light); font-weight: 700;">
                Profil Spesies Restorasi
              </span>
            </div>

            <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; margin-bottom: 4px; line-height: 1.2;">
              ${escapeHtml(sp.common_name)}
            </h1>

            <div style="font-size: 16px; font-style: italic; color: var(--clr-primary-light); font-weight: 600;">
              ${escapeHtml(sp.scientific_name)} ${sp.family ? `<span style="font-style: normal; color: var(--clr-text-muted); font-size: 14px; font-weight: 400;">• Famili ${escapeHtml(sp.family)}</span>` : ''}
            </div>
          </div>

          <!-- Tabel Identitas Ringkas -->
          <div style="background: rgba(0, 0, 0, 0.32); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; font-size: 13px;">
            <div>
              <span style="color: var(--clr-text-dim); display: block; font-size: 11px; text-transform: uppercase; font-weight: 600;">Nama Daerah / Lokal</span>
              <strong style="color: #f1f5f9; font-weight: 600;">${escapeHtml(sp.local_name || 'Data belum tersedia')}</strong>
            </div>
            <div>
              <span style="color: var(--clr-text-dim); display: block; font-size: 11px; text-transform: uppercase; font-weight: 600;">Klasifikasi Famili</span>
              <span style="color: #e2e8f0;">${escapeHtml(sp.family || 'Data belum tersedia')}</span>
            </div>
            <div>
              <span style="color: var(--clr-text-dim); display: block; font-size: 11px; text-transform: uppercase; font-weight: 600;">Status Asal Spesies</span>
              <span style="color: #e2e8f0;">${escapeHtml(originLabel)}</span>
            </div>
          </div>

          <!-- Posisi Box Faktual: Total Bibit Ditanam & Kegiatan Penanaman (di bawah) -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 12px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <span style="font-size: 11px; color: var(--clr-text-muted); display: block; margin-bottom: 3px; font-weight: 500;">Total Bibit Ditanam</span>
              <strong style="font-size: 15px; color: ${hasPlanted ? 'var(--clr-primary-light)' : 'var(--clr-text-muted)'}; font-weight: 700;">
                ${totalPlantedStr}
              </strong>
            </div>

            <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 10px; padding: 12px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <span style="font-size: 11px; color: var(--clr-text-muted); display: block; margin-bottom: 3px; font-weight: 500;">Kegiatan Penanaman</span>
              <strong style="font-size: 15px; color: #38bdf8; font-weight: 700;">
                ${plantings.length > 0 ? `${plantings.length} Kegiatan Tercatat` : 'Belum Ada'}
              </strong>
            </div>

            ${survey && survey.scope === 'spesies' ? `
              <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 10px; padding: 12px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block; margin-bottom: 3px; font-weight: 500;">Status Pemantauan</span>
                <strong style="font-size: 14px; color: #fcd34d; font-weight: 700;">
                  ${survey.survival_rate !== null ? `Hidup ${survey.survival_rate}%` : capitalize(survey.health_condition || 'Terpantau')}
                </strong>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- SEKSI 1: INFORMASI KEGIATAN PENANAMAN LAPANGAN -->
      <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span>🌱</span> Catatan Kegiatan Penanaman Lapangan
        </h2>
        <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 16px;">
          Rekam jejak resmi penanaman bibit di areal kawasan restorasi yang tercatat dalam sistem administrasi.
        </p>

        ${plantings.length > 0 ? `
          <div style="overflow-x: auto;">
            <table class="data-table" style="width: 100%; font-size: 13px; border-collapse: collapse;">
              <thead>
                <tr style="color: var(--clr-text-dim); border-bottom: 1px solid rgba(255, 255, 255, 0.1); text-align: left; font-size: 11.5px; text-transform: uppercase;">
                  <th style="padding: 10px 12px;">Tanggal Tanam</th>
                  <th style="padding: 10px 12px;">Kelompok / Kegiatan</th>
                  <th style="padding: 10px 12px;">Lokasi & Kawasan</th>
                  <th style="padding: 10px 12px;">Jumlah Bibit</th>
                  <th style="padding: 10px 12px;">Asal / Sumber Bibit</th>
                  <th style="padding: 10px 12px;">Pelaksana</th>
                </tr>
              </thead>
              <tbody>
                ${plantings.map((p) => `
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 10px 12px; font-family: monospace; font-size: 12px; color: var(--clr-primary-light); white-space: nowrap;">
                      ${formatDateDisplay(p.activity_date)}
                    </td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #ffffff;">
                      ${escapeHtml(p.activity_name || '-')}
                    </td>
                    <td style="padding: 10px 12px; color: #cbd5e1;">
                      ${escapeHtml(p.location_zone || p.zone_name || '-')}
                    </td>
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--clr-primary-light); white-space: nowrap;">
                      ${formatNumber(p.quantity)} ${escapeHtml(p.unit || 'batang')}
                    </td>
                    <td style="padding: 10px 12px; color: var(--clr-text-muted); font-size: 12px;">
                      ${escapeHtml(p.seed_source || 'Data belum tersedia')}
                    </td>
                    <td style="padding: 10px 12px; color: var(--clr-text-muted); font-size: 12px;">
                      ${escapeHtml(p.organizer || p.person_in_charge || '-')}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div style="padding: 24px; text-align: center; background: rgba(0,0,0,0.2); border-radius: 10px; border: 1px dashed rgba(255,255,255,0.1); color: var(--clr-text-muted); font-size: 13px;">
            Belum ada catatan kegiatan penanaman di lapangan untuk spesies ini.
          </div>
        `}
      </div>

      ${survey && survey.scope === 'spesies' ? `
        <!-- SEKSI 2: INFORMASI PEMANTAUAN & SENSUS LAPANGAN -->
        <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 22px; margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>🔍</span> Catatan Pemantauan & Sensus Lapangan
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 16px;">
            Hasil pemeriksaan kondisi fisik tanaman, sensus kelangsungan hidup, dan catatan lapangan dari pengendali ekosistem.
          </p>

          <!-- Kartu Sensus Lapangan -->
          <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 18px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div>
                <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--clr-primary-light); display: inline-flex; align-items: center; gap: 6px;">
                  <span>📋</span> ${escapeHtml(survey.scope_label || 'Catatan Sensus Spesies')}
                </span>
                <div style="font-size: 13px; color: #f8fafc; font-weight: 600; margin-top: 2px;">
                  Tanggal Survei: ${formatDateDisplay(survey.survey_date)}
                </div>
              </div>

              ${survey.is_verified ? `
                <span class="admin-header-pill pill-success" style="font-size: 11px; padding: 3px 10px; border-radius: 9999px;">
                  ✓ Sensus Terverifikasi
                </span>
              ` : `
                <span class="admin-header-pill pill-warning" style="font-size: 11px; padding: 3px 10px; border-radius: 9999px;">
                  Dalam Proses Verifikasi
                </span>
              `}
            </div>

            <!-- Metrik Kondisi Fisik Sensus -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 14px;">
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Tanaman Hidup</span>
                <strong style="font-size: 18px; color: #6ee7b7;">${formatNumber(survey.alive_count)}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">batang terdata</span>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Tanaman Mati</span>
                <strong style="font-size: 18px; color: #f87171;">${formatNumber(survey.dead_count)}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">batang</span>
              </div>

              <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Tidak Ditemukan</span>
                <strong style="font-size: 18px; color: #fbbf24;">${formatNumber(survey.missing_count)}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">hilang / belum terlacak</span>
              </div>

              <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Kondisi Kesehatan</span>
                <strong style="font-size: 16px; color: #38bdf8;">${capitalize(survey.health_condition || 'Baik')}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">keseluruhan</span>
              </div>
            </div>

            <!-- Penjelasan Metodologi & Transparansi Perhitungan -->
            ${survey.survival_rate !== null ? `
              <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; font-size: 12.5px; line-height: 1.5; color: #cbd5e1;">
                <div style="font-weight: 700; color: #6ee7b7; margin-bottom: 4px;">
                  📊 Tingkat Kelulusan Hidup (Survival Rate): ${survey.survival_rate}%
                </div>
                <div>
                  <strong>Metode Perhitungan:</strong> Dihitung berdasarkan rumus baku silvikultur:
                  <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #ecfdf5;">(Jumlah Tanaman Hidup ÷ Jumlah Bibit Awal Ditanam) × 100%</code>.
                  Tanaman yang hilang atau belum ditemukan tidak diikutsertakan sebagai tanaman mati tanpa verifikasi lanjutan.
                </div>
              </div>
            ` : ''}

            <!-- Petugas & Catatan Lapangan -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; font-size: 12.5px; color: var(--clr-text-muted); margin-top: 10px;">
              <div>
                <span style="color: var(--clr-text-dim); display: block; font-size: 11px;">Petugas Pemeriksa:</span>
                <span style="color: #f1f5f9; font-weight: 500;">${escapeHtml(survey.inspector_name || 'Tim Lapangan IKHW')}</span>
              </div>
              ${survey.average_height_cm ? `
                <div>
                  <span style="color: var(--clr-text-dim); display: block; font-size: 11px;">Tinggi & Diameter Rata-rata:</span>
                  <span style="color: #f1f5f9; font-weight: 500;">${survey.average_height_cm} cm ${survey.average_diameter_cm ? `• Ø ${survey.average_diameter_cm} cm` : ''}</span>
                </div>
              ` : ''}
            </div>

            ${survey.field_notes ? `
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12.5px; color: #cbd5e1; line-height: 1.5;">
                <strong style="color: var(--clr-primary-light);">Catatan Lapangan:</strong> ${escapeHtml(survey.field_notes)}
              </div>
            ` : ''}
          </div>
        </div>
      ` : ''}

      <!-- SEKSI 3: DESKRIPSI MORFOLOGI, PERAN EKOLOGIS & MANFAAT -->
      <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span>📖</span> Deskripsi Botani & Peran Silvikultur
        </h2>
        <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 18px;">
          Karakteristik botani dan peranan penting spesies ini dalam pemulihan ekosistem kawasan.
        </p>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${sp.description ? `
            <div>
              <h3 style="font-size: 14px; font-weight: 700; color: var(--clr-primary-light); margin-bottom: 4px;">
                Morfologi & Karakter Spesies
              </h3>
              <p style="font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
                ${escapeHtml(sp.description)}
              </p>
            </div>
          ` : ''}

          ${sp.ecological_function ? `
            <div style="background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.18); border-radius: 12px; padding: 14px 16px;">
              <h3 style="font-size: 14px; font-weight: 700; color: var(--clr-primary-light); margin-bottom: 4px;">
                Peran & Fungsi Ekologis Kawasan
              </h3>
              <p style="font-size: 13.5px; line-height: 1.6; color: #ecfdf5;">
                ${escapeHtml(sp.ecological_function)}
              </p>
            </div>
          ` : ''}

          ${sp.benefits ? `
            <div>
              <h3 style="font-size: 14px; font-weight: 700; color: var(--clr-primary-light); margin-bottom: 4px;">
                Manfaat & Nilai Konservasi
              </h3>
              <p style="font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
                ${escapeHtml(sp.benefits)}
              </p>
            </div>
          ` : ''}

          ${!sp.description && !sp.ecological_function && !sp.benefits ? `
            <div style="font-size: 13px; color: var(--clr-text-muted); padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">
              Data deskripsi botani dan fungsi ekologis belum tercatat untuk spesies ini.
            </div>
          ` : ''}
        </div>
      </div>

      <!-- SEKSI 4: TAUTAN PANORAMA 360° (JIKA ADA) -->
      ${sp.scenes && sp.scenes.length > 0 ? `
        <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 16px; padding: 22px; margin-bottom: 28px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>📍</span> Lokasi Penanaman pada Virtual Tour 360°
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 14px;">
            Spesies pohon ini dapat dilihat secara interaktif pada titik-titik panorama 360° berikut:
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${sp.scenes.map((sc) => `
              <button
                type="button"
                class="btn-jump-scene-detail btn-secondary-action btn-sm"
                data-scene-id="${escapeHtml(sc.scene_id)}"
                style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; border-radius: 10px; cursor: pointer;"
              >
                <span>🌐</span> ${escapeHtml(sc.scene_name || sc.zone || sc.scene_id)}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Navigasi Bawah Halaman -->
      <div style="display: flex; justify-content: center; padding-top: 10px;">
        <button
          id="btn-bottom-back-to-catalog"
          type="button"
          class="btn-secondary-action"
          style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; padding: 10px 24px; border-radius: 12px; cursor: pointer;"
        >
          <span>←</span> Kembali ke Katalog Jenis Pohon
        </button>
      </div>
    </div>

    <!-- Fullscreen Lightbox Modal untuk Foto Spesies Pohon -->
    <div id="catalog-species-lightbox-modal" class="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl hidden flex flex-col justify-between select-none" role="dialog" aria-modal="true" aria-label="Penampil Foto Spesies Pohon">
      <!-- Lightbox Header -->
      <div class="lightbox-header-bar flex items-center justify-between px-5 sm:px-8 py-4 bg-slate-900/95 border-b border-white/10 text-white z-30 shrink-0">
        <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span class="text-xs sm:text-sm font-semibold text-white/90 hidden sm:inline-flex items-center gap-2">
            <span>🌳</span> Dokumentasi Spesies
          </span>
          <span class="text-slate-600 hidden sm:inline">•</span>
          <span id="catalog-lightbox-counter" class="text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">1 / 1</span>
          <span id="catalog-lightbox-badge" class="text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700">${escapeHtml(originLabel)}</span>
        </div>

        <div class="flex items-center gap-3">
          <kbd class="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
            <span>Navigasi</span> <span>←</span> <span>→</span> <span class="ml-1 font-bold text-slate-200">ESC</span>
          </kbd>
          <button id="btn-close-catalog-lightbox" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/25 text-slate-200 hover:text-rose-300 border border-white/15 hover:border-rose-500/40 transition-all cursor-pointer font-bold text-xs sm:text-sm" aria-label="Tutup penampil foto (Escape)">
            <span>Tutup</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Lightbox Main Stage -->
      <div class="relative flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer" id="catalog-lightbox-stage">
        <!-- Prev Button -->
        <button id="btn-catalog-lightbox-prev" class="absolute left-3 sm:left-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto sebelumnya (Panah Kiri)" title="Sebelumnya (←)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- Main Displayed Image Wrapper -->
        <div class="relative max-w-5xl w-full flex items-center justify-center cursor-default transition-transform duration-200" id="catalog-lightbox-img-wrapper">
          <div id="catalog-lightbox-spinner" class="absolute inset-0 flex items-center justify-center z-10 hidden">
            <span class="loading-spinner"></span>
          </div>
          <div class="relative inline-block max-w-full">
            <img id="catalog-lightbox-img" src="" alt="" class="max-h-[64vh] sm:max-h-[70vh] md:max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/15 transition-all duration-300 block" />
            
            <a
              id="catalog-lightbox-raw-btn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="lightbox-raw-btn absolute bottom-3.5 right-3.5 z-20 font-semibold text-slate-200 hover:text-white flex items-center gap-2 text-xs sm:text-sm active:scale-95 transition-all duration-200 cursor-pointer"
              title="Buka foto dalam resolusi penuh di tab baru"
            >
              <span>Resolusi Asli</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

        <!-- Next Button -->
        <button id="btn-catalog-lightbox-next" class="absolute right-3 sm:right-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto berikutnya (Panah Kanan)" title="Berikutnya (→)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Bottom Info Bar -->
      <div class="lightbox-footer-bar px-5 sm:px-8 py-4 bg-slate-900/95 border-t border-white/10 text-white z-30 shrink-0">
        <div class="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 id="catalog-lightbox-title" class="text-base sm:text-lg font-bold text-white tracking-tight">${escapeHtml(sp.common_name)} (${escapeHtml(sp.scientific_name)})</h3>
            <p id="catalog-lightbox-caption" class="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-2">${escapeHtml(sp.local_name ? `Nama Daerah: ${sp.local_name}` : 'Foto dokumentasi resmi penanaman spesies pohon.')}</p>
          </div>
          <div class="text-xs text-slate-400 shrink-0">
            ${sp.family ? `Famili: <strong class="text-slate-200">${escapeHtml(sp.family)}</strong>` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  // Pasang listener navigasi kembali
  document.getElementById('btn-breadcrumb-back')?.addEventListener('click', backToCatalogList);
  document.getElementById('btn-back-to-catalog')?.addEventListener('click', backToCatalogList);
  document.getElementById('btn-bottom-back-to-catalog')?.addEventListener('click', backToCatalogList);

  // Pasang auto slider foto jika foto lebih dari 1
  if (photos.length > 1) {
    const sliderContainer = document.getElementById('catalog-species-slider-box');
    const slides = container.querySelectorAll('.catalog-slide-item');
    const dots = container.querySelectorAll('.slider-dot-btn');
    const counter = document.getElementById('catalog-species-photo-counter');
    const btnPrev = document.getElementById('btn-slider-prev');
    const btnNext = document.getElementById('btn-slider-next');
    let currentIndex = 0;

    function goToSlide(targetIndex) {
      if (targetIndex < 0) {
        currentIndex = photos.length - 1;
      } else if (targetIndex >= photos.length) {
        currentIndex = 0;
      } else {
        currentIndex = targetIndex;
      }

      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.style.opacity = '1';
          slide.style.pointerEvents = 'auto';
          slide.style.zIndex = '2';
        } else {
          slide.style.opacity = '0';
          slide.style.pointerEvents = 'none';
          slide.style.zIndex = '1';
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.style.width = '22px';
          dot.style.background = '#10b981';
        } else {
          dot.style.width = '8px';
          dot.style.background = 'rgba(255,255,255,0.5)';
        }
      });

      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${photos.length} Foto`;
      }
    }

    function startAutoSlide() {
      clearDetailSlideTimer();
      detailSlideTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 3500);
    }

    function resetAutoSlide() {
      startAutoSlide();
    }

    btnPrev?.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentIndex - 1);
      resetAutoSlide();
    });

    btnNext?.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentIndex + 1);
      resetAutoSlide();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = parseInt(dot.getAttribute('data-slide-target'), 10);
        if (!isNaN(target)) {
          goToSlide(target);
          resetAutoSlide();
        }
      });
    });

    // Pause on hover, resume on leave
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
        clearDetailSlideTimer();
      });
      sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
      });
    }

    // Jalankan auto sliding
    startAutoSlide();
  }

  // Pasang listener klik foto untuk membuka layar penuh (Lightbox Modal)
  container.querySelectorAll('.catalog-photo-zoomable').forEach((imgEl) => {
    imgEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const pIdx = parseInt(imgEl.getAttribute('data-photo-index') || '0', 10);
      openSpeciesLightbox(sp, photos, isNaN(pIdx) ? 0 : pIdx);
    });
  });

  // Pasang listener jump scene
  container.querySelectorAll('.btn-jump-scene-detail').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sceneId = btn.getAttribute('data-scene-id');
      if (onJumpToSceneCallback && sceneId) {
        onJumpToSceneCallback(sceneId);
      }
    });
  });
}

/**
 * ─────────────────────────────────────────────────────────────
 * TAMPILAN 3: STATE KETIKA SPESIES TIDAK DITEMUKAN (404)
 * ─────────────────────────────────────────────────────────────
 */
function renderSpeciesNotFoundView(container, invalidId) {
  container.innerHTML = `
    <div class="catalog-wrapper" style="max-width: 800px; margin: 40px auto; padding: 40px 24px; text-align: center; background: rgba(15, 28, 22, 0.85); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 20px; box-shadow: 0 16px 36px -12px rgba(0,0,0,0.6);">
      <span style="font-size: 48px; display: block; margin-bottom: 12px;">🔍</span>
      <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
        Jenis Pohon Tidak Ditemukan
      </h2>
      <p style="font-size: 14px; color: var(--clr-text-muted); line-height: 1.6; max-width: 520px; margin: 0 auto 20px;">
        Spesies pohon dengan pengenal <code style="background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 6px; color: #f87171;">${escapeHtml(invalidId)}</code> tidak ditemukan dalam basis data atau belum disetujui untuk publikasi oleh administrator.
      </p>
      <button
        id="btn-notfound-back"
        type="button"
        class="btn-primary-action"
        style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; padding: 10px 22px; border-radius: 10px; cursor: pointer;"
      >
        <span>←</span> Kembali ke Katalog Jenis Pohon
      </button>
    </div>
  `;

  document.getElementById('btn-notfound-back')?.addEventListener('click', backToCatalogList);
}

/**
 * Utilitas format angka ribuan (e.g. 1.000)
 */
function formatNumber(num) {
  if (num === null || num === undefined) return '-';
  const val = Number(num);
  if (isNaN(val)) return String(num);
  return val.toLocaleString('id-ID');
}

/**
 * Utilitas kapitalisasi huruf pertama
 */
function capitalize(str) {
  if (!str) return '';
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

/**
 * Escape string HTML untuk keamanan
 */
/**
 * ─────────────────────────────────────────────────────────────
 * SISTEM FULLSCREEN LIGHTBOX UNTUK FOTO SPESIES POHON
 * ─────────────────────────────────────────────────────────────
 */
function openSpeciesLightbox(species, photos, initialIndex = 0) {
  if (!Array.isArray(photos) || photos.length === 0) return;
  currentLightboxSpecies = species;
  currentLightboxPhotos = photos;
  currentLightboxIndex = (initialIndex >= 0 && initialIndex < photos.length) ? initialIndex : 0;

  const modal = document.getElementById('catalog-species-lightbox-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  updateSpeciesLightboxContent();
  bindCatalogLightboxEventsOnce();
}

function closeSpeciesLightbox() {
  const modal = document.getElementById('catalog-species-lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
  currentLightboxIndex = -1;
  currentLightboxPhotos = [];
  currentLightboxSpecies = null;
}

function nextSpeciesLightbox() {
  if (currentLightboxPhotos.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxPhotos.length;
  updateSpeciesLightboxContent();
}

function prevSpeciesLightbox() {
  if (currentLightboxPhotos.length <= 1) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length;
  updateSpeciesLightboxContent();
}

function updateSpeciesLightboxContent() {
  if (currentLightboxIndex < 0 || currentLightboxIndex >= currentLightboxPhotos.length) return;
  const photoUrl = currentLightboxPhotos[currentLightboxIndex];

  const img = document.getElementById('catalog-lightbox-img');
  const spinner = document.getElementById('catalog-lightbox-spinner');
  const counter = document.getElementById('catalog-lightbox-counter');
  const rawBtn = document.getElementById('catalog-lightbox-raw-btn');
  const btnPrev = document.getElementById('btn-catalog-lightbox-prev');
  const btnNext = document.getElementById('btn-catalog-lightbox-next');

  // Atur navigasi panah
  const showArrows = currentLightboxPhotos.length > 1;
  if (btnPrev) btnPrev.style.display = showArrows ? 'flex' : 'none';
  if (btnNext) btnNext.style.display = showArrows ? 'flex' : 'none';

  // Perbarui counter
  if (counter) {
    counter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxPhotos.length}`;
  }

  // Tautan gambar resolusi penuh
  if (rawBtn) {
    rawBtn.href = photoUrl || '#';
  }

  // Muat gambar dengan spinner
  if (img) {
    if (spinner) spinner.classList.remove('hidden');
    img.onload = () => {
      if (spinner) spinner.classList.add('hidden');
    };
    img.onerror = () => {
      if (spinner) spinner.classList.add('hidden');
    };
    img.src = photoUrl;
    img.alt = currentLightboxSpecies ? `Foto Dokumentasi ${currentLightboxSpecies.common_name}` : 'Foto Spesies';
  }
}

function bindCatalogLightboxEventsOnce() {
  if (isCatalogLightboxBound) return;
  isCatalogLightboxBound = true;

  // Tombol Tutup
  document.getElementById('btn-close-catalog-lightbox')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeSpeciesLightbox();
  });

  // Tombol Prev & Next
  document.getElementById('btn-catalog-lightbox-prev')?.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSpeciesLightbox();
  });
  document.getElementById('btn-catalog-lightbox-next')?.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSpeciesLightbox();
  });

  // Klik di latar belakang (stage) untuk menutup
  document.getElementById('catalog-lightbox-stage')?.addEventListener('click', (e) => {
    if (e.target.id === 'catalog-lightbox-stage') {
      closeSpeciesLightbox();
    }
  });

  // Keyboard navigation: Escape, Panah Kiri, Panah Kanan
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('catalog-species-lightbox-modal');
    if (!modal || modal.classList.contains('hidden')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeSpeciesLightbox();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSpeciesLightbox();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSpeciesLightbox();
    }
  });
}

/**
 * Escape string HTML untuk keamanan
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
