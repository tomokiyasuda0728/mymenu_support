<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
    
    $this->call(auto_menu_setSeeder::class);
    $this->call(ingredientSeeder::class);
    $this->call(mainfoodSeeder::class);
    $this->call(dishSeeder::class);
    $this->call(typeSeeder::class);
    $this->call(mymenuSeeder::class);
    $this->call(setmenuSeeder::class);
    
    }
}
