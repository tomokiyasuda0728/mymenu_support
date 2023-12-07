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
        Schema::table('mymenus', function (Blueprint $table) {
            $table->dropForeign('mymenus_main_id_foreign');
            $table->dropColumn('main_id');
            $table->foreignId('dish_id')->constrained('dishes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mymenus', function (Blueprint $table) {
            $table->foreignId('main_id')->constrained('mains')->onDelete('cascade');
            $table->dropForeign('mymenus_dish_id_foreign');
            $table->dropColumn('dish_id');
        });
    }
};
