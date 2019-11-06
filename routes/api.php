<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// List order
Route::get('orders','OrderController@index');

// List single order
Route::get('order/{id}','OrderController@show');

// Create new order
Route::post('order','OrderController@store');

// Update order
Route::put('order','OrderController@store');

// Delete order
Route::delete('order/{id}','OrderController@destroy');
