<?php

   namespace App\Http\Resources\Apps;

   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;

   class TokenAppResource extends JsonResource
   {
      /**
       * Transform the resource into an array.
       *
       * @return array<string, mixed>
       */
      public function toArray(Request $request): array {
         return [
            'id'             => $this->id,
            'application'    => [
               'id'   => $this->application->id,
               'name' => $this->application->name,
            ],
            'lembaga'        => [
               'npsn' => $this->lembaga?->npsn,
               'name' => $this->lembaga?->name,
            ],
            'token'          => $this->token,
            'application_id' => $this->application_id,
            'token_npsn'     => $this->token_npsn,
            'status'         => $this->status,
            'is_valid'       => $this->is_valid,
            'description'    => $this->description,
            'expired_at'     => $this->expired_at,
            'expired_human'  => $this->expired_at ? \Carbon\Carbon::parse($this->expired_at)->diffForHumans() : NULL,
            'used_at'        => $this->used_at?->format('Y-m-d H:i:s'),
            'used_human'     => $this->used_at?->diffForHumans(),
            'created_at'     => $this->created_at?->format('Y-m-d H:i:s'),
            'created_human'  => $this->created_at?->diffForHumans(),
         ];
      }
   }
