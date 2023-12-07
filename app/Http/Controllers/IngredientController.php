<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ingredient;

class IngredientController extends Controller
{
     public function addstore(Request $request, Ingredient $ingredient)
    {
        $input = $request->all();
        $ingredient->name = $input["ingredient"];
        $ingredient->save();
    }
}
