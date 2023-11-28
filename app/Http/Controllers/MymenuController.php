<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mymenu;

class MymenuController extends Controller
{
     public function post(Mymenu $mymenu)
    {
        return Inertia::render("Mymenusupport/post",["mymenus" => $mymenu->load('main', 'type', 'mainfood')]);
    }
    
}
