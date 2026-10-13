/**
 * Sidebar Navigation Module for Virtual Tour
 * Displays numbered survey points with status badges and coordinates.
 */

let onSceneSelect = null;

export function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('closed');
  if (overlay) overlay.classList.add('active');
}

export function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.add('closed');
  if (overlay) overlay.classList.remove('active');
}

export function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('closed')) {
    openSidebar();
  } else {
    closeSidebar();
  }
}

export function renderSceneList(scenes, activeId) {
  const sceneListEl = document.getElementById('scene-list');
  if (!sceneListEl) return;
  sceneListEl.innerHTML = '';

  scenes.forEach((scene) => {
    const li = document.createElement('li');
    li.className = `scene-item${scene.id === activeId ? ' active' : ''}`;
    li.setAttribute('data-scene-id', scene.id);

    const isReady = scene.status === 'tersedia';

    li.innerHTML = `
      <div class="scene-item-seq">${scene.sequence || '•'}</div>
      <div class="scene-item-info">
        <div class="scene-item-name">${scene.name}</div>
        <div class="scene-item-status">
          ${isReady ? '✓ Foto Tersedia' : '⏳ Belum Tersedia'}${
            typeof scene.latitude === 'number'
              ? ` • ${scene.latitude.toFixed(5)}°, ${scene.longitude.toFixed(5)}°`
              : ''
          }
        </div>
      </div>
    `;

    li.addEventListener('click', () => {
      if (typeof onSceneSelect === 'function') {
        onSceneSelect(scene.id);
      }
      closeSidebar();
    });

    sceneListEl.appendChild(li);
  });
}

export function setActiveScene(id) {
  document.querySelectorAll('.scene-item').forEach((el) => {
    el.classList.toggle('active', el.getAttribute('data-scene-id') === id);
  });
}

export function initSidebar(sceneSelectCallback) {
  onSceneSelect = sceneSelectCallback;
  const btnToggle = document.getElementById('btn-sidebar-toggle');
  const btnClose = document.getElementById('btn-sidebar-close');
  const overlay = document.getElementById('sidebar-overlay');

  if (btnToggle) btnToggle.addEventListener('click', toggleSidebar);
  if (btnClose) btnClose.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
}
