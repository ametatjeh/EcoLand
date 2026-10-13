/**
 * Admin Zone Photo Gallery Component
 * Mengelola foto dokumentasi untuk masing-masing kawasan penanaman:
 * Upload (single/multiple), edit metadata, set cover, delete, filter, preview modal.
 */

import { ApiService } from '../services/api.js';
import { EcoToast } from '../utils/toast.js';
import { toDateInputValue, formatDateDisplay, parseDateForPayload } from '../utils/date.js';

let currentZoneData = null;
let currentPhotos = [];
let activeCategoryFilter = 'all';
let currentSearchTerm = '';
let activeStatusFilter = 'all';

export function renderAdminZoneGallery(container, zoneData) {
  currentZoneData = zoneData;
  activeCategoryFilter = 'all';
  currentSearchTerm = '';
  activeStatusFilter = 'all';

  container.innerHTML = `
    <div class="zone-gallery-admin-wrapper space-y-5">
      <!-- Gallery Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h4 class="text-base font-bold text-white flex items-center gap-2">
            <span>🖼️</span> Galeri Foto Kawasan: <span class="text-emerald-400 font-semibold">${escapeHtml(zoneData.name)}</span>
          </h4>
          <p class="text-xs text-slate-400 mt-1">
            Unggah dan kelola foto dokumentasi lapangan, kegiatan penanaman, pemantauan, dan pilih foto sampul utama.
          </p>
        </div>
        <div class="flex items-center gap-2.5 shrink-0">
          <button id="btn-admin-upload-photos" class="btn-primary-action btn-sm flex items-center gap-1.5 cursor-pointer">
            <span>➕</span> Unggah Foto Baru
          </button>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
        <div class="flex flex-wrap items-center gap-2">
          <label class="text-xs text-slate-400">Kategori:</label>
          <select id="admin-gallery-cat-filter" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500">
            <option value="all">Semua Kategori</option>
            <option value="Kondisi Kawasan">Kondisi Kawasan</option>
            <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
            <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
            <option value="Pemantauan">Pemantauan</option>
            <option value="Perawatan">Perawatan</option>
            <option value="Fasilitas">Fasilitas</option>
            <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
          </select>

          <label class="text-xs text-slate-400 ml-2">Status:</label>
          <select id="admin-gallery-status-filter" class="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-emerald-500">
            <option value="all">Semua Status</option>
            <option value="published">Publikasi Saja</option>
            <option value="draft">Internal Saja</option>
          </select>
        </div>

        <div class="relative min-w-[200px]">
          <span class="absolute inset-y-0 left-2.5 flex items-center text-slate-500 text-xs">🔍</span>
          <input
            type="text"
            id="admin-gallery-search"
            placeholder="Cari foto..."
            class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-lg pl-8 pr-3 py-1.5 outline-none focus:border-emerald-500 placeholder-slate-500"
          />
        </div>
      </div>

      <!-- Photos Grid Container -->
      <div id="admin-gallery-grid" class="min-h-[220px]">
        <div class="flex items-center justify-center py-12 text-slate-400 gap-2">
          <span class="animate-spin text-lg">⏳</span> Memuat foto kawasan...
        </div>
      </div>
    </div>

    <!-- Upload Modal Container -->
    <div id="admin-upload-modal" class="modal-overlay hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <span>📤</span> Unggah Foto Dokumentasi Kawasan
          </h4>
          <button id="btn-close-upload-modal" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
        </div>

        <form id="admin-upload-form" class="space-y-4">
          <div id="admin-upload-error" class="hidden p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"></div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1.5">Pilih File Foto (Bisa pilih beberapa) *</label>
            <input
              type="file"
              id="upload-file-input"
              multiple
              accept="image/jpeg,image/png,image/webp"
              required
              class="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer bg-slate-800/80 p-2 rounded-xl border border-slate-700"
            />
            <p class="text-[11px] text-slate-500 mt-1">Format: JPG, PNG, atau WebP. Maks 5 MB per file.</p>
          </div>

          <div id="upload-preview-list" class="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800 hidden"></div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Judul / Label Foto</label>
              <input
                type="text"
                id="upload-title-input"
                placeholder="Kosongkan untuk nama file"
                class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Kategori Foto *</label>
              <select id="upload-category-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500">
                <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
                <option value="Pemantauan">Pemantauan</option>
                <option value="Perawatan">Perawatan</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Deskripsi / Keterangan (Caption)</label>
            <textarea
              id="upload-caption-input"
              rows="2"
              placeholder="Catatan tambahan mengenai foto ini..."
              class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-emerald-500"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Tanggal Dokumentasi</label>
              <input
                type="date"
                id="upload-date-input"
                class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500"
              />
            </div>
            <div class="flex flex-col justify-end space-y-1.5 pb-1">
              <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox" id="upload-is-published" checked class="rounded bg-slate-800 text-emerald-500" />
                <span>Publikasikan foto</span>
              </label>
              <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox" id="upload-is-cover" class="rounded bg-slate-800 text-emerald-500" />
                <span>Jadikan Sampul Kawasan</span>
              </label>
            </div>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button type="button" id="btn-cancel-upload" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition">
              Batal
            </button>
            <button type="submit" id="btn-submit-upload" class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg flex items-center gap-1.5">
              <span>🚀</span> Mulai Unggah
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Photo Modal Container -->
    <div id="admin-edit-photo-modal" class="modal-overlay hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <span>✏️</span> Edit Metadata Foto
          </h4>
          <button id="btn-close-edit-modal" class="text-slate-400 hover:text-white p-1 rounded-lg">✕</button>
        </div>

        <form id="admin-edit-photo-form" class="space-y-3.5">
          <input type="hidden" id="edit-photo-id" />
          <div id="admin-edit-error" class="hidden p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs"></div>

          <div class="flex items-center gap-3 p-2 bg-slate-950/70 rounded-xl border border-slate-800">
            <img id="edit-preview-img" src="" alt="" class="w-16 h-16 rounded-lg object-cover" />
            <div class="text-xs text-slate-400 flex-1 overflow-hidden">
              <p id="edit-preview-filename" class="font-mono text-slate-300 truncate">-</p>
              <label class="mt-1.5 inline-block text-[11px] text-emerald-400 hover:underline cursor-pointer">
                Ganti File Foto
                <input type="file" id="edit-replace-file" accept="image/jpeg,image/png,image/webp" class="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Judul Foto</label>
            <input type="text" id="edit-title-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 outline-none focus:border-emerald-500" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Deskripsi / Keterangan</label>
            <textarea id="edit-caption-input" rows="2" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-emerald-500"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
              <select id="edit-category-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-2.5 py-2 outline-none focus:border-emerald-500">
                <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                <option value="Pertumbuhan Tanaman">Pertumbuhan Tanaman</option>
                <option value="Pemantauan">Pemantauan</option>
                <option value="Perawatan">Perawatan</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Tanggal Dokumentasi</label>
              <input type="date" id="edit-date-input" class="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-2.5 py-2 outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div class="flex items-center gap-4 pt-1">
            <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="edit-is-published" class="rounded bg-slate-800 text-emerald-500" />
              <span>Publikasikan foto</span>
            </label>
            <label class="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" id="edit-is-cover" class="rounded bg-slate-800 text-emerald-500" />
              <span>Foto Sampul</span>
            </label>
          </div>

          <div class="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button type="button" id="btn-cancel-edit" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition">
              Batal
            </button>
            <button type="submit" id="btn-submit-edit" class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-lg">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach filter handlers
  const catFilter = document.getElementById('admin-gallery-cat-filter');
  const statusFilter = document.getElementById('admin-gallery-status-filter');
  const searchInput = document.getElementById('admin-gallery-search');

  if (catFilter) {
    catFilter.addEventListener('change', (e) => {
      activeCategoryFilter = e.target.value;
      renderAdminPhotoCards();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      activeStatusFilter = e.target.value;
      renderAdminPhotoCards();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value.toLowerCase().trim();
      renderAdminPhotoCards();
    });
  }

  // Attach modal handlers
  setupUploadModal();
  setupEditModal();

  // Load photos from API
  loadZonePhotos();
}

async function loadZonePhotos() {
  const grid = document.getElementById('admin-gallery-grid');
  if (!grid || !currentZoneData) return;

  try {
    const res = await ApiService.getZonePhotos(currentZoneData.id);
    currentPhotos = res.photos || [];
    renderAdminPhotoCards();
  } catch (err) {
    console.error('Failed to load zone photos:', err);
    grid.innerHTML = `
      <div class="p-6 text-center text-xs text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
        Gagal memuat foto kawasan: ${escapeHtml(err.message)}
      </div>
    `;
  }
}

function renderAdminPhotoCards() {
  const grid = document.getElementById('admin-gallery-grid');
  if (!grid) return;

  const filtered = currentPhotos.filter((p) => {
    if (activeCategoryFilter !== 'all' && p.category !== activeCategoryFilter) return false;
    if (activeStatusFilter === 'published' && !p.is_published) return false;
    if (activeStatusFilter === 'draft' && p.is_published) return false;
    if (currentSearchTerm) {
      const matchTitle = (p.title || '').toLowerCase().includes(currentSearchTerm);
      const matchCaption = (p.caption || '').toLowerCase().includes(currentSearchTerm);
      if (!matchTitle && !matchCaption) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="p-12 text-center text-slate-400 bg-slate-900/30 rounded-2xl border border-slate-800">
        <div class="text-4xl mb-3">📷</div>
        <h5 class="text-sm font-bold text-white mb-1">Belum Ada Foto untuk Kawasan Ini</h5>
        <p class="text-xs text-slate-400 max-w-sm mx-auto mb-4">
          Unggah dokumentasi foto lapangan seperti kondisi lahan, bibit penanaman, atau survei pemantauan berkala.
        </p>
        <button id="btn-empty-upload" class="btn-primary-action btn-sm">
          ➕ Unggah Foto Pertama
        </button>
      </div>
    `;
    const emptyBtn = document.getElementById('btn-empty-upload');
    if (emptyBtn) {
      emptyBtn.addEventListener('click', openUploadModal);
    }
    return;
  }

  grid.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      ${filtered.map((photo) => {
        const imgUrl = photo.file_url || photo.file_path;
        const sizeKb = photo.file_size ? `${Math.round(photo.file_size / 1024)} KB` : '-';
        const docDate = formatDateDisplay(photo.documented_at);

        return `
          <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition shadow-lg">
            <div class="relative aspect-4/3 bg-slate-950 overflow-hidden group">
              <img
                src="${imgUrl}"
                alt="${escapeHtml(photo.alt_text || photo.title)}"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onerror="this.src='/favicon.svg'"
              />
              <div class="absolute top-2 left-2 flex flex-wrap gap-1">
                ${photo.is_cover ? `
                  <span class="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded-md shadow">
                    ⭐ Sampul
                  </span>
                ` : ''}
                <span class="text-[10px] font-semibold ${photo.is_published ? 'bg-emerald-500/90 text-white' : 'bg-slate-700 text-slate-300'} px-2 py-0.5 rounded-md backdrop-blur-sm">
                  ${photo.is_published ? '👁️ Publik' : '🔒 Internal'}
                </span>
              </div>
              <div class="absolute bottom-2 left-2">
                <span class="text-[10px] font-medium bg-black/70 backdrop-blur-sm text-slate-300 px-2 py-0.5 rounded-md">
                  🏷️ ${escapeHtml(photo.category || 'Kondisi Kawasan')}
                </span>
              </div>
            </div>

            <div class="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h5 class="text-xs font-bold text-white line-clamp-1" title="${escapeHtml(photo.title || '-')}">
                  ${escapeHtml(photo.title || 'Foto Tanpa Judul')}
                </h5>
                ${photo.caption ? `
                  <p class="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug" title="${escapeHtml(photo.caption)}">
                    ${escapeHtml(photo.caption)}
                  </p>
                ` : ''}
              </div>

              <div class="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 flex items-center justify-between">
                <span>📅 ${docDate}</span>
                <span>📦 ${sizeKb}</span>
              </div>
            </div>

            <div class="p-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between gap-1">
              ${!photo.is_cover ? `
                <button
                  class="btn-set-cover text-[11px] font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 px-2 py-1 rounded-lg transition"
                  data-id="${photo.id}"
                  title="Jadikan sebagai foto sampul utama kawasan"
                >
                  ⭐ Jadikan Sampul
                </button>
              ` : `
                <span class="text-[11px] text-amber-400 font-bold px-2 py-1">
                  ⭐ Sampul Aktif
                </span>
              `}

              <div class="flex items-center gap-1">
                <button
                  class="btn-edit-photo text-[11px] text-slate-300 hover:text-white hover:bg-slate-800 p-1.5 rounded-lg transition"
                  data-id="${photo.id}"
                  title="Edit metadata foto"
                >
                  ✏️
                </button>
                <button
                  class="btn-delete-photo text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1.5 rounded-lg transition"
                  data-id="${photo.id}"
                  title="Hapus foto ini"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach card action listeners
  grid.querySelectorAll('.btn-set-cover').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const photoId = btn.getAttribute('data-id');
      try {
        btn.textContent = 'Menyimpan...';
        btn.disabled = true;
        await ApiService.setZoneCoverPhoto(currentZoneData.id, photoId);
        EcoToast.updated('Foto berhasil ditetapkan sebagai sampul kawasan.');
        await loadZonePhotos();
      } catch (err) {
        EcoToast.error('✕ Gagal menetapkan foto sampul', err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = '⭐ Jadikan Sampul';
      }
    });
  });

  grid.querySelectorAll('.btn-edit-photo').forEach((btn) => {
    btn.addEventListener('click', () => {
      const photoId = parseInt(btn.getAttribute('data-id'), 10);
      const photo = currentPhotos.find((p) => p.id === photoId);
      if (photo) openEditModal(photo);
    });
  });

  grid.querySelectorAll('.btn-delete-photo').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const photoId = btn.getAttribute('data-id');
      if (confirm('Apakah Anda yakin ingin menghapus foto dokumentasi ini?')) {
        try {
          await ApiService.deleteZonePhoto(currentZoneData.id, photoId);
          EcoToast.deleted('Foto dokumentasi kawasan berhasil dihapus.');
          await loadZonePhotos();
        } catch (err) {
          EcoToast.error('✕ Gagal menghapus foto', err.message);
        }
      }
    });
  });
}

function setupUploadModal() {
  const btnOpen = document.getElementById('btn-admin-upload-photos');
  const modal = document.getElementById('admin-upload-modal');
  const btnClose = document.getElementById('btn-close-upload-modal');
  const btnCancel = document.getElementById('btn-cancel-upload');
  const form = document.getElementById('admin-upload-form');
  const fileInput = document.getElementById('upload-file-input');
  const previewList = document.getElementById('upload-preview-list');

  if (btnOpen) btnOpen.addEventListener('click', openUploadModal);
  if (btnClose) btnClose.addEventListener('click', closeUploadModal);
  if (btnCancel) btnCancel.addEventListener('click', closeUploadModal);

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0 && previewList) {
        previewList.classList.remove('hidden');
        previewList.innerHTML = files.map((f) => `
          <span class="inline-flex items-center gap-1 bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded-md border border-slate-700">
            📄 ${escapeHtml(f.name)} (${Math.round(f.size / 1024)} KB)
          </span>
        `).join('');
      } else if (previewList) {
        previewList.classList.add('hidden');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const errBox = document.getElementById('admin-upload-error');
      const submitBtn = document.getElementById('btn-submit-upload');
      if (errBox) errBox.classList.add('hidden');

      const files = fileInput.files;
      if (!files || files.length === 0) {
        if (errBox) {
          errBox.textContent = 'Pilih setidaknya satu file foto.';
          errBox.classList.remove('hidden');
        }
        return;
      }

      const formData = new FormData();
      Array.from(files).forEach((f) => {
        formData.append('photos[]', f);
      });

      formData.append('title', document.getElementById('upload-title-input').value.trim());
      formData.append('category', document.getElementById('upload-category-input').value);
      formData.append('caption', document.getElementById('upload-caption-input').value.trim());
      const uploadDocAt = parseDateForPayload(document.getElementById('upload-date-input').value);
      if (uploadDocAt) formData.append('documented_at', uploadDocAt);
      formData.append('is_published', document.getElementById('upload-is-published').checked ? '1' : '0');
      formData.append('is_cover', document.getElementById('upload-is-cover').checked ? '1' : '0');

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="animate-spin">⏳</span> Mengunggah...';

      try {
        const uploadRes = await ApiService.uploadZonePhotos(currentZoneData.id, formData);
        closeUploadModal();
        form.reset();
        if (previewList) previewList.classList.add('hidden');
        EcoToast.uploaded(uploadRes?.message || 'Foto kawasan dan metadata berhasil diunggah.');
        await loadZonePhotos();
      } catch (err) {
        if (errBox) {
          errBox.textContent = err.message || 'Gagal mengunggah foto.';
          errBox.classList.remove('hidden');
        }
        EcoToast.error('✕ Gagal mengunggah foto', err.message || 'Periksa file foto dan coba lagi.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>🚀</span> Mulai Unggah';
      }
    });
  }
}

function openUploadModal() {
  const modal = document.getElementById('admin-upload-modal');
  const dateInput = document.getElementById('upload-date-input');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().substring(0, 10);
  }
  if (modal) modal.classList.remove('hidden');
}

function closeUploadModal() {
  const modal = document.getElementById('admin-upload-modal');
  if (modal) modal.classList.add('hidden');
}

function setupEditModal() {
  const modal = document.getElementById('admin-edit-photo-modal');
  const btnClose = document.getElementById('btn-close-edit-modal');
  const btnCancel = document.getElementById('btn-cancel-edit');
  const form = document.getElementById('admin-edit-photo-form');
  const replaceFileInput = document.getElementById('edit-replace-file');

  if (btnClose) btnClose.addEventListener('click', closeEditModal);
  if (btnCancel) btnCancel.addEventListener('click', closeEditModal);

  if (replaceFileInput) {
    replaceFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const previewImg = document.getElementById('edit-preview-img');
        const previewFilename = document.getElementById('edit-preview-filename');
        if (previewImg) previewImg.src = URL.createObjectURL(file);
        if (previewFilename) previewFilename.textContent = `File Baru: ${file.name}`;
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const photoId = document.getElementById('edit-photo-id').value;
      const submitBtn = document.getElementById('btn-submit-edit');
      const errBox = document.getElementById('admin-edit-error');
      if (errBox) errBox.classList.add('hidden');

      const formData = new FormData();
      formData.append('title', document.getElementById('edit-title-input').value.trim());
      formData.append('caption', document.getElementById('edit-caption-input').value.trim());
      formData.append('category', document.getElementById('edit-category-input').value);
      const editDocAt = parseDateForPayload(document.getElementById('edit-date-input').value);
      if (editDocAt) formData.append('documented_at', editDocAt);
      formData.append('is_published', document.getElementById('edit-is-published').checked ? '1' : '0');
      formData.append('is_cover', document.getElementById('edit-is-cover').checked ? '1' : '0');

      if (replaceFileInput && replaceFileInput.files.length > 0) {
        formData.append('photo', replaceFileInput.files[0]);
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Menyimpan...';

      try {
        const updateRes = await ApiService.updateZonePhoto(currentZoneData.id, photoId, formData);
        closeEditModal();
        EcoToast.updated(updateRes?.message || 'Metadata foto kawasan berhasil diperbarui.');
        await loadZonePhotos();
      } catch (err) {
        if (errBox) {
          errBox.textContent = err.message || 'Gagal memperbarui metadata foto.';
          errBox.classList.remove('hidden');
        }
        EcoToast.error('✕ Gagal memperbarui foto', err.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Simpan Perubahan';
      }
    });
  }
}

function openEditModal(photo) {
  const modal = document.getElementById('admin-edit-photo-modal');
  if (!modal) return;

  document.getElementById('edit-photo-id').value = photo.id;
  document.getElementById('edit-title-input').value = photo.title || '';
  document.getElementById('edit-caption-input').value = photo.caption || '';
  document.getElementById('edit-category-input').value = photo.category || 'Kondisi Kawasan';
  document.getElementById('edit-date-input').value = toDateInputValue(photo.documented_at);
  document.getElementById('edit-is-published').checked = Boolean(photo.is_published);
  document.getElementById('edit-is-cover').checked = Boolean(photo.is_cover);

  const previewImg = document.getElementById('edit-preview-img');
  const previewFilename = document.getElementById('edit-preview-filename');
  if (previewImg) previewImg.src = photo.file_url || photo.file_path;
  if (previewFilename) previewFilename.textContent = photo.title || `Foto #${photo.id}`;

  const replaceFileInput = document.getElementById('edit-replace-file');
  if (replaceFileInput) replaceFileInput.value = '';

  const errBox = document.getElementById('admin-edit-error');
  if (errBox) errBox.classList.add('hidden');

  modal.classList.remove('hidden');
}

function closeEditModal() {
  const modal = document.getElementById('admin-edit-photo-modal');
  if (modal) modal.classList.add('hidden');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
