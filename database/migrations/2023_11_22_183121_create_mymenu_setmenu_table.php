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
        Schema::create('mymenu_setmenu', function (Blueprint $table) {
            $table->foreignId('mymenu_id')->constrained('mymenus')->onDelete('cascade');
            $table->foreignId('setmenu_id')->constrained('setmenus')->onDelete('cascade');
            $table->primary(['mymenu_id', 'setmenu_id']);  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mymenu_setmenu');
    }
};
