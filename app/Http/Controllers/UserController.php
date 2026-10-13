<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\ActivityLogger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select(['id', 'name', 'username', 'email', 'role', 'created_at'])->get();
        return response()->json([
            'success' => true,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'nullable|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|in:administrator,petugas_penanaman,editor_konten',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);

        ActivityLogger::log('create', 'users', "Menambahkan pengguna baru '{$user->name}' ({$user->username}) dengan peran {$user->role}", (string) $user->id);

        return response()->json([
            'success' => true,
            'message' => "Pengguna '{$user->name}' berhasil ditambahkan.",
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => "required|string|max:255|unique:users,username,{$user->id}",
            'email' => "nullable|email|max:255|unique:users,email,{$user->id}",
            'password' => 'nullable|string|min:6',
            'role' => 'required|in:administrator,petugas_penanaman,editor_konten',
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        ActivityLogger::log('update', 'users', "Memperbarui profil pengguna '{$user->name}' ({$user->username})", (string) $user->id);

        return response()->json([
            'success' => true,
            'message' => "Pengguna '{$user->name}' berhasil diperbarui.",
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if ($user->username === 'admin') {
            return response()->json(['success' => false, 'message' => 'Akun administrator utama tidak dapat dihapus.'], 403);
        }

        $name = $user->name;
        $user->delete();

        ActivityLogger::log('delete', 'users', "Menghapus akun pengguna '{$name}'", (string) $id);

        return response()->json([
            'success' => true,
            'message' => "Pengguna '{$name}' berhasil dihapus.",
        ]);
    }
}
