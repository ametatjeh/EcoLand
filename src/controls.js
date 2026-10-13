/**
 * Controls module — zoom, fullscreen, reset view, prev/next scene.
 */

/**
 * Bind UI control buttons.
 * @param {object} callbacks — { onZoomIn, onZoomOut, onResetView, onFullscreen, onPrevScene, onNextScene }
 */
export function initControls(callbacks) {
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnReset = document.getElementById('btn-reset-view');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnPrev = document.getElementById('btn-prev-scene');
  const btnNext = document.getElementById('btn-next-scene');

  if (btnZoomIn && callbacks.onZoomIn) btnZoomIn.addEventListener('click', callbacks.onZoomIn);
  if (btnZoomOut && callbacks.onZoomOut) btnZoomOut.addEventListener('click', callbacks.onZoomOut);
  if (btnReset && callbacks.onResetView) btnReset.addEventListener('click', callbacks.onResetView);
  if (btnFullscreen && callbacks.onFullscreen) btnFullscreen.addEventListener('click', callbacks.onFullscreen);
  if (btnPrev && callbacks.onPrevScene) btnPrev.addEventListener('click', callbacks.onPrevScene);
  if (btnNext && callbacks.onNextScene) btnNext.addEventListener('click', callbacks.onNextScene);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    switch (e.key) {
      case '+':
      case '=':
        if (callbacks.onZoomIn) callbacks.onZoomIn();
        break;
      case '-':
        if (callbacks.onZoomOut) callbacks.onZoomOut();
        break;
      case 'r':
      case 'R':
        if (callbacks.onResetView) callbacks.onResetView();
        break;
      case 'f':
      case 'F':
        if (callbacks.onFullscreen) callbacks.onFullscreen();
        break;
      case 'ArrowLeft':
        if (callbacks.onPrevScene) callbacks.onPrevScene();
        break;
      case 'ArrowRight':
        if (callbacks.onNextScene) callbacks.onNextScene();
        break;
    }
  });
}

/**
 * Toggle browser fullscreen.
 */
export function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}
