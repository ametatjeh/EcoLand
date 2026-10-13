# Virtual Tour 360°

Aplikasi virtual tour panorama 360° multi-lokasi berbasis **Marzipano** dan **Vite**.  
Website statis yang dapat dijalankan di localhost maupun di-deploy ke hosting DirectAdmin.

---

## 🚀 Instalasi

```bash
# 1. Clone atau download proyek ini
# 2. Install dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev

# 4. Buka browser di http://localhost:5173
```

---

## 📸 Cara Menambahkan Foto Panorama 360°

### Langkah 1 — Siapkan Gambar

- Gunakan gambar **equirectangular** (rasio 2:1).
- Format yang didukung: `.jpg`, `.jpeg`, `.png`, `.webp`
- Resolusi yang disarankan: **4096×2048** (minimum), **8192×4096** (ideal).
- Anda bisa membuat foto 360° menggunakan:
  - Kamera 360° (Ricoh Theta, Insta360, GoPro Max)
  - Smartphone dengan fitur Photo Sphere
  - Software stitching seperti PTGui, Hugin, atau Google Street View App

### Langkah 2 — Letakkan di Folder `public/tours/`

Buat folder baru untuk setiap lokasi:

```
public/
  tours/
    lobby/
      panorama.jpg      ← Gambar panorama utama
      thumb.jpg          ← Thumbnail opsional (400×200 px)
    hall/
      panorama.jpg
      thumb.jpg
    perpustakaan/
      panorama.jpg
      thumb.jpg
```

### Langkah 3 — Daftarkan di Konfigurasi Scene

Edit file `src/data/scenes.js` dan tambahkan entri baru:

```js
{
  id: 'ruang-baru',
  name: 'Nama Lokasi',
  description: 'Deskripsi singkat lokasi.',
  panorama: '/tours/ruang-baru/panorama.jpg',
  thumbnail: '/tours/ruang-baru/thumb.jpg',
  initialView: { yaw: 0, pitch: 0, fov: Math.PI / 2 },
  hotspots: [
    {
      id: 'hs-ke-lobby',
      target: 'lobby',           // id scene tujuan
      yaw: 1.5,                  // posisi horizontal (radian)
      pitch: -0.1,               // posisi vertikal (radian)
      label: 'Menuju Lobby',     // teks tooltip
    },
  ],
},
```

### Langkah 4 — Jalankan Ulang Dev Server

```bash
npm run dev
```

Scene baru akan otomatis muncul di sidebar.

---

## 🏗️ Build untuk Produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`. Semua file sudah siap di-upload.

### Preview Hasil Build

```bash
npm run preview
```

---

## 🌐 Deploy ke DirectAdmin (Hosting Statis)

1. Jalankan `npm run build` untuk menghasilkan folder `dist/`.
2. Login ke **DirectAdmin** → **File Manager**.
3. Buka folder `public_html` dari domain/subdomain yang akan digunakan.
4. **Upload seluruh isi** folder `dist/` ke `public_html/`.
   - Pastikan `index.html` berada langsung di `public_html/index.html`.
   - Folder `assets/` dan `tours/` juga harus ada di `public_html/`.
5. Akses domain Anda — virtual tour siap digunakan.

> **Catatan**: Jika Anda ingin menaruh di subfolder (misal `domain.com/tour/`),
> ubah `base` di `vite.config.js` menjadi `'/tour/'` lalu build ulang.

---

## 📁 Struktur Proyek

```
TOUR/
├── index.html              ← Halaman utama
├── vite.config.js           ← Konfigurasi Vite
├── package.json
├── public/
│   ├── favicon.svg
│   ├── tours/               ← Aset panorama per lokasi
│   │   ├── lobby/
│   │   │   ├── panorama.jpg
│   │   │   └── thumb.jpg
│   │   ├── hall/
│   │   ├── library/
│   │   └── garden/
├── src/
│   ├── main.js              ← Entry point, orkestrasi aplikasi
│   ├── style.css             ← Seluruh styling
│   ├── viewer.js             ← Inisialisasi Marzipano viewer
│   ├── hotspots.js           ← Pembuatan & manajemen hotspot
│   ├── sidebar.js            ← Navigasi sidebar daftar lokasi
│   ├── controls.js           ← Zoom, fullscreen, reset, home
│   ├── utils.js              ← Helper: loading, error, empty state
│   └── data/
│       └── scenes.js         ← Konfigurasi semua scene/lokasi
└── dist/                     ← Hasil build (setelah npm run build)
```

---

## ⌨️ Keyboard Shortcuts

| Tombol | Fungsi             |
| ------ | ------------------ |
| `+`    | Zoom In            |
| `-`    | Zoom Out           |
| `R`    | Reset Pandangan    |
| `F`    | Toggle Fullscreen  |
| `Esc`  | Keluar Fullscreen  |

---

## 📋 Fitur

- ✅ Viewer panorama 360° (geser, sentuh, kontrol layar)
- ✅ Multi-scene / multi-lokasi
- ✅ Sidebar daftar lokasi dengan thumbnail
- ✅ Hotspot navigasi antar-scene
- ✅ Tooltip label hotspot
- ✅ Tombol kembali ke lokasi awal
- ✅ Zoom in, zoom out, fullscreen, reset pandangan
- ✅ Responsif (desktop, tablet, ponsel)
- ✅ Empty state informatif jika gambar belum tersedia
- ✅ Pesan error jelas jika panorama gagal dimuat
- ✅ Deploy sebagai website statis (tanpa backend)

---

## 📄 Lisensi

Proyek ini bersifat privat. Gunakan sesuai kebutuhan organisasi Anda.
