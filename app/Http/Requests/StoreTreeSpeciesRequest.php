<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTreeSpeciesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'common_name' => ['required', 'string', 'max:255'],
            'scientific_name' => ['required', 'string', 'max:255', 'unique:tree_species,scientific_name'],
            'local_name' => ['nullable', 'string', 'max:255'],
            'family' => ['nullable', 'string', 'max:255'],
            'origin_status' => ['required', 'string', 'in:lokal_asli,introduksi,belum_diverifikasi'],
            'ecological_function' => ['nullable', 'string'],
            'benefits' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'photo' => ['nullable', 'image', 'max:5120'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['image', 'max:5120'],
            'photo_path' => ['nullable', 'string', 'max:255'],
            'cover_photo' => ['nullable', 'string', 'max:255'],
            'gallery_photos' => ['nullable'],
            'existing_photos' => ['nullable'],
            'reference_source' => ['nullable', 'string', 'max:255'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'scientific_name.unique' => 'Spesies dengan nama ilmiah ini sudah terdaftar. Duplikasi spesies dicegah.',
            'origin_status.in' => 'Status asal harus lokal_asli, introduksi, atau belum_diverifikasi.',
        ];
    }
}
