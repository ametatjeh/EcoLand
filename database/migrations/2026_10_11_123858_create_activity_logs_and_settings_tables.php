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
        if (!Schema::hasTable('activity_logs')) {
            Schema::create('activity_logs', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->nullable()->index();
                $table->string('user_name', 255)->nullable();
                $table->string('action', 100)->index();
                $table->string('module', 100)->index(); // zones, trees, hotspots, scenes, auth, settings
                $table->string('target_id', 100)->nullable();
                $table->text('description');
                $table->json('details')->nullable();
                $table->string('ip_address', 45)->nullable();
                $table->string('user_agent', 255)->nullable();
                $table->timestamp('created_at')->useCurrent()->index();
            });
        }

        if (!Schema::hasTable('app_settings')) {
            Schema::create('app_settings', function (Blueprint $table) {
                $table->string('key', 100)->primary();
                $table->text('value')->nullable();
                $table->string('group', 50)->default('general')->index(); // organization, appearance, system
                $table->string('label', 255)->nullable();
                $table->string('type', 50)->default('text'); // text, textarea, boolean, json, number
                $table->timestamps();
            });

            // Seed initial organization and app settings
            \Illuminate\Support\Facades\DB::table('app_settings')->insert([
                [
                    'key' => 'org_name',
                    'value' => 'IKHW Aceh (Inisiatif Konservasi & Hutan Wisata)',
                    'group' => 'organization',
                    'label' => 'Nama Organisasi / Pengelola',
                    'type' => 'text',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'key' => 'org_contact_email',
                    'value' => 'info@ikhw.org',
                    'group' => 'organization',
                    'label' => 'Email Kontak Organisasi',
                    'type' => 'text',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'key' => 'org_address',
                    'value' => 'Banda Aceh, Provinsi Aceh, Indonesia',
                    'group' => 'organization',
                    'label' => 'Alamat Kantor Organisasi',
                    'type' => 'textarea',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'key' => 'app_title',
                    'value' => 'Sistem Informasi Kawasan Penanaman Pohon & Virtual Tour Marzipano',
                    'group' => 'appearance',
                    'label' => 'Judul Sistem / Aplikasi',
                    'type' => 'text',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'key' => 'public_tour_enabled',
                    'value' => '1',
                    'group' => 'system',
                    'label' => 'Publikasikan Virtual Tour',
                    'type' => 'boolean',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('app_settings');
    }
};
