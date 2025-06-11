<?php

   use Illuminate\Database\Migrations\Migration;
   use Illuminate\Database\Schema\Blueprint;
   use Illuminate\Support\Facades\Schema;

   return new class extends Migration {
      /**
       * Run the migrations.
       */
      public function up(): void {
         Schema::create('token_apps', function(Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->onDelete('cascade');
            $table->string('token_npsn');
            $table
               ->foreign('token_npsn')->references('npsn')->on('lembagas')->onUpdate('cascade')->onDelete('cascade');
            $table->string('token')->unique();
            $table->date('expired_at')->index();
            $table->boolean('is_valid')->default(true);
            $table->timestamp('used_at')->nullable();
            $table->string('description')->nullable();
            $table->enum('status', ['active', 'expired', 'revoked'])->default('active');
            $table->timestamps();
            $table->softDeletes();
            $table->index(['application_id', 'token_npsn']);
         });
      }

      /**
       * Reverse the migrations.
       */
      public function down(): void {
         Schema::dropIfExists('token_apps'); // Sudah cukup kalau drop tabel langsung
      }
   };
