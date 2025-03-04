<?php

use App\Http\Controllers\ActivePowerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationDashboardController;
use App\Http\Controllers\EnergyConsumptionController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\GatewayController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SensorModelController;
use App\Http\Controllers\SensorTypeController;
use App\Http\Controllers\SensorController;
use App\Http\Controllers\SensorRegisterController;
use App\Http\Controllers\VoltageCurrentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])->name('dashboard');
    
Route::get('/profile', [UserController::class, 'profile'])->name('profile');

Route::middleware(['auth', 'admin:Admin'])->group(function () {

    Route::resource('energyConsumption', EnergyConsumptionController::class);
    Route::resource('locationDashboard', LocationDashboardController::class);
    Route::resource('activePower', ActivePowerController::class);
    Route::resource('voltageCurrent', VoltageCurrentController::class);
    Route::resource('locations', LocationController::class);
    Route::resource('sensorModels', SensorModelController::class);
    Route::resource('sensorTypes', SensorTypeController::class);
    Route::resource('sensorRegisters', SensorRegisterController::class);
    Route::resource('sensors', SensorController::class);
    Route::resource('gateways', GatewayController::class);
    Route::resource('users', UserController::class);
    
    
    Route::get('/getSensorType/{id}', [SensorModelController::class, 'getSensorType']);
    Route::get('/getSensorModel/{id}', [SensorModelController::class, 'getSensorModel']);
    Route::get('/getEnergyConsumption', [EnergyConsumptionController::class, 'getEnergyConsumption']);
    Route::get('/getEnergyConsumptionBasedOnDate', [DashboardController::class, 'getEnergyConsumptionBasedOnDate']);
    Route::get('/getEnergyConsumptionBasedOnHours', [DashboardController::class, 'getEnergyConsumptionBasedOnHours']);
    Route::get('/getActivePowerProfile', [ActivePowerController::class, 'getActivePowerProfile']);
    Route::get('/getVoltageCurrentProfile', [VoltageCurrentController::class, 'getVoltageCurrentProfile']);
    Route::get('/getLocationChart', [LocationController::class, 'getLocationChart']);
    Route::get('/getSensorChart', [SensorController::class, 'getSensorChart']);
    Route::get('/getSensor', [LocationDashboardController::class, 'getSensor']);

    // Route::get('/locations', function () {
    //     return view('pages/configurations.locations.index');
    // });
    // Route::get('/locations/create', function () {
    //     return view('pages/configurations.locations.create');
    // });
    // Route::get('/gateways', function () {
    //     return view('pages/configurations.gateways.index');
    // });

    // Route::get('/gateways/create', function () {
    //     return view('pages/configurations.gateways.create');
    // });
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



// Route::get('/profile', [UserController::class, 'profile']);

Route::middleware(['auth'])->group(function () {
    Route::resource('locationDashboard', LocationDashboardController::class);
    Route::resource('energyConsumption', EnergyConsumptionController::class);
    Route::resource('activePower', ActivePowerController::class);
    Route::resource('voltageCurrent', VoltageCurrentController::class);
});
require __DIR__ . '/auth.php';
