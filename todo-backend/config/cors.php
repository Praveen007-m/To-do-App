<?php

return [

    'paths' => ['api/*', '/login', '/register', 'sanctum/csrf-cookie', 'tasks', 'tasks/*', 'user'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173', // <-- Add this for production safety
        'http://127.0.0.1:5173',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
