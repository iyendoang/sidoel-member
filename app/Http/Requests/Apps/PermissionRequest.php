<?php

   namespace App\Http\Requests\Apps;

   use Illuminate\Foundation\Http\FormRequest;

   class PermissionRequest extends FormRequest
   {
      /**
       * Determine if the user is authorized to make this request.
       */
      public function authorize(): bool {
         return true;
      }

      /**
       * Get the validation rules that apply to the request.
       *
       * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
       */
      public function rules(): array {
         $method = $this->method();
         if($method === 'POST')
            return [
               'name' => 'required|string|min:3|max:255|unique:permissions',
            ];
         else if($method === 'PUT')
            return [
               'name' => 'required|string|min:3|max:255|unique:permissions,name,' . $this->permission->id,
            ];
      }

      public function messages(): array {
         return [
            'name.required' => 'Kolom nama hak akses tidak boleh kosong',
            'name.string'   => 'Kolom nama hak akses harus berupa string',
            'name.min'      => 'Kolom nama hak akses minimal 3 karakter',
            'name.max'      => 'Kolom nama hak akses maksimal 255 karakter',
            'name.unique'   => 'Nama hak akses sudah ada di database, silahkan gunakan nama lainnya',
         ];
      }
   }
