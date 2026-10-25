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
let stagedZoneFiles = [];
let stagedCoverIndex = 0;

function slugifyText(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatFileSize(bytes) {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

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
    <div id="admin-upload-modal" class="admin-modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="upload-modal-title">
      <div class="admin-modal-box" style="max-width: 680px; width: 95%;">
        <div class="admin-modal-header">
          <h3 id="upload-modal-title" style="margin: 0; font-size: 16px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px;">
            <span>📤</span> Unggah Foto Dokumentasi Kawasan
          </h3>
          <button type="button" id="btn-close-upload-modal" class="icon-btn-sm" title="Tutup Popup">✕</button>
        </div>

        <form id="admin-upload-form" style="display: flex; flex-direction: column; margin: 0; min-height: 0;">
          <div class="admin-modal-body" style="display: flex; flex-direction: column; gap: 16px; max-height: calc(85vh - 130px); overflow-y: auto; padding-right: 6px;">
            <div id="admin-upload-error" class="hidden alert-box error" style="padding: 10px 14px; font-size: 12px; border-radius: 8px;"></div>

            <!-- Path Structure Preview Banner -->
            <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 78, 59, 0.16)); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 12px 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                <span style="font-size: 12px; font-weight: 700; color: #34d399; display: flex; align-items: center; gap: 6px;">
                  <span>📁</span> Struktur Jalur Penyimpanan Berkas:
                </span>
                <span style="font-size: 10.5px; font-weight: 600; color: #94a3b8; background: rgba(0, 0, 0, 0.4); padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(255, 255, 255, 0.08);">
                  Kategori / Judul Foto / Label
                </span>
              </div>
              <div id="upload-live-path-preview" style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11.5px; color: #6ee7b7; background: rgba(0, 0, 0, 0.55); padding: 7px 12px; border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.25); overflow-x: auto; white-space: nowrap; word-break: break-all;">
                /storage/zones/.../photos/kondisi-kawasan/...
              </div>
              <p style="margin: 6px 0 0; font-size: 11px; color: #94a3b8;">
                Berkas disimpan ke direktori kategori dan diberi penamaan terstruktur berdasarkan label judul masing-masing foto.
              </p>
            </div>

            <!-- Kategori Foto (Global for this upload batch) -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Kategori Foto Dokumentasi <span style="color: #ef4444;">*</span>
              </label>
              <select
                id="upload-category-input"
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
              >
                <option value="Lanskap & Topografi">Lanskap & Topografi</option>
                <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                <option value="Bibit & Spesies">Bibit & Spesies</option>
                <option value="Pertumbuhan Vegetasi">Pertumbuhan Vegetasi</option>
                <option value="Pemantauan">Pemantauan</option>
                <option value="Perawatan">Perawatan</option>
                <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                <option value="Fasilitas">Fasilitas</option>
                <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
              </select>
            </div>

            <!-- File Upload Dropzone -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="font-size: 12.5px; font-weight: 600; color: #e2e8f0;">
                  Pilih Berkas Foto (Bisa pilih lebih dari 1 foto sekaligus) <span style="color: #ef4444;">*</span>
                </label>
                <span id="upload-dropzone-counter" style="font-size: 11.5px; color: #34d399; font-weight: 600;">0 berkas dipilih</span>
              </div>
              <div id="upload-dropzone" style="position: relative; border: 2px dashed rgba(16, 185, 129, 0.4); border-radius: 12px; background: rgba(16, 185, 129, 0.05); padding: 22px 16px; text-align: center; transition: all 0.2s ease; cursor: pointer;">
                <input
                  type="file"
                  id="upload-file-input"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  style="position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; z-index: 2;"
                />
                <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; pointer-events: none;">
                  <span style="font-size: 32px;">📁</span>
                  <span style="font-size: 13.5px; font-weight: 600; color: #6ee7b7;">Klik atau seret foto-foto ke area ini</span>
                  <span style="font-size: 11px; color: var(--clr-text-muted);">Format: JPG, PNG, WebP (Maksimal 5 MB per berkas foto)</span>
                </div>
              </div>
            </div>

            <!-- Staged Photos List (Cards) -->
            <div id="upload-staged-container" class="hidden" style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 4px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                <span style="font-size: 12.5px; font-weight: 700; color: #e2e8f0; display: flex; align-items: center; gap: 6px;">
                  <span>📸</span> Foto Siap Diunggah (<span id="upload-staged-count-num">0</span>)
                </span>
                <div style="display: flex; gap: 8px;">
                  <button type="button" id="btn-add-more-photos" class="btn-secondary-action" style="padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; gap: 4px; cursor: pointer;">
                    <span>➕</span> Tambah Foto
                  </button>
                  <button type="button" id="btn-clear-staged-photos" class="btn-secondary-action" style="padding: 4px 10px; font-size: 11px; color: #f87171; border-color: rgba(239, 68, 68, 0.3); cursor: pointer;">
                    Bersihkan
                  </button>
                </div>
              </div>

              <!-- Staged Cards List Container -->
              <div id="upload-staged-list" style="display: flex; flex-direction: column; gap: 10px; max-height: 240px; overflow-y: auto; padding-right: 4px;">
                <!-- Rendered dynamically -->
              </div>
            </div>

            <!-- Deskripsi / Keterangan (Caption) -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Deskripsi / Keterangan Foto (Caption)
              </label>
              <textarea
                id="upload-caption-input"
                rows="2"
                placeholder="Tulis uraian konteks dokumentasi kawasan ini..."
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; resize: vertical; box-sizing: border-box;"
              ></textarea>
            </div>

            <!-- Tanggal & Checkboxes -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: start;">
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                  Tanggal Dokumentasi Lapangan
                </label>
                <input
                  type="date"
                  id="upload-date-input"
                  style="width: 100%; padding: 9px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
                />
              </div>

              <!-- Checkbox panel -->
              <div style="padding: 10px 14px; background: rgba(0, 0, 0, 0.28); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; display: flex; flex-direction: column; gap: 8px; margin-top: 22px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                  <input type="checkbox" id="upload-is-published" checked style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                  <span>Publikasikan ke Galeri Publik</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                  <input type="checkbox" id="upload-is-cover" checked style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                  <span>Terapkan Pilihan Foto Sampul</span>
                </label>
              </div>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" id="btn-cancel-upload" class="btn-secondary-action btn-sm">Batal</button>
            <button type="submit" id="btn-submit-upload" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
              <span>🚀</span> <span id="upload-submit-btn-text">Mulai Unggah</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Photo Modal Container -->
    <div id="admin-edit-photo-modal" class="admin-modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
      <div class="admin-modal-box" style="max-width: 580px;">
        <div class="admin-modal-header">
          <h3 id="edit-modal-title" style="margin: 0; font-size: 16px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 8px;">
            <span>✏️</span> Edit Metadata Foto Dokumentasi
          </h3>
          <button type="button" id="btn-close-edit-modal" class="icon-btn-sm" title="Tutup Popup">✕</button>
        </div>

        <form id="admin-edit-photo-form" style="display: flex; flex-direction: column; margin: 0; min-height: 0;">
          <input type="hidden" id="edit-photo-id" />
          <div class="admin-modal-body" style="display: flex; flex-direction: column; gap: 16px; max-height: calc(85vh - 140px); overflow-y: auto;">
            <div id="admin-edit-error" class="hidden alert-box error" style="padding: 10px 14px; font-size: 12px; border-radius: 8px;"></div>

            <!-- Preview & Replace File -->
            <div style="display: flex; align-items: center; gap: 14px; padding: 12px 14px; background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(16, 185, 129, 0.22); border-radius: 12px;">
              <img id="edit-preview-img" src="" alt="" style="width: 68px; height: 68px; border-radius: 10px; object-fit: cover; border: 1px solid rgba(255, 255, 255, 0.15); flex-shrink: 0;" />
              <div style="font-size: 12.5px; color: var(--clr-text-muted); flex: 1; min-width: 0;">
                <p id="edit-preview-filename" style="font-family: monospace; font-size: 12px; color: #e2e8f0; font-weight: 600; margin-bottom: 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">-</p>
                <label style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 600; color: #34d399; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); padding: 5px 12px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease;">
                  <span>🔄 Ganti File Foto</span>
                  <input type="file" id="edit-replace-file" accept="image/jpeg,image/png,image/webp" style="display: none;" />
                </label>
              </div>
            </div>

            <!-- Judul Foto -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Judul Foto / Label
              </label>
              <input
                type="text"
                id="edit-title-input"
                placeholder="Masukkan judul foto dokumentasi..."
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
              />
            </div>

            <!-- Deskripsi Foto -->
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                Deskripsi / Keterangan Foto (Caption)
              </label>
              <textarea
                id="edit-caption-input"
                rows="2"
                placeholder="Deskripsi dokumentasi lapangan..."
                style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; resize: vertical; box-sizing: border-box;"
              ></textarea>
            </div>

            <!-- Two-Column: Kategori & Tanggal -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                  Kategori Foto
                </label>
                <select
                  id="edit-category-input"
                  style="width: 100%; padding: 10px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
                >
                  <option value="Lanskap & Topografi">Lanskap & Topografi</option>
                  <option value="Kegiatan Penanaman">Kegiatan Penanaman</option>
                  <option value="Bibit & Spesies">Bibit & Spesies</option>
                  <option value="Pertumbuhan Vegetasi">Pertumbuhan Vegetasi</option>
                  <option value="Pemantauan">Pemantauan</option>
                  <option value="Perawatan">Perawatan</option>
                  <option value="Kondisi Kawasan">Kondisi Kawasan</option>
                  <option value="Fasilitas">Fasilitas</option>
                  <option value="Dokumentasi Lainnya">Dokumentasi Lainnya</option>
                </select>
              </div>

              <div>
                <label style="display: block; font-size: 12.5px; font-weight: 600; color: #e2e8f0; margin-bottom: 6px;">
                  Tanggal Dokumentasi
                </label>
                <input
                  type="date"
                  id="edit-date-input"
                  style="width: 100%; padding: 9px 14px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 10px; color: #ffffff; font-size: 13px; outline: none; box-sizing: border-box;"
                />
              </div>
            </div>

            <!-- Checkbox panel -->
            <div style="padding: 12px 14px; background: rgba(0, 0, 0, 0.28); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; display: flex; flex-direction: column; gap: 8px;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                <input type="checkbox" id="edit-is-published" style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                <span>Publikasikan Foto di Galeri Publik</span>
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #e2e8f0; cursor: pointer; user-select: none;">
                <input type="checkbox" id="edit-is-cover" style="width: 16px; height: 16px; accent-color: #10b981; cursor: pointer;" />
                <span>Jadikan Foto Sampul Utama Kawasan</span>
              </label>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" id="btn-cancel-edit" class="btn-secondary-action btn-sm">Batal</button>
            <button type="submit" id="btn-submit-edit" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
              <span>💾</span> Simpan Perubahan
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

function updateLivePathPreview() {
  const previewEl = document.getElementById('upload-live-path-preview');
  if (!previewEl) return;

  const categoryInput = document.getElementById('upload-category-input');
  const categoryName = categoryInput ? categoryInput.value : 'Kondisi Kawasan';
  const categorySlug = slugifyText(categoryName) || 'kondisi-kawasan';
  const zoneId = currentZoneData?.id || 'KW-01';

  let sampleTitleSlug = 'foto-dokumentasi';
  if (stagedZoneFiles.length > 0) {
    const activeItem = (stagedCoverIndex >= 0 && stagedCoverIndex < stagedZoneFiles.length)
      ? stagedZoneFiles[stagedCoverIndex]
      : stagedZoneFiles[0];
    sampleTitleSlug = slugifyText(activeItem.title) || 'foto-kawasan';
  }

  const now = new Date();
  const dateStr = now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0') + '_' +
    String(now.getHours()).padStart(2, '0') +
    String(now.getMinutes()).padStart(2, '0');

  previewEl.textContent = `/storage/zones/${zoneId}/photos/${categorySlug}/${sampleTitleSlug}_${dateStr}_xxxxxx.jpg`;
}

function renderStagedUploadList() {
  const container = document.getElementById('upload-staged-container');
  const listEl = document.getElementById('upload-staged-list');
  const countNum = document.getElementById('upload-staged-count-num');
  const dropzoneCounter = document.getElementById('upload-dropzone-counter');
  const submitText = document.getElementById('upload-submit-btn-text');

  if (!container || !listEl) return;

  const count = stagedZoneFiles.length;
  if (countNum) countNum.textContent = count;
  if (dropzoneCounter) dropzoneCounter.textContent = count > 0 ? `${count} berkas dipilih` : '0 berkas dipilih';
  if (submitText) submitText.textContent = count > 0 ? `Unggah ${count} Foto` : 'Mulai Unggah';

  if (count === 0) {
    container.classList.add('hidden');
    listEl.innerHTML = '';
    return;
  }

  container.classList.remove('hidden');

  listEl.innerHTML = stagedZoneFiles.map((item, idx) => {
    const isCover = (idx === stagedCoverIndex);
    return `
      <div class="staged-card" data-index="${idx}" style="display: flex; align-items: center; gap: 12px; padding: 10px 12px; background: rgba(15, 23, 42, 0.7); border: 1px solid ${isCover ? 'rgba(16, 185, 129, 0.6)' : 'rgba(255, 255, 255, 0.1)'}; border-radius: 10px; transition: all 0.2s ease;">
        <img src="${item.previewUrl}" alt="Preview" style="width: 58px; height: 58px; border-radius: 8px; object-fit: cover; flex-shrink: 0; border: 1px solid rgba(255, 255, 255, 0.15);" />
        
        <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px;">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <span style="font-size: 11px; color: #94a3b8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHtml(item.file.name)}">
              📄 ${escapeHtml(item.file.name)} (${formatFileSize(item.file.size)})
            </span>
            <span style="font-size: 10px; font-family: monospace; color: #34d399; background: rgba(16, 185, 129, 0.12); padding: 1px 6px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.25);">
              #${idx + 1}
            </span>
          </div>

          <div style="position: relative;">
            <input
              type="text"
              class="staged-title-input"
              data-index="${idx}"
              value="${escapeHtml(item.title)}"
              placeholder="Judul / Label Foto (otomatis jadi nama berkas)"
              style="width: 100%; padding: 6px 10px; background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 6px; color: #ffffff; font-size: 12px; outline: none; box-sizing: border-box;"
            />
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px; flex-shrink: 0;">
          <button
            type="button"
            class="staged-cover-btn"
            data-index="${idx}"
            style="padding: 4px 8px; font-size: 11px; font-weight: 600; border-radius: 6px; cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 4px; ${isCover ? 'background: #10b981; color: #022c22; border: 1px solid #34d399;' : 'background: rgba(255, 255, 255, 0.06); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.12);'}"
            title="${isCover ? 'Foto ini terpilih sebagai sampul utama kawasan' : 'Pilih foto ini sebagai sampul kawasan'}"
          >
            ${isCover ? '★ Sampul' : '☆ Sampul'}
          </button>
          <button
            type="button"
            class="staged-remove-btn"
            data-index="${idx}"
            title="Hapus foto dari antrean unggah"
            style="color: #f87171; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 2px 7px; font-size: 11.5px; cursor: pointer;"
          >
            ✕
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Attach event listeners for staged item cards
  listEl.querySelectorAll('.staged-title-input').forEach((input) => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'), 10);
      if (!isNaN(idx) && stagedZoneFiles[idx]) {
        stagedZoneFiles[idx].title = e.target.value;
        updateLivePathPreview();
      }
    });
  });

  listEl.querySelectorAll('.staged-cover-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        stagedCoverIndex = idx;
        const isCoverCheckbox = document.getElementById('upload-is-cover');
        if (isCoverCheckbox) isCoverCheckbox.checked = true;
        renderStagedUploadList();
        updateLivePathPreview();
      }
    });
  });

  listEl.querySelectorAll('.staged-remove-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      if (!isNaN(idx) && stagedZoneFiles[idx]) {
        if (stagedZoneFiles[idx].previewUrl) {
          URL.revokeObjectURL(stagedZoneFiles[idx].previewUrl);
        }
        stagedZoneFiles.splice(idx, 1);
        if (stagedCoverIndex >= stagedZoneFiles.length) {
          stagedCoverIndex = Math.max(0, stagedZoneFiles.length - 1);
        }
        renderStagedUploadList();
        updateLivePathPreview();
      }
    });
  });
}

function addFilesToStaging(fileList) {
  if (!fileList || fileList.length === 0) return;
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxBytes = 5 * 1024 * 1024;

  Array.from(fileList).forEach((file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    const isImage = allowedMimes.includes(file.type) || ['jpg', 'jpeg', 'png', 'webp'].includes(ext);
    if (!isImage) {
      EcoToast.error('Berkas Ditolak', `${file.name} bukan format gambar JPG, PNG, atau WebP.`);
      return;
    }
    if (file.size > maxBytes) {
      EcoToast.error('Ukuran Terlalu Besar', `${file.name} melebihi batas 5 MB.`);
      return;
    }

    const rawName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const cleanTitle = rawName.replace(/[-_]+/g, ' ').trim();

    stagedZoneFiles.push({
      file,
      title: cleanTitle,
      previewUrl: URL.createObjectURL(file),
    });
  });

  if (stagedZoneFiles.length > 0 && (stagedCoverIndex < 0 || stagedCoverIndex >= stagedZoneFiles.length)) {
    stagedCoverIndex = 0;
  }

  renderStagedUploadList();
  updateLivePathPreview();
}

function cleanupStagedFiles() {
  if (stagedZoneFiles && stagedZoneFiles.length > 0) {
    stagedZoneFiles.forEach((item) => {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
  }
  stagedZoneFiles = [];
  stagedCoverIndex = 0;
  const fileInput = document.getElementById('upload-file-input');
  if (fileInput) fileInput.value = '';
}

function setupUploadModal() {
  const btnOpen = document.getElementById('btn-admin-upload-photos');
  const modal = document.getElementById('admin-upload-modal');
  const btnClose = document.getElementById('btn-close-upload-modal');
  const btnCancel = document.getElementById('btn-cancel-upload');
  const form = document.getElementById('admin-upload-form');
  const fileInput = document.getElementById('upload-file-input');
  const dropzone = document.getElementById('upload-dropzone');
  const categoryInput = document.getElementById('upload-category-input');
  const btnAddMore = document.getElementById('btn-add-more-photos');
  const btnClearStaged = document.getElementById('btn-clear-staged-photos');

  if (btnOpen) btnOpen.addEventListener('click', openUploadModal);
  if (btnClose) btnClose.addEventListener('click', closeUploadModal);
  if (btnCancel) btnCancel.addEventListener('click', closeUploadModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeUploadModal();
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        addFilesToStaging(e.target.files);
        fileInput.value = '';
      }
    });
  }

  if (dropzone) {
    ['dragenter', 'dragover'].forEach((evt) => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.style.borderColor = '#10b981';
        dropzone.style.background = 'rgba(16, 185, 129, 0.14)';
      });
    });
    ['dragleave', 'drop'].forEach((evt) => {
      dropzone.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        dropzone.style.background = 'rgba(16, 185, 129, 0.05)';
      });
    });
    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length > 0) {
        addFilesToStaging(dt.files);
      }
    });
  }

  if (btnAddMore && fileInput) {
    btnAddMore.addEventListener('click', () => {
      fileInput.click();
    });
  }

  if (btnClearStaged) {
    btnClearStaged.addEventListener('click', () => {
      cleanupStagedFiles();
      renderStagedUploadList();
      updateLivePathPreview();
    });
  }

  if (categoryInput) {
    categoryInput.addEventListener('change', () => {
      updateLivePathPreview();
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const errBox = document.getElementById('admin-upload-error');
      const submitBtn = document.getElementById('btn-submit-upload');
      const submitText = document.getElementById('upload-submit-btn-text');
      if (errBox) errBox.classList.add('hidden');

      if (stagedZoneFiles.length === 0) {
        if (errBox) {
          errBox.textContent = 'Pilih setidaknya satu file foto untuk diunggah.';
          errBox.classList.remove('hidden');
        }
        return;
      }

      const formData = new FormData();
      stagedZoneFiles.forEach((item) => {
        formData.append('photos[]', item.file);
        formData.append('titles[]', (item.title || '').trim());
      });

      formData.append('category', categoryInput ? categoryInput.value : 'Kondisi Kawasan');

      const isCoverChecked = document.getElementById('upload-is-cover')?.checked;
      if (isCoverChecked && stagedCoverIndex >= 0 && stagedCoverIndex < stagedZoneFiles.length) {
        formData.append('cover_index', String(stagedCoverIndex));
        formData.append('is_cover', '1');
      } else {
        formData.append('is_cover', isCoverChecked ? '1' : '0');
      }

      const captionVal = document.getElementById('upload-caption-input')?.value.trim() || '';
      if (captionVal) formData.append('caption', captionVal);

      const uploadDocAt = parseDateForPayload(document.getElementById('upload-date-input')?.value);
      if (uploadDocAt) formData.append('documented_at', uploadDocAt);

      formData.append('is_published', document.getElementById('upload-is-published')?.checked ? '1' : '0');

      submitBtn.disabled = true;
      if (submitText) submitText.textContent = `Mengunggah ${stagedZoneFiles.length} Foto...`;

      try {
        const uploadRes = await ApiService.uploadZonePhotos(currentZoneData.id, formData);
        closeUploadModal();
        form.reset();
        EcoToast.uploaded(uploadRes?.message || `${stagedZoneFiles.length} foto kawasan berhasil diunggah.`);
        await loadZonePhotos();
      } catch (err) {
        if (errBox) {
          errBox.textContent = err.message || 'Gagal mengunggah foto.';
          errBox.classList.remove('hidden');
        }
        EcoToast.error('✕ Gagal mengunggah foto', err.message || 'Periksa file foto dan coba lagi.');
      } finally {
        submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Mulai Unggah';
      }
    });
  }
}

function openUploadModal() {
  cleanupStagedFiles();
  const modal = document.getElementById('admin-upload-modal');
  const dateInput = document.getElementById('upload-date-input');
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().substring(0, 10);
  }
  renderStagedUploadList();
  updateLivePathPreview();
  if (modal) modal.classList.remove('hidden');
}

function closeUploadModal() {
  cleanupStagedFiles();
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
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeEditModal();
    });
  }

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
