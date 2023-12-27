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
        Schema::create('setmenus', function (Blueprint $table) {
            $table->id();
        	$table->string('title', 50)->nullable(false);
        	$table->string('dates', 100) ->nullable();
        	$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
    	    $table->timestamps();
	        $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('setmenus');
    }
};
