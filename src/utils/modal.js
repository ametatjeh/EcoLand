/**
 * EcoModal - Modern Accessible Confirmation Dialog System
 * Replaces native alert() and confirm() with styled, accessible modal dialogs.
 */

class EcoModalManager {
  constructor() {
    this.overlay = null;
    this.box = null;
    this.activeResolve = null;
    this.keyHandler = null;
  }

  ensureElements() {
    if (this.overlay && document.body.contains(this.overlay)) return;

    const overlay = document.createElement('div');
    overlay.id = 'ecomodal-confirm-overlay';
    overlay.className = 'ecomodal-overlay hidden';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    overlay.innerHTML = `
      <div class="ecomodal-card" id="ecomodal-confirm-card">
        <div class="ecomodal-header">
          <div class="ecomodal-icon-wrap" id="ecomodal-icon-wrap">
            <span id="ecomodal-icon">🗑️</span>
          </div>
          <div class="ecomodal-title-wrap">
            <h3 id="ecomodal-title" class="ecomodal-title">Konfirmasi Tindakan</h3>
            <span id="ecomodal-subtitle" class="ecomodal-subtitle">Tindakan ini memerlukan konfirmasi</span>
          </div>
          <button type="button" class="ecomodal-close-btn" id="ecomodal-btn-close" aria-label="Tutup">✕</button>
        </div>
        <div class="ecomodal-body">
          <div id="ecomodal-message" class="ecomodal-message"></div>
        </div>
        <div class="ecomodal-footer">
          <button type="button" class="ecomodal-btn ecomodal-btn-cancel" id="ecomodal-btn-cancel">Batal</button>
          <button type="button" class="ecomodal-btn ecomodal-btn-confirm" id="ecomodal-btn-confirm">Ya, Lanjutkan</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.box = overlay.querySelector('#ecomodal-confirm-card');

    const btnCancel = overlay.querySelector('#ecomodal-btn-cancel');
    const btnConfirm = overlay.querySelector('#ecomodal-btn-confirm');
    const btnClose = overlay.querySelector('#ecomodal-btn-close');

    btnCancel.addEventListener('click', () => this.resolve(false));
    btnClose.addEventListener('click', () => this.resolve(false));
    btnConfirm.addEventListener('click', () => this.resolve(true));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.resolve(false);
    });
  }

  resolve(value) {
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
    if (this.overlay) {
      this.overlay.classList.add('hidden');
    }
    if (this.activeResolve) {
      const res = this.activeResolve;
      this.activeResolve = null;
      res(value);
    }
  }

  /**
   * Show a styled confirmation modal dialog
   * @param {Object} options
   * @param {string} options.title - Header title
   * @param {string} options.subtitle - Small subtitle
   * @param {string} options.message - Body text / formatted HTML
   * @param {string} [options.type='danger'] - 'danger' | 'warning' | 'info' | 'success'
   * @param {string} [options.confirmText='Ya, Hapus'] - Label for confirm button
   * @param {string} [options.cancelText='Batal'] - Label for cancel button
   * @param {string} [options.icon='🗑️'] - Emoji or icon
   * @returns {Promise<boolean>}
   */
  confirm({
    title = 'Konfirmasi Hapus',
    subtitle = 'Tindakan ini tidak dapat dibatalkan',
    message = 'Apakah Anda yakin ingin menghapus data ini?',
    type = 'danger',
    confirmText = 'Ya, Hapus',
    cancelText = 'Batal',
    icon = '🗑️'
  } = {}) {
    this.ensureElements();

    const titleEl = this.overlay.querySelector('#ecomodal-title');
    const subtitleEl = this.overlay.querySelector('#ecomodal-subtitle');
    const messageEl = this.overlay.querySelector('#ecomodal-message');
    const iconWrap = this.overlay.querySelector('#ecomodal-icon-wrap');
    const iconEl = this.overlay.querySelector('#ecomodal-icon');
    const btnConfirm = this.overlay.querySelector('#ecomodal-btn-confirm');
    const btnCancel = this.overlay.querySelector('#ecomodal-btn-cancel');

    titleEl.textContent = title;
    subtitleEl.textContent = subtitle;

    // Format message with line breaks or paragraphs
    if (typeof message === 'string') {
      const formatted = message
        .split('\n\n')
        .map(paragraph => `<p style="margin: 0 0 10px 0; line-height: 1.55;">${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
      messageEl.innerHTML = formatted;
    } else {
      messageEl.innerHTML = message;
    }

    iconEl.textContent = icon;
    iconWrap.className = `ecomodal-icon-wrap ecomodal-type-${type}`;

    btnConfirm.textContent = confirmText;
    btnConfirm.className = `ecomodal-btn ecomodal-btn-${type}`;
    btnCancel.textContent = cancelText;

    this.overlay.classList.remove('hidden');
    btnConfirm.focus();

    return new Promise((resolve) => {
      this.activeResolve = resolve;

      this.keyHandler = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          this.resolve(false);
        }
      };
      document.addEventListener('keydown', this.keyHandler);
    });
  }

  /**
   * Show a styled alert/notice modal
   */
  alert({
    title = 'Pemberitahuan',
    subtitle = 'Informasi Sistem',
    message = '',
    type = 'warning',
    confirmText = 'Mengerti',
    icon = '⚠️'
  } = {}) {
    this.ensureElements();

    const btnCancel = this.overlay.querySelector('#ecomodal-btn-cancel');
    btnCancel.style.display = 'none';

    return this.confirm({
      title,
      subtitle,
      message,
      type,
      confirmText,
      icon
    }).finally(() => {
      btnCancel.style.display = '';
    });
  }
}

export const EcoModal = new EcoModalManager();
if (typeof window !== 'undefined') {
  window.EcoModal = EcoModal;
}
