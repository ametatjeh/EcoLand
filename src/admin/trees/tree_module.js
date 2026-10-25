/**
 * Modul Data Penanaman dan Pemantauan Pohon — Admin Orchestrator
 * Mengelola 7 Submenu:
 * 1. Dashboard Penanaman
 * 2. Master Jenis Pohon
 * 3. Kegiatan Penanaman
 * 4. Pemantauan Tanaman
 * 5. Perawatan dan Penyulaman
 * 6. Laporan Penanaman
 * 7. Impor dan Ekspor Data
 */
import { ApiService } from '../../services/api.js';
import { EcoToast } from '../../utils/toast.js';
import { toDateInputValue, formatDateDisplay, parseDateForPayload } from '../../utils/date.js';

let currentTreeTab = 'dashboard';
let cachedSpecies = [];
let cachedActivities = [];
let cachedZones = [];
let cachedScenes = [];

export async function initTreeModule({ scenes = [] } = {}) {
  cachedScenes = scenes;
  const container = document.getElementById('admin-trees-content');
  if (!container) return;

  renderTreeModuleLayout(container, scenes);
  await loadTreeTabData(currentTreeTab, scenes);
}

export async function switchTreeSubTab(tabName, scenes = []) {
  if (scenes && scenes.length > 0) cachedScenes = scenes;
  currentTreeTab = tabName;
  const container = document.getElementById('admin-trees-content');
  if (!container) return;

  if (!document.getElementById('tree-subpane-content')) {
    renderTreeModuleLayout(container, scenes);
  }
  await loadTreeTabData(tabName, scenes);
}

function renderTreeModuleLayout(container, scenes) {
  container.innerHTML = `
    <!-- Tree Subpane Content Area -->
    <div id="tree-subpane-content" style="min-height: 400px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px;">
        <span class="loading-spinner"></span> Memuat data penanaman...
      </div>
    </div>
  `;
}

async function loadTreeTabData(tab, scenes) {
  const contentEl = document.getElementById('tree-subpane-content');
  if (!contentEl) return;

  try {
    if (tab === 'dashboard') {
      await renderDashboardTab(contentEl);
    } else if (tab === 'species') {
      await renderSpeciesTab(contentEl);
    } else if (tab === 'activities') {
      await renderActivitiesTab(contentEl, scenes);
    } else if (tab === 'surveys') {
      await renderSurveysTab(contentEl);
    } else if (tab === 'maintenance') {
      await renderMaintenanceTab(contentEl);
    } else if (tab === 'reports') {
      renderReportsTab(contentEl);
    } else if (tab === 'import-export') {
      renderImportExportTab(contentEl);
    }
  } catch (err) {
    contentEl.innerHTML = `
      <div class="alert-banner alert-danger" style="margin: 20px 0;">
        ⚠️ Terjadi kesalahan saat memuat modul: ${escapeHtml(err.message)}
      </div>
    `;
  }
}

// ─────────────────────────────────────────────────────────────
// 1. DASHBOARD PENANAMAN
// ─────────────────────────────────────────────────────────────
async function renderDashboardTab(container) {
  container.innerHTML = `<div style="text-align: center; padding: 30px;">⏳ Memuat indikator penanaman...</div>`;
  const res = await ApiService.getTreeDashboard();
  const ind = res.indicators || {};
  const needs = res.needs_inspection || [];
  const speciesDist = res.charts?.species_distribution || [];

  const rateDisplay = ind.survival_rate !== null ? `${ind.survival_rate}%` : 'Data Belum Lengkap';
  const rateClass = ind.survival_rate !== null ? (ind.survival_rate >= 80 ? 'pill-success' : (ind.survival_rate >= 60 ? 'pill-warning' : 'pill-danger')) : 'pill-neutral';

  container.innerHTML = `
    <!-- Top KPI Grid: 7 Indikator Utama + Kelangsungan Hidup -->
    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px;">
      <div class="stat-card">
        <span class="stat-label">Total Kawasan Aktif</span>
        <span class="stat-value" style="color: #38bdf8;">${ind.total_zones || 0}</span>
        <span class="stat-desc">Kawasan penanaman terdaftar</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Jenis Pohon</span>
        <span class="stat-value">${ind.total_species || 0}</span>
        <span class="stat-desc">Spesies kayu & buah hutan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kegiatan Penanaman</span>
        <span class="stat-value" style="color: #60a5fa;">${ind.total_activities || 0}</span>
        <span class="stat-desc">Batch penanaman lapangan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Total Bibit Awal</span>
        <span class="stat-value" style="color: var(--clr-primary, #10b981);">${ind.total_initial_seedlings?.toLocaleString() || 0}</span>
        <span class="stat-desc">Bibit kelompok awal historis</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kelompok Dipantau</span>
        <span class="stat-value" style="color: #a78bfa;">${ind.monitored_batches_count || 0}</span>
        <span class="stat-desc">Sudah memiliki data survei</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Scene Panorama</span>
        <span class="stat-value">${ind.total_scenes || 0}</span>
        <span class="stat-desc">Titik foto 360° Marzipano</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Hotspot Terdaftar</span>
        <span class="stat-value">${ind.total_hotspots || 0}</span>
        <span class="stat-desc">Navigasi & info lapangan</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Kelangsungan Hidup</span>
        <span class="stat-value"><span class="admin-header-pill ${rateClass}" style="font-size: 16px; padding: 3px 8px;">${rateDisplay}</span></span>
        <span class="stat-desc">Hidup Awal ÷ Bibit Awal</span>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-bottom: 24px;">
      <!-- Distribusi Spesies -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          🌳 Distribusi Bibit per Jenis Pohon
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${
            speciesDist.length > 0
              ? speciesDist
                  .map(
                    (s) => `
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 3px;">
                  <span style="font-weight: 500;">${escapeHtml(s.common_name)} <i>(${escapeHtml(s.scientific_name)})</i></span>
                  <span style="font-weight: 600;">${s.total_planted} bibit</span>
                </div>
                <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden;">
                  <div style="background: var(--clr-primary, #10b981); height: 100%; width: ${Math.min(100, (s.total_planted / Math.max(1, ind.total_initial_seedlings)) * 100)}%;"></div>
                </div>
              </div>
            `
                  )
                  .join('')
              : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada bibit tercatat.</p>'
          }
        </div>
      </div>

      <!-- Distribusi menurut Kawasan -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          📍 Distribusi Penanaman Menurut Kawasan
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${
            (res.charts?.zone_distribution && res.charts.zone_distribution.length > 0)
              ? res.charts.zone_distribution.map((zd) => `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 3px;">
                    <span style="font-weight: 500;">${escapeHtml(zd.name)} <code style="font-size:11px;color:#38bdf8;">(${escapeHtml(zd.zone_code)})</code></span>
                    <span style="font-weight: 600;">${Number(zd.total_planted).toLocaleString('id-ID')} bibit</span>
                  </div>
                  <div style="background: rgba(255,255,255,0.08); height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: #38bdf8; height: 100%; width: ${Math.min(100, (zd.total_planted / Math.max(1, ind.total_initial_seedlings)) * 100)}%;"></div>
                  </div>
                </div>
              `).join('')
              : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada bibit terdistribusi ke kawasan.</p>'
          }
        </div>
      </div>
    </div>

    <!-- Kelompok Perlu Pemeriksaan & Aktivitas Terkini -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 20px; margin-bottom: 24px;">
      <!-- Kelompok Perlu Pemeriksaan -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          ⚠️ Kelompok Perlu Survei Ulang (${needs.length})
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto;">
          ${
            needs.length > 0
              ? needs
                  .map(
                    (n) => `
              <div style="padding: 10px 12px; background: rgba(255,255,255,0.03); border-left: 3px solid #f59e0b; border-radius: 4px; font-size: 13px;">
                <div style="display: flex; justify-content: space-between; font-weight: 500;">
                  <span>${escapeHtml(n.batch_code)} — ${escapeHtml(n.name)}</span>
                  <span style="color: #f59e0b;">${n.survival_rate !== null ? n.survival_rate + '%' : 'Belum Survei'}</span>
                </div>
                <div style="font-size: 12px; color: var(--clr-text-muted); margin-top: 3px;">
                  📍 ${escapeHtml(n.location_zone)} • ${escapeHtml(n.reason)}
                </div>
              </div>
            `
                  )
                  .join('')
              : '<p style="color: var(--clr-primary, #10b981); font-size: 13px;">✓ Semua kelompok penanaman dalam kondisi pemantauan baik.</p>'
          }
        </div>
      </div>

      <!-- Riwayat Survei Terkini -->
      <div class="admin-pane-card" style="padding: 18px;">
        <h3 style="font-size: 15px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          📋 Survei Pemantauan Terkini
        </h3>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto;">
          ${
            (res.recent_surveys && res.recent_surveys.length > 0)
              ? res.recent_surveys.map((sv) => `
                <div style="padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 4px; font-size: 12px;">
                  <div style="display: flex; justify-content: space-between;">
                    <strong>${escapeHtml(sv.batch_code || '-')}</strong>
                    <span style="color: #94a3b8;">📅 ${formatDateDisplay(sv.survey_date)}</span>
                  </div>
                  <div style="color: #cbd5e1; margin-top: 2px;">
                    Hidup: <strong style="color: #34d399;">${sv.alive_count} btg</strong> • Kondisi: ${escapeHtml(sv.health_condition || '-')} • Petugas: ${escapeHtml(sv.inspector_name || '-')}
                  </div>
                </div>
              `).join('')
              : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada catatan survei pemantauan terbaru.</p>'
          }
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 2. MASTER JENIS POHON
// ─────────────────────────────────────────────────────────────
async function renderSpeciesTab(container) {
  container.innerHTML = `<div style="text-align: center; padding: 30px;">⏳ Memuat master jenis pohon...</div>`;
  const res = await ApiService.getTreeSpecies();
  cachedSpecies = res.species || [];

  container.innerHTML = `
    <!-- Breadcrumb & Header -->
    <div style="margin-bottom: 16px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin" style="color: var(--clr-text-muted); text-decoration: none;">Admin Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: #34d399; font-weight: 600;">Master Jenis Pohon</span>
      </nav>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <h2 style="font-size: 18px; font-weight: 700; color: #fff; margin: 0;">Master Data Jenis Pohon</h2>
          <p style="font-size: 12px; color: var(--clr-text-muted); margin: 4px 0 0;">Koleksi taksonomi jenis pohon silvikultur, status asal, dan data ekologis.</p>
        </div>
        <button id="btn-add-species" class="btn-primary-action btn-sm">
          ➕ Tambah Jenis Pohon Baru
        </button>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; gap: 8px; flex: 1; min-width: 260px;">
        <input type="text" id="filter-species-search" class="form-input" placeholder="Cari nama umum, ilmiah, famili..." style="max-width: 300px;" />
        <select id="filter-species-origin" class="form-select" style="max-width: 180px;">
          <option value="all">Semua Status Asal</option>
          <option value="lokal_asli">Jenis Lokal / Asli</option>
          <option value="introduksi">Jenis Introduksi</option>
          <option value="belum_diverifikasi">Belum Diverifikasi</option>
        </select>
      </div>
      <div style="font-size: 12px; color: var(--clr-text-muted);">
        Total: <strong style="color: #fff;" id="species-count-badge">${cachedSpecies.length}</strong> jenis
      </div>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Nama Umum & Ilmiah</th>
            <th style="padding: 10px 14px;">Famili</th>
            <th style="padding: 10px 14px;">Status Asal</th>
            <th style="padding: 10px 14px;">Fungsi Ekologis</th>
            <th style="padding: 10px 14px; text-align: right;">Total Ditanam</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody id="species-table-body">
          ${renderSpeciesRows(cachedSpecies)}
        </tbody>
      </table>
    </div>
  `;

  // Bind Events
  const searchInput = document.getElementById('filter-species-search');
  const originSelect = document.getElementById('filter-species-origin');

  const filterRows = () => {
    const q = searchInput.value.toLowerCase();
    const orig = originSelect.value;
    const filtered = cachedSpecies.filter((s) => {
      const matchQ = s.common_name.toLowerCase().includes(q) || s.scientific_name.toLowerCase().includes(q) || (s.local_name || '').toLowerCase().includes(q);
      const matchOrig = orig === 'all' || s.origin_status === orig;
      return matchQ && matchOrig;
    });
    document.getElementById('species-table-body').innerHTML = renderSpeciesRows(filtered);
    const badge = document.getElementById('species-count-badge');
    if (badge) badge.textContent = filtered.length;
    bindSpeciesActionBtns(container);
  };

  searchInput?.addEventListener('input', filterRows);
  originSelect?.addEventListener('change', filterRows);

  document.getElementById('btn-add-species')?.addEventListener('click', () => {
    renderSpeciesFormView(null, container);
  });

  bindSpeciesActionBtns(container);
}

function renderSpeciesRows(list) {
  if (list.length === 0) {
    return `<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Tidak ada data jenis pohon ditemukan.</td></tr>`;
  }
  return list
    .map(
      (s) => `
    <tr style="border-bottom: 1px solid var(--clr-border);">
      <td style="padding: 10px 14px;">
        <span style="font-weight: 600; color: var(--clr-text);">${escapeHtml(s.common_name)}</span><br>
        <span style="font-size: 12px; font-style: italic; color: var(--clr-primary, #10b981);">${escapeHtml(s.scientific_name)}</span>
        ${s.local_name ? `<span style="font-size: 11px; color: var(--clr-text-muted);"> (${escapeHtml(s.local_name)})</span>` : ''}
      </td>
      <td style="padding: 10px 14px;">${escapeHtml(s.family || '-')}</td>
      <td style="padding: 10px 14px;">
        <span class="admin-header-pill ${s.origin_status === 'lokal_asli' ? 'pill-success' : (s.origin_status === 'introduksi' ? 'pill-warning' : 'pill-neutral')}" style="font-size: 11px;">
          ${s.origin_status === 'lokal_asli' ? 'Lokal / Asli' : (s.origin_status === 'introduksi' ? 'Introduksi' : 'Belum Diverifikasi')}
        </span>
      </td>
      <td style="padding: 10px 14px; max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(s.ecological_function || '')}">
        ${escapeHtml(s.ecological_function || '-')}
      </td>
      <td style="padding: 10px 14px; text-align: right; font-weight: 600;">
        ${s.total_planted?.toLocaleString() || 0} bibit
      </td>
      <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
        <a href="#katalog?species=${encodeURIComponent(s.id)}" class="icon-btn-sm" title="Lihat Profil Jenis Pohon di Katalog" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none; font-size: 13px; margin-right: 4px;">👁️</a>
        <button class="btn-edit-species icon-btn-sm" data-id="${s.id}" title="Edit Data">✏️</button>
        <button class="btn-del-species icon-btn-sm" data-id="${s.id}" title="Hapus Spesies" style="color: #ef4444;">🗑️</button>
      </td>
    </tr>
  `
    )
    .join('');
}

function bindSpeciesActionBtns(container) {
  document.querySelectorAll('.btn-edit-species').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = cachedSpecies.find((s) => s.id === id);
      if (!item) return;
      renderSpeciesFormView(item, container);
    });
  });

  document.querySelectorAll('.btn-del-species').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const item = cachedSpecies.find((s) => s.id === id);
      const name = item ? item.common_name : 'spesies ini';
      if (confirm(`Yakin ingin menghapus jenis pohon "${name}"? Data yang sudah terhubung dengan kegiatan penanaman tidak dapat dihapus.`)) {
        try {
          await ApiService.deleteTreeSpecies(id);
          EcoToast.deleted(`Jenis pohon "${name}" berhasil dihapus.`);
          await renderSpeciesTab(container);
        } catch (e) {
          EcoToast.error('✕ Gagal menghapus jenis pohon', e.message);
        }
      }
    });
  });
}

/**
 * Halaman Baru Khusus Formulir Tambah / Edit Jenis Pohon
 * Terbagi menjadi 4 card utama:
 * Card 1: Identitas Pohon
 * Card 2: Klasifikasi Botani
 * Card 3: Informasi Ekologis
 * Card 4: Foto dan Referensi
 * Layout: 2 kolom desktop untuk field pendek, 1 kolom HP Android.
 * Sedia breadcrumb, tombol Kembali, Batal, Simpan, dan Preview singkat.
 */
function renderSpeciesFormView(item = null, container) {
  const isEdit = !!item;
  const pageTitle = isEdit ? `Edit Jenis Pohon: ${escapeHtml(item.common_name)}` : 'Tambah Jenis Pohon Baru';

  container.innerHTML = `
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin" style="color: var(--clr-text-muted); text-decoration: none;">Admin Dashboard</a>
        <span>&rsaquo;</span>
        <button id="breadcrumb-btn-species-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Master Jenis Pohon</button>
        <span>&rsaquo;</span>
        <span style="color: #34d399; font-weight: 600;">${isEdit ? 'Edit Spesies' : 'Tambah Spesies'}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${isEdit ? '✏️' : '🌱'}</span> ${pageTitle}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            Lengkapi atribut pohon untuk katalog publik dan modul pemantauan restorasi silvikultur kawasan ±2 hektare.
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-species" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-preview-species-form" class="btn-secondary-action btn-sm">
            👁️ Preview Singkat
          </button>
          <button type="button" id="btn-cancel-species-form" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-species-form" class="btn-primary-action btn-sm">
            💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Jenis Pohon'}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="species-form-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="species-page-form" enctype="multipart/form-data">
      <input type="hidden" id="page-sp-id" value="${isEdit ? item.id : ''}" />

      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- CARD 1: IDENTITAS POHON -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🏷️</span> Card 1 — Identitas Pohon
            </h3>
            <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="page-sp-common" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Umum (Indonesia): <span style="color: #ef4444;">*</span>
              </label>
              <input type="text" id="page-sp-common" class="form-input" required placeholder="Contoh: Merbau Aceh / Bungur" value="${escapeHtml(item?.common_name || '')}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama populer yang ditampilkan utama pada katalog publik.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-scientific" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Ilmiah (Spesies / Takson): <span style="color: #ef4444;">*</span>
              </label>
              <input type="text" id="page-sp-scientific" class="form-input" required placeholder="Contoh: Intsia bijuga / Lagerstroemia speciosa" value="${escapeHtml(item?.scientific_name || '')}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama ilmiah unik internasional (binomial nomenclature).</small>
            </div>

            <div class="form-group">
              <label for="page-sp-local" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Nama Lokal / Daerah:
              </label>
              <input type="text" id="page-sp-local" class="form-input" placeholder="Contoh: Kayu Ipil, Bungur Hutan" value="${escapeHtml(item?.local_name || '')}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama sebutan di kalangan warga lokal atau etnis Aceh.</small>
            </div>

            <div class="form-group" style="display: flex; flex-direction: column; justify-content: center;">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Status Publikasi & Operasional:
              </label>
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: var(--clr-text); font-size: 13px; padding-top: 6px;">
                <input type="checkbox" id="page-sp-active" ${!item || item.is_active ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: #10b981;" />
                <span>Aktif dan Ditampilkan di Katalog Publik</span>
              </label>
            </div>
          </div>
        </div>

        <!-- CARD 2: KLASIFIKASI BOTANI -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🌿</span> Card 2 — Klasifikasi Botani
            </h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
            <div class="form-group">
              <label for="page-sp-family" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Famili Botani:
              </label>
              <input type="text" id="page-sp-family" class="form-input" placeholder="Contoh: Fabaceae / Lythraceae / Moraceae" value="${escapeHtml(item?.family || '')}" />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Keluarga taksonomi botani pohon.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-origin" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Status Asal Spesies: <span style="color: #ef4444;">*</span>
              </label>
              <select id="page-sp-origin" class="form-select" required>
                <option value="lokal_asli" ${item?.origin_status === 'lokal_asli' ? 'selected' : ''}>Jenis Lokal / Asli (Indigenous)</option>
                <option value="introduksi" ${item?.origin_status === 'introduksi' ? 'selected' : ''}>Jenis Introduksi (Exotic / Naturalized)</option>
                <option value="belum_diverifikasi" ${!item || item?.origin_status === 'belum_diverifikasi' ? 'selected' : ''}>Belum Diverifikasi</option>
              </select>
              <small style="color: var(--clr-text-muted); font-size: 11px;">Klasifikasi keaslian pohon terhadap ekoregion Aceh.</small>
            </div>
          </div>
        </div>

        <!-- CARD 3: INFORMASI EKOLOGIS -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🌲</span> Card 3 — Informasi Ekologis & Silvikultur
            </h3>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group">
              <label for="page-sp-ecological" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Fungsi Ekologis:
              </label>
              <textarea id="page-sp-ecological" class="form-textarea" rows="3" placeholder="Penyedia habitat burung, naungan kanopi rapat, penahan erosi lereng terjal, pengikat nitrogen tanah...">${escapeHtml(item?.ecological_function || '')}</textarea>
              <small style="color: var(--clr-text-muted); font-size: 11px;">Peran spesies dalam keseimbangan ekosistem bentang alam.</small>
            </div>

            <div class="form-group">
              <label for="page-sp-benefits" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Manfaat &amp; Kegunaan Ekonomi / Tradisional:
              </label>
              <textarea id="page-sp-benefits" class="form-textarea" rows="2" placeholder="Kayu pertukangan bernilai tinggi, pakan satwa lebah madu, buah hutan konsumsi...">${escapeHtml(item?.benefits || '')}</textarea>
            </div>

            <div class="form-group">
              <label for="page-sp-desc" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Deskripsi Tambahan &amp; Morfologi:
              </label>
              <textarea id="page-sp-desc" class="form-textarea" rows="3" placeholder="Tinggi pohon dewasa dapat mencapai 25 meter, diameter batang 60 cm, daun majemuk berpasangan...">${escapeHtml(item?.description || '')}</textarea>
            </div>
          </div>
        </div>

        <!-- CARD 4: FOTO DAN REFERENSI -->
        <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
          <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>📸</span> Card 4 — Foto dan Referensi
            </h3>
            <span id="sp-photos-count-badge" style="font-size: 11px; background: rgba(16, 185, 129, 0.15); color: #6ee7b7; padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.3); font-weight: 600;">
              0 Foto Terpilih
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 20px;">
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div class="form-group">
                <label for="page-sp-photo-file" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Upload Berkas Foto Pohon (Bisa Lebih Dari 1 Foto):
                </label>
                <div id="sp-dropzone" style="border: 2px dashed rgba(16, 185, 129, 0.35); background: rgba(16, 185, 129, 0.04); border-radius: 10px; padding: 18px 14px; text-align: center; cursor: pointer; transition: all 0.2s;">
                  <span style="font-size: 28px; display: block; margin-bottom: 4px;">📁</span>
                  <span style="color: #6ee7b7; font-weight: 600; font-size: 13px;">Klik atau Tarik Berkas Foto ke Sini</span>
                  <p style="color: var(--clr-text-muted); font-size: 11.5px; margin: 4px 0 10px;">
                    Mendukung unggah lebih dari satu foto sekaligus (JPEG/PNG/WebP, maks 5MB per file)
                  </p>
                  <label for="page-sp-photo-file" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; cursor: pointer; margin: 0 auto;">
                    <span>📂</span> Pilih Berkas Foto...
                  </label>
                  <input type="file" id="page-sp-photo-file" accept="image/*" multiple style="display: none;" />
                </div>
              </div>

              <div class="form-group">
                <label for="page-sp-photo-path" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Atau Tambahkan URL / Path Foto:
                </label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" id="page-sp-photo-path" class="form-input" placeholder="/storage/tree-species/merbau.jpg atau URL eksternal" />
                  <button type="button" id="btn-add-url-photo" class="btn-secondary-action btn-sm" style="white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;">
                    <span>➕</span> Tambah
                  </button>
                </div>
                <small style="color: var(--clr-text-muted); font-size: 11px;">Ketik URL/path foto lalu klik Tambah untuk memasukkan ke galeri foto.</small>
              </div>

              <div class="form-group">
                <label for="page-sp-ref" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Sumber Referensi Identifikasi:
                </label>
                <input type="text" id="page-sp-ref" class="form-input" placeholder="Buku Flora Malesiana / Balai Litbang" value="${escapeHtml(item?.reference_source || '')}" />
                <small style="color: var(--clr-text-muted); font-size: 11px;">Rujukan pustaka atau tim surveyor yang mengidentifikasi spesies.</small>
              </div>
            </div>

            <!-- Preview Card Galeri Multi-Foto -->
            <div style="display: flex; flex-direction: column; background: rgba(0,0,0,0.25); border: 1px solid var(--clr-border); border-radius: 10px; padding: 14px; min-height: 240px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);">
                <span style="font-size: 12.5px; font-weight: 600; color: #e2e8f0;">Daftar Foto Dokumentasi Pohon</span>
                <span style="font-size: 11px; color: var(--clr-text-muted);">⭐ = Foto Sampul</span>
              </div>
              <div id="sp-gallery-preview-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 10px; max-height: 320px; overflow-y: auto; padding-right: 4px;">
                <!-- Populated by JS -->
              </div>
              <div id="sp-gallery-empty-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 160px; color: var(--clr-text-muted); font-size: 12px; text-align: center;">
                <span style="font-size: 32px; margin-bottom: 6px;">📷</span>
                Belum ada foto yang dipilih.<br><span style="font-size: 11px;">Pilih satu atau lebih file foto di sebelah kiri.</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Bawah -->
        <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
          <button type="button" id="btn-cancel-species-bottom" class="btn-secondary-action">
            Batal
          </button>
          <button type="button" id="btn-save-species-bottom" class="btn-primary-action">
            💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Jenis Pohon'}
          </button>
        </div>
      </div>
    </form>

    <!-- Modal Preview Singkat -->
    <div id="modal-species-preview" class="admin-modal-overlay hidden">
      <div class="admin-modal-box" style="max-width: 500px;">
        <div class="admin-modal-header">
          <h3 style="margin: 0; font-size: 16px; color: #fff;">👁️ Pratinjau Singkat Jenis Pohon</h3>
          <button id="btn-close-species-preview-modal" class="icon-btn-sm">✕</button>
        </div>
        <div class="admin-modal-body" id="modal-species-preview-body" style="padding: 20px;">
          <!-- Populated dynamically -->
        </div>
        <div class="admin-modal-footer">
          <button type="button" id="btn-dismiss-species-preview" class="btn-primary-action btn-sm">Tutup Pratinjau</button>
        </div>
      </div>
    </div>
  `;

  // ─────────────────────────────────────────────────────────────
  // Multi-Foto State & Interaksi Galeri
  // ─────────────────────────────────────────────────────────────
  let existingPhotos = [];
  if (item) {
    if (Array.isArray(item.gallery_photos) && item.gallery_photos.length > 0) {
      existingPhotos = [...item.gallery_photos];
    } else if (item.photo_path) {
      existingPhotos = [item.photo_path];
    }
  }

  let stagedFiles = []; // Array of { file: File, id: string, previewUrl: string }
  let selectedCoverKey = null; // 'existing:URL' or 'staged:id'

  if (existingPhotos.length > 0) {
    selectedCoverKey = `existing:${item?.photo_path || existingPhotos[0]}`;
  }

  const galleryGrid = document.getElementById('sp-gallery-preview-grid');
  const emptyState = document.getElementById('sp-gallery-empty-state');
  const countBadge = document.getElementById('sp-photos-count-badge');
  const photoFileInput = document.getElementById('page-sp-photo-file');
  const dropzone = document.getElementById('sp-dropzone');
  const photoPathInput = document.getElementById('page-sp-photo-path');
  const btnAddUrl = document.getElementById('btn-add-url-photo');

  const updateGalleryUI = () => {
    const totalCount = existingPhotos.length + stagedFiles.length;
    if (countBadge) {
      countBadge.textContent = `${totalCount} Foto Terpilih`;
      countBadge.style.color = totalCount > 0 ? '#6ee7b7' : '#94a3b8';
    }

    if (totalCount === 0) {
      if (galleryGrid) galleryGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      selectedCoverKey = null;
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Auto-select cover if none selected or if previous cover was deleted
    let coverExists = false;
    if (selectedCoverKey) {
      if (selectedCoverKey.startsWith('existing:') && existingPhotos.includes(selectedCoverKey.replace('existing:', ''))) {
        coverExists = true;
      } else if (selectedCoverKey.startsWith('staged:')) {
        const fileId = selectedCoverKey.replace('staged:', '');
        if (stagedFiles.some((f) => f.id === fileId)) coverExists = true;
      }
    }
    if (!coverExists) {
      if (existingPhotos.length > 0) {
        selectedCoverKey = `existing:${existingPhotos[0]}`;
      } else if (stagedFiles.length > 0) {
        selectedCoverKey = `staged:${stagedFiles[0].id}`;
      }
    }

    let html = '';

function formatTreePhotoUrl(src) {
  if (!src || typeof src !== 'string') return '';
  src = src.trim();
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('blob:') || src.startsWith('data:')) return src;

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

    // Render Existing Photos
    existingPhotos.forEach((url, idx) => {
      const isCover = selectedCoverKey === `existing:${url}`;
      const displayUrl = formatTreePhotoUrl(url);
      html += `
        <div style="position: relative; border-radius: 8px; overflow: hidden; border: 2px solid ${isCover ? '#10b981' : 'rgba(255,255,255,0.12)'}; background: #070d0a; aspect-ratio: 1/1; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
          <img src="${displayUrl}" alt="Foto ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/favicon.svg'" />
          
          <button type="button" class="btn-toggle-cover" data-cover-key="existing:${url}" title="${isCover ? 'Foto Sampul Utama' : 'Klik untuk jadikan Foto Sampul'}" style="position: absolute; top: 4px; left: 4px; background: ${isCover ? '#10b981' : 'rgba(15,23,42,0.85)'}; color: ${isCover ? '#fff' : '#f59e0b'}; border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; padding: 2px 6px; font-size: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 3px; z-index: 2;">
            ${isCover ? '★ Sampul' : '☆ Sampul'}
          </button>

          <button type="button" class="btn-delete-photo" data-type="existing" data-idx="${idx}" title="Hapus Foto" style="position: absolute; top: 4px; right: 4px; background: rgba(239,68,68,0.88); color: #fff; border: none; border-radius: 5px; width: 22px; height: 22px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2;">
            ✕
          </button>

          <span style="position: absolute; bottom: 3px; right: 4px; background: rgba(0,0,0,0.7); color: #cbd5e1; font-size: 9.5px; padding: 1px 5px; border-radius: 3px;">
            Tersimpan
          </span>
        </div>
      `;
    });

    // Render Staged New Files
    stagedFiles.forEach((item, idx) => {
      const isCover = selectedCoverKey === `staged:${item.id}`;
      html += `
        <div style="position: relative; border-radius: 8px; overflow: hidden; border: 2px solid ${isCover ? '#10b981' : 'rgba(16,185,129,0.35)'}; background: #070d0a; aspect-ratio: 1/1; box-shadow: 0 4px 10px rgba(0,0,0,0.4);">
          <img src="${item.previewUrl}" alt="${escapeHtml(item.file.name)}" style="width: 100%; height: 100%; object-fit: cover;" />
          
          <button type="button" class="btn-toggle-cover" data-cover-key="staged:${item.id}" title="${isCover ? 'Foto Sampul Utama' : 'Klik untuk jadikan Foto Sampul'}" style="position: absolute; top: 4px; left: 4px; background: ${isCover ? '#10b981' : 'rgba(15,23,42,0.85)'}; color: ${isCover ? '#fff' : '#f59e0b'}; border: 1px solid rgba(255,255,255,0.2); border-radius: 5px; padding: 2px 6px; font-size: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 3px; z-index: 2;">
            ${isCover ? '★ Sampul' : '☆ Sampul'}
          </button>

          <button type="button" class="btn-delete-photo" data-type="staged" data-idx="${idx}" title="Hapus Foto" style="position: absolute; top: 4px; right: 4px; background: rgba(239,68,68,0.88); color: #fff; border: none; border-radius: 5px; width: 22px; height: 22px; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 2;">
            ✕
          </button>

          <span style="position: absolute; bottom: 3px; right: 4px; background: rgba(16,185,129,0.85); color: #fff; font-size: 9.5px; padding: 1px 5px; border-radius: 3px; font-weight: 600;">
            Baru
          </span>
        </div>
      `;
    });

    if (galleryGrid) {
      galleryGrid.innerHTML = html;

      // Bind Set Cover
      galleryGrid.querySelectorAll('.btn-toggle-cover').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectedCoverKey = btn.getAttribute('data-cover-key');
          updateGalleryUI();
        });
      });

      // Bind Delete Photo
      galleryGrid.querySelectorAll('.btn-delete-photo').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const type = btn.getAttribute('data-type');
          const idx = parseInt(btn.getAttribute('data-idx'), 10);
          if (type === 'existing') {
            existingPhotos.splice(idx, 1);
          } else if (type === 'staged') {
            const removed = stagedFiles.splice(idx, 1);
            if (removed[0]?.previewUrl) URL.revokeObjectURL(removed[0].previewUrl);
          }
          updateGalleryUI();
        });
      });
    }
  };

  // Initial gallery render
  updateGalleryUI();

  // Add files helper (supports multiple files selected or dragged)
  const addFiles = (files) => {
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        stagedFiles.push({
          file,
          id: 'staged_' + Math.random().toString(36).substring(2, 9),
          previewUrl: URL.createObjectURL(file),
        });
      }
    }
    updateGalleryUI();
  };

  photoFileInput?.addEventListener('change', (e) => {
    addFiles(e.target.files);
    photoFileInput.value = ''; // Reset so same file can be re-added if removed
  });

  // Drag and drop events
  if (dropzone) {
    ['dragenter', 'dragover'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.style.borderColor = '#10b981';
        dropzone.style.background = 'rgba(16, 185, 129, 0.12)';
      });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.style.borderColor = 'rgba(16, 185, 129, 0.35)';
        dropzone.style.background = 'rgba(16, 185, 129, 0.04)';
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files) {
        addFiles(e.dataTransfer.files);
      }
    });
  }

  // Add manual photo URL
  btnAddUrl?.addEventListener('click', () => {
    const val = photoPathInput.value.trim();
    if (!val) return;
    if (!existingPhotos.includes(val)) {
      existingPhotos.push(val);
      photoPathInput.value = '';
      updateGalleryUI();
    } else {
      EcoToast.info('URL foto sudah ada di daftar.');
    }
  });

  // Tombol Kembali & Batal
  const handleBackOrCancel = () => {
    const commonName = document.getElementById('page-sp-common').value.trim();
    if (commonName && (!item || commonName !== item.common_name)) {
      if (!confirm('Perubahan belum disimpan. Kembali ke daftar jenis pohon?')) {
        return;
      }
    }
    renderSpeciesTab(container);
  };

  document.getElementById('breadcrumb-btn-species-list')?.addEventListener('click', handleBackOrCancel);
  document.getElementById('btn-back-to-species')?.addEventListener('click', handleBackOrCancel);
  document.getElementById('btn-cancel-species-form')?.addEventListener('click', handleBackOrCancel);
  document.getElementById('btn-cancel-species-bottom')?.addEventListener('click', handleBackOrCancel);

  // Modal Preview Singkat
  const previewModal = document.getElementById('modal-species-preview');
  const previewBody = document.getElementById('modal-species-preview-body');

  document.getElementById('btn-preview-species-form')?.addEventListener('click', () => {
    const common = document.getElementById('page-sp-common').value.trim() || '(Nama belum diisi)';
    const scientific = document.getElementById('page-sp-scientific').value.trim() || '(Nama ilmiah belum diisi)';
    const local = document.getElementById('page-sp-local').value.trim() || '-';
    const family = document.getElementById('page-sp-family').value.trim() || '-';
    const origin = document.getElementById('page-sp-origin').value;
    const originLabel = origin === 'lokal_asli' ? 'Lokal / Asli' : (origin === 'introduksi' ? 'Introduksi' : 'Belum Diverifikasi');
    const ecological = document.getElementById('page-sp-ecological').value.trim() || '-';
    const benefits = document.getElementById('page-sp-benefits').value.trim() || '-';
    const ref = document.getElementById('page-sp-ref').value.trim() || '-';

    // Resolve cover preview image
    let previewImgSrc = '';
    if (selectedCoverKey) {
      if (selectedCoverKey.startsWith('existing:')) {
        previewImgSrc = selectedCoverKey.replace('existing:', '');
      } else if (selectedCoverKey.startsWith('staged:')) {
        const fId = selectedCoverKey.replace('staged:', '');
        const target = stagedFiles.find((f) => f.id === fId);
        if (target) previewImgSrc = target.previewUrl;
      }
    }
    if (!previewImgSrc) {
      if (existingPhotos.length > 0) previewImgSrc = existingPhotos[0];
      else if (stagedFiles.length > 0) previewImgSrc = stagedFiles[0].previewUrl;
    }

    const totalPhotos = existingPhotos.length + stagedFiles.length;

    previewBody.innerHTML = `
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--clr-border); border-radius: 8px; padding: 16px;">
        ${
          previewImgSrc
            ? `<div style="width: 100%; height: 180px; border-radius: 8px; overflow: hidden; margin-bottom: 12px; position: relative;">
                 <img src="${previewImgSrc}" alt="${escapeHtml(common)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/favicon.svg'" />
                 <span style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: #6ee7b7; font-size: 11px; padding: 2px 8px; border-radius: 4px;">
                   📷 ${totalPhotos} Foto Dokumentasi
                 </span>
               </div>`
            : ''
        }
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
          <div>
            <h3 style="color: #fff; margin: 0; font-size: 16px;">${escapeHtml(common)}</h3>
            <span style="font-size: 13px; font-style: italic; color: #34d399;">${escapeHtml(scientific)}</span>
          </div>
          <span class="admin-header-pill pill-success" style="font-size: 11px;">${originLabel}</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 12px; color: var(--clr-text-muted);">
          <div><strong>Famili:</strong> ${escapeHtml(family)}</div>
          <div><strong>Nama Lokal:</strong> ${escapeHtml(local)}</div>
        </div>
        <div style="font-size: 12px; color: var(--clr-text); margin-bottom: 8px;">
          <strong>Fungsi Ekologis:</strong><br />
          <p style="margin: 4px 0 0; color: var(--clr-text-muted); line-height: 1.4;">${escapeHtml(ecological)}</p>
        </div>
        <div style="font-size: 12px; color: var(--clr-text); margin-bottom: 8px;">
          <strong>Manfaat:</strong><br />
          <p style="margin: 4px 0 0; color: var(--clr-text-muted); line-height: 1.4;">${escapeHtml(benefits)}</p>
        </div>
        <div style="font-size: 11px; color: var(--clr-text-muted); border-top: 1px solid var(--clr-border-subtle); padding-top: 8px;">
          <strong>Referensi:</strong> ${escapeHtml(ref)}
        </div>
      </div>
    `;
    previewModal.classList.remove('hidden');
  });

  document.getElementById('btn-close-species-preview-modal')?.addEventListener('click', () => previewModal.classList.add('hidden'));
  document.getElementById('btn-dismiss-species-preview')?.addEventListener('click', () => previewModal.classList.add('hidden'));

  // Submit Handler
  const handleSave = async () => {
    const alertBox = document.getElementById('species-form-alert');
    const commonName = document.getElementById('page-sp-common').value.trim();
    const scientificName = document.getElementById('page-sp-scientific').value.trim();

    if (!commonName) {
      alertBox.className = 'alert-box error';
      alertBox.textContent = 'Nama umum pohon (Indonesia) wajib diisi.';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!scientificName) {
      alertBox.className = 'alert-box error';
      alertBox.textContent = 'Nama ilmiah (spesies) wajib diisi.';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const saveBtns = [document.getElementById('btn-save-species-form'), document.getElementById('btn-save-species-bottom')];
    saveBtns.forEach((b) => {
      if (b) {
        b.disabled = true;
        b.innerHTML = '⏳ Menyimpan...';
      }
    });

    try {
      const id = document.getElementById('page-sp-id').value;

      // Always use FormData to support multi-photos and existing photos
      const fd = new FormData();
      fd.append('common_name', commonName);
      fd.append('scientific_name', scientificName);
      fd.append('local_name', document.getElementById('page-sp-local').value.trim());
      fd.append('family', document.getElementById('page-sp-family').value.trim());
      fd.append('origin_status', document.getElementById('page-sp-origin').value);
      fd.append('reference_source', document.getElementById('page-sp-ref').value.trim());
      fd.append('ecological_function', document.getElementById('page-sp-ecological').value.trim());
      fd.append('benefits', document.getElementById('page-sp-benefits').value.trim());
      fd.append('description', document.getElementById('page-sp-desc').value.trim());
      fd.append('is_active', document.getElementById('page-sp-active').checked ? '1' : '0');

      // Append staged files
      stagedFiles.forEach((item) => {
        fd.append('photos[]', item.file);
      });

      // Append existing photos JSON string
      fd.append('existing_photos', JSON.stringify(existingPhotos));

      // Append cover photo info
      if (selectedCoverKey) {
        if (selectedCoverKey.startsWith('existing:')) {
          fd.append('cover_photo', selectedCoverKey.replace('existing:', ''));
        } else if (selectedCoverKey.startsWith('staged:')) {
          const targetId = selectedCoverKey.replace('staged:', '');
          const newIdx = stagedFiles.findIndex((f) => f.id === targetId);
          if (newIdx !== -1) {
            fd.append('cover_photo_new_index', newIdx.toString());
          }
        }
      }

      await ApiService.saveTreeSpecies(fd, id || null);
      if (isEdit) {
        EcoToast.updated(`Data jenis pohon '${commonName}' berhasil disimpan.`);
      } else {
        EcoToast.created(`Data jenis pohon '${commonName}' berhasil disimpan.`);
      }
      await renderSpeciesTab(container);
    } catch (err) {
      alertBox.className = 'alert-box error';
      if (err.status === 422 && err.errors) {
        const errorList = Object.entries(err.errors)
          .map(([field, msgs]) => `• ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
          .join('<br>');
        alertBox.innerHTML = `<strong>Validasi Gagal:</strong><br>${errorList}<br><small style="margin-top: 6px; display: block; color: var(--clr-text-muted);">Seluruh data input dan berkas foto tetap dipertahankan.</small>`;
        EcoToast.error('✕ Validasi Gagal', err.message || 'Periksa kembali isian formulir.');
      } else if (err.status === 403) {
        alertBox.textContent = `Akses Ditolak: Anda tidak memiliki izin administrator untuk menyimpan data.`;
        EcoToast.error('✕ Akses Ditolak', err.message);
      } else if (err.status === 404) {
        alertBox.textContent = `Data tidak ditemukan: Spesies yang akan diperbarui tidak ditemukan di server.`;
        EcoToast.error('✕ Tidak Ditemukan', err.message);
      } else {
        alertBox.textContent = `Gagal menyimpan jenis pohon: ${err.message}. Seluruh data input tetap dipertahankan.`;
        EcoToast.error('✕ Gagal menyimpan jenis pohon', err.message);
      }
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      saveBtns.forEach((b) => {
        if (b) {
          b.disabled = false;
          b.innerHTML = `💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Jenis Pohon'}`;
        }
      });
    }
  };

  document.getElementById('btn-save-species-form')?.addEventListener('click', handleSave);
  document.getElementById('btn-save-species-bottom')?.addEventListener('click', handleSave);
}

// ─────────────────────────────────────────────────────────────
// 3. KEGIATAN PENANAMAN
// ─────────────────────────────────────────────────────────────
async function renderActivitiesTab(container, scenes) {
  if (scenes && scenes.length > 0) cachedScenes = scenes;
  container.innerHTML = `<div style="text-align: center; padding: 30px;">⏳ Memuat kegiatan penanaman...</div>`;
  const [resAct, resSp, resZones] = await Promise.all([
    ApiService.getPlantingActivities(),
    ApiService.getTreeSpecies(),
    ApiService.getZones(),
  ]);
  cachedActivities = resAct.activities || [];
  cachedSpecies = resSp.species || [];
  const zonesList = resZones.zones || [];
  cachedZones = zonesList;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div style="display: flex; gap: 8px; flex: 1;">
        <input type="text" id="filter-act-search" class="form-input" placeholder="Cari batch, kegiatan, zona..." style="max-width: 320px;" />
      </div>
      <button id="btn-add-activity" class="btn-primary-action btn-sm">
        ➕ Catat Kegiatan Penanaman
      </button>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Batch & Tanggal</th>
            <th style="padding: 10px 14px;">Nama Kegiatan & Pelaksana</th>
            <th style="padding: 10px 14px;">Zona / Panorama</th>
            <th style="padding: 10px 14px; text-align: right;">Total Awal</th>
            <th style="padding: 10px 14px; text-align: center;">Kelangsungan Hidup</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody id="act-table-body">
          ${renderActivityRows(cachedActivities)}
        </tbody>
      </table>
    </div>

  `;

  // Bind Activity Search Filter
  document.getElementById('filter-act-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = cachedActivities.filter((a) => {
      const matchBatch = (a.batch_code || '').toLowerCase().includes(q);
      const matchName = (a.name || '').toLowerCase().includes(q);
      const matchZone = (a.location_zone || '').toLowerCase().includes(q);
      const matchPic = (a.person_in_charge || '').toLowerCase().includes(q);
      return matchBatch || matchName || matchZone || matchPic;
    });
    const tbody = document.getElementById('act-table-body');
    if (tbody) tbody.innerHTML = renderActivityRows(filtered);
    bindActivityActionBtns(container, scenes);
  });

  // Tombol Catat Kegiatan Penanaman -> Buka Halaman Formulir Lengkap
  document.getElementById('btn-add-activity')?.addEventListener('click', async () => {
    await renderActivityFormView(null, container, scenes || cachedScenes, cachedZones);
  });

  bindActivityActionBtns(container, scenes);
}


function renderActivityRows(list) {
  if (list.length === 0) {
    return `<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan kegiatan penanaman.</td></tr>`;
  }
  return list
    .map((a) => {
      const rateStr = a.survival_rate !== null ? `${a.survival_rate}%` : 'Data Belum Lengkap';
      const rateClass = a.survival_rate !== null ? (a.survival_rate >= 80 ? 'pill-success' : 'pill-warning') : 'pill-neutral';

      return `
      <tr style="border-bottom: 1px solid var(--clr-border);">
        <td style="padding: 10px 14px;">
          <span style="font-weight: 600;">${escapeHtml(a.batch_code)}</span><br>
          <span style="font-size: 12px; color: var(--clr-text-muted);">📅 ${formatDateDisplay(a.activity_date)}</span>
        </td>
        <td style="padding: 10px 14px;">
          <span style="font-weight: 500;">${escapeHtml(a.name)}</span><br>
          <span style="font-size: 11px; color: var(--clr-text-muted);">PIC: ${escapeHtml(a.person_in_charge)} • ${escapeHtml(a.organizer)}</span>
        </td>
        <td style="padding: 10px 14px;">
          <span>📍 ${escapeHtml(a.location_zone)}</span><br>
          <span style="font-size: 11px; color: var(--clr-text-muted);">${a.scene_name ? '🌐 ' + escapeHtml(a.scene_name) : 'Tanpa Panorama'}</span>
        </td>
        <td style="padding: 10px 14px; text-align: right; font-weight: 600;">
          ${a.total_initial_seedlings} bibit
        </td>
        <td style="padding: 10px 14px; text-align: center;">
          <span class="admin-header-pill ${rateClass}" style="font-size: 11px;">${rateStr}</span>
        </td>
        <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
          <button class="btn-edit-activity icon-btn-sm" data-id="${a.id}" title="Edit Kegiatan" aria-label="Edit Kegiatan" style="margin-right: 4px; color: #38bdf8;">✏️</button>
          <button class="btn-del-activity icon-btn-sm" data-id="${a.id}" title="Hapus Kegiatan" aria-label="Hapus Kegiatan" style="color: #ef4444;">🗑️</button>
        </td>
      </tr>
    `;
    })
    .join('');
}

function bindActivityActionBtns(container, scenes) {
  document.querySelectorAll('.btn-edit-activity').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        btn.disabled = true;
        btn.innerHTML = '⏳';
        const res = await ApiService.getPlantingActivity(id);
        const act = res.activity || res;
        await renderActivityFormView(act, container, scenes || cachedScenes, cachedZones);
      } catch (e) {
        EcoToast.error('✕ Gagal memuat data kegiatan', e.message);
        btn.disabled = false;
        btn.innerHTML = '✏️';
      }
    });
  });

  document.querySelectorAll('.btn-del-activity').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Hapus kegiatan penanaman ini beserta rincian bibitnya?')) {
        try {
          await ApiService.deletePlantingActivity(id);
          EcoToast.deleted('Catatan kegiatan penanaman berhasil dihapus.');
          renderActivitiesTab(container, scenes);
        } catch (e) {
          EcoToast.error('✕ Gagal menghapus kegiatan penanaman', e.message);
        }
      }
    });
  });
}

/**
 * Halaman Khusus Formulir Kegiatan Penanaman (Catat Baru / Edit)
 * Breadcrumb: Dashboard / Data Penanaman / Kegiatan Penanaman / (Catat Baru | Edit)
 */
async function renderActivityFormView(activity = null, container, scenes = [], zonesList = []) {
  const isEdit = !!activity;

  if (!zonesList || zonesList.length === 0) {
    if (cachedZones.length > 0) zonesList = cachedZones;
    else {
      const zRes = await ApiService.getZones();
      zonesList = zRes.zones || [];
      cachedZones = zonesList;
    }
  }
  if (!scenes || scenes.length === 0) {
    scenes = cachedScenes;
  }
  if (!cachedSpecies || cachedSpecies.length === 0) {
    const spRes = await ApiService.getTreeSpecies();
    cachedSpecies = spRes.species || [];
  }

  const existingItems = activity && activity.items && activity.items.length > 0 ? activity.items : [];

  container.innerHTML = `
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin/dashboard" style="color: var(--clr-text-muted); text-decoration: none;">Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: var(--clr-text-muted);">Data Penanaman</span>
        <span>&rsaquo;</span>
        <button type="button" id="breadcrumb-btn-act-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Kegiatan Penanaman</button>
        <span>&rsaquo;</span>
        <span style="color: ${isEdit ? '#38bdf8' : '#10b981'}; font-weight: 600;">${isEdit ? 'Edit' : 'Catat Baru'}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${isEdit ? '✏️' : '🌱'}</span> ${isEdit ? `Edit Kegiatan Penanaman: ${escapeHtml(activity.batch_code)}` : 'Catat Kegiatan Penanaman Baru'}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            ${isEdit ? 'Perbarui data pelaksanaan, kawasan penanaman, tim pelaksana, dan rincian jenis bibit yang ditanam.' : 'Catat data pelaksanaan kegiatan penanaman baru, kawasan target, tim pelaksana, dan rincian bibit awal yang ditanam.'}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-act" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-cancel-act-top" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-act-top" class="btn-primary-action btn-sm">
            💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Kegiatan'}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="act-edit-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="form-edit-activity" style="display: flex; flex-direction: column; gap: 20px;">
      <!-- CARD 1: INFORMASI BATCH & WAKTU -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📋</span> Card 1 — Informasi Kegiatan & Batch
          </h3>
          <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="edit-act-batch" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kode / Kelompok Batch: <span style="color: #ef4444;">*</span>
            </label>
            ${isEdit
              ? `<input type="text" id="edit-act-batch" class="form-input" readonly value="${escapeHtml(activity.batch_code)}" style="background: rgba(255,255,255,0.05); cursor: not-allowed; opacity: 0.85;" />
                 <small style="color: var(--clr-text-muted); font-size: 11px;">Kode unik batch penanaman dipertahankan sebagai referensi riwayat.</small>`
              : `<input type="text" id="edit-act-batch" class="form-input" required placeholder="Contoh: BATCH-2026-01" value="" />
                 <small style="color: var(--clr-text-muted); font-size: 11px;">Kode unik batch penanaman untuk identifikasi dan referensi pemantauan berkala.</small>`
            }
          </div>

          <div class="form-group">
            <label for="edit-act-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="edit-act-date" class="form-input" required value="${isEdit ? toDateInputValue(activity.activity_date) : new Date().toISOString().split('T')[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD${isEdit ? ` • Tampilan: ${formatDateDisplay(activity.activity_date)}` : ''}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="edit-act-name" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Kegiatan Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-name" class="form-input" required placeholder="Contoh: Penanaman Pohon Blok Utara Kawasan" value="${isEdit ? escapeHtml(activity.name) : ''}" />
          </div>
        </div>
      </div>

      <!-- CARD 2: LOKASI & PANORAMA -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📍</span> Card 2 — Kawasan & Lokasi Penanaman
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="edit-act-zone-id" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kawasan Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="edit-act-zone-id" class="form-select" required>
              <option value="">-- Pilih Kawasan Penanaman --</option>
              ${zonesList.map((z) => `<option value="${z.id}" ${isEdit ? (z.id === activity.planting_zone_id ? 'selected' : '') : (zonesList.length === 1 ? 'selected' : '')}>${escapeHtml(z.name)} (${escapeHtml(z.zone_code || '')})</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label for="edit-act-zone" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Zona Deskriptif / Blok Lapangan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-zone" class="form-input" required placeholder="Contoh: Blok A - Lereng Barat" value="${isEdit ? escapeHtml(activity.location_zone) : ''}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="edit-act-scene" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Hubungkan ke Panorama Marzipano (Opsional):
            </label>
            <select id="edit-act-scene" class="form-select">
              <option value="">-- Tanpa Hubungan Panorama --</option>
              ${scenes.map((s) => `<option value="${s.id}" ${isEdit && s.id === activity.scene_id ? 'selected' : ''}>${escapeHtml(s.name)}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- CARD 3: PENANGGUNG JAWAB & ORGANISASI -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>👥</span> Card 3 — Pelaksana & Penanggung Jawab
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="edit-act-pic" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Penanggung Jawab (PIC): <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-pic" class="form-input" required placeholder="Penanggung Jawab Lapangan" value="${isEdit ? escapeHtml(activity.person_in_charge) : ''}" />
          </div>

          <div class="form-group">
            <label for="edit-act-org" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tim / Organisasi / Mitra: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="edit-act-org" class="form-input" required placeholder="Contoh: Tim IKHW Aceh" value="${isEdit ? escapeHtml(activity.organizer) : 'Tim IKHW Aceh'}" />
          </div>
        </div>
      </div>

      <!-- CARD 4: RINCIAN JENIS POHON & BIBIT AWAL -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
              <span>🌱</span> Card 4 — Rincian Jenis Pohon & Bibit Awal Ditanam
            </h3>
            <p style="font-size: 12px; color: var(--clr-text-muted); margin: 4px 0 0;">
              ${isEdit ? 'Data bibit lama dimuat secara lengkap. Tambahkan atau sesuaikan jumlah tanpa menghapus detail yang tidak diubah.' : 'Pilih jenis pohon dan tentukan jumlah bibit awal yang ditanam. Anda dapat menambahkan beberapa jenis sekaligus.'}
            </p>
          </div>
          <button type="button" id="btn-edit-add-item-row" class="btn-secondary-action btn-sm">
            ➕ Tambah Baris Jenis
          </button>
        </div>

        <div id="edit-act-items-container" style="display: flex; flex-direction: column; gap: 10px;">
          <!-- Items will be rendered here -->
        </div>
      </div>

      <!-- CARD 5: CATATAN TAMBAHAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📝</span> Card 5 — Catatan Lapangan
          </h3>
        </div>

        <div class="form-group">
          <label for="edit-act-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
            Catatan Tambahan:
          </label>
          <textarea id="edit-act-notes" class="form-textarea" rows="3" placeholder="Kondisi cuaca saat tanam, perlakuan mulsa, persiapan lubang tanam...">${isEdit ? escapeHtml(activity.notes || '') : ''}</textarea>
        </div>
      </div>

      <!-- Tombol Aksi Bawah -->
      <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
        <button type="button" id="btn-cancel-act-bottom" class="btn-secondary-action">
          Batal
        </button>
        <button type="button" id="btn-save-act-bottom" class="btn-primary-action">
          💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Kegiatan'}
        </button>
      </div>
    </form>
  `;

  // Populate Item Rows
  const itemsContainer = document.getElementById('edit-act-items-container');

  const createItemRow = (item = null) => {
    const row = document.createElement('div');
    row.className = 'edit-act-item-row';
    if (item && item.id) {
      row.dataset.itemId = String(item.id);
    }
    row.style.cssText = 'display: flex; gap: 8px; align-items: center; flex-wrap: wrap; background: rgba(255,255,255,0.02); padding: 10px; border-radius: 8px; border: 1px solid var(--clr-border-subtle);';
    row.innerHTML = `
      <select class="form-select edit-item-sp-select" style="flex: 2; min-width: 200px;" required>
        <option value="">-- Pilih Jenis Pohon --</option>
        ${cachedSpecies.map((s) => `<option value="${s.id}" ${item && s.id === item.tree_species_id ? 'selected' : ''}>${escapeHtml(s.common_name)} (${escapeHtml(s.scientific_name)})</option>`).join('')}
      </select>
      <input type="number" class="form-input edit-item-qty-input" style="flex: 1; min-width: 100px;" placeholder="Jumlah bibit" min="1" value="${item ? item.quantity : ''}" required />
      <input type="text" class="form-input edit-item-unit-input" style="width: 90px;" value="${escapeHtml(item?.unit || 'batang')}" placeholder="Satuan" />
      <button type="button" class="icon-btn-sm edit-btn-del-row" style="color: #ef4444;" title="Hapus Baris" aria-label="Hapus Baris">✕</button>
    `;
    row.querySelector('.edit-btn-del-row').addEventListener('click', () => {
      if (itemsContainer.querySelectorAll('.edit-act-item-row').length > 1) {
        row.remove();
      } else {
        EcoToast.warning('Peringatan Input', 'Minimal satu jenis pohon harus ada dalam kegiatan penanaman.');
      }
    });
    return row;
  };

  if (existingItems.length > 0) {
    existingItems.forEach((itm) => itemsContainer.appendChild(createItemRow(itm)));
  } else {
    itemsContainer.appendChild(createItemRow(null));
  }

  document.getElementById('btn-edit-add-item-row')?.addEventListener('click', () => {
    itemsContainer.appendChild(createItemRow(null));
  });

  // Cancel and Back handlers
  const handleCancelOrBack = () => {
    renderActivitiesTab(container, scenes);
  };

  document.getElementById('breadcrumb-btn-act-list')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-back-to-act')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-cancel-act-top')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-cancel-act-bottom')?.addEventListener('click', handleCancelOrBack);

  // Helper to clear existing field error messages
  const clearFieldErrors = () => {
    document.querySelectorAll('.field-error-msg').forEach((el) => el.remove());
    document.querySelectorAll('.input-field-error').forEach((el) => {
      el.classList.remove('input-field-error');
      el.style.borderColor = '';
    });
  };

  const showFieldError = (element, message) => {
    if (!element) return;
    element.classList.add('input-field-error');
    element.style.borderColor = '#ef4444';
    const errSpan = document.createElement('div');
    errSpan.className = 'field-error-msg';
    errSpan.style.cssText = 'color: #ef4444; font-size: 11px; margin-top: 4px; font-weight: 500;';
    errSpan.textContent = `⚠ ${message}`;
    if (element.nextSibling) {
      element.parentNode.insertBefore(errSpan, element.nextSibling);
    } else {
      element.parentNode.appendChild(errSpan);
    }
  };

  // Save handler
  const handleSave = async () => {
    const alertBox = document.getElementById('act-edit-alert');
    alertBox.classList.add('hidden');
    alertBox.textContent = '';
    clearFieldErrors();

    const batchCode = document.getElementById('edit-act-batch').value.trim();
    const rawDate = document.getElementById('edit-act-date').value;
    const date = parseDateForPayload(rawDate);
    const name = document.getElementById('edit-act-name').value.trim();
    const zoneId = document.getElementById('edit-act-zone-id').value;
    const locationZone = document.getElementById('edit-act-zone').value.trim();
    const sceneId = document.getElementById('edit-act-scene').value;
    const pic = document.getElementById('edit-act-pic').value.trim();
    const org = document.getElementById('edit-act-org').value.trim();
    const notes = document.getElementById('edit-act-notes').value.trim();

    if (!batchCode) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Kode / kelompok batch kegiatan penanaman wajib diisi.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showFieldError(document.getElementById('edit-act-batch'), 'Kode batch wajib diisi.');
      return;
    }

    if (!date) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Tanggal penanaman wajib diisi dengan format tanggal yang valid.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showFieldError(document.getElementById('edit-act-date'), 'Tanggal penanaman tidak valid.');
      return;
    }

    if (!name) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Nama kegiatan penanaman wajib diisi.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showFieldError(document.getElementById('edit-act-name'), 'Nama kegiatan penanaman wajib diisi.');
      return;
    }

    if (!zoneId) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Kawasan penanaman wajib dipilih.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showFieldError(document.getElementById('edit-act-zone-id'), 'Pilih kawasan penanaman.');
      return;
    }

    if (!locationZone) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Zona deskriptif / blok penanaman wajib diisi.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showFieldError(document.getElementById('edit-act-zone'), 'Zona deskriptif / blok penanaman wajib diisi.');
      return;
    }

    if (!pic) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Nama penanggung jawab (PIC) wajib diisi.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showFieldError(document.getElementById('edit-act-pic'), 'Nama penanggung jawab (PIC) wajib diisi.');
      return;
    }

    if (!org) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Tim atau organisasi pelaksana wajib diisi.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showFieldError(document.getElementById('edit-act-org'), 'Tim atau organisasi pelaksana wajib diisi.');
      return;
    }

    // Collect items
    const rows = itemsContainer.querySelectorAll('.edit-act-item-row');
    const items = [];
    let hasInvalidQty = false;

    rows.forEach((r) => {
      const spId = r.querySelector('.edit-item-sp-select').value;
      const qtyStr = r.querySelector('.edit-item-qty-input').value;
      const qty = parseInt(qtyStr, 10);
      const unit = r.querySelector('.edit-item-unit-input').value.trim() || 'batang';
      const existingId = r.dataset.itemId ? parseInt(r.dataset.itemId, 10) : null;

      if (spId && !isNaN(qty) && qty > 0) {
        const itemObj = { tree_species_id: spId, quantity: qty, unit };
        if (existingId) itemObj.id = existingId;
        items.push(itemObj);
      } else if (spId && (isNaN(qty) || qty <= 0)) {
        hasInvalidQty = true;
        showFieldError(r.querySelector('.edit-item-qty-input'), 'Jumlah bibit minimal 1.');
      } else if (!spId && qtyStr) {
        showFieldError(r.querySelector('.edit-item-sp-select'), 'Pilih jenis pohon.');
      }
    });

    if (hasInvalidQty) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Jumlah bibit harus berupa angka bulat positif (minimal 1).';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (items.length === 0) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Pilih setidaknya 1 jenis pohon dengan jumlah bibit yang valid.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const payload = {
      batch_code: batchCode,
      activity_date: date,
      name,
      planting_zone_id: zoneId || null,
      location_zone: locationZone,
      scene_id: sceneId || null,
      person_in_charge: pic,
      organizer: org,
      notes,
      items,
    };

    const saveBtns = [document.getElementById('btn-save-act-top'), document.getElementById('btn-save-act-bottom')];
    saveBtns.forEach((b) => {
      if (b) {
        b.disabled = true;
        b.innerHTML = '⏳ Menyimpan...';
      }
    });

    try {
      await ApiService.savePlantingActivity(payload, isEdit ? activity.id : null);
      EcoToast.show({
        type: 'success',
        title: isEdit ? 'Berhasil diperbarui.' : 'Berhasil disimpan.',
        message: isEdit
          ? `Data kegiatan penanaman '${batchCode}' berhasil diperbarui.`
          : `Data kegiatan penanaman '${batchCode}' dan rincian bibit berhasil dicatat.`,
      });
      await renderActivitiesTab(container, scenes);
    } catch (err) {
      alertBox.className = 'alert-banner alert-danger';

      // Parse validation errors if returned from Laravel (422)
      if (err.errors && typeof err.errors === 'object') {
        const errorList = Object.entries(err.errors)
          .map(([field, messages]) => {
            const msg = Array.isArray(messages) ? messages.join(', ') : String(messages);

            // Map field error to form input
            if (field === 'batch_code') showFieldError(document.getElementById('edit-act-batch'), msg);
            else if (field === 'name') showFieldError(document.getElementById('edit-act-name'), msg);
            else if (field === 'activity_date') showFieldError(document.getElementById('edit-act-date'), msg);
            else if (field === 'location_zone') showFieldError(document.getElementById('edit-act-zone'), msg);
            else if (field === 'planting_zone_id') showFieldError(document.getElementById('edit-act-zone-id'), msg);
            else if (field === 'scene_id') showFieldError(document.getElementById('edit-act-scene'), msg);
            else if (field === 'person_in_charge') showFieldError(document.getElementById('edit-act-pic'), msg);
            else if (field === 'organizer') showFieldError(document.getElementById('edit-act-org'), msg);
            else if (field.startsWith('items.')) {
              const parts = field.split('.');
              const itemIdx = parseInt(parts[1], 10);
              const subField = parts[2];
              const itemRows = itemsContainer.querySelectorAll('.edit-act-item-row');
              if (itemRows[itemIdx]) {
                if (subField === 'tree_species_id') {
                  showFieldError(itemRows[itemIdx].querySelector('.edit-item-sp-select'), msg);
                } else if (subField === 'quantity') {
                  showFieldError(itemRows[itemIdx].querySelector('.edit-item-qty-input'), msg);
                }
              }
            }

            return `<li>${escapeHtml(msg)}</li>`;
          })
          .join('');

        alertBox.innerHTML = `
          <strong>✕ Gagal menyimpan kegiatan: Terdapat kesalahan validasi input</strong>
          <ul style="margin: 8px 0 0 18px; padding: 0;">${errorList}</ul>
          <div style="margin-top: 6px; font-size: 11px; opacity: 0.85;">Seluruh data input yang telah Anda isi tetap dipertahankan. Silakan periksa kembali dan simpan ulang.</div>
        `;
      } else {
        alertBox.textContent = `Gagal menyimpan kegiatan penanaman: ${err.message}. Seluruh data input tetap dipertahankan.`;
      }

      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      EcoToast.error('✕ Gagal menyimpan kegiatan', err.message || 'Terjadi kesalahan validasi.');

      saveBtns.forEach((b) => {
        if (b) {
          b.disabled = false;
          b.innerHTML = `💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Kegiatan'}`;
        }
      });
    }
  };

  document.getElementById('btn-save-act-top')?.addEventListener('click', handleSave);
  document.getElementById('btn-save-act-bottom')?.addEventListener('click', handleSave);
}

const renderActivityEditFormView = renderActivityFormView;


// ─────────────────────────────────────────────────────────────
// 4. PEMANTAUAN TANAMAN (SURVEI HISTORIS)
// ─────────────────────────────────────────────────────────────
async function renderSurveysTab(container) {
  container.innerHTML = `<div style="text-align: center; padding: 30px;">⏳ Memuat catatan survei pemantauan...</div>`;
  const [resSrv, resAct] = await Promise.all([
    ApiService.getTreeSurveys(),
    ApiService.getPlantingActivities(),
  ]);
  const surveys = resSrv.surveys || [];
  cachedActivities = resAct.activities || [];

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <h3 style="font-size: 15px; margin-bottom: 4px;">Riwayat Survei Pemantauan Tanaman</h3>
        <p style="color: var(--clr-text-muted); font-size: 12px;">Setiap pemeriksaan disimpan terpisah menurut tanggal; tidak menimpa data survei sebelumnya.</p>
      </div>
      <button id="btn-add-survey" class="btn-primary-action btn-sm">
        ➕ Catat Hasil Survei
      </button>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Tanggal Survei</th>
            <th style="padding: 10px 14px;">Kelompok / Batch</th>
            <th style="padding: 10px 14px;">Bibit Hidup Awal</th>
            <th style="padding: 10px 14px;">Mati / Hilang</th>
            <th style="padding: 10px 14px; text-align: center;">Kelangsungan Hidup</th>
            <th style="padding: 10px 14px;">Kondisi & Gejala</th>
            <th style="padding: 10px 14px;">Pemeriksa</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${
            surveys.length > 0
              ? surveys
                  .map(
                    (s) => `
                <tr style="border-bottom: 1px solid var(--clr-border);">
                  <td style="padding: 10px 14px; font-weight: 600;">📅 ${formatDateDisplay(s.survey_date)}</td>
                  <td style="padding: 10px 14px;">
                    <span style="font-weight: 500;">${escapeHtml(s.batch_code)}</span><br>
                    <span style="font-size: 11px; color: var(--clr-text-muted);">${escapeHtml(s.location_zone)}</span>
                  </td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #10b981;">
                    ${s.alive_count} / ${s.initial_seedlings} bibit
                  </td>
                  <td style="padding: 10px 14px; color: #ef4444;">
                    ${s.dead_count} mati, ${s.missing_count} hilang
                  </td>
                  <td style="padding: 10px 14px; text-align: center;">
                    <span class="admin-header-pill ${s.survival_rate >= 80 ? 'pill-success' : 'pill-warning'}" style="font-size: 11px;">
                      ${s.survival_rate !== null ? s.survival_rate + '%' : '-'}
                    </span>
                  </td>
                  <td style="padding: 10px 14px;">
                    <span style="font-weight: 500;">${ucfirst(s.health_condition.replace('_', ' '))}</span>
                    ${s.damage_symptoms ? `<br><span style="font-size: 11px; color: var(--clr-text-muted);">${escapeHtml(s.damage_symptoms)}</span>` : ''}
                  </td>
                  <td style="padding: 10px 14px;">${escapeHtml(s.inspector_name)}</td>
                  <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                    <button class="btn-edit-survey icon-btn-sm" data-id="${s.id}" title="Edit Survei" aria-label="Edit Survei" style="margin-right: 4px; color: #38bdf8;">✏️</button>
                    <button class="btn-del-survey icon-btn-sm" data-id="${s.id}" title="Hapus Survei" aria-label="Hapus Survei" style="color: #ef4444;">🗑️</button>
                  </td>
                </tr>
              `
                  )
                  .join('')
              : `<tr><td colspan="8" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan survei pemantauan.</td></tr>`
          }
        </tbody>
      </table>
    </div>

  `;

  // Bind Survey Events
  document.getElementById('btn-add-survey')?.addEventListener('click', async () => {
    await renderSurveyFormView(null, container);
  });

  document.querySelectorAll('.btn-edit-survey').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        btn.disabled = true;
        btn.innerHTML = '⏳';
        const res = await ApiService.getTreeSurveyDetail(id);
        const srv = res.survey || res;
        await renderSurveyFormView(srv, container);
      } catch (e) {
        EcoToast.error('✕ Gagal memuat data survei', e.message);
        btn.disabled = false;
        btn.innerHTML = '✏️';
      }
    });
  });

  document.querySelectorAll('.btn-del-survey').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Hapus catatan survei ini?')) {
        try {
          await ApiService.deleteTreeSurvey(id);
          EcoToast.deleted('Catatan survei pemantauan berhasil dihapus.');
          renderSurveysTab(container);
        } catch (e) {
          EcoToast.error('✕ Gagal menghapus survei', e.message);
        }
      }
    });
  });
}

/**
 * Halaman Formulir Pemantauan Tanaman (Tambah Baru & Edit)
 * Breadcrumb: Dashboard / Data Penanaman / Pemantauan Tanaman / Catat Baru atau Edit
 */
async function renderSurveyFormView(survey = null, container) {
  const isEdit = !!survey;

  if (!cachedActivities || cachedActivities.length === 0) {
    const actRes = await ApiService.getPlantingActivities();
    cachedActivities = actRes.activities || [];
  }

  container.innerHTML = `
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin/dashboard" style="color: var(--clr-text-muted); text-decoration: none;">Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: var(--clr-text-muted);">Data Penanaman</span>
        <span>&rsaquo;</span>
        <button type="button" id="breadcrumb-btn-srv-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Pemantauan Tanaman</button>
        <span>&rsaquo;</span>
        <span style="color: #38bdf8; font-weight: 600;">${isEdit ? 'Edit' : 'Catat Baru'}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${isEdit ? '✏️' : '➕'}</span> ${isEdit ? `Edit Pemantauan Tanaman: ${escapeHtml(survey.batch_code || survey.id)}` : 'Catat Hasil Survei Pemantauan Tanaman'}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            ${isEdit ? 'Koreksi hasil sensus lapangan, kondisi kesehatan bibit, dan pengukuran silvikultur batch tanaman.' : 'Rekam hasil sensus berkala, laju kelangsungan hidup, dan catatan silvikultur per batch penanaman.'}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-srv" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-cancel-srv-top" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-srv-top" class="btn-primary-action btn-sm">
            💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Survei'}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="srv-form-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="form-survey-page" style="display: flex; flex-direction: column; gap: 20px;">
      <!-- CARD 1: INFORMASI BATCH & JADWAL PEMANTAUAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>🔍</span> Card 1 — Informasi Batch & Jadwal Pemantauan
          </h3>
          <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="srv-form-act" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kelompok / Batch Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="srv-form-act" class="form-select" required>
              <option value="">-- Pilih Batch Penanaman --</option>
              ${cachedActivities.map((a) => `<option value="${a.id}" ${survey && a.id === survey.planting_activity_id ? 'selected' : ''}>${escapeHtml(a.batch_code)} - ${escapeHtml(a.name)} (${a.total_initial_seedlings} bibit)</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label for="srv-form-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Pemeriksaan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="srv-form-date" class="form-input" required value="${survey ? toDateInputValue(survey.survey_date) : new Date().toISOString().split('T')[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD ${survey ? `• Tampilan sebelumnya: ${formatDateDisplay(survey.survey_date)}` : ''}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-inspector" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Nama Petugas Pemeriksa: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="srv-form-inspector" class="form-input" required placeholder="Nama Surveyor / Tim Lapangan" value="${escapeHtml(survey?.inspector_name || '')}" />
          </div>
        </div>
      </div>

      <!-- CARD 2: HASIL SENSUS TANAMAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📊</span> Card 2 — Hasil Sensus & Kelangsungan Hidup
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="srv-form-alive" style="color: #10b981; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Bibit Hidup: <span style="color: #ef4444;">*</span>
            </label>
            <input type="number" id="srv-form-alive" class="form-input" required min="0" placeholder="0" value="${survey ? survey.alive_count : ''}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Bibit yang masih tegak dan hidup.</small>
          </div>

          <div class="form-group">
            <label for="srv-form-dead" style="color: #ef4444; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Mati: <span style="color: #ef4444;">*</span>
            </label>
            <input type="number" id="srv-form-dead" class="form-input" required min="0" value="${survey ? survey.dead_count : 0}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Bibit mati / kering.</small>
          </div>

          <div class="form-group">
            <label for="srv-form-missing" style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Hilang:
            </label>
            <input type="number" id="srv-form-missing" class="form-input" min="0" value="${survey ? (survey.missing_count || 0) : 0}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Ajir ada namun tanaman raib.</small>
          </div>

          <div class="form-group">
            <label for="srv-form-health" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kondisi Kesehatan Tanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="srv-form-health" class="form-select" required>
              <option value="sangat_baik" ${survey?.health_condition === 'sangat_baik' ? 'selected' : ''}>Sangat Baik (Segar, Tunas Aktif)</option>
              <option value="baik" ${!survey || survey?.health_condition === 'baik' ? 'selected' : ''}>Baik (Pertumbuhan Normal)</option>
              <option value="sedang" ${survey?.health_condition === 'sedang' ? 'selected' : ''}>Sedang (Daun Menguning/Kering Parsial)</option>
              <option value="merana" ${survey?.health_condition === 'merana' ? 'selected' : ''}>Merana (Pertumbuhan Terhambat)</option>
              <option value="terserang_hama" ${survey?.health_condition === 'terserang_hama' ? 'selected' : ''}>Terserang Hama / Penyakit</option>
            </select>
          </div>
        </div>
      </div>

      <!-- CARD 3: PENGUKURAN & CATATAN LAPANGAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📏</span> Card 3 — Pengukuran Silvikultur & Catatan Lapangan
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="srv-form-height" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tinggi Rata-rata (cm, opsional):
            </label>
            <input type="number" step="0.1" min="0" id="srv-form-height" class="form-input" placeholder="Misal: 65.5" value="${survey?.average_height_cm || ''}" />
          </div>

          <div class="form-group">
            <label for="srv-form-diameter" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Diameter Batang Rata-rata (cm, opsional):
            </label>
            <input type="number" step="0.1" min="0" id="srv-form-diameter" class="form-input" placeholder="Misal: 1.8" value="${survey?.average_diameter_cm || ''}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-symptoms" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Gejala / Penyebab Kerusakan (Jika ada):
            </label>
            <input type="text" id="srv-form-symptoms" class="form-input" placeholder="Kekeringan, dimakan satwa, tertutup gulma..." value="${escapeHtml(survey?.damage_symptoms || '')}" />
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="srv-form-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Catatan Lapangan & Rekomendasi Tindakan:
            </label>
            <textarea id="srv-form-notes" class="form-textarea" rows="3" placeholder="Perlu penyiangan piringan, pemupukan tambahan, penyulaman...">${escapeHtml(survey?.field_notes || '')}</textarea>
          </div>
        </div>
      </div>

      <!-- Tombol Aksi Bawah -->
      <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
        <button type="button" id="btn-cancel-srv-bottom" class="btn-secondary-action">
          Batal
        </button>
        <button type="button" id="btn-save-srv-bottom" class="btn-primary-action">
          💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Survei'}
        </button>
      </div>
    </form>
  `;

  // Cancel and Back handlers
  const handleCancelOrBack = () => {
    renderSurveysTab(container);
  };

  document.getElementById('breadcrumb-btn-srv-list')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-back-to-srv')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-cancel-srv-top')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-cancel-srv-bottom')?.addEventListener('click', handleCancelOrBack);

  // Save handler
  const handleSave = async () => {
    const alertBox = document.getElementById('srv-form-alert');
    alertBox.classList.add('hidden');
    alertBox.textContent = '';

    const actId = document.getElementById('srv-form-act').value;
    const rawDate = document.getElementById('srv-form-date').value;
    const date = parseDateForPayload(rawDate);
    const inspector = document.getElementById('srv-form-inspector').value.trim();
    const aliveStr = document.getElementById('srv-form-alive').value;
    const deadStr = document.getElementById('srv-form-dead').value;
    const missingStr = document.getElementById('srv-form-missing').value;
    const health = document.getElementById('srv-form-health').value;
    const height = parseFloat(document.getElementById('srv-form-height').value) || null;
    const diameter = parseFloat(document.getElementById('srv-form-diameter').value) || null;
    const symptoms = document.getElementById('srv-form-symptoms').value.trim() || null;
    const notes = document.getElementById('srv-form-notes').value.trim() || null;

    if (!actId) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Pilih kelompok / batch penanaman.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!date) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Tanggal pemeriksaan wajib diisi dengan tanggal yang valid.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!inspector) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Nama petugas pemeriksa wajib diisi.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const alive = parseInt(aliveStr, 10);
    const dead = parseInt(deadStr, 10);
    const missing = parseInt(missingStr, 10) || 0;

    if (isNaN(alive) || alive < 0) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Jumlah bibit hidup tidak boleh kosong atau bernilai negatif.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (isNaN(dead) || dead < 0) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Jumlah bibit mati tidak boleh negatif.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (missing < 0) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Jumlah bibit hilang tidak boleh negatif.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Verify against batch initial seedlings if available
    const selectedAct = cachedActivities.find((a) => a.id === actId);
    if (selectedAct && selectedAct.total_initial_seedlings > 0) {
      if (alive > selectedAct.total_initial_seedlings) {
        alertBox.className = 'alert-banner alert-danger';
        alertBox.textContent = `Jumlah bibit hidup (${alive}) tidak boleh melebihi jumlah awal batch (${selectedAct.total_initial_seedlings} bibit).`;
        alertBox.classList.remove('hidden');
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
    }

    const payload = {
      planting_activity_id: actId,
      survey_date: date,
      alive_count: alive,
      dead_count: dead,
      missing_count: missing,
      health_condition: health,
      inspector_name: inspector,
      average_height_cm: height,
      average_diameter_cm: diameter,
      damage_symptoms: symptoms,
      field_notes: notes,
      is_verified: true,
    };

    const saveBtns = [document.getElementById('btn-save-srv-top'), document.getElementById('btn-save-srv-bottom')];
    saveBtns.forEach((b) => {
      if (b) {
        b.disabled = true;
        b.innerHTML = '⏳ Menyimpan...';
      }
    });

    try {
      await ApiService.saveTreeSurvey(payload, isEdit ? survey.id : null);
      if (isEdit) {
        EcoToast.show({
          type: 'success',
          title: 'Berhasil diperbarui.',
          message: 'Data hasil pemantauan tanaman berhasil diperbarui.',
        });
      } else {
        EcoToast.saved('Catatan survei pemantauan pohon berhasil disimpan.');
      }
      await renderSurveysTab(container);
    } catch (err) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = `Gagal menyimpan survei: ${err.message}. Seluruh data input tetap dipertahankan.`;
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      EcoToast.error('✕ Gagal menyimpan survei', err.message);
      saveBtns.forEach((b) => {
        if (b) {
          b.disabled = false;
          b.innerHTML = isEdit ? '💾 Simpan Perubahan' : '💾 Simpan Survei';
        }
      });
    }
  };

  document.getElementById('btn-save-srv-top')?.addEventListener('click', handleSave);
  document.getElementById('btn-save-srv-bottom')?.addEventListener('click', handleSave);
}

const renderSurveyEditFormView = renderSurveyFormView;

// ─────────────────────────────────────────────────────────────
// 5. PERAWATAN DAN PENYULAMAN
// ─────────────────────────────────────────────────────────────
async function renderMaintenanceTab(container) {
  container.innerHTML = `<div style="text-align: center; padding: 30px;">⏳ Memuat catatan perawatan & penyulaman...</div>`;
  const [resMnt, resAct] = await Promise.all([
    ApiService.getTreeMaintenance(),
    ApiService.getPlantingActivities(),
  ]);
  const logs = resMnt.logs || [];
  cachedActivities = resAct.activities || [];

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <h3 style="font-size: 15px; margin-bottom: 4px;">Pencatatan Perawatan & Penyulaman</h3>
        <p style="color: var(--clr-text-muted); font-size: 12px;">Bibit pengganti penyulaman dicatat terpisah agar riwayat kelangsungan hidup kelompok awal tidak bias.</p>
      </div>
      <button id="btn-add-maintenance" class="btn-primary-action btn-sm">
        ➕ Catat Tindakan Perawatan / Penyulaman
      </button>
    </div>

    <div class="admin-table-wrapper" style="overflow-x: auto; background: var(--clr-surface); border-radius: 8px; border: 1px solid var(--clr-border);">
      <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03); text-align: left;">
            <th style="padding: 10px 14px;">Tanggal</th>
            <th style="padding: 10px 14px;">Kelompok Penanaman</th>
            <th style="padding: 10px 14px;">Jenis Tindakan</th>
            <th style="padding: 10px 14px;">Jumlah Ditangani</th>
            <th style="padding: 10px 14px; color: #f59e0b;">Bibit Penyulaman</th>
            <th style="padding: 10px 14px;">Pelaksana</th>
            <th style="padding: 10px 14px;">Alasan / Catatan</th>
            <th style="padding: 10px 14px; text-align: center;">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${
            logs.length > 0
              ? logs
                  .map(
                    (m) => `
                <tr style="border-bottom: 1px solid var(--clr-border);">
                  <td style="padding: 10px 14px; font-weight: 600;">📅 ${formatDateDisplay(m.maintenance_date)}</td>
                  <td style="padding: 10px 14px;">${escapeHtml(m.batch_code)} (${escapeHtml(m.location_zone)})</td>
                  <td style="padding: 10px 14px;">
                    <span class="admin-header-pill ${m.action_type === 'penyulaman' ? 'pill-warning' : 'pill-neutral'}" style="font-size: 11px;">
                      ${escapeHtml(m.action_type_label)}
                    </span>
                  </td>
                  <td style="padding: 10px 14px;">${m.plants_handled_count || '-'} bibit</td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #f59e0b;">
                    ${m.replacement_plants_count > 0 ? `+${m.replacement_plants_count} bibit baru` : '-'}
                  </td>
                  <td style="padding: 10px 14px;">${escapeHtml(m.officer_or_team)}</td>
                  <td style="padding: 10px 14px; font-size: 12px; color: var(--clr-text-muted);">${escapeHtml(m.action_reason || m.notes || '-')}</td>
                  <td style="padding: 10px 14px; text-align: center; white-space: nowrap;">
                    <button class="btn-edit-maintenance icon-btn-sm" data-id="${m.id}" title="Edit Catatan Perawatan" aria-label="Edit Catatan Perawatan" style="margin-right: 4px; color: #38bdf8;">✏️</button>
                    <button class="btn-del-maintenance icon-btn-sm" data-id="${m.id}" title="Hapus" aria-label="Hapus" style="color: #ef4444;">🗑️</button>
                  </td>
                </tr>
              `
                  )
                  .join('')
              : `<tr><td colspan="8" style="padding: 20px; text-align: center; color: var(--clr-text-muted);">Belum ada catatan perawatan.</td></tr>`
          }
        </tbody>
      </table>
    </div>

  `;

  // Bind Maintenance Events
  document.getElementById('btn-add-maintenance')?.addEventListener('click', async () => {
    await renderMaintenanceFormView(null, container);
  });

  document.querySelectorAll('.btn-edit-maintenance').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      try {
        btn.disabled = true;
        btn.innerHTML = '⏳';
        const res = await ApiService.getTreeMaintenanceDetail(id);
        const log = res.log || res.maintenance || res;
        await renderMaintenanceFormView(log, container);
      } catch (e) {
        EcoToast.error('✕ Gagal memuat data perawatan', e.message);
        btn.disabled = false;
        btn.innerHTML = '✏️';
      }
    });
  });

  document.querySelectorAll('.btn-del-maintenance').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Hapus catatan perawatan ini?')) {
        try {
          await ApiService.deleteTreeMaintenance(id);
          EcoToast.deleted('Catatan perawatan berhasil dihapus.');
          renderMaintenanceTab(container);
        } catch (e) {
          EcoToast.error('✕ Gagal menghapus perawatan', e.message);
        }
      }
    });
  });
}

/**
 * Halaman Formulir Perawatan dan Penyulaman (Tambah Baru & Edit)
 * Breadcrumb: Dashboard / Data Penanaman / Perawatan dan Penyulaman / Catat Baru atau Edit
 */
async function renderMaintenanceFormView(log = null, container) {
  const isEdit = !!log;

  if (!cachedActivities || cachedActivities.length === 0) {
    const actRes = await ApiService.getPlantingActivities();
    cachedActivities = actRes.activities || [];
  }

  container.innerHTML = `
    <!-- Breadcrumb Navigasi -->
    <div style="margin-bottom: 20px;">
      <nav style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--clr-text-muted); margin-bottom: 8px;">
        <a href="#admin/dashboard" style="color: var(--clr-text-muted); text-decoration: none;">Dashboard</a>
        <span>&rsaquo;</span>
        <span style="color: var(--clr-text-muted);">Data Penanaman</span>
        <span>&rsaquo;</span>
        <button type="button" id="breadcrumb-btn-mnt-list" style="background: none; border: none; color: var(--clr-text-muted); cursor: pointer; padding: 0; font-size: 12px; text-decoration: underline;">Perawatan dan Penyulaman</button>
        <span>&rsaquo;</span>
        <span style="color: #38bdf8; font-weight: 600;">${isEdit ? 'Edit' : 'Catat Baru'}</span>
      </nav>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: gap: 12px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>${isEdit ? '✏️' : '➕'}</span> ${isEdit ? `Edit Perawatan & Penyulaman: ${escapeHtml(log.batch_code || log.id)}` : 'Catat Tindakan Perawatan / Penyulaman'}
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin: 4px 0 0;">
            ${isEdit ? 'Koreksi tindakan silvikultur, bibit penyulaman baru, dan tim pelaksana penanganan bibit.' : 'Catat tindakan silvikultur (penyiangan, penyiraman, pemupukan) atau penyulaman bibit baru pengganti.'}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" id="btn-back-to-mnt" class="btn-secondary-action btn-sm">
            ← Kembali
          </button>
          <button type="button" id="btn-cancel-mnt-top" class="btn-secondary-action btn-sm">
            Batal
          </button>
          <button type="button" id="btn-save-mnt-top" class="btn-primary-action btn-sm">
            💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Tindakan'}
          </button>
        </div>
      </div>
    </div>

    <!-- Alert Notifikasi / Error Validasi -->
    <div id="mnt-form-alert" class="hidden" style="margin-bottom: 20px; padding: 14px 18px; border-radius: 8px; font-size: 13px;"></div>

    <form id="form-maintenance-page" style="display: flex; flex-direction: column; gap: 20px;">
      <!-- CARD 1: INFORMASI BATCH & WAKTU -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>🛠️</span> Card 1 — Informasi Batch & Jadwal Pelaksanaan
          </h3>
          <span style="font-size: 11px; color: #f59e0b;">* Field wajib diisi</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="mnt-form-act" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Kelompok / Batch Penanaman: <span style="color: #ef4444;">*</span>
            </label>
            <select id="mnt-form-act" class="form-select" required>
              <option value="">-- Pilih Batch Penanaman --</option>
              ${cachedActivities.map((a) => `<option value="${a.id}" ${log && a.id === log.planting_activity_id ? 'selected' : ''}>${escapeHtml(a.batch_code)} - ${escapeHtml(a.name)}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label for="mnt-form-date" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Tanggal Pelaksanaan: <span style="color: #ef4444;">*</span>
            </label>
            <input type="date" id="mnt-form-date" class="form-input" required value="${log ? toDateInputValue(log.maintenance_date) : new Date().toISOString().split('T')[0]}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Format tersimpan: YYYY-MM-DD ${log ? `• Tampilan sebelumnya: ${formatDateDisplay(log.maintenance_date)}` : ''}</small>
          </div>

          <div class="form-group" style="grid-column: 1 / -1;">
            <label for="mnt-form-team" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Petugas / Tim Pelaksana: <span style="color: #ef4444;">*</span>
            </label>
            <input type="text" id="mnt-form-team" class="form-input" required placeholder="Contoh: Tim Silvikultur IKHW" value="${escapeHtml(log?.officer_or_team || 'Tim Silvikultur IKHW')}" />
          </div>
        </div>
      </div>

      <!-- CARD 2: TINDAKAN SILVIKULTUR & BIBIT -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>🌱</span> Card 2 — Tindakan Silvikultur & Penanganan Bibit
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <div class="form-group">
            <label for="mnt-form-action" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jenis Tindakan Silvikultur: <span style="color: #ef4444;">*</span>
            </label>
            <select id="mnt-form-action" class="form-select" required>
              <option value="penyiangan" ${!log || log.action_type === 'penyiangan' ? 'selected' : ''}>Penyiangan (Pembersihan Gulma & Piringan)</option>
              <option value="penyiraman" ${log?.action_type === 'penyiraman' ? 'selected' : ''}>Penyiraman</option>
              <option value="pemupukan" ${log?.action_type === 'pemupukan' ? 'selected' : ''}>Pemupukan (Organik / NPK)</option>
              <option value="perlindungan_bibit" ${log?.action_type === 'perlindungan_bibit' ? 'selected' : ''}>Perlindungan Bibit / Ajir / Mulsa</option>
              <option value="pengendalian_gangguan" ${log?.action_type === 'pengendalian_gangguan' ? 'selected' : ''}>Pengendalian Hama / Gangguan</option>
              <option value="penyulaman" ${log?.action_type === 'penyulaman' ? 'selected' : ''}>Penyulaman (Tanam Pengganti Bibit Mati)</option>
            </select>
          </div>

          <div class="form-group">
            <label for="mnt-form-handled" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Jumlah Tanaman Ditangani:
            </label>
            <input type="number" id="mnt-form-handled" class="form-input" min="0" value="${log ? (log.plants_handled_count || 0) : 0}" />
            <small style="color: var(--clr-text-muted); font-size: 11px;">Jumlah batang pohon yang dirawat / disiangi / dipupuk.</small>
          </div>

          <div class="form-group">
            <label for="mnt-form-replacement" style="color: #f59e0b; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Bibit Penyulaman (Bibit Baru Pengganti):
            </label>
            <input type="number" id="mnt-form-replacement" class="form-input" min="0" value="${log ? (log.replacement_plants_count || 0) : 0}" />
            <small style="color: #f59e0b; font-size: 11px;">⚠️ Bibit pengganti dicatat terpisah dan tidak menggabungkan bibit awal.</small>
          </div>

          <div class="form-group">
            <label for="mnt-form-cost" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Estimasi Biaya Tindakan (Rp, opsional):
            </label>
            <input type="number" min="0" id="mnt-form-cost" class="form-input" placeholder="Contoh: 150000" value="${log?.cost || ''}" />
          </div>
        </div>
      </div>

      <!-- CARD 3: ALASAN & CATATAN LAPANGAN -->
      <div class="admin-pane-card" style="background: var(--clr-surface); border: 1px solid var(--clr-border); border-radius: 12px; padding: 22px;">
        <div style="border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 12px; margin-bottom: 18px;">
          <h3 style="font-size: 15px; font-weight: 700; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
            <span>📝</span> Card 3 — Alasan Silvikultur & Catatan Lapangan
          </h3>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div class="form-group">
            <label for="mnt-form-reason" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Penyebab / Alasan Tindakan:
            </label>
            <input type="text" id="mnt-form-reason" class="form-input" placeholder="Gulma menutupi tajuk bibit / bibit mati kekeringan / pemupukan berkala..." value="${escapeHtml(log?.action_reason || '')}" />
          </div>

          <div class="form-group">
            <label for="mnt-form-notes" style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
              Catatan Tambahan & Dokumentasi:
            </label>
            <textarea id="mnt-form-notes" class="form-textarea" rows="3" placeholder="Kondisi pasca tindakan, rekomendasi pemantauan lanjutan...">${escapeHtml(log?.notes || '')}</textarea>
          </div>
        </div>
      </div>

      <!-- Tombol Aksi Bawah -->
      <div style="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 18px 0; border-top: 1px solid var(--clr-border-subtle);">
        <button type="button" id="btn-cancel-mnt-bottom" class="btn-secondary-action">
          Batal
        </button>
        <button type="button" id="btn-save-mnt-bottom" class="btn-primary-action">
          💾 ${isEdit ? 'Simpan Perubahan' : 'Simpan Tindakan'}
        </button>
      </div>
    </form>
  `;

  // Cancel and Back handlers
  const handleCancelOrBack = () => {
    renderMaintenanceTab(container);
  };

  document.getElementById('breadcrumb-btn-mnt-list')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-back-to-mnt')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-cancel-mnt-top')?.addEventListener('click', handleCancelOrBack);
  document.getElementById('btn-cancel-mnt-bottom')?.addEventListener('click', handleCancelOrBack);

  // Save handler
  const handleSave = async () => {
    const alertBox = document.getElementById('mnt-form-alert');
    alertBox.classList.add('hidden');
    alertBox.textContent = '';

    const actId = document.getElementById('mnt-form-act').value;
    const rawDate = document.getElementById('mnt-form-date').value;
    const date = parseDateForPayload(rawDate);
    const action = document.getElementById('mnt-form-action').value;
    const team = document.getElementById('mnt-form-team').value.trim();
    const handledStr = document.getElementById('mnt-form-handled').value;
    const replStr = document.getElementById('mnt-form-replacement').value;
    const costStr = document.getElementById('mnt-form-cost').value;
    const reason = document.getElementById('mnt-form-reason').value.trim() || null;
    const notes = document.getElementById('mnt-form-notes').value.trim() || null;

    if (!actId) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Pilih kelompok / batch penanaman.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!date) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Tanggal pelaksanaan wajib diisi dengan tanggal yang valid.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!team) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Petugas atau tim pelaksana wajib diisi.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const handled = parseInt(handledStr, 10) || 0;
    const replacement = parseInt(replStr, 10) || 0;
    const cost = costStr ? parseFloat(costStr) : null;

    if (handled < 0) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Jumlah tanaman ditangani tidak boleh negatif.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (replacement < 0) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = 'Jumlah bibit penyulaman tidak boleh negatif.';
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const payload = {
      planting_activity_id: actId,
      maintenance_date: date,
      action_type: action,
      officer_or_team: team,
      plants_handled_count: handled,
      replacement_plants_count: replacement,
      action_reason: reason,
      notes,
      cost,
    };

    const saveBtns = [document.getElementById('btn-save-mnt-top'), document.getElementById('btn-save-mnt-bottom')];
    saveBtns.forEach((b) => {
      if (b) {
        b.disabled = true;
        b.innerHTML = '⏳ Menyimpan...';
      }
    });

    try {
      await ApiService.saveTreeMaintenance(payload, isEdit ? log.id : null);
      if (isEdit) {
        EcoToast.show({
          type: 'success',
          title: 'Berhasil diperbarui.',
          message: 'Catatan perawatan dan penyulaman berhasil diperbarui.',
        });
      } else {
        EcoToast.saved('Catatan perawatan dan penyulaman berhasil disimpan.');
      }
      await renderMaintenanceTab(container);
    } catch (err) {
      alertBox.className = 'alert-banner alert-danger';
      alertBox.textContent = `Gagal menyimpan catatan perawatan: ${err.message}. Seluruh data input tetap dipertahankan.`;
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      EcoToast.error('✕ Gagal menyimpan perawatan', err.message);
      saveBtns.forEach((b) => {
        if (b) {
          b.disabled = false;
          b.innerHTML = isEdit ? '💾 Simpan Perubahan' : '💾 Simpan Tindakan';
        }
      });
    }
  };

  document.getElementById('btn-save-mnt-top')?.addEventListener('click', handleSave);
  document.getElementById('btn-save-mnt-bottom')?.addEventListener('click', handleSave);
}

const renderMaintenanceEditFormView = renderMaintenanceFormView;

// ─────────────────────────────────────────────────────────────
// 6. LAPORAN PENANAMAN (CSV DOWNLOAD)
// ─────────────────────────────────────────────────────────────
function renderReportsTab(container) {
  container.innerHTML = `
    <div style="max-width: 780px;">
      <h3 style="font-size: 16px; margin-bottom: 6px;">Ekspor Laporan Resmi Penanaman & Pemantauan</h3>
      <p style="color: var(--clr-text-muted); font-size: 13px; margin-bottom: 20px;">
        Unduh laporan format CSV terstandar dengan encoding UTF-8 BOM untuk kompatibilitas langsung di Microsoft Excel, Google Sheets, dan LibreOffice.
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
        <div class="admin-pane-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 28px;">📊</span>
            <h4 style="font-size: 14px; margin: 8px 0 4px;">Ringkasan Penanaman & Kelangsungan Hidup</h4>
            <p style="font-size: 12px; color: var(--clr-text-muted);">Memuat kode batch, tanggal tanam, zona, bibit awal, jumlah hidup survei terkini, tingkat kelangsungan hidup, dan bibit penyulaman.</p>
          </div>
          <a href="/api/admin/trees/reports/summary/csv" class="btn-primary-action btn-sm" style="text-decoration: none; text-align: center; margin-top: 14px;">
            📥 Unduh CSV Ringkasan
          </a>
        </div>

        <div class="admin-pane-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 28px;">🌿</span>
            <h4 style="font-size: 14px; margin: 8px 0 4px;">Master Jenis Pohon</h4>
            <p style="font-size: 12px; color: var(--clr-text-muted);">Daftar seluruh spesies pohon tercatat beserta nama ilmiah, famili botani, status jenis lokal/introduksi, fungsi ekologis, dan total bibit ditanam.</p>
          </div>
          <a href="/api/admin/trees/reports/species/csv" class="btn-secondary-action btn-sm" style="text-decoration: none; text-align: center; margin-top: 14px;">
            📥 Unduh CSV Master Pohon
          </a>
        </div>

        <div class="admin-pane-card" style="padding: 16px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 28px;">🔍</span>
            <h4 style="font-size: 14px; margin: 8px 0 4px;">Riwayat Survei Pemantauan</h4>
            <p style="font-size: 12px; color: var(--clr-text-muted);">Laporan detail seluruh survei berkala menurut tanggal, kondisi kesehatan tanaman, ukuran rata-rata tinggi dan diameter, serta catatan surveyor.</p>
          </div>
          <a href="/api/admin/trees/reports/surveys/csv" class="btn-secondary-action btn-sm" style="text-decoration: none; text-align: center; margin-top: 14px;">
            📥 Unduh CSV Catatan Survei
          </a>
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 7. IMPOR DAN EKSPOR DATA
// ─────────────────────────────────────────────────────────────
function renderImportExportTab(container) {
  container.innerHTML = `
    <div style="max-width: 800px;">
      <h3 style="font-size: 16px; margin-bottom: 6px;">Impor Data Penanaman & Pemantauan</h3>
      <p style="color: var(--clr-text-muted); font-size: 13px; margin-bottom: 20px;">
        Unggah data massal menggunakan berkas CSV dengan template resmi. Sistem akan memvalidasi baris, mendeteksi kesalahan, dan menampilkan pratinjau sebelum disimpan. Data historis yang ada tidak akan terhapus.
      </p>

      <div class="form-row" style="margin-bottom: 16px;">
        <div class="form-group" style="flex: 1;">
          <label>1. Unduh Template CSV Resmi:</label>
          <div style="display: flex; gap: 8px; margin-top: 4px;">
            <a href="/api/admin/trees/import/template/species" class="btn-secondary-action btn-sm" style="text-decoration: none;">
              📥 Template Master Jenis Pohon
            </a>
            <a href="/api/admin/trees/import/template/activities" class="btn-secondary-action btn-sm" style="text-decoration: none;">
              📥 Template Kegiatan Penanaman
            </a>
          </div>
        </div>
      </div>

      <div class="admin-pane-card" style="padding: 18px; margin-bottom: 20px;">
        <h4 style="font-size: 14px; margin-bottom: 12px;">2. Unggah & Periksa Berkas CSV</h4>
        <form id="form-import-preview" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="form-row">
            <div class="form-group" style="flex: 1;">
              <label>Jenis Data Impor: *</label>
              <select id="import-type" class="form-select" required>
                <option value="species">Master Jenis Pohon</option>
                <option value="activities">Kegiatan Penanaman & Bibit Awal</option>
              </select>
            </div>
            <div class="form-group" style="flex: 2;">
              <label>Pilih Berkas CSV: *</label>
              <input type="file" id="import-file" class="form-input" accept=".csv,text/csv" required />
            </div>
          </div>
          <div>
            <button type="submit" class="btn-primary-action btn-sm">🔍 Periksa & Pratinjau Berkas</button>
          </div>
        </form>
      </div>

      <!-- Preview Container -->
      <div id="import-preview-container" class="hidden" style="margin-top: 16px;">
        <!-- Populated dynamically -->
      </div>
    </div>
  `;

  const formPreview = document.getElementById('form-import-preview');
  const previewContainer = document.getElementById('import-preview-container');

  formPreview?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const type = document.getElementById('import-type').value;
    const fileInput = document.getElementById('import-file');
    const file = fileInput.files[0];
    if (!file) return;

    previewContainer.innerHTML = `<div style="text-align: center; padding: 20px;">⏳ Memvalidasi berkas CSV...</div>`;
    previewContainer.classList.remove('hidden');

    try {
      const res = await ApiService.previewTreeImport(file, type);
      renderImportPreviewResult(previewContainer, res, type);
    } catch (err) {
      previewContainer.innerHTML = `
        <div class="alert-banner alert-danger">
          ⚠️ Validasi Gagal: ${escapeHtml(err.message)}
        </div>
      `;
    }
  });
}

function renderImportPreviewResult(container, res, type) {
  const hasErrors = res.invalid_count > 0;
  const canImport = res.valid_count > 0;

  container.innerHTML = `
    <div class="admin-pane-card" style="padding: 16px;">
      <h4 style="font-size: 14px; margin-bottom: 8px;">Hasil Pemeriksaan Berkas</h4>
      <div style="display: flex; gap: 12px; font-size: 13px; margin-bottom: 14px;">
        <span class="admin-header-pill pill-neutral">Total: ${res.total_rows} baris</span>
        <span class="admin-header-pill pill-success">Valid: ${res.valid_count} baris</span>
        ${hasErrors ? `<span class="admin-header-pill pill-danger">Bermasalah: ${res.invalid_count} baris</span>` : ''}
      </div>

      ${
        hasErrors
          ? `
        <div style="margin-bottom: 14px; background: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 10px; border-radius: 4px; font-size: 12px;">
          <b>Baris Bermasalah (Dilewati):</b>
          <ul style="margin: 4px 0 0 16px;">
            ${res.invalid_rows.map((inv) => `<li>Baris ${inv.line}: ${inv.errors.join(', ')}</li>`).join('')}
          </ul>
        </div>
      `
          : ''
      }

      <div style="overflow-x: auto; max-height: 240px; margin-bottom: 14px;">
        <table class="admin-data-table" style="width: 100%; border-collapse: collapse; font-size: 12px;">
          <thead>
            <tr style="border-bottom: 1px solid var(--clr-border); background: rgba(255,255,255,0.03);">
              <th style="padding: 6px 10px;">Baris</th>
              <th style="padding: 6px 10px;">Data Utama</th>
              <th style="padding: 6px 10px;">Status</th>
            </tr>
          </thead>
          <tbody>
            ${res.valid_preview
              .map(
                (v) => `
              <tr style="border-bottom: 1px solid var(--clr-border);">
                <td style="padding: 6px 10px;">${v.line}</td>
                <td style="padding: 6px 10px;">${escapeHtml(v.common_name || v.batch_code || '')} ${v.scientific_name ? `(<i>${v.scientific_name}</i>)` : ''} ${v.quantity ? `— ${v.quantity} bibit` : ''}</td>
                <td style="padding: 6px 10px; color: #10b981;">✓ Valid</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>

      ${
        canImport
          ? `
        <button id="btn-execute-import" class="btn-primary-action btn-sm">
          💾 Simpan ${res.valid_count} Data Valid ke Database
        </button>
      `
          : `<p style="color: #ef4444; font-size: 13px;">Tidak ada data valid yang dapat diimpor. Silakan perbaiki berkas CSV.</p>`
      }
    </div>
  `;

  document.getElementById('btn-execute-import')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-execute-import');
    try {
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Menyimpan data impor...';
      }
      const execRes = await ApiService.executeTreeImport(type, res.valid_data);
      EcoToast.imported(execRes?.message || 'Data impor berhasil disimpan ke database.');
      container.classList.add('hidden');
    } catch (e) {
      EcoToast.error('✕ Gagal mengimpor data', e.message);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = `💾 Simpan ${res.valid_count} Data Valid ke Database`;
      }
    }
  });
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

function ucfirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
