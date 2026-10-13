<!doctype html>
<html lang="id">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    name="description"
    content="Eco Land — Virtual Tour 360° Kawasan Penanaman Pohon ±2 Hektare Aceh. Jelajahi panorama interaktif berbasis Marzipano dan pelajari program restorasi ekosistem." />
  <meta name="theme-color" content="#0c1410" />
  <title>Eco Land — Virtual Tour Kawasan Penanaman Pohon ±2 Hektare | IKHW Aceh</title>
  <link rel="canonical" href="https://ikhw.org/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ikhw.org/" />
  <meta property="og:title" content="Eco Land — Virtual Tour Kawasan Penanaman Pohon ±2 Hektare | IKHW Aceh" />
  <meta property="og:description" content="Eco Land — Virtual Tour 360° Kawasan Penanaman Pohon ±2 Hektare Aceh. Jelajahi panorama interaktif berbasis Marzipano dan pelajari program restorasi ekosistem." />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:domain" content="ikhw.org" />
  <meta name="twitter:url" content="https://ikhw.org/" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
    rel="stylesheet" />
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
  <!-- App Container -->
  <div id="app">
    <!-- Main Navbar -->
    <header id="main-navbar" class="header-navbar sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-950/85 border-b border-white/10">
      <div class="header-container max-w-[1320px] mx-auto px-5 w-full flex items-center justify-between h-[72px] gap-4">
        <!-- Brand Identity (Left) -->
        <div class="brand-wrapper group cursor-pointer flex items-center gap-3 shrink-0" id="brand-btn" title="Kembali ke Beranda">
          <div class="brand-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div class="brand-info flex flex-col">
            <span class="brand-title" id="nav-brand-title">Eco Land</span>
            <span class="brand-subtitle" id="nav-brand-sub">IKHW Aceh &bull; Konservasi &plusmn;2 Hektare</span>
          </div>
        </div>

        <!-- Navigation Pills (Center/Desktop) -->
        <nav class="nav-tabs" id="nav-tabs" role="navigation" aria-label="Navigasi Utama EcoKawasan">
          <button class="nav-tab-btn active" data-tab="beranda">
            <span class="nav-icon">🌿</span> <span>Home</span>
          </button>
          <button class="nav-tab-btn" data-tab="tour">
            <span class="nav-icon">🔄</span> <span>Virtual Tour</span>
          </button>
          <button class="nav-tab-btn" data-tab="info">
            <span class="nav-icon">ℹ️</span> <span>Info Kawasan</span>
          </button>
          <button class="nav-tab-btn" data-tab="galeri">
            <span class="nav-icon">🖼️</span> <span>Galeri</span>
          </button>
          <button class="nav-tab-btn" data-tab="katalog">
            <span class="nav-icon">🌳</span> <span>Data Pohon</span>
          </button>
          <button class="nav-tab-btn" data-tab="tree-qr">
            <span class="nav-icon">📱</span> <span>Tree QR</span>
          </button>
          <!-- Mobile-only login item inside nav-tabs -->
          <button class="nav-tab-btn mobile-only-nav-item btn-nav-login" data-tab="admin" title="Login Petugas EcoKawasan">
            <span class="nav-icon">🔐</span> <span>Login</span>
          </button>
        </nav>

        <!-- Right Action: Desktop Login Button + Mobile Hamburger Button -->
        <div class="header-right-actions flex items-center gap-3 shrink-0">
          <button class="header-login-btn desktop-only-login" id="nav-btn-admin-desktop" data-tab="admin" title="Login Petugas EcoKawasan">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Login Petugas</span>
          </button>
          <button id="btn-mobile-menu" class="btn-mobile-toggle" aria-label="Buka Menu Navigasi" aria-expanded="false" aria-controls="nav-tabs">
            <svg class="hamburger-icon-open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            <svg class="hamburger-icon-close hidden" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Backdrop Overlay -->
    <div id="mobile-nav-backdrop" class="mobile-nav-backdrop"></div>

    <!-- Views Container -->
    <main id="views-container">
      <!-- ==========================================
             VIEW A: BERANDA (HOME)
             ========================================== -->
      <section id="view-beranda" class="view-pane active">
        <div class="home-wrapper">
          <!-- Hero Banner -->
          <div class="hero-section">
            <div class="hero-badge">
              🌱 Inisiatif Pemulihan Lahan & Silvikultur
            </div>
            <h1 class="hero-title" id="hero-title">
              Eco Land<br /><span style="display: block; font-size: 24px; font-weight: 600; opacity: 0.92; margin-top: 6px;">Kawasan Penanaman Pohon</span>
            </h1>
            <p class="hero-subtitle" id="hero-desc">
              Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.
            </p>
            <div class="hero-actions">
              <button class="btn-primary-action" id="btn-hero-start-tour">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10 8l6 4-6 4V8z" />
                </svg>
                Mulai Virtual Tour 360°
              </button>
              <button class="btn-secondary-action" id="btn-hero-view-points">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Informasi Kawasan & Restorasi
              </button>
            </div>
          </div>

          <!-- Stats Bar (Descriptive Only) -->
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-label">Estimasi Luas Kawasan</span>
              <span class="stat-value" id="stat-luas">±2 Hektare</span>
              <span class="stat-desc">Sekitar 20.000 m² (Data Deskriptif)</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Titik Acuan Referensi</span>
              <span class="stat-value">5.4818556° N</span>
              <span class="stat-desc">95.5840917° E (WGS84 / EPSG:4326)</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Titik Panorama Lapangan</span>
              <span class="stat-value">6 Titik Pantau</span>
              <span class="stat-desc">Dokumentasi Go Street View</span>
            </div>
            <div class="stat-card">
              <span class="stat-label">Target Bibit Pohon</span>
              <span class="stat-value">1.000+ Batang</span>
              <span class="stat-desc">Spesies Kayu Endemik & Buah Hutan</span>
            </div>
          </div>

          <!-- Peta Lokasi Titik Referensi Acuan (WGS84) di Beranda (Urutan di Atas Kawasan & Plot) -->
          <div class="ref-map-container-box section-header-spacing">
            <div class="ref-map-header">
              <span>📍 Peta Lokasi Titik Referensi Acuan (WGS84)</span>
              <span class="ref-coord-badge">5.4818556° N, 95.5840917° E</span>
            </div>
            <div id="home-ref-map" class="map-canvas-container"></div>
            <div class="ref-map-info-text">
              ℹ️ Peta menampilkan penanda lokasi titik acuan lapangan dan titik survei panorama 360°.
            </div>
          </div>

          <!-- Kawasan Penanaman Aktif Terdaftar -->
          <div class="section-header section-header-spacing">
            <div class="header-flex-between">
              <div>
                <span class="gsv-badge">Kawasan & Plot Penanaman</span>
                <h2 class="section-title">Kawasan Penanaman Terdaftar</h2>
                <p class="section-subtitle">
                  Eksplorasi seluruh kawasan restorasi ekosistem, luasan lahan tercatat, komposisi pohon, dan virtual tour 360° yang terintegrasi:
                </p>
              </div>
            </div>
          </div>

          <div class="points-grid" id="home-zones-grid">
            <!-- Dynamically populated via JS -->
          </div>
        </div>
      </section>

      <!-- ==========================================
             VIEW B: VIRTUAL TOUR (MARZIPANO 360°)
             ========================================== -->
      <section id="view-tour" class="view-pane">
        <div id="tour-container">
          <!-- Marzipano Canvas Viewport -->
          <div id="pano"></div>

          <!-- Loading Spinner in Tour -->
          <div id="tour-loading" class="tour-loading-indicator hidden">
            <div class="loading-spinner"></div>
            <span>Memuat Panorama 360°...</span>
          </div>

          <!-- Tour Top Bar Overlay -->
          <div id="tour-top-bar">
            <div class="tour-info-card hidden md:block">
              <div class="tour-scene-title">
                <span id="tour-scene-seq" class="tour-scene-sequence">Titik 1</span>
                <span id="tour-scene-name">Gerbang Masuk Kawasan</span>
              </div>
              <p id="tour-scene-desc" class="tour-scene-desc">Memuat informasi titik lokasi...</p>
              <div id="tour-scene-gps" class="tour-scene-gps">Lokasi Acuan: 5.4818556° N, 95.5840917° E</div>
            </div>

            <div class="tour-top-actions">
              <!-- Compass / Orientation Indicator -->
              <div class="compass-widget" id="tour-compass" title="Indikator Arah Pandang (Klik untuk Reset)">
                <div class="compass-dial">
                  <span class="compass-north">U</span>
                  <div class="compass-needle" id="compass-needle"></div>
                </div>
              </div>

              <button id="btn-sidebar-toggle" class="icon-btn" aria-label="Menu Titik Lokasi" title="Daftar Titik">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Sidebar Drawer -->
          <aside id="sidebar" class="closed">
            <div class="sidebar-header">
              <h2>Titik Panorama Kawasan (±2 Ha)</h2>
              <button id="btn-sidebar-close" class="icon-btn" aria-label="Tutup Menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <ul id="scene-list"></ul>
          </aside>
          <div id="sidebar-overlay"></div>

          <!-- Compact Radar / Minimap Card Overlay -->
          <div id="tour-minimap-card">
            <div class="minimap-header">
              <span>📍 Titik Lokasi</span>
              <button id="btn-minimap-minimize" class="btn-minimap-toggle">Tutup</button>
            </div>
            <div id="tour-minimap"></div>
          </div>
        </div>
      </section>

      <!-- ==========================================
             VIEW D: INFORMASI KAWASAN
             ========================================== -->
      <section id="view-info" class="view-pane">
        <div class="info-wrapper">
          <div class="section-header">
            <span class="gsv-badge">Profil Program & Silvikultur</span>
            <h2 class="section-title">Informasi Kawasan Penanaman Pohon ±2 Hektare</h2>
            <p class="section-subtitle">
              Restorasi bentang lahan terdegradasi berbasis pohon lokal endemik dan pengayaan keanekaragaman hayati.
            </p>
          </div>

          <div class="info-grid">
            <div class="info-main-content">
              <h3>1. Gambaran Umum & Lokasi Referensi</h3>
              <p id="info-general-desc">
                Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.
              </p>

              <!-- Penjelasan Lokasi Acuan Spasial WGS84 -->
              <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 14px 18px; margin: 16px 0; font-size: 13px; line-height: 1.6; color: var(--clr-text-muted);">
                <strong style="color: #fff; display: block; margin-bottom: 4px;">📌 Penjelasan Lokasi & Acuan Spasial:</strong>
                <ul style="margin: 0 0 0 16px; padding: 0;">
                  <li>Lokasi kawasan ditampilkan menggunakan titik referensi acuan <strong>WGS84 (5.4818556° N, 95.5840917° E)</strong> yang dapat diverifikasi secara faktual di lapangan.</li>
                  <li>Titik referensi digunakan sebagai acuan lokasi lapangan dan titik survei dokumentasi panorama 360°, bukan otomatis merepresentasikan garis batas resmi seluruh kawasan.</li>
                  <li>Informasi luas kawasan (±2 Hektare / 1.7 Ha tercatat aktif) dan komposisi vegetasi mengikuti catatan survei silvikultur yang telah diverifikasi.</li>
                </ul>
              </div>

              <!-- Peta Lokasi Referensi Biasa (Single Reference Pin, No Polygons) -->
              <div class="ref-map-container-box">
                <div class="ref-map-header">
                  <span>📍 Peta Lokasi Titik Referensi Acuan (WGS84)</span>
                  <span class="ref-coord-badge">5.4818556° N, 95.5840917° E</span>
                </div>
                <div id="gis-map" class="map-canvas-container"></div>
                <div class="ref-map-info-text">
                  ℹ️ Peta menampilkan penanda lokasi titik acuan lapangan dan titik survei panorama 360°.
                </div>
              </div>

              <h3>2. Rencana Zonasi Blok Penanaman</h3>
              <p>
                Plot penanaman dibagi menjadi dua blok silvikultur utama guna memaksimalkan kelangsungan hidup bibit pohon:
              </p>
              <ul class="zonasi-list">
                <li><strong>Blok A (Zona Endemik & Pelindung Erosi):</strong> Penanaman pohon kayu keras asli Aceh pada sisi lereng guna mengunci struktur tanah dan mencegah longsor.</li>
                <li><strong>Blok B (Zona Pohon Buah Hutan & Pakan Satwa):</strong> Penanaman spesies pohon buah lokal guna memikat burung penyebar biji alami dan satwa kanopi.</li>
                <li><strong>Zona Embung & Hidrologi:</strong> Pemanfaatan cekungan alami resapan air untuk menjamin pasokan penyiraman sepanjang musim kemarau.</li>
              </ul>

              <h3>3. Komposisi Jenis Bibit Pohon</h3>
              <table class="species-table">
                <thead>
                  <tr>
                    <th>Nama Lokal</th>
                    <th>Nama Ilmiah</th>
                    <th>Karakteristik & Peran Ekologis</th>
                    <th>Target Batang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Merbau Aceh</strong></td>
                    <td><em>Intsia bijuga</em></td>
                    <td>Kayu keras bernilai konservasi tinggi, penahan erosi lereng</td>
                    <td>250 batang</td>
                  </tr>
                  <tr>
                    <td><strong>Geurundong</strong></td>
                    <td><em>Spondias pinnata</em></td>
                    <td>Pohon kanopi cepat tumbuh, peneduh awal bibit muda</td>
                    <td>200 batang</td>
                  </tr>
                  <tr>
                    <td><strong>Gaharu Lokal</strong></td>
                    <td><em>Aquilaria malaccensis</em></td>
                    <td>Pohon bernilai ekologis tinggi, penyerap karbon biomassa</td>
                    <td>150 batang</td>
                  </tr>
                  <tr>
                    <td><strong>Durian Hutan Aceh</strong></td>
                    <td><em>Durio graveolens</em></td>
                    <td>Sumber pakan satwa liar, menjaga rantai makanan kanopi</td>
                    <td>200 batang</td>
                  </tr>
                  <tr>
                    <td><strong>Asam Kranji / Keranji</strong></td>
                    <td><em>Dialium indum</em></td>
                    <td>Spesies pohon legum pemfiksasi nitrogen tanah</td>
                    <td>200 batang</td>
                  </tr>
                </tbody>
              </table>

              <h3>4. Galeri Rencana & Dokumentasi Kegiatan</h3>
              <div class="gallery-grid">
                <div class="gallery-card">
                  <div class="gallery-card-img">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div class="gallery-card-caption">
                    <strong>Tahap 1: Pembibitan</strong><br />
                    Persiapan bibit polybag dan pengkondisian di pos pembibitan (Titik 1).
                  </div>
                </div>
                <div class="gallery-card">
                  <div class="gallery-card-img">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div class="gallery-card-caption">
                    <strong>Tahap 2: Pemasangan Patok</strong><br />
                    Penandaan patok koordinat sentral referensi acuan (Titik 3).
                  </div>
                </div>
                <div class="gallery-card">
                  <div class="gallery-card-img">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <div class="gallery-card-caption">
                    <strong>Tahap 3: Pemantauan 360°</strong><br />
                    Survei bola foto Go Street View berkala untuk memantau pertumbuhan kanopi.
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar Info -->
            <div class="info-sidebar">
              <div class="info-sidebar-card">
                <h4>Identitas & Pengelola</h4>
                <ul>
                  <li><strong>Nama Aplikasi:</strong> Eco Land</li>
                  <li><strong>Inisiator:</strong> IKHW Aceh</li>
                  <li><strong>Domain Publikasi:</strong> ikhw.org</li>
                  <li><strong>Luas Kawasan:</strong> ±2 Hektare (Deskriptif)</li>
                  <li><strong>Titik Acuan:</strong> 5.4818556° N, 95.5840917° E</li>
                </ul>
              </div>

              <div class="info-sidebar-card">
                <h4>Jadwal Silvikultur</h4>
                <ul>
                  <li><strong>Bulan 1 - 3:</strong> Penyiraman & penyiangan gulma harian.</li>
                  <li><strong>Bulan 4 - 6:</strong> Pemupukan organik & pemasangan ajir bambu.</li>
                  <li><strong>Bulan 7 - 12:</strong> Survei kelulusan hidup bibit (survival rate) & penyulaman.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================
             VIEW: GALERI FOTO KAWASAN (PUBLIK)
             ========================================== -->
      <section id="view-galeri" class="view-pane">
        <div id="public-gallery-container">
          <!-- Dynamically populated via publicGallery.js -->
        </div>
      </section>

      <!-- ==========================================
             VIEW G: KATALOG DATA PENANAMAN POHON (PUBLIK)
             ========================================== -->
      <section id="view-katalog" class="view-pane">
        <div class="home-wrapper" id="public-tree-catalog-container">
          <!-- Dynamically populated via public tree catalog handler -->
        </div>
      </section>

      <!-- ==========================================
             VIEW H: TREE QR CODE (PUBLIK)
             ========================================== -->
      <section id="view-tree-qr" class="view-pane">
        <div id="public-tree-qr-container">
          <!-- Dynamically populated via treeQr.js -->
        </div>
      </section>
    </main>

    <!-- ==========================================
           VIEW F: LARAVEL TAILWIND CSS ADMIN DASHBOARD
           ========================================== -->
    <section id="view-admin" class="view-pane w-full min-h-screen bg-slate-950 text-slate-100">
      <div id="admin-dashboard-root" class="relative flex min-h-screen w-full bg-slate-950">
        <!-- Mobile Sidebar Backdrop Overlay -->
        <div id="admin-sidebar-backdrop" class="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm hidden lg:hidden transition-opacity"></div>

        <!-- Left Sidebar (Desktop & Mobile Drawer) -->
        <aside id="admin-sidebar" class="fixed inset-y-0 left-0 z-50 w-[260px] bg-slate-900 border-r border-slate-800/80 flex flex-col transition-all duration-300 ease-in-out -translate-x-full lg:translate-x-0 shadow-2xl lg:shadow-none">
          <!-- Sidebar Header -->
          <div class="h-16 px-4 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/50 sidebar-header-inner">
            <div class="flex items-center gap-3 overflow-hidden">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                🌱
              </div>
              <div class="sidebar-brand-text truncate">
                <h2 class="text-sm font-bold tracking-tight text-white leading-tight">Eco Land Admin</h2>
                <p class="text-[11px] text-emerald-400 font-medium">IKHW Aceh &bull; Kawasan &plusmn;2 Ha</p>
              </div>
            </div>
            <!-- Desktop minimize/expand button in sidebar header -->
            <button id="btn-sidebar-collapse-toggle" type="button" class="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition items-center justify-center shrink-0 cursor-pointer" aria-label="Ciutkan / Perluas Sidebar" title="Ciutkan / Perluas Sidebar" aria-expanded="true">
              <svg id="sidebar-collapse-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300">
                <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
            <!-- Close drawer button for mobile -->
            <button id="btn-close-admin-sidebar-mobile" class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden" aria-label="Tutup sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Sidebar Navigation Links Sesuai 7 Tahapan Kerja -->
          <nav class="flex-1 overflow-y-auto px-3 py-3 space-y-3.5 text-xs font-medium">
            <!-- 1. Dashboard -->
            <div>
              <p class="sidebar-group-title px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">1. Dashboard</p>
              <div class="space-y-1">
                <a href="#admin/dashboard" class="admin-nav-btn active w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="dashboard" title="Dashboard Ringkasan" aria-label="Dashboard Ringkasan">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">📊</span>
                  <span class="sidebar-link-text truncate">Ringkasan</span>
                </a>
                <a href="#admin/trees/dashboard" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="trees" data-tree-subtab="dashboard" title="Statistik Penanaman" aria-label="Statistik Penanaman">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">📈</span>
                  <span class="sidebar-link-text truncate">Statistik Penanaman</span>
                </a>
              </div>
            </div>

            <!-- 2. Persiapan -->
            <div>
              <p class="sidebar-group-title px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">2. Persiapan</p>
              <div class="space-y-1">
                <a href="#admin/zones" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="zones" data-zone-subtab="list" title="2.1. Manajemen Kawasan/Lahan" aria-label="2.1. Manajemen Kawasan/Lahan">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🏞️</span>
                  <span class="sidebar-link-text truncate">2.1. Manajemen Kawasan/Lahan</span>
                </a>
                <a href="#admin/trees/species" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="trees" data-tree-subtab="species" title="2.2. Master Jenis Pohon" aria-label="2.2. Master Jenis Pohon">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🌿</span>
                  <span class="sidebar-link-text truncate">2.2. Master Jenis Pohon</span>
                </a>
              </div>
            </div>

            <!-- 3. Pelaksanaan -->
            <div>
              <p class="sidebar-group-title px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">3. Pelaksanaan</p>
              <div class="space-y-1">
                <a href="#admin/trees/activities" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="trees" data-tree-subtab="activities" title="3.1. Kegiatan Penanaman" aria-label="3.1. Kegiatan Penanaman">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">📋</span>
                  <span class="sidebar-link-text truncate">3.1. Kegiatan Penanaman</span>
                </a>
              </div>
            </div>

            <!-- 4. Pemantauan dan Perawatan -->
            <div>
              <p class="sidebar-group-title px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">4. Pemantauan & Perawatan</p>
              <div class="space-y-1">
                <a href="#admin/trees/surveys" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="trees" data-tree-subtab="surveys" title="4.1. Pemantauan Tanaman" aria-label="4.1. Pemantauan Tanaman">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🔍</span>
                  <span class="sidebar-link-text truncate">4.1. Pemantauan Tanaman</span>
                </a>
                <a href="#admin/trees/maintenance" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="trees" data-tree-subtab="maintenance" title="4.2. Perawatan & Penyulaman" aria-label="4.2. Perawatan & Penyulaman">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🛠️</span>
                  <span class="sidebar-link-text truncate">4.2. Perawatan & Penyulaman</span>
                </a>
              </div>
            </div>

            <!-- 5. Dokumentasi Digital -->
            <div>
              <p class="sidebar-group-title px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">5. Dokumentasi Digital</p>
              <div class="space-y-1">
                <a href="#admin/panoramas" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="panoramas" title="Manajemen Panorama" aria-label="Manajemen Panorama">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🌐</span>
                  <span class="sidebar-link-text truncate">Manajemen Panorama</span>
                </a>
                <a href="#admin/editor" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="editor" title="Editor Hotspot" aria-label="Editor Hotspot">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🎨</span>
                  <span class="sidebar-link-text truncate">Editor Hotspot</span>
                </a>
                <a href="#tour" id="sidebar-btn-tour-preview" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" title="Pratinjau Virtual Tour" aria-label="Pratinjau Virtual Tour">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">👁️</span>
                  <span class="sidebar-link-text truncate">Pratinjau Virtual Tour</span>
                </a>
              </div>
            </div>

            <!-- 6. Evaluasi dan Pelaporan -->
            <div>
              <p class="sidebar-group-title px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">6. Evaluasi & Pelaporan</p>
              <div class="space-y-1">
                <a href="#admin/reports/rekap" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="reports" data-report-subtab="rekap" title="6.1. Laporan & Statistik" aria-label="6.1. Laporan & Statistik">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">📑</span>
                  <span class="sidebar-link-text truncate">6.1. Laporan & Statistik</span>
                </a>
                <a href="#admin/reports/per-kawasan" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="reports" data-report-subtab="per-kawasan" title="Rekapitulasi Kawasan" aria-label="Rekapitulasi Kawasan">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🏞️</span>
                  <span class="sidebar-link-text truncate">Rekapitulasi Kawasan</span>
                </a>
                <a href="#admin/reports/per-pohon" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="reports" data-report-subtab="per-pohon" title="Rekapitulasi Jenis Pohon" aria-label="Rekapitulasi Jenis Pohon">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🌳</span>
                  <span class="sidebar-link-text truncate">Rekapitulasi Jenis Pohon</span>
                </a>
                <a href="#admin/reports/survival" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="reports" data-report-subtab="survival" title="Kelangsungan Hidup Tanaman" aria-label="Kelangsungan Hidup Tanaman">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🌱</span>
                  <span class="sidebar-link-text truncate">Kelangsungan Hidup Tanaman</span>
                </a>
                <a href="#admin/reports/ekspor" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="reports" data-report-subtab="ekspor" title="6.2. Impor & Ekspor Data" aria-label="6.2. Impor & Ekspor Data">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">💾</span>
                  <span class="sidebar-link-text truncate">6.2. Impor & Ekspor Data</span>
                </a>
              </div>
            </div>

            <!-- 7. Pengelolaan Sistem -->
            <div>
              <p class="sidebar-group-title px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">7. Pengelolaan Sistem</p>
              <div class="space-y-1">
                <a href="#admin/settings" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="settings" title="7.1. Identitas Organisasi" aria-label="7.1. Identitas Organisasi">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">🏢</span>
                  <span class="sidebar-link-text truncate">7.1. Identitas Organisasi</span>
                </a>
                <a href="#admin/users" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="users" title="Pengguna & Hak Akses" aria-label="Pengguna & Hak Akses">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">👥</span>
                  <span class="sidebar-link-text truncate">Pengguna & Hak Akses</span>
                </a>
                <a href="#admin/activity-logs" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="activity-logs" title="Log Aktivitas" aria-label="Log Aktivitas">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">📜</span>
                  <span class="sidebar-link-text truncate">Log Aktivitas</span>
                </a>
                <a href="#admin/backup" class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition min-h-[42px]" data-admin-tab="backup" title="Cadangan & Pemulihan" aria-label="Cadangan & Pemulihan">
                  <span class="admin-nav-icon text-base shrink-0 flex items-center justify-center w-6 h-6">💾</span>
                  <span class="sidebar-link-text truncate">Cadangan & Pemulihan</span>
                </a>
              </div>
            </div>
          </nav>

          <!-- Sidebar User Profile Footer -->
          <div class="p-3 border-t border-slate-800/80 bg-slate-900/50">
            <div class="flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <div id="sidebar-user-avatar" class="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0">
                A
              </div>
              <div class="sidebar-user-text flex-1 min-w-0">
                <p id="sidebar-user-name" class="text-xs font-semibold text-white truncate">Administrator</p>
                <p id="sidebar-user-email" class="text-[11px] text-slate-400 truncate">admin@ikhw.org</p>
              </div>
              <div class="w-2 h-2 rounded-full bg-emerald-400 shrink-0" title="Online"></div>
            </div>
          </div>
        </aside>

        <!-- Main Content Area -->
        <div id="admin-main-wrapper" class="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300 w-full">
          <!-- Topbar Modern 3-Part Layout -->
          <header id="admin-topbar" class="sticky top-0 z-30 h-16 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 px-3 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 transition-all">
            <!-- A. Bagian Kiri: Sidebar Toggles & Breadcrumb Hierarki -->
            <div class="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <!-- Mobile hamburger button -->
              <button id="btn-admin-mobile-sidebar" class="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 active:scale-95 transition lg:hidden shrink-0" aria-label="Buka menu navigasi" title="Buka menu navigasi">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>

              <!-- Desktop collapse toggle button -->
              <button id="btn-toggle-sidebar-collapse" class="hidden lg:flex p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 active:scale-95 transition shrink-0" title="Ciutkan / Lebarkan Sidebar" aria-label="Ciutkan / Lebarkan Sidebar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
              </button>

              <div class="h-5 w-px bg-slate-800 hidden sm:block shrink-0"></div>

              <!-- Dynamic Title & Hierarchical Breadcrumbs -->
              <div class="min-w-0 flex flex-col justify-center">
                <!-- Breadcrumb Hierarki Sesuai Alur & Route -->
                <nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 overflow-hidden whitespace-nowrap">
                  <button type="button" id="breadcrumb-btn-root" class="hover:text-emerald-400 transition hover:underline cursor-pointer">Admin</button>
                  <span class="text-slate-600">/</span>
                  <span id="breadcrumb-category-wrapper" class="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
                    <span id="breadcrumb-category-title" class="truncate max-w-[120px] md:max-w-none">Tahapan</span>
                    <span class="text-slate-600">/</span>
                  </span>
                  <span id="admin-breadcrumb-active" class="text-emerald-400 font-semibold truncate max-w-[130px] sm:max-w-[200px] md:max-w-none">
                    Dashboard Ringkasan
                  </span>
                </nav>

                <!-- Dynamic Page Heading -->
                <h1 id="admin-header-title" class="text-xs sm:text-sm font-bold text-white tracking-tight leading-tight truncate max-w-[180px] sm:max-w-[320px] md:max-w-lg">
                  Dashboard Ringkasan Virtual Tour & Silvikultur
                </h1>
              </div>
            </div>

            <!-- B. Bagian Tengah: Ruang Fleksibel Seimbang -->
            <div class="flex-1"></div>

            <!-- C. Bagian Kanan: Pemilih Kawasan, Indikator Sinkron, Preview Publik, & Profil Admin -->
            <div class="flex items-center gap-2 sm:gap-3 shrink-0">
              <!-- Pemilih Kawasan (Hanya Tampil di Halaman Relevan: Dashboard, Zones, Trees, Reports) -->
              <div id="topbar-zone-switcher-container" class="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700/60 text-xs transition">
                <span class="text-emerald-400 text-sm shrink-0">🏞️</span>
                <select id="topbar-zone-switcher" class="bg-transparent text-slate-200 border-none outline-none text-xs cursor-pointer font-medium max-w-[110px] sm:max-w-[180px] truncate" aria-label="Pilih Kawasan Lahan">
                  <option value="all" class="bg-slate-900 text-white">Semua Kawasan (Agregat)</option>
                </select>
              </div>

              <!-- Status Sinkronisasi Real-time (Draft / Sinkron) -->
              <span id="admin-draft-count-badge" class="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap" title="Status Integritas Hotspot">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Sinkron
              </span>

              <!-- Tombol Pratinjau Tampilan Publik -->
              <button id="btn-admin-view-public" class="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700/80 active:scale-95 transition" title="Lihat Tampilan Pengunjung (Public Virtual Tour)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span class="hidden md:inline">Tampilan Publik</span>
              </button>

              <!-- Menu Profil Administrator (Dropdown Interaktif) -->
              <div id="admin-profile-dropdown-root" class="relative">
                <!-- Trigger Button -->
                <button id="btn-admin-profile-toggle" type="button" aria-haspopup="true" aria-expanded="false" class="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-800/90 border border-transparent hover:border-slate-700/80 transition cursor-pointer select-none">
                  <div class="relative">
                    <div id="topbar-user-avatar" class="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-1 ring-emerald-400/30">
                      AD
                    </div>
                    <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-slate-900"></span>
                  </div>
                  <div class="hidden md:flex flex-col text-left">
                    <span id="topbar-user-name" class="text-xs font-semibold text-slate-200 leading-tight truncate max-w-[110px]">Administrator</span>
                    <span id="topbar-user-role" class="text-[10px] text-emerald-400 font-medium leading-none mt-0.5">Admin Sistem</span>
                  </div>
                  <svg id="topbar-profile-chevron" class="w-3.5 h-3.5 text-slate-400 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                <!-- Dropdown Menu Box -->
                <div id="admin-profile-menu" class="hidden absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                  <!-- User Header Card -->
                  <div class="p-3 bg-slate-800/60 rounded-xl mb-1.5 border border-slate-700/40">
                    <div class="flex items-center gap-3">
                      <div id="dropdown-user-avatar-lg" class="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-sm shadow ring-1 ring-emerald-400/40 shrink-0">
                        AD
                      </div>
                      <div class="min-w-0">
                        <h3 id="dropdown-user-fullname" class="font-bold text-white text-xs truncate">Administrator IKHW</h3>
                        <p id="dropdown-user-email" class="text-[11px] text-slate-400 truncate">admin@ikhw.org</p>
                        <div class="mt-1">
                          <span id="dropdown-user-role-badge" class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Administrator
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Quick Navigation Links -->
                  <div class="space-y-0.5 py-1">
                    <button type="button" class="profile-menu-nav-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left cursor-pointer" data-target-tab="settings">
                      <span class="text-sm shrink-0">⚙️</span>
                      <span>Pengaturan & Identitas</span>
                    </button>
                    <button type="button" class="profile-menu-nav-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left cursor-pointer" data-target-tab="users">
                      <span class="text-sm shrink-0">👥</span>
                      <span>Manajemen Pengguna</span>
                    </button>
                    <button type="button" class="profile-menu-nav-item w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/70 transition text-left cursor-pointer" data-target-tab="activity-logs">
                      <span class="text-sm shrink-0">🕒</span>
                      <span>Log Histori Aktivitas</span>
                    </button>
                  </div>

                  <div class="my-1 border-t border-slate-800/80"></div>

                  <!-- Logout Action Button -->
                  <button id="btn-admin-logout" type="button" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 active:bg-red-500/20 transition text-left cursor-pointer font-medium">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                    <span>Keluar Sesi Administrator</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <!-- Main Subpanes Container -->
          <div class="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            <div class="admin-subpanes-container w-full">
              <!-- SUBPANE 1: DASHBOARD -->
              <div id="admin-pane-dashboard" class="admin-subpane active">
                <div id="admin-dashboard-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 2: PANORAMAS -->
              <div id="admin-pane-panoramas" class="admin-subpane">
                <div id="admin-panoramas-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 3: VISUAL HOTSPOT EDITOR -->
              <div id="admin-pane-editor" class="admin-subpane">
                <div class="admin-editor-layout">
                  <!-- Top Editor Toolbar -->
                  <div class="editor-toolbar">
                    <div class="editor-tool-group">
                      <label for="editor-scene-select" class="tool-label">Pilih Panorama:</label>
                      <select id="editor-scene-select" class="form-select editor-scene-dropdown">
                        <option value="0-1-pano_20261004_100402_6">Titik 1: Gerbang Masuk Kawasan</option>
                        <option value="1-2-pano_20261004_100722_7">Titik 2: Batas Vegetasi Alami</option>
                        <option value="2-3-pano_20261004_095925_3">Titik 3: Patok Koordinat Sentral</option>
                        <option value="3-4-pano_20261004_101937_11">Titik 4: Jalur Tanam Kayu Keras</option>
                        <option value="4-32-pano_20261004_095509_0">Titik 5: Zona Ajir Pohon Buah</option>
                        <option value="5-5-pano_20261004_103130_17-2">Titik 6: Titik Pantau Kanopi</option>
                      </select>
                    </div>

                    <div class="editor-tool-group">
                      <button id="tool-select" class="editor-tool-btn active" data-mode="select" title="Pilih & Periksa Hotspot">👆 Pilih</button>
                      <button id="tool-add-link" class="editor-tool-btn" data-mode="add-link" title="Tambah Hotspot Navigasi">➕ Navigasi</button>
                      <button id="tool-add-info" class="editor-tool-btn" data-mode="add-info" title="Tambah Hotspot Informasi">ℹ️ Informasi</button>
                      <button id="tool-move" class="editor-tool-btn" data-mode="move" title="Geser Hotspot">✋ Pindahkan</button>
                      <button id="tool-duplicate" class="editor-tool-btn" title="Duplikasi Hotspot">📋 Duplikasi</button>
                      <button id="tool-copy" class="editor-tool-btn" title="Salin Hotspot">📄 Salin</button>
                      <button id="tool-paste" class="editor-tool-btn" title="Tempel Hotspot">📑 Tempel</button>
                      <button id="tool-delete" class="editor-tool-btn btn-danger-tool" title="Hapus Hotspot">🗑️ Hapus</button>
                    </div>

                    <div class="editor-tool-group">
                      <button id="tool-undo" class="editor-tool-btn" title="Undo" disabled>↩️ Undo</button>
                      <button id="tool-redo" class="editor-tool-btn" title="Redo" disabled>↪️ Redo</button>
                      <button id="tool-preview" class="editor-tool-btn" data-mode="preview" title="Pratinjau">👁️ Pratinjau</button>
                    </div>

                    <div class="editor-tool-group editor-save-actions">
                      <button id="btn-editor-save-draft" class="btn-secondary-action btn-sm" title="Simpan sebagai draft di server">💾 Simpan Draft</button>
                      <button id="btn-editor-publish" class="btn-primary-action btn-sm" title="Publikasikan seluruh perubahan ke pengunjung">🚀 Publikasikan</button>
                      <button id="btn-editor-revert" class="btn-text-btn btn-sm" title="Muat ulang dari server">Batalkan</button>
                    </div>
                  </div>

                  <div id="editor-mode-hint" class="editor-mode-hint hidden"></div>

                  <div class="editor-body">
                    <div class="editor-canvas-wrapper">
                      <div id="admin-editor-pano"></div>
                      <div class="editor-canvas-badge">
                        <span id="editor-current-scene-name">Panorama Aktif</span>
                      </div>
                    </div>

                    <div class="editor-sidebar-panel">
                      <div class="panel-section-box">
                        <div class="panel-box-header">
                          <h3>Pengaturan Hotspot</h3>
                        </div>
                        <div id="editor-properties-panel" class="editor-properties-panel empty-state">
                          <div class="prop-empty-notice">
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4M12 8h.01" />
                            </svg>
                            <p>Pilih salah satu hotspot di panorama atau daftar untuk mengubah propertinya.</p>
                          </div>
                        </div>
                      </div>

                      <div class="panel-section-box">
                        <div class="panel-box-header">
                          <div class="panel-header-flex">
                            <h3>Daftar Hotspot</h3>
                            <span id="editor-filter-count" class="badge-count">16 Hotspot</span>
                          </div>
                        </div>

                        <div class="editor-filters-bar">
                          <input type="text" id="editor-search-input" class="form-input form-input-sm" placeholder="🔍 Cari judul atau target..." />
                          <div class="filter-row">
                            <select id="editor-filter-scene" class="form-select form-select-sm" title="Filter berdasarkan Scene" aria-label="Filter berdasarkan Scene">
                              <option value="all">Semua Scene</option>
                              <option value="0-1-pano_20261004_100402_6">Titik 1</option>
                              <option value="1-2-pano_20261004_100722_7">Titik 2</option>
                              <option value="2-3-pano_20261004_095925_3">Titik 3</option>
                              <option value="3-4-pano_20261004_101937_11">Titik 4</option>
                              <option value="4-32-pano_20261004_095509_0">Titik 5</option>
                              <option value="5-5-pano_20261004_103130_17-2">Titik 6</option>
                            </select>
                            <select id="editor-filter-type" class="form-select form-select-sm" title="Filter berdasarkan Tipe Hotspot" aria-label="Filter berdasarkan Tipe Hotspot">
                              <option value="all">Semua Tipe</option>
                              <option value="link">🧭 Navigasi</option>
                              <option value="info">ℹ️ Informasi</option>
                            </select>
                            <select id="editor-filter-status" class="form-select form-select-sm" title="Filter berdasarkan Status Hotspot" aria-label="Filter berdasarkan Status Hotspot">
                              <option value="all">Semua Status</option>
                              <option value="draft">Draft</option>
                              <option value="published">Published</option>
                              <option value="inactive">Nonaktif</option>
                            </select>
                          </div>
                        </div>

                        <div id="editor-hotspots-table" class="editor-hotspots-table"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- SUBPANE 4: SETTINGS -->
              <div id="admin-pane-settings" class="admin-subpane">
                <div id="admin-settings-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 5: BACKUP -->
              <div id="admin-pane-backup" class="admin-subpane">
                <div id="admin-backup-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 6: DATA PENANAMAN POHON -->
              <div id="admin-pane-trees" class="admin-subpane">
                <div id="admin-trees-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 7: MANAJEMEN KAWASAN -->
              <div id="admin-pane-zones" class="admin-subpane">
                <div id="admin-zones-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 8: LAPORAN -->
              <div id="admin-pane-reports" class="admin-subpane">
                <div id="admin-reports-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 9: PENGGUNA & HAK AKSES -->
              <div id="admin-pane-users" class="admin-subpane">
                <div id="admin-users-content" class="admin-pane-wrapper"></div>
              </div>

              <!-- SUBPANE 10: LOG AKTIVITAS -->
              <div id="admin-pane-activity-logs" class="admin-subpane">
                <div id="admin-activity-logs-content" class="admin-pane-wrapper"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>

    <!-- ==========================================
           SHARED PUBLIC FOOTER (GLOBAL)
           ========================================== -->
    <footer id="public-global-footer" class="public-global-footer border-t border-white/10 bg-slate-950/90 backdrop-blur-xl mt-auto relative z-10 text-xs text-slate-400 w-full">
      <div class="footer-container max-w-[1320px] mx-auto px-5 w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-5">
        <div class="footer-left-links flex items-center gap-5 text-[13px] font-medium">
          <a href="#info" class="footer-nav-link inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors" data-tab="info">
            <span>ℹ️</span> <span>Detail Kawasan</span>
          </a>
          <a href="#tour" class="footer-nav-link inline-flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors" data-tab="tour">
            <span>🔄</span> <span>Virtual Tour</span>
          </a>
        </div>
        <div class="footer-right-copyright text-slate-400 text-center sm:text-right text-[12px]">
          Copyright &copy; 2026 <a href="https://nagakecil.site/" target="_blank" rel="noopener noreferrer" class="font-bold text-blue-400 hover:text-blue-300 transition-colors">nagakecil</a>. All Rights Reserved.
        </div>
      </div>
    </footer>
  </div>

  <!-- Admin Login Modal -->
  <div id="admin-login-modal" class="modal-overlay hidden">
    <div class="modal-card modal-card-admin-login" style="max-width: 440px; border-radius: 22px; border: 1px solid rgba(255,255,255,0.18); background: rgba(6, 20, 14, 0.94); backdrop-filter: blur(24px); box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 25px rgba(16, 185, 129, 0.2);">
      <div class="modal-header" style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
        <div class="modal-header-brand" style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); display: flex; align-items: center; justify-content: center; color: #34d399;">
            <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 01-9-9c0-4.97 4.03-9 9-9 4.14 0 7.63 2.8 8.65 6.64.12.44-.22.86-.68.86h-2.18c-.46 0-.85.34-.94.79a5.002 5.002 0 01-4.85 4.71H12v6z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v18" />
            </svg>
          </div>
          <div>
            <h3 class="modal-header-title" style="font-size: 18px; font-weight: 800; color: #fff; margin: 0; background: linear-gradient(135deg, #ffffff 40%, #a7f3d0 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Eco Land</h3>
            <p class="modal-header-sub" style="font-size: 12px; color: #94a3b8; margin: 2px 0 0;">
              Land and Green Space Management System
            </p>
          </div>
        </div>
        <button id="btn-close-login-modal" class="icon-btn" aria-label="Tutup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <form id="admin-login-form">
        <div class="modal-body modal-body-login" style="display: flex; flex-direction: column; gap: 14px; padding-top: 16px;">
          <div id="admin-login-error" class="login-error-alert hidden" style="padding: 10px 14px; border-radius: 10px; background: rgba(153, 27, 27, 0.45); border: 1px solid rgba(239, 68, 68, 0.45); color: #fecaca; font-size: 13px;"></div>

          <div class="form-group">
            <label for="admin-username" style="display: block; font-size: 12px; font-weight: 600; color: #a7f3d0; margin-bottom: 5px;">Alamat Email / Akun Administrator:</label>
            <input type="text" id="admin-username" class="form-input" placeholder="admin@ecoland.local atau admin" required style="width: 100%; border-radius: 10px; background: rgba(3, 14, 8, 0.7); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 14px;" />
          </div>

          <div class="form-group">
            <label for="admin-password" style="display: block; font-size: 12px; font-weight: 600; color: #a7f3d0; margin-bottom: 5px;">Kata Sandi:</label>
            <input type="password" id="admin-password" class="form-input" placeholder="••••••••" required style="width: 100%; border-radius: 10px; background: rgba(3, 14, 8, 0.7); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px 14px;" />
          </div>

          <div style="padding-top: 4px;">
            <button type="submit" class="btn-primary-action btn-login-submit" style="width: 100%; height: 44px; border-radius: 12px; font-weight: 700; background: linear-gradient(135deg, #059669 0%, #10b981 100%); border: 1px solid rgba(255,255,255,0.3); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span>Masuk ke Eco Land</span> →
            </button>
          </div>

          <div style="position: relative; margin: 4px 0; display: flex; align-items: center;">
            <div style="flex-grow: 1; border-top: 1px solid rgba(255, 255, 255, 0.12);"></div>
            <span style="flex-shrink: 0; margin: 0 12px; font-size: 11px; color: #94a3b8;">Atau masuk dengan</span>
            <div style="flex-grow: 1; border-top: 1px solid rgba(255, 255, 255, 0.12);"></div>
          </div>

          <div>
            <a href="{{ route('auth.google.redirect') }}" class="btn-glass-secondary" style="width: 100%; height: 42px; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font-size: 13px; font-weight: 600; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18); color: #e2e8f0; text-decoration: none;">
              <svg style="width: 18px; height: 18px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Masuk dengan Google</span>
            </a>
          </div>

          <div style="text-align: center; margin-top: 4px;">
            <a href="/login" style="font-size: 11px; color: #34d399; text-decoration: none;">Buka Halaman Login Penuh →</a>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Modal Detail Kawasan Publik -->
  <div id="public-zone-modal" class="modal-overlay hidden">
    <div class="modal-card modal-card-public-zone">
      <div class="modal-header">
        <div class="modal-header-brand">
          <span class="modal-header-icon-lg">🌿</span>
          <div>
            <h3 id="public-zone-modal-title" class="modal-header-title-lg">Detail Kawasan Penanaman</h3>
            <p id="public-zone-modal-badge" class="modal-header-badge"></p>
          </div>
        </div>
        <button class="icon-btn btn-close-modal" aria-label="Tutup">✕</button>
      </div>
      <div class="modal-body" id="public-zone-modal-body">
        <!-- Populated dynamically -->
      </div>
      <div class="modal-footer modal-footer-right">
        <button type="button" class="btn-secondary-action btn-sm btn-close-modal">Tutup</button>
      </div>
    </div>
  </div>

  <!-- Global Toast Container -->
  <div id="ecozone-toast-container" class="ecozone-toast-container" role="status" aria-live="polite"></div>

  @if(session('success'))
  <div id="laravel-flash-success" class="hidden" data-message="{{ session('success') }}"></div>
  @endif
  @if(session('error'))
  <div id="laravel-flash-error" class="hidden" data-message="{{ session('error') }}"></div>
  @endif

  <!-- Main Module Script -->

</body>

</html>