/**
 * Modul Laporan dan Statistik Penanaman
 * Submenu:
 * 1. Rekapitulasi Penanaman
 * 2. Kelangsungan Hidup Tanaman
 * 3. Laporan per Kawasan
 * 4. Laporan per Jenis Pohon
 * 5. Ekspor Data
 */
import { ApiService } from '../services/api.js';
import { formatDateDisplay } from '../utils/date.js';

let currentReportTab = 'rekap';
let cachedZones = [];
let cachedDashboardData = null;

export async function initReportsModule() {
  const container = document.getElementById('admin-reports-content');
  if (!container) return;

  renderReportsLayout(container);
  await loadReportTabData(currentReportTab);
}

export async function switchReportSubTab(tabName) {
  currentReportTab = tabName;
  const container = document.getElementById('admin-reports-content');
  if (!container) return;

  if (!document.getElementById('report-content-pane')) {
    renderReportsLayout(container);
  }

  container.querySelectorAll('.report-tab-btn').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-report-tab') === tabName);
  });

  await loadReportTabData(tabName);
}

function renderReportsLayout(container) {
  container.innerHTML = `
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">📊</span>
          <span>Laporan &amp; Statistik Penanaman</span>
        </h2>
        <p class="zones-hero-desc">
          Rekapitulasi kuantitatif, analisis kelangsungan hidup (survival rate), laporan agregat per kawasan dan jenis pohon, serta ekspor berkas.
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <a href="/api/admin/trees/reports/summary/csv" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;" download>
          <span>📥</span> Unduh Semua Data (CSV)
        </a>
      </div>
    </div>

    <!-- Reports Subtabs -->
    <div class="report-subtabs" style="display: flex; gap: 6px; border-bottom: 1px solid var(--clr-border); padding-bottom: 10px; margin-bottom: 20px; overflow-x: auto;">
      <button class="report-tab-btn active" data-report-tab="rekap">📋 Rekapitulasi Penanaman</button>
      <button class="report-tab-btn" data-report-tab="survival">🌱 Kelangsungan Hidup Tanaman</button>
      <button class="report-tab-btn" data-report-tab="per-kawasan">🏞️ Laporan per Kawasan</button>
      <button class="report-tab-btn" data-report-tab="per-pohon">🌳 Laporan per Jenis Pohon</button>
      <button class="report-tab-btn" data-report-tab="ekspor">💾 Ekspor Data</button>
    </div>

    <!-- Report Body Container -->
    <div id="report-pane-body" style="min-height: 400px;">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat laporan...
      </div>
    </div>
  `;

  // Attach clicks
  container.querySelectorAll('.report-tab-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const tab = btn.getAttribute('data-report-tab');
      await switchReportSubTab(tab);
    });
  });
}

async function loadReportTabData(tab) {
  const body = document.getElementById('report-pane-body');
  if (!body) return;

  try {
    if (!cachedDashboardData) {
      cachedDashboardData = await ApiService.getTreeDashboard();
    }
    if (cachedZones.length === 0) {
      const zRes = await ApiService.getZones();
      cachedZones = zRes.zones || [];
    }

    if (tab === 'rekap') {
      renderRekapitulasiReport(body, cachedDashboardData);
    } else if (tab === 'survival') {
      renderSurvivalReport(body, cachedDashboardData);
    } else if (tab === 'per-kawasan') {
      renderPerKawasanReport(body, cachedZones);
    } else if (tab === 'per-pohon') {
      renderPerPohonReport(body, cachedDashboardData);
    } else if (tab === 'ekspor') {
      renderEksporReport(body);
    }
  } catch (err) {
    body.innerHTML = `
      <div class="alert-error" style="padding: 16px; background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 8px; color: #fca5a5;">
        ❌ Gagal memuat data laporan: ${err.message}
      </div>
    `;
  }
}

function renderRekapitulasiReport(container, data) {
  const ind = data.indicators || data.metrics || {};
  const totalInitial = ind.total_initial_seedlings || 0;
  const aliveInitial = ind.total_alive_initial || 0;
  const deadInitial = ind.total_dead_initial || 0;
  const missingInitial = ind.total_missing_initial || 0;
  const replacements = ind.total_replacements || 0;
  const survivalRate = ind.survival_rate;
  const survivalDisplay = survivalRate != null ? `${Number(survivalRate).toFixed(1)}%` : 'Data Belum Lengkap';

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Summary Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Total Bibit Awal</span>
          <span class="stat-value">${totalInitial.toLocaleString('id-ID')}</span>
          <span class="stat-desc">Tercatat dalam kegiatan</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Tanaman Terkonfirmasi Hidup</span>
          <span class="stat-value" style="color: var(--clr-primary);">${aliveInitial.toLocaleString('id-ID')}</span>
          <span class="stat-desc">Kelompok bibit awal</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Tanaman Mati</span>
          <span class="stat-value" style="color: var(--clr-danger);">${deadInitial.toLocaleString('id-ID')}</span>
          <span class="stat-desc">Hasil verifikasi survei</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Tanaman Hilang / Rusak</span>
          <span class="stat-value" style="color: var(--clr-gold);">${missingInitial.toLocaleString('id-ID')}</span>
          <span class="stat-desc">Tidak ditemukan di ajir</span>
        </div>
        <div class="stat-card" style="background: var(--clr-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
          <span class="stat-label">Bibit Penyulaman</span>
          <span class="stat-value" style="color: #38bdf8;">${replacements.toLocaleString('id-ID')}</span>
          <span class="stat-desc">Dicatat terpisah dari awal</span>
        </div>
      </div>

      <!-- Action & Table -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h4 style="color: #fff; margin: 0; font-size: 15px;">Tabel Rekapitulasi Bibit dan Tindakan Lapangan</h4>
          <a href="/api/admin/trees/reports/summary/csv" class="btn-secondary-action btn-sm" download>📥 Ekspor CSV</a>
        </div>
        <table class="data-table" style="width: 100%; font-size: 13px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 10px;">Indikator</th>
              <th style="padding: 10px; text-align: right;">Jumlah Batang</th>
              <th style="padding: 10px; text-align: right;">Persentase</th>
              <th style="padding: 10px;">Keterangan Metodologis</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: #fff; font-weight: 600;">Bibit Awal Ditanam</td>
              <td style="padding: 10px; text-align: right; font-weight: 700;">${totalInitial.toLocaleString('id-ID')}</td>
              <td style="padding: 10px; text-align: right;">100.0%</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Dasar acuan historis kelompok awal</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: var(--clr-primary); font-weight: 600;">Terkonfirmasi Hidup (Kelompok Awal)</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-primary); font-weight: 700;">${aliveInitial.toLocaleString('id-ID')}</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-primary); font-weight: 700;">${survivalDisplay}</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Kelangsungan hidup kelompok awal tanpa mencampur sulaman</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: var(--clr-danger); font-weight: 600;">Mati (Kelompok Awal)</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-danger); font-weight: 700;">${deadInitial.toLocaleString('id-ID')}</td>
              <td style="padding: 10px; text-align: right;">${totalInitial > 0 ? ((deadInitial / totalInitial) * 100).toFixed(1) + '%' : '-'}</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Mati akibat kekeringan, genangan, atau penyakit</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: var(--clr-gold); font-weight: 600;">Hilang / Terbawa Air</td>
              <td style="padding: 10px; text-align: right; color: var(--clr-gold); font-weight: 700;">${missingInitial.toLocaleString('id-ID')}</td>
              <td style="padding: 10px; text-align: right;">${totalInitial > 0 ? ((missingInitial / totalInitial) * 100).toFixed(1) + '%' : '-'}</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Ajir ditemukan kosong atau tersapu air</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px; color: #38bdf8; font-weight: 600;">Bibit Sulaman Masuk</td>
              <td style="padding: 10px; text-align: right; color: #38bdf8; font-weight: 700;">${replacements.toLocaleString('id-ID')}</td>
              <td style="padding: 10px; text-align: right;">-</td>
              <td style="padding: 10px; color: var(--clr-text-muted);">Bibit pengganti yang disulam untuk memulihkan kerapatan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSurvivalReport(container, data) {
  const surv = data.survival || {};
  const needsInspection = data.needs_inspection || [];

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; margin-top: 0; font-size: 16px;">Formula Kelangsungan Hidup Tanaman (Silvikultur Standar)</h3>
        <div style="background: var(--clr-surface-card); padding: 16px; border-radius: 8px; border-left: 4px solid var(--clr-primary); margin: 12px 0; font-family: monospace; font-size: 14px; color: #fff;">
          Persentase Kelangsungan Hidup = (Jumlah Tanaman Kelompok Awal Hidup ÷ Jumlah Bibit Awal Ditanam) × 100%
        </div>
        <p style="color: var(--clr-text-muted); font-size: 13px; line-height: 1.6; margin: 0;">
          💡 <strong>Kepatuhan Metodologi:</strong> Bibit hasil sulaman tidak dihitung sebagai bibit kelompok awal agar tidak memanipulasi persentase kelulusan hidup tanaman asli. Hasil survei adalah potret pada waktu pemeriksaan, bukan penjumlahan kumulatif.
        </p>
      </div>

      <!-- Kelompok Perlu Pemeriksaan Ulang -->
      <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h4 style="color: #fff; margin-top: 0; font-size: 15px;">Kelompok Penanaman yang Perlu Pemantauan / Tindak Lanjut (${needsInspection.length})</h4>
        ${needsInspection.length > 0 ? `
          <table class="data-table" style="width: 100%; font-size: 13px; margin-top: 10px;">
            <thead>
              <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
                <th style="padding: 8px;">Batch</th>
                <th style="padding: 8px;">Nama Kegiatan</th>
                <th style="padding: 8px;">Zona / Lokasi</th>
                <th style="padding: 8px;">Survei Terakhir</th>
                <th style="padding: 8px; text-align: center;">Survival</th>
                <th style="padding: 8px;">Alasan Tindak Lanjut</th>
              </tr>
            </thead>
            <tbody>
              ${needsInspection.map((item) => `
                <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                  <td style="padding: 8px; font-family: monospace; color: var(--clr-primary);">${item.batch_code}</td>
                  <td style="padding: 8px; font-weight: 600; color: #fff;">${item.name}</td>
                  <td style="padding: 8px;">${item.location_zone || '-'}</td>
                  <td style="padding: 8px;">${item.last_survey_date ? formatDateDisplay(item.last_survey_date) : 'Belum pernah'}</td>
                  <td style="padding: 8px; text-align: center; color: ${item.survival_rate !== null && item.survival_rate < 70 ? 'var(--clr-danger)' : 'var(--clr-gold)'}; font-weight: 700;">
                    ${item.survival_rate !== null ? item.survival_rate + '%' : '-'}
                  </td>
                  <td style="padding: 8px; color: #fca5a5;">${item.reason}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p style="color: var(--clr-primary); font-size: 13px;">✅ Semua kelompok penanaman telah terpantau dengan kondisi kelangsungan hidup baik.</p>'}
      </div>
    </div>
  `;
}

function renderPerKawasanReport(container, zones) {
  container.innerHTML = `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Perbandingan Seluruh Kawasan Penanaman (${zones.length} Kawasan)</h4>
        <button onclick="window.print()" class="btn-text-btn btn-sm">🖨️ Cetak Laporan</button>
      </div>

      <table class="data-table" style="width: 100%; font-size: 13px;">
        <thead>
          <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
            <th style="padding: 10px;">Kode & Nama Kawasan</th>
            <th style="padding: 10px;">Luas Lahan</th>
            <th style="padding: 10px; text-align: center;">Kegiatan</th>
            <th style="padding: 10px; text-align: center;">Bibit Awal</th>
            <th style="padding: 10px; text-align: center;">Jumlah Spesies</th>
            <th style="padding: 10px; text-align: center;">Survival Rate</th>
            <th style="padding: 10px; text-align: center;">Status</th>
          </tr>
        </thead>
        <tbody>
          ${zones.map((z) => `
            <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
              <td style="padding: 10px;">
                <div style="font-weight: 600; color: #fff;">${z.name}</div>
                <div style="font-family: monospace; font-size: 11px; color: var(--clr-primary);">${z.zone_code}</div>
              </td>
              <td style="padding: 10px; color: #fff;">${z.area_size} ${z.area_unit}</td>
              <td style="padding: 10px; text-align: center; color: #fff;">${z.activities_count || 0}</td>
              <td style="padding: 10px; text-align: center; font-weight: 600; color: #fff;">${(z.total_initial_seedlings || 0).toLocaleString('id-ID')}</td>
              <td style="padding: 10px; text-align: center; color: #fff;">${z.species_count || 0}</td>
              <td style="padding: 10px; text-align: center; font-weight: 700; color: var(--clr-primary);">
                ${z.survival_rate !== null ? z.survival_rate + '%' : '<span style="color:var(--clr-text-dim)">-</span>'}
              </td>
              <td style="padding: 10px; text-align: center;">
                <span class="badge-status-published">${z.status}</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderPerPohonReport(container, data) {
  const chartData = data.charts?.species_distribution || [];

  container.innerHTML = `
    <div style="background: var(--clr-surface); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <h4 style="color: #fff; margin: 0; font-size: 15px;">Distribusi Penanaman per Jenis Pohon</h4>
        <a href="/api/admin/trees/reports/species/csv" class="btn-secondary-action btn-sm" download>📥 Ekspor Data Spesies (CSV)</a>
      </div>

      ${chartData.length > 0 ? `
        <table class="data-table" style="width: 100%; font-size: 13px;">
          <thead>
            <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border);">
              <th style="padding: 10px;">Nama Lokal Pohon</th>
              <th style="padding: 10px;">Nama Ilmiah (Latin)</th>
              <th style="padding: 10px; text-align: right;">Total Bibit Awal</th>
            </tr>
          </thead>
          <tbody>
            ${chartData.map((sp) => `
              <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
                <td style="padding: 10px; font-weight: 600; color: #fff;">${sp.common_name || sp.local_name || '-'}</td>
                <td style="padding: 10px; font-style: italic; color: var(--clr-primary);">${sp.scientific_name || '-'}</td>
                <td style="padding: 10px; text-align: right; font-weight: 700; color: #fff;">${(sp.total_planted != null ? sp.total_planted : (sp.count || 0)).toLocaleString('id-ID')} batang</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<p style="color: var(--clr-text-muted); font-size: 13px;">Belum ada data penanaman per jenis pohon.</p>'}
    </div>
  `;
}

function renderEksporReport(container) {
  container.innerHTML = `
    <div style="background: var(--clr-surface); padding: 24px; border-radius: var(--radius-md); border: 1px solid var(--clr-border); max-width: 760px; margin: 0 auto;">
      <h3 style="color: #fff; margin-top: 0; font-size: 17px; margin-bottom: 16px;">Pusat Unduhan & Ekspor Berkas Laporan</h3>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: var(--clr-surface-card); border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
          <div>
            <div style="font-weight: 600; color: #fff;">Rekapitulasi Penanaman Komprehensif</div>
            <div style="font-size: 12px; color: var(--clr-text-muted);">Format CSV terstruktur untuk Excel/Spreadsheet</div>
          </div>
          <a href="/api/admin/trees/reports/summary/csv" class="btn-primary-action btn-sm" download>📥 Unduh CSV</a>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: var(--clr-surface-card); border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
          <div>
            <div style="font-weight: 600; color: #fff;">Katalog Master Jenis Pohon (Spesies)</div>
            <div style="font-size: 12px; color: var(--clr-text-muted);">Data nama lokal, ilmiah, famili, status dan fungsi ekologis</div>
          </div>
          <a href="/api/admin/trees/reports/species/csv" class="btn-primary-action btn-sm" download>📥 Unduh CSV</a>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; background: var(--clr-surface-card); border-radius: var(--radius-sm); border: 1px solid var(--clr-border-subtle);">
          <div>
            <div style="font-weight: 600; color: #fff;">Laporan Hasil Pemantauan & Sensus Pertumbuhan</div>
            <div style="font-size: 12px; color: var(--clr-text-muted);">Riwayat survei, tanaman hidup, mati, dan gejala kerusakan</div>
          </div>
          <a href="/api/admin/trees/reports/surveys/csv" class="btn-primary-action btn-sm" download>📥 Unduh CSV</a>
        </div>
      </div>
    </div>
  `;
}
