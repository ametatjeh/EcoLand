let onCustomInfoHandler = null;

export function setInfoHotspotHandler(fn) {
  onCustomInfoHandler = fn;
}

export function showDefaultInfoModal(hotspot) {
  showMobileInfoModal(hotspot);
}

/**
 * Buat elemen DOM Link Hotspot sesuai Marzipano Tool.
 * @param {object} hotspot — { yaw, pitch, rotation, target }
 * @param {string} targetName — Nama scene tujuan untuk tooltip
 * @param {function} onClick — Callback saat hotspot diklik
 * @returns {HTMLElement}
 */
function createLinkHotspotElement(hotspot, targetName, onClick) {
  const wrapper = document.createElement('div');
  wrapper.className = 'hotspot link-hotspot';
  wrapper.setAttribute('role', 'button');
  wrapper.setAttribute('tabindex', '0');
  wrapper.setAttribute('aria-label', `Menuju ${targetName || hotspot.target}`);

  // Icon img dengan rotasi arah hotspot di dalam wrapper berdenyut
  const pulseWrapper = document.createElement('div');
  pulseWrapper.className = 'link-hotspot-pulse';

  const icon = document.createElement('img');
  icon.src = '/img/link.png';
  icon.className = 'link-hotspot-icon';
  const rotationRad = hotspot.rotation ?? 0;
  icon.style.transform = `rotate(${rotationRad}rad)`;
  icon.style.webkitTransform = `rotate(${rotationRad}rad)`;

  pulseWrapper.appendChild(icon);

  // Tooltip nama scene tujuan
  const tooltip = document.createElement('div');
  tooltip.className = 'hotspot-tooltip link-hotspot-tooltip';
  tooltip.textContent = targetName || 'Lihat Lokasi';

  wrapper.appendChild(pulseWrapper);
  wrapper.appendChild(tooltip);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(hotspot.target);
  };

  wrapper.addEventListener('click', handleClick);
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick(e);
    }
  });

  return wrapper;
}

/**
 * Buat elemen DOM Info Hotspot sesuai Marzipano Tool.
 * @param {object} hotspot — { yaw, pitch, title, text }
 * @returns {HTMLElement}
 */
function createInfoHotspotElement(hotspot) {
  const wrapper = document.createElement('div');
  // Default terbuka di layar desktop (> 768px), sedangkan khusus tampilan mobile default tertutup
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;
  wrapper.className = isDesktop ? 'hotspot info-hotspot visible' : 'hotspot info-hotspot';
  wrapper.setAttribute('role', 'button');
  wrapper.setAttribute('tabindex', '0');

  // Header container
  const header = document.createElement('div');
  header.className = 'info-hotspot-header';

  // Icon wrapper & image
  const iconWrapper = document.createElement('div');
  iconWrapper.className = 'info-hotspot-icon-wrapper';
  const icon = document.createElement('img');
  icon.src = '/img/info.png';
  icon.className = 'info-hotspot-icon';
  icon.alt = 'Info';
  iconWrapper.appendChild(icon);

  // Title wrapper & text
  const titleWrapper = document.createElement('div');
  titleWrapper.className = 'info-hotspot-title-wrapper';
  const title = document.createElement('div');
  title.className = 'info-hotspot-title';
  title.innerHTML = hotspot.title || 'Informasi';
  titleWrapper.appendChild(title);

  // Close wrapper & image
  const closeWrapper = document.createElement('div');
  closeWrapper.className = 'info-hotspot-close-wrapper';
  const closeIcon = document.createElement('img');
  closeIcon.src = '/img/close.png';
  closeIcon.className = 'info-hotspot-close-icon';
  closeIcon.alt = 'Tutup';
  closeWrapper.appendChild(closeIcon);

  header.appendChild(iconWrapper);
  header.appendChild(titleWrapper);
  header.appendChild(closeWrapper);

  // Text body
  const text = document.createElement('div');
  text.className = 'info-hotspot-text';
  text.innerHTML = hotspot.text || '<p>Tidak ada keterangan tambahan.</p>';

  wrapper.appendChild(header);
  wrapper.appendChild(text);

  // Toggle buka/tutup info card
  const toggle = (e) => {
    e.stopPropagation();
    const isNowVisible = wrapper.classList.toggle('visible');

    // Jika pada mode mobile atau layar sempit, juga tampilkan modal
    if (window.innerWidth <= 600 && isNowVisible) {
      showMobileInfoModal(hotspot);
    }
  };

  header.addEventListener('click', toggle);
  closeWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    wrapper.classList.remove('visible');
  });

  return wrapper;
}

/**
 * Tampilkan modal info hotspot untuk perangkat mobile
 */
function showMobileInfoModal(hotspot) {
  const existing = document.getElementById('mobile-info-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'mobile-info-modal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-card" style="max-width: 400px;">
      <div class="modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="/img/info.png" style="width: 20px; height: 20px;" alt="Info" />
          <h3>${hotspot.title || 'Informasi'}</h3>
        </div>
        <button id="btn-close-mob-info" class="icon-btn" aria-label="Tutup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div style="font-size: 14px; line-height: 1.6; color: var(--clr-text);">
          ${hotspot.text || 'Tidak ada keterangan tambahan.'}
        </div>
      </div>
      <div class="modal-footer">
        <button id="btn-dismiss-mob-info" class="btn-primary-action" style="padding: 8px 18px; font-size: 13px;">
          Tutup
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.querySelector('#btn-close-mob-info')?.addEventListener('click', close);
  modal.querySelector('#btn-dismiss-mob-info')?.addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

/**
 * Tambahkan linkHotspots dan infoHotspots ke Scene Marzipano.
 * Mendukung data hotspot dinamis dari server (status === 'published' & isActive !== false)
 * serta fallback ke data sceneData export.
 *
 * @param {Marzipano.Scene} scene — Scene Marzipano aktif
 * @param {object} sceneData — Data scene lengkap dari Marzipano export
 * @param {Array} allScenes — Daftar seluruh scene untuk pencarian nama target
 * @param {function} onNavigate — Callback saat link hotspot diklik
 * @param {Array} [dynamicHotspots] — Array hotspot dari server / API
 */
export function addHotspots(scene, sceneData, allScenes, onNavigate, dynamicHotspots = null) {
  if (!scene || !sceneData) return;

  const container = scene.hotspotContainer();
  // Clear any existing hotspots in this container without destroying container DOM
  if (typeof container.listHotspots === 'function') {
    const list = [...container.listHotspots()];
    list.forEach((h) => container.destroyHotspot(h));
  } else if (container._hotspots) {
    while (container._hotspots.length > 0) {
      container.destroyHotspot(container._hotspots[0]);
    }
  }

  if (Array.isArray(dynamicHotspots) && dynamicHotspots.length > 0) {
    // Filter hotspots untuk scene ini yang berstatus published dan aktif
    const sceneItems = dynamicHotspots.filter(
      (h) => h.sceneId === sceneData.id && h.status === 'published' && h.isActive !== false
    );

    sceneItems.forEach((hs) => {
      if (hs.type === 'link') {
        const targetScene = allScenes.find((s) => s.id === hs.target);
        const targetName = hs.title ? hs.title : (targetScene ? targetScene.name : hs.target);
        const element = createLinkHotspotElement(hs, targetName, onNavigate);
        container.createHotspot(element, { yaw: hs.yaw, pitch: hs.pitch });
      } else {
        const element = createInfoHotspotElement(hs);
        container.createHotspot(element, { yaw: hs.yaw, pitch: hs.pitch });
      }
    });
    return;
  }

  // Fallback: Gunakan hotspot dari export static sceneData
  const linkHotspots = sceneData.linkHotspots || [];
  linkHotspots.forEach((hs) => {
    const targetScene = allScenes.find((s) => s.id === hs.target);
    const targetName = targetScene ? targetScene.name : hs.target;
    const element = createLinkHotspotElement(hs, targetName, onNavigate);
    container.createHotspot(element, { yaw: hs.yaw, pitch: hs.pitch });
  });

  const infoHotspots = sceneData.infoHotspots || [];
  infoHotspots.forEach((hs) => {
    const element = createInfoHotspotElement(hs);
    container.createHotspot(element, { yaw: hs.yaw, pitch: hs.pitch });
  });
}

