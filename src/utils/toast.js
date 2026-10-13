/**
 * EcoToast - Global Toast Notification System for EcoZone 360
 * Modern, accessible, responsive toast notification system.
 */

class ToastManager {
  constructor() {
    this.container = null;
    this.initContainer();
    this.initFlashListener();
  }

  initContainer() {
    if (typeof document === 'undefined') return;
    let el = document.getElementById('ecozone-toast-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ecozone-toast-container';
      el.className = 'ecozone-toast-container';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    this.container = el;
  }

  initFlashListener() {
    if (typeof document === 'undefined') return;
    const checkFlash = () => {
      const flashSuccess = document.getElementById('laravel-flash-success');
      if (flashSuccess && flashSuccess.dataset.message) {
        this.saved(flashSuccess.dataset.message);
        flashSuccess.remove();
      }
      const flashError = document.getElementById('laravel-flash-error');
      if (flashError && flashError.dataset.message) {
        this.error('✕ Gagal menyimpan', flashError.dataset.message);
        flashError.remove();
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkFlash);
    } else {
      checkFlash();
    }
  }

  show({ type = 'success', title = '', message = '', duration = 3500, icon = null }) {
    if (!this.container || !document.body.contains(this.container)) {
      this.initContainer();
    }

    // Prevent immediate duplicate of exact same toast within 600ms
    const key = `${type}:${title}:${message}`;
    if (this._lastKey === key && Date.now() - (this._lastTime || 0) < 600) {
      return { dismiss: () => {} };
    }
    this._lastKey = key;
    this._lastTime = Date.now();

    const toast = document.createElement('div');
    toast.className = `ecotoast-item ecotoast-${type}`;
    toast.setAttribute('role', 'alert');

    // Default SVG icons
    let iconSvg = '';
    if (icon) {
      iconSvg = icon;
    } else if (type === 'success') {
      iconSvg = `<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
      </svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>`;
    } else {
      iconSvg = `<svg class="ecotoast-icon-svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
      </svg>`;
    }

    toast.innerHTML = `
      <div class="ecotoast-icon-box">${iconSvg}</div>
      <div class="ecotoast-body">
        <div class="ecotoast-title">${escapeHtml(title)}</div>
        ${message ? `<div class="ecotoast-desc">${escapeHtml(message)}</div>` : ''}
      </div>
      <button type="button" class="ecotoast-close" title="Tutup notifikasi" aria-label="Tutup">✕</button>
      <div class="ecotoast-bar" style="animation-duration: ${duration}ms;"></div>
    `;

    const closeBtn = toast.querySelector('.ecotoast-close');
    let timer = null;

    const dismiss = () => {
      if (timer) clearTimeout(timer);
      toast.classList.add('ecotoast-leave');
      setTimeout(() => {
        toast.remove();
      }, 250);
    };

    closeBtn.addEventListener('click', dismiss);

    this.container.appendChild(toast);

    if (duration > 0) {
      timer = setTimeout(dismiss, duration);
    }

    return { dismiss };
  }

  // Presets matching the specification
  saved(message = 'Perubahan data telah tersimpan.') {
    return this.show({
      type: 'success',
      title: '✓ Berhasil disimpan',
      message,
    });
  }

  created(message = 'Data baru berhasil disimpan.') {
    return this.show({
      type: 'success',
      title: '✓ Berhasil ditambahkan',
      message,
    });
  }

  updated(message = 'Perubahan data berhasil disimpan.') {
    return this.show({
      type: 'success',
      title: '✓ Berhasil diperbarui',
      message,
    });
  }

  deleted(message = 'Data berhasil dihapus.') {
    return this.show({
      type: 'success',
      title: '✓ Berhasil dihapus',
      message,
    });
  }

  published(message = 'Perubahan berhasil dipublikasikan.') {
    return this.show({
      type: 'success',
      title: '✓ Berhasil dipublikasikan',
      message,
    });
  }

  imported(message = 'Data telah berhasil diimpor.') {
    return this.show({
      type: 'success',
      title: '✓ Data berhasil diimpor',
      message,
    });
  }

  uploaded(message = 'File dan metadata berhasil disimpan.') {
    return this.show({
      type: 'success',
      title: '✓ File berhasil diunggah',
      message,
    });
  }

  success(title = '✓ Berhasil disimpan', message = '') {
    return this.show({
      type: 'success',
      title: title.startsWith('✓') ? title : `✓ ${title}`,
      message,
    });
  }

  error(title = '✕ Gagal menyimpan', message = 'Data belum berhasil disimpan. Periksa kembali isian dan coba lagi.') {
    return this.show({
      type: 'error',
      title: title.startsWith('✕') ? title : `✕ ${title}`,
      message,
      duration: 4500,
    });
  }

  warning(title = 'Peringatan', message = '') {
    return this.show({
      type: 'warning',
      title,
      message,
      duration: 4000,
    });
  }

  info(title = 'Informasi', message = '') {
    return this.show({
      type: 'info',
      title,
      message,
    });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const EcoToast = new ToastManager();
export const showToast = (opts) => {
  if (typeof opts === 'string') {
    return EcoToast.success(opts);
  }
  return EcoToast.show(opts);
};

if (typeof window !== 'undefined') {
  window.EcoToast = EcoToast;
  window.showToast = showToast;
}
