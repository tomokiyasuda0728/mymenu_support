<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class auto_menu_setSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         DB::table('auto_menu_sets')->insert([
                'start_date' => '2023-01-01',
                'end_date' => '2023-12-31',
                'genre_conflict' => true,
                'menu_space' => 14,
                'user_id' => 1,
         ]);
    }
}
