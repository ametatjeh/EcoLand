import{a as e}from"./rolldown-runtime-B0Z9INg1.js";import{a as t,c as n,d as r,f as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./admin-panel-BJwnYzHf.js";import{t as d}from"./leaflet-BMvZM1tv.js";import{t as f}from"./qrcode-D3IYU-fo.js";var p={namaAplikasi:`Eco Land`,namaProyek:`Kawasan Penanaman Pohon`,subjudul:`Virtual Tour 360° Pemulihan Ekosistem & Silvikultur`,organisasi:`IKHW Aceh — Inisiatif Konservasi & Hutan Wakaf`,domain:`ikhw.org`,emailKontak:`info@ikhw.org`,luasDeskriptif:`±2 Hektare`,luasDetail:`Kurang lebih 20.000 m² (2 Hektare)`,targetBibit:`1.000+ Batang Pohon Lokal`,lokasiReferensi:{nama:`Titik Patok Referensi Acuan Kawasan`,latitude:5.4818556,longitude:95.5840917,sistemKoordinat:`WGS84 / EPSG:4326`,keterangan:`Koordinat titik acuan penanda lokasi lapangan (bukan poligon batas).`},deskripsi:`Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.`,tujuanProgram:[`Penghijauan dan pemulihan tutupan kanopi pohon pada lahan terbuka.`,`Pencegahan erosi tanah dan perbaikan tata kelola resapan air hujan.`,`Penyediaan koridor pakan alami bagi satwa liar dan burung lokal.`,`Edukasi publik melalui dokumentasi visual Virtual Tour 360° berkala.`],pengelola:{penanggungJawab:`Tim Konservasi & Pemulihan Ekosistem IKHW Aceh`,kontak:`info@ikhw.org`,lokasiAdministratif:`Provinsi Aceh, Indonesia`}},m=e(r(),1),h=null;function ee(){let e=document.getElementById(`pano`);if(!e)throw Error(`#pano element not found`);return h=new m.default.Viewer(e,{controls:{mouseViewMode:`drag`},stage:{progressive:!0}}),h}function te(e,t=null){if(!h)throw Error(`Viewer belum diinisialisasi`);let n=null,r=null,i=t||e.initialViewParameters||e.initialView||{};if(e.levels&&e.levels.length>0){let t=`/tiles`;n=m.default.ImageUrlSource.fromString(`${t}/${e.id}/{z}/{f}/{y}/{x}.jpg`,{cubeMapPreviewUrl:`${t}/${e.id}/preview.jpg`}),r=new m.default.CubeGeometry(e.levels)}else{let t=e.panorama||e.panorama_path;n=m.default.ImageUrlSource.fromString(t),r=new m.default.EquirectGeometry([{width:4096}])}let a=e.faceSize||896,o=m.default.RectilinearView.limit.traditional(a,100*Math.PI/180,120*Math.PI/180),s=new m.default.RectilinearView({yaw:i.yaw??0,pitch:i.pitch??0,fov:i.fov??Math.PI/2},o);return{scene:h.createScene({source:n,geometry:r,view:s,pinFirstLevel:!0}),view:s}}function ne(e,t){e&&t&&(typeof t.yaw==`number`&&e.setYaw(t.yaw),typeof t.pitch==`number`&&e.setPitch(t.pitch),typeof t.fov==`number`&&e.setFov(t.fov))}function re(e,t){if(!e)return;let n=e.fov(),r=Math.max(30*Math.PI/180,Math.min(120*Math.PI/180,n+t));e.setFov(r)}function ie(e,t){e&&t&&(e.setYaw(t.yaw??0),e.setPitch(t.pitch??0),e.setFov(t.fov??Math.PI/2))}var ae=null;function oe(){let e=document.getElementById(`sidebar`),t=document.getElementById(`sidebar-overlay`);e&&e.classList.remove(`closed`),t&&t.classList.add(`active`)}function se(){let e=document.getElementById(`sidebar`),t=document.getElementById(`sidebar-overlay`);e&&e.classList.add(`closed`),t&&t.classList.remove(`active`)}function ce(){let e=document.getElementById(`sidebar`);e&&e.classList.contains(`closed`)?oe():se()}function le(e,t){let n=document.getElementById(`scene-list`);n&&(n.innerHTML=``,e.forEach(e=>{let r=document.createElement(`li`);r.className=`scene-item${e.id===t?` active`:``}`,r.setAttribute(`data-scene-id`,e.id);let i=e.status===`tersedia`;r.innerHTML=`
      <div class="scene-item-seq">${e.sequence||`•`}</div>
      <div class="scene-item-info">
        <div class="scene-item-name">${e.name}</div>
        <div class="scene-item-status">
          ${i?`✓ Foto Tersedia`:`⏳ Belum Tersedia`}${typeof e.latitude==`number`?` • ${e.latitude.toFixed(5)}°, ${e.longitude.toFixed(5)}°`:``}
        </div>
      </div>
    `,r.addEventListener(`click`,()=>{typeof ae==`function`&&ae(e.id),se()}),n.appendChild(r)}))}function ue(e){document.querySelectorAll(`.scene-item`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-scene-id`)===e)})}function de(e){ae=e;let t=document.getElementById(`btn-sidebar-toggle`),n=document.getElementById(`btn-sidebar-close`),r=document.getElementById(`sidebar-overlay`);t&&t.addEventListener(`click`,ce),n&&n.addEventListener(`click`,se),r&&r.addEventListener(`click`,se)}function fe(e){let t=document.getElementById(`btn-zoom-in`),n=document.getElementById(`btn-zoom-out`),r=document.getElementById(`btn-reset-view`),i=document.getElementById(`btn-fullscreen`),a=document.getElementById(`btn-prev-scene`),o=document.getElementById(`btn-next-scene`);t&&e.onZoomIn&&t.addEventListener(`click`,e.onZoomIn),n&&e.onZoomOut&&n.addEventListener(`click`,e.onZoomOut),r&&e.onResetView&&r.addEventListener(`click`,e.onResetView),i&&e.onFullscreen&&i.addEventListener(`click`,e.onFullscreen),a&&e.onPrevScene&&a.addEventListener(`click`,e.onPrevScene),o&&e.onNextScene&&o.addEventListener(`click`,e.onNextScene),document.addEventListener(`keydown`,t=>{if(t.target.tagName!==`INPUT`&&t.target.tagName!==`TEXTAREA`)switch(t.key){case`+`:case`=`:e.onZoomIn&&e.onZoomIn();break;case`-`:e.onZoomOut&&e.onZoomOut();break;case`r`:case`R`:e.onResetView&&e.onResetView();break;case`f`:case`F`:e.onFullscreen&&e.onFullscreen();break;case`ArrowLeft`:e.onPrevScene&&e.onPrevScene();break;case`ArrowRight`:e.onNextScene&&e.onNextScene()}})}function pe(){document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}var g=e(d(),1),_=null,me=null,he=[],ge=null;function _e(e,t){if(!document.getElementById(e))return;ge=t;let{latitude:n,longitude:r}=p.lokasiReferensi;_=g.default.map(e,{center:[n,r],zoom:16,zoomControl:!1,attributionControl:!1,dragging:!0,scrollWheelZoom:!0,doubleClickZoom:!1}),g.default.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,{maxZoom:19}).addTo(_),g.default.circleMarker([n,r],{radius:4,fillColor:`#f59e0b`,color:`#ffffff`,weight:1.5,fillOpacity:1}).addTo(_).bindTooltip(`Patok Referensi Acuan`,{direction:`top`}),i.forEach(e=>{let t=g.default.circleMarker([e.latitude,e.longitude],{radius:6,fillColor:`#ffffff`,color:`#059669`,weight:2,opacity:1,fillOpacity:.9}).addTo(_);t.bindTooltip(`Titik ${e.sequence}: ${e.name}`,{direction:`top`,offset:[0,-6],className:`minimap-tooltip`}),t.on(`click`,()=>{typeof ge==`function`&&ge(e.id)}),he.push({id:e.id,marker:t})});let a=g.default.divIcon({className:`minimap-user-icon`,html:`
      <div class="user-position-marker">
        <span class="user-radar-wave"></span>
        <span class="user-center-point"></span>
      </div>
    `,iconSize:[22,22],iconAnchor:[11,11]});return me=g.default.marker([n,r],{icon:a,zIndexOffset:2e3}).addTo(_),setTimeout(()=>{_.invalidateSize(),_.setView([n,r],16)},300),_}function ve(e){if(!_||!me)return;let t=i.find(t=>t.id===e);t&&(me.setLatLng([t.latitude,t.longitude]),_.panTo([t.latitude,t.longitude]),he.forEach(({id:t,marker:n})=>{t===e?n.setStyle({radius:7,fillColor:`#10b981`,color:`#ffffff`,weight:3}):n.setStyle({radius:5,fillColor:`#ffffff`,color:`#059669`,weight:2})}))}function ye(){_&&_.invalidateSize()}var be=new Map;function xe(e,t){if(!document.getElementById(e))return null;if(be.has(e)){let t=be.get(e);return setTimeout(()=>{t.map.invalidateSize()},100),t.map}let{latitude:n,longitude:r,nama:a}=p.lokasiReferensi,o=g.default.map(e,{center:[n,r],zoom:17,maxZoom:19,minZoom:13,zoomControl:!0}),s=g.default.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,{maxZoom:19,attribution:`Citra Satelit &copy; Esri`}),c=g.default.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{maxZoom:19,attribution:`&copy; OpenStreetMap`});s.addTo(o);let l={"🛰️ Citra Satelit":s,"🗺️ Peta Jalan (OSM)":c};g.default.control.layers(l,null,{position:`topright`}).addTo(o),g.default.control.scale({imperial:!1,position:`bottomleft`}).addTo(o),Se(o,n,r,a);let u=g.default.layerGroup().addTo(o);return Ce(u,i,t),be.set(e,{map:o,markersLayer:u,onSelectScene:t}),setTimeout(()=>{o.invalidateSize()},250),o}function Se(e,t,n,r){let i=g.default.divIcon({className:`main-ref-marker-icon`,html:`
      <div class="ref-location-pin" title="Lokasi Referensi Kawasan">
        <span class="ref-pin-core"></span>
        <span class="ref-pin-ring"></span>
      </div>
    `,iconSize:[30,30],iconAnchor:[15,15]});g.default.marker([t,n],{icon:i,zIndexOffset:1e3}).addTo(e).bindPopup(`
    <div class="location-popup-card">
      <div class="popup-badge ref-badge">📍 Titik Referensi Acuan</div>
      <h4>${r}</h4>
      <p style="font-size: 12px; margin-bottom: 6px;">
        <strong>Koordinat WGS84:</strong><br/>
        Latitude: <code>${t}° N</code><br/>
        Longitude: <code>${n}° E</code>
      </p>
      <p style="font-size: 11px; color: #6b7280; line-height: 1.4;">
        Koordinat ini digunakan sebagai titik acuan lokasi lapangan kawasan penanaman pohon ±2 hektare.
      </p>
    </div>
  `)}function Ce(e,t,n){e&&(e.clearLayers(),t.forEach(t=>{let r=t.status===`tersedia`,i=g.default.divIcon({className:`scene-marker-icon`,html:`
        <div class="scene-pin-badge ${r?`ready`:`pending`}" title="${t.name}">
          <span>${t.sequence}</span>
        </div>
      `,iconSize:[28,28],iconAnchor:[14,14]}),a=g.default.marker([t.latitude,t.longitude],{icon:i}).addTo(e);a.bindPopup(`
      <div class="location-popup-card">
        <div class="popup-badge">Titik ${t.sequence}</div>
        <h4>${t.name}</h4>
        <p style="font-size: 12px; color: #4b5563; margin-bottom: 8px;">
          ${t.description}
        </p>
        <div style="font-size: 11px; color: #6b7280; margin-bottom: 8px;">
          Status: <strong>${r?`✓ Foto Tersedia`:`⏳ Belum Tersedia`}</strong>
        </div>
        <button class="btn-popup-explore" data-target="${t.id}">
          🔄 Buka di Virtual Tour 360°
        </button>
      </div>
    `),a.on(`popupopen`,e=>{let r=e.popup.getElement();if(!r)return;let i=r.querySelector(`.btn-popup-explore`);i&&(i.onclick=()=>{typeof n==`function`&&n(t.id)})})}))}function we(){be.forEach(({map:e})=>{e&&setTimeout(()=>{e.invalidateSize(),e.setView([p.lokasiReferensi.latitude,p.lokasiReferensi.longitude],17)},200)})}function Te(e){return new Promise(t=>{let n=new Image;n.onload=()=>t(!0),n.onerror=()=>t(!1),n.src=e})}function Ee(e){De();let t=document.getElementById(`pano`);if(!t)return;let n=document.createElement(`div`);n.className=`empty-state`,n.id=`empty-state`,n.innerHTML=`
    <div class="empty-state-icon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    </div>
    <div style="display: inline-block; background: rgba(245, 158, 11, 0.15); color: #fbbf24; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; margin-bottom: 8px;">
      Titik ${e.sequence||`•`} • Status: Menunggu Pengambilan Foto Lapangan
    </div>
    <h3>${e.name}</h3>
    <p>
      Foto panorama 360° lapangan untuk titik ini belum tersedia.<br/>
      Ambil bola panorama menggunakan aplikasi <strong>Go Street View</strong> di HP Android, lalu simpan file di:<br/>
      <code>${e.panorama_path||e.panorama}</code><br/><br/>
      Format didukung: <strong>.jpg</strong>, <strong>.png</strong>, <strong>.webp</strong><br/>
      Rasio aspek wajib: <strong>2:1 (Equirectangular)</strong> • Rekomendasi: <strong>4096×2048 px</strong>
    </p>
    <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
      <a href="#beranda" class="btn-primary-action" style="padding: 8px 16px; font-size: 12px; text-decoration: none;">
        🌿 Kembali ke Beranda
      </a>
    </div>
  `,t.appendChild(n)}function De(){let e=document.getElementById(`empty-state`);e&&e.remove()}function Oe(e){let t=document.getElementById(`tour-scene-seq`),n=document.getElementById(`tour-scene-name`),r=document.getElementById(`tour-scene-desc`),i=document.getElementById(`tour-scene-gps`);t&&(t.textContent=`Titik ${e.sequence||`•`}`),n&&(n.textContent=e.name||`Virtual Tour 360°`),r&&(r.textContent=e.description||``),i&&e.latitude&&e.longitude&&(i.textContent=`Titik Acuan: ${e.latitude.toFixed(6)}° N, ${e.longitude.toFixed(6)}° E`)}function ke(e){return new Promise(t=>{let n=[],r=[];[`image/jpeg`,`image/png`,`image/webp`].includes(e.type)||n.push(`Format file "${e.type}" tidak didukung. Gunakan JPG (.jpg), PNG (.png), atau WebP (.webp).`);let i=e.size/1048576;i>25?r.push(`Ukuran file cukup besar (${i.toFixed(1)} MB). Pertimbangkan kompresi ke 4-10 MB untuk kecepatan koneksi seluler Android.`):i<.4&&r.push(`Ukuran file sangat kecil (${i.toFixed(2)} MB). Pastikan resolusi cukup tajam untuk panorama 360°.`);let a=URL.createObjectURL(e),o=new Image;o.onload=()=>{let e=o.naturalWidth,s=o.naturalHeight,c=e/s;Math.abs(c-2)<=.05||n.push(`Rasio aspek gambar adalah ${c.toFixed(2)}:1 (${e}×${s}px). Foto 360° equirectangular WAJIB memiliki rasio 2:1 (lebar tepat 2 kali tinggi). Foto ini kemungkinan adalah foto flat biasa, bukan bola panorama 360°.`),e<2048&&r.push(`Resolusi (${e}×${s}px) di bawah standar rekomendasi minimal 4096×2048px.`),URL.revokeObjectURL(a),t({valid:n.length===0,width:e,height:s,ratio:c,sizeMb:i,errors:n,warnings:r})},o.onerror=()=>{URL.revokeObjectURL(a),n.push(`Gagal membaca data gambar. File mungkin korup atau bukan gambar yang valid.`),t({valid:!1,width:0,height:0,ratio:0,sizeMb:i,errors:n,warnings:r})},o.src=a})}async function Ae(){let e=[];for(let t of i){let n=await Te(t.panorama);e.push({...t,liveExists:n,effectiveStatus:n?`tersedia`:`belum_tersedia`})}return e}function je(e,t){let n=document.getElementById(e);if(!n)return;n.innerHTML=`
    <div class="gsv-guide-wrapper">
      <div class="gsv-header">
        <div class="gsv-badge">📱 Panduan Lapangan Android</div>
        <h2>Integrasi Foto Go Street View ke Virtual Tour</h2>
        <p>
          Langkah demi langkah pengambilan foto bola 360° menggunakan aplikasi <strong>Go Street View</strong> di HP Android,
          verifikasi rasio equirectangular 2:1, dan pemetaan ke titik koordinat kawasan 2 hektare.
        </p>
      </div>

      <!-- Step Cards -->
      <div class="gsv-steps-grid">
        <div class="gsv-step-card">
          <div class="step-num">01</div>
          <h4>Pengambilan Foto di HP Android</h4>
          <p>
            Buka aplikasi Go Street View di titik survei. Berdirilah di satu titik poros dan putar HP mengikuti panduan titik oranye hingga seluruh bola panorama (360° horizontal & 180° vertikal) terhubung.
          </p>
          <div class="step-note">💡 Gunakan monopod atau pegang HP stabil setinggi dada.</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">02</div>
          <h4>Catat Koordinat & Urutan</h4>
          <p>
            Pastikan GPS aktif dengan akurasi tinggi. Cocokkan titik pengambilan dengan salah satu dari <strong>6 Titik Survei</strong> yang telah ditentukan pada tata letak kawasan.
          </p>
          <div class="step-note">📍 Titik 3 adalah patok acuan sentral (5.4818556° N, 95.5840917° E).</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">03</div>
          <h4>Uji Validasi Rasio 2:1</h4>
          <p>
            Gunakan kotak penguji di bawah untuk memeriksa apakah file foto yang diekspor dari HP memiliki rasio equirectangular 2:1 dan siap ditampilkan di Marzipano.
          </p>
          <div class="step-note">🔍 Validasi otomatis mendeteksi dimensi dan format.</div>
        </div>

        <div class="step-step-card gsv-step-card">
          <div class="step-num">04</div>
          <h4>Simpan ke Folder Tanpa Mengubah Kode</h4>
          <p>
            Pindahkan file ke folder <code>public/tours/titik-X/panorama.jpg</code>. Aplikasi secara instan mengganti placeholder menjadi panorama 360° aktif.
          </p>
          <div class="step-note">⚡ Tidak perlu kompilasi ulang atau ubah script!</div>
        </div>
      </div>

      <!-- Interactive Validator Dropzone -->
      <div class="gsv-validator-box">
        <h3>🔍 Alat Uji & Validasi Foto Panorama</h3>
        <p>Pilih foto hasil tangkapan Go Street View untuk menguji kompatibilitasnya sebelum dipindahkan ke proyek:</p>

        <div class="dropzone" id="gsv-dropzone">
          <input type="file" id="gsv-file-input" accept="image/jpeg,image/png,image/webp" style="display: none;" />
          <div class="dropzone-inner" id="dropzone-prompt">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <p><strong>Klik untuk memilih foto</strong> atau seret file ke sini</p>
            <span style="font-size: 12px; color: #6b7280;">Format: JPG, PNG, WebP (Rasio Wajib 2:1)</span>
          </div>
        </div>

        <div id="gsv-validation-result" class="gsv-result-box hidden"></div>
      </div>

      <!-- Status Matrix Table -->
      <div class="gsv-status-table-box">
        <h3>📊 Matriks Status Panorama Lapangan (6 Titik)</h3>
        <p>Status ketersediaan file panorama aktual pada direktori <code>public/tours/</code>:</p>
        <div class="table-responsive">
          <table class="status-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Titik</th>
                <th>Koordinat GPS</th>
                <th>Koneksi Hotspot</th>
                <th>Lokasi File</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="gsv-matrix-body">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;let r=n.querySelector(`#gsv-dropzone`),i=n.querySelector(`#gsv-file-input`),a=n.querySelector(`#gsv-validation-result`);r&&i&&(r.addEventListener(`click`,()=>i.click()),r.addEventListener(`dragover`,e=>{e.preventDefault(),r.classList.add(`dragover`)}),r.addEventListener(`dragleave`,()=>{r.classList.remove(`dragover`)}),r.addEventListener(`drop`,e=>{e.preventDefault(),r.classList.remove(`dragover`),e.dataTransfer.files.length>0&&Me(e.dataTransfer.files[0],a)}),i.addEventListener(`change`,e=>{e.target.files.length>0&&Me(e.target.files[0],a)})),Ne()}async function Me(e,t){t.classList.remove(`hidden`),t.innerHTML=`
    <div style="padding: 16px; text-align: center; color: #4b5563;">
      <div class="loading-spinner" style="width: 28px; height: 28px; margin: 0 auto 10px;"></div>
      Menganalisis resolusi, format, dan rasio aspek foto...
    </div>
  `;let n=await ke(e);t.innerHTML=n.valid?`
      <div class="alert-box success">
        <div class="alert-icon">✓</div>
        <div class="alert-content">
          <h4>Foto Valid Equirectangular 360°!</h4>
          <p>
            Dimensi: <strong>${n.width} × ${n.height} px</strong> (Rasio <strong>${n.ratio.toFixed(2)}:1</strong>)<br/>
            Ukuran Berkas: <strong>${n.sizeMb.toFixed(2)} MB</strong> (${e.type})
          </p>
          <div style="margin-top: 10px; padding: 10px; background: rgba(16, 185, 129, 0.1); border-radius: 6px;">
            <strong>Langkah Selanjutnya:</strong><br/>
            1. Tentukan untuk titik mana foto ini diambil (misal: Titik 1).<br/>
            2. Ganti nama file menjadi <code>panorama.jpg</code>.<br/>
            3. Simpan di: <code>public/tours/titik-X/panorama.jpg</code>.
          </div>
        </div>
      </div>
    `:`
      <div class="alert-box error">
        <div class="alert-icon">✕</div>
        <div class="alert-content">
          <h4>Foto Tidak Memenuhi Standar Panorama 360°</h4>
          <ul style="margin: 8px 0 8px 16px; font-size: 13px;">
            ${n.errors.map(e=>`<li>${e}</li>`).join(``)}
          </ul>
          <p style="font-size: 12px; color: #6b7280;">
            Solusi: Pastikan foto diambil dalam mode 360° Sphere pada aplikasi Go Street View, bukan foto panorama panorama horizontal biasa.
          </p>
        </div>
      </div>
    `}async function Ne(){let e=document.getElementById(`gsv-matrix-body`);e&&(e.innerHTML=(await Ae()).map(e=>{let t=e.liveExists;return`
        <tr>
          <td style="font-weight: 700; color: #10b981;">#${e.sequence}</td>
          <td><strong>${e.name}</strong></td>
          <td style="font-family: monospace; font-size: 12px;">${e.latitude.toFixed(6)}°, ${e.longitude.toFixed(6)}°</td>
          <td><span style="font-size: 12px; color: #6b7280;">Terhubung ke: ${e.connected_points?.join(`, `)||e.hotspots?.filter(e=>e.type===`link`).map(e=>e.target).join(`, `)||`-`}</span></td>
          <td><code style="font-size: 11px;">${e.panorama_path}</code></td>
          <td>
            <span class="status-pill ${t?`ready`:`pending`}">
              ${t?`✓ Tersedia`:`⏳ Belum Tersedia`}
            </span>
          </td>
        </tr>
      `}).join(``))}var v=[],Pe=null,Fe=`public-tree-catalog-container`,y=null,Ie=null;function b(){Ie&&=(clearInterval(Ie),null)}var x=``,S=`all`,C=`all`,w=-1,T=[],Le=null,Re=!1;async function ze(e=`public-tree-catalog-container`,t=null,n=null){Fe=e,Pe=t;let r=Be();y=n||r||null,window._treeCatalogHashBound||(window._treeCatalogHashBound=!0,window.addEventListener(`hashchange`,()=>{if((window.location.hash||``).startsWith(`#katalog`)){let e=Be();e!==y&&(b(),y=e,He())}else b()})),await Ve()}function Be(){let e=window.location.hash||``;if(!e.startsWith(`#katalog`))return null;let[t,n]=e.replace(/^#\/?/,``).trim().split(`?`),r=new URLSearchParams(n||``);if(r.get(`species`))return r.get(`species`).trim();if(t&&t.startsWith(`katalog/`)){let e=t.slice(8).trim();if(e)return e}if(t&&t.startsWith(`katalog-pohon/`)){let e=t.slice(14).trim();if(e)return e}return null}async function Ve(){let e=document.getElementById(Fe);if(e){e.innerHTML=`
    <div class="catalog-wrapper">
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 340px; gap: 14px; color: var(--clr-text-muted);">
        <span class="loading-spinner"></span>
        <span style="font-size: 14px;">Memuat data katalog jenis pohon restorasi...</span>
      </div>
    </div>
  `;try{v=(await l.getPublicTreeSpecies()).species||[],He()}catch(t){e.innerHTML=`
      <div class="catalog-wrapper">
        <div style="padding: 32px 24px; text-align: center; background: rgba(239, 68, 68, 0.08); border-radius: var(--radius-md); border: 1px solid rgba(239, 68, 68, 0.25);">
          <span style="font-size: 36px; display: block; margin-bottom: 8px;">⚠️</span>
          <h3 style="color: var(--clr-danger); font-size: 18px; margin-bottom: 6px;">Gagal Memuat Katalog Jenis Pohon</h3>
          <p style="font-size: 13px; color: var(--clr-text-muted); max-width: 500px; margin: 0 auto 16px;">${O(t.message||`Terjadi gangguan saat menghubungi server basis data.`)}</p>
          <button id="btn-retry-catalog" class="btn-primary-action btn-sm">Coba Muat Ulang</button>
        </div>
      </div>
    `,document.getElementById(`btn-retry-catalog`)?.addEventListener(`click`,()=>Ve())}}}function He(){b();let e=document.getElementById(Fe);if(e){if(y){let t=v.find(e=>String(e.id).toLowerCase()===String(y).toLowerCase());t?Ze(e,t):Qe(e,y)}else Ue(e)}}function Ue(e){let t=[...new Set(v.map(e=>e.family).filter(Boolean))].sort();e.innerHTML=`
    <div class="catalog-wrapper">
      <!-- Section Header Hero Banner -->
      <div class="hero-section text-center relative overflow-hidden" style="padding: 32px 24px; margin-bottom: 28px; background: radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.14) 0%, rgba(10, 24, 20, 0.8) 75%); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.6);">
        <div class="hero-badge" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--clr-primary-light); margin-bottom: 12px;">
          <span>🌳</span> Flora & Silvikultur Kawasan
        </div>
        <h1 class="hero-title" style="font-size: 30px; font-weight: 800; color: #ffffff; margin-bottom: 12px; line-height: 1.25;">
          Katalog Jenis Pohon Kawasan Restorasi
        </h1>
        <p class="hero-subtitle" style="font-size: 14px; line-height: 1.65; color: #cbd5e1; max-width: 860px; margin: 0 auto; text-align: center;">
          Dokumentasi jenis pohon yang terdaftar dan ditanam dalam kegiatan restorasi kawasan. Katalog ini menyajikan informasi setiap spesies, dilengkapi foto dokumentasi, nama ilmiah, jumlah bibit yang ditanam, serta kondisi kelangsungan hidup berdasarkan catatan penanaman dan hasil survei lapangan yang terverifikasi.
        </p>
      </div>

      <!-- Filters & Search Toolbar (Mengikuti gaya & struktur .gallery-filter-bar pada #galeri) -->
      <div class="gallery-filter-bar">
        <!-- 1. Search Box -->
        <div class="gallery-search-box">
          <span class="gallery-search-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            id="catalog-search-input"
            placeholder="Cari nama umum, ilmiah, lokal, famili..."
            class="gallery-search-field"
            value="${O(x)}"
            autocomplete="off"
            aria-label="Pencarian jenis pohon"
          />
          <button id="catalog-search-clear" class="gallery-search-clear" style="display: ${x?`flex`:`none`};" title="Hapus pencarian">✕</button>
        </div>

        <!-- 2. Controls Group -->
        <div class="gallery-filters-group">
          <!-- Status Asal Pill -->
          <div class="gallery-filter-pill" title="Filter berdasarkan status asal pohon">
            <span class="gallery-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <span class="gallery-pill-label">Status:</span>
            <select id="catalog-filter-origin" class="gallery-pill-select" aria-label="Filter Status Asal">
              <option value="all" ${S===`all`?`selected`:``}>Semua Status</option>
              <option value="lokal_asli" ${S===`lokal_asli`?`selected`:``}>Jenis Asli / Lokal</option>
              <option value="introduksi" ${S===`introduksi`?`selected`:``}>Jenis Introduksi</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Famili Pill -->
          ${t.length>0?`
            <div class="gallery-filter-pill" title="Filter berdasarkan famili botani">
              <span class="gallery-pill-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <circle cx="7" cy="7" r="1.5"></circle>
                </svg>
              </span>
              <span class="gallery-pill-label">Famili:</span>
              <select id="catalog-filter-family" class="gallery-pill-select" aria-label="Filter Famili">
                <option value="all" ${C===`all`?`selected`:``}>Semua Famili</option>
                ${t.map(e=>`<option value="${O(e)}" ${C===e?`selected`:``}>${O(e)}</option>`).join(``)}
              </select>
              <span class="gallery-pill-chevron">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </div>
          `:``}

          <!-- Counter Badge & Reset Button (Meta Group) -->
          <div class="gallery-filters-meta">
            <span class="gallery-count-badge" id="catalog-counter-badge" title="Total spesies ditampilkan">
              ${v.length} Spesies
            </span>

            <button id="catalog-reset-filters" class="gallery-reset-btn" style="display: ${Ge()?`inline-flex`:`none`};" title="Reset filter & pencarian">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Grid Kartu Spesies -->
      <div id="catalog-species-grid" style="min-height: 280px;">
        <!-- Populated via applyCatalogFilters -->
      </div>
    </div>
  `,We(),E()}function We(){let e=document.getElementById(`catalog-search-input`),t=document.getElementById(`catalog-search-clear`),n=document.getElementById(`catalog-filter-origin`),r=document.getElementById(`catalog-filter-family`),i=document.getElementById(`catalog-reset-filters`);e?.addEventListener(`input`,e=>{x=e.target.value.toLowerCase().trim(),t&&(t.style.display=x?`flex`:`none`),E()}),t?.addEventListener(`click`,()=>{e&&(e.value=``,x=``,t.style.display=`none`,e.focus(),E())}),n?.addEventListener(`change`,e=>{S=e.target.value,E()}),r?.addEventListener(`change`,e=>{C=e.target.value,E()}),i?.addEventListener(`click`,()=>{x=``,S=`all`,C=`all`,e&&(e.value=``),t&&(t.style.display=`none`),n&&(n.value=`all`),r&&(r.value=`all`),E()})}function Ge(){return x.length>0||S!==`all`||C!==`all`}function E(){let e=document.getElementById(`catalog-species-grid`),t=document.getElementById(`catalog-counter-badge`),n=document.getElementById(`catalog-reset-filters`);if(!e)return;let r=v.filter(e=>{if(S!==`all`&&e.origin_status!==S||C!==`all`&&e.family!==C)return!1;if(x){let t=(e.common_name||``).toLowerCase().includes(x),n=(e.scientific_name||``).toLowerCase().includes(x),r=(e.local_name||``).toLowerCase().includes(x),i=(e.family||``).toLowerCase().includes(x);if(!t&&!n&&!r&&!i)return!1}return!0});t&&(t.textContent=`${r.length} dari ${v.length} Spesies`),n&&(n.style.display=Ge()?`inline-flex`:`none`),r.length===0?(e.innerHTML=`
      <div style="padding: 60px 24px; text-align: center; background: rgba(11, 20, 16, 0.6); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 16px;">
        <span style="font-size: 42px; display: block; margin-bottom: 12px;">🌱</span>
        <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px;">Jenis pohon tidak ditemukan</h3>
        <p style="font-size: 13.5px; color: var(--clr-text-muted); max-width: 480px; margin: 0 auto 18px; line-height: 1.5;">
          ${Ge()?`Tidak ada jenis pohon yang sesuai dengan kriteria pencarian dan filter Anda saat ini.`:`Belum ada data master jenis pohon yang dipublikasikan dalam sistem.`}
        </p>
        ${Ge()?`
          <button id="btn-empty-reset" class="btn-secondary-action btn-sm">Tampilkan Semua Jenis Pohon</button>
        `:``}
      </div>
    `,document.getElementById(`btn-empty-reset`)?.addEventListener(`click`,()=>{x=``,S=`all`,C=`all`;let e=document.getElementById(`catalog-search-input`),t=document.getElementById(`catalog-filter-origin`),n=document.getElementById(`catalog-filter-family`);e&&(e.value=``),t&&(t.value=`all`),n&&(n.value=`all`),E()})):(e.innerHTML=`
    <div class="catalog-species-grid-inner">
      ${r.map(e=>qe(e)).join(``)}
    </div>
  `,e.querySelectorAll(`.btn-view-species-profile`).forEach(e=>{e.addEventListener(`click`,()=>{Ye(e.getAttribute(`data-id`))})}))}function Ke(e){if(!e||typeof e!=`string`||(e=e.trim(),!e))return``;if(e.startsWith(`http://`)||e.startsWith(`https://`))return e;for(e=e.replace(/^.*?\/storage\/app\/public\//,``);e.startsWith(`/storage/storage/`);)e=e.replace(`/storage/storage/`,`/storage/`);for(;e.startsWith(`/public/storage/`);)e=e.replace(`/public/storage/`,`/storage/`);return e.startsWith(`/storage/`)?e:e.startsWith(`storage/`)?`/`+e:e.startsWith(`/`)?e.startsWith(`/demo/`)?`/storage`+e:e:`/storage/`+e}function qe(e){let t=e.origin_status_label||(e.origin_status===`lokal_asli`?`Jenis Asli / Lokal`:`Jenis Introduksi`);e.origin_status;let n=!!(e.photo_path&&e.photo_path.trim()),r=n?Ke(e.photo_path):``,i=`Data belum tersedia`,a=`var(--clr-text-muted)`;return e.has_planted_data&&e.total_planted!==null&&e.total_planted>0?(i=`${D(e.total_planted)} bibit ditanam`,a=`var(--clr-primary-light)`):e.has_planted_data&&e.total_planted===0&&(i=`0 bibit tercatat`),`
    <div class="point-card catalog-card group" style="display: flex; flex-direction: column; justify-content: space-between; background: rgba(15, 28, 22, 0.88); border: 1px solid rgba(16, 185, 129, 0.18); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;">
      <div>
        <!-- Bagian Foto Dokumentasi -->
        <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; background: #070d0a;">
          ${n?`
            <img
              src="${r}"
              alt="Dokumentasi ${O(e.common_name)} (${O(e.scientific_name)})"
              loading="lazy"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
              onerror="this.parentElement.innerHTML = getNeutralPhotoPlaceholderHtml();"
            />
          `:Je()}

          <!-- Badge Status Asal (Overlay) -->
          <div style="position: absolute; top: 12px; left: 12px; z-index: 2;">
            <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
              ${O(t)}
            </span>
          </div>
        </div>

        <!-- Konten Informasi Pohon -->
        <div style="padding: 18px 20px 14px;">
          <!-- Nama Umum & Nama Ilmiah -->
          <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 4px; line-height: 1.3;">
            ${O(e.common_name)}
          </h2>

          <div style="font-size: 13px; font-style: italic; color: var(--clr-primary-light); font-weight: 500; margin-bottom: 10px;">
            ${O(e.scientific_name)}
          </div>

          <!-- Metadata Lokal & Famili -->
          <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px; font-size: 12.5px;">
            <div style="color: var(--clr-text-muted);">
              <span style="color: var(--clr-text-dim);">Nama Daerah:</span>
              <strong style="color: #e2e8f0; font-weight: 500;">${O(e.local_name||`Data belum tersedia`)}</strong>
            </div>
            ${e.family?`
              <div style="color: var(--clr-text-muted);">
                <span style="color: var(--clr-text-dim);">Famili:</span>
                <span style="color: #cbd5e1;">${O(e.family)}</span>
              </div>
            `:``}
          </div>

          <!-- Kuantitas Penanaman (Faktual) -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(0, 0, 0, 0.3); border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.06); margin-bottom: 14px;">
            <div style="font-size: 11px; color: var(--clr-text-dim); text-transform: uppercase; font-weight: 600;">Bibit Ditanam</div>
            <div style="font-size: 13px; font-weight: 700; color: ${a};">
              ${i}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Tombol Aksi -->
      <div style="padding: 12px 20px 16px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: flex-end; align-items: center;">
        <button
          type="button"
          class="btn-view-species-profile btn-secondary-action btn-sm"
          data-id="${O(e.id)}"
          style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; padding: 9px 16px; border-radius: 10px; background: rgba(16, 185, 129, 0.12); color: #ecfdf5; border: 1px solid rgba(16, 185, 129, 0.3); cursor: pointer; transition: all 0.2s ease;"
        >
          Lihat Profil Jenis Pohon <span>→</span>
        </button>
      </div>
    </div>
  `}function Je(){return`
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(6, 12, 10, 0.95) 100%); color: var(--clr-text-dim); padding: 16px;">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.6; margin-bottom: 6px; color: var(--clr-primary-light);">
        <path d="M12 2a9 9 0 0 0-9 9c0 4.1 2.8 7.6 6.7 8.6L12 22l2.3-2.4C18.2 18.6 21 15.1 21 11a9 9 0 0 0-9-9z"></path>
        <path d="M12 7v10"></path>
        <path d="M8 11l4-4 4 4"></path>
      </svg>
      <span style="font-size: 12px; font-weight: 500; color: #94a3b8;">Foto belum tersedia</span>
      <span style="font-size: 10.5px; color: #64748b; margin-top: 2px;">Menunggu verifikasi dokumentasi lapangan</span>
    </div>
  `}function Ye(e){b(),y=e,window.location.hash=`#katalog?species=${encodeURIComponent(e)}`,window.scrollTo({top:0,behavior:`smooth`}),He()}function Xe(){b(),y=null,window.location.hash=`#katalog`,window.scrollTo({top:0,behavior:`smooth`}),He()}function Ze(e,t){let n=t.origin_status_label||(t.origin_status===`lokal_asli`?`Jenis Asli / Lokal`:`Jenis Introduksi`);t.origin_status;let r=t.photo_path&&t.photo_path.trim()?Ke(t.photo_path):``,i=(Array.isArray(t.gallery_photos)&&t.gallery_photos.length>0?t.gallery_photos:r?[r]:[]).map(e=>Ke(e)).filter(Boolean),o=i.length>0,s=t.plantings||[],c=t.has_planted_data&&t.total_planted!==null&&t.total_planted>0,l=c?`${D(t.total_planted)} bibit (batang)`:`Data belum tersedia`,u=t.latest_survey;if(e.innerHTML=`
    <div class="catalog-wrapper catalog-detail-page">
      <!-- Breadcrumb & Tombol Kembali -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
        <nav aria-label="Breadcrumb" style="font-size: 13px; color: var(--clr-text-muted); display: flex; align-items: center; gap: 8px;">
          <button id="btn-breadcrumb-back" class="btn-text-btn" style="color: var(--clr-primary-light); text-decoration: none; background: none; border: none; cursor: pointer; padding: 0; font-size: 13px; font-weight: 500;">
            ← Katalog Jenis Pohon
          </button>
          <span style="color: var(--clr-text-dim);">/</span>
          <span style="color: #f8fafc; font-weight: 600;">${O(t.common_name)}</span>
        </nav>

        <button
          id="btn-back-to-catalog"
          type="button"
          class="btn-secondary-action btn-sm"
          style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; padding: 7px 14px; border-radius: 8px; cursor: pointer;"
        >
          <span>←</span> Kembali ke Katalog Jenis Pohon
        </button>
      </div>

      <!-- Header Hero Profil Spesies -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px; background: rgba(15, 28, 22, 0.85); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 20px; padding: 24px; margin-bottom: 28px; box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.6);">
        <!-- Kolom Kiri: Foto Dokumentasi (Auto Slider) -->
        <div>
          ${o?i.length===1?`
            <div
              class="catalog-photo-zoomable"
              data-photo-index="0"
              style="width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: #070d0a; border: 1px solid rgba(255, 255, 255, 0.1); position: relative; cursor: pointer;"
              title="Klik untuk melihat foto dalam layar penuh (fullscreen lightbox)"
            >
              <img
                src="${O(i[0])}"
                alt="Foto Dokumentasi ${O(t.common_name)} (${O(t.scientific_name)})"
                style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;"
                onerror="this.parentElement.innerHTML = getNeutralPhotoPlaceholderHtml();"
              />
              <div style="position: absolute; top: 12px; left: 12px; z-index: 5;">
                <span style="font-size: 11px; padding: 4px 12px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
                  ${O(n)}
                </span>
              </div>
              <!-- Hint Icon Zoom Fullscreen (Kanan Bawah) -->
              <div style="position: absolute; bottom: 12px; right: 12px; z-index: 5; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 4px 8px; display: flex; align-items: center; gap: 5px; color: #e2e8f0; font-size: 11px; font-weight: 600; pointer-events: none;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <span>Perbesar</span>
              </div>
            </div>
          `:`
            <div id="catalog-species-slider-box" style="width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: #070d0a; border: 1px solid rgba(255, 255, 255, 0.1); position: relative; user-select: none;">
              ${i.map((e,n)=>`
                <div
                  class="catalog-slide-item catalog-photo-zoomable"
                  data-photo-index="${n}"
                  style="position: absolute; inset: 0; opacity: ${n===0?`1`:`0`}; transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1); pointer-events: ${n===0?`auto`:`none`}; z-index: ${n===0?`2`:`1`}; cursor: pointer;"
                  title="Klik untuk melihat foto dalam layar penuh (fullscreen lightbox)"
                >
                  <img
                    src="${O(e)}"
                    alt="Foto Dokumentasi ${O(t.common_name)} (${n+1}/${i.length})"
                    style="width: 100%; height: 100%; object-fit: cover;"
                    onerror="this.src='/favicon.svg'"
                  />
                </div>
              `).join(``)}

              <!-- Badge Asal Spesies (Kiri Atas) -->
              <div style="position: absolute; top: 12px; left: 12px; z-index: 10;">
                <span style="font-size: 11px; padding: 4px 12px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
                  ${O(n)}
                </span>
              </div>

              <!-- Counter Foto & Hint Zoom (Kanan Atas) -->
              <div style="position: absolute; top: 12px; right: 12px; z-index: 10; display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 11px; padding: 3px 8px; border-radius: 9999px; font-weight: 600; background: rgba(0,0,0,0.75); color: #34d399; border: 1px solid rgba(52,211,153,0.3); backdrop-filter: blur(4px); box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 4px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  <span>Klik Layar Penuh</span>
                </span>
                <span id="catalog-species-photo-counter" style="font-size: 11px; padding: 3px 10px; border-radius: 9999px; font-weight: 600; background: rgba(0,0,0,0.75); color: #fff; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(4px); box-shadow: 0 2px 8px rgba(0,0,0,0.5);">
                  1 / ${i.length} Foto
                </span>
              </div>

              <!-- Tombol Navigasi Kiri / Kanan -->
              <button
                type="button"
                id="btn-slider-prev"
                aria-label="Foto Sebelumnya"
                style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 20px; line-height: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; backdrop-filter: blur(4px); transition: all 0.2s;"
              >‹</button>
              <button
                type="button"
                id="btn-slider-next"
                aria-label="Foto Berikutnya"
                style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); width: 34px; height: 34px; border-radius: 50%; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 20px; line-height: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; backdrop-filter: blur(4px); transition: all 0.2s;"
              >›</button>

              <!-- Titik Indikator Slide (Bawah Tengah) -->
              <div style="position: absolute; bottom: 12px; left: 0; right: 0; display: flex; justify-content: center; align-items: center; gap: 6px; z-index: 10;">
                ${i.map((e,t)=>`
                  <button
                    type="button"
                    class="slider-dot-btn"
                    data-slide-target="${t}"
                    aria-label="Pindah ke foto ${t+1}"
                    style="width: ${t===0?`22px`:`8px`}; height: 8px; border-radius: 9999px; background: ${t===0?`#10b981`:`rgba(255,255,255,0.5)`}; border: none; padding: 0; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 1px 4px rgba(0,0,0,0.6);"
                  ></button>
                `).join(``)}
              </div>
            </div>
          `:`
            <div style="width: 100%; aspect-ratio: 4 / 3; border-radius: 14px; overflow: hidden; background: #070d0a; border: 1px solid rgba(255, 255, 255, 0.1); position: relative;">
              ${Je()}
              <div style="position: absolute; top: 12px; left: 12px; z-index: 5;">
                <span style="font-size: 11px; padding: 4px 12px; border-radius: 9999px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background: #000000; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.25); box-shadow: 0 2px 8px rgba(0,0,0,0.6); display: inline-block;">
                  ${O(n)}
                </span>
              </div>
            </div>
          `}
        </div>

        <!-- Kolom Kanan: Identitas & Metrik Faktual -->
        <div style="display: flex; flex-direction: column; justify-content: flex-start; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 20px;">🌿</span>
              <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--clr-primary-light); font-weight: 700;">
                Profil Spesies Restorasi
              </span>
            </div>

            <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; margin-bottom: 4px; line-height: 1.2;">
              ${O(t.common_name)}
            </h1>

            <div style="font-size: 16px; font-style: italic; color: var(--clr-primary-light); font-weight: 600;">
              ${O(t.scientific_name)} ${t.family?`<span style="font-style: normal; color: var(--clr-text-muted); font-size: 14px; font-weight: 400;">• Famili ${O(t.family)}</span>`:``}
            </div>
          </div>

          <!-- Tabel Identitas Ringkas -->
          <div style="background: rgba(0, 0, 0, 0.32); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 14px 16px; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; font-size: 13px;">
            <div>
              <span style="color: var(--clr-text-dim); display: block; font-size: 11px; text-transform: uppercase; font-weight: 600;">Nama Daerah / Lokal</span>
              <strong style="color: #f1f5f9; font-weight: 600;">${O(t.local_name||`Data belum tersedia`)}</strong>
            </div>
            <div>
              <span style="color: var(--clr-text-dim); display: block; font-size: 11px; text-transform: uppercase; font-weight: 600;">Klasifikasi Famili</span>
              <span style="color: #e2e8f0;">${O(t.family||`Data belum tersedia`)}</span>
            </div>
            <div>
              <span style="color: var(--clr-text-dim); display: block; font-size: 11px; text-transform: uppercase; font-weight: 600;">Status Asal Spesies</span>
              <span style="color: #e2e8f0;">${O(n)}</span>
            </div>
          </div>

          <!-- Posisi Box Faktual: Total Bibit Ditanam & Kegiatan Penanaman (di bawah) -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px;">
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 12px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <span style="font-size: 11px; color: var(--clr-text-muted); display: block; margin-bottom: 3px; font-weight: 500;">Total Bibit Ditanam</span>
              <strong style="font-size: 15px; color: ${c?`var(--clr-primary-light)`:`var(--clr-text-muted)`}; font-weight: 700;">
                ${l}
              </strong>
            </div>

            <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 10px; padding: 12px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <span style="font-size: 11px; color: var(--clr-text-muted); display: block; margin-bottom: 3px; font-weight: 500;">Kegiatan Penanaman</span>
              <strong style="font-size: 15px; color: #38bdf8; font-weight: 700;">
                ${s.length>0?`${s.length} Kegiatan Tercatat`:`Belum Ada`}
              </strong>
            </div>

            ${u&&u.scope===`spesies`?`
              <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 10px; padding: 12px 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block; margin-bottom: 3px; font-weight: 500;">Status Pemantauan</span>
                <strong style="font-size: 14px; color: #fcd34d; font-weight: 700;">
                  ${u.survival_rate===null?$e(u.health_condition||`Terpantau`):`Hidup ${u.survival_rate}%`}
                </strong>
              </div>
            `:``}
          </div>
        </div>
      </div>

      <!-- SEKSI 1: INFORMASI KEGIATAN PENANAMAN LAPANGAN -->
      <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span>🌱</span> Catatan Kegiatan Penanaman Lapangan
        </h2>
        <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 16px;">
          Rekam jejak resmi penanaman bibit di areal kawasan restorasi yang tercatat dalam sistem administrasi.
        </p>

        ${s.length>0?`
          <div style="overflow-x: auto;">
            <table class="data-table" style="width: 100%; font-size: 13px; border-collapse: collapse;">
              <thead>
                <tr style="color: var(--clr-text-dim); border-bottom: 1px solid rgba(255, 255, 255, 0.1); text-align: left; font-size: 11.5px; text-transform: uppercase;">
                  <th style="padding: 10px 12px;">Tanggal Tanam</th>
                  <th style="padding: 10px 12px;">Kelompok / Kegiatan</th>
                  <th style="padding: 10px 12px;">Lokasi & Kawasan</th>
                  <th style="padding: 10px 12px;">Jumlah Bibit</th>
                  <th style="padding: 10px 12px;">Asal / Sumber Bibit</th>
                  <th style="padding: 10px 12px;">Pelaksana</th>
                </tr>
              </thead>
              <tbody>
                ${s.map(e=>`
                  <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <td style="padding: 10px 12px; font-family: monospace; font-size: 12px; color: var(--clr-primary-light); white-space: nowrap;">
                      ${a(e.activity_date)}
                    </td>
                    <td style="padding: 10px 12px; font-weight: 600; color: #ffffff;">
                      ${O(e.activity_name||`-`)}
                    </td>
                    <td style="padding: 10px 12px; color: #cbd5e1;">
                      ${O(e.location_zone||e.zone_name||`-`)}
                    </td>
                    <td style="padding: 10px 12px; font-weight: 700; color: var(--clr-primary-light); white-space: nowrap;">
                      ${D(e.quantity)} ${O(e.unit||`batang`)}
                    </td>
                    <td style="padding: 10px 12px; color: var(--clr-text-muted); font-size: 12px;">
                      ${O(e.seed_source||`Data belum tersedia`)}
                    </td>
                    <td style="padding: 10px 12px; color: var(--clr-text-muted); font-size: 12px;">
                      ${O(e.organizer||e.person_in_charge||`-`)}
                    </td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          </div>
        `:`
          <div style="padding: 24px; text-align: center; background: rgba(0,0,0,0.2); border-radius: 10px; border: 1px dashed rgba(255,255,255,0.1); color: var(--clr-text-muted); font-size: 13px;">
            Belum ada catatan kegiatan penanaman di lapangan untuk spesies ini.
          </div>
        `}
      </div>

      ${u&&u.scope===`spesies`?`
        <!-- SEKSI 2: INFORMASI PEMANTAUAN & SENSUS LAPANGAN -->
        <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 22px; margin-bottom: 24px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>🔍</span> Catatan Pemantauan & Sensus Lapangan
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 16px;">
            Hasil pemeriksaan kondisi fisik tanaman, sensus kelangsungan hidup, dan catatan lapangan dari pengendali ekosistem.
          </p>

          <!-- Kartu Sensus Lapangan -->
          <div style="background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 18px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div>
                <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: var(--clr-primary-light); display: inline-flex; align-items: center; gap: 6px;">
                  <span>📋</span> ${O(u.scope_label||`Catatan Sensus Spesies`)}
                </span>
                <div style="font-size: 13px; color: #f8fafc; font-weight: 600; margin-top: 2px;">
                  Tanggal Survei: ${a(u.survey_date)}
                </div>
              </div>

              ${u.is_verified?`
                <span class="admin-header-pill pill-success" style="font-size: 11px; padding: 3px 10px; border-radius: 9999px;">
                  ✓ Sensus Terverifikasi
                </span>
              `:`
                <span class="admin-header-pill pill-warning" style="font-size: 11px; padding: 3px 10px; border-radius: 9999px;">
                  Dalam Proses Verifikasi
                </span>
              `}
            </div>

            <!-- Metrik Kondisi Fisik Sensus -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 14px;">
              <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Tanaman Hidup</span>
                <strong style="font-size: 18px; color: #6ee7b7;">${D(u.alive_count)}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">batang terdata</span>
              </div>

              <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Tanaman Mati</span>
                <strong style="font-size: 18px; color: #f87171;">${D(u.dead_count)}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">batang</span>
              </div>

              <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Tidak Ditemukan</span>
                <strong style="font-size: 18px; color: #fbbf24;">${D(u.missing_count)}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">hilang / belum terlacak</span>
              </div>

              <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px;">
                <span style="font-size: 11px; color: var(--clr-text-muted); display: block;">Kondisi Kesehatan</span>
                <strong style="font-size: 16px; color: #38bdf8;">${$e(u.health_condition||`Baik`)}</strong>
                <span style="font-size: 10.5px; color: var(--clr-text-dim); display: block;">keseluruhan</span>
              </div>
            </div>

            <!-- Penjelasan Metodologi & Transparansi Perhitungan -->
            ${u.survival_rate===null?``:`
              <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 12px 14px; margin-bottom: 12px; font-size: 12.5px; line-height: 1.5; color: #cbd5e1;">
                <div style="font-weight: 700; color: #6ee7b7; margin-bottom: 4px;">
                  📊 Tingkat Kelulusan Hidup (Survival Rate): ${u.survival_rate}%
                </div>
                <div>
                  <strong>Metode Perhitungan:</strong> Dihitung berdasarkan rumus baku silvikultur:
                  <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; color: #ecfdf5;">(Jumlah Tanaman Hidup ÷ Jumlah Bibit Awal Ditanam) × 100%</code>.
                  Tanaman yang hilang atau belum ditemukan tidak diikutsertakan sebagai tanaman mati tanpa verifikasi lanjutan.
                </div>
              </div>
            `}

            <!-- Petugas & Catatan Lapangan -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; font-size: 12.5px; color: var(--clr-text-muted); margin-top: 10px;">
              <div>
                <span style="color: var(--clr-text-dim); display: block; font-size: 11px;">Petugas Pemeriksa:</span>
                <span style="color: #f1f5f9; font-weight: 500;">${O(u.inspector_name||`Tim Lapangan IKHW`)}</span>
              </div>
              ${u.average_height_cm?`
                <div>
                  <span style="color: var(--clr-text-dim); display: block; font-size: 11px;">Tinggi & Diameter Rata-rata:</span>
                  <span style="color: #f1f5f9; font-weight: 500;">${u.average_height_cm} cm ${u.average_diameter_cm?`• Ø ${u.average_diameter_cm} cm`:``}</span>
                </div>
              `:``}
            </div>

            ${u.field_notes?`
              <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12.5px; color: #cbd5e1; line-height: 1.5;">
                <strong style="color: var(--clr-primary-light);">Catatan Lapangan:</strong> ${O(u.field_notes)}
              </div>
            `:``}
          </div>
        </div>
      `:``}

      <!-- SEKSI 3: DESKRIPSI MORFOLOGI, PERAN EKOLOGIS & MANFAAT -->
      <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span>📖</span> Deskripsi Botani & Peran Silvikultur
        </h2>
        <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 18px;">
          Karakteristik botani dan peranan penting spesies ini dalam pemulihan ekosistem kawasan.
        </p>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${t.description?`
            <div>
              <h3 style="font-size: 14px; font-weight: 700; color: var(--clr-primary-light); margin-bottom: 4px;">
                Morfologi & Karakter Spesies
              </h3>
              <p style="font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
                ${O(t.description)}
              </p>
            </div>
          `:``}

          ${t.ecological_function?`
            <div style="background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.18); border-radius: 12px; padding: 14px 16px;">
              <h3 style="font-size: 14px; font-weight: 700; color: var(--clr-primary-light); margin-bottom: 4px;">
                Peran & Fungsi Ekologis Kawasan
              </h3>
              <p style="font-size: 13.5px; line-height: 1.6; color: #ecfdf5;">
                ${O(t.ecological_function)}
              </p>
            </div>
          `:``}

          ${t.benefits?`
            <div>
              <h3 style="font-size: 14px; font-weight: 700; color: var(--clr-primary-light); margin-bottom: 4px;">
                Manfaat & Nilai Konservasi
              </h3>
              <p style="font-size: 13.5px; line-height: 1.6; color: #e2e8f0;">
                ${O(t.benefits)}
              </p>
            </div>
          `:``}

          ${!t.description&&!t.ecological_function&&!t.benefits?`
            <div style="font-size: 13px; color: var(--clr-text-muted); padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px;">
              Data deskripsi botani dan fungsi ekologis belum tercatat untuk spesies ini.
            </div>
          `:``}
        </div>
      </div>

      <!-- SEKSI 4: TAUTAN PANORAMA 360° (JIKA ADA) -->
      ${t.scenes&&t.scenes.length>0?`
        <div style="background: rgba(15, 28, 22, 0.7); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 16px; padding: 22px; margin-bottom: 28px;">
          <h2 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
            <span>📍</span> Lokasi Penanaman pada Virtual Tour 360°
          </h2>
          <p style="font-size: 13px; color: var(--clr-text-muted); margin-bottom: 14px;">
            Spesies pohon ini dapat dilihat secara interaktif pada titik-titik panorama 360° berikut:
          </p>
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            ${t.scenes.map(e=>`
              <button
                type="button"
                class="btn-jump-scene-detail btn-secondary-action btn-sm"
                data-scene-id="${O(e.scene_id)}"
                style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; font-size: 13px; font-weight: 600; border-radius: 10px; cursor: pointer;"
              >
                <span>🌐</span> ${O(e.scene_name||e.zone||e.scene_id)}
              </button>
            `).join(``)}
          </div>
        </div>
      `:``}

      <!-- Navigasi Bawah Halaman -->
      <div style="display: flex; justify-content: center; padding-top: 10px;">
        <button
          id="btn-bottom-back-to-catalog"
          type="button"
          class="btn-secondary-action"
          style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; padding: 10px 24px; border-radius: 12px; cursor: pointer;"
        >
          <span>←</span> Kembali ke Katalog Jenis Pohon
        </button>
      </div>
    </div>

    <!-- Fullscreen Lightbox Modal untuk Foto Spesies Pohon -->
    <div id="catalog-species-lightbox-modal" class="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl hidden flex flex-col justify-between select-none" role="dialog" aria-modal="true" aria-label="Penampil Foto Spesies Pohon">
      <!-- Lightbox Header -->
      <div class="lightbox-header-bar flex items-center justify-between px-5 sm:px-8 py-4 bg-slate-900/95 border-b border-white/10 text-white z-30 shrink-0">
        <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span class="text-xs sm:text-sm font-semibold text-white/90 hidden sm:inline-flex items-center gap-2">
            <span>🌳</span> Dokumentasi Spesies
          </span>
          <span class="text-slate-600 hidden sm:inline">•</span>
          <span id="catalog-lightbox-counter" class="text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">1 / 1</span>
          <span id="catalog-lightbox-badge" class="text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700">${O(n)}</span>
        </div>

        <div class="flex items-center gap-3">
          <kbd class="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
            <span>Navigasi</span> <span>←</span> <span>→</span> <span class="ml-1 font-bold text-slate-200">ESC</span>
          </kbd>
          <button id="btn-close-catalog-lightbox" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/25 text-slate-200 hover:text-rose-300 border border-white/15 hover:border-rose-500/40 transition-all cursor-pointer font-bold text-xs sm:text-sm" aria-label="Tutup penampil foto (Escape)">
            <span>Tutup</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Lightbox Main Stage -->
      <div class="relative flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer" id="catalog-lightbox-stage">
        <!-- Prev Button -->
        <button id="btn-catalog-lightbox-prev" class="absolute left-3 sm:left-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto sebelumnya (Panah Kiri)" title="Sebelumnya (←)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- Main Displayed Image Wrapper -->
        <div class="relative max-w-5xl w-full flex items-center justify-center cursor-default transition-transform duration-200" id="catalog-lightbox-img-wrapper">
          <div id="catalog-lightbox-spinner" class="absolute inset-0 flex items-center justify-center z-10 hidden">
            <span class="loading-spinner"></span>
          </div>
          <div class="relative inline-block max-w-full">
            <img id="catalog-lightbox-img" src="" alt="" class="max-h-[64vh] sm:max-h-[70vh] md:max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/15 transition-all duration-300 block" />
            
            <a
              id="catalog-lightbox-raw-btn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="lightbox-raw-btn absolute bottom-3.5 right-3.5 z-20 font-semibold text-slate-200 hover:text-white flex items-center gap-2 text-xs sm:text-sm active:scale-95 transition-all duration-200 cursor-pointer"
              title="Buka foto dalam resolusi penuh di tab baru"
            >
              <span>Resolusi Asli</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>

        <!-- Next Button -->
        <button id="btn-catalog-lightbox-next" class="absolute right-3 sm:right-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto berikutnya (Panah Kanan)" title="Berikutnya (→)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Bottom Info Bar -->
      <div class="lightbox-footer-bar px-5 sm:px-8 py-4 bg-slate-900/95 border-t border-white/10 text-white z-30 shrink-0">
        <div class="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 id="catalog-lightbox-title" class="text-base sm:text-lg font-bold text-white tracking-tight">${O(t.common_name)} (${O(t.scientific_name)})</h3>
            <p id="catalog-lightbox-caption" class="text-xs sm:text-sm text-slate-300 mt-0.5 line-clamp-2">${O(t.local_name?`Nama Daerah: ${t.local_name}`:`Foto dokumentasi resmi penanaman spesies pohon.`)}</p>
          </div>
          <div class="text-xs text-slate-400 shrink-0">
            ${t.family?`Famili: <strong class="text-slate-200">${O(t.family)}</strong>`:``}
          </div>
        </div>
      </div>
    </div>
  `,document.getElementById(`btn-breadcrumb-back`)?.addEventListener(`click`,Xe),document.getElementById(`btn-back-to-catalog`)?.addEventListener(`click`,Xe),document.getElementById(`btn-bottom-back-to-catalog`)?.addEventListener(`click`,Xe),i.length>1){let t=document.getElementById(`catalog-species-slider-box`),n=e.querySelectorAll(`.catalog-slide-item`),r=e.querySelectorAll(`.slider-dot-btn`),a=document.getElementById(`catalog-species-photo-counter`),o=document.getElementById(`btn-slider-prev`),s=document.getElementById(`btn-slider-next`),c=0;function l(e){c=e<0?i.length-1:e>=i.length?0:e,n.forEach((e,t)=>{t===c?(e.style.opacity=`1`,e.style.pointerEvents=`auto`,e.style.zIndex=`2`):(e.style.opacity=`0`,e.style.pointerEvents=`none`,e.style.zIndex=`1`)}),r.forEach((e,t)=>{t===c?(e.style.width=`22px`,e.style.background=`#10b981`):(e.style.width=`8px`,e.style.background=`rgba(255,255,255,0.5)`)}),a&&(a.textContent=`${c+1} / ${i.length} Foto`)}function u(){b(),Ie=setInterval(()=>{l(c+1)},3500)}function d(){u()}o?.addEventListener(`click`,e=>{e.stopPropagation(),l(c-1),d()}),s?.addEventListener(`click`,e=>{e.stopPropagation(),l(c+1),d()}),r.forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.getAttribute(`data-slide-target`),10);isNaN(n)||(l(n),d())})}),t&&(t.addEventListener(`mouseenter`,()=>{b()}),t.addEventListener(`mouseleave`,()=>{u()})),u()}e.querySelectorAll(`.catalog-photo-zoomable`).forEach(e=>{e.addEventListener(`click`,n=>{n.stopPropagation();let r=parseInt(e.getAttribute(`data-photo-index`)||`0`,10);et(t,i,isNaN(r)?0:r)})}),e.querySelectorAll(`.btn-jump-scene-detail`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);Pe&&t&&Pe(t)})})}function Qe(e,t){e.innerHTML=`
    <div class="catalog-wrapper" style="max-width: 800px; margin: 40px auto; padding: 40px 24px; text-align: center; background: rgba(15, 28, 22, 0.85); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 20px; box-shadow: 0 16px 36px -12px rgba(0,0,0,0.6);">
      <span style="font-size: 48px; display: block; margin-bottom: 12px;">🔍</span>
      <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
        Jenis Pohon Tidak Ditemukan
      </h2>
      <p style="font-size: 14px; color: var(--clr-text-muted); line-height: 1.6; max-width: 520px; margin: 0 auto 20px;">
        Spesies pohon dengan pengenal <code style="background: rgba(0,0,0,0.3); padding: 2px 8px; border-radius: 6px; color: #f87171;">${O(t)}</code> tidak ditemukan dalam basis data atau belum disetujui untuk publikasi oleh administrator.
      </p>
      <button
        id="btn-notfound-back"
        type="button"
        class="btn-primary-action"
        style="display: inline-flex; align-items: center; gap: 8px; font-weight: 600; font-size: 14px; padding: 10px 22px; border-radius: 10px; cursor: pointer;"
      >
        <span>←</span> Kembali ke Katalog Jenis Pohon
      </button>
    </div>
  `,document.getElementById(`btn-notfound-back`)?.addEventListener(`click`,Xe)}function D(e){if(e==null)return`-`;let t=Number(e);return isNaN(t)?String(e):t.toLocaleString(`id-ID`)}function $e(e){return e?String(e).charAt(0).toUpperCase()+String(e).slice(1):``}function et(e,t,n=0){if(!Array.isArray(t)||t.length===0)return;Le=e,T=t,w=n>=0&&n<t.length?n:0;let r=document.getElementById(`catalog-species-lightbox-modal`);r&&(r.classList.remove(`hidden`),document.body.style.overflow=`hidden`),it(),at()}function tt(){let e=document.getElementById(`catalog-species-lightbox-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``),w=-1,T=[],Le=null}function nt(){T.length<=1||(w=(w+1)%T.length,it())}function rt(){T.length<=1||(w=(w-1+T.length)%T.length,it())}function it(){if(w<0||w>=T.length)return;let e=T[w],t=document.getElementById(`catalog-lightbox-img`),n=document.getElementById(`catalog-lightbox-spinner`),r=document.getElementById(`catalog-lightbox-counter`),i=document.getElementById(`catalog-lightbox-raw-btn`),a=document.getElementById(`btn-catalog-lightbox-prev`),o=document.getElementById(`btn-catalog-lightbox-next`),s=T.length>1;a&&(a.style.display=s?`flex`:`none`),o&&(o.style.display=s?`flex`:`none`),r&&(r.textContent=`${w+1} / ${T.length}`),i&&(i.href=e||`#`),t&&(n&&n.classList.remove(`hidden`),t.onload=()=>{n&&n.classList.add(`hidden`)},t.onerror=()=>{n&&n.classList.add(`hidden`)},t.src=e,t.alt=Le?`Foto Dokumentasi ${Le.common_name}`:`Foto Spesies`)}function at(){Re||(Re=!0,document.getElementById(`btn-close-catalog-lightbox`)?.addEventListener(`click`,e=>{e.stopPropagation(),tt()}),document.getElementById(`btn-catalog-lightbox-prev`)?.addEventListener(`click`,e=>{e.stopPropagation(),rt()}),document.getElementById(`btn-catalog-lightbox-next`)?.addEventListener(`click`,e=>{e.stopPropagation(),nt()}),document.getElementById(`catalog-lightbox-stage`)?.addEventListener(`click`,e=>{e.target.id===`catalog-lightbox-stage`&&tt()}),document.addEventListener(`keydown`,e=>{let t=document.getElementById(`catalog-species-lightbox-modal`);t&&!t.classList.contains(`hidden`)&&(e.key===`Escape`?(e.preventDefault(),tt()):e.key===`ArrowRight`?(e.preventDefault(),nt()):e.key===`ArrowLeft`&&(e.preventDefault(),rt()))}))}function O(e){return e==null?``:String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}var k=[],A=null;function ot(e){let t=Number(e)||0;return t===0?`0 Hektare`:`${t.toLocaleString(`id-ID`,{minimumFractionDigits:0,maximumFractionDigits:4})} Hektare`}function st(e){let t=Number(e)||0;return t===0?`0 m²`:`${Math.round(t).toLocaleString(`id-ID`)} m²`}function ct(e){let t=document.getElementById(`stat-luas-label`),n=document.getElementById(`stat-luas`),r=document.getElementById(`stat-luas-desc`),i=document.getElementById(`stat-zones-label`),a=document.getElementById(`stat-zones-count`),o=document.getElementById(`stat-zones-desc`),s=document.getElementById(`stat-trees-label`),c=document.getElementById(`stat-trees-count`),l=document.getElementById(`stat-trees-desc`),u=document.getElementById(`stat-species-label`),d=document.getElementById(`stat-species-count`),f=document.getElementById(`stat-species-desc`);t&&(t.textContent=`Total Luas Kawasan`),i&&(i.textContent=`Jumlah Kawasan/Lahan`),s&&(s.textContent=`Bibit Awal Ditanam`),u&&(u.textContent=`Total Jenis Pohon`),f&&(f.textContent=`Spesies terdata di master database`);let p=0,m=0,h=0,ee=0,te=6;e&&typeof e==`object`&&(`total_area_ha`in e?(p=Number(e.total_area_ha)||0,m=Number(e.total_area_m2)||p*1e4,h=Number(e.total_zones)||0,ee=Number(e.total_trees??e.total_seedlings)||0,`total_species`in e&&(te=Number(e.total_species)||6)):Array.isArray(e)&&(h=e.length,p=e.reduce((e,t)=>{let n=t.area_in_ha===void 0?t.area_unit===`m2`?Number(t.area_size)/1e4:Number(t.area_size):Number(t.area_in_ha);return e+(isNaN(n)?0:n)},0),m=p*1e4,ee=e.reduce((e,t)=>e+(Number(t.total_initial_seedlings)||0),0))),n&&(n.textContent=ot(p)),r&&(r.textContent=st(m)),a&&(a.textContent=`${h} Kawasan`),o&&(o.textContent=`Total kawasan/lahan dalam sistem.`),c&&(c.textContent=`${ee.toLocaleString(`id-ID`)} Batang`),l&&(l.textContent=`Akumulasi seluruh kegiatan & lahan`),d&&(d.innerHTML=`<span class="stat-emoji" style="margin-right: 6px;">🌿</span>${te} Spesies`)}async function lt(){try{let e=await l.getPublicZones();e&&e.summary?ct(e.summary):e&&e.zones&&ct(e.zones)}catch(e){console.debug(`Error refreshing public total area:`,e)}}async function ut(e,t){let n=document.getElementById(e);if(n){A=t;try{let e=await l.getPublicZones();k=e&&e.zones?e.zones:[],e&&e.summary?ct(e.summary):ct(k)}catch(e){console.warn(`Gagal memuat kawasan publik:`,e),k=[]}dt(n),ft()}}function dt(e){!k||k.length===0?e.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(255,255,255,0.02); border-radius: 12px; border: 1px dashed var(--clr-border, #24352b);">
        <span style="font-size: 32px; display: block; margin-bottom: 8px;">🌱</span>
        <h4 style="margin: 0 0 6px 0; color: var(--clr-text, #e2e8f0);">Belum Ada Kawasan yang Dipublikasikan</h4>
        <p style="margin: 0; font-size: 13px; color: var(--clr-text-muted, #94a3b8);">Data kawasan penanaman akan segera tersedia setelah diverifikasi.</p>
      </div>
    `:(e.innerHTML=k.map(e=>{let t=e.latitude&&e.longitude,n=e.survival_rate!==null&&e.survival_rate!==void 0?`${Number(e.survival_rate).toFixed(1)}% Kelangsungan Hidup`:`Data survei belum lengkap`,r=e.survival_rate>=80?`text-emerald-400`:e.survival_rate>=50?`text-amber-400`:`text-slate-400`;return`
      <div class="point-card" style="display: flex; flex-direction: column; justify-content: space-between; border: 1px solid var(--clr-border, #24352b); background: var(--clr-surface, #14211a); border-radius: 12px; overflow: hidden; padding: 18px;">
        <div>
          <div class="point-card-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="point-sequence-badge" style="background: rgba(16, 185, 129, 0.15); color: #34d399; font-weight: 600; font-size: 11px; padding: 3px 8px; border-radius: 6px;">
              ${e.zone_code}
            </span>
            <span class="point-status-tag" style="background: rgba(59, 130, 246, 0.15); color: #60a5fa; font-size: 11px; padding: 3px 8px; border-radius: 6px;">
              ${j(e.category||`Kawasan Restorasi`)}
            </span>
          </div>

          <h3 class="point-title" style="margin: 0 0 8px 0; font-size: 17px; font-weight: 700; color: #fff;">
            ${j(e.name)}
          </h3>
          <p class="point-desc" style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 14px;">
            ${j(e.description||`Program restorasi vegetasi pohon dan pengayaan ekosistem.`)}
          </p>

          <!-- Metrics summary -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; background: rgba(0,0,0,0.25); padding: 10px; border-radius: 8px;">
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Luas Lahan</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${Number(e.area_size).toLocaleString(`id-ID`)} ${j(e.area_unit||`ha`)}
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Total Bibit Awal</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${Number(e.total_initial_seedlings||0).toLocaleString(`id-ID`)} Btg
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Jenis Spesies</span>
              <strong style="font-size: 13px; color: #e2e8f0;">
                ${e.species_count||0} Jenis
              </strong>
            </div>
            <div>
              <span style="display: block; font-size: 10px; color: #64748b; text-transform: uppercase;">Status Pantau</span>
              <strong style="font-size: 11px;" class="${r}">
                ${n}
              </strong>
            </div>
          </div>

          <div class="point-meta" style="font-size: 12px; color: #64748b; margin-bottom: 14px;">
            📍 ${j(e.city||e.address||`Provinsi Aceh`)}
            ${t?` • <span style="font-family: monospace;">${Number(e.latitude).toFixed(4)}° N, ${Number(e.longitude).toFixed(4)}° E</span>`:``}
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 10px;">
          <button class="btn-card-explore btn-public-zone-detail" data-zone-id="${e.id}" style="flex: 1; padding: 8px 12px; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
            ℹ️ Detail Kawasan
          </button>
          ${e.scenes_count>0?`
            <button class="btn-card-explore btn-public-zone-tour" data-zone-id="${e.id}" style="flex: 1; background: var(--clr-primary, #059669); color: white; padding: 8px 12px; font-size: 12px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
              🔄 Virtual Tour
            </button>
          `:``}
        </div>
      </div>
    `}).join(``),e.querySelectorAll(`.btn-public-zone-detail`).forEach(e=>{e.addEventListener(`click`,()=>{pt(e.getAttribute(`data-zone-id`))})}),e.querySelectorAll(`.btn-public-zone-tour`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=e.getAttribute(`data-zone-id`);try{let e=await l.getPublicZone(t);if(e.success&&e.zone&&e.zone.scenes&&e.zone.scenes.length>0){let t=e.zone.scenes[0];A&&A(t.id)}else window.location.hash=`tour`}catch{window.location.hash=`tour`}})}))}function ft(){let e=document.getElementById(`public-zone-modal`);e&&(e.querySelectorAll(`.btn-close-modal`).forEach(t=>{t.addEventListener(`click`,()=>{e.classList.add(`hidden`)})}),e.addEventListener(`click`,t=>{t.target===e&&e.classList.add(`hidden`)}))}async function pt(e){let t=document.getElementById(`public-zone-modal`),n=document.getElementById(`public-zone-modal-body`),r=document.getElementById(`public-zone-modal-title`),i=document.getElementById(`public-zone-modal-badge`);if(t&&n){t.classList.remove(`hidden`),n.innerHTML=`
    <div style="display: flex; justify-content: center; align-items: center; padding: 40px 0;">
      <span class="loading-spinner"></span> Memuat detail kawasan...
    </div>
  `;try{let a=await l.getPublicZone(e);if(!a.success||!a.zone){n.innerHTML=`<div class="alert alert-error">Gagal memuat detail kawasan penanaman.</div>`;return}let o=a.zone;r&&(r.textContent=o.name),i&&(i.textContent=`${o.zone_code} • ${o.category||`Kawasan Restorasi`}`);let s=o.survival_rate!==null&&o.survival_rate!==void 0?`${Number(o.survival_rate).toFixed(1)}%`:`Belum cukup data survei`;n.innerHTML=`
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- Banner Deskripsi -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 16px;">
          <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #34d399;">🌱 Ringkasan & Profil Lahan</h4>
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #cbd5e1; line-height: 1.6;">
            ${j(o.description||`Tidak ada keterangan tambahan.`)}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 12px; color: #94a3b8;">
            <div><strong>Tujuan Penanaman:</strong> ${j(o.planting_purpose||`Restorasi ekosistem`)}</div>
            <div><strong>Status Lahan:</strong> <span style="color: #38bdf8;">${j(o.status||`Aktif`)}</span></div>
          </div>
        </div>

        <!-- Metrik Faktual -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Luas Lahan Tercatat</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${Number(o.area_size).toLocaleString(`id-ID`)} ${j(o.area_unit||`ha`)}
            </div>
            <div style="font-size: 11px; color: #94a3b8;">(±${Number(o.area_in_ha).toFixed(2)} Hektare)</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Total Bibit Awal</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${Number(o.total_initial_seedlings||0).toLocaleString(`id-ID`)} Batang
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Data historis kegiatan</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Keanekaragaman</div>
            <div style="font-size: 15px; font-weight: 700; color: #e2e8f0; margin-top: 2px;">
              ${o.species_count||0} Spesies
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Komposisi pohon</div>
          </div>

          <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; border: 1px solid var(--clr-border, #24352b);">
            <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Kelangsungan Hidup</div>
            <div style="font-size: 15px; font-weight: 700; color: #34d399; margin-top: 2px;">
              ${s}
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Survei terverifikasi</div>
          </div>
        </div>

        <!-- Lokasi & Titik Acuan Referensi -->
        <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 14px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #e2e8f0;">📍 Lokasi Deskriptif</h4>
          <p style="margin: 0 0 6px 0; font-size: 13px; color: #94a3b8;">
            ${j([o.address,o.village,o.district,o.city,o.province].filter(Boolean).join(`, `)||`Provinsi Aceh`)}
          </p>
          ${o.latitude&&o.longitude?`
            <div style="font-size: 12px; color: #64748b;">
              Titik Acuan Lapangan (WGS84): <code style="color: #38bdf8;">${Number(o.latitude).toFixed(6)}° N, ${Number(o.longitude).toFixed(6)}° E</code>
            </div>
          `:`<div style="font-size: 12px; color: #64748b;">Titik koordinat acuan: Belum terverifikasi</div>`}
        </div>

        <!-- Daftar Jenis Pohon Tertanam -->
        <div>
          <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #e2e8f0;">🌳 Jenis Pohon Tertanam</h4>
          ${o.species_list&&o.species_list.length>0?`
            <table class="species-table" style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="border-bottom: 1px solid var(--clr-border, #24352b); text-align: left; color: #64748b;">
                  <th style="padding: 8px 6px;">Nama Lokal</th>
                  <th style="padding: 8px 6px;">Nama Ilmiah</th>
                  <th style="padding: 8px 6px; text-align: right;">Jumlah Bibit Awal</th>
                </tr>
              </thead>
              <tbody>
                ${o.species_list.map(e=>`
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                    <td style="padding: 8px 6px; font-weight: 600; color: #e2e8f0;">${j(e.local_name)}</td>
                    <td style="padding: 8px 6px; font-style: italic; color: #94a3b8;">${j(e.scientific_name)}</td>
                    <td style="padding: 8px 6px; text-align: right; color: #34d399; font-weight: 600;">
                      ${Number(e.total_quantity).toLocaleString(`id-ID`)} Batang
                    </td>
                  </tr>
                `).join(``)}
              </tbody>
            </table>
          `:`
            <div style="font-size: 13px; color: #64748b; font-style: italic; padding: 12px 0;">
              Belum ada pencatatan kelompok bibit pohon terdaftar untuk kawasan ini.
            </div>
          `}
        </div>

        <!-- Scene Panorama Terhubung -->
        <div>
          <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #e2e8f0;">🔄 Panorama 360° Terhubung (${o.scenes?o.scenes.length:0} Titik)</h4>
          ${o.scenes&&o.scenes.length>0?`
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
              ${o.scenes.map(e=>`
                <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--clr-border, #24352b); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <span style="font-size: 10px; color: #38bdf8; font-weight: 600;">Titik ${e.sequence}</span>
                    <h5 style="margin: 2px 0 8px 0; font-size: 13px; color: #e2e8f0;">${j(e.name)}</h5>
                  </div>
                  <button class="btn-primary-action btn-sm btn-open-scene-direct" data-scene-id="${e.id}" style="padding: 6px 10px; font-size: 11px; width: 100%; display: flex; justify-content: center; align-items: center; gap: 4px;">
                    👁️ Buka Panorama
                  </button>
                </div>
              `).join(``)}
            </div>
          `:`
            <div style="font-size: 13px; color: #64748b; font-style: italic; padding: 8px 0;">
              Belum ada titik panorama 360° yang dihubungkan ke kawasan ini.
            </div>
          `}
        </div>
      </div>
    `,n.querySelectorAll(`.btn-open-scene-direct`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.getAttribute(`data-scene-id`);t.classList.add(`hidden`),A?A(n):window.location.hash=`tour`})})}catch(e){n.innerHTML=`<div class="alert alert-error">Gagal menghubungi server: ${j(e.message)}</div>`}}}function j(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`):``}var M=[],mt=[],N=[],P=`all`,F=`all`,I=``,L=-1,ht=[],R=[],gt=!1,z=`albums`,B=null,_t=`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="375" viewBox="0 0 600 375" fill="%230b1511"><rect width="600" height="375" fill="%2307120e"/><rect x="4" y="4" width="592" height="367" rx="16" fill="none" stroke="%2310b981" stroke-width="1.5" stroke-opacity="0.25" stroke-dasharray="8 8"/><circle cx="230" cy="150" r="34" fill="%2310b981" fill-opacity="0.25"/><path d="M120 300l110-120 80 80 55-60 115 100H120z" fill="%2310b981" fill-opacity="0.18"/></svg>`;function vt(){let e=window.location.hash||``;if(!e.startsWith(`#galeri`)&&!e.startsWith(`#album`))return null;let[t,n]=e.replace(/^#\/?/,``).trim().split(`?`),r=new URLSearchParams(n||``);if(r.get(`album`))return r.get(`album`).trim();if(r.get(`id`))return r.get(`id`).trim();if(t.startsWith(`galeri/`)){let e=t.slice(7).trim().replace(/^album\//,``).trim();if(e)return e}if(t.startsWith(`album/`)){let e=t.slice(6).trim();if(e)return e}return null}async function yt(e=`public-gallery-container`,t=null){let n=document.getElementById(e);if(!n)return;let r=t||vt();if(window._galleryHashBound||(window._galleryHashBound=!0,window.addEventListener(`hashchange`,()=>{let e=window.location.hash||``;if(e.startsWith(`#galeri`)||e.startsWith(`#album`)){let e=vt();e?(!B||B.slug!==e&&String(B.id)!==String(e))&&xt(e,!1):z!==`albums`&&V(!1)}})),document.getElementById(`gallery-grid-container`)&&M.length>0){r?(!B||B.slug!==r&&String(B.id)!==String(r))&&await xt(r,!1):z!==`albums`&&V(!1);return}n.innerHTML=`
    <div class="gallery-wrapper">
      <!-- Section Header Hero Banner -->
      <div id="gallery-hero-banner" class="hero-section text-center relative overflow-hidden${r?` hidden`:``}" style="padding: 36px 24px 32px; margin-bottom: 28px;">
        <div class="hero-badge" style="margin-bottom: 14px;">
          <span>📸</span> Dokumentasi Visual &amp; Silvikultur Kawasan
        </div>
        <h1 class="hero-title" style="font-size: 34px; margin-bottom: 12px; font-weight: 800;">
          Galeri / Album
        </h1>
        <p class="hero-subtitle text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed text-center" style="margin-bottom: 0;">
          Dokumentasi visual perkembangan kawasan Rsorasi, pelaksanaan silvikultur, Pamantasan kelestarian berkala dan Kegiatan Lainnya.
        </p>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="gallery-filter-bar">
        <!-- 1. Search Box -->
        <div class="gallery-search-box">
          <span class="gallery-search-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            id="gallery-search-input"
            placeholder="Cari album, judul, keterangan..."
            class="gallery-search-field"
            autocomplete="off"
            aria-label="Pencarian galeri foto"
          />
          <button id="gallery-search-clear" class="gallery-search-clear" style="display: none;" title="Hapus pencarian">✕</button>
        </div>

        <!-- 2. Controls Group -->
        <div class="gallery-filters-group">
          <!-- Filter Kawasan -->
          <div class="gallery-filter-pill" title="Filter berdasarkan kawasan penanaman">
            <span class="gallery-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 3l4 8 5-5 5 15H2L8 3z"></path>
              </svg>
            </span>
            <span class="gallery-pill-label">Kawasan:</span>
            <select id="gallery-filter-zone" class="gallery-pill-select" aria-label="Filter Kawasan">
              <option value="all">Semua Kawasan</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Filter Kategori -->
          <div class="gallery-filter-pill" title="Filter berdasarkan kategori dokumentasi">
            <span class="gallery-pill-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <circle cx="7" cy="7" r="1.5"></circle>
              </svg>
            </span>
            <span class="gallery-pill-label">Kategori:</span>
            <select id="gallery-filter-category" class="gallery-pill-select" aria-label="Filter Kategori">
              <option value="all">Semua Kategori</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Counter Badge & Reset Button (Meta Group) -->
          <div class="gallery-filters-meta">
            <!-- Counter Badge -->
            <span class="gallery-count-badge" id="gallery-count-badge" title="Total yang ditampilkan">
              <span id="gallery-count-num">0</span> <span id="gallery-count-label">Album</span>
            </span>

            <!-- Reset Filter Button -->
            <button id="gallery-reset-btn" class="gallery-reset-btn" style="display: none;" title="Reset filter & pencarian">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Album Detail Container (hidden initially) -->
      <div id="gallery-album-back-bar" class="hidden" style="margin-bottom: 20px;">
        <div id="gallery-album-detail-info"></div>
      </div>

      <!-- Grid Container -->
      <div id="gallery-grid-container" class="min-h-[320px]">
        <div class="flex items-center justify-center py-24 text-slate-400 gap-3">
          <span class="loading-spinner"></span>
          <span class="text-sm font-medium">Memuat album galeri...</span>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal Container -->
    <div id="gallery-lightbox-modal" class="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl hidden flex flex-col justify-between select-none" role="dialog" aria-modal="true" aria-label="Penampil Foto Kawasan">
      <!-- Lightbox Header -->
      <div class="lightbox-header-bar flex items-center justify-between px-5 sm:px-8 py-4 bg-slate-900/95 border-b border-white/10 text-white z-30 shrink-0">
        <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span class="text-xs sm:text-sm font-semibold text-white/90 hidden sm:inline-flex items-center gap-2">
            <span>📸</span> Galeri Restorasi
          </span>
          <span class="text-slate-600 hidden sm:inline">•</span>
          <span id="lightbox-counter" class="text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/30">1 / 1</span>
          <span id="lightbox-category-badge" class="text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700">Kategori</span>
          <span id="lightbox-cover-badge" class="hidden text-xs sm:text-sm font-bold text-amber-950 bg-amber-400 px-3 py-1 rounded-lg border border-amber-300">⭐ Foto Sampul</span>
        </div>

        <div class="flex items-center gap-3">
          <kbd class="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
            <span>Navigasi</span> <span>←</span> <span>→</span> <span class="ml-1 font-bold text-slate-200">ESC</span>
          </kbd>
          <button id="btn-close-lightbox" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/25 text-slate-200 hover:text-rose-300 border border-white/15 hover:border-rose-500/40 transition-all cursor-pointer font-bold text-xs sm:text-sm" aria-label="Tutup penampil foto (Escape)">
            <span>Tutup</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      </div>

      <!-- Lightbox Main Stage -->
      <div class="relative flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden cursor-pointer" id="lightbox-stage">
        <!-- Prev Button -->
        <button id="btn-lightbox-prev" class="absolute left-3 sm:left-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto sebelumnya (Panah Kiri)" title="Sebelumnya (←)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <!-- Main Displayed Image Wrapper -->
        <div class="relative max-w-5xl w-full flex items-center justify-center cursor-default transition-transform duration-200" id="lightbox-img-wrapper">
          <div id="lightbox-loading-spinner" class="absolute inset-0 flex items-center justify-center z-10 hidden">
            <span class="loading-spinner"></span>
          </div>
          <div class="relative inline-block max-w-full">
            <img id="lightbox-img" src="" alt="" class="max-h-[64vh] sm:max-h-[70vh] md:max-h-[72vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/15 transition-all duration-300 block" />
            
            <!-- Raw resolution button positioned at bottom-right inside photo -->
            <a
              id="lightbox-raw-btn"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              class="lightbox-raw-btn absolute bottom-3.5 right-3.5 z-20 font-semibold text-slate-200 hover:text-white flex items-center gap-2 text-xs sm:text-sm active:scale-95 transition-all duration-200 cursor-pointer"
              title="Buka foto dalam resolusi penuh di tab baru"
            >
              <span>Resolusi Asli</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transition-transform duration-200 group-hover:translate-x-0.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
          <div id="lightbox-error-msg" class="hidden bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 shadow-2xl max-w-md">
            <span class="text-4xl mb-3 block">⚠️</span>
            <h4 class="font-bold text-white text-base">Gagal Memuat Gambar</h4>
            <p class="text-xs text-slate-400 mt-1.5 leading-relaxed">Berkas foto tidak dapat diakses atau belum tersedia di server.</p>
          </div>
        </div>

        <!-- Next Button -->
        <button id="btn-lightbox-next" class="absolute right-3 sm:right-8 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900/85 hover:bg-emerald-600/90 text-white border border-white/15 hover:border-emerald-400 shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer" aria-label="Foto berikutnya (Panah Kanan)" title="Berikutnya (→)">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <!-- Filmstrip Thumbnail Strip -->
      <div id="lightbox-thumb-strip" class="px-5 sm:px-8 py-3 bg-slate-950/85 border-t border-white/10 flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto z-20 shrink-0">
      </div>

    </div>
  `;try{N=(await l.getPublicZones()).zones||[];let e=document.getElementById(`gallery-filter-zone`);e&&N.length>0&&(e.innerHTML=`<option value="all">Semua Kawasan</option>`,N.forEach(t=>{let n=document.createElement(`option`);n.value=t.id,n.textContent=t.name,n.title=`${t.name} (${t.zone_code})`,e.appendChild(n)}))}catch(e){console.warn(`Gagal memuat kawasan untuk filter galeri:`,e)}await bt(r);let i=document.getElementById(`gallery-filter-zone`),a=document.getElementById(`gallery-filter-category`),o=document.getElementById(`gallery-search-input`),s=document.getElementById(`gallery-search-clear`),c=document.getElementById(`gallery-reset-btn`),u=document.getElementById(`gallery-back-to-albums`);i&&i.addEventListener(`change`,e=>{P=e.target.value,H()}),a&&a.addEventListener(`change`,e=>{F=e.target.value,H()}),o&&o.addEventListener(`input`,e=>{I=e.target.value.toLowerCase().trim(),H()}),s&&s.addEventListener(`click`,()=>{o&&(o.value=``,I=``,o.focus(),H())}),c&&c.addEventListener(`click`,()=>{Dt()}),u&&u.addEventListener(`click`,()=>{V(!0)}),Mt(),n.querySelectorAll(`.gallery-filter-pill`).forEach(e=>{e.addEventListener(`click`,t=>{let n=e.querySelector(`select`);if(n&&t.target!==n&&(n.focus(),typeof n.showPicker==`function`))try{n.showPicker()}catch{}})})}async function bt(e=null){let t=document.getElementById(`gallery-grid-container`);if(t)try{if(M=(await l.getPublicAlbums()).albums||[],M.length>0){Tt(M),Ct(M);let t=e||vt();t?await xt(t,!1):(z=`albums`,H())}else z=`photos`,mt=(await l.getAllPublicPhotos()).photos||[],Et(mt),wt(mt,N),H()}catch(e){console.error(`Error loading gallery:`,e),t.innerHTML=`
      <div class="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-8 text-center text-sm">
        <p class="font-semibold mb-1">Gagal memuat data galeri</p>
        <p class="text-xs text-red-300">${U(e.message)}</p>
      </div>
    `}}async function xt(e,t=!0){let n=document.getElementById(`gallery-grid-container`);if(n){n.innerHTML=`
    <div class="flex items-center justify-center py-24 text-slate-400 gap-3">
      <span class="loading-spinner"></span>
      <span class="text-sm font-medium">Memuat foto album kegiatan...</span>
    </div>
  `;try{if(B=(await l.getPublicAlbumDetail(e)).album,B.slug||B.id,z=`album-detail`,t){let e=`#galeri?album=${encodeURIComponent(B.slug||B.id)}`;window.location.hash!==e&&window.history.pushState(null,``,e)}R=(B.photos||[]).map(e=>({...e,zone:e.zone||B.zone||null}));let n=document.getElementById(`gallery-hero-banner`);n&&n.classList.add(`hidden`);let r=document.querySelector(`.gallery-filter-bar`);r&&r.classList.add(`hidden`),St(B);let i=document.getElementById(`gallery-count-num`),a=document.getElementById(`gallery-count-label`);i&&(i.textContent=R.length),a&&(a.textContent=`Foto`),jt()}catch(t){console.error(`Error loading album detail:`,t);let r=document.getElementById(`gallery-hero-banner`);r&&r.classList.add(`hidden`);let i=document.querySelector(`.gallery-filter-bar`);i&&i.classList.add(`hidden`),n.innerHTML=`
      <div class="bg-slate-900/80 border border-red-500/30 text-red-300 rounded-2xl p-8 text-center text-sm max-w-lg mx-auto shadow-xl my-8">
        <span class="text-4xl block mb-2">📁</span>
        <h4 class="font-bold text-white text-base mb-1">Album Tidak Ditemukan</h4>
        <p class="text-xs text-slate-400 mb-5 leading-relaxed">
          Album yang Anda tuju (<strong>${U(String(e))}</strong>) belum dipublikasikan atau tautan tidak valid.
        </p>
        <button id="btn-err-back-to-albums" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg transition-all cursor-pointer">
          ← Kembali ke Semua Album
        </button>
      </div>
    `;let a=document.getElementById(`btn-err-back-to-albums`);a&&a.addEventListener(`click`,()=>V(!0))}}}function V(e=!0){z=`albums`,B=null,e&&(window.location.hash.includes(`album=`)||window.location.hash.includes(`album/`))&&window.history.pushState(null,``,`#galeri`);let t=document.getElementById(`gallery-hero-banner`);t&&t.classList.remove(`hidden`);let n=document.querySelector(`.gallery-filter-bar`);n&&n.classList.remove(`hidden`);let r=document.getElementById(`gallery-album-back-bar`);r&&r.classList.add(`hidden`);let i=document.getElementById(`gallery-count-label`);i&&(i.textContent=`Album`),H()}function St(e){let t=document.getElementById(`gallery-album-back-bar`),n=document.getElementById(`gallery-album-detail-info`);if(t&&(t.classList.remove(`hidden`),n)){let t=e.zone?e.zone.name:``,r=e.activity_date?zt(e.activity_date):``,i=e.slug||e.id;`${window.location.origin+window.location.pathname.replace(/\/+$/,``)}${encodeURIComponent(i)}`,n.innerHTML=`
      <div class="gallery-album-header-card">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h2 class="gallery-album-header-title">
              📸 ${U(e.title)}
            </h2>
            ${e.description?`<p class="gallery-album-header-desc">${U(e.description)}</p>`:``}
            <div class="gallery-album-header-badges">
              ${t?`
                <span class="gallery-album-badge gallery-album-badge-zone">
                  🏞️ ${U(t)}
                </span>
              `:``}
              <span class="gallery-album-badge gallery-album-badge-category">
                ${U(e.category||`Dokumentasi`)}
              </span>
              ${r?`
                <span class="gallery-album-badge gallery-album-badge-date">
                  📅 ${r}
                </span>
              `:``}
              <span class="gallery-album-badge gallery-album-badge-count">
                ${e.photos_count||e.photos?.length||0} Foto
              </span>
            </div>
          </div>

          <!-- Back to All Albums Button -->
          <div class="gallery-album-header-actions flex items-center gap-2.5 shrink-0">
            <button
              id="gallery-back-to-albums"
              type="button"
              class="gallery-back-albums-btn"
              title="Kembali ke daftar semua album galeri"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span>Kembali ke Semua Album</span>
            </button>
          </div>
        </div>
      </div>
    `;let a=document.getElementById(`gallery-back-to-albums`);a&&a.addEventListener(`click`,()=>{V(!0)})}}function Ct(e){let t=document.getElementById(`gallery-stat-total`),n=document.getElementById(`gallery-stat-zones`),r=document.getElementById(`gallery-stat-categories`);if(t&&(t.textContent=`${e.length} Album Kegiatan`),n&&(n.textContent=`${new Set(e.map(e=>e.planting_zone_id).filter(Boolean)).size||N.length||1} Kawasan Restorasi`),r){let t=new Set(e.map(e=>e.category).filter(Boolean)).size;r.textContent=`${t>0?t:`7`} Kategori`}}function wt(e,t){let n=document.getElementById(`gallery-stat-total`),r=document.getElementById(`gallery-stat-zones`),i=document.getElementById(`gallery-stat-categories`);if(n&&(n.textContent=`${e.length} Foto Dokumentasi`),r&&(r.textContent=`${new Set(e.map(e=>e.planting_zone_id).filter(Boolean)).size||t.length||1} Kawasan Restorasi`),i){let t=new Set(e.map(e=>e.category).filter(Boolean)).size;i.textContent=`${t>0?t:`7`} Kategori Silvikultur`}}function Tt(e){let t=document.getElementById(`gallery-filter-category`);if(!t)return;let n=new Set;e.forEach(e=>{e.category&&e.category.trim()&&n.add(e.category.trim())}),[`Kondisi Kawasan`,`Kegiatan Penanaman`,`Pertumbuhan Tanaman`,`Pemantauan`,`Perawatan`,`Fasilitas`,`Dokumentasi Lainnya`].forEach(e=>n.add(e)),t.innerHTML=`<option value="all">Semua Kategori</option>`,Array.from(n).sort().forEach(e=>{let n=document.createElement(`option`);n.value=e,n.textContent=e,t.appendChild(n)})}function Et(e){let t=document.getElementById(`gallery-filter-category`);if(!t)return;let n=new Set;e.forEach(e=>{e.category&&e.category.trim()&&n.add(e.category.trim())}),[`Lanskap & Topografi`,`Kegiatan Penanaman`,`Bibit & Spesies`,`Pertumbuhan Vegetasi`,`Pemantauan`,`Perawatan`,`Kondisi Kawasan`].forEach(e=>n.add(e)),t.innerHTML=`<option value="all">Semua Kategori</option>`,Array.from(n).sort().forEach(e=>{let n=document.createElement(`option`);n.value=e,n.textContent=e,t.appendChild(n)})}function Dt(){P=`all`,F=`all`,I=``;let e=document.getElementById(`gallery-filter-zone`),t=document.getElementById(`gallery-filter-category`),n=document.getElementById(`gallery-search-input`);e&&(e.value=`all`),t&&(t.value=`all`),n&&(n.value=``),H()}function H(){if(z===`album-detail`)return;if(z===`albums`){ht=M.filter(e=>{if(P!==`all`&&e.planting_zone_id!==P||F!==`all`&&e.category!==F)return!1;if(I){let t=(e.title||``).toLowerCase().includes(I),n=(e.description||``).toLowerCase().includes(I),r=(e.category||``).toLowerCase().includes(I),i=(e.zone?.name||``).toLowerCase().includes(I);if(!t&&!n&&!r&&!i)return!1}return!0});let e=document.getElementById(`gallery-count-num`),t=document.getElementById(`gallery-count-label`);e&&(e.textContent=ht.length),t&&(t.textContent=`Album`),Ot()}else{R=mt.filter(e=>{if(P!==`all`&&e.planting_zone_id!==P||F!==`all`&&e.category!==F)return!1;if(I){let t=(e.title||``).toLowerCase().includes(I),n=(e.caption||``).toLowerCase().includes(I),r=(e.zone?.name||``).toLowerCase().includes(I),i=(e.category||``).toLowerCase().includes(I);if(!t&&!n&&!r&&!i)return!1}return!0});let e=document.getElementById(`gallery-count-num`),t=document.getElementById(`gallery-count-label`);e&&(e.textContent=R.length),t&&(t.textContent=`Foto`),jt()}let e=document.getElementById(`gallery-reset-btn`);if(e){let t=P!==`all`||F!==`all`||I.length>0;e.style.display=t?`inline-flex`:`none`}let t=document.getElementById(`gallery-search-clear`);t&&(t.style.display=I.length>0?`flex`:`none`)}function Ot(){let e=document.getElementById(`gallery-grid-container`);if(e){if(ht.length===0){e.innerHTML=`
      <div class="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center text-slate-300 max-w-lg mx-auto my-6 shadow-xl">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
          📷
        </div>
        <h4 class="text-lg font-bold text-white mb-2">Tidak Ada Album Ditemukan</h4>
        <p class="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
          Tidak ditemukan album yang sesuai dengan filter atau pencarian Anda.
        </p>
        <button id="gallery-empty-reset" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          Reset Semua Filter
        </button>
      </div>
    `;let t=document.getElementById(`gallery-empty-reset`);t&&t.addEventListener(`click`,Dt)}else e.innerHTML=`
    <div class="gallery-albums-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-7">
      ${ht.map(e=>{let t=kt(e),n=e.zone?e.zone.name:``,r=e.activity_date?zt(e.activity_date):``,i=e.photos_count??e.photo_count??0;return`
          <div
            class="gallery-album-card group"
            data-album-id="${e.id}"
            data-album-slug="${e.slug||e.id}"
            style="display: flex; flex-direction: column; justify-content: space-between; background: rgba(15, 28, 22, 0.9); border: 1px solid rgba(16, 185, 129, 0.22); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); cursor: pointer; transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;"
          >
            <div>
              <!-- Album Cover Image (16:10 aspect ratio) -->
              <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; background: #070d0a;">
                <img
                  src="${t}"
                  alt="${U(e.title||`Album Kegiatan`)}"
                  loading="lazy"
                  style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
                  class="gallery-img"
                  onerror="this.onerror=null; this.src='${_t}';"
                />

                <!-- Overlay gradient for top & bottom badges -->
                <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 35%, transparent 55%, rgba(0,0,0,0.75) 100%); pointer-events: none;"></div>

                <!-- Top Badges -->
                <div style="position: absolute; top: 12px; left: 12px; right: 12px; display: flex; align-items: center; justify-content: space-between; z-index: 2; pointer-events: none;">
                  <span style="font-size: 11.5px; padding: 4px 12px; border-radius: 9999px; font-weight: 600; background: rgba(9, 20, 15, 0.88); backdrop-filter: blur(8px); border: 1px solid rgba(16, 185, 129, 0.4); color: #6ee7b7; box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 4px;">
                    <span>🏞️</span> ${U(n||`Kawasan Restorasi`)}
                  </span>
                  <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 700; background: rgba(9, 20, 15, 0.88); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 4px;">
                    <span>📷</span> ${i} Foto
                  </span>
                </div>

                <!-- Bottom-left: Activity Date Badge -->
                ${r?`
                  <div style="position: absolute; bottom: 12px; left: 12px; z-index: 2; pointer-events: none;">
                    <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 600; background: rgba(9, 20, 15, 0.88); backdrop-filter: blur(8px); border: 1px solid rgba(16, 185, 129, 0.35); color: #6ee7b7; box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 5px;">
                      <span>📅</span>
                      <span>${r}</span>
                    </span>
                  </div>
                `:``}

                <!-- Bottom-right: Album icon overlay -->
                <div style="position: absolute; bottom: 12px; right: 12px; z-index: 2; pointer-events: none;">
                  <div style="width: 34px; height: 34px; border-radius: 10px; background: rgba(16, 185, 129, 0.2); backdrop-filter: blur(8px); border: 1px solid rgba(16, 185, 129, 0.4); display: flex; align-items: center; justify-content: center;">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Content Details -->
              <div style="padding: 18px 20px 14px;">
                <h3 style="font-size: 17px; font-weight: 700; color: #ffffff; margin-bottom: 8px; line-height: 1.35; transition: color 0.2s ease;">
                  ${U(e.title||`Album Kegiatan`)}
                </h3>
                ${e.description?`
                  <p style="font-size: 13px; color: var(--clr-text-muted); line-height: 1.6; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${U(e.description)}
                  </p>
                `:``}
              </div>
            </div>

            <!-- Footer Action -->
            <div style="padding: 12px 18px 16px; border-top: 1px solid rgba(255, 255, 255, 0.08);">
              <button
                type="button"
                class="btn-view-album cursor-pointer"
                data-album-slug="${e.slug||e.id}"
                style="width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; font-weight: 600; font-size: 13px; padding: 10px 16px; border-radius: 10px;"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span>Buka Album (${i} Foto)</span>
                <span style="margin-left: 2px; transition: transform 0.2s ease;">→</span>
              </button>
            </div>
          </div>
        `}).join(``)}
    </div>
  `,e.querySelectorAll(`.gallery-album-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-album-slug`)||e.getAttribute(`data-album-id`);t&&xt(t,!0)})})}}function kt(e){if(e.cover_url)return At(e.cover_url);if(e.resolved_cover_url)return At(e.resolved_cover_url);if(e.cover_photo){let t=e.cover_photo;return At(t.file_url||t.thumbnail_url||t.file_path||``)}return _t}function At(e){return e?e.startsWith(`http://`)||e.startsWith(`https://`)||e.startsWith(`/`)||e.startsWith(`data:`)?e:`/`+e:_t}function jt(){let e=document.getElementById(`gallery-grid-container`);if(e){if(R.length===0){e.innerHTML=`
      <div class="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center text-slate-300 max-w-lg mx-auto my-6 shadow-xl">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
          📷
        </div>
        <h4 class="text-lg font-bold text-white mb-2">Tidak Ada Foto Ditemukan</h4>
        <p class="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
          ${z===`album-detail`?`Album ini belum memiliki foto.`:`Tidak ditemukan foto yang sesuai dengan filter.`}
        </p>
        ${z===`album-detail`?`
          <button id="gallery-empty-back" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Kembali ke Album
          </button>
        `:`
          <button id="gallery-empty-reset" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-950/40 transition-all cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            Reset Semua Filter
          </button>
        `}
      </div>
    `;let t=document.getElementById(`gallery-empty-reset`);t&&t.addEventListener(`click`,Dt);let n=document.getElementById(`gallery-empty-back`);n&&n.addEventListener(`click`,V)}else e.innerHTML=`
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
      ${R.map((e,t)=>{e.zone&&e.zone.name,e.documented_at?zt(e.documented_at):a(e.created_at);let n=e.thumbnail_url||e.file_url||e.file_path||``;return n&&!n.startsWith(`http://`)&&!n.startsWith(`https://`)&&!n.startsWith(`/`)&&(n=`/`+n),`
          <div
            class="gallery-card point-card group relative overflow-hidden rounded-2xl cursor-pointer"
            data-index="${t}"
            style="aspect-ratio: 16 / 10; background: #070d0a; border: 1px solid rgba(16, 185, 129, 0.22); box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;"
          >
            <!-- Thumbnail Media -->
            <img
              src="${n}"
              alt="${U(e.alt_text||e.title||`Foto Kawasan`)}"
              loading="lazy"
              style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;"
              class="gallery-img w-full h-full object-cover group-hover:scale-105"
            />

            ${e.is_cover?`
              <div class="absolute top-3 left-3 z-2 pointer-events-none">
                <span style="font-size: 11px; padding: 4px 11px; border-radius: 9999px; font-weight: 700; background: #f59e0b; color: #1e1b4b; box-shadow: 0 2px 8px rgba(0,0,0,0.5); display: inline-flex; align-items: center; gap: 4px;">
                  <span>⭐</span> Sampul
                </span>
              </div>
            `:``}
          </div>
        `}).join(``)}
    </div>
  `,e.querySelectorAll(`.gallery-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-index`),10);isNaN(t)||Nt(t)})})}}function Mt(){document.getElementById(`gallery-lightbox-modal`);let e=document.getElementById(`btn-close-lightbox`),t=document.getElementById(`btn-lightbox-prev`),n=document.getElementById(`btn-lightbox-next`);e&&e.addEventListener(`click`,Pt),t&&t.addEventListener(`click`,e=>{e.stopPropagation(),Ft()}),n&&n.addEventListener(`click`,e=>{e.stopPropagation(),It()});let r=document.getElementById(`lightbox-stage`),i=document.getElementById(`lightbox-img-wrapper`);if(r&&r.addEventListener(`click`,e=>{e.target===r&&Pt()}),i&&i.addEventListener(`click`,e=>{e.stopPropagation()}),!gt&&(gt=!0,window.addEventListener(`keydown`,e=>{let t=document.getElementById(`gallery-lightbox-modal`);t&&!t.classList.contains(`hidden`)&&(e.key===`Escape`?Pt():e.key===`ArrowLeft`?Ft():e.key===`ArrowRight`&&It())}),r)){let e=0;r.addEventListener(`touchstart`,t=>{e=t.changedTouches[0].screenX},{passive:!0}),r.addEventListener(`touchend`,t=>{let n=t.changedTouches[0].screenX-e;Math.abs(n)>50&&(n>0?Ft():It())},{passive:!0})}}function Nt(e){if(e<0||e>=R.length)return;L=e;let t=document.getElementById(`gallery-lightbox-modal`);t&&(t.classList.remove(`hidden`),document.body.style.overflow=`hidden`),Lt()}function Pt(){let e=document.getElementById(`gallery-lightbox-modal`);e&&(e.classList.add(`hidden`),document.body.style.overflow=``),L=-1}function Ft(){R.length!==0&&(L=(L-1+R.length)%R.length,Lt())}function It(){R.length!==0&&(L=(L+1)%R.length,Lt())}function Lt(){if(L<0||L>=R.length)return;let e=R[L],t=document.getElementById(`lightbox-img`),n=document.getElementById(`lightbox-loading-spinner`),r=document.getElementById(`lightbox-title`),i=document.getElementById(`lightbox-caption`),o=document.getElementById(`lightbox-zone-name`),s=document.getElementById(`lightbox-date`),c=document.getElementById(`lightbox-counter`),l=document.getElementById(`lightbox-category-badge`),u=document.getElementById(`lightbox-cover-badge`),d=document.getElementById(`lightbox-raw-btn`),f=document.getElementById(`lightbox-error-msg`),p=document.getElementById(`btn-lightbox-prev`),m=document.getElementById(`btn-lightbox-next`);if(p&&m){let e=R.length>1;p.style.display=e?`flex`:`none`,m.style.display=e?`flex`:`none`}let h=e.file_url||e.file_path||e.thumbnail_url||``;if(h&&!h.startsWith(`http://`)&&!h.startsWith(`https://`)&&!h.startsWith(`/`)&&(h=`/`+h),t&&(t.classList.remove(`hidden`),f&&f.classList.add(`hidden`),n&&n.classList.remove(`hidden`),t.onload=()=>{n&&n.classList.add(`hidden`)},t.onerror=()=>{n&&n.classList.add(`hidden`),t.classList.add(`hidden`),f&&f.classList.remove(`hidden`)},t.src=h,t.alt=e.alt_text||e.title||`Foto Kawasan`),r&&(r.textContent=e.title||`Dokumentasi Kawasan`),i&&(i.textContent=e.caption||`Foto dokumentasi resmi penanaman kawasan restorasi.`),o&&(o.innerHTML=`<span>🏞️</span> <span class="truncate max-w-[220px]">${U(e.zone?e.zone.name:`Kawasan Penanaman`)}</span>`),s&&(s.innerHTML=`<span>📅</span> <span>${U(e.documented_at?zt(e.documented_at):a(e.created_at))}</span>`),c&&(c.textContent=`Foto ${L+1} dari ${R.length}`),l){let t=B&&B.title||e.album&&e.album.title||``;l.textContent=t||e.category||`Dokumentasi`,t&&(l.title=`Album: ${t}`)}u&&(e.is_cover?u.classList.remove(`hidden`):u.classList.add(`hidden`)),d&&(d.href=h||`#`),Rt()}function Rt(){let e=document.getElementById(`lightbox-thumb-strip`);if(!e)return;if(R.length<=1){e.style.display=`none`;return}e.style.display=`flex`,e.innerHTML=R.map((e,t)=>{let n=t===L,r=e.thumbnail_url||e.file_url||e.file_path||``;return r&&!r.startsWith(`http://`)&&!r.startsWith(`https://`)&&!r.startsWith(`/`)&&(r=`/`+r),`
      <button
        type="button"
        class="lightbox-thumb-btn shrink-0 w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${n?`border-emerald-400 ring-2 ring-emerald-500/50 scale-105 opacity-100 shadow-md`:`border-white/10 opacity-50 hover:opacity-90 hover:border-white/40`}"
        data-thumb-index="${t}"
        title="${U(e.title||`Foto ${t+1}`)}"
        aria-label="Lihat foto ${t+1}"
      >
        <img src="${r}" class="w-full h-full object-cover" alt="" onerror="this.onerror=null; this.src='${_t}';" />
      </button>
    `}).join(``),e.querySelectorAll(`.lightbox-thumb-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.getAttribute(`data-thumb-index`),10);isNaN(n)||(L=n,Lt())})});let t=e.querySelector(`[data-thumb-index="${L}"]`);t&&t.scrollIntoView({behavior:`smooth`,block:`nearest`,inline:`center`})}function zt(e){if(!e)return`-`;try{return new Date(e).toLocaleDateString(`id-ID`,{day:`numeric`,month:`short`,year:`numeric`})}catch{return e}}function U(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Bt=e(f(),1),Vt=[],Ht=[],W=`all`,G=``;async function Ut(e=`public-tree-qr-container`){let t=document.getElementById(e);t&&(t.innerHTML=`
    <div class="tree-qr-wrapper">
      <!-- Section Header Hero Banner -->
      <div class="hero-section text-center relative overflow-hidden" style="padding: 36px 24px; margin-bottom: 28px; border-radius: var(--radius-lg);">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3.5 shadow-sm">
          <span>📱</span> Identifikasi Digital Flora & Blok Kawasan
        </div>
        <h1 class="hero-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style="margin: 6px 0 10px;">
          Tree QR Code Kawasan Restorasi
        </h1>
        <p class="hero-subtitle text-slate-300 text-xs sm:text-sm w-full max-w-full mx-auto leading-relaxed text-center" style="text-align: center; margin: 0 auto 20px; padding-left: 24px; padding-right: 24px; max-width: 100%;">
          Pindai QR code di lapangan untuk mengakses profil biologis jenis pohon, taksonomi, atau data blok penanaman kawasan
        </p>

        <!-- Informational Banner: Kejujuran Data Lapangan (Hidden on mobile) -->
        <div class="hidden md:flex w-full max-w-full mx-auto bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 sm:p-5 text-left text-xs text-slate-300 items-start gap-3.5 shadow-xl backdrop-blur-sm" style="max-width: 100%;">
          <span class="text-xl shrink-0 mt-0.5">ℹ️</span>
          <div>
            <strong class="text-emerald-400 font-semibold block mb-0.5">Catatan Identifikasi Lapangan:</strong>
            <p class="leading-relaxed text-slate-400 text-xs">
              Sistem saat ini menerapkan identifikasi QR Code berbasis <strong>Master Jenis Spesies Pohon</strong> dan <strong>Kelompok / Blok Penanaman</strong> terverifikasi. QR Code individual per batang pohon hanya diterbitkan apabila penomoran tag pohon lapangan telah tercatat dalam basis data resmi.
            </p>
          </div>
        </div>
      </div>

      <!-- Filters & Search Toolbar (Mengikuti gaya & struktur .gallery-filter-bar pada #galeri) -->
      <div class="gallery-filter-bar treeqr-filter-bar">
        <!-- 1. Search Box -->
        <div class="gallery-search-box">
          <span class="gallery-search-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            id="qr-search-input"
            placeholder="Cari nama pohon, blok, ID..."
            class="gallery-search-field"
            autocomplete="off"
            aria-label="Pencarian QR Code"
          />
          <button id="qr-search-clear" class="gallery-search-clear" style="display: none;" title="Hapus pencarian">✕</button>
        </div>

        <!-- 2. Controls Group -->
        <div class="gallery-filters-group">
          <!-- Filter Objek Pill -->
          <div class="gallery-filter-pill" title="Filter berdasarkan jenis objek QR Code">
            <span class="gallery-pill-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <circle cx="7" cy="7" r="1.5"></circle>
              </svg>
            </span>
            <span class="gallery-pill-label">Objek:</span>
            <select id="qr-filter-type" class="gallery-pill-select" aria-label="Filter Objek QR">
              <option value="all">Semua Objek</option>
              <option value="species">🌳 Spesies Pohon</option>
              <option value="zone">🏞️ Blok Kawasan</option>
            </select>
            <span class="gallery-pill-chevron">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>

          <!-- Counter Badge & Reset Button (Meta Group) -->
          <div class="gallery-filters-meta">
            <span class="gallery-count-badge" id="qr-items-count-badge" title="Total objek ditampilkan">
              <span id="qr-items-count">0</span> <span id="qr-items-label">Objek</span>
            </span>

            <button id="qr-reset-btn" class="gallery-reset-btn" style="display: none;" title="Reset filter & pencarian">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              Reset
            </button>
          </div>
        </div>
      </div>

      <!-- Grid Cards (Tree QR Grid - 2 Kolom pada Mobile) -->
      <div id="tree-qr-grid" class="catalog-species-grid-inner tree-qr-grid-inner w-full">
        <div class="col-span-full py-16 text-center text-slate-400 flex items-center justify-center gap-2">
          <span class="animate-spin text-xl">⏳</span> Memuat data QR Code...
        </div>
      </div>
    </div>

    <!-- QR Detail / Scan Modal (Hanya QR Code & Tombol X Tutup) -->
    <div id="qr-preview-modal" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md hidden flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <div class="relative bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(16,185,129,0.3)]">
        <!-- Tombol Tutup (X) dengan Jarak Nyaman di Sudut Kanan Atas -->
        <button id="btn-close-qrmodal" class="absolute -top-5 -right-5 sm:-top-6 sm:-right-6 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-950 hover:bg-rose-600 text-slate-300 hover:text-white border-2 border-emerald-400/80 hover:border-rose-400 shadow-2xl transition-all duration-200 cursor-pointer flex items-center justify-center hover:scale-110" aria-label="Tutup modal" title="Tutup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <!-- Canvas Container QR Code -->
        <div class="bg-white p-3.5 sm:p-4 rounded-2xl inline-flex items-center justify-center shadow-xl border border-slate-200">
          <canvas id="modal-qr-canvas" class="max-w-full block"></canvas>
        </div>
      </div>
    </div>
  `,Wt(),Gt(),await Kt())}function Wt(){let e=document.getElementById(`qr-filter-type`),t=document.getElementById(`qr-search-input`),n=document.getElementById(`qr-search-clear`),r=document.getElementById(`qr-reset-btn`);e&&e.addEventListener(`change`,e=>{W=e.target.value||`all`,K()}),t&&t.addEventListener(`input`,e=>{G=(e.target.value||``).trim().toLowerCase(),n&&(n.style.display=t.value?`flex`:`none`),K()}),n&&n.addEventListener(`click`,()=>{t&&(t.value=``),G=``,n.style.display=`none`,K()}),r&&r.addEventListener(`click`,()=>{t&&(t.value=``),e&&(e.value=`all`),n&&(n.style.display=`none`),W=`all`,G=``,K()})}function Gt(){let e=document.getElementById(`qr-preview-modal`),t=document.getElementById(`btn-close-qrmodal`),n=()=>e?.classList.add(`hidden`);t?.addEventListener(`click`,n),e?.addEventListener(`click`,t=>{t.target===e&&n()}),window.addEventListener(`keydown`,t=>{t.key===`Escape`&&e&&!e.classList.contains(`hidden`)&&n()})}async function Kt(){try{let[e,t]=await Promise.all([l.getPublicTreeSpecies().catch(()=>({species:[]})),l.getPublicZones().catch(()=>({zones:[]}))]);Vt=e.species||[],Ht=t.zones||[],K()}catch(e){console.error(`Gagal memuat data tree QR:`,e);let t=document.getElementById(`tree-qr-grid`);t&&(t.innerHTML=`
        <div class="col-span-full bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl p-8 text-center text-sm">
          Gagal memuat katalog QR Code. Silakan muat ulang halaman.
        </div>
      `)}}function qt(){let e=window.location;return`${e.protocol}//${e.host}`}function K(){let e=document.getElementById(`tree-qr-grid`),t=document.getElementById(`qr-items-count`);if(!e)return;let n=[];(W===`all`||W===`species`)&&Vt.forEach(e=>{let t=e.common_name||e.local_name||`Spesies Pohon`,r=e.scientific_name||``;n.push({type:`species`,id:e.id,badge:`Jenis Spesies`,badgeColor:`emerald`,title:r?`${t} / ${r}`:t,commonName:t,scientificName:r,subtitle:``,photo:e.photo_path||null,totalPlanted:e.total_planted||0,origin:e.origin_status_label||`Lokal / Asli`,targetUrl:`${qt()}/#katalog?species=${encodeURIComponent(e.id)}`})}),(W===`all`||W===`zone`)&&Ht.forEach(e=>{n.push({type:`zone`,id:e.id,badge:`Blok Kawasan`,badgeColor:`blue`,title:e.name,subtitle:`${e.zone_code||`Blok`} • ${e.category||`Silvikultur`}`,photo:null,areaSize:`${e.area_in_ha||e.area_size||0} Ha`,category:e.category||`Silvikultur`,origin:e.city||`Aceh Besar`,targetUrl:`${qt()}/#beranda`})}),G&&(n=n.filter(e=>{let t=(e.title||``).toLowerCase().includes(G),n=(e.subtitle||``).toLowerCase().includes(G),r=(e.id||``).toLowerCase().includes(G),i=(e.origin||``).toLowerCase().includes(G);return t||n||r||i}));let r=document.getElementById(`qr-reset-btn`);t&&(t.textContent=`${n.length}`);let i=document.getElementById(`qr-items-label`);if(i&&(i.textContent=`Objek`),r){let e=W!==`all`||G.length>0;r.style.display=e?`inline-flex`:`none`}n.length===0?e.innerHTML=`
      <div class="col-span-full bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
        <div class="text-3xl mb-2">🔍</div>
        <p class="font-bold text-white text-sm mb-1">Tidak Ada Objek Ditemukan</p>
        <p class="text-xs text-slate-400">
          ${G?`Tidak ada hasil untuk kata kunci "${Yt(G)}".`:`Belum ada objek terdaftar untuk kategori ini.`}
        </p>
      </div>
    `:(e.innerHTML=n.map((e,t)=>`
      <div class="point-card catalog-card treeqr-card group" style="display: flex; flex-direction: column; justify-content: space-between; background: rgba(15, 28, 22, 0.88); border: 1px solid rgba(16, 185, 129, 0.18); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.5); transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;">
        <div>
          <!-- Bagian Showcase QR (16:10 aspect ratio seperti pada Katalog) -->
          <div style="position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; background: #070d0a; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid rgba(16, 185, 129, 0.12);">
            <!-- Subtle emerald radial background glow -->
            <div style="position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.12) 0%, rgba(6, 12, 10, 0.95) 75%); pointer-events: none;"></div>

            <!-- QR Code Plate (White rounded plate with shadow, zooms slightly on card hover) -->
            <div class="relative p-2 sm:p-2.5 bg-white rounded-xl shadow-xl transition-transform duration-300 group-hover:scale-105 inline-flex items-center justify-center z-1">
              <canvas id="qr-thumb-${t}" style="display: block; width: 116px; height: 116px; max-width: 100%; border-radius: 4px;"></canvas>
            </div>
          </div>
        </div>

        <!-- Footer Tombol Aksi (Hanya Perbesar QR) -->
        <div style="padding: 12px 16px 14px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: center; align-items: center;">
          <button
            type="button"
            class="btn-open-qr-modal btn-view-species-profile w-full"
            data-index="${t}"
            style="width: 100%; display: inline-flex; justify-content: center; align-items: center; gap: 6px; font-weight: 600; font-size: 13px; padding: 9px 12px; border-radius: 10px; background: rgba(16, 185, 129, 0.12); color: #ecfdf5; border: 1px solid rgba(16, 185, 129, 0.3); cursor: pointer; transition: all 0.2s ease;"
          >
            <span>Perbesar QR</span> <span>↗</span>
          </button>
        </div>
      </div>
    `).join(``),n.forEach((e,t)=>{let n=document.getElementById(`qr-thumb-${t}`);n&&Bt.toCanvas(n,e.targetUrl,{width:140,margin:1,color:{dark:`#0a1610`,light:`#ffffff`}}).catch(e=>console.warn(`QR render error:`,e))}),e.querySelectorAll(`.btn-open-qr-modal`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-index`),10);!isNaN(t)&&n[t]&&Jt(n[t])})}))}function Jt(e){let t=document.getElementById(`qr-preview-modal`),n=document.getElementById(`modal-qr-canvas`);t&&n&&(Bt.toCanvas(n,e.targetUrl,{width:260,margin:2,color:{dark:`#0a1610`,light:`#ffffff`}}),t.classList.remove(`hidden`))}function Yt(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var Xt=null,Zt=`all`,q=``;async function Qt(e=`public-carbon-container`){let t=document.getElementById(e);if(t){t.innerHTML=`
    <div class="carbon-loading-state">
      <div class="carbon-spinner"></div>
      <p>Memuat data monitoring karbon kawasan...</p>
    </div>
  `;try{let e=await fetch(`/api/carbon/public-summary`);if(!e.ok)throw Error(`HTTP Error: ${e.status}`);let n=await e.json();if(!n.success)throw Error(n.message||`Gagal memuat data`);Xt=n,$t(t,n)}catch(n){console.error(`Error loading carbon data:`,n),t.innerHTML=`
      <div class="carbon-error-state">
        <span class="carbon-error-icon">⚠️</span>
        <h3>Gagal Memuat Data Monitoring Karbon</h3>
        <p>${J(n.message||`Terjadi kesalahan saat memuat data dari server.`)}</p>
        <button class="btn-carbon-retry" id="btn-retry-carbon">Coba Lagi</button>
      </div>
    `;let r=document.getElementById(`btn-retry-carbon`);r&&r.addEventListener(`click`,()=>Qt(e))}}}function $t(e,t){let n=t.indicators||{};t.metadata;let r=t.charts||{},i=t.zones_table||[],a=r.species_composition||[],o=q?a.filter(e=>e.name.toLowerCase().includes(q.toLowerCase())||e.scientific_name&&e.scientific_name.toLowerCase().includes(q.toLowerCase())):a;e.innerHTML=`
    <div class="carbon-wrapper">
      <!-- 1. Hero Section -->
      <div class="carbon-hero">
        <div class="carbon-badge-row">
          <span class="carbon-badge-pill">🌱 Transparansi Restorasi & Akuntansi Karbon</span>
          <span class="carbon-badge-pill status-ready">Data Inventarisasi Tersedia</span>
          <span class="carbon-badge-pill status-est">Estimasi Awal Model Tropis</span>
        </div>
        <h1 class="carbon-title">Monitoring Karbon Kawasan Restorasi</h1>
        <p class="carbon-subtitle">
          Pantau perkembangan kawasan restorasi, pertumbuhan pohon, dan estimasi perubahan simpanan karbon melalui data pemantauan yang terdokumentasi.
        </p>
        
        <!-- Status Label Strip -->
        <div class="carbon-status-strip">
          <div class="status-strip-item">
            <span class="strip-dot green"></span>
            <span><strong>Status Inventarisasi:</strong> Sensus Lapangan Lengkap (${n.total_trees_planted?.toLocaleString()} Bibit Tertanam)</span>
          </div>
          <div class="status-strip-item">
            <span class="strip-dot yellow"></span>
            <span><strong>Metodologi Perhitungan:</strong> Formula Allometrik Pantropikal (Chave et al., 2014)</span>
          </div>
          <div class="status-strip-item">
            <span class="strip-dot orange"></span>
            <span><strong>Perubahan Stok (ΔC):</strong> Menunggu Periode Pengukuran ke-2</span>
          </div>
          <div class="status-strip-item">
            <span class="strip-dot blue"></span>
            <span><strong>Status Verra VM0047:</strong> Kandidat Metodologi ARR (Belum Diterbitkan Kredit)</span>
          </div>
        </div>
      </div>

      <!-- 2. Filter & Toolbar -->
      <div class="carbon-filter-card">
        <div class="filter-left">
          <label for="carbon-zone-filter" class="filter-label">Filter Kawasan:</label>
          <select id="carbon-zone-filter" class="carbon-select">
            <option value="all">Semua Kawasan (${n.total_zones||1} Kawasan)</option>
            ${(i||[]).map(e=>`<option value="${e.id}" ${Zt===e.id?`selected`:``}>${J(e.name)} (${e.area_ha} Ha)</option>`).join(``)}
          </select>
        </div>
        <div class="filter-right">
          <span class="filter-note">Terakhir diperbarui: <strong>${J(n.latest_survey_date||`01 Jan 2026`)}</strong></span>
        </div>
      </div>

      <!-- 3. Kartu Indikator Utama (5 Cards) -->
      <div class="carbon-kpi-grid">
        <!-- Card 1: Luas Kawasan -->
        <div class="carbon-kpi-card">
          <div class="kpi-header">
            <span class="kpi-icon">🗺️</span>
            <span class="kpi-title">Total Luas Kawasan</span>
          </div>
          <div class="kpi-value">${n.total_area_ha||0} <span class="kpi-unit">Hektare</span></div>
          <div class="kpi-sub">
            <span>Setara ${n.total_area_m2?.toLocaleString()||0} m²</span>
            <span class="kpi-source">• ${n.total_zones||1} Kawasan Aktif</span>
          </div>
        </div>

        <!-- Card 2: Jumlah Pohon Tercatat -->
        <div class="carbon-kpi-card">
          <div class="kpi-header">
            <span class="kpi-icon">🌳</span>
            <span class="kpi-title">Jumlah Pohon Tercatat</span>
          </div>
          <div class="kpi-value">${n.total_trees_planted?.toLocaleString()||0} <span class="kpi-unit">Batang</span></div>
          <div class="kpi-sub">
            <span>Bibit Awal Kelompok BATCH-2026-001</span>
            <span class="kpi-source">• Penanaman: ${J(n.planting_date||`2026-10-01`)}</span>
          </div>
        </div>

        <!-- Card 3: Pohon Hidup -->
        <div class="carbon-kpi-card highlight-green">
          <div class="kpi-header">
            <span class="kpi-icon">🌿</span>
            <span class="kpi-title">Pohon Hidup (Survival)</span>
          </div>
          <div class="kpi-value">${n.total_alive_trees?.toLocaleString()||0} <span class="kpi-unit">Batang</span></div>
          <div class="kpi-sub">
            <span class="pill-survival">${n.survival_rate||0}% Hidup</span>
            <span class="kpi-source">• ${n.total_dead_trees||0} Mati • ${n.total_missing_trees||0} Hilang</span>
          </div>
        </div>

        <!-- Card 4: Estimasi Stok Karbon -->
        <div class="carbon-kpi-card highlight-cyan">
          <div class="kpi-header">
            <span class="kpi-icon">💨</span>
            <span class="kpi-title">Estimasi Stok Karbon</span>
          </div>
          <div class="kpi-value">${n.carbon_stock_ton_c||0} <span class="kpi-unit">Ton C</span></div>
          <div class="kpi-sub">
            <span class="co2e-tag">~${n.carbon_stock_co2e_ton||0} Ton CO₂e</span>
            <span class="kpi-source">• Estimasi Awal Tegakan Muda</span>
          </div>
        </div>

        <!-- Card 5: Perubahan Stok Karbon (Delta C) -->
        <div class="carbon-kpi-card highlight-amber">
          <div class="kpi-header">
            <span class="kpi-icon">📈</span>
            <span class="kpi-title">Perubahan Stok Karbon (ΔC)</span>
          </div>
          <div class="kpi-value text-amber">Belum Tersedia</div>
          <div class="kpi-sub">
            <span>Menunggu Pengukuran Periode ke-2</span>
            <span class="kpi-source">• Min. 2 Periode untuk ΔC</span>
          </div>
        </div>
      </div>

      <!-- 4. Grid Grafik Interaktif (4 Charts) -->
      <div class="carbon-charts-grid">
        <!-- Grafik 1: Perkembangan Penanaman -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">🌱</span>
              <div>
                <h3 class="chart-title">Grafik 1 — Perkembangan Penanaman Pohon</h3>
                <p class="chart-desc">Jumlah bibit pohon kayu dan buah hutan yang ditanam per batch kegiatan</p>
              </div>
            </div>
          </div>
          <div class="chart-body">
            <div class="custom-bar-chart">
              ${(r.planting_progress||[]).map(e=>`
                <div class="bar-item-wrap">
                  <div class="bar-info-row">
                    <span class="bar-label"><strong>${J(e.batch_code)}</strong> (${J(e.period_label||e.activity_date)})</span>
                    <span class="bar-val">${e.trees_planted?.toLocaleString()} batang</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill green-fill" style="width: 100%;"></div>
                  </div>
                  <div class="bar-foot">
                    <span>Lokasi: ${J(e.zone_name)}</span>
                    <span class="pill-verified">Tercatat Lapangan</span>
                  </div>
                </div>
              `).join(``)}
            </div>
          </div>
        </div>

        <!-- Grafik 2: Kondisi & Status Pohon -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">📊</span>
              <div>
                <h3 class="chart-title">Grafik 2 — Kondisi & Status Pohon Lapangan</h3>
                <p class="chart-desc">Sensus pohon hidup, mati, hilang, dan belum diperiksa</p>
              </div>
            </div>
          </div>
          <div class="chart-body">
            <!-- Segmented Progress Bar -->
            <div class="condition-stacked-bar">
              <div class="stack-seg seg-alive" style="width: ${n.survival_rate||88}%;" title="Hidup: ${n.total_alive_trees} batang (${n.survival_rate}%)"></div>
              <div class="stack-seg seg-dead" style="width: ${(n.total_dead_trees||0)/(n.total_trees_planted||1)*100}%;" title="Mati: ${n.total_dead_trees} batang"></div>
              <div class="stack-seg seg-missing" style="width: ${(n.total_missing_trees||0)/(n.total_trees_planted||1)*100}%;" title="Hilang: ${n.total_missing_trees} batang"></div>
            </div>

            <!-- Legend Grid -->
            <div class="condition-legend-grid">
              <div class="legend-item">
                <span class="legend-dot green"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Hidup</span>
                  <span class="legend-count"><strong>${n.total_alive_trees}</strong> batang (${n.survival_rate}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot red"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Mati</span>
                  <span class="legend-count"><strong>${n.total_dead_trees}</strong> batang (${((n.total_dead_trees||0)/(n.total_trees_planted||1)*100).toFixed(1)}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot orange"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Hilang / Tidak Ditemukan</span>
                  <span class="legend-count"><strong>${n.total_missing_trees}</strong> batang (${((n.total_missing_trees||0)/(n.total_trees_planted||1)*100).toFixed(1)}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot gray"></span>
                <div class="legend-text">
                  <span class="legend-name">Belum Diperiksa</span>
                  <span class="legend-count"><strong>${n.total_uninspected_trees||0}</strong> batang (0%)</span>
                </div>
              </div>
            </div>

            <div class="condition-notice">
              ℹ️ <strong>Prinsip Kejujuran Data:</strong> Pohon yang belum diperiksa atau hilang tidak pernah diasumsikan sebagai pohon hidup.
            </div>
          </div>
        </div>

        <!-- Grafik 3: Perkembangan Stok Karbon (ΔC) -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">📉</span>
              <div>
                <h3 class="chart-title">Grafik 3 — Perkembangan Stok Karbon (ΔC)</h3>
                <p class="chart-desc">Perubahan simpanan biomassa karbon multi-periode dalam satuan Ton C & CO₂e</p>
              </div>
            </div>
          </div>
          <div class="chart-body">
            <!-- Informative Empty State -->
            <div class="carbon-empty-trend-box">
              <div class="empty-trend-icon">⏳</div>
              <h4 class="empty-trend-title">Grafik Tren Memerlukan Pengukuran Berkala</h4>
              <p class="empty-trend-desc">
                Saat ini sistem baru mencatat <strong>1 periode survei lapangan baseline</strong> (Survei: ${J(n.latest_survey_date||`01 Jan 2026`)}).
              </p>
              <div class="empty-trend-steps">
                <div class="trend-step completed">
                  <span class="step-num">✓</span>
                  <span><strong>Periode 1 (Baseline):</strong> Sensus Awal (${n.carbon_stock_ton_c} Ton C / ${n.carbon_stock_co2e_ton} Ton CO₂e)</span>
                </div>
                <div class="trend-step waiting">
                  <span class="step-num">2</span>
                  <span><strong>Periode 2 (Survei Lanjutan):</strong> Menunggu jadwal pengukuran diameter & tinggi berkala</span>
                </div>
              </div>
              <p class="empty-trend-footnote">
                Sesuai metodologi akuntansi karbon ilmiah, garis tren perubahan stok (ΔC) tidak boleh dibuat-buat sebelum ada minimal dua pengukuran faktual di lapangan.
              </p>
            </div>
          </div>
        </div>

        <!-- Grafik 4: Komposisi Jenis Pohon & Kontribusi Karbon -->
        <div class="carbon-chart-card">
          <div class="chart-header">
            <div class="chart-title-wrap">
              <span class="chart-icon">🌲</span>
              <div>
                <h3 class="chart-title">Grafik 4 — Komposisi Jenis Pohon & Estimasi Serapan</h3>
                <p class="chart-desc">Rincian populasi jenis pohon serta estimasi simpanan CO₂e per spesies</p>
              </div>
            </div>
            <div class="species-search-box">
              <input
                type="text"
                id="carbon-species-search"
                class="species-search-input"
                placeholder="Cari jenis pohon..."
                value="${J(q)}"
              />
            </div>
          </div>
          <div class="chart-body">
            <div class="species-horizontal-bars">
              ${o.length>0?o.map(e=>{let t=Math.min(100,Math.round(e.planted_count/250*100));return`
                    <div class="species-bar-row">
                      <div class="species-meta-row">
                        <span class="species-title">
                          <strong>${J(e.name)}</strong>
                          <em class="species-latin">(${J(e.scientific_name)})</em>
                        </span>
                        <div class="species-vals">
                          <span class="species-count">${e.planted_count} ditanam • ${e.estimated_alive} hidup</span>
                          <span class="species-co2e-badge">${e.co2e_ton} Ton CO₂e</span>
                        </div>
                      </div>
                      <div class="species-bar-track">
                        <div class="species-bar-fill" style="width: ${t}%;"></div>
                      </div>
                      <div class="species-sub-info">
                        <span>Berat Jenis Kayu (ρ): ${e.wood_density} g/cm³</span>
                        <span>Stok Karbon: ${e.carbon_stock_kg} kg C</span>
                      </div>
                    </div>
                  `}).join(``):`<div class="empty-search-alert">Tidak ada jenis pohon yang cocok dengan kata kunci "${J(q)}".</div>`}
            </div>
          </div>
        </div>
      </div>

      <!-- 5. Skema Visual Edukatif: Bagaimana Restorasi Menyimpan Karbon? -->
      <div class="carbon-education-section">
        <div class="section-badge-center">
          <span class="carbon-badge-pill">💡 Pemahaman Publik</span>
        </div>
        <h2 class="edu-main-title">Bagaimana Restorasi Membantu Menyimpan Karbon?</h2>
        <p class="edu-main-desc">
          Pohon menyerap CO₂ dari atmosfer selama pertumbuhannya dan menyimpannya dalam bentuk kayu, daun, dan akar. Melalui pengukuran diameter batang, tinggi, dan kelangsungan hidup secara berkala, kita dapat memperkirakan perubahan karbon yang tersimpan dalam vegetasi.
        </p>

        <!-- 6 Langkah Visual Flow -->
        <div class="edu-flow-grid">
          <div class="edu-flow-card">
            <div class="flow-num">1</div>
            <div class="flow-icon">🗺️</div>
            <h4 class="flow-title">Kawasan & Kondisi Awal</h4>
            <p class="flow-desc">Mengidentifikasi batas lahan terdegradasi serta baseline vegetasi sebelum kegiatan restorasi dimulai.</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">2</div>
            <div class="flow-icon">🌱</div>
            <h4 class="flow-title">Penanaman & Pemulihan</h4>
            <p class="flow-desc">Menanam spesies pohon kayu keras endemik lokal dan pohon buah hutan pakan satwa secara terencana.</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">3</div>
            <div class="flow-icon">📏</div>
            <h4 class="flow-title">Pengukuran Lapangan</h4>
            <p class="flow-desc">Memantau sensus pohon hidup, diameter batang (DBH), tinggi pohon, dan kondisi kesehatan vegetasi.</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">4</div>
            <div class="flow-icon">🧮</div>
            <h4 class="flow-title">Perhitungan Biomassa</h4>
            <p class="flow-desc">Menggunakan data lapangan dan persamaan allometrik ilmiah (AGB, BGB, dan fraksi karbon 47%).</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">5</div>
            <div class="flow-icon">🔄</div>
            <h4 class="flow-title">Pemantauan Perubahan</h4>
            <p class="flow-desc">Membandingkan hasil pengukuran multi-periode untuk menghitung laju perubahan stok karbon (ΔC).</p>
          </div>
          <div class="edu-flow-card">
            <div class="flow-num">6</div>
            <div class="flow-icon">📋</div>
            <h4 class="flow-title">Evaluasi & Verifikasi</h4>
            <p class="flow-desc">Menilai kualitas data, risiko non-permanensi, baseline, dan persyaratan standar metodologi karbon.</p>
          </div>
        </div>

        <div class="edu-alert-box">
          ⚠️ <strong>Catatan Penting:</strong> Hasil estimasi biomassa vegetasi ini <strong>bukan otomatis kredit karbon yang dapat diperdagangkan</strong>. Penerbitan kredit karbon memerlukan proses audit independen serta kepatuhan penuh terhadap standar sertifikasi internasional.
        </div>
      </div>

      <!-- 6. Diagram Khusus: Estimasi Stok Karbon vs. Kredit Karbon -->
      <div class="carbon-credit-comparison-section">
        <div class="section-badge-center">
          <span class="carbon-badge-pill">⚖️ Transparansi Konseptual</span>
        </div>
        <h2 class="edu-main-title">Perbedaan Mendasar: Estimasi Stok Karbon vs. Kredit Karbon</h2>
        <p class="edu-main-desc">
          Memahami alur dari pohon yang ditanam hingga potensi penerbitan unit kredit karbon resmi yang dapat diakui pasar.
        </p>

        <!-- Step-by-Step Methodology Flowchart -->
        <div class="comparison-steps-container">
          <div class="comp-step current-stage">
            <div class="comp-badge">Tahap 1 — Selesai</div>
            <div class="comp-icon">🌳</div>
            <h4 class="comp-title">Data Pohon Aktual</h4>
            <p class="comp-desc">Inventarisasi faktual pohon di lapangan (spesies, jumlah hidup, diameter, tinggi).</p>
            <div class="comp-tag green-tag">✓ Data Tersedia</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step current-stage">
            <div class="comp-badge">Tahap 2 — Saat Ini</div>
            <div class="comp-icon">🧮</div>
            <h4 class="comp-title">Estimasi Stok Karbon</h4>
            <p class="comp-desc">Perhitungan biomassa pohon (AGB + BGB) menggunakan allometrik ilmiah (Ton C / Ton CO₂e).</p>
            <div class="comp-tag yellow-tag">Estimasi Awal (~0,88 Ton CO₂e)</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 3 — Lanjutan</div>
            <div class="comp-icon">📊</div>
            <h4 class="comp-title">Perubahan Stok (ΔC)</h4>
            <p class="comp-desc">Membandingkan stok karbon pada dua periode pengukuran ($T_2 - T_1$) untuk melihat pertumbuhan riil.</p>
            <div class="comp-tag amber-tag">Menunggu Periode 2</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 4 — Metodologi</div>
            <div class="comp-icon">📑</div>
            <h4 class="comp-title">Penghitungan Bersih (Net)</h4>
            <p class="comp-desc">Mengurangkan emisi baseline, emisi pelaksanaan proyek, dan kebocoran aktivitas (leakage).</p>
            <div class="comp-tag gray-tag">Syarat Metodologi ARR</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 5 — Sertifikasi</div>
            <div class="comp-icon">🛡️</div>
            <h4 class="comp-title">Validasi & Verifikasi</h4>
            <p class="comp-desc">Audit independen oleh lembaga audit pihak ketiga (VVB) dan penyisihan buffer risiko (10-20%).</p>
            <div class="comp-tag gray-tag">Audit Independen</div>
          </div>

          <div class="comp-arrow">➔</div>

          <div class="comp-step pending-stage">
            <div class="comp-badge">Tahap 6 — Penerbitan</div>
            <div class="comp-icon">📜</div>
            <h4 class="comp-title">Kredit Karbon (VCUs)</h4>
            <p class="comp-desc">Penerbitan unit kredit karbon resmi yang dapat diperdagangkan atau diklaim sebagai carbon offset.</p>
            <div class="comp-tag gray-tag">Belum Diterbitkan</div>
          </div>
        </div>

        <!-- 4 Key Clarification Boxes -->
        <div class="comp-details-grid">
          <div class="detail-box">
            <h5>1. Stok Karbon (Carbon Stock)</h5>
            <p>Total jumlah karbon yang tersimpan dalam jaringan biomassa tanaman pada satu titik waktu tertentu (satuan: Ton C atau Ton CO₂e).</p>
          </div>
          <div class="detail-box">
            <h5>2. Perubahan Stok Karbon (ΔC)</h5>
            <p>Selisih akumulasi karbon antara dua periode waktu pengukuran. Hanya bisa dihitung jika ada minimal dua sensus lapangan yang sah.</p>
          </div>
          <div class="detail-box">
            <h5>3. Penyerapan Bersih (Net Removals)</h5>
            <p>Pengurangan karbon riil setelah memperhitungkan skenario tanpa proyek (baseline), emisi operasional, dan emisi kebocoran (leakage).</p>
          </div>
          <div class="detail-box">
            <h5>4. Kredit Karbon Terverifikasi</h5>
            <p>Unit sertifikat yang diterbitkan oleh badan standar karbon resmi (seperti Verra VCS) setelah melalui audit independen menyeluruh.</p>
          </div>
        </div>
      </div>

      <!-- 7. Tabel Ringkas Kawasan untuk Pengunjung -->
      <div class="carbon-table-section">
        <div class="table-section-header">
          <div>
            <h3 class="table-sec-title">Ringkasan Kawasan Restorasi & Data Karbon</h3>
            <p class="table-sec-desc">Daftar kawasan penanaman pohon aktif beserta kelengkapan data pemantauan</p>
          </div>
        </div>
        <div class="table-responsive">
          <table class="carbon-zones-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nama Kawasan</th>
                <th>Luas Lahan</th>
                <th>Pohon Tercatat</th>
                <th>Survei Terakhir</th>
                <th>Kelangsungan Hidup</th>
                <th>Status Data</th>
                <th>Estimasi Karbon</th>
                <th>Perubahan Stok (ΔC)</th>
              </tr>
            </thead>
            <tbody>
              ${i.length>0?i.map((e,t)=>`
                  <tr>
                    <td><strong>${t+1}</strong></td>
                    <td>
                      <strong>${J(e.name)}</strong><br/>
                      <span class="text-xs text-muted">Kode: ${J(e.zone_code)}</span>
                    </td>
                    <td><strong>${e.area_ha}</strong> Ha</td>
                    <td><strong>${e.planted_trees?.toLocaleString()}</strong> bibit</td>
                    <td>${J(e.latest_survey_date)}</td>
                    <td><span class="pill-verified">${e.survival_rate}% Hidup</span></td>
                    <td><span class="pill-completeness">${J(e.data_completeness)}</span></td>
                    <td>
                      <strong>~${e.co2e_ton}</strong> Ton CO₂e<br/>
                      <span class="text-xs text-muted">(${e.carbon_stock_ton_c} Ton C)</span>
                    </td>
                    <td><span class="pill-waiting">${J(e.delta_c)}</span></td>
                  </tr>
                `).join(``):`<tr><td colspan="9" class="text-center py-4">Belum ada kawasan yang terdaftar.</td></tr>`}
            </tbody>
          </table>
        </div>
        <div class="table-scroll-hint">
          <span>👉</span> Geser tabel ke samping untuk melihat seluruh kolom data
        </div>
      </div>

      <!-- 8. Transparansi Metodologi, Asumsi, & Sumber Data -->
      <div class="carbon-methodology-card">
        <h3 class="method-title">Metode, Asumsi, & Batasan Ilmiah</h3>
        <div class="method-grid">
          <div class="method-col">
            <h4>📌 Sumber Data & Pengukuran Lapangan</h4>
            <ul>
              <li><strong>Tanggal Pembaruan:</strong> ${J(n.latest_survey_date||`01 Januari 2026`)}.</li>
              <li><strong>Cakupan Kawasan:</strong> ${J(i[0]?.name||`Kawasan Lamteuba`)} (${n.total_area_ha} Ha).</li>
              <li><strong>Metode Lapangan:</strong> Sensus 100% pohon tegakan awal pada plot restorasi.</li>
              <li><strong>Rata-rata Tinggi Tanaman:</strong> ${n.average_height_cm} cm (~1,35 meter).</li>
              <li><strong>Rata-rata Diameter Batang (DBH):</strong> ${n.average_diameter_cm} cm.</li>
            </ul>
          </div>
          <div class="method-col">
            <h4>📐 Persamaan & Parameter Ilmiah</h4>
            <ul>
              <li><strong>Persamaan Allometrik:</strong> Chave et al. (2014) untuk biomassa pohon muda tropis basah: $AGB = 0.0673 \\times (\\rho \\times D^2 \\times H)^{0.976}$.</li>
              <li><strong>Fraksi Karbon:</strong> $CF = 0.47$ (47% dari biomassa kering adalah karbon, IPCC default).</li>
              <li><strong>Rasio Akar-Pucuk (BGB):</strong> $R = 0.24$ (24% dari AGB, IPCC default).</li>
              <li><strong>Faktor Konversi CO₂e:</strong> Rasio molekul $44/12 \\approx 3.667$.</li>
              <li><strong>Berat Jenis Kayu (ρ):</strong> Rujukan database ICRAF Wood Density (0,40 – 0,68 g/cm³).</li>
            </ul>
          </div>
        </div>

        <div class="method-disclaimer-box">
          <h5>⚠️ Batasan & Pernyataan Keterbukaan Publik:</h5>
          <p>
            1. Perhitungan ini adalah <strong>estimasi awal biomassa tegakan pohon muda</strong> dan belum mencakup cadangan karbon organik tanah (<em>Soil Organic Carbon</em>) maupun serasah daun.<br/>
            2. Perubahan stok karbon (ΔC) secara metodologis <strong>wajib menunggu minimal dua periode pengukuran</strong> untuk membuktikan laju penyerapan tahunan yang sesungguhnya.<br/>
            3. Proyek ini <strong>belum menyatakan telah memenuhi atau menerbitkan kredit karbon Verra VM0047</strong>. Metodologi Verra dijadikan acuan prinsip kehati-hatian dalam pencatatan data restorasi menuju kelayakan di masa depan.
          </p>
        </div>
      </div>
    </div>
  `;let s=document.getElementById(`carbon-zone-filter`);s&&s.addEventListener(`change`,async t=>{Zt=t.target.value;let n=Zt===`all`?`/api/carbon/public-summary`:`/api/carbon/public-summary?zone_id=${Zt}`;try{let t=await(await fetch(n)).json();t.success&&(Xt=t,$t(e,t))}catch(e){console.error(`Filter error:`,e)}});let c=document.getElementById(`carbon-species-search`);c&&c.addEventListener(`input`,t=>{q=t.target.value,$t(e,Xt);let n=document.getElementById(`carbon-species-search`);n&&(n.focus(),n.setSelectionRange(q.length,q.length))})}function J(e){return e?String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`):``}var en=null,Y=null,X=null,tn=null,nn=new Map,rn=`beranda`,Z=[],an=`ecoland_last_tour_scene_id`,on=`ecoland_last_tour_view_`,sn=null;function cn(e,t){t&&e&&(sn&&clearTimeout(sn),sn=setTimeout(()=>{try{let n={yaw:t.yaw(),pitch:t.pitch(),fov:t.fov()};localStorage.setItem(on+e,JSON.stringify(n))}catch{}},250))}function ln(e){if(!e)return null;try{let t=localStorage.getItem(on+e);if(!t)return null;let n=JSON.parse(t);if(typeof n?.yaw==`number`&&typeof n?.pitch==`number`&&typeof n?.fov==`number`)return n}catch{}return null}function un(e){let[t,n]=(e||``).replace(/^[#/]+/,``).trim().split(`?`),r=(t||``).toLowerCase(),i=new URLSearchParams(n||``);if(!r&&typeof window<`u`&&window.location.pathname){let e=window.location.pathname.replace(/^\/+/,``).split(`/`)[0].toLowerCase();e&&[`tour`,`info`,`galeri`,`katalog`,`tree-qr`,`karbon`,`admin`].includes(e)&&(r=e)}let a=i.get(`scene`)||i.get(`titik`)||null,o=r||`beranda`;if(r===`tour`||r.startsWith(`tour/`)){if(o=`tour`,r.startsWith(`tour/`)){let e=t.slice(5).trim();e&&(a=e)}}else if(r===`katalog`||r.startsWith(`katalog/`)||r.startsWith(`katalog-pohon/`)){if(o=`katalog`,r.startsWith(`katalog/`)){let e=t.slice(8).trim();e&&!i.has(`species`)&&i.set(`species`,e)}else if(r.startsWith(`katalog-pohon/`)){let e=t.slice(14).trim();e&&!i.has(`species`)&&i.set(`species`,e)}}else if(r===`galeri`||r.startsWith(`galeri/`)||r.startsWith(`album/`)){if(o=`galeri`,r.startsWith(`galeri/`)){let e=t.slice(7).trim().replace(/^album\//,``).trim();e&&!i.has(`album`)&&i.set(`album`,e)}else if(r.startsWith(`album/`)){let e=t.slice(6).trim();e&&!i.has(`album`)&&i.set(`album`,e)}}else r===`monitoring-karbon`&&(o=`karbon`);return{tab:o,sceneParam:a,queryParams:i}}function dn(){if(typeof window<`u`&&window.location.search){let e=new URLSearchParams(window.location.search),t=e.get(`scene`)||e.get(`titik`);if(t){let e=i.find(e=>e.id===t||String(e.sequence)===t);if(e)return e.id}}if(typeof window<`u`&&window.location.hash){let{sceneParam:e}=un(window.location.hash);if(e){let t=i.find(t=>t.id===e||String(t.sequence)===e);if(t)return t.id}}try{let e=localStorage.getItem(an);if(e){let t=i.find(t=>t.id===e);if(t)return t.id}}catch(e){console.warn(`LocalStorage error:`,e)}return i.length>0?i[0].id:null}function fn(e){if(e&&rn===`tour`){let t=`#tour?scene=${encodeURIComponent(e)}`;window.location.hash!==t&&history.replaceState(null,``,t)}}document.addEventListener(`DOMContentLoaded`,async()=>{mn(),_n(),window.addEventListener(`hashchange`,_n),typeof document<`u`&&document.documentElement.removeAttribute(`data-initial-tab`),l.getHotspots().then(e=>{Z=e||[]}).catch(e=>{console.warn(`Failed loading hotspots:`,e)}),pn(),vn(),ut(`home-zones-grid`,e=>{window.location.hash=`tour?scene=${encodeURIComponent(e)}`,$(e)});try{en=ee()}catch(e){console.warn(`Marzipano viewer initialization:`,e.message)}de($),le(i,null),fe({onZoomIn:()=>re(X,-.15),onZoomOut:()=>re(X,.15),onResetView:()=>ie(X,tn||{}),onFullscreen:pe,onPrevScene:yn,onNextScene:bn});let e=document.getElementById(`tour-compass`);e&&e.addEventListener(`click`,()=>{ie(X,tn||{})}),_e(`tour-minimap`,e=>{$(e)});let t=document.getElementById(`btn-minimap-minimize`),r=document.getElementById(`tour-minimap-card`);t&&r&&t.addEventListener(`click`,()=>{let e=r.classList.toggle(`minimized`);t.textContent=e?`Buka Radar`:`Tutup`,e||setTimeout(()=>ye(),150)});let a=document.getElementById(`btn-exit-to-list`);a&&a.addEventListener(`click`,()=>{window.location.hash=`beranda`}),je(`streetview-guide-container`);try{await o({onPublicTourUpdate:e=>{if(Z=e,Y){let e=nn.get(Y),t=i.find(e=>e.id===Y);e&&t&&n(e.scene,t,i,$,Z)}},onExitAdminToTour:()=>{window.location.hash=`tour`}})}catch(e){console.warn(`Admin panel initialization error:`,e)}if(window.addEventListener(`preview-scene`,e=>{e.detail&&e.detail.sceneId&&(window.location.hash=`tour?scene=${encodeURIComponent(e.detail.sceneId)}`,$(e.detail.sceneId))}),i.length>0&&!Y){let e=dn();e&&await $(e,ln(e))}});async function pn(){let e=document.getElementById(`nav-brand-title`),t=document.getElementById(`hero-title`),n=document.getElementById(`hero-desc`),r=document.getElementById(`info-general-desc`);e&&(e.textContent=p.namaAplikasi||`Eco Land`);let i=e=>{document.querySelectorAll(`.brand-subtitle`).forEach(t=>{t.textContent=e})};i(p.organisasi||`IKHW - Inisiatif Konservasi Hutan Wakaf`),t&&(t.innerHTML=`Eco Land<br /><span style="display: block; font-size: 24px; font-weight: 600; opacity: 0.92; margin-top: 6px;">Kawasan Penanaman Pohon</span>`),n&&(n.textContent=p.deskripsi),r&&(r.textContent=p.deskripsi),lt();try{let e=await fetch(`/api/settings/public`);if(e.ok){let t=(await e.json()).flat||{};t.program_description&&(n&&(n.textContent=t.program_description),r&&(r.textContent=t.program_description)),t.org_name&&i(t.org_name),t.app_logo&&document.querySelectorAll(`.brand-logo-icon`).forEach(e=>{e.innerHTML=`<img src="${t.app_logo}" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; padding: 4px;" />`})}}catch(e){console.debug(`Public settings fetch fallback to config defaults:`,e)}}function mn(){let e=document.querySelectorAll(`.nav-tab-btn`),t=document.getElementById(`brand-btn`),n=document.getElementById(`btn-mobile-menu`),r=document.getElementById(`nav-tabs`),i=document.getElementById(`mobile-nav-backdrop`),a=document.getElementById(`nav-btn-admin-desktop`),o=document.getElementById(`footer-btn-admin`),l=document.querySelectorAll(`.nav-dropdown`);function u(){l.forEach(e=>{e.classList.remove(`is-open`);let t=e.querySelector(`.nav-dropdown-trigger`);t&&t.setAttribute(`aria-expanded`,`false`)})}function d(){if(u(),r&&r.classList.remove(`mobile-open`),i&&i.classList.remove(`show`),n){n.setAttribute(`aria-expanded`,`false`);let e=n.querySelector(`.hamburger-icon-open`),t=n.querySelector(`.hamburger-icon-close`);e&&e.classList.remove(`hidden`),t&&t.classList.add(`hidden`)}}function f(){if(!r)return;let e=r.classList.toggle(`mobile-open`);if(i&&i.classList.toggle(`show`,e),e||u(),n){n.setAttribute(`aria-expanded`,e?`true`:`false`);let t=n.querySelector(`.hamburger-icon-open`),r=n.querySelector(`.hamburger-icon-close`);t&&t.classList.toggle(`hidden`,e),r&&r.classList.toggle(`hidden`,!e)}}l.forEach(e=>{let t=e.querySelector(`.nav-dropdown-trigger`),n=null;e.addEventListener(`mouseenter`,()=>{window.innerWidth>900&&(n&&=(clearTimeout(n),null),e.classList.add(`is-open`),t&&t.setAttribute(`aria-expanded`,`true`))}),e.addEventListener(`mouseleave`,()=>{window.innerWidth>900&&(n=setTimeout(()=>{e.classList.remove(`is-open`),t&&t.setAttribute(`aria-expanded`,`false`)},120))}),t&&t.addEventListener(`click`,n=>{n.preventDefault(),n.stopPropagation();let r=e.classList.contains(`is-open`);l.forEach(t=>{if(t!==e){t.classList.remove(`is-open`);let e=t.querySelector(`.nav-dropdown-trigger`);e&&e.setAttribute(`aria-expanded`,`false`)}}),r?(e.classList.remove(`is-open`),t.setAttribute(`aria-expanded`,`false`)):(e.classList.add(`is-open`),t.setAttribute(`aria-expanded`,`true`))}),e.querySelectorAll(`.nav-dropdown-item`).forEach(e=>{e.addEventListener(`click`,()=>{u(),d()})})}),e.forEach(e=>{e.classList.contains(`nav-dropdown-trigger`)||e.classList.contains(`btn-nav-login`)||e.addEventListener(`click`,t=>{let n=e.getAttribute(`data-tab`);if(n===`login`)window.location.href=`/login`;else{if(n===`admin`){if(!Q()){window.location.href=`/login`;return}t.preventDefault(),c()}else window.location.hash=n;u(),d()}})}),document.querySelectorAll(`.btn-nav-login`).forEach(e=>{e.addEventListener(`click`,t=>{let n=Q(),r=e.getAttribute(`href`)||``;!n||r.includes(`/login`)||e.getAttribute(`data-tab`)===`login`?(d(),window.location.href=`/login`):(t.preventDefault(),d(),c())})}),a&&a.addEventListener(`click`,e=>{let t=Q(),n=a.getAttribute(`href`)||``;!t||n.includes(`/login`)||a.getAttribute(`data-tab`)===`login`?window.location.href=`/login`:(e.preventDefault(),c())}),o&&o.addEventListener(`click`,e=>{Q()?(e.preventDefault(),c()):window.location.href=`/login`}),t&&t.addEventListener(`click`,()=>{window.location.hash=`beranda`,d()}),n&&n.addEventListener(`click`,e=>{e.stopPropagation(),f()}),i&&i.addEventListener(`click`,d),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&(u(),d())}),document.addEventListener(`click`,e=>{e.target.closest(`.nav-dropdown`)||u(),r&&r.classList.contains(`mobile-open`)&&!r.contains(e.target)&&!n.contains(e.target)&&d()}),document.querySelectorAll(`.footer-nav-link`).forEach(e=>{e.addEventListener(`click`,t=>{let n=e.getAttribute(`data-tab`);n&&(t.preventDefault(),window.location.hash=n,window.scrollTo({top:0,behavior:`smooth`}))})});let p=document.getElementById(`btn-hero-start-tour`),m=document.getElementById(`btn-hero-view-points`);p&&p.addEventListener(`click`,()=>window.location.hash=`tour`),m&&m.addEventListener(`click`,()=>window.location.hash=`info`),hn(),s(()=>{hn()})}function Q(){if(l.isAuthenticated())return!0;if(typeof window<`u`&&typeof window.ECO_SERVER_AUTH==`boolean`)return window.ECO_SERVER_AUTH;if(typeof document<`u`){let e=document.querySelector(`meta[name="eco-server-auth"]`);if(e)return e.getAttribute(`content`)===`true`}return t()}function hn(){let e=Q(),t=document.getElementById(`nav-btn-admin-desktop`),n=document.querySelectorAll(`.btn-nav-login`),r=e?`/#admin/dashboard`:`/login`;t&&(t.setAttribute(`href`,r),t.setAttribute(`data-tab`,e?`admin`:`login`),e?(t.setAttribute(`title`,`Dashboard Eco Land`),t.classList.add(`is-authenticated`),t.innerHTML=`
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span class="header-login-text">Dashboard</span>
      `):(t.setAttribute(`title`,`Login Eco Land`),t.classList.remove(`is-authenticated`),t.innerHTML=`
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span class="header-login-text">Login</span>
      `)),n.forEach(t=>{t.setAttribute(`href`,r),t.setAttribute(`data-tab`,e?`admin`:`login`);let n=t.querySelector(`.nav-icon`),i=t.querySelector(`.nav-text`)||t.querySelector(`span:last-child`);e?(t.setAttribute(`title`,`Dashboard Eco Land`),n&&(n.textContent=`📊`),i&&(i.textContent=`Dashboard`)):(t.setAttribute(`title`,`Login Eco Land`),n&&(n.textContent=`🔐`),i&&(i.textContent=`Login`))})}function gn(e){rn=e,hn();let t=document.getElementById(`main-navbar`);t&&(t.style.display=e===`admin`?`none`:``);let n=document.getElementById(`views-container`);n&&(n.style.display=e===`admin`?`none`:``);let r=document.getElementById(`public-global-footer`);r&&(r.style.display=[`beranda`,`info`,`galeri`,`katalog`,`tree-qr`,`karbon`].includes(e)?`block`:`none`);let i=[`galeri`,`katalog`,`tree-qr`];document.querySelectorAll(`.nav-tab-btn`).forEach(t=>{let n=t.getAttribute(`data-tab`);n===`informasi`?t.classList.toggle(`active`,i.includes(e)):t.classList.toggle(`active`,n===e)}),document.querySelectorAll(`.nav-dropdown-item`).forEach(t=>{t.classList.toggle(`active`,t.getAttribute(`data-tab`)===e)}),document.querySelectorAll(`.view-pane`).forEach(t=>{t.classList.toggle(`active`,t.id===`view-${e}`)}),e!==`tour`&&window.scrollTo(0,0);let a={beranda:`Eco Land — Virtual Tour & Sistem Informasi Restorasi Kawasan | IKHW Aceh`,tour:`Virtual Tour 360° — Eco Land`,info:`Informasi Kawasan — Eco Land`,galeri:`Galeri Foto Kawasan — Eco Land`,katalog:`Data & Katalog Pohon — Eco Land`,"tree-qr":`Tree QR Code Kawasan — Eco Land`,karbon:`Monitoring Karbon — Eco Land`,admin:`Dashboard Administrator — Eco Land`};if(a[e]&&(document.title=a[e]),e===`beranda`)lt(),xe(`home-ref-map`,e=>{window.location.hash=`tour?scene=${encodeURIComponent(e)}`,$(e)}),we();else if(e===`info`)xe(`gis-map`,e=>{window.location.hash=`tour?scene=${encodeURIComponent(e)}`,$(e)}),we();else if(e===`galeri`){let{queryParams:e}=un(window.location.hash);yt(`public-gallery-container`,e?e.get(`album`)||e.get(`id`):null)}else if(e===`katalog`){let{queryParams:e}=un(window.location.hash);ze(`public-tree-catalog-container`,e=>{window.location.hash=`tour?scene=${encodeURIComponent(e)}`,$(e)},e?e.get(`species`):null)}else e===`tree-qr`?Ut(`public-tree-qr-container`):e===`karbon`?Qt(`public-carbon-container`):e===`tour`?(window.dispatchEvent(new Event(`resize`)),setTimeout(()=>{ye(),Y&&ve(Y)},200)):e===`admin`&&window.dispatchEvent(new Event(`resize`))}function _n(){let e=window.location.hash||`#beranda`,{tab:t,sceneParam:n}=un(e),r=[`beranda`,`tour`,`info`,`galeri`,`katalog`,`tree-qr`,`karbon`,`admin`];if(t===`titik`)window.location.replace(`#beranda`);else if(t===`admin`||t.startsWith(`admin/`))Q()?(gn(`admin`),u(e)):(sessionStorage.setItem(`admin_redirect_hash`,e),c());else if(t===`tour`){if(gn(`tour`),n){let e=i.find(e=>e.id===n||String(e.sequence)===n);if(e){e.id!==Y&&$(e.id,ln(e.id));return}}if(Y)fn(Y);else{let e=dn();e&&$(e,ln(e))}}else r.includes(t)?gn(t):gn(`beranda`)}function vn(){let e=document.getElementById(`home-points-grid`);e&&(e.innerHTML=i.map(e=>{let t=e.status===`tersedia`;return`
        <div class="point-card">
          <div>
            <div class="point-card-top">
              <span class="point-sequence-badge">Titik ${e.sequence}</span>
              <span class="point-status-tag ${t?`ready`:`pending`}">
                ${t?`✓ Foto Siap`:`⏳ Menunggu Foto GSV`}
              </span>
            </div>
            <h3 class="point-title">${e.name}</h3>
            <p class="point-desc">${e.description}</p>
            <div class="point-meta">
              📍 Koordinat Acuan: ${e.latitude.toFixed(6)}° N, ${e.longitude.toFixed(6)}° E
            </div>
          </div>
          <button class="btn-card-explore" data-scene-id="${e.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M10 8l6 4-6 4V8z"/>
            </svg>
            Buka Panorama 360°
          </button>
        </div>
      `}).join(``),e.querySelectorAll(`.btn-card-explore`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-scene-id`);window.location.hash=`tour?scene=${encodeURIComponent(t)}`,$(t)})}))}function yn(){if(!Y)return;let e=(i.findIndex(e=>e.id===Y)-1+i.length)%i.length;$(i[e].id)}function bn(){if(!Y)return;let e=(i.findIndex(e=>e.id===Y)+1)%i.length;$(i[e].id)}async function $(e,t=null){if(!e||e===Y&&!t)return;let r=i.find(t=>t.id===e);if(!r)return;try{localStorage.setItem(an,e)}catch{}fn(e),Oe(r),ue(e),le(i,e),ve(e);let a=document.getElementById(`tour-loading`);if(a&&a.classList.remove(`hidden`),!await Te(r.panorama))a&&a.classList.add(`hidden`),De(),Ee(r),Y=e,X=null,tn=r.initialView;else{De();try{let o=nn.get(e);if(!o&&en?(o=te(r,t),n(o.scene,r,i,$,Z),nn.set(e,o)):o&&(t&&ne(o.view,t),n(o.scene,r,i,$,Z)),o){o.scene.switchTo({transitionDuration:500}),Y=e,X=o.view,tn=r.initialView;let t=document.getElementById(`compass-needle`);if(t){let e=-(o.view.yaw()*180/Math.PI);t.style.transform=`rotate(${e}deg)`}o.view._hasPersistenceListener||(o.view._hasPersistenceListener=!0,o.view.addEventListener(`change`,()=>{if(t){let e=-(o.view.yaw()*180/Math.PI);t.style.transform=`rotate(${e}deg)`}Y&&cn(Y,o.view)}))}a&&a.classList.add(`hidden`)}catch(e){console.error(`Error switching scene:`,e),a&&a.classList.add(`hidden`),Ee(r)}}}window.addEventListener(`zones-updated`,()=>{lt()});