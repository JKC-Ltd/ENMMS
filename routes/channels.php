<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| sensor.{sensorId}   — subscribed by per-sensor dashboards
| gateway.{gatewayId} — subscribed by the main dashboard (all sensors)
|
| Authorization:
|   Admin users (UserType name = 'Admin') have full access.
|   Any other authenticated user can subscribe to any channel.
|   Restrict per-user access here when the data model gains
|   explicit sensor/gateway assignment tables.
|
*/

Broadcast::channel('sensor.{sensorId}', function ($user, $sensorId) {
    return $user !== null;
});

Broadcast::channel('gateway.{gatewayId}', function ($user, $gatewayId) {
    return $user !== null;
});
