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
    <div class="admin-dashboard-hero bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="admin-hero-content">
        <div class="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-1">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/></svg>
          <span>Sistem Informasi Terpadu</span>
        </div>
        <h2 class="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Ringkasan Sistem Informasi Eco Land & Restorasi Kawasan</h2>
        <p class="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Pantau status kelengkapan 6 panorama Marzipano, integritas hotspot interaktif, dan statistik penanaman bibit pohon kawasan ±2 hektare secara aktual.
        </p>
      </div>
      <div class="admin-hero-actions flex items-center gap-2.5 flex-wrap shrink-0">
        <button id="dash-btn-open-editor" class="btn-primary-action btn-sm inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <span>Editor Hotspot</span>
        </button>
        <button id="dash-btn-open-panoramas" class="btn-secondary-action btn-sm inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer">
          <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          <span>Panorama (${totalScenes})</span>
        </button>
        <button id="dash-btn-open-trees" class="btn-secondary-action btn-sm inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium cursor-pointer">
          <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/><path d="M12 8c-1.5 0-3 1.5-3 3"/></svg>
          <span>Data Penanaman</span>
        </button>
      </div>
    </div>

    <!-- E.1. DELAPAN KARTU STATISTIK UTAMA (AKTUAL & NON-FIKTIF) -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">
            Indikator Kunci Kawasan & Penanaman (Data Aktual)
          </h3>
        </div>
        <span class="admin-header-pill ${survivalBadge} text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
          ${indicators.survival_rate_status === 'terverifikasi' ? 'Terverifikasi' : 'Belum Ada Sensus'}
        </span>
      </div>
      <div class="admin-stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- 1. Total Kawasan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Total Kawasan</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-slate-900 leading-tight">${indicators.total_zones}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Lahan terdaftar dalam sistem</div>
        </div>

        <!-- 2. Kawasan Aktif -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Kawasan Aktif</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-blue-600 leading-tight">${indicators.total_zones}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Dalam status restorasi aktif</div>
        </div>

        <!-- 3. Total Jenis Pohon -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Total Jenis Pohon</span>
            <div class="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/><path d="M12 8c-1.5 0-3 1.5-3 3"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-slate-900 leading-tight">${indicators.total_species}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Spesies terdata di master database</div>
        </div>

        <!-- 4. Total Kegiatan Penanaman -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Kegiatan Penanaman</span>
            <div class="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-sky-700 leading-tight">${indicators.total_activities}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Batch kelompok bibit tercatat</div>
        </div>

        <!-- 5. Total Bibit Awal yang Tercatat -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Total Bibit Awal</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-blue-600 leading-tight">${indicators.total_initial_seedlings?.toLocaleString('id-ID') || 0}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Batang ditanam (rekaman historis)</div>
        </div>

        <!-- 6. Jumlah Kelompok yang Sudah Dipantau -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Kelompok Dipantau</span>
            <div class="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-indigo-700 leading-tight">${indicators.monitored_batches_count}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Memiliki catatan sensus lapangan</div>
        </div>

        <!-- 7. Jumlah Scene Panorama -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Scene Panorama</span>
            <div class="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-slate-900 leading-tight">${totalScenes}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">Titik foto 360° Marzipano</div>
        </div>

        <!-- 8. Jumlah Hotspot Valid & Terdaftar -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between">
          <div class="stat-card-header flex items-center justify-between mb-3">
            <span class="stat-title text-xs font-semibold uppercase tracking-wider text-slate-500">Hotspot Valid</span>
            <div class="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
          </div>
          <div class="stat-number text-2xl font-bold text-blue-600 leading-tight">${validRegisteredHotspots}</div>
          <div class="stat-footer-text text-xs text-slate-500 mt-2">${publishedHotspots.length} publik, ${draftHotspots.length} draft</div>
        </div>
      </div>
    </div>

    <!-- E.2. PANEL TAHAPAN PENGELOLAAN KAWASAN (WORKFLOW 5 TAHAPAN) -->
    <div class="mb-8">
      <div class="mb-4">
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700">
            Alur & Tahapan Pengelolaan Kawasan Penanaman
          </h3>
        </div>
        <p class="text-slate-500 text-xs mt-1">
          Panduan progres berbasis data aktual. Admin dapat membuka seluruh modul kapan saja secara mandiri.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <!-- Tahap 1: Persiapan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${stage1Status === 'Selesai' ? '#059669' : stage1Status === 'Sedang Berjalan' ? '#0284c7' : '#d97706'};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 1</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Persiapan Kawasan & Spesies</h4>
              </div>
              <span class="admin-header-pill ${stage1Badge} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${stage1Status}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${stage1Summary}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${stage1Missing}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-zones" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/></svg>
              <span>Kelola Kawasan</span>
            </button>
            <button id="stage-btn-species" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-7"/><path d="M12 15c-3.3 0-6-2.7-6-6 0-4 6-7 6-7s6 3 6 7c0 3.3-2.7 6-6 6z"/></svg>
              <span>Master Spesies</span>
            </button>
          </div>
        </div>

        <!-- Tahap 2: Kegiatan Penanaman -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${stage2Status === 'Selesai' ? '#059669' : stage2Status === 'Sedang Berjalan' ? '#0284c7' : '#d97706'};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 2</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Kegiatan Penanaman</h4>
              </div>
              <span class="admin-header-pill ${stage2Badge} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${stage2Status}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${stage2Summary}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${stage2Missing}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-activities" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
              <span>Pencatatan Penanaman</span>
            </button>
          </div>
        </div>

        <!-- Tahap 3: Pemantauan dan Perawatan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${stage3Status === 'Selesai' ? '#059669' : stage3Status === 'Sedang Berjalan' ? '#0284c7' : '#d97706'};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 3</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Pemantauan & Perawatan</h4>
              </div>
              <span class="admin-header-pill ${stage3Badge} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${stage3Status}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${stage3Summary}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${stage3Missing}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-surveys" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Pemantauan</span>
            </button>
            <button id="stage-btn-maintenance" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              <span>Perawatan & Sulam</span>
            </button>
          </div>
        </div>

        <!-- Tahap 4: Dokumentasi Digital (Virtual Tour) -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${stage4Status === 'Selesai' ? '#059669' : stage4Status === 'Sedang Berjalan' ? '#0284c7' : '#d97706'};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 4</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Dokumentasi Digital 360°</h4>
              </div>
              <span class="admin-header-pill ${stage4Badge} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${stage4Status}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${stage4Summary}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${stage4Missing}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-editor" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <span>Editor Hotspot</span>
            </button>
            <button id="stage-btn-panoramas" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <span>Panorama</span>
            </button>
          </div>
        </div>

        <!-- Tahap 5: Evaluasi dan Pelaporan -->
        <div class="admin-stat-card bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" style="border-left: 4px solid ${stage5Status === 'Selesai' ? '#059669' : stage5Status === 'Sedang Berjalan' ? '#0284c7' : '#d97706'};">
          <div>
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tahap 5</span>
                <h4 class="text-xs font-bold text-slate-900 mt-0.5">Evaluasi & Pelaporan</h4>
              </div>
              <span class="admin-header-pill ${stage5Badge} text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">${stage5Status}</span>
            </div>
            <p class="text-xs text-slate-700 mb-2 leading-relaxed">
              <strong class="font-semibold text-slate-900">Aktivitas:</strong> ${stage5Summary}
            </p>
            <p class="text-[11px] text-slate-500 mb-4 leading-relaxed">
              <strong class="font-medium text-slate-600">Catatan:</strong> ${stage5Missing}
            </p>
          </div>
          <div class="flex gap-2 flex-wrap pt-2 border-t border-slate-100">
            <button id="stage-btn-reports" class="btn-secondary-action btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium cursor-pointer">
              <svg class="w-3.5 h-3.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              <span>Rekapitulasi & Ekspor</span>
            </button>
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
}
