<?php

   namespace App\Models;

   use App\Models\Concerns\ConvertMarkdownToHtml;
   use Illuminate\Database\Eloquent\Casts\Attribute;
   use Illuminate\Database\Eloquent\Factories\HasFactory;
   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\Relations\BelongsTo;
   use Illuminate\Database\Eloquent\Relations\HasMany;
   use Illuminate\Database\Eloquent\Relations\MorphMany;
   use Illuminate\Support\Str;
   use Laravel\Scout\Searchable;

   class Post extends Model
   {
      use ConvertMarkdownToHtml;
      use HasFactory;
      use Searchable;

      public function scopeIncludeComments($query)
      {
         return $query->with('comments');
      }

      public function scopeIncludeUser($query)
      {
         return $query->with('user');
      }

      public function scopeIncludeUserAndTopic($query)
      {
         return $query->with(['user', 'topic']);
      }

      public function scopeIncludeCommentsAndUser($query)
      {
         return $query->with(['comments', 'user']);
      }

      public function user(): BelongsTo
      {
         return $this->belongsTo(User::class);
      }

      public function comments(): HasMany
      {
         return $this->hasMany(Comment::class);
      }

      public function topic(): BelongsTo
      {
         return $this->belongsTo(Topic::class);
      }

      public function likes(): MorphMany
      {
         return $this->morphMany(Like::class, 'likeable');
      }

      public function title(): Attribute
      {
         return Attribute::set(fn ($value) => Str::title($value));
      }

      /*public function body(): Attribute
      {
          return Attribute::set(fn ($value) => [
              'body' => $value,
              'html' => str($value)->markdown(),
          ]);
      }*/

      public function showRoute(array $parameters = []): string
      {
         return route('forum.posts.show', [$this, Str::slug($this->title), ...$parameters]);
      }

      public function slug()
      {
         return Str::slug($this->title);
      }
   }
