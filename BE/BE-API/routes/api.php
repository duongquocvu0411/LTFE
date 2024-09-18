<?php

use App\Http\Controllers\DanhsachsanphamController;

use App\Http\Controllers\SanphamsController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
   
}); 
//sản phẩm
Route::get('/products', [SanphamsController::class, 'index']);
Route::post('/products', [SanphamsController::class, 'store']);
Route::get('/products/{id}', [SanphamsController::class, 'show']);
Route::put('/products/{id}', [SanphamsController::class, 'update']);
Route::delete('/products/{id}', [SanphamsController::class, 'destroy']);

//danh sách sản phẩm

Route::apiResource('danhsachsanpham', DanhsachsanphamController::class);