<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class mymenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mymenus')->insert([
                'title' => '見本',
                'type_id' => 1,
                'mainfood_id' => 1,
                'main_id' => 1,
                'user_id' => 1,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
                'event_id' => null,
        ]);
    }
}
