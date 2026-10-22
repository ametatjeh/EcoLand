/**
 * Eco Land Admin Session Inactivity & Auto-Logout Controller
 * 
 * Fitur:
 * - Idle Timeout: 30 menit (1800 detik)
 * - Peringatan (Warning): 5 menit sebelum sesi berakhir (pada menit ke-25)
 * - Durasi Countdown: 05:00 s/d 00:00
 * - Multi-Tab Synchronization: BroadcastChannel & localStorage storage event
 * - Throttled Activity Tracking: mouse, keyboard, touch, click, scroll
 * - Server Keep-Alive: Menghubungi /api/auth/session-ping & /admin/session/keep-alive
 * - Clean Server Logout: Menghapus session server, invalidate token, & redirect ke /login
 */
import { ApiService } from '../services/api.js';
import { performLogout, checkAdminAuth } from './auth.js';
import { EcoToast } from '../utils/toast.js';

// Konfigurasi Default (Detik)
const DEFAULT_IDLE_TIMEOUT = 30 * 60; // 30 Menit (1800s)
const DEFAULT_WARNING_BEFORE = 5 * 60; // 5 Menit (300s)

let idleTimeoutSec = DEFAULT_IDLE_TIMEOUT;
let warningBeforeSec = DEFAULT_WARNING_BEFORE;
let warningThresholdSec = idleTimeoutSec - warningBeforeSec; // 1500s (25 Menit)

let lastActivityTime = Date.now();
let timerInterval = null;
let isWarningOpen = false;
let throttleLastEvent = 0;
let broadcastChannel = null;

const STORAGE_KEY_ACTIVITY = 'ecoland_admin_last_activity';

/**
 * Inisialisasi BroadcastChannel untuk sinkronisasi antar browser tab.
 */
function initMultiTabSync() {
  if (typeof window === 'undefined') return;

  try {
    if ('BroadcastChannel' in window) {
      broadcastChannel = new BroadcastChannel('ecoland_admin_session_channel');
      broadcastChannel.onmessage = (event) => {
        handleRemoteMessage(event.data);
      };
    }
  } catch (err) {
    console.warn('BroadcastChannel tidak didukung, menggunakan fallback storage event:', err);
  }

  // Fallback sinkronisasi via window storage event (lintas-tab)
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY_ACTIVITY && e.newValue) {
      const remoteTime = parseInt(e.newValue, 10);
      if (!isNaN(remoteTime) && remoteTime > lastActivityTime) {
        lastActivityTime = remoteTime;
        if (isWarningOpen) {
          hideWarningModal();
        }
      }
    }
  });
}

/**
 * Tangani pesan dari tab browser lain.
 */
function handleRemoteMessage(data) {
  if (!data || !data.type) return;

  switch (data.type) {
    case 'ACTIVITY':
    case 'KEEP_ALIVE':
      if (data.timestamp && data.timestamp > lastActivityTime) {
        lastActivityTime = data.timestamp;
        if (isWarningOpen) {
          hideWarningModal();
        }
      }
      break;

    case 'LOGOUT':
      // Tab lain telah melakukan logout, lakukan pembersihan dan redirect
      stopSessionTimer();
      performLogout();
      break;
  }
}

/**
 * Siarkan pesan ke tab lain.
 */
function broadcastMessage(payload) {
  try {
    if (broadcastChannel) {
      broadcastChannel.postMessage(payload);
    }
  } catch (e) {}

  try {
    if (payload.type === 'ACTIVITY' || payload.type === 'KEEP_ALIVE') {
      localStorage.setItem(STORAGE_KEY_ACTIVITY, String(payload.timestamp || Date.now()));
    }
  } catch (e) {}
}

/**
 * Catat aktivitas pengguna dengan mekanisme throttling (maksimal sekali setiap 10 detik)
 * agar tidak menimbulkan beban performa browser.
 */
function recordUserActivity() {
  if (isWarningOpen) {
    // Ketika modal peringatan sedang aktif, gerakan mouse tidak langsung membatalkan modal
    // Pengguna harus secara sadar mengklik tombol "Tetap Login"
    return;
  }

  const now = Date.now();
  if (now - throttleLastEvent < 10000) {
    // Abaikan jika belum melewati threshold 10 detik
    return;
  }

  throttleLastEvent = now;
  lastActivityTime = now;

  broadcastMessage({
    type: 'ACTIVITY',
    timestamp: now,
  });
}

/**
 * Format detik menjadi tampilan MM:SS (contoh: 04:59)
 */
function formatTime(totalSeconds) {
  const safeSec = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(safeSec / 60);
  const s = safeSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Tampilkan modal peringatan sesi akan berakhir dengan countdown.
 */
function showWarningModal(remainingSeconds) {
  const modal = document.getElementById('admin-session-warning-modal');
  const timerEl = document.getElementById('session-warning-timer');
  const indicator = document.getElementById('admin-session-indicator');
  const sessionText = document.getElementById('admin-session-text');
  const sessionDot = document.getElementById('admin-session-dot');

  if (modal) {
    modal.classList.remove('hidden');
    isWarningOpen = true;
  }

  if (timerEl) {
    timerEl.textContent = formatTime(remainingSeconds);
  }

  // Ubah status topbar indicator menjadi mode peringatan
  if (indicator && sessionText) {
    indicator.classList.remove('bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20');
    indicator.classList.add('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40', 'animate-pulse');
    sessionText.textContent = `Sesi Berakhir: ${formatTime(remainingSeconds)}`;
  }
  if (sessionDot) {
    sessionDot.classList.remove('bg-emerald-400');
    sessionDot.classList.add('bg-amber-400');
  }
}

/**
 * Sembunyikan modal peringatan dan kembalikan topbar indicator ke normal.
 */
function hideWarningModal() {
  const modal = document.getElementById('admin-session-warning-modal');
  const indicator = document.getElementById('admin-session-indicator');
  const sessionText = document.getElementById('admin-session-text');
  const sessionDot = document.getElementById('admin-session-dot');

  if (modal) {
    modal.classList.add('hidden');
    isWarningOpen = false;
  }

  // Kembalikan status topbar indicator ke normal
  if (indicator && sessionText) {
    indicator.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20');
    indicator.classList.remove('bg-amber-500/20', 'text-amber-300', 'border-amber-500/40', 'animate-pulse');
    sessionText.textContent = 'Sesi Aktif';
  }
  if (sessionDot) {
    sessionDot.classList.add('bg-emerald-400');
    sessionDot.classList.remove('bg-amber-400');
  }
}

/**
 * Kirim permintaan Keep-Alive ke server untuk memperpanjang sesi.
 */
export async function keepSessionAlive() {
  const btnKeepAlive = document.getElementById('btn-session-keep-alive');
  if (btnKeepAlive) {
    btnKeepAlive.disabled = true;
    btnKeepAlive.textContent = 'Memperpanjang...';
  }

  const token = ApiService.getToken();
  const csrfMeta = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfMeta ? csrfMeta.getAttribute('content') : '';

  let success = false;

  // 1. Coba endpoint API Keep-Alive
  try {
    const res = await fetch('/api/auth/session-ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
      },
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.idle_timeout_minutes) {
        idleTimeoutSec = data.idle_timeout_minutes * 60;
      }
      if (data.idle_warning_minutes) {
        warningBeforeSec = data.idle_warning_minutes * 60;
        warningThresholdSec = idleTimeoutSec - warningBeforeSec;
      }
      success = true;
    }
  } catch (e) {
    // Fallback ke endpoint web keep-alive
  }

  // 2. Fallback endpoint Web Keep-Alive
  if (!success) {
    try {
      const webRes = await fetch('/admin/session/keep-alive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
        },
      });
      if (webRes.ok) success = true;
    } catch (e) {}
  }

  if (btnKeepAlive) {
    btnKeepAlive.disabled = false;
    btnKeepAlive.textContent = 'Tetap Login';
  }

  // Reset timer lokal
  const now = Date.now();
  lastActivityTime = now;
  hideWarningModal();

  // Siarkan ke tab browser lainnya
  broadcastMessage({
    type: 'KEEP_ALIVE',
    timestamp: now,
  });

  EcoToast.success('✓ Sesi Diperpanjang', 'Sesi login administrator Anda tetap aktif dan berhasil diperpanjang.');
}

/**
 * Loop evaluasi inaktivitas (berjalan setiap 1 detik)
 */
function tick() {
  // Hanya berjalan jika admin sedang terautentikasi dan berada pada area admin
  if (!checkAdminAuth()) {
    hideWarningModal();
    return;
  }

  // Jika halaman publik sedang dibuka (bukan #admin), jangan tampilkan warning
  const isHashAdmin = window.location.hash.startsWith('#admin');
  if (!isHashAdmin) {
    hideWarningModal();
    return;
  }

  const now = Date.now();
  const elapsedSec = Math.floor((now - lastActivityTime) / 1000);

  // Skenario A: Waktu inaktivitas mencapai atau melebihi 30 menit -> Auto Logout
  if (elapsedSec >= idleTimeoutSec) {
    stopSessionTimer();
    hideWarningModal();

    broadcastMessage({ type: 'LOGOUT' });

    EcoToast.warning('Sesi Berakhir', 'Sesi Anda telah berakhir karena tidak ada aktivitas selama 30 menit. Mengalihkan ke halaman login...');

    setTimeout(() => {
      performLogout();
    }, 1200);
    return;
  }

  // Skenario B: Waktu inaktivitas mencapai 25 menit -> Tampilkan Peringatan
  if (elapsedSec >= warningThresholdSec) {
    const remainingSec = idleTimeoutSec - elapsedSec;
    showWarningModal(remainingSec);
    return;
  }

  // Skenario C: Normal aktif (< 25 menit)
  if (isWarningOpen) {
    hideWarningModal();
  }
}

/**
 * Daftarkan event listener aktivitas pengguna (mousedown, mousemove, keydown, scroll, touchstart, click)
 */
function attachUserActivityListeners() {
  const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
  events.forEach((evt) => {
    window.addEventListener(evt, recordUserActivity, { passive: true });
  });
}

/**
 * Inisialisasi timer inaktivitas sesi administrator.
 */
export function initSessionTimer() {
  if (typeof window === 'undefined') return;

  // Baca konfigurasi dari elemen meta jika disematkan oleh Blade
  const metaTimeout = document.querySelector('meta[name="admin-idle-timeout"]');
  if (metaTimeout && metaTimeout.content) {
    const parsed = parseInt(metaTimeout.content, 10);
    if (!isNaN(parsed) && parsed > 0) {
      idleTimeoutSec = parsed * 60;
    }
  }

  const metaWarning = document.querySelector('meta[name="admin-idle-warning"]');
  if (metaWarning && metaWarning.content) {
    const parsed = parseInt(metaWarning.content, 10);
    if (!isNaN(parsed) && parsed > 0) {
      warningBeforeSec = parsed * 60;
    }
  }

  warningThresholdSec = Math.max(60, idleTimeoutSec - warningBeforeSec);

  // Inisialisasi timestamp awal
  const savedActivity = localStorage.getItem(STORAGE_KEY_ACTIVITY);
  const now = Date.now();
  if (savedActivity) {
    const parsedTime = parseInt(savedActivity, 10);
    if (!isNaN(parsedTime) && parsedTime <= now && now - parsedTime < idleTimeoutSec * 1000) {
      lastActivityTime = parsedTime;
    } else {
      lastActivityTime = now;
      localStorage.setItem(STORAGE_KEY_ACTIVITY, String(now));
    }
  } else {
    lastActivityTime = now;
    localStorage.setItem(STORAGE_KEY_ACTIVITY, String(now));
  }

  // Daftarkan listener multi-tab & aktivitas
  initMultiTabSync();
  attachUserActivityListeners();

  // Daftarkan tombol modal warning
  const btnKeepAlive = document.getElementById('btn-session-keep-alive');
  if (btnKeepAlive) {
    btnKeepAlive.addEventListener('click', (e) => {
      e.preventDefault();
      keepSessionAlive();
    });
  }

  const btnLogoutNow = document.getElementById('btn-session-logout-now');
  if (btnLogoutNow) {
    btnLogoutNow.addEventListener('click', (e) => {
      e.preventDefault();
      broadcastMessage({ type: 'LOGOUT' });
      performLogout();
    });
  }

  // Mulai interval pemeriksaan per detik
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(tick, 1000);
}

/**
 * Hentikan timer inaktivitas.
 */
export function stopSessionTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  hideWarningModal();
}

/**
 * Reset timer inaktivitas secara manual.
 */
export function resetSessionTimer() {
  lastActivityTime = Date.now();
  hideWarningModal();
  broadcastMessage({
    type: 'ACTIVITY',
    timestamp: lastActivityTime,
  });
}
