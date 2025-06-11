<?php

   namespace App\Models;

   use Illuminate\Database\Eloquent\Factories\HasFactory;
   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\BelongsToMany;

   class Lembaga extends Model
   {
      use HasFactory;

      protected $table      = 'lembagas';
      protected $primaryKey = 'id'; // default sudah id, ini opsional
      protected $fillable   = [
         'name',
         'npsn',
         'level',
         'logo',
         'description',
         'province',
         'city',
         'district',
         'sub_district',
         'address',
         'phone',
         'fax',
         'email',
         'website',
         'facebook',
         'twitter',
         'linkedin',
         'youtube',
         'instagram',
      ];

      // Lembaga Model
      public function userLembagas() {
         // Relasi hasMany dari npsn di lembagas ke user_npsn di user_lembagas
         return $this->hasMany(UserLembaga::class, 'user_npsn', 'npsn');
      }

      public function linkProfile() {
         return $this->hasOne(LinkProfile::class, 'link_profile_npsn', 'npsn');
      }

      public function links() {
         return $this->hasMany(Link::class, 'link_npsn', 'npsn');
      }
   }


