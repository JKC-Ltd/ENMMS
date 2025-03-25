<x-app-layout>
    <x-slot name="importedLinks">
        <link rel="stylesheet" href="{{ asset('assets/css/spinner.css') }}">
        <style>
            #boc-avatar {
                display: none !important;
                /* Use !important to override other styles */
            }

            .boc-edit-form-header {
                height: 40% !important;
            }
        </style>
    </x-slot>
    <x-slot name="pageTitle">
        Location Dashboard
    </x-slot>
    <x-slot name="content">
        <div class="location-dashboard-chart">
            <div id="tree"></div>
        </div>
    </x-slot>

    @section('scripts')
        <script src="{{ asset('assets/js/orgchart.js') }}"></script>
        <script src="{{ asset('dist/js/pages/locationDashboard.js') }}"></script>
    @endsection
</x-app-layout>
