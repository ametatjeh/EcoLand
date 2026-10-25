/**
 * Admin Panel Orchestrator (Manajemen Eco Land)
 * Mengelola seluruh Modul Admin:
 * A. Dashboard (Ringkasan, Statistik Penanaman, Aktivitas Terbaru)
 * B. Manajemen Kawasan (Daftar, Tambah, Detail 8 Tab, Galeri)
 * C. Virtual Tour (Panorama, Editor Hotspot, Pengaturan Scene, Pratinjau)
 * D. Data Penanaman (Master Jenis Pohon, Kegiatan Penanaman, Pemantauan, Perawatan)
 * E. Laporan (Rekapitulasi, Kelangsungan Hidup, Laporan per Kawasan, per Pohon, Ekspor)
 * F. Pengaturan (Identitas Organisasi, Pengguna & Hak Akses, Pengaturan Aplikasi, Cadangan, Log Aktivitas)
 */
import scenesData from '../data/scenes.js';
import { ApiService } from '../services/api.js';
import { initAuth, checkAdminAuth, showLoginModal, onAuthChange } from './auth.js';
import { renderDashboard } from './dashboard.js';
import { renderPanoramaManagement } from './panoramas.js';
import { VisualHotspotEditor } from './editor.js';
import { initBackupModule } from './backup.js';
import { initSettingsModule } from './settings.js';
import { initTreeModule, switchTreeSubTab } from './trees/tree_module.js';
import { initZonesModule, switchZoneSubTab } from './zones.js';
import { initReportsModule, switchReportSubTab } from './reports.js';
import { initUsersModule } from './users.js';
import { initActivityLogsModule } from './activity_logs.js';
import { initSessionTimer, stopSessionTimer, resetSessionTimer } from './session_timer.js';
import { initAlbumsModule, switchAlbumSubView } from './albumManager.js';
import { initTheme } from './theme.js';

// Auto-initialize theme immediately
initTheme();

let activeAdminTab = 'dashboard';
let activeTreeSubTab = null;
let activeTreeTargetId = null;
let activeTreeAction = null;
let activeZoneSubTab = null;
let activeZoneTargetId = null;
let activeZoneAction = null;
let activeReportSubTab = null;
let activeAlbumSubTab = 'list';
let activeAlbumTargetId = null;
let cachedHotspots = [];
let editorInstance = null;
let scenes = [...scenesData];
let currentSelectedZone = 'all';

const MENU_META = {
  dashboard: {
    title: 'Dashboard Ringkasan Virtual Tour & Silvikultur',
    breadcrumb: 'Dashboard / Ringkasan',
  },
  zones: {
    title: 'Manajemen Kawasan / Lahan Penanaman Pohon',
    breadcrumb: 'Manajemen Kawasan',
  },
  panoramas: {
    title: 'Manajemen Panorama 360° Kawasan',
    breadcrumb: 'Virtual Tour / Panorama',
  },
  editor: {
    title: 'Visual Hotspot & Spatial Editor Marzipano',
    breadcrumb: 'Virtual Tour / Editor Hotspot',
  },
  trees: {
    title: 'Sistem Informasi Penanaman & Pemantauan Pohon',
    breadcrumb: 'Data Penanaman',
  },
  reports: {
    title: 'Laporan & Statistik Penanaman Komprehensif',
    breadcrumb: 'Laporan',
  },
  albums: {
    title: 'Manajemen Album Kegiatan Galeri Foto Kawasan',
    breadcrumb: 'Dokumentasi Digital / Album Kegiatan',
  },
  users: {
    title: 'Manajemen Pengguna & Hak Akses',
    breadcrumb: 'Pengaturan / Pengguna',
  },
  settings: {
    title: 'Pengaturan Sistem & Identitas Organisasi',
    breadcrumb: 'Pengaturan / Aplikasi',
  },
  backup: {
    title: 'Cadangan & Pemulihan Basis Data / Konfigurasi',
    breadcrumb: 'Pengaturan / Cadangan',
  },
  'activity-logs': {
    title: 'Log Histori Aktivitas & Jejak Audit Sistem',
    breadcrumb: 'Pengaturan / Log Aktivitas',
  },
};

const TREE_SUBTAB_TITLES = {
  dashboard: 'Statistik & Ringkasan Penanaman',
  species: 'Master Jenis Pohon (Silvikultur)',
  activities: 'Kegiatan Penanaman & Batch Bibit',
  surveys: 'Pemantauan & Sensus Pertumbuhan Tanaman',
  maintenance: 'Perawatan, Pemupukan & Penyulaman',
  reports: 'Laporan Penanaman',
  'import-export': 'Impor & Ekspor Berkas Data Penanaman',
};

const ZONE_SUBTAB_TITLES = {
  list: 'Daftar Kawasan / Lahan Penanaman',
  create: 'Formulir Tambah Kawasan Baru',
  detail: 'Detail Informasi Kawasan (8 Tab)',
  gallery: 'Galeri Dokumentasi Foto Kawasan',
};

const REPORT_SUBTAB_TITLES = {
  rekap: 'Rekapitulasi Penanaman Komprehensif',
  survival: 'Kelangsungan Hidup Tanaman (Survival Rate)',
  'per-kawasan': 'Laporan Agregat per Kawasan',
  'per-pohon': 'Laporan Distribusi per Jenis Pohon',
  ekspor: 'Pusat Ekspor & Unduhan Data',
};

export async function initAdminPanel({ onPublicTourUpdate, onExitAdminToTour }) {
  // 0. Inisialisasi Tema (Dark / Light Mode)
  initTheme();

  // 1. Inisialisasi Auth & sinkronisasi token sesi
  await initAuth();

  // Inisialisasi Session Inactivity Timer jika admin sudah terautentikasi
  if (checkAdminAuth()) {
    initSessionTimer();
  }

  onAuthChange(async (isLoggedIn) => {
    if (isLoggedIn) {
      initSessionTimer();
      const redirectHash = sessionStorage.getItem('admin_redirect_hash');
      sessionStorage.removeItem('admin_redirect_hash');
      await setupTopbarZoneSwitcher();
      updateAdminProfileUI();

      if (redirectHash && redirectHash.startsWith('#admin')) {
        window.location.hash = redirectHash;
        handleAdminHashRoute(redirectHash);
      } else if (window.location.hash.startsWith('#admin')) {
        handleAdminHashRoute(window.location.hash);
      } else {
        window.location.hash = '#admin/dashboard';
        switchAdminSubmenu('dashboard', null, false);
      }
    } else {
      stopSessionTimer();
      if (window.location.hash && window.location.hash.startsWith('#admin')) {
        window.location.hash = 'beranda';
      }
    }
  });

  // 2. Load latest scene metadata from server (names, descriptions, zones, initial views)
  try {
    const [serverScenes, customNames] = await Promise.all([
      ApiService.getScenes(),
      ApiService.getCustomSceneNames().catch(() => ({})),
    ]);
    if (serverScenes && serverScenes.length > 0) {
      serverScenes.forEach((srv) => {
        const local = scenes.find((s) => s.id === srv.id);
        if (local) {
          local.name = customNames[srv.id] || srv.name || local.name;
          local.description = srv.description ?? local.description;
          local.planting_zone_id = srv.planting_zone_id ?? local.planting_zone_id;
          local.status = srv.status ?? local.status;
          if (srv.initialViewParameters) {
            local.initialViewParameters = { ...local.initialViewParameters, ...srv.initialViewParameters };
          }
          if (srv.initialView) {
            local.initialView = { ...local.initialView, ...srv.initialView };
          }
        }
      });
    } else if (customNames) {
      scenes.forEach((s) => {
        if (customNames[s.id]) {
          s.name = customNames[s.id];
        }
      });
    }
  } catch (e) {
    console.warn('Gagal sinkronisasi data scene server:', e);
  }

  // 3. Muat Data Hotspots dari Server
  cachedHotspots = await ApiService.getHotspots();

  // 4. Inisialisasi Visual Hotspot Editor
  editorInstance = new VisualHotspotEditor({
    scenes,
    getHotspots: () => cachedHotspots,
    onHotspotsChanged: (updated) => {
      cachedHotspots = updated;
      updateAdminBadges();
      if (onPublicTourUpdate) onPublicTourUpdate(cachedHotspots);
    },
    onSceneSwitchRequest: (sceneId) => {
      editorInstance.setScene(sceneId);
    },
  });

  editorInstance.init();
  window.__editorInstance = editorInstance;
  if (scenes.length > 0) {
    editorInstance.currentSceneId = scenes[0].id;
  }

  // 5. Inisialisasi Tab Navigation Admin & Layout Toggles
  setupAdminSubmenuTabs(onExitAdminToTour);

  // 6. Inisialisasi Sub-modul Admin
  initBackupModule({
    scenes,
    getHotspots: () => cachedHotspots,
    onRestoreComplete: async () => {
      cachedHotspots = await ApiService.getHotspots();
      editorInstance.renderHotspotsOnCurrentScene();
      editorInstance.renderHotspotsList();
      refreshActiveAdminTab();
      if (onPublicTourUpdate) onPublicTourUpdate(cachedHotspots);
    },
  });

  initSettingsModule({
    scenes,
    onSettingsUpdated: () => {},
  });

  // Setup Topbar Zone Switcher Dropdown, Profile Dropdown & render initial tab HANYA jika sudah terautentikasi
  setupAdminProfileDropdown();
  updateAdminProfileUI();
  if (checkAdminAuth()) {
    await setupTopbarZoneSwitcher();
    if (window.location.hash.startsWith('#admin')) {
      handleAdminHashRoute(window.location.hash);
    } else {
      refreshActiveAdminTab();
    }
  } else if (window.location.hash && window.location.hash.startsWith('#admin')) {
    sessionStorage.setItem('admin_redirect_hash', window.location.hash);
    window.location.href = '/login';
  }
  updateAdminBadges();
}

export function updateAdminProfileUI() {
  const user = ApiService.getUser() || {
    name: 'Administrator',
    username: 'admin',
    email: 'admin@ikhw.org',
    role: 'administrator',
  };

  const displayName = user.name || user.username || 'Administrator';
  const displayEmail = user.email || 'admin@ikhw.org';

  const roleLabels = {
    administrator: 'Administrator',
    admin: 'Admin Sistem',
    superadmin: 'Super Admin',
    petugas_penanaman: 'Petugas Penanaman',
    editor_konten: 'Editor Konten',
  };

  const roleText = roleLabels[user.role] || user.role || 'Petugas Penanaman';
  const isSuperOrAdmin = user.role === 'admin' || user.role === 'superadmin' || user.role === 'administrator';

  // Derive up to 2 uppercase initials from user's full name
  const nameParts = displayName.trim().split(/\s+/).filter(Boolean);
  const initials = nameParts.length >= 2
    ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
    : displayName.substring(0, 2).toUpperCase();

  const avatarEl = document.getElementById('topbar-user-avatar');
  const avatarLgEl = document.getElementById('dropdown-user-avatar-lg');
  const nameEl = document.getElementById('topbar-user-name');
  const fullnameEl = document.getElementById('dropdown-user-fullname');
  const roleEl = document.getElementById('topbar-user-role');
  const roleBadgeEl = document.getElementById('dropdown-user-role-badge');
  const emailEl = document.getElementById('dropdown-user-email');

  const sidebarAvatarEl = document.getElementById('sidebar-user-avatar');
  const sidebarNameEl = document.getElementById('sidebar-user-name');
  const sidebarEmailEl = document.getElementById('sidebar-user-email');

  if (avatarEl) avatarEl.textContent = initials || 'AD';
  if (avatarLgEl) avatarLgEl.textContent = initials || 'AD';
  if (nameEl) nameEl.textContent = displayName;
  if (fullnameEl) fullnameEl.textContent = displayName;
  if (emailEl) emailEl.textContent = displayEmail;
  if (roleEl) {
    roleEl.textContent = roleText;
    if (user.role === 'petugas_penanaman') {
      roleEl.className = 'text-[10px] text-sky-400 font-medium leading-none mt-0.5';
    } else if (user.role === 'editor_konten') {
      roleEl.className = 'text-[10px] text-amber-400 font-medium leading-none mt-0.5';
    } else {
      roleEl.className = 'text-[10px] text-blue-400 font-medium leading-none mt-0.5';
    }
  }

  if (roleBadgeEl) {
    roleBadgeEl.textContent = roleText;
    if (user.role === 'petugas_penanaman') {
      roleBadgeEl.className = 'profile-dropdown-role-badge inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20';
    } else if (user.role === 'editor_konten') {
      roleBadgeEl.className = 'profile-dropdown-role-badge inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20';
    } else {
      roleBadgeEl.className = 'profile-dropdown-role-badge inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20';
    }
  }

  if (sidebarAvatarEl) sidebarAvatarEl.textContent = initials || 'AD';
  if (sidebarNameEl) sidebarNameEl.textContent = displayName;
  if (sidebarEmailEl) sidebarEmailEl.textContent = displayEmail;

  // Sesuaikan visibilitas menu sensitif untuk peran non-administrator
  const isSuper = isSuperOrAdmin;
  document.querySelectorAll('[data-admin-tab="users"], [data-admin-tab="settings"]').forEach((el) => {
    if (!isSuper) {
      el.style.opacity = '0.45';
      el.setAttribute('title', 'Menu ini hanya dapat dikelola oleh Administrator Sistem');
    } else {
      el.style.opacity = '1';
    }
  });
}

export function setupAdminProfileDropdown() {
  const dropdownRoot = document.getElementById('admin-profile-dropdown-root');
  const toggleBtn = document.getElementById('btn-admin-profile-toggle');
  const menuEl = document.getElementById('admin-profile-menu');
  const chevronEl = document.getElementById('topbar-profile-chevron');

  if (!toggleBtn || !menuEl) return;

  const closeDropdown = () => {
    menuEl.classList.add('hidden');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (chevronEl) chevronEl.classList.remove('rotated');
  };

  const openDropdown = () => {
    menuEl.classList.remove('hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (chevronEl) chevronEl.classList.add('rotated');
  };

  if (!toggleBtn.hasAttribute('data-bound')) {
    toggleBtn.setAttribute('data-bound', 'true');
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });
  }

  // Bind quick navigation links
  document.querySelectorAll('.profile-menu-nav-item').forEach((item) => {
    if (!item.hasAttribute('data-bound')) {
      item.setAttribute('data-bound', 'true');
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-target-tab');
        closeDropdown();
        if (targetTab) {
          switchAdminSubmenu(targetTab);
        }
      });
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (dropdownRoot && !dropdownRoot.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuEl.classList.contains('hidden')) {
      closeDropdown();
      toggleBtn.focus();
    }
  });
}

export function updateTopbarZoneSwitcherVisibility(tabName) {
  const switcherContainer = document.getElementById('topbar-zone-switcher-container');
  if (!switcherContainer) return;

  // Contextual visibility: only show on relevant modules (Dashboard, Zones, Trees, Reports)
  const relevantTabs = ['dashboard', 'zones', 'trees', 'reports'];
  if (relevantTabs.includes(tabName)) {
    switcherContainer.classList.remove('hidden');
  } else {
    switcherContainer.classList.add('hidden');
  }
}

export function updateTopbarBreadcrumbsAndTitle(tabName, subTab = null, extraId = null, action = null) {
  const titleEl = document.getElementById('admin-header-title');
  const breadcrumbActiveEl = document.getElementById('admin-breadcrumb-active');
  const categoryWrapperEl = document.getElementById('breadcrumb-category-wrapper');
  const categoryTitleEl = document.getElementById('breadcrumb-category-title');
  const rootBtn = document.getElementById('breadcrumb-btn-root');

  if (rootBtn && !rootBtn.hasAttribute('data-bound')) {
    rootBtn.setAttribute('data-bound', 'true');
    rootBtn.addEventListener('click', () => switchAdminSubmenu('dashboard'));
  }

  let category = null;
  let pageTitle = 'Dashboard Ringkasan Virtual Tour & Silvikultur';
  let activeBreadcrumb = 'Dashboard Ringkasan';

  if (tabName === 'dashboard') {
    category = null;
    pageTitle = 'Dashboard Ringkasan Virtual Tour & Silvikultur';
    activeBreadcrumb = 'Ringkasan';
  } else if (tabName === 'zones') {
    category = '2. Persiapan';
    if (subTab === 'create' || action === 'create') {
      pageTitle = 'Formulir Tambah Kawasan Baru';
      activeBreadcrumb = 'Tambah Kawasan';
    } else if (subTab === 'edit' || action === 'edit') {
      pageTitle = 'Sunting Informasi & Batas Kawasan';
      activeBreadcrumb = 'Edit Kawasan';
    } else if (subTab === 'detail') {
      pageTitle = 'Detail Informasi Kawasan (8 Tab)';
      activeBreadcrumb = 'Detail Kawasan';
    } else if (subTab === 'gallery') {
      pageTitle = 'Galeri Foto Dokumentasi Kawasan';
      activeBreadcrumb = 'Galeri Kawasan';
    } else {
      pageTitle = 'Manajemen Kawasan / Lahan Penanaman Pohon';
      activeBreadcrumb = 'Manajemen Kawasan';
    }
  } else if (tabName === 'trees') {
    if (subTab === 'species') {
      category = '2. Persiapan';
      if (action === 'create' || extraId === 'create') {
        pageTitle = 'Formulir Tambah Jenis Pohon Baru';
        activeBreadcrumb = 'Tambah Spesies';
      } else if (action === 'edit') {
        pageTitle = 'Sunting Data Taksonomi & Silvikultur Pohon';
        activeBreadcrumb = 'Edit Spesies';
      } else {
        pageTitle = 'Master Jenis Pohon (Silvikultur)';
        activeBreadcrumb = 'Master Jenis Pohon';
      }
    } else if (subTab === 'activities') {
      category = '3. Pelaksanaan';
      if (action === 'create' || extraId === 'create') {
        pageTitle = 'Catat Kegiatan Penanaman Baru';
        activeBreadcrumb = 'Catat Penanaman';
      } else if (action === 'edit') {
        pageTitle = 'Sunting Catatan Batch & Penanaman';
        activeBreadcrumb = 'Edit Penanaman';
      } else {
        pageTitle = 'Kegiatan Penanaman & Batch Bibit';
        activeBreadcrumb = 'Kegiatan Penanaman';
      }
    } else if (subTab === 'surveys') {
      category = '4. Pemantauan & Perawatan';
      if (action === 'create' || extraId === 'create') {
        pageTitle = 'Catat Hasil Sensus Pemantauan Tanaman';
        activeBreadcrumb = 'Catat Pemantauan';
      } else if (action === 'edit') {
        pageTitle = 'Sunting Data Sensus Pemantauan Tanaman';
        activeBreadcrumb = 'Edit Pemantauan';
      } else {
        pageTitle = 'Pemantauan Pertumbuhan & Sensus Pohon';
        activeBreadcrumb = 'Pemantauan Tanaman';
      }
    } else if (subTab === 'maintenance') {
      category = '4. Pemantauan & Perawatan';
      if (action === 'create' || extraId === 'create') {
        pageTitle = 'Catat Tindakan Perawatan / Penyulaman';
        activeBreadcrumb = 'Catat Perawatan';
      } else if (action === 'edit') {
        pageTitle = 'Sunting Catatan Tindakan Perawatan';
        activeBreadcrumb = 'Edit Perawatan';
      } else {
        pageTitle = 'Perawatan, Pemupukan & Penyulaman';
        activeBreadcrumb = 'Perawatan & Penyulaman';
      }
    } else {
      category = '1. Dashboard';
      pageTitle = 'Statistik & Ringkasan Penanaman';
      activeBreadcrumb = 'Statistik Penanaman';
    }
  } else if (tabName === 'panoramas') {
    category = '5. Dokumentasi Digital';
    pageTitle = 'Manajemen Panorama 360° Kawasan';
    activeBreadcrumb = 'Manajemen Panorama';
  } else if (tabName === 'editor') {
    category = '5. Dokumentasi Digital';
    pageTitle = 'Visual Hotspot & Spatial Editor Marzipano';
    activeBreadcrumb = 'Editor Hotspot';
  } else if (tabName === 'albums') {
    category = '5. Dokumentasi Digital';
    if (subTab === 'create') {
      pageTitle = 'Formulir Tambah Album Kegiatan Baru';
      activeBreadcrumb = 'Tambah Album';
    } else if (subTab === 'edit') {
      pageTitle = 'Sunting Informasi & Koleksi Album';
      activeBreadcrumb = 'Edit Album';
    } else if (subTab === 'manage-photos') {
      pageTitle = 'Pengelolaan Foto & Urutan Album';
      activeBreadcrumb = 'Kelola Foto';
    } else {
      pageTitle = 'Manajemen Album Kegiatan Galeri Kawasan';
      activeBreadcrumb = 'Album Kegiatan';
    }
  } else if (tabName === 'reports') {
    category = '6. Evaluasi & Pelaporan';
    if (subTab === 'per-kawasan') {
      pageTitle = 'Laporan Agregat per Kawasan';
      activeBreadcrumb = 'Rekapitulasi Kawasan';
    } else if (subTab === 'per-pohon') {
      pageTitle = 'Laporan Distribusi per Jenis Pohon';
      activeBreadcrumb = 'Rekapitulasi Pohon';
    } else if (subTab === 'ekspor') {
      pageTitle = 'Pusat Ekspor & Unduhan Data';
      activeBreadcrumb = 'Ekspor Data';
    } else {
      pageTitle = 'Laporan & Statistik Penanaman Komprehensif';
      activeBreadcrumb = 'Laporan & Statistik';
    }
  } else if (tabName === 'settings') {
    category = '7. Pengelolaan Sistem';
    pageTitle = 'Pengaturan Sistem & Identitas Organisasi';
    activeBreadcrumb = 'Pengaturan & Identitas';
  } else if (tabName === 'users') {
    category = '7. Pengelolaan Sistem';
    pageTitle = 'Manajemen Pengguna & Hak Akses';
    activeBreadcrumb = 'Kelola Pengguna';
  } else if (tabName === 'activity-logs') {
    category = '7. Pengelolaan Sistem';
    pageTitle = 'Log Histori Aktivitas & Jejak Audit';
    activeBreadcrumb = 'Log Aktivitas';
  } else if (tabName === 'backup') {
    category = '7. Pengelolaan Sistem';
    pageTitle = 'Cadangan & Pemulihan Basis Data';
    activeBreadcrumb = 'Cadangan Data';
  }

  if (titleEl) titleEl.textContent = pageTitle;
  if (breadcrumbActiveEl) breadcrumbActiveEl.textContent = activeBreadcrumb;

  if (categoryWrapperEl && categoryTitleEl) {
    if (category) {
      categoryTitleEl.textContent = category;
      categoryWrapperEl.classList.remove('hidden');
    } else {
      categoryWrapperEl.classList.add('hidden');
    }
  }
}

async function setupTopbarZoneSwitcher() {
  if (!checkAdminAuth()) return;
  const select = document.getElementById('topbar-zone-switcher');
  if (!select) return;

  try {
    const res = await ApiService.getZones({ sort_by: 'name', sort_dir: 'asc' });
    const zones = res.zones || [];
    select.innerHTML = '<option value="all" class="bg-slate-900 text-white">Semua Kawasan (Agregat)</option>';
    zones.forEach((z) => {
      const opt = document.createElement('option');
      opt.value = z.id;
      opt.className = 'bg-slate-900 text-white';
      opt.textContent = `${z.name} ${z.zone_code ? `(${z.zone_code})` : ''}`;
      select.appendChild(opt);
    });

    if (currentSelectedZone) {
      select.value = currentSelectedZone;
    }

    if (!select.hasAttribute('data-bound')) {
      select.setAttribute('data-bound', 'true');
      select.addEventListener('change', () => {
        currentSelectedZone = select.value;
        refreshActiveAdminTab();
      });
    }
  } catch (e) {
    console.warn('Gagal memuat switcher kawasan:', e);
  }
}

export function getRouteFromTab(tabName, subTab = null, extraId = null, action = null) {
  if (tabName === 'dashboard') return '#admin/dashboard';
  if (tabName === 'zones') {
    if (subTab === 'create' || action === 'create') return '#admin/zones/create';
    if ((subTab === 'edit' || action === 'edit') && extraId) return `#admin/zones/${extraId}/edit`;
    if (subTab === 'detail' && extraId) return `#admin/zones/${extraId}/detail`;
    if (subTab === 'gallery') return '#admin/zones/gallery';
    return '#admin/zones';
  }
  if (tabName === 'trees') {
    if (subTab && subTab !== 'dashboard') {
      if (action === 'create' || extraId === 'create') {
        return `#admin/trees/${subTab}/create`;
      }
      if ((action === 'edit' || action === 'detail') && extraId) {
        return `#admin/trees/${subTab}/${extraId}/edit`;
      }
      return `#admin/trees/${subTab}`;
    }
    return '#admin/trees/dashboard';
  }
  if (tabName === 'panoramas') return '#admin/panoramas';
  if (tabName === 'editor') return '#admin/editor';
  if (tabName === 'albums') {
    if (subTab === 'create') return '#admin/albums/create';
    if (subTab === 'edit' && extraId) return `#admin/albums/${extraId}/edit`;
    if (subTab === 'manage-photos' && extraId) return `#admin/albums/${extraId}/photos`;
    return '#admin/albums';
  }
  if (tabName === 'settings') return '#admin/settings';
  if (tabName === 'reports') return subTab && subTab !== 'rekap' ? `#admin/reports/${subTab}` : '#admin/reports';
  if (tabName === 'users') return '#admin/users';
  if (tabName === 'activity-logs') return '#admin/activity-logs';
  if (tabName === 'backup') return '#admin/backup';
  return '#admin/dashboard';
}

export function parseAdminRoute(hashStr) {
  if (!hashStr) return { tab: 'dashboard', subTab: null, extraId: null, action: null };
  const clean = hashStr.replace(/^[#/]+/, '');
  const parts = clean.split('/').filter(Boolean);
  if (parts[0] !== 'admin') return null;
  const rawTab = parts[1] || 'dashboard';
  const rawSubTab = parts[2] || null;
  const rawSubSub = parts[3] || null;
  const rawSubSubSub = parts[4] || null;

  // 1. Kawasan / Planting Zones
  if (rawTab === 'kawasan' || rawTab === 'zones') {
    if (rawSubTab === 'create') {
      return { tab: 'zones', subTab: 'create', extraId: null, action: 'create' };
    }
    if (rawSubTab === 'gallery') {
      return { tab: 'zones', subTab: 'gallery', extraId: null, action: null };
    }
    // Pattern: #admin/zones/:id/edit
    if (rawSubTab && rawSubSub === 'edit') {
      return { tab: 'zones', subTab: 'edit', extraId: rawSubTab, action: 'edit' };
    }
    // Pattern: #admin/zones/edit/:id
    if (rawSubTab === 'edit' && rawSubSub) {
      return { tab: 'zones', subTab: 'edit', extraId: rawSubSub, action: 'edit' };
    }
    // Pattern: #admin/zones/:id/detail
    if (rawSubTab && rawSubSub === 'detail') {
      return { tab: 'zones', subTab: 'detail', extraId: rawSubTab, action: 'detail' };
    }
    // Pattern: #admin/zones/detail/:id
    if (rawSubTab === 'detail' && rawSubSub) {
      return { tab: 'zones', subTab: 'detail', extraId: rawSubSub, action: 'detail' };
    }
    // Pattern: #admin/zones/:id (default to detail if not 'list')
    if (rawSubTab && rawSubTab !== 'list') {
      return { tab: 'zones', subTab: 'detail', extraId: rawSubTab, action: 'detail' };
    }
    return { tab: 'zones', subTab: 'list', extraId: null, action: null };
  }

  // 2. Direct Shortcuts for Trees Submodules
  const treeDirectMap = {
    'species': 'species',
    'tree-species': 'species',
    'activities': 'activities',
    'surveys': 'surveys',
    'maintenance': 'maintenance',
  };
  if (treeDirectMap[rawTab]) {
    const sub = treeDirectMap[rawTab];
    if (rawSubTab === 'create') {
      return { tab: 'trees', subTab: sub, extraId: null, action: 'create' };
    }
    if (rawSubTab && rawSubSub === 'edit') {
      return { tab: 'trees', subTab: sub, extraId: rawSubTab, action: 'edit' };
    }
    if (rawSubTab === 'edit' && rawSubSub) {
      return { tab: 'trees', subTab: sub, extraId: rawSubSub, action: 'edit' };
    }
    if (rawSubTab && rawSubTab !== 'list') {
      return { tab: 'trees', subTab: sub, extraId: rawSubTab, action: 'edit' };
    }
    return { tab: 'trees', subTab: sub, extraId: null, action: null };
  }

  // 3. Tree Module Standard Routes: #admin/trees/...
  if (rawTab === 'trees') {
    const sub = rawSubTab === 'tree-species' ? 'species' : (rawSubTab || 'dashboard');
    if (['species', 'activities', 'surveys', 'maintenance'].includes(sub)) {
      if (rawSubSub === 'create') {
        return { tab: 'trees', subTab: sub, extraId: null, action: 'create' };
      }
      if (rawSubSub && rawSubSubSub === 'edit') {
        return { tab: 'trees', subTab: sub, extraId: rawSubSub, action: 'edit' };
      }
      if (rawSubSub === 'edit' && rawSubSubSub) {
        return { tab: 'trees', subTab: sub, extraId: rawSubSubSub, action: 'edit' };
      }
      if (rawSubSub && rawSubSub !== 'list') {
        return { tab: 'trees', subTab: sub, extraId: rawSubSub, action: 'edit' };
      }
    }
    return { tab: 'trees', subTab: sub, extraId: null, action: null };
  }

  if (rawTab === 'logs' || rawTab === 'activity-logs') {
    return { tab: 'activity-logs', subTab: null, extraId: null, action: null };
  }

  // 4. Album Module Routes
  if (rawTab === 'albums' || rawTab === 'album') {
    if (rawSubTab === 'create') {
      return { tab: 'albums', subTab: 'create', extraId: null, action: 'create' };
    }
    // Pattern: #admin/albums/:id/edit
    if (rawSubTab && rawSubSub === 'edit') {
      return { tab: 'albums', subTab: 'edit', extraId: rawSubTab, action: 'edit' };
    }
    // Pattern: #admin/albums/:id/photos
    if (rawSubTab && (rawSubSub === 'photos' || rawSubSub === 'manage-photos')) {
      return { tab: 'albums', subTab: 'manage-photos', extraId: rawSubTab, action: 'manage-photos' };
    }
    // Pattern: #admin/albums/:id (default to edit jika format :id)
    if (rawSubTab && rawSubTab !== 'list') {
      return { tab: 'albums', subTab: 'edit', extraId: rawSubTab, action: 'edit' };
    }
    return { tab: 'albums', subTab: 'list', extraId: null, action: null };
  }

  if (rawTab === 'reports') {
    return { tab: 'reports', subTab: rawSubTab || 'rekap', extraId: null, action: null };
  }

  return { tab: rawTab, subTab: rawSubTab, extraId: rawSubSub, action: null };
}

export function handleAdminHashRoute(hashStr) {
  const parsed = parseAdminRoute(hashStr);
  if (parsed) {
    if (!checkAdminAuth()) {
      sessionStorage.setItem('admin_redirect_hash', hashStr);
      window.location.href = '/login';
      return;
    }
    switchAdminSubmenu(parsed.tab, parsed.subTab, false, parsed.extraId, parsed.action);
  }
}

export function openAdminView(defaultSubmenu = 'dashboard', defaultSubTab = null) {
  if (!checkAdminAuth()) {
    sessionStorage.setItem('admin_redirect_hash', getRouteFromTab(defaultSubmenu, defaultSubTab));
    window.location.href = '/login';
    return;
  }

  const targetHash = getRouteFromTab(defaultSubmenu, defaultSubTab);
  window.location.hash = targetHash;
  switchAdminSubmenu(defaultSubmenu, defaultSubTab, false);
}

function closeMobileSidebarDrawer() {
  const adminSidebar = document.getElementById('admin-sidebar');
  const adminBackdrop = document.getElementById('admin-sidebar-backdrop');
  if (adminSidebar) adminSidebar.classList.add('-translate-x-full');
  if (adminBackdrop) adminBackdrop.classList.add('hidden');
}

function openMobileSidebarDrawer() {
  const adminSidebar = document.getElementById('admin-sidebar');
  const adminBackdrop = document.getElementById('admin-sidebar-backdrop');
  if (adminSidebar) adminSidebar.classList.remove('-translate-x-full');
  if (adminBackdrop) adminBackdrop.classList.remove('hidden');
}

export function initSidebarCollapse() {
  const adminSidebar = document.getElementById('admin-sidebar');
  const mainWrapper = document.getElementById('admin-main-wrapper');
  const btnToggleTop = document.getElementById('btn-toggle-sidebar-collapse');
  const btnToggleHeader = document.getElementById('btn-sidebar-collapse-toggle');

  const updateButtonsAria = (collapsed) => {
    if (btnToggleTop) btnToggleTop.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    if (btnToggleHeader) btnToggleHeader.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  };

  const setCollapsedState = (collapsed, save = true) => {
    if (!adminSidebar || !mainWrapper) return;
    adminSidebar.classList.toggle('sidebar-collapsed', collapsed);
    mainWrapper.classList.toggle('sidebar-collapsed', collapsed);
    updateButtonsAria(collapsed);
    if (save) {
      try {
        localStorage.setItem('admin_sidebar_collapsed', collapsed ? 'true' : 'false');
      } catch (e) {}
    }
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 260);
  };

  const toggleCollapse = () => {
    const isNowCollapsed = !adminSidebar?.classList.contains('sidebar-collapsed');
    setCollapsedState(isNowCollapsed, true);
  };

  // Restore state from localStorage if desktop
  try {
    const savedState = localStorage.getItem('admin_sidebar_collapsed');
    if (savedState === 'true' && window.innerWidth >= 1024) {
      setCollapsedState(true, false);
    } else {
      updateButtonsAria(false);
    }
  } catch (e) {
    updateButtonsAria(false);
  }

  if (btnToggleTop && !btnToggleTop.hasAttribute('data-bound')) {
    btnToggleTop.setAttribute('data-bound', 'true');
    btnToggleTop.addEventListener('click', toggleCollapse);
  }

  if (btnToggleHeader && !btnToggleHeader.hasAttribute('data-bound')) {
    btnToggleHeader.setAttribute('data-bound', 'true');
    btnToggleHeader.addEventListener('click', toggleCollapse);
  }
}

function setupAdminSubmenuTabs(onExitAdminToTour) {
  // Inisialisasi fitur minimize / collapse
  initSidebarCollapse();

  // Tombol navigasi sidebar
  document.querySelectorAll('.admin-nav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetSubmenu = btn.getAttribute('data-admin-tab');
      const treeSubTab = btn.getAttribute('data-tree-subtab');
      const zoneSubTab = btn.getAttribute('data-zone-subtab');
      const reportSubTab = btn.getAttribute('data-report-subtab');

      closeMobileSidebarDrawer();

      if (targetSubmenu) {
        if (targetSubmenu === 'zones') {
          switchAdminSubmenu('zones', zoneSubTab || 'list');
        } else if (targetSubmenu === 'reports') {
          switchAdminSubmenu('reports', reportSubTab || 'rekap');
        } else if (targetSubmenu === 'trees') {
          switchAdminSubmenu('trees', treeSubTab || 'dashboard');
        } else {
          switchAdminSubmenu(targetSubmenu);
        }
      }
    });
  });


  // Tombol Tampilan Publik di Topbar - Membuka tampilan publik di tab baru
  const btnPublicPreview = document.getElementById('btn-admin-view-public');
  if (btnPublicPreview) {
    btnPublicPreview.addEventListener('click', (e) => {
      closeMobileSidebarDrawer();
      if (btnPublicPreview.tagName.toLowerCase() !== 'a') {
        e.preventDefault();
        window.open(window.location.origin + '/#beranda', '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Mobile sidebar drawer open/close
  const btnMobileSidebar = document.getElementById('btn-admin-mobile-sidebar');
  const btnCloseMobileSidebar = document.getElementById('btn-close-admin-sidebar-mobile');
  const adminBackdrop = document.getElementById('admin-sidebar-backdrop');

  if (btnMobileSidebar) btnMobileSidebar.addEventListener('click', openMobileSidebarDrawer);
  if (btnCloseMobileSidebar) btnCloseMobileSidebar.addEventListener('click', closeMobileSidebarDrawer);
  if (adminBackdrop) adminBackdrop.addEventListener('click', closeMobileSidebarDrawer);
}

export function switchAdminSubmenu(tabName, subTab = null, updateHash = true, extraId = null, action = null) {
  activeAdminTab = tabName;
  resetSessionTimer();

  if (tabName === 'trees') {
    activeTreeSubTab = subTab;
    activeTreeTargetId = extraId;
    activeTreeAction = action;
  } else if (tabName === 'zones') {
    activeZoneSubTab = subTab;
    activeZoneTargetId = extraId;
    activeZoneAction = action;
  } else if (tabName === 'reports') {
    activeReportSubTab = subTab;
  } else if (tabName === 'albums') {
    activeAlbumSubTab = subTab || 'list';
    activeAlbumTargetId = extraId || null;
  }

  // Sinkronisasi URL Hash jika diminta
  if (updateHash) {
    const targetHash = getRouteFromTab(tabName, subTab, extraId, action);
    if (window.location.hash !== targetHash) {
      if (window.location.hash.startsWith('#admin') || window.location.hash === '') {
        window.location.hash = targetHash;
      }
    }
  }

  // Update button active state
  document.querySelectorAll('.admin-nav-btn').forEach((btn) => {
    const btnTab = btn.getAttribute('data-admin-tab');
    const btnTree = btn.getAttribute('data-tree-subtab');
    const btnZone = btn.getAttribute('data-zone-subtab');
    const btnReport = btn.getAttribute('data-report-subtab');

    let isActive = false;
    if (tabName === 'trees') {
      isActive = (btnTab === 'trees' && (btnTree === activeTreeSubTab || (!activeTreeSubTab && btnTree === 'dashboard')));
    } else if (tabName === 'zones') {
      isActive = (btnTab === 'zones' && (btnZone === activeZoneSubTab || (!activeZoneSubTab && btnZone === 'list') || (['create', 'edit', 'detail'].includes(activeZoneSubTab) && btnZone === 'list')));
    } else if (tabName === 'reports') {
      isActive = (btnTab === 'reports' && (btnReport === activeReportSubTab || (!activeReportSubTab && btnReport === 'rekap')));
    } else {
      isActive = (btnTab === tabName);
    }

    btn.classList.toggle('active', isActive);
  });

  // Update subpanes
  document.querySelectorAll('.admin-subpane').forEach((pane) => {
    pane.classList.toggle('active', pane.id === `admin-pane-${tabName}`);
  });

  // Update topbar breadcrumb, title & contextual zone switcher
  updateTopbarBreadcrumbsAndTitle(tabName, subTab, extraId, action);
  updateTopbarZoneSwitcherVisibility(tabName);

  refreshActiveAdminTab();

  // Reset scroll to top when changing admin tabs
  window.scrollTo(0, 0);

  // If opening editor, resize Marzipano canvas and refresh hotspot lists
  if (tabName === 'editor' && editorInstance) {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      editorInstance.refreshViewerSize();
      const targetScene = editorInstance.currentSceneId || (scenes.length > 0 ? scenes[0].id : null);
      if (targetScene) {
        editorInstance.setScene(targetScene);
      }
    }, 100);
  }
}

function refreshActiveAdminTab() {
  updateAdminBadges();
  if (!checkAdminAuth()) return;

  if (activeAdminTab === 'dashboard') {
    renderDashboard({
      scenes,
      hotspots: cachedHotspots,
      selectedZoneId: currentSelectedZone,
      onNavigateToPanorama: () => switchAdminSubmenu('panoramas'),
      onNavigateToEditor: () => switchAdminSubmenu('editor'),
      onNavigateToTrees: () => switchAdminSubmenu('trees', 'dashboard'),
      onNavigateToZones: () => switchAdminSubmenu('zones', 'list'),
      onNavigateToSpecies: () => switchAdminSubmenu('trees', 'species'),
      onNavigateToActivities: () => switchAdminSubmenu('trees', 'activities'),
      onNavigateToSurveys: () => switchAdminSubmenu('trees', 'surveys'),
      onNavigateToMaintenance: () => switchAdminSubmenu('trees', 'maintenance'),
      onNavigateToReports: () => switchAdminSubmenu('reports', 'rekap'),
      onNavigateToLogs: () => switchAdminSubmenu('activity-logs'),
    });
  } else if (activeAdminTab === 'zones') {
    switchZoneSubTab(activeZoneSubTab || 'list', activeZoneTargetId, false);
  } else if (activeAdminTab === 'panoramas') {
    renderPanoramaManagement({
      scenes,
      hotspots: cachedHotspots,
      onOpenEditorForScene: (sceneId) => {
        if (editorInstance) {
          editorInstance.currentSceneId = sceneId;
        }
        switchAdminSubmenu('editor');
        setTimeout(() => {
          if (editorInstance) {
            editorInstance.setScene(sceneId);
          }
        }, 120);
      },
      onPreviewScene: (sceneId) => {
        window.location.hash = 'tour';
        const event = new CustomEvent('preview-scene', { detail: { sceneId } });
        window.dispatchEvent(event);
      },
      onScenesUpdated: () => {
        refreshActiveAdminTab();
      },
    });
  } else if (activeAdminTab === 'trees') {
    switchTreeSubTab(activeTreeSubTab || 'dashboard', scenes, activeTreeTargetId, activeTreeAction, false);
  } else if (activeAdminTab === 'reports') {
    if (activeReportSubTab) {
      switchReportSubTab(activeReportSubTab);
    } else {
      initReportsModule();
    }
  } else if (activeAdminTab === 'settings') {
    initSettingsModule({ scenes, onSettingsUpdated: () => {} });
  } else if (activeAdminTab === 'backup') {
    initBackupModule({
      scenes,
      getHotspots: () => cachedHotspots,
      onRestoreComplete: async () => {
        cachedHotspots = await ApiService.getHotspots();
        refreshActiveAdminTab();
      },
    });
  } else if (activeAdminTab === 'users') {
    initUsersModule();
  } else if (activeAdminTab === 'activity-logs') {
    initActivityLogsModule();
  } else if (activeAdminTab === 'editor') {
    if (editorInstance) {
      editorInstance.renderHotspotsList();
      editorInstance.renderHotspotsOnCurrentScene();
    }
  } else if (activeAdminTab === 'albums') {
    const albumsRoot = document.getElementById('admin-albums-root');
    if (albumsRoot) {
      switchAlbumSubView(activeAlbumSubTab || 'list', activeAlbumTargetId, false);
    } else {
      initAlbumsModule('admin-albums-content', activeAlbumSubTab, activeAlbumTargetId);
    }
  }
}

function updateAdminBadges() {
  const drafts = cachedHotspots.filter((h) => h.status === 'draft').length;
  const draftBadge = document.getElementById('admin-draft-count-badge');
  if (draftBadge) {
    draftBadge.textContent = drafts > 0 ? `${drafts} Draft` : 'Sinkron';
    draftBadge.className = `px-2.5 py-1 rounded-full text-xs font-semibold ${
      drafts > 0
        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
    }`;
  }
}

export function getLoadedHotspots() {
  return cachedHotspots;
}
