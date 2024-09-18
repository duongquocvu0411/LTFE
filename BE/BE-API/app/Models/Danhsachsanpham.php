<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Danhsachsanpham extends Model
{
    
    use HasFactory;

    protected $table = 'danhsachsanpham';

    protected $fillable = ['name'];

    public function sanphams()
    {
        return $this->hasMany(Sanphams::class);
    }
}