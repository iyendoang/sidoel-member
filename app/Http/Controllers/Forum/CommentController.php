<?php

namespace App\Http\Controllers\Forum;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    use AuthorizesRequests;

    public function store(Request $request, Post $post)
    {
        Gate::authorize('create', Comment::class);

        $validated = $request->validate([
            'body' => ['required', 'string', 'max:2500'],
        ]);

        Comment::create([
            ...$validated,
            'post_id' => $post->id,
            'user_id' => $request->user()->id,
        ]);

        return redirect($post->showRoute())
            ->with('success', 'Comment added successfully.');
    }

    public function create(Post $post)
    {
        $post->load(['user']);

        return inertia()->modal('AddEditComment', [
            'post' => fn () => $post,
        ])->baseRoute('forum.posts.show', ['post' => $post->id, 'slug' => $post->slug(), 'page' => request()->query('page')]);
    }

    public function edit(Comment $comment)
    {
        $comment->load(['post', 'user']);

        return inertia()->modal('AddEditComment', [
            'comment' => fn () => $comment,
        ])->baseRoute('forum.posts.show', ['post' => $comment->post_id, 'slug' => $comment->post->slug(), 'page' => request()->query('page')]);
    }

    public function update(Request $request, Comment $comment)
    {
        Gate::authorize('update', $comment);

        $validated = $request->validate([
            'body' => ['required', 'string', 'max:2500'],
        ]);

        $comment->update($validated);

        return redirect($comment->post->showRoute(['page' => $request->query('page')]))
            ->with('success', 'Comment updated successfully.');
    }

    public function destroy(Request $request, Comment $comment)
    {
        Gate::authorize('delete', $comment);

        $comment->delete();
        /* $this->authorize('delete', $comment); */

        return redirect($comment->post->showRoute(['page' => $request->query('page')]))
            ->with('success', 'Comment deleted successfully.');
    }

    public function delete(Comment $comment)
    {
        return inertia()->modal('DeleteComment', [
            'comment' => fn () => $comment,
        ])->baseRoute('forum.posts.show', ['post' => $comment->post_id, 'slug' => $comment->post->slug(), 'page' => request()->query('page')]);
    }
}
