<?php

   namespace App\Http\Controllers;

   class LandingController extends Controller
   {
      public function index() {
         $json = file_get_contents(public_path('landing.json'));
         $data = json_decode($json, true);
         return inertia('landing/index', [
            'data' => $data,
         ]);
      }
   }
