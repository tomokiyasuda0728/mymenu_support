<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use DateTime;

class setmenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('setmenus')->insert([
                'title' => 'セット見本',
                'user_id' => 1,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
        ]);
    }
}
