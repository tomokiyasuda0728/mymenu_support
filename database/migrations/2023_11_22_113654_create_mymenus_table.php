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
        Schema::create('mymenus', function (Blueprint $table) {
            $table->id();
            $table->string('title', 50)->nullable(false);
	        $table->string('photograph', 100)->nullable();
        	$table->foreignId('type_id')->constrained('types')->onDelete('cascade');
        	$table->foreignId('mainfood_id')->constrained('mainfoods')->onDelete('cascade');
        	$table->foreignId('main_id')->constrained('mains')->onDelete('cascade');
        	$table->text('way_of_making')->nullable();
	        $table->string('comment', 200)->nullable();
	        $table->string('dates', 100) ->nullable();
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
        Schema::dropIfExists('mymenus');
    }
};
