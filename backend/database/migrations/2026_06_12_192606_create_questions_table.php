<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('owner_id');
    $table->string('title');
    $table->text('description');
    $table->string('category');
    $table->timestamps();
});
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};