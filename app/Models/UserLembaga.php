<?php

   namespace App\Models;

   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\BelongsTo;

   class UserLembaga extends Model
   {
      protected $table    = 'user_lembagas';
      protected $fillable = ['user_id', 'user_npsn'];
// UserLembaga model
      public function user(): BelongsTo {
         return $this->belongsTo(User::class);
      }

      public function lembaga(): BelongsTo {
         // Pastikan field foreign key dan local key benar
         return $this->belongsTo(Lembaga::class, 'user_npsn', 'npsn');
      }
   }


