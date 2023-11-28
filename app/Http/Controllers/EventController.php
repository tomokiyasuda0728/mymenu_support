<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function show(Event $event)
    {
       return Inertia::render("Mymenusupport/home",["events" => $event->get()]);
    }
}
