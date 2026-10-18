/**
 * Visual Hotspot Editor Controller (Marzipano Engine)
 * Inti fitur pengeditan visual hotspot interaktif pada Virtual Tour 360°.
 */
import Marzipano from 'marzipano';
import { ApiService } from '../services/api.js';
import { EcoToast } from '../utils/toast.js';
import { createLinkHotspotElement, createInfoHotspotElement } from '../hotspots.js';

export class VisualHotspotEditor {
  constructor({ scenes, getHotspots, onHotspotsChanged, onSceneSwitchRequest }) {
    this.scenes = scenes;
    this.getHotspots = getHotspots;
    this.onHotspotsChanged = onHotspotsChanged;
    this.onSceneSwitchRequest = onSceneSwitchRequest;

    this.viewer = null;
    this.currentSceneId = null;
    this.currentMarzipanoScene = null;
    this.currentView = null;
    this.sceneMap = new Map();

    // Editor State
    this.mode = 'select'; // 'select' | 'add-link' | 'add-info' | 'move' | 'preview'
    this.previewShowDrafts = false;
    this.selectedHotspotId = null;
    this.clipboardHotspot = null;
    this.isDragging = false;
    this.hasUnsavedChanges = false;

    // Undo / Redo Stacks
    this.historyStack = [];
    this.redoStack = [];

    // Filter & Search State
    this.searchQuery = '';
    this.filterScene = 'all';
    this.filterType = 'all';
    this.filterStatus = 'all';

    // Bound handlers
    this.handleViewerClick = this.handleViewerClick.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);

    // Tree Integration Cache
    this.cachedTreeSpeciesList = [];
    this.cachedPlantingActivitiesList = [];
  }

  init() {
    this.populateSceneDropdowns();
    this.bindToolbarEvents();
    this.bindFormEvents();
    this.bindSearchFilterEvents();
    window.addEventListener('beforeunload', this.handleBeforeUnload);

    // Preload tree lists for info hotspot linking
    this.loadTreeMetadata();
  }

  populateSceneDropdowns() {
    const sceneSelect = document.getElementById('editor-scene-select');
    if (sceneSelect && this.scenes && this.scenes.length > 0) {
      const currentVal = this.currentSceneId || sceneSelect.value;
      sceneSelect.innerHTML = this.scenes
        .map((s, idx) => `<option value="${s.id}" ${s.id === currentVal ? 'selected' : ''}>Titik ${s.sequence || (idx + 1)}: ${escapeHtml(s.name)}</option>`)
        .join('');
      if (this.currentSceneId) {
        sceneSelect.value = this.currentSceneId;
      }
    }

    const filterScene = document.getElementById('editor-filter-scene');
    if (filterScene && this.scenes && this.scenes.length > 0) {
      const currentVal = this.filterScene || filterScene.value || 'all';
      filterScene.innerHTML = `<option value="all" ${currentVal === 'all' ? 'selected' : ''}>Semua Scene</option>` + this.scenes
        .map((s, idx) => `<option value="${s.id}" ${s.id === currentVal ? 'selected' : ''}>Titik ${s.sequence || (idx + 1)}: ${escapeHtml(s.name)}</option>`)
        .join('');
    }
  }

  async loadTreeMetadata() {
    try {
      let spRes;
      try {
        spRes = await ApiService.getTreeSpecies({ per_page: 100 });
      } catch (err) {
        const pub = await fetch('/api/tree-species');
        spRes = await pub.json();
      }
      this.cachedTreeSpeciesList = spRes.species || spRes.data || (Array.isArray(spRes) ? spRes : []);
    } catch (e) {
      console.warn('loadTreeMetadata species error:', e);
    }

    try {
      const actRes = await ApiService.getPlantingActivities({ per_page: 100 });
      this.cachedPlantingActivitiesList = actRes.activities || actRes.data || (Array.isArray(actRes) ? actRes : []);
    } catch (e) {
      console.warn('loadTreeMetadata activities error:', e);
    }
  }

  handleBeforeUnload(e) {
    if (this.hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = 'Terdapat perubahan hotspot yang belum disimpan ke server!';
    }
  }

  initViewer() {
    const panoEl = document.getElementById('admin-editor-pano');
    if (!panoEl) return;

    if (!this.viewer) {
      this.viewer = new Marzipano.Viewer(panoEl, {
        controls: { mouseViewMode: 'drag' },
        stage: { progressive: true },
      });

      // Canvas click listener for click-to-place coordinates
      panoEl.addEventListener('click', this.handleViewerClick);

      // Auto-update Marzipano size whenever the container changes dimensions
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(() => {
          if (this.viewer && panoEl.clientWidth > 0 && panoEl.clientHeight > 0) {
            this.viewer.updateSize();
            if (this.viewer.stage()) {
              this.viewer.stage().render();
            }
          }
        });
        ro.observe(panoEl);
      }
    }
  }

  refreshViewerSize() {
    const panoEl = document.getElementById('admin-editor-pano');
    if (!this.viewer && panoEl) {
      this.initViewer();
    }
    if (this.viewer) {
      this.viewer.updateSize();
      if (this.viewer.stage()) {
        this.viewer.stage().render();
      }
    }
  }

  setScene(sceneId, forceRecreate = false) {
    if (!sceneId) return;
    this.currentSceneId = sceneId;

    const panoEl = document.getElementById('admin-editor-pano');
    if (!this.viewer && panoEl) {
      this.initViewer();
    }
    if (!this.viewer) return;

    const sceneData = this.scenes.find((s) => s.id === sceneId);
    if (!sceneData) return;

    // Pastikan ukuran canvas sinkron dengan dimensi elemen saat ini
    this.viewer.updateSize();

    // Update scene selector dropdowns
    const selectEl = document.getElementById('editor-scene-select');
    if (selectEl && selectEl.value !== sceneId) {
      selectEl.value = sceneId;
    }
    const previewSelectEl = document.getElementById('editor-preview-scene-select');
    if (previewSelectEl && previewSelectEl.value !== sceneId) {
      previewSelectEl.value = sceneId;
    }

    // Get or create Marzipano Scene
    let entry = this.sceneMap.get(sceneId);
    if (forceRecreate && entry) {
      if (this.viewer.hasScene && this.viewer.hasScene(entry.scene)) {
        try { this.viewer.destroyScene(entry.scene); } catch (e) {}
      }
      this.sceneMap.delete(sceneId);
      entry = null;
    }

    if (!entry) {
      let source = null;
      let geometry = null;
      const initialParams = sceneData.initialViewParameters || sceneData.initialView || {};

      if (sceneData.levels && sceneData.levels.length > 0) {
        source = Marzipano.ImageUrlSource.fromString(
          `/tiles/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
          { cubeMapPreviewUrl: `/tiles/${sceneData.id}/preview.jpg` }
        );
        geometry = new Marzipano.CubeGeometry(sceneData.levels);
      } else {
        const imagePath = sceneData.panorama || sceneData.panorama_path;
        source = Marzipano.ImageUrlSource.fromString(imagePath);
        geometry = new Marzipano.EquirectGeometry([{ width: 4096 }]);
      }

      const faceSize = sceneData.faceSize || 896;
      const limiter = Marzipano.RectilinearView.limit.traditional(
        faceSize,
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180
      );

      const view = new Marzipano.RectilinearView(
        {
          yaw: initialParams.yaw ?? 0,
          pitch: initialParams.pitch ?? 0,
          fov: initialParams.fov ?? Math.PI / 2,
        },
        limiter
      );

      const scene = this.viewer.createScene({
        source,
        geometry,
        view,
        pinFirstLevel: true,
      });

      entry = { scene, view };
      this.sceneMap.set(sceneId, entry);
    }

    this.currentMarzipanoScene = entry.scene;
    this.currentView = entry.view;

    // Switch scene instantly to avoid opacity stuck at 0
    entry.scene.switchTo({ transitionDuration: 0 });
    this.viewer.updateSize();
    if (this.viewer.stage()) {
      this.viewer.stage().render();
    }

    // Render ulang hotspot dan sinkronkan viewport canvas
    setTimeout(() => {
      if (this.viewer) {
        this.viewer.updateSize();
        if (this.viewer.stage()) {
          this.viewer.stage().render();
        }
      }
    }, 50);

    this.renderHotspotsOnCurrentScene();
    this.renderHotspotsList();
    this.updateCurrentSceneTitleUI(sceneData);
  }

  updateCurrentSceneTitleUI(sceneData) {
    const titleEl = document.getElementById('editor-current-scene-name');
    if (titleEl) {
      titleEl.textContent = `${sceneData.name} (${sceneData.id})`;
    }
  }

  /**
   * Mengubah mode toolbar editor
   */
  setMode(newMode) {
    this.mode = newMode;

    // Update active class on toolbar buttons
    document.querySelectorAll('.editor-tool-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === newMode);
    });

    const layout = document.querySelector('.admin-editor-layout');
    const previewBar = document.getElementById('editor-preview-bar');
    const panoEl = document.getElementById('admin-editor-pano');

    if (panoEl) {
      panoEl.classList.remove('mode-add', 'mode-move', 'mode-preview');
      if (newMode.startsWith('add-')) panoEl.classList.add('mode-add');
      if (newMode === 'move') panoEl.classList.add('mode-move');
      if (newMode === 'preview') panoEl.classList.add('mode-preview');
    }

    if (newMode === 'preview') {
      if (layout) layout.classList.add('preview-active');
      if (previewBar) {
        previewBar.classList.remove('hidden');
        const previewSelect = document.getElementById('editor-preview-scene-select');
        if (previewSelect && this.scenes) {
          previewSelect.innerHTML = this.scenes
            .map((s, idx) => `<option value="${s.id}" ${s.id === this.currentSceneId ? 'selected' : ''}>Titik ${s.sequence || (idx + 1)}: ${escapeHtml(s.name)}</option>`)
            .join('');
        }
        const toggleDrafts = document.getElementById('preview-toggle-drafts');
        if (toggleDrafts) toggleDrafts.checked = this.previewShowDrafts;
      }

      this.selectedHotspotId = null;
      document.getElementById('mobile-info-modal')?.remove();
      this.refreshViewerSize();
      this.renderHotspotsOnCurrentScene();
      this.showToast('Mode Pratinjau Pengunjung Aktif.');
      return;
    }

    // Returning to normal editing mode
    if (layout) layout.classList.remove('preview-active');
    if (previewBar) previewBar.classList.add('hidden');
    document.getElementById('mobile-info-modal')?.remove();

    const banner = document.getElementById('editor-mode-hint');
    if (banner) {
      if (newMode === 'add-link') {
        banner.innerHTML = '👉 <strong>Mode Tambah Navigasi:</strong> Klik posisi pada panorama untuk menempatkan tanda panah.';
        banner.classList.remove('hidden');
      } else if (newMode === 'add-info') {
        banner.innerHTML = '👉 <strong>Mode Tambah Informasi:</strong> Klik posisi pada panorama untuk menempatkan titik edukasi.';
        banner.classList.remove('hidden');
      } else if (newMode === 'move') {
        banner.innerHTML = '✋ <strong>Mode Pindahkan:</strong> Klik atau seret hotspot pada panorama untuk mengubah posisinya.';
        banner.classList.remove('hidden');
      } else {
        banner.classList.add('hidden');
      }
    }

    this.refreshViewerSize();
    this.renderHotspotsOnCurrentScene();
    this.renderHotspotsList();
  }

  /**
   * Penanganan Klik pada Kanvas Marzipano
   * Mengonversi posisi layar (px) menjadi koordinat bola Marzipano (yaw, pitch)
   */
  handleViewerClick(e) {
    if (!this.currentView || this.isDragging) return;

    // Jika sedang dalam mode tambah hotspot
    if (this.mode === 'add-link' || this.mode === 'add-info') {
      const panoEl = document.getElementById('admin-editor-pano');
      const rect = panoEl.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Konversi screen coordinates ke yaw/pitch menggunakan RectilinearView Marzipano
      const coords = this.currentView.screenToCoordinates({ x: clickX, y: clickY });
      if (!coords) return;

      this.saveHistorySnapshot('Tambah Hotspot');

      const isLink = this.mode === 'add-link';
      const otherScenes = this.scenes.filter((s) => s.id !== this.currentSceneId);
      const defaultTarget = otherScenes.length > 0 ? otherScenes[0].id : this.scenes[0].id;

      const newId = `hs_${isLink ? 'link' : 'info'}_${Date.now()}`;
      const newHotspot = {
        id: newId,
        sceneId: this.currentSceneId,
        type: isLink ? 'link' : 'info',
        yaw: coords.yaw,
        pitch: coords.pitch,
        title: isLink ? `Menuju ${this.getSceneName(defaultTarget)}` : 'Informasi Baru',
        status: 'draft',
        isActive: true,
        source: 'editor',
      };

      if (isLink) {
        newHotspot.target = defaultTarget;
        newHotspot.rotation = 0;
        newHotspot.icon = 'arrow';
      } else {
        newHotspot.text = '<p>Tuliskan deskripsi pohon atau konservasi di sini.</p>';
        newHotspot.icon = 'tree';
      }

      const allHotspots = this.getHotspots();
      allHotspots.push(newHotspot);
      this.selectedHotspotId = newId;
      this.hasUnsavedChanges = true;

      // Kembali ke mode select setelah menempatkan hotspot
      this.setMode('select');
      this.renderHotspotsOnCurrentScene();
      this.renderHotspotsList();
      this.openHotspotForm(newHotspot);
      this.notifyHotspotsChanged();
      this.showToast('Hotspot berhasil ditempatkan! Silakan lengkapi formulir di samping.');
    }
  }

  getSceneName(sceneId) {
    const s = this.scenes.find((sc) => sc.id === sceneId);
    return s ? s.name : sceneId;
  }

  /**
   * Render semua hotspot pada scene Marzipano yang sedang aktif
   */
  renderHotspotsOnCurrentScene() {
    if (!this.currentMarzipanoScene) return;

    const container = this.currentMarzipanoScene.hotspotContainer();
    // Hapus hotspot lama dari container dengan destroyHotspot
    if (typeof container.listHotspots === 'function') {
      const list = [...container.listHotspots()];
      list.forEach((h) => container.destroyHotspot(h));
    } else if (container._hotspots) {
      while (container._hotspots.length > 0) {
        container.destroyHotspot(container._hotspots[0]);
      }
    }

    const sceneHotspots = this.getHotspots().filter((h) => h.sceneId === this.currentSceneId);

    sceneHotspots.forEach((hs) => {
      // Jika mode preview, gunakan elemen hotspot interaktif publik asli
      if (this.mode === 'preview') {
        if (hs.isActive === false || hs.status === 'inactive') return;
        if (!this.previewShowDrafts && hs.status === 'draft') return;

        if (hs.type === 'link') {
          const targetScene = this.scenes.find((s) => s.id === hs.target);
          const targetName = hs.title ? hs.title : (targetScene ? targetScene.name : hs.target);
          const el = createLinkHotspotElement(hs, targetName, (targetId) => {
            this.setScene(targetId);
          });
          container.createHotspot(el, { yaw: hs.yaw, pitch: hs.pitch });
        } else {
          const el = createInfoHotspotElement(hs);
          container.createHotspot(el, { yaw: hs.yaw, pitch: hs.pitch });
        }
        return;
      }

      const el = this.createEditorHotspotDOM(hs);
      container.createHotspot(el, { yaw: hs.yaw, pitch: hs.pitch });
    });
  }

  createEditorHotspotDOM(hs) {
    const isSelected = hs.id === this.selectedHotspotId;
    const isLink = hs.type === 'link';
    const isPreview = this.mode === 'preview';

    const wrapper = document.createElement('div');
    wrapper.className = `editor-hotspot-item ${isLink ? 'link-type' : 'info-type'}`;
    if (isSelected) wrapper.classList.add('selected');
    if (hs.status === 'draft') wrapper.classList.add('status-draft');
    if (hs.isActive === false) wrapper.classList.add('status-inactive');
    wrapper.setAttribute('data-id', hs.id);

    // Render Icon Visual
    if (isLink) {
      const icon = document.createElement('img');
      icon.src = '/img/link.png';
      icon.className = 'editor-hs-icon link-icon';
      const rot = hs.rotation ?? 0;
      icon.style.transform = `rotate(${rot}rad)`;
      wrapper.appendChild(icon);

      const label = document.createElement('span');
      label.className = 'editor-hs-tooltip';
      label.textContent = hs.title || this.getSceneName(hs.target);
      wrapper.appendChild(label);
    } else {
      const icon = document.createElement('img');
      icon.src = '/img/info.png';
      icon.className = 'editor-hs-icon info-icon';
      wrapper.appendChild(icon);

      const label = document.createElement('span');
      label.className = 'editor-hs-tooltip';
      label.textContent = hs.title || 'Info';
      wrapper.appendChild(label);
    }

    // Status Indicator Badge in editor mode
    if (!isPreview) {
      const badge = document.createElement('div');
      badge.className = `editor-hs-badge badge-${hs.status || 'published'}`;
      badge.textContent = hs.status === 'draft' ? 'D' : hs.isActive === false ? 'OFF' : '✓';
      wrapper.appendChild(badge);
    }

    // Event Klik Hotspot pada mode editor
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectHotspot(hs.id);
    });

    // Fitur Drag / Pindahkan Hotspot dengan Pointer/Mouse
    this.attachDragEvents(wrapper, hs);

    return wrapper;
  }

  attachDragEvents(element, hs) {
    let startX = 0;
    let startY = 0;
    let hasMoved = false;

    const onPointerDown = (e) => {
      if (this.mode === 'preview') return;
      e.stopPropagation();

      this.isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      startY = e.clientY;

      const panoEl = document.getElementById('admin-editor-pano');
      const rect = panoEl.getBoundingClientRect();

      const onPointerMove = (moveEvt) => {
        if (!this.isDragging) return;
        const dx = moveEvt.clientX - startX;
        const dy = moveEvt.clientY - startY;
        if (Math.hypot(dx, dy) > 5) {
          hasMoved = true;
          // Hitung yaw & pitch posisi kursor saat ini
          const currentX = moveEvt.clientX - rect.left;
          const currentY = moveEvt.clientY - rect.top;
          const coords = this.currentView.screenToCoordinates({ x: currentX, y: currentY });
          if (coords) {
            hs.yaw = coords.yaw;
            hs.pitch = coords.pitch;
            // Update live coordinate form fields if selected
            this.updateCoordinateInputsUI(coords.yaw, coords.pitch);
            this.renderHotspotsOnCurrentScene();
          }
        }
      };

      const onPointerUp = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        setTimeout(() => {
          this.isDragging = false;
        }, 50);

        if (hasMoved) {
          this.saveHistorySnapshot('Pindahkan Hotspot');
          this.hasUnsavedChanges = true;
          this.notifyHotspotsChanged();
          this.showToast(`Posisi hotspot "${hs.title || hs.id}" berhasil diperbarui.`);
        }
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    };

    element.addEventListener('pointerdown', onPointerDown);
  }

  selectHotspot(hotspotId) {
    this.selectedHotspotId = hotspotId;
    const hs = this.getHotspots().find((h) => h.id === hotspotId);
    if (!hs) return;

    // Jika hotspot berada di scene lain, ganti scene terlebih dahulu
    if (hs.sceneId !== this.currentSceneId) {
      this.setScene(hs.sceneId);
    }

    this.renderHotspotsOnCurrentScene();
    this.highlightListItem(hotspotId);
    this.openHotspotForm(hs);
  }

  updateCoordinateInputsUI(yaw, pitch) {
    const yawInput = document.getElementById('prop-yaw');
    const pitchInput = document.getElementById('prop-pitch');
    if (yawInput) yawInput.value = Number(yaw).toFixed(4);
    if (pitchInput) pitchInput.value = Number(pitch).toFixed(4);
  }

  /**
   * Formulir Pengaturan Hotspot di Panel Samping
   */
  openHotspotForm(hs) {
    const formCard = document.getElementById('editor-properties-panel');
    if (!formCard) return;

    formCard.classList.remove('empty-state');

    const isLink = hs.type === 'link';
    const otherScenes = this.scenes;

    const targetOptions = otherScenes
      .map((s) => `<option value="${s.id}" ${s.id === hs.target ? 'selected' : ''}>${s.name} (${s.id})</option>`)
      .join('');

    const initialDescText = htmlToPlainText(hs.text || hs.rawText || '');

    formCard.innerHTML = `
      <div class="prop-form-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="prop-type-badge ${isLink ? 'badge-link' : 'badge-info'}">
            ${isLink ? '🧭 Hotspot Navigasi' : 'ℹ️ Hotspot Informasi'}
          </span>
          <span class="prop-id-label">ID: <code>${hs.id}</code></span>
        </div>
        <button id="btn-close-prop-form" class="icon-btn-sm" title="Tutup Formulir">✕</button>
      </div>

      <form id="hotspot-properties-form" class="prop-form-body">
        <div class="form-group">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label for="prop-title" style="margin-bottom: 0;">Judul / Nama Hotspot:</label>
            <span id="prop-title-counter" style="font-size: 10px; color: var(--clr-text-dim);">${(hs.title || '').length} karakter</span>
          </div>
          <input type="text" id="prop-title" class="form-input" value="${escapeHtml(hs.title || '')}" placeholder="Contoh: Pohon Trembesi / Menuju Titik 2" required />
          ${
            isLink
              ? `
            <button type="button" id="btn-sync-target-title" class="btn-xs-helper" title="Samakan judul dengan nama scene tujuan saat ini">
              🔄 Gunakan Nama Scene Tujuan
            </button>
          `
              : ''
          }
        </div>

        ${
          isLink
            ? `
          <div class="form-group">
            <label for="prop-target">Scene Tujuan:</label>
            <select id="prop-target" class="form-select">
              ${targetOptions}
            </select>
          </div>
          <div class="form-group">
            <label for="prop-rotation">Rotasi Arah Panah (Derajat):</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="range" id="prop-rotation-slider" min="0" max="360" value="${Math.round(((hs.rotation || 0) * 180) / Math.PI)}" style="flex: 1;" />
              <input type="number" id="prop-rotation" class="form-input" style="width: 70px;" value="${Math.round(((hs.rotation || 0) * 180) / Math.PI)}" />
            </div>
          </div>
        `
            : `
          <div class="form-group">
            <label for="prop-info-source">Sumber Konten Informasi:</label>
            <select id="prop-info-source" class="form-select">
              <option value="manual" ${(!hs.infoSourceType || hs.infoSourceType === 'manual') ? 'selected' : ''}>✏️ Konten Manual (Teks Bebas)</option>
              <option value="tree_species" ${hs.infoSourceType === 'tree_species' ? 'selected' : ''}>🌿 Master Jenis Pohon (Data Dinamis)</option>
              <option value="planting_activity" ${hs.infoSourceType === 'planting_activity' ? 'selected' : ''}>📋 Kelompok / Kegiatan Penanaman</option>
              <option value="latest_survey" ${hs.infoSourceType === 'latest_survey' ? 'selected' : ''}>🔍 Pemantauan Terkini Kelompok Tanam</option>
            </select>
            <small style="color: var(--clr-text-dim); display: block; margin-top: 4px;">
              Pilih sumber informasi untuk mengisi judul & deskripsi secara otomatis.
            </small>
          </div>

          <div class="form-group ${hs.infoSourceType === 'tree_species' ? '' : 'hidden'}" id="group-select-tree-species">
            <label for="prop-tree-species">Pilih Spesies Pohon Terkait:</label>
            <select id="prop-tree-species" class="form-select">
              <option value="">-- Pilih Jenis Pohon --</option>
              ${this.cachedTreeSpeciesList.map((sp) => `<option value="${sp.id}" ${sp.id == hs.treeSpeciesId ? 'selected' : ''}>${escapeHtml(sp.common_name)} (${escapeHtml(sp.scientific_name || '')})</option>`).join('')}
            </select>
          </div>

          <div class="form-group ${(hs.infoSourceType === 'planting_activity' || hs.infoSourceType === 'latest_survey') ? '' : 'hidden'}" id="group-select-planting-activity">
            <label for="prop-planting-activity">Pilih Kelompok / Batch Penanaman:</label>
            <select id="prop-planting-activity" class="form-select">
              <option value="">-- Pilih Kelompok Penanaman --</option>
              ${this.cachedPlantingActivitiesList.map((act) => `<option value="${act.id}" ${act.id == hs.plantingActivityId ? 'selected' : ''}>[${escapeHtml(act.batch_code)}] ${escapeHtml(act.name)} (${escapeHtml(act.location_zone)})</option>`).join('')}
            </select>
          </div>

          <div class="form-group" id="group-prop-desc">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label for="prop-desc" style="margin-bottom: 0;">Deskripsi Informasi:</label>
              <span id="prop-desc-counter" style="font-size: 10px; color: var(--clr-text-dim);">0 karakter</span>
            </div>

            <!-- Formatting Toolbar -->
            <div class="editor-format-toolbar">
              <button type="button" class="editor-format-btn" data-tag="b" title="Tebal / Bold"><b>B</b></button>
              <button type="button" class="editor-format-btn" data-tag="i" title="Miring / Italic"><i>I</i></button>
              <button type="button" class="editor-format-btn" data-tag="bullet" title="Daftar Poin / Bullet List">• List</button>
              <button type="button" class="editor-format-btn" data-tag="nl" title="Baris Baru / Newline">↵ Baris</button>
              <button type="button" class="editor-format-btn btn-template" id="btn-tpl-tree" title="Sisipkan Template Informasi Pohon">🌿 Template Pohon</button>
              <button type="button" class="editor-format-btn btn-template" id="btn-tpl-activity" title="Sisipkan Template Kegiatan">📋 Template Kegiatan</button>
              <button type="button" class="editor-format-btn btn-clean" id="btn-clean-html" title="Rapikan dan hilangkan tag HTML mentah">🧹 Rapikan Teks</button>
            </div>

            <textarea id="prop-desc" class="form-textarea has-toolbar" rows="5" placeholder="Tuliskan keterangan detail informasi pohon atau konservasi...">${escapeHtml(initialDescText)}</textarea>

            <!-- Live Info Preview Box -->
            <div class="editor-info-preview-card">
              <div class="editor-info-preview-header">
                <span class="preview-badge">👁️ Pratinjau Tampilan Info</span>
                <button type="button" id="btn-toggle-preview" class="btn-xs-text">Sembunyikan</button>
              </div>
              <div id="editor-info-preview-content" class="editor-info-preview-body">
                <div class="preview-title" id="preview-title-render">${escapeHtml(hs.title || 'Informasi')}</div>
                <div class="preview-text" id="preview-desc-render">${renderFormattedDescription(initialDescText)}</div>
              </div>
            </div>
          </div>
        `
        }

        <div class="form-row">
          <div class="form-group" style="flex: 1;">
            <label for="prop-yaw">Koordinat Yaw (Rad):</label>
            <input type="number" step="0.001" id="prop-yaw" class="form-input" value="${Number(hs.yaw).toFixed(4)}" />
          </div>
          <div class="form-group" style="flex: 1;">
            <label for="prop-pitch">Koordinat Pitch (Rad):</label>
            <input type="number" step="0.001" id="prop-pitch" class="form-input" value="${Number(hs.pitch).toFixed(4)}" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group" style="flex: 1;">
            <label for="prop-status">Status Publikasi:</label>
            <select id="prop-status" class="form-select">
              <option value="draft" ${hs.status === 'draft' ? 'selected' : ''}>📝 Draft (Belum Publik)</option>
              <option value="published" ${hs.status === 'published' ? 'selected' : ''}>🚀 Published (Publik)</option>
              <option value="inactive" ${hs.status === 'inactive' ? 'selected' : ''}>⏸️ Inactive (Nonaktif)</option>
            </select>
          </div>
          <div class="form-group" style="flex: 1; display: flex; align-items: center; margin-top: 22px;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="prop-active" ${hs.isActive !== false ? 'checked' : ''} />
              <span>Titik Aktif</span>
            </label>
          </div>
        </div>

        <div class="prop-form-actions">
          <button type="button" id="btn-apply-props" class="btn-primary-action btn-sm">
            💾 Perbarui
          </button>
          <button type="button" id="btn-duplicate-current" class="btn-secondary-action btn-sm" title="Gandakan titik ini">
            📋 Duplikasi
          </button>
          <button type="button" id="btn-delete-current" class="btn-danger-action btn-sm" title="Hapus titik ini">
            🗑️ Hapus
          </button>
        </div>
      </form>
    `;

    // Event listener formulir
    const form = document.getElementById('hotspot-properties-form');
    const btnApply = document.getElementById('btn-apply-props');
    const btnDuplicate = document.getElementById('btn-duplicate-current');
    const btnDelete = document.getElementById('btn-delete-current');
    const btnClose = document.getElementById('btn-close-prop-form');

    const titleInput = document.getElementById('prop-title');
    const titleCounter = document.getElementById('prop-title-counter');
    const previewTitle = document.getElementById('preview-title-render');

    const descTextarea = document.getElementById('prop-desc');
    const descCounter = document.getElementById('prop-desc-counter');
    const previewDesc = document.getElementById('preview-desc-render');
    const previewCard = document.getElementById('editor-info-preview-content');
    const btnTogglePreview = document.getElementById('btn-toggle-preview');

    const rotationSlider = document.getElementById('prop-rotation-slider');
    const rotationInput = document.getElementById('prop-rotation');

    const infoSourceSelect = document.getElementById('prop-info-source');
    const groupSpecies = document.getElementById('group-select-tree-species');
    const groupActivity = document.getElementById('group-select-planting-activity');
    const selectSpecies = document.getElementById('prop-tree-species');
    const selectActivity = document.getElementById('prop-planting-activity');

    const btnSyncTarget = document.getElementById('btn-sync-target-title');
    const targetSelect = document.getElementById('prop-target');

    // Live Title Updates
    const updateTitleLive = (val) => {
      hs.title = val;
      if (titleCounter) titleCounter.textContent = `${val.length} karakter`;
      if (previewTitle) previewTitle.textContent = val || (isLink ? 'Navigasi' : 'Informasi');

      // Update tooltip pada Marzipano 360 view secara langsung
      const activeHsEl = document.querySelector(`.editor-hotspot-item[data-id="${hs.id}"] .editor-hs-tooltip`);
      if (activeHsEl) {
        activeHsEl.textContent = val || (isLink ? this.getSceneName(hs.target) : 'Info');
      }

      // Update baris pada tabel daftar hotspot
      const rowTitle = document.querySelector(`.editor-hotspots-table tr[data-id="${hs.id}"] .hs-row-title, .editor-hotspots-table div[data-id="${hs.id}"] .hs-row-title`);
      if (rowTitle) {
        rowTitle.textContent = val || hs.id;
      }

      this.hasUnsavedChanges = true;
    };

    titleInput?.addEventListener('input', (e) => {
      updateTitleLive(e.target.value.trim());
    });

    if (btnSyncTarget && targetSelect && titleInput) {
      btnSyncTarget.addEventListener('click', () => {
        const selectedSceneName = this.getSceneName(targetSelect.value);
        titleInput.value = selectedSceneName;
        updateTitleLive(selectedSceneName);
        this.showToast(`Judul disinkronkan ke: ${selectedSceneName}`);
      });
    }

    if (targetSelect) {
      targetSelect.addEventListener('change', () => {
        if (isLink && (!titleInput.value || titleInput.value.startsWith('Menuju '))) {
          const selectedSceneName = this.getSceneName(targetSelect.value);
          titleInput.value = `Menuju ${selectedSceneName}`;
          updateTitleLive(titleInput.value);
        }
      });
    }

    // Live Description Updates & Counter
    const updateDescLive = (val) => {
      hs.text = val;
      if (descCounter) {
        const lines = val ? val.split('\n').length : 0;
        descCounter.textContent = `${val.length} karakter • ${lines} baris`;
      }
      if (previewDesc) {
        previewDesc.innerHTML = renderFormattedDescription(val);
      }
      this.hasUnsavedChanges = true;
    };

    descTextarea?.addEventListener('input', (e) => {
      updateDescLive(e.target.value);
    });

    if (descTextarea) {
      const initVal = descTextarea.value;
      const lines = initVal ? initVal.split('\n').length : 0;
      if (descCounter) descCounter.textContent = `${initVal.length} karakter • ${lines} baris`;
    }

    if (btnTogglePreview && previewCard) {
      btnTogglePreview.addEventListener('click', () => {
        const isHidden = previewCard.classList.toggle('hidden');
        btnTogglePreview.textContent = isHidden ? 'Tampilkan' : 'Sembunyikan';
      });
    }

    // Formatting Toolbar Buttons
    const insertFormatTag = (tag) => {
      if (!descTextarea) return;
      const start = descTextarea.selectionStart;
      const end = descTextarea.selectionEnd;
      const text = descTextarea.value;
      const selected = text.substring(start, end);

      let replacement = '';
      let cursorOffset = 0;

      if (tag === 'b') {
        replacement = `<b>${selected || 'Teks Tebal'}</b>`;
        cursorOffset = selected ? replacement.length : 3 + (selected || 'Teks Tebal').length;
      } else if (tag === 'i') {
        replacement = `<i>${selected || 'Teks Miring'}</i>`;
        cursorOffset = selected ? replacement.length : 3 + (selected || 'Teks Miring').length;
      } else if (tag === 'bullet') {
        if (selected) {
          replacement = selected
            .split('\n')
            .map((line) => (line.startsWith('• ') ? line : `• ${line}`))
            .join('\n');
        } else {
          replacement = '• Item poin baru\n';
        }
        cursorOffset = replacement.length;
      } else if (tag === 'nl') {
        replacement = '\n';
        cursorOffset = 1;
      }

      descTextarea.value = text.substring(0, start) + replacement + text.substring(end);
      descTextarea.focus();
      descTextarea.setSelectionRange(start + cursorOffset, start + cursorOffset);
      updateDescLive(descTextarea.value);
    };

    form?.querySelectorAll('.editor-format-btn[data-tag]').forEach((btn) => {
      btn.addEventListener('click', () => {
        insertFormatTag(btn.getAttribute('data-tag'));
      });
    });

    document.getElementById('btn-clean-html')?.addEventListener('click', () => {
      if (!descTextarea) return;
      const cleaned = htmlToPlainText(descTextarea.value);
      descTextarea.value = cleaned;
      updateDescLive(cleaned);
      this.showToast('Format teks telah dirapikan.');
    });

    document.getElementById('btn-tpl-tree')?.addEventListener('click', () => {
      if (!descTextarea) return;
      const tpl = `Nama Lokal: -\nNama Ilmiah: -\nFamili: -\nStatus: Jenis Asli / Lokal\n\nFungsi Ekologis:\nPohon konservasi dan pengayaan vegetasi kawasan.\n\nManfaat:\nPeneduh alami, penahan erosi, dan penunjang mikroklimat.`;
      descTextarea.value = (descTextarea.value ? descTextarea.value + '\n\n' : '') + tpl;
      updateDescLive(descTextarea.value);
      this.showToast('Template informasi pohon disisipkan.');
    });

    document.getElementById('btn-tpl-activity')?.addEventListener('click', () => {
      if (!descTextarea) return;
      const tpl = `Batch Penanaman: -\nZona: Blok Restorasi\nTanggal Tanam: -\nPelaksana: -\nTotal Bibit: 100 bibit\nKelangsungan Hidup: 95%`;
      descTextarea.value = (descTextarea.value ? descTextarea.value + '\n\n' : '') + tpl;
      updateDescLive(descTextarea.value);
      this.showToast('Template kegiatan penanaman disisipkan.');
    });

    // Dynamic Tree & Activity Auto-population
    if (infoSourceSelect) {
      infoSourceSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (groupSpecies) groupSpecies.classList.toggle('hidden', val !== 'tree_species');
        if (groupActivity) groupActivity.classList.toggle('hidden', val !== 'planting_activity' && val !== 'latest_survey');
      });
    }

    if (selectSpecies) {
      selectSpecies.addEventListener('change', (e) => {
        const spId = e.target.value;
        if (!spId) return;
        const sp = this.cachedTreeSpeciesList.find((s) => String(s.id) === String(spId));
        if (!sp) return;

        // Auto-update Judul / Nama Hotspot
        const autoTitle = sp.common_name + (sp.scientific_name ? ` (${sp.scientific_name})` : '');
        if (titleInput) {
          titleInput.value = autoTitle;
          updateTitleLive(autoTitle);
        }

        // Auto-populate Deskripsi Informasi
        const descParts = [
          `Nama Lokal: ${sp.local_name || sp.common_name}`,
          `Nama Ilmiah: ${sp.scientific_name || '-'}`,
          `Famili: ${sp.family || '-'}`,
          `Status Asal: ${sp.origin_status_label || sp.origin_status || 'Jenis Asli / Lokal'}`,
        ];
        if (sp.total_planted > 0) {
          descParts.push(`Total Ditanam: ${sp.total_planted} bibit`);
        }
        descParts.push('');
        descParts.push('Fungsi Ekologis:');
        descParts.push(sp.ecological_function || 'Pohon konservasi dan pengayaan vegetasi alami.');
        descParts.push('');
        descParts.push('Manfaat & Karakteristik:');
        descParts.push(sp.description || sp.benefits || 'Pohon konservasi pendukung ekosistem.');

        const formattedDesc = descParts.join('\n');
        if (descTextarea) {
          descTextarea.value = formattedDesc;
          updateDescLive(formattedDesc);
        }

        this.showToast(`Konten diisi dari spesies: ${sp.common_name}`);
      });
    }

    if (selectActivity) {
      selectActivity.addEventListener('change', (e) => {
        const actId = e.target.value;
        if (!actId) return;
        const act = this.cachedPlantingActivitiesList.find((a) => String(a.id) === String(actId));
        if (!act) return;

        // Auto-update Judul / Nama Hotspot
        const autoTitle = `[${act.batch_code}] ${act.name}`;
        if (titleInput) {
          titleInput.value = autoTitle;
          updateTitleLive(autoTitle);
        }

        // Auto-populate Deskripsi Informasi
        const descParts = [
          `Kelompok / Batch: ${act.batch_code}`,
          `Nama Kegiatan: ${act.name}`,
          `Zona Lokasi: ${act.location_zone || '-'}`,
          `Tanggal Tanam: ${act.activity_date || '-'}`,
          `Penyelenggara: ${act.organizer || '-'} (PJ: ${act.person_in_charge || '-'})`,
          `Total Bibit Awal: ${act.total_initial_seedlings || 0} bibit`,
          `Tingkat Kelangsungan: ${act.survival_rate !== null && act.survival_rate !== undefined ? act.survival_rate + '%' : 'Dalam pemantauan'}`,
        ];

        if (Array.isArray(act.species_list) && act.species_list.length > 0) {
          descParts.push('');
          descParts.push('Komposisi Jenis Pohon:');
          act.species_list.forEach((item) => {
            descParts.push(`• ${item.common_name || item.species_id}: ${item.quantity} ${item.unit || 'bibit'}`);
          });
        }

        const formattedDesc = descParts.join('\n');
        if (descTextarea) {
          descTextarea.value = formattedDesc;
          updateDescLive(formattedDesc);
        }

        this.showToast(`Konten diisi dari kelompok: ${act.batch_code}`);
      });
    }

    if (rotationSlider && rotationInput) {
      rotationSlider.addEventListener('input', (e) => {
        rotationInput.value = e.target.value;
      });
      rotationInput.addEventListener('input', (e) => {
        rotationSlider.value = e.target.value;
      });
    }

    const applyChanges = () => {
      this.saveHistorySnapshot('Edit Pengaturan Hotspot');

      hs.title = document.getElementById('prop-title')?.value.trim() || '';
      hs.yaw = parseFloat(document.getElementById('prop-yaw')?.value) || 0;
      hs.pitch = parseFloat(document.getElementById('prop-pitch')?.value) || 0;
      hs.status = document.getElementById('prop-status')?.value || 'published';
      hs.isActive = document.getElementById('prop-active')?.checked !== false;

      if (isLink) {
        hs.target = document.getElementById('prop-target')?.value;
        const deg = parseFloat(rotationInput?.value || 0);
        hs.rotation = (deg * Math.PI) / 180;
        hs.infoSourceType = 'manual';
        hs.treeSpeciesId = null;
        hs.plantingActivityId = null;
      } else {
        hs.text = document.getElementById('prop-desc')?.value || '';
        hs.infoSourceType = infoSourceSelect?.value || 'manual';
        hs.treeSpeciesId = hs.infoSourceType === 'tree_species' ? (document.getElementById('prop-tree-species')?.value || null) : null;
        hs.plantingActivityId = (hs.infoSourceType === 'planting_activity' || hs.infoSourceType === 'latest_survey') ? (document.getElementById('prop-planting-activity')?.value || null) : null;
      }

      this.hasUnsavedChanges = true;
      this.renderHotspotsOnCurrentScene();
      this.renderHotspotsList();
      this.notifyHotspotsChanged();
      this.showToast('Perubahan hotspot diterapkan di memori.');
    };

    btnApply?.addEventListener('click', applyChanges);
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      applyChanges();
    });

    btnDuplicate?.addEventListener('click', () => {
      this.duplicateHotspot(hs.id);
    });

    btnDelete?.addEventListener('click', () => {
      this.deleteHotspot(hs.id);
    });

    btnClose?.addEventListener('click', () => {
      this.selectedHotspotId = null;
      this.renderHotspotsOnCurrentScene();
      this.renderHotspotsList();
      formCard.innerHTML = `
        <div class="prop-empty-notice">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p>Pilih salah satu hotspot di panorama atau daftar untuk mengubah propertinya.</p>
        </div>
      `;
    });
  }

  /**
   * Fitur Duplikasi Hotspot
   * Membuat salinan dengan ID baru, yaw bergeser sedikit (+0.08 rad), dan status draft.
   */
  duplicateHotspot(hotspotId) {
    const original = this.getHotspots().find((h) => h.id === hotspotId);
    if (!original) return;

    this.saveHistorySnapshot('Duplikasi Hotspot');

    const newId = `hs_copy_${Date.now()}`;
    const copy = JSON.parse(JSON.stringify(original));
    copy.id = newId;
    copy.title = `${original.title || 'Hotspot'} (Salinan)`;
    // Geser posisi yaw sedikit agar tidak tumpang tindih
    copy.yaw = (copy.yaw || 0) + 0.08;
    copy.pitch = (copy.pitch || 0) + 0.01;
    copy.status = 'draft';
    copy.source = 'editor';

    const allHotspots = this.getHotspots();
    allHotspots.push(copy);

    this.selectedHotspotId = newId;
    this.hasUnsavedChanges = true;
    this.renderHotspotsOnCurrentScene();
    this.renderHotspotsList();
    this.openHotspotForm(copy);
    this.notifyHotspotsChanged();
    this.showToast(`Hotspot berhasil digandakan sebagai draft (${newId})!`);
  }

  /**
   * Salin Hotspot ke Clipboard untuk Ditempel ke Scene Lain
   */
  copyHotspotToClipboard(hotspotId) {
    const original = this.getHotspots().find((h) => h.id === hotspotId);
    if (!original) return;
    this.clipboardHotspot = JSON.parse(JSON.stringify(original));
    this.showToast(`Hotspot "${original.title || original.id}" disalin ke papan klip.`);
  }

  pasteHotspotFromClipboard() {
    if (!this.clipboardHotspot) {
      EcoToast.warning('Papan Klip Kosong', 'Salin hotspot terlebih dahulu menggunakan tombol Salin.');
      return;
    }

    this.saveHistorySnapshot('Tempel Hotspot');

    const newId = `hs_paste_${Date.now()}`;
    const copy = JSON.parse(JSON.stringify(this.clipboardHotspot));
    copy.id = newId;
    copy.sceneId = this.currentSceneId; // Pasang di scene aktif saat ini
    copy.title = `${copy.title} (Tempel)`;
    copy.status = 'draft';
    copy.source = 'editor';

    // Jika ini hotspot navigasi dan targetnya sama dengan scene saat ini, arahkan ke scene lain
    if (copy.type === 'link' && copy.target === this.currentSceneId) {
      const altScene = this.scenes.find((s) => s.id !== this.currentSceneId);
      if (altScene) copy.target = altScene.id;
    }

    const allHotspots = this.getHotspots();
    allHotspots.push(copy);

    this.selectedHotspotId = newId;
    this.hasUnsavedChanges = true;
    this.renderHotspotsOnCurrentScene();
    this.renderHotspotsList();
    this.openHotspotForm(copy);
    this.notifyHotspotsChanged();
    this.showToast(`Hotspot ditempelkan ke scene ${this.currentSceneId} sebagai draft.`);
  }

  deleteHotspot(hotspotId) {
    const hs = this.getHotspots().find((h) => h.id === hotspotId);
    if (!hs) return;

    if (!confirm(`Apakah Anda yakin ingin menghapus hotspot "${hs.title || hs.id}"?`)) {
      return;
    }

    this.saveHistorySnapshot('Hapus Hotspot');

    const allHotspots = this.getHotspots();
    const index = allHotspots.findIndex((h) => h.id === hotspotId);
    if (index !== -1) {
      allHotspots.splice(index, 1);
    }

    this.selectedHotspotId = null;
    this.hasUnsavedChanges = true;
    this.renderHotspotsOnCurrentScene();
    this.renderHotspotsList();

    const formCard = document.getElementById('editor-properties-panel');
    if (formCard) {
      formCard.innerHTML = `
        <div class="prop-empty-notice">
          <p>Hotspot telah dihapus. Pilih hotspot lain untuk melihat detailnya.</p>
        </div>
      `;
    }

    this.notifyHotspotsChanged();
    this.showToast('Hotspot berhasil dihapus.');
  }

  /**
   * Undo & Redo Mechanics
   */
  saveHistorySnapshot(actionName = 'Perubahan') {
    const snapshot = JSON.stringify(this.getHotspots());
    this.historyStack.push(snapshot);
    if (this.historyStack.length > 30) this.historyStack.shift();
    this.redoStack = []; // Kosongkan redo saat ada aksi baru
    this.updateUndoRedoButtonsUI();
  }

  undo() {
    if (this.historyStack.length === 0) return;
    const current = JSON.stringify(this.getHotspots());
    this.redoStack.push(current);

    const previousSnapshot = this.historyStack.pop();
    const parsed = JSON.parse(previousSnapshot);

    const allHotspots = this.getHotspots();
    allHotspots.length = 0;
    parsed.forEach((item) => allHotspots.push(item));

    this.hasUnsavedChanges = true;
    this.renderHotspotsOnCurrentScene();
    this.renderHotspotsList();
    this.updateUndoRedoButtonsUI();
    this.notifyHotspotsChanged();
    this.showToast('Undo: Perubahan terakhir dibatalkan.');
  }

  redo() {
    if (this.redoStack.length === 0) return;
    const current = JSON.stringify(this.getHotspots());
    this.historyStack.push(current);

    const nextSnapshot = this.redoStack.pop();
    const parsed = JSON.parse(nextSnapshot);

    const allHotspots = this.getHotspots();
    allHotspots.length = 0;
    parsed.forEach((item) => allHotspots.push(item));

    this.hasUnsavedChanges = true;
    this.renderHotspotsOnCurrentScene();
    this.renderHotspotsList();
    this.updateUndoRedoButtonsUI();
    this.notifyHotspotsChanged();
    this.showToast('Redo: Perubahan dikembalikan.');
  }

  updateUndoRedoButtonsUI() {
    const btnUndo = document.getElementById('tool-undo');
    const btnRedo = document.getElementById('tool-redo');
    if (btnUndo) btnUndo.disabled = this.historyStack.length === 0;
    if (btnRedo) btnRedo.disabled = this.redoStack.length === 0;
  }

  /**
   * Simpan Permanen ke Server
   */
  async saveToServer(publishAllDrafts = false) {
    const allHotspots = this.getHotspots();

    if (publishAllDrafts) {
      allHotspots.forEach((h) => {
        if (h.status === 'draft') h.status = 'published';
      });
    }

    const btnSave = document.getElementById('btn-editor-save-draft');
    const btnPub = document.getElementById('btn-editor-publish');
    if (btnSave) btnSave.disabled = true;
    if (btnPub) btnPub.disabled = true;

    try {
      const result = await ApiService.saveHotspots(allHotspots);
      this.hasUnsavedChanges = false;
      this.renderHotspotsOnCurrentScene();
      this.renderHotspotsList();
      this.notifyHotspotsChanged();
      if (publishAllDrafts) {
        EcoToast.published(result?.message || 'Seluruh hotspot berhasil dipublikasikan!');
      } else {
        EcoToast.saved(result?.message || 'Perubahan hotspot berhasil disimpan ke server.');
      }
    } catch (err) {
      console.error('Gagal menyimpan:', err);
      EcoToast.error('✕ Gagal menyimpan ke server', err.message || 'Perubahan tetap tersimpan sementara di memori browser.');
    } finally {
      if (btnSave) btnSave.disabled = false;
      if (btnPub) btnPub.disabled = false;
    }
  }

  /**
   * Render Daftar Hotspot dengan Pencarian dan Filter
   */
  renderHotspotsList() {
    const listContainer = document.getElementById('editor-hotspots-table');
    const countBadge = document.getElementById('editor-filter-count');
    if (!listContainer) return;

    let items = [...this.getHotspots()];

    // Filter Scene
    if (this.filterScene !== 'all') {
      items = items.filter((h) => h.sceneId === this.filterScene);
    }

    // Filter Type
    if (this.filterType !== 'all') {
      items = items.filter((h) => h.type === this.filterType);
    }

    // Filter Status
    if (this.filterStatus !== 'all') {
      items = items.filter((h) => h.status === this.filterStatus);
    }

    // Search Query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((h) => {
        const titleMatch = (h.title || '').toLowerCase().includes(q);
        const textMatch = (h.text || '').toLowerCase().includes(q);
        const targetMatch = (h.target || '').toLowerCase().includes(q);
        return titleMatch || textMatch || targetMatch;
      });
    }

    if (countBadge) countBadge.textContent = `${items.length} Hotspot`;

    if (items.length === 0) {
      listContainer.innerHTML = `
        <div class="list-empty-msg">
          Tidak ada hotspot yang cocok dengan filter atau pencarian.
        </div>
      `;
      return;
    }

    listContainer.innerHTML = items
      .map((h) => {
        const isSelected = h.id === this.selectedHotspotId;
        const isCurrentScene = h.sceneId === this.currentSceneId;
        const sceneName = this.getSceneName(h.sceneId);

        return `
          <div class="hs-list-row ${isSelected ? 'active-row' : ''}" data-id="${h.id}">
            <div class="hs-row-left">
              <span class="hs-type-indicator ${h.type === 'link' ? 'type-link' : 'type-info'}">
                ${h.type === 'link' ? '🧭' : 'ℹ️'}
              </span>
              <div class="hs-row-info">
                <div class="hs-row-title">${escapeHtml(h.title || h.id)}</div>
                <div class="hs-row-scene">
                  <span>${sceneName}</span>
                  ${h.type === 'link' ? `<span>→ Menuju: ${this.getSceneName(h.target)}</span>` : ''}
                </div>
              </div>
            </div>

            <div class="hs-row-right">
              <span class="hs-status-pill pill-${h.status || 'published'}">
                ${h.status || 'published'}
              </span>
              <button class="btn-row-action btn-row-select" data-id="${h.id}" title="Pilih & Buka">
                ${isCurrentScene ? 'Buka' : 'Lompat'}
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    // Attach row events
    listContainer.querySelectorAll('.hs-list-row').forEach((row) => {
      row.addEventListener('click', () => {
        const id = row.getAttribute('data-id');
        this.selectHotspot(id);
      });
    });
  }

  highlightListItem(hotspotId) {
    document.querySelectorAll('.hs-list-row').forEach((row) => {
      row.classList.toggle('active-row', row.getAttribute('data-id') === hotspotId);
    });
  }

  bindToolbarEvents() {
    // Mode Tools
    document.getElementById('tool-select')?.addEventListener('click', () => this.setMode('select'));
    document.getElementById('tool-add-link')?.addEventListener('click', () => this.setMode('add-link'));
    document.getElementById('tool-add-info')?.addEventListener('click', () => this.setMode('add-info'));
    document.getElementById('tool-move')?.addEventListener('click', () => this.setMode('move'));
    document.getElementById('tool-preview')?.addEventListener('click', () => {
      this.setMode(this.mode === 'preview' ? 'select' : 'preview');
    });

    // Preview Mode Controls
    document.getElementById('btn-exit-preview')?.addEventListener('click', () => {
      this.setMode('select');
    });

    const previewSceneSelect = document.getElementById('editor-preview-scene-select');
    if (previewSceneSelect) {
      previewSceneSelect.addEventListener('change', (e) => {
        this.setScene(e.target.value);
      });
    }

    const previewToggleDrafts = document.getElementById('preview-toggle-drafts');
    if (previewToggleDrafts) {
      previewToggleDrafts.addEventListener('change', (e) => {
        this.previewShowDrafts = e.target.checked;
        this.renderHotspotsOnCurrentScene();
        this.showToast(this.previewShowDrafts ? 'Hotspot draf disertakan dalam pratinjau.' : 'Hanya hotspot published yang ditampilkan.');
      });
    }

    // Undo / Redo
    document.getElementById('tool-undo')?.addEventListener('click', () => this.undo());
    document.getElementById('tool-redo')?.addEventListener('click', () => this.redo());

    // Duplicate & Paste Toolbar Shortcuts
    document.getElementById('tool-duplicate')?.addEventListener('click', () => {
      if (this.selectedHotspotId) this.duplicateHotspot(this.selectedHotspotId);
      else EcoToast.warning('Peringatan', 'Pilih salah satu hotspot terlebih dahulu untuk digandakan.');
    });

    document.getElementById('tool-copy')?.addEventListener('click', () => {
      if (this.selectedHotspotId) this.copyHotspotToClipboard(this.selectedHotspotId);
      else EcoToast.warning('Peringatan', 'Pilih salah satu hotspot terlebih dahulu untuk disalin.');
    });

    document.getElementById('tool-paste')?.addEventListener('click', () => {
      this.pasteHotspotFromClipboard();
    });

    document.getElementById('tool-delete')?.addEventListener('click', () => {
      if (this.selectedHotspotId) this.deleteHotspot(this.selectedHotspotId);
      else EcoToast.warning('Peringatan', 'Pilih hotspot yang ingin dihapus.');
    });

    // Save & Publish
    document.getElementById('btn-editor-save-draft')?.addEventListener('click', () => {
      this.saveToServer(false);
    });

    document.getElementById('btn-editor-publish')?.addEventListener('click', () => {
      if (confirm('Publikasikan seluruh perubahan hotspot agar dapat langsung dilihat oleh pengunjung?')) {
        this.saveToServer(true);
      }
    });

    // Scene Selector
    const sceneSelect = document.getElementById('editor-scene-select');
    if (sceneSelect) {
      sceneSelect.addEventListener('change', (e) => {
        this.setScene(e.target.value);
      });
    }
  }

  bindFormEvents() {
    // Revert changes button
    document.getElementById('btn-editor-revert')?.addEventListener('click', async () => {
      if (confirm('Batalkan seluruh perubahan yang belum disimpan dan muat ulang dari server?')) {
        const fresh = await ApiService.getHotspots();
        const allHotspots = this.getHotspots();
        allHotspots.length = 0;
        fresh.forEach((h) => allHotspots.push(h));
        this.hasUnsavedChanges = false;
        this.renderHotspotsOnCurrentScene();
        this.renderHotspotsList();
        this.notifyHotspotsChanged();
        this.showToast('Data dikembalikan ke versi server.');
      }
    });
  }

  bindSearchFilterEvents() {
    const searchInput = document.getElementById('editor-search-input');
    const filterScene = document.getElementById('editor-filter-scene');
    const filterType = document.getElementById('editor-filter-type');
    const filterStatus = document.getElementById('editor-filter-status');

    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.trim();
      this.renderHotspotsList();
    });

    filterScene?.addEventListener('change', (e) => {
      this.filterScene = e.target.value;
      this.renderHotspotsList();
    });

    filterType?.addEventListener('change', (e) => {
      this.filterType = e.target.value;
      this.renderHotspotsList();
    });

    filterStatus?.addEventListener('change', (e) => {
      this.filterStatus = e.target.value;
      this.renderHotspotsList();
    });
  }

  notifyHotspotsChanged() {
    if (this.onHotspotsChanged) {
      this.onHotspotsChanged(this.getHotspots());
    }
  }

  showToast(msg) {
    if (typeof msg === 'string') {
      if (msg.includes('berhasil') || msg.includes('diterapkan')) {
        EcoToast.success('✓ Berhasil', msg);
      } else if (msg.includes('Gagal') || msg.includes('gagal')) {
        EcoToast.error('✕ Gagal', msg);
      } else {
        EcoToast.info('Informasi Hotspot', msg);
      }
    } else {
      EcoToast.show(msg);
    }
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function htmlToPlainText(html) {
  if (!html) return '';
  if (!/<[a-z][\s\S]*>/i.test(html)) return String(html).trim();
  let text = String(html);
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<p[^>]*>/gi, '');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");
  return text.trim();
}

function renderFormattedDescription(text) {
  if (!text || !text.trim()) {
    return '<span style="color: var(--clr-text-dim); font-style: italic;">(Belum ada deskripsi informasi)</span>';
  }
  let safe = escapeHtml(text);
  safe = safe
    .replace(/&lt;b&gt;(.*?)&lt;\/b&gt;/gi, '<b>$1</b>')
    .replace(/&lt;strong&gt;(.*?)&lt;\/strong&gt;/gi, '<strong>$1</strong>')
    .replace(/&lt;i&gt;(.*?)&lt;\/i&gt;/gi, '<i>$1</i>')
    .replace(/&lt;em&gt;(.*?)&lt;\/em&gt;/gi, '<em>$1</em>')
    .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
    .replace(/\n/g, '<br>');
  return safe;
}

