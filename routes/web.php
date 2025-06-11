<?php

   use App\Http\Controllers\Apps\ApplicationController;
   use App\Http\Controllers\Apps\DashboardController;
   use App\Http\Controllers\Apps\LembagaController;
   use App\Http\Controllers\Apps\LinkController;
   use App\Http\Controllers\Apps\LinkProfileController;
   use App\Http\Controllers\Apps\PermissionController;
   use App\Http\Controllers\Apps\RoleController;
   use App\Http\Controllers\Apps\TokenAppController;
   use App\Http\Controllers\Apps\UserController;
   use App\Http\Controllers\Apps\UserLembagaController;
   use App\Http\Controllers\Forum\CommentController;
   use App\Http\Controllers\Forum\LikeController;
   use App\Http\Controllers\Forum\PostController;
   use App\Http\Controllers\LandingController;
   use Illuminate\Support\Facades\Route;

   Route::get('/', [LandingController::class, 'index'])->name('landing.index');
   Route::group(['prefix' => 'apps', 'as' => 'apps.', 'middleware' => ['auth']], function() {
      // dashboard route
      Route::get('/dashboard', DashboardController::class)->name('dashboard');
      // permission route
      Route::resource('/permissions', PermissionController::class)->only(['index', 'store', 'update', 'destroy']);
      // lembaga route
      Route::resource('/lembagas', LembagaController::class)->only(['index', 'store', 'update', 'destroy']);
      Route::post('/lembagas/force-add-npsn', [LembagaController::class, 'forceAddNpsn'])
           ->name('lembagas.force-add-npsn');
      Route::put('/lembagas/force-update-npsn/{id}', [LembagaController::class, 'updateNpsn'])
           ->name('lembagas.force-update-npsn');
      // application route
      Route::resource('/applications', ApplicationController::class)->only(['index', 'store', 'update', 'destroy']);
      // role route
      Route::resource('/roles', RoleController::class)->except('show');
      // user route
      Route::put('/users/{user}/status', [UserController::class, 'status'])->name('users.status');
      Route::resource('/users', UserController::class);
      // token-apps route
      Route::resource('/token-apps', TokenAppController::class)->only(['index', 'store', 'update', 'destroy']);
      // Tambahan untuk restore dan forceDelete token-apps
      Route::patch('/token-apps/{id}/restore', [TokenAppController::class, 'restore'])->name('token-apps.restore');
      Route::delete('/token-apps/{id}/force-delete', [TokenAppController::class, 'forceDelete'])
           ->name('token-apps.force-delete');
      // link-profiles route
      Route::resource('link-profiles', LinkProfileController::class)->only(['index', 'store', 'update', 'destroy']);
      // links route
      Route::resource('links', LinkController::class)->only(['index', 'store', 'update', 'destroy']);
      Route::get('links-show/{id}', [LinkController::class, 'showById'])->name('links.show-by-id');
   });
   Route::group(['prefix' => 'forum', 'as' => 'forum.', 'middleware' => ['auth']], function() {
      Route::resource('posts.comments', CommentController::class)->shallow()->only([
         'create',
         'store',
         'edit',
         'update',
         'destroy',
      ]);
      Route::get('comments/{comment}/delete', [CommentController::class, 'delete'])->name('comments.delete');
      Route::resource('posts', PostController::class)->only(['create', 'store', 'edit', 'update', 'destroy']);
      Route::get('posts/{post}/delete', [PostController::class, 'delete'])->name('posts.delete');
      Route::post('likes/{type}/{id}', [LikeController::class, 'store'])->name('likes.store');
      Route::delete('likes/{type}/{id}', [LikeController::class, 'destroy'])->name('likes.destroy');
      Route::get('posts/{topic?}', [PostController::class, 'index'])->name('posts.index');
      Route::get('posts/{post}/{slug}', [PostController::class, 'show'])->name('posts.show');
   });
   require __DIR__ . '/auth.php';
