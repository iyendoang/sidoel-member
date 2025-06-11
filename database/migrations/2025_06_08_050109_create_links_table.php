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
           $table->unsignedBigInteger('link_profile_id'); // FK ke link_profiles.id
           $table->string('link_npsn'); // FK ke lembagas.link_npsn
           $table->string('title');
           $table->text('url');
           $table->string('icon')->nullable(); // emoji/icon/gambar kecil
           $table->boolean('is_active')->default(true);
           $table->integer('order')->default(0);
           $table->unsignedBigInteger('clicks')->default(0);
           $table->string('bg_color')->nullable(); // opsional background color
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
