<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sensor extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'slave_address',
        'description',
        'location_id',
        'gateway_id',
        'sensor_register_id',
    ];

    public function location() 
    {
        return $this->belongsTo(Location::class);
    }

    public function gateway() 
    {
        return $this->belongsTo(Gateway::class);
    }

    public function sensorRegister() 
    {
        return $this->belongsTo(SensorRegister::class);
    }


}
