/**
 * Minimap / Radar Navigasi untuk Virtual Tour
 * Menampilkan posisi relatif titik-titik panorama dan posisi pengguna saat ini.
 * Tanpa poligon GPS atau garis batas.
 */
import L from 'leaflet';
import { projectConfig } from './data/config.js';
import scenes from './data/scenes.js';

let miniMap = null;
let activeMarker = null;
let pointMarkers = [];
let onSelectSceneHandler = null;

/**
 * Inisialisasi Minimap
 * @param {string} containerId
 * @param {Function} onSelectScene
 */
export function initMinimap(containerId, onSelectScene) {
  const container = document.getElementById(containerId);
  if (!container) return;

  onSelectSceneHandler = onSelectScene;
  const { latitude, longitude } = projectConfig.lokasiReferensi;

  miniMap = L.map(containerId, {
    center: [latitude, longitude],
    zoom: 16,
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: false,
  });

  // Layer Satelit
  L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 19,
    }
  ).addTo(miniMap);

  // Titik Acuan Referensi Pusat
  L.circleMarker([latitude, longitude], {
    radius: 4,
    fillColor: '#f59e0b',
    color: '#ffffff',
    weight: 1.5,
    fillOpacity: 1,
  })
    .addTo(miniMap)
    .bindTooltip('Patok Referensi Acuan', { direction: 'top' });

  // Render titik-titik panorama
  scenes.forEach((scene) => {
    const marker = L.circleMarker([scene.latitude, scene.longitude], {
      radius: 6,
      fillColor: '#ffffff',
      color: '#059669',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.9,
    }).addTo(miniMap);

    marker.bindTooltip(`Titik ${scene.sequence}: ${scene.name}`, {
      direction: 'top',
      offset: [0, -6],
      className: 'minimap-tooltip',
    });

    marker.on('click', () => {
      if (typeof onSelectSceneHandler === 'function') {
        onSelectSceneHandler(scene.id);
      }
    });

    pointMarkers.push({ id: scene.id, marker });
  });

  // Indikator Posisi Pengunjung Aktif (Radar Wave)
  const activeIcon = L.divIcon({
    className: 'minimap-user-icon',
    html: `
      <div class="user-position-marker">
        <span class="user-radar-wave"></span>
        <span class="user-center-point"></span>
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

  activeMarker = L.marker([latitude, longitude], {
    icon: activeIcon,
    zIndexOffset: 2000,
  }).addTo(miniMap);

  setTimeout(() => {
    miniMap.invalidateSize();
    miniMap.setView([latitude, longitude], 16);
  }, 300);

  return miniMap;
}

/**
 * Perbarui posisi aktif pada minimap
 * @param {string} sceneId
 */
export function updateMinimapScene(sceneId) {
  if (!miniMap || !activeMarker) return;

  const target = scenes.find((s) => s.id === sceneId);
  if (!target) return;

  activeMarker.setLatLng([target.latitude, target.longitude]);
  miniMap.panTo([target.latitude, target.longitude]);

  // Perbarui highlight dot
  pointMarkers.forEach(({ id, marker }) => {
    if (id === sceneId) {
      marker.setStyle({
        radius: 7,
        fillColor: '#10b981',
        color: '#ffffff',
        weight: 3,
      });
    } else {
      marker.setStyle({
        radius: 5,
        fillColor: '#ffffff',
        color: '#059669',
        weight: 2,
      });
    }
  });
}

/**
 * Refresh ukuran minimap bila kontainer berubah
 */
export function invalidateMinimapSize() {
  if (miniMap) {
    miniMap.invalidateSize();
  }
}

