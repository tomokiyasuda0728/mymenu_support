<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auto_menu_sets', function (Blueprint $table) {
            $table->id();
         	$table->string('start_date', 100) ->nullable(false);
        	$table->string('end_date', 100) ->nullable(false);
        	$table->boolean('genre_conflict') ->nullable(false);
        	$table->integer('menu_space') ->nullable(false);
        	$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auto_menu_sets');
    }
};
