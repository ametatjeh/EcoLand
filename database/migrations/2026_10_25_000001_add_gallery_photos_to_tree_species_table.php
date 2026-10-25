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
        if (Schema::hasTable('tree_species') && !Schema::hasColumn('tree_species', 'gallery_photos')) {
            Schema::table('tree_species', function (Blueprint $table) {
                $table->json('gallery_photos')->nullable()->after('photo_path');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('tree_species') && Schema::hasColumn('tree_species', 'gallery_photos')) {
            Schema::table('tree_species', function (Blueprint $table) {
                $table->dropColumn('gallery_photos');
            });
        }
    }
};
