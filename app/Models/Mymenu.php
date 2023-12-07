<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mymenu extends Model
{
    use HasFactory;
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function type()
    {
        return $this->belongsTo(Type::class);
    }
    
    public function mainfood()
    {
        return $this->belongsTo(Mainfood::class);
    }
    
    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
    
    public function setmenus()
    {
        return $this->belongsToMany(Setmenu::class);
    }
    
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class)->withPivot('quantity');
    }
    
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    
    protected $fillable = [
        "title",
        "photograph",
        "way_of_making",
        "comment",
        "ingredient",
        "quantity",
    ];


}
