<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    
    public function mymenus()
    {
        return $this->belongsToMany(Mymenu::class)->withPivot('quantity');
    }
}
