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

      <!-- KARTU 0: LOGO APLIKASI -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          🖼️ Logo Aplikasi & Header
        </h3>
        <p style="color: var(--clr-text-muted); font-size: 12px; margin-top: -6px; margin-bottom: 16px; line-height: 1.5;">
          Unggah logo resmi proyek/organisasi untuk ditampilkan pada bilah navigasi (Header) dan Footer. Format yang didukung: PNG, SVG, JPG, WebP (maks. 2 MB).
        </p>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 24px;">
          <!-- Logo Preview Box -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
            <div id="logo-preview-box" class="brand-logo-icon" style="width: 72px; height: 72px; border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #10b981 0%, #047857 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(16, 185, 129, 0.35); border: 1px solid rgba(255, 255, 255, 0.2);">
              ${serverSettings.app_logo ? `
                <img id="logo-preview-img" src="${escapeHtml(serverSettings.app_logo)}" alt="Logo Aplikasi" style="width: 100%; height: 100%; object-fit: contain; padding: 6px;" />
              ` : `
                <svg id="logo-preview-svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #fff;">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              `}
            </div>
            <span style="font-size: 11px; color: var(--clr-text-muted);">Pratinjau Logo</span>
          </div>

          <!-- Upload Controls -->
          <div style="flex: 1; min-width: 240px; display: flex; flex-direction: column; gap: 12px;">
            <form id="logo-upload-form" style="display: flex; flex-direction: column; gap: 12px;">
              <input type="file" id="input-app-logo" accept="image/png,image/jpeg,image/svg+xml,image/webp" style="display: none;" />
              <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
                <button type="button" id="btn-select-logo" class="btn-secondary-action btn-sm" style="display: flex; align-items: center; gap: 6px;">
                  📁 Pilih Berkas Logo...
                </button>
                <button type="submit" id="btn-upload-logo" class="btn-primary-action btn-sm" disabled style="display: flex; align-items: center; gap: 6px;">
                  ⬆️ Unggah Logo
                </button>
                <button type="button" id="btn-remove-logo" class="btn-danger-action btn-sm" style="display: ${serverSettings.app_logo ? 'flex' : 'none'}; align-items: center; gap: 6px; padding: 7px 12px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.35); color: #ef4444; border-radius: 6px; cursor: pointer;">
                  🗑️ Reset ke Default
                </button>
              </div>
              <span id="selected-logo-name" style="font-size: 12px; color: var(--clr-primary-light); font-family: monospace;">
                ${serverSettings.app_logo ? 'Logo aktif terpasang: ' + serverSettings.app_logo.split('/').pop() : 'Menggunakan logo bawaan vektor SVG'}
              </span>
            </form>
          </div>
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
            <input type="text" id="set-org-name" class="form-input" required value="${escapeHtml(serverSettings.org_name || 'IKHW Aceh (Inisiatif Konservasi & Hutan Wakaf)')}" />
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

      <!-- KARTU 2: DESKRIPSI PROGRAM DAN KAWASAN -->
      <div class="settings-card" style="background: var(--clr-surface); padding: 22px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <h3 style="color: #fff; font-size: 16px; margin-top: 0; margin-bottom: 14px; border-bottom: 1px solid var(--clr-border-subtle); padding-bottom: 8px;">
          📝 Deskripsi Program dan Kawasan
        </h3>
        <p style="color: var(--clr-text-muted); font-size: 12px; margin-top: -6px; margin-bottom: 14px; line-height: 1.5;">
          Deskripsi ini tampil pada halaman Beranda (Hero Banner) dan Informasi Kawasan (Gambaran Umum & Lokasi Referensi).
        </p>
        <form id="program-desc-form">
          <div class="form-group" style="margin-bottom: 16px;">
            <label for="set-program-description" style="color: #fff; font-size: 13px; font-weight: 600;">Deskripsi Program/Kawasan: *</label>
            <textarea id="set-program-description" class="form-input" rows="5" required style="line-height: 1.6; resize: vertical;" placeholder="Tulis deskripsi program dan kawasan restorasi...">${escapeHtml(serverSettings.program_description || 'Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.')}</textarea>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <button type="button" id="btn-cancel-program-desc" class="btn-secondary-action btn-sm">
              Batal
            </button>
            <button type="submit" class="btn-primary-action btn-sm">
              💾 Simpan Perubahan
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

  // Handle Logo Upload Form
  const fileInput = container.querySelector('#input-app-logo');
  const btnSelect = container.querySelector('#btn-select-logo');
  const btnUpload = container.querySelector('#btn-upload-logo');
  const btnRemove = container.querySelector('#btn-remove-logo');
  const logoForm = container.querySelector('#logo-upload-form');
  const previewBox = container.querySelector('#logo-preview-box');
  const selectedName = container.querySelector('#selected-logo-name');

  btnSelect?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', () => {
    const file = fileInput.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      EcoToast.error('Ukuran File Terlalu Besar', 'Ukuran logo maksimal 2 MB.');
      fileInput.value = '';
      if (btnUpload) btnUpload.disabled = true;
      return;
    }

    if (selectedName) {
      selectedName.textContent = `Berkas dipilih: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    }
    if (btnUpload) btnUpload.disabled = false;

    // Pratinjau lokal instan
    const reader = new FileReader();
    reader.onload = (e) => {
      if (previewBox) {
        previewBox.innerHTML = `<img src="${e.target.result}" alt="Pratinjau Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 6px;" />`;
      }
    };
    reader.readAsDataURL(file);
  });

  logoForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = fileInput.files?.[0];
    if (!file) {
      EcoToast.error('Pilih Berkas', 'Silakan pilih berkas logo terlebih dahulu.');
      return;
    }

    const formData = new FormData();
    formData.append('logo', file);

    if (btnUpload) {
      btnUpload.disabled = true;
      btnUpload.textContent = 'Mengunggah...';
    }

    try {
      const res = await ApiService.uploadLogo(formData);
      serverSettings.app_logo = res.logo_url;
      EcoToast.saved(res.message || 'Logo aplikasi berhasil diunggah.');
      if (btnRemove) btnRemove.style.display = 'flex';
      if (selectedName) selectedName.textContent = 'Logo aktif terpasang: ' + res.logo_url.split('/').pop();
      fileInput.value = '';

      // Terapkan logo baru ke Header dan Footer langsung di DOM
      updateDomAppLogo(res.logo_url);
    } catch (err) {
      EcoToast.error('✕ Gagal Mengunggah Logo', err.message);
    } finally {
      if (btnUpload) {
        btnUpload.disabled = true;
        btnUpload.textContent = '⬆️ Unggah Logo';
      }
    }
  });

  btnRemove?.addEventListener('click', async () => {
    if (!confirm('Kembalikan logo aplikasi ke ikon default bawaan?')) return;

    btnRemove.disabled = true;
    btnRemove.textContent = 'Mereset...';

    try {
      const res = await ApiService.removeLogo();
      serverSettings.app_logo = '';
      EcoToast.updated(res.message || 'Logo aplikasi telah dikembalikan ke default.');
      btnRemove.style.display = 'none';
      if (selectedName) selectedName.textContent = 'Menggunakan logo bawaan vektor SVG';
      if (previewBox) {
        previewBox.innerHTML = `
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #fff;">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        `;
      }
      fileInput.value = '';

      // Kembalikan logo di header & footer
      updateDomAppLogo('');
    } catch (err) {
      EcoToast.error('✕ Gagal Mereset Logo', err.message);
    } finally {
      btnRemove.disabled = false;
      btnRemove.textContent = '🗑️ Reset ke Default';
    }
  });

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

  // Handle Program Description Form
  const programDescForm = container.querySelector('#program-desc-form');
  const btnCancelDesc = container.querySelector('#btn-cancel-program-desc');
  const descTextarea = container.querySelector('#set-program-description');
  const initialProgramDesc = serverSettings.program_description || 'Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.';

  btnCancelDesc?.addEventListener('click', () => {
    if (descTextarea) {
      descTextarea.value = initialProgramDesc;
      EcoToast.info('Perubahan deskripsi dibatalkan.');
    }
  });

  programDescForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const val = descTextarea?.value?.trim();
    if (!val) {
      EcoToast.error('Validasi Gagal', 'Deskripsi program/kawasan tidak boleh kosong.');
      return;
    }

    const submitBtn = programDescForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Menyimpan...';
    }

    try {
      const res = await ApiService.saveSettings({
        program_description: val,
      });
      serverSettings.program_description = val;
      EcoToast.saved(res?.message || 'Deskripsi program dan kawasan berhasil disimpan.');

      // Update public page text if already rendered in DOM
      const heroDesc = document.getElementById('hero-desc');
      if (heroDesc) heroDesc.textContent = val;
      const infoGeneralDesc = document.getElementById('info-general-desc');
      if (infoGeneralDesc) infoGeneralDesc.textContent = val;
    } catch (err) {
      EcoToast.error('✕ Gagal menyimpan deskripsi', err.message);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '💾 Simpan Perubahan';
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

export function updateDomAppLogo(logoUrl) {
  const brandIcons = document.querySelectorAll('.brand-logo-icon');
  brandIcons.forEach((box) => {
    if (box.id === 'logo-preview-box') return; // Jangan ubah kotak preview di halaman settings jika tidak perlu
    if (logoUrl) {
      box.innerHTML = `<img src="${escapeHtml(logoUrl)}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" />`;
    } else {
      box.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      `;
    }
  });
}
