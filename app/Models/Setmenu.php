<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setmenu extends Model
{
    use HasFactory;
    
    public function mymenus()
    {
        return $this->belongsToMany(Mymenu::class);
    }
    
     public function user()
    {
        return $this->belongsTo(User::class);
    }
}
