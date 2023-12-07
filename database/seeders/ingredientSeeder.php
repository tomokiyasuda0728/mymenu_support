<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class ingredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ingredients')->insert([
                'name' => '人参',
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]);
            
        DB::table('ingredients')->insert([
                'name' => 'ジャガイモ',
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]);
            
        DB::table('ingredients')->insert([
                'name' => '玉葱',
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]);
            
        DB::table('ingredients')->insert([
                'name' => '牛肉',
                'created_at' => new DateTime,
                'updated_at' => new DateTime,
            ]);
    }
}
