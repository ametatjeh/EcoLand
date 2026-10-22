/**
 * Virtual Tour 360° Kawasan Penanaman Pohon ±2 Hektare
 * Main Application Orchestrator (Marzipano Engine)
 */
import './style.css';
import { EcoToast } from './utils/toast.js';
import scenes from './data/scenes.js';
import { projectConfig } from './data/config.js';
import {
  initViewer,
  createScene,
  zoomView,
  resetView,
  attachOrientationListener,
  setViewParameters,
} from './viewer.js';
import { addHotspots, setInfoHotspotHandler, showDefaultInfoModal } from './hotspots.js';
import { initSidebar, renderSceneList, setActiveScene } from './sidebar.js';
import { initControls, toggleFullscreen } from './controls.js';
import { initMinimap, updateMinimapScene, invalidateMinimapSize } from './minimap.js';
import { initLocationMap, invalidateLocationMapSize } from './map.js';
import { initStreetViewGuide } from './streetview_guide.js';
import {
  imageExists,
  renderEmptyState,
  removeEmptyState,
  updateTourBar,
} from './utils.js';
import { ApiService } from './services/api.js';
import { initAdminPanel, openAdminView, handleAdminHashRoute } from './admin/admin.js';
import { checkAdminAuth, onAuthChange } from './admin/auth.js';
import { initPublicTreeCatalog } from './katalog.js';
import { initPublicZones, refreshPublicTotalArea } from './public_zones.js';
import { initPublicGallery } from './gallery/publicGallery.js';
import { initPublicTreeQr } from './treeQr.js';
import { initPublicCarbon } from './carbon.js';

// ─── State ──────────────────────────────────────────────
let viewer = null;
let currentSceneId = null;
let currentView = null;
let currentInitialView = null;
const marzipanoScenes = new Map();
let currentTab = 'beranda';
let locationMapInitialized = false;
let dynamicHotspots = [];

const STORAGE_KEY_LAST_SCENE = 'ecoland_last_tour_scene_id';
const STORAGE_KEY_LAST_VIEW_PREFIX = 'ecoland_last_tour_view_';
let viewSaveTimeout = null;

function persistCurrentViewDebounced(sceneId, view) {
  if (!view || !sceneId) return;
  if (viewSaveTimeout) clearTimeout(viewSaveTimeout);
  viewSaveTimeout = setTimeout(() => {
    try {
      const viewData = {
        yaw: view.yaw(),
        pitch: view.pitch(),
        fov: view.fov(),
      };
      localStorage.setItem(STORAGE_KEY_LAST_VIEW_PREFIX + sceneId, JSON.stringify(viewData));
    } catch (e) {}
  }, 250);
}

function getSavedTourView(sceneId) {
  if (!sceneId) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LAST_VIEW_PREFIX + sceneId);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed?.yaw === 'number' &&
      typeof parsed?.pitch === 'number' &&
      typeof parsed?.fov === 'number'
    ) {
      return parsed;
    }
  } catch (e) {}
  return null;
}

function parseHash(fullHash) {
  const clean = (fullHash || '').replace(/^#\/?/, '').trim();
  const [routePart, queryPart] = clean.split('?');
  let route = (routePart || '').toLowerCase();
  const queryParams = new URLSearchParams(queryPart || '');

  // If hash is empty, check pathname for direct navigation like /tour, /galeri, /admin
  if (!route && typeof window !== 'undefined' && window.location.pathname) {
    const pathCandidate = window.location.pathname.replace(/^\/+/, '').split('/')[0].toLowerCase();
    if (pathCandidate && ['tour', 'info', 'galeri', 'katalog', 'tree-qr', 'karbon', 'admin'].includes(pathCandidate)) {
      route = pathCandidate;
    }
  }

  let sceneParam = queryParams.get('scene') || queryParams.get('titik') || null;
  let tab = route || 'beranda';

  if (route === 'tour' || route.startsWith('tour/')) {
    tab = 'tour';
    if (route.startsWith('tour/')) {
      const sub = routePart.slice(5).trim();
      if (sub) sceneParam = sub;
    }
  } else if (route === 'monitoring-karbon') {
    tab = 'karbon';
  }

  return { tab, sceneParam, queryParams };
}

function getInitialSceneId() {
  // 1. Check URL query string (?scene=... or ?titik=...)
  if (typeof window !== 'undefined' && window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    const qScene = urlParams.get('scene') || urlParams.get('titik');
    if (qScene) {
      const found = scenes.find((s) => s.id === qScene || String(s.sequence) === qScene);
      if (found) return found.id;
    }
  }

  // 2. Check hash route / query parameter
  if (typeof window !== 'undefined' && window.location.hash) {
    const { sceneParam } = parseHash(window.location.hash);
    if (sceneParam) {
      const found = scenes.find((s) => s.id === sceneParam || String(s.sequence) === sceneParam);
      if (found) return found.id;
    }
  }

  // 3. Check localStorage for visitor's last visited point
  try {
    const savedSceneId = localStorage.getItem(STORAGE_KEY_LAST_SCENE);
    if (savedSceneId) {
      const found = scenes.find((s) => s.id === savedSceneId);
      if (found) return found.id;
    }
  } catch (e) {
    console.warn('LocalStorage error:', e);
  }

  // 4. Default to first scene
  return scenes.length > 0 ? scenes[0].id : null;
}

function updateTourUrl(sceneId) {
  if (!sceneId) return;
  if (currentTab === 'tour') {
    const newHash = `#tour?scene=${encodeURIComponent(sceneId)}`;
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  }
}

// ─── DOM Boot ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Setup Navigation & Hash Tabs immediately (0ms instant route resolution)
  setupNavigation();
  handleHashRouting();
  window.addEventListener('hashchange', handleHashRouting);

  // Clear data-initial-tab if set by inline boot script
  if (typeof document !== 'undefined') {
    document.documentElement.removeAttribute('data-initial-tab');
  }

  // 2. Load server-persisted hotspots asynchronously in background
  ApiService.getHotspots()
    .then((hs) => { dynamicHotspots = hs || []; })
    .catch((err) => { console.warn('Failed loading hotspots:', err); });

  // 3. Populate Configurable Project Identity in UI
  populateProjectIdentity();

  // 4. Render Points Grids & Public Zones (Home)
  renderHomePointsGrid();
  initPublicZones('home-zones-grid', (sceneId) => {
    window.location.hash = `tour?scene=${encodeURIComponent(sceneId)}`;
    switchScene(sceneId);
  });

  // 4. Setup Marzipano Viewer
  try {
    viewer = initViewer();
  } catch (err) {
    console.warn('Marzipano viewer initialization:', err.message);
  }

  // 5. Setup Sidebar
  initSidebar(switchScene);
  renderSceneList(scenes, null);

  // 6. Setup Controls
  initControls({
    onZoomIn: () => zoomView(currentView, -0.15),
    onZoomOut: () => zoomView(currentView, 0.15),
    onResetView: () => resetView(currentView, currentInitialView || {}),
    onFullscreen: toggleFullscreen,
    onPrevScene: navigatePrevScene,
    onNextScene: navigateNextScene,
  });

  // Compass needle reset click
  const compassEl = document.getElementById('tour-compass');
  if (compassEl) {
    compassEl.addEventListener('click', () => {
      resetView(currentView, currentInitialView || {});
    });
  }

  // 7. Setup Info Hotspot Modal Handler
  setInfoHotspotHandler((hotspotData) => {
    showDefaultInfoModal(hotspotData);
  });

  // 8. Setup Minimap / Radar inside Tour
  initMinimap('tour-minimap', (selectedSceneId) => {
    switchScene(selectedSceneId);
  });

  const btnMinimapToggle = document.getElementById('btn-minimap-minimize');
  const minimapCard = document.getElementById('tour-minimap-card');
  if (btnMinimapToggle && minimapCard) {
    btnMinimapToggle.addEventListener('click', () => {
      const isMin = minimapCard.classList.toggle('minimized');
      btnMinimapToggle.textContent = isMin ? 'Buka Radar' : 'Tutup';
      if (!isMin) {
        setTimeout(() => invalidateMinimapSize(), 150);
      }
    });
  }

  // Button to exit tour to home
  const btnExitToList = document.getElementById('btn-exit-to-list');
  if (btnExitToList) {
    btnExitToList.addEventListener('click', () => {
      window.location.hash = 'beranda';
    });
  }

  // 9. Setup Go Street View Guide & Validator
  initStreetViewGuide('streetview-guide-container');

  // 10. Setup Admin Panel
  try {
    await initAdminPanel({
      onPublicTourUpdate: (updatedHotspots) => {
        dynamicHotspots = updatedHotspots;
        if (currentSceneId) {
          const cached = marzipanoScenes.get(currentSceneId);
          const sceneData = scenes.find((s) => s.id === currentSceneId);
          if (cached && sceneData) {
            addHotspots(cached.scene, sceneData, scenes, switchScene, dynamicHotspots);
          }
        }
      },
      onExitAdminToTour: () => {
        window.location.hash = 'tour';
      },
    });
  } catch (err) {
    console.warn('Admin panel initialization error:', err);
  }

  // Listener for preview-scene from Admin panel
  window.addEventListener('preview-scene', (e) => {
    if (e.detail && e.detail.sceneId) {
      window.location.hash = `tour?scene=${encodeURIComponent(e.detail.sceneId)}`;
      switchScene(e.detail.sceneId);
    }
  });

  // Pre-load / restore initial scene if not already loaded by handleHashRouting
  if (scenes.length > 0 && !currentSceneId) {
    const initialSceneId = getInitialSceneId();
    if (initialSceneId) {
      await switchScene(initialSceneId, getSavedTourView(initialSceneId));
    }
  }
});

// ─── Configurable UI Population ─────────────────────────
async function populateProjectIdentity() {
  const brandTitle = document.getElementById('nav-brand-title');
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const infoGeneralDesc = document.getElementById('info-general-desc');
  if (brandTitle) brandTitle.textContent = projectConfig.namaAplikasi || 'Eco Land';
  
  const updateBrandSubtitles = (text) => {
    document.querySelectorAll('.brand-subtitle').forEach((el) => {
      el.textContent = text;
    });
  };

  updateBrandSubtitles(projectConfig.organisasi || 'IKHW - Inisiatif Konservasi Hutan Wakaf');

  if (heroTitle) {
    heroTitle.innerHTML = `Eco Land<br /><span style="display: block; font-size: 24px; font-weight: 600; opacity: 0.92; margin-top: 6px;">Kawasan Penanaman Pohon</span>`;
  }
  if (heroDesc) heroDesc.textContent = projectConfig.deskripsi;
  if (infoGeneralDesc) infoGeneralDesc.textContent = projectConfig.deskripsi;

  // Total luas kawasan dimuat secara dinamis dari database melalui refreshPublicTotalArea()
  refreshPublicTotalArea();

  try {
    const res = await fetch('/api/settings/public');
    if (res.ok) {
      const data = await res.json();
      const flat = data.flat || {};
      if (flat.program_description) {
        if (heroDesc) heroDesc.textContent = flat.program_description;
        if (infoGeneralDesc) infoGeneralDesc.textContent = flat.program_description;
      }
      if (flat.org_name) {
        updateBrandSubtitles(flat.org_name);
      }
      if (flat.app_logo) {
        document.querySelectorAll('.brand-logo-icon').forEach((box) => {
          box.innerHTML = `<img src="${flat.app_logo}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" />`;
        });
      }
    }
  } catch (e) {
    console.debug('Public settings fetch fallback to config defaults:', e);
  }
}

// ─── Tab Navigation ─────────────────────────────────────
// ─── Tab Navigation ─────────────────────────────────────
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab-btn');
  const brandBtn = document.getElementById('brand-btn');
  const mobileToggle = document.getElementById('btn-mobile-menu');
  const navTabsContainer = document.getElementById('nav-tabs');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const desktopAdminBtn = document.getElementById('nav-btn-admin-desktop');
  const footerAdminBtn = document.getElementById('footer-btn-admin');
  const dropdownContainers = document.querySelectorAll('.nav-dropdown');

  function closeAllDropdowns() {
    dropdownContainers.forEach((dd) => {
      dd.classList.remove('is-open');
      const trigger = dd.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMobileMenu() {
    closeAllDropdowns();
    if (navTabsContainer) navTabsContainer.classList.remove('mobile-open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('show');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', 'false');
      const openIcon = mobileToggle.querySelector('.hamburger-icon-open');
      const closeIcon = mobileToggle.querySelector('.hamburger-icon-close');
      if (openIcon) openIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  }

  function toggleMobileMenu() {
    if (!navTabsContainer) return;
    const isOpen = navTabsContainer.classList.toggle('mobile-open');
    if (mobileBackdrop) mobileBackdrop.classList.toggle('show', isOpen);
    if (!isOpen) closeAllDropdowns();
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const openIcon = mobileToggle.querySelector('.hamburger-icon-open');
      const closeIcon = mobileToggle.querySelector('.hamburger-icon-close');
      if (openIcon) openIcon.classList.toggle('hidden', isOpen);
      if (closeIcon) closeIcon.classList.toggle('hidden', !isOpen);
    }
  }

  // Setup Dropdown Interactive Toggles (Informasi)
  dropdownContainers.forEach((dd) => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = dd.classList.contains('is-open');

        // Close other dropdowns if any
        dropdownContainers.forEach((other) => {
          if (other !== dd) {
            other.classList.remove('is-open');
            const otherTrigger = other.querySelector('.nav-dropdown-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current dropdown
        if (isOpen) {
          dd.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          dd.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }

    // Submenu links click (Galeri, Data Pohon, Tree QR)
    dd.querySelectorAll('.nav-dropdown-item').forEach((item) => {
      item.addEventListener('click', () => {
        closeAllDropdowns();
        closeMobileMenu();
      });
    });
  });

  // Non-dropdown tab buttons click
  tabs.forEach((tab) => {
    if (tab.classList.contains('nav-dropdown-trigger')) return;
    if (tab.classList.contains('btn-nav-login')) return;
    tab.addEventListener('click', (e) => {
      const target = tab.getAttribute('data-tab');
      if (target === 'login') {
        window.location.href = '/login';
        return;
      }
      if (target === 'admin') {
        if (!isUserAuthenticated()) {
          window.location.href = '/login';
          return;
        }
        e.preventDefault();
        openAdminView();
      } else {
        window.location.hash = target;
      }
      closeAllDropdowns();
      closeMobileMenu();
    });
  });

  // Dedicated Mobile Login button inside menu
  const mobileLoginBtns = document.querySelectorAll('.btn-nav-login');
  mobileLoginBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const isAuth = isUserAuthenticated();
      const href = btn.getAttribute('href') || '';
      if (!isAuth || href.includes('/login') || btn.getAttribute('data-tab') === 'login') {
        closeMobileMenu();
        window.location.href = '/login';
        return;
      }
      e.preventDefault();
      closeMobileMenu();
      openAdminView();
    });
  });

  if (desktopAdminBtn) {
    desktopAdminBtn.addEventListener('click', (e) => {
      const isAuth = isUserAuthenticated();
      const href = desktopAdminBtn.getAttribute('href') || '';
      if (!isAuth || href.includes('/login') || desktopAdminBtn.getAttribute('data-tab') === 'login') {
        window.location.href = '/login';
        return;
      }
      e.preventDefault();
      openAdminView();
    });
  }

  if (footerAdminBtn) {
    footerAdminBtn.addEventListener('click', (e) => {
      if (!isUserAuthenticated()) {
        window.location.href = '/login';
        return;
      }
      e.preventDefault();
      openAdminView();
    });
  }

  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      window.location.hash = 'beranda';
      closeMobileMenu();
    });
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile drawer & dropdowns on Escape key or click outside
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      closeMobileMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      closeAllDropdowns();
    }
    if (navTabsContainer && navTabsContainer.classList.contains('mobile-open')) {
      if (!navTabsContainer.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });

  // Footer Navigation Links
  document.querySelectorAll('.footer-nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-tab');
      if (target) {
        e.preventDefault();
        window.location.hash = target;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Buttons on Beranda
  const btnHeroTour = document.getElementById('btn-hero-start-tour');
  const btnHeroPoints = document.getElementById('btn-hero-view-points');

  if (btnHeroTour) {
    btnHeroTour.addEventListener('click', () => (window.location.hash = 'tour'));
  }
  if (btnHeroPoints) {
    btnHeroPoints.addEventListener('click', () => (window.location.hash = 'info'));
  }

  // Initial header auth state and listener
  updateHeaderAuthUI();
  onAuthChange(() => {
    updateHeaderAuthUI();
  });
}

export function isUserAuthenticated() {
  // 1. Jika Bearer token Sanctum valid tersimpan di client, pengguna terautentikasi
  if (ApiService.isAuthenticated()) {
    return true;
  }

  // 2. Periksa status sesi server jika disediakan oleh template Blade
  if (typeof window !== 'undefined' && typeof window.ECO_SERVER_AUTH === 'boolean') {
    return window.ECO_SERVER_AUTH;
  }

  if (typeof document !== 'undefined') {
    const metaAuth = document.querySelector('meta[name="eco-server-auth"]');
    if (metaAuth) {
      return metaAuth.getAttribute('content') === 'true';
    }
  }

  return checkAdminAuth();
}

export function updateHeaderAuthUI() {
  const isLoggedIn = isUserAuthenticated();
  const desktopLoginBtn = document.getElementById('nav-btn-admin-desktop');
  const mobileLoginBtns = document.querySelectorAll('.btn-nav-login');
  const targetHref = isLoggedIn ? '/#admin/dashboard' : '/login';

  if (desktopLoginBtn) {
    desktopLoginBtn.setAttribute('href', targetHref);
    desktopLoginBtn.setAttribute('data-tab', isLoggedIn ? 'admin' : 'login');
    if (isLoggedIn) {
      desktopLoginBtn.setAttribute('title', 'Dashboard Eco Land');
      desktopLoginBtn.classList.add('is-authenticated');
      desktopLoginBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span class="header-login-text">Dashboard</span>
      `;
    } else {
      desktopLoginBtn.setAttribute('title', 'Login Eco Land');
      desktopLoginBtn.classList.remove('is-authenticated');
      desktopLoginBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span class="header-login-text">Login</span>
      `;
    }
  }

  mobileLoginBtns.forEach((btn) => {
    btn.setAttribute('href', targetHref);
    btn.setAttribute('data-tab', isLoggedIn ? 'admin' : 'login');
    const iconEl = btn.querySelector('.nav-icon');
    const textEl = btn.querySelector('.nav-text') || btn.querySelector('span:last-child');
    if (isLoggedIn) {
      btn.setAttribute('title', 'Dashboard Eco Land');
      if (iconEl) iconEl.textContent = '📊';
      if (textEl) textEl.textContent = 'Dashboard';
    } else {
      btn.setAttribute('title', 'Login Eco Land');
      if (iconEl) iconEl.textContent = '🔐';
      if (textEl) textEl.textContent = 'Login';
    }
  });
}

function switchTab(tabId) {
  currentTab = tabId;

  // Sync header auth label on every tab switch
  updateHeaderAuthUI();

  // Toggle main navbar visibility (hidden on admin dashboard, visible on public views)
  const mainNavbar = document.getElementById('main-navbar');
  if (mainNavbar) {
    mainNavbar.style.display = tabId === 'admin' ? 'none' : '';
  }

  // Toggle public views container visibility
  const viewsContainer = document.getElementById('views-container');
  if (viewsContainer) {
    viewsContainer.style.display = tabId === 'admin' ? 'none' : '';
  }

  // Toggle public global footer visibility (visible on beranda, info, galeri, katalog, tree-qr, karbon; hidden on tour, admin)
  const globalFooter = document.getElementById('public-global-footer');
  if (globalFooter) {
    globalFooter.style.display = ['beranda', 'info', 'galeri', 'katalog', 'tree-qr', 'karbon'].includes(tabId) ? 'block' : 'none';
  }

  // Update navbar active tab (highlight parent 'informasi' when on galeri, katalog, or tree-qr)
  const infoSubtabs = ['galeri', 'katalog', 'tree-qr'];
  document.querySelectorAll('.nav-tab-btn').forEach((btn) => {
    const tabAttr = btn.getAttribute('data-tab');
    if (tabAttr === 'informasi') {
      btn.classList.toggle('active', infoSubtabs.includes(tabId));
    } else {
      btn.classList.toggle('active', tabAttr === tabId);
    }
  });

  // Update dropdown items active state
  document.querySelectorAll('.nav-dropdown-item').forEach((item) => {
    item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
  });

  // Update view panes
  document.querySelectorAll('.view-pane').forEach((pane) => {
    pane.classList.toggle('active', pane.id === `view-${tabId}`);
  });

  // Reset scroll to top when changing views
  if (tabId !== 'tour') {
    window.scrollTo(0, 0);
  }

  // Update dynamic document title based on tab
  const tabTitles = {
    beranda: 'Eco Land — Virtual Tour & Sistem Informasi Restorasi Kawasan | IKHW Aceh',
    tour: 'Virtual Tour 360° — Eco Land',
    info: 'Informasi Kawasan — Eco Land',
    galeri: 'Galeri Foto Kawasan — Eco Land',
    katalog: 'Data & Katalog Pohon — Eco Land',
    'tree-qr': 'Tree QR Code Kawasan — Eco Land',
    karbon: 'Monitoring Karbon — Eco Land',
    admin: 'Dashboard Administrator — Eco Land',
  };
  if (tabTitles[tabId]) {
    document.title = tabTitles[tabId];
  }

  // Specific triggers
  if (tabId === 'beranda') {
    refreshPublicTotalArea();
    initLocationMap('home-ref-map', (sceneId) => {
      window.location.hash = `tour?scene=${encodeURIComponent(sceneId)}`;
      switchScene(sceneId);
    });
    invalidateLocationMapSize();
  } else if (tabId === 'info') {
    initLocationMap('gis-map', (sceneId) => {
      window.location.hash = `tour?scene=${encodeURIComponent(sceneId)}`;
      switchScene(sceneId);
    });
    invalidateLocationMapSize();
  } else if (tabId === 'galeri') {
    initPublicGallery('public-gallery-container');
  } else if (tabId === 'katalog') {
    initPublicTreeCatalog('public-tree-catalog-container', (sceneId) => {
      window.location.hash = `tour?scene=${encodeURIComponent(sceneId)}`;
      switchScene(sceneId);
    });
  } else if (tabId === 'tree-qr') {
    initPublicTreeQr('public-tree-qr-container');
  } else if (tabId === 'karbon') {
    initPublicCarbon('public-carbon-container');
  } else if (tabId === 'tour') {
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => {
      invalidateMinimapSize();
      if (currentSceneId) updateMinimapScene(currentSceneId);
    }, 200);
  } else if (tabId === 'admin') {
    window.dispatchEvent(new Event('resize'));
  }
}

function handleHashRouting() {
  const fullHash = window.location.hash || '#beranda';
  const { tab, sceneParam } = parseHash(fullHash);
  const validTabs = ['beranda', 'tour', 'info', 'galeri', 'katalog', 'tree-qr', 'karbon', 'admin'];

  if (tab === 'titik') {
    window.location.replace('#beranda');
    return;
  }

  if (tab === 'admin' || tab.startsWith('admin/')) {
    if (isUserAuthenticated()) {
      switchTab('admin');
      handleAdminHashRoute(fullHash);
    } else {
      sessionStorage.setItem('admin_redirect_hash', fullHash);
      openAdminView();
    }
    return;
  }

  if (tab === 'tour') {
    switchTab('tour');

    // If a specific scene is in URL / hash
    if (sceneParam) {
      const found = scenes.find((s) => s.id === sceneParam || String(s.sequence) === sceneParam);
      if (found) {
        if (found.id !== currentSceneId) {
          switchScene(found.id, getSavedTourView(found.id));
        }
        return;
      }
    }

    // If no scene specified in hash, load last visited scene if not yet initialized
    if (!currentSceneId) {
      const initialSceneId = getInitialSceneId();
      if (initialSceneId) {
        switchScene(initialSceneId, getSavedTourView(initialSceneId));
      }
    } else {
      updateTourUrl(currentSceneId);
    }
    return;
  }

  if (validTabs.includes(tab)) {
    switchTab(tab);
  } else {
    switchTab('beranda');
  }
}

// ─── Render Points Grids ────────────────────────────────
function renderHomePointsGrid() {
  const grid = document.getElementById('home-points-grid');
  if (!grid) return;

  grid.innerHTML = scenes
    .map((s) => {
      const isAvail = s.status === 'tersedia';
      return `
        <div class="point-card">
          <div>
            <div class="point-card-top">
              <span class="point-sequence-badge">Titik ${s.sequence}</span>
              <span class="point-status-tag ${isAvail ? 'ready' : 'pending'}">
                ${isAvail ? '✓ Foto Siap' : '⏳ Menunggu Foto GSV'}
              </span>
            </div>
            <h3 class="point-title">${s.name}</h3>
            <p class="point-desc">${s.description}</p>
            <div class="point-meta">
              📍 Koordinat Acuan: ${s.latitude.toFixed(6)}° N, ${s.longitude.toFixed(6)}° E
            </div>
          </div>
          <button class="btn-card-explore" data-scene-id="${s.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M10 8l6 4-6 4V8z"/>
            </svg>
            Buka Panorama 360°
          </button>
        </div>
      `;
    })
    .join('');

  grid.querySelectorAll('.btn-card-explore').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-scene-id');
      window.location.hash = `tour?scene=${encodeURIComponent(targetId)}`;
      switchScene(targetId);
    });
  });
}

// ─── Scene Navigation (Prev / Next) ─────────────────────
function navigatePrevScene() {
  if (!currentSceneId) return;
  const currentIndex = scenes.findIndex((s) => s.id === currentSceneId);
  const prevIndex = (currentIndex - 1 + scenes.length) % scenes.length;
  switchScene(scenes[prevIndex].id);
}

function navigateNextScene() {
  if (!currentSceneId) return;
  const currentIndex = scenes.findIndex((s) => s.id === currentSceneId);
  const nextIndex = (currentIndex + 1) % scenes.length;
  switchScene(scenes[nextIndex].id);
}

// ─── Scene Switching (Marzipano Core) ───────────────────
export async function switchScene(sceneId, customViewParams = null) {
  if (!sceneId) return;
  if (sceneId === currentSceneId && !customViewParams) return;

  const sceneData = scenes.find((s) => s.id === sceneId);
  if (!sceneData) return;

  // Persist last visited scene in localStorage
  try {
    localStorage.setItem(STORAGE_KEY_LAST_SCENE, sceneId);
  } catch (e) {}

  // Keep tour URL synchronized when tour tab is active
  updateTourUrl(sceneId);

  // Update UI & Sidebar
  updateTourBar(sceneData);
  setActiveScene(sceneId);
  renderSceneList(scenes, sceneId);

  // Update Minimap Position
  updateMinimapScene(sceneId);

  // Show loading indicator
  const loadingIndicator = document.getElementById('tour-loading');
  if (loadingIndicator) loadingIndicator.classList.remove('hidden');

  // Check if image exists
  const exists = await imageExists(sceneData.panorama);

  if (!exists) {
    if (loadingIndicator) loadingIndicator.classList.add('hidden');
    removeEmptyState();
    renderEmptyState(sceneData);
    currentSceneId = sceneId;
    currentView = null;
    currentInitialView = sceneData.initialView;
    return;
  }

  // Panorama file exists — load into Marzipano
  removeEmptyState();

  try {
    let cached = marzipanoScenes.get(sceneId);

    if (!cached && viewer) {
      cached = createScene(sceneData, customViewParams);
      addHotspots(cached.scene, sceneData, scenes, switchScene, dynamicHotspots);
      marzipanoScenes.set(sceneId, cached);
    } else if (cached) {
      if (customViewParams) {
        setViewParameters(cached.view, customViewParams);
      }
      addHotspots(cached.scene, sceneData, scenes, switchScene, dynamicHotspots);
    }

    if (cached) {
      cached.scene.switchTo({ transitionDuration: 500 });
      currentSceneId = sceneId;
      currentView = cached.view;
      currentInitialView = sceneData.initialView;

      // Update compass needle immediately
      const needle = document.getElementById('compass-needle');
      if (needle) {
        const yawRad = cached.view.yaw();
        const yawDeg = -((yawRad * 180) / Math.PI);
        needle.style.transform = `rotate(${yawDeg}deg)`;
      }

      // Attach single listener for compass & view persistence
      if (!cached.view._hasPersistenceListener) {
        cached.view._hasPersistenceListener = true;
        cached.view.addEventListener('change', () => {
          if (needle) {
            const yawDeg = -((cached.view.yaw() * 180) / Math.PI);
            needle.style.transform = `rotate(${yawDeg}deg)`;
          }
          if (currentSceneId) {
            persistCurrentViewDebounced(currentSceneId, cached.view);
          }
        });
      }
    }

    if (loadingIndicator) loadingIndicator.classList.add('hidden');
  } catch (err) {
    console.error('Error switching scene:', err);
    if (loadingIndicator) loadingIndicator.classList.add('hidden');
    renderEmptyState(sceneData);
  }
}

// Re-fetch dynamic total area when admin modifies zones
window.addEventListener('zones-updated', () => {
  refreshPublicTotalArea();
});
