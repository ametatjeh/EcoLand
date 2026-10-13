<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Login administrator dan generate Sanctum bearer token.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Username dan password wajib diisi.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('username', $request->username)
            ->orWhere('email', $request->username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Username atau password admin salah!',
            ], 401);
        }

        // Pastikan hanya role administrator yang diizinkan
        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak: Akun tidak memiliki hak akses administrator.',
            ], 403);
        }

        // Hapus token lama jika ada agar bersih
        $user->tokens()->where('name', 'admin_session')->delete();

        // Buat token Sanctum baru
        $token = $user->createToken('admin_session', ['admin'])->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    /**
     * Verifikasi status autentikasi token saat ini.
     */
    public function verify(Request $request)
    {
        $user = $request->user();

        if ($user) {
            return response()->json([
                'authenticated' => true,
                'user' => [
                    'id' => $user->id,
                    'username' => $user->username,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
            ]);
        }

        return response()->json(['authenticated' => false], 401);
    }

    /**
     * Logout dan cabut token saat ini.
     */
    public function logout(Request $request)
    {
        if ($request->user()) {
            $request->user()->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Berhasil logout',
        ]);
    }
}
