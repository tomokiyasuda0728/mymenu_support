<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mainfood extends Model
{
    use HasFactory;
    
        public function mymenus()   
    {
        return $this->hasMany(Mymenu::class);  
    }
    
         public function getByMainfood(int $limit_count = 5)
    {
         return $this->mymenus()->with('mainfood')->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
}
