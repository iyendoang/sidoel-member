<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('link_profiles', function (Blueprint $table) {
           $table->id();
           $table->string('link_profile_npsn')->unique();
           $table->string('display_name')->nullable();
           $table->text('bio')->nullable();
           $table->string('avatar')->nullable();
           $table->string('theme')->nullable();
           $table->timestamps();

           $table->foreign('link_profile_npsn')->references('npsn')->on('lembagas')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('link_profiles');
    }
};
