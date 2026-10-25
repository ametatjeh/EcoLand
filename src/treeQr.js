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
          Pindai QR code di lapangan untuk mengakses profil biologis jenis pohon, taksonomi, atau data blok penanaman kawasan secara langsung melalui sistem informasi publik.
        </p>

        <!-- Informational Banner: Kejujuran Data Lapangan -->
        <div class="w-full max-w-full mx-auto bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-left text-xs text-slate-300 flex items-start gap-3.5 shadow-xl backdrop-blur-sm" style="max-width: 100%;">
          <span class="text-xl shrink-0 mt-0.5">ℹ️</span>
          <div>
            <strong class="text-emerald-400 font-semibold block mb-0.5">Catatan Identifikasi Lapangan:</strong>
            <p class="leading-relaxed text-slate-400 text-xs">
              Sistem saat ini menerapkan identifikasi QR Code berbasis <strong>Master Jenis Spesies Pohon</strong> dan <strong>Kelompok / Blok Penanaman</strong> terverifikasi. QR Code individual per batang pohon hanya diterbitkan apabila penomoran tag pohon lapangan telah tercatat dalam basis data resmi.
            </p>
          </div>
        </div>
      </div>

      <!-- Filter Controls & Search Toolbar -->
      <div class="treeqr-toolbar w-full backdrop-blur-xl border border-white/10 rounded-xl flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between" style="padding: 12px 16px; margin-bottom: 28px; background: rgba(0, 0, 0, 0.28); border: 1px solid var(--clr-border);">
        <div class="flex items-center gap-2.5">
          <label for="qr-filter-type" style="font-size: 12px; color: var(--clr-text-muted); font-weight: 600; white-space: nowrap;">
            <span>🏷️</span> Filter Objek:
          </label>
          <select id="qr-filter-type" class="form-select form-select-sm" style="width: auto; min-width: 200px; padding: 7px 28px 7px 10px; font-size: 12px; background-color: #142018; border: 1px solid var(--clr-border); border-radius: 6px; color: #ffffff;">
            <option value="all">Semua Objek</option>
            <option value="species">🌳 Jenis Spesies Pohon</option>
            <option value="zone">🏞️ Kelompok / Blok Kawasan</option>
          </select>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto flex-1 md:justify-end">
          <!-- Live Search Input -->
          <div style="flex: 1; max-width: 340px; min-width: 200px;">
            <input
              type="text"
              id="qr-search-input"
              class="form-input form-input-sm"
              placeholder="🔍 Cari nama pohon, blok, famili..."
              style="width: 100%; padding: 7px 12px; font-size: 12px; background-color: #142018; border: 1px solid var(--clr-border); border-radius: 6px; color: #ffffff;"
            />
          </div>

          <div style="padding: 6px 12px; font-size: 11px; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 6px; color: #34d399; font-family: monospace; font-weight: bold; white-space: nowrap; flex-shrink: 0;">
            <span id="qr-items-count">Memuat...</span>
          </div>
        </div>
      </div>

      <!-- Grid Cards (Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols) -->
      <div id="tree-qr-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
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
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      currentCategory = e.target.value || 'all';
      renderGrid();
    });
  }

  const searchInput = document.getElementById('qr-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = (e.target.value || '').trim().toLowerCase();
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

  if (countEl) {
    countEl.textContent = `Menampilkan ${items.length} objek`;
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
      <div class="treeqr-card bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-3 sm:p-4 lg:p-4.5 shadow-xl hover:shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden" style="border-radius: 0px !important;">
        <!-- Top accent highlight line on hover -->
        <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div>
          <!-- Header: Category Badge + ID + Titles (No Tree Image) -->
          <div class="mb-2.5 sm:mb-3">
            <div class="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
              <span class="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 ${
                item.type === 'species'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
              }" style="border-radius: 0px !important;">
                <span class="w-1.5 h-1.5 ${item.type === 'species' ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}"></span>
                ${item.badge}
              </span>
              <span class="text-[10px] sm:text-[11px] font-mono text-slate-400 bg-slate-950/70 border border-slate-800/80 px-1.5 sm:px-2 py-0.5 truncate max-w-[85px] sm:max-w-[120px]" style="border-radius: 0px !important;">ID: ${escapeHtml(item.id)}</span>
            </div>

            <h3 class="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate leading-snug" title="${escapeHtml(item.title)}">
              ${item.type === 'species' && item.scientificName
                ? `<span>${escapeHtml(item.commonName)}</span> <span class="text-slate-500 font-normal text-[11px] sm:text-xs">/</span> <span class="text-[11px] sm:text-xs font-normal italic text-slate-400">${escapeHtml(item.scientificName)}</span>`
                : escapeHtml(item.title)
              }
            </h3>
            ${item.subtitle ? `
              <p class="text-[11px] sm:text-xs text-slate-400 italic truncate mt-0.5">
                ${escapeHtml(item.subtitle)}
              </p>
            ` : ''}
          </div>

          <!-- QR Code Centered Showcase (Strict 0 radius) -->
          <div class="my-2.5 sm:my-3 p-2.5 sm:p-3.5 bg-slate-950/70 border border-white/5 group-hover:border-emerald-500/30 flex flex-col items-center justify-center text-center transition-all relative overflow-hidden" style="border-radius: 0px !important;">
            <div class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

            <div class="relative p-1.5 sm:p-2 bg-white shadow-lg transition-transform duration-300 group-hover:scale-105 inline-flex items-center justify-center" style="border-radius: 0px !important;">
              <canvas id="qr-thumb-${idx}" class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 block"></canvas>
            </div>

            ${
              item.type === 'species'
                ? `
              <div class="mt-2 sm:mt-2.5 text-[11px] sm:text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 tracking-wide">
                ${item.totalPlanted > 0 ? `🌱 ${item.totalPlanted} Bibit` : '🌱 Belum Ada'}
              </div>
            `
                : ''
            }
          </div>

          <!-- Metrics Grid: Hanya untuk non-spesies (zone/blok) -->
          ${
            item.type === 'species'
              ? ''
              : `
            <div class="grid grid-cols-2 gap-2 my-2.5 text-xs">
              <div class="bg-slate-950/60 border border-slate-800/80 px-2.5 py-1.5 flex flex-col" style="border-radius: 0px !important;">
                <span class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Luas</span>
                <span class="text-xs font-bold text-blue-400 mt-0.5">
                  📐 ${escapeHtml(item.areaSize || '0 Ha')}
                </span>
              </div>
              <div class="bg-slate-950/60 border border-slate-800/80 px-2.5 py-1.5 flex flex-col" style="border-radius: 0px !important;">
                <span class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Wilayah</span>
                <span class="text-xs font-semibold text-slate-300 truncate mt-0.5">
                  📍 ${escapeHtml(item.origin)}
                </span>
              </div>
            </div>
          `
          }
        </div>

        <!-- Footer Action Bar (Strict 0 radius) -->
        <div class="mt-2.5 pt-2.5 sm:mt-3 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between gap-1 sm:gap-2">
          <a href="${item.targetUrl}" class="text-[11px] sm:text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1">
            <span>Buka Info</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
          <button type="button" class="btn-open-qr-modal px-2.5 sm:px-3 py-1 sm:py-1.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-semibold shadow-md shadow-emerald-950/50 hover:shadow-emerald-900/50 transition-all flex items-center gap-1 cursor-pointer" style="border-radius: 0px !important;" data-index="${idx}">
            <span>Perbesar<span class="hidden sm:inline"> QR</span></span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
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
