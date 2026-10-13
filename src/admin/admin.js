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

let activeAdminTab = 'dashboard';
let activeTreeSubTab = null;
let activeZoneSubTab = null;
let activeReportSubTab = null;
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
  // 1. Inisialisasi Auth
  initAuth();

  onAuthChange(async (isLoggedIn) => {
    if (isLoggedIn) {
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
      window.location.hash = 'beranda';
    }
  });

  // 2. Load custom scene names jika ada
  try {
    const customNames = await ApiService.getCustomSceneNames();
    scenes.forEach((s) => {
      if (customNames[s.id]) {
        s.name = customNames[s.id];
      }
    });
  } catch (e) {}

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
  if (scenes.length > 0) {
    editorInstance.setScene(scenes[0].id);
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
  if (ApiService.isAuthenticated()) {
    await setupTopbarZoneSwitcher();
    if (window.location.hash.startsWith('#admin')) {
      handleAdminHashRoute(window.location.hash);
    } else {
      refreshActiveAdminTab();
    }
  }
  updateAdminBadges();
}

export function updateAdminProfileUI() {
  const user = ApiService.getUser() || {
    name: 'Administrator',
    username: 'admin',
    email: 'admin@ikhw.org',
    role: 'admin',
  };

  const displayName = user.name || user.username || 'Administrator';
  const displayEmail = user.email || 'admin@ikhw.org';
  const isSuperOrAdmin = user.role === 'admin' || user.role === 'superadmin';
  const roleText = isSuperOrAdmin ? 'Admin Sistem' : (user.role || 'Petugas');

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
  if (roleEl) roleEl.textContent = roleText;
  if (roleBadgeEl) roleBadgeEl.textContent = isSuperOrAdmin ? 'Administrator' : roleText;

  if (sidebarAvatarEl) sidebarAvatarEl.textContent = initials || 'AD';
  if (sidebarNameEl) sidebarNameEl.textContent = displayName;
  if (sidebarEmailEl) sidebarEmailEl.textContent = displayEmail;
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

export function updateTopbarBreadcrumbsAndTitle(tabName, subTab = null) {
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
    if (subTab === 'create') {
      pageTitle = 'Formulir Tambah Kawasan Baru';
      activeBreadcrumb = 'Tambah Kawasan';
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
      pageTitle = 'Master Jenis Pohon (Silvikultur)';
      activeBreadcrumb = 'Master Jenis Pohon';
    } else if (subTab === 'activities') {
      category = '3. Pelaksanaan';
      pageTitle = 'Kegiatan Penanaman & Batch Bibit';
      activeBreadcrumb = 'Kegiatan Penanaman';
    } else if (subTab === 'surveys') {
      category = '4. Pemantauan & Perawatan';
      pageTitle = 'Pemantauan Pertumbuhan & Sensus Pohon';
      activeBreadcrumb = 'Pemantauan Tanaman';
    } else if (subTab === 'maintenance') {
      category = '4. Pemantauan & Perawatan';
      pageTitle = 'Perawatan, Pemupukan & Penyulaman';
      activeBreadcrumb = 'Perawatan & Penyulaman';
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
  if (!ApiService.isAuthenticated()) return;
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

export function getRouteFromTab(tabName, subTab = null) {
  if (tabName === 'dashboard') return '#admin/dashboard';
  if (tabName === 'zones') return subTab && subTab !== 'list' ? `#admin/zones/${subTab}` : '#admin/zones';
  if (tabName === 'trees') return subTab && subTab !== 'dashboard' ? `#admin/trees/${subTab}` : '#admin/trees/dashboard';
  if (tabName === 'panoramas') return '#admin/panoramas';
  if (tabName === 'editor') return '#admin/editor';
  if (tabName === 'settings') return '#admin/settings';
  if (tabName === 'reports') return subTab && subTab !== 'rekap' ? `#admin/reports/${subTab}` : '#admin/reports';
  if (tabName === 'users') return '#admin/users';
  if (tabName === 'activity-logs') return '#admin/activity-logs';
  if (tabName === 'backup') return '#admin/backup';
  return '#admin/dashboard';
}

export function parseAdminRoute(hashStr) {
  if (!hashStr) return { tab: 'dashboard', subTab: null };
  const clean = hashStr.replace(/^#?\/?/, '').replace(/^\/+/, '');
  const parts = clean.split('/').filter(Boolean);
  if (parts[0] !== 'admin') return null;
  const rawTab = parts[1] || 'dashboard';
  const rawSubTab = parts[2] || null;

  if (rawTab === 'kawasan' || rawTab === 'zones') {
    return { tab: 'zones', subTab: rawSubTab || 'list' };
  }
  if (rawTab === 'species') {
    return { tab: 'trees', subTab: 'species' };
  }
  if (rawTab === 'activities') {
    return { tab: 'trees', subTab: 'activities' };
  }
  if (rawTab === 'surveys') {
    return { tab: 'trees', subTab: 'surveys' };
  }
  if (rawTab === 'maintenance') {
    return { tab: 'trees', subTab: 'maintenance' };
  }
  if (rawTab === 'logs' || rawTab === 'activity-logs') {
    return { tab: 'activity-logs', subTab: null };
  }
  if (rawTab === 'reports') {
    return { tab: 'reports', subTab: rawSubTab || 'rekap' };
  }
  if (rawTab === 'trees') {
    return { tab: 'trees', subTab: rawSubTab || 'dashboard' };
  }
  return { tab: rawTab, subTab: rawSubTab };
}

export function handleAdminHashRoute(hashStr) {
  const parsed = parseAdminRoute(hashStr);
  if (parsed) {
    if (!checkAdminAuth()) {
      sessionStorage.setItem('admin_redirect_hash', hashStr);
      window.location.href = '/login';
      return;
    }
    switchAdminSubmenu(parsed.tab, parsed.subTab, false);
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

  // Tombol Pratinjau Virtual Tour di sidebar
  const btnSidebarTourPreview = document.getElementById('sidebar-btn-tour-preview');
  if (btnSidebarTourPreview) {
    btnSidebarTourPreview.addEventListener('click', (e) => {
      closeMobileSidebarDrawer();
      if (onExitAdminToTour) {
        e.preventDefault();
        onExitAdminToTour();
      } else {
        window.location.hash = 'tour';
      }
    });
  }

  // Tombol Tampilan Publik di Topbar
  const btnPublicPreview = document.getElementById('btn-admin-view-public');
  if (btnPublicPreview) {
    btnPublicPreview.addEventListener('click', () => {
      closeMobileSidebarDrawer();
      if (onExitAdminToTour) onExitAdminToTour();
      else window.location.hash = 'beranda';
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

export function switchAdminSubmenu(tabName, subTab = null, updateHash = true) {
  activeAdminTab = tabName;

  if (tabName === 'trees') {
    activeTreeSubTab = subTab;
  } else if (tabName === 'zones') {
    activeZoneSubTab = subTab;
  } else if (tabName === 'reports') {
    activeReportSubTab = subTab;
  }

  // Sinkronisasi URL Hash jika diminta
  if (updateHash) {
    const targetHash = getRouteFromTab(tabName, subTab);
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
      isActive = (btnTab === 'zones' && (btnZone === activeZoneSubTab || (!activeZoneSubTab && btnZone === 'list')));
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
  updateTopbarBreadcrumbsAndTitle(tabName, subTab);
  updateTopbarZoneSwitcherVisibility(tabName);

  refreshActiveAdminTab();

  // Reset scroll to top when changing admin tabs
  window.scrollTo(0, 0);

  // If opening editor, resize Marzipano canvas and refresh hotspot lists
  if (tabName === 'editor' && editorInstance) {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (editorInstance.viewer) {
        editorInstance.viewer.updateSize();
      }
      if (editorInstance.currentSceneId) {
        editorInstance.setScene(editorInstance.currentSceneId);
      } else if (scenes.length > 0) {
        editorInstance.setScene(scenes[0].id);
      }
      editorInstance.renderHotspotsList();
      editorInstance.renderHotspotsOnCurrentScene();
    }, 50);
  }
}

function refreshActiveAdminTab() {
  updateAdminBadges();
  if (!ApiService.isAuthenticated()) return;

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
    if (activeZoneSubTab) {
      switchZoneSubTab(activeZoneSubTab);
    } else {
      initZonesModule({ scenes });
    }
  } else if (activeAdminTab === 'panoramas') {
    renderPanoramaManagement({
      scenes,
      hotspots: cachedHotspots,
      onOpenEditorForScene: (sceneId) => {
        switchAdminSubmenu('editor');
        if (editorInstance) editorInstance.setScene(sceneId);
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
    if (activeTreeSubTab) {
      switchTreeSubTab(activeTreeSubTab, scenes);
    } else {
      initTreeModule({ scenes });
    }
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
