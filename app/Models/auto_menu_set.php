<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class auto_menu_set extends Model
{
    use HasFactory;
    
         public function user()   
    {
        return $this->belongsTo(User::class);  
    }
}
