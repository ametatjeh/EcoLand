/**
 * Panorama Management Controller
 * Menampilkan daftar seluruh scene, thumbnail, statistik hotspot, dan fungsi edit nama,
 * deskripsi, sudut pandang awal (initial view), relasi kawasan, dan status scene.
 */
import { ApiService } from '../services/api.js';
import { EcoToast } from '../utils/toast.js';

let cachedZones = [];

export async function renderPanoramaManagement({
  scenes,
  hotspots,
  onOpenEditorForScene,
  onPreviewScene,
  onScenesUpdated,
}) {
  const container = document.getElementById('admin-panoramas-content');
  if (!container) return;

  try {
    const zonesRes = await ApiService.getZones();
    cachedZones = zonesRes.zones || [];
  } catch (e) {
    cachedZones = [];
  }

  const getSceneStats = (sceneId) => {
    const sceneHotspots = hotspots.filter((h) => h.sceneId === sceneId);
    return {
      links: sceneHotspots.filter((h) => h.type === 'link').length,
      infos: sceneHotspots.filter((h) => h.type === 'info').length,
      drafts: sceneHotspots.filter((h) => h.status === 'draft').length,
      total: sceneHotspots.length,
      list: sceneHotspots,
    };
  };

  container.innerHTML = `
    <div class="admin-section-header">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; width: 100%;">
        <div>
          <h2>🌐 Manajemen Panorama (${scenes.length} Scene)</h2>
          <p>Kelola seluruh panorama 360°, ubah nama tampilan, deskripsi, tautkan ke kawasan restorasi, dan atur sudut pandang awal.</p>
        </div>
      </div>
    </div>

    <div class="admin-panoramas-grid">
      ${scenes
        .map((s, idx) => {
          const stats = getSceneStats(s.id);
          const thumbUrl = `/tiles/${s.id}/preview.jpg`;
          const isAvail = s.status === 'tersedia';
          const zoneObj = cachedZones.find((z) => z.id === s.planting_zone_id);

          return `
            <div class="admin-pano-card" data-scene-id="${s.id}">
              <div class="pano-card-media">
                <img src="${thumbUrl}" alt="${escapeHtml(s.name)}" class="pano-card-thumb" onerror="this.onerror=null; this.src='/img/placeholder-360.svg';" />
                <div class="pano-card-overlay">
                  <span class="pano-seq-badge">Titik #${s.sequence || idx + 1}</span>
                  <span class="pano-status-badge ${isAvail ? 'ready' : 'missing'}">
                    ${isAvail ? '✓ Aset Tile Siap' : '⏳ Menunggu Foto'}
                  </span>
                </div>
              </div>

              <div class="pano-card-body">
                <div class="pano-card-title-row">
                  <h3 class="pano-display-name" id="name-display-${s.id}">${escapeHtml(s.name)}</h3>
                  <button class="btn-edit-title-icon btn-config-scene" data-scene-id="${s.id}" title="Edit Konfigurasi Scene">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                  </button>
                </div>

                <div class="pano-id-badge">
                  <span>ID Scene:</span>
                  <code>${s.id}</code>
                </div>

                ${
                  zoneObj
                    ? `<div style="margin-bottom: 8px;">
                        <span class="admin-header-pill pill-success" style="font-size: 11px;">
                          🏞️ ${escapeHtml(zoneObj.name)}
                        </span>
                      </div>`
                    : ''
                }

                <div class="pano-stats-chips">
                  <span class="pano-chip chip-link" title="Hotspot Navigasi Keluar">
                    🧭 ${stats.links} Navigasi
                  </span>
                  <span class="pano-chip chip-info" title="Hotspot Informasi">
                    ℹ️ ${stats.infos} Informasi
                  </span>
                  ${
                    stats.drafts > 0
                      ? `<span class="pano-chip chip-draft" title="Hotspot Draft">
                          📝 ${stats.drafts} Draft
                        </span>`
                      : ''
                  }
                </div>

                <div class="pano-meta-details">
                  <div><strong>Deskripsi:</strong> ${escapeHtml(s.description || 'Belum ada deskripsi')}</div>
                  <div><strong>Lokasi Acuan:</strong> ${s.latitude ? s.latitude.toFixed(6) : '-'}° N, ${s.longitude ? s.longitude.toFixed(6) : '-'}° E</div>
                  <div><strong>Sudut Pandang Awal:</strong> Yaw: ${s.initialViewParameters?.yaw?.toFixed(2) ?? '0.00'} rad, Pitch: ${s.initialViewParameters?.pitch?.toFixed(2) ?? '0.00'} rad</div>
                </div>

                <div class="pano-card-actions">
                  <button class="btn-primary-action btn-sm btn-open-editor" data-scene-id="${s.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                    </svg>
                    Buka Editor
                  </button>
                  <button class="btn-secondary-action btn-sm btn-config-scene" data-scene-id="${s.id}">
                    ⚙️ Edit Scene
                  </button>
                  <button class="btn-secondary-action btn-sm btn-preview-scene" data-scene-id="${s.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M10 8l6 4-6 4V8z"/>
                    </svg>
                    Pratinjau
                  </button>
                </div>
              </div>
            </div>
          `;
        })
        .join('')}
    </div>

    <!-- Modal Edit Konfigurasi Scene -->
    <div id="modal-config-scene" class="admin-modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="modal-config-scene-title">
      <div class="admin-modal-box" style="max-width: 620px;">
        <div class="admin-modal-header">
          <h3 id="modal-config-scene-title">⚙️ Edit Konfigurasi Panorama</h3>
          <button type="button" id="btn-close-config-scene-modal" class="icon-btn-sm" title="Tutup Popup">✕</button>
        </div>
        <form id="form-config-scene" style="display: flex; flex-direction: column; margin: 0; min-height: 0; overflow: hidden;">
          <div class="admin-modal-body" style="display: flex; flex-direction: column; gap: 14px; max-height: calc(85vh - 130px); overflow-y: auto;">
            <input type="hidden" id="cfg-scene-id" />

            <div class="form-group">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                Nama Tampilan Scene: <span style="color: #ef4444;">*</span>
              </label>
              <input type="text" id="cfg-scene-name" class="form-input" required />
              <small style="color: var(--clr-text-muted); font-size: 11px;">Nama yang tampil di viewer dan daftar titik.</small>
            </div>

            <div class="form-group">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                Deskripsi Scene:
              </label>
              <textarea id="cfg-scene-desc" class="form-textarea" rows="2"></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                  Tautkan ke Kawasan:
                </label>
                <select id="cfg-scene-zone" class="form-select">
                  <option value="">-- Tanpa Kawasan --</option>
                  ${cachedZones.map((z) => `<option value="${z.id}">${escapeHtml(z.name)}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 4px; display: block;">
                  Status Scene:
                </label>
                <select id="cfg-scene-status" class="form-select">
                  <option value="tersedia">✓ Tersedia (Aktif)</option>
                  <option value="menunggu_foto">⏳ Menunggu Foto</option>
                  <option value="diarsipkan">📦 Diarsipkan</option>
                </select>
              </div>
            </div>

            <div style="border-top: 1px solid var(--clr-border-subtle); padding-top: 12px;">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Sudut Pandang Awal (Initial View Parameters):
              </label>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                <div>
                  <label style="color: var(--clr-text-muted); font-size: 11px;">Initial Yaw (rad):</label>
                  <input type="number" step="0.001" id="cfg-scene-yaw" class="form-input" />
                </div>
                <div>
                  <label style="color: var(--clr-text-muted); font-size: 11px;">Initial Pitch (rad):</label>
                  <input type="number" step="0.001" id="cfg-scene-pitch" class="form-input" />
                </div>
                <div>
                  <label style="color: var(--clr-text-muted); font-size: 11px;">Initial FOV (rad):</label>
                  <input type="number" step="0.001" id="cfg-scene-fov" class="form-input" />
                </div>
              </div>
            </div>

            <!-- Hotspot List in Scene -->
            <div style="border-top: 1px solid var(--clr-border-subtle); padding-top: 12px;">
              <label style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom: 6px; display: block;">
                Hotspot Terpasang di Scene Ini:
              </label>
              <div id="cfg-scene-hotspots-list" style="max-height: 140px; overflow-y: auto; background: rgba(255,255,255,0.03); border-radius: 6px; padding: 8px; font-size: 12px; display: flex; flex-direction: column; gap: 4px;">
              </div>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button type="button" id="btn-cancel-config-scene" class="btn-secondary-action">Batal</button>
            <button type="submit" class="btn-primary-action">💾 Simpan Perubahan Scene</button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Attach button events
  container.querySelectorAll('.btn-open-editor').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sceneId = btn.getAttribute('data-scene-id');
      if (onOpenEditorForScene) onOpenEditorForScene(sceneId);
    });
  });

  container.querySelectorAll('.btn-preview-scene').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sceneId = btn.getAttribute('data-scene-id');
      if (onPreviewScene) onPreviewScene(sceneId);
    });
  });

  // Modal handlers
  const modal = document.getElementById('modal-config-scene');
  const form = document.getElementById('form-config-scene');

  container.querySelectorAll('.btn-config-scene').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sceneId = btn.getAttribute('data-scene-id');
      const scene = scenes.find((s) => s.id === sceneId);
      if (!scene) return;

      document.getElementById('cfg-scene-id').value = scene.id;
      document.getElementById('cfg-scene-name').value = scene.name;
      document.getElementById('cfg-scene-desc').value = scene.description || '';
      document.getElementById('cfg-scene-zone').value = scene.planting_zone_id || '';
      document.getElementById('cfg-scene-status').value = scene.status || 'tersedia';
      document.getElementById('cfg-scene-yaw').value = scene.initialViewParameters?.yaw ?? 0;
      document.getElementById('cfg-scene-pitch').value = scene.initialViewParameters?.pitch ?? 0;
      document.getElementById('cfg-scene-fov').value = scene.initialViewParameters?.fov ?? 1.395;
      document.getElementById('modal-config-scene-title').textContent = `⚙️ Edit Panorama: ${scene.name} (${scene.id})`;

      const stats = getSceneStats(scene.id);
      const hsListEl = document.getElementById('cfg-scene-hotspots-list');
      if (stats.list.length > 0) {
        hsListEl.innerHTML = stats.list
          .map(
            (hs) => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 6px; background: rgba(255,255,255,0.02); border-radius: 4px;">
            <span>${hs.type === 'link' ? '🧭' : 'ℹ️'} <strong>${escapeHtml(hs.title || '(Tanpa Judul)')}</strong> <code style="font-size: 10px; color: var(--clr-text-muted);">(${hs.type})</code></span>
            <span style="font-size: 10px; color: ${hs.status === 'published' ? '#34d399' : '#f59e0b'};">${hs.status}</span>
          </div>
        `
          )
          .join('');
      } else {
        hsListEl.innerHTML = `<span style="color: var(--clr-text-muted); font-size: 11px;">Belum ada hotspot pada scene ini.</span>`;
      }

      modal.classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('cfg-scene-name')?.focus();
      }, 50);
    });
  });

  const closeModal = () => modal?.classList.add('hidden');
  document.getElementById('btn-close-config-scene-modal')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel-config-scene')?.addEventListener('click', closeModal);

  // Close when clicking backdrop
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Global Escape key handler
  if (!window._adminPanoModalEscAttached) {
    window._adminPanoModalEscAttached = true;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const m = document.getElementById('modal-config-scene');
        if (m && !m.classList.contains('hidden')) {
          m.classList.add('hidden');
        }
      }
    });
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const sceneId = document.getElementById('cfg-scene-id').value;
    const scene = scenes.find((s) => s.id === sceneId);
    if (!scene) return;

    const payload = {
      name: document.getElementById('cfg-scene-name').value.trim(),
      description: document.getElementById('cfg-scene-desc').value.trim(),
      planting_zone_id: document.getElementById('cfg-scene-zone').value || null,
      status: document.getElementById('cfg-scene-status').value,
      initial_yaw: parseFloat(document.getElementById('cfg-scene-yaw').value) || 0,
      initial_pitch: parseFloat(document.getElementById('cfg-scene-pitch').value) || 0,
      initial_fov: parseFloat(document.getElementById('cfg-scene-fov').value) || 1.395,
    };

    const submitBtn = form?.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Menyimpan...';
    }

    try {
      await ApiService.updateScene(sceneId, payload);
      scene.name = payload.name;
      scene.description = payload.description;
      scene.planting_zone_id = payload.planting_zone_id;
      scene.status = payload.status;
      if (!scene.initialViewParameters) scene.initialViewParameters = {};
      scene.initialViewParameters.yaw = payload.initial_yaw;
      scene.initialViewParameters.pitch = payload.initial_pitch;
      scene.initialViewParameters.fov = payload.initial_fov;

      modal.classList.add('hidden');
      EcoToast.saved(`Konfigurasi scene '${scene.name}' berhasil disimpan.`);
      if (onScenesUpdated) onScenesUpdated();
      renderPanoramaManagement({
        scenes,
        hotspots,
        onOpenEditorForScene,
        onPreviewScene,
        onScenesUpdated,
      });
    } catch (err) {
      EcoToast.error('✕ Gagal menyimpan konfigurasi', err.message);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '💾 Simpan Konfigurasi Scene';
      }
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
