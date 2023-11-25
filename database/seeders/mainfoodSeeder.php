<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class mainfoodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mainfoods')->insert([
                'name' => '指定なし',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('mainfoods')->insert([
                'name' => '牛肉',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('mainfoods')->insert([
                'name' => '豚肉',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('mainfoods')->insert([
                'name' => '鶏肉',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('mainfoods')->insert([
                'name' => '魚',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
    }
}
