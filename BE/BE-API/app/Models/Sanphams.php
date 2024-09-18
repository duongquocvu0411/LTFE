<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sanphams extends Model
{
    use HasFactory;
    
     // Mối quan hệ 1-nhiều với bảng danhsachsanpham
     protected $fillable = ['title', 'description', 'price', 'image', 'danhsachsanpham_id'];

     public function danhsachsanpham()
     {
         return $this->belongsTo(Danhsachsanpham::class);
     }

}