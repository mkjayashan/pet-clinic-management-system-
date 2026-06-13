<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Answer;

class Question extends Model
{
    protected $fillable = [
        'owner_id',
        'title',
        'description',
        'category'
    ];


    public function answers()
{
    return $this->hasMany(Answer::class);
}
}
