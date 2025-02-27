window.onload = function () {
    let sensorEnergyConsumptionPerMeter = [{
        type: "bar", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelFontSize: 12,
        indexLabelPlacement: "outside",
        dataPoints: []
    }];

    let energyConsumptionDayComparison = [{
        showInLegend: false,
        toolTipContent: "{name}: <strong>{y}%</strong>",
        indexLabel: "{name} - {y} kWh",
        dataPoints: []
    }]

    CanvasJS.addColorSet("greenShades",
        [//colorSet Array
            "#2e3494",
            "#3a3fa6",
            "#464ab8",
            "#5255ca",
            "#5e60dc",
            "#6a6bee",
            "#7677f0",
            "#8282ff",
            "#8e8eff"
        ]);

    getEnergyConsumptionAjax();

    function getEnergyConsumptionAjax() {
        $.ajax({
            url: '/getEnergyConsumptionBasedOnDate',
            data: {
                days: 30,
            },
            type: 'GET',
            success: function (data) {
                // Get unique dates from the data
                let uniqueDates = [...new Set(data.map(item => item.date_created))];

                const lastDateElement = uniqueDates.at(-1);

                data.forEach(item => {
                    let existingSensor = sensorEnergyConsumptionPerMeter[0].dataPoints.find(sensor => sensor.label === item.description);
                    if (!existingSensor) {
                        let dataItem = data.find(d => d.date_created === lastDateElement && d.description === item.description);
                        if (dataItem) {
                            // sort the sensor based on name
                            $(`#info-box-${dataItem.id}`).text(dataItem.energy_difference); // Replace the text inside the box with the new value

                            sensorEnergyConsumptionPerMeter[0].dataPoints.push(
                                { label: dataItem.description, y: dataItem.energy_difference }
                            );
                        }
                    }
                });

                const removeFirstDateElement = uniqueDates.slice(-2);

                removeFirstDateElement.forEach(date => {
                    let totalEnergyDifference = data
                        .filter(d => d.date_created === date)
                        .reduce((sum, item) => sum + item.energy_difference, 0);

                    const newDate = new Date(date);
                    const formattedDate = newDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    energyConsumptionDayComparison[0].dataPoints.push({
                        name: formattedDate + ' 9AM',
                        label: formattedDate + ' 9AM',
                        y: totalEnergyDifference,
                    });
                });
                energyConsumptionPerMeter();
                renderCostEstimatedChart();
                renderChangeInCostChart();
            }
        });
    }

    function energyConsumptionPerMeter() {
        var chart = new CanvasJS.Chart("dailyEnergyConsumptionPerMeter", {
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
            data: sensorEnergyConsumptionPerMeter
        });
        chart.render();
    }

    function renderCostEstimatedChart() {
        energyConsumptionDayComparison[0].type = "doughnut";
        energyConsumptionDayComparison[0].showInLegend = true;

        var costEstimatedChart = new CanvasJS.Chart("costEstimated", {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "State Operating Funds",
                fontSize: 20,
                margin: 30
            },
            legend: {
                cursor: "pointer",
                itemclick: explodePie,
                verticalAlign: "center",
                horizontalAlign: "right"
            },
            data: energyConsumptionDayComparison
        });
        costEstimatedChart.render();
    }

    function renderChangeInCostChart() {
        energyConsumptionDayComparison[0].type = "column";

        var changeInCostChart = new CanvasJS.Chart("changeInCost", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: "Simple Column Chart with Index Labels",
                fontSize: 20,
                margin: 30
            },
            legend: {
                verticalAlign: "center",
                horizontalAlign: "right"
            },
            data: energyConsumptionDayComparison
        });
        changeInCostChart.render();
    }

    // Add event listeners for window resize
    window.addEventListener('resize', function() {
        renderCostEstimatedChart();
        renderChangeInCostChart();
    });

    function explodePie(e) {
        if (typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    }

    var usageEstimateChart = new CanvasJS.Chart("usageEstimate", {
        animationEnabled: true,
        title: {
            text: "Company Revenue by Year",
            fontSize: 20,
            margin: 30
        },
        axisY: {
            title: "Revenue in USD",
            valueFormatString: "#0,,.",
            suffix: "mn",
            prefix: "$"
        },
        data: [{
            type: "splineArea",
            color: "rgba(54,158,173,.7)",
            markerSize: 5,
            xValueFormatString: "YYYY",
            yValueFormatString: "$#,##0.##",
            dataPoints: [
                { x: new Date(2000, 0), y: 3289000 },
                { x: new Date(2001, 0), y: 3830000 },
                { x: new Date(2002, 0), y: 2009000 },
                { x: new Date(2003, 0), y: 2840000 },
                { x: new Date(2004, 0), y: 2396000 },
                { x: new Date(2005, 0), y: 1613000 },
                { x: new Date(2006, 0), y: 2821000 },
                { x: new Date(2007, 0), y: 2000000 },
                { x: new Date(2008, 0), y: 1397000 },
                { x: new Date(2009, 0), y: 2506000 },
                { x: new Date(2010, 0), y: 2798000 },
                { x: new Date(2011, 0), y: 3386000 },
                { x: new Date(2012, 0), y: 6704000 },
                { x: new Date(2013, 0), y: 6026000 },
                { x: new Date(2014, 0), y: 2394000 },
                { x: new Date(2015, 0), y: 1872000 },
                { x: new Date(2016, 0), y: 2140000 }
            ]
        }]
    });
    usageEstimateChart.render();
}