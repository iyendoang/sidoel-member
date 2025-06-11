<?php

   namespace Database\Seeders;

   use App\Models\UserLembaga;
   use Illuminate\Database\Seeder;
   use App\Models\Lembaga;

   class LembagaSeeder extends Seeder
   {
      public function run(): void
      {
         $lembagas = Lembaga::factory()->count(10)->create();
         // Ambil beberapa lembaga secara acak
         $selectedLembagas = $lembagas->random(4);

         // Isi relasi untuk user ID 2-5
         $userIds = [2, 3, 4, 5];

         foreach ($userIds as $index => $userId) {
            $lembaga = $selectedLembagas[$index] ?? $lembagas->random();

            UserLembaga::create([
               'user_id' => $userId,
               'user_npsn' => $lembaga->npsn, // Pastikan npsn unik dan valid
            ]);
         }
      }
   }
