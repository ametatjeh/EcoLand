<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('planting_zones')) {
            Schema::create('planting_zones', function (Blueprint $table) {
                $table->string('id', 100)->primary();
                $table->string('zone_code', 100)->unique()->index();
                $table->string('name', 255)->index();
                $table->string('category', 100)->nullable();
                $table->text('description')->nullable();
                $table->text('planting_purpose')->nullable();
                $table->enum('status', ['preparation', 'active', 'monitoring', 'completed'])->default('active')->index();
                $table->text('address')->nullable();
                $table->string('village', 255)->nullable();
                $table->string('district', 255)->nullable();
                $table->string('city', 255)->nullable();
                $table->string('province', 255)->nullable();
                $table->decimal('latitude', 10, 7)->nullable();
                $table->decimal('longitude', 10, 7)->nullable();
                $table->text('access_notes')->nullable();
                $table->decimal('area_size', 10, 2)->default(0);
                $table->string('area_unit', 20)->default('ha');
                $table->string('measurement_method', 255)->nullable();
                $table->date('measurement_date')->nullable();
                $table->text('land_condition_notes')->nullable();
                $table->string('person_in_charge', 255)->nullable();
                $table->string('organization', 255)->nullable();
                $table->date('start_date')->nullable();
                $table->integer('planting_target')->nullable();
                $table->text('internal_notes')->nullable();
                $table->string('main_photo_path', 255)->nullable();
                $table->json('gallery_photos')->nullable();
                $table->boolean('is_published')->default(true)->index();
                $table->boolean('is_archived')->default(false)->index();
                $table->softDeletes();
                $table->timestamps();
            });
        }

        // Add foreign key to planting_activities
        if (Schema::hasTable('planting_activities') && !Schema::hasColumn('planting_activities', 'planting_zone_id')) {
            Schema::table('planting_activities', function (Blueprint $table) {
                $table->string('planting_zone_id', 100)->nullable()->after('scene_id')->index();
                $table->foreign('planting_zone_id')
                    ->references('id')
                    ->on('planting_zones')
                    ->nullOnDelete();
            });
        }

        // Add foreign key to scenes
        if (Schema::hasTable('scenes') && !Schema::hasColumn('scenes', 'planting_zone_id')) {
            Schema::table('scenes', function (Blueprint $table) {
                $table->string('planting_zone_id', 100)->nullable()->after('status')->index();
                $table->foreign('planting_zone_id')
                    ->references('id')
                    ->on('planting_zones')
                    ->nullOnDelete();
            });
        }

        // Add foreign key to hotspots
        if (Schema::hasTable('hotspots') && !Schema::hasColumn('hotspots', 'planting_zone_id')) {
            Schema::table('hotspots', function (Blueprint $table) {
                $table->string('planting_zone_id', 100)->nullable()->after('planting_activity_id')->index();
                $table->foreign('planting_zone_id')
                    ->references('id')
                    ->on('planting_zones')
                    ->nullOnDelete();
            });
        }

        // Insert initial baseline zone if not already present
        $existing = DB::table('planting_zones')->where('id', 'KW-ACEH-01')->first();
        if (!$existing) {
            DB::table('planting_zones')->insert([
                'id' => 'KW-ACEH-01',
                'zone_code' => 'KW-ACEH-01',
                'name' => 'Kawasan Konservasi & Silvikultur ±2 Hektare Aceh',
                'category' => 'Konservasi & Silvikultur',
                'description' => 'Kawasan penanaman pohon seluas ±2 hektare yang diinisiasi untuk pemulihan ekosistem dan pengayaan vegetasi lokal di pesisir barat Aceh.',
                'planting_purpose' => 'Konservasi tanah, pengayaan vegetasi asli Aceh, dan pemantauan kanopi 360° secara berkala.',
                'status' => 'active',
                'address' => 'Jl. Banda Aceh - Meulaboh, Kawasan Pesisir Barat Aceh',
                'village' => 'Gampong Penanaman',
                'district' => 'Kecamatan Konservasi',
                'city' => 'Kabupaten Aceh Besar',
                'province' => 'Aceh',
                'latitude' => 5.4818556,
                'longitude' => 95.5840917,
                'access_notes' => 'Akses melalui gerbang utama titik 1, dapat dilalui kendaraan roda dua dan roda empat.',
                'area_size' => 2.00,
                'area_unit' => 'ha',
                'measurement_method' => 'Survei Lapangan & Deskriptif Patok Referensi',
                'measurement_date' => '2026-10-04',
                'land_condition_notes' => 'Topografi bergelombang ringan dengan jenis tanah aluvial bercampur liat berpasir.',
                'person_in_charge' => 'Koordinator Lapangan IKHW',
                'organization' => 'IKHW Aceh',
                'start_date' => '2026-10-04',
                'planting_target' => 500,
                'internal_notes' => 'Kawasan acuan utama proyek Virtual Tour Marzipano.',
                'is_published' => true,
                'is_archived' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Associate existing scenes and planting activities
            if (Schema::hasTable('scenes')) {
                DB::table('scenes')->whereNull('planting_zone_id')->update(['planting_zone_id' => 'KW-ACEH-01']);
            }
            if (Schema::hasTable('planting_activities')) {
                DB::table('planting_activities')->whereNull('planting_zone_id')->update(['planting_zone_id' => 'KW-ACEH-01']);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('hotspots') && Schema::hasColumn('hotspots', 'planting_zone_id')) {
            Schema::table('hotspots', function (Blueprint $table) {
                $table->dropForeign(['planting_zone_id']);
                $table->dropColumn('planting_zone_id');
            });
        }

        if (Schema::hasTable('scenes') && Schema::hasColumn('scenes', 'planting_zone_id')) {
            Schema::table('scenes', function (Blueprint $table) {
                $table->dropForeign(['planting_zone_id']);
                $table->dropColumn('planting_zone_id');
            });
        }

        if (Schema::hasTable('planting_activities') && Schema::hasColumn('planting_activities', 'planting_zone_id')) {
            Schema::table('planting_activities', function (Blueprint $table) {
                $table->dropForeign(['planting_zone_id']);
                $table->dropColumn('planting_zone_id');
            });
        }

        Schema::dropIfExists('planting_zones');
    }
};
