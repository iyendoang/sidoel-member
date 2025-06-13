<?php

   namespace App\Http\Resources\Api\V1;

   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;

   class LembagaResource extends JsonResource
   {
      /**
       * Transform the resource into an array.
       *
       * @return array<string, mixed>
       */
      public function toArray(Request $request): array {
         return [
            'id'           => $this->id,
            'name'         => $this->name,
            'npsn'         => $this->npsn,
            'level'        => $this->level,
            'logo'         => $this->logo,
            'description'  => $this->description,
            'province'     => $this->province,
            'city'         => $this->city,
            'district'     => $this->district,
            'sub_district' => $this->sub_district,
            'address'      => $this->address,
            'phone'        => $this->phone,
            'fax'          => $this->fax,
            'email'        => $this->email,
            'website'      => $this->website,
            'facebook'     => $this->facebook,
            'twitter'      => $this->twitter,
            'instagram'    => $this->instagram,
            'linkedin'     => $this->linkedin,
            'youtube'      => $this->youtube,
            'created_at'   => $this->created_at,
            'updated_at'   => $this->updated_at,
         ];
      }
   }
