<?php

   namespace App\Http\Controllers;

   use Illuminate\Support\Facades\Storage;

   class LandingController extends Controller
   {
      public function index() {
         //         if(auth()->check()){
         //            return to_route('apps.dashboard');
         //         }
         // Load json dari storage/app/landing.json
         $json = file_get_contents(public_path('landing.json'));
         $data = json_decode($json, true);
         return inertia('landing/index', [
            'data' => $data,
         ]);
      }
   }
