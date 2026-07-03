<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Inserts the minimum rows required for local development testing.
 *
 * Satisfies every FK constraint so the DB Writer service can insert
 * into sensor_logs without constraint errors.
 *
 * Run:  php artisan db:seed --class=LocalTestSeeder
 * Reset: php artisan migrate:fresh --seed (add LocalTestSeeder to DatabaseSeeder first)
 */
class LocalTestSeeder extends Seeder
{
    public function run(): void
    {
        // ── 1. Location ───────────────────────────────────────────────────────
        DB::table('locations')->insertOrIgnore([
            'id'            => 1,
            'location_code' => 'LOC-01',
            'location_name' => 'Main Building (Test)',
        ]);

        // ── 2. Sensor Type ────────────────────────────────────────────────────
        DB::table('sensor_types')->insertOrIgnore([
            'id'                   => 1,
            'description'          => 'Energy Meter (Test)',
            'sensor_type_code'     => 'EM-TEST',
            'sensor_type_parameter'=> 'energy,voltage_ab,voltage_bc,voltage_ca,current_a,current_b,current_c,real_power,apparent_power',
        ]);

        // ── 3. Sensor Model ───────────────────────────────────────────────────
        DB::table('sensor_models')->insertOrIgnore([
            'id'               => 1,
            'sensor_model'     => 'GENERIC-TEST',
            'sensor_brand'     => 'Test Brand',
            'sensor_type_id'   => 1,
            'sensor_reg_address' => '0,2,4,6,8,10,12,14,16',
        ]);

        // ── 4. Gateway (id must match gateway_config.py gateway_id = 2) ──────
        DB::table('gateways')->insertOrIgnore([
            'id'           => 2,
            'location_id'  => 1,
            'customer_code'=> 'SIIX',
            'gateway_code' => 'GAT-02',
            'description'  => 'Gateway 2 (Test)',
        ]);

        // ── 5. Sensors (ids must match test_simulator.py SIMULATED_SENSORS) ──
        $sensors = [
            ['id' => 15, 'slave_address' => '15', 'description' => 'Meter 15 (Test)'],
            ['id' => 16, 'slave_address' => '16', 'description' => 'Meter 16 (Test)'],
            ['id' => 17, 'slave_address' => '17', 'description' => 'Meter 17 (Test)'],
            ['id' => 18, 'slave_address' => '18', 'description' => 'Meter 18 (Test)'],
            ['id' => 19, 'slave_address' => '19', 'description' => 'Meter 19 (Test)'],
        ];

        foreach ($sensors as $sensor) {
            DB::table('sensors')->insertOrIgnore([
                'id'              => $sensor['id'],
                'slave_address'   => $sensor['slave_address'],
                'description'     => $sensor['description'],
                'location_id'     => 1,
                'gateway_id'      => 2,
                'sensor_model_id' => 1,
            ]);
        }

        $this->command->info('Local test seed data inserted (location, gateway 2, sensors 15-19).');
    }
}
