<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
class Answer extends Model
{
    protected $fillable = [
        'question_id',
        'clinic_id',
        'answer'
    ];

    public function question()
{
    return $this->belongsTo(Question::class);
}
}
