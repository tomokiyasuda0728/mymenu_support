<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class mainfood extends Model
{
    use HasFactory;
    
        public function mainfoods()   
    {
        return $this->hasMany(Mainfood::class);  
    }
}
