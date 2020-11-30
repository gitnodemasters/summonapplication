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

// Route::get('/email-verify/{token}', 'VerifyController@verifyEmail')->name('verify');
// Route::get('/verify/resend', 'Auth\VerificationController@resendVerify')->name('resend');

Route::get('/{any}', 'ApplicationController')->where('any', '.*');
