<?php

   namespace App\Models;

   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\BelongsTo;

   class LinkProfile extends Model
   {
      protected $fillable = [
         'link_profile_npsn',
         'display_name',
         'bio',
         'avatar',
         'theme',
      ];

      // LinkProfile.php
      public function getAvatarUrlAttribute() {
         return asset($this->avatar ? : 'assets/shadcn.png');
      }

      public function links() {
         return $this->hasMany(Link::class, 'link_profile_id');
      }

      public function lembaga(): BelongsTo {
         return $this->belongsTo(Lembaga::class, 'link_profile_npsn', 'npsn');
      }
   }
