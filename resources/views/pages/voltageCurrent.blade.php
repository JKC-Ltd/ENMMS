<x-app-layout>
    <x-slot name="pageTitle">
        Dashboard
    </x-slot>
    <x-slot name="content">
        <div class="row">
            <div class="col-lg-4 col-12">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <h3>12</h3>

                        <p>Gateways</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-bag"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-4 col-12">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                        <h3>12</h3>

                        <p>Sensors</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-stats-bars"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-4 col-12">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <h3>12</h3>

                        <p>Users</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                    </div>
                    <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>

        {{-- <!-- Main row -->
        <div class="row">
            <section class="col-8 connectedSortable">
                <div class="card">
                    <div class="card-body text-center">
                        <h6>Monthly Consumption</h6>
                        <h1 style="font-size: 6rem; font-weight: 600;">210</h1>
                        <i>kWh / month</i>
                    </div>
                </div>
            </section>
            <section class="col-4 connectedSortable">
                <div class="card">
                    <div class="card-body text-center">
                        <h6>Total kWh Consumption - All Meters</h6>
                        <h1 style="font-size: 6rem; font-weight: 600;">300</h1>
                        <i>kWh</i>
                    </div>
                </div>
            </section>
        </div> --}}


        {{-- <div class="row">
            <section class="col-12 connectedSortable">
                <div class="card">
                    <div class="card-body">
                        <div id="dailyEnergyConsumption" style="height: 520px; width: 100%;"></div>
                    </div>
                </div>
            </section>
        </div> --}}

        <div class="row">
            <div class="col-12">
                <div class="card card-primary card-outline">
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
                                        <a class="nav-link "
                                            id="vert-tabs-{{ $sensor->id }}-tab" data-toggle="pill"
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
                                        <div class="tab-pane text-left fade "
                                            id="vert-tabs-{{ $sensor->id }}" role="tabpanel"
                                            aria-labelledby="vert-tabs-{{ $sensor->id }}-tab">
                                            {{-- {{ $sensor->description }} --}}
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
                </div>
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
