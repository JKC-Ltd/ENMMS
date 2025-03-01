// LOCATION TEMPALTE
OrgChart.templates.locationTemplate = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.locationTemplate.size = [300, 80];
OrgChart.templates.locationTemplate.node = `<rect x="0" y="0" height="80" width="300" fill="#00087d" rx="15" ry="15"></rect>
    <circle cx="35" cy="40" r="47" fill="#d1d2d4" stroke="#fff" stroke-width="5"></circle>
    <clipPath id="{randId}"><circle cx="35" cy="40" r="46"></circle></clipPath>
    <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="/assets/images/location-icon.png" x="-15" y="-10"  width="100" height="100"></image>`;
OrgChart.templates.locationTemplate.field_0 = `<text width="210" class="field_0" style="font-size: 20px;" data-text-overflow="multiline" font-weight="bold" fill="#fff" x="170" y="45" text-anchor="middle">{val}</text>`;
// SENSOR TEMPALTE
OrgChart.templates.sensorTemplate = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.sensorTemplate.size = [300, 80];
OrgChart.templates.sensorTemplate.node = `<rect x="0" y="0" height="80" width="300" fill="#cd9600" rx="15" ry="15"></rect>
        <circle cx="35" cy="40" r="47" fill="#d1d2d4" stroke="#fff" stroke-width="5"></circle>
        <clipPath id="{randId}"><circle cx="35" cy="40" r="46"></circle></clipPath>
        <image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="/assets/images/sensor-icon.png" x="-15" y="-10"  width="100" height="100"></image>`;
OrgChart.templates.sensorTemplate.field_0 = `<text width="210" class="field_0" style="font-size: 20px;" font-weight="bold" fill="#fff" x="170" y="45" text-anchor="middle">{val}</text>`;

var chart = new OrgChart(document.getElementById("tree"), {
    enableSearch: false,
    // miniMap: true,
    layout: OrgChart.tree,
    orientation: OrgChart.orientation.left,
    align: OrgChart.ORIENTATION,
    scaleInitial: OrgChart.match.boundary,
    toolbar: {
        layout: false,
        zoom: true,
        fit: true,
        expandAll: true,
    },
    tags: {
        Location: {
            template: "locationTemplate",
        },
        Sensor: {
            template: "sensorTemplate",
        },
    },
    nodeBinding: {
        field_0: "name",
    },
});

chart.on("init", function (sender) {
    sender.toolbarUI.showLayout();
});

chart.load([
    // 1st Layer
    { id: 1, name: "SEP", tags: ["Location"]},
    // 2nd Layer
    { id: 2, pid: 1, tags: ["Location"], name: "EMS" },
    { id: 3, pid: 1, tags: ["Location"], name: "Injection" },
    { id: 4, pid: 1, tags: ["Location"], name: "CIP2" },
    { id: 5, pid: 1, tags: ["Location"], name: "Building 4" },
    // 3rd Layer
    { id: 6, pid: 2, tags: ["Location"], name: "Building 1" },
    { id: 7, pid: 2, tags: ["Location"], name: "Building 2" },
    { id: 8, pid: 2, tags: ["Location"], name: "Building 3" },
    { id: 9, pid: 3, tags: ["Location"], name: "1st Floor" },
    { id: 10, pid: 3, tags: ["Location"], name: "2nd Floor" },
    // 4th Layer
    { id: 11, pid: 6, tags: ["Location"], name: "1st Floor" },
    { id: 12, pid: 6, tags: ["Location"], name: "2nd Floor" },
    { id: 13, pid: 7, tags: ["Location"], name: "1st Floor" },
    { id: 14, pid: 7, tags: ["Location"], name: "2nd Floor" },
    { id: 15, pid: 8, tags: ["Location"], name: "1st Floor" },
    { id: 16, pid: 8, tags: ["Location"], name: "2nd Floor" },
    // 5th Layer
    { id: 17, pid: 11, tags: ["Location"], name: "IIDA line" },
    { id: 18, pid: 11, tags: ["Location"], name: "IIDA Office" },
    { id: 19, pid: 12, tags: ["Location"], name: "Canteen" },
    { id: 20, pid: 12, tags: ["Location"], name: "General Office" },
    { id: 21, pid: 13, tags: ["Location"], name: "SMT Area" },

    //6th Layer
    { id: 22, pid: 21, tags: ["Location"], name: "A1 reflow" },
    { id: 23, pid: 21, tags: ["Location"], name: "B5 reflow" },

    // SENORS   
    { id: 24, pid: 17, tags: ["Sensor"], name: "IIDA-PP-220V" },
    { id: 25, pid: 17, tags: ["Sensor"], name: "IIDA-PP-100V" },
    { id: 26, pid: 18, tags: ["Sensor"], name: "IIDA-PP-200V" },
    { id: 27, pid: 19, tags: ["Sensor"], name: "PP-CANTEEN" },
    { id: 28, pid: 19, tags: ["Sensor"], name: "PP-SEP" },
]);
