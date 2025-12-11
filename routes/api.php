<?php

use App\Http\Controllers\Frontend\WelcomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', WelcomeController::class);

Route::post('/dashboard/posts/creates', \App\Http\Controllers\Frontend\PostCreateController::class)
    ->name('posts.create')
    ->middleware(['auth:sanctum']);

Route::get('/posts/{post:id}', \App\Http\Controllers\Frontend\PostShowController::class)
    ->name('posts.show')
    ->middleware(['auth:sanctum']);

Route::apiResource('dashboard/posts', \App\Http\Controllers\PostController::class)
    ->middleware(['auth:sanctum'])
    ->except(['create','edit']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/users' , function () {
    return \App\Models\User::all();
});

Route::get('/403' , function (Request $request) {
    return response()->json('unauthorised', 403);
} );

