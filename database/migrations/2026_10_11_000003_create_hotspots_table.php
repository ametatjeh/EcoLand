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
        if (!Schema::hasTable('hotspots')) {
            Schema::create('hotspots', function (Blueprint $table) {
                $table->string('id', 100)->primary();
                $table->string('scene_id', 100)->index();
                $table->string('type', 20)->default('link'); // 'link' or 'info'
                $table->double('yaw')->default(0.0);
                $table->double('pitch')->default(0.0);
                $table->double('rotation')->default(0.0);
                $table->string('target_scene_id', 100)->nullable()->index();
                $table->string('title', 255)->nullable();
                $table->longText('text')->nullable();
                $table->string('icon', 50)->nullable();
                $table->boolean('is_active')->default(true)->index();
                $table->string('status', 20)->default('draft')->index(); // 'draft' or 'published'
                $table->string('version_id', 50)->nullable();
                $table->string('source', 50)->default('custom'); // 'export' or 'custom'
                $table->timestamps();

                $table->foreign('scene_id')
                    ->references('id')
                    ->on('scenes')
                    ->onDelete('cascade');

                $table->foreign('target_scene_id')
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
        Schema::dropIfExists('hotspots');
    }
};
