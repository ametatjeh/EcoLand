/**
 * Backup & Restore Controller (Cadangan dan Pemulihan)
 * Menangani ekspor JSON, validasi format impor, deteksi tabrakan ID, dan konfirmasi.
 */
import { ApiService } from '../services/api.js';
import { EcoToast } from '../utils/toast.js';

export function initBackupModule({ scenes, getHotspots, onRestoreComplete }) {
  const container = document.getElementById('admin-backup-content');
  if (!container) return;

  const validSceneIds = new Set(scenes.map((s) => s.id));

  container.innerHTML = `
    <div class="backup-grid">
      <!-- Card Ekspor Cadangan -->
      <div class="backup-card">
        <div class="backup-card-header">
          <div class="backup-icon">📥</div>
          <div>
            <h3>Ekspor Cadangan Konfigurasi Hotspot</h3>
            <p>Unduh seluruh data hotspot navigasi dan informasi dalam berkas JSON mandiri.</p>
          </div>
        </div>

        <div class="backup-card-body">
          <p>
            Berkas cadangan mencakup seluruh koordinat bola (yaw & pitch), status draft/published, judul, target navigasi, dan konten informasi saat ini.
          </p>
          <div class="backup-info-box">
            <strong>Catatan Penting:</strong> Cadangan ini berisi metadata konfigurasi hotspot, bukan file gambar tile panorama asli yang tersimpan di direktori server.
          </div>
          <button id="btn-export-json" class="btn-primary-action" style="margin-top: 16px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Unduh Cadangan JSON Sekarang
          </button>
        </div>
      </div>

      <!-- Card Pemulihan Cadangan -->
      <div class="backup-card">
        <div class="backup-card-header">
          <div class="backup-icon">📤</div>
          <div>
            <h3>Pemulihan (Impor) Konfigurasi Hotspot</h3>
            <p>Pulihkan titik hotspot dari berkas cadangan JSON yang valid.</p>
          </div>
        </div>

        <div class="backup-card-body">
          <p>Pilih file cadangan JSON dari perangkat Anda. Sistem akan memvalidasi kompatibilitas scene sebelum menerapkannya.</p>

          <div class="backup-dropzone" id="backup-dropzone">
            <input type="file" id="backup-file-input" accept=".json,application/json" style="display: none;" />
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9M8 17l4-4 4 4"/>
            </svg>
            <p>Seret dan lepas file JSON di sini, atau <button type="button" class="btn-text-link" id="btn-browse-file">Pilih Berkas</button></p>
            <span class="file-hint">Format yang didukung: JSON Cadangan Marzipano Hotspot</span>
          </div>

          <!-- Preview & Validation Area -->
          <div id="import-validation-box" class="import-validation-box hidden">
            <h4>Hasil Validasi Berkas Cadangan:</h4>
            <div id="import-validation-summary" class="val-summary"></div>
            <div class="val-actions">
              <button id="btn-confirm-import" class="btn-primary-action btn-sm">Terapkan Pemulihan</button>
              <button id="btn-cancel-import" class="btn-secondary-action btn-sm">Batal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 1. Ekspor Handler
  container.querySelector('#btn-export-json')?.addEventListener('click', async () => {
    try {
      const data = await ApiService.exportBackup();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const filename = `marzipano_hotspots_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      EcoToast.saved('Data cadangan berhasil diekspor.');
    } catch (err) {
      EcoToast.error('✕ Gagal mengekspor data cadangan', err.message);
    }
  });

  // 2. Impor File Handlers
  const fileInput = container.querySelector('#backup-file-input');
  const btnBrowse = container.querySelector('#btn-browse-file');
  const dropzone = container.querySelector('#backup-dropzone');
  const valBox = container.querySelector('#import-validation-box');
  const valSummary = container.querySelector('#import-validation-summary');
  const btnConfirm = container.querySelector('#btn-confirm-import');
  const btnCancel = container.querySelector('#btn-cancel-import');

  let pendingImportData = null;

  btnBrowse?.addEventListener('click', () => fileInput?.click());

  dropzone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });

  dropzone?.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
  });

  dropzone?.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    if (e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  });

  fileInput?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  });

  function processFile(file) {
    if (!file.name.endsWith('.json')) {
      EcoToast.error('✕ Format berkas tidak valid', 'Hanya berkas berformat .json yang dapat dipulihkan.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const json = JSON.parse(evt.target.result);
        validateAndShowSummary(json);
      } catch (err) {
        EcoToast.error('✕ Format JSON tidak valid', err.message);
      }
    };
    reader.readAsText(file);
  }

  function validateAndShowSummary(json) {
    let hotspotsList = [];
    if (Array.isArray(json.hotspots)) hotspotsList = json.hotspots;
    else if (json.data && Array.isArray(json.data.hotspots)) hotspotsList = json.data.hotspots;
    else {
      EcoToast.error('✕ Struktur berkas tidak valid', 'Tidak ditemukan array hotspots pada berkas JSON.');
      return;
    }

    // Deteksi scene yang cocok dan tidak cocok
    let matchedSceneCount = 0;
    let unmatchedScenes = new Set();
    let brokenTargets = 0;

    const currentHotspots = getHotspots();
    const existingIds = new Set(currentHotspots.map((h) => h.id));
    let collidingIds = 0;

    hotspotsList.forEach((h) => {
      if (validSceneIds.has(h.sceneId)) {
        matchedSceneCount++;
      } else {
        unmatchedScenes.add(h.sceneId);
      }

      if (h.type === 'link' && !validSceneIds.has(h.target)) {
        brokenTargets++;
      }

      if (existingIds.has(h.id)) {
        collidingIds++;
      }
    });

    pendingImportData = json;

    valSummary.innerHTML = `
      <ul class="val-list">
        <li><strong>Total Hotspot Ditemukan:</strong> ${hotspotsList.length} titik</li>
        <li><strong>Hotspot dengan Scene Cocok:</strong> ${matchedSceneCount} titik</li>
        ${
          unmatchedScenes.size > 0
            ? `<li class="val-warn">⚠️ <strong>Scene Tidak Dikenal:</strong> ${Array.from(unmatchedScenes).join(', ')}</li>`
            : '<li class="val-ok">✓ Semua ID scene asal terdaftar pada sistem.</li>'
        }
        ${
          brokenTargets > 0
            ? `<li class="val-warn">⚠️ <strong>Target Navigasi Tidak Dikenal:</strong> ${brokenTargets} titik</li>`
            : '<li class="val-ok">✓ Semua tujuan navigasi valid.</li>'
        }
        <li><strong>ID yang Tumpang Tindih (Akan diperbarui):</strong> ${collidingIds} titik</li>
      </ul>
      <p style="font-size: 13px; color: var(--clr-text-muted); margin-top: 8px;">
        Menerapkan cadangan ini akan memperbarui dataset hotspot di server. Lanjutkan?
      </p>
    `;

    valBox.classList.remove('hidden');
  }

  btnConfirm?.addEventListener('click', async () => {
    if (!pendingImportData) return;
    try {
      btnConfirm.disabled = true;
      btnConfirm.textContent = 'Memulihkan...';
      const res = await ApiService.importBackup(pendingImportData);
      EcoToast.imported(res?.message || 'Pemulihan cadangan berhasil diterapkan!');
      valBox.classList.add('hidden');
      pendingImportData = null;
      if (onRestoreComplete) onRestoreComplete();
    } catch (err) {
      EcoToast.error('✕ Gagal memulihkan cadangan', err.message);
    } finally {
      btnConfirm.disabled = false;
      btnConfirm.textContent = 'Terapkan Pemulihan';
    }
  });

  btnCancel?.addEventListener('click', () => {
    valBox.classList.add('hidden');
    pendingImportData = null;
    if (fileInput) fileInput.value = '';
  });
}
