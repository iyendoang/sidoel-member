<?php

   namespace App\Http\Controllers\Forum;

   use App\Http\Controllers\Controller;
   use App\Models\Like;
   use Gate;
   use Illuminate\Database\Eloquent\Model;
   use Illuminate\Database\Eloquent\ModelNotFoundException;
   use Illuminate\Database\Eloquent\Relations\Relation;
   use Illuminate\Http\Request;

   class LikeController extends Controller
   {
      public function store(Request $request, string $type, int $id)
      {
         $likeable = $this->findLikable($type, $id);

         Gate::authorize('create', [Like::class, $likeable]);

         $likeable->likes()->create([
            'user_id' => $request->user()->id,
         ]);

         $likeable->increment('likes_count');

         return back();
      }

      public function findLikable(string $type, int $id): Model
      {
         /* @var class-string<Model>|null $modelName */
         $modelName = Relation::getMorphedModel($type);

         if ($modelName === null) {
            throw new ModelNotFoundException;
         }

         return $modelName::findOrFail($id);
      }

      public function destroy(Request $request, string $type, int $id)
      {
         $likeable = $this->findLikable($type, $id);

         Gate::authorize('delete', [Like::class, $likeable]);

         $likeable->likes()->whereBelongsTo($request->user())->delete();

         $likeable->decrement('likes_count');

         return back();
      }
   }
