<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Dish;
use App\Models\Mymenu;

class DishController extends Controller
{
    public function post(Dish $dish)
    {
        return Inertia::render("Mymenusupport/dish",["dishes" => $dish->load('mymenus')]);
    }
}
