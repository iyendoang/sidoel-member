<?php

   namespace Database\Seeders;

   use App\Models\User;
   use Illuminate\Database\Seeder;
   use Spatie\Permission\Models\Role;
   use Illuminate\Database\Console\Seeds\WithoutModelEvents;

   class UserSeeder extends Seeder
   {
      /**
       * Run the database seeds.
       */
      public function run(): void
      {
         // Ambil role super-admin dan member
         $superAdminRole = Role::where('name', 'super-admin')->first();
         $memberRole = Role::where('name', 'member')->first();

         // Buat super admin
         $admin = User::create([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@sidoel.id',
            'is_active' => true,
            'password' => bcrypt('admin'),
         ]);
         $admin->assignRole($superAdminRole);

         // Buat user ID 2-5 sebagai member
         for ($i = 2; $i <= 5; $i++) {
            $user = User::create([
               'name' => 'User ' . $i,
               'username' => 'user' . $i,
               'email' => 'user' . $i . '@sidoel.id',
               'is_active' => true,
               'password' => bcrypt('password'),
            ]);
            $user->assignRole($memberRole);
         }
      }
   }
