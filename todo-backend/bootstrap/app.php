<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        
        // 1. CSRF Token Exclusions (Fixes 419 error on Login/Register)
        $middleware->validateCsrfTokens(except: [
            'register',
            'login',
        ]);

       
        
        // **IMPORTANT: Do NOT add handleCors() here. CORS is configured separately.**
        // $middleware->append(HandleCors::class, [
        //     'paths' => ['*'], // Apply to all paths
        //     'allowed_methods' => ['*'],
        //     'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
        //     'allowed_headers' => ['*'],
        //     'supports_credentials' => true,
        // ]);


    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();