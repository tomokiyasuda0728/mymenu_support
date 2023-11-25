<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class typeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('types')->insert([
                'name' => '指定なし',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('types')->insert([
                'name' => '和食',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('types')->insert([
                'name' => '洋食',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
        
        DB::table('types')->insert([
                'name' => '中華',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
    }
}
