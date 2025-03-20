<x-app-layout>
    <x-slot name="pageTitle">
        Dashboard
    </x-slot>
    <x-slot name="content">

        <!-- Main row -->
        <div class="row">
            <section class="col-4 connectedSortable">
                <div class="card">
                    <div class="card-body text-center">
                        <h6>Daily kWh Consumption - All Meters</h6>
                        <h1 style="font-size: 6rem; font-weight: 600;" id="dailyEnergyConsumption">0</h1>
                        <i>kWh / day</i>
                    </div>
                </div>
            </section>
            <section class="col-4 connectedSortable">
                <div class="card">
                    <div class="card-body text-center">
                        <h6>Weekly Consumption - All Meters</h6>
                        <h1 style="font-size: 6rem; font-weight: 600;" id="weeklyEnergyConsumption">0</h1>
                        <i>kWh / week</i>
                    </div>
                </div>
            </section>
            <section class="col-4 connectedSortable">
                <div class="card">
                    <div class="card-body text-center">
                        <h6>Monthly Consumption - All Meters</h6>
                        <h1 style="font-size: 6rem; font-weight: 600;" id="monthlyEnergyConsumption">0</h1>
                        <i>kWh / month</i>
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

    </x-slot>
    <x-slot name="importedScripts">
        <script src="https://canvasjs.com/assets/script/jquery-1.11.1.min.js"></script>
        <script src="https://cdn.canvasjs.com/jquery.canvasjs.min.js"></script>
        <script type="module" src="{{ asset('assets/js/energyConsumption.js') }}"></script>
    </x-slot>
</x-app-layout>
