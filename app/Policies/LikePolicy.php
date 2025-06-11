<?php

   namespace App\Policies;

   use App\Models\Comment;
   use App\Models\Post;
   use App\Models\User;
   use Illuminate\Database\Eloquent\Model;

   class LikePolicy
   {
      public function create(User $user, Model $likeable): bool {
         if(!in_array($likeable::class, [Post::class, Comment::class])){
            return false;
         }

         return $likeable->likes()->whereBelongsTo($user)->doesntExist();
      }

      public function delete(User $user, Model $likeable): bool {
         if(!in_array($likeable::class, [Post::class, Comment::class])){
            return false;
         }

         return $likeable->likes()->whereBelongsTo($user)->exists();
      }
   }
