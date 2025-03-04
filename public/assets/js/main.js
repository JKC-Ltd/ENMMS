window.onload = function () {

    const energyConsumptionDoughnutPerMeter = initEnergyComparisonDoughnut();
    const energyConsumptionColumnPerMeter = initEnergyComparisonColumn();
    const energyConsumptionBarPerMeter = initEnergyConsumptionPerMeterBar();

    getEnergyConsumptionAjax(energyConsumptionDoughnutPerMeter, energyConsumptionColumnPerMeter, energyConsumptionBarPerMeter);

    function initEnergyComparisonDoughnut() {
        return [{
            type: "doughnut",
            showInLegend: true,
            toolTipContent: "<strong>{y}kWh</strong>",
            indexLabel: "{y} kWh",
            dataPoints: []
        }];
    }

    function initEnergyComparisonColumn() {
        return [{
            type: "column",
            showInLegend: false,
            toolTipContent: "<strong>{y}kWh</strong>",
            indexLabel: "{y} kWh",
            dataPoints: []
        }];
    }

    function initEnergyConsumptionPerMeterBar() {
        return [{
            type: "bar", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            showInLegend: false,
            indexLabelFontColor: "#5A5757",
            indexLabelFontSize: 12,
            indexLabelPlacement: "outside",
            dataPoints: []
        }];
    }

    function getEnergyConsumptionAjax(energyConsumptionDoughnutPerMeter, energyConsumptionColumnPerMeter, energyConsumptionBarPerMeter) {
        $.ajax({
            url: '/getEnergyConsumptionBasedOnDate',
            data: {
                days: 30,
            },
            type: 'GET',
            success: function (data) {
                processEnergyConsumptionData(data, energyConsumptionDoughnutPerMeter, energyConsumptionColumnPerMeter, energyConsumptionBarPerMeter);
                initRenderEnergyComparisonDoughnutChart(energyConsumptionDoughnutPerMeter);
                initRenderEnergyComparisonColumnChart(energyConsumptionColumnPerMeter);
                initRenderEnergyConsumptionBarChart(energyConsumptionBarPerMeter);
            }
        });
    }

    function processEnergyConsumptionData(data, energyConsumptionDoughnutPerMeter, energyConsumptionColumnPerMeter, energyConsumptionBarPerMeter) {
        const uniqueDates = [...new Set(data.map(item => item.custom_group_date))];
        const lastDateElement = uniqueDates.at(-1);

        data.forEach(item => {
            let existingSensor = energyConsumptionBarPerMeter[0].dataPoints.find(sensor => sensor.label === item.description);
            if (!existingSensor) {
                let dataItem = data.find(d => d.custom_group_date === lastDateElement && d.description === item.description);
                if (dataItem) {
                    $(`#info-box-${dataItem.id}`).text(dataItem.energy_difference);
                    energyConsumptionBarPerMeter[0].dataPoints.push({ label: dataItem.description, y: dataItem.energy_difference });
                }
            }
        });

        const removeFirstDateElement = uniqueDates.slice(-2);
        removeFirstDateElement.forEach(date => {
            let totalEnergyDifference = data.filter(d => d.custom_group_date === date).reduce((sum, item) => sum + item.energy_difference, 0);
            const formattedDate = formatDate(date);
            energyConsumptionDoughnutPerMeter[0].dataPoints.push({ name: formattedDate + ' 9AM', label: formattedDate + ' 9AM', y: totalEnergyDifference });
            energyConsumptionColumnPerMeter[0].dataPoints.push({ name: formattedDate + ' 9AM', label: formattedDate + ' 9AM', y: totalEnergyDifference });
        });
    }

    function formatDate(date) {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    function initRenderEnergyComparisonDoughnutChart(energyConsumptionDoughnutPerMeter) {
        var energyComparison = new CanvasJS.Chart("energyComparisonPerDayDoughnut", {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "State Operating Funds",
                fontSize: 20,
                margin: 30
            },
            legend: {
                cursor: "pointer",
                // itemclick: explodePie,
                verticalAlign: "bottom",
                horizontalAlign: "bottom"
            },
            data: energyConsumptionDoughnutPerMeter
        });
        energyComparison.render();
    }

    function initRenderEnergyComparisonColumnChart(energyConsumptionColumnPerMeter) {
        var energyComparison = new CanvasJS.Chart("energyComparisonPerDayColumn", {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "State Operating Funds",
                fontSize: 20,
                margin: 30
            },
            legend: {
                cursor: "pointer",
                // itemclick: explodePie,
                verticalAlign: "bottom",
                horizontalAlign: "bottom"
            },
            data: energyConsumptionColumnPerMeter
        });
        energyComparison.render();
    }

    function initRenderEnergyConsumptionBarChart(energyConsumptionBarPerMeter) {
        var energyComparison = new CanvasJS.Chart("dailyEnergyConsumptionPerMeter", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1",
            colorSet: "greenShades",
            title: {
                text: "Daily Energy Consumption Per Meter",
                fontSize: 20,
                margin: 30
            },
            axisY: {
                includeZero: true,
            },
            axisX: {
                labelFontSize: 12
            },
            data: energyConsumptionBarPerMeter
        });
        energyComparison.render();
    }
}