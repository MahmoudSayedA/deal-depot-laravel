<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255', 'min:2'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'date_of_birth' => ['nullable', 'date', 'after:1-1-1940', 'before:1-1-2020'],
            'address' => ['nullable', 'string', 'max:50', 'min:2'],
            'country' => ['nullable', 'string', 'max:50', 'min:2'],
            'city' => ['nullable', 'string', 'max:50', 'min:2'],
            'image' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:50'],
            'phone' => ['nullable', 'string', 'regex:/^\+?[0-9]{10,}$/',]
        ];
    }
}
