<?php

   use App\Http\Controllers\Api\V1\TokenAppController;
   use App\Http\Controllers\Api\V1\LinkController;
   use Illuminate\Support\Facades\Route;

   Route::prefix('v1')->group(function() {
      Route::get('/tokens/{token?}/{npsn?}/{applicationId?}', [TokenAppController::class, 'show']);
      Route::post('/tokens/update-used-at', [TokenAppController::class, 'updateUsedAt']);

      // Link
      Route::get('links/{npsn?}', [LinkController::class, 'show']);
      Route::get('cbt-offline-links/{npsn?}', [LinkController::class, 'showByCbt']);
   });
?>