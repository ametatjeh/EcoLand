/**
 * API Service for Virtual Tour
 * Handles server-side persistence for hotspots, authentication, and backups.
 * Works seamlessly with Vite backend middleware and DirectAdmin / Apache PHP hosting.
 */

const TOKEN_KEY = 'vtour_admin_token';
const USER_KEY = 'vtour_admin_user';

export const ApiService = {
  getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || '';
  },

  setSession(token, user) {
    sessionStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TOKEN_KEY, token);
    if (user) {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },

  clearSession() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getUser() {
    const raw = sessionStorage.getItem(USER_KEY) || localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async login(username, password) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          headers: { 'Content-Type': 'application/json' },
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
    const token = this.getToken();
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {}
    this.clearSession();
  },

  async getHotspots() {
    try {
      const res = await fetch('/api/hotspots');
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
    const token = this.getToken();
    if (!token) {
      throw new Error('Akses ditolak: Anda harus login sebagai admin');
    }

    const payload = {
      version: '1.1.0',
      hotspots: hotspotsList,
    };

    try {
      const res = await fetch('/api/hotspots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP Error ${res.status}`);
      }

      const result = await res.json();
      return result;
    } catch (err) {
      // Try php endpoint fallback
      try {
        const phpRes = await fetch('/api.php?action=save_hotspots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
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
    const token = this.getToken();
    try {
      const res = await fetch('/api/backup/export', {
        headers: { Authorization: `Bearer ${token}` },
      });
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
    const token = this.getToken();
    if (!token) throw new Error('Akses ditolak: Memerlukan login admin');

    const res = await fetch('/api/backup/import', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(backupJson),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || 'Gagal memulihkan cadangan');
    }

    return await res.json();
  },

  async saveSceneCustomName(sceneId, newName) {
    const token = this.getToken();
    try {
      const res = await fetch('/api/scenes/rename', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sceneId, newName }),
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true };
  },

  async getCustomSceneNames() {
    try {
      const res = await fetch('/api/scenes/custom');
      if (res.ok) return await res.json();
    } catch (e) {}
    return {};
  },

  async updateScene(id, payload) {
    const res = await fetch(`/api/admin/scenes/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memperbarui metadata scene');
    return result;
  },

  // ─── Modul Data Penanaman dan Pemantauan Pohon ─────────────
  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  getAuthHeadersMultipart() {
    const token = this.getToken();
    return {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  },

  async getTreeDashboard(zoneId = null) {
    const query = (zoneId && zoneId !== 'all') ? `?planting_zone_id=${encodeURIComponent(zoneId)}` : '';
    const res = await fetch(`/api/admin/trees/dashboard${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat dashboard penanaman');
    return await res.json();
  },

  async getTreeSpecies(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/trees/species?${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat daftar jenis pohon');
    return await res.json();
  },

  async saveTreeSpecies(data, id = null) {
    const isFormData = data instanceof FormData;
    const url = id ? `/api/admin/trees/species/${id}` : '/api/admin/trees/species';
    const method = isFormData && id ? 'POST' : (id ? 'PUT' : 'POST');
    if (isFormData && id) {
      data.append('_method', 'PUT');
    }
    const headers = { ...this.getAuthHeaders() };
    if (isFormData) {
      delete headers['Content-Type'];
    }
    const res = await fetch(url, {
      method,
      headers,
      body: isFormData ? data : JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan jenis pohon');
    return result;
  },

  async deleteTreeSpecies(id) {
    const res = await fetch(`/api/admin/trees/species/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus jenis pohon');
    return result;
  },

  async getPublicTreeSpecies() {
    const res = await fetch('/api/tree-species');
    if (!res.ok) throw new Error('Gagal memuat katalog publik jenis pohon');
    return await res.json();
  },

  async getPublicTreeSpeciesDetail(id) {
    const res = await fetch(`/api/tree-species/${id}`);
    if (!res.ok) throw new Error('Gagal memuat detail jenis pohon');
    return await res.json();
  },

  async getPlantingActivities(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/trees/activities?${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat kegiatan penanaman');
    return await res.json();
  },

  async savePlantingActivity(data, id = null) {
    const url = id ? `/api/admin/trees/activities/${id}` : '/api/admin/trees/activities';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: this.getAuthHeaders(),
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
    const res = await fetch(`/api/admin/trees/activities/${id}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat detail kegiatan penanaman');
    return await res.json();
  },

  async deletePlantingActivity(id) {
    const res = await fetch(`/api/admin/trees/activities/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus kegiatan penanaman');
    return result;
  },

  async correctPlantingActivityItem(itemId, newQuantity, reason) {
    const res = await fetch(`/api/admin/trees/activities/items/${itemId}/correct`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ new_quantity: newQuantity, reason }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan koreksi bibit awal');
    return result;
  },

  async getTreeSurveys(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/trees/surveys?${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat catatan survei pemantauan');
    return await res.json();
  },

  async getTreeSurveyDetail(id) {
    const res = await fetch(`/api/admin/trees/surveys/${id}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat detail survei pemantauan');
    return await res.json();
  },

  async saveTreeSurvey(data, id = null) {
    const url = id ? `/api/admin/trees/surveys/${id}` : '/api/admin/trees/surveys';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan survei pemantauan');
    return result;
  },

  async deleteTreeSurvey(id) {
    const res = await fetch(`/api/admin/trees/surveys/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus survei');
    return result;
  },

  async getTreeMaintenance(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/trees/maintenance?${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat catatan perawatan');
    return await res.json();
  },

  async getTreeMaintenanceDetail(id) {
    const res = await fetch(`/api/admin/trees/maintenance/${id}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat detail catatan perawatan');
    return await res.json();
  },

  async saveTreeMaintenance(data, id = null) {
    const url = id ? `/api/admin/trees/maintenance/${id}` : '/api/admin/trees/maintenance';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan catatan perawatan');
    return result;
  },

  async deleteTreeMaintenance(id) {
    const res = await fetch(`/api/admin/trees/maintenance/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus catatan perawatan');
    return result;
  },

  async previewTreeImport(file, type) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const token = this.getToken();
    const res = await fetch('/api/admin/trees/import/preview', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memvalidasi berkas impor');
    return result;
  },

  async executeTreeImport(type, data) {
    const res = await fetch('/api/admin/trees/import/execute', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ type, data, confirm: true }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menjalankan impor data');
    return result;
  },

  // ─── Manajemen Kawasan (Zones) ───
  async getZones(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/zones?${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat daftar kawasan');
    return await res.json();
  },

  async getZone(id) {
    const res = await fetch(`/api/admin/zones/${id}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat detail kawasan');
    return await res.json();
  },

  async saveZone(data, id = null) {
    const url = id ? `/api/admin/zones/${id}` : '/api/admin/zones';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan data kawasan');
    return result;
  },

  async deleteZone(id) {
    const res = await fetch(`/api/admin/zones/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus kawasan');
    return result;
  },

  async archiveZone(id) {
    const res = await fetch(`/api/admin/zones/${id}/archive`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengubah status arsip');
    return result;
  },

  async linkZoneScenes(id, sceneIds) {
    const res = await fetch(`/api/admin/zones/${id}/link-scenes`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ scene_ids: sceneIds }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghubungkan panorama');
    return result;
  },

  async getPublicZones() {
    const res = await fetch('/api/zones');
    if (!res.ok) throw new Error('Gagal memuat kawasan publik');
    return await res.json();
  },

  async getPublicZone(id) {
    const res = await fetch(`/api/zones/${id}`);
    if (!res.ok) throw new Error('Gagal memuat detail kawasan publik');
    return await res.json();
  },

  // ─── Galeri Foto Kawasan (Admin & Public) ───
  async getZonePhotos(zoneId, params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/zones/${zoneId}/photos?${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat galeri foto kawasan');
    return await res.json();
  },

  async uploadZonePhotos(zoneId, formData) {
    const res = await fetch(`/api/admin/zones/${zoneId}/photos`, {
      method: 'POST',
      headers: this.getAuthHeadersMultipart(),
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
    let headers = this.getAuthHeaders();
    if (isFormData) {
      method = 'POST';
      dataOrFormData.append('_method', 'PUT');
      headers = this.getAuthHeadersMultipart();
    } else {
      body = JSON.stringify(dataOrFormData);
    }
    const res = await fetch(`/api/admin/zones/${zoneId}/photos/${photoId}`, {
      method,
      headers,
      body,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal memperbarui metadata foto');
    return result;
  },

  async deleteZonePhoto(zoneId, photoId) {
    const res = await fetch(`/api/admin/zones/${zoneId}/photos/${photoId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus foto kawasan');
    return result;
  },

  async setZoneCoverPhoto(zoneId, photoId) {
    const res = await fetch(`/api/admin/zones/${zoneId}/photos/${photoId}/set-cover`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menjadikan foto sebagai sampul');
    return result;
  },

  async reorderZonePhotos(zoneId, photoIds) {
    const res = await fetch(`/api/admin/zones/${zoneId}/photos/reorder`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ photo_ids: photoIds }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan urutan foto');
    return result;
  },

  async getPublicZonePhotos(zoneId) {
    const res = await fetch(`/api/zones/${zoneId}/photos`);
    if (!res.ok) throw new Error('Gagal memuat galeri foto publik kawasan');
    return await res.json();
  },

  async getAllPublicPhotos(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/photos?${query}`);
    if (!res.ok) throw new Error('Gagal memuat galeri foto kawasan publik');
    return await res.json();
  },

  // ─── Log Aktivitas & Pengaturan & Pengguna ───
  async getActivityLogs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/activity-logs?${query}`, {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat log aktivitas');
    return await res.json();
  },

  async getSettings() {
    const res = await fetch('/api/admin/settings', {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat pengaturan aplikasi');
    return await res.json();
  },

  async saveSettings(settingsData) {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ settings: settingsData }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan pengaturan');
    return result;
  },

  async uploadLogo(formData) {
    const res = await fetch('/api/admin/settings/logo', {
      method: 'POST',
      headers: this.getAuthHeadersMultipart(),
      body: formData,
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal mengunggah logo aplikasi');
    return result;
  },

  async removeLogo() {
    const res = await fetch('/api/admin/settings/logo', {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus logo aplikasi');
    return result;
  },

  async getUsers() {
    const res = await fetch('/api/admin/users', {
      headers: this.getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Gagal memuat daftar pengguna');
    return await res.json();
  },

  async saveUser(userData, id = null) {
    const url = id ? `/api/admin/users/${id}` : '/api/admin/users';
    const method = id ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menyimpan data pengguna');
    return result;
  },

  async deleteUser(id) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message || 'Gagal menghapus pengguna');
    return result;
  },
};

