<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTreeMaintenanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'maintenance_date' => ['required', 'date'],
            'planting_activity_id' => ['required', 'string', 'exists:planting_activities,id'],
            'tree_species_id' => ['nullable', 'string', 'exists:tree_species,id'],
            'action_type' => ['required', 'string', 'in:penyiraman,penyiangan,pemupukan,perlindungan_bibit,pengendalian_gangguan,penyulaman'],
            'plants_handled_count' => ['nullable', 'integer', 'min:0'],
            'replacement_plants_count' => ['nullable', 'integer', 'min:0'],
            'action_reason' => ['nullable', 'string'],
            'officer_or_team' => ['required', 'string', 'max:255'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'photo_before_path' => ['nullable', 'string', 'max:255'],
            'photo_after_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
