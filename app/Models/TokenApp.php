<?php

   namespace App\Models;

   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\BelongsTo;
   use Illuminate\Database\Eloquent\SoftDeletes;

   class TokenApp extends Model
   {
      use SoftDeletes;

      protected $table    = 'token_apps';
      protected $fillable = [
         'application_id',
         'token_npsn',
         'token',
         'expired_at',
         'is_valid',
         'used_at',
         'description',
         'status',
      ];
      protected $casts    = [
         'expired_at' => 'date',
         'used_at'    => 'datetime',
         'created_at' => 'datetime',
         'updated_at' => 'datetime',
         'deleted_at' => 'datetime',
      ];

      public function application(): BelongsTo {
         return $this->belongsTo(Application::class, 'application_id', 'id');
      }

      public function lembaga(): BelongsTo {
         return $this->belongsTo(Lembaga::class, 'token_npsn', 'npsn');
      }
   }

