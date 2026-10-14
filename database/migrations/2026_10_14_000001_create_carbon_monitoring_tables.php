<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Membuat 4 tabel baru untuk modul Pengukuran Karbon Berkala EcoKawasan (Versi Revisi V4.1):
     * 1. carbon_survey_periods        - Periode survei berkala (T0, T1, dst.)
     * 2. carbon_species_parameters    - Master berat jenis kayu (rho) & sitasi ilmiah
     * 3. carbon_tree_measurements     - Pengukuran pohon sampel / individu faktual
     * 4. carbon_calculation_histories  - Snapshot histori kalkulasi karbon (immutable & versioned)
     */
    public function up(): void
    {
        // -------------------------------------------------------------
        // Validasi Defensif Pra-Migrasi:
        // Memastikan tidak ada tabel konflik yang sudah ada sebelumnya.
        // Jika tabel sudah ada, hentikan migrasi secara aman tanpa menimpa.
        // -------------------------------------------------------------
        $targetTables = [
            'carbon_survey_periods',
            'carbon_species_parameters',
            'carbon_tree_measurements',
            'carbon_calculation_histories',
        ];

        foreach ($targetTables as $table) {
            if (Schema::hasTable($table)) {
                throw new \RuntimeException(
                    "Tabel [{$table}] sudah terdeteksi di database. " .
                    "Migrasi dihentikan secara aman demi melindungi integritas skema."
                );
            }
        }

        // =============================================================
        // TABEL 1: carbon_survey_periods
        // =============================================================
        Schema::create('carbon_survey_periods', function (Blueprint $table) {
            $table->string('id', 100)->primary(); // e.g. 'CSP-KW01-2026-P01'
            $table->string('period_code', 50);    // e.g. 'PERIODE-2026-01'
            $table->string('planting_zone_id', 100);
            $table->string('planting_activity_id', 100)->nullable();
            $table->string('legacy_tree_survey_id', 100)->nullable();
            $table->unsignedInteger('period_number')->default(1);
            $table->enum('period_type', [
                'baseline',
                'periodic_monitoring',
                're_survey',
            ])->default('baseline');
            $table->date('survey_date_start');
            $table->date('survey_date_end')->nullable();
            $table->string('lead_surveyor', 255);
            $table->text('survey_team_members')->nullable();
            $table->enum('sampling_method', [
                'census_100_percent',
                'permanent_sample_plot',
            ])->default('census_100_percent');
            $table->unsignedInteger('total_trees_targeted')->default(0);
            $table->unsignedInteger('total_trees_recorded')->default(0);
            $table->enum('workflow_status', [
                'draft',
                'submitted_for_review',
                'verified_internal',
                'locked_calculation',
                'cancelled',
                'archived',
            ])->default('draft');
            $table->string('weather_condition', 100)->nullable();
            $table->string('field_equipment_used', 255)->nullable();
            $table->string('supporting_document_path', 255)->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            // Relasi & Foreign Keys
            $table->foreign('planting_zone_id', 'fk_csp_zone')
                ->references('id')
                ->on('planting_zones')
                ->onDelete('restrict');

            $table->foreign('planting_activity_id', 'fk_csp_activity')
                ->references('id')
                ->on('planting_activities')
                ->onDelete('set null');

            $table->foreign('legacy_tree_survey_id', 'fk_csp_legacy_survey')
                ->references('id')
                ->on('tree_surveys')
                ->onDelete('set null');

            $table->foreign('created_by', 'fk_csp_created_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            $table->foreign('updated_by', 'fk_csp_updated_by')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indeks & Keunikan
            $table->unique(['planting_zone_id', 'period_number'], 'uq_zone_period_num');
            $table->index(['survey_date_start', 'survey_date_end'], 'idx_csp_dates');
            $table->index('workflow_status', 'idx_csp_workflow');
        });

        // =============================================================
        // TABEL 2: carbon_species_parameters
        // =============================================================
        Schema::create('carbon_species_parameters', function (Blueprint $table) {
            $table->id();
            $table->string('tree_species_id', 100);

            // wood_density_g_cm3 dibuat nullable agar spesies baru berstatus needs_reference
            // dapat didaftarkan tanpa harus mengarang angka densitas kayu fiktif.
            // PENTING: Layanan kalkulasi (CarbonCalculationService) WAJIB menolak eksekusi
            // kalkulasi resmi bila terdapat spesies dengan wood_density_g_cm3 bernilai NULL
            // atau is_certified_for_calculation bernilai false.
            $table->decimal('wood_density_g_cm3', 5, 3)->nullable();
            $table->decimal('wood_density_min', 5, 3)->nullable();
            $table->decimal('wood_density_max', 5, 3)->nullable();
            $table->enum('applicable_allometric_model', [
                'chave_pantropical_2014',
                'indonesia_dipterocarp_general',
                'sapling_local_seedling_model',
            ])->default('chave_pantropical_2014');

            // Batas diameter empiris hanya sebagai batas screening data ukur,
            // bukan bukti otomatis bahwa formula valid untuk semua kondisi lokal.
            $table->decimal('min_diameter_validity_cm', 5, 2)->default(5.00);
            $table->decimal('max_diameter_validity_cm', 6, 2)->default(200.00);

            // Kolom rujukan ilmiah dibuat nullable agar spesies baru yang belum memiliki
            // pustaka tidak dipaksa mengisi data fiktif / teks palsu saat berstatus needs_reference.
            $table->string('literature_source', 255)->nullable();
            $table->string('citation_details', 255)->nullable();

            // Default konservatif: 'needs_reference' dan is_certified_for_calculation = false.
            // Parameter tanpa rujukan sah dilarang digunakan untuk menghasilkan kalkulasi resmi.
            $table->enum('validation_status', [
                'needs_reference',
                'validated_literature',
                'lab_tested_local',
            ])->default('needs_reference');
            $table->boolean('is_certified_for_calculation')->default(false);

            $table->text('review_notes')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            // Relasi & Foreign Keys
            $table->foreign('tree_species_id', 'fk_csparam_species')
                ->references('id')
                ->on('tree_species')
                ->onDelete('restrict');

            $table->foreign('updated_by', 'fk_csparam_user')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // 1 Jenis Pohon = 1 Parameter Aktif
            $table->unique('tree_species_id', 'uq_species_param');
        });

        // =============================================================
        // TABEL 3: carbon_tree_measurements
        // =============================================================
        Schema::create('carbon_tree_measurements', function (Blueprint $table) {
            $table->id();
            $table->string('survey_period_id', 100);
            $table->unsignedBigInteger('planting_activity_item_id')->nullable();
            $table->string('tree_species_id', 100);

            // Tautan Historis Antarperiode:
            // baseline_tree_measurement_id menautkan pohon di T1/T2 ke baris pengukurannya di periode T0.
            // PENTING & BATASAN SKEMA:
            // Foreign key ini menjamin integritas referensial fisik ke rekaman di tabel yang sama,
            // namun SKEMA DATABASE SAJA TIDAK DAPAT MENJAMIN:
            // 1. Bahwa rekaman rujukan bukan dirinya sendiri (self-reference: id = baseline_tree_measurement_id).
            // 2. Bahwa rantai rujukan antarperiode tidak membentuk siklus sirkular (A -> B -> A).
            // 3. Bahwa rekaman rujukan benar-benar berasal dari periode bertipe 'baseline' yang sah.
            // Seluruh aturan integritas relasi pohon ini WAJIB divalidasi dan ditegakkan secara ketat
            // pada lapisan validasi aplikasi (FormRequest / Service) saat transaksi data ukur disimpan.
            $table->unsignedBigInteger('baseline_tree_measurement_id')->nullable();

            // Metode Identifikasi Pohon Nyata
            $table->enum('tree_identity_method', [
                'physical_tag',
                'permanent_sample_plot',
            ])->default('physical_tag');
            $table->string('tree_tag_code', 100)->nullable();
            $table->string('plot_code', 50)->nullable();
            $table->unsignedInteger('tree_sequence_in_plot')->nullable();
            $table->boolean('is_replanted')->default(false);

            // Status Kehidupan Faktual
            $table->enum('tree_condition', [
                'alive',
                'dead',
                'missing',
                'uninspected',
            ])->default('alive');
            $table->enum('health_status', [
                'sehat',
                'merana',
                'serangan_hama',
                'pucuk_patah',
            ])->default('sehat');

            // Dimensi Lapangan Berstandar Silvikultur
            // stem_diameter_cm dan height_m WAJIB NULL bila pohon mati atau hilang.
            $table->decimal('stem_diameter_cm', 6, 2)->nullable();

            // Default jenis diameter diatur ke 'd_breast_height_130' (standar allometri pohon dewasa).
            // PENTING & BATASAN SKEMA:
            // Keberadaan default ini semata-mata untuk kompatibilitas skema database. Skema database
            // TIDAK DAPAT secara otomatis mengetahui apakah suatu pohon memenuhi syarat pengukuran DBH.
            // Aplikasi wajib menentukan metode pengukuran berdasarkan kondisi fisik pohon di lapangan,
            // dan layanan kalkulasi wajib menolak kombinasi diameter/model yang tidak sesuai
            // (misal: menerapkan formula pohon dewasa Chave 2014 pada diameter pangkal d_ground_base_10
            // tanpa model konversi semai yang sah).
            $table->enum('diameter_measurement_type', [
                'd_breast_height_130',
                'd_ground_base_10',
                'd_ground_base_30',
                'root_collar',
            ])->default('d_breast_height_130');
            $table->decimal('measurement_height_above_ground_cm', 5, 2)->nullable();
            $table->decimal('height_m', 6, 2)->nullable();
            $table->decimal('crown_diameter_m', 5, 2)->nullable();

            // Koordinat & Bukti Lapangan
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('photo_path', 255)->nullable();
            $table->string('field_notes', 255)->nullable();
            $table->boolean('is_outlier_flagged')->default(false);
            $table->string('outlier_reason', 255)->nullable();
            $table->timestamps();

            // Relasi & Foreign Keys
            // MENGGUNAKAN RESTRICT: Data pengukuran pohon harus dipertahankan secara utuh
            // bila suatu periode dibatalkan atau diarsipkan; penghapusan fisik periode dilarang.
            $table->foreign('survey_period_id', 'fk_ctm_period')
                ->references('id')
                ->on('carbon_survey_periods')
                ->onDelete('restrict');

            $table->foreign('tree_species_id', 'fk_ctm_species')
                ->references('id')
                ->on('tree_species')
                ->onDelete('restrict');

            $table->foreign('planting_activity_item_id', 'fk_ctm_item')
                ->references('id')
                ->on('planting_activity_items')
                ->onDelete('set null');

            // MENGGUNAKAN RESTRICT: Mencegah penghapusan rekaman baseline pohon jika masih dirujuk
            // oleh pengukuran periode lanjutan (T1, T2, dst.), demi menjaga keterlacakan historis.
            $table->foreign('baseline_tree_measurement_id', 'fk_ctm_baseline')
                ->references('id')
                ->on('carbon_tree_measurements')
                ->onDelete('restrict');

            // Indeks & Keunikan
            // CATATAN DATABASE: Karena tree_tag_code, plot_code, dan tree_sequence_in_plot bernilai nullable,
            // MySQL mengizinkan nilai NULL berulang dalam indeks unik. Oleh karena itu, unique constraint ini
            // menjadi benteng lapisan basis data saat nilai terisi, namun penegakan integritas identitas pohon
            // secara menyeluruh wajib didukung oleh validasi formulir dan transaksi pada lapisan aplikasi.
            $table->unique(['survey_period_id', 'plot_code', 'tree_sequence_in_plot'], 'uq_period_plot_seq');
            $table->unique(['survey_period_id', 'tree_tag_code'], 'uq_period_tree_tag');
            $table->index('tree_condition', 'idx_ctm_condition');
            $table->index('tree_species_id', 'idx_ctm_species');
            $table->index('baseline_tree_measurement_id', 'idx_ctm_baseline');
        });

        // =============================================================
        // TABEL 4: carbon_calculation_histories
        // =============================================================
        Schema::create('carbon_calculation_histories', function (Blueprint $table) {
            $table->id();
            $table->string('survey_period_id', 100);
            $table->string('comparison_period_id', 100)->nullable();
            $table->unsignedBigInteger('parent_calculation_id')->nullable();
            $table->unsignedInteger('version_number')->default(1);
            $table->timestamp('calculation_timestamp');

            // Metodologi & Parameter Snapshot (Immutable)
            $table->string('calculation_version_code', 50);
            $table->string('allometric_formula_name', 100);
            $table->text('formula_expression_text');
            $table->decimal('carbon_fraction_used', 5, 4)->default(0.4700);
            $table->decimal('root_to_shoot_ratio_used', 5, 4)->default(0.2400);
            $table->decimal('co2_conversion_factor_used', 7, 5)->default(3.66667);

            // Default 'tier_1_preliminary' mencerminkan estimasi awal ilmiah berbasis parameter literatur,
            // bukan klaim bahwa metode Tier 1 telah terkalibrasi secara destruktif untuk seluruh spesies lokal.
            $table->enum('biomass_tier_level', [
                'tier_1_preliminary',
                'tier_2_regional_allometry',
                'tier_3_destructive_field_calibrated',
            ])->default('tier_1_preliminary');

            // Populasi & Sensus
            $table->unsignedInteger('total_trees_evaluated')->default(0);
            $table->unsignedInteger('total_trees_alive')->default(0);
            $table->unsignedInteger('total_trees_dead')->default(0);
            $table->unsignedInteger('total_trees_missing')->default(0);
            $table->decimal('survival_rate_percent', 5, 2)->default(0.00);

            // Hasil Agregasi Stok Biomassa & Karbon (Hanya Pohon Hidup)
            $table->decimal('total_agb_kg', 14, 4)->default(0.0000);
            $table->decimal('total_bgb_kg', 14, 4)->default(0.0000);
            $table->decimal('total_biomass_kg', 14, 4)->default(0.0000);
            $table->decimal('total_carbon_stock_ton_c', 12, 5)->default(0.00000);
            $table->decimal('total_co2e_ton', 12, 5)->default(0.00000);

            // Perubahan Stok Karbon Antarkala (Delta C)
            // Wajib NULL bila periode baseline atau cakupan tidak sebanding.
            // PENTING: Perubahan stok karbon (Delta C) merefleksikan dinamika selisih biomassa vegetasi,
            // dan TIDAK BOLEH disamakan secara langsung dengan serapan bersih proyek atau kredit karbon.
            $table->decimal('delta_c_ton_c', 12, 5)->nullable();
            $table->decimal('delta_co2e_ton', 12, 5)->nullable();
            $table->decimal('time_interval_years', 5, 2)->nullable();
            $table->decimal('annualized_delta_co2e_ton', 12, 5)->nullable();
            $table->enum('delta_c_status', [
                'baseline_initial',
                'calculated_valid',
                'incomparable_scope',
            ])->default('baseline_initial');
            $table->string('incomparable_reason', 255)->nullable();

            // Arsip Snapshot Input & Rincian Jenis Pohon
            $table->json('species_breakdown_archive');
            $table->json('parameters_snapshot_archive');

            // Status Validasi, Penguncian, & Single-Active-Version Lock
            $table->enum('validation_level', [
                'preliminary_estimate',
                'internal_silviculture_verified',
                'independent_audit_verified',
            ])->default('preliminary_estimate');
            $table->boolean('is_active_version')->default(true);

            // Kolom is_locked adalah penanda status pada baris data.
            // PENTING: Nilai boolean is_locked BUKAN mekanisme yang dengan sendirinya membuat data
            // immutable di tingkat database engine. Perlindungan immutabilitas sejati terhadap histori
            // yang sudah disahkan wajib ditegakkan melalui otorisasi aplikasi (kebijakan read-only)
            // dan versioning append-only di mana setiap perubahan diwujudkan sebagai rekaman versi baru.
            $table->boolean('is_locked')->default(true);

            // Kolom virtual stored untuk menjamin MAKSIMAL SATU versi aktif per periode survei.
            // CATATAN ARSITEKTUR & PROSEDUR TRANSAKSI APLIKASI:
            // 1. Indeks unik ini menjamin MAKSIMAL SATU baris dengan is_active_version = 1 untuk satu periode,
            //    tetapi TIDAK menjamin bahwa selalu ada versi aktif (misal bila seluruh versi diarsipkan).
            // 2. Prosedur Aktivasi Versi Baru yang Aman:
            //    Saat mengaktifkan versi kalkulasi baru (misal v2) di Controller/Service, aplikasi WAJIB
            //    menjalankan transaksi database yang mengeksekusi urutan:
            //    Langkah 1: UPDATE versi lama menjadi is_active_version = false.
            //    Langkah 2: UPDATE / INSERT versi baru dengan is_active_version = true.
            //    Urutan ini mutlak diperlukan agar tidak melanggar unique constraint uq_cch_single_active_per_period.
            $table->string('active_period_lock_key', 100)
                ->storedAs("CASE WHEN is_active_version = 1 THEN survey_period_id ELSE NULL END")
                ->nullable();

            $table->unsignedBigInteger('executed_by')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            // Relasi & Perlindungan Histori
            // Menggunakan RESTRICT agar periode survei yang telah memiliki histori kalkulasi
            // tidak dapat dihapus secara fisik dari database.
            $table->foreign('survey_period_id', 'fk_cch_period')
                ->references('id')
                ->on('carbon_survey_periods')
                ->onDelete('restrict');

            $table->foreign('comparison_period_id', 'fk_cch_comparison')
                ->references('id')
                ->on('carbon_survey_periods')
                ->onDelete('restrict');

            $table->foreign('parent_calculation_id', 'fk_cch_parent')
                ->references('id')
                ->on('carbon_calculation_histories')
                ->onDelete('restrict');

            $table->foreign('executed_by', 'fk_cch_user')
                ->references('id')
                ->on('users')
                ->onDelete('set null');

            // Indeks & Keunikan
            // 1. Menjamin nomor versi (v1, v2, v3...) unik per periode survei
            $table->unique(['survey_period_id', 'version_number'], 'uq_cch_period_version');
            // 2. Menjamin maksimal satu versi aktif per periode survei
            $table->unique('active_period_lock_key', 'uq_cch_single_active_per_period');
            $table->index('survey_period_id', 'idx_cch_period');
        });
    }

    /**
     * Reverse the migrations.
     *
     * PERHATIAN RISIKO DESTRUKTIF:
     * Metode down() ini HANYA boleh dipanggil bila migrasi perlu di-rollback secara eksplisit.
     * Eksekusi down() akan MENGHAPUS SELURUH TABEL PENGUKURAN DAN HISTORI KARBON BESERTA SELURUH
     * REKAMAN DATA DI DALAMNYA secara permanen.
     *
     * DILARANG menjalankan rollback pada database produksi atau database yang telah memuat
     * data sensus lapangan berharga tanpa prosedur pencadangan (backup) terverifikasi.
     *
     * Urutan penghapusan dilakukan secara terbalik sesuai hierarki foreign key.
     */
    public function down(): void
    {
        // 1. Hapus tabel histori kalkulasi (anak yang merujuk periode dan rekaman induknya)
        Schema::dropIfExists('carbon_calculation_histories');

        // 2. Hapus tabel data ukur pohon (anak yang merujuk periode)
        Schema::dropIfExists('carbon_tree_measurements');

        // 3. Hapus tabel parameter spesies
        Schema::dropIfExists('carbon_species_parameters');

        // 4. Hapus tabel induk periode survei
        Schema::dropIfExists('carbon_survey_periods');
    }
};
