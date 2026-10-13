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
        if (!Schema::hasTable('planting_activities')) {
            Schema::create('planting_activities', function (Blueprint $table) {
                $table->string('id', 100)->primary();
                $table->string('batch_code', 100)->unique()->index();
                $table->string('name', 255);
                $table->date('activity_date')->index();
                $table->string('person_in_charge', 255);
                $table->string('organizer', 255);
                $table->string('location_zone', 255)->index(); // Zona deskriptif (tanpa batas poligon)
                $table->string('scene_id', 100)->nullable()->index(); // Referensi panorama Marzipano
                $table->string('photo_path', 255)->nullable();
                $table->text('notes')->nullable();
                $table->timestamps();

                $table->foreign('scene_id')
                    ->references('id')
                    ->on('scenes')
                    ->nullOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planting_activities');
    }
};
