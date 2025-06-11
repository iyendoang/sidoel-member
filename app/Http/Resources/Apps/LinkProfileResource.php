<?php

   namespace App\Http\Resources\Apps;

   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;

   class LinkProfileResource extends JsonResource
   {
      /**
       * Transform the resource into an array.
       *
       * @return array<string, mixed>
       */
      public function toArray($request): array {
         return [
            'id'                => (string) $this->id,
            'link_profile_npsn' => $this->link_profile_npsn,
            'display_name'      => $this->display_name,
            'bio'               => $this->bio,
            'avatar'            => $this->avatar ? url($this->avatar) : url('logo.svg'),
            'theme'             => $this->theme,
            'created_at'        => $this->created_at?->toDateTimeString(),
            'updated_at'        => $this->updated_at?->toDateTimeString(),
            'lembaga'           => $this->whenLoaded('lembaga', fn()
               => [
               'npsn' => $this->lembaga->npsn,
               'name' => $this->lembaga->name,
               'logo' => $this->lembaga->logo,
            ]),
         ];
      }
   }
