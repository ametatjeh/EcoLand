import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function virtualTourApiPlugin() {
  const getHotspotsFilePath = () => path.resolve(process.cwd(), 'public/data/hotspots.json');
  const getScenesCustomPath = () => path.resolve(process.cwd(), 'public/data/scenes_custom.json');

  const readBody = (req) => {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch (e) {
          reject(e);
        }
      });
      req.on('error', reject);
    });
  };

  const handleApiRequest = async (req, res, next) => {
    const url = req.url ? req.url.split('?')[0] : '';

    if (!url.startsWith('/api/')) {
      return next();
    }

    // 0. Forward to Laravel 13 Backend if active on port 8000
    try {
      const laravelUrl = `http://127.0.0.1:8000${req.url}`;
      const forwardHeaders = { ...req.headers };
      delete forwardHeaders['host'];
      delete forwardHeaders['content-length'];

      let reqBody = undefined;
      if (req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS') {
        reqBody = await new Promise((resolve) => {
          let buf = '';
          req.on('data', (c) => (buf += c));
          req.on('end', () => resolve(buf));
        });
      }

      const backendRes = await fetch(laravelUrl, {
        method: req.method,
        headers: forwardHeaders,
        body: reqBody,
      });

      res.statusCode = backendRes.status;
      backendRes.headers.forEach((val, key) => {
        res.setHeader(key, val);
      });
      const text = await backendRes.text();
      return res.end(text);
    } catch (backendErr) {
      // Laravel server offline, fall back to mock handlers below
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return res.end();
    }

    // Helper auth check
    const authHeader = req.headers['authorization'] || '';
    const isAuthenticated = authHeader.includes('admin_token_ikhw') || authHeader.startsWith('Bearer ');

    try {
      // 1. Auth endpoints
      if (url === '/api/auth/login' && req.method === 'POST') {
        const { username, password } = await readBody(req);
        if (
          (username === 'admin' && password === 'admin123') ||
          (username === 'ikhw_admin' && password === 'ikhw2026')
        ) {
          res.statusCode = 200;
          return res.end(
            JSON.stringify({
              success: true,
              token: 'admin_token_ikhw_session_' + Date.now(),
              user: { username, role: 'administrator', name: 'Admin IKHW Aceh' },
            })
          );
        } else {
          res.statusCode = 401;
          return res.end(
            JSON.stringify({ success: false, message: 'Username atau password admin salah!' })
          );
        }
      }

      if (url === '/api/auth/verify' && req.method === 'GET') {
        if (isAuthenticated) {
          res.statusCode = 200;
          return res.end(
            JSON.stringify({ authenticated: true, user: { username: 'admin', role: 'administrator' } })
          );
        } else {
          res.statusCode = 401;
          return res.end(JSON.stringify({ authenticated: false }));
        }
      }

      if (url === '/api/auth/logout' && req.method === 'POST') {
        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, message: 'Berhasil logout' }));
      }

      // 2. Get Hotspots (public allowed)
      if (url === '/api/hotspots' && req.method === 'GET') {
        const filePath = getHotspotsFilePath();
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          res.statusCode = 200;
          return res.end(content);
        } else {
          res.statusCode = 404;
          return res.end(JSON.stringify({ success: false, message: 'File hotspots.json tidak ditemukan' }));
        }
      }

      // 3. Save / Update Hotspots (Admin protected)
      if (url === '/api/hotspots' && req.method === 'POST') {
        if (!isAuthenticated) {
          res.statusCode = 403;
          return res.end(JSON.stringify({ success: false, message: 'Akses ditolak: Memerlukan login admin' }));
        }

        const body = await readBody(req);
        const filePath = getHotspotsFilePath();
        const payload = {
          version: body.version || '1.1.0',
          lastUpdated: new Date().toISOString(),
          hotspots: Array.isArray(body.hotspots) ? body.hotspots : [],
        };

        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf-8');

        // Also sync to dist if dist exists
        const distPath = path.resolve(process.cwd(), 'dist/data/hotspots.json');
        if (fs.existsSync(path.dirname(distPath))) {
          fs.writeFileSync(distPath, JSON.stringify(payload, null, 2), 'utf-8');
        }

        res.statusCode = 200;
        return res.end(
          JSON.stringify({
            success: true,
            message: 'Data hotspot berhasil disimpan permanen di server',
            count: payload.hotspots.length,
            lastUpdated: payload.lastUpdated,
          })
        );
      }

      // 4. Custom Scene display names (Admin protected)
      if (url === '/api/scenes/rename' && req.method === 'POST') {
        if (!isAuthenticated) {
          res.statusCode = 403;
          return res.end(JSON.stringify({ success: false, message: 'Akses ditolak' }));
        }

        const { sceneId, newName } = await readBody(req);
        const scenesPath = getScenesCustomPath();
        let customScenes = {};
        if (fs.existsSync(scenesPath)) {
          try {
            customScenes = JSON.parse(fs.readFileSync(scenesPath, 'utf-8'));
          } catch (e) { }
        }
        customScenes[sceneId] = newName;
        fs.writeFileSync(scenesPath, JSON.stringify(customScenes, null, 2), 'utf-8');

        res.statusCode = 200;
        return res.end(JSON.stringify({ success: true, customScenes }));
      }

      if (url === '/api/scenes/custom' && req.method === 'GET') {
        const scenesPath = getScenesCustomPath();
        if (fs.existsSync(scenesPath)) {
          const content = fs.readFileSync(scenesPath, 'utf-8');
          res.statusCode = 200;
          return res.end(content);
        } else {
          res.statusCode = 200;
          return res.end(JSON.stringify({}));
        }
      }

      // 5. Backup Export (Admin protected)
      if (url === '/api/backup/export' && req.method === 'GET') {
        if (!isAuthenticated) {
          res.statusCode = 403;
          return res.end(JSON.stringify({ success: false, message: 'Akses ditolak' }));
        }
        const filePath = getHotspotsFilePath();
        const content = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : { hotspots: [] };
        const backupData = {
          exportType: 'marzipano_hotspots_backup',
          version: '1.1.0',
          exportedAt: new Date().toISOString(),
          project: 'Virtual Tour Kawasan Penanaman Pohon ±2 Hektare Aceh',
          totalHotspots: content.hotspots.length,
          data: content,
        };
        res.statusCode = 200;
        return res.end(JSON.stringify(backupData, null, 2));
      }

      // 6. Backup Import (Admin protected)
      if (url === '/api/backup/import' && req.method === 'POST') {
        if (!isAuthenticated) {
          res.statusCode = 403;
          return res.end(JSON.stringify({ success: false, message: 'Akses ditolak' }));
        }

        const importPayload = await readBody(req);
        let hotspotsList = [];

        if (Array.isArray(importPayload.hotspots)) {
          hotspotsList = importPayload.hotspots;
        } else if (importPayload.data && Array.isArray(importPayload.data.hotspots)) {
          hotspotsList = importPayload.data.hotspots;
        } else {
          res.statusCode = 400;
          return res.end(JSON.stringify({ success: false, message: 'Format file cadangan tidak valid: tidak ditemukan array hotspots.' }));
        }

        const filePath = getHotspotsFilePath();
        const payload = {
          version: '1.1.0',
          lastUpdated: new Date().toISOString(),
          hotspots: hotspotsList,
        };

        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf-8');

        res.statusCode = 200;
        return res.end(
          JSON.stringify({
            success: true,
            message: `Berhasil memulihkan ${hotspotsList.length} hotspot dari file cadangan!`,
            count: hotspotsList.length,
          })
        );
      }

      // Unknown API route
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'Endpoint API tidak ditemukan' }));
    } catch (err) {
      console.error('API Error:', err);
      res.statusCode = 500;
      res.end(JSON.stringify({ error: err.message }));
    }
  };

  return {
    name: 'virtual-tour-api-middleware',
    configureServer(server) {
      server.middlewares.use(handleApiRequest);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handleApiRequest);
    },
  };
}

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
    tailwindcss(),
    virtualTourApiPlugin(),
  ],

  // Tambahan untuk mengatur peringatan ukuran bundle
  build: {
    chunkSizeWarningLimit: 1000, // Batas peringatan 1000 kB (1 MB)
  },
});