<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('tree_species')) {
            Schema::create('tree_species', function (Blueprint $table) {
                $table->string('id', 100)->primary(); // misal 'jeumpa', 'trembesi', dll
                $table->string('local_name', 255)->nullable(); // Nama lokal / daerah
                $table->string('common_name', 255); // Nama umum bahasa Indonesia
                $table->string('scientific_name', 255)->unique(); // Nama ilmiah (unik, cegah duplikasi)
                $table->string('family', 255)->nullable(); // Famili botani
                $table->enum('origin_status', ['lokal_asli', 'introduksi', 'belum_diverifikasi'])->default('belum_diverifikasi');
                $table->text('ecological_function')->nullable(); // Fungsi ekologis
                $table->text('benefits')->nullable(); // Manfaat atau kegunaan
                $table->longText('description')->nullable(); // Deskripsi
                $table->string('photo_path', 255)->nullable(); // Path foto pohon
                $table->string('reference_source', 255)->nullable(); // Sumber referensi identifikasi
                $table->boolean('is_active')->default(true)->index(); // Status aktif/nonaktif
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tree_species');
    }
};
