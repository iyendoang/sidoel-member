<?php

   namespace Database\Seeders;

   use Illuminate\Database\Seeder;
   use Spatie\Permission\Models\Role;
   use Spatie\Permission\Models\Permission;

   class RoleSeeder extends Seeder
   {
      public function run(): void {
         // users-access
         $user_permissions = Permission::where('name', 'like', '%users%')->get();
         $user_group       = Role::firstOrCreate(['name' => 'users-access']);
         $user_group->syncPermissions($user_permissions);
         // roles-access
         $role_permissions = Permission::where('name', 'like', '%roles%')->get();
         $role_group       = Role::firstOrCreate(['name' => 'roles-access']);
         $role_group->syncPermissions($role_permissions);
         // permissions-access
         $permission_permissions = Permission::where('name', 'like', '%permissions%')->get();
         $permission_group       = Role::firstOrCreate(['name' => 'permission-access']);
         $permission_group->syncPermissions($permission_permissions);
         // member role and permissions
         $memberRole  = Role::firstOrCreate(['name' => 'member']);
         $permissions = [
            'applications-data',
            'applications-create',
            'applications-update',
            'applications-delete',
            'applications-show',
            'lembagas-data',
            'lembagas-create',
            'lembagas-update',
            'lembagas-delete',
            'lembagas-show',
            'user-lembagas-data',
            'user-lembagas-create',
            'user-lembagas-update',
            'user-lembagas-delete',
            'user-lembagas-show',
            'token-apps-data',
            'token-apps-create',
            'token-apps-update',
            'token-apps-delete',
            'token-apps-show',
            'link-profiles-data',
            'link-profiles-create',
            'link-profiles-update',
            'link-profiles-delete',
            'link-profiles-show',
            'links-data',
            'links-create',
            'links-update',
            'links-delete',
            'links-show',
         ];
         foreach($permissions as $permName) {
            $permission = Permission::firstOrCreate(['name' => $permName]);
            $memberRole->givePermissionTo($permission);
         }
         // super-admin
         Role::firstOrCreate(['name' => 'super-admin']);
      }
   }
