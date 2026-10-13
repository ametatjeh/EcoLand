<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHotspotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'scene_id' => ['sometimes', 'string', 'exists:scenes,id'],
            'type' => ['sometimes', 'string', 'in:link,info'],
            'yaw' => ['sometimes', 'numeric', 'between:-3.141592653589793,3.141592653589793'],
            'pitch' => ['sometimes', 'numeric', 'between:-1.5707963267948966,1.5707963267948966'],
            'rotation' => ['nullable', 'numeric'],
            'target_scene_id' => [
                'nullable',
                'string',
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
            'target_scene_id.exists' => 'Scene tujuan yang dipilih tidak terdaftar di database.',
        ];
    }
}
