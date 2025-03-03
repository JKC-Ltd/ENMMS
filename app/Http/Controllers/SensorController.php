<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use App\Models\Location;
use App\Models\Gateway;
use App\Models\SensorRegister;
use App\Models\SensorType;
use App\Models\SensorModel;
use App\Services\SensorOfflineService;
use DB;
use Illuminate\Http\Request;
use Auth;
use Response;

class SensorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sensor = Sensor::all();
        return view('pages.configurations.sensors.index')
            ->with('sensors', $sensor);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $location = Location::all();
        $gateway = Gateway::all();
        $sensorModels = SensorModel::all();

        return view('pages.configurations.sensors.form')
            ->with('locations', $location)
            ->with('gateways', $gateway)
            ->with('sensorModels', $sensorModels);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(self::formRule(), self::errorMessage(), self::changeAttributes());

        DB::enableQueryLog();

        $sensor = new Sensor($request->all());
        $sensor->save();

        (new SensorOfflineService())->store(DB::getQueryLog(), $request->gateway_id);

        return redirect()->route('sensors.index');

    }

    /**
     * Display the specified resource.

     */
    public function show(Sensor $sensor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $sensor = Sensor::find($id);
        $location = Location::all();
        $gateway = Gateway::all();
        $sensorModels = SensorModel::all();
        return view('pages.configurations.sensors.form')
            ->with('sensor', $sensor)
            ->with('locations', $location)
            ->with('gateways', $gateway)
            ->with('sensorModels', $sensorModels);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sensor $sensor)
    {

        $request->validate(self::formRule(), self::errorMessage(), self::changeAttributes());
        DB::enableQueryLog();
        $sensor->update($request->all());

       
        $gateways = Gateway::all();

        foreach ($gateways as $key => $gateway) {
            (new SensorOfflineService())->store(DB::getQueryLog(), $gateway->id);
        }

        return redirect()->route('sensors.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {

        DB::enableQueryLog();

        $id = $request->id;
        $sensor = $sensor = Sensor::findOrFail($id);
        $sensor->save();
        $sensor->delete();

        (new SensorOfflineService())->store(DB::getQueryLog(), $sensor->gateway_id);

        return Response::json($sensor);
    }

    public function formRule()
    {
        return [
            'slave_address' => ['required', 'string', 'min:1', 'max:200'],
            'description' => ['required', 'string', 'min:3', 'max:500'],
            'location_id' => 'required',
            'gateway_id' => 'required',
            'sensor_model_id' => 'required',
            

            
        ];
    }

    public function errorMessage()
    {
        return [
            'slave_address.required' => 'Slave Address is required',
            'description.required' => 'Description is required',
            'location_id.required' => 'Location is required',
            'gateway_id.required' => 'Gateway is required',
            'sensor_model_id.required' => 'Sensor Model is required',
        ];
    }

    public function changeAttributes()
    {
        return [
            'slave_address' => 'Slave Address',
            'description' => 'Description',
            'location_id' => 'Location',
            'gateway_id' => 'Gateway',
            'sensor_model_id' => 'Sensor Model',
        ];
    }
}
