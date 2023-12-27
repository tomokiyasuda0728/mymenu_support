<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mymenu;
use App\Models\Type;
use App\Models\Dish;
use App\Models\Mainfood;
use App\Models\Setmenu;
use App\Models\Ingredient;
use App\Http\Requests\PostRequest;
use Storage;

class MymenuController extends Controller
{
     public function post(Mymenu $mymenu)
    {
        return Inertia::render("Mymenusupport/post",["mymenus" => $mymenu->get()]);
    }
    
     public function postindex(Mymenu $mymenu)
    {
        return Inertia::render("Mymenusupport/index",["mymenus" 
        => $mymenu->load('type', 'dish', 'mainfood', 'ingredients')]);
    }
    
    public function create(Type $type, Dish $dish, Mainfood $mainfood, Ingredient $ingredient)
    {
        return Inertia::render("Mymenusupport/create",with([
            "type"=>$type->get(), "dish"=>$dish->get(), "mainfood"=>$mainfood->get(),
            "ingredient"=>$ingredient->get()
            ]));
    }
    
    public function store(Mymenu $mymenu, PostRequest $request)
    {
            $input = $request->all();
            $mymenu->title = $input["title"];
            $image = $input["photograph"];
            $path = Storage::disk('s3')->putFile('myprefix', $image, 'public');
            $mymenu->photograph = Storage::disk('s3')->url($path);
            $mymenu->type_id = $input["type_id"];
            $mymenu->mainfood_id = $input["mainfood_id"];
            $mymenu->dish_id = $input["dish_id"];
            $mymenu->way_of_making = $input["way_of_making"];
            $mymenu->comment = $input["comment"];
            $mymenu->type_id = $input["type_id"];
            $mymenu->user_id = $input["user_id"];
            $mymenu->save();
            
            
            if(!empty($input["ingredient_quantity"])){
                foreach ($input["ingredient_quantity"] as $ingredient)
                    $mymenu->ingredients()
                    ->attach($ingredient["id"], ['quantity' => $ingredient["quantity"]]);
                    
            }
        
        return redirect("/post");
    }
    
    public function edit(Mymenu $mymenu, Type $type, Dish $dish, Mainfood $mainfood, Ingredient $ingredient)
    {
        return Inertia::render("Mymenusupport/edit",with([
            "mymenus" => $mymenu->load('type', 'dish', 'mainfood', 'ingredients'),
            "type"=>$type->get(), "dish"=>$dish->get(), "mainfood"=>$mainfood->get(),
            "ingredient"=>$ingredient->get()
            ]));
    }
    
    
    public function update(Mymenu $mymenu, PostRequest $request)
    {
        
        $input = $request->all();
        $mymenu->id = $input["id"];
        $mymenu->title = $input["title"];
        if(!empty($input["photograph"])){
            $image = $input["photograph"];
            $path = Storage::disk('s3')->putFile('myprefix', $image, 'public');
            $mymenu->photograph = Storage::disk('s3')->url($path);
        };
        $mymenu->type_id = $input["type_id"];
        $mymenu->mainfood_id = $input["mainfood_id"];
        $mymenu->dish_id = $input["dish_id"];
        $mymenu->way_of_making = $input["way_of_making"];
        $mymenu->comment = $input["comment"];
        $mymenu->type_id = $input["type_id"];
        $mymenu->user_id = $input["user_id"];
        $mymenu->save();
            
            
        if(!empty($input["ingredient_quantity"])){
            foreach ($input["oldingredient_quantity"] as $ingredient)
                $mymenu->ingredients()->detach($ingredient["id"]);
            
            foreach ($input["ingredient_quantity"] as $ingredient)
                $mymenu->ingredients()->attach($ingredient["id"], ['quantity' => $ingredient["quantity"]]);
        }else{
            foreach ($input["oldingredient_quantity"] as $ingredient)
                $mymenu->ingredients()->detach($ingredient["id"]);
        }
    return redirect("/post");
    }
    
    public function delete(Mymenu $mymenu){
        $mymenu->delete();
        return redirect("/post");
    }
    
    public function setmenucreate(Mymenu $mymenu)
    {
        return Inertia::render("Mymenusupport/setmenuadd",["mymenus" => $mymenu->get()]);
    }
    
    public function automenuset(Mymenu $mymenu, Setmenu $setmenu)
    {
        return Inertia::render("Mymenusupport/automenuset",[
            "mymenus" => $mymenu->get(), "setmenus" => $setmenu->get()
            ]);
    }
    
    public function automenustore(Mymenu $mymenu, Setmenu $setmenu, Request $request)
    {
        $input = $request->all();
        if(!empty($input["datemymenu"])){
            foreach ($input["datemymenu"] as $datemymenu)
                if($datemymenu["menutype"] == "mymenu"){
                    $mymenu = Mymenu::find($datemymenu["id"]);
                    $mymenu->title = $datemymenu["title"];
                    $mymenu->photograph = $datemymenu["photograph"];
                    $mymenu->type_id = $datemymenu["typeid"];
                    $mymenu->mainfood_id = $datemymenu["mainfoodid"];
                    $mymenu->dish_id = $datemymenu["dishid"];
                    $mymenu->way_of_making = $datemymenu["way_of_making"];
                    $mymenu->comment = $datemymenu["comment"];
                    $mymenu->dates = $datemymenu["date"];
                    $mymenu->user_id = $input["user_id"];
                    $mymenu->save();
                }
                if($datemymenu["menutype"] == "setmenu"){
                    $setmenu = Setmenu::find($datemymenu["id"]);
                    $setmenu->title = $datemymenu["title"];
                    $setmenu->dates = $datemymenu["date"];
                    $setmenu->user_id = $input["user_id"];
                    $setmenu->save();
                }
        }
        
        return redirect("/datemenupost");
    }
    
    public function datemenupost(Mymenu $mymenu, Setmenu $setmenu)
    {
        return Inertia::render("Mymenusupport/datemenupost",[
            "mymenus" => $mymenu->orderBy('dates','desc')->get(),
            "setmenus" => $setmenu->orderBy('dates','desc')->get()
            ]);
    }
    
    public function editdatestore(Mymenu $mymenu, Setmenu $setmenu, Request $request)
    {
        $input = $request->all();
        foreach ($input["fullmymenu"] as $fullmymenu){
                $mymenu = Mymenu::find($fullmymenu["id"]);
                $mymenu->dates = $fullmymenu["dates"];
                $mymenu->user_id = $input["user_id"];
                $mymenu->save();
        }
        foreach ($input["fullsetmenu"] as $fullsetmenu){
                $setmenu = Setmenu::find($fullsetmenu["id"]);
                $setmenu->dates = $fullsetmenu["dates"];
                $setmenu->user_id = $input["user_id"];
                $setmenu->save();
        }
        
        return redirect("/datemenupost");
    }
    
}