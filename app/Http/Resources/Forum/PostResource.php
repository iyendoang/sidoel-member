<?php

namespace App\Http\Resources\Forum;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Number;
use Str;

/** @mixin Post */
class PostResource extends JsonResource
{
    private bool $withLikePermission = false;

    private bool $withAddEditPermission = false;

    public function withLikePermission(): static
    {
        $this->withLikePermission = true;

        return $this;
    }

    public function withAddEditPermission(): static
    {
        $this->withAddEditPermission = true;

        return $this;
    }

    public function toArray(Request $request): array
    {

        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'html' => $this->html,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'user' => UserResource::make($this->whenLoaded('user')),
            'topic' => TopicResource::make($this->whenLoaded('topic')),
            'likes_count' => Number::abbreviate($this->likes_count).' '.Str::plural('like', $this->likes_count),
            'route' => [
                'show' => $this->showRoute(),
            ],
            'has_liked' => $request->user()
               ? $this->likes()->where('user_id', $request->user()->id)->exists()
               : false,
            'can' => [
               'update' => $this->when($this->withAddEditPermission, fn () => $request->user()?->can('update', $this->resource)),
               'delete' => $this->when($this->withAddEditPermission, fn () => $request->user()?->can('delete', $this->resource)),
               'like'   => $this->when($this->withLikePermission, fn () => $request->user()?->can('create', [Like::class, $this->resource])),
            ],
            'debug' => [
               'user_id' => $request->user()?->id,
               'resource_user_id' => $this->resource->user_id ?? null,
               'can_update' => $request->user()?->can('update', $this->resource),
            ],

        ];
    }
}
