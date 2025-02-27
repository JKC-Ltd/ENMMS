<x-app-layout>
    <x-slot name="pageTitle">
        Dashboard
    </x-slot>
    <x-slot name="content">

        <!-- Main row -->
        <div class="row">
            <section class="col-8 connectedSortable">
                <div class="card">
                    <div class="card-body text-center">
                        <h6>Total kWh Consumption - All Meters</h6>
                        <h1 style="font-size: 6rem; font-weight: 600;" id="totalEneryConsumption">300</h1>
                        <i>kWh</i>
                    </div>
                </div>
            </section>
            <section class="col-4 connectedSortable">
                <div class="card">
                    <div class="card-body text-center">
                        <h6>Monthly Consumption</h6>
                        <h1 style="font-size: 6rem; font-weight: 600;">210</h1>
                        <i>kWh / month</i>
                    </div>
                </div>
            </section>
        </div>



        <div class="row">
            <section class="col-7 connectedSortable">
                <div class="card">
                    <div class="card-body">
                        <div id="dailyEnergyConsumptionPerMeter" style="height: 520px; width: 100%;"></div>
                    </div>
                </div>
            </section>
            <section class="col-5 connectedSortable">
                <div class="card">
                    <div class="card-body">
                        <div id="dailyEnergyConsumptionPerMeterPie" style="height: 520px; width: 100%;"></div>
                    </div>
                </div>
            </section>
        </div>


        <div class="row">
            <section class="col-12 connectedSortable">
                <div class="card">
                    <div class="card-body">
                        <div id="dailyEnergyConsumptionAllMeters" style="height: 520px; width: 100%;"></div>
                    </div>
                </div>
            </section>
        </div>

        {{-- <div class="row">
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
                                    <a class="nav-link active" id="vert-tabs-home-tab" data-toggle="pill"
                                        href="#vert-tabs-home" role="tab" aria-controls="vert-tabs-home"
                                        aria-selected="true">Home</a>
                                </div>
                            </div>
                            <div class="col-9 col-sm-10">
                                <div class="tab-content" id="vert-tabs-tabContent">
                                    <div class="tab-pane text-left fade active show" id="vert-tabs-home" role="tabpanel"
                                        aria-labelledby="vert-tabs-home-tab">
                                        <div id="activePowerProfile" style="height: 370px; width: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.card -->
            </div>
        </div> --}}
    </x-slot>
    <x-slot name="importedScripts">
        <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
        <script src="https://cdn.canvasjs.com/jquery.canvasjs.min.js"></script>
        <script src="{{ asset('assets/js/energyConsumption.js') }}"></script>
    </x-slot>
</x-app-layout>
