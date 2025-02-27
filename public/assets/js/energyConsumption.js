window.onload = function () {
    let sensorEnergyConsumption = [];
    let sensorEnergyConsumptionPerMeter = [{
        type: "", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelFontSize: 16,
        indexLabelPlacement: "outside",
        dataPoints: []
    }];


    getEnergyConsumptionAjax();

    function getEnergyConsumptionAjax() {
        $.ajax({
            url: '/getEnergyConsumption',
            type: 'GET',
            success: function (data) {
                let totalEnergyConsumption = 0;

                // Get unique dates from the data
                let uniqueDates = [...new Set(data.map(item => item.date_created))];

                uniqueDates.shift();

                data.forEach(item => {
                    totalEnergyConsumption += item.energy_difference;
                    let existingSensor = sensorEnergyConsumption.find(sensor => sensor.name === item.description);
                    if (!existingSensor) {
                        sensorEnergyConsumption.push({
                            type: "stackedColumn",
                            name: item.description,
                            showInLegend: true,
                            dataPoints: uniqueDates.map(date => {
                                let dataItem = data.find(d => d.date_created === date && d.description === item.description);
                                const newDate = new Date(date);
                                const formattedDate = newDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                });
                                return { label: formattedDate + ' 9AM', y: dataItem ? dataItem.energy_difference : null };
                            })
                        });
                    }
                });
                const lastDateElement = uniqueDates.pop();

                data.forEach(item => {
                    let existingSensor = sensorEnergyConsumptionPerMeter[0].dataPoints.find(sensor => sensor.label === item.description);
                    if (!existingSensor) {
                        let dataItem = data.find(d => d.date_created === lastDateElement && d.description === item.description);
                        if (dataItem) {
                            sensorEnergyConsumptionPerMeter[0].dataPoints.push(
                                { label: item.description, y: dataItem.energy_difference }
                            );
                        }
                    }
                });

                // Format totalEnergyConsumption with commas as thousands separators
                $('#totalEneryConsumption').text(totalEnergyConsumption.toLocaleString());
                energyConsumptionAllMeters('dailyEnergyConsumptionAllMeters');
                energyConsumptionPerMeter();
                energyConsumptionPerMeterPie();
            }
        });
    }

    function energyConsumptionAllMeters(consumptionType) {
        var chart = new CanvasJS.Chart(consumptionType, {
            animationEnabled: true,
            theme: "light2",
            exportEnabled: true,
            zoomEnabled: true,
            title: {
                text: "Daily Energy Consumption - SIIX EMS: All Meters",
                fontSize: 20,
                margin: 30
            },
            axisY: {
                title: "Energy (kWh)",
                titlePadding: {
                    top: 1,
                    bottom: 15,
                },
                titleFontSize: 15,
                // includeZero: true
                labelFontSize: 12
            },
            axisX: {
                labelAngle: -90,
                margin: 30,
                labelFontSize: 12,
                interval: 1,
                // intervalType: "month",
            },
            legend: {
                cursor: "pointer",
                horizontalAlign: "center",
                itemclick: toggleDataSeries,
                fontSize: 15,
            },
            data: sensorEnergyConsumption
        });
        chart.render();

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }
    }

    function energyConsumptionPerMeter() {
        sensorEnergyConsumptionPerMeter.forEach(sensor => sensor.type = "column");
        var chart = new CanvasJS.Chart("dailyEnergyConsumptionPerMeter", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Daily Energy Consumption Per Meter",
                fontSize: 20,
                margin: 30
            },
            axisY: {
                includeZero: true
            },
            data: sensorEnergyConsumptionPerMeter
        });
        chart.render();

        // setInterval(function () {
        //     sensorEnergyConsumptionPerMeter[0].dataPoints.push(
        //         { label: 'test', y: 20 }
        //     );
        //     chart.render(); // Re-render the chart to reflect the new data points
        // }, 1000);

        // setInterval(function () {

        //     let existingSensor = sensorEnergyConsumptionPerMeter[0].dataPoints.find(sensor => sensor.label === 'PP-Canteen');
        //     existingSensor.y += 10;
        //     chart.render(); // Re-render the chart to reflect the new data points
        // }, 1000);
    }

    function energyConsumptionPerMeterPie() {
        sensorEnergyConsumptionPerMeter.forEach(sensor => sensor.type = "pie");
        var chart = new CanvasJS.Chart("dailyEnergyConsumptionPerMeterPie", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Daily Energy Consumption Per Meter",
                fontSize: 20,
                margin: 30
            },
            axisY: {
                includeZero: true
            },
            data: sensorEnergyConsumptionPerMeter
        });
        chart.render();

        // setInterval(function () {
        //     sensorEnergyConsumptionPerMeter[0].dataPoints.push(
        //         { label: 'test', y: 20 }
        //     );
        //     chart.render(); // Re-render the chart to reflect the new data points
        // }, 1000);

        // setInterval(function () {

        //     let existingSensor = sensorEnergyConsumptionPerMeter[0].dataPoints.find(sensor => sensor.label === 'PP-Canteen');
        //     existingSensor.y += 10;
        //     chart.render(); // Re-render the chart to reflect the new data points
        // }, 1000);
    }
}