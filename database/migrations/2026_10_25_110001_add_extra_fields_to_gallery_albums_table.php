<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gallery_albums', function (Blueprint $table) {
            if (!Schema::hasColumn('gallery_albums', 'organizer')) {
                $table->string('organizer', 255)->nullable()->after('category');
            }
            if (!Schema::hasColumn('gallery_albums', 'location_name')) {
                $table->string('location_name', 255)->nullable()->after('planting_zone_id');
            }
        });
    }

    public function down(): void
    {
        Schema::table('gallery_albums', function (Blueprint $table) {
            if (Schema::hasColumn('gallery_albums', 'location_name')) {
                $table->dropColumn('location_name');
            }
            if (Schema::hasColumn('gallery_albums', 'organizer')) {
                $table->dropColumn('organizer');
            }
        });
    }
};
