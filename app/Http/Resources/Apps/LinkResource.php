<?php

   namespace App\Http\Resources\Apps;

   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;

   class LinkResource extends JsonResource
   {
      /**
       * Transform the resource into an array.
       *
       * @return array<string, mixed>
       */
      public function toArray($request): array {
         return [
            'id'            => (string) $this->id,
            'link_npsn'     => $this->link_npsn,
            'title'         => $this->title,
            'url'           => $this->url,
            'icon'          => $this->icon,
            'is_active'     => $this->is_active,
            'order'         => $this->order,
            'click'         => $this->click,
            'bg_color'      => $this->bg_color,
            'created_at'    => $this->created_at?->toDateTimeString(),
            'updated_at'    => $this->updated_at?->toDateTimeString(),
            'link_profiles' => $this->whenLoaded('link_profiles', fn()
               => [
               'bio'    => $this->lembaga->bio,
               'avatar' => $this->lembaga->avatar,
               'theme'  => $this->lembaga->theme,
            ]),
            'lembaga'       => $this->whenLoaded('lembaga', fn()
               => [
               'npsn' => $this->lembaga->npsn,
               'name' => $this->lembaga->name,
               'logo' => $this->lembaga->logo,
            ]),
         ];
      }
   }
