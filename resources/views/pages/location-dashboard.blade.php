<x-app-layout>
    <x-slot name="importedLinks">
        <link rel="stylesheet" href="{{ asset('assets/css/spinner.css') }}">
    </x-slot>
    <x-slot name="pageTitle">
        Location Dashboard
    </x-slot>
    <x-slot name="content">
        <div id="tree"></div>
    </x-slot>
    <x-slot name="importedScripts">
        <script src="{{ asset("assets/js/orgchart.js")}}"></script>
        <script src="{{ asset('dist/js/pages/locationDashboard.js') }}"></script>
    </x-slot>
</x-app-layout>