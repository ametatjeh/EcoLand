/**
 * Dashboard Virtual Tour & Penanaman Pohon Controller
 * Mengikuti Spesifikasi Master Prompt Bagian E:
 * E.1. Kartu Statistik Utama (8 metrik nyata)
 * E.2. Panel Tahapan Pengelolaan Kawasan (5 tahap: Persiapan, Pelaksanaan, Pemantauan, Virtual Tour, Evaluasi)
 * E.3. Progres per Kawasan (difilter berdasarkan zona terpilih)
 * E.4. Aktivitas Terbaru (real activity log)
 * Diagnostik & Integritas Virtual Tour 360° Marzipano
 */
import { ApiService } from '../services/api.js';

export async function renderDashboard({
  scenes,
  hotspots,
  selectedZoneId = 'all',
  onNavigateToPanorama,
  onNavigateToEditor,
  onNavigateToTrees,
  onNavigateToZones,
  onNavigateToSpecies,
  onNavigateToActivities,
  onNavigateToSurveys,
  onNavigateToMaintenance,
  onNavigateToReports,
  onNavigateToLogs,
}) {
  const container = document.getElementById('admin-dashboard-content');
  if (!container) return;

  const validSceneIds = new Set(scenes.map((s) => s.id));

  // Metrik Hotspots
  const totalScenes = scenes.length;
  const linkHotspots = hotspots.filter((h) => h.type === 'link');
  const infoHotspots = hotspots.filter((h) => h.type === 'info');
  const draftHotspots = hotspots.filter((h) => h.status === 'draft');
  const publishedHotspots = hotspots.filter((h) => h.status === 'published');
  const inactiveHotspots = hotspots.filter((h) => h.isActive === false || h.status === 'inactive');

  // Diagnostics Virtual Tour
  const scenesWithLinks = new Set(linkHotspots.map((h) => h.sceneId));
  const scenesWithoutLinks = scenes.filter((s) => !scenesWithLinks.has(s.id));
  const brokenLinkHotspots = linkHotspots.filter((h) => !validSceneIds.has(h.target));
  const missingAssetScenes = scenes.filter((s) => s.status !== 'tersedia');
  const validRegisteredHotspots = Math.max(0, hotspots.length - brokenLinkHotspots.length);

  // Fetch Tree Planting Dashboard Stats
  let treeData = null;
  try {
    const res = await ApiService.getTreeDashboard(selectedZoneId);
    treeData = res;
  } catch (err) {
    console.warn('Could not load tree dashboard stats:', err);
  }

  // Fetch Recent Activity Logs
  let recentLogs = [];
  try {
    const logsRes = await ApiService.getActivityLogs({ per_page: 5 });
    recentLogs = logsRes.logs?.data || logsRes.logs || [];
  } catch (err) {
    console.warn('Could not load recent logs for dashboard:', err);
  }

  const indicators = treeData?.indicators || {
    total_zones: 0,
    total_species: 0,
    total_activities: 0,
    total_initial_seedlings: 0,
    total_alive_initial: 0,
    total_dead_initial: 0,
    total_missing_initial: 0,
    total_replacements: 0,
    monitored_batches_count: 0,
    survival_rate: null,
    survival_rate_status: 'data_belum_lengkap',
  };

  const survivalText = indicators.survival_rate !== null ? `${indicators.survival_rate}%` : 'Data Belum Lengkap';
  const survivalBadge = indicators.survival_rate_status === 'terverifikasi' ? 'pill-success' : 'pill-info';

  // ========================================================
  // PERHITUNGAN STATUS 5 TAHAPAN PENGELOLAAN KAWASAN (E.2)
  // ========================================================

  // Tahap 1: Persiapan (Kawasan & Jenis Pohon)
  const hasZones = (indicators.total_zones || 0) > 0;
  const hasSpecies = (indicators.total_species || 0) > 0;
  let stage1Status = 'Belum Dimulai';
  let stage1Badge = 'pill-warning';
  let stage1Summary = 'Kawasan dan master jenis pohon belum dikonfigurasi.';
  let stage1Missing = 'Belum ada data kawasan dan spesies terdaftar.';
  if (hasZones && hasSpecies) {
    stage1Status = 'Selesai';
    stage1Badge = 'pill-success';
    stage1Summary = `${indicators.total_zones} kawasan aktif terdaftar & ${indicators.total_species} master jenis pohon siap.`;
    stage1Missing = 'Semua data persiapan awal telah lengkap.';
  } else if (hasZones || hasSpecies) {
    stage1Status = 'Sedang Berjalan';
    stage1Badge = 'pill-info';
    stage1Summary = `${indicators.total_zones || 0} kawasan & ${indicators.total_species || 0} spesies tercatat.`;
    stage1Missing = !hasZones ? 'Data kawasan belum ditambahkan.' : 'Master jenis pohon belum ditambahkan.';
  }

  // Tahap 2: Kegiatan Penanaman
  const hasActivities = (indicators.total_activities || 0) > 0;
  const hasSeedlings = (indicators.total_initial_seedlings || 0) > 0;
  let stage2Status = 'Belum Dimulai';
  let stage2Badge = 'pill-warning';
  let stage2Summary = 'Belum ada kegiatan penanaman di lapangan yang dicatat.';
  let stage2Missing = 'Pencatatan batch/kelompok bibit awal belum dilakukan.';
  if (hasActivities && hasSeedlings) {
    stage2Status = 'Selesai';
    stage2Badge = 'pill-success';
    stage2Summary = `${indicators.total_activities} kegiatan penanaman tercatat dengan total ${indicators.total_initial_seedlings} bibit awal.`;
    stage2Missing = 'Kelompok penanaman aktif di lapangan.';
  } else if (hasActivities) {
    stage2Status = 'Sedang Berjalan';
    stage2Badge = 'pill-info';
    stage2Summary = `${indicators.total_activities} kegiatan tercatat.`;
    stage2Missing = 'Rincian jumlah bibit pohon per spesies belum diisi.';
  }

  // Tahap 3: Pemantauan dan Perawatan
  const hasSurveys = (indicators.monitored_batches_count || 0) > 0;
  const hasReplacements = (indicators.total_replacements || 0) > 0;
  let stage3Status = 'Belum Dimulai';
  let stage3Badge = 'pill-warning';
  let stage3Summary = 'Pemeriksaan sensus dan tindakan silvikultur belum dicatat.';
  let stage3Missing = 'Survei sensus hidup/mati bibit belum diinput.';
  if (hasSurveys && hasReplacements) {
    stage3Status = 'Selesai';
    stage3Badge = 'pill-success';
    stage3Summary = `${indicators.monitored_batches_count} kelompok telah disensus, ${indicators.total_replacements} bibit penyulaman tertangani.`;
    stage3Missing = 'Survei dan silvikultur aktif berjalan berkala.';
  } else if (hasSurveys || hasReplacements) {
    stage3Status = 'Sedang Berjalan';
    stage3Badge = 'pill-info';
    stage3Summary = hasSurveys ? `${indicators.monitored_batches_count} kelompok terpantau.` : `${indicators.total_replacements} bibit disulam.`;
    stage3Missing = !hasSurveys ? 'Survei sensus tanaman belum dicatat.' : 'Belum ada tindakan penyulaman bibit mati.';
  }

  // Tahap 4: Dokumentasi Digital (Virtual Tour 360° Eco Land)
  const hasScenes = totalScenes > 0;
  const hasPublishedHotspots = publishedHotspots.length > 0;
  let stage4Status = 'Belum Dimulai';
  let stage4Badge = 'pill-warning';
  let stage4Summary = 'Panorama dan hotspot belum disiapkan.';
  let stage4Missing = 'Aset panorama atau hotspot belum terpasang.';
  if (hasScenes && hasPublishedHotspots && draftHotspots.length === 0) {
    stage4Status = 'Selesai';
    stage4Badge = 'pill-success';
    stage4Summary = `${totalScenes} panorama multiresolution & ${publishedHotspots.length} hotspot aktif terpublikasi.`;
    stage4Missing = 'Seluruh hotspot telah terbit untuk publik.';
  } else if (hasScenes) {
    stage4Status = 'Sedang Berjalan';
    stage4Badge = 'pill-info';
    stage4Summary = `${totalScenes} panorama tersedia, ${publishedHotspots.length} hotspot terpublikasi.`;
    stage4Missing = draftHotspots.length > 0 ? `${draftHotspots.length} hotspot masih berupa draft.` : 'Sebagian hotspot belum ditautkan.';
  }

  // Tahap 5: Evaluasi dan Pelaporan
  const hasSurvival = indicators.survival_rate !== null;
  let stage5Status = 'Belum Dimulai';
  let stage5Badge = 'pill-warning';
  let stage5Summary = 'Data evaluasi dan pelaporan belum lengkap.';
  let stage5Missing = 'Perlu data penanaman dan survei untuk menghasilkan laporan.';
  if (hasSurvival) {
    stage5Status = 'Selesai';
    stage5Badge = 'pill-success';
    stage5Summary = `Kelangsungan hidup ${indicators.survival_rate}% terverifikasi. Rekapitulasi & ekspor data siap diunduh.`;
    stage5Missing = 'Laporan komprehensif siap.';
  } else if (hasActivities) {
    stage5Status = 'Sedang Berjalan';
    stage5Badge = 'pill-info';
    stage5Summary = 'Data awal penanaman tersedia, menunggu hasil survei sensus untuk perhitungan kelulusan hidup (survival rate).';
    stage5Missing = 'Perhitungan survival rate membutuhkan sensus survei terverifikasi.';
  }

  // Helper formatting waktu log
  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return dateStr;
    }
  };

  container.innerHTML = `
    <!-- Top Action Banner -->
    <div class="admin-dashboard-hero" style="margin-bottom: 24px;">
      <div class="admin-hero-content">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 6px;">Ringkasan Sistem Informasi Eco Land & Restorasi Kawasan</h2>
        <p style="color: var(--clr-text-muted); font-size: 13px; line-height: 1.5;">
          Pantau status kelengkapan 6 panorama Marzipano, integritas hotspot interaktif, dan statistik penanaman bibit pohon kawasan ±2 hektare secara aktual.
        </p>
      </div>
      <div class="admin-hero-actions" style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button id="dash-btn-open-editor" class="btn-primary-action btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Editor Hotspot
        </button>
        <button id="dash-btn-open-panoramas" class="btn-secondary-action btn-sm">
          🌐 Panorama (${totalScenes})
        </button>
        <button id="dash-btn-open-trees" class="btn-secondary-action btn-sm">
          🌱 Data Penanaman
        </button>
      </div>
    </div>

    <!-- E.1. DELAPAN KARTU STATISTIK UTAMA (AKTUAL & NON-FIKTIF) -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-primary-light); font-weight: 700;">
          📊 Indikator Kunci Kawasan & Penanaman (Data Aktual)
        </h3>
        <span class="admin-header-pill ${survivalBadge}" style="font-size: 11px;">
          ${indicators.survival_rate_status === 'terverifikasi' ? 'Terverifikasi' : 'Belum Ada Sensus'}
        </span>
      </div>
      <div class="admin-stats-grid" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));">
        <!-- 1. Total Kawasan -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Total Kawasan</span>
            <span class="stat-icon">🏞️</span>
          </div>
          <div class="stat-number text-accent">${indicators.total_zones}</div>
          <div class="stat-footer-text">Lahan terdaftar dalam sistem</div>
        </div>

        <!-- 2. Kawasan Aktif -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Kawasan Aktif</span>
            <span class="stat-icon">✅</span>
          </div>
          <div class="stat-number text-success">${indicators.total_zones}</div>
          <div class="stat-footer-text">Dalam status restorasi aktif</div>
        </div>

        <!-- 3. Total Jenis Pohon -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Total Jenis Pohon</span>
            <span class="stat-icon">🌿</span>
          </div>
          <div class="stat-number">${indicators.total_species}</div>
          <div class="stat-footer-text">Spesies terdata di master database</div>
        </div>

        <!-- 4. Total Kegiatan Penanaman -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Kegiatan Penanaman</span>
            <span class="stat-icon">📋</span>
          </div>
          <div class="stat-number text-accent">${indicators.total_activities}</div>
          <div class="stat-footer-text">Batch kelompok bibit tercatat</div>
        </div>

        <!-- 5. Total Bibit Awal yang Tercatat -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Total Bibit Awal</span>
            <span class="stat-icon">🌱</span>
          </div>
          <div class="stat-number text-success">${indicators.total_initial_seedlings}</div>
          <div class="stat-footer-text">Batang ditanam (rekaman historis)</div>
        </div>

        <!-- 6. Jumlah Kelompok yang Sudah Dipantau -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Kelompok Dipantau</span>
            <span class="stat-icon">🔍</span>
          </div>
          <div class="stat-number text-info">${indicators.monitored_batches_count}</div>
          <div class="stat-footer-text">Memiliki catatan sensus lapangan</div>
        </div>

        <!-- 7. Jumlah Scene Panorama -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Scene Panorama</span>
            <span class="stat-icon">🌐</span>
          </div>
          <div class="stat-number">${totalScenes}</div>
          <div class="stat-footer-text">Titik foto 360° Marzipano</div>
        </div>

        <!-- 8. Jumlah Hotspot Valid & Terdaftar -->
        <div class="admin-stat-card">
          <div class="stat-card-header">
            <span class="stat-title">Hotspot Valid</span>
            <span class="stat-icon">📍</span>
          </div>
          <div class="stat-number text-info">${validRegisteredHotspots}</div>
          <div class="stat-footer-text">${publishedHotspots.length} publik, ${draftHotspots.length} draft</div>
        </div>
      </div>
    </div>

    <!-- E.2. PANEL TAHAPAN PENGELOLAAN KAWASAN (WORKFLOW 5 TAHAPAN) -->
    <div style="margin-bottom: 24px;">
      <div style="margin-bottom: 12px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-primary-light); font-weight: 700;">
          🧭 Alur & Tahapan Pengelolaan Kawasan Penanaman
        </h3>
        <p style="color: var(--clr-text-muted); font-size: 12px; margin-top: 2px;">
          Panduan progres berbasis data aktual. Admin dapat membuka seluruh modul kapan saja secara mandiri.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
        <!-- Tahap 1: Persiapan -->
        <div class="admin-stat-card" style="border-left: 4px solid ${stage1Status === 'Selesai' ? '#10b981' : stage1Status === 'Sedang Berjalan' ? '#38bdf8' : '#f59e0b'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 1</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Persiapan Kawasan & Spesies</h4>
            </div>
            <span class="admin-header-pill ${stage1Badge}" style="font-size: 10px;">${stage1Status}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${stage1Summary}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${stage1Missing}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-zones" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🏞️ Kelola Kawasan
            </button>
            <button id="stage-btn-species" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🌿 Master Spesies
            </button>
          </div>
        </div>

        <!-- Tahap 2: Kegiatan Penanaman -->
        <div class="admin-stat-card" style="border-left: 4px solid ${stage2Status === 'Selesai' ? '#10b981' : stage2Status === 'Sedang Berjalan' ? '#38bdf8' : '#f59e0b'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 2</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Kegiatan Penanaman</h4>
            </div>
            <span class="admin-header-pill ${stage2Badge}" style="font-size: 10px;">${stage2Status}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${stage2Summary}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${stage2Missing}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-activities" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              📋 Pencatatan Penanaman
            </button>
          </div>
        </div>

        <!-- Tahap 3: Pemantauan dan Perawatan -->
        <div class="admin-stat-card" style="border-left: 4px solid ${stage3Status === 'Selesai' ? '#10b981' : stage3Status === 'Sedang Berjalan' ? '#38bdf8' : '#f59e0b'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 3</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Pemantauan & Perawatan</h4>
            </div>
            <span class="admin-header-pill ${stage3Badge}" style="font-size: 10px;">${stage3Status}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${stage3Summary}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${stage3Missing}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-surveys" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🔍 Pemantauan
            </button>
            <button id="stage-btn-maintenance" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🛠️ Perawatan & Sulam
            </button>
          </div>
        </div>

        <!-- Tahap 4: Dokumentasi Digital (Virtual Tour) -->
        <div class="admin-stat-card" style="border-left: 4px solid ${stage4Status === 'Selesai' ? '#10b981' : stage4Status === 'Sedang Berjalan' ? '#38bdf8' : '#f59e0b'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 4</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Dokumentasi Digital 360°</h4>
            </div>
            <span class="admin-header-pill ${stage4Badge}" style="font-size: 10px;">${stage4Status}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${stage4Summary}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${stage4Missing}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-editor" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🎨 Editor Hotspot
            </button>
            <button id="stage-btn-panoramas" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              🌐 Panorama
            </button>
          </div>
        </div>

        <!-- Tahap 5: Evaluasi dan Pelaporan -->
        <div class="admin-stat-card" style="border-left: 4px solid ${stage5Status === 'Selesai' ? '#10b981' : stage5Status === 'Sedang Berjalan' ? '#38bdf8' : '#f59e0b'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--clr-text-muted);">Tahap 5</span>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff; margin-top: 2px;">Evaluasi & Pelaporan</h4>
            </div>
            <span class="admin-header-pill ${stage5Badge}" style="font-size: 10px;">${stage5Status}</span>
          </div>
          <p style="font-size: 12px; color: var(--clr-text-main); margin-bottom: 6px; line-height: 1.4;">
            <strong>Aktivitas:</strong> ${stage5Summary}
          </p>
          <p style="font-size: 11px; color: var(--clr-text-muted); margin-bottom: 12px; line-height: 1.4;">
            <strong>Catatan:</strong> ${stage5Missing}
          </p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="stage-btn-reports" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 4px 10px;">
              📑 Rekapitulasi & Ekspor
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- E.4. AKTIVITAS TERBARU & JEJAK AUDIT SISTEM -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-primary-light); font-weight: 700;">
          🕒 Aktivitas Terbaru (Audit Trail Nyata)
        </h3>
        <button id="dash-btn-view-all-logs" class="btn-secondary-action btn-sm" style="font-size: 11px; padding: 3px 10px;">
          Lihat Seluruh Log ➔
        </button>
      </div>

      <div class="admin-stat-card" style="padding: 16px;">
        ${
          recentLogs.length > 0
            ? `<div class="space-y-3">
                ${recentLogs
                  .map(
                    (log) => `
                  <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 10px; font-size: 12px;">
                    <div>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="pill-info" style="font-size: 10px; text-transform: uppercase;">${log.module || 'SISTEM'}</span>
                        <strong style="color: #fff;">${log.action || 'Aktivitas'}</strong>
                        <span style="color: var(--clr-text-muted);">oleh ${log.user_name || log.user?.name || 'Administrator'}</span>
                      </div>
                      <p style="color: var(--clr-text-dim); margin-top: 3px; font-size: 11px;">
                        ${log.details || log.description || 'Tindakan berhasil diproses sistem.'}
                      </p>
                    </div>
                    <span style="color: var(--clr-text-muted); font-size: 11px; white-space: nowrap; margin-left: 12px;">
                      ${formatTimeAgo(log.created_at)}
                    </span>
                  </div>
                `
                  )
                  .join('')}
              </div>`
            : `<div style="text-align: center; padding: 24px 12px; color: var(--clr-text-muted); font-size: 13px;">
                <p>Belum ada aktivitas yang tercatat</p>
                <p style="font-size: 11px; color: var(--clr-text-dim); margin-top: 4px;">Setiap penambahan kawasan, pencatatan bibit, survei, dan pembaruan hotspot akan otomatis terekam di sini.</p>
              </div>`
        }
      </div>
    </div>

    <!-- Diagnostic & Integrity Health Checks Marzipano -->
    <div class="admin-diagnostics-section" style="margin-bottom: 24px;">
      <h3 class="diagnostics-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
        Pemeriksaan Integritas & Kesehatan Virtual Tour 360° Eco Land
      </h3>

      <div class="diagnostics-list">
        <!-- Check 1: Broken Links -->
        <div class="diagnostic-item ${brokenLinkHotspots.length === 0 ? 'status-ok' : 'status-danger'}">
          <div class="diag-status-indicator"></div>
          <div class="diag-details">
            <div class="diag-header">
              <strong>Hotspot Tujuan Rusak / Tidak Valid:</strong>
              <span class="diag-badge ${brokenLinkHotspots.length === 0 ? 'badge-ok' : 'badge-danger'}">
                ${brokenLinkHotspots.length} Masalah
              </span>
            </div>
            <p class="diag-desc">
              ${
                brokenLinkHotspots.length === 0
                  ? 'Semua hotspot navigasi terhubung ke ID scene yang valid dan tersedia.'
                  : `Ditemukan ${brokenLinkHotspots.length} hotspot navigasi yang mengarah ke scene tidak dikenal!`
              }
            </p>
          </div>
        </div>

        <!-- Check 2: Dead-End Scenes -->
        <div class="diagnostic-item ${scenesWithoutLinks.length === 0 ? 'status-ok' : 'status-warning'}">
          <div class="diag-status-indicator"></div>
          <div class="diag-details">
            <div class="diag-header">
              <strong>Panorama Tanpa Titik Keluar (Dead-End Scenes):</strong>
              <span class="diag-badge ${scenesWithoutLinks.length === 0 ? 'badge-ok' : 'badge-warning'}">
                ${scenesWithoutLinks.length} Scene
              </span>
            </div>
            <p class="diag-desc">
              ${
                scenesWithoutLinks.length === 0
                  ? 'Setiap panorama memiliki setidaknya satu hotspot navigasi untuk melanjutkan tour.'
                  : `Terdapat ${scenesWithoutLinks.length} panorama tanpa hotspot navigasi keluar.`
              }
            </p>
          </div>
        </div>

        <!-- Check 3: Tile Assets Availability -->
        <div class="diagnostic-item ${missingAssetScenes.length === 0 ? 'status-ok' : 'status-danger'}">
          <div class="diag-status-indicator"></div>
          <div class="diag-details">
            <div class="diag-header">
              <strong>Ketersediaan Aset Tile Panorama:</strong>
              <span class="diag-badge ${missingAssetScenes.length === 0 ? 'badge-ok' : 'badge-danger'}">
                ${missingAssetScenes.length === 0 ? 'Semua Tersedia' : `${missingAssetScenes.length} Tertunda`}
              </span>
            </div>
            <p class="diag-desc">
              ${
                missingAssetScenes.length === 0
                  ? 'Semua 6 panorama multiresolution tile Marzipano siap ditampilkan tanpa kendala.'
                  : `${missingAssetScenes.length} panorama belum memiliki foto bola 360° yang diunggah.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach navigation events
  container.querySelector('#dash-btn-open-editor')?.addEventListener('click', () => {
    if (onNavigateToEditor) onNavigateToEditor();
  });
  container.querySelector('#dash-btn-open-panoramas')?.addEventListener('click', () => {
    if (onNavigateToPanorama) onNavigateToPanorama();
  });
  container.querySelector('#dash-btn-open-trees')?.addEventListener('click', () => {
    if (onNavigateToTrees) onNavigateToTrees();
  });

  // Stage button handlers
  container.querySelector('#stage-btn-zones')?.addEventListener('click', () => {
    if (onNavigateToZones) onNavigateToZones();
  });
  container.querySelector('#stage-btn-species')?.addEventListener('click', () => {
    if (onNavigateToSpecies) onNavigateToSpecies();
  });
  container.querySelector('#stage-btn-activities')?.addEventListener('click', () => {
    if (onNavigateToActivities) onNavigateToActivities();
  });
  container.querySelector('#stage-btn-surveys')?.addEventListener('click', () => {
    if (onNavigateToSurveys) onNavigateToSurveys();
  });
  container.querySelector('#stage-btn-maintenance')?.addEventListener('click', () => {
    if (onNavigateToMaintenance) onNavigateToMaintenance();
  });
  container.querySelector('#stage-btn-editor')?.addEventListener('click', () => {
    if (onNavigateToEditor) onNavigateToEditor();
  });
  container.querySelector('#stage-btn-panoramas')?.addEventListener('click', () => {
    if (onNavigateToPanorama) onNavigateToPanorama();
  });
  container.querySelector('#stage-btn-reports')?.addEventListener('click', () => {
    if (onNavigateToReports) onNavigateToReports();
  });
  container.querySelector('#dash-btn-view-all-logs')?.addEventListener('click', () => {
    if (onNavigateToLogs) onNavigateToLogs();
  });
}
