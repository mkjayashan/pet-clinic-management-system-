<?php

namespace App\Http\Controllers;


use App\Models\Answer;

use Illuminate\Http\Request;



class AnswerController extends Controller
{


public function store(Request $request)
{


return Answer::create([


'question_id'=>$request->question_id,


'clinic_id'=>auth()->id(),


'answer'=>$request->answer


]);


}


}