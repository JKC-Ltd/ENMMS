<x-app-layout>
    <x-slot name="importedLinks">
        @include('includes.datatables-links')
        <link rel="stylesheet" href="{{ asset('plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css') }}">
    </x-slot>
    <x-slot name="pageTitle">
        Sensor Models
    </x-slot>
    <x-slot name="content">
        <div class="row">
            <div class="col-12">
                <div class="card card-primary card-outline">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <div class="left w-50">
                            <h3 class="card-title">Sensor Models</h3>
                        </div>
                        <div class="right w-50 text-right">
                            <a href="{{ route('sensorModels.create') }}">
                                <button class="btn btn-primary"><i class="fa fa-plus-square" aria-hidden="true"></i>
                                    &nbsp;Create New Sensor Models</button>
                            </a>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">
                        <table id="defaultTable" class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Sensor Model</th>
                                    <th>Sensor Brand</th>
                                    <th>Sensor Type</th>
                                    <th>Sensor Reg Address</th>
                                    <th>Last Update</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($sensor_models as $sensor_model)
                                    <tr>
                                        <td>{{ $sensor_model->id }}</td>
                                        <td>{{ $sensor_model->sensor_model }}</td>
                                        <td>{{ $sensor_model->sensor_brand }}</td>
                                        <td>{{ $sensor_model->sensorType->description }}</td>
                                        <td>{{ $sensor_model->sensor_reg_address }}</td>
                                        <td>{{ $sensor_model->updated_at }}</td>
                                        <td>
                                            <div class="btn-group">
                                                <a href="{{ route('sensorModels.edit', $sensor_model) }}">
                                                    <button class="btn btn-primary btn-sm">
                                                        <i class="fa fa-pen"></i> Edit
                                                    </button>
                                                </a>
                                                <button type="button" class="btn btn-danger btn-sm delete-data-info"
                                                    data-name="{{ $sensor_model->sensor_model }}"
                                                    data-id="{{ $sensor_model->id }}" data-url="sensorModels/destroy">
                                                    <i class="fa fa-trash"></i> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </x-slot>
    <x-slot name="importedScripts">
        @include('includes.datatables-scripts')
        <script src="{{ asset('assets/js/datatables.js') }}"></script>
        <script src="{{ asset('assets/js/sweetalert2.all.min.js') }}"></script>
        <script src="{{ asset('./assets/js/sweetalert-delete.js') }}"></script>
        <script>
            $(function() {
                var Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });

                @if (session('success'))
                    Toast.fire({
                        icon: 'success',
                        title: '{{ session('success') }}'
                    });
                @endif
            });
        </script>
    </x-slot>
</x-app-layout>
