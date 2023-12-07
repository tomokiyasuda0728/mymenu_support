<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mymenu;
use App\Models\Type;
use App\Models\Dish;
use App\Models\Mainfood;
use App\Models\Ingredient;
use App\Http\Requests\PostRequest;

class MymenuController extends Controller
{
     public function post(Mymenu $mymenu)
    {
        return Inertia::render("Mymenusupport/post",["mymenus" => $mymenu->get()]);
    }
    
    public function getByMymenu(int $limit_count = 5)
    {
         return $this->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
    
     public function postindex(Mymenu $mymenu)
    {
        return Inertia::render("Mymenusupport/index",["mymenus" => $mymenu->load('type', 'dish', 'mainfood', 'ingredients')]);
    }
    
    public function create(Type $type, Dish $dish, Mainfood $mainfood, Ingredient $ingredient)
    {
        return Inertia::render("Mymenusupport/create",with(["type"=>$type->get(), "dish"=>$dish->get(), "mainfood"=>$mainfood->get(), "ingredient"=>$ingredient->get()]));
    }
    
    public function store(Mymenu $mymenu, PostRequest $request)
    {
            dd($request->ingredient_id[1]);
            $input = $request->all();
            $mymenu->title = $input["title"];
            $mymenu->photograph = $input["photograph"];
            $mymenu->type_id = $input["type_id"];
            $mymenu->mainfood_id = $input["mainfood_id"];
            $mymenu->dish_id = $input["dish_id"];
            $mymenu->way_of_making = $input["way_of_making"];
            $mymenu->comment = $input["comment"];
            $mymenu->type_id = $input["type_id"];
            $mymenu->user_id = $input["user_id"];
            $mymenu->save();
            
        
            if(!empty($input->ingredient_id)){
            foreach ($input->ingredient_id as $ingredient_id)
                foreach ($input->quantity as $quantity)
                  auth()->mymenu()->ingredients()->attach($ingredient_id, ['quantity' => $quantity]);
            }
        
        return redirect("/post");
    }
    
}