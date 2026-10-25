/**
 * Utility module — panorama loading helpers and empty-state rendering.
 */
export { EcoToast, showToast } from './utils/toast.js';
export { EcoModal } from './utils/modal.js';

/**
 * Check if an image URL exists by attempting to preload it.
 * @param {string} url
 * @returns {Promise<boolean>}
 */
export function imageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/**
 * Render an empty-state placeholder inside the pano element
 * when no panorama image is available for a survey point.
 * @param {object} sceneData — the scene config object
 */
export function renderEmptyState(sceneData) {
  removeEmptyState();

  const pano = document.getElementById('pano');
  if (!pano) return;

  const div = document.createElement('div');
  div.className = 'empty-state';
  div.id = 'empty-state';

  div.innerHTML = `
    <div class="empty-state-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    </div>
    <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); color: #fbbf24; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; margin-bottom: 8px;">
      Titik ${sceneData.sequence || '•'} • Status: Menunggu Pengambilan Foto Lapangan
    </div>
    <h3>${sceneData.name}</h3>
    <p>
      Foto panorama 360° lapangan untuk titik ini belum tersedia.<br/>
      Ambil bola panorama menggunakan aplikasi <strong>Go Street View</strong> di HP Android, lalu simpan file di:<br/>
      <code>${sceneData.panorama_path || sceneData.panorama}</code><br/><br/>
      Format didukung: <strong>.jpg</strong>, <strong>.png</strong>, <strong>.webp</strong><br/>
      Rasio aspek wajib: <strong>2:1 (Equirectangular)</strong> • Rekomendasi: <strong>4096×2048 px</strong>
    </p>
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <a href="#beranda" class="btn-primary-action" style="padding: 8px 16px; font-size: 12px; text-decoration: none;">
        🌿 Kembali ke Beranda
      </a>
    </div>
  `;

  pano.appendChild(div);
}

/**
 * Remove the empty state element if present.
 */
export function removeEmptyState() {
  const existing = document.getElementById('empty-state');
  if (existing) existing.remove();
}

/**
 * Update the tour top-bar title, description, and GPS coordinates.
 * @param {object} sceneData
 */
export function updateTourBar(sceneData) {
  const seqEl = document.getElementById('tour-scene-seq');
  const nameEl = document.getElementById('tour-scene-name');
  const descEl = document.getElementById('tour-scene-desc');
  const gpsEl = document.getElementById('tour-scene-gps');

  if (seqEl) seqEl.textContent = `Titik ${sceneData.sequence || '•'}`;
  if (nameEl) nameEl.textContent = sceneData.name || 'Virtual Tour 360°';
  if (descEl) descEl.textContent = sceneData.description || '';
  if (gpsEl && sceneData.latitude && sceneData.longitude) {
    gpsEl.textContent = `Titik Acuan: ${sceneData.latitude.toFixed(6)}° N, ${sceneData.longitude.toFixed(6)}° E`;
  }
}

// Backwards-compatible stubs for hot reloads
export function showLoading() {}
export function hideLoading() {}
export function showError(msg) { console.error('Error:', msg); }
export function hideError() {}
export function updateTopBar(title, description) {
  updateTourBar({ name: title, description });
}
