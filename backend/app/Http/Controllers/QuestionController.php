<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function store(Request $request)
    {
        return Question::create([
            'owner_id' => auth()->id(), // ⚠️ THIS CAUSES 500 IF USER NOT LOGGED IN
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category
        ]);
    }

    public function index()
    {
        return Question::all();
    }

    public function myQuestions()
{
    return Question::with('answers')
        ->where('owner_id', auth()->id())
        ->get();
}
}