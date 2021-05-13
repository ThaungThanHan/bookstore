<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

Route::view('/','app');

Route::get('/{route}/',function(){           // this way you can use react-router. For routes.
    return view('app');
});
Route::get('/{route}/{id}',function(){           // this way you can use react-router. For routes.
    return view('app');
});
// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
