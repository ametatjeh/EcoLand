<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'yaw' => ['required', 'numeric', 'between:-3.141592653589793,3.141592653589793'],
            'pitch' => ['required', 'numeric', 'between:-1.5707963267948966,1.5707963267948966'],
            'rotation' => ['nullable', 'numeric'],
        ];
    }
}
