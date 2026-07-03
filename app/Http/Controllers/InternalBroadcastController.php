<?php

namespace App\Http\Controllers;

use App\Events\SensorReadingReceived;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class InternalBroadcastController extends Controller
{
    /**
     * Receive a sensor reading from the Reverb Forwarder service and
     * broadcast it over WebSocket to connected browser clients.
     *
     * Protected by a shared secret token (X-Internal-Token header)
     * that must match INTERNAL_BROADCAST_TOKEN in .env.
     * This endpoint is NOT publicly exposed — it is called only by the
     * mqtt_to_reverb/forwarder.py service running on the same host/network.
     */
    public function receive(Request $request): JsonResponse
    {
        $expected = env('INTERNAL_BROADCAST_TOKEN');

        if (! $expected || $request->header('X-Internal-Token') !== $expected) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $reading = $request->json()->all();

        if (empty($reading['sensor_id']) || empty($reading['gateway_id'])) {
            return response()->json(['error' => 'Missing required fields'], 422);
        }

        SensorReadingReceived::dispatch($reading);

        return response()->json(['ok' => true]);
    }
}
