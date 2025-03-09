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
            ")
            ->leftJoin('sensors', 'sensor_id', '=', 'sensors.id')
            ->orderBy('sensor_id')
            ->orderBy('reading_date');

        if ($request->groupBy) {
            $query->groupBy($request->groupBy);
        }

        return $query;

    }

}