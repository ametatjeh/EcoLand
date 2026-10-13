/**
 * Display Settings & Organization Identity Controller (Pengaturan Aplikasi & Identitas Organisasi)
 */
import { ApiService } from '../services/api.js';
import { EcoToast } from '../utils/toast.js';

const SETTINGS_KEY = 'vtour_display_settings';

const DEFAULT_SETTINGS = {
  defaultScene: '0-1-pano_20261004_100402_6',
  autorotate: false,
  autorotateSpeed: 1.0,
  hotspotAnimation: 'pulse',
  showTooltipsByDefault: true,
  themeAccent: '#2ecc71',
};

export function getDisplaySettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveDisplaySettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function initSettingsModule({ scenes = [], onSettingsUpdated } = {}) {
  const container = document.getElementById('admin-settings-content');
  if (!container) return;

  const currentDisplay = getDisplaySettings();
  let serverSettings = {};

  try {
    const sRes = await ApiService.getSettings();
    serverSettings = sRes.flat || {};
  } catch (e) {
    console.warn('Gagal memuat settings dari server:', e);
  }

  const sceneOptions = scenes
    .map(
      (s) =>
        `<option value="${s.id}" ${s.id === currentDisplay.defaultScene ? 'selected' : ''}>${s.name} (${s.id})</option>`
    )
    .join('');

  container.innerHTML = `
    <div class="settings-container" style="max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
      <div class="admin-section-header">
        <div>
          <h2 style="display: flex; align-items: center; gap: 8px; margin: 0; font-size: 20px; font-weight: 700; color: #fff;">
            <span>⚙️</span> Pengaturan Sistem & Identitas Organisasi
          </h2>
          <p style="color: var(--clr-text-muted); font-size: 13px; margin-top: 4px;">
            Konfigurasi identitas pengelola, judul proyek, parameter visual Marzipano, dan parameter aplikasi.
          </p>
        </div>
      </div>

      <!-- KARTU 1: IDENTITAS ORGANISASI -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          🏢 Identitas Organisasi & Kontak
        </h3>
        <form id="org-settings-form">
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="set-org-name" style="color: #fff; font-size: 13px;">Nama Organisasi / Pengelola Proyek: *</label>
            <input type="text" id="set-org-name" class="form-input" required value="${escapeHtml(serverSettings.org_name || 'IKHW Aceh (Inisiatif Konservasi & Hutan Wisata)')}" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 14px;">
            <div class="form-group">
              <label for="set-org-email" style="color: #fff; font-size: 13px;">Email Kontak Resmi:</label>
              <input type="email" id="set-org-email" class="form-input" value="${escapeHtml(serverSettings.org_contact_email || 'info@ikhw.org')}" />
            </div>
            <div class="form-group">
              <label for="set-app-title" style="color: #fff; font-size: 13px;">Judul Sistem / Header:</label>
              <input type="text" id="set-app-title" class="form-input" value="${escapeHtml(serverSettings.app_title || 'Eco Land — Kawasan Penanaman Pohon & Virtual Tour 360°')}" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label for="set-org-address" style="color: #fff; font-size: 13px;">Alamat Kantor Organisasi:</label>
            <textarea id="set-org-address" class="form-input" rows="2">${escapeHtml(serverSettings.org_address || 'Banda Aceh, Provinsi Aceh, Indonesia')}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <button type="submit" class="btn-primary-action btn-sm">
              💾 Simpan Identitas Organisasi
            </button>
          </div>
        </form>
      </div>

      <!-- KARTU 2: PENGATURAN VIRTUAL TOUR & TAMPILAN -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          🌐 Pengaturan Tampilan Virtual Tour 360°
        </h3>
        <form id="display-settings-form">
          <div class="form-group" style="margin-bottom: 14px;">
            <label for="set-default-scene" style="color: #fff; font-size: 13px;">Panorama Pembuka Utama (Default Scene):</label>
            <select id="set-default-scene" class="form-select">
              ${sceneOptions}
            </select>
            <small class="form-help-text" style="color: var(--clr-text-muted); font-size: 11px;">Panorama yang pertama kali dimuat saat pengunjung membuka menu Virtual Tour 360°.</small>
          </div>

          <div class="form-group" style="margin-bottom: 14px;">
            <label for="set-animation" style="color: #fff; font-size: 13px;">Animasi Hotspot Marzipano:</label>
            <select id="set-animation" class="form-select">
              <option value="pulse" ${currentDisplay.hotspotAnimation === 'pulse' ? 'selected' : ''}>Pulsing Glow (Berdenyut Halus)</option>
              <option value="bounce" ${currentDisplay.hotspotAnimation === 'bounce' ? 'selected' : ''}>Floating Bob (Melayang)</option>
              <option value="static" ${currentDisplay.hotspotAnimation === 'static' ? 'selected' : ''}>Statis Sederhana</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 18px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: #fff; font-size: 13px;">
              <input type="checkbox" id="set-tooltips" ${currentDisplay.showTooltipsByDefault ? 'checked' : ''} />
              <span>Tampilkan label tooltip nama lokasi pada hotspot navigasi secara langsung</span>
            </label>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button type="button" id="btn-reset-settings" class="btn-secondary-action btn-sm">
              Kembalikan ke Default
            </button>
            <button type="submit" class="btn-primary-action btn-sm">
              💾 Simpan Pengaturan Tampilan
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  // Handle Org Form
  const orgForm = container.querySelector('#org-settings-form');
  orgForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      org_name: container.querySelector('#set-org-name').value.trim(),
      org_contact_email: container.querySelector('#set-org-email').value.trim(),
      app_title: container.querySelector('#set-app-title').value.trim(),
      org_address: container.querySelector('#set-org-address').value.trim(),
    };

    const submitBtn = orgForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Menyimpan...';
    }

    try {
      const res = await ApiService.saveSettings(payload);
      EcoToast.saved(res?.message || 'Identitas organisasi berhasil disimpan ke database.');
    } catch (err) {
      EcoToast.error('✕ Gagal menyimpan identitas', err.message);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '💾 Simpan Identitas Organisasi';
      }
    }
  });

  // Handle Display Form
  const displayForm = container.querySelector('#display-settings-form');
  const btnReset = container.querySelector('#btn-reset-settings');

  displayForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSettings = {
      ...currentDisplay,
      defaultScene: container.querySelector('#set-default-scene').value,
      hotspotAnimation: container.querySelector('#set-animation').value,
      showTooltipsByDefault: container.querySelector('#set-tooltips').checked,
    };
    saveDisplaySettings(newSettings);
    EcoToast.saved('Pengaturan tampilan berhasil disimpan.');
    if (onSettingsUpdated) onSettingsUpdated(newSettings);
  });

  btnReset?.addEventListener('click', () => {
    if (confirm('Kembalikan seluruh pengaturan tampilan ke pengaturan default?')) {
      saveDisplaySettings(DEFAULT_SETTINGS);
      EcoToast.updated('Pengaturan tampilan berhasil dikembalikan ke default.');
      initSettingsModule({ scenes, onSettingsUpdated });
      if (onSettingsUpdated) onSettingsUpdated(DEFAULT_SETTINGS);
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
