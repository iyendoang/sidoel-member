<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;

class CommentModalController extends Controller
{
    public function edit(Comment $comment)
    {
        $comment->load(['post', 'user']);

        return inertia()->modal('AddEditComment', [
            'comment' => fn () => $comment,
        ])->baseRoute('forum.posts.show', $comment->post_id);
    }

    public function create(Post $post)
    {
        $post->load(['user']);

        return inertia()->modal('AddEditComment', [
            'post' => fn () => $post,
        ])->baseRoute('forum.posts.show', $post->id);
    }

    public function destroy(Comment $comment)
    {
        return inertia()->modal('DeleteComment', [
            'comment' => fn () => $comment,
        ])->baseRoute('forum.posts.show', $comment->post_id);
    }
}
