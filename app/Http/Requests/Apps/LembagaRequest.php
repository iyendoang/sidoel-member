<?php

   namespace App\Http\Requests\Apps;

   use Illuminate\Foundation\Http\FormRequest;

   class LembagaRequest extends FormRequest
   {
      public function authorize(): bool
      {
         return true;
      }

      public function rules(): array
      {
         $method = $this->method();
         $uniqueNpsnRule = 'unique:lembagas,npsn';

         if ($method === 'PUT' && $this->lembaga) {
            $uniqueNpsnRule .= ',' . $this->lembaga->id;
         }

         return [
            'name'         => 'required|string|min:3|max:255',
            'npsn'         => ['required', 'string', 'min:3', 'max:8', $uniqueNpsnRule],
            'level'        => 'nullable|string|max:50',
            'logo'         => 'nullable|string|max:255',
            'description'  => 'nullable|string',
            'province'     => 'nullable|string|max:100',
            'city'         => 'nullable|string|max:100',
            'district'     => 'nullable|string|max:100',
            'sub_district' => 'nullable|string|max:100',
            'address'      => 'nullable|string|max:255',
            'phone'        => 'nullable|string|max:20',
            'fax'          => 'nullable|string|max:20',
            'email'        => 'nullable|email|max:255',
            'website'      => 'nullable|url|max:255',
            'facebook'     => 'nullable|url|max:255',
            'twitter'      => 'nullable|url|max:255',
            'instagram'    => 'nullable|url|max:255',
            'linkedin'     => 'nullable|url|max:255',
            'youtube'      => 'nullable|url|max:255',
         ];
      }

      public function messages(): array
      {
         return [
            'name.required' => 'Kolom nama lembaga tidak boleh kosong',
            'name.string' => 'Kolom nama lembaga harus berupa teks',
            'name.min' => 'Nama lembaga minimal 3 karakter',
            'name.max' => 'Nama lembaga maksimal 255 karakter',

            'npsn.required' => 'NPSN wajib diisi',
            'npsn.string' => 'NPSN harus berupa teks',
            'npsn.min' => 'NPSN minimal 3 karakter',
            'npsn.max' => 'NPSN maksimal 8 karakter',
            'npsn.unique' => 'NPSN sudah terdaftar',

            'email.email' => 'Format email tidak valid',
            'website.url' => 'Format URL website tidak valid',
            'facebook.url' => 'URL Facebook tidak valid',
            'twitter.url' => 'URL Twitter tidak valid',
            'instagram.url' => 'URL Instagram tidak valid',
            'linkedin.url' => 'URL LinkedIn tidak valid',
            'youtube.url' => 'URL YouTube tidak valid',
         ];
      }
   }
