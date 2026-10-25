/**
 * API Service for Virtual Tour & Eco Land Administration
 * Handles server-side persistence for hotspots, authentication, silviculture data, and backups.
 * Fully compatible with Laravel 13 Sanctum and Session authentication (Redis & Stateful SPA).
 */

const TOKEN_KEY = 'vtour_admin_token';
const USER_KEY = 'vtour_admin_user';

export const ApiService = {
  getToken() {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || '';
    } catch {
      return '';
    }
  },

  setSession(token, user) {
    try {
      if (token) {
        sessionStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_KEY, token);
      }
      if (user) {
        sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      }
    } catch {}
  },

  clearSession() {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {}
  },

  getUser() {
    try {
      const raw = sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}

    // Fallback: baca metadata pengguna dari tag meta server jika tersedia
    if (typeof document !== 'undefined') {
      const meta = document.querySelector('meta[name="eco-user"]');
      if (meta && meta.getAttribute('content')) {
        try {
          const user = JSON.parse(meta.getAttribute('content'));
          if (user && (user.username || user.email)) {
            return user;
          }
        } catch {}
      }
    }
    return null;
  },

  isAuthenticated() {
    if (!!this.getToken()) return true;
    if (typeof document !== 'undefined') {
      const metaAuth = document.querySelector('meta[name="eco-server-auth"]');
      if (metaAuth && metaAuth.getAttribute('content') === 'true') {
        return true;
      }
    }
    return false;
  },

  /**
   * Dapatkan token proteksi CSRF Laravel dari meta tag atau cookie XSRF-TOKEN.
   */
  getCsrfToken() {
    if (typeof document === 'undefined') return '';
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta && meta.getAttribute('content')) {
      return meta.getAttribute('content');
    }
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  },

  /**
   * Header autentikasi standar untuk JSON request.
   */
  getAuthHeaders(customHeaders = {}, isFormData = false) {
    const token = this.getToken();
    const csrfToken = this.getCsrfToken();
    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
      ...customHeaders,
    };
    if (!isFormData && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  },

  getAuthHeadersMultipart(customHeaders = {}) {
    return this.getAuthHeaders(customHeaders, true);
  },

  _isHandling401: false,

  /**
   * Penanganan respons 401 Unauthorized secara terpusat tanpa looping berulang.
   */
  handleUnauthorized(res, url) {
    if (this._isHandling401) return;
    this._isHandling401 = true;

    // Lepaskan kunci throttling setelah jeda waktu singkat
    setTimeout(() => {
      this._isHandling401 = false;
    }, 4000);

    // Jangan lakukan tindakan jika sudah berada di halaman login
    if (typeof window !== 'undefined' && window.location.pathname.includes('/login')) {
      return;
    }

    console.warn(`[Eco Land ApiService] Akses tidak terotorisasi (401) pada: ${url}`);

    // Bersihkan sesi client yang usang atau tidak sah
    this.clearSession();

    // Simpan rute hash dashboard yang sedang dibuka agar pengguna dapat diarahkan kembali pasca login
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash.startsWith('#admin')) {
      try {
        sessionStorage.setItem('admin_redirect_hash', window.location.hash);
      } catch (e) {}

      // Arahkan ke form login secara konsisten
      setTimeout(() => {
        window.location.href = '/login';
      }, 300);
    }
  },

  /**
   * Central fetch wrapper: menyertakan credentials same-origin, header XMLHttpRequest,
   * CSRF protection, bearer token (jika ada), dan penanganan status 401 secara terpusat.
   */
  async request(url, options = {}) {
    const isFormData = options.body instanceof FormData;
    const method = (options.method || 'GET').toUpperCase();

    const headers = isFormData
      ? this.getAuthHeadersMultipart(options.headers || {})
      : this.getAuthHeaders(options.headers || {});

    const fetchOptions = {
      credentials: 'same-origin',
      ...options,
      method,
      headers,
    };

    const res = await fetch(url, fetchOptions);

    if (res.status === 401) {
      this.handleUnauthorized(res, url);
    }

    return res;
  },

  // ─── Otentikasi Administrator ─────────────────────────────
  async login(username, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(this.getCsrfToken() ? { 'X-CSRF-TOKEN': this.getCsrfToken() } : {}),
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        this.setSession(data.token, data.user);
        return { success: true, user: data.user };
      }
      return { success: false, message: data.message || 'Login gagal' };
    } catch (err) {
      // Fallback for static PHP hosting if /api is not rewritten
      try {
        const phpRes = await fetch('/api.php?action=login', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const phpData = await phpRes.json();
        if (phpData.success && phpData.token) {
          this.setSession(phpData.token, phpData.user);
          return { success: true, user: phpData.user };
        }
        return { success: false, message: phpData.message || 'Login gagal' };
      } catch (e) {
        return { success: false, message: 'Tidak dapat menghubungi server: ' + err.message };
      }
    }
  },

  async logout() {
    try {
      await this.request('/api/auth/logout', {
        method: 'POST',
      });
    } catch (e) {}
    this.clearSession();
  },

  // ─── Hotspot & Virtual Tour Persistence ──────────────────
  async getHotspots() {
    try {
      const res = await fetch('/api/hotspots', { credentials: 'same-origin' });
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data.hotspots) ? data.hotspots : [];
      }
    } catch (e) {
      console.warn('API /api/hotspots gagal, fallback ke /data/hotspots.json');
    }

    // Direct static fallback
    try {
      const res = await fetch('/data/hotspots.json');
      if (res.ok) {
        const data = await res.json();
        return Array.isArray(data.hotspots) ? data.hotspots : [];
      }
    } catch (err) {
      console.error('Gagal memuat hotspots.json:', err);
    }
    return [];
  },

  async saveHotspots(hotspotsList) {
    const payload = {
      version: '1.1.0',
      hotspots: hotspotsList,
    };

    try {
      const res = await this.request('/api/hotspots', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP Error ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      // Try php endpoint fallback
      try {
        const phpRes = await fetch('/api.php?action=save_hotspots', {
          method: 'POST',
          credentials: 'same-origin',
          headers: this.getAuthHeaders(),
          body: JSON.stringify(payload),
        });
        if (phpRes.ok) {
          return await phpRes.json();
        }
      } catch (e) {}
      throw err;
    }
  },

  async exportBackup() {
    try {
      const res = await this.request('/api/backup/export');
      if (res.ok) return await res.json();
    } catch (e) {}

    // Fallback generate from getHotspots
    const hotspots = await this.getHotspots();
    return {
      exportType: 'marzipano_hotspots_backup',
      version: '1.1.0',
      exportedAt: new Date().toISOString(),
      project: 'Eco Land — Kawasan Penanaman Pohon ±2 Hektare Aceh',
      totalHotspots: hotspots.length,
      data: {
        version: '1.1.0',
        lastUpdated: new Date().toISOString(),
        hotspots,
      },
    };
  },

  async importBackup(backupJson) {
    const res = await this.request('/api/backup/import', {
      method: 'POST',
      body: JSON.stringify(backupJson),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Gagal memulihkan cadangan');
    }

    return await res.json();
  },

  async saveSceneCustomName(sceneId, newName) {
    try {
      const res = await this.request('/api/scenes/rename', {
        method: 'POST',
        body: JSON.stringify({ sceneId, newName }),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true };
  },

  async getScenes() {
    try {
      const res = await fetch('/api/scenes', { credentials: 'same-origin' });
      if (res.ok) {
        const data = await res.json();
        return data.scenes || [];
      }
    } catch (e) {
      console.warn('Gagal memuat /api/scenes:', e);
    }
    return [];
  },

  async getCustomSceneNames() {
    try {
      const res = await fetch('/api/scenes/custom', { credentials: 'same-origin' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return {};
  },

  async updateScene(id, payload) {
    const res = await this.request(`/api/admin/scenes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memperbarui metadata scene');
    return result;
  },

  // ─── Modul Data Penanaman dan Pemantauan Pohon ─────────────
  async getTreeDashboard(zoneId = null) {
    const query = (zoneId && zoneId !== 'all') ? `?planting_zone_id=${encodeURIComponent(zoneId)}` : '';
    const res = await this.request(`/api/admin/trees/dashboard${query}`);
    if (!res.ok) throw new Error('Gagal memuat dashboard penanaman');
    return await res.json();
  },

  async getTreeSpecies(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/trees/species?${query}`);
    if (!res.ok) throw new Error('Gagal memuat daftar jenis pohon');
    return await res.json();
  },

  async getTreeSpeciesDetail(id) {
    const res = await this.request(`/api/admin/trees/species/${encodeURIComponent(id)}`);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Jenis pohon dengan ID "${id}" tidak ditemukan atau telah dihapus.`);
      }
      throw new Error(`Gagal memuat detail jenis pohon (HTTP ${res.status})`);
    }
    return await res.json();
  },

  async saveTreeSpecies(data, id = null) {
    const isFormData = data instanceof FormData;
    const url = id ? `/api/admin/trees/species/${id}` : '/api/admin/trees/species';
    const method = isFormData && id ? 'POST' : (id ? 'PUT' : 'POST');
    if (isFormData && id) {
      data.append('_method', 'PUT');
    }
    const res = await this.request(url, {
      method,
      body: isFormData ? data : JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(result.message || `Gagal menyimpan jenis pohon (HTTP ${res.status})`);
      err.status = res.status;
      err.errors = result.errors || null;
      err.raw = result;
      throw err;
    }
    return result;
  },

  async deleteTreeSpecies(id) {
    const res = await this.request(`/api/admin/trees/species/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus jenis pohon');
    return result;
  },

  async getPublicTreeSpecies() {
    const res = await fetch('/api/tree-species', { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat katalog publik jenis pohon');
    return await res.json();
  },

  async getPublicTreeSpeciesDetail(id) {
    const res = await fetch(`/api/tree-species/${id}`, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat detail jenis pohon');
    return await res.json();
  },

  async getPlantingActivities(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/trees/activities?${query}`);
    if (!res.ok) throw new Error('Gagal memuat kegiatan penanaman');
    return await res.json();
  },

  async savePlantingActivity(data, id = null) {
    const url = id ? `/api/admin/trees/activities/${id}` : '/api/admin/trees/activities';
    const method = id ? 'PUT' : 'POST';
    const res = await this.request(url, {
      method,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      const err = new Error(result.message || 'Gagal menyimpan kegiatan penanaman');
      err.errors = result.errors || null;
      err.status = res.status;
      throw err;
    }
    return result;
  },

  async getPlantingActivity(id) {
    const res = await this.request(`/api/admin/trees/activities/${id}`);
    if (!res.ok) throw new Error('Gagal memuat detail kegiatan penanaman');
    return await res.json();
  },

  async deletePlantingActivity(id) {
    const res = await this.request(`/api/admin/trees/activities/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus kegiatan penanaman');
    return result;
  },

  async correctPlantingActivityItem(itemId, newQuantity, reason) {
    const res = await this.request(`/api/admin/trees/activities/items/${itemId}/correct`, {
      method: 'POST',
      body: JSON.stringify({ new_quantity: newQuantity, reason }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan koreksi bibit awal');
    return result;
  },

  async getTreeSurveys(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/trees/surveys?${query}`);
    if (!res.ok) throw new Error('Gagal memuat catatan survei pemantauan');
    return await res.json();
  },

  async getTreeSurveyDetail(id) {
    const res = await this.request(`/api/admin/trees/surveys/${id}`);
    if (!res.ok) throw new Error('Gagal memuat detail survei pemantauan');
    return await res.json();
  },

  async saveTreeSurvey(data, id = null) {
    const url = id ? `/api/admin/trees/surveys/${id}` : '/api/admin/trees/surveys';
    const method = id ? 'PUT' : 'POST';
    const res = await this.request(url, {
      method,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan survei pemantauan');
    return result;
  },

  async deleteTreeSurvey(id) {
    const res = await this.request(`/api/admin/trees/surveys/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus survei');
    return result;
  },

  async getTreeMaintenance(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/trees/maintenance?${query}`);
    if (!res.ok) throw new Error('Gagal memuat catatan perawatan');
    return await res.json();
  },

  async getTreeMaintenanceDetail(id) {
    const res = await this.request(`/api/admin/trees/maintenance/${id}`);
    if (!res.ok) throw new Error('Gagal memuat detail catatan perawatan');
    return await res.json();
  },

  async saveTreeMaintenance(data, id = null) {
    const url = id ? `/api/admin/trees/maintenance/${id}` : '/api/admin/trees/maintenance';
    const method = id ? 'PUT' : 'POST';
    const res = await this.request(url, {
      method,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan catatan perawatan');
    return result;
  },

  async deleteTreeMaintenance(id) {
    const res = await this.request(`/api/admin/trees/maintenance/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus catatan perawatan');
    return result;
  },

  async previewTreeImport(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const res = await this.request('/api/admin/trees/import/preview', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memvalidasi berkas impor');
    return result;
  },

  async executeTreeImport(type, data) {
    const res = await this.request('/api/admin/trees/import/execute', {
      method: 'POST',
      body: JSON.stringify({ type, data, confirm: true }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menjalankan impor data');
    return result;
  },

  // ─── Manajemen Kawasan (Zones) ───────────────────────────
  async getZones(params = {}) {
    const query = new URLSearchParams(params).toString();
    try {
      const res = await this.request(`/api/admin/zones?${query}`);
      if (res.ok) return await res.json();
    } catch (e) {}

    // Fallback ke endpoint publik /api/zones jika permintaan admin ditolak
    try {
      const pubRes = await fetch(`/api/zones?${query}`, { credentials: 'same-origin' });
      if (pubRes.ok) return await pubRes.json();
    } catch (e) {}

    throw new Error('Gagal memuat daftar kawasan');
  },

  async getZone(id) {
    const res = await this.request(`/api/admin/zones/${id}`);
    if (!res.ok) throw new Error('Gagal memuat detail kawasan');
    return await res.json();
  },

  async saveZone(data, id = null) {
    const url = id ? `/api/admin/zones/${id}` : '/api/admin/zones';
    const method = id ? 'PUT' : 'POST';
    const res = await this.request(url, {
      method,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan data kawasan');
    return result;
  },

  async deleteZone(id) {
    const res = await this.request(`/api/admin/zones/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus kawasan');
    return result;
  },

  async archiveZone(id) {
    const res = await this.request(`/api/admin/zones/${id}/archive`, {
      method: 'POST',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengubah status arsip');
    return result;
  },

  async linkZoneScenes(id, sceneIds) {
    const res = await this.request(`/api/admin/zones/${id}/link-scenes`, {
      method: 'POST',
      body: JSON.stringify({ scene_ids: sceneIds }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghubungkan panorama');
    return result;
  },

  async getPublicZones() {
    const res = await fetch('/api/zones', { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat kawasan publik');
    return await res.json();
  },

  async getPublicZone(id) {
    const res = await fetch(`/api/zones/${id}`, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat detail kawasan publik');
    return await res.json();
  },

  // ─── Galeri Foto Kawasan (Admin & Public) ─────────────────
  async getZonePhotos(zoneId, params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/zones/${zoneId}/photos?${query}`);
    if (!res.ok) throw new Error('Gagal memuat galeri foto kawasan');
    return await res.json();
  },

  async uploadZonePhotos(zoneId, formData) {
    const res = await this.request(`/api/admin/zones/${zoneId}/photos`, {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengunggah foto kawasan');
    return result;
  },

  async updateZonePhoto(zoneId, photoId, dataOrFormData) {
    const isFormData = dataOrFormData instanceof FormData;
    let method = 'PUT';
    let body = dataOrFormData;
    if (isFormData) {
      method = 'POST';
      dataOrFormData.append('_method', 'PUT');
    } else {
      body = JSON.stringify(dataOrFormData);
    }
    const res = await this.request(`/api/admin/zones/${zoneId}/photos/${photoId}`, {
      method,
      body,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memperbarui metadata foto');
    return result;
  },

  async deleteZonePhoto(zoneId, photoId) {
    const res = await this.request(`/api/admin/zones/${zoneId}/photos/${photoId}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus foto kawasan');
    return result;
  },

  async setZoneCoverPhoto(zoneId, photoId) {
    const res = await this.request(`/api/admin/zones/${zoneId}/photos/${photoId}/set-cover`, {
      method: 'POST',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menjadikan foto sebagai sampul');
    return result;
  },

  async reorderZonePhotos(zoneId, photoIds) {
    const res = await this.request(`/api/admin/zones/${zoneId}/photos/reorder`, {
      method: 'POST',
      body: JSON.stringify({ photo_ids: photoIds }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan urutan foto');
    return result;
  },

  async getPublicZonePhotos(zoneId) {
    const res = await fetch(`/api/zones/${zoneId}/photos`, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat galeri foto publik kawasan');
    return await res.json();
  },

  async getAllPublicPhotos(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/photos?${query}`, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat galeri foto kawasan publik');
    return await res.json();
  },

  // ─── Log Aktivitas, Pengaturan & Manajemen Pengguna ───────
  async getActivityLogs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/activity-logs?${query}`);
    if (!res.ok) throw new Error('Gagal memuat log aktivitas');
    return await res.json();
  },

  async getSettings() {
    const res = await this.request('/api/admin/settings');
    if (!res.ok) throw new Error('Gagal memuat pengaturan aplikasi');
    return await res.json();
  },

  async saveSettings(settingsData) {
    const res = await this.request('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({ settings: settingsData }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan pengaturan');
    return result;
  },

  async uploadLogo(formData) {
    const res = await this.request('/api/admin/settings/logo', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengunggah logo aplikasi');
    return result;
  },

  async removeLogo() {
    const res = await this.request('/api/admin/settings/logo', {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus logo aplikasi');
    return result;
  },

  async getUsers() {
    const res = await this.request('/api/admin/users');
    if (!res.ok) throw new Error('Gagal memuat daftar pengguna');
    return await res.json();
  },

  async saveUser(userData, id = null) {
    const url = id ? `/api/admin/users/${id}` : '/api/admin/users';
    const method = id ? 'PUT' : 'POST';
    const res = await this.request(url, {
      method,
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan data pengguna');
    return result;
  },

  async deleteUser(id) {
    const res = await this.request(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus pengguna');
    return result;
  },

  // ─── Album Galeri Kegiatan ─────────────────────────────────

  // Public
  async getPublicAlbums(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/albums?${query}`, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat album galeri');
    return await res.json();
  },

  async getPublicAlbumDetail(id) {
    const res = await fetch(`/api/albums/${id}`, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Gagal memuat detail album');
    return await res.json();
  },

  // Admin
  async getAdminAlbums(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/albums?${query}`);
    if (!res.ok) throw new Error('Gagal memuat daftar album');
    return await res.json();
  },

  async getAdminAlbumDetail(id) {
    const res = await this.request(`/api/admin/albums/${id}`);
    if (!res.ok) throw new Error('Gagal memuat detail album');
    return await res.json();
  },

  async createAlbum(data) {
    const res = await this.request('/api/admin/albums', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal membuat album');
    return result;
  },

  async updateAlbum(id, data) {
    const res = await this.request(`/api/admin/albums/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memperbarui album');
    return result;
  },

  async deleteAlbum(id) {
    const res = await this.request(`/api/admin/albums/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus album');
    return result;
  },

  async addPhotosToAlbum(albumId, photoIds) {
    const res = await this.request(`/api/admin/albums/${albumId}/photos`, {
      method: 'POST',
      body: JSON.stringify({ photo_ids: photoIds }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menambahkan foto ke album');
    return result;
  },

  async removePhotoFromAlbum(albumId, photoId) {
    const res = await this.request(`/api/admin/albums/${albumId}/photos/${photoId}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus foto dari album');
    return result;
  },

  async setAlbumCover(albumId, photoId) {
    const res = await this.request(`/api/admin/albums/${albumId}/cover`, {
      method: 'POST',
      body: JSON.stringify({ photo_id: photoId }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengubah sampul album');
    return result;
  },

  async reorderAlbumPhotos(albumId, photoIds) {
    const res = await this.request(`/api/admin/albums/${albumId}/reorder`, {
      method: 'POST',
      body: JSON.stringify({ photo_ids: photoIds }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengubah urutan foto');
    return result;
  },

  async uploadPhotosToAlbum(albumId, formData) {
    const res = await this.request(`/api/admin/albums/${albumId}/upload-photos`, {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengunggah foto ke album');
    return result;
  },

  async updateAlbumPhotoMetadata(albumId, photoId, data) {
    const res = await this.request(`/api/admin/albums/${albumId}/photos/${photoId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memperbarui informasi foto');
    return result;
  },

  async deleteAlbumPhotoPermanently(albumId, photoId) {
    const res = await this.request(`/api/admin/albums/${albumId}/photos/${photoId}/permanent`, {
      method: 'DELETE',
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus foto permanen');
    return result;
  },

  async getAvailablePhotosForAlbum(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await this.request(`/api/admin/albums/available-photos?${query}`);
    if (!res.ok) throw new Error('Gagal memuat foto tersedia');
    return await res.json();
  },
};
