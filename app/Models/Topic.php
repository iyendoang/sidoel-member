<?php

   namespace App\Models;

   use Illuminate\Database\Eloquent\Factories\HasFactory;
   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\HasMany;

   class Topic extends Model
   {
      use HasFactory;

      public function posts(): HasMany {
         return $this->hasMany(Post::class);
      }

      public function getRouteKeyName(): string {
         return 'slug';
      }
   }
