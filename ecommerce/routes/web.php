<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
// routes/web.php
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('auth/google', [GoogleAuthController::class, 'redirectToGoogle'])->name('google.login');
Route::post('auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);