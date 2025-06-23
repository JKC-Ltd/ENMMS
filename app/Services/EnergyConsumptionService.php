<?php

namespace App\Services;

use App\Models\SensorOffline;
use DB;

class EnergyConsumptionService
{

    public function get($request)
    {
        $sensor_logs = DB::table('sensor_logs')
            ->selectRaw("
                sensor_id,
                DATE(datetime_created - INTERVAL 7 HOUR) AS reading_date,
                MIN(energy) AS start_energy,
                MAX(energy) AS end_energy,
                real_power,
                datetime_created
            ");

        if ($request->startDate && $request->endDate) {
            // This should be dynamic based on the request parameters.
            $sensor_logs->where("datetime_created", ">=", $request->startDate)
                ->where("datetime_created", "<=", $request->endDate);
        }


        $sensor_logs->groupBy('sensor_id', 'reading_date');

        $query = DB::table(DB::raw("({$sensor_logs->toSql()}) as daily_energy"))
            ->mergeBindings($sensor_logs)
            ->selectRaw("
                {$request->select}
            ");

        $query->leftJoin('sensors', 'sensor_id', '=', 'sensors.id')
            ->leftJoin('locations', 'location_id', '=', 'locations.id')
            ->orderBy('sensor_id')
            ->orderBy('reading_date');

        if ($request->where) {
            foreach ($request->where as $where) {
                $query->where($where['field'], $where['operator'], $where['value']);
            }
        }

        if ($request->groupBy) {
            $query->groupBy($request->groupBy);
        }

        // dd($query->toRawSql());

        return $query;

    }

    public function getPower($request)
    {

        $sensor_logs = DB::table('sensor_logs')
            ->selectRaw("
                sensor_id,
                DATE_FORMAT(datetime_created, '%Y-%m-%d %H:%i') AS datetime_created,
                voltage_ab,
                voltage_bc,
                voltage_ca,
                current_a,
                current_b,
                current_c,
                real_power,
                apparent_power
            ");

        if ($request->startDate && $request->endDate) {
            // This should be dynamic based on the request parameters.
            $sensor_logs->where("datetime_created", ">=", $request->startDate)
                ->where("datetime_created", "<=", $request->endDate);
        }

        $query = DB::table(DB::raw("({$sensor_logs->toSql()}) as daily_energy"))
            ->mergeBindings($sensor_logs)
            ->selectRaw("
                {$request->select}
            ");

        if ($request->where) {
            $query->where($request->where['field'], $request->where['operator'], $request->where['value']);
        }

        $query->leftJoin('sensors', 'sensor_id', '=', 'sensors.id')
            ->leftJoin('sensor_models', 'sensor_model_id', '=', 'sensor_models.id')
            ->orderBy('sensor_id')
            ->orderBy('datetime_created');

        if ($request->groupBy) {
            $query->groupBy($request->groupBy);
        }

        return $query;

    }

}