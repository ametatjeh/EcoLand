/**
 * Konfigurasi Panorama Virtual Tour Kawasan Penanaman Pohon
 * Sumber Data Utama: Hasil Export Resmi Marzipano Tool (marzipano-export/app-files/data.js)
 *
 * Seluruh scene, levels kubus, faceSize, initialViewParameters,
 * linkHotspots (posisi, rotasi, target), dan infoHotspots (judul, isi teks)
 * bersumber langsung dari hasil export Marzipano Tool.
 */

export const APP_DATA = {
  scenes: [
    {
      id: '0-1-pano_20261004_100402_6',
      name: '1. PANO_20261004_100402_6',
      sequence: 1,
      status: 'tersedia',
      description: 'Panorama titik 1 kawasan penanaman pohon. Terdapat info hotspot Pohon Scooby Doo.',
      thumbnail: '/tiles/0-1-pano_20261004_100402_6/preview.jpg',
      preview: '/tiles/0-1-pano_20261004_100402_6/preview.jpg',
      latitude: 5.48135,
      longitude: 95.58355,
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
      ],
      faceSize: 896,
      initialViewParameters: {
        yaw: 0.7176204122520318,
        pitch: 0.1800948515498284,
        fov: 1.3945993259187417,
      },
      linkHotspots: [
        {
          yaw: 0.03014976230538835,
          pitch: 0.02643290165309864,
          rotation: 6.283185307179586,
          target: '1-2-pano_20261004_100722_7',
        },
      ],
      infoHotspots: [
        {
          yaw: 1.2666246510961905,
          pitch: -0.19098522139040597,
          title: 'Pohon Scooby Doo',
          text: '<br>',
        },
      ],
    },
    {
      id: '1-2-pano_20261004_100722_7',
      name: '2. PANO_20261004_100722_7',
      sequence: 2,
      status: 'tersedia',
      description: 'Panorama titik 2 kawasan penanaman pohon. Terdapat info hotspot Pesawat Tempur.',
      thumbnail: '/tiles/1-2-pano_20261004_100722_7/preview.jpg',
      preview: '/tiles/1-2-pano_20261004_100722_7/preview.jpg',
      latitude: 5.48168,
      longitude: 95.5838,
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
      ],
      faceSize: 896,
      initialViewParameters: {
        yaw: 1.5115493233731163,
        pitch: 0.1525186886522647,
        fov: 1.3945993259187417,
      },
      linkHotspots: [
        {
          yaw: -2.8706929059681148,
          pitch: -0.0448967639209954,
          rotation: 6.283185307179586,
          target: '0-1-pano_20261004_100402_6',
        },
        {
          yaw: 0.7395703586489386,
          pitch: 0.11872788990518046,
          rotation: 0,
          target: '2-3-pano_20261004_095925_3',
        },
      ],
      infoHotspots: [
        {
          yaw: 0.22364720623081347,
          pitch: 0.16888656856956885,
          title: 'Pesawat Tempur',
          text: 'Text',
        },
      ],
    },
    {
      id: '2-3-pano_20261004_095925_3',
      name: '3. PANO_20261004_095925_3',
      sequence: 3,
      status: 'tersedia',
      description: 'Panorama titik 3 kawasan penanaman pohon. Terdapat info hotspot Senso Supra Natural dan Pintu Welcome.',
      thumbnail: '/tiles/2-3-pano_20261004_095925_3/preview.jpg',
      preview: '/tiles/2-3-pano_20261004_095925_3/preview.jpg',
      latitude: 5.4818556,
      longitude: 95.5840917,
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
      ],
      faceSize: 896,
      initialViewParameters: {
        yaw: 0.37979756719106206,
        pitch: 0.04846658243499746,
        fov: 1.3945993259187417,
      },
      linkHotspots: [
        {
          yaw: 0.8704408551624532,
          pitch: -0.19419646834669102,
          rotation: 0,
          target: '3-4-pano_20261004_101937_11',
        },
        {
          yaw: 1.6976031542983385,
          pitch: -0.049091771145560514,
          rotation: 0,
          target: '1-2-pano_20261004_100722_7',
        },
      ],
      infoHotspots: [
        {
          yaw: -1.864613716834878,
          pitch: 0.5266181755816888,
          title: 'Senso Supra Natural',
          text: '<br>',
        },
        {
          yaw: 2.7863856727428384,
          pitch: 0.34442522583293567,
          title: 'Pintu Welcome',
          text: 'Text',
        },
      ],
    },
    {
      id: '3-4-pano_20261004_101937_11',
      name: '4. PANO_20261004_101937_11',
      sequence: 4,
      status: 'tersedia',
      description: 'Panorama titik 4 kawasan penanaman pohon. Terdapat info hotspot Master Magic.',
      thumbnail: '/tiles/3-4-pano_20261004_101937_11/preview.jpg',
      preview: '/tiles/3-4-pano_20261004_101937_11/preview.jpg',
      latitude: 5.48215,
      longitude: 95.58435,
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
      ],
      faceSize: 896,
      initialViewParameters: {
        yaw: 0.6722519287210993,
        pitch: 0.18301033113915643,
        fov: 1.3945993259187417,
      },
      linkHotspots: [
        {
          yaw: -1.4177896409400272,
          pitch: 0.3646449202319886,
          rotation: 0,
          target: '2-3-pano_20261004_095925_3',
        },
        {
          yaw: 0.42228075410022115,
          pitch: 0.8020360851690533,
          rotation: 0,
          target: '4-32-pano_20261004_095509_0',
        },
      ],
      infoHotspots: [
        {
          yaw: -1.3435897200169489,
          pitch: 0.21857024197986874,
          title: 'Master Magic',
          text: 'Supra Natural&nbsp;',
        },
      ],
    },
    {
      id: '4-32-pano_20261004_095509_0',
      name: '3.2 PANO_20261004_095509_0',
      sequence: 5,
      status: 'tersedia',
      description: 'Panorama titik 3.2 kawasan penanaman pohon. Menghubungkan titik 3, titik 4, dan titik 5.',
      thumbnail: '/tiles/4-32-pano_20261004_095509_0/preview.jpg',
      preview: '/tiles/4-32-pano_20261004_095509_0/preview.jpg',
      latitude: 5.4821,
      longitude: 95.58358,
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
      ],
      faceSize: 896,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: -2.893554457411156,
          pitch: -0.6963642143154054,
          rotation: 0,
          target: '3-4-pano_20261004_101937_11',
        },
        {
          yaw: -2.0826598198117896,
          pitch: -0.04552845778872339,
          rotation: 0,
          target: '2-3-pano_20261004_095925_3',
        },
        {
          yaw: -0.6788695978901487,
          pitch: 0.15160639748459914,
          rotation: 0,
          target: '5-5-pano_20261004_103130_17-2',
        },
      ],
      infoHotspots: [],
    },
    {
      id: '5-5-pano_20261004_103130_17-2',
      name: '5. PANO_20261004_103130_17 (2)',
      sequence: 6,
      status: 'tersedia',
      description: 'Panorama titik 5 kawasan penanaman pohon. Terdapat info hotspot Pengusaha Madu Rimba.',
      thumbnail: '/tiles/5-5-pano_20261004_103130_17-2/preview.jpg',
      preview: '/tiles/5-5-pano_20261004_103130_17-2/preview.jpg',
      latitude: 5.48242,
      longitude: 95.5842,
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
      ],
      faceSize: 896,
      initialViewParameters: {
        yaw: 2.8857007275322193,
        pitch: -0.238303625498979,
        fov: 1.3945993259187417,
      },
      linkHotspots: [
        {
          yaw: 3.0154459565887812,
          pitch: -0.46798372795382015,
          rotation: 0,
          target: '3-4-pano_20261004_101937_11',
        },
        {
          yaw: 2.155542466117045,
          pitch: -0.16464652316926198,
          rotation: 0,
          target: '0-1-pano_20261004_100402_6',
        },
      ],
      infoHotspots: [
        {
          yaw: 2.843260059526739,
          pitch: -0.17250357376821412,
          title: 'Pengusaha Madu Rimba',
          text: 'Madu Rimba',
        },
      ],
    },
  ],
  name: 'IKHW',
  settings: {
    mouseViewMode: 'drag',
    autorotateEnabled: true,
    fullscreenButton: false,
    viewControlButtons: true,
  },
};

// Aliases for compatibility
export const scenes = APP_DATA.scenes.map((s) => ({
  ...s,
  initialView: s.initialViewParameters,
  panorama_path: `/tiles/${s.id}/preview.jpg`,
  panorama: `/tiles/${s.id}/preview.jpg`,
  connected_points: s.linkHotspots.map((h) => h.target),
}));

export default scenes;
