<x-app-layout>
    <x-slot name="pageTitle">
        {{ isset($sensor) ? 'Edit ' : 'Create ' }} Sensors 
    </x-slot>
    <x-slot name="content">
        <div class="row">
            <div class="col-12">
                <div class="card card-primary card-outline">
                    <form
                        action="{{ isset($sensor) ? route('sensors.update', $sensor->id) : route('sensors.store') }}"
                        method="POST">  
                        {{-- action="{{ isset($sensor) ? route('gateways.update', $sensor->id) : route('gateways.store') }}"
                        method="POST"> --}}
                        @csrf
                        @if (isset($sensor))
                            @method('PUT')
                        @endif
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="slave_address">Slave Address</label>
                                        <input type="text" name="slave_address" class="form-control @error('slave_address') input-error @enderror"
                                            id="slave_address" placeholder="Slave Address"
                                            value="{{ isset($sensor) ? $sensor->slave_address : '' }}">

                                        <label>Location</label>
                                        <select
                                            class="form-control select2bs4 @error('location_id') input-error @enderror"
                                            name="location_id" style="width: 100%;">
                                            <option value="">SELECT LOCATION</option>
                                            @foreach ($locations as $location)
                                                <option value="{{ $location->id }}"
                                                    {{ isset($sensor) && $sensor->location_id  == $location->id ? 'selected' : ''  }}>
                                                    {{ $location->location_name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('location_id')
                                            <div class="error-message">{{ $message }}</div>
                                        @enderror

                                        <label>Gateway</label>
                                        <select
                                            class="form-control select2bs4 @error('gateway_id') input-error @enderror"
                                            name="gateway_id" style="width: 100%;">
                                            <option value="">SELECT GATEWAY</option>
                                            @foreach ($gateways as $gateway)
                                                <option value="{{ $gateway->id }}"
                                                    {{ isset($sensor) && $sensor->gateway_id == $gateway->id ? 'selected' : ''  }}>
                                                    {{ $gateway->gateway_code }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('gateway_id')
                                            <div class="error-message">{{ $message }}</div>
                                        @enderror

                                        <label>Sensor Register</label>
                                        <select
                                            class="form-control select2bs4 @error('sensor_register_id ') input-error @enderror"
                                            name="sensor_register_id" style="width: 100%;">
                                            <option value="">SELECT SENSOR REGISTER</option>
                                            @foreach ($sensorRegisters as $sensorRegister)
                                                <option value="{{ $sensorRegister->id }}"
                                                    {{ isset($sensor) && $sensor->sensor_register_id  == $sensorRegister->id ? 'selected' : '' }}>
                                                    {{ $sensorRegister->sensor_reg_address }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('sensor_register_id')
                                            <div class="error-message">{{ $message }}</div>
                                        @enderror

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="description">Description</label>
                                        <textarea class="form-control @error('description') input-error @enderror" name="description" id="description" placeholder="Description">{{ isset($sensor) ? $sensor->description : '' }}</textarea>
                                        @error('description')
                                            <div class="error-message">{{ $message }}</div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-center">
                            <a href="{{ route('sensors.index') }}">
                                <button type="button" class="btn btn-danger">Cancel</button>
                            </a>
                            <button type="submit"
                                class="btn btn-primary">{{ isset($sensor) ? 'Update' : 'Create' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </x-slot>
    <x-slot name="importedScripts">
        <script>
            $(document).ready(function() {
                $('.select2bs4').select2({
                    theme: 'bootstrap4'
                })
                @if ($errors->has('location_id'))
                    $('.select2bs4').next('.select2').addClass('input-error');
                @endif
            });
        </script>
    </x-slot>
</x-app-layout>
