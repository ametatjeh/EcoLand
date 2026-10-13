/**
 * Peta Lokasi Referensi Kawasan (Opsional)
 *
 * Sesuai ketentuan:
 * - Menampilkan peta lokasi dengan satu penanda lokasi referensi utama (WGS84).
 * - Tidak memuat poligon GPS, batas lahan, garis batas kawasan, atau kalkulasi poligon.
 * - Menampilkan titik-titik lokasi panorama 360° yang dapat dipilih.
 */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { projectConfig } from './data/config.js';
import scenes from './data/scenes.js';

const mapInstances = new Map();

/**
 * Inisialisasi Peta Lokasi Referensi
 * @param {string} containerId
 * @param {Function} onSelectScene
 */
export function initLocationMap(containerId, onSelectScene) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  if (mapInstances.has(containerId)) {
    const existing = mapInstances.get(containerId);
    setTimeout(() => {
      existing.map.invalidateSize();
    }, 100);
    return existing.map;
  }

  const { latitude, longitude, nama } = projectConfig.lokasiReferensi;

  // Inisialisasi Leaflet Map
  const map = L.map(containerId, {
    center: [latitude, longitude],
    zoom: 17,
    maxZoom: 19,
    minZoom: 13,
    zoomControl: true,
  });

  // Layer Basemap (Satelit & Topografi Jalan)
  const satelliteLayer = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
      maxZoom: 19,
      attribution: 'Citra Satelit &copy; Esri',
    }
  );

  const osmLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }
  );

  satelliteLayer.addTo(map);

  const baseMaps = {
    '🛰️ Citra Satelit': satelliteLayer,
    '🗺️ Peta Jalan (OSM)': osmLayer,
  };
  L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);

  // Skala metrik
  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

  // 1. Penanda Lokasi Referensi Utama
  renderMainReferenceMarker(map, latitude, longitude, nama);

  // 2. Layer Titik-titik Panorama 360°
  const markersLayerGroup = L.layerGroup().addTo(map);
  renderSceneMarkers(markersLayerGroup, scenes, onSelectScene);

  mapInstances.set(containerId, {
    map,
    markersLayer: markersLayerGroup,
    onSelectScene,
  });

  // Resize listener
  setTimeout(() => {
    map.invalidateSize();
  }, 250);

  return map;
}

/**
 * Render satu penanda lokasi referensi utama
 */
function renderMainReferenceMarker(targetMap, lat, lng, nama) {
  const refIcon = L.divIcon({
    className: 'main-ref-marker-icon',
    html: `
      <div class="ref-location-pin" title="Lokasi Referensi Kawasan">
        <span class="ref-pin-core"></span>
        <span class="ref-pin-ring"></span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  const refMarker = L.marker([lat, lng], {
    icon: refIcon,
    zIndexOffset: 1000,
  }).addTo(targetMap);

  refMarker.bindPopup(`
    <div class="location-popup-card">
      <div class="popup-badge ref-badge">📍 Titik Referensi Acuan</div>
      <h4>${nama}</h4>
      <p style="font-size: 12px; margin-bottom: 6px;">
        <strong>Koordinat WGS84:</strong><br/>
        Latitude: <code>${lat}° N</code><br/>
        Longitude: <code>${lng}° E</code>
      </p>
      <p style="font-size: 11px; color: #6b7280; line-height: 1.4;">
        Koordinat ini digunakan sebagai titik acuan lokasi lapangan kawasan penanaman pohon ±2 hektare.
      </p>
    </div>
  `);
}

/**
 * Render marker titik panorama untuk memudahkan navigasi ke viewer
 */
function renderSceneMarkers(targetLayer, sceneList, onSelectScene) {
  if (!targetLayer) return;
  targetLayer.clearLayers();

  sceneList.forEach((scene) => {
    const isAvail = scene.status === 'tersedia';

    const icon = L.divIcon({
      className: 'scene-marker-icon',
      html: `
        <div class="scene-pin-badge ${isAvail ? 'ready' : 'pending'}" title="${scene.name}">
          <span>${scene.sequence}</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const marker = L.marker([scene.latitude, scene.longitude], { icon }).addTo(
      targetLayer
    );

    marker.bindPopup(`
      <div class="location-popup-card">
        <div class="popup-badge">Titik ${scene.sequence}</div>
        <h4>${scene.name}</h4>
        <p style="font-size: 12px; color: #4b5563; margin-bottom: 8px;">
          ${scene.description}
        </p>
        <div style="font-size: 11px; color: #6b7280; margin-bottom: 8px;">
          Status: <strong>${isAvail ? '✓ Foto Tersedia' : '⏳ Belum Tersedia'}</strong>
        </div>
        <button class="btn-popup-explore" data-target="${scene.id}">
          🔄 Buka di Virtual Tour 360°
        </button>
      </div>
    `);

    marker.on('popupopen', (e) => {
      const popupEl = e.popup.getElement();
      if (!popupEl) return;
      const btn = popupEl.querySelector('.btn-popup-explore');
      if (btn) {
        btn.onclick = () => {
          if (typeof onSelectScene === 'function') {
            onSelectScene(scene.id);
          }
        };
      }
    });
  });
}

/**
 * Refresh all map layouts
 */
export function invalidateLocationMapSize() {
  mapInstances.forEach(({ map }) => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
        map.setView(
          [
            projectConfig.lokasiReferensi.latitude,
            projectConfig.lokasiReferensi.longitude,
          ],
          17
        );
      }, 200);
    }
  });
}
