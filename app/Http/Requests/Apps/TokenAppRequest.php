<?php

   namespace App\Http\Requests\Apps;

   use Illuminate\Foundation\Http\FormRequest;

   class TokenAppRequest extends FormRequest
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
         $user = auth()->user();
         // Default rules untuk fields selain token_npsn, expired_at, dan status
         $rules = [
            'application_id' => 'required|integer|exists:applications,id',
            'token'          => 'required|string|size:8',
            'is_valid'       => 'boolean',
            'used_at'        => 'nullable|date',
            'description'    => 'nullable|string|max:100',
         ];

         if ($user && $user->hasRole('super-admin')) {
            // Super admin wajib ada token_npsn, expired_at, dan status
            $rules['token_npsn'] = 'required|string|size:8';
            $rules['expired_at'] = 'required|date';
            $rules['status']     = 'required|in:active,in_active,suspended';
         } else {
            // Member dan role lain: token_npsn nullable, expired_at dan status juga nullable
            $rules['token_npsn'] = 'nullable|string|size:8';
            $rules['expired_at'] = 'nullable|date';
            $rules['status']     = 'nullable|in:active,in_active,suspended';
         }

         return $rules;
      }
   }
