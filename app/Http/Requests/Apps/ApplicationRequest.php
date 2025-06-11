<?php

   namespace App\Http\Requests\Apps;

   use Illuminate\Foundation\Http\FormRequest;

   class ApplicationRequest extends FormRequest
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
         $method                = $this->method();
         $uniqueApplicationRule = 'unique:applications,slug';
         if($method === 'PUT' && $this->application){
            $uniqueApplicationRule .= ',' . $this->application->id;
         }

         return [
            'name'        => 'required|string|min:3|max:255',
            'slug'        => ['required', 'string', $uniqueApplicationRule],
            'description' => 'nullable|string',
         ];
      }
   }
