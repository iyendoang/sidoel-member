<?php

   namespace App\Policies;

   use App\Models\Post;
   use App\Models\User;
   use Illuminate\Auth\Access\HandlesAuthorization;

   class PostPolicy
   {
      use HandlesAuthorization;

      /**
       * Determine whether the user can view any posts.
       */
      public function viewAny(User $user): bool
      {
         return true; // atau sesuai logika akses umum
      }

      /**
       * Determine whether the user can view the post.
       */
      public function view(User $user, Post $post): bool
      {
         return true; // atau: return $user->id === $post->user_id;
      }

      /**
       * Determine whether the user can create posts.
       */
      public function create(User $user): bool
      {
         return true;
      }

      /**
       * Determine whether the user can update the post.
       */
      public function update(User $user, Post $post): bool
      {
         return $user->id === $post->user_id;
      }

      /**
       * Determine whether the user can delete the post.
       */
      public function delete(User $user, Post $post): bool
      {
         // Hanya pemilik post, dan maksimal 1 jam setelah dibuat
         return $user->id === $post->user_id && $post->created_at->isAfter(now()->subHour());
      }
   }
