window.onload = function () {

    const currentProfile = ['voltage_ab', 'voltage_bc', 'voltage_ca', 'current_a', 'current_b', 'current_c'];

    function fetchData(url, dataId, callback) {
        $.ajax({
            url: url,
            type: 'GET',
            data: { sensor_id: dataId },
            success: callback
        });
    }

    function createChartConfig(title, data, sharedToolTip = true) {
        return {
            animationEnabled: true,
            theme: "light2",
            zoomEnabled: true,
            title: { text: title, fontSize: 20 },
            axisX: { labelAngle: -90, margin: 30, labelFontSize: 12, interval: 1 },
            toolTip: { shared: sharedToolTip },
            legend: {
                cursor: "pointer",
                horizontalAlign: "center",
                itemclick: toggleDataSeries
            },
            data: data
        };
    }

    function renderChart(containerId, chartConfig) {
        let chart = new CanvasJS.Chart(containerId, chartConfig);
        chart.render();
    }

    function toggleDataSeries(e) {
        e.dataSeries.visible = !(typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible);
        e.chart.render();
    }

    function processVoltageCurrentProfile(data) {
        let voltageCurrentProfile = currentProfile.map(profile => ({
            type: "line",
            name: profile,
            showInLegend: true,
            markerSize: 2,
            dataPoints: []
        }));

        currentProfile.forEach(profile => {
            data.forEach(item => {
                let sensor = voltageCurrentProfile.find(sensor => sensor.name === profile);
                const formattedDate = new Date(item.date_created).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });
                sensor.dataPoints.push({ label: formattedDate, y: item[profile] });
            });
        });

        let chartConfig = createChartConfig(
            `Voltage & Current Profile - ${data[0].gateway.customer_code} EMS: ${data[0].description}`,
            voltageCurrentProfile
        );
        renderChart("voltageCurrentProfile", chartConfig);
    }

    function processActivePowerProfile(data) {
        let activePowerProfile = [];

        data.forEach(item => {
            let sensor = activePowerProfile.find(sensor => sensor.name === item.description);
            if (sensor) {
                sensor.dataPoints.push({ label: item.datetime_created, y: item.real_power });
            } else {
                activePowerProfile.push({
                    type: "line",
                    name: item.description,
                    showInLegend: false,
                    markerSize: 0,
                    dataPoints: [{ label: item.datetime_created, y: item.real_power }]
                });
            }
        });

        let chartConfig = createChartConfig(
            `Active Power - ${data[0].description}`,
            activePowerProfile,
            true
        );
        renderChart("activePowerProfile", chartConfig);
    }

    let voltageCurrentProfileDataId = $('#voltageCurrentProfile').data('id');
    fetchData('/getVoltageCurrentProfile', voltageCurrentProfileDataId, processVoltageCurrentProfile);

    let activePowerProfileDataId = $("#activePowerProfile").data('id');
    fetchData('/getActivePowerProfile', activePowerProfileDataId, processActivePowerProfile);
}