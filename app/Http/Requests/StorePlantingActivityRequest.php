<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePlantingActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'batch_code' => ['required', 'string', 'max:100', 'unique:planting_activities,batch_code'],
            'name' => ['required', 'string', 'max:255'],
            'activity_date' => ['required', 'date'],
            'person_in_charge' => ['required', 'string', 'max:255'],
            'organizer' => ['required', 'string', 'max:255'],
            'location_zone' => ['required', 'string', 'max:255'],
            'planting_zone_id' => ['nullable', 'string', 'exists:planting_zones,id'],
            'scene_id' => ['nullable', 'string', 'exists:scenes,id'],
            'photo_path' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.tree_species_id' => ['required', 'string', 'exists:tree_species,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.unit' => ['nullable', 'string', 'max:50'],
            'items.*.seed_source' => ['nullable', 'string', 'max:255'],
            'items.*.notes' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'batch_code.unique' => 'Kode batch / kelompok penanaman ini sudah digunakan.',
            'items.required' => 'Setidaknya harus ada 1 jenis pohon yang ditanam dalam kegiatan ini.',
            'items.*.tree_species_id.exists' => 'Jenis pohon yang dipilih tidak terdaftar di master data.',
            'items.*.quantity.min' => 'Jumlah bibit harus bernilai minimal 1.',
        ];
    }
}
