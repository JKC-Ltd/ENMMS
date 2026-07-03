<?php

use App\Http\Controllers\InternalBroadcastController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Routes here use the 'api' middleware group (stateless, no CSRF).
| The internal broadcast endpoint is protected by a shared secret token
| checked inside InternalBroadcastController.
|
*/

Route::post('/internal/sensor-reading', [InternalBroadcastController::class, 'receive']);
