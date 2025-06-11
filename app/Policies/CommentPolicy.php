<?php

   namespace App\Policies;

   use App\Models\Comment;
   use App\Models\User;
   use Illuminate\Auth\Access\HandlesAuthorization;

   class CommentPolicy
   {
      use HandlesAuthorization;

      public function create(User $user): bool {
         return true;
      }

      public function update(User $user, Comment $comment): bool {
         return $user->id === $comment->user_id;
      }

      public function delete(User $user, Comment $comment): bool {
         if($user->id !== $comment->user_id){
            return false;
         }

         return $comment->created_at->isAfter(now()->subHour());
      }
   }
