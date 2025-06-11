<?php

   namespace App\Http\Resources\Forum;

   use App\Models\Comment;
   use App\Models\Like;
   use Illuminate\Http\Request;
   use Illuminate\Http\Resources\Json\JsonResource;
   use Number;
   use Str;

   /** @mixin Comment */
   class CommentResource extends JsonResource
   {
      private bool $withLikePermission = false;

      public function withLikePermission(): static {
         $this->withLikePermission = true;

         return $this;
      }

      public function toArray(Request $request): array {
         return [
            'id'          => $this->id,
            'body'        => $this->body,
            'html'        => $this->html,
            'likes_count' => Number::abbreviate($this->likes_count) . ' ' . Str::plural('like', $this->likes_count),
            // 'post' => $this->whenLoaded('post', fn () => PostResource::make($this->post)),
            'post'        => PostResource::make($this->whenLoaded('post')),
            'user'        => UserResource::make($this->whenLoaded('user')),
            'has_liked'   => $request->user() ? $this->likes()
                                                     ->where('user_id', $request->user()->id)
                                                     ->exists() : false,
            'can'         => [
               'update' => $request->user()?->can('update', $this->resource),
               'delete' => $request->user()?->can('delete', $this->resource),
               'like'   => $this->when($this->withLikePermission, fn() => $request->user()?->can('create', [
                  Like::class,
                  $this->resource,
               ])),
            ],
            'created_at'  => $this->created_at,
            'updated_at'  => $this->updated_at,
         ];
      }
   }
