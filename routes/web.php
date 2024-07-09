<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TostController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/locations', [TostController::class, 'index']);
Route::post('/auth/login', [UserController::class, 'login']);
Route::post('/auth/register', [UserController::class, 'register']);

