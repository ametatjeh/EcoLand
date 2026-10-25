/**
 * Modul Pengguna dan Hak Akses
 * Mengelola akun administrator, petugas lapangan, dan editor konten.
 */
import { ApiService } from '../services/api.js';
import { EcoToast } from '../utils/toast.js';
import { EcoModal } from '../utils/modal.js';

let cachedUsers = [];

export async function initUsersModule() {
  const container = document.getElementById('admin-users-content');
  if (!container) return;

  renderUsersLayout(container);
  await loadUsersList();
}

function renderUsersLayout(container) {
  container.innerHTML = `
    <div class="zones-hero-card">
      <div style="flex: 1; min-width: 280px;">
        <h2 class="zones-hero-title">
          <span class="zones-hero-icon">👥</span>
          <span>Pengguna dan Hak Akses</span>
        </h2>
        <p class="zones-hero-desc">
          Atur pembagian peran: Administrator (seluruh kontrol), Petugas Penanaman (input kegiatan &amp; survei), Editor Konten (panorama &amp; publikasi).
        </p>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; z-index: 2;">
        <button id="btn-add-user" class="btn-primary-action btn-sm" style="display: inline-flex; align-items: center; gap: 6px;">
          <span>➕</span> Tambah Pengguna
        </button>
      </div>
    </div>

    <!-- Users Table Container -->
    <div id="users-table-wrapper" class="table-responsive" style="background: var(--clr-surface); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
      <div style="display: flex; justify-content: center; align-items: center; padding: 40px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span> Memuat data pengguna...
      </div>
    </div>

    <!-- Modal Form Tambah/Edit Pengguna -->
    <div id="user-form-modal" class="modal-overlay hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: none; align-items: center; justify-content: center; z-index: 100;">
      <div style="background: var(--clr-surface-card); border: 1px solid var(--clr-border); border-radius: var(--radius-md); padding: 24px; max-width: 440px; width: 90%;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--clr-border); padding-bottom: 10px;">
          <h3 id="user-modal-title" style="margin: 0; color: #fff; font-size: 16px;">Tambah Pengguna Baru</h3>
          <button id="btn-close-user-modal" class="icon-btn" style="background: none; border: none; color: #fff; cursor: pointer; font-size: 18px;">✕</button>
        </div>
        <form id="user-account-form">
          <input type="hidden" id="user-edit-id" />
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-name" style="color: #fff; font-size: 13px;">Nama Lengkap: *</label>
            <input type="text" id="user-input-name" class="form-input" required placeholder="Nama lengkap petugas" />
          </div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-username" style="color: #fff; font-size: 13px;">Username: *</label>
            <input type="text" id="user-input-username" class="form-input" required placeholder="username_login" />
          </div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-email" style="color: #fff; font-size: 13px;">Email (Opsional):</label>
            <input type="email" id="user-input-email" class="form-input" placeholder="email@organisasi.id" />
          </div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="user-input-password" style="color: #fff; font-size: 13px;">Kata Sandi: <span id="pwd-help-text" style="font-size: 11px; color: var(--clr-text-muted);">(Min. 6 karakter)</span></label>
            <input type="password" id="user-input-password" class="form-input" placeholder="••••••••" />
          </div>
          <div class="form-group" style="margin-bottom: 16px;">
            <label for="user-input-role" style="color: #fff; font-size: 13px;">Peran & Hak Akses: *</label>
            <select id="user-input-role" class="form-select" required>
              <option value="administrator">Administrator (Akses Penuh Semua Modul)</option>
              <option value="petugas_penanaman">Petugas Penanaman (Input Data Pohon & Survei)</option>
              <option value="editor_konten">Editor Konten (Kelola Panorama & Info Publik)</option>
            </select>
          </div>
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button type="button" id="btn-cancel-user-modal" class="btn-secondary-action btn-sm">Batal</button>
            <button type="submit" id="btn-submit-user" class="btn-primary-action btn-sm">💾 Simpan Pengguna</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const btnAdd = container.querySelector('#btn-add-user');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => openUserModal(null));
  }

  const modal = container.querySelector('#user-form-modal');
  const btnClose = container.querySelector('#btn-close-user-modal');
  const btnCancel = container.querySelector('#btn-cancel-user-modal');

  const closeModal = () => {
    if (modal) {
      modal.style.display = 'none';
      modal.classList.add('hidden');
    }
  };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  const form = container.querySelector('#user-account-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = document.getElementById('user-edit-id').value;
      const payload = {
        name: document.getElementById('user-input-name').value.trim(),
        username: document.getElementById('user-input-username').value.trim(),
        email: document.getElementById('user-input-email').value.trim() || null,
        role: document.getElementById('user-input-role').value,
      };
      const pwd = document.getElementById('user-input-password').value;
      if (pwd) payload.password = pwd;

      const isEdit = !!id;
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Menyimpan...';
      }

      try {
        const res = await ApiService.saveUser(payload, id || null);
        if (isEdit) {
          EcoToast.updated(res.message || 'Data pengguna berhasil disimpan.');
        } else {
          EcoToast.created(res.message || 'Pengguna baru berhasil ditambahkan.');
        }
        closeModal();
        await loadUsersList();
      } catch (err) {
        EcoToast.error('✕ Gagal menyimpan pengguna', err.message);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Simpan Pengguna';
        }
      }
    });
  }
}

function openUserModal(user = null) {
  const modal = document.getElementById('user-form-modal');
  if (!modal) return;

  modal.style.display = 'flex';
  modal.classList.remove('hidden');

  document.getElementById('user-modal-title').innerText = user ? `Edit Pengguna: ${user.name}` : 'Tambah Pengguna Baru';
  document.getElementById('user-edit-id').value = user ? user.id : '';
  document.getElementById('user-input-name').value = user ? user.name : '';
  document.getElementById('user-input-username').value = user ? user.username : '';
  document.getElementById('user-input-email').value = user && user.email ? user.email : '';
  document.getElementById('user-input-role').value = user ? user.role : 'petugas_penanaman';
  document.getElementById('user-input-password').value = '';

  const pwdHelp = document.getElementById('pwd-help-text');
  if (pwdHelp) {
    pwdHelp.innerText = user ? '(Kosongkan jika tidak ingin mengubah sandi)' : '(Wajib diisi, min 6 karakter)';
  }
  const pwdInput = document.getElementById('user-input-password');
  if (pwdInput) {
    pwdInput.required = !user;
  }
}

async function loadUsersList() {
  const wrapper = document.getElementById('users-table-wrapper');
  if (!wrapper) return;

  try {
    const res = await ApiService.getUsers();
    cachedUsers = res.users || [];
    renderUsersTable(wrapper, cachedUsers);
  } catch (err) {
    wrapper.innerHTML = `
      <div style="color: #fca5a5; padding: 16px;">❌ Gagal memuat daftar pengguna: ${err.message}</div>
    `;
  }
}

function renderUsersTable(container, users) {
  if (!users || users.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: var(--clr-text-muted); padding: 30px;">Tidak ada pengguna terdaftar.</div>';
    return;
  }

  const roleLabels = {
    administrator: '<span class="badge-status-published" style="font-size: 11px;">Administrator</span>',
    admin: '<span class="badge-status-published" style="font-size: 11px;">Administrator</span>',
    superadmin: '<span class="badge-status-published" style="font-size: 11px;">Super Admin</span>',
    petugas_penanaman: '<span class="badge-status-draft" style="color:#38bdf8;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.35);font-size: 11px;font-weight:600;padding:2px 8px;border-radius:9999px;">🌱 Petugas Penanaman</span>',
    editor_konten: '<span class="badge-status-draft" style="color:#fbbf24;background:rgba(251,191,36,0.12);border:1px solid rgba(251,191,36,0.35);font-size: 11px;font-weight:600;padding:2px 8px;border-radius:9999px;">✏️ Editor Konten</span>',
  };

  const rows = users.map((u) => `
    <tr style="border-bottom: 1px solid var(--clr-border-subtle);">
      <td style="padding: 10px; font-weight: 600; color: #fff;">${escapeHtml(u.name)}</td>
      <td style="padding: 10px; font-family: monospace; color: var(--clr-primary);">${escapeHtml(u.username)}</td>
      <td style="padding: 10px; color: var(--clr-text-muted);">${escapeHtml(u.email || '-')}</td>
      <td style="padding: 10px;">${roleLabels[u.role] || u.role}</td>
      <td style="padding: 10px; text-align: right; white-space: nowrap;">
        <button class="btn-edit-user btn-text-btn btn-sm" data-id="${u.id}">✏️ Edit</button>
        ${u.username !== 'admin' ? `
          <button class="btn-delete-user btn-text-btn btn-sm" data-id="${u.id}" style="color: var(--clr-danger);">🗑️ Hapus</button>
        ` : ''}
      </td>
    </tr>
  `).join('');

  container.innerHTML = `
    <table class="data-table" style="width: 100%; font-size: 13px;">
      <thead>
        <tr style="color: var(--clr-text-muted); border-bottom: 1px solid var(--clr-border); text-align: left; font-size: 12px;">
          <th style="padding: 10px;">Nama</th>
          <th style="padding: 10px;">Username</th>
          <th style="padding: 10px;">Email</th>
          <th style="padding: 10px;">Peran (Role)</th>
          <th style="padding: 10px; text-align: right;">Aksi</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  container.querySelectorAll('.btn-edit-user').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const u = cachedUsers.find((x) => String(x.id) === String(id));
      if (u) openUserModal(u);
    });
  });

  container.querySelectorAll('.btn-delete-user').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const u = cachedUsers.find((x) => String(x.id) === String(id));

      const confirmed = await EcoModal.confirm({
        title: 'Hapus Pengguna?',
        subtitle: u?.name || u?.username || 'Akun Pengguna',
        message: `Apakah Anda yakin ingin menghapus akun pengguna <strong>"${escapeHtml(u?.name || u?.username || '')}"</strong>? Pengguna ini tidak akan dapat login lagi ke sistem.`,
        type: 'danger',
        confirmText: 'Ya, Hapus Pengguna',
        cancelText: 'Batal',
        icon: '🗑️'
      });

      if (confirmed) {
        try {
          const res = await ApiService.deleteUser(id);
          EcoToast.deleted(res.message || 'Pengguna berhasil dihapus.');
          await loadUsersList();
        } catch (e) {
          EcoToast.error('✕ Gagal menghapus: ' + e.message);
        }
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
