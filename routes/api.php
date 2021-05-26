<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CouponsController;
use App\Http\Controllers\ShopBooksController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middlewareGroups' => ['web']], function () {
   Route::post('submitorder',[OrderController::class,'submitorder']);
    Route::post('register',[AuthController::class,'register']);
    Route::post('login',[AuthController::class,'login']);
    Route::post('logout',[AuthController::class,'logout']);
    Route::get('books',[ShopBooksController::class,'index']);
    Route::get('books/{id}',[ShopBooksController::class,'show']);
    Route::get('addtocart/{id}',[ShopBooksController::class,'getAddToCart']);
    Route::get('getcart',[ShopBooksController::class,'getCart']);
    Route::get('removefromcart/{id}',[ShopBooksController::class,'getRemoveFromCart']);
    Route::get('removeallitems',[ShopBooksController::class,'removeAllItems']);
    Route::get('removeitem/{id}',[ShopBooksController::class,'removeItem']);
    Route::post('coupon',[CouponsController::class,'store']);
    Route::delete('coupon',[CouponsController::class,'destroy']);
    Route::get('checkout');

    Route::get('/adminbooks',[BooksController::class,'index']);
    Route::post('/admincreatebooks',[BooksController::class,'create']);
 });
 Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('logout',[AuthController::class,'logout']);
 });

 