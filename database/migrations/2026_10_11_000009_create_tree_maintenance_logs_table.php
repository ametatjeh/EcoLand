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
        if (!Schema::hasTable('tree_maintenance_logs')) {
            Schema::create('tree_maintenance_logs', function (Blueprint $table) {
                $table->string('id', 100)->primary();
                $table->date('maintenance_date')->index();
                $table->string('planting_activity_id', 100)->index();
                $table->string('tree_species_id', 100)->nullable()->index();
                $table->enum('action_type', [
                    'penyiraman',
                    'penyiangan',
                    'pemupukan',
                    'perlindungan_bibit',
                    'pengendalian_gangguan',
                    'penyulaman'
                ])->index();
                $table->unsignedInteger('plants_handled_count')->default(0); // Tanaman yang ditangani
                $table->unsignedInteger('replacement_plants_count')->default(0); // Bibit pengganti (penyulaman)
                $table->text('action_reason')->nullable();
                $table->string('officer_or_team', 255);
                $table->decimal('cost', 12, 2)->nullable();
                $table->string('photo_before_path', 255)->nullable();
                $table->string('photo_after_path', 255)->nullable();
                $table->text('notes')->nullable();
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
        Schema::dropIfExists('tree_maintenance_logs');
    }
};
