<?php

   namespace Database\Seeders;

   use App\Models\Comment;
   use App\Models\Like;
   use App\Models\Post;
   use App\Models\Topic;
   use App\Models\User;
   use Illuminate\Database\Seeder;
   use Spatie\Permission\Models\Role;

   class DatabaseSeeder extends Seeder
   {
      /**
       * Seed the application's database.
       */
      public function run(): void {
         // Jalankan seeder permission & role duluan
         $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
         ]);
         // Pastikan role tersedia
         $superAdmin2Role = Role::where('name', 'super-admin')->first();
         if(!$superAdmin2Role){
            $this->command->error('Role "super-admin" tidak ditemukan. Seeder dibatalkan.');

            return;
         }
         // Seeder topik & user dummy
         $this->call(TopicSeeder::class);
         $topics = Topic::all();
         $users  = User::factory(10)->create();
         $posts = Post::factory(200)->withFixture()->has(Comment::factory(15)->recycle($users))->recycle([
               ...$users->all(),
               ...$topics->all(),
            ])->create();
         $admin = User::factory()
                      ->has(Post::factory(45)->recycle($topics)->withFixture())
                      ->has(Comment::factory(120)
                                   ->recycle($posts))
                      ->has(Like::factory(100)->forEachSequence(...$posts->random(100)->map(fn(Post $post)
                         => [
                         'likeable_id'   => $post->id,
                         'likeable_type' => Post::class,
                      ])))
                      ->create([
                         'name'      => 'Administrator',
                         'username'  => 'admin2',
                         'email'     => 'admin@admin.id',
                         'is_active' => true,
                         'password'  => bcrypt('admin'),
                      ]);
         $admin->assignRole($superAdmin2Role);
         // Jalankan seeder lainnya
         $this->call([
            UserSeeder::class,
            LembagaSeeder::class,
            ApplicationSeeder::class,
         ]);
      }
   }
