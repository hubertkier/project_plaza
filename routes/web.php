<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TostController;
Route::get('/', function () {
    return view('welcome');
});

Route::get('/locations', [TostController::class, 'index']);
