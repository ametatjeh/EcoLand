<?php

namespace App\Http\Controllers;

use App\Models\Scene;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SceneController extends Controller
{
    /**
     * Mengambil seluruh daftar scene beserta metadata panorama & tile.
     */
    public function index()
    {
        $scenes = Scene::orderBy('sequence', 'asc')->get();

        return response()->json([
            'success' => true,
            'total' => $scenes->count(),
            'scenes' => $scenes->map(fn($s) => $s->toMarzipanoArray(true)),
        ]);
    }

    /**
     * Detail satu scene spesifik.
     */
    public function show(string $id)
    {
        $scene = Scene::find($id);

        if (!$scene) {
            return response()->json([
                'success' => false,
                'message' => "Scene dengan ID {$id} tidak ditemukan.",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'scene' => $scene->toMarzipanoArray(true),
        ]);
    }

    /**
     * Endpoint kompabilitas nama kustom scene.
     */
    public function getCustomNames()
    {
        $scenes = Scene::pluck('name', 'id');
        return response()->json($scenes);
    }

    /**
     * Mengubah nama scene (Admin).
     */
    public function rename(Request $request, ?string $id = null)
    {
        $sceneId = $id ?? $request->input('sceneId');
        $newName = $request->input('newName') ?? $request->input('name');

        $validator = Validator::make([
            'sceneId' => $sceneId,
            'newName' => $newName,
        ], [
            'sceneId' => 'required|string|exists:scenes,id',
            'newName' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal.',
                'errors' => $validator->errors(),
            ], 422);
        }

        return DB::transaction(function () use ($sceneId, $newName) {
            $scene = Scene::findOrFail($sceneId);
            $scene->name = $newName;
            $scene->save();

            return response()->json([
                'success' => true,
                'message' => "Nama scene berhasil diperbarui menjadi '{$newName}'.",
                'scene' => $scene,
                'customScenes' => Scene::pluck('name', 'id'),
            ]);
        });
    }

    /**
     * Memperbarui metadata scene (Admin).
     */
    public function update(Request $request, string $id)
    {
        $scene = Scene::find($id);

        if (!$scene) {
            return response()->json([
                'success' => false,
                'message' => 'Scene tidak ditemukan.',
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'sequence' => 'sometimes|integer',
            'status' => 'sometimes|string',
            'planting_zone_id' => 'sometimes|nullable|string|exists:planting_zones,id',
            'description' => 'sometimes|nullable|string',
            'latitude' => 'sometimes|nullable|numeric',
            'longitude' => 'sometimes|nullable|numeric',
            'initial_yaw' => 'sometimes|numeric',
            'initial_pitch' => 'sometimes|numeric',
            'initial_fov' => 'sometimes|numeric',
        ]);

        return DB::transaction(function () use ($scene, $validated) {
            $scene->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Metadata scene berhasil diperbarui.',
                'scene' => $scene,
            ]);
        });
    }
}
