/**
 * Go Street View (Android) Integration & Validation Module
 * Provides field workflow instructions, image aspect ratio (2:1) validator,
 * GPS metadata verification, and panorama status matrix.
 */
import scenes from './data/scenes.js';
import { imageExists } from './utils.js';

/**
 * Validate an uploaded image file for equirectangular 360° compatibility
 * @param {File} file
 * @returns {Promise<{ valid: boolean, width: number, height: number, ratio: number, errors: string[], warnings: string[] }>}
 */
export function validatePanoramaFile(file) {
  return new Promise((resolve) => {
    const errors = [];
    const warnings = [];

    // 1. File Type Check
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      errors.push(`Format file "${file.type}" tidak didukung. Gunakan JPG (.jpg), PNG (.png), atau WebP (.webp).`);
    }

    // 2. File Size Check (Warn if > 25MB or < 500KB)
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > 25) {
      warnings.push(`Ukuran file cukup besar (${sizeMb.toFixed(1)} MB). Pertimbangkan kompresi ke 4-10 MB untuk kecepatan koneksi seluler Android.`);
    } else if (sizeMb < 0.4) {
      warnings.push(`Ukuran file sangat kecil (${sizeMb.toFixed(2)} MB). Pastikan resolusi cukup tajam untuk panorama 360°.`);
    }

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      const ratio = width / height;

      // 3. Aspect Ratio 2:1 Check (Tolerance 1.95 - 2.05)
      const isEquirectangular = Math.abs(ratio - 2.0) <= 0.05;
      if (!isEquirectangular) {
        errors.push(
          `Rasio aspek gambar adalah ${ratio.toFixed(2)}:1 (${width}×${height}px). Foto 360° equirectangular WAJIB memiliki rasio 2:1 (lebar tepat 2 kali tinggi). Foto ini kemungkinan adalah foto flat biasa, bukan bola panorama 360°.`
        );
      }

      // 4. Resolution Recommendation
      if (width < 2048) {
        warnings.push(`Resolusi (${width}×${height}px) di bawah standar rekomendasi minimal 4096×2048px.`);
      }

      URL.revokeObjectURL(objectUrl);
      resolve({
        valid: errors.length === 0,
        width,
        height,
        ratio,
        sizeMb,
        errors,
        warnings,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      errors.push('Gagal membaca data gambar. File mungkin korup atau bukan gambar yang valid.');
      resolve({
        valid: false,
        width: 0,
        height: 0,
        ratio: 0,
        sizeMb,
        errors,
        warnings,
      });
    };

    img.src = objectUrl;
  });
}

/**
 * Check live status of all scenes in the project
 * @returns {Promise<Array>}
 */
export async function auditPanoramaStatuses() {
  const results = [];
  for (const scene of scenes) {
    const exists = await imageExists(scene.panorama);
    results.push({
      ...scene,
      liveExists: exists,
      effectiveStatus: exists ? 'tersedia' : 'belum_tersedia',
    });
  }
  return results;
}

/**
 * Initialize the interactive Go Street View guide & validator UI
 * @param {string} containerId
 * @param {Function} onTestInViewer - Optional callback to preview in Marzipano
 */
export function initStreetViewGuide(containerId, onTestInViewer) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="gsv-guide-wrapper">
      <div class="gsv-header">
        <div class="gsv-badge">📱 Panduan Lapangan Android</div>
        <h2>Integrasi Foto Go Street View ke Virtual Tour</h2>
        <p>
          Langkah demi langkah pengambilan foto bola 360° menggunakan aplikasi <strong>Go Street View</strong> di HP Android,
          verifikasi rasio equirectangular 2:1, dan pemetaan ke titik koordinat kawasan 2 hektare.
        </p>
      </div>

      <!-- Step Cards -->
      <div class="gsv-steps-grid">
        <div class="gsv-step-card">
          <div class="step-num">01</div>
          <h4>Pengambilan Foto di HP Android</h4>
          <p>
            Buka aplikasi Go Street View di titik survei. Berdirilah di satu titik poros dan putar HP mengikuti panduan titik oranye hingga seluruh bola panorama (360° horizontal & 180° vertikal) terhubung.
          </p>
          <div class="step-note">💡 Gunakan monopod atau pegang HP stabil setinggi dada.</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">02</div>
          <h4>Catat Koordinat & Urutan</h4>
          <p>
            Pastikan GPS aktif dengan akurasi tinggi. Cocokkan titik pengambilan dengan salah satu dari <strong>6 Titik Survei</strong> yang telah ditentukan pada tata letak kawasan.
          </p>
          <div class="step-note">📍 Titik 3 adalah patok acuan sentral (5.4818556° N, 95.5840917° E).</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">03</div>
          <h4>Uji Validasi Rasio 2:1</h4>
          <p>
            Gunakan kotak penguji di bawah untuk memeriksa apakah file foto yang diekspor dari HP memiliki rasio equirectangular 2:1 dan siap ditampilkan di Marzipano.
          </p>
          <div class="step-note">🔍 Validasi otomatis mendeteksi dimensi dan format.</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">04</div>
          <h4>Simpan ke Folder Tanpa Mengubah Kode</h4>
          <p>
            Pindahkan file ke folder <code>public/tours/titik-X/panorama.jpg</code>. Aplikasi secara instan mengganti placeholder menjadi panorama 360° aktif.
          </p>
          <div class="step-note">⚡ Tidak perlu kompilasi ulang atau ubah script!</div>
        </div>
      </div>

      <!-- Interactive Validator Dropzone -->
      <div class="gsv-validator-box">
        <h3>🔍 Alat Uji & Validasi Foto Panorama</h3>
        <p>Pilih foto hasil tangkapan Go Street View untuk menguji kompatibilitasnya sebelum dipindahkan ke proyek:</p>

        <div class="dropzone" id="gsv-dropzone">
          <input type="file" id="gsv-file-input" accept="image/jpeg,image/png,image/webp" style="display: none;" />
          <div class="dropzone-inner" id="dropzone-prompt">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p><strong>Klik untuk memilih foto</strong> atau seret file ke sini</p>
            <span style="font-size: 12px; color: #6b7280;">Format: JPG, PNG, WebP (Rasio Wajib 2:1)</span>
          </div>
        </div>

        <div id="gsv-validation-result" class="gsv-result-box hidden"></div>
      </div>

      <!-- Status Matrix Table -->
      <div class="gsv-status-table-box">
        <h3>📊 Matriks Status Panorama Lapangan (6 Titik)</h3>
        <p>Status ketersediaan file panorama aktual pada direktori <code>public/tours/</code>:</p>
        <div class="table-responsive">
          <table class="status-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Titik</th>
                <th>Koordinat GPS</th>
                <th>Koneksi Hotspot</th>
                <th>Lokasi File</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="gsv-matrix-body">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Attach dropzone listeners
  const dropzone = container.querySelector('#gsv-dropzone');
  const fileInput = container.querySelector('#gsv-file-input');
  const resultBox = container.querySelector('#gsv-validation-result');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleFileValidation(e.dataTransfer.files[0], resultBox);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFileValidation(e.target.files[0], resultBox);
      }
    });
  }

  // Render Table
  renderMatrixTable();
}

/**
 * Handle validation and render feedback card
 */
async function handleFileValidation(file, resultBox) {
  resultBox.classList.remove('hidden');
  resultBox.innerHTML = `
    <div style="padding: 16px; text-align: center; color: #4b5563;">
      <div class="loading-spinner" style="width: 28px; height: 28px; margin: 0 auto 10px;"></div>
      Menganalisis resolusi, format, dan rasio aspek foto...
    </div>
  `;

  const res = await validatePanoramaFile(file);

  if (res.valid) {
    resultBox.innerHTML = `
      <div class="alert-box success">
        <div class="alert-icon">✓</div>
        <div class="alert-content">
          <h4>Foto Valid Equirectangular 360°!</h4>
          <p>
            Dimensi: <strong>${res.width} × ${res.height} px</strong> (Rasio <strong>${res.ratio.toFixed(2)}:1</strong>)<br/>
            Ukuran Berkas: <strong>${res.sizeMb.toFixed(2)} MB</strong> (${file.type})
          </p>
          <div style="margin-top: 10px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 6px;">
            <strong>Langkah Selanjutnya:</strong><br/>
            1. Tentukan untuk titik mana foto ini diambil (misal: Titik 1).<br/>
            2. Ganti nama file menjadi <code>panorama.jpg</code>.<br/>
            3. Simpan di: <code>public/tours/titik-X/panorama.jpg</code>.
          </div>
        </div>
      </div>
    `;
  } else {
    resultBox.innerHTML = `
      <div class="alert-box error">
        <div class="alert-icon">✕</div>
        <div class="alert-content">
          <h4>Foto Tidak Memenuhi Standar Panorama 360°</h4>
          <ul style="margin: 8px 0 8px 16px; font-size: 13px;">
            ${res.errors.map((e) => `<li>${e}</li>`).join('')}
          </ul>
          <p style="font-size: 12px; color: #6b7280;">
            Solusi: Pastikan foto diambil dalam mode 360° Sphere pada aplikasi Go Street View, bukan foto panorama panorama horizontal biasa.
          </p>
        </div>
      </div>
    `;
  }
}

/**
 * Render matrix status table
 */
async function renderMatrixTable() {
  const tbody = document.getElementById('gsv-matrix-body');
  if (!tbody) return;

  const statuses = await auditPanoramaStatuses();

  tbody.innerHTML = statuses
    .map((s) => {
      const isOk = s.liveExists;
      return `
        <tr>
          <td style="font-weight: 700; color: #10b981;">#${s.sequence}</td>
          <td><strong>${s.name}</strong></td>
          <td style="font-family: monospace; font-size: 12px;">${s.latitude.toFixed(6)}°, ${s.longitude.toFixed(6)}°</td>
          <td><span style="font-size: 12px; color: #6b7280;">Terhubung ke: ${
            s.connected_points?.join(', ') ||
            s.hotspots?.filter((h) => h.type === 'link').map((h) => h.target).join(', ') ||
            '-'
          }</span></td>
          <td><code style="font-size: 11px;">${s.panorama_path}</code></td>
          <td>
            <span class="status-pill ${isOk ? 'ready' : 'pending'}">
              ${isOk ? '✓ Tersedia' : '⏳ Belum Tersedia'}
            </span>
          </td>
        </tr>
      `;
    })
    .join('');
}
