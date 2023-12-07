<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mainfood;
use App\Models\Mymenu;

class MainfoodController extends Controller
{
   public function post(Mainfood $mainfood)
    {
        return Inertia::render("Mymenusupport/mainfood",["mainfoods" => $mainfood->load('mymenus')]);
    }
}
