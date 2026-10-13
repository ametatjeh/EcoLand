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
        if (!Schema::hasTable('scenes')) {
            Schema::create('scenes', function (Blueprint $table) {
                $table->string('id', 100)->primary();
                $table->string('name', 255);
                $table->integer('sequence')->default(1);
                $table->string('status', 50)->default('tersedia');
                $table->text('description')->nullable();
                $table->string('panorama_path', 255)->nullable();
                $table->string('thumbnail_path', 255)->nullable();
                $table->string('preview_path', 255)->nullable();
                $table->decimal('latitude', 10, 7)->nullable();
                $table->decimal('longitude', 10, 7)->nullable();
                $table->integer('face_size')->default(896);
                $table->double('initial_yaw')->default(0.0);
                $table->double('initial_pitch')->default(0.0);
                $table->double('initial_fov')->default(1.3945993259187417);
                $table->json('levels_json')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scenes');
    }
};
