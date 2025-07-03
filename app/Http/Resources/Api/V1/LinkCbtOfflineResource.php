<?php

   namespace App\Http\Resources\Api\V1;

   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;

   class LinkCbtOfflineResource extends JsonResource
   {
      /**
       * Transform the resource into an array.
       *
       * @return array<string, mixed>
       */
      public function toArray(Request $request): array {
         // Ambil link pertama kalau ada
         $firstLink = $this->links->first();
         return [
            'id'              => $this->id,
            'display_name'    => $this->display_name,
            'profile_bio'     => $this->bio,
            'profile_image'   => $this->avatar_url,

            // Properti lembaga
            'lemabag_name'    => $this->lembaga->name ?? null,
            'lembaga_npsn'    => $this->lembaga->npsn ?? null,
            'lemabaga_level'  => $this->lembaga->level ?? null,
            'lemabaga_logo'   => $this->lembaga->logo ?? null,

            // Ambil data link pertama jika ada
            'link_title'      => $firstLink->title ?? null,
            'link_url'        => $firstLink->url ?? null,
            'link_order'      => $firstLink->order ?? null,
         ];
      }
   }
