/**
 * Eco Land Admin Theme Manager (Dual Theme: Dark Mode & Light Mode)
 * Default: Dark Mode (#0B1712, #0D1F17, #10251B, #142B20, #4ADE80)
 * Light Mode: Conservation Natural Light Theme (#F5F8F5, #FFFFFF, #DCE6DD, #059669)
 */

const THEME_STORAGE_KEY = 'ecoland_admin_theme';

/**
 * Mendapatkan tema saat ini dari localStorage secara aman.
 * Default mengembalikan 'dark' jika belum ada preferensi tersimpan.
 */
export function getAdminTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark';
  } catch (err) {
    console.warn('localStorage is not available for reading theme:', err);
    return 'dark';
  }
}

/**
 * Menyimpan dan menerapkan tema yang dipilih.
 * @param {'dark'|'light'} theme
 */
export function setAdminTheme(theme) {
  const finalTheme = theme === 'light' ? 'light' : 'dark';

  try {
    localStorage.setItem(THEME_STORAGE_KEY, finalTheme);
  } catch (err) {
    console.warn('localStorage is not available for writing theme:', err);
  }

  applyThemeToDom(finalTheme);
  return finalTheme;
}

/**
 * Beralih antara Dark Mode dan Light Mode.
 */
export function toggleAdminTheme() {
  const current = getAdminTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  return setAdminTheme(next);
}

/**
 * Terapkan atribut dan kelas tema ke DOM secara instan tanpa reload.
 * @param {'dark'|'light'} theme
 */
export function applyThemeToDom(theme) {
  const isDark = theme === 'dark';

  // 1. Root HTML Element
  document.documentElement.setAttribute('data-admin-theme', theme);
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }

  // 2. View Admin Container Element
  const viewAdmin = document.getElementById('view-admin');
  if (viewAdmin) {
    viewAdmin.classList.toggle('theme-dark', isDark);
    viewAdmin.classList.toggle('theme-light', !isDark);
  }

  // 3. Sinkronkan Tombol Toggle di Topbar
  updateThemeToggleButton(theme);

  // 4. Dispatch custom event jika ada komponen independen yang perlu merespon
  window.dispatchEvent(new CustomEvent('ecoland-theme-changed', { detail: { theme } }));
}

/**
 * Perbarui ikon, tooltip, dan atribut aksesibilitas tombol toggle.
 * @param {'dark'|'light'} theme
 */
function updateThemeToggleButton(theme) {
  const btn = document.getElementById('btn-admin-theme-toggle');
  if (!btn) return;

  const isDark = theme === 'dark';

  // Ikon bulan untuk Dark Mode, ikon matahari untuk Light Mode
  const moonIcon = document.getElementById('theme-toggle-moon-icon');
  const sunIcon = document.getElementById('theme-toggle-sun-icon');

  if (moonIcon && sunIcon) {
    if (isDark) {
      moonIcon.classList.remove('hidden');
      sunIcon.classList.add('hidden');
    } else {
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
    }
  }

  const label = isDark
    ? 'Mode Gelap aktif. Klik untuk beralih ke Mode Terang'
    : 'Mode Terang aktif. Klik untuk beralih ke Mode Gelap';

  btn.setAttribute('aria-label', label);
  btn.setAttribute('title', isDark ? 'Mode Gelap (Klik untuk beralih ke Mode Terang)' : 'Mode Terang (Klik untuk beralih ke Mode Gelap)');
}

/**
 * Inisialisasi tema saat startup & bind event listener tombol toggle.
 */
export function initTheme() {
  const theme = getAdminTheme();
  applyThemeToDom(theme);

  const btn = document.getElementById('btn-admin-theme-toggle');
  if (btn && !btn.hasAttribute('data-theme-bound')) {
    btn.setAttribute('data-theme-bound', 'true');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAdminTheme();
    });
  }

  // Sinkronisasi lintas-tab jika pengguna mengganti tema di tab lain
  if (!window._adminThemeStorageBound) {
    window._adminThemeStorageBound = true;
    window.addEventListener('storage', (e) => {
      if (e.key === THEME_STORAGE_KEY) {
        const updatedTheme = e.newValue === 'light' ? 'light' : 'dark';
        applyThemeToDom(updatedTheme);
      }
    });
  }
}
