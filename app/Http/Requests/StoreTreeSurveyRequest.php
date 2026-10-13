<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTreeSurveyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'survey_date' => ['required', 'date'],
            'planting_activity_id' => ['required', 'string', 'exists:planting_activities,id'],
            'tree_species_id' => ['nullable', 'string', 'exists:tree_species,id'],
            'alive_count' => ['required', 'integer', 'min:0'],
            'dead_count' => ['nullable', 'integer', 'min:0'],
            'missing_count' => ['nullable', 'integer', 'min:0'],
            'uninspected_count' => ['nullable', 'integer', 'min:0'],
            'average_height_cm' => ['nullable', 'numeric', 'min:0'],
            'average_diameter_cm' => ['nullable', 'numeric', 'min:0'],
            'health_condition' => ['required', 'string', 'in:sangat_baik,baik,sedang,merana,terserang_hama'],
            'damage_symptoms' => ['nullable', 'string'],
            'photo_path' => ['nullable', 'string', 'max:255'],
            'inspector_name' => ['required', 'string', 'max:255'],
            'field_notes' => ['nullable', 'string'],
            'recommendations' => ['nullable', 'string'],
            'is_verified' => ['nullable', 'boolean'],
            'is_estimate' => ['nullable', 'boolean'],
        ];
    }
}
