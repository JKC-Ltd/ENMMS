<?php

namespace App\Services;

use App\Models\SensorOffline;
use DB;

class EnergyConsumptionService
{

    public function get($request, $startDate, $endDate)
    {

        $sensor_logs = DB::table('sensor_logs')
            ->selectRaw("
                sensor_id,
                DATE(datetime_created - INTERVAL 9 HOUR) AS reading_date,
                MIN(energy) AS start_energy,
                MAX(energy) AS end_energy,
                datetime_created
            ")

            // This should be dynamic based on the request parameters.
            ->where("datetime_created", ">=", $startDate)
            ->where("datetime_created", "<=", $endDate)

            ->groupBy('sensor_id', 'reading_date');

        $query = DB::table(DB::raw("({$sensor_logs->toSql()}) as daily_energy"))
            ->mergeBindings($sensor_logs)
            ->selectRaw("
                {$request->select}
            ");

        $query->leftJoin('sensors', 'sensor_id', '=', 'sensors.id')
            ->orderBy('sensor_id')
            ->orderBy('reading_date');

        if ($request->groupBy) {
            $query->groupBy($request->groupBy);
        }

        return $query;

    }

    public function getPower($request, $startDate, $endDate)
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
            ")

            // This should be dynamic based on the request parameters.
            ->where("datetime_created", ">=", $startDate)
            ->where("datetime_created", "<=", $endDate);


        $query = DB::table(DB::raw("({$sensor_logs->toSql()}) as daily_energy"))
            ->mergeBindings($sensor_logs)
            ->selectRaw("
                {$request->select}
            ");

        if ($request->where) {
            $query->where($request->where['field'], $request->where['operator'], $request->where['value']);
        }

        $query->leftJoin('sensors', 'sensor_id', '=', 'sensors.id')
            ->orderBy('sensor_id');

        if ($request->groupBy) {
            $query->groupBy($request->groupBy);
        }

        return $query;

    }

}