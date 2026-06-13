<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    protected $fillable = [
        'user_id',
        'clinic_name',
        'address',
        'phone',
        'status'
    ];
}
