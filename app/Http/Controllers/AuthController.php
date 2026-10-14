<?php

namespace App\Http\Controllers;

use App\Models\AppSetting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    /**
     * Tampilkan halaman login visual Eco Land.
     */
    public function showLoginForm()
    {
        if (Auth::check() && Auth::user()->isAdmin()) {
            return redirect('/#admin/dashboard');
        }

        $appLogo = AppSetting::getVal('app_logo');

        return view('auth.login', compact('appLogo'));
    }

    /**
     * Proses autentikasi formulir web login Eco Land.
     */
    public function loginWeb(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ], [
            'username.required' => 'Email atau username administrator wajib diisi.',
            'password.required' => 'Kata sandi wajib diisi.',
        ]);

        if ($validator->fails()) {
            return back()->withInput($request->only('username', 'remember'))
                ->with('error', $validator->errors()->first());
        }

        $user = User::where('username', $request->username)
            ->orWhere('email', $request->username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withInput($request->only('username', 'remember'))
                ->with('error', 'Username / email atau kata sandi tidak valid.');
        }

        if (!$user->isAdmin()) {
            return back()->withInput($request->only('username', 'remember'))
                ->with('error', 'Akses ditolak: Akun Anda tidak memiliki hak akses administrator Eco Land.');
        }

        // Login ke Web Session Laravel
        Auth::login($user, $request->boolean('remember'));
        $request->session()->regenerate();

        // Buat token Sanctum untuk sinkronisasi SPA
        $user->tokens()->where('name', 'admin_session')->delete();
        $token = $user->createToken('admin_session', ['admin'])->plainTextToken;

        return view('auth.sso-success', [
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
     * Logout dari sesi web.
     */
    public function logoutWeb(Request $request)
    {
        if (Auth::check()) {
            Auth::logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login')->with('success', 'Anda telah keluar dari sesi administrator Eco Land.');
    }
}
