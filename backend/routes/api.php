<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClinicController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;

// AUTH
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// PROTECTED
Route::middleware('auth:sanctum')->group(function () {

    // CLINIC
    Route::post('/clinic', [ClinicController::class, 'store']);
    Route::get('/clinics', [ClinicController::class, 'index']);
    Route::put('/approve/{id}', [ClinicController::class, 'approve']);
Route::put('/reject/{id}', [ClinicController::class, 'reject']);
Route::delete('/clinic/{id}', [ClinicController::class, 'destroy']);
    // ADMIN
    Route::put('/approve/{id}', [AdminController::class, 'approve']);
    Route::put('/reject/{id}', [AdminController::class, 'reject']);
    Route::delete('/clinic/{id}', [AdminController::class, 'delete']);

    // QUESTIONS
    Route::post('/question', [QuestionController::class, 'store']);
    Route::get('/questions', [QuestionController::class, 'index']);

    // ANSWERS
    Route::post('/answer', [AnswerController::class, 'store']);
Route::get('/answers', [AnswerController::class, 'index']);

Route::get('/my-questions', [QuestionController::class, 'myQuestions']);

Route::get('/my-clinic', [ClinicController::class, 'myClinic']);

Route::post('/clinic-request', [ClinicController::class, 'store']);
Route::get('/clinics', [ClinicController::class, 'index']);
Route::put('/approve/{id}', [ClinicController::class, 'approve']);
Route::put('/reject/{id}', [ClinicController::class, 'reject']);

Route::get('/my-clinic', [ClinicController::class, 'myClinic']);

Route::get('/questions', [QuestionController::class, 'index']);
Route::post('/answer', [AnswerController::class, 'store']);
});