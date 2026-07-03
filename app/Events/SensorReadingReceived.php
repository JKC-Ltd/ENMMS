<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SensorReadingReceived implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public readonly array $reading) {}

    /**
     * Broadcast on two channels:
     *   - sensor.{id}    → per-sensor dashboards (LocationDashboardController)
     *   - gateway.{id}   → main dashboard (aggregates all sensors on a gateway)
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('sensor.' . $this->reading['sensor_id']),
            new PrivateChannel('gateway.' . $this->reading['gateway_id']),
        ];
    }

    public function broadcastWith(): array
    {
        return $this->reading;
    }

    /**
     * Use a short event name so the JS listener matches:
     *   .listen('.SensorReadingReceived', callback)
     */
    public function broadcastAs(): string
    {
        return 'SensorReadingReceived';
    }
}
