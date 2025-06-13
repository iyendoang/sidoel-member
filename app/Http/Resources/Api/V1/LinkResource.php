<?php

   namespace App\Http\Resources\Api\V1;

   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;

   class LinkResource extends JsonResource
   {
      /**
       * Transform the resource into an array.
       *
       * @return array<string, mixed>
       */
      public function toArray(Request $request): array {
         return [
            'id'              => $this->id,
            'link_profile_id' => $this->link_profile_id,
            'link_npsn'       => $this->link_npsn,
            'title'           => $this->title,
            'url'             => $this->url,
            'icon'            => $this->icon,
            'is_active'       => $this->is_active,
            'order'           => $this->order,
            'clicks'          => $this->clicks,
            'bg_color'        => $this->bg_color,
            'created_at'      => $this->created_at,
            'updated_at'      => $this->updated_at,
         ];
      }
   }
