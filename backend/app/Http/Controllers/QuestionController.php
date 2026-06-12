<?php

namespace App\Http\Controllers;


use App\Models\Question;

use Illuminate\Http\Request;



class QuestionController extends Controller
{


public function store(Request $request)
{


return Question::create([


'owner_id'=>auth()->id(),


'title'=>$request->title,


'description'=>$request->description,


'category'=>$request->category


]);


}



public function index()
{

return Question::all();

}



}