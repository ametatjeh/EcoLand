<?php

namespace Database\Seeders;

use App\Models\TreeSpecies;
use Illuminate\Database\Seeder;

class TreeSpeciesSeeder extends Seeder
{
    /**
     * Run the database seeds for Tree Species demo data.
     */
    public function run(): void
    {
        $speciesData = [
            [
                'id' => 'merbau-aceh',
                'local_name' => 'Merbau Aceh / Bak Ipil',
                'common_name' => 'Merbau',
                'scientific_name' => 'Intsia bijuga',
                'family' => 'Fabaceae',
                'origin_status' => 'lokal_asli',
                'ecological_function' => 'Pohon kanopi utama bernilai konservasi tinggi, perakaran dalam mengikat agregat tanah lereng dan mencegah erosi.',
                'benefits' => 'Penyerap karbon biomassa tinggi, penghasil serasah penstabil kelembaban tanah mikroklimat.',
                'description' => 'Spesies pohon kayu keras bernilai konservasi tinggi yang tumbuh di kawasan pesisir hingga perbukitan rendah. Memiliki toleransi tanah yang baik dan daun majemuk yang lebat.',
                'reference_source' => 'Flora Malesiana & Balai Pengelolaan DAS Hutan Lindung (BPDASHL) Krueng Aceh',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'id' => 'geurundong',
                'local_name' => 'Geurundong',
                'common_name' => 'Kedondong Hutan',
                'scientific_name' => 'Spondias pinnata',
                'family' => 'Anacardiaceae',
                'origin_status' => 'lokal_asli',
                'ecological_function' => 'Pohon peneduh cepat tumbuh (fast growing), buah hutan menjadi pakan alami burung frugivora dan primata kanopi.',
                'benefits' => 'Penyedia pakan satwa liar penyebar biji alami dan penahan terik matahari untuk bibit muda di bawahnya.',
                'description' => 'Pohon berakar tunggang dalam dengan tajuk melebar, umum dijumpai di bentang alam Sumatera dan Aceh. Buahnya digemari satwa hutan dan daun mudanya dapat dimanfaatkan masyarakat lokal.',
                'reference_source' => 'Pusat Riset Konservasi Tumbuhan dan Kebun Raya BRIN',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'id' => 'gaharu-lokal',
                'local_name' => 'Gaharu / Bak Kareh',
                'common_name' => 'Gaharu Malaka',
                'scientific_name' => 'Aquilaria malaccensis',
                'family' => 'Thymelaeaceae',
                'origin_status' => 'lokal_asli',
                'ecological_function' => 'Pohon strata tengah bernilai ekologis tinggi, mendukung keanekaragaman mikrobioma tanah dan tajuk tegakan.',
                'benefits' => 'Pohon bernilai konservasi dan penyerap karbon, daun dan kayunya beraroma khas.',
                'description' => 'Spesies pohon hutan hujan tropis yang terkenal dengan resin aromatiknya. Berfungsi sangat baik dalam pengayaan keanekaragaman hayati plot restorasi kawasan.',
                'reference_source' => 'IUCN Red List & Herbarium Bogoriense BRIN',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'id' => 'jeumpa-aceh',
                'local_name' => 'Bungong Jeumpa / Bak Jeumpa',
                'common_name' => 'Cempaka Kuning',
                'scientific_name' => 'Magnolia champaca',
                'family' => 'Magnoliaceae',
                'origin_status' => 'lokal_asli',
                'ecological_function' => 'Pohon berbunga harum penarik serangga penyerbuk (polinator) hutan alami dan lebah madu liar.',
                'benefits' => 'Ikon floristik Aceh, pengayaan estetika lanskap kawasan dan konservasi plasma nutfah lokal.',
                'description' => 'Pohon berdaun rimbun hijau sepanjang tahun dengan bunga berwarna kuning-oranye yang sangat harum. Tumbuh baik pada tanah berdrainase baik dengan kelembapan cukup.',
                'reference_source' => 'Daftar Flora Identitas Daerah & Balai Riset Standardisasi Industri Banda Aceh',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'id' => 'trembesi',
                'local_name' => 'Kayu Ambon / Trembesi',
                'common_name' => 'Trembesi',
                'scientific_name' => 'Samanea saman',
                'family' => 'Fabaceae',
                'origin_status' => 'introduksi',
                'ecological_function' => 'Pohon penyerapan karbon dioksida tertinggi per pohon, tajuk memayungi tanah luas dan menurunkan suhu mikroklimat.',
                'benefits' => 'Peneduh awal areal terdegradasi, fiksasi nitrogen tanah melalui simbiosis perakaran bintil akar.',
                'description' => 'Pohon besar dengan kanopi menyerupai payung yang sangat lebar. Efektif menurunkan temperatur mikrolingkungan dan memulihkan kondisi fisik tanah yang tandus.',
                'reference_source' => 'Kementerian Lingkungan Hidup dan Kehutanan (KLHK)',
                'photo_path' => null,
                'is_active' => true,
            ],
            [
                'id' => 'salam-hutan',
                'local_name' => 'Bak Salam / Ubar',
                'common_name' => 'Daun Salam Hutan',
                'scientific_name' => 'Syzygium polyanthum',
                'family' => 'Myrtaceae',
                'origin_status' => 'lokal_asli',
                'ecological_function' => 'Pohon buah hutan kecil pakan burung pemakan buah, perakaran serabut dan tunggang menstabilkan tepian aliran resapan air.',
                'benefits' => 'Daun rempah aromatik, kayu sekunder, dan sumber pakan fauna penyerbuk alami.',
                'description' => 'Pohon berukuran sedang dengan kulit batang abu-abu kecokelatan. Buahnya yang matang berwarna merah kehitaman disukai oleh burung liar lokal.',
                'reference_source' => 'Herbarium Andalas & Panduan Lapangan Pohon Pakan Satwa',
                'photo_path' => null,
                'is_active' => true,
            ],
        ];

        foreach ($speciesData as $data) {
            TreeSpecies::updateOrCreate(
                ['scientific_name' => $data['scientific_name']],
                $data
            );
        }
    }
}
