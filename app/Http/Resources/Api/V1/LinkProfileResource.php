<?php

   namespace App\Http\Resources\Api\V1;

   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;

   class LinkProfileResource extends JsonResource
   {
      /**
       * Transform the resource into an array.
       *
       * @return array<string, mixed>
       */
      public function toArray(Request $request): array {
         return [
            'id'                => $this->id,
            'link_profile_npsn' => $this->link_profile_npsn,
            'display_name'      => $this->display_name,
            'bio'               => $this->bio,
            'avatar'            => $this->avatar_url,
            'theme'             => $this->theme,
            'created_at'        => $this->created_at,
            'updated_at'        => $this->updated_at,
            'links'             => LinkResource::collection($this->whenLoaded('links')),
            'lembaga'           => new LembagaResource($this->whenLoaded('lembaga')),
         ];
      }
   }
