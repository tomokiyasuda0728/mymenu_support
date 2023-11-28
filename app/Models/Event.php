<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    
    public function mymenus()   
    {
        return $this->hasMany(Mymenu::class);  
    }
    
    public function getByMymenu()
    {
        return $this->with('mymenus')->orderBy('updated_at', 'DESC');
    }
    
}
