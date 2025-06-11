<?php

   namespace App\Http\Controllers\Forum;

   use App\Http\Controllers\Controller;
   use App\Http\Resources\Forum\CommentResource;
   use App\Http\Resources\Forum\PostResource;
   use App\Http\Resources\Forum\TopicResource;
   use App\Models\Post;
   use App\Models\Topic;
   use Illuminate\Database\Eloquent\Builder;
   use Illuminate\Http\Request;
   use Str;

   class PostController extends Controller
   {
      public function index(Request $request, ?Topic $topic = null) {
         if ($request->query('query')) {
            $postsQuery = Post::search($request->query('query'))
                              ->query(fn (Builder $query) => $query->with(['user', 'topic']))
                              ->when($topic, fn (\Laravel\Scout\Builder $query) => $query->where('topic_id', $topic->id));
         } else {
            $postsQuery = Post::includeUserAndTopic()
                              ->when($topic, fn (Builder $query) => $query->whereBelongsTo($topic))
                              ->latest()
                              ->latest('id');
         }

         // Paginate
         $paginatedPosts = $postsQuery->paginate(config('forum.pagination_per_page'))->withQueryString();

         // Ubah koleksi isi paginator ke PostResource
         $paginatedPosts->setCollection(
            $paginatedPosts->getCollection()->map(fn ($post) =>
            (new PostResource($post))
               ->withAddEditPermission()
               ->withLikePermission()
            )
         );

         return inertia('forum/post/index', [
            'posts' => fn () => $paginatedPosts,
            'selectedTopic' => fn () => $topic ? TopicResource::make($topic) : null,
            'topics' => fn () => TopicResource::collection(Topic::all()),
            'query' => $request->query('query'),
         ]);
      }


      public function store(Request $request) {
         $data = $request->validate([
            'topic_id' => ['required', 'exists:topics,id'],
            'title'    => ['required', 'string', 'min:10', 'max:120'],
            'body'     => ['required', 'string', 'min:100', 'max:10000'],
         ]);
         $post = Post::create([
            ...$data,
            'user_id' => $request->user()->id,
         ]);

         return redirect()
            ->to($post->showRoute())->with('success', 'Post created successfully.');
      }


      public function update(Request $request, Post $post) {
         $data = $request->validate([
            'title'    => ['required', 'string', 'min:10', 'max:120'],
            'body'     => ['required', 'string', 'min:10', 'max:10000'],
            'topic_id' => ['required', 'exists:topics,id'],
         ]);
         $post->update($data);

         return redirect()
            ->route('forum.posts.show', [
               'post' => $post->id,
               'slug' => $post->slug(),
               'page' => request()->query('page'),
            ])->with('success', 'Post updated successfully.');
      }

      public function show(Request $request, Post $post)
      {
         if (! Str::endsWith($post->showRoute(request()->query()), $request->getRequestUri())) {
            return redirect()->to($post->showRoute($request->query()), status: 301);
         }

         $post->load(['user', 'topic']);

         return inertia('forum/post/show', [
            'post' => fn () => PostResource::make($post)
                                           ->withLikePermission()
                                           ->withAddEditPermission(),
            'topics' => fn () => TopicResource::collection(Topic::all()),
            'comments' => function () use ($post) {
               $commentResource = CommentResource::collection($post->comments()->with('user')->latest()->latest('id')->paginate(config('forum.pagination_per_page')));
               $commentResource->collection->transform(fn ($comment) => $comment->withLikePermission());

               return $commentResource;
            },
         ]);
      }
//      public function show(Request $request, Post $post) {
      //
      //         if(!Str::endsWith($post->showRoute(request()->query()), $request->getRequestUri())){
      //            return redirect()->to($post->showRoute($request->query()), status:301);
      //         }
      //         $post->load(['user', 'topic']);
      //
      //         return inertia('forum/post/show', [
      //            'post'     => fn()
      //               => PostResource::make($post)->withLikePermission()->withAddEditPermission(),
      //            'topics'   => fn() => TopicResource::collection(Topic::all()),
      //            'comments' => function() use ($post) {
      //               $commentResource = CommentResource::collection($post
      //                  ->comments()->with('user')->latest()->latest('id')->paginate(config('forum.pagination_per_page')));
      //               $commentResource->collection->transform(fn($comment) => $comment->withLikePermission());
      //
      //               return $commentResource;
      //            },
      //         ]);
      //      }

      public function destroy(Post $post) {
         $post->delete();

         return to_route('forum.posts.index')->with('success', 'Post deleted successfully.');
      }

      public function delete(Post $post) {
         return inertia()->modal('DeletePost', [
            'post' => fn() => $post,
         ])->baseRoute('forum.posts.show', [
            'post' => $post->id,
            'slug' => $post->slug(),
            'page' => request()->query('page'),
         ]);
      }
   }
