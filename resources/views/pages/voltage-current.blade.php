<x-app-layout>
    <x-slot name="pageTitle">
        Dashboard
    </x-slot>
    <x-slot name="content">

        <div class="row">
            <div class="col-12">
                <div class="card card-primary card-tabs">
                    <div class="card-header p-0 pt-1">
                        <ul class="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                            @foreach ($sensors as $key => $sensor)
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-{{ $sensor->id }}-overlay-tab"
                                        data-toggle="pill" href="#custom-tabs-{{ $sensor->id }}-overlay"
                                        role="tab" aria-controls="custom-tabs-{{ $sensor->id }}-overlay"
                                        aria-selected="true" data-id="volrageCurrentProfile{{ $sensor->id }}"
                                        data-key="{{ $sensor->id }}">{{ $sensor->description }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="custom-tabs-five-tabContent">
                            @foreach ($sensors as $key => $sensor)
                                <div class="tab-pane fade {{ $key === 0 ? 'active show' : '' }}"
                                    id="custom-tabs-{{ $sensor->id }}-overlay" role="tabpanel"
                                    aria-labelledby="custom-tabs-{{ $sensor->id }}-overlay-tab">
                                    <div class="row">
                                        <div class="col-md-12">

                                            <div class="sensorSelection">
                                                <div class="alert alert-info alert-dismissible">
                                                    <button type="button" class="close" data-dismiss="alert"
                                                        aria-hidden="true">×</button>
                                                    <h5><i class="icon fas fa-exclamation-triangle"></i>
                                                        Note
                                                    </h5>
                                                    Please select Sensor
                                                </div>
                                            </div>

                                            <div class="spinner" hidden>
                                                <div class="bar1"></div>
                                                <div class="bar2"></div>
                                                <div class="bar3"></div>
                                                <div class="bar4"></div>
                                                <div class="bar5"></div>
                                                <div class="bar6"></div>
                                                <div class="bar7"></div>
                                                <div class="bar8"></div>
                                                <div class="bar9"></div>
                                                <div class="bar10"></div>
                                                <div class="bar11"></div>
                                                <div class="bar12"></div>
                                            </div>
                                            <div id="volrageCurrentProfile{{ $sensor->id }}"
                                                style="height: 520px; width: 100%;"></div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
                {{-- <div class="card card-primary card-outline">
                    <div class="card-header">
                        <h3 class="card-title">
                            Active Power Profile
                        </h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-3 col-sm-2">
                                <div class="nav flex-column nav-tabs h-100" id="vert-tabs-tab" role="tablist"
                                    aria-orientation="vertical">
                                    @foreach ($sensors as $key => $sensor)
                                        <a class="nav-link " id="vert-tabs-{{ $sensor->id }}-tab" data-toggle="pill"
                                            href="#vert-tabs-{{ $sensor->id }}" role="tab"
                                            aria-controls="vert-tabs-{{ $sensor->id }}" aria-selected="true"
                                            data-id="activePowerProfile{{ $sensor->id }}"
                                            data-key="{{ $sensor->id }}">{{ $sensor->description }}</a>
                                    @endforeach
                                </div>
                            </div>
                            <div class="col-9 col-sm-10">
                                <div class="tab-content" id="vert-tabs-tabContent">
                                    @foreach ($sensors as $key => $sensor)
                                        <div class="tab-pane text-left fade " id="vert-tabs-{{ $sensor->id }}"
                                            role="tabpanel" aria-labelledby="vert-tabs-{{ $sensor->id }}-tab">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div id="activePowerProfile{{ $sensor->id }}"
                                                        style="height: 370px; width: 100%;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                </div> --}}
                <!-- /.card -->
            </div>
        </div>
    </x-slot>
    <x-slot name="importedScripts">
        <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
        <script src="https://cdn.canvasjs.com/jquery.canvasjs.min.js"></script>
        <script src="{{ asset('assets/js/voltageCurrent.js') }}"></script>
    </x-slot>
</x-app-layout>
