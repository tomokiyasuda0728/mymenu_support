<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class main extends Model
{
    use HasFactory;
        public function mains()   
    {
        return $this->hasMany(Main::class);  
    }
}
