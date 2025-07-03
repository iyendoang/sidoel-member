<?php

   namespace App\Http\Controllers\Api\V1;

   use App\Http\Controllers\Controller;
   use App\Http\Resources\Api\V1\LinkCbtOfflineResource;
   use App\Http\Resources\Api\V1\LinkProfileResource;
   use App\Models\Link;
   use App\Models\LinkProfile;
   use Illuminate\Http\Request;

   class LinkController extends Controller
   {
      public function show($npsn = NULL) {
         if(!$npsn){
            return response()->json([
               'status'  => 'error',
               'message' => 'Parameter NPSN wajib diisi.',
            ], 400);
         }
         $profile = LinkProfile::with([
            'links' => function($q) {
               $q->where('is_active', true)
                 ->where('is_cbt_offline', false)
                 ->orderBy('order');
            },
            'lembaga',
         ])->where('link_profile_npsn', $npsn)->first();
         if(!$profile){
            return response()->json([
               'status'  => 'error',
               'message' => 'Link profile dengan NPSN tersebut tidak ditemukan.',
            ], 404);
         }

         return response()->json([
            'status' => 'success',
            'data'   => new LinkProfileResource($profile),
         ]);
      }

      public function showByCbt($npsn = NULL) {
         if(!$npsn){
            return response()->json([
               'status'  => 'error',
               'message' => 'Parameter NPSN wajib diisi.',
            ], 400);
         }
         $profile = LinkProfile::with([
            'links' => function($q) {
               $q->where('is_active', true)
                 ->where('is_cbt_offline', true)
                 ->orderBy('order');
            },
            'lembaga',
         ])->where('link_profile_npsn', $npsn)->first();
         if(!$profile){
            return response()->json([
               'status'  => 'error',
               'message' => 'Link profile dengan NPSN tersebut tidak ditemukan.',
            ], 404);
         }

         return response()->json([
            'status' => 'success',
            'data'   => new LinkCbtOfflineResource($profile),
         ]);
      }
   }
