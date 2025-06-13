<?php

   namespace App\Http\Controllers\Api\V1;

   use App\Http\Controllers\Controller;
   use App\Models\TokenApp;
   use Illuminate\Http\Request;
   use Illuminate\Support\Carbon;

   class TokenAppController extends Controller
   {
      public function show($token = NULL, $npsn = NULL, $applicationId = NULL) {
         if(!$token){
            return response()->json(['status' => 'error', 'message' => 'Parameter token wajib diisi.'], 400);
         }
         if(!$npsn){
            return response()->json(['status' => 'error', 'message' => 'Parameter NPSN wajib diisi.'], 400);
         }
         if(!$applicationId){
            return response()->json(['status' => 'error', 'message' => 'Parameter applicationId wajib diisi.'], 400);
         }
         $applicationId = (int) $applicationId;
         $tokenApp      = TokenApp::where('token', $token)->first();
         if(!$tokenApp){
            return response()->json([
               'status'  => 'error',
               'message' => 'Token not found.',
            ], 404);
         }
         if($tokenApp->status === 'in_active'){
            return response()->json([
               'status'  => 'error',
               'message' => 'Token tidak aktif.',
            ], 403);
         }
         if($tokenApp->status === 'suspend'){
            return response()->json([
               'status'  => 'error',
               'message' => 'Token disuspend oleh admin.',
            ], 403);
         }
         if($tokenApp->application_id !== $applicationId){
            return response()->json([
               'status'  => 'error',
               'message' => 'Aplikasi tidak sesuai.',
            ], 403);
         }
         if($tokenApp->token_npsn !== $npsn){
            return response()->json([
               'status'  => 'error',
               'message' => 'NPSN tidak valid.',
            ], 403);
         }
         if(Carbon::parse($tokenApp->expired_at)->isPast()){
            return response()->json([
               'status'  => 'error',
               'message' => 'Token has expired.',
            ], 403);
         }

         return response()->json([
            'status' => 'success',
            'data'   => $tokenApp,
         ]);
      }
      public function updateUsedAt(Request $request)
      {
         $request->validate([
            'token'          => 'required|string',
            'token_npsn'     => 'required|string',
            'application_id' => 'required|integer',
         ]);

         $tokenApp = TokenApp::where('token', $request->token)->first();

         if (!$tokenApp) {
            return response()->json([
               'status'  => 'error',
               'message' => 'Token not found.',
            ], 404);
         }

         if ($tokenApp->token_npsn !== $request->token_npsn) {
            return response()->json([
               'status'  => 'error',
               'message' => 'NPSN tidak valid.',
            ], 403);
         }

         if ($tokenApp->application_id !== $request->application_id) {
            return response()->json([
               'status'  => 'error',
               'message' => 'Application ID tidak sesuai.',
            ], 403);
         }

         $tokenApp->used_at = now();
         $tokenApp->save();

         return response()->json([
            'status'  => 'success',
            'message' => 'Token used_at updated successfully.',
            'data'    => $tokenApp,
         ]);
      }
   }
