<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHotspotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'scene_id' => ['required', 'string', 'exists:scenes,id'],
            'type' => ['required', 'string', 'in:link,info'],
            'yaw' => ['required', 'numeric', 'between:-3.141592653589793,3.141592653589793'],
            'pitch' => ['required', 'numeric', 'between:-1.5707963267948966,1.5707963267948966'],
            'rotation' => ['nullable', 'numeric'],
            'target_scene_id' => [
                'nullable',
                'string',
                'required_if:type,link',
                'exists:scenes,id',
            ],
            'title' => ['nullable', 'string', 'max:255'],
            'text' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:50'],
            'info_source_type' => ['nullable', 'string', 'in:manual,tree_species,planting_activity,latest_survey'],
            'tree_species_id' => ['nullable', 'integer', 'exists:tree_species,id'],
            'planting_activity_id' => ['nullable', 'integer', 'exists:planting_activities,id'],
            'display_settings' => ['nullable', 'array'],
            'is_active' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string', 'in:draft,published'],
        ];
    }

    public function messages(): array
    {
        return [
            'scene_id.exists' => 'Scene asal tidak ditemukan di database.',
            'target_scene_id.required_if' => 'Scene tujuan wajib diisi untuk link hotspot.',
            'target_scene_id.exists' => 'Scene tujuan yang dipilih tidak valid atau tidak terdaftar.',
            'yaw.between' => 'Koordinat yaw harus bernilai antara -π dan π.',
            'pitch.between' => 'Koordinat pitch harus bernilai antara -π/2 dan π/2.',
        ];
    }
}
