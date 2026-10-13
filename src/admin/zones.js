/**
 * Modul Manajemen Kawasan / Lahan Penanaman
 * Mengelola beberapa kawasan: Daftar, Tambah/Edit, Detail 8 Tab, Galeri, Hubungan Panorama.
 */
import { ApiService } from '../services/api.js';
import { renderAdminZoneGallery } from './zoneGallery.js';
import { EcoToast } from '../utils/toast.js';
import { toDateInputValue, formatDateDisplay, parseDateForPayload } from '../utils/date.js';

let currentZoneTab = 'list';
let cachedZones = [];
let selectedZoneId = null;
let selectedZoneDetail = null;

export async function initZonesModule({ scenes = [], onNavigateToTour, onOpenHotspotEditor } = {}) {
  const container = document.getElementById('admin-zones-content');
  if (!container) return;

  renderZonesLayout(container);
  await loadZonesList();
}

export async function switchZoneSubTab(tabName, zoneId = null, initialDetailTab = 'tab-ringkasan') {
  currentZoneTab = tabName;
  if (zoneId) selectedZoneId = zoneId;

  const container = document.getElementById('admin-zones-content');
  if (!container) return;

  if (!document.getElementById('zone-pane-container')) {
    renderZonesLayout(container);
  }

  container.querySelectorAll('.zone-nav-tab').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-zone-tab') === tabName);
  });

  if (tabName === 'list') {
    if (cachedZones.length === 0) {
      await loadZonesList();
    } else {
      renderZonesListView();
    }
  } else if (tabName === 'create') {
    renderZoneFormView(null);
  } else if (tabName === 'detail' && selectedZoneId) {
    loadAndRenderZoneDetail(selectedZoneId, initialDetailTab);
  } else if (tabName === 'gallery') {
    if (cachedZones.length === 0) {
      await loadZonesList();
    }
    renderZoneGalleryView();
  }
}

function renderZonesLayout(container) {
  container.innerHTML = `
    <div class="admin-section-header" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 20px; font-weight: 700; color: #fff;">
            <span style="font-size: 22px;">🏞️</span> Manajemen Kawasan / Lahan Penanaman
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Kelola multiple kawasan konservasi dan penanaman pohon, batas deskriptif, luasan lahan (ha/m²), dan tautan Virtual Tour 360°.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button id="btn-zone-add-new" class="btn-primary-action btn-sm">
            ➕ Tambah Kawasan Baru
          </button>
        </div>
      </div>
    </div>

    <!-- Zones Sub-navigation Bar -->
    <div class="zone-subtabs" style="display: flex; gap: 6px; border-bottom: 1px solid var(--clr-border); padding-bottom: 10px; margin-bottom: 20px; overflow-x: auto;">
      <button class="zone-nav-tab active" data-zone-tab="list">📋 Daftar Kawasan / Lahan</button>
      <button class="zone-nav-tab" data-zone-tab="create">➕ Formulir Tambah Kawasan</button>
      <button class="zone-nav-tab" data-zone-tab="gallery">🖼️ Galeri Foto Kawasan</button>
      <button class="zone-nav-tab hidden" id="tab-nav-zone-detail" data-zone-tab="detail">🔍 Detail Kawasan</button>
    </div>

    <!-- Zone Pane Dynamic Container -->
    <div id="zone-pane-container" style="min-height: 400px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat data kawasan...
      </div>
    </div>
  `;

  // Bind sub-tabs
  container.querySelectorAll('.zone-nav-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-zone-tab');
      switchZoneSubTab(target);
    });
  });

  const btnAdd = container.querySelector('#btn-zone-add-new');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => {
      switchZoneSubTab('create');
    });
  }
}

async function loadZonesList() {
  const pane = document.getElementById('zone-pane-container');
  if (!pane) return;

  try {
    const res = await ApiService.getZones({ sort_by: 'created_at', sort_dir: 'asc' });
    cachedZones = res.zones || [];
    renderZonesListView();
  } catch (err) {
    pane.innerHTML = `
      <div class="alert-error" style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #fca5a5;">
        ❌ Gagal memuat data kawasan: ${err.message}
        <button id="btn-retry-zones" class="btn-secondary-action btn-sm" style="margin-left: 12px;">Coba Lagi</button>
      </div>
    `;
    const btnRetry = document.getElementById('btn-retry-zones');
    if (btnRetry) btnRetry.addEventListener('click', loadZonesList);
  }
}

function renderZonesListView() {
  const pane = document.getElementById('zone-pane-container');
  if (!pane) return;

  const totalZones = cachedZones.length;
  const totalAreaHa = cachedZones.reduce((sum, z) => sum + (parseFloat(z.area_in_ha) || 0), 0);
  const totalSeedlings = cachedZones.reduce((sum, z) => sum + (parseInt(z.total_initial_seedlings) || 0), 0);

  pane.innerHTML = `
    <!-- Top Filter & Search Bar -->
    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; background: var(--clr-surface); padding: 14px 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; flex: 1;">
        <input type="text" id="zone-search-input" class="form-input" placeholder="🔍 Cari nama, kode, lokasi, penanggung jawab..." style="max-width: 300px; padding: 7px 12px; font-size: 13px;" />
        <select id="zone-filter-status" class="form-select" style="padding: 7px 12px; font-size: 13px;">
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="preparation">Persiapan</option>
          <option value="monitoring">Pemantauan</option>
          <option value="completed">Selesai</option>
        </select>
        <select id="zone-filter-archived" class="form-select" style="padding: 7px 12px; font-size: 13px;">
          <option value="false">Kawasan Aktif</option>
          <option value="true">Diarsipkan</option>
        </select>
      </div>

      <!-- Quick Metrics Pill -->
      <div style="display: flex; gap: 16px; font-size: 12px; color: var(--clr-text-muted);">
        <div>Total Kawasan: <strong style="color: #fff;">${totalZones}</strong></div>
        <div>Total Luas: <strong style="color: var(--clr-primary);">${totalAreaHa.toFixed(2)} Ha</strong></div>
        <div>Total Bibit: <strong style="color: #fff;">${totalSeedlings.toLocaleString('id-ID')} Batang</strong></div>
      </div>
    </div>

    <!-- Zones List / Cards -->
    <div id="zones-table-wrapper" class="table-responsive">
      ${renderZonesTableHtml(cachedZones)}
    </div>
  `;

  // Attach search and filter event listeners
  const searchInput = document.getElementById('zone-search-input');
  const filterStatus = document.getElementById('zone-filter-status');
  const filterArchived = document.getElementById('zone-filter-archived');

  const handleFilter = async () => {
    const q = searchInput.value.trim();
    const st = filterStatus.value;
    const arch = filterArchived.value;
    try {
      const res = await ApiService.getZones({
        search: q,
        status: st,
        archived: arch,
      });
      cachedZones = res.zones || [];
      const wrapper = document.getElementById('zones-table-wrapper');
      if (wrapper) wrapper.innerHTML = renderZonesTableHtml(cachedZones);
      bindZoneTableActions();
    } catch (e) {
      console.error(e);
    }
  };

  if (searchInput) searchInput.addEventListener('input', debounce(handleFilter, 300));
  if (filterStatus) filterStatus.addEventListener('change', handleFilter);
  if (filterArchived) filterArchived.addEventListener('change', handleFilter);

  bindZoneTableActions();
}

function renderZonesTableHtml(zones) {
  if (!zones || zones.length === 0) {
    return `
      <div style="text-align: center; padding: 48px 20px; background: var(--clr-surface); border-radius: var(--radius-md); border: 1px dashed var(--clr-border);">
        <div style="font-size: 40px; margin-bottom: 12px;">🏞️</div>
        <h4 style="color: #fff; margin-bottom: 6px;">Belum Ada Kawasan / Lahan Penanaman Terdaftar</h4>
        <p style="color: var(--clr-text-muted); font-size: 13px; max-width: 480px; margin: 0 auto 18px;">
          Sistem mendukung pengelolaan beberapa kawasan penanaman secara terintegrasi. Tambahkan kawasan penanaman pertama Anda.
        </p>
        <button id="btn-empty-add-zone" class="btn-primary-action btn-sm">➕ Tambah Kawasan Sekarang</button>
      </div>
    `;
  }

  const rows = zones.map((z) => {
    const statusBadges = {
      active: '<span class="badge-status-published">Aktif</span>',
      preparation: '<span class="badge-status-draft">Persiapan</span>',
      monitoring: '<span class="badge-status-draft" style="color:#38bdf8;border-color:rgba(56,189,248,0.3)">Pemantauan</span>',
      completed: '<span class="badge-status-inactive">Selesai</span>',
    };
    const badge = statusBadges[z.status] || z.status;
    const survivalText = z.survival_rate !== null ? `${z.survival_rate}%` : '<span style="color:var(--clr-text-dim)">Belum cukup</span>';

    return `
      <tr data-zone-id="${z.id}" style="border-bottom: 1px solid var(--clr-border-subtle);">
        <td style="padding: 12px 14px;">
          <span style="font-family: monospace; font-size: 12px; background: rgba(16,185,129,0.1); color: var(--clr-primary); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(16,185,129,0.2);">
            ${z.zone_code}
          </span>
        </td>
        <td style="padding: 12px 14px;">
          <div style="font-weight: 600; color: #fff; font-size: 14px;">${escapeHtml(z.name)}</div>
          <div style="font-size: 11px; color: var(--clr-text-muted); margin-top: 2px;">
            ${escapeHtml(z.category || 'Silvikultur')} • ${escapeHtml(z.city || z.province || 'Aceh')}
          </div>
        </td>
        <td style="padding: 12px 14px;">
          <div style="font-weight: 600; color: var(--clr-primary); font-size: 13px;">${z.area_size} ${z.area_unit}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">(±${(parseFloat(z.area_in_ha) || 0).toFixed(2)} Ha)</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; color: #fff; font-size: 13px;">${z.activities_count || 0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">kegiatan</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; color: #fff; font-size: 13px;">${(z.total_initial_seedlings || 0).toLocaleString('id-ID')}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">${z.species_count || 0} jenis</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; font-size: 13px;">${survivalText}</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          <div style="font-weight: 600; color: #fff; font-size: 13px;">${z.scenes_count || 0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">scene 360°</div>
        </td>
        <td style="padding: 12px 14px; text-align: center;">
          ${badge}
        </td>
        <td style="padding: 12px 14px; text-align: right; white-space: nowrap;">
          <div style="display: inline-flex; gap: 4px;">
            <button class="btn-action-detail btn-text-btn btn-sm" data-id="${z.id}" title="Buka Detail Kawasan (8 Tab)">
              🔍 Detail
            </button>
            <button class="btn-action-edit btn-text-btn btn-sm" data-id="${z.id}" title="Edit Data Kawasan">
              ✏️ Edit
            </button>
            <button class="btn-action-tour btn-text-btn btn-sm" data-id="${z.id}" title="Buka Virtual Tour Kawasan Ini">
              🌐 Tour
            </button>
            <button class="btn-action-archive btn-text-btn btn-sm" data-id="${z.id}" title="${z.is_archived ? 'Aktifkan Kembali' : 'Arsipkan Kawasan'}" style="color: ${z.is_archived ? '#10b981' : '#f59e0b'};">
              ${z.is_archived ? '♻️ Pulihkan' : '📦 Arsip'}
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <table class="data-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
      <thead>
        <tr style="background: var(--clr-surface-card); border-bottom: 2px solid var(--clr-border); color: var(--clr-text-muted); font-size: 12px; text-transform: uppercase;">
          <th style="padding: 12px 14px;">Kode</th>
          <th style="padding: 12px 14px;">Nama Kawasan & Lokasi</th>
          <th style="padding: 12px 14px;">Luas Lahan</th>
          <th style="padding: 12px 14px; text-align: center;">Penanaman</th>
          <th style="padding: 12px 14px; text-align: center;">Bibit Awal</th>
          <th style="padding: 12px 14px; text-align: center;">Survival</th>
          <th style="padding: 12px 14px; text-align: center;">Panorama</th>
          <th style="padding: 12px 14px; text-align: center;">Status</th>
          <th style="padding: 12px 14px; text-align: right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function bindZoneTableActions() {
  const container = document.getElementById('zone-pane-container');
  if (!container) return;

  const btnEmptyAdd = container.querySelector('#btn-empty-add-zone');
  if (btnEmptyAdd) {
    btnEmptyAdd.addEventListener('click', () => switchZoneSubTab('create'));
  }

  container.querySelectorAll('.btn-action-detail').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      switchZoneSubTab('detail', id);
    });
  });

  container.querySelectorAll('.btn-action-edit').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        const res = await ApiService.getZone(id);
        renderZoneFormView(res.zone);
      } catch (e) {
        EcoToast.error('✕ Gagal memuat kawasan', e.message);
      }
    });
  });

  container.querySelectorAll('.btn-action-tour').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      window.location.hash = 'tour';
    });
  });

  container.querySelectorAll('.btn-action-archive').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Ubah status arsip kawasan ini?')) {
        try {
          const res = await ApiService.archiveZone(id);
          EcoToast.show({
            type: 'success',
            title: res.action === 'archived' ? '✓ Berhasil diarsipkan' : '✓ Berhasil dipulihkan',
            message: res.message || 'Status kawasan berhasil diperbarui.',
          });
          await loadZonesList();
        } catch (e) {
          EcoToast.error('✕ Gagal mengubah status arsip', e.message);
        }
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────
// 2. FORMULIR TAMBAH / EDIT KAWASAN
// ─────────────────────────────────────────────────────────────
function renderZoneFormView(existingZone = null) {
  const pane = document.getElementById('zone-pane-container');
  if (!pane) return;

  const isEdit = !!existingZone;
  const formTitle = isEdit ? `Edit Kawasan: ${existingZone.name}` : 'Tambah Kawasan / Lahan Baru';

  pane.innerHTML = `
    <div style="background: var(--clr-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); max-width: 960px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid var(--clr-border); padding-bottom: 12px;">
        <h3 style="color: #fff; margin: 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
          <span>${isEdit ? '✏️' : '➕'}</span> ${formTitle}
        </h3>
        <button id="btn-cancel-zone-form" class="btn-text-btn btn-sm">← Kembali ke Daftar</button>
      </div>

      <form id="zone-edit-form">
        <input type="hidden" id="form-zone-id" value="${existingZone ? existingZone.id : ''}" />

        <!-- BAGIAN 1: INFORMASI DASAR -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            1. Informasi Dasar Kawasan
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="form-zone-code">Kode Kawasan (Unik): *</label>
              <input type="text" id="form-zone-code" class="form-input" required placeholder="Contoh: KW-ACEH-02" value="${existingZone ? existingZone.zone_code : ''}" />
              <small style="color: var(--clr-text-dim); font-size: 11px;">Kode unik sebagai pengenal permanen dalam sistem.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-name">Nama Kawasan: *</label>
              <input type="text" id="form-zone-name" class="form-input" required placeholder="Nama lengkap kawasan penanaman" value="${existingZone ? escapeHtml(existingZone.name) : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-category">Kategori Kawasan:</label>
              <input type="text" id="form-zone-category" class="form-input" placeholder="e.g. Silvikultur, Konservasi Pesisir, Arboretum" value="${existingZone ? escapeHtml(existingZone.category || '') : 'Silvikultur & Konservasi'}" />
            </div>
            <div class="form-group">
              <label for="form-zone-status">Status Kawasan: *</label>
              <select id="form-zone-status" class="form-select" required>
                <option value="preparation" ${existingZone && existingZone.status === 'preparation' ? 'selected' : ''}>Persiapan Lahan</option>
                <option value="active" ${!existingZone || existingZone.status === 'active' ? 'selected' : ''}>Aktif Penanaman</option>
                <option value="monitoring" ${existingZone && existingZone.status === 'monitoring' ? 'selected' : ''}>Pemantauan</option>
                <option value="completed" ${existingZone && existingZone.status === 'completed' ? 'selected' : ''}>Selesai / Mandiri</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-purpose">Tujuan Penanaman:</label>
            <input type="text" id="form-zone-purpose" class="form-input" placeholder="Tujuan utama program penanaman pada kawasan ini" value="${existingZone ? escapeHtml(existingZone.planting_purpose || '') : ''}" />
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-desc">Deskripsi Kawasan:</label>
            <textarea id="form-zone-desc" class="form-input" rows="3" placeholder="Uraian gambaran umum kawasan, vegetasi, dan karakteristik ekosistem">${existingZone ? escapeHtml(existingZone.description || '') : ''}</textarea>
          </div>
        </div>

        <!-- BAGIAN 2: INFORMASI LOKASI -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            2. Informasi Lokasi Deskriptif & Titik Referensi Opsional
          </h4>
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="form-zone-address">Alamat / Keterangan Lokasi:</label>
            <input type="text" id="form-zone-address" class="form-input" placeholder="Jalan, blok, atau patokan lokasi deskriptif" value="${existingZone ? escapeHtml(existingZone.address || '') : ''}" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-village">Desa / Gampong:</label>
              <input type="text" id="form-zone-village" class="form-input" placeholder="Gampong" value="${existingZone ? escapeHtml(existingZone.village || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-district">Kecamatan:</label>
              <input type="text" id="form-zone-district" class="form-input" placeholder="Kecamatan" value="${existingZone ? escapeHtml(existingZone.district || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-city">Kabupaten / Kota:</label>
              <input type="text" id="form-zone-city" class="form-input" placeholder="Kabupaten" value="${existingZone ? escapeHtml(existingZone.city || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-province">Provinsi:</label>
              <input type="text" id="form-zone-province" class="form-input" placeholder="Provinsi" value="${existingZone ? escapeHtml(existingZone.province || '') : 'Aceh'}" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 14px;">
            <div class="form-group">
              <label for="form-zone-lat">Latitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lat" class="form-input" placeholder="Contoh: 5.4818556" value="${existingZone && existingZone.latitude ? existingZone.latitude : ''}" />
              <small style="color: var(--clr-text-dim); font-size: 11px;">Hanya titik koordinat referensi patok, bukan poligon GPS.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-lng">Longitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lng" class="form-input" placeholder="Contoh: 95.5840917" value="${existingZone && existingZone.longitude ? existingZone.longitude : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-access">Catatan Akses Lapangan:</label>
              <input type="text" id="form-zone-access" class="form-input" placeholder="Akses kendaraan, jalan setapak, rute masuk" value="${existingZone ? escapeHtml(existingZone.access_notes || '') : ''}" />
            </div>
          </div>
        </div>

        <!-- BAGIAN 3: INFORMASI LAHAN & LUASAN -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            3. Informasi Lahan (Input Manual, Bebas Poligon)
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-area-size">Luas Lahan: *</label>
              <input type="number" step="0.01" min="0" id="form-zone-area-size" class="form-input" required placeholder="Contoh: 2.00" value="${existingZone ? existingZone.area_size : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-area-unit">Satuan Luas: *</label>
              <select id="form-zone-area-unit" class="form-select" required>
                <option value="ha" ${!existingZone || existingZone.area_unit === 'ha' ? 'selected' : ''}>Hektare (ha)</option>
                <option value="m2" ${existingZone && existingZone.area_unit === 'm2' ? 'selected' : ''}>Meter Persegi (m²)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="form-zone-meas-method">Metode Pengukuran Luas:</label>
              <input type="text" id="form-zone-meas-method" class="form-input" placeholder="e.g. Survei Patok Batas, Data Deskriptif Sertifikat" value="${existingZone ? escapeHtml(existingZone.measurement_method || '') : 'Survei Patok Lapangan Deskriptif'}" />
            </div>
            <div class="form-group">
              <label for="form-zone-meas-date">Tanggal Pengukuran:</label>
              <input type="date" id="form-zone-meas-date" class="form-input" value="${existingZone && existingZone.measurement_date ? toDateInputValue(existingZone.measurement_date) : ''}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-land-notes">Catatan Kondisi Lahan & Tanah:</label>
            <textarea id="form-zone-land-notes" class="form-input" rows="2" placeholder="Kondisi topografi, jenis tanah, kemiringan lereng, vegetasi awal">${existingZone ? escapeHtml(existingZone.land_condition_notes || '') : ''}</textarea>
          </div>
        </div>

        <!-- BAGIAN 4: PENGELOLAAN & PUBLIKASI -->
        <div style="margin-bottom: 24px;">
          <h4 style="color: var(--clr-primary); font-size: 14px; text-transform: uppercase; margin-bottom: 12px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 6px;">
            4. Pengelolaan, Target, & Publikasi
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-pic">Penanggung Jawab / Koordinator:</label>
              <input type="text" id="form-zone-pic" class="form-input" placeholder="Nama koordinator lapangan" value="${existingZone ? escapeHtml(existingZone.person_in_charge || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-org">Organisasi / Lembaga Mitra:</label>
              <input type="text" id="form-zone-org" class="form-input" placeholder="IKHW / Mitra" value="${existingZone ? escapeHtml(existingZone.organization || '') : 'IKHW Aceh'}" />
            </div>
            <div class="form-group">
              <label for="form-zone-target">Target Penanaman (Batang):</label>
              <input type="number" min="0" id="form-zone-target" class="form-input" placeholder="e.g. 1000" value="${existingZone && existingZone.planting_target ? existingZone.planting_target : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-start-date">Tanggal Mulai Program:</label>
              <input type="date" id="form-zone-start-date" class="form-input" value="${existingZone && existingZone.start_date ? toDateInputValue(existingZone.start_date) : ''}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-internal-notes">Catatan Internal (Tidak Tampil ke Publik):</label>
            <textarea id="form-zone-internal-notes" class="form-input" rows="2" placeholder="Catatan internal pengelola">${existingZone ? escapeHtml(existingZone.internal_notes || '') : ''}</textarea>
          </div>

          <div style="display: flex; gap: 20px; align-items: center; margin-top: 16px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #fff;">
              <input type="checkbox" id="form-zone-published" ${!existingZone || existingZone.is_published ? 'checked' : ''} />
              <span>Publikasikan Kawasan ke Halaman Virtual Tour Pengunjung</span>
            </label>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--clr-border); padding-top: 16px;">
          <button type="button" id="btn-cancel-form" class="btn-secondary-action">Batal</button>
          <button type="submit" id="btn-submit-zone" class="btn-primary-action">
            💾 ${isEdit ? 'Simpan Perubahan' : 'Tambahkan Kawasan'}
          </button>
        </div>
      </form>
    </div>
  `;

  // Attach button events
  const btnCancel = document.getElementById('btn-cancel-zone-form');
  const btnCancel2 = document.getElementById('btn-cancel-form');
  const handleCancel = () => switchZoneSubTab('list');
  if (btnCancel) btnCancel.addEventListener('click', handleCancel);
  if (btnCancel2) btnCancel2.addEventListener('click', handleCancel);

  // Form submit handler
  const form = document.getElementById('zone-edit-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        zone_code: document.getElementById('form-zone-code').value.trim(),
        name: document.getElementById('form-zone-name').value.trim(),
        category: document.getElementById('form-zone-category').value.trim(),
        status: document.getElementById('form-zone-status').value,
        planting_purpose: document.getElementById('form-zone-purpose').value.trim(),
        description: document.getElementById('form-zone-desc').value.trim(),
        address: document.getElementById('form-zone-address').value.trim(),
        village: document.getElementById('form-zone-village').value.trim(),
        district: document.getElementById('form-zone-district').value.trim(),
        city: document.getElementById('form-zone-city').value.trim(),
        province: document.getElementById('form-zone-province').value.trim(),
        latitude: document.getElementById('form-zone-lat').value ? parseFloat(document.getElementById('form-zone-lat').value) : null,
        longitude: document.getElementById('form-zone-lng').value ? parseFloat(document.getElementById('form-zone-lng').value) : null,
        access_notes: document.getElementById('form-zone-access').value.trim(),
        area_size: parseFloat(document.getElementById('form-zone-area-size').value) || 0,
        area_unit: document.getElementById('form-zone-area-unit').value,
        measurement_method: document.getElementById('form-zone-meas-method').value.trim(),
        measurement_date: parseDateForPayload(document.getElementById('form-zone-meas-date').value),
        land_condition_notes: document.getElementById('form-zone-land-notes').value.trim(),
        person_in_charge: document.getElementById('form-zone-pic').value.trim(),
        organization: document.getElementById('form-zone-org').value.trim(),
        planting_target: document.getElementById('form-zone-target').value ? parseInt(document.getElementById('form-zone-target').value) : null,
        start_date: parseDateForPayload(document.getElementById('form-zone-start-date').value),
        internal_notes: document.getElementById('form-zone-internal-notes').value.trim(),
        is_published: document.getElementById('form-zone-published').checked,
      };

      const zoneId = document.getElementById('form-zone-id').value;
      const isEdit = !!zoneId;
      const submitBtn = document.getElementById('btn-submit-zone');
      submitBtn.disabled = true;
      submitBtn.innerText = 'Menyimpan...';

      try {
        const res = await ApiService.saveZone(payload, zoneId || null);
        if (isEdit) {
          EcoToast.updated(res.message || 'Perubahan data kawasan berhasil disimpan.');
        } else {
          EcoToast.created(res.message || 'Data kawasan baru berhasil disimpan.');
        }
        await loadZonesList();
      } catch (err) {
        EcoToast.error('✕ Gagal menyimpan kawasan', err.message || 'Periksa kembali formulir kawasan dan coba lagi.');
        submitBtn.disabled = false;
        submitBtn.innerText = isEdit ? '💾 Simpan Perubahan' : '💾 Tambahkan Kawasan';
      }
    });
  }
}

// ─────────────────────────────────────────────────────────────
// 3. DETAIL KAWASAN (8 TAB LENGKAP)
// ─────────────────────────────────────────────────────────────
async function loadAndRenderZoneDetail(zoneId, initialDetailTab = 'tab-ringkasan') {
  const pane = document.getElementById('zone-pane-container');
  if (!pane) return;

  pane.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
      <span class="loading-spinner"></span> Memuat detail kawasan (8 Tab)...
    </div>
  `;

  try {
    const data = await ApiService.getZone(zoneId);
    selectedZoneDetail = data;
    renderZoneDetailView(data, initialDetailTab);
  } catch (err) {
    pane.innerHTML = `
      <div class="alert-error" style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #fca5a5;">
        ❌ Gagal memuat detail kawasan: ${err.message}
        <button id="btn-back-to-list" class="btn-secondary-action btn-sm" style="margin-left: 12px;">Kembali</button>
      </div>
    `;
    const btnBack = document.getElementById('btn-back-to-list');
    if (btnBack) btnBack.addEventListener('click', () => switchZoneSubTab('list'));
  }
}

function renderZoneDetailView(data, initialDetailTab = 'tab-ringkasan') {
  const pane = document.getElementById('zone-pane-container');
  if (!pane) return;

  const z = data.zone;
  const s = data.summary;
  const land = data.land_info;

  // Unhide detail tab in navigation
  const tabDetailBtn = document.getElementById('tab-nav-zone-detail');
  if (tabDetailBtn) {
    tabDetailBtn.classList.remove('hidden');
    tabDetailBtn.classList.add('active');
  }

  pane.innerHTML = `
    <!-- Detail Header Card -->
    <div style="background: var(--clr-surface); padding: 20px 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span style="font-family: monospace; font-size: 13px; background: rgba(16,185,129,0.15); color: var(--clr-primary); padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(16,185,129,0.3);">
              ${z.zone_code}
            </span>
            <h2 style="margin: 0; color: #fff; font-size: 22px; font-weight: 700;">${escapeHtml(z.name)}</h2>
            <span class="badge-status-published">${z.status}</span>
          </div>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 6px 0 0;">
            📍 ${escapeHtml(z.address || (z.village ? z.village + ', ' + z.district : 'Lokasi Terdaftar'))} • ${escapeHtml(z.city || 'Aceh')}
          </p>
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-detail-edit-zone" class="btn-secondary-action btn-sm">✏️ Edit Kawasan</button>
          <button id="btn-detail-back-list" class="btn-text-btn btn-sm">← Daftar Kawasan</button>
        </div>
      </div>

      <!-- 8 Tabs Bar -->
      <div class="zone-detail-tabs" style="display: flex; gap: 4px; border-bottom: 1px solid var(--clr-border); padding-top: 16px; margin-top: 14px; overflow-x: auto;">
        <button class="zone-tab-link active" data-tab="tab-ringkasan">1. Ringkasan</button>
        <button class="zone-tab-link" data-tab="tab-lahan">2. Informasi Lahan</button>
        <button class="zone-tab-link" data-tab="tab-penanaman">3. Jenis & Kegiatan Penanaman</button>
        <button class="zone-tab-link" data-tab="tab-pemantauan">4. Pemantauan</button>
        <button class="zone-tab-link" data-tab="tab-perawatan">5. Perawatan</button>
        <button class="zone-tab-link" data-tab="tab-galeri">6. Galeri Foto</button>
        <button class="zone-tab-link" data-tab="tab-tour">7. Virtual Tour</button>
        <button class="zone-tab-link" data-tab="tab-laporan">8. Laporan</button>
      </div>
    </div>

    <!-- Tab Contents Container -->
    <div id="zone-tab-body">
      ${renderTabRingkasanHtml(data)}
    </div>
  `;

  // Attach tab switching inside detail
  pane.querySelectorAll('.zone-tab-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      pane.querySelectorAll('.zone-tab-link').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-tab');
      const body = document.getElementById('zone-tab-body');
      if (!body) return;

      if (target === 'tab-ringkasan') body.innerHTML = renderTabRingkasanHtml(data);
      else if (target === 'tab-lahan') body.innerHTML = renderTabLahanHtml(data);
      else if (target === 'tab-penanaman') body.innerHTML = renderTabPenanamanHtml(data);
      else if (target === 'tab-pemantauan') body.innerHTML = renderTabPemantauanHtml(data);
      else if (target === 'tab-perawatan') body.innerHTML = renderTabPerawatanHtml(data);
      else if (target === 'tab-galeri') renderAdminZoneGallery(body, z);
      else if (target === 'tab-tour') body.innerHTML = renderTabTourHtml(data);
      else if (target === 'tab-laporan') body.innerHTML = renderTabLaporanHtml(data);
    });
  });

  // Handle direct opening of tab-galeri
  if (initialDetailTab === 'tab-galeri') {
    const tabGaleriBtn = pane.querySelector('.zone-tab-link[data-tab="tab-galeri"]');
    if (tabGaleriBtn) {
      pane.querySelectorAll('.zone-tab-link').forEach((b) => b.classList.remove('active'));
      tabGaleriBtn.classList.add('active');
    }
    const body = document.getElementById('zone-tab-body');
    if (body) renderAdminZoneGallery(body, z);
  }

  const btnEdit = document.getElementById('btn-detail-edit-zone');
  if (btnEdit) {
    btnEdit.addEventListener('click', () => renderZoneFormView(z));
  }

  const btnBack = document.getElementById('btn-detail-back-list');
  if (btnBack) {
    btnBack.addEventListener('click', () => switchZoneSubTab('list'));
  }
}

// ── Tab 1: Ringkasan ──
function renderTabRingkasanHtml(data) {
  const z = data.zone;
  const s = data.summary;
  const survivalDisplay = s.survival_rate !== null ? `${s.survival_rate}%` : 'Data belum cukup';

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Luas Lahan Tercatat</span>
        <span class="stat-value" style="color: var(--clr-primary);">${z.area_size} ${z.area_unit}</span>
        <span class="stat-desc">±${s.area_in_ha} Hektare (Deskriptif)</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Kegiatan Penanaman</span>
        <span class="stat-value">${s.activities_count}</span>
        <span class="stat-desc">Batch kegiatan terdaftar</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Bibit Awal Ditanam</span>
        <span class="stat-value">${(s.total_initial_seedlings || 0).toLocaleString('id-ID')}</span>
        <span class="stat-desc">${s.unique_species_count} Spesies Pohon Berbeda</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Kelangsungan Hidup Terkini</span>
        <span class="stat-value" style="color: ${s.survival_rate && s.survival_rate >= 75 ? 'var(--clr-primary)' : 'var(--clr-gold)'};">
          ${survivalDisplay}
        </span>
        <span class="stat-desc">Formula: Kelompok awal hidup / awal ditanam</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Scene Panorama Terkait</span>
        <span class="stat-value">${s.scenes_count}</span>
        <span class="stat-desc">Terhubung Marzipano</span>
      </div>
    </div>

    <!-- Description & Context -->
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Tujuan & Deskripsi Kawasan</h4>
      <p style="color: var(--clr-text-muted); font-size: 13px; line-height: 1.6;">
        ${escapeHtml(z.description || 'Tidak ada deskripsi tambahan.')}
      </p>
      ${z.planting_purpose ? `
        <div style="margin-top: 12px; padding: 12px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--clr-primary); border-radius: 4px;">
          <strong style="color: var(--clr-primary); font-size: 12px;">TUJUAN PENANAMAN:</strong>
          <p style="margin: 4px 0 0; color: #fff; font-size: 13px;">${escapeHtml(z.planting_purpose)}</p>
        </div>
      ` : ''}
    </div>
  `;
}

// ── Tab 2: Informasi Lahan ──
function renderTabLahanHtml(data) {
  const l = data.land_info;
  return `
    <div style="background: var(--clr-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 16px;">Spesifikasi & Karakteristik Lahan</h3>
      <table class="data-table" style="width: 100%; font-size: 13px;">
        <tbody>
          <tr>
            <td style="width: 240px; color: var(--clr-text-muted); padding: 10px 0;">Luas Tercatat</td>
            <td style="color: #fff; font-weight: 600;">${l.area_size} ${l.area_unit} (±${l.area_in_ha} Hektare)</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Metode Pengukuran</td>
            <td style="color: #fff;">${escapeHtml(l.measurement_method || '-')}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Tanggal Pengukuran</td>
            <td style="color: #fff;">${formatDateDisplay(l.measurement_date)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Kondisi Lahan & Tanah</td>
            <td style="color: #fff;">${escapeHtml(l.land_condition_notes || 'Belum ada catatan khusus')}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Titik Koordinat Acuan</td>
            <td style="color: #fff;">
              ${l.latitude && l.longitude ? `${l.latitude}° N, ${l.longitude}° E (Patok Referensi)` : '<span style="color:var(--clr-text-dim)">Tidak ada koordinat GPS (Input deskriptif tetap valid)</span>'}
            </td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Aksesibilitas / Rute</td>
            <td style="color: #fff;">${escapeHtml(l.access_notes || '-')}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 10px 0;">Alamat Administratif</td>
            <td style="color: #fff;">${escapeHtml(l.address || '-')}, ${escapeHtml(l.village || '')}, ${escapeHtml(l.district || '')}, ${escapeHtml(l.city || '')}, ${escapeHtml(l.province || '')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

// ── Tab 3: Jenis dan Kegiatan Penanaman ──
function renderTabPenanamanHtml(data) {
  const acts = data.activities || [];
  const species = data.species || [];

  return `
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <!-- Spesies Pohon Tertanam -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Jenis Pohon Tertanam di Kawasan Ini (${species.length} Jenis)</h4>
        ${species.length > 0 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 14px;">
            ${species.map((sp) => `
              <div style="background: var(--clr-surface-card); padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
                <div style="font-weight: 600; color: #fff;">${escapeHtml(sp.local_name)}</div>
                <div style="font-style: italic; font-size: 12px; color: var(--clr-primary);">${escapeHtml(sp.scientific_name)}</div>
                <div style="font-size: 11px; color: var(--clr-text-muted); margin-top: 4px;">Famili: ${escapeHtml(sp.family)}</div>
                <div style="font-size: 13px; font-weight: 700; color: #fff; margin-top: 6px;">
                  ${(sp.total_initial_quantity || 0).toLocaleString('id-ID')} Batang
                </div>
              </div>
            `).join('')}
          </div>
        ` : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada bibit pohon yang tercatat di kawasan ini.</p>'}
      </div>

      <!-- Riwayat Kegiatan Penanaman -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Daftar Kegiatan Penanaman (${acts.length} Kegiatan)</h4>
        ${acts.length > 0 ? `
          <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 12px;">
            <thead>
              <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
                <th style="padding: 8px;">Batch Code</th>
                <th style="padding: 8px;">Nama Kegiatan</th>
                <th style="padding: 8px;">Tanggal</th>
                <th style="padding: 8px;">Spesies & Jumlah</th>
                <th style="padding: 8px;">Penanggung Jawab</th>
              </tr>
            </thead>
            <tbody>
              ${acts.map((act) => `
                <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                  <td style="padding: 8px; font-family: monospace; color: var(--clr-primary);">${act.batch_code}</td>
                  <td style="padding: 8px; font-weight: 600; color: #fff;">${escapeHtml(act.name)}</td>
                  <td style="padding: 8px;">${formatDateDisplay(act.activity_date)}</td>
                  <td style="padding: 8px;">
                    ${act.items && act.items.length > 0 ? act.items.map((it) => `${it.species ? it.species.local_name : 'Pohon'}: ${it.quantity} ${it.unit || 'btg'}`).join(', ') : '-'}
                  </td>
                  <td style="padding: 8px;">${escapeHtml(act.person_in_charge || '-')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada kegiatan penanaman yang dicatat pada kawasan ini.</p>'}
      </div>
    </div>
  `;
}

// ── Tab 4: Pemantauan ──
function renderTabPemantauanHtml(data) {
  const surveys = data.surveys || [];
  return `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Catatan Survei & Pemantauan Tanaman Historis (${surveys.length} Survei)</h4>
      ${surveys.length > 0 ? `
        <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 12px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 8px;">Tanggal</th>
              <th style="padding: 8px;">Kegiatan / Batch</th>
              <th style="padding: 8px; text-align: center;">Hidup Awal</th>
              <th style="padding: 8px; text-align: center;">Mati</th>
              <th style="padding: 8px; text-align: center;">Hilang</th>
              <th style="padding: 8px;">Kondisi</th>
              <th style="padding: 8px;">Pemeriksa</th>
            </tr>
          </thead>
          <tbody>
            ${surveys.map((sv) => `
              <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                <td style="padding: 8px;">${formatDateDisplay(sv.survey_date)}</td>
                <td style="padding: 8px; font-weight: 500; color: #fff;">${sv.activity ? sv.activity.name : '-'}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-primary); font-weight: 600;">${sv.alive_count || 0}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-danger);">${sv.dead_count || 0}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-gold);">${sv.missing_count || 0}</td>
                <td style="padding: 8px;">${escapeHtml(sv.health_condition || '-')}</td>
                <td style="padding: 8px;">${escapeHtml(sv.inspector_name || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada survei pemantauan untuk kawasan ini.</p>'}
    </div>
  `;
}

// ── Tab 5: Perawatan ──
function renderTabPerawatanHtml(data) {
  const logs = data.maintenance || [];
  return `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Riwayat Tindakan Silvikultur, Perawatan & Penyulaman (${logs.length} Tindakan)</h4>
      ${logs.length > 0 ? `
        <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 12px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 8px;">Tanggal</th>
              <th style="padding: 8px;">Jenis Tindakan</th>
              <th style="padding: 8px; text-align: center;">Jumlah Ditangani</th>
              <th style="padding: 8px; text-align: center;">Bibit Sulaman</th>
              <th style="padding: 8px;">Pelaksana</th>
              <th style="padding: 8px;">Catatan</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map((lg) => `
              <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                <td style="padding: 8px;">${formatDateDisplay(lg.maintenance_date)}</td>
                <td style="padding: 8px; font-weight: 600; color: #fff; text-transform: capitalize;">${escapeHtml(lg.action_type || '-')}</td>
                <td style="padding: 8px; text-align: center;">${lg.plants_treated_count || 0}</td>
                <td style="padding: 8px; text-align: center; color: var(--clr-primary); font-weight: 600;">${lg.replacement_plants_count || 0}</td>
                <td style="padding: 8px;">${escapeHtml(lg.executor_name || '-')}</td>
                <td style="padding: 8px; color: var(--clr-text-muted);">${escapeHtml(lg.notes || '-')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada tindakan perawatan atau penyulaman yang dicatat pada kawasan ini.</p>'}
    </div>
  `;
}

// ── Tab 6: Galeri Foto ──
function renderTabGaleriHtml(data) {
  const g = data.gallery || {};
  const photos = g.photos || [];
  return `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Dokumentasi & Galeri Foto Kawasan</h4>
      ${photos.length > 0 ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; margin-top: 14px;">
          ${photos.map((p, i) => `
            <div style="background: var(--clr-surface-card); border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--clr-border-subtle);">
              <img src="${p}" alt="Dokumentasi ${i + 1}" style="width: 100%; height: 140px; object-fit: cover;" onerror="this.src='/favicon.svg'" />
              <div style="padding: 8px; font-size: 11px; color: var(--clr-text-muted); text-align: center;">Foto ${i + 1}</div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div style="padding: 30px; text-align: center; color: var(--clr-text-muted);">
          📷 Belum ada foto dokumentasi yang diunggah untuk kawasan ini.
        </div>
      `}
    </div>
  `;
}

// ── Tab 7: Virtual Tour ──
function renderTabTourHtml(data) {
  const scenes = data.scenes || [];
  return `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Panorama 360° Terhubung Kawasan Ini (${scenes.length} Scene)</h4>
        <a href="#tour" class="btn-primary-action btn-sm" style="text-decoration: none;">🌐 Buka Virtual Tour Penuh</a>
      </div>
      ${scenes.length > 0 ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px;">
          ${scenes.map((sc) => `
            <div style="background: var(--clr-surface-card); border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--clr-border-subtle);">
              <img src="${sc.thumbnail_path || '/tiles/' + sc.id + '/preview.jpg'}" alt="${sc.name}" style="width: 100%; height: 120px; object-fit: cover;" onerror="this.src='/favicon.svg'" />
              <div style="padding: 10px;">
                <div style="font-weight: 600; color: #fff; font-size: 13px;">${escapeHtml(sc.name)}</div>
                <div style="font-size: 11px; color: var(--clr-primary); margin-top: 4px;">🎯 ${sc.hotspots_count || 0} Hotspots</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada scene panorama yang dihubungkan ke kawasan ini.</p>'}
    </div>
  `;
}

// ── Tab 8: Laporan ──
function renderTabLaporanHtml(data) {
  const z = data.zone;
  const s = data.summary;
  return `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Ekspor Laporan Kawasan: ${escapeHtml(z.name)}</h4>
        <div style="display: flex; gap: 8px;">
          <a href="/api/admin/trees/reports/summary/csv" class="btn-secondary-action btn-sm" style="text-decoration: none;" download>
            📥 Unduh Ringkasan CSV
          </a>
          <button onclick="window.print()" class="btn-text-btn btn-sm">🖨️ Cetak Halaman</button>
        </div>
      </div>
      <div style="background: var(--clr-surface-card); padding: 18px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle); font-size: 13px; line-height: 1.8;">
        <div><strong>Kawasan:</strong> ${escapeHtml(z.name)} (${z.zone_code})</div>
        <div><strong>Luas Tercatat:</strong> ${z.area_size} ${z.area_unit} (±${s.area_in_ha} Ha)</div>
        <div><strong>Status:</strong> ${z.status} • <strong>Target Penanaman:</strong> ${z.planting_target || '-'} batang</div>
        <div><strong>Bibit Tertanam:</strong> ${(s.total_initial_seedlings || 0).toLocaleString('id-ID')} batang (${s.unique_species_count} jenis)</div>
        <div><strong>Kelangsungan Hidup Kelompok Awal:</strong> ${s.survival_rate !== null ? s.survival_rate + '%' : 'Data belum cukup'}</div>
        <div><strong>Total Survei Pemantauan:</strong> ${s.total_surveys} kali • <strong>Tindakan Perawatan:</strong> ${s.total_maintenance} kali</div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 4. GALERI KAWASAN VIEW
// ─────────────────────────────────────────────────────────────
function renderZoneGalleryView() {
  const pane = document.getElementById('zone-pane-container');
  if (!pane) return;

  pane.innerHTML = `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="color: #fff; margin: 0; font-size: 16px;">Galeri Dokumentasi Foto per Kawasan</h3>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 4px 0 0;">
            Pilih kawasan penanaman untuk melihat, mengunggah, atau mengelola foto dokumentasi lapangannya.
          </p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
        ${cachedZones.map((z) => `
          <div style="background: var(--clr-surface-card); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--clr-border-subtle); display: flex; flex-direction: column; justify-content: space-between;">
            <div style="height: 160px; background: #0c1410; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
              ${z.main_photo_path ? `
                <img src="${z.main_photo_path}" alt="${z.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/favicon.svg'" />
              ` : `
                <span style="font-size: 40px;">🏞️</span>
              `}
              <div style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; color: #fff;">
                ${z.status}
              </div>
            </div>
            <div style="padding: 14px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <span style="font-size: 11px; font-family: monospace; color: var(--clr-primary); font-weight: 600;">${z.zone_code}</span>
                <h5 style="margin: 4px 0 6px; color: #fff; font-size: 14px; font-weight: 700;">${escapeHtml(z.name)}</h5>
                <p style="font-size: 12px; color: var(--clr-text-muted); margin: 0;">${z.area_size} ${z.area_unit} • ${escapeHtml(z.category || 'Konservasi')}</p>
              </div>
              <button class="btn-open-zone-gallery btn-primary-action btn-sm" data-id="${z.id}" style="width: 100%; margin-top: 14px; justify-content: center;">
                🖼️ Buka Galeri Kawasan
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  pane.querySelectorAll('.btn-open-zone-gallery').forEach((btn) => {
    btn.addEventListener('click', () => {
      const zId = btn.getAttribute('data-id');
      switchZoneSubTab('detail', zId, 'tab-galeri');
    });
  });
}

// Helper utilities
function debounce(fn, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
