/**
 * Modul Halaman Publik Tree QR Code
 *
 * Menampilkan daftar QR Code spesifikasi pohon & kelompok penanaman terverifikasi pada kawasan.
 * Menyediakan modal interaktif untuk melihat, mencetak, dan mengunduh QR Code.
 * Mengarahkan tautan QR ke URL detail publik yang valid.
 */

import QRCode from 'qrcode';
import { ApiService } from './services/api.js';

let cachedSpecies = [];
let cachedZones = [];
let currentCategory = 'all';
let currentSearchTerm = '';

export async function initPublicTreeQr(containerId = 'public-tree-qr-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="tree-qr-wrapper">
      <!-- Section Header Hero Banner -->
      <div class="hero-section text-center relative overflow-hidden" style="padding: 36px 24px; margin-bottom: 28px; border-radius: var(--radius-lg);">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3.5 shadow-sm">
          <span>📱</span> Identifikasi Digital Flora & Blok Kawasan
        </div>
        <h1 class="hero-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style="margin: 6px 0 10px;">
          Tree QR Code Kawasan Restorasi
        </h1>
        <p class="hero-subtitle text-slate-300 text-xs sm:text-sm w-full max-w-full mx-auto leading-relaxed text-center" style="text-align: center; margin: 0 auto 20px; padding-left: 24px; padding-right: 24px; max-width: 100%;">
          Pindai QR code di lapangan untuk mengakses profil biologis jenis pohon, taksonomi, atau data blok penanaman kawasan
        </p>

        <!-- Informational Banner: Kejujuran Data Lapangan (Hidden on mobile) -->
        <div class="hidden md:flex w-full max-w-full mx-auto bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-left text-xs text-slate-300 items-start gap-3.5 shadow-xl backdrop-blur-sm" style="max-width: 100%;">
          <span class="text-xl shrink-0 mt-0.5">ℹ️</span>
          <div>
            <strong class="text-emerald-400 font-semibold block mb-0.5">Catatan Identifikasi Lapangan:</strong>
            <p class="leading-relaxed text-slate-400 text-xs">
              Sistem saat ini menerapkan identifikasi QR Code berbasis <strong>Master Jenis Spesies Pohon</strong> dan <strong>Kelompok / Blok Penanaman</strong> terverifikasi. QR Code individual per batang pohon hanya diterbitkan apabila penomoran tag pohon lapangan telah tercatat dalam basis data resmi.
            </p>
          </div>
        </div>
      </div>

      <!-- Filters & Search Toolbar (Mengikuti gaya & struktur .gallery-filter-bar pada #galeri) -->
      <div class="gallery-filter-bar treeqr-filter-bar">
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
            id="qr-search-input"
            placeholder="Cari nama pohon, blok, ID..."
            class="gallery-search-field"
            autocomplete="off"
            aria-label="Pencarian QR Code"
          />
          <button id="qr-search-clear" class="gallery-search-clear" style="display: none;" title="Hapus pencarian">✕</button>
        </div>

        <!-- 2. Controls Group -->
        <div class="gallery-filters-group">
          <!-- Filter Objek Pill -->
          <div class="gallery-filter-pill" title="Filter berdasarkan jenis objek QR Code">
            <span class="gallery-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <circle cx="7" cy="7" r="1.5"></circle>
              </svg>
            </span>
            <span class="gallery-pill-label">Objek:</span>
            <select id="qr-filter-type" class="gallery-pill-select" aria-label="Filter Objek QR">
              <option value="all">Semua Objek</option>
              <option value="species">🌳 Spesies Pohon</option>
              <option value="zone">🏞️ Blok Kawasan</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Counter Badge & Reset Button (Meta Group) -->
          <div class="gallery-filters-meta">
            <span class="gallery-count-badge" id="qr-items-count-badge" title="Total objek ditampilkan">
              <span id="qr-items-count">0</span> <span id="qr-items-label">Objek</span>
            </span>

            <button id="qr-reset-btn" class="gallery-reset-btn" style="display: none;" title="Reset filter & pencarian">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Grid Cards (Sama seperti grid Katalog Jenis Pohon) -->
      <div id="tree-qr-grid" class="catalog-species-grid-inner w-full">
        <div class="col-span-full py-16 text-center text-slate-400 flex items-center justify-center gap-2">
          <span class="animate-spin text-xl">⏳</span> Memuat data QR Code...
        </div>
      </div>
    </div>

    <!-- QR Detail / Scan Modal -->
    <div id="qr-preview-modal" class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md hidden flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center">
        <button id="btn-close-qrmodal" class="absolute top-4 right-4 z-30 p-2.5 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 transition cursor-pointer" aria-label="Tutup modal">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <span id="modal-qr-badge" class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          QR Code
        </span>
        <h3 id="modal-qr-title" class="text-lg font-bold text-white mb-1">Nama Objek</h3>
        <p id="modal-qr-sub" class="text-xs text-slate-400 italic mb-5">Subjudul Objek</p>

        <!-- Canvas Container -->
        <div class="bg-white p-4 rounded-2xl inline-block shadow-inner mb-4">
          <canvas id="modal-qr-canvas" class="max-w-full"></canvas>
        </div>

        <p class="text-xs text-slate-400 mb-4 max-w-xs mx-auto leading-relaxed">
          Pindai kode QR menggunakan kamera ponsel untuk langsung menuju laman profil publik.
        </p>

        <div class="bg-slate-950/80 border border-slate-800 rounded-xl p-2.5 mb-5 text-[11px] font-mono text-emerald-400 truncate max-w-sm mx-auto" id="modal-qr-url">
          https://...
        </div>

        <div class="flex items-center justify-center gap-3">
          <button type="button" id="btn-download-qr" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-900/30">
            <span>📥 Unduh QR</span>
          </button>
          <button type="button" id="btn-open-target-url" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-slate-700">
            <span>🌐 Buka Laman Profil</span>
          </button>
        </div>
      </div>
    </div>
  `;

  setupFilterEvents();
  setupModalEvents();
  await loadData();
}

function setupFilterEvents() {
  const filterSelect = document.getElementById('qr-filter-type');
  const searchInput = document.getElementById('qr-search-input');
  const searchClear = document.getElementById('qr-search-clear');
  const resetBtn = document.getElementById('qr-reset-btn');

  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      currentCategory = e.target.value || 'all';
      renderGrid();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = (e.target.value || '').trim().toLowerCase();
      if (searchClear) {
        searchClear.style.display = searchInput.value ? 'flex' : 'none';
      }
      renderGrid();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearchTerm = '';
      searchClear.style.display = 'none';
      renderGrid();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (filterSelect) filterSelect.value = 'all';
      if (searchClear) searchClear.style.display = 'none';
      currentCategory = 'all';
      currentSearchTerm = '';
      renderGrid();
    });
  }
}

function setupModalEvents() {
  const modal = document.getElementById('qr-preview-modal');
  const btnClose = document.getElementById('btn-close-qrmodal');

  const closeModal = () => modal?.classList.add('hidden');
  btnClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

async function loadData() {
  try {
    const [speciesRes, zonesRes] = await Promise.all([
      ApiService.getPublicTreeSpecies().catch(() => ({ species: [] })),
      ApiService.getPublicZones().catch(() => ({ zones: [] })),
    ]);

    cachedSpecies = speciesRes.species || [];
    cachedZones = zonesRes.zones || [];

    renderGrid();
  } catch (err) {
    console.error('Gagal memuat data tree QR:', err);
    const grid = document.getElementById('tree-qr-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="col-span-full bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-8 text-center text-sm">
          Gagal memuat katalog QR Code. Silakan muat ulang halaman.
        </div>
      `;
    }
  }
}

function getBasePublicUrl() {
  const loc = window.location;
  // Gunakan origin publik yang sedang dibuka (mendukung produksi HTTPS maupun dev)
  return `${loc.protocol}//${loc.host}`;
}

function renderGrid() {
  const grid = document.getElementById('tree-qr-grid');
  const countEl = document.getElementById('qr-items-count');
  if (!grid) return;

  let items = [];

  if (currentCategory === 'all' || currentCategory === 'species') {
    cachedSpecies.forEach((sp) => {
      const common = sp.common_name || sp.local_name || 'Spesies Pohon';
      const scientific = sp.scientific_name || '';
      items.push({
        type: 'species',
        id: sp.id,
        badge: 'Jenis Spesies',
        badgeColor: 'emerald',
        title: scientific ? `${common} / ${scientific}` : common,
        commonName: common,
        scientificName: scientific,
        subtitle: '', // Famili dihapus sesuai permintaan
        photo: sp.photo_path || null,
        totalPlanted: sp.total_planted || 0,
        origin: sp.origin_status_label || 'Lokal / Asli',
        targetUrl: `${getBasePublicUrl()}/#katalog?species=${encodeURIComponent(sp.id)}`,
      });
    });
  }

  if (currentCategory === 'all' || currentCategory === 'zone') {
    cachedZones.forEach((zn) => {
      items.push({
        type: 'zone',
        id: zn.id,
        badge: 'Blok Kawasan',
        badgeColor: 'blue',
        title: zn.name,
        subtitle: `${zn.zone_code || 'Blok'} • ${zn.category || 'Silvikultur'}`,
        photo: null,
        areaSize: `${zn.area_in_ha || zn.area_size || 0} Ha`,
        category: zn.category || 'Silvikultur',
        origin: zn.city || 'Aceh Besar',
        targetUrl: `${getBasePublicUrl()}/#beranda`,
      });
    });
  }

  // Filter pencarian
  if (currentSearchTerm) {
    items = items.filter((it) => {
      const matchTitle = (it.title || '').toLowerCase().includes(currentSearchTerm);
      const matchSub = (it.subtitle || '').toLowerCase().includes(currentSearchTerm);
      const matchId = (it.id || '').toLowerCase().includes(currentSearchTerm);
      const matchOrigin = (it.origin || '').toLowerCase().includes(currentSearchTerm);
      return matchTitle || matchSub || matchId || matchOrigin;
    });
  }

  const resetBtn = document.getElementById('qr-reset-btn');
  if (countEl) {
    countEl.textContent = `${items.length}`;
  }
  const labelEl = document.getElementById('qr-items-label');
  if (labelEl) {
    labelEl.textContent = 'Objek';
  }
  if (resetBtn) {
    const isFiltered = currentCategory !== 'all' || currentSearchTerm.length > 0;
    resetBtn.style.display = isFiltered ? 'inline-flex' : 'none';
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <div class="text-3xl mb-2">🔍</div>
        <p class="font-bold text-white text-sm mb-1">Tidak Ada Objek Ditemukan</p>
        <p class="text-xs text-slate-400">
          ${currentSearchTerm ? `Tidak ada hasil untuk kata kunci "${escapeHtml(currentSearchTerm)}".` : 'Belum ada objek terdaftar untuk kategori ini.'}
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items
    .map(
      (item, idx) => `
      <div class="point-card catalog-card treeqr-card group" style="display: flex; flex-direction: column; justify-content: space-between; background: rgba(15, 28, 22, 0.88); border: 1px solid rgba(16, 185, 129, 0.18); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;">
        <div>
          <!-- Bagian Showcase QR (16:10 aspect ratio seperti pada Katalog) -->
          <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; background: #070d0a; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(16, 185, 129, 0.12);">
            <!-- Subtle emerald radial background glow -->
            <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.12) 0%, rgba(6, 12, 10, 0.95) 75%); pointer-events: none;"></div>

            <!-- QR Code Plate (White rounded plate with shadow, zooms slightly on card hover) -->
            <div class="relative p-2 sm:p-2.5 bg-white rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-105 inline-flex items-center justify-center z-1">
              <canvas id="qr-thumb-${idx}" style="display: block; width: 108px; height: 108px; max-width: 100%; border-radius: 4px;"></canvas>
            </div>

            <!-- Badge Kategori / Status (Overlay Top-Left seperti Katalog) -->
            <div style="position: absolute; top: 12px; left: 12px; z-index: 2;">
              <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
                ${escapeHtml(item.badge)}
              </span>
            </div>

            <!-- Badge ID (Overlay Top-Right) -->
            <div style="position: absolute; top: 12px; right: 12px; z-index: 2;">
              <span style="font-size: 11px; padding: 3px 9px; border-radius: 6px; font-family: monospace; font-weight: 600; background: rgba(0, 0, 0, 0.75); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.15); backdrop-filter: blur(8px); display: inline-block;">
                ID: ${escapeHtml(item.id)}
              </span>
            </div>
          </div>

          <!-- Konten Informasi Pohon / Objek -->
          <div style="padding: 18px 20px 14px;">
            <!-- Nama Umum & Nama Ilmiah -->
            <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 4px; line-height: 1.3;">
              ${escapeHtml(item.commonName || item.title)}
            </h2>

            <div style="font-size: 13px; font-style: italic; color: var(--clr-primary-light); font-weight: 500; margin-bottom: 10px;">
              ${escapeHtml(item.scientificName || item.subtitle || 'Identifikasi QR Lapangan')}
            </div>

            <!-- Metadata Lokal / Wilayah -->
            <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px; font-size: 12.5px;">
              <div style="color: var(--clr-text-muted);">
                <span style="color: var(--clr-text-dim);">${item.type === 'species' ? 'Status Asal:' : 'Kategori:'}</span>
                <strong style="color: #e2e8f0; font-weight: 500;">${escapeHtml(item.origin || item.category || 'Lokal')}</strong>
              </div>
              ${item.type === 'zone' && item.areaSize ? `
                <div style="color: var(--clr-text-muted);">
                  <span style="color: var(--clr-text-dim);">Luas Lahan:</span>
                  <span style="color: #cbd5e1;">${escapeHtml(item.areaSize)}</span>
                </div>
              ` : ''}
            </div>

            <!-- Kuantitas Penanaman / Target Scan (Sama persis box-nya seperti di Katalog) -->
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.06); margin-bottom: 14px;">
              <div style="font-size: 11px; color: var(--clr-text-dim); text-transform: uppercase; font-weight: 600;">
                ${item.type === 'species' ? 'Bibit Ditanam' : 'Target Scan'}
              </div>
              <div style="font-size: 13px; font-weight: 700; color: var(--clr-primary-light);">
                ${item.type === 'species' ? (item.totalPlanted > 0 ? `${item.totalPlanted} bibit ditanam` : 'Data belum tersedia') : 'Profil Kawasan'}
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Tombol Aksi -->
        <div style="padding: 12px 20px 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; gap: 10px; align-items: center;">
          <a
            href="${item.targetUrl}"
            style="flex: 1; display: inline-flex; justify-content: center; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; padding: 9px 12px; border-radius: 10px; background: rgba(255, 255, 255, 0.05); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.12); text-decoration: none; transition: all 0.2s ease;"
            class="hover:bg-white/10 hover:text-white"
          >
            <span>Buka Info</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>

          <button
            type="button"
            class="btn-open-qr-modal btn-view-species-profile"
            data-index="${idx}"
            style="flex: 1.2; display: inline-flex; justify-content: center; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; padding: 9px 12px; border-radius: 10px; background: rgba(16, 185, 129, 0.12); color: #ecfdf5; border: 1px solid rgba(16, 185, 129, 0.3); cursor: pointer; transition: all 0.2s ease;"
          >
            <span>Perbesar QR</span> <span>↗</span>
          </button>
        </div>
      </div>
    `
    )
    .join('');

  // Render canvas thumbnails
  items.forEach((item, idx) => {
    const canvas = document.getElementById(`qr-thumb-${idx}`);
    if (canvas) {
      QRCode.toCanvas(canvas, item.targetUrl, {
        width: 140,
        margin: 1,
        color: {
          dark: '#0a1610',
          light: '#ffffff',
        },
      }).catch((e) => console.warn('QR render error:', e));
    }
  });

  // Attach modal triggers
  grid.querySelectorAll('.btn-open-qr-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (!isNaN(idx) && items[idx]) {
        openQrModal(items[idx]);
      }
    });
  });
}

function openQrModal(item) {
  const modal = document.getElementById('qr-preview-modal');
  const badge = document.getElementById('modal-qr-badge');
  const title = document.getElementById('modal-qr-title');
  const sub = document.getElementById('modal-qr-sub');
  const urlBox = document.getElementById('modal-qr-url');
  const canvas = document.getElementById('modal-qr-canvas');
  const btnDownload = document.getElementById('btn-download-qr');
  const btnOpenUrl = document.getElementById('btn-open-target-url');

  if (!modal || !canvas) return;

  if (badge) badge.textContent = item.badge;
  if (title) title.textContent = item.title;
  if (sub) sub.textContent = item.subtitle;
  if (urlBox) urlBox.textContent = item.targetUrl;

  QRCode.toCanvas(canvas, item.targetUrl, {
    width: 220,
    margin: 2,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });

  if (btnDownload) {
    btnDownload.onclick = () => {
      const link = document.createElement('a');
      link.download = `QR-${item.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  }

  if (btnOpenUrl) {
    btnOpenUrl.onclick = () => {
      window.open(item.targetUrl, '_blank');
    };
  }

  modal.classList.remove('hidden');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
