<?php

   use App\Models\Post;
   use App\Models\User;
   use Illuminate\Database\Migrations\Migration;
   use Illuminate\Database\Schema\Blueprint;
   use Illuminate\Support\Facades\Schema;

   return new class extends Migration {
      /**
       * Run the migrations.
       */
      public function up(): void {
         Schema::create('comments', function(Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained('users')->restrictOnDelete();
            $table->foreignIdFor(Post::class)->constrained('posts')->cascadeOnDelete();
            $table->longText('body');
            $table->longText('html');
            $table->unsignedBigInteger('likes_count')->default(0);
            $table->timestamps();
         });
      }

      /**
       * Reverse the migrations.
       */
      public function down(): void {
         Schema::dropIfExists('comments');
      }
   };
