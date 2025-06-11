<?php

namespace App\Http\Resources\Forum;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin User */
class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->when($this->id === $request->user()?->id, $this->email),
            'avatar' => $this->avatar,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'posts_count' => $this->posts_count,
            'comments_count' => $this->comments_count,
            'notifications_count' => $this->notifications_count,
            'read_notifications_count' => $this->read_notifications_count,
            'unread_notifications_count' => $this->unread_notifications_count,
        ];
    }
}
