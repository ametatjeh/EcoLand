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
import { checkAdminAuth } from './admin/auth.js';
import { initPublicTreeCatalog } from './katalog.js';
import { initPublicZones } from './public_zones.js';
import { initPublicGallery } from './gallery/publicGallery.js';
import { initPublicTreeQr } from './treeQr.js';

// ─── State ──────────────────────────────────────────────
let viewer = null;
let currentSceneId = null;
let currentView = null;
let currentInitialView = null;
const marzipanoScenes = new Map();
let currentTab = 'beranda';
let locationMapInitialized = false;
let dynamicHotspots = [];

// ─── DOM Boot ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  // 0. Load server-persisted hotspots
  try {
    dynamicHotspots = await ApiService.getHotspots();
  } catch (err) {
    console.warn('Failed loading hotspots:', err);
  }

  // 1. Populate Configurable Project Identity in UI
  populateProjectIdentity();

  // 2. Setup Navigation & Hash Tabs
  setupNavigation();

  // 3. Render Points Grids & Public Zones (Home)
  renderHomePointsGrid();
  initPublicZones('home-zones-grid', (sceneId) => {
    window.location.hash = 'tour';
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
      window.location.hash = 'tour';
      switchScene(e.detail.sceneId);
    }
  });

  // 11. Load Initial Hash Route
  handleHashRouting();
  window.addEventListener('hashchange', handleHashRouting);

  // Pre-load first scene
  if (scenes.length > 0) {
    await switchScene(scenes[0].id);
  }
});

// ─── Configurable UI Population ─────────────────────────
async function populateProjectIdentity() {
  const brandTitle = document.getElementById('nav-brand-title');
  const brandSub = document.getElementById('nav-brand-sub');
  const heroTitle = document.getElementById('hero-title');
  const heroDesc = document.getElementById('hero-desc');
  const infoGeneralDesc = document.getElementById('info-general-desc');
  const statLuas = document.getElementById('stat-luas');

  if (brandTitle) brandTitle.textContent = projectConfig.namaAplikasi || 'Eco Land';
  if (brandSub) brandSub.textContent = 'IKHW Aceh — Inisiatif Konservasi & Hutan Wakaf';
  if (heroTitle) {
    heroTitle.innerHTML = `Eco Land<br /><span style="display: block; font-size: 24px; font-weight: 600; opacity: 0.92; margin-top: 6px;">Kawasan Penanaman Pohon</span>`;
  }
  if (heroDesc) heroDesc.textContent = projectConfig.deskripsi;
  if (infoGeneralDesc) infoGeneralDesc.textContent = projectConfig.deskripsi;
  if (statLuas) statLuas.textContent = projectConfig.luasDeskriptif;

  try {
    const res = await fetch('/api/settings/public');
    if (res.ok) {
      const data = await res.json();
      const flat = data.flat || {};
      if (flat.program_description) {
        if (heroDesc) heroDesc.textContent = flat.program_description;
        if (infoGeneralDesc) infoGeneralDesc.textContent = flat.program_description;
      }
      if (flat.org_name && brandSub) {
        brandSub.textContent = flat.org_name;
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
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab-btn');
  const brandBtn = document.getElementById('brand-btn');
  const mobileToggle = document.getElementById('btn-mobile-menu');
  const navTabsContainer = document.getElementById('nav-tabs');
  const adminNavBtn = document.getElementById('nav-btn-admin');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      if (target === 'admin') {
        openAdminView();
      } else {
        window.location.hash = target;
      }
      if (navTabsContainer) navTabsContainer.classList.remove('mobile-open');
    });
  });

  if (adminNavBtn) {
    adminNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openAdminView();
    });
  }

  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      window.location.hash = 'beranda';
    });
  }

  if (mobileToggle && navTabsContainer) {
    mobileToggle.addEventListener('click', () => {
      navTabsContainer.classList.toggle('mobile-open');
    });
  }

  // Buttons on Beranda
  const btnHeroTour = document.getElementById('btn-hero-start-tour');
  const btnHeroPoints = document.getElementById('btn-hero-view-points');

  if (btnHeroTour) {
    btnHeroTour.addEventListener('click', () => (window.location.hash = 'tour'));
  }
  if (btnHeroPoints) {
    btnHeroPoints.addEventListener('click', () => (window.location.hash = 'info'));
  }
}

function switchTab(tabId) {
  currentTab = tabId;

  // Toggle main navbar visibility (hidden on admin dashboard, visible on public views)
  const mainNavbar = document.getElementById('main-navbar');
  if (mainNavbar) {
    mainNavbar.style.display = tabId === 'admin' ? 'none' : '';
  }

  // Toggle public global footer visibility (visible on beranda, info, galeri, katalog, tree-qr; hidden on tour, admin)
  const globalFooter = document.getElementById('public-global-footer');
  if (globalFooter) {
    globalFooter.style.display = ['beranda', 'info', 'galeri', 'katalog', 'tree-qr'].includes(tabId) ? 'block' : 'none';
  }

  // Update navbar active tab
  document.querySelectorAll('.nav-tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });

  // Update view panes
  document.querySelectorAll('.view-pane').forEach((pane) => {
    pane.classList.toggle('active', pane.id === `view-${tabId}`);
  });

  // Smooth scroll to top when changing public views
  if (tabId !== 'tour') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Specific triggers
  if (tabId === 'beranda') {
    initLocationMap('home-ref-map', (sceneId) => {
      window.location.hash = 'tour';
      switchScene(sceneId);
    });
    invalidateLocationMapSize();
  } else if (tabId === 'info') {
    initLocationMap('gis-map', (sceneId) => {
      window.location.hash = 'tour';
      switchScene(sceneId);
    });
    invalidateLocationMapSize();
  } else if (tabId === 'galeri') {
    initPublicGallery('public-gallery-container');
  } else if (tabId === 'katalog') {
    initPublicTreeCatalog('public-tree-catalog-container', (sceneId) => {
      window.location.hash = 'tour';
      switchScene(sceneId);
    });
  } else if (tabId === 'tree-qr') {
    initPublicTreeQr('public-tree-qr-container');
  } else if (tabId === 'tour') {
    window.dispatchEvent(new Event('resize'));
    setTimeout(() => invalidateMinimapSize(), 200);
  } else if (tabId === 'admin') {
    window.dispatchEvent(new Event('resize'));
  }
}

function handleHashRouting() {
  const fullHash = window.location.hash || '#beranda';
  const hash = fullHash.replace(/^#\/?/, '').split('?')[0] || 'beranda';
  const validTabs = ['beranda', 'tour', 'info', 'galeri', 'katalog', 'tree-qr', 'admin'];

  if (hash === 'titik') {
    window.location.replace('#beranda');
    return;
  }

  if (hash === 'admin' || hash.startsWith('admin/')) {
    if (ApiService.isAuthenticated()) {
      switchTab('admin');
      handleAdminHashRoute(fullHash);
    } else {
      sessionStorage.setItem('admin_redirect_hash', fullHash);
      openAdminView();
    }
    return;
  }

  if (validTabs.includes(hash)) {
    switchTab(hash);
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
      window.location.hash = 'tour';
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
export async function switchScene(sceneId) {
  if (!sceneId || sceneId === currentSceneId) return;

  const sceneData = scenes.find((s) => s.id === sceneId);
  if (!sceneData) return;

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
      cached = createScene(sceneData);
      addHotspots(cached.scene, sceneData, scenes, switchScene, dynamicHotspots);
      marzipanoScenes.set(sceneId, cached);
    } else if (cached) {
      addHotspots(cached.scene, sceneData, scenes, switchScene, dynamicHotspots);
    }

    if (cached) {
      cached.scene.switchTo({ transitionDuration: 500 });
      currentSceneId = sceneId;
      currentView = cached.view;
      currentInitialView = sceneData.initialView;

      // Attach compass needle listener
      const needle = document.getElementById('compass-needle');
      if (needle) {
        attachOrientationListener(cached.view, (deg) => {
          needle.style.transform = `rotate(${deg}deg)`;
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
