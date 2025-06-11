<?php

   namespace Database\Seeders;

   use Illuminate\Database\Seeder;
   use Spatie\Permission\Models\Permission;
   use Illuminate\Database\Console\Seeds\WithoutModelEvents;

   class PermissionSeeder extends Seeder
   {
      /**
       * Run the database seeds.
       */
      public function run(): void {
         // users permissions
         Permission::create(['name' => 'users-data']);
         Permission::create(['name' => 'users-create']);
         Permission::create(['name' => 'users-update']);
         Permission::create(['name' => 'users-delete']);
         Permission::create(['name' => 'users-show']);
         // roles permissions
         Permission::create(['name' => 'roles-data']);
         Permission::create(['name' => 'roles-create']);
         Permission::create(['name' => 'roles-update']);
         Permission::create(['name' => 'roles-delete']);
         // permissions permissions
         Permission::create(['name' => 'permissions-data']);
         Permission::create(['name' => 'permissions-create']);
         Permission::create(['name' => 'permissions-update']);
         Permission::create(['name' => 'permissions-delete']);
         // applications permissions
         Permission::create(['name' => 'applications-data']);
         Permission::create(['name' => 'applications-create']);
         Permission::create(['name' => 'applications-update']);
         Permission::create(['name' => 'applications-delete']);
         Permission::create(['name' => 'applications-show']);
         // lembagas permissions
         Permission::create(['name' => 'lembagas-data']);
         Permission::create(['name' => 'lembagas-create']);
         Permission::create(['name' => 'lembagas-update']);
         Permission::create(['name' => 'lembagas-delete']);
         Permission::create(['name' => 'lembagas-show']);
         // user-lembagas permissions
         Permission::create(['name' => 'user-lembagas-data']);
         Permission::create(['name' => 'user-lembagas-create']);
         Permission::create(['name' => 'user-lembagas-update']);
         Permission::create(['name' => 'user-lembagas-delete']);
         Permission::create(['name' => 'user-lembagas-show']);
         // token-apps permissions
         Permission::create(['name' => 'token-apps-data']);
         Permission::create(['name' => 'token-apps-create']);
         Permission::create(['name' => 'token-apps-update']);
         Permission::create(['name' => 'token-apps-delete']);
         Permission::create(['name' => 'token-apps-show']);
         // link-profiles permissions
         Permission::create(['name' => 'link-profiles-data']);
         Permission::create(['name' => 'link-profiles-create']);
         Permission::create(['name' => 'link-profiles-update']);
         Permission::create(['name' => 'link-profiles-delete']);
         Permission::create(['name' => 'link-profiles-show']);
         // links permissions
         Permission::create(['name' => 'links-data']);
         Permission::create(['name' => 'links-create']);
         Permission::create(['name' => 'links-update']);
         Permission::create(['name' => 'links-delete']);
         Permission::create(['name' => 'links-show']);
      }
   }
