/**
 * Konfigurasi Proyek Virtual Tour Kawasan Penanaman Pohon
 *
 * Semua informasi dapat dikonfigurasi melalui berkas ini.
 * Informasi luas merupakan data deskriptif proyek, bukan hasil kalkulasi poligon GPS.
 */

export const projectConfig = {
  namaAplikasi: 'Eco Land',
  namaProyek: 'Kawasan Penanaman Pohon',
  subjudul: 'Virtual Tour 360° Pemulihan Ekosistem & Silvikultur',
  organisasi: 'IKHW Aceh — Inisiatif Konservasi & Hutan Wakaf',
  domain: 'ikhw.org',
  emailKontak: 'info@ikhw.org',

  // Luas deskriptif kawasan (sekitar 2 hektare)
  luasDeskriptif: '±2 Hektare',
  luasDetail: 'Kurang lebih 20.000 m² (2 Hektare)',
  targetBibit: '1.000+ Batang Pohon Lokal',

  // Titik koordinat referensi acuan kawasan (WGS84)
  lokasiReferensi: {
    nama: 'Titik Patok Referensi Acuan Kawasan',
    latitude: 5.4818556,
    longitude: 95.5840917,
    sistemKoordinat: 'WGS84 / EPSG:4326',
    keterangan: 'Koordinat titik acuan penanda lokasi lapangan (bukan poligon batas).',
  },

  deskripsi:
    'Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.',

  tujuanProgram: [
    'Penghijauan dan pemulihan tutupan kanopi pohon pada lahan terbuka.',
    'Pencegahan erosi tanah dan perbaikan tata kelola resapan air hujan.',
    'Penyediaan koridor pakan alami bagi satwa liar dan burung lokal.',
    'Edukasi publik melalui dokumentasi visual Virtual Tour 360° berkala.',
  ],

  pengelola: {
    penanggungJawab: 'Tim Konservasi & Pemulihan Ekosistem IKHW Aceh',
    kontak: 'info@ikhw.org',
    lokasiAdministratif: 'Provinsi Aceh, Indonesia',
  },
};

export default projectConfig;
