<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    use HasFactory;
    
    public function mymenus()   
    {
        return $this->hasMany(Mymenu::class);  
    }
    
        public function getByType(int $limit_count = 5)
    {
         return $this->mymenus()->with('type')->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
}
