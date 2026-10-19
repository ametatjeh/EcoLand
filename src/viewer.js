/**
 * Viewer module — Inisialisasi dan pengelolaan Marzipano Viewer.
 * Mendukung Multiresolution CubeGeometry hasil export resmi Marzipano Tool.
 */
import Marzipano from 'marzipano';

let viewer = null;

/**
 * Inisialisasi Marzipano viewer pada elemen #pano.
 * @returns {Marzipano.Viewer}
 */
export function initViewer() {
  const panoElement = document.getElementById('pano');
  if (!panoElement) throw new Error('#pano element not found');

  viewer = new Marzipano.Viewer(panoElement, {
    controls: { mouseViewMode: 'drag' },
    stage: { progressive: true },
  });

  return viewer;
}

/**
 * Dapatkan instance viewer saat ini.
 * @returns {Marzipano.Viewer|null}
 */
export function getViewer() {
  return viewer;
}

/**
 * Buat scene Marzipano dari data export Marzipano Tool.
 * Mendukung Multiresolution CubeGeometry (tiles/{z}/{f}/{y}/{x}.jpg)
 * dan fallback Equirectangular.
 *
 * @param {object} sceneData — Objek scene dari scenes.js / APP_DATA
 * @returns {{ scene: Marzipano.Scene, view: Marzipano.RectilinearView }}
 */
export function createScene(sceneData, customViewParams = null) {
  if (!viewer) throw new Error('Viewer belum diinisialisasi');

  let source = null;
  let geometry = null;
  const initialParams = customViewParams || sceneData.initialViewParameters || sceneData.initialView || {};

  if (sceneData.levels && sceneData.levels.length > 0) {
    // 1. Multiresolution CubeGeometry (Standar Marzipano Tool)
    const urlPrefix = '/tiles';
    source = Marzipano.ImageUrlSource.fromString(
      `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
      { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` }
    );
    geometry = new Marzipano.CubeGeometry(sceneData.levels);
  } else {
    // 2. Fallback EquirectGeometry jika foto equirectangular biasa
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

  const scene = viewer.createScene({
    source,
    geometry,
    view,
    pinFirstLevel: true,
  });

  return { scene, view };
}

/**
 * Update orientasi view Marzipano.
 * @param {Marzipano.RectilinearView} view
 * @param {object} params
 */
export function setViewParameters(view, params) {
  if (!view || !params) return;
  if (typeof params.yaw === 'number') view.setYaw(params.yaw);
  if (typeof params.pitch === 'number') view.setPitch(params.pitch);
  if (typeof params.fov === 'number') view.setFov(params.fov);
}

/**
 * Zoom view Marzipano.
 * @param {Marzipano.RectilinearView} view
 * @param {number} delta
 */
export function zoomView(view, delta) {
  if (!view) return;
  const fov = view.fov();
  const newFov = Math.max(
    (30 * Math.PI) / 180,
    Math.min((120 * Math.PI) / 180, fov + delta)
  );
  view.setFov(newFov);
}

/**
 * Reset view ke orientasi awal scene.
 * @param {Marzipano.RectilinearView} view
 * @param {object} initial
 */
export function resetView(view, initial) {
  if (!view || !initial) return;
  view.setYaw(initial.yaw ?? 0);
  view.setPitch(initial.pitch ?? 0);
  view.setFov(initial.fov ?? Math.PI / 2);
}

/**
 * Pasang listener arah pandang (compass / heading)
 * @param {Marzipano.RectilinearView} view
 * @param {Function} onChange
 */
export function attachOrientationListener(view, onChange) {
  if (!view || typeof onChange !== 'function') return;
  view.addEventListener('change', () => {
    const yawRad = view.yaw();
    const yawDeg = -((yawRad * 180) / Math.PI);
    onChange(yawDeg);
  });
}
