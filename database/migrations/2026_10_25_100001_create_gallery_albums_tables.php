<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('gallery_albums')) {
            Schema::create('gallery_albums', function (Blueprint $table) {
                $table->id();
                $table->string('title', 255);
                $table->string('slug', 255)->unique();
                $table->text('description')->nullable();
                $table->string('category', 100)->default('Dokumentasi Lainnya')->index();
                $table->unsignedBigInteger('cover_photo_id')->nullable();
                $table->string('planting_zone_id', 100)->nullable()->index();
                $table->date('activity_date')->nullable()->index();
                $table->boolean('is_published')->default(true)->index();
                $table->integer('sort_order')->default(0)->index();
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
                $table->softDeletes();
                $table->timestamps();

                $table->foreign('cover_photo_id')
                    ->references('id')
                    ->on('planting_zone_photos')
                    ->nullOnDelete();

                $table->foreign('planting_zone_id')
                    ->references('id')
                    ->on('planting_zones')
                    ->nullOnDelete();
            });
        }

        if (!Schema::hasTable('gallery_album_photos')) {
            Schema::create('gallery_album_photos', function (Blueprint $table) {
                $table->id();
                $table->foreignId('gallery_album_id')->constrained('gallery_albums')->cascadeOnDelete();
                $table->unsignedBigInteger('planting_zone_photo_id');
                $table->integer('sort_order')->default(0);
                $table->timestamps();

                $table->foreign('planting_zone_photo_id')
                    ->references('id')
                    ->on('planting_zone_photos')
                    ->cascadeOnDelete();

                $table->unique(['gallery_album_id', 'planting_zone_photo_id'], 'album_photo_unique');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('gallery_album_photos');
        Schema::dropIfExists('gallery_albums');
    }
};
