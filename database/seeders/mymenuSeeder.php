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
                'title' => '見本1',
                'type_id' => 1,
                'mainfood_id' => 1,
                'dish_id' => 1,
                'user_id' => 1,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('mymenus')->insert([
                'title' => '見本2',
                'type_id' => 2,
                'mainfood_id' => 2,
                'dish_id' => 2,
                'user_id' => 1,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('mymenus')->insert([
                'title' => '見本3',
                'type_id' => 3,
                'mainfood_id' => 3,
                'dish_id' => 3,
                'user_id' => 1,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('mymenus')->insert([
                'title' => '見本4',
                'type_id' => 4,
                'mainfood_id' => 4,
                'dish_id' => 2,
                'user_id' => 1,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
    }
}
