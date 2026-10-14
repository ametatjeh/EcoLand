/**
 * Admin Authentication Controller
 */
import { ApiService } from '../services/api.js';
import { EcoToast } from '../utils/toast.js';

const authChangeListeners = [];

export function onAuthChange(fn) {
  if (typeof fn === 'function') {
    authChangeListeners.push(fn);
  }
}

function notifyAuthChange(isLoggedIn) {
  authChangeListeners.forEach((fn) => {
    try {
      fn(isLoggedIn);
    } catch (err) {
      console.warn('Error in auth change listener:', err);
    }
  });
}

export function initAuth() {
  const modal = document.getElementById('admin-login-modal');
  const form = document.getElementById('admin-login-form');
  const errorEl = document.getElementById('admin-login-error');
  const btnClose = document.getElementById('btn-close-login-modal');
  const btnLogout = document.getElementById('btn-admin-logout');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('admin-username');
      const passwordInput = document.getElementById('admin-password');
      const submitBtn = form.querySelector('button[type="submit"]');

      if (!usernameInput || !passwordInput) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Memverifikasi...';
      if (errorEl) errorEl.classList.add('hidden');

      const result = await ApiService.login(usernameInput.value.trim(), passwordInput.value);

      submitBtn.disabled = false;
      submitBtn.textContent = 'Masuk Administrator';

      if (result.success) {
        closeLoginModal();
        usernameInput.value = '';
        passwordInput.value = '';
        EcoToast.success('✓ Berhasil Masuk', `Selamat datang kembali, ${result.user?.name || result.user?.username || 'Administrator'}!`);
        notifyAuthChange(true);
      } else {
        if (errorEl) {
          errorEl.textContent = result.message || 'Kredensial tidak valid';
          errorEl.classList.remove('hidden');
        }
        EcoToast.error('✕ Gagal Masuk', result.message || 'Username atau kata sandi admin salah.');
      }
    });
  }

  if (btnClose) {
    btnClose.addEventListener('click', closeLoginModal);
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      performLogout();
    });
  }

  document.querySelectorAll('.btn-sidebar-quick-logout').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      performLogout();
    });
  });
}

export async function performLogout() {
  if (confirm('Apakah Anda yakin ingin keluar dari sesi administrator?')) {
    try {
      await ApiService.logout();
    } catch (e) {
      console.warn('API logout error:', e);
    }
    ApiService.clearSession();
    sessionStorage.removeItem('admin_redirect_hash');
    notifyAuthChange(false);
    window.location.href = '/logout';
  }
}

export function showLoginModal() {
  const modal = document.getElementById('admin-login-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const usernameInput = document.getElementById('admin-username');
    const passwordInput = document.getElementById('admin-password');
    if (usernameInput && !usernameInput.value) usernameInput.value = 'admin';
    if (passwordInput && !passwordInput.value) passwordInput.value = 'admin123';
    if (passwordInput) passwordInput.focus();
  }
}

export function closeLoginModal() {
  const modal = document.getElementById('admin-login-modal');
  if (modal) modal.classList.add('hidden');
}

export function checkAdminAuth() {
  return ApiService.isAuthenticated();
}
