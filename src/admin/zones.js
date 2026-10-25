/**
 * Modul Manajemen Kawasan / Lahan Penanaman Pohon
 * Mengelola multiple kawasan: Daftar (Tabel & Grid), Metrik KPI, Tambah/Edit, Detail 8 Tab, Galeri Dokumentasi, Hubungan Panorama.
 */
import { ApiService } from '../services/api.js';
import { renderAdminZoneGallery } from './zoneGallery.js';
import { EcoToast } from '../utils/toast.js';
import { toDateInputValue, formatDateDisplay, parseDateForPayload } from '../utils/date.js';

let currentZoneTab = 'list';
let cachedZones = [];
let cachedScenes = [];
let selectedZoneId = null;
let selectedZoneDetail = null;
let zoneViewMode = localStorage.getItem('ecoland_zone_view_mode') || 'table';

export async function initZonesModule({ scenes = [], onNavigateToTour, onOpenHotspotEditor } = {}) {
  const container = document.getElementById('admin-zones-content');
  if (!container) return;

  cachedScenes = scenes || [];
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
    <!-- Top Hero Banner -->
    <div class="zones-hero-card">
      <div>
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">🏞️</span>
          <span>Manajemen Kawasan / Lahan Penanaman</span>
        </h2>
        <p class="zones-hero-desc">
          Kelola kawasan konservasi & restorasi pohon, batas deskriptif, luasan lahan (Ha/m²), dokumentasi galeri, dan tautan Virtual Tour 360°.
        </p>
      </div>
      <div style="display: flex; gap: 10px; align-items: center; z-index: 2;">
        <button id="btn-zone-add-new" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; padding: 10px 18px; font-weight: 600; cursor: pointer;">
          <span>➕</span> Tambah Kawasan Baru
        </button>
      </div>
    </div>

    <!-- Zones Sub-navigation Bar -->
    <div class="zone-subtabs-nav">
      <button class="zone-nav-tab active" data-zone-tab="list">
        <span>📋</span> Daftar Kawasan & Lahan
      </button>
      <button class="zone-nav-tab" data-zone-tab="create">
        <span>➕</span> Formulir Tambah Kawasan
      </button>
      <button class="zone-nav-tab" data-zone-tab="gallery">
        <span>🖼️</span> Galeri Foto Dokumentasi
      </button>
      <button class="zone-nav-tab hidden" id="tab-nav-zone-detail" data-zone-tab="detail">
        <span>🔍</span> Detail Kawasan (8 Tab)
      </button>
    </div>

    <!-- Dynamic Container -->
    <div id="zone-pane-container" style="min-height: 420px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;">
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
      <div class="alert-error" style="padding: 18px 22px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); color: #fca5a5; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div>
          <strong>❌ Gagal memuat data kawasan:</strong> ${escapeHtml(err.message)}
        </div>
        <button id="btn-retry-zones" class="btn-secondary-action btn-sm" style="cursor: pointer;">🔄 Coba Lagi</button>
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
  const activeZones = cachedZones.filter(z => !z.is_archived && z.status === 'active').length;
  const totalAreaHa = cachedZones.reduce((sum, z) => sum + (parseFloat(z.area_in_ha) || 0), 0);
  const totalSeedlings = cachedZones.reduce((sum, z) => sum + (parseInt(z.total_initial_seedlings) || 0), 0);
  
  // Calculate average survival rate from zones that have it
  const zonesWithSurvival = cachedZones.filter(z => z.survival_rate !== null && z.survival_rate !== undefined);
  const avgSurvival = zonesWithSurvival.length > 0
    ? (zonesWithSurvival.reduce((sum, z) => sum + parseFloat(z.survival_rate), 0) / zonesWithSurvival.length).toFixed(1)
    : null;

  pane.innerHTML = `
    <!-- 1. Top KPI Metrics Grid -->
    <div class="zones-metrics-grid">
      <!-- Metric 1: Total Kawasan -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap emerald">
          <span>🏞️</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Total Kawasan</div>
          <div class="zone-metric-value">${totalZones} <span style="font-size: 13px; font-weight: 500; color: var(--clr-text-muted);">Lahan</span></div>
          <div class="zone-metric-sub">✅ ${activeZones} Kawasan Aktif Restorasi</div>
        </div>
      </div>

      <!-- Metric 2: Total Luas Lahan -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap sky">
          <span>📐</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Total Luas Lahan</div>
          <div class="zone-metric-value" style="color: #38bdf8;">${totalAreaHa.toFixed(2)} <span style="font-size: 13px; font-weight: 500;">Ha</span></div>
          <div class="zone-metric-sub">± ${(totalAreaHa * 10000).toLocaleString('id-ID')} m² Luas Kumulatif</div>
        </div>
      </div>

      <!-- Metric 3: Total Bibit Tertanam -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap amber">
          <span>🌱</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Total Bibit Awal</div>
          <div class="zone-metric-value" style="color: #fbbf24;">${totalSeedlings.toLocaleString('id-ID')} <span style="font-size: 13px; font-weight: 500;">Btg</span></div>
          <div class="zone-metric-sub">Dari seluruh batch penanaman</div>
        </div>
      </div>

      <!-- Metric 4: Kelulusan Hidup / Survival -->
      <div class="zone-metric-card">
        <div class="zone-metric-icon-wrap purple">
          <span>📊</span>
        </div>
        <div class="zone-metric-content">
          <div class="zone-metric-label">Rerata Survival</div>
          <div class="zone-metric-value" style="color: ${avgSurvival !== null && avgSurvival >= 75 ? '#34d399' : '#c084fc'};">
            ${avgSurvival !== null ? `${avgSurvival}%` : '<span style="font-size: 14px; font-weight: 600; color: var(--clr-text-dim);">Belum Cukup</span>'}
          </div>
          <div class="zone-metric-sub">${avgSurvival !== null ? 'Kondisi Tegakan Sangat Baik' : 'Menunggu hasil sensus survei'}</div>
        </div>
      </div>
    </div>

    <!-- 2. Search, Filters & View Toggle Toolbar -->
    <div class="zones-toolbar-card">
      <div class="zones-toolbar-left">
        <!-- Search Input -->
        <div class="zone-search-wrapper">
          <span class="zone-search-icon">🔍</span>
          <input 
            type="text" 
            id="zone-search-input" 
            class="zone-search-input" 
            placeholder="Cari nama kawasan, kode, lokasi, PIC..." 
          />
        </div>

        <!-- Filter Status -->
        <select id="zone-filter-status" class="zone-filter-select" title="Filter berdasarkan status kawasan">
          <option value="all">Semua Status</option>
          <option value="active">🟢 Aktif</option>
          <option value="preparation">🟡 Persiapan</option>
          <option value="monitoring">🔵 Pemantauan</option>
          <option value="completed">⚪ Selesai</option>
        </select>

        <!-- Filter Archived -->
        <select id="zone-filter-archived" class="zone-filter-select" title="Filter kawasan aktif atau diarsipkan">
          <option value="false">Kawasan Aktif</option>
          <option value="true">Diarsipkan</option>
        </select>

        <!-- Reset Button -->
        <button id="btn-reset-filters" class="btn-text-btn btn-sm hidden" style="color: var(--clr-text-muted); cursor: pointer;" title="Reset Filter">
          ✕ Reset
        </button>
      </div>

      <div class="zones-toolbar-right">
        <span id="zone-count-label" style="font-size: 12px; color: var(--clr-text-muted); margin-right: 4px;">
          Menampilkan: <strong style="color: #fff;">${totalZones}</strong> kawasan
        </span>

        <!-- View Mode Switcher -->
        <div class="zones-view-toggle">
          <button id="btn-view-table" class="zone-view-btn ${zoneViewMode === 'table' ? 'active' : ''}" title="Tampilan Tabel">
            <span>📋</span> Tabel
          </button>
          <button id="btn-view-grid" class="zone-view-btn ${zoneViewMode === 'grid' ? 'active' : ''}" title="Tampilan Kartu Grid">
            <span>🗂️</span> Kartu
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Zones Content Container (Table or Grid) -->
    <div id="zones-data-container">
      ${zoneViewMode === 'table' ? renderZonesTableHtml(cachedZones) : renderZonesGridHtml(cachedZones)}
    </div>
  `;

  // Attach search and filter event listeners
  const searchInput = document.getElementById('zone-search-input');
  const filterStatus = document.getElementById('zone-filter-status');
  const filterArchived = document.getElementById('zone-filter-archived');
  const btnReset = document.getElementById('btn-reset-filters');
  const countLabel = document.getElementById('zone-count-label');

  const checkFiltersActive = () => {
    const isFiltered = searchInput.value.trim() !== '' || filterStatus.value !== 'all' || filterArchived.value !== 'false';
    if (btnReset) {
      btnReset.classList.toggle('hidden', !isFiltered);
    }
  };

  const handleFilter = async () => {
    checkFiltersActive();
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
      if (countLabel) {
        countLabel.innerHTML = `Menampilkan: <strong style="color: #fff;">${cachedZones.length}</strong> kawasan`;
      }
      const dataContainer = document.getElementById('zones-data-container');
      if (dataContainer) {
        dataContainer.innerHTML = zoneViewMode === 'table' ? renderZonesTableHtml(cachedZones) : renderZonesGridHtml(cachedZones);
      }
      bindZoneTableActions();
    } catch (e) {
      console.error('Gagal filter data kawasan:', e);
    }
  };

  if (searchInput) searchInput.addEventListener('input', debounce(handleFilter, 300));
  if (filterStatus) filterStatus.addEventListener('change', handleFilter);
  if (filterArchived) filterArchived.addEventListener('change', handleFilter);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      searchInput.value = '';
      filterStatus.value = 'all';
      filterArchived.value = 'false';
      handleFilter();
    });
  }

  // View Mode Switcher
  const btnTable = document.getElementById('btn-view-table');
  const btnGrid = document.getElementById('btn-view-grid');

  if (btnTable && btnGrid) {
    btnTable.addEventListener('click', () => {
      if (zoneViewMode === 'table') return;
      zoneViewMode = 'table';
      try { localStorage.setItem('ecoland_zone_view_mode', 'table'); } catch (e) {}
      btnTable.classList.add('active');
      btnGrid.classList.remove('active');
      const dataContainer = document.getElementById('zones-data-container');
      if (dataContainer) dataContainer.innerHTML = renderZonesTableHtml(cachedZones);
      bindZoneTableActions();
    });

    btnGrid.addEventListener('click', () => {
      if (zoneViewMode === 'grid') return;
      zoneViewMode = 'grid';
      try { localStorage.setItem('ecoland_zone_view_mode', 'grid'); } catch (e) {}
      btnGrid.classList.add('active');
      btnTable.classList.remove('active');
      const dataContainer = document.getElementById('zones-data-container');
      if (dataContainer) dataContainer.innerHTML = renderZonesGridHtml(cachedZones);
      bindZoneTableActions();
    });
  }

  bindZoneTableActions();
}

function getStatusBadge(status) {
  const statusMap = {
    active: '<span class="badge-status-published"><span style="width:6px;height:6px;border-radius:50%;background:#10b981;"></span> Aktif</span>',
    preparation: '<span class="badge-status-draft"><span style="width:6px;height:6px;border-radius:50%;background:#f59e0b;"></span> Persiapan</span>',
    monitoring: '<span class="badge-status-monitoring"><span style="width:6px;height:6px;border-radius:50%;background:#38bdf8;"></span> Pemantauan</span>',
    completed: '<span class="badge-status-completed"><span style="width:6px;height:6px;border-radius:50%;background:#9ca3af;"></span> Selesai</span>',
  };
  return statusMap[status] || `<span class="badge-status-completed">${escapeHtml(status)}</span>`;
}

function renderZonesTableHtml(zones) {
  if (!zones || zones.length === 0) {
    return `
      <div style="text-align: center; padding: 56px 20px; background: var(--clr-surface); border-radius: var(--radius-md); border: 1px dashed var(--clr-border);">
        <div style="font-size: 48px; margin-bottom: 14px;">🏞️</div>
        <h4 style="color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 8px;">Tidak Ada Kawasan Ditemukan</h4>
        <p style="color: var(--clr-text-muted); font-size: 13.5px; max-width: 480px; margin: 0 auto 20px; line-height: 1.5;">
          Tidak ada data kawasan penanaman yang sesuai dengan filter pencarian Anda, atau belum ada kawasan terdaftar.
        </p>
        <button id="btn-empty-add-zone" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
          <span>➕</span> Tambah Kawasan Baru
        </button>
      </div>
    `;
  }

  const rows = zones.map((z) => {
    const badge = getStatusBadge(z.status);
    const survivalVal = z.survival_rate !== null && z.survival_rate !== undefined ? parseFloat(z.survival_rate) : null;
    const survivalText = survivalVal !== null 
      ? `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
          <span style="font-weight: 700; color: ${survivalVal >= 75 ? '#34d399' : '#fbbf24'};">${survivalVal}%</span>
          <div style="width: 48px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 99px; overflow: hidden;">
            <div style="width: ${Math.min(100, survivalVal)}%; height: 100%; background: ${survivalVal >= 75 ? '#10b981' : '#f59e0b'};"></div>
          </div>
        </div>
      `
      : '<span style="color: var(--clr-text-dim); font-size: 11px;">Belum cukup</span>';

    return `
      <tr data-zone-id="${z.id}">
        <!-- KODE -->
        <td>
          <span style="font-family: monospace; font-size: 12px; font-weight: 700; background: rgba(16,185,129,0.12); color: #34d399; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.25); white-space: nowrap;">
            ${escapeHtml(z.zone_code)}
          </span>
        </td>

        <!-- NAMA KAWASAN & LOKASI -->
        <td>
          <div style="font-weight: 700; color: #ffffff; font-size: 14px; margin-bottom: 3px;">
            ${escapeHtml(z.name)}
          </div>
          <div style="display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--clr-text-muted); flex-wrap: wrap;">
            <span style="background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px; font-size: 10.5px;">${escapeHtml(z.category || 'Silvikultur')}</span>
            <span>📍 ${escapeHtml(z.city || z.province || 'Aceh')}</span>
          </div>
        </td>

        <!-- LUAS LAHAN -->
        <td>
          <div style="font-weight: 700; color: #38bdf8; font-size: 13.5px;">
            ${(parseFloat(z.area_in_ha) || 0).toFixed(2)} Ha
          </div>
          <div style="font-size: 11px; color: var(--clr-text-dim); margin-top: 1px;">
            ${z.area_size} ${z.area_unit}
          </div>
        </td>

        <!-- PENANAMAN -->
        <td style="text-align: center;">
          <div style="font-weight: 700; color: #ffffff; font-size: 13.5px;">${z.activities_count || 0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">Kegiatan</div>
        </td>

        <!-- BIBIT AWAL -->
        <td style="text-align: center;">
          <div style="font-weight: 700; color: #fbbf24; font-size: 13.5px;">
            ${(z.total_initial_seedlings || 0).toLocaleString('id-ID')}
          </div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">${z.species_count || 0} jenis</div>
        </td>

        <!-- SURVIVAL -->
        <td style="text-align: center;">
          ${survivalText}
        </td>

        <!-- PANORAMA 360 -->
        <td style="text-align: center;">
          <div style="font-weight: 700; color: #ffffff; font-size: 13.5px;">${z.scenes_count || 0}</div>
          <div style="font-size: 11px; color: var(--clr-text-dim);">Scene 360°</div>
        </td>

        <!-- STATUS -->
        <td style="text-align: center;">
          ${badge}
        </td>

        <!-- AKSI -->
        <td style="text-align: right; white-space: nowrap;">
          <div style="display: inline-flex; gap: 6px; align-items: center;">
            <button class="btn-action-detail zone-btn-action detail" data-id="${z.id}" title="Buka Detail Kawasan (8 Tab)">
              <span>🔍</span> Detail
            </button>
            <button class="btn-action-edit zone-btn-action edit" data-id="${z.id}" title="Edit Data Kawasan">
              <span>✏️</span> Edit
            </button>
            <button class="btn-action-tour zone-btn-action tour" data-id="${z.id}" title="Buka Virtual Tour Kawasan Ini">
              <span>🌐</span> Tour
            </button>
            <button class="btn-action-archive zone-btn-action archive" data-id="${z.id}" title="${z.is_archived ? 'Aktifkan Kembali' : 'Arsipkan Kawasan'}">
              <span>${z.is_archived ? '♻️' : '📦'}</span> ${z.is_archived ? 'Pulihkan' : 'Arsip'}
            </button>
            <button class="btn-action-delete zone-btn-action delete" data-id="${z.id}" title="Hapus Kawasan">
              <span>🗑️</span> Hapus
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="zones-table-box">
      <table class="zones-table">
        <thead>
          <tr>
            <th style="width: 100px;">Kode</th>
            <th>Nama Kawasan & Lokasi</th>
            <th style="width: 110px;">Luas Lahan</th>
            <th style="width: 90px; text-align: center;">Penanaman</th>
            <th style="width: 100px; text-align: center;">Bibit Awal</th>
            <th style="width: 90px; text-align: center;">Survival</th>
            <th style="width: 90px; text-align: center;">Panorama</th>
            <th style="width: 100px; text-align: center;">Status</th>
            <th style="width: 270px; text-align: right;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function renderZonesGridHtml(zones) {
  if (!zones || zones.length === 0) {
    return renderZonesTableHtml(zones);
  }

  const cards = zones.map((z) => {
    const badge = getStatusBadge(z.status);
    const survivalVal = z.survival_rate !== null && z.survival_rate !== undefined ? parseFloat(z.survival_rate) : null;
    const coverUrl = z.main_photo_path || null;

    return `
      <div class="zone-grid-card" data-zone-id="${z.id}">
        <!-- Cover Banner -->
        <div class="zone-card-cover">
          ${coverUrl ? `
            <img src="${coverUrl}" alt="${escapeHtml(z.name)}" onerror="this.onerror=null; this.src='/favicon.svg';" />
          ` : `
            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(12,20,16,0.95) 100%);">
              <span style="font-size: 42px; margin-bottom: 4px;">🏞️</span>
              <span style="font-size: 11px; color: var(--clr-text-muted);">Foto Dokumentasi Belum Diunggah</span>
            </div>
          `}
          <div style="position: absolute; top: 12px; left: 12px; z-index: 2;">
            <span style="font-family: monospace; font-size: 11.5px; font-weight: 700; background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); color: #34d399; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.35);">
              ${escapeHtml(z.zone_code)}
            </span>
          </div>
          <div style="position: absolute; top: 12px; right: 12px; z-index: 2;">
            ${badge}
          </div>
        </div>

        <!-- Card Body -->
        <div class="zone-card-body">
          <div>
            <div style="font-size: 11px; color: var(--clr-primary-light); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;">
              ${escapeHtml(z.category || 'Silvikultur & Restorasi')}
            </div>
            <h4 style="color: #ffffff; font-size: 16px; font-weight: 800; margin: 4px 0 6px; line-height: 1.3;">
              ${escapeHtml(z.name)}
            </h4>
            <p style="color: var(--clr-text-muted); font-size: 12px; margin: 0; display: flex; align-items: center; gap: 4px;">
              <span>📍</span> ${escapeHtml(z.address || z.city || z.province || 'Aceh')}
            </p>
          </div>

          <!-- Mini Stats Grid -->
          <div class="zone-card-stats">
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Luas Lahan</span>
              <span class="zone-card-stat-val" style="color: #38bdf8;">${(parseFloat(z.area_in_ha) || 0).toFixed(2)} Ha</span>
            </div>
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Bibit Awal</span>
              <span class="zone-card-stat-val" style="color: #fbbf24;">${(z.total_initial_seedlings || 0).toLocaleString('id-ID')}</span>
            </div>
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Kegiatan</span>
              <span class="zone-card-stat-val">${z.activities_count || 0} Batch</span>
            </div>
            <div class="zone-card-stat-item">
              <span class="zone-card-stat-label">Survival</span>
              <span class="zone-card-stat-val" style="color: ${survivalVal !== null && survivalVal >= 75 ? '#34d399' : '#c084fc'};">
                ${survivalVal !== null ? `${survivalVal}%` : 'Belum Sensus'}
              </span>
            </div>
          </div>

          <!-- Card Actions Footer -->
          <div style="display: flex; gap: 6px; align-items: center; justify-content: space-between; border-top: 1px solid var(--clr-border-subtle); padding-top: 14px; margin-top: 6px; flex-wrap: wrap;">
            <div style="display: flex; gap: 6px;">
              <button class="btn-action-detail zone-btn-action detail" data-id="${z.id}" title="Detail Kawasan">
                <span>🔍</span> Detail
              </button>
              <button class="btn-action-edit zone-btn-action edit" data-id="${z.id}" title="Edit Kawasan">
                <span>✏️</span> Edit
              </button>
              <button class="btn-action-tour zone-btn-action tour" data-id="${z.id}" title="Virtual Tour">
                <span>🌐</span> Tour
              </button>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn-action-archive zone-btn-action archive" data-id="${z.id}" title="${z.is_archived ? 'Pulihkan' : 'Arsipkan'}">
                <span>${z.is_archived ? '♻️' : '📦'}</span>
              </button>
              <button class="btn-action-delete zone-btn-action delete" data-id="${z.id}" title="Hapus Kawasan">
                <span>🗑️</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="zones-cards-grid">
      ${cards}
    </div>
  `;
}

function bindZoneTableActions() {
  const container = document.getElementById('zone-pane-container');
  if (!container) return;

  const tableBox = container.querySelector('.zones-table-box');
  if (tableBox) {
    tableBox.scrollLeft = 0;
  }

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
          window.dispatchEvent(new CustomEvent('zones-updated'));
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

  container.querySelectorAll('.btn-action-delete').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Yakin ingin menghapus kawasan ini? Kawasan tanpa data terkait akan dihapus permanen, atau diarsipkan jika memiliki data.')) {
        try {
          const res = await ApiService.deleteZone(id);
          window.dispatchEvent(new CustomEvent('zones-updated'));
          EcoToast.show({
            type: 'success',
            title: res.action === 'deleted' ? '✓ Berhasil dihapus' : '✓ Berhasil diarsipkan',
            message: res.message || 'Kawasan berhasil dihapus.',
          });
          await loadZonesList();
        } catch (e) {
          EcoToast.error('✕ Gagal menghapus kawasan', e.message);
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
    <div class="zone-form-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; border-bottom: 1px solid var(--clr-border); padding-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <h3 style="color: #fff; margin: 0; font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
          <span>${isEdit ? '✏️' : '➕'}</span> <span>${formTitle}</span>
        </h3>
        <button id="btn-cancel-zone-form" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
          <span>←</span> Kembali ke Daftar
        </button>
      </div>

      <form id="zone-edit-form">
        <input type="hidden" id="form-zone-id" value="${existingZone ? existingZone.id : ''}" />

        <!-- BAGIAN 1: INFORMASI DASAR -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">1</span>
            <span>Informasi Dasar Kawasan</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="form-zone-code" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Kode Kawasan (Unik): <span style="color: var(--clr-danger);">*</span>
              </label>
              <input type="text" id="form-zone-code" class="form-input" required placeholder="Contoh: KW-ACEH-02" value="${existingZone ? existingZone.zone_code : ''}" />
              <small style="color: var(--clr-text-dim); font-size: 11px; display: block; margin-top: 4px;">Kode unik sebagai pengenal permanen dalam sistem.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-name" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Nama Kawasan: <span style="color: var(--clr-danger);">*</span>
              </label>
              <input type="text" id="form-zone-name" class="form-input" required placeholder="Nama lengkap kawasan penanaman" value="${existingZone ? escapeHtml(existingZone.name) : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-category" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Kategori Kawasan:
              </label>
              <input type="text" id="form-zone-category" class="form-input" placeholder="e.g. Silvikultur, Konservasi Pesisir, Arboretum" value="${existingZone ? escapeHtml(existingZone.category || '') : 'Silvikultur & Konservasi'}" />
            </div>
            <div class="form-group">
              <label for="form-zone-status" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Status Kawasan: <span style="color: var(--clr-danger);">*</span>
              </label>
              <select id="form-zone-status" class="form-select" required>
                <option value="preparation" ${existingZone && existingZone.status === 'preparation' ? 'selected' : ''}>Persiapan Lahan</option>
                <option value="active" ${!existingZone || existingZone.status === 'active' ? 'selected' : ''}>Aktif Penanaman</option>
                <option value="monitoring" ${existingZone && existingZone.status === 'monitoring' ? 'selected' : ''}>Pemantauan</option>
                <option value="completed" ${existingZone && existingZone.status === 'completed' ? 'selected' : ''}>Selesai / Mandiri</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-purpose" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
              Tujuan Penanaman:
            </label>
            <input type="text" id="form-zone-purpose" class="form-input" placeholder="Tujuan utama program penanaman pada kawasan ini" value="${existingZone ? escapeHtml(existingZone.planting_purpose || '') : ''}" />
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-desc" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
              Deskripsi Kawasan:
            </label>
            <textarea id="form-zone-desc" class="form-input" rows="3" placeholder="Uraian gambaran umum kawasan, vegetasi, dan karakteristik ekosistem">${existingZone ? escapeHtml(existingZone.description || '') : ''}</textarea>
          </div>
        </div>

        <!-- BAGIAN 2: INFORMASI LOKASI -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">2</span>
            <span>Informasi Lokasi Deskriptif & Titik Referensi</span>
          </div>
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="form-zone-address" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
              Alamat / Keterangan Lokasi:
            </label>
            <input type="text" id="form-zone-address" class="form-input" placeholder="Jalan, blok, atau patokan lokasi deskriptif" value="${existingZone ? escapeHtml(existingZone.address || '') : ''}" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-village" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Desa / Gampong:</label>
              <input type="text" id="form-zone-village" class="form-input" placeholder="Gampong" value="${existingZone ? escapeHtml(existingZone.village || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-district" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Kecamatan:</label>
              <input type="text" id="form-zone-district" class="form-input" placeholder="Kecamatan" value="${existingZone ? escapeHtml(existingZone.district || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-city" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Kabupaten / Kota:</label>
              <input type="text" id="form-zone-city" class="form-input" placeholder="Kabupaten" value="${existingZone ? escapeHtml(existingZone.city || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-province" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Provinsi:</label>
              <input type="text" id="form-zone-province" class="form-input" placeholder="Provinsi" value="${existingZone ? escapeHtml(existingZone.province || '') : 'Aceh'}" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 14px;">
            <div class="form-group">
              <label for="form-zone-lat" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Latitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lat" class="form-input" placeholder="Contoh: 5.4818556" value="${existingZone && existingZone.latitude ? existingZone.latitude : ''}" />
              <small style="color: var(--clr-text-dim); font-size: 11px; display: block; margin-top: 4px;">Titik koordinat referensi patok, bukan poligon GPS.</small>
            </div>
            <div class="form-group">
              <label for="form-zone-lng" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Longitude Titik Acuan (Opsional):</label>
              <input type="number" step="0.0000001" id="form-zone-lng" class="form-input" placeholder="Contoh: 95.5840917" value="${existingZone && existingZone.longitude ? existingZone.longitude : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-access" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Catatan Akses Lapangan:</label>
              <input type="text" id="form-zone-access" class="form-input" placeholder="Akses kendaraan, jalan setapak, rute masuk" value="${existingZone ? escapeHtml(existingZone.access_notes || '') : ''}" />
            </div>
          </div>
        </div>

        <!-- BAGIAN 3: INFORMASI LAHAN & LUASAN -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">3</span>
            <span>Informasi Lahan & Luasan (Input Manual Bebas Poligon)</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-area-size" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Luas Lahan: <span style="color: var(--clr-danger);">*</span>
              </label>
              <input type="number" step="0.01" min="0" id="form-zone-area-size" class="form-input" required placeholder="Contoh: 2.00" value="${existingZone ? existingZone.area_size : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-area-unit" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">
                Satuan Luas: <span style="color: var(--clr-danger);">*</span>
              </label>
              <select id="form-zone-area-unit" class="form-select" required>
                <option value="ha" ${!existingZone || existingZone.area_unit === 'ha' ? 'selected' : ''}>Hektare (ha)</option>
                <option value="m2" ${existingZone && existingZone.area_unit === 'm2' ? 'selected' : ''}>Meter Persegi (m²)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="form-zone-meas-method" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Metode Pengukuran Luas:</label>
              <input type="text" id="form-zone-meas-method" class="form-input" placeholder="e.g. Survei Patok Batas, Data Deskriptif" value="${existingZone ? escapeHtml(existingZone.measurement_method || '') : 'Survei Patok Lapangan Deskriptif'}" />
            </div>
            <div class="form-group">
              <label for="form-zone-meas-date" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Tanggal Pengukuran:</label>
              <input type="date" id="form-zone-meas-date" class="form-input" value="${existingZone && existingZone.measurement_date ? toDateInputValue(existingZone.measurement_date) : ''}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-land-notes" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Catatan Kondisi Lahan & Tanah:</label>
            <textarea id="form-zone-land-notes" class="form-input" rows="2" placeholder="Kondisi topografi, jenis tanah, kemiringan lereng, vegetasi awal">${existingZone ? escapeHtml(existingZone.land_condition_notes || '') : ''}</textarea>
          </div>
        </div>

        <!-- BAGIAN 4: PENGELOLAAN & PUBLIKASI -->
        <div class="zone-form-section">
          <div class="zone-form-sec-title">
            <span class="zone-form-sec-num">4</span>
            <span>Pengelolaan, Target & Publikasi</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
            <div class="form-group">
              <label for="form-zone-pic" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Penanggung Jawab / Koordinator:</label>
              <input type="text" id="form-zone-pic" class="form-input" placeholder="Nama koordinator lapangan" value="${existingZone ? escapeHtml(existingZone.person_in_charge || '') : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-org" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Organisasi / Lembaga Mitra:</label>
              <input type="text" id="form-zone-org" class="form-input" placeholder="IKHW / Mitra" value="${existingZone ? escapeHtml(existingZone.organization || '') : 'IKHW Aceh'}" />
            </div>
            <div class="form-group">
              <label for="form-zone-target" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Target Penanaman (Batang):</label>
              <input type="number" min="0" id="form-zone-target" class="form-input" placeholder="e.g. 1000" value="${existingZone && existingZone.planting_target ? existingZone.planting_target : ''}" />
            </div>
            <div class="form-group">
              <label for="form-zone-start-date" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Tanggal Mulai Program:</label>
              <input type="date" id="form-zone-start-date" class="form-input" value="${existingZone && existingZone.start_date ? toDateInputValue(existingZone.start_date) : ''}" />
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="form-zone-internal-notes" style="display: block; font-size: 12px; font-weight: 600; color: var(--clr-text-muted); margin-bottom: 6px;">Catatan Internal (Tidak Tampil ke Publik):</label>
            <textarea id="form-zone-internal-notes" class="form-input" rows="2" placeholder="Catatan internal pengelola">${existingZone ? escapeHtml(existingZone.internal_notes || '') : ''}</textarea>
          </div>

          <div style="display: flex; gap: 20px; align-items: center; margin-top: 16px; padding: 12px; background: rgba(16, 185, 129, 0.08); border-radius: var(--radius-sm); border: 1px solid rgba(16, 185, 129, 0.2);">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: #fff; font-size: 13px; font-weight: 500;">
              <input type="checkbox" id="form-zone-published" style="width: 16px; height: 16px; accent-color: var(--clr-primary);" ${!existingZone || existingZone.is_published ? 'checked' : ''} />
              <span>Publikasikan kawasan ini ke halaman publik dan navigasi Virtual Tour</span>
            </label>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 12px; border-top: 1px solid var(--clr-border); padding-top: 20px;">
          <button type="button" id="btn-cancel-form" class="btn-secondary-action" style="cursor: pointer;">Batal</button>
          <button type="submit" id="btn-submit-zone" class="btn-primary-action" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>💾</span> <span>${isEdit ? 'Simpan Perubahan' : 'Tambahkan Kawasan'}</span>
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
      submitBtn.innerHTML = '<span>⏳</span> Menyimpan...';

      try {
        const res = await ApiService.saveZone(payload, zoneId || null);
        window.dispatchEvent(new CustomEvent('zones-updated'));
        if (isEdit) {
          EcoToast.updated(res.message || 'Perubahan data kawasan berhasil disimpan.');
        } else {
          EcoToast.created(res.message || 'Data kawasan baru berhasil disimpan.');
        }
        await loadZonesList();
      } catch (err) {
        EcoToast.error('✕ Gagal menyimpan kawasan', err.message || 'Periksa kembali formulir kawasan dan coba lagi.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>💾</span> <span>${isEdit ? 'Simpan Perubahan' : 'Tambahkan Kawasan'}</span>`;
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
    <div style="display: flex; justify-content: center; align-items: center; padding: 60px 20px; color: var(--clr-text-muted); gap: 12px;">
      <span class="loading-spinner"></span> Memuat detail kawasan (8 Tab)...
    </div>
  `;

  try {
    const data = await ApiService.getZone(zoneId);
    selectedZoneDetail = data;
    renderZoneDetailView(data, initialDetailTab);
  } catch (err) {
    pane.innerHTML = `
      <div class="alert-error" style="padding: 18px 22px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: var(--radius-md); color: #fca5a5; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
        <div>❌ Gagal memuat detail kawasan: ${escapeHtml(err.message)}</div>
        <button id="btn-back-to-list" class="btn-secondary-action btn-sm" style="cursor: pointer;">← Kembali</button>
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
    <div style="background: var(--clr-surface); padding: 22px 26px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); margin-bottom: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span style="font-family: monospace; font-size: 13px; font-weight: 700; background: rgba(16,185,129,0.15); color: #34d399; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.3);">
              ${escapeHtml(z.zone_code)}
            </span>
            <h2 style="margin: 0; color: #fff; font-size: 22px; font-weight: 800;">${escapeHtml(z.name)}</h2>
            ${getStatusBadge(z.status)}
          </div>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 8px 0 0; display: flex; align-items: center; gap: 6px;">
            <span>📍</span> ${escapeHtml(z.address || (z.village ? z.village + ', ' + z.district : 'Lokasi Terdaftar'))} • ${escapeHtml(z.city || 'Aceh')}
          </p>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button id="btn-detail-edit-zone" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>✏️</span> Edit Kawasan
          </button>
          <button id="btn-detail-back-list" class="btn-text-btn btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>←</span> Daftar Kawasan
          </button>
        </div>
      </div>

      <!-- 8 Tabs Bar -->
      <div class="zone-detail-tabs" style="display: flex; gap: 6px; border-bottom: 1px solid var(--clr-border); padding-top: 18px; margin-top: 16px; overflow-x: auto;">
        <button class="zone-tab-link active" data-tab="tab-ringkasan">1. Ringkasan</button>
        <button class="zone-tab-link" data-tab="tab-lahan">2. Informasi Lahan</button>
        <button class="zone-tab-link" data-tab="tab-penanaman">3. Jenis & Penanaman</button>
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
        <span class="stat-value" style="color: #38bdf8;">${z.area_size} ${z.area_unit}</span>
        <span class="stat-desc">±${s.area_in_ha} Hektare (Deskriptif)</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Kegiatan Penanaman</span>
        <span class="stat-value">${s.activities_count}</span>
        <span class="stat-desc">Batch kegiatan terdaftar</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Total Bibit Awal Ditanam</span>
        <span class="stat-value" style="color: #fbbf24;">${(s.total_initial_seedlings || 0).toLocaleString('id-ID')}</span>
        <span class="stat-desc">${s.unique_species_count} Spesies Pohon Berbeda</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Kelangsungan Hidup Terkini</span>
        <span class="stat-value" style="color: ${s.survival_rate && s.survival_rate >= 75 ? '#34d399' : '#f59e0b'};">
          ${survivalDisplay}
        </span>
        <span class="stat-desc">Formula: Bibit hidup awal / awal ditanam</span>
      </div>
      <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <span class="stat-label">Scene Panorama Terkait</span>
        <span class="stat-value">${s.scenes_count}</span>
        <span class="stat-desc">Terhubung Marzipano</span>
      </div>
    </div>

    <!-- Description & Context -->
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Tujuan & Deskripsi Kawasan</h4>
      <p style="color: var(--clr-text-muted); font-size: 13.5px; line-height: 1.6; margin-top: 8px;">
        ${escapeHtml(z.description || 'Tidak ada deskripsi tambahan.')}
      </p>
      ${z.planting_purpose ? `
        <div style="margin-top: 14px; padding: 14px 16px; background: rgba(16, 185, 129, 0.08); border-left: 3px solid var(--clr-primary); border-radius: 6px;">
          <strong style="color: var(--clr-primary); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em;">TUJUAN PENANAMAN:</strong>
          <p style="margin: 4px 0 0; color: #fff; font-size: 13.5px;">${escapeHtml(z.planting_purpose)}</p>
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
      <h3 style="color: #fff; font-size: 16px; font-weight: 700; margin-top: 0; margin-bottom: 18px;">Spesifikasi & Karakteristik Lahan</h3>
      <table class="data-table" style="width: 100%; font-size: 13px;">
        <tbody>
          <tr>
            <td style="width: 240px; color: var(--clr-text-muted); padding: 12px 0;">Luas Tercatat</td>
            <td style="color: #38bdf8; font-weight: 700;">${l.area_size} ${l.area_unit} (±${l.area_in_ha} Hektare)</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Metode Pengukuran</td>
            <td style="color: #fff;">${escapeHtml(l.measurement_method || '-')}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Tanggal Pengukuran</td>
            <td style="color: #fff;">${formatDateDisplay(l.measurement_date)}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Kondisi Lahan & Tanah</td>
            <td style="color: #fff;">${escapeHtml(l.land_condition_notes || 'Belum ada catatan khusus')}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Titik Koordinat Acuan</td>
            <td style="color: #fff;">
              ${l.latitude && l.longitude ? `${l.latitude}° N, ${l.longitude}° E (Patok Referensi)` : '<span style="color:var(--clr-text-dim)">Tidak ada koordinat GPS (Input deskriptif tetap valid)</span>'}
            </td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Aksesibilitas / Rute</td>
            <td style="color: #fff;">${escapeHtml(l.access_notes || '-')}</td>
          </tr>
          <tr>
            <td style="color: var(--clr-text-muted); padding: 12px 0;">Alamat Administratif</td>
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
      <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Jenis Pohon Tertanam di Kawasan Ini (${species.length} Jenis)</h4>
        ${species.length > 0 ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 14px;">
            ${species.map((sp) => `
              <div style="background: var(--clr-surface-card); padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
                <div style="font-weight: 700; color: #fff; font-size: 14px;">${escapeHtml(sp.local_name)}</div>
                <div style="font-style: italic; font-size: 12px; color: var(--clr-primary-light);">${escapeHtml(sp.scientific_name)}</div>
                <div style="font-size: 11px; color: var(--clr-text-muted); margin-top: 4px;">Famili: ${escapeHtml(sp.family || '-')}</div>
                <div style="font-size: 14px; font-weight: 800; color: #fbbf24; margin-top: 8px;">
                  ${(sp.total_initial_quantity || 0).toLocaleString('id-ID')} Batang
                </div>
              </div>
            `).join('')}
          </div>
        ` : '<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada bibit pohon yang tercatat di kawasan ini.</p>'}
      </div>

      <!-- Riwayat Kegiatan Penanaman -->
      <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Daftar Kegiatan Penanaman (${acts.length} Kegiatan)</h4>
        ${acts.length > 0 ? `
          <div style="overflow-x: auto; margin-top: 14px;">
            <table class="zones-table" style="min-width: 600px;">
              <thead>
                <tr>
                  <th>Batch Code</th>
                  <th>Nama Kegiatan</th>
                  <th>Tanggal</th>
                  <th>Spesies & Jumlah</th>
                  <th>Penanggung Jawab</th>
                </tr>
              </thead>
              <tbody>
                ${acts.map((act) => `
                  <tr>
                    <td style="font-family: monospace; color: #34d399; font-weight: 700;">${act.batch_code}</td>
                    <td style="font-weight: 600; color: #fff;">${escapeHtml(act.name)}</td>
                    <td>${formatDateDisplay(act.activity_date)}</td>
                    <td>
                      ${act.items && act.items.length > 0 ? act.items.map((it) => `${it.species ? it.species.local_name : 'Pohon'}: ${it.quantity} ${it.unit || 'btg'}`).join(', ') : '-'}
                    </td>
                    <td>${escapeHtml(act.person_in_charge || '-')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : '<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada kegiatan penanaman yang dicatat pada kawasan ini.</p>'}
      </div>
    </div>
  `;
}

// ── Tab 4: Pemantauan ──
function renderTabPemantauanHtml(data) {
  const surveys = data.surveys || [];
  return `
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Catatan Survei & Pemantauan Tanaman Historis (${surveys.length} Survei)</h4>
      ${surveys.length > 0 ? `
        <div style="overflow-x: auto; margin-top: 14px;">
          <table class="zones-table" style="min-width: 640px;">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Kegiatan / Batch</th>
                <th style="text-align: center;">Hidup Awal</th>
                <th style="text-align: center;">Mati</th>
                <th style="text-align: center;">Hilang</th>
                <th>Kondisi</th>
                <th>Pemeriksa</th>
              </tr>
            </thead>
            <tbody>
              ${surveys.map((sv) => `
                <tr>
                  <td>${formatDateDisplay(sv.survey_date)}</td>
                  <td style="font-weight: 600; color: #fff;">${sv.activity ? sv.activity.name : '-'}</td>
                  <td style="text-align: center; color: #34d399; font-weight: 700;">${sv.alive_count || 0}</td>
                  <td style="text-align: center; color: var(--clr-danger); font-weight: 700;">${sv.dead_count || 0}</td>
                  <td style="text-align: center; color: #fbbf24; font-weight: 700;">${sv.missing_count || 0}</td>
                  <td>${escapeHtml(sv.health_condition || '-')}</td>
                  <td>${escapeHtml(sv.inspector_name || '-')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada survei pemantauan untuk kawasan ini.</p>'}
    </div>
  `;
}

// ── Tab 5: Perawatan ──
function renderTabPerawatanHtml(data) {
  const logs = data.maintenance || [];
  return `
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <h4 style="color: #fff; margin-top: 0; font-size: 15px; font-weight: 700;">Riwayat Tindakan Silvikultur, Perawatan & Penyulaman (${logs.length} Tindakan)</h4>
      ${logs.length > 0 ? `
        <div style="overflow-x: auto; margin-top: 14px;">
          <table class="zones-table" style="min-width: 640px;">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis Tindakan</th>
                <th style="text-align: center;">Jumlah Ditangani</th>
                <th style="text-align: center;">Bibit Sulaman</th>
                <th>Pelaksana</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map((lg) => `
                <tr>
                  <td>${formatDateDisplay(lg.maintenance_date)}</td>
                  <td style="font-weight: 700; color: #fff; text-transform: capitalize;">${escapeHtml(lg.action_type || '-')}</td>
                  <td style="text-align: center;">${lg.plants_treated_count || 0}</td>
                  <td style="text-align: center; color: #34d399; font-weight: 700;">${lg.replacement_plants_count || 0}</td>
                  <td>${escapeHtml(lg.executor_name || '-')}</td>
                  <td style="color: var(--clr-text-muted);">${escapeHtml(lg.notes || '-')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : '<p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 10px;">Belum ada tindakan perawatan atau penyulaman yang dicatat pada kawasan ini.</p>'}
    </div>
  `;
}

// ── Tab 7: Virtual Tour ──
function renderTabTourHtml(data) {
  const scenes = data.scenes || [];
  return `
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px; font-weight: 700;">Panorama 360° Terhubung Kawasan Ini (${scenes.length} Scene)</h4>
        <a href="#tour" class="btn-primary-action btn-sm" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
          <span>🌐</span> Buka Virtual Tour Penuh
        </a>
      </div>
      ${scenes.length > 0 ? `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px;">
          ${scenes.map((sc) => `
            <div style="background: var(--clr-surface-card); border-radius: var(--radius-sm); overflow: hidden; border: 1px solid var(--clr-border-subtle);">
              <img src="${sc.thumbnail_path || '/tiles/' + sc.id + '/preview.jpg'}" alt="${sc.name}" style="width: 100%; height: 130px; object-fit: cover;" onerror="this.src='/favicon.svg'" />
              <div style="padding: 12px;">
                <div style="font-weight: 700; color: #fff; font-size: 13.5px;">${escapeHtml(sc.name)}</div>
                <div style="font-size: 11.5px; color: var(--clr-primary-light); margin-top: 4px;">🎯 ${sc.hotspots_count || 0} Hotspots</div>
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
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px; font-weight: 700;">Ekspor Laporan Kawasan: ${escapeHtml(z.name)}</h4>
        <div style="display: flex; gap: 8px;">
          <a href="/api/admin/trees/reports/summary/csv" class="btn-secondary-action btn-sm" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px;" download>
            <span>📥</span> Unduh Ringkasan CSV
          </a>
          <button onclick="window.print()" class="btn-text-btn btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
            <span>🖨️</span> Cetak Halaman
          </button>
        </div>
      </div>
      <div style="background: var(--clr-surface-card); padding: 20px; border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle); font-size: 13.5px; line-height: 1.8;">
        <div><strong>Kawasan:</strong> ${escapeHtml(z.name)} (${escapeHtml(z.zone_code)})</div>
        <div><strong>Luas Tercatat:</strong> ${z.area_size} ${z.area_unit} (±${s.area_in_ha} Ha)</div>
        <div><strong>Status:</strong> ${escapeHtml(z.status)} • <strong>Target Penanaman:</strong> ${z.planting_target || '-'} batang</div>
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
    <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 22px; flex-wrap: wrap; gap: 10px;">
        <div>
          <h3 style="color: #fff; margin: 0; font-size: 18px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
            <span>🖼️</span> Galeri Dokumentasi Foto per Kawasan
          </h3>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin: 4px 0 0;">
            Pilih kawasan penanaman untuk melihat, mengunggah, atau mengelola foto dokumentasi lapangannya.
          </p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 18px;">
        ${cachedZones.map((z) => `
          <div class="zone-grid-card">
            <div class="zone-card-cover">
              ${z.main_photo_path ? `
                <img src="${z.main_photo_path}" alt="${escapeHtml(z.name)}" onerror="this.onerror=null; this.src='/favicon.svg';" />
              ` : `
                <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(12,20,16,0.95) 100%);">
                  <span style="font-size: 40px; margin-bottom: 4px;">🏞️</span>
                  <span style="font-size: 11px; color: var(--clr-text-muted);">Foto Sampul Belum Diatur</span>
                </div>
              `}
              <div style="position: absolute; top: 10px; right: 10px; z-index: 2;">
                ${getStatusBadge(z.status)}
              </div>
              <div style="position: absolute; top: 10px; left: 10px; z-index: 2;">
                <span style="font-family: monospace; font-size: 11px; font-weight: 700; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: #34d399; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(16,185,129,0.35);">
                  ${escapeHtml(z.zone_code)}
                </span>
              </div>
            </div>
            <div class="zone-card-body">
              <div>
                <h5 style="margin: 0 0 6px; color: #fff; font-size: 15px; font-weight: 800;">${escapeHtml(z.name)}</h5>
                <p style="font-size: 12px; color: var(--clr-text-muted); margin: 0;">
                  📐 ${z.area_size} ${z.area_unit} • 🏷️ ${escapeHtml(z.category || 'Konservasi')}
                </p>
              </div>
              <button class="btn-open-zone-gallery btn-primary-action btn-sm" data-id="${z.id}" style="width: 100%; margin-top: 16px; justify-content: center; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                <span>🖼️</span> Buka Galeri Kawasan
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
