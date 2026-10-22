# Eco Land — Sistem Informasi Pengelolaan Kawasan & Virtual Tour 360°

Aplikasi web terpadu untuk monitoring restorasi kawasan silvikultur, inventarisasi jenis pohon, kegiatan penanaman, pemantauan tanaman, sensus karbon berkala, serta penjelajahan panorama 360° berbasis **Laravel 13**, **PHP 8.4**, **Nginx**, **PHP-FPM 8.4**, **Redis**, **Vite**, dan **Marzipano**.

---

## 📌 Daftar Isi
1. [Deskripsi Eco Land](#-a-deskripsi-eco-land)
2. [Kebutuhan Sistem (Requirements)](#-b-kebutuhan-sistem-requirements)
3. [Panduan Local Development](#-c-panduan-local-development)
4. [Arsitektur & Konfigurasi Production aaPanel](#-d-arsitektur--konfigurasi-production-aapanel)
6. [Integrasi & Konfigurasi Cache (Redis & Opsi Memcached)](#-f-integrasi--konfigurasi-cache-redis--opsi-memcached)
7. [Pengaturan Hak Akses (Permissions)](#-g-pengaturan-hak-akses-permissions)
8. [Panduan Troubleshooting Lengkap](#-h-panduan-troubleshooting-lengkap)
9. [Standar Keamanan (Security Guidelines)](#-i-standar-keamanan-security-guidelines)
10. [Admin Login Security](#-j-admin-login-security-pertahanan-berlapis)

---

## 🌲 A. Deskripsi Eco Land

**Eco Land** dirancang sebagai sistem informasi terintegrasi untuk mendukung pelestarian lingkungan dan transparansi restorasi kawasan silvikultur:

- **Pengelolaan Kawasan (Planting Zones):** Pemetaan poligon koordinat GPS batas kawasan, zonasi tutupan lahan, luasan area (hektare dan m²), status zonasi (published/draft), dan galeri dokumentasi foto kawasan.
- **Pendataan Jenis Pohon (Tree Species):** Inventarisasi botani jenis pohon, nama ilmiah, nama lokal, karakteristik morfologi, laju serapan biomassa, serta pedoman silvikultur.
- **Kegiatan Penanaman (Planting Activities):** Pencatatan log batch penanaman, alokasi bibit per zona, tanggal tanam, dan pelaksana teknis lapangan.
- **Pemantauan Tanaman (Tree Surveys):** Monitoring berkala persentase kelangsungan hidup (survival rate), pertumbuhan diameter batang (DBH), pertambahan tinggi pohon, dan indikator kesehatan bibit.
- **Perawatan & Penyulaman (Tree Maintenance Logs):** Pelaporan tindakan silvikultur intensif, penyiangan gulma, pemupukan organik, pemangkasan ranting, hingga penyulaman bibit mati.
- **Dokumentasi Kawasan:** Galeri foto kronologis kawasan dengan foto sampul (cover photo), urutan tampilan, dan caption pemantauan visual.
- **Tree QR:** Penandaan digital pohon berbasis kode QR unik per spesimen untuk peninjauan riwayat penanaman dan identifikasi langsung di lapangan menggunakan smartphone.
- **Virtual Tour 360°:** Penjelajahan interaktif panorama equirectangular 360° multi-scene berbasis engine Marzipano, dilengkapi hotspot navigasi, titik info spesimen pohon, dan panel penamaan scene.
- **Pemantauan Karbon (Carbon Monitoring):** Estimasi penyerapan karbon pohon (Allometric Biomass Carbon Equation), akumulasi karbon tersimpan, dan ringkasan metrik emisi publik.

---

## ⚙️ B. Kebutuhan Sistem (Requirements)

Aplikasi dibangun untuk performa tinggi dan keamanan level enterprise dengan spesifikasi:

| Komponen | Spesifikasi Minimum / Direkomendasikan |
|---|---|
| **Framework** | Laravel 13.x |
| **Bahasa Pemrograman** | PHP 8.4.x (CLI & PHP-FPM) |
| **Web Server** | Nginx 1.22+ / 1.24+ |
| **Cache & Queue Server** | Redis 7.x (dengan ekstensi `phpredis`) |
| **Database** | MySQL 8.0+ / MariaDB 10.11+ / PostgreSQL 15+ |
| **Package Manager** | Composer 2.7+ & Node.js 20+ (npm 10+) |
| **Frontend Bundler** | Vite 8+ & Tailwind CSS 4+ |
| **Sistem Operasi Server** | Linux Ubuntu 22.04/24.04 LTS / Debian 12 / AlmaLinux 9 dengan aaPanel |

### Ekstensi PHP Wajib:
`ctype`, `curl`, `dom`, `fileinfo`, `filter`, `hash`, `iconv`, `intl`, `json`, `libxml`, `mbstring`, `openssl`, `pcre`, `PDO`, `pdo_mysql` (atau `pdo_pgsql`), `redis` (phpredis), `session`, `SimpleXML`, `tokenizer`, `xml`, `xmlwriter`, `Zend OPcache`, `zip`.

---

## 💻 C. Panduan Local Development

Untuk menjalankan aplikasi di lingkungan pengembangan lokal:

```bash
# 1. Clone repository
git clone https://github.com/ametatjeh/EcoLand.git
cd EcoLand

# 2. Instal dependensi PHP (development)
composer install

# 3. Siapkan environment file
cp .env.example .env

# 4. Generate Application Encryption Key
php artisan key:generate

# 5. Sesuaikan konfigurasi database di file .env:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=ecoland_dev
# DB_USERNAME=root
# DB_PASSWORD=

# 6. Jalankan migrasi database lokal
php artisan migrate

# 7. Buat symbolic link direktori media/storage
php artisan storage:link

# 8. Instal dependensi frontend & jalankan Vite dev server
npm ci
npm run dev

# 9. Di terminal terpisah, jalankan server Laravel
php artisan serve
```

Akses aplikasi di browser pada: `http://localhost:8000` atau port Vite `http://localhost:5173`.

---

## 🌐 D. Arsitektur & Konfigurasi Production aaPanel

### Alur Arsitektur Request

```text
Klien / Browser (HTTPS)
       │
       ▼
Nginx Reverse Proxy & Static Handler (Port 80 / 443)
       │
       ├─► File Statis /public/build/*, /tours/*, /favicon.svg ──► Langsung dilayani Nginx
       │
       ▼ (FastCGI Request)
PHP-FPM 8.4 (/tmp/php-cgi-84.sock)
       │
       ▼ (Entry Point)
Laravel /public/index.php
       │
       ├─► Cache & Session ────► Redis 7 (Port 6379, phpredis)
       │
       └─► Relational Data ────► MySQL Production Database (Port 3306)
```

### 1. Document Root Wajib Menunjuk ke `/public`
> [!CRITICAL]
> Document Root web server **HARUS** menunjuk ke direktori `/public` dari proyek Eco Land (contoh: `/www/wwwroot/ecoland/public`), **BUKAN** ke root proyek (`/www/wwwroot/ecoland`).
> Jika menunjuk ke root proyek, file konfigurasi `.env`, repository `.git`, dan struktur kode akan terekspos ke publik!

Pada **aaPanel**:
1. Masuk ke **Website** → Pilih domain Eco Land → Klik **Site Directory**.
2. **Site directory:** `/www/wwwroot/ecoland`
3. **Run directory:** Pilih `/public` → Klik **Save**.

### 2. Konfigurasi URL Rewrite (Laravel Routing)
Pada menu **URL rewrite** situs di aaPanel, pilih template `laravel5` atau masukkan blok berikut:

```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

### 3. Template Lengkap Konfigurasi Nginx aaPanel
Berikut adalah konfigurasi lengkap server block Nginx production Eco Land (`/www/server/panel/vhost/nginx/{domain}.conf`):

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name ikhw.org www.ikhw.org;

    # Document Root mengarah ke subfolder public
    root /www/wwwroot/ecoland/public;
    index index.php index.html index.htm;

    # Pengaturan SSL (Let's Encrypt / aaPanel SSL Certificate)
    # ssl_certificate     /www/server/panel/vhost/cert/ikhw.org/fullchain.pem;
    # ssl_certificate_key /www/server/panel/vhost/cert/ikhw.org/privkey.pem;
    # ssl_protocols TLSv1.2 TLSv1.3;

    # Header Keamanan
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    charset utf-8;

    # 1. Routing Laravel SPA & API
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # 2. Caching Aset Statis & Media Panorama
    location ~* \.(jpg|jpeg|gif|png|css|js|ico|webp|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        access_log off;
        log_not_found off;
        try_files $uri =404;
    }

    # 3. Penanganan Media Storage Publik
    location ^~ /storage/ {
        alias /www/wwwroot/ecoland/storage/app/public/;
        try_files $uri $uri/ /index.php?$query_string;
        access_log off;
    }

    # 4. PHP-FPM 8.4 Processing (Gunakan socket resmi aaPanel)
    location ~ \.php$ {
        fastcgi_pass unix:/tmp/php-cgi-84.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_read_timeout 300;
        fastcgi_buffer_size 128k;
        fastcgi_buffers 4 256k;
        fastcgi_busy_buffers_size 256k;
    }

    # 5. Blokir Akses ke File & Folder Sensitif
    location ~ /\.(env|git|gitignore|editorconfig) {
        deny all;
        return 404;
    }

    location ~ /(composer\.(json|lock)|package(-lock)?\.json|vite\.config\.(js|ts)|phpunit\.xml) {
        deny all;
        return 404;
    }

    location ~ /(storage|bootstrap/cache|vendor|node_modules)/ {
        deny all;
        return 404;
    }

    # Logging
    access_log /www/wwwlogs/ecoland.log;
    error_log /www/wwwlogs/ecoland.error.log;
}
```

Setelah mengubah konfigurasi Nginx:
```bash
nginx -t
# Pastikan output: syntax is ok & test is successful
systemctl reload nginx
```

---

## 🚀 E. Prosedur Deployment Otomatis (`deploy.sh`)

Eco Land dilengkapi dengan skrip deployment otomatis terstandarisasi: [deploy.sh](file:///c:/XPROJECT/Ecoland/deploy.sh).

### Prinsip Keamanan Deployment:
1. **Zero Downtime Optimization:** Menjalankan pembersihan cache lama dan membangun ulang konfigurasi teroptimasi (`optimize`).
2. **Strict Error Trap (`set -Eeuo pipefail`):** Skrip langsung berhenti jika salah satu langkah gagal, mencegah deploy setengah jalan yang merusak sistem.
3. **Kebijakan Database Terkontrol (`RUN_MIGRATIONS=false` secara default):** Database production **TIDAK AKAN DISENTUH** kecuali variabel `RUN_MIGRATIONS=true` didefinisikan secara sadar.
4. **Larangan Destruktif:** Skrip sama sekali tidak pernah mengeksekusi `migrate:fresh`, `migrate:refresh`, `migrate:reset`, `db:wipe`, atau `rollback`.

### Cara Menjalankan Deployment:

```bash
# Berikan hak eksekusi jika pertama kali
chmod +x deploy.sh

# Deployment standar (tanpa migrasi database)
./deploy.sh
```

### Deployment dengan Migrasi Terencana:
Jika pembaruan kode memuat migrasi tabel baru yang **resmi dan telah ditinjau**:

```bash
RUN_MIGRATIONS=true ./deploy.sh
```

Skrip akan menampilkan detail koneksi target, daftar migrasi yang akan berjalan, lalu mengeksekusi migrasi hanya dengan parameter `--force`.

---

## ⚡ F. Integrasi & Konfigurasi Cache (Redis & Opsi Memcached)

Redis digunakan sebagai default session store dan primary cache engine di Eco Land, dengan dukungan konfigurasi alternatif Memcached jika dibutuhkan.

### 1. Instalasi Ekstensi di aaPanel
1. Buka **aaPanel** → **App Store** → Cari **PHP 8.4**.
2. Klik **Setting** → Pilih tab **Install extensions**.
3. Temukan ekstensi **redis** → Klik **Install**.
4. Restart service PHP-FPM 8.4.

### 2. Verifikasi Koneksi Redis
```bash
# Periksa apakah service Redis aktif
redis-cli ping
# Respon yang diharapkan: PONG

# Periksa modul phpredis di PHP 8.4 CLI
php -m | grep redis
# Respon yang diharapkan: redis
```

### 3. Konfigurasi di `.env`
```env
SESSION_DRIVER=redis
SESSION_LIFETIME=120
ADMIN_IDLE_TIMEOUT=30
ADMIN_IDLE_WARNING=5

CACHE_STORE=redis
REDIS_CLIENT=phpredis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
REDIS_DB=0
REDIS_CACHE_DB=1
REDIS_PREFIX=eco_land_
```

> [!NOTE]
> Pemisahan DB Redis: `REDIS_DB=0` dicadangkan untuk database redis default/queue/session, sedangkan `REDIS_CACHE_DB=1` dikhususkan untuk caching aplikasi agar tidak terjadi benturan kunci (*key collision*).

### 4. Keamanan Otomatisasi Logout (Admin Inactivity Auto-Logout)
Eco Land menerapkan sistem pertahanan multi-lapis native Laravel 13 untuk sesi administrator:
- **Admin session timeout:** 30 menit inaktivitas maksimum (`ADMIN_IDLE_TIMEOUT=30`).
- **Peringatan (Warning Modal):** Muncul 5 menit sebelum logout pada menit ke-25 inaktivitas (`ADMIN_IDLE_WARNING=5`), dilengkapi countdown interaktif dari `05:00` hingga `00:00`.
- **Tombol "Tetap Login":** Memperpanjang sesi ke server (`/api/auth/session-ping` & `/admin/session/keep-alive`), mereset timer kembali ke 30 menit, dan menyinkronkan seluruh tab yang terbuka.
- **Multi-Tab Sync:** Komunikasi real-time antar browser tab menggunakan `BroadcastChannel` (`ecoland_admin_session_channel`) dengan fallback `storage event` agar aktivitas di Tab A otomatis menjaga sesi di Tab B.
- **Server-Side Enforcement:** Middleware `EnsureAdminSessionActive` memastikan validasi inaktivitas dilakukan langsung di server (Redis session), sehingga penutupan tab atau manipulasi JavaScript tidak dapat menembus keamanan.
- **Database Migration:** **Tidak diperlukan** (100% menggunakan native Redis session & cache tanpa perubahan struktur basis data).

### 5. Opsi Alternatif: Memcached Application Cache Store

Eco Land mendukung **Memcached** sebagai penyimpan cache aplikasi alternatif selain Redis.

> [!IMPORTANT]
> **Pemisahan Peran Arsitektur:**
> - **Redis:** Wajib dipertahankan sebagai **Session Store** (`SESSION_DRIVER=redis`) untuk mendukung fitur keamanan login Admin, auto-logout 30 menit, dan isolasi sesi.
> - **Memcached:** Hanya disediakan sebagai opsi **Application Cache** (`CACHE_STORE=memcached`). Jangan mengubah `SESSION_DRIVER` menjadi Memcached.

#### A. Persyaratan Sistem Memcached
1. **Layanan Memcached:** Daemon Memcached terpasang dan berjalan pada port `11211` (default localhost `127.0.0.1:11211`).
   - Pada Ubuntu/Debian: `sudo apt install memcached`
   - Pada aaPanel: Pasang Memcached via **App Store** → **Memcached**.
2. **Ekstensi PHP Memcached:** Ekstensi `memcached` untuk PHP 8.4 wajib aktif.
   - Periksa via CLI: `php -m | grep memcached`
   - Di aaPanel: Buka **App Store** → **PHP 8.4** → **Extensions** → Pasang **memcached**.

#### B. Konfigurasi di `.env`
Buka file `.env` dan tambahkan blok konfigurasi Memcached:

```env
# Cache Store Aktif (Default: redis)
CACHE_STORE=redis

# Memcached Configuration (Opsional - Diisi jika CACHE_STORE=memcached)
MEMCACHED_HOST=127.0.0.1
MEMCACHED_PORT=11211
MEMCACHED_USERNAME=
MEMCACHED_PASSWORD=
MEMCACHED_PERSISTENT_ID=
MEMCACHED_USERNAME_SASL=
MEMCACHED_PASSWORD_SASL=
```

#### C. Prosedur Uji Koneksi Memcached (Sebelum Mengaktifkan)
Sebelum mengubah `CACHE_STORE=redis` menjadi `CACHE_STORE=memcached`, lakukan pengujian koneksi mandiri:

```bash
# 1. Pastikan port 11211 merespons
nc -zv 127.0.0.1 11211 || echo "Port 11211 tidak dapat diakses!"

# 2. Uji coba Read/Write cache via Laravel CLI
php -r '
require "vendor/autoload.php";
$app = require_once "bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

if (!extension_loaded("memcached")) {
    echo "ERROR: Ekstensi PHP memcached belum terpasang!\n";
    exit(1);
}

try {
    Illuminate\Support\Facades\Cache::store("memcached")->put("test_key", "ecoland_ok", 10);
    $val = Illuminate\Support\Facades\Cache::store("memcached")->get("test_key");
    if ($val === "ecoland_ok") {
        echo "SUKSES: Koneksi dan Read/Write Memcached berfungsi dengan baik!\n";
    } else {
        echo "ERROR: Memcached gagal membaca nilai kembali.\n";
    }
} catch (\Throwable $e) {
    echo "ERROR KONEKSI: " . $e->getMessage() . "\n";
}
'
```

#### D. Cara Mengaktifkan Memcached
Setelah pengujian di atas menghasilkan status `SUKSES`:
1. Ubah di `.env`:
   ```env
   CACHE_STORE=memcached
   ```
2. Bersihkan dan perbarui cache konfigurasi:
   ```bash
   php artisan optimize:clear
   php artisan optimize
   ```

#### E. Cara Mengembalikan (Rollback) ke Redis
Jika server Memcached mengalami kendala atau gagal koneksi:
1. Kembalikan variabel di `.env`:
   ```env
   CACHE_STORE=redis
   ```
2. Jalankan perintah optimasi:
   ```bash
   php artisan optimize:clear
   php artisan optimize
   ```

---

## 🔒 G. Pengaturan Hak Akses (Permissions)

### Aturan Keamanan Permission:
> [!CAUTION]
> **JANGAN PERNAH MENGGUNAKAN `chmod -R 777`!**
> Memberikan hak akses 777 membuka kerentanan eksekusi file arbitrer yang dapat membahayakan seluruh server.

Pada server aaPanel Linux, Nginx dan PHP-FPM berjalan di bawah user dan grup `www:www`.

### Konfigurasi Hak Akses yang Benar:
```bash
# Ubah kepemilikan ke user web server aaPanel
chown -R www:www /www/wwwroot/ecoland

# Berikan hak akses baca/tulis/eksekusi folder yang aman
find /www/wwwroot/ecoland/storage -type d -exec chmod 775 {} \;
find /www/wwwroot/ecoland/storage -type f -exec chmod 664 {} \;

find /www/wwwroot/ecoland/bootstrap/cache -type d -exec chmod 775 {} \;
find /www/wwwroot/ecoland/bootstrap/cache -type f -exec chmod 664 {} \;
```

---

## 🛠️ H. Panduan Troubleshooting Lengkap

### 1. HTTP 500 Internal Server Error
- **Gejala:** Halaman memunculkan pesan error 500 atau *"Server Error"*.
- **Penyebab:** Izin tulis `storage/logs/laravel.log` ditolak, sintaks PHP error, atau file `.env` tidak terbaca.
- **Pemeriksaan:**
  ```bash
  tail -n 50 /www/wwwroot/ecoland/storage/logs/laravel.log
  tail -n 50 /www/wwwlogs/ecoland.error.log
  ```
- **Solusi:**
  ```bash
  chown -R www:www storage bootstrap/cache
  chmod -R 775 storage bootstrap/cache
  php artisan optimize:clear
  ```
- **Verifikasi:** Muat ulang halaman dan periksa apakah log baru tercatat atau halaman kembali normal.

---

### 2. HTTP 502 Bad Gateway
- **Gejala:** Browser menampilkan layar putih/error *502 Bad Gateway*.
- **Penyebab:** Service PHP-FPM 8.4 mati, kehabisan memori (*OOM*), atau socket fastcgi di Nginx salah alamat (`/tmp/php-cgi-84.sock`).
- **Pemeriksaan:**
  ```bash
  systemctl status php-fpm-84 # atau periksa status service di aaPanel
  ls -la /tmp/php-cgi-*.sock
  ```
- **Solusi:**
  1. Restart PHP-FPM 8.4 dari aaPanel Dashboard atau via CLI.
  2. Pastikan file konfigurasi Nginx mengarah ke `unix:/tmp/php-cgi-84.sock`.
- **Verifikasi:** Jalankan `curl -I http://127.0.0.1/health` untuk memastikan fastcgi merespons.

---

### 3. Blank Page (Layar Putih Kosong)
- **Gejala:** Request selesai dengan status 200 tetapi konten HTML kosong.
- **Penyebab:** `display_errors` mati di PHP-FPM dan terjadi fatal error saat bootstrap framework, atau file `public/index.php` tidak tereksekusi.
- **Pemeriksaan:**
  ```bash
  tail -n 50 /www/server/php/84/var/log/php-fpm.log
  ```
- **Solusi:**
  Pastikan ekstensi PHP lengkap dan bootstrap cache tidak korup:
  ```bash
  composer check-platform-reqs
  php artisan optimize:clear
  ```
- **Verifikasi:** Buka kembali halaman atau jalankan `php artisan about`.

---

### 4. Redis Connection Error
- **Gejala:** Error `Connection refused [tcp://127.0.0.1:6379]` atau `Class "Redis" not found`.
- **Penyebab:** Ekstensi `phpredis` belum dipasang pada PHP 8.4 atau service Redis belum dinyalakan.
- **Pemeriksaan:**
  ```bash
  redis-cli ping
  php -m | grep redis
  ```
- **Solusi:**
  1. Nyalakan service Redis di aaPanel App Store.
  2. Pasang ekstensi `redis` di PHP 8.4 via aaPanel.
- **Verifikasi:** Jalankan `php -r "new Redis(); echo 'OK';"` yang harus mencetak `OK`.

---

### 5. Database Connection Error
- **Gejala:** `SQLSTATE[HY000] [2002] Connection refused` atau `Access denied for user`.
- **Penyebab:** Kredensial MySQL di `.env` salah, user MySQL dibatasi hanya untuk localhost, atau service database mati.
- **Pemeriksaan:**
  ```bash
  systemctl status mysqld
  php artisan config:show database.connections.mysql
  ```
- **Solusi:**
  1. Periksa `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` di `.env`.
  2. Bersihkan cache konfigurasi: `php artisan config:clear`.
- **Verifikasi:** Jalankan `php artisan migrate:status`.

---

### 6. Permission Denied pada `storage/`
- **Gejala:** Error `The stream or file ".../storage/logs/laravel.log" could not be opened in append mode: failed to open stream: Permission denied`.
- **Penyebab:** File log atau session dibuat oleh user `root` (saat artisan dijalankan manual via CLI sebagai root) sehingga user web server `www` tidak dapat menulis.
- **Pemeriksaan:**
  ```bash
  ls -ld storage storage/logs storage/framework
  ```
- **Solusi:**
  ```bash
  chown -R www:www storage bootstrap/cache
  chmod -R 775 storage bootstrap/cache
  ```
- **Verifikasi:** Pastikan user `www` dapat menulis ke direktori log.

---

### 7. Vite Assets Not Found (404 pada CSS/JS)
- **Gejala:** Tampilan web polos tanpa styling, console browser menampilkan error 404 pada `/build/assets/app-*.css` atau `app-*.js`.
- **Penyebab:** Perintah build belum dijalankan atau manifest Vite belum terbit di `public/build/manifest.json`.
- **Pemeriksaan:**
  ```bash
  ls -la public/build/manifest.json
  ```
- **Solusi:**
  ```bash
  npm ci
  npm run build
  php artisan view:clear
  ```
- **Verifikasi:** Muat ulang halaman dengan `Ctrl + F5` (hard refresh).

---

### 8. Storage Link Error (Gambar Tidak Muncul)
- **Gejala:** Gambar panorama atau foto kegiatan menghasilkan respon 404 pada URL `/storage/...`.
- **Penyebab:** Symbolic link `public/storage` rusak atau belum dibuat.
- **Pemeriksaan:**
  ```bash
  ls -la public/storage
  ```
- **Solusi:**
  ```bash
  rm -f public/storage
  php artisan storage:link
  ```
- **Verifikasi:** Akses salah satu file foto langsung melalui browser.

---

### 9. Config Cache Stale (Perubahan `.env` Tidak Berdampak)
- **Gejala:** Nilai konfigurasi baru di `.env` diabaikan dan aplikasi tetap memakai nilai lama.
- **Penyebab:** Konfigurasi pernah di-cache dengan `config:cache` / `optimize`.
- **Pemeriksaan:**
  ```bash
  ls -la bootstrap/cache/config.php
  ```
- **Solusi:**
  ```bash
  php artisan optimize:clear
  php artisan optimize
  ```
- **Verifikasi:** Jalankan `php artisan config:show <nama_konfigurasi>`.

---

### 10. Queue Worker Not Updating
- **Gejala:** Worker terus mengeksekusi kode versi lama setelah file di-update.
- **Penyebab:** Queue worker adalah daemon yang memuat seluruh file kode ke memori RAM saat mulai berjalan.
- **Pemeriksaan:**
  ```bash
  ps aux | grep "artisan queue:work"
  ```
- **Solusi:**
  Kirim sinyal restart agar worker otomatis memuat ulang kode baru:
  ```bash
  php artisan queue:restart
  ```
- **Verifikasi:** Periksa timestamp proses worker baru di supervisor / systemd.

---

## 🛡️ I. Standar Keamanan (Security Guidelines)

1. **Kerahasiaan File `.env`:**
   - File `.env` **HARUS** selalu terdaftar di `.gitignore` dan tidak boleh pernah di-commit ke repositori Git.
   - Di production, pastikan `APP_DEBUG=false` untuk mencegah kebocoran stack trace dan secret ke publik saat terjadi unhandled error.
2. **Kredensial & Kunci Enkripsi:**
   - Jangan menyertakan password database, `APP_KEY`, Google OAuth Secret, atau API keys di dalam file kode sumber publik.
   - Buat `APP_KEY` unik untuk production menggunakan `php artisan key:generate`.
3. **Isolasi Nginx Document Root:**
   - Document root Nginx **WAJIB** berada pada `/public`. File root (seperti `artisan`, `composer.json`, `.env`) tidak boleh berada dalam scope web root publik.
4. **Proteksi File Tersembunyi:**
   - Konfigurasi Nginx wajib memblokir akses ke direktori `.git`, file `.env`, serta folder `storage/`, `vendor/`, dan `node_modules/`.
5. **Prinsip Hak Akses Terkecil (Least Privilege):**
   - Hindari penggunaan permission `777`. Gunakan hak akses `775` untuk direktori dan `664` untuk file dengan kepemilikan user `www:www`.
6. **Cadangan Sebelum Migrasi Database:**
   - Sebelum menyetujui migrasi baru di production, lakukan backup dump basis data MySQL terlebih dahulu.
7. **Larangan Perintah Artisan Destruktif:**
   - Dilarang keras menjalankan perintah seperti `php artisan migrate:fresh`, `migrate:refresh`, `migrate:reset`, `db:wipe`, atau `migrate:rollback` di server production.

---

## 🔐 J. Admin Login Security (Pertahanan Berlapis)

Eco Land mengimplementasikan arsitektur keamanan berlapis (*defense-in-depth*) untuk melindungi halaman login Administrator (`/login`):

```text
                 ECO LAND ADMIN SECURITY

                       HTTPS
                         │
                         ▼
                    Nginx
                         │
                         ▼
                 Laravel Middleware
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
          CSRF Check           Rate Limiting (5 attempts / 60s)
              │                     │
              └──────────┬──────────┘
                         ▼
                   reCAPTCHA v3
                         │
             (Server-side verification)
             (score >= 0.5, action=login)
                         │
                         ▼
              Authentication Credential
                         │
                         ▼
                  Redis Session
                         │
                         ▼
             30-Min Inactivity Timeout
                         │
                         ▼
                   Auto Logout
```

### 1. Komponen Keamanan
- **Google reCAPTCHA v3 (Invisible):** Mendeteksi dan memblokir bot serta automated credential stuffing tanpa checkbox yang mengganggu pengalaman pengguna. Token di-generate secara fresh saat form disubmit dan diverifikasi langsung oleh backend ke Google API (`https://www.google.com/recaptcha/api/siteverify`).
- **Server-Side Verification:** Server melakukan validasi ketat terhadap token mencakup: `success == true`, `action === 'login'`, `score >= threshold` (default `0.5`), kecocokan hostname, serta batas usia token (*freshness* < 120 detik). Jika salah satu gagal, login langsung ditolak dengan status *fail-closed*.
- **Login Rate Limiting:** Pembatasan frekuensi percobaan masuk (maksimal 5 kali percobaan per menit per kombinasi identitas akun dan alamat IP) berbasis `RateLimiter` Laravel & Redis. Mencegah serangan brute-force berulang secara otomatis.
- **CSRF Protection:** Perlindungan token CSRF Laravel aktif di setiap form submission web.
- **Redis Session Management:** Sesi terautentikasi disimpan di Redis berkinerja tinggi, terisolasi, dan aman.
- **Automatic Inactivity Logout (30 Menit):** Middleware `EnsureAdminSessionActive` otomatis mendiskualifikasi dan menghancurkan sesi admin yang tidak aktif selama 30 menit, dilengkapi modal peringatan interaktif 5 menit sebelum waktu habis.

### 2. Konfigurasi Environment (`.env`)
Tambahkan variabel konfigurasi berikut pada file `.env`:

```env
# Google reCAPTCHA v3 Configuration
RECAPTCHA_ENABLED=true
RECAPTCHA_SITE_KEY=your-recaptcha-v3-site-key
RECAPTCHA_SECRET_KEY=your-recaptcha-v3-secret-key
RECAPTCHA_SCORE_THRESHOLD=0.5
RECAPTCHA_LOGIN_ACTION=login
RECAPTCHA_ALLOWED_HOSTNAMES=ikhw.org,www.ikhw.org
```

> [!IMPORTANT]
> - `RECAPTCHA_SECRET_KEY` adalah kredensial **rahasia sisi server**. Jangan pernah memasukkan secret key ke dalam file Blade, JavaScript, Git, atau dokumentasi publik.
> - Pada lingkungan *local development*, Anda dapat mengatur `RECAPTCHA_ENABLED=false` agar dapat melakukan testing tanpa koneksi ke server Google.

### 3. Cara Mendapatkan Google reCAPTCHA v3 Keys
1. Buka konsol [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin).
2. Daftarkan situs baru (*Register a new site*):
   - **Label:** `Eco Land Production`
   - **reCAPTCHA type:** Pilih **reCAPTCHA v3** (*Verify requests with a score*).
   - **Domains:** Masukkan domain produksi Anda (contoh: `ikhw.org`).
3. Setujui ketentuan layanan dan klik **Submit**.
4. Salin **Site Key** ke `RECAPTCHA_SITE_KEY` dan **Secret Key** ke `RECAPTCHA_SECRET_KEY` di server production `.env`.
5. Jalankan `php artisan optimize:clear && php artisan optimize` untuk menyegarkan cache konfigurasi di server.

---

## 📄 Lisensi
Hak Cipta © 2026 Eco Land — IKHW Aceh. Seluruh hak cipta dilindungi undang-undang.

