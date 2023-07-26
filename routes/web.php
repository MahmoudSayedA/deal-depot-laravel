<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\User\DealController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin
Route::get('/admin', [AdminController::class, 'index'])->middleware('auth', 'admin')->name('admin');

Route::middleware('auth', 'admin')->name('admin.')->group(function () {
    Route::resource('/admin/categories', CategoryController::class);
});

// User
Route::middleware('auth', 'verified')->group(function () {
    Route::get('/ratings', [RatingController::class, 'index'])->name('rating.index');
    Route::post('/ratings', [RatingController::class, 'store'])->name('rating.store');
    Route::resource('/products', ProductController::class)->except('index');
    Route::prefix('/products/{product_id}')->group(function () {
        Route::resource('/deals', DealController::class);
    });
});

// non auth
Route::get('/products', [ProductController::class, 'index'])->name('product.index');



require __DIR__ . '/auth.php';
