/**
 * Modul Monitoring Karbon Publik — EcoKawasan
 * Menampilkan data transparansi restorasi, estimasi simpanan karbon vegetasi,
 * grafik interaktif, skema alur edukatif, dan tabel kawasan.
 */

import { ApiService } from './services/api.js';

let carbonDataCache = null;
let currentZoneFilter = 'all';
let currentSpeciesSearch = '';

export async function initPublicCarbon(containerId = 'public-carbon-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="carbon-loading-state">
      <div class="carbon-spinner"></div>
      <p>Memuat data monitoring karbon kawasan...</p>
    </div>
  `;

  try {
    const res = await fetch('/api/carbon/public-summary');
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Gagal memuat data');

    carbonDataCache = data;
    renderCarbonDashboard(container, data);
  } catch (err) {
    console.error('Error loading carbon data:', err);
    container.innerHTML = `
      <div class="carbon-error-state">
        <span class="carbon-error-icon">⚠️</span>
        <h3>Gagal Memuat Data Monitoring Karbon</h3>
        <p>${escapeHtml(err.message || 'Terjadi kesalahan saat memuat data dari server.')}</p>
        <button class="btn-carbon-retry" id="btn-retry-carbon">Coba Lagi</button>
      </div>
    `;
    const retryBtn = document.getElementById('btn-retry-carbon');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => initPublicCarbon(containerId));
    }
  }
}

function renderCarbonDashboard(container, data) {
  const ind = data.indicators || {};
  const meta = data.metadata || {};
  const charts = data.charts || {};
  const zonesTable = data.zones_table || [];

  const speciesList = charts.species_composition || [];
  const filteredSpecies = currentSpeciesSearch
    ? speciesList.filter(
        (s) =>
          s.name.toLowerCase().includes(currentSpeciesSearch.toLowerCase()) ||
          (s.scientific_name && s.scientific_name.toLowerCase().includes(currentSpeciesSearch.toLowerCase()))
      )
    : speciesList;

  container.innerHTML = `
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
            <span><strong>Status Inventarisasi:</strong> Sensus Lapangan Lengkap (${ind.total_trees_planted?.toLocaleString()} Bibit Tertanam)</span>
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
            <option value="all">Semua Kawasan (${ind.total_zones || 1} Kawasan)</option>
            ${(zonesTable || [])
              .map((z) => `<option value="${z.id}" ${currentZoneFilter === z.id ? 'selected' : ''}>${escapeHtml(z.name)} (${z.area_ha} Ha)</option>`)
              .join('')}
          </select>
        </div>
        <div class="filter-right">
          <span class="filter-note">Terakhir diperbarui: <strong>${escapeHtml(ind.latest_survey_date || '01 Jan 2026')}</strong></span>
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
          <div class="kpi-value">${ind.total_area_ha || 0} <span class="kpi-unit">Hektare</span></div>
          <div class="kpi-sub">
            <span>Setara ${ind.total_area_m2?.toLocaleString() || 0} m²</span>
            <span class="kpi-source">• ${ind.total_zones || 1} Kawasan Aktif</span>
          </div>
        </div>

        <!-- Card 2: Jumlah Pohon Tercatat -->
        <div class="carbon-kpi-card">
          <div class="kpi-header">
            <span class="kpi-icon">🌳</span>
            <span class="kpi-title">Jumlah Pohon Tercatat</span>
          </div>
          <div class="kpi-value">${ind.total_trees_planted?.toLocaleString() || 0} <span class="kpi-unit">Batang</span></div>
          <div class="kpi-sub">
            <span>Bibit Awal Kelompok BATCH-2026-001</span>
            <span class="kpi-source">• Penanaman: ${escapeHtml(ind.planting_date || '2026-10-01')}</span>
          </div>
        </div>

        <!-- Card 3: Pohon Hidup -->
        <div class="carbon-kpi-card highlight-green">
          <div class="kpi-header">
            <span class="kpi-icon">🌿</span>
            <span class="kpi-title">Pohon Hidup (Survival)</span>
          </div>
          <div class="kpi-value">${ind.total_alive_trees?.toLocaleString() || 0} <span class="kpi-unit">Batang</span></div>
          <div class="kpi-sub">
            <span class="pill-survival">${ind.survival_rate || 0}% Hidup</span>
            <span class="kpi-source">• ${ind.total_dead_trees || 0} Mati • ${ind.total_missing_trees || 0} Hilang</span>
          </div>
        </div>

        <!-- Card 4: Estimasi Stok Karbon -->
        <div class="carbon-kpi-card highlight-cyan">
          <div class="kpi-header">
            <span class="kpi-icon">💨</span>
            <span class="kpi-title">Estimasi Stok Karbon</span>
          </div>
          <div class="kpi-value">${ind.carbon_stock_ton_c || 0} <span class="kpi-unit">Ton C</span></div>
          <div class="kpi-sub">
            <span class="co2e-tag">~${ind.carbon_stock_co2e_ton || 0} Ton CO₂e</span>
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
              ${(charts.planting_progress || [])
                .map(
                  (p) => `
                <div class="bar-item-wrap">
                  <div class="bar-info-row">
                    <span class="bar-label"><strong>${escapeHtml(p.batch_code)}</strong> (${escapeHtml(p.period_label || p.activity_date)})</span>
                    <span class="bar-val">${p.trees_planted?.toLocaleString()} batang</span>
                  </div>
                  <div class="bar-track">
                    <div class="bar-fill green-fill" style="width: 100%;"></div>
                  </div>
                  <div class="bar-foot">
                    <span>Lokasi: ${escapeHtml(p.zone_name)}</span>
                    <span class="pill-verified">Tercatat Lapangan</span>
                  </div>
                </div>
              `
                )
                .join('')}
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
              <div class="stack-seg seg-alive" style="width: ${ind.survival_rate || 88}%;" title="Hidup: ${ind.total_alive_trees} batang (${ind.survival_rate}%)"></div>
              <div class="stack-seg seg-dead" style="width: ${((ind.total_dead_trees || 0) / (ind.total_trees_planted || 1)) * 100}%;" title="Mati: ${ind.total_dead_trees} batang"></div>
              <div class="stack-seg seg-missing" style="width: ${((ind.total_missing_trees || 0) / (ind.total_trees_planted || 1)) * 100}%;" title="Hilang: ${ind.total_missing_trees} batang"></div>
            </div>

            <!-- Legend Grid -->
            <div class="condition-legend-grid">
              <div class="legend-item">
                <span class="legend-dot green"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Hidup</span>
                  <span class="legend-count"><strong>${ind.total_alive_trees}</strong> batang (${ind.survival_rate}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot red"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Mati</span>
                  <span class="legend-count"><strong>${ind.total_dead_trees}</strong> batang (${(((ind.total_dead_trees || 0) / (ind.total_trees_planted || 1)) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot orange"></span>
                <div class="legend-text">
                  <span class="legend-name">Pohon Hilang / Tidak Ditemukan</span>
                  <span class="legend-count"><strong>${ind.total_missing_trees}</strong> batang (${(((ind.total_missing_trees || 0) / (ind.total_trees_planted || 1)) * 100).toFixed(1)}%)</span>
                </div>
              </div>
              <div class="legend-item">
                <span class="legend-dot gray"></span>
                <div class="legend-text">
                  <span class="legend-name">Belum Diperiksa</span>
                  <span class="legend-count"><strong>${ind.total_uninspected_trees || 0}</strong> batang (0%)</span>
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
                Saat ini sistem baru mencatat <strong>1 periode survei lapangan baseline</strong> (Survei: ${escapeHtml(ind.latest_survey_date || '01 Jan 2026')}).
              </p>
              <div class="empty-trend-steps">
                <div class="trend-step completed">
                  <span class="step-num">✓</span>
                  <span><strong>Periode 1 (Baseline):</strong> Sensus Awal (${ind.carbon_stock_ton_c} Ton C / ${ind.carbon_stock_co2e_ton} Ton CO₂e)</span>
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
                value="${escapeHtml(currentSpeciesSearch)}"
              />
            </div>
          </div>
          <div class="chart-body">
            <div class="species-horizontal-bars">
              ${
                filteredSpecies.length > 0
                  ? filteredSpecies
                      .map((sp) => {
                        const maxCount = 250;
                        const pct = Math.min(100, Math.round((sp.planted_count / maxCount) * 100));
                        return `
                    <div class="species-bar-row">
                      <div class="species-meta-row">
                        <span class="species-title">
                          <strong>${escapeHtml(sp.name)}</strong>
                          <em class="species-latin">(${escapeHtml(sp.scientific_name)})</em>
                        </span>
                        <div class="species-vals">
                          <span class="species-count">${sp.planted_count} ditanam • ${sp.estimated_alive} hidup</span>
                          <span class="species-co2e-badge">${sp.co2e_ton} Ton CO₂e</span>
                        </div>
                      </div>
                      <div class="species-bar-track">
                        <div class="species-bar-fill" style="width: ${pct}%;"></div>
                      </div>
                      <div class="species-sub-info">
                        <span>Berat Jenis Kayu (ρ): ${sp.wood_density} g/cm³</span>
                        <span>Stok Karbon: ${sp.carbon_stock_kg} kg C</span>
                      </div>
                    </div>
                  `;
                      })
                      .join('')
                  : `<div class="empty-search-alert">Tidak ada jenis pohon yang cocok dengan kata kunci "${escapeHtml(currentSpeciesSearch)}".</div>`
              }
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
              ${
                zonesTable.length > 0
                  ? zonesTable
                      .map(
                        (z, idx) => `
                  <tr>
                    <td><strong>${idx + 1}</strong></td>
                    <td>
                      <strong>${escapeHtml(z.name)}</strong><br/>
                      <span class="text-xs text-muted">Kode: ${escapeHtml(z.zone_code)}</span>
                    </td>
                    <td><strong>${z.area_ha}</strong> Ha</td>
                    <td><strong>${z.planted_trees?.toLocaleString()}</strong> bibit</td>
                    <td>${escapeHtml(z.latest_survey_date)}</td>
                    <td><span class="pill-verified">${z.survival_rate}% Hidup</span></td>
                    <td><span class="pill-completeness">${escapeHtml(z.data_completeness)}</span></td>
                    <td>
                      <strong>~${z.co2e_ton}</strong> Ton CO₂e<br/>
                      <span class="text-xs text-muted">(${z.carbon_stock_ton_c} Ton C)</span>
                    </td>
                    <td><span class="pill-waiting">${escapeHtml(z.delta_c)}</span></td>
                  </tr>
                `
                      )
                      .join('')
                  : `<tr><td colspan="9" class="text-center py-4">Belum ada kawasan yang terdaftar.</td></tr>`
              }
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
              <li><strong>Tanggal Pembaruan:</strong> ${escapeHtml(ind.latest_survey_date || '01 Januari 2026')}.</li>
              <li><strong>Cakupan Kawasan:</strong> ${escapeHtml(zonesTable[0]?.name || 'Kawasan Lamteuba')} (${ind.total_area_ha} Ha).</li>
              <li><strong>Metode Lapangan:</strong> Sensus 100% pohon tegakan awal pada plot restorasi.</li>
              <li><strong>Rata-rata Tinggi Tanaman:</strong> ${ind.average_height_cm} cm (~1,35 meter).</li>
              <li><strong>Rata-rata Diameter Batang (DBH):</strong> ${ind.average_diameter_cm} cm.</li>
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
  `;

  // Event Listeners for Filters
  const zoneSelect = document.getElementById('carbon-zone-filter');
  if (zoneSelect) {
    zoneSelect.addEventListener('change', async (e) => {
      currentZoneFilter = e.target.value;
      const url = currentZoneFilter === 'all' ? '/api/carbon/public-summary' : `/api/carbon/public-summary?zone_id=${currentZoneFilter}`;
      try {
        const r = await fetch(url);
        const d = await r.json();
        if (d.success) {
          carbonDataCache = d;
          renderCarbonDashboard(container, d);
        }
      } catch (err) {
        console.error('Filter error:', err);
      }
    });
  }

  const speciesSearchInput = document.getElementById('carbon-species-search');
  if (speciesSearchInput) {
    speciesSearchInput.addEventListener('input', (e) => {
      currentSpeciesSearch = e.target.value;
      renderCarbonDashboard(container, carbonDataCache);
      // restore focus
      const refreshedInput = document.getElementById('carbon-species-search');
      if (refreshedInput) {
        refreshedInput.focus();
        refreshedInput.setSelectionRange(currentSpeciesSearch.length, currentSpeciesSearch.length);
      }
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
