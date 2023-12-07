<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Type;
use App\Models\Mymenu;

class TypeController extends Controller
{
  public function post(Type $type)
    {
        return Inertia::render("Mymenusupport/type",["types" => $type->load('mymenus')]);
    }
}
