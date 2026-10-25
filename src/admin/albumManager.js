/**
 * Admin Album Manager Module for EcoZone 360 / Eco Land
 * Manages photo albums: Create, Read, Update, Delete, Direct Multi-Upload with Previews, Assign Photos, Set Cover, Reorder.
 * High aesthetic conservation theme, multi-section form, interactive photo selector, dual view mode (Cards & Table).
 */
import { ApiService } from '../services/api.js';
import { formatDateDisplay } from '../utils/date.js';
import { EcoToast } from '../utils/toast.js';
import { EcoModal } from '../utils/modal.js';

let cachedAlbums = [];
let cachedZones = [];
let currentAlbumView = 'list'; // 'list' | 'create' | 'edit' | 'manage-photos'
let activeAlbumId = null;
let currentSearch = '';
let currentCategory = 'all';
let currentZone = 'all';
let currentStatus = 'all'; // 'all' | 'published' | 'draft'
let viewDisplayMode = 'cards'; // 'cards' | 'table'
let isDirectUploadBoxOpen = false;
let pendingUploadFiles = []; // Array of { id, file, name, size, sizeFormatted, previewUrl, isValid, errorMsg, isCover }

const ALBUM_CATEGORIES = [
  'Kondisi Kawasan',
  'Kegiatan Penanaman',
  'Pertumbuhan Tanaman',
  'Pemantauan',
  'Perawatan',
  'Fasilitas',
  'Dokumentasi Silvikultur',
  'Dokumentasi Lainnya',
];

export async function initAlbumsModule(containerId = 'admin-albums-content', initialView = null, initialId = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (initialView) {
    currentAlbumView = initialView;
    activeAlbumId = initialId || null;
  } else {
    // Parse current location hash for album routes
    const hash = window.location.hash || '';
    const editMatch = hash.match(/^#admin\/albums\/([^/]+)\/edit$/);
    const photoMatch = hash.match(/^#admin\/albums\/([^/]+)\/photos$/);
    const createMatch = hash.match(/^#admin\/albums\/create$/);

    if (editMatch) {
      currentAlbumView = 'edit';
      activeAlbumId = editMatch[1];
    } else if (photoMatch) {
      currentAlbumView = 'manage-photos';
      activeAlbumId = photoMatch[1];
    } else if (createMatch) {
      currentAlbumView = 'create';
      activeAlbumId = null;
    } else {
      currentAlbumView = 'list';
      activeAlbumId = null;
    }
  }

  // Restore preferred display mode
  try {
    const saved = localStorage.getItem('admin_albums_view_mode');
    if (saved === 'cards' || saved === 'table') viewDisplayMode = saved;
  } catch (e) {}

  await loadInitialData();
  renderAlbumLayout(container);
}

async function loadInitialData() {
  try {
    const [albumRes, zonesRes] = await Promise.all([
      ApiService.getAdminAlbums({
        search: currentSearch,
        category: currentCategory,
        planting_zone_id: currentZone,
      }).catch(() => ({ albums: [] })),
      ApiService.getZones({ sort_by: 'name', sort_dir: 'asc' }).catch(() => ({ zones: [] })),
    ]);

    let albums = albumRes.albums || [];
    if (currentStatus === 'published') {
      albums = albums.filter((a) => a.is_published);
    } else if (currentStatus === 'draft') {
      albums = albums.filter((a) => !a.is_published);
    }

    cachedAlbums = albums;
    cachedZones = zonesRes.zones || [];
  } catch (err) {
    console.error('Gagal memuat data album:', err);
    cachedAlbums = [];
  }
}

function renderAlbumLayout(container) {
  const totalAlbums = cachedAlbums.length;

  container.innerHTML = `
    <div id="admin-albums-root" class="admin-albums-sharp space-y-6">
      <!-- 1. Hero Banner Card -->
      <div class="zones-hero-card">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 w-full">
          <div class="flex items-center gap-4">
            <div class="zones-hero-icon" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.35); box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);">
              📸
            </div>
            <div>
              <h2 class="zones-hero-title">Manajemen Album Kegiatan Galeri</h2>
              <p class="zones-hero-desc">
                Pusat dokumentasi visual kegiatan silvikultur, sensus pohon, penanaman bersama mitra, dan pemantauan kawasan restorasi &plusmn;2 hektare.
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <button id="btn-album-create-new" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
              <span>+ Buat Album Baru</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. Dynamic Content Pane -->
      <div id="album-dynamic-container">
        <!-- Rendered based on currentAlbumView -->
      </div>
    </div>

    <!-- Modal Container for Photo Selection from Existing Photos -->
    <div id="album-photo-modal" class="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md hidden flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-900/90">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 text-lg">
              🖼️
            </div>
            <div>
              <h3 class="text-sm font-bold text-white" id="modal-album-title">Pilih Foto untuk Album</h3>
              <p class="text-xs text-slate-400">Pilih dari koleksi dokumentasi foto kawasan yang sudah terunggah</p>
            </div>
          </div>
          <button id="btn-close-photo-modal" class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">✕</button>
        </div>
        <div id="modal-photo-list" class="p-6 overflow-y-auto flex-1 min-h-[320px]">
          <!-- Grid of available photos loaded via API -->
        </div>
        <div class="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900/80 shrink-0">
          <span class="text-xs text-slate-300 font-medium" id="modal-selected-count">0 foto terpilih</span>
          <div class="flex items-center gap-3">
            <button id="btn-cancel-add-photos" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">Batal</button>
            <button id="btn-submit-add-photos" class="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition disabled:opacity-50 cursor-pointer" disabled>
              Tambahkan ke Album
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 2: Edit Keterangan Foto -->
    <div id="album-photo-edit-modal" class="fixed inset-0 z-[99999] bg-slate-950/85 backdrop-blur-md hidden flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              ✏️
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Sunting Keterangan Foto Kegiatan</h3>
              <p class="text-xs text-slate-400">Perbarui judul/label, narasi kegiatan, dan teks aksesibilitas</p>
            </div>
          </div>
          <button id="btn-close-edit-photo-modal" class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">✕</button>
        </div>
        <form id="form-edit-photo-meta" class="p-6 space-y-4">
          <input type="hidden" id="edit-photo-id" />
          <div class="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
            <img id="edit-photo-thumb" src="" class="w-16 h-12 rounded-lg object-cover bg-slate-900 shrink-0 border border-white/10" />
            <div class="min-w-0 text-xs">
              <span class="text-slate-400 block text-[10px]">Tinjauan Foto:</span>
              <p id="edit-photo-info" class="font-mono text-blue-400 truncate text-[11px]"></p>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1">Judul / Label Foto</label>
            <input type="text" id="edit-photo-title" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500" placeholder="Label foto..." />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1">Keterangan / Caption Kegiatan</label>
            <textarea id="edit-photo-caption" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed" placeholder="Catatan dokumentasi foto..."></textarea>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1">Alt Text (Aksesibilitas &amp; SEO)</label>
            <input type="text" id="edit-photo-alt" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500" placeholder="Deskripsi gambar..." />
          </div>
          <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button type="button" id="btn-cancel-edit-photo" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">Batal</button>
            <button type="submit" id="btn-save-edit-photo" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition cursor-pointer">
              Simpan Keterangan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach Hero Button
  document.getElementById('btn-album-create-new')?.addEventListener('click', () => {
    switchAlbumSubView('create');
  });

  // Attach Modal Close
  document.getElementById('btn-close-photo-modal')?.addEventListener('click', closePhotoModal);
  document.getElementById('btn-cancel-add-photos')?.addEventListener('click', closePhotoModal);
  document.getElementById('btn-close-edit-photo-modal')?.addEventListener('click', closeEditPhotoModal);
  document.getElementById('btn-cancel-edit-photo')?.addEventListener('click', closeEditPhotoModal);

  renderActiveAlbumView();
}

function renderActiveAlbumView() {
  const dynamicContainer = document.getElementById('album-dynamic-container');
  if (!dynamicContainer) return;


  if (currentAlbumView === 'create' || currentAlbumView === 'edit') {
    renderAlbumForm(dynamicContainer);
  } else if (currentAlbumView === 'manage-photos') {
    renderManagePhotosView(dynamicContainer);
  } else {
    renderAlbumListView(dynamicContainer);
  }
}

export function switchAlbumSubView(viewName, albumId = null, updateHash = true) {
  currentAlbumView = viewName;
  activeAlbumId = albumId;

  if (updateHash) {
    let targetHash = '#admin/albums';
    if (viewName === 'create') {
      targetHash = '#admin/albums/create';
    } else if (viewName === 'edit' && albumId) {
      targetHash = `#admin/albums/${albumId}/edit`;
    } else if (viewName === 'manage-photos' && albumId) {
      targetHash = `#admin/albums/${albumId}/photos`;
    }

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
  }

  // Update topbar breadcrumbs and title
  const titleEl = document.getElementById('admin-header-title');
  const breadcrumbActiveEl = document.getElementById('admin-breadcrumb-active');
  if (titleEl && breadcrumbActiveEl) {
    if (viewName === 'create') {
      titleEl.textContent = 'Formulir Tambah Album Kegiatan Baru';
      breadcrumbActiveEl.textContent = 'Tambah Album';
    } else if (viewName === 'edit') {
      titleEl.textContent = 'Sunting Informasi & Koleksi Album';
      breadcrumbActiveEl.textContent = 'Edit Album';
    } else if (viewName === 'manage-photos') {
      titleEl.textContent = 'Pengelolaan Foto & Urutan Album';
      breadcrumbActiveEl.textContent = 'Kelola Foto';
    } else {
      titleEl.textContent = 'Manajemen Album Kegiatan Galeri Kawasan';
      breadcrumbActiveEl.textContent = 'Album Kegiatan';
    }
  }

  renderActiveAlbumView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── 1. LIST VIEW ─────────────────────────────────────────────
function renderAlbumListView(container) {
  const hasActiveFilter = Boolean(currentSearch || currentCategory !== 'all' || currentZone !== 'all' || currentStatus !== 'all');

  container.innerHTML = `
    <!-- Toolbar Search, Filter & View Mode Card -->
    <div class="zones-toolbar-card">
      <div class="zones-toolbar-left flex-wrap">
        <!-- Search Box -->
        <div class="zone-search-wrapper flex-1 min-w-[200px] max-w-sm">
          <svg class="zone-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="album-search-input" value="${escapeHtml(currentSearch)}" class="zone-search-input" placeholder="Cari nama kegiatan, mitra, deskripsi..." />
          ${currentSearch ? `<button id="btn-album-search-clear" class="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer p-1">✕</button>` : ''}
        </div>

        <!-- Filter Kategori Silvikultur -->
        <select id="album-filter-category" class="zone-filter-select" title="Filter berdasarkan kategori kegiatan">
          <option value="all">Semua Kategori</option>
          ${ALBUM_CATEGORIES.map((c) => `<option value="${c}" ${currentCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>

        <!-- Filter Kawasan -->
        <select id="album-filter-zone" class="zone-filter-select" title="Filter berdasarkan kawasan penanaman">
          <option value="all">Semua Kawasan</option>
          ${cachedZones.map((z) => `<option value="${z.id}" ${currentZone === z.id ? 'selected' : ''}>${z.name}</option>`).join('')}
        </select>

        <!-- Filter Status Publikasi -->
        <select id="album-filter-status" class="zone-filter-select" title="Filter status publikasi">
          <option value="all" ${currentStatus === 'all' ? 'selected' : ''}>Semua Status</option>
          <option value="published" ${currentStatus === 'published' ? 'selected' : ''}>Publikasi Saja</option>
          <option value="draft" ${currentStatus === 'draft' ? 'selected' : ''}>Draft Saja</option>
        </select>

        ${hasActiveFilter ? `
          <button id="btn-album-reset-filters" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition cursor-pointer" title="Hapus semua filter">
            ✕ Reset Filter
          </button>
        ` : ''}
      </div>

      <!-- View Switcher Toggle -->
      <div class="zones-toolbar-right">
        <div class="zones-view-toggle">
          <button id="btn-album-view-cards" class="zone-view-btn ${viewDisplayMode === 'cards' ? 'active' : ''}" title="Tampilan Kartu Grid">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span class="hidden md:inline">Kartu</span>
          </button>
          <button id="btn-album-view-table" class="zone-view-btn ${viewDisplayMode === 'table' ? 'active' : ''}" title="Tampilan Tabel Ringkas">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            <span class="hidden md:inline">Tabel</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Content View (Cards or Table) -->
    <div id="album-content-display">
      ${viewDisplayMode === 'cards' ? renderAlbumCardsHtml() : renderAlbumTableHtml()}
    </div>
  `;

  // Attach search & filters
  const searchInput = document.getElementById('album-search-input');
  searchInput?.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      currentSearch = searchInput.value.trim();
      await reloadAlbums();
    }
  });

  document.getElementById('btn-album-search-clear')?.addEventListener('click', async () => {
    currentSearch = '';
    await reloadAlbums();
  });

  document.getElementById('album-filter-category')?.addEventListener('change', async (e) => {
    currentCategory = e.target.value;
    await reloadAlbums();
  });

  document.getElementById('album-filter-zone')?.addEventListener('change', async (e) => {
    currentZone = e.target.value;
    await reloadAlbums();
  });

  document.getElementById('album-filter-status')?.addEventListener('change', async (e) => {
    currentStatus = e.target.value;
    await reloadAlbums();
  });

  document.getElementById('btn-album-reset-filters')?.addEventListener('click', async () => {
    currentSearch = '';
    currentCategory = 'all';
    currentZone = 'all';
    currentStatus = 'all';
    await reloadAlbums();
    EcoToast.info('Filter Direset', 'Semua kriteria pencarian dan filter telah dikembalikan.');
  });

  // Attach View Switchers
  document.getElementById('btn-album-view-cards')?.addEventListener('click', () => {
    viewDisplayMode = 'cards';
    try { localStorage.setItem('admin_albums_view_mode', 'cards'); } catch (e) {}
    renderAlbumListView(container);
  });

  document.getElementById('btn-album-view-table')?.addEventListener('click', () => {
    viewDisplayMode = 'table';
    try { localStorage.setItem('admin_albums_view_mode', 'table'); } catch (e) {}
    renderAlbumListView(container);
  });

  attachAlbumActionListeners();
}

function renderAlbumCardsHtml() {
  if (cachedAlbums.length === 0) {
    return `
      <div class="zones-empty-card text-center py-16 px-4 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <span class="text-5xl block mb-3">📁</span>
        <h3 class="text-base font-bold text-white">Belum Ada Album Kegiatan Ditemukan</h3>
        <p class="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
          Tidak ada album yang sesuai dengan filter pencarian Anda, atau belum ada album yang dibuat.
        </p>
        <button id="btn-empty-create-album" class="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          <span>+ Buat Album Sekarang</span>
        </button>
      </div>
    `;
  }

  return `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      ${cachedAlbums.map((album) => {
        const coverUrl = album.cover_photo?.thumbnail_url || album.cover_photo?.file_url || album.cover_url || '';
        const photoCount = parseInt(album.photos_count || album.photo_count, 10) || 0;

        return `
          <div class="album-modern-card group flex flex-col justify-between" data-album-id="${album.id}">
            <div>
              <!-- Cover Image Box (16:10 Ratio) -->
              <div class="album-card-cover-wrap relative">
                ${coverUrl ? `
                  <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(album.title)}" class="w-full h-full object-cover" onerror="this.onerror=null; this.src=''; this.classList.add('hidden');">
                ` : `
                  <div class="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-600 gap-2">
                    <svg class="w-8 h-8 opacity-40 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span class="text-[11px] font-medium text-slate-500">Belum ada foto sampul</span>
                  </div>
                `}
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40 pointer-events-none"></div>

                <!-- Top Badges -->
                <div class="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-950/80 text-blue-300 border border-blue-500/30 backdrop-blur-md shadow-sm">
                    <svg class="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                    <span class="truncate max-w-[130px]">${escapeHtml(album.category || 'Silvikultur')}</span>
                  </span>

                  ${album.is_published ? `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md shadow-sm">
                      <span class="album-pulse-dot"></span>
                      <span>Publik</span>
                    </span>
                  ` : `
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-slate-400 border border-slate-700 backdrop-blur-md">
                      <span>Draft</span>
                    </span>
                  `}
                </div>

                <!-- Bottom Meta in Cover -->
                <div class="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-slate-200 pointer-events-none">
                  <span class="inline-flex items-center gap-1.5 text-[11px] font-medium bg-slate-950/75 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10 text-slate-300">
                    <svg class="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"></rect><line x1="16" y1="2" x2="16" y2="6" stroke-width="2"></line><line x1="8" y1="2" x2="8" y2="6" stroke-width="2"></line><line x1="3" y1="10" x2="21" y2="10" stroke-width="2"></line></svg>
                    <span>${album.activity_date ? formatDateDisplay(album.activity_date) : 'Belum diatur'}</span>
                  </span>
                  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-blue-950/80 text-blue-300 font-mono font-bold text-[11px] border border-blue-500/40 backdrop-blur-md">
                    <svg class="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><circle cx="12" cy="13" r="4" stroke-width="2"></circle></svg>
                    <span>${photoCount} Foto</span>
                  </span>
                </div>
              </div>

              <!-- Card Content Area -->
              <div class="p-4 space-y-2.5">
                <div>
                  <h3 class="text-sm font-bold text-white group-hover:text-blue-400 transition leading-snug line-clamp-2" title="${escapeHtml(album.title)}">
                    ${escapeHtml(album.title)}
                  </h3>
                  <div class="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span class="inline-flex items-center gap-1 text-slate-300 truncate max-w-[170px]" title="Kawasan">
                      <svg class="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><circle cx="12" cy="10" r="3" stroke-width="2"></circle></svg>
                      <span class="truncate">${escapeHtml(album.zone?.name || 'Kawasan Umum')}</span>
                    </span>
                    <span class="text-slate-600">&bull;</span>
                    <span class="text-[10px] text-slate-500 font-mono shrink-0">Urutan #${album.sort_order || 0}</span>
                  </div>
                </div>

                <!-- Organizer & Location Tags (If present) -->
                ${(album.organizer || album.location_name) ? `
                  <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
                    ${album.organizer ? `
                      <span class="album-chip bg-slate-900/90 text-slate-300 border border-slate-800" title="Penyelenggara / Mitra">
                        <svg class="w-3 h-3 text-sky-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <span class="truncate max-w-[150px]">${escapeHtml(album.organizer)}</span>
                      </span>
                    ` : ''}
                    ${album.location_name ? `
                      <span class="album-chip bg-slate-900/90 text-slate-300 border border-slate-800" title="Plot / Titik Lapangan">
                        <svg class="w-3 h-3 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                        <span class="truncate max-w-[130px]">${escapeHtml(album.location_name)}</span>
                      </span>
                    ` : ''}
                  </div>
                ` : ''}

                <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed min-h-[34px]">
                  ${escapeHtml(album.description || 'Tidak ada catatan ringkas mengenai kegiatan ini.')}
                </p>
              </div>
            </div>

            <!-- Card Actions Footer -->
            <div class="px-4 pb-4 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-1.5">
              <button class="btn-manage-photos flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold border border-blue-500/30 transition-all duration-200 cursor-pointer shadow-sm" data-id="${album.id}">
                <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Kelola Foto (${photoCount})</span>
              </button>
              <button class="btn-edit-album p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition cursor-pointer" title="Edit Album" data-id="${album.id}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </button>
              <button class="btn-delete-album p-2 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition cursor-pointer" title="Hapus Album" data-id="${album.id}" data-title="${escapeHtml(album.title)}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderAlbumTableHtml() {
  if (cachedAlbums.length === 0) {
    return `<div class="p-8 text-center text-slate-400">Belum ada album ditemukan.</div>`;
  }

  return `
    <div class="zones-table-box overflow-x-auto">
      <table class="zones-table w-full text-left border-collapse text-xs">
        <thead>
          <tr class="border-b border-slate-800 bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px]">
            <th class="p-3.5">Sampul</th>
            <th class="p-3.5">Nama Kegiatan / Album</th>
            <th class="p-3.5">Kategori</th>
            <th class="p-3.5">Kawasan &amp; Lokasi</th>
            <th class="p-3.5">Tanggal</th>
            <th class="p-3.5 text-center">Foto</th>
            <th class="p-3.5 text-center">Status</th>
            <th class="p-3.5 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800/60">
          ${cachedAlbums.map((album) => {
            const coverUrl = album.cover_photo?.thumbnail_url || album.cover_photo?.file_url || album.cover_url || '';
            const photoCount = parseInt(album.photos_count || album.photo_count, 10) || 0;
            return `
              <tr class="hover:bg-slate-800/40 transition">
                <td class="p-3.5">
                  <div class="w-12 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/80">
                    ${coverUrl ? `<img src="${escapeHtml(coverUrl)}" class="w-full h-full object-cover">` : `<div class="w-full h-full flex items-center justify-center text-slate-500 text-[10px]">Polos</div>`}
                  </div>
                </td>
                <td class="p-3.5">
                  <div class="font-bold text-white leading-snug">${escapeHtml(album.title)}</div>
                  ${album.organizer ? `
                    <div class="inline-flex items-center gap-1 text-[11px] font-medium text-sky-400 mt-0.5">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      <span>${escapeHtml(album.organizer)}</span>
                    </div>
                  ` : ''}
                  <div class="text-[11px] font-normal text-slate-400 line-clamp-1 mt-0.5">${escapeHtml(album.description || '')}</div>
                </td>
                <td class="p-3.5">
                  <span class="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                    ${escapeHtml(album.category || '-')}
                  </span>
                </td>
                <td class="p-3.5 text-slate-300">
                  <div class="font-medium text-slate-200">${escapeHtml(album.zone?.name || 'Kawasan Umum')}</div>
                  ${album.location_name ? `
                    <div class="inline-flex items-center gap-1 text-[10px] text-amber-400/90 mt-0.5">
                      <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                      <span>${escapeHtml(album.location_name)}</span>
                    </div>
                  ` : ''}
                </td>
                <td class="p-3.5 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                  ${album.activity_date ? formatDateDisplay(album.activity_date) : '-'}
                </td>
                <td class="p-3.5 text-center font-bold font-mono text-blue-400">
                  ${photoCount}
                </td>
                <td class="p-3.5 text-center">
                  ${album.is_published
                    ? `<span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"><span class="album-pulse-dot"></span><span>Publik</span></span>`
                    : `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">Draft</span>`}
                </td>
                <td class="p-3.5 text-right whitespace-nowrap">
                  <div class="inline-flex items-center gap-1.5">
                    <button class="btn-manage-photos px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] border border-blue-500/30 transition cursor-pointer" data-id="${album.id}">
                      Kelola Foto (${photoCount})
                    </button>
                    <button class="btn-edit-album p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition cursor-pointer" data-id="${album.id}" title="Edit Album">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button class="btn-delete-album p-1.5 bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition cursor-pointer" data-id="${album.id}" data-title="${escapeHtml(album.title)}" title="Hapus">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function attachAlbumActionListeners() {
  document.getElementById('btn-empty-create-album')?.addEventListener('click', () => {
    switchAlbumSubView('create');
  });

  document.querySelectorAll('.btn-copy-admin-album-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-slug');
      const shareUrl = `${window.location.origin}/#galeri?album=${encodeURIComponent(slug)}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        EcoToast.success('Tautan Tersalin', 'Tautan publik album telah disalin ke papan klip.');
      }).catch(() => {
        prompt('Salin URL publik berikut:', shareUrl);
      });
    });
  });

  document.querySelectorAll('.btn-manage-photos').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      switchAlbumSubView('manage-photos', id);
    });
  });

  document.querySelectorAll('.btn-edit-album').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      switchAlbumSubView('edit', id);
    });
  });

  document.querySelectorAll('.btn-delete-album').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const title = btn.getAttribute('data-title');
      const confirmed = await EcoModal.confirm({
        title: 'Hapus Album Kegiatan?',
        subtitle: `Album "${title}" akan dihapus dari daftar.`,
        message: 'Foto asli di kawasan tidak akan terhapus dari server, hanya pengelompokan album ini yang dihapus. Lanjutkan?',
        type: 'danger',
        confirmText: 'Ya, Hapus Album',
        cancelText: 'Batal',
        icon: '📁',
      });
      if (confirmed) {
        try {
          await ApiService.deleteAlbum(id);
          EcoToast.success('Album Dihapus', `Album "${title}" berhasil dihapus.`);
          await reloadAlbums();
        } catch (err) {
          EcoToast.error('Gagal Menghapus Album', err.message);
        }
      }
    });
  });
}

async function reloadAlbums() {
  await loadInitialData();
  const dynamicContainer = document.getElementById('album-dynamic-container');
  if (dynamicContainer) renderAlbumListView(dynamicContainer);
}

// ─── 2. FORM VIEW (CREATE & EDIT) ──────────────────────────────
async function renderAlbumForm(container) {
  let albumData = {
    title: '',
    category: 'Dokumentasi Silvikultur',
    organizer: '',
    planting_zone_id: '',
    location_name: '',
    activity_date: new Date().toISOString().split('T')[0],
    description: '',
    is_published: true,
    sort_order: 0,
    cover_photo_id: null,
  };

  const isEdit = currentAlbumView === 'edit' && activeAlbumId;
  let existingPhotos = [];

  container.innerHTML = `
    <div class="flex items-center justify-center py-20 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-xs">Memuat formulir album kegiatan...</span>
    </div>
  `;

  if (isEdit) {
    try {
      const res = await ApiService.getAdminAlbumDetail(activeAlbumId);
      if (res.album) {
        albumData = res.album;
        existingPhotos = res.album.photos || [];
      } else {
        throw new Error('Data album tidak ditemukan di server.');
      }
    } catch (err) {
      container.innerHTML = `
        <div class="zone-form-card space-y-6 text-center py-12">
          <div class="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-3xl text-rose-400">
            ⚠️
          </div>
          <div>
            <h3 class="text-base font-bold text-white">Album Tidak Ditemukan</h3>
            <p class="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              ${escapeHtml(err.message || 'Data album dengan ID tersebut tidak ditemukan atau telah dihapus.')}
            </p>
          </div>
          <div class="pt-2">
            <button id="btn-err-back-to-albums" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition cursor-pointer">
              ← Kembali ke Daftar Album
            </button>
          </div>
        </div>
      `;
      document.getElementById('btn-err-back-to-albums')?.addEventListener('click', () => {
        switchAlbumSubView('list');
      });
      return;
    }
  }

  // Muat foto-foto yang tersedia di sistem untuk dipilih langsung saat buat/edit
  let availableSystemPhotos = [];
  try {
    const photosRes = await ApiService.getAvailablePhotosForAlbum({ album_id: activeAlbumId || '' });
    availableSystemPhotos = photosRes.photos || [];
  } catch (err) {
    console.warn('Gagal memuat foto tersedia:', err);
  }

  // Set default selected photo IDs
  const initialSelectedIds = new Set(existingPhotos.map((p) => p.id));
  let formCoverPhotoId = albumData.cover_photo_id || (existingPhotos.length > 0 ? existingPhotos[0].id : null);

  container.innerHTML = `
    <div class="zone-form-card space-y-6">
      <!-- Breadcrumb Nav Inside Form -->
      <nav class="flex items-center gap-2 text-xs text-slate-400">
        <button id="btn-breadcrumb-albums" class="hover:text-blue-400 transition cursor-pointer font-medium">
          ← Kembali ke Semua Album
        </button>
        <span class="text-slate-600">/</span>
        <span class="text-blue-400 font-semibold">${isEdit ? 'Sunting Album Kegiatan' : 'Formulir Tambah Album Baru'}</span>
      </nav>

      <!-- Form Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div>
          <div class="inline-flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1">
            <span>📸 Album Dokumentasi Kegiatan</span>
            <span>&bull;</span>
            <span>${isEdit ? 'Mode Perubahan' : 'Penambahan Baru'}</span>
          </div>
          <h3 class="text-lg font-bold text-white tracking-tight">
            ${isEdit ? `Sunting Album: ${escapeHtml(albumData.title)}` : 'Buat Album Kegiatan Galeri Baru'}
          </h3>
          <p class="text-xs text-slate-400 mt-0.5">
            Lengkapi formulir di bawah ini untuk mengelompokkan dokumentasi foto kegiatan secara tematik di galeri publik.
          </p>
        </div>
        <button id="btn-cancel-album-form" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer self-start sm:self-center">
          ✕ Batal &amp; Kembali
        </button>
      </div>

      <form id="album-form" class="space-y-6">
        <!-- BAGIAN 1: IDENTITAS KEGIATAN -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">1</span>
            <span>Identitas &amp; Klasifikasi Kegiatan</span>
          </div>

          <div class="space-y-4">
            <!-- Nama Kegiatan / Judul Album -->
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1.5">
                Nama Kegiatan / Judul Album <span class="text-rose-400 font-bold">*</span>
              </label>
              <input
                type="text"
                id="album-input-title"
                required
                value="${escapeHtml(albumData.title || '')}"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                placeholder="Contoh: Kuliah Lapangan Mahasiswa Kehutanan USK 2026"
              />
              <p class="text-[11px] text-slate-400 mt-1">Nama ringkas dan informatif mengenai kegiatan dokumentasi ini.</p>
            </div>

            <!-- Kategori Silvikultur & Kawasan -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">
                  Kategori Dokumentasi <span class="text-rose-400 font-bold">*</span>
                </label>
                <select id="album-input-category" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition">
                  ${ALBUM_CATEGORIES.map((c) => `<option value="${c}" ${albumData.category === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Klasifikasi topik untuk filter galeri publik.</p>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">
                  Kawasan Terkait
                </label>
                <select id="album-input-zone" class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition">
                  <option value="">-- Semua Kawasan (Dokumentasi Umum) --</option>
                  ${cachedZones.map((z) => `<option value="${z.id}" ${albumData.planting_zone_id === z.id ? 'selected' : ''}>${z.name} (${z.zone_code})</option>`).join('')}
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Pilih kawasan penanaman spesifik jika relevan.</p>
              </div>
            </div>

            <!-- Tanggal Pelaksanaan, Penyelenggara & Lokasi Plot -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-xs font-bold text-slate-200">Tanggal Pelaksanaan</label>
                  <button type="button" id="btn-set-today" class="text-[10px] text-blue-400 hover:underline">Hari Ini</button>
                </div>
                <input
                  type="date"
                  id="album-input-date"
                  value="${albumData.activity_date ? albumData.activity_date.split('T')[0] : ''}"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 transition font-mono"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">Penyelenggara / Mitra Pelaksana</label>
                <input
                  type="text"
                  id="album-input-organizer"
                  value="${escapeHtml(albumData.organizer || '')}"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Contoh: USK, BPDASHL, Tim IKHW"
                />
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-200 mb-1.5">Plot / Titik Lapangan</label>
                <input
                  type="text"
                  id="album-input-location"
                  value="${escapeHtml(albumData.location_name || '')}"
                  class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Contoh: Blok A - Lereng Barat"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- BAGIAN 2: CATATAN & NARASI KEGIATAN -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">2</span>
            <span>Deskripsi &amp; Catatan Kegiatan</span>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-200 mb-1.5">
              Deskripsi Lengkap / Ringkasan Dokumentasi
            </label>
            <textarea
              id="album-input-desc"
              rows="4"
              class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed transition"
              placeholder="Jelaskan tujuan kegiatan silvikultur ini, peserta yang terlibat, kondisi cuaca di lapangan, jumlah pohon/bibit yang diobservasi, atau temuan spesifik saat monitoring..."
            >${escapeHtml(albumData.description || '')}</textarea>
            <p class="text-[11px] text-slate-400 mt-1">Deskripsi ini akan ditampilkan kepada pengunjung galeri saat membuka album kegiatan.</p>
          </div>
        </div>

        <!-- BAGIAN 3: PILIH FOTO DARI KOLEKSI KAWASAN SEKARANG -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">3</span>
            <span>Pilih Foto dari Galeri Kawasan &amp; Tentukan Sampul</span>
          </div>

          <div class="space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 gap-2">
              <p class="text-slate-400">
                Pilih foto yang relevan untuk dimasukkan ke dalam album ini. Klik tombol <span class="text-amber-400 font-bold">⭐ Jadikan Sampul</span> untuk memilih cover album.
              </p>
              <span id="form-selected-photo-count" class="font-bold text-blue-400 shrink-0 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/30">
                ${initialSelectedIds.size} Foto Terpilih
              </span>
            </div>

            ${availableSystemPhotos.length === 0 ? `
              <div class="p-6 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
                <span>📸 Belum ada foto lain di sistem. Anda dapat membuat album ini terlebih dahulu dan mengunggah foto langsung setelah disimpan.</span>
              </div>
            ` : `
              <div class="album-form-photo-grid">
                ${availableSystemPhotos.map((photo) => {
                  const isChecked = initialSelectedIds.has(photo.id);
                  const isCover = formCoverPhotoId === photo.id;
                  const photoUrl = photo.thumbnail_url || photo.file_url;
                  return `
                    <div class="album-form-photo-item ${isChecked ? 'selected' : ''} ${isCover ? 'is-cover' : ''}" data-photo-id="${photo.id}">
                      ${isCover ? `<span class="album-form-cover-badge">⭐ Sampul</span>` : ''}
                      <img src="${escapeHtml(photoUrl)}" class="w-full h-24 object-cover" />
                      <div class="p-2 bg-slate-900/90 flex flex-col justify-between">
                        <span class="text-[10px] text-slate-300 font-medium truncate">${escapeHtml(photo.title || 'Foto #' + photo.id)}</span>
                        <div class="mt-1.5 flex items-center justify-between pt-1 border-t border-slate-800">
                          <label class="inline-flex items-center gap-1 text-[10px] text-slate-300 cursor-pointer">
                            <input type="checkbox" class="form-photo-chk w-3.5 h-3.5 rounded text-blue-600 bg-slate-800 border-slate-700" value="${photo.id}" ${isChecked ? 'checked' : ''}>
                            <span>Pilih</span>
                          </label>
                          <button type="button" class="btn-make-cover text-[9px] font-bold text-amber-400 hover:text-amber-300 ${!isChecked ? 'opacity-30 pointer-events-none' : ''}" data-photo-id="${photo.id}">
                            ⭐ Sampul
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>
        </div>

        <!-- BAGIAN 4: PENGATURAN STATUS & PRIORITAS -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">4</span>
            <span>Pengaturan Status Publikasi &amp; Tampilan</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            <!-- Modern Toggle Switch Publikasi -->
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-2">Status Publikasi Album</label>
              <div class="modern-toggle-wrap" id="toggle-wrap-published">
                <div class="modern-toggle ${albumData.is_published ? 'active' : ''}" id="ui-toggle-published">
                  <input type="checkbox" id="album-input-published" ${albumData.is_published ? 'checked' : ''} />
                  <div class="modern-toggle-slider"></div>
                </div>
                <div>
                  <span class="text-xs font-bold text-white block" id="toggle-label-published">
                    ${albumData.is_published ? 'Publik (Dapat Dilihat Umum)' : 'Draft (Hanya Pengelola)'}
                  </span>
                  <span class="text-[11px] text-slate-400">
                    ${albumData.is_published ? 'Album aktif dan tampil di halaman galeri publik.' : 'Disembunyikan dari publik hingga siap diterbitkan.'}
                  </span>
                </div>
              </div>
            </div>

            <!-- Urutan Prioritas Sort Order -->
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1.5">
                Urutan Prioritas Tampilan (Angka)
              </label>
              <input
                type="number"
                id="album-input-order"
                value="${albumData.sort_order || 0}"
                min="0"
                class="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 font-mono transition"
                placeholder="0"
              />
              <p class="text-[11px] text-slate-400 mt-1">Angka lebih kecil tampil lebih awal di galeri (0 = standar urut tanggal).</p>
            </div>
          </div>
        </div>

        <!-- FORM ACTION BUTTONS -->
        <div class="pt-4 border-t border-slate-800 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button type="button" id="btn-cancel-album-action" class="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer">
            ← Kembali ke Daftar Album
          </button>
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <button type="submit" id="btn-submit-album-form" class="w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-xl shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
              ${isEdit ? '💾 Simpan Perubahan Album' : '✨ Buat &amp; Publikasikan Album'}
            </button>
          </div>
        </div>
      </form>
    </div>
  `;

  // Track dirty state
  let isFormDirty = false;
  const markDirty = () => { isFormDirty = true; };

  // Attach quick 'Hari Ini' button
  document.getElementById('btn-set-today')?.addEventListener('click', () => {
    const dateInput = document.getElementById('album-input-date');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
      markDirty();
    }
  });

  const handleCancelWithGuard = async () => {
    if (isFormDirty) {
      const confirmLeave = await EcoModal.confirm({
        title: 'Batalkan Perubahan?',
        subtitle: 'Perubahan pada formulir album belum disimpan.',
        message: 'Data yang telah Anda masukkan akan hilang jika Anda meninggalkan halaman ini sekarang. Apakah Anda yakin?',
        type: 'warning',
        confirmText: 'Ya, Tinggalkan',
        cancelText: 'Tetap di Sini',
      });
      if (!confirmLeave) return;
    }
    switchAlbumSubView('list');
  };

  // Attach Cancel buttons & Breadcrumb
  document.getElementById('btn-breadcrumb-albums')?.addEventListener('click', handleCancelWithGuard);
  document.getElementById('btn-cancel-album-form')?.addEventListener('click', handleCancelWithGuard);
  document.getElementById('btn-cancel-album-action')?.addEventListener('click', handleCancelWithGuard);

  // Toggle switch interactions
  const toggleWrap = document.getElementById('toggle-wrap-published');
  const toggleEl = document.getElementById('ui-toggle-published');
  const chkPublished = document.getElementById('album-input-published');
  const labelPublished = document.getElementById('toggle-label-published');

  // Attach change listeners to mark form as dirty
  [
    'album-input-title',
    'album-input-category',
    'album-input-zone',
    'album-input-organizer',
    'album-input-location',
    'album-input-date',
    'album-input-desc',
    'album-input-order',
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', markDirty);
      el.addEventListener('change', markDirty);
    }
  });

  toggleWrap?.addEventListener('click', (e) => {
    e.preventDefault();
    chkPublished.checked = !chkPublished.checked;
    toggleEl.classList.toggle('active', chkPublished.checked);
    if (chkPublished.checked) {
      labelPublished.textContent = 'Publik (Dapat Dilihat Umum)';
    } else {
      labelPublished.textContent = 'Draft (Hanya Pengelola)';
    }
    markDirty();
  });

  // Photo selection grid interactions
  const currentSelectedPhotoIds = new Set(initialSelectedIds);
  const countBadge = document.getElementById('form-selected-photo-count');

  const updatePhotoGridUI = () => {
    document.querySelectorAll('.album-form-photo-item').forEach((item) => {
      const pid = parseInt(item.getAttribute('data-photo-id'), 10);
      const isSelected = currentSelectedPhotoIds.has(pid);
      const isCover = formCoverPhotoId === pid;

      item.classList.toggle('selected', isSelected);
      item.classList.toggle('is-cover', isCover);

      const chk = item.querySelector('.form-photo-chk');
      if (chk) chk.checked = isSelected;

      const coverBtn = item.querySelector('.btn-make-cover');
      if (coverBtn) {
        coverBtn.classList.toggle('opacity-30', !isSelected);
        coverBtn.classList.toggle('pointer-events-none', !isSelected);
      }

      // Cover badge
      let badge = item.querySelector('.album-form-cover-badge');
      if (isCover && !badge) {
        badge = document.createElement('span');
        badge.className = 'album-form-cover-badge';
        badge.textContent = '⭐ Sampul';
        item.prepend(badge);
      } else if (!isCover && badge) {
        badge.remove();
      }
    });

    if (countBadge) {
      countBadge.textContent = `${currentSelectedPhotoIds.size} Foto Terpilih`;
    }
  };

  document.querySelectorAll('.form-photo-chk').forEach((chk) => {
    chk.addEventListener('change', (e) => {
      const pid = parseInt(e.target.value, 10);
      if (e.target.checked) {
        currentSelectedPhotoIds.add(pid);
        if (!formCoverPhotoId) formCoverPhotoId = pid;
      } else {
        currentSelectedPhotoIds.delete(pid);
        if (formCoverPhotoId === pid) {
          formCoverPhotoId = currentSelectedPhotoIds.values().next().value || null;
        }
      }
      markDirty();
      updatePhotoGridUI();
    });
  });

  document.querySelectorAll('.btn-make-cover').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pid = parseInt(btn.getAttribute('data-photo-id'), 10);
      if (currentSelectedPhotoIds.has(pid)) {
        formCoverPhotoId = pid;
        markDirty();
        updatePhotoGridUI();
      }
    });
  });

  // Submit Handler
  const form = document.getElementById('album-form');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleVal = document.getElementById('album-input-title').value.trim();
    if (!titleVal) {
      EcoToast.warning('Validasi Diperlukan', 'Nama Kegiatan / Judul Album wajib diisi.');
      document.getElementById('album-input-title')?.focus();
      return;
    }

    const payload = {
      title: titleVal,
      category: document.getElementById('album-input-category').value,
      organizer: document.getElementById('album-input-organizer').value.trim() || null,
      planting_zone_id: document.getElementById('album-input-zone').value || null,
      location_name: document.getElementById('album-input-location').value.trim() || null,
      activity_date: document.getElementById('album-input-date').value || null,
      sort_order: parseInt(document.getElementById('album-input-order').value, 10) || 0,
      description: document.getElementById('album-input-desc').value.trim() || null,
      is_published: chkPublished.checked,
      cover_photo_id: formCoverPhotoId || null,
      photo_ids: Array.from(currentSelectedPhotoIds),
    };

    const submitBtn = document.getElementById('btn-submit-album-form');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="loading-spinner"></span>
      <span>${isEdit ? 'Menyimpan perubahan...' : 'Membuat album...'}</span>
    `;

    try {
      if (isEdit) {
        await ApiService.updateAlbum(activeAlbumId, payload);
        EcoToast.success('Album Disimpan', `Perubahan album "${payload.title}" berhasil disimpan.`);
      } else {
        const createRes = await ApiService.createAlbum(payload);
        EcoToast.success('Album Dibuat', `Album kegiatan "${payload.title}" berhasil ditambahkan.`);
        if (createRes.album?.id) {
          activeAlbumId = createRes.album.id;
        }
      }
      isFormDirty = false;
      await reloadAlbums();
      switchAlbumSubView('list');
    } catch (err) {
      EcoToast.error('Gagal Menyimpan Album', err.message);
      submitBtn.disabled = false;
      submitBtn.innerHTML = isEdit ? '💾 Simpan Perubahan Album' : '✨ Buat &amp; Publikasikan Album';
    }
  });
}

// ─── 3. MANAGE PHOTOS VIEW WITH INTERACTIVE UPLOAD PREVIEWS ────
async function renderManagePhotosView(container) {
  if (!activeAlbumId) {
    switchAlbumSubView('list');
    return;
  }

  container.innerHTML = `
    <div class="flex items-center justify-center py-20 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-xs">Memuat detail foto album kegiatan...</span>
    </div>
  `;

  let album;
  try {
    const res = await ApiService.getAdminAlbumDetail(activeAlbumId);
    album = res.album;
  } catch (err) {
    EcoToast.error('Gagal Memuat Foto Album', err.message);
    switchAlbumSubView('list');
    return;
  }

  const photos = album.photos || [];

  container.innerHTML = `
    <div class="space-y-6">
      <!-- Breadcrumb Nav -->
      <nav class="flex items-center gap-2 text-xs text-slate-400">
        <button id="btn-back-to-albums-list" class="hover:text-blue-400 transition cursor-pointer font-medium">
          ← Kembali ke Semua Album
        </button>
        <span class="text-slate-600">/</span>
        <span class="text-slate-300 font-medium truncate max-w-xs">${escapeHtml(album.title)}</span>
        <span class="text-slate-600">/</span>
        <span class="text-blue-400 font-semibold">Kelola Foto (${photos.length})</span>
      </nav>

      <!-- Top Info Card -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-lg">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>${escapeHtml(album.title)}</span>
            </h3>
            <span class="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25">
              🏷️ ${escapeHtml(album.category || 'Dokumentasi')}
            </span>
            ${album.zone?.name ? `
              <span class="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                🏞️ ${escapeHtml(album.zone.name)}
              </span>
            ` : ''}
            ${album.is_published ? `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span class="album-pulse-dot"></span>
                <span>Publik</span>
              </span>
            ` : `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                Draft
              </span>
            `}
          </div>
          <p class="text-xs text-slate-400 mt-1.5">
            Total <strong>${photos.length} foto</strong> terkelompok dalam album ini. Anda dapat mengunggah foto langsung, menentukan foto sampul, menyunting keterangan/alt-text, atau mengatur urutan tampilan.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button class="btn-edit-album inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition cursor-pointer" data-id="${album.id}" title="Sunting rincian informasi album">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span>Edit Album</span>
          </button>
          <button id="btn-toggle-direct-upload" class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition cursor-pointer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>+ Unggah Foto Baru</span>
          </button>
          <button id="btn-open-photo-picker" class="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 font-bold text-xs border border-blue-500/30 transition cursor-pointer" title="Pilih dari koleksi foto kawasan yang sudah ada">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Pilih dari Kawasan</span>
          </button>
        </div>
      </div>

      <!-- Direct Upload Section with Interactive Previews (Collapsible) -->
      <div id="direct-upload-box" class="${isDirectUploadBoxOpen ? '' : 'hidden'} bg-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl space-y-4 transition-all">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-blue-400 text-base">📤</span>
            <h4 class="text-sm font-bold text-white">Unggah Berkas Foto Langsung ke Album Ini</h4>
          </div>
          <span class="text-[11px] text-slate-400 font-mono">Format: JPG, JPEG, PNG, WebP (Maks 5 MB/foto)</span>
        </div>

        <form id="form-direct-upload" class="space-y-4">
          <!-- Dropzone Area -->
          <div>
            <div id="upload-dropzone" class="upload-dropzone-box">
              <input
                type="file"
                id="input-direct-upload-files"
                multiple
                accept="image/jpeg,image/png,image/webp,image/jpg"
                class="hidden"
              />
              <div class="flex flex-col items-center justify-center pointer-events-none">
                <svg class="w-10 h-10 text-blue-400/80 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                <p class="text-xs font-bold text-white mb-1">Tarik &amp; Lepaskan Berkas Foto ke Sini, atau <span class="text-blue-400 underline">Pilih Berkas</span></p>
                <p class="text-[11px] text-slate-400">Pilih hingga 20 foto sekaligus dari komputer Anda.</p>
              </div>
            </div>

            <!-- Upload Queue Previews Container -->
            <div id="upload-preview-container" class="hidden">
              <div class="flex items-center justify-between mt-4 pb-2 border-b border-slate-800 text-xs">
                <span class="font-bold text-white" id="upload-preview-summary">0 foto dipilih</span>
                <button type="button" id="btn-clear-upload-queue" class="text-rose-400 hover:text-rose-300 text-[11px] font-semibold cursor-pointer">
                  Bersihkan Pilihan
                </button>
              </div>
              <div id="upload-previews-grid" class="upload-preview-grid">
                <!-- Dynamically rendered preview cards -->
              </div>
            </div>
          </div>

          <!-- Metadata Options for Uploaded Photos -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1">Keterangan / Caption Bawaan (Opsional)</label>
              <input
                type="text"
                id="input-direct-upload-caption"
                placeholder="Contoh: Dokumentasi tahapan awal penanaman bibit"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-200 mb-1">Alt Text Aksesibilitas (Opsional)</label>
              <input
                type="text"
                id="input-direct-upload-alt"
                placeholder="Deskripsi singkat foto untuk pembaca layar"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="chk-direct-upload-cover" class="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 w-4 h-4" />
              <span>Jadikan foto pertama sebagai Foto Sampul Utama album</span>
            </label>

            <button
              type="submit"
              id="btn-submit-direct-upload"
              class="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer shadow-lg shadow-blue-500/20 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span id="btn-submit-direct-upload-text">Mulai Unggah Foto</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Photos Grid Inside Album -->
      <div id="album-photos-grid">
        ${photos.length === 0 ? `
          <div class="p-14 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
            <span class="text-5xl block mb-3">🖼️</span>
            <h4 class="text-sm font-bold text-white">Album Ini Belum Memiliki Foto</h4>
            <p class="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Klik <strong>"+ Unggah Foto Baru"</strong> untuk mengunggah dari perangkat, atau <strong>"Pilih dari Kawasan"</strong> untuk menambahkan foto dokumentasi yang sudah ada di kawasan ini.
            </p>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            ${photos.map((photo, idx) => {
              const isCover = album.cover_photo_id === photo.id;
              const photoUrl = photo.thumbnail_url || photo.file_url;
              return `
                <div class="relative group rounded-xl overflow-hidden bg-slate-950 border ${isCover ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800'} transition-all flex flex-col justify-between" data-photo-id="${photo.id}">
                  <div>
                    <!-- Photo Image Box (16:10) -->
                    <div class="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                      <img src="${escapeHtml(photoUrl)}" alt="${escapeHtml(photo.alt_text || photo.title || '')}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>

                      <!-- Top Badges -->
                      <div class="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-slate-300 border border-white/10 backdrop-blur-sm">
                          #${idx + 1}
                        </span>
                        ${isCover ? `
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 shadow-md">
                            ⭐ Sampul
                          </span>
                        ` : ''}
                      </div>
                    </div>

                    <!-- Photo Details -->
                    <div class="p-3 space-y-1">
                      <div class="font-bold text-white text-xs truncate" title="${escapeHtml(photo.title || 'Foto #' + (idx + 1))}">
                        ${escapeHtml(photo.title || 'Foto #' + (idx + 1))}
                      </div>
                      <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed" title="${escapeHtml(photo.caption || '')}">
                        ${escapeHtml(photo.caption || 'Belum ada keterangan khusus.')}
                      </p>
                      ${photo.alt_text ? `
                        <div class="text-[10px] text-slate-500 truncate" title="Alt Text: ${escapeHtml(photo.alt_text)}">
                          Alt: ${escapeHtml(photo.alt_text)}
                        </div>
                      ` : ''}
                    </div>
                  </div>

                  <!-- Card Action Toolbar -->
                  <div class="p-2.5 pt-2 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-1 text-[11px]">
                    <div class="flex items-center gap-1">
                      <!-- Reorder Buttons -->
                      <button
                        class="btn-move-photo-prev p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer ${idx === 0 ? 'opacity-30 pointer-events-none' : ''}"
                        title="Pindahkan ke urutan sebelumnya"
                        data-index="${idx}"
                      >
                        ◀
                      </button>
                      <button
                        class="btn-move-photo-next p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer ${idx === photos.length - 1 ? 'opacity-30 pointer-events-none' : ''}"
                        title="Pindahkan ke urutan berikutnya"
                        data-index="${idx}"
                      >
                        ▶
                      </button>
                    </div>

                    <div class="flex items-center gap-1">
                      ${!isCover ? `
                        <button
                          class="btn-set-as-cover p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-700 transition cursor-pointer"
                          title="Jadikan Foto Sampul Utama"
                          data-photo-id="${photo.id}"
                        >
                          ⭐
                        </button>
                      ` : ''}
                      <button
                        class="btn-edit-photo-meta p-1.5 rounded-lg bg-slate-800 hover:bg-blue-500/20 text-slate-400 hover:text-blue-300 border border-slate-700 transition cursor-pointer"
                        title="Sunting Keterangan / Alt Text"
                        data-photo-id="${photo.id}"
                      >
                        ✏️
                      </button>
                      <button
                        class="btn-remove-from-album p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 transition cursor-pointer"
                        title="Keluarkan dari album ini (foto tetap di kawasan)"
                        data-photo-id="${photo.id}"
                      >
                        ✕
                      </button>
                      <button
                        class="btn-delete-photo-permanent p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 text-slate-400 hover:text-white border border-slate-700 transition cursor-pointer"
                        title="Hapus foto ini secara permanen dari server"
                        data-photo-id="${photo.id}"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  // Attach Navigation & Direct Upload Toggle
  document.getElementById('btn-back-to-albums-list')?.addEventListener('click', () => switchAlbumSubView('list'));

  document.getElementById('btn-toggle-direct-upload')?.addEventListener('click', () => {
    isDirectUploadBoxOpen = !isDirectUploadBoxOpen;
    const box = document.getElementById('direct-upload-box');
    if (box) box.classList.toggle('hidden', !isDirectUploadBoxOpen);
  });

  // Setup Interactive Upload Dropzone & Queue
  setupDirectUploadQueue(container);

  document.getElementById('btn-open-photo-picker')?.addEventListener('click', () => {
    openPhotoModal(activeAlbumId, photos.map((p) => p.id));
  });

  // Attach Set as Cover
  document.querySelectorAll('.btn-set-as-cover').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const pid = parseInt(btn.getAttribute('data-photo-id'), 10);
      try {
        await ApiService.updateAlbum(activeAlbumId, { cover_photo_id: pid });
        EcoToast.success('Foto Sampul Ditetapkan', 'Foto berhasil ditetapkan sebagai sampul utama album.');
        await renderManagePhotosView(container);
      } catch (err) {
        EcoToast.error('Gagal Menetapkan Sampul', err.message);
      }
    });
  });

  // Attach Edit Photo Metadata Modal
  document.querySelectorAll('.btn-edit-photo-meta').forEach((btn) => {
    btn.addEventListener('click', () => {
      const pid = parseInt(btn.getAttribute('data-photo-id'), 10);
      const photo = photos.find((p) => p.id === pid);
      if (photo) openPhotoEditModal(photo, container);
    });
  });

  // Attach Reorder Buttons
  document.querySelectorAll('.btn-move-photo-prev').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (idx > 0) {
        const reordered = [...photos];
        const temp = reordered[idx];
        reordered[idx] = reordered[idx - 1];
        reordered[idx - 1] = temp;
        const newIds = reordered.map((p) => p.id);
        try {
          await ApiService.reorderAlbumPhotos(activeAlbumId, newIds);
          EcoToast.success('Urutan Diperbarui', 'Urutan foto berhasil dipindahkan.');
          await renderManagePhotosView(container);
        } catch (err) {
          EcoToast.error('Gagal Mengubah Urutan', err.message);
        }
      }
    });
  });

  document.querySelectorAll('.btn-move-photo-next').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (idx < photos.length - 1) {
        const reordered = [...photos];
        const temp = reordered[idx];
        reordered[idx] = reordered[idx + 1];
        reordered[idx + 1] = temp;
        const newIds = reordered.map((p) => p.id);
        try {
          await ApiService.reorderAlbumPhotos(activeAlbumId, newIds);
          EcoToast.success('Urutan Diperbarui', 'Urutan foto berhasil dipindahkan.');
          await renderManagePhotosView(container);
        } catch (err) {
          EcoToast.error('Gagal Mengubah Urutan', err.message);
        }
      }
    });
  });

  // Attach Remove Photo (Detach from album)
  document.querySelectorAll('.btn-remove-from-album').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const pid = btn.getAttribute('data-photo-id');
      const confirmed = await EcoModal.confirm({
        title: 'Keluarkan Foto dari Album?',
        subtitle: 'Foto akan dilepas dari daftar koleksi album ini.',
        message: 'Foto asli di kawasan tetap aman dan tidak akan dihapus dari server. Lanjutkan?',
        type: 'warning',
        confirmText: 'Ya, Keluarkan',
        cancelText: 'Batal',
        icon: '🖼️',
      });
      if (confirmed) {
        try {
          await ApiService.removePhotoFromAlbum(activeAlbumId, pid);
          EcoToast.info('Foto Dikeluarkan', 'Foto telah dilepas dari album ini.');
          await renderManagePhotosView(container);
        } catch (err) {
          EcoToast.error('Gagal Mengeluarkan Foto', err.message);
        }
      }
    });
  });

  // Attach Permanent Delete Photo
  document.querySelectorAll('.btn-delete-photo-permanent').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const pid = btn.getAttribute('data-photo-id');
      const confirmed = await EcoModal.confirm({
        title: 'Hapus Foto Permanen?',
        subtitle: 'PERINGATAN: File foto dan catatannya akan dihapus permanen dari server.',
        message: 'File foto dan catatannya akan dihapus jika tidak digunakan di album/fitur lain. Tindakan ini tidak dapat dibatalkan. Lanjutkan?',
        type: 'danger',
        confirmText: 'Ya, Hapus Permanen',
        cancelText: 'Batal',
        icon: '🗑️',
      });
      if (confirmed) {
        try {
          await ApiService.deleteAlbumPhotoPermanently(activeAlbumId, pid);
          EcoToast.success('Foto Dihapus', 'Foto berhasil dihapus secara permanen dari server.');
          await renderManagePhotosView(container);
        } catch (err) {
          EcoToast.error('Gagal Menghapus Foto', err.message);
        }
      }
    });
  });
}

function setupDirectUploadQueue(parentContainer) {
  const dropzone = document.getElementById('upload-dropzone');
  const fileInput = document.getElementById('input-direct-upload-files');
  const previewContainer = document.getElementById('upload-preview-container');
  const previewsGrid = document.getElementById('upload-previews-grid');
  const summaryText = document.getElementById('upload-preview-summary');
  const clearBtn = document.getElementById('btn-clear-upload-queue');
  const submitBtn = document.getElementById('btn-submit-direct-upload');
  const submitBtnText = document.getElementById('btn-submit-direct-upload-text');
  const uploadForm = document.getElementById('form-direct-upload');

  if (!dropzone || !fileInput) return;

  // Dropzone click triggers file input
  dropzone.addEventListener('click', () => fileInput.click());

  // Drag and drop events
  ['dragenter', 'dragover'].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      addFilesToQueue(dt.files);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      addFilesToQueue(fileInput.files);
      fileInput.value = ''; // Reset so the same file can be re-selected if removed
    }
  });

  clearBtn?.addEventListener('click', () => {
    pendingUploadFiles.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    pendingUploadFiles = [];
    renderQueuePreviews();
  });

  function addFilesToQueue(files) {
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    Array.from(files).forEach((file) => {
      // Check maximum limit
      if (pendingUploadFiles.length >= 20) {
        EcoToast.warning('Batas Maksimum', 'Maksimal 20 berkas sekaligus yang dapat dipilih.');
        return;
      }

      let isValid = true;
      let errorMsg = '';

      if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
        isValid = false;
        errorMsg = 'Format bukan JPG/PNG/WebP';
      } else if (file.size > MAX_SIZE) {
        isValid = false;
        errorMsg = 'Ukuran > 5 MB';
      }

      const previewUrl = isValid ? URL.createObjectURL(file) : '';
      const isFirst = pendingUploadFiles.length === 0;

      pendingUploadFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        name: file.name,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        previewUrl,
        isValid,
        errorMsg,
        isCover: isFirst && isValid,
      });
    });

    renderQueuePreviews();
  }

  function renderQueuePreviews() {
    if (!previewContainer || !previewsGrid) return;

    if (pendingUploadFiles.length === 0) {
      previewContainer.classList.add('hidden');
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = 'Mulai Unggah Foto';
      return;
    }

    previewContainer.classList.remove('hidden');

    const validCount = pendingUploadFiles.filter((f) => f.isValid).length;
    const invalidCount = pendingUploadFiles.length - validCount;

    if (summaryText) {
      summaryText.innerHTML = `
        <span><strong>${pendingUploadFiles.length} berkas dipilih</strong> (${validCount} valid${invalidCount > 0 ? `, <span class="text-rose-400 font-bold">${invalidCount} tidak memenuhi syarat</span>` : ''})</span>
      `;
    }

    previewsGrid.innerHTML = pendingUploadFiles.map((item) => {
      return `
        <div class="upload-preview-card ${item.is_cover || item.isCover ? 'is-cover' : ''} ${!item.isValid ? 'is-invalid' : ''}" data-queue-id="${item.id}">
          <button type="button" class="upload-preview-remove-btn" title="Hapus dari antrean" data-remove-id="${item.id}">✕</button>

          <div class="upload-preview-thumb-wrap">
            ${item.isValid ? `
              <img src="${item.previewUrl}" alt="${escapeHtml(item.name)}" />
            ` : `
              <div class="w-full h-full flex flex-col items-center justify-center p-2 text-rose-400 bg-rose-950/40 text-center">
                <span class="text-xl">⚠️</span>
                <span class="text-[9px] mt-1 font-semibold leading-tight">${escapeHtml(item.errorMsg)}</span>
              </div>
            `}

            ${item.isValid ? `
              <button type="button" class="upload-preview-cover-btn ${item.isCover ? 'active' : ''}" data-set-cover-id="${item.id}">
                ${item.isCover ? '⭐ Sampul' : 'Jadikan Sampul'}
              </button>
            ` : ''}
          </div>

          <div class="upload-preview-info">
            <span class="text-[11px] font-medium text-slate-200 truncate block" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
            <div class="flex items-center justify-between mt-1 text-[10px] text-slate-400">
              <span>${item.sizeFormatted}</span>
              ${!item.isValid ? `<span class="text-rose-400 font-bold">Ditolak</span>` : `<span class="text-emerald-400 font-bold">Siap</span>`}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach individual remove handlers
    previewsGrid.querySelectorAll('.upload-preview-remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.getAttribute('data-remove-id');
        const target = pendingUploadFiles.find((f) => f.id === qid);
        if (target && target.previewUrl) URL.revokeObjectURL(target.previewUrl);
        pendingUploadFiles = pendingUploadFiles.filter((f) => f.id !== qid);

        // If removed was cover, set first valid as cover
        if (target && target.isCover) {
          const firstValid = pendingUploadFiles.find((f) => f.isValid);
          if (firstValid) firstValid.isCover = true;
        }

        renderQueuePreviews();
      });
    });

    // Attach cover selection
    previewsGrid.querySelectorAll('.upload-preview-cover-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qid = btn.getAttribute('data-set-cover-id');
        pendingUploadFiles.forEach((f) => {
          f.isCover = f.id === qid;
        });
        renderQueuePreviews();
      });
    });

    // Update submit button state
    if (submitBtn) {
      submitBtn.disabled = validCount === 0 || invalidCount > 0;
    }
    if (submitBtnText) {
      if (invalidCount > 0) {
        submitBtnText.textContent = `Hapus ${invalidCount} Berkas Bermasalah Terlebih Dahulu`;
      } else {
        submitBtnText.textContent = `Unggah ${validCount} Foto ke Album`;
      }
    }
  }

  // Handle Form Submit
  uploadForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const validFiles = pendingUploadFiles.filter((f) => f.isValid);
    if (validFiles.length === 0) {
      EcoToast.warning('Peringatan', 'Silakan pilih setidaknya satu file foto yang valid untuk diunggah.');
      return;
    }

    const captionInput = document.getElementById('input-direct-upload-caption');
    const altInput = document.getElementById('input-direct-upload-alt');
    const chkCover = document.getElementById('chk-direct-upload-cover');

    const formData = new FormData();
    validFiles.forEach((item) => {
      formData.append('photos[]', item.file);
    });

    if (captionInput?.value.trim()) {
      formData.append('caption', captionInput.value.trim());
    }
    if (altInput?.value.trim()) {
      formData.append('alt_text', altInput.value.trim());
    }

    // Check cover selection from queue or checkbox
    const coverItem = validFiles.find((f) => f.isCover);
    if (coverItem || chkCover?.checked) {
      formData.append('is_cover', '1');
    }

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="loading-spinner"></span>
        <span>Mengunggah ${validFiles.length} foto...</span>
      `;

      await ApiService.uploadPhotosToAlbum(activeAlbumId, formData);
      EcoToast.success('Foto Berhasil Diunggah', `${validFiles.length} foto kegiatan berhasil ditambahkan ke album.`);

      // Clean up previews
      pendingUploadFiles.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      });
      pendingUploadFiles = [];
      isDirectUploadBoxOpen = false;

      await renderManagePhotosView(parentContainer);
    } catch (err) {
      EcoToast.error('Gagal Mengunggah Foto', err.message);
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span>Mulai Unggah Foto</span>
      `;
    }
  });
}

function openPhotoEditModal(photo, parentContainer) {
  const modal = document.getElementById('album-photo-edit-modal');
  const inputId = document.getElementById('edit-photo-id');
  const thumbImg = document.getElementById('edit-photo-thumb');
  const infoText = document.getElementById('edit-photo-info');
  const inputTitle = document.getElementById('edit-photo-title');
  const inputCaption = document.getElementById('edit-photo-caption');
  const inputAlt = document.getElementById('edit-photo-alt');
  const editForm = document.getElementById('form-edit-photo-meta');

  if (!modal) return;

  if (inputId) inputId.value = photo.id;
  if (thumbImg) thumbImg.src = photo.thumbnail_url || photo.file_url || '';
  if (infoText) infoText.textContent = photo.title || ('Foto #' + photo.id);
  if (inputTitle) inputTitle.value = photo.title || '';
  if (inputCaption) inputCaption.value = photo.caption || '';
  if (inputAlt) inputAlt.value = photo.alt_text || '';

  modal.classList.remove('hidden');

  if (editForm) {
    editForm.onsubmit = async (e) => {
      e.preventDefault();
      const saveBtn = document.getElementById('btn-save-edit-photo');
      if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.textContent = 'Menyimpan...';
      }

      try {
        await ApiService.updateAlbumPhotoMetadata(activeAlbumId, photo.id, {
          title: inputTitle?.value.trim() || null,
          caption: inputCaption?.value.trim() || null,
          alt_text: inputAlt?.value.trim() || null,
        });
        EcoToast.success('Keterangan Disimpan', 'Metadata foto berhasil diperbarui.');
        closeEditPhotoModal();
        if (parentContainer) await renderManagePhotosView(parentContainer);
      } catch (err) {
        EcoToast.error('Gagal Menyimpan Keterangan', err.message);
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.textContent = 'Simpan Keterangan';
        }
      }
    };
  }
}

function closeEditPhotoModal() {
  const modal = document.getElementById('album-photo-edit-modal');
  if (modal) modal.classList.add('hidden');
}

// ─── 4. PHOTO SELECTION MODAL FROM ZONE REPOSITORY ────────────
let selectedPhotoIds = new Set();

async function openPhotoModal(albumId, existingPhotoIds = []) {
  const modal = document.getElementById('album-photo-modal');
  const listContainer = document.getElementById('modal-photo-list');
  const countEl = document.getElementById('modal-selected-count');
  const submitBtn = document.getElementById('btn-submit-add-photos');

  if (!modal || !listContainer) return;
  modal.classList.remove('hidden');

  selectedPhotoIds = new Set();
  countEl.textContent = '0 foto terpilih';
  submitBtn.disabled = true;

  listContainer.innerHTML = `
    <div class="flex items-center justify-center py-16 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-xs">Memuat foto kawasan tersedia...</span>
    </div>
  `;

  try {
    const res = await ApiService.getAvailablePhotosForAlbum({ album_id: albumId });
    const availablePhotos = res.photos || [];

    if (availablePhotos.length === 0) {
      listContainer.innerHTML = `
        <div class="p-8 text-center text-slate-400">
          <span class="text-3xl block mb-2">📸</span>
          <p class="text-xs">Tidak ada foto baru yang tersedia untuk ditambahkan ke album ini.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
        ${availablePhotos.map((photo) => {
          const isAlreadyIn = existingPhotoIds.includes(photo.id);
          const photoUrl = photo.thumbnail_url || photo.file_url;
          return `
            <label class="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 cursor-pointer select-none group ${isAlreadyIn ? 'opacity-40 pointer-events-none' : ''}">
              <input type="checkbox" class="modal-photo-checkbox hidden" value="${photo.id}" ${isAlreadyIn ? 'disabled' : ''} />
              <div class="h-28 overflow-hidden">
                <img src="${escapeHtml(photoUrl)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div class="photo-selection-check absolute top-2 right-2 w-6 h-6 rounded-lg bg-slate-900/80 border border-slate-600 flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <div class="p-2 bg-slate-900/90 text-[11px] truncate text-slate-300">
                ${escapeHtml(photo.title || 'Foto #' + photo.id)}
              </div>
            </label>
          `;
        }).join('')}
      </div>
    `;

    // Bind checkboxes
    listContainer.querySelectorAll('.modal-photo-checkbox').forEach((chk) => {
      chk.addEventListener('change', () => {
        const id = parseInt(chk.value, 10);
        const card = chk.closest('label');
        if (chk.checked) {
          selectedPhotoIds.add(id);
          card.classList.add('border-blue-500', 'ring-2', 'ring-blue-500/30');
          card.querySelector('.photo-selection-check').classList.add('bg-blue-600', 'border-blue-400');
        } else {
          selectedPhotoIds.delete(id);
          card.classList.remove('border-blue-500', 'ring-2', 'ring-blue-500/30');
          card.querySelector('.photo-selection-check').classList.remove('bg-blue-600', 'border-blue-400');
        }

        const size = selectedPhotoIds.size;
        countEl.textContent = `${size} foto terpilih`;
        submitBtn.disabled = size === 0;
      });
    });

    submitBtn.onclick = async () => {
      if (selectedPhotoIds.size === 0) return;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Menambahkan...';

      try {
        await ApiService.addPhotosToAlbum(albumId, Array.from(selectedPhotoIds));
        EcoToast.success('Foto Ditambahkan', `${selectedPhotoIds.size} foto berhasil ditambahkan ke album.`);
        closePhotoModal();
        const dynamicContainer = document.getElementById('album-dynamic-container');
        if (dynamicContainer) await renderManagePhotosView(dynamicContainer);
      } catch (err) {
        EcoToast.error('Gagal Menambahkan Foto', err.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Tambahkan ke Album';
      }
    };
  } catch (err) {
    listContainer.innerHTML = `<div class="p-8 text-center text-rose-400 text-xs">Gagal memuat foto: ${err.message}</div>`;
  }
}

function closePhotoModal() {
  const modal = document.getElementById('album-photo-modal');
  if (modal) modal.classList.add('hidden');
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
