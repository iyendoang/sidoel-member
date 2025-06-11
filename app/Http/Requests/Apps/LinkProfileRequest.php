<?php

   namespace App\Http\Requests\Apps;

   use Illuminate\Foundation\Http\FormRequest;
   use Illuminate\Validation\Rule;

   class LinkProfileRequest extends FormRequest
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
         // Ambil ID parameter route, bisa string atau model
         $linkProfileId = $this->route('linkProfile') ?? $this->route('link_profile');

         // Kalau $linkProfileId adalah model, ambil id-nya
         if (is_object($linkProfileId) && method_exists($linkProfileId, 'getKey')) {
            $linkProfileId = $linkProfileId->getKey();
         }

         return [
            'display_name' => 'nullable|string|max:100',
            'bio'          => 'nullable|string|max:1000',
            'avatar'       => 'nullable',
            'theme'        => 'nullable|string|max:50',
            'link_profile_npsn' => [
               'required',
               'string',
               'size:8',
               'exists:lembagas,npsn',
               Rule::unique('link_profiles', 'link_profile_npsn')->ignore($linkProfileId),
            ],
         ];
      }

      public function withValidator($validator): void {
         // Validasi avatar hanya saat ada file yang diupload
         $validator->sometimes('avatar', 'image|mimes:jpg,jpeg,png,webp|max:2048', function() {
            return request()->hasFile('avatar');
         });
      }
   }
