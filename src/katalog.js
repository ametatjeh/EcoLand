/**
 * Katalog Publik Spesies Pohon Kawasan ±2 Hektare
 * Menampilkan data terverifikasi master jenis pohon, jumlah bibit tertanam, dan link panorama.
 */
import { ApiService } from './services/api.js';

let cachedPublicSpecies = [];
let onJumpToSceneCallback = null;

export async function initPublicTreeCatalog(containerId, onJumpToScene) {
  const container = document.getElementById(containerId);
  if (!container) return;

  onJumpToSceneCallback = onJumpToScene;

  container.innerHTML = `
    <div class="hero-section" style="padding: 24px 28px; margin-bottom: 24px;">
      <div class="hero-badge">🌳 Flora & Silvikultur Kawasan</div>
      <h1 class="hero-title" style="font-size: 26px; margin: 10px 0;">
        Katalog Jenis Pohon Kawasan Restorasi
      </h1>
      <p class="hero-subtitle" style="max-width: 800px; font-size: 14px; margin-bottom: 20px;">
        Dokumentasi resmi seluruh spesies pohon yang terdaftar dan ditanam dalam kawasan pemulihan lahan ±2 hektare. Data kuantitas bibit dan kelangsungan hidup disajikan secara faktual berdasarkan catatan survei lapangan.
      </p>

      <!-- Filter & Search Toolbar -->
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; background: rgba(0,0,0,0.25); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
        <div style="flex: 1; min-width: 220px;">
          <input type="text" id="catalog-search" class="form-input form-input-sm" placeholder="🔍 Cari nama pohon, ilmiah, atau famili..." style="width: 100%;" />
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <label style="font-size: 12px; color: var(--clr-text-muted);">Status Asal:</label>
          <select id="catalog-filter-origin" class="form-select form-select-sm" style="width: auto;">
            <option value="all">Semua Status</option>
            <option value="lokal_asli">Jenis Lokal / Asli</option>
            <option value="introduksi">Introduksi</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Species Grid Container -->
    <div id="catalog-grid" class="points-grid" style="min-height: 250px;">
      <div style="grid-column: 1 / -1; display: flex; justify-content: center; align-items: center; padding: 60px 0;">
        <span class="loading-spinner"></span> Memuat katalog pohon...
      </div>
    </div>

    <!-- Modal Detail Pohon Publik -->
    <div id="catalog-detail-modal" class="modal-overlay hidden">
      <div class="modal-card" style="max-width: 640px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 26px;">🌿</span>
            <div>
              <h3 id="catmodal-title" style="margin: 0; font-size: 18px;">Detail Pohon</h3>
              <p id="catmodal-subtitle" style="margin: 2px 0 0; font-size: 12px; font-style: italic; color: var(--clr-primary-light);"></p>
            </div>
          </div>
          <button id="btn-close-catmodal" class="icon-btn" aria-label="Tutup">✕</button>
        </div>
        <div class="modal-body" id="catmodal-body">
          <!-- Populated dynamically -->
        </div>
        <div class="modal-footer" style="display: flex; justify-content: flex-end;">
          <button type="button" id="btn-catmodal-close-action" class="btn-secondary-action btn-sm">Tutup</button>
        </div>
      </div>
    </div>
  `;

  setupCatalogEvents();
  await loadAndRenderCatalog();
}

function setupCatalogEvents() {
  const searchInput = document.getElementById('catalog-search');
  const originFilter = document.getElementById('catalog-filter-origin');
  const btnCloseModal = document.getElementById('btn-close-catmodal');
  const btnCloseAction = document.getElementById('btn-catmodal-close-action');
  const modal = document.getElementById('catalog-detail-modal');

  searchInput?.addEventListener('input', () => filterAndRenderGrid());
  originFilter?.addEventListener('change', () => filterAndRenderGrid());

  const closeModal = () => modal?.classList.add('hidden');
  btnCloseModal?.addEventListener('click', closeModal);
  btnCloseAction?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

export async function loadAndRenderCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  try {
    const res = await ApiService.getPublicTreeSpecies();
    cachedPublicSpecies = res.species || [];
    filterAndRenderGrid();
  } catch (err) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; background: rgba(239, 68, 68, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.2);">
        <p style="color: var(--clr-danger); margin-bottom: 8px;">Gagal memuat data katalog pohon.</p>
        <p style="font-size: 13px; color: var(--clr-text-muted);">${escapeHtml(err.message)}</p>
      </div>
    `;
  }
}

function filterAndRenderGrid() {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return;

  const searchQuery = document.getElementById('catalog-search')?.value.toLowerCase().trim() || '';
  const originFilter = document.getElementById('catalog-filter-origin')?.value || 'all';

  const filtered = cachedPublicSpecies.filter((sp) => {
    const matchSearch =
      !searchQuery ||
      (sp.common_name && sp.common_name.toLowerCase().includes(searchQuery)) ||
      (sp.scientific_name && sp.scientific_name.toLowerCase().includes(searchQuery)) ||
      (sp.local_name && sp.local_name.toLowerCase().includes(searchQuery)) ||
      (sp.family && sp.family.toLowerCase().includes(searchQuery));

    const matchOrigin = originFilter === 'all' || sp.origin_status === originFilter;
    return matchSearch && matchOrigin;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: rgba(0,0,0,0.18); border-radius: var(--radius-md); border: 1px dashed var(--clr-border);">
        <span style="font-size: 38px; display: block; margin-bottom: 12px;">🌱</span>
        <h3 style="font-size: 16px; margin-bottom: 6px;">Belum Ada Spesies Pohon Tercatat</h3>
        <p style="font-size: 13px; color: var(--clr-text-muted); max-width: 500px; margin: 0 auto;">
          ${searchQuery || originFilter !== 'all' ? 'Tidak ada jenis pohon yang cocok dengan filter pencarian Anda.' : 'Data master pohon belum dimasukkan atau belum disetujui untuk publikasi oleh administrator.'}
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((sp) => renderSpeciesCard(sp)).join('');

  // Attach card detail buttons
  grid.querySelectorAll('.btn-view-species-detail').forEach((btn) => {
    btn.addEventListener('click', () => {
      const spId = parseInt(btn.getAttribute('data-id'));
      const species = cachedPublicSpecies.find((s) => s.id === spId);
      if (species) showSpeciesModal(species);
    });
  });

  // Attach jump to scene buttons
  grid.querySelectorAll('.btn-jump-scene').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sceneId = btn.getAttribute('data-scene-id');
      if (onJumpToSceneCallback && sceneId) {
        onJumpToSceneCallback(sceneId);
      }
    });
  });
}

function renderSpeciesCard(sp) {
  const originBadgeClass = sp.origin_status === 'lokal_asli' ? 'pill-success' : 'pill-info';

  const scenesLinks = (sp.scenes || []).map((sc) => `
    <button class="btn-jump-scene btn-text-btn btn-sm" data-scene-id="${sc.scene_id}" style="font-size: 11px; padding: 2px 6px; background: rgba(16, 185, 129, 0.12); color: var(--clr-primary-light); border-radius: 4px;" title="Lihat di panorama: ${escapeHtml(sc.scene_name || sc.scene_id)}">
      📍 ${escapeHtml(sc.zone || sc.scene_name || sc.scene_id)}
    </button>
  `).join('');

  return `
    <div class="point-card" style="display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div class="point-card-top" style="margin-bottom: 8px;">
          <span class="admin-header-pill ${originBadgeClass}" style="font-size: 11px;">
            ${escapeHtml(sp.origin_status_label || sp.origin_status)}
          </span>
          <span style="font-size: 11px; color: var(--clr-primary-light); font-weight: 600;">
            ${sp.total_planted > 0 ? `🌱 ${sp.total_planted} Bibit Ditanam` : '🌱 Belum Ditanam'}
          </span>
        </div>

        <h3 class="point-title" style="margin-bottom: 2px; font-size: 16px;">
          ${escapeHtml(sp.common_name)}
        </h3>

        ${sp.local_name ? `<div style="font-size: 12px; color: var(--clr-text-muted); margin-bottom: 2px;">Nama Daerah: <strong>${escapeHtml(sp.local_name)}</strong></div>` : ''}

        ${sp.scientific_name ? `<div style="font-size: 12px; font-style: italic; color: var(--clr-text-dim); margin-bottom: 8px;">${escapeHtml(sp.scientific_name)} ${sp.family ? `• Famili ${escapeHtml(sp.family)}` : ''}</div>` : ''}

        ${sp.ecological_function ? `
          <div style="font-size: 12px; color: var(--clr-text); background: rgba(255,255,255,0.03); padding: 8px; border-radius: 6px; margin-bottom: 10px; line-height: 1.4;">
            <strong style="color: var(--clr-primary-light);">Fungsi Ekologis:</strong><br/>
            ${escapeHtml(sp.ecological_function)}
          </div>
        ` : ''}

        ${sp.scenes && sp.scenes.length > 0 ? `
          <div style="margin-bottom: 10px;">
            <div style="font-size: 11px; color: var(--clr-text-dim); margin-bottom: 4px;">Titik Lokasi Panorama:</div>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              ${scenesLinks}
            </div>
          </div>
        ` : ''}
      </div>

      <div style="border-top: 1px solid var(--clr-border); padding-top: 10px; margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 11px; color: var(--clr-text-dim);">
          ${sp.activities_count ? `${sp.activities_count} Kegiatan Tanam` : 'Master Spesies'}
        </span>
        <button class="btn-view-species-detail btn-secondary-action btn-sm" data-id="${sp.id}" style="font-size: 12px; padding: 5px 12px;">
          Lihat Profil Lengkap →
        </button>
      </div>
    </div>
  `;
}

function showSpeciesModal(sp) {
  const modal = document.getElementById('catalog-detail-modal');
  const title = document.getElementById('catmodal-title');
  const subtitle = document.getElementById('catmodal-subtitle');
  const body = document.getElementById('catmodal-body');

  if (!modal || !body) return;

  title.textContent = sp.common_name;
  subtitle.textContent = sp.scientific_name ? `${sp.scientific_name} ${sp.family ? `(${sp.family})` : ''}` : '';

  body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      ${sp.photo_path ? `
        <div style="border-radius: var(--radius-md); overflow: hidden; max-height: 220px; background: #000; border: 1px solid var(--clr-border);">
          <img src="${sp.photo_path}" alt="${escapeHtml(sp.common_name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'" />
        </div>
      ` : ''}

      <div class="stats-grid" style="margin-bottom: 0;">
        <div class="stat-card" style="padding: 10px;">
          <span class="stat-label">Nama Lokal</span>
          <span class="stat-value" style="font-size: 14px;">${escapeHtml(sp.local_name || '-')}</span>
        </div>
        <div class="stat-card" style="padding: 10px;">
          <span class="stat-label">Status Asal</span>
          <span class="stat-value" style="font-size: 14px;">${escapeHtml(sp.origin_status_label)}</span>
        </div>
        <div class="stat-card" style="padding: 10px;">
          <span class="stat-label">Total Bibit Ditanam</span>
          <span class="stat-value" style="font-size: 14px; color: var(--clr-primary-light);">${sp.total_planted > 0 ? `${sp.total_planted} Batang` : 'Belum Ada'}</span>
        </div>
      </div>

      ${sp.description ? `
        <div>
          <h4 style="font-size: 13px; color: var(--clr-primary-light); margin-bottom: 4px;">Deskripsi Morfologi & Silvikultur</h4>
          <p style="font-size: 13px; line-height: 1.5; color: var(--clr-text-muted);">${escapeHtml(sp.description)}</p>
        </div>
      ` : ''}

      ${sp.ecological_function ? `
        <div>
          <h4 style="font-size: 13px; color: var(--clr-primary-light); margin-bottom: 4px;">Peran & Fungsi Ekologis</h4>
          <p style="font-size: 13px; line-height: 1.5; color: var(--clr-text-muted);">${escapeHtml(sp.ecological_function)}</p>
        </div>
      ` : ''}

      ${sp.benefits ? `
        <div>
          <h4 style="font-size: 13px; color: var(--clr-primary-light); margin-bottom: 4px;">Manfaat & Kegunaan</h4>
          <p style="font-size: 13px; line-height: 1.5; color: var(--clr-text-muted);">${escapeHtml(sp.benefits)}</p>
        </div>
      ` : ''}

      ${sp.reference_source ? `
        <div style="background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 6px; font-size: 12px; color: var(--clr-text-dim);">
          📖 <strong>Sumber Referensi Identifikasi:</strong> ${escapeHtml(sp.reference_source)}
        </div>
      ` : ''}
    </div>
  `;

  modal.classList.remove('hidden');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
