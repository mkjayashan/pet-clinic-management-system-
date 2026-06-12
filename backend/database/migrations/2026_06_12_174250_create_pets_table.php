<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{

Schema::create('pets', function(Blueprint $table){

$table->id();


$table->foreignId('owner_id')
->constrained('users')
->cascadeOnDelete();


$table->string('name');

$table->string('type');

$table->integer('age');

$table->string('gender');


$table->timestamps();


});


}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
