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
        Schema::create('links', function (Blueprint $table) {
           $table->id();
           $table->unsignedBigInteger('link_profile_id');
           $table->string('link_npsn');
           $table->string('title');
           $table->text('url');
           $table->integer('order')->default(0);
           $table->string('icon')->nullable();
           $table->string('bg_color')->nullable();
           $table->boolean('is_cbt_offline')->default(false);
           $table->boolean('is_active')->default(true);
           $table->boolean('is_safemode')->default(false);
           $table->unsignedBigInteger('clicks')->default(0);
           $table->timestamps();
           $table->foreign('link_profile_id')->references('id')->on('link_profiles')->onDelete('cascade');
           $table->foreign('link_npsn')->references('npsn')->on('lembagas')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
