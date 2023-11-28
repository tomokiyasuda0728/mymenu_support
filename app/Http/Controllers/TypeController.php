<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Type;

class TypeController extends Controller
{
  public function post(Type $type)
    {
        return Inertia::render("Mymenusupport/type",["mymenus" => $type]);
    }
}
