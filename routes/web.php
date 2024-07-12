<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TostController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/locations', [TostController::class, 'index']);
Route::get('/location/{id}', [TostController::class, 'detail']);
Route::post('/location/like', [TostController::class, 'like']);
Route::post('/location/liked', [TostController::class, 'liked']);


Route::get('/auth/profile/{id}', [UserController::class, 'profile']);
Route::post('/auth/login', [UserController::class, 'login']);
Route::post('/auth/register', [UserController::class, 'register']);
Route::post('/auth/validate', [UserController::class, 'validate']);




