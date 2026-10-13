<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImportBackupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'hotspots' => ['nullable', 'array'],
            'data.hotspots' => ['nullable', 'array'],
            'confirm_overwrite' => ['nullable', 'boolean'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $hotspots = $this->input('hotspots') ?? $this->input('data.hotspots');
            if (!is_array($hotspots) || count($hotspots) === 0) {
                $validator->errors()->add('hotspots', 'Berkas cadangan tidak memiliki daftar hotspot yang valid.');
            }
        });
    }
}
