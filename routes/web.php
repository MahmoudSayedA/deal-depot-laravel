<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\RatingController;
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin', [AdminController::class, 'index'])->middleware('auth', 'admin')->name('admin');

Route::middleware('auth', 'admin')->name('admin.')->group(function () {
    Route::resource('/admin/categories', CategoryController::class);
});

Route::resource('/products', ProductController::class)->middleware('auth', 'verified');
Route::get('/ratings', [RatingController::class, 'index'])->middleware('auth')->name('rating.index');
Route::post('/ratings', [RatingController::class, 'store'])->middleware('auth')->name('rating.store');

Route::get('/t', [VController::class, 'view']);
require __DIR__ . '/auth.php';
