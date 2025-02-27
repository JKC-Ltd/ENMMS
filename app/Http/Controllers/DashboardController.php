<?php

namespace App\Http\Controllers;

use App\Models\Gateway;
use App\Models\Sensor;
use App\Models\User;
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
        $users = User::all();

        return view('pages.dashboard')
            ->with('gateways', $gateways)
            ->with('sensors', $sensors)
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

    public function getEnergyConsumptionBasedOnDate(Request $request)
    {

        $query = Sensor::with(['location', 'gateway'])
            ->select(
                'sensors.*',
                'locations.location_name as location_name',
                'gateways.gateway_code',
                'sensor_logs.energy',
                'sensor_logs.datetime_created',
                DB::raw("ROUND(sensor_logs.energy - LAG(sensor_logs.energy) OVER(
                    PARTITION BY sensors.id 
                    ORDER BY sensor_logs.datetime_created
                ), 2) AS energy_difference"),
                DB::raw('DATE(sensor_logs.datetime_created) AS date_created')
            )
            ->leftJoin('locations', 'locations.id', '=', 'sensors.location_id')
            ->leftJoin('gateways', 'gateways.id', '=', 'sensors.gateway_id')
            ->leftJoin('sensor_logs', 'sensor_logs.sensor_id', '=', 'sensors.id')
            // ->whereRaw('HOUR(sensor_logs.datetime_created) = 9'); // Get the date on the 9th hour of the day
            ->where('sensor_logs.datetime_created', '>=', Carbon::now()->subDays($request->days));

        if ($request->sensor_id) {
            $query->where('sensors.id', $request->sensor_id);
        }

        $energyConsumption = $query->groupBy('sensors.description', 'date_created')
            ->orderBy('sensors.id')
            ->orderBy('sensor_logs.datetime_created')
            ->get();

        return Response::json($energyConsumption);
    }

    public function getEnergyConsumptionBasedOnHours(Request $request)
    {

        $query = Sensor::select(
            'sensor_logs.datetime_created',
            DB::raw("ROUND(sensor_logs.energy - LAG(sensor_logs.energy) OVER(
                    PARTITION BY sensors.id 
                    ORDER BY sensor_logs.datetime_created
                ), 2) AS energy_difference"),
            DB::raw('HOUR(sensor_logs.datetime_created) AS date_hours')
        )
            ->leftJoin('locations', 'locations.id', '=', 'sensors.location_id')
            ->leftJoin('gateways', 'gateways.id', '=', 'sensors.gateway_id')
            ->leftJoin('sensor_logs', 'sensor_logs.sensor_id', '=', 'sensors.id')
            // ->whereRaw('HOUR(sensor_logs.datetime_created) = 9'); // Get the date on the 9th hour of the day
            ->where('sensor_logs.datetime_created', '>=', Carbon::now()->subHours(363));

        if ($request->sensor_id) {
            $query->where('sensors.id', $request->sensor_id);
        }

        $energyConsumption = $query->groupBy('date_hours')
            ->orderBy('sensors.id')
            ->orderBy('sensor_logs.datetime_created')
            ->get();

        return Response::json($energyConsumption);
    }
}
