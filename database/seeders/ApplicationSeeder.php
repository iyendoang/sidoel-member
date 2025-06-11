<?php

   namespace Database\Seeders;

   use App\Models\Application;
   use Illuminate\Database\Console\Seeds\WithoutModelEvents;
   use Illuminate\Database\Seeder;

   class ApplicationSeeder extends Seeder
   {
      /**
       * Run the database seeds.
       */
      public function run(): void {
         Application::create([
            'name' => 'SIDOEL-APP',
            'slug' => 'sidoel-app',
            'description' => 'Aplikasi Sidoel Pendataan',
         ]);
         Application::create([
            'name' => 'SIDOEL-CBT',
            'slug' => 'sidoel-cbt',
            'description' => 'Aplikasi Sidoel Ujian Online',
         ]);
      }
   }
