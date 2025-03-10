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
    $servername = "sql210.infinityfree.com";
    $username = "if0_38478871";
    $password = "W4BbBbAZQsFZR0y";
    $dbname = "if0_38478871_Dashboard";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";
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
