<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get("/tasks", [TaskController::class, 'index']);
    Route::post("/tasks", [TaskController::class, 'store']);
    Route::put("/tasks/{task}", [TaskController::class, 'update']);
    Route::delete("/tasks/{task}", [TaskController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

