/**
 * Modul Log Aktivitas Administrator
 * Menampilkan catatan histori setiap operasi sistem, waktu, pelaku, dan modul.
 */
import { ApiService } from '../services/api.js';

let cachedLogs = [];

export async function initActivityLogsModule() {
  const container = document.getElementById('admin-activity-logs-content');
  if (!container) return;

  renderActivityLogsLayout(container);
  await loadActivityLogs();
}

function renderActivityLogsLayout(container) {
  container.innerHTML = `
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">📜</span>
          <span>Log Aktivitas Sistem</span>
        </h2>
        <p class="zones-hero-desc">
          Rekaman jejak audit sistem: penambahan kawasan, pembaruan bibit, survei pemantauan, publikasi hotspot, dan autentikasi.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-refresh-logs" class="btn-secondary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>🔄</span> Segarkan Log
        </button>
      </div>
    </div>

    <!-- Filter Bar -->
    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: 20px; background: var(--clr-surface); padding: 14px 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <input type="text" id="log-search" class="form-input" placeholder="🔍 Cari deskripsi atau pengguna..." style="max-width: 280px; padding: 7px 12px; font-size: 13px;" />
      <select id="log-filter-module" class="form-select" style="padding: 7px 12px; font-size: 13px;">
        <option value="all">Semua Modul</option>
        <option value="zones">Kawasan</option>
        <option value="trees">Data Penanaman</option>
        <option value="hotspots">Hotspots</option>
        <option value="users">Pengguna</option>
        <option value="settings">Pengaturan</option>
      </select>
    </div>

    <!-- Logs Table Container -->
    <div id="logs-table-wrapper" class="table-responsive" style="background: var(--clr-surface); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat log aktivitas...
      </div>
    </div>
  `;

  const btnRefresh = container.querySelector('#btn-refresh-logs');
  if (btnRefresh) btnRefresh.addEventListener('click', loadActivityLogs);

  const searchInput = container.querySelector('#log-search');
  const moduleSelect = container.querySelector('#log-filter-module');

  const handleFilter = async () => {
    await loadActivityLogs({
      search: searchInput.value.trim(),
      module: moduleSelect.value,
    });
  };

  if (searchInput) searchInput.addEventListener('input', debounce(handleFilter, 300));
  if (moduleSelect) moduleSelect.addEventListener('change', handleFilter);
}

async function loadActivityLogs(params = {}) {
  const wrapper = document.getElementById('logs-table-wrapper');
  if (!wrapper) return;

  try {
    const res = await ApiService.getActivityLogs(params);
    cachedLogs = res.logs || [];
    renderLogsTable(wrapper, cachedLogs);
  } catch (err) {
    wrapper.innerHTML = `
      <div style="color: #fca5a5; padding: 16px;">❌ Gagal memuat log: ${err.message}</div>
    `;
  }
}

function renderLogsTable(container, logs) {
  if (!logs || logs.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--clr-text-muted);">
        Tidak ada catatan log aktivitas yang cocok dengan filter.
      </div>
    `;
    return;
  }

  const rows = logs.map((l) => {
    const dateStr = l.created_at ? l.created_at.substring(0, 19).replace('T', ' ') : '-';
    const actionBadges = {
      create: '<span class="badge-status-published" style="font-size:11px;">TAMBAH</span>',
      update: '<span class="badge-status-draft" style="color:#38bdf8;border-color:rgba(56,189,248,0.3);font-size:11px;">UBAH</span>',
      delete: '<span class="badge-status-inactive" style="font-size:11px;">HAPUS</span>',
      archive: '<span class="badge-status-draft" style="font-size:11px;">ARSIP</span>',
      link_scenes: '<span class="badge-status-draft" style="font-size:11px;">HUBUNGKAN</span>',
    };
    const badge = actionBadges[l.action] || `<span style="font-size:11px;color:var(--clr-text-muted);text-transform:uppercase;">${l.action}</span>`;

    return `
      <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
        <td style="padding: 10px; font-family: monospace; font-size: 11px; color: var(--clr-text-dim); white-space: nowrap;">
          ${dateStr}
        </td>
        <td style="padding: 10px; font-weight: 600; color: #fff;">
          ${escapeHtml(l.user_name || 'Admin')}
        </td>
        <td style="padding: 10px;">
          ${badge}
        </td>
        <td style="padding: 10px; font-weight: 500; text-transform: uppercase; font-size: 11px; color: var(--clr-primary);">
          ${escapeHtml(l.module)}
        </td>
        <td style="padding: 10px; color: #fff;">
          ${escapeHtml(l.description)}
        </td>
        <td style="padding: 10px; font-family: monospace; font-size: 11px; color: var(--clr-text-dim);">
          ${l.ip_address || '-'}
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table class="data-table" style="width: 100%; font-size: 13px;">
      <thead>
        <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border); text-align: left; font-size: 12px;">
          <th style="padding: 10px;">Waktu Kejadian</th>
          <th style="padding: 10px;">Pengguna</th>
          <th style="padding: 10px;">Aksi</th>
          <th style="padding: 10px;">Modul</th>
          <th style="padding: 10px;">Uraian Catatan Log</th>
          <th style="padding: 10px;">IP Pengakses</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

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
