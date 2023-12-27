<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Ingredient;

class IngredientController extends Controller
{
    
    public function addpost(Ingredient $ingredient)
    {
        return Inertia::render("Mymenusupport/addingredient",["ingredients" => $ingredient->get()]);
    }
    
     public function addstore(Request $request, Ingredient $ingredient)
    {
        $input = $request->all();
        foreach ($input["postingredient"] as $newingredient){
            $ingredient = new Ingredient();
            $ingredient->name = $newingredient["name"];
            $ingredient->save();
        }
        
        return back("/addposts");
    }
    
    
    
}
