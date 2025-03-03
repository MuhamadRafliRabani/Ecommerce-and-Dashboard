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
})->name('ecommerce');


Route::middleware(['auth', AdminMiddleware::class])->group(function () {

    Route::get('/dashboard', function () {

        $categories = Category::with('product')->get();
        $orders = Order::paginate(2);

        return Inertia::render('dashboard/Index', ['categories' => $categories, 'orders' => $orders]);
    })->name('dashboard');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('brands', BrandsController::class);
    Route::resource('orders', OrdersController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
