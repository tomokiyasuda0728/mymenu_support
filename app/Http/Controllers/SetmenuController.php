<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setmenu;
use Inertia\Inertia;
use App\Models\Mymenu;
use App\Http\Requests\PostRequest;
use Storage;

class SetmenuController extends Controller
{
    
    public function setmenupost(Setmenu $setmenu)
    {
        return Inertia::render("Mymenusupport/setmenupost",["setmenus" => $setmenu->get()]);
    }
    
    public function setmenuindex(Setmenu $setmenu)
    {
        return Inertia::render("Mymenusupport/setmenuindex",["setmenus" => $setmenu->load('mymenus')]);
    }
    
    public function setmenustore(Setmenu $setmenu, PostRequest $request)
    {
        $input = $request->all();
        $setmenu->title = $input["title"];
        $setmenu->user_id = $input["user_id"];
        $setmenu->save();
        
        if(!empty($input["mymenuList"])){
                foreach ($input["mymenuList"] as $mymenuList)
                    $setmenu->mymenus()->attach($mymenuList["id"]);
                    
        }
        
        return redirect("/setmenupost");
    }
    
    public function setmenuedit(Setmenu $setmenu, Mymenu $mymenu)
    {
        return Inertia::render("Mymenusupport/setmenuedit",with(["setmenus" => $setmenu->load('mymenus'), "mymenu"=>$mymenu->get()]));
    }
    
    public function setmenuupdate(Setmenu $setmenu, PostRequest $request)
    {
        $input = $request->all();
        $setmenu->title = $input["title"];
        $setmenu->user_id = $input["user_id"];
        $setmenu->save();
        
        if(!empty($input["mymenuList"])){
                foreach ($input["oldmymenuList"] as $mymenuList)
                    $setmenu->mymenus()->detach($mymenuList["id"]);
                
                foreach ($input["mymenuList"] as $mymenuList)
                    $setmenu->mymenus()->attach($mymenuList["id"]);
            }else{
                foreach ($input["oldmymenuList"] as $mymenuList)
                    $setmenu->mymenus()->detach($mymenuList["id"]);
            }
        
        return redirect("/setmenupost");
    }
    
    public function setmenudelete(Setmenu $setmenu){
        $setmenu->delete();
        return redirect("/setmenupost");
    }
}
