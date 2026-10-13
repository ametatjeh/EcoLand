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
        if (Schema::hasTable('hotspots')) {
            Schema::table('hotspots', function (Blueprint $table) {
                if (!Schema::hasColumn('hotspots', 'info_source_type')) {
                    $table->string('info_source_type', 50)->default('manual')->after('icon');
                }
                if (!Schema::hasColumn('hotspots', 'tree_species_id')) {
                    $table->string('tree_species_id', 100)->nullable()->after('info_source_type');
                    $table->foreign('tree_species_id')
                        ->references('id')
                        ->on('tree_species')
                        ->nullOnDelete();
                }
                if (!Schema::hasColumn('hotspots', 'planting_activity_id')) {
                    $table->string('planting_activity_id', 100)->nullable()->after('tree_species_id');
                    $table->foreign('planting_activity_id')
                        ->references('id')
                        ->on('planting_activities')
                        ->nullOnDelete();
                }
                if (!Schema::hasColumn('hotspots', 'display_settings')) {
                    $table->json('display_settings')->nullable()->after('planting_activity_id');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('hotspots')) {
            Schema::table('hotspots', function (Blueprint $table) {
                if (Schema::hasColumn('hotspots', 'planting_activity_id')) {
                    $table->dropForeign(['planting_activity_id']);
                    $table->dropColumn('planting_activity_id');
                }
                if (Schema::hasColumn('hotspots', 'tree_species_id')) {
                    $table->dropForeign(['tree_species_id']);
                    $table->dropColumn('tree_species_id');
                }
                if (Schema::hasColumn('hotspots', 'info_source_type')) {
                    $table->dropColumn('info_source_type');
                }
                if (Schema::hasColumn('hotspots', 'display_settings')) {
                    $table->dropColumn('display_settings');
                }
            });
        }
    }
};
