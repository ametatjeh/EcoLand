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
    <div class="tree-qr-wrapper py-2 sm:py-4">
      <!-- Section Header Hero Banner -->
      <div class="hero-section text-center relative overflow-hidden" style="padding: 36px 24px; margin-bottom: 28px; border-radius: var(--radius-lg);">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3.5 shadow-sm">
          <span>📱</span> Identifikasi Digital Flora & Blok Kawasan
        </div>
        <h1 class="hero-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style="margin: 6px 0 10px;">
          Tree QR Code Kawasan Restorasi
        </h1>
        <p class="hero-subtitle text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed" style="margin: 0 auto 20px;">
          Pindai QR code di lapangan untuk mengakses profil biologis jenis pohon, taksonomi, atau data blok penanaman kawasan secara langsung melalui sistem informasi publik.
        </p>

        <!-- Informational Banner: Kejujuran Data Lapangan -->
        <div class="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-left text-xs text-slate-300 flex items-start gap-3.5 shadow-xl backdrop-blur-sm">
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
      <div class="treeqr-toolbar bg-slate-900/90 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between max-w-5xl mx-auto shadow-xl">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <span>🔍</span> Filter:
          </span>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="btn-qr-filter px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer bg-emerald-600 text-white shadow-md shadow-emerald-950/30 border border-emerald-500/30" data-type="all">
              Semua Objek
            </button>
            <button type="button" class="btn-qr-filter px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-600" data-type="species">
              🌳 Jenis Spesies Pohon
            </button>
            <button type="button" class="btn-qr-filter px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer bg-slate-800/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 hover:border-slate-600" data-type="zone">
              🏞️ Kelompok / Blok Kawasan
            </button>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto">
          <!-- Live Search Input -->
          <div class="relative flex-1 md:w-64">
            <span class="absolute inset-y-0 left-3.5 flex items-center text-slate-400 text-xs pointer-events-none">🔎</span>
            <input
              type="text"
              id="qr-search-input"
              placeholder="Cari nama pohon, blok, famili..."
              class="w-full bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-white text-xs rounded-xl pl-9 pr-3.5 py-2 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder-slate-500 transition shadow-inner"
            />
          </div>

          <div class="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20 whitespace-nowrap shrink-0 shadow-sm">
            <span id="qr-items-count">Memuat...</span>
          </div>
        </div>
      </div>

      <!-- Grid Cards -->
      <div id="tree-qr-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
  const filterBtns = document.querySelectorAll('.btn-qr-filter');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('bg-emerald-600', 'text-white', 'shadow-md', 'shadow-emerald-950/30', 'border-emerald-500/30');
        b.classList.add('bg-slate-800/90', 'text-slate-300', 'border-slate-700/80');
      });
      btn.classList.remove('bg-slate-800/90', 'text-slate-300', 'border-slate-700/80');
      btn.classList.add('bg-emerald-600', 'text-white', 'shadow-md', 'shadow-emerald-950/30', 'border-emerald-500/30');

      currentCategory = btn.getAttribute('data-type') || 'all';
      renderGrid();
    });
  });

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
      items.push({
        type: 'species',
        id: sp.id,
        badge: 'Jenis Spesies',
        badgeColor: 'emerald',
        title: sp.common_name || sp.local_name,
        subtitle: sp.scientific_name ? `${sp.scientific_name} • ${sp.family || 'Famili'}` : 'Spesies Pohon',
        info: `${sp.total_planted || 0} bibit tertanam di kawasan restorasi`,
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
        badge: 'Kelompok / Blok Kawasan',
        badgeColor: 'blue',
        title: zn.name,
        subtitle: `${zn.zone_code || 'Blok'} • ${zn.category || 'Silvikultur'}`,
        info: `Luas lahan tercatat: ${zn.area_in_ha || zn.area_size || 0} Ha`,
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
      <div class="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Header card -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
              item.type === 'species'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }">
              ${item.badge}
            </span>
            <span class="text-[11px] text-slate-500 font-mono">ID: ${escapeHtml(item.id)}</span>
          </div>

          <h3 class="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
            ${escapeHtml(item.title)}
          </h3>
          <p class="text-xs text-slate-400 italic mt-0.5">${escapeHtml(item.subtitle)}</p>

          <!-- QR Thumbnail Preview -->
          <div class="my-4 flex items-center justify-center p-3 bg-white rounded-2xl shadow-inner w-36 h-36 mx-auto transition-transform group-hover:scale-105">
            <canvas id="qr-thumb-${idx}" class="w-full h-full"></canvas>
          </div>

          <p class="text-xs text-slate-400 text-center leading-relaxed">
            ${escapeHtml(item.info)}
          </p>
        </div>

        <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <span class="text-[11px] text-slate-500 truncate max-w-[150px]">📍 ${escapeHtml(item.origin)}</span>
          <button type="button" class="btn-open-qr-modal px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer" data-index="${idx}">
            <span>Perbesar QR →</span>
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
        width: 130,
        margin: 1,
        color: {
          dark: '#0f172a',
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
