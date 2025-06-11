<?php

   namespace App\Models;

   use App\Models\Concerns\ConvertMarkdownToHtml;
   use Illuminate\Database\Eloquent\Factories\HasFactory;
   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\BelongsTo;
   use Illuminate\Database\Eloquent\Relations\MorphMany;

   class Comment extends Model
   {
      use ConvertMarkdownToHtml;
      use HasFactory;

      public function scopeIncludePost($query) {
         return $query->with('post');
      }

      public function scopeIncludePostAndUser($query) {
         return $query->with(['post', 'user']);
      }

      public function user(): BelongsTo {
         return $this->belongsTo(User::class);
      }

      public function post(): BelongsTo {
         return $this->belongsTo(Post::class);
      }

      public function likes(): MorphMany {
         return $this->morphMany(Like::class, 'likeable');
      }
   }
