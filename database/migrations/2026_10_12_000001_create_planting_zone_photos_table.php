<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('planting_zone_photos')) {
            Schema::create('planting_zone_photos', function (Blueprint $table) {
                $table->id();
                $table->string('planting_zone_id', 100)->index();
                $table->string('file_path', 255);
                $table->string('thumbnail_path', 255)->nullable();
                $table->string('title', 255)->nullable();
                $table->text('caption')->nullable();
                $table->string('alt_text', 255)->nullable();
                $table->string('category', 100)->default('Kondisi Kawasan')->index();
                $table->date('documented_at')->nullable()->index();
                $table->integer('sort_order')->default(0)->index();
                $table->boolean('is_cover')->default(false)->index();
                $table->boolean('is_published')->default(true)->index();
                $table->unsignedBigInteger('file_size')->nullable();
                $table->string('mime_type', 50)->nullable();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->softDeletes();
                $table->timestamps();

                $table->foreign('planting_zone_id')
                    ->references('id')
                    ->on('planting_zones')
                    ->onDelete('cascade');
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('planting_zone_photos');
    }
};
