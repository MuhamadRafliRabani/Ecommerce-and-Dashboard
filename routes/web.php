<?php

use App\Http\Controllers\BrandsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('ecommerce/Index');
});


Route::get('/test/env', function () {
    dd(env('DB_DATABASE')); // Dump 'db' variable value one by one
});

Route::middleware(['auth', AdminMiddleware::class])->group(function () {

    Route::get('/dashboard', function () {

        $categories = Category::with('product')->get();
        $orders = Order::with(['user', 'product'])->paginate(10);

        return Inertia::render('dashboard/Index', ['categories' => $categories, 'orders' => $orders]);
    })->name('dashboard');

    Route::resource('products', ProductController::class);
    Route::put('/products/${product}', [ProductController::class, 'update']);
    Route::patch('/products/${product}', [ProductController::class, 'update']);

    Route::resource('categories', CategoryController::class);

    Route::resource('brands', BrandsController::class);

    Route::resource('orders', OrdersController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
