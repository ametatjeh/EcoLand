<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        // Akun Administrator Utama
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Administrator Virtual Tour',
                'email' => 'admin@virtualtour.local',
                'password' => Hash::make('admin123'),
                'role' => 'administrator',
            ]
        );

        // Akun Tim Lapangan IKHW Aceh
        User::updateOrCreate(
            ['username' => 'ikhw_admin'],
            [
                'name' => 'Admin IKHW Aceh',
                'email' => 'admin@ikhw.org',
                'password' => Hash::make('ikhw2026'),
                'role' => 'administrator',
            ]
        );
    }
}
