<?php

namespace App\Http\Requests\Apps;

use Illuminate\Foundation\Http\FormRequest;

class RoleRequest extends FormRequest
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
                'name' => 'required|string|min:3|max:255|unique:roles',
                'selectedPermissions' => 'required|array|min:1'
            ];
        elseif($method === 'PUT')
            return [
                'name' => 'required|string|min:3|max:255|unique:roles,name,'. $this->role->id,
                'selectedPermissions' => 'required|array|min:1'
            ];
    }

    public function messages(): array 
    {
        return [
            'name.required' => 'Kolom nama akses group tidak boleh kosong',
            'name.string' => 'Kolom nama akses group harus berupa string',
            'name.min' => 'Kolom nama akses group minimal 3 karakter',
            'name.max' => 'Kolom nama akses group maksimal 255 karakter',
            'name.unique' => 'Kolom nama akses group sudah ada, silahkan gunakan nama lainnya',
            'selectedPermssions.required' => 'Kolom hak akses tidak boleh kosong',
            'selectedPermissions.array' => 'Kolom hak akses harus berupa array',
            'selectedPermssions.min' => 'Kolom hak akses minimal 1 data',
        ];
    }
}
