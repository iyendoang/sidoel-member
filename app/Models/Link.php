<?php

   namespace App\Models;

   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\BelongsTo;

   class Link extends Model
   {
      protected $fillable = [
         'link_npsn',
         'link_profile_id',
         'title',
         'url',
         'icon',
         'is_active',
         'order',
         'clicks',
         'bg_color',
         'is_safemode'
      ];

      public function lembaga(): BelongsTo {
         return $this->belongsTo(Lembaga::class, 'link_npsn', 'npsn');
      }

      // Link.php
      public function linkProfile() {
         return $this->belongsTo(LinkProfile::class, 'link_profile_id');
      }

      public function clicks() {
         return $this->hasMany(LinkClick::class);
      }
   }
