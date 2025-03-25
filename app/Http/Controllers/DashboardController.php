<?php

namespace App\Http\Controllers;

use App\Models\Gateway;
use App\Models\Sensor;
use App\Models\User;
use App\Services\EnergyConsumptionService;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Response;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gateways = Gateway::all();
        $sensors = Sensor::all();
        $area = Sensor::groupBy('location_id')->get();
        $users = User::all();

        return view('pages.dashboard')
            ->with('gateways', $gateways)
            ->with('sensors', $sensors)
            ->with('area', $area)
            ->with('users', $users);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getDailyEnergyConsumption(Request $request)
    {

        $now = Carbon::now();
        $today9AM = $now->copy()->startOfDay()->addHours(9);
        $tomorrow9AM = $today9AM->copy()->addDay();

        if ($now->greaterThanOrEqualTo($today9AM)) {
            $startDate = Carbon::now()
                ->subDay()
                ->startOfDay()
                ->addHours(9)
                ->toDateTimeString(); // Yesterday's date

            $endDate = $tomorrow9AM->toDateTimeString();
        } else {
            $startDate = Carbon::now()
                ->subDays(2)
                ->startOfDay()
                ->addHours(9)
                ->toDateTimeString(); // Yesterday's date

            $endDate = $today9AM->toDateTimeString();
        }

        $request->startDate = $startDate;
        $request->endDate = $endDate;

        $energyConsumptionService = (new EnergyConsumptionService)->get($request);

        $dailyEnergy = $energyConsumptionService->get();

        return Response::json($dailyEnergy);
    }

    // public function getDailyEnergyConsumptionPerMeter(Request $request)
    // {
    //     $now = Carbon::now();
    //     $today9AM = $now->copy()->startOfDay()->addHours(9);
    //     $tomorrow9AM = $today9AM->copy()->addDay();

    //     if ($now->greaterThanOrEqualTo($today9AM)) {
    //         $startDate = $today9AM->toDateTimeString();
    //         $endDate = $tomorrow9AM->toDateTimeString();
    //     } else {
    //         $endDate = $today9AM->toDateTimeString();
    //         $startDate = $today9AM->subDay()->toDateTimeString();
    //     }

    //     $energyConsumptionService = (new EnergyConsumptionService)->get($request, $startDate, $endDate);

    //     $dailyEnergy = $energyConsumptionService->get();

    //     return Response::json($dailyEnergy);
    // }

    public function getEnergyConsumption(Request $request)
    {

        $energyConsumptionService = (new EnergyConsumptionService)->get($request);

        $dailyEnergy = $energyConsumptionService->get();

        return Response::json($dailyEnergy);
    }

    public function getPower(Request $request)
    {

        $energyConsumptionService = (new EnergyConsumptionService)->getPower($request);

        $dailyEnergy = $energyConsumptionService->get();

        return Response::json($dailyEnergy);
    }
}
