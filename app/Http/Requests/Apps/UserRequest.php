<?php

namespace App\Http\Requests\Apps;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method = $this->method();

        if($method === 'POST')
            return [
                'username' => 'required|string|min:3|max:255|unique:users',
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:4|confirmed',
                'selectedRoles' => 'required|array|min:1',
            ];
        elseif($method === 'PUT')
            return [
                'username' => 'required|string|min:3|max:255|unique:users,username,'. $this->user->id,
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,'. $this->user->id,
                'password' => 'nullable|min:4|confirmed',
                'selectedRoles' => 'required|array|min:1',
            ];
    }

    public function messages()
    {
        return [
            'username.required' => 'Kolom username tidak boleh kosong',
            'username.string' => 'Kolom username harus berupa string',
            'username.min' => 'Kolom username minimal 3 karakter',
            'username.max' => 'Kolom username maksimal 255 karakter',
            'username.unique' => 'username sudah ada di database, silahkan gunakan nama lainnya',
            'name.required' => 'Kolom nama lengkap tidak boleh kosong',
            'name.string' => 'Kolom nama lengkap harus berupa string',
            'name.max' => 'Kolom nama lengkap maksimal 255 karakter',
            'email.required' => 'Kolom email tidak boleh kosong',
            'email.email' => 'Kolom email harus menggunakan format yang valid',
            'email.unique' => 'Kolom email sudah ada di database, silahkan gunakan nama lainnya',
            'password.required' => 'Kolom kata sandi tidak boleh kosong',
            'password.min' => 'kolom kata sandi minimal 4 karakter',
            'password.confirmed' => 'Kolom kata sandi dan konfirmasi kata sandi tidak sesuai',
            'selectedRoles.required' => 'Kolom akses group tidak boleh kosong',
            'selectedRoles.array' => 'Kolom akses group harus berupa array',
            'selectedRoles.min' => 'Kolom akses group minimal 1 data',
        ];
    }
}
