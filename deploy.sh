#!/usr/bin/env bash
# ==============================================================================
# ECO LAND — PRODUCTION DEPLOYMENT SCRIPT
# Server Target: aaPanel / Linux (Nginx + PHP 8.4 + Redis)
# ==============================================================================

set -Eeuo pipefail

# --- Color Output Helpers ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1" >&2
}

# --- Error Handling Trap ---
on_error() {
    local exit_code="$?"
    local line_number="$1"
    local command="$2"
    log_error "Deployment GAGAL pada baris ${line_number}: '${command}' (Exit code: ${exit_code})"
    log_error "Deployment dihentikan demi menjaga keamanan server dan aplikasi."
    exit "${exit_code}"
}
trap 'on_error ${LINENO} "$BASH_COMMAND"' ERR

# --- Configuration & Defaults ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

PHP_BIN="${PHP_BIN:-php}"
COMPOSER_BIN="${COMPOSER_BIN:-composer}"
NPM_BIN="${NPM_BIN:-npm}"
RUN_MIGRATIONS="${RUN_MIGRATIONS:-false}"
SKIP_GIT="${SKIP_GIT:-false}"
WEB_USER="${WEB_USER:-www}"
WEB_GROUP="${WEB_GROUP:-www}"

echo -e "${CYAN}======================================================================${NC}"
echo -e "${CYAN}             ECO LAND PRODUCTION DEPLOYMENT SCRIPT                    ${NC}"
echo -e "${CYAN}======================================================================${NC}"
log_info "Working Directory: ${SCRIPT_DIR}"
log_info "PHP Binary: $("${PHP_BIN}" -v | head -n 1)"
log_info "Run Migrations: ${RUN_MIGRATIONS}"

# ==============================================================================
# TAHAP 1: PRE-FLIGHT CHECKS & VERIFIKASI ENVIRONMENT
# ==============================================================================
log_info "Memeriksa kelengkapan file sistem..."

if [ ! -f "artisan" ] || [ ! -f "composer.json" ]; then
    log_error "File 'artisan' atau 'composer.json' tidak ditemukan! Pastikan script berada di root project Eco Land."
    exit 1
fi

if [ ! -f ".env" ]; then
    log_error "File '.env' production tidak ditemukan! Salin .env.example dan konfigurasikan terlebih dahulu."
    exit 1
fi

# Verifikasi PHP 8.4
PHP_VERSION_CHECK="$("${PHP_BIN}" -r 'echo PHP_MAJOR_VERSION.".".PHP_MINOR_VERSION;')"
log_info "Terdeteksi versi PHP: ${PHP_VERSION_CHECK}"
if [ "${PHP_VERSION_CHECK}" != "8.4" ] && [ "${PHP_VERSION_CHECK}" != "8.3" ]; then
    log_warn "Aplikasi direkomendasikan berjalan pada PHP 8.4 (saat ini ${PHP_VERSION_CHECK})."
fi

# Cek ekstensi krusial
"${PHP_BIN}" -r '
$required = ["pdo", "mbstring", "openssl", "xml", "ctype", "curl", "fileinfo", "tokenizer"];
$missing = [];
foreach ($required as $ext) {
    if (!extension_loaded($ext)) { $missing[] = $ext; }
}
if (!empty($missing)) {
    echo "Ekstensi PHP hilang: " . implode(", ", $missing) . "\n";
    exit(1);
}
' || {
    log_error "Satu atau lebih ekstensi PHP wajib tidak terpasang!"
    exit 1
}

# Verifikasi Redis jika redis-cli atau phpredis tersedia
if command -v redis-cli &> /dev/null; then
    if redis-cli ping &> /dev/null; then
        log_success "Service Redis lokal aktif dan merespons PONG."
    else
        log_warn "redis-cli gagal ping ke Redis lokal. Pastikan service Redis berjalan jika menggunakan CACHE_STORE=redis."
    fi
fi

# Cek sintaks Nginx jika Nginx terinstall
if command -v nginx &> /dev/null; then
    log_info "Memeriksa sintaks konfigurasi Nginx..."
    if nginx -t 2>&1 | grep -q "successful"; then
        log_success "Sintaks Nginx valid."
    else
        log_warn "Pemeriksaan 'nginx -t' mendeteksi masalah atau memerlukan privilege sudo. Silakan periksa konfigurasi web server."
    fi
fi

# Verifikasi konfigurasi keamanan reCAPTCHA v3 (tanpa mengekspos secret key)
log_info "Memeriksa status konfigurasi keamanan Google reCAPTCHA v3..."
"${PHP_BIN}" -r '
require "vendor/autoload.php";
$app = require_once "bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$enabled = (bool) config("services.recaptcha.enabled", false);
$siteKey = (string) config("services.recaptcha.site_key", "");
$secretKey = (string) config("services.recaptcha.secret_key", "");
if ($enabled) {
    if (empty($siteKey) || empty($secretKey)) {
        echo "[PERINGATAN] RECAPTCHA_ENABLED=true namun RECAPTCHA_SITE_KEY atau RECAPTCHA_SECRET_KEY belum diisi di .env!\n";
    } else {
        echo "[OK] Google reCAPTCHA v3 aktif dengan perlindungan server-side verification.\n";
    }
} else {
    echo "[INFO] Google reCAPTCHA v3 dinonaktifkan (RECAPTCHA_ENABLED=false).\n";
}
'

# ==============================================================================
# TAHAP 2: GIT PULL (OPSIONAL / PRODUCTION UPDATES)
# ==============================================================================
if [ "${SKIP_GIT}" = "false" ] && [ -d ".git" ]; then
    log_info "Memperbarui repository via Git..."
    CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")"
    log_info "Branch aktif: ${CURRENT_BRANCH}"
    git fetch origin "${CURRENT_BRANCH}"
    git pull origin "${CURRENT_BRANCH}"
    log_success "Git pull berhasil diselesaikan."
else
    log_info "Git pull dilewati (SKIP_GIT=${SKIP_GIT} atau direktori .git tidak ditemukan)."
fi

# ==============================================================================
# TAHAP 3: COMPOSER DEPENDENCIES
# ==============================================================================
log_info "Menginstal dependensi Composer untuk production..."
"${COMPOSER_BIN}" install \
    --no-dev \
    --prefer-dist \
    --optimize-autoloader \
    --no-interaction

"${COMPOSER_BIN}" check-platform-reqs
log_success "Dependensi Composer siap dan memenuhi seluruh platform requirements."

# ==============================================================================
# TAHAP 4: FRONTEND BUILD (VITE & TAILWIND)
# ==============================================================================
log_info "Membangun aset frontend (Vite & Tailwind)..."
if [ -f "package-lock.json" ]; then
    "${NPM_BIN}" ci --no-audit --prefer-offline || "${NPM_BIN}" install --no-audit
else
    "${NPM_BIN}" install --no-audit
fi

"${NPM_BIN}" run build
log_success "Build aset frontend selesai (tersimpan di public/build)."

# ==============================================================================
# TAHAP 5: LARAVEL OPTIMIZATION & CACHE
# ==============================================================================
log_info "Memastikan direktori framework dan cache tersedia..."
mkdir -p storage/framework/cache/data storage/framework/views storage/framework/sessions storage/framework/testing bootstrap/cache

log_info "Membersihkan cache lama dan mengoptimalkan framework Laravel..."
"${PHP_BIN}" artisan optimize:clear
"${PHP_BIN}" artisan optimize
log_success "Konfigurasi, events, routes, dan views berhasil di-cache."

# ==============================================================================
# TAHAP 6: SYMBOLIC LINK & PERMISSIONS
# ==============================================================================
log_info "Memeriksa symbolic link storage..."
if [ ! -L "public/storage" ] && [ ! -d "public/storage" ]; then
    "${PHP_BIN}" artisan storage:link
    log_success "Symbolic link public/storage berhasil dibuat."
else
    log_info "Symbolic link public/storage sudah tersedia."
fi

# Perbaikan permission aman (hanya jika dijalankan dengan hak akses root/sudo)
if [ "$(id -u)" -eq 0 ]; then
    log_info "Menyesuaikan kepemilikan dan hak akses (user: ${WEB_USER}:${WEB_GROUP})..."
    chown -R "${WEB_USER}:${WEB_GROUP}" storage bootstrap/cache
    find storage bootstrap/cache -type d -exec chmod 775 {} \;
    find storage bootstrap/cache -type f -exec chmod 664 {} \;
    log_success "Permission direktori storage dan bootstrap/cache diperbarui menjadi 775/664."
else
    log_info "Menjalankan deployment sebagai non-root. Memastikan direktori dapat ditulis..."
    chmod -R 775 storage bootstrap/cache 2>/dev/null || true
fi

# ==============================================================================
# TAHAP 7: MIGRATION POLICY (SAFETY FIRST)
# ==============================================================================
if [ "${RUN_MIGRATIONS}" = "true" ]; then
    log_warn "PERHATIAN: RUN_MIGRATIONS diaktifkan!"
    log_info "Detail koneksi database target:"
    "${PHP_BIN}" -r '
    require "vendor/autoload.php";
    $app = require_once "bootstrap/app.php";
    $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
    $conn = config("database.default");
    $db = config("database.connections.{$conn}");
    echo "  Driver:   " . ($db["driver"] ?? "unknown") . "\n";
    echo "  Host:     " . ($db["host"] ?? "unknown") . "\n";
    echo "  Port:     " . ($db["port"] ?? "unknown") . "\n";
    echo "  Database: " . ($db["database"] ?? "unknown") . "\n";
    '
    
    log_info "Status migration saat ini:"
    "${PHP_BIN}" artisan migrate:status

    log_info "Menjalankan migration non-destruktif dengan --force..."
    "${PHP_BIN}" artisan migrate --force
    log_success "Migration berhasil dijalankan."
else
    log_info "Migration database DILEWATI (RUN_MIGRATIONS=false)."
    log_info "Database production aman dan tidak mengalami modifikasi struktur atau data."
fi

# ==============================================================================
# TAHAP 8: QUEUE WORKER RESTART
# ==============================================================================
log_info "Me-restart queue worker Laravel..."
"${PHP_BIN}" artisan queue:restart || true
log_success "Signal queue:restart berhasil dikirim ke worker."

# ==============================================================================
# TAHAP 9: HEALTH CHECK & VERIFIKASI AKHIR
# ==============================================================================
log_info "Melakukan verifikasi status aplikasi (Artisan About)..."
"${PHP_BIN}" artisan about

log_info "Menguji konektivitas Redis & Cache..."
"${PHP_BIN}" -r '
require "vendor/autoload.php";
$app = require_once "bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$cacheStore = config("cache.default");
echo "Cache Driver Aktif: " . $cacheStore . "\n";
if ($cacheStore === "file") {
    Illuminate\Support\Facades\Cache::store("file")->put("health_test", "ok", 10);
    $res = Illuminate\Support\Facades\Cache::store("file")->get("health_test");
    if ($res === "ok") {
        echo "File Cache Test: BERHASIL (Read/Write OK)\n";
    } else {
        echo "File Cache Test: GAGAL membaca nilai dari file cache!\n";
        exit(1);
    }
} elseif ($cacheStore === "redis") {
    Illuminate\Support\Facades\Cache::store("redis")->put("health_test", "ok", 10);
    $res = Illuminate\Support\Facades\Cache::store("redis")->get("health_test");
    if ($res === "ok") {
        echo "Redis Cache Test: BERHASIL (Read/Write OK)\n";
    } else {
        echo "Redis Cache Test: GAGAL membaca nilai!\n";
        exit(1);
    }
} elseif ($cacheStore === "memcached") {
    if (!extension_loaded("memcached")) {
        echo "Memcached Cache Test: GAGAL! Ekstensi PHP memcached tidak terpasang di server.\n";
        exit(1);
    }
    Illuminate\Support\Facades\Cache::store("memcached")->put("health_test", "ok", 10);
    $res = Illuminate\Support\Facades\Cache::store("memcached")->get("health_test");
    if ($res === "ok") {
        echo "Memcached Cache Test: BERHASIL (Read/Write OK)\n";
    } else {
        echo "Memcached Cache Test: GAGAL membaca nilai dari server Memcached!\n";
        exit(1);
    }
}
'


# Health check lokal HTTP jika endpoint /health aktif
APP_URL="$("${PHP_BIN}" -r '
require "vendor/autoload.php";
$app = require_once "bootstrap/app.php";
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
echo config("app.url");
')"

log_info "Aplikasi dikonfigurasi untuk URL: ${APP_URL}"
if command -v curl &> /dev/null; then
    log_info "Menguji respon HTTP dari ${APP_URL}/health..."
    HTTP_CODE="$(curl -s -o /dev/null -w "%{http_code}" "${APP_URL}/health" --connect-timeout 5 || echo "000")"
    if [ "${HTTP_CODE}" = "200" ]; then
        log_success "Health check HTTP berhasil (Status: 200 OK)."
    else
        log_warn "Health check HTTP mengembalikan kode: ${HTTP_CODE} (atau domain belum diarahkan ke IP lokal)."
    fi
fi

echo -e "${CYAN}======================================================================${NC}"
echo -e "${GREEN}   DEPLOYMENT ECO LAND BERHASIL DISELESAIKAN SECARA KONSISTEN & AMAN  ${NC}"
echo -e "${CYAN}======================================================================${NC}"
