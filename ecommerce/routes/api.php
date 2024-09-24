<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/cancelorder/{id}', [OrderController::class, 'cancelorder']);

Route::apiResource('/categories', CategoryController::class);
Route::apiResource('/products', ProductController::class);
Route::get('/categories/{id}/products', [CategoryController::class, 'getproductcategory']);

// ========== auth api
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// /////////////////////////////
Route::group(["middleware"=>"auth:sanctum"],function(){
    Route::get( '/profile', [AuthController::class, 'profile']);
    Route::get( '/logout', [AuthController::class, 'logout']);
    Route::post('/products/cart', [ProductController::class, 'addToCart']);
    Route::get('/cart/count', [ProductController::class, 'getCartcount']);
    Route::get('/cartitems', [ProductController::class, 'getCartitem']);
    Route::delete('/cart/{productId}', [ProductController::class, 'removeFromCart']);
    Route::post('/orders', [OrderController::class, 'placeOrder']);

    Route::get('/myorders', [OrderController::class, 'myorders']);

    Route::get('/allOrders', [OrderController::class, 'getOrders']);
    Route::get('/ViewOrder/{id}', [OrderController::class, 'ViewOrder']);

    Route::post('/updateOrders/{orderId}', [OrderController::class, 'updateOrderStatus']);


});