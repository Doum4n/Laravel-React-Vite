<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;
use Kreait\Firebase\Auth\UserQuery;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-redis', function () {
    $value = json_encode([1,2,3]);
    $redis = Redis::connection();
    $redis->set('foo', 'bar');
    $redis->set('foo1', $value);
    $redis->set('foo2', 2);
    $name = $redis->get('foo2');
    echo $name;
});


use App\Http\Middleware\CorsMiddleware;

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/test-db/{id}', [PostController::class, 'show']);
    Route::get('/test-firebase', [UserController::class, 'getById']);
    Route::post('/image/upload', [ImageController::class, 'store']);
    Route::get('/image/{id}', [ImageController::class, 'getImage']);
});

