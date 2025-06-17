<?php

   namespace App\Http\Requests\Apps;

   use Illuminate\Foundation\Http\FormRequest;
   use Illuminate\Validation\Rule;

   class LinkRequest extends FormRequest
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
         // Cek apakah ini request update (misal berdasarkan method atau ada id)
         $isUpdate = $this->method() === 'PUT' || $this->method() === 'PATCH';
         $rules    = [
            'link_npsn'       => ['required', 'string', 'max:20', Rule::exists('lembagas', 'npsn')],
            'link_profile_id' => ['required'],
            'title'           => ['required', 'string', 'max:255'],
            'url'             => ['required', 'url', 'max:255'],
            'icon'            => ['nullable', 'string', 'max:100'],
            'is_active'       => ['required', 'boolean'],
            'is_safemode'     => ['required', 'boolean'],
            'order'           => ['nullable', 'integer', 'min:0'],
            'bg_color'        => ['nullable', 'string', 'max:20'],
         ];
         if($isUpdate){
            // Kalau update, wajib ada id yang valid di tabel links
            $rules['id'] = ['required', 'integer', Rule::exists('links', 'id')];
         }

         return $rules;
      }

      protected function prepareForValidation(): void {
         $raw = $this->input('raw', []);
         if(isset($raw['is_active'])){
            $this->merge([
               'is_active' => filter_var($raw['is_active'], FILTER_VALIDATE_BOOLEAN),
            ]);
         }
         if(isset($raw['is_safemode'])){
            $this->merge([
               'is_safemode' => filter_var($raw['is_safemode'], FILTER_VALIDATE_BOOLEAN),
            ]);
         }
      }
   }
