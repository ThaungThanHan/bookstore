<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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
    Route::get('books',[ShopBooksController::class,'index']);
    Route::get('books/{id}',[ShopBooksController::class,'show']);
    Route::get('addtocart/{id}',[ShopBooksController::class,'getAddToCart']);
    Route::get('getcart',[ShopBooksController::class,'getCart']);
    Route::get('removefromcart/{id}',[ShopBooksController::class,'getRemoveFromCart']);
    Route::get('removeallitems',[ShopBooksController::class,'removeAllItems']);
    Route::get('removeitem/{id}',[ShopBooksController::class,'removeItem']);
    Route::post('coupon',[CouponsController::class,'store']);
    Route::delete('coupon',[CouponsController::class,'destroy']);

 });

 