/**
 * Modul Publik Kawasan Penanaman
 * Menampilkan daftar kawasan aktif, detail deskriptif, komposisi jenis pohon, dan link Virtual Tour 360°.
 * Menjaga privasi: tidak menampilkan catatan internal atau draft belum terpublikasi.
 */
import { ApiService } from './services/api.js';

let cachedPublicZones = [];
let onOpenTourSceneCallback = null;

export async function initPublicZones(containerId, onOpenTourScene) {
  const container = document.getElementById(containerId);
  if (!container) return;

  onOpenTourSceneCallback = onOpenTourScene;

  try {
    const res = await ApiService.getPublicZones();
    cachedPublicZones = (res && res.zones) ? res.zones : [];
  } catch (err) {
    console.warn('Gagal memuat kawasan publik:', err);
    cachedPublicZones = [];
  }

  renderPublicZones(container);
  setupPublicZoneModalEvents();
}

function renderPublicZones(container) {
  if (!cachedPublicZones || cachedPublicZones.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--clr-border, #24352b);">
        <span style="font-size: 32px; display: block; margin-bottom: 8px;">🌱</span>
        <h4 style="margin: 0 0 6px 0; color: var(--clr-text, #e2e8f0);">Belum Ada Kawasan yang Dipublikasikan</h4>
        <p style="margin: 0; font-size: 13px; color: var(--clr-text-muted, #94a3b8);">Data kawasan penanaman akan segera tersedia setelah diverifikasi.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cachedPublicZones.map((z) => {
    const hasCoords = z.latitude && z.longitude;
    const survivalText = z.survival_rate !== null && z.survival_rate !== undefined
      ? `${Number(z.survival_rate).toFixed(1)}% Kelangsungan Hidup`
      : 'Data survei belum lengkap';

    const survivalClass = z.survival_rate >= 80 ? 'text-emerald-400' : (z.survival_rate >= 50 ? 'text-amber-400' : 'text-slate-400');

    return `
      <div class="point-card" style="display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--clr-border, #24352b); background: var(--clr-surface, #14211a); border-radius: 12px; overflow: hidden; padding: 18px;">
        <div>
          <div class="point-card-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="point-sequence-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-weight: 600; font-size: 11px; padding: 3px 8px; border-radius: 6px;">
              ${z.zone_code}
            </span>
            <span class="point-status-tag" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; font-size: 11px; padding: 3px 8px; border-radius: 6px;">
              ${escapeHtml(z.category || 'Kawasan Restorasi')}
            </span>
          </div>

          <h3 class="point-title" style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #fff;">
            ${escapeHtml(z.name)}
          </h3>
          <p class="point-desc" style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 14px;">
            ${escapeHtml(z.description || 'Program restorasi vegetasi pohon dan pengayaan ekosistem.')}
          </p>

          <!-- Metrics summary -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; background: rgba(0,0,0,0.25); padding: 10px; border-radius: 8px;">
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Luas Lahan</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${Number(z.area_size).toLocaleString('id-ID')} ${escapeHtml(z.area_unit || 'ha')}
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Total Bibit Awal</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${Number(z.total_initial_seedlings || 0).toLocaleString('id-ID')} Btg
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Jenis Spesies</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${z.species_count || 0} Jenis
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Status Pantau</span>
              <strong style="font-size: 11px;" class="${survivalClass}">
                ${survivalText}
              </strong>
            </div>
          </div>

          <div class="point-meta" style="font-size: 12px; color: #64748b; margin-bottom: 14px;">
            📍 ${escapeHtml(z.city || z.address || 'Provinsi Aceh')}
            ${hasCoords ? ` • <span style="font-family: monospace;">${Number(z.latitude).toFixed(4)}° N, ${Number(z.longitude).toFixed(4)}° E</span>` : ''}
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button class="btn-card-explore btn-public-zone-detail" data-zone-id="${z.id}" style="flex: 1; padding: 8px 12px; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            ℹ️ Detail Kawasan
          </button>
          ${z.scenes_count > 0 ? `
            <button class="btn-card-explore btn-public-zone-tour" data-zone-id="${z.id}" style="flex: 1; background: var(--clr-primary, #059669); color: white; padding: 8px 12px; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
              🔄 Virtual Tour
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Attach click handlers
  container.querySelectorAll('.btn-public-zone-detail').forEach((btn) => {
    btn.addEventListener('click', () => {
      const zoneId = btn.getAttribute('data-zone-id');
      openPublicZoneModal(zoneId);
    });
  });

  container.querySelectorAll('.btn-public-zone-tour').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const zoneId = btn.getAttribute('data-zone-id');
      try {
        const detail = await ApiService.getPublicZone(zoneId);
        if (detail.success && detail.zone && detail.zone.scenes && detail.zone.scenes.length > 0) {
          const firstScene = detail.zone.scenes[0];
          if (onOpenTourSceneCallback) {
            onOpenTourSceneCallback(firstScene.id);
          }
        } else {
          window.location.hash = 'tour';
        }
      } catch (err) {
        window.location.hash = 'tour';
      }
    });
  });
}

function setupPublicZoneModalEvents() {
  const modal = document.getElementById('public-zone-modal');
  if (!modal) return;

  const btnClose = modal.querySelectorAll('.btn-close-modal');
  btnClose.forEach((b) => {
    b.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

async function openPublicZoneModal(zoneId) {
  const modal = document.getElementById('public-zone-modal');
  const body = document.getElementById('public-zone-modal-body');
  const title = document.getElementById('public-zone-modal-title');
  const badge = document.getElementById('public-zone-modal-badge');
  if (!modal || !body) return;

  modal.classList.remove('hidden');
  body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; padding: 40px 0;">
      <span class="loading-spinner"></span> Memuat detail kawasan...
    </div>
  `;

  try {
    const res = await ApiService.getPublicZone(zoneId);
    if (!res.success || !res.zone) {
      body.innerHTML = `<div class="alert alert-error">Gagal memuat detail kawasan penanaman.</div>`;
      return;
    }

    const z = res.zone;
    if (title) title.textContent = z.name;
    if (badge) badge.textContent = `${z.zone_code} • ${z.category || 'Kawasan Restorasi'}`;

    const survivalText = z.survival_rate !== null && z.survival_rate !== undefined
      ? `${Number(z.survival_rate).toFixed(1)}%`
      : 'Belum cukup data survei';

    body.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- Banner Deskripsi -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 16px;">
          <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #34d399;">🌱 Ringkasan & Profil Lahan</h4>
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
            ${escapeHtml(z.description || 'Tidak ada keterangan tambahan.')}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: #94a3b8;">
            <div><strong>Tujuan Penanaman:</strong> ${escapeHtml(z.planting_purpose || 'Restorasi ekosistem')}</div>
            <div><strong>Status Lahan:</strong> <span style="color: #38bdf8;">${escapeHtml(z.status || 'Aktif')}</span></div>
          </div>
        </div>

        <!-- Metrik Faktual -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Luas Lahan Tercatat</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${Number(z.area_size).toLocaleString('id-ID')} ${escapeHtml(z.area_unit || 'ha')}
            </div>
            <div style="font-size: 11px; color: #94a3b8;">(±${Number(z.area_in_ha).toFixed(2)} Hektare)</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Total Bibit Awal</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${Number(z.total_initial_seedlings || 0).toLocaleString('id-ID')} Batang
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Data historis kegiatan</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Keanekaragaman</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${z.species_count || 0} Spesies
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Komposisi pohon</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Kelangsungan Hidup</div>
            <div style="font-size: 15px; font-weight: 700; color: #34d399; margin-top: 2px;">
              ${survivalText}
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Survei terverifikasi</div>
          </div>
        </div>

        <!-- Lokasi & Titik Acuan Referensi -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 14px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #e2e8f0;">📍 Lokasi Deskriptif</h4>
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #94a3b8;">
            ${escapeHtml([z.address, z.village, z.district, z.city, z.province].filter(Boolean).join(', ') || 'Provinsi Aceh')}
          </p>
          ${z.latitude && z.longitude ? `
            <div style="font-size: 12px; color: #64748b;">
              Titik Acuan Lapangan (WGS84): <code style="color: #38bdf8;">${Number(z.latitude).toFixed(6)}° N, ${Number(z.longitude).toFixed(6)}° E</code>
            </div>
          ` : '<div style="font-size: 12px; color: #64748b;">Titik koordinat acuan: Belum terverifikasi</div>'}
        </div>

        <!-- Daftar Jenis Pohon Tertanam -->
        <div>
          <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #e2e8f0;">🌳 Jenis Pohon Tertanam</h4>
          ${z.species_list && z.species_list.length > 0 ? `
            <table class="species-table" style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--clr-border, #24352b); text-align: left; color: #64748b;">
                  <th style="padding: 8px 6px;">Nama Lokal</th>
                  <th style="padding: 8px 6px;">Nama Ilmiah</th>
                  <th style="padding: 8px 6px; text-align: right;">Jumlah Bibit Awal</th>
                </tr>
              </thead>
              <tbody>
                ${z.species_list.map((sp) => `
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                    <td style="padding: 8px 6px; font-weight: 600; color: #e2e8f0;">${escapeHtml(sp.local_name)}</td>
                    <td style="padding: 8px 6px; font-style: italic; color: #94a3b8;">${escapeHtml(sp.scientific_name)}</td>
                    <td style="padding: 8px 6px; text-align: right; color: #34d399; font-weight: 600;">
                      ${Number(sp.total_quantity).toLocaleString('id-ID')} Batang
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          ` : `
            <div style="font-size: 13px; color: #64748b; font-style: italic; padding: 12px 0;">
              Belum ada pencatatan kelompok bibit pohon terdaftar untuk kawasan ini.
            </div>
          `}
        </div>

        <!-- Scene Panorama Terhubung -->
        <div>
          <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #e2e8f0;">🔄 Panorama 360° Terhubung (${z.scenes ? z.scenes.length : 0} Titik)</h4>
          ${z.scenes && z.scenes.length > 0 ? `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
              ${z.scenes.map((sc) => `
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <span style="font-size: 10px; color: #38bdf8; font-weight: 600;">Titik ${sc.sequence}</span>
                    <h5 style="margin: 2px 0 8px 0; font-size: 13px; color: #e2e8f0;">${escapeHtml(sc.name)}</h5>
                  </div>
                  <button class="btn-primary-action btn-sm btn-open-scene-direct" data-scene-id="${sc.id}" style="padding: 6px 10px; font-size: 11px; width: 100%; display: flex; justify-content: center; align-items: center; gap: 4px;">
                    👁️ Buka Panorama
                  </button>
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="font-size: 13px; color: #64748b; font-style: italic; padding: 8px 0;">
              Belum ada titik panorama 360° yang dihubungkan ke kawasan ini.
            </div>
          `}
        </div>
      </div>
    `;

    // Connect direct scene openers
    body.querySelectorAll('.btn-open-scene-direct').forEach((b) => {
      b.addEventListener('click', () => {
        const targetSceneId = b.getAttribute('data-scene-id');
        modal.classList.add('hidden');
        if (onOpenTourSceneCallback) {
          onOpenTourSceneCallback(targetSceneId);
        } else {
          window.location.hash = 'tour';
        }
      });
    });

  } catch (err) {
    body.innerHTML = `<div class="alert alert-error">Gagal menghubungi server: ${escapeHtml(err.message)}</div>`;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
