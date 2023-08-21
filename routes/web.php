<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\User\RatingController;
use App\Http\Controllers\User\DealController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\User\UserController;
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
Route::middleware('auth', 'verified', 'admin')->name('admin.')->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::resource('categories', CategoryController::class);
    Route::resource('/transactions', TransactionController::class)->except('index');
    Route::get('/transactions', [TransactionController::class, 'adminIndex'])->name('transactions.index');
});

// User
Route::middleware('auth', 'verified')->group(function () {
    Route::get('/ratings', [RatingController::class, 'index'])->name('ratings.index');
    Route::post('/ratings', [RatingController::class, 'store'])->name('ratings.store');
    Route::resource('/products', ProductController::class);
    Route::resource('/transactions', TransactionController::class)->only('index', 'show');
    // deals and transactions routes
    Route::prefix('/products/{product_id}')->group(function () {
        Route::resource('/deals', DealController::class)->except('index', 'show');
        Route::prefix('/deals/{deal_id}')->group(function () {
            Route::resource('transactions', TransactionController::class)->only('create', 'store');
        });
    });
});

// none auth
Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
Route::resource('categories', CategoryController::class)->only('index', 'show');
Route::prefix('/products/{product_id}')->group(function () {
    Route::resource('/deals', DealController::class)->only('index', 'show');
});

require __DIR__ . '/auth.php';
