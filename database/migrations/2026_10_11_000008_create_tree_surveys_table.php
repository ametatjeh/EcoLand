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
        if (!Schema::hasTable('tree_surveys')) {
            Schema::create('tree_surveys', function (Blueprint $table) {
                $table->string('id', 100)->primary();
                $table->date('survey_date')->index();
                $table->string('planting_activity_id', 100)->index();
                $table->string('tree_species_id', 100)->nullable()->index();
                $table->unsignedInteger('alive_count'); // Tanaman hidup dari kelompok awal
                $table->unsignedInteger('dead_count')->default(0); // Tanaman mati
                $table->unsignedInteger('missing_count')->default(0); // Tanaman hilang / belum ditemukan
                $table->unsignedInteger('uninspected_count')->default(0); // Belum diperiksa
                $table->decimal('average_height_cm', 8, 2)->nullable(); // Opsional
                $table->decimal('average_diameter_cm', 8, 2)->nullable(); // Opsional
                $table->string('health_condition', 50)->default('baik');
                $table->text('damage_symptoms')->nullable();
                $table->string('photo_path', 255)->nullable();
                $table->string('inspector_name', 255);
                $table->text('field_notes')->nullable();
                $table->text('recommendations')->nullable();
                $table->boolean('is_verified')->default(true)->index();
                $table->boolean('is_estimate')->default(false); // Memisahkan data ukur vs estimasi
                $table->timestamps();

                $table->foreign('planting_activity_id')
                    ->references('id')
                    ->on('planting_activities')
                    ->cascadeOnDelete();

                $table->foreign('tree_species_id')
                    ->references('id')
                    ->on('tree_species')
                    ->nullOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tree_surveys');
    }
};
