<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AutoMenuSetController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\MainfoodController;
use App\Http\Controllers\MymenuController;
use App\Http\Controllers\SetmenuController;
use App\Http\Controllers\StocklistController;
use App\Http\Controllers\TypeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::group(["middleware" => ["auth"]], function() {

   Route::get("/home", [EventController::class, "show"]);
   
   
   Route::get("/post/{mymenu}", [MymenuController::class, "postindex"]);
   Route::get("/post", [MymenuController::class, "post"]);
   
   Route::get("/create", [MymenuController::class, "create"]);
   
   Route::get('/type/{type}', [TypeController::class,'post']);
   Route::get('/dish/{dish}', [DishController::class,'post']);
   Route::get('/mainfood/{mainfood}', [MainfoodController::class,'post']);
   
   Route::post("/create", [MymenuController::class, "store"]);
   Route::post("/addposts", [IngredientController::class, "addstore"]);
});