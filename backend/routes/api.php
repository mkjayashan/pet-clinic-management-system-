<?php


use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AuthController;

use App\Http\Controllers\ClinicController;

use App\Http\Controllers\AdminController;

use App\Http\Controllers\QuestionController;

use App\Http\Controllers\AnswerController;



Route::post('/register',
[AuthController::class,'register']);



Route::post('/login',
[AuthController::class,'login']);





Route::middleware('auth:sanctum')->group(function(){



Route::post('/clinic',
[ClinicController::class,'store']);



Route::get('/clinics',
[ClinicController::class,'index']);



Route::post('/question',
[QuestionController::class,'store']);



Route::get('/questions',
[QuestionController::class,'index']);



Route::post('/answer',
[AnswerController::class,'store']);



Route::put('/approve/{id}',
[AdminController::class,'approve']);



});
