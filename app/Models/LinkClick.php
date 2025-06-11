<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LinkClick extends Model
{
   protected $table = 'link_clicks';

   protected $fillable = [
      'link_id',
      'ip',
      'user_agent',
      'clicked_at',
   ];

   protected $casts = [
      'clicked_at' => 'datetime',
   ];

   public $timestamps = false; // karena kamu tidak pakai created_at & updated_at

   public function link(): BelongsTo
   {
      return $this->belongsTo(Link::class);
   }
}
