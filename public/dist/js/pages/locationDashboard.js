

var chart = new OrgChart(document.getElementById("tree"), {
    // enableSearch: false,  
    layout: OrgChart.tree,  
    // orientation: OrgChart.orientation.left,
    align: OrgChart.ORIENTATION,
    scaleInitial: OrgChart.match.boundary,
    toolbar: {
        layout: false,
        zoom: true,
        fit: true,
        expandAll: true,
    },
    tags: {
        "Location": {
            template: "ula"
        },
        "Sensor": {
            template: "polina"
        },
    },
    nodeBinding: {
        field_0: "name",
        field_1: "icon" 
    },
    templates: {
        "ula": {
            "template": "<div class='node-content'><img class='icon' src='{field_1}' alt='Icon' /><div class='name'>{field_0}</div></div>"
        },
        "polina": {
            "template": "<div class='node-content'><img class='icon' src='{field_1}' alt='Icon' /><div class='name'>{field_0}</div></div>"
        }
    }
});
chart.on('init', function (sender) {
    sender.toolbarUI.showLayout();
});

chart.load([
    // 1st Layer
    { id: 1, name: "SEP", tags: ["Sensor"], icon: "https://example.com/location-icon.png" },
    // 2nd Layer
    { id: 2, pid: 1, name: "EMS" },
    { id: 3, pid: 1, name: "Injection" },
    { id: 4, pid: 1, name: "CIP2" },
    { id: 5, pid: 1, name: "Building 4" },
    // 3rd Layer
    { id: 6, pid: 2, name: "Building 1" },
    { id: 7, pid: 2, name: "Building 2" },
    { id: 8, pid: 2, name: "Building 3" },
    { id: 9, pid: 3, name: "1st Floor" },
    { id: 10, pid: 3, name: "2nd Floor" },
    // 4th Layer
    { id: 11, pid: 6, name: "1st Floor" },
    { id: 12, pid: 6, name: "2nd Floor" },
    { id: 13, pid: 7, name: "1st Floor" },
    { id: 14, pid: 7, name: "2nd Floor" },
    { id: 15, pid: 8, name: "1st Floor" },
    { id: 16, pid: 8, name: "2nd Floor" },
    // 5th Layer
    { id: 17, pid: 11, name: "IIDA line" },
    { id: 18, pid: 11, name: "IIDA Office" },
    { id: 19, pid: 12, name: "Canteen" },
    { id: 20, pid: 12, name: "General Office" },
    { id: 21, pid: 13, name: "SMT Area" },

    //6th Layer
    { id: 22, pid: 21, name: "A1 reflow" },
    { id: 23, pid: 21, name: "B5 reflow" },

    // SENORS
    { id: 24, pid: 17, name: "IIDA-PP-220V"}, 
    { id: 25, pid: 17, name: "IIDA-PP-100V"}, 
    { id: 26, pid: 17, name: "IIDA-PP-200V" }, 
    { id: 27, pid: 18, name: "PP-CANTEEN" },                          
    { id: 28, pid: 18, name: "PP-SEP" }, 
]);