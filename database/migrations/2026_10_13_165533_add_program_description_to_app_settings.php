<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('app_settings')) {
            $existing = DB::table('app_settings')->where('key', 'program_description')->first();
            if (!$existing) {
                DB::table('app_settings')->insert([
                    'key' => 'program_description',
                    'value' => 'Inisiatif restorasi bentang lahan dan pemulihan keanekaragaman hayati seluas kurang lebih 2 hektare. Program ini berfokus pada pengayaan tutupan vegetasi menggunakan spesies pohon kayu keras endemik Aceh dan pohon buah hutan pakan satwa.',
                    'group' => 'general',
                    'label' => 'Deskripsi Program/Kawasan',
                    'type' => 'textarea',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('app_settings')) {
            DB::table('app_settings')->where('key', 'program_description')->delete();
        }
    }
};
