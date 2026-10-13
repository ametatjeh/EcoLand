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
        if (!Schema::hasTable('planting_activity_items')) {
            Schema::create('planting_activity_items', function (Blueprint $table) {
                $table->id();
                $table->string('planting_activity_id', 100)->index();
                $table->string('tree_species_id', 100)->index();
                $table->unsignedInteger('quantity'); // Jumlah bibit yang ditanam
                $table->string('unit', 50)->default('batang');
                $table->string('seed_source', 255)->nullable(); // Asal / sumber bibit
                $table->text('notes')->nullable();
                $table->text('correction_log')->nullable(); // Riwayat koreksi jika ada perubahan
                $table->timestamps();

                $table->foreign('planting_activity_id')
                    ->references('id')
                    ->on('planting_activities')
                    ->cascadeOnDelete();

                $table->foreign('tree_species_id')
                    ->references('id')
                    ->on('tree_species')
                    ->restrictOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planting_activity_items');
    }
};
