window.onload = function () {

    let charts = [];

    const renderChart = (chartID, config) => {
        charts[chartID] = new CanvasJS.Chart(chartID, config);
        charts[chartID].render();
    }

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"});
    }

    const processData = (data, refetch, chartID, columnName) => {

        let dateToday = new Date();
        dateToday.setHours(dateToday.getHours() - 9); // Deduct 9 hours
        dateToday = formatDate(dateToday);

        data.forEach((reading) => {
            let existingSensor = charts[chartID].options.data[0].dataPoints.find(chartData => chartData.label === reading[columnName]);
            if (existingSensor) {
                existingSensor.y = reading.daily_consumption;
            } else {
                charts[chartID].options.data[0].dataPoints.push(
                    { y: reading.daily_consumption, label: reading[columnName] },
                );
            }
        });

        if (refetch) {
            charts[chartID].render();
        } else {
            renderChart(chartID, charts[chartID].options);
        }

        if (chartID === "pandpEnergyConsumption") {
            let totalEnergyConsumption = charts[chartID].options.data[0].dataPoints.find(date => formatDate(date.label) === formatDate(dateToday));
            $("#totalEnergyConsumptionValue").html(totalEnergyConsumption.y);

            $("#ghgCurrentDay").html(`${(totalEnergyConsumption.y  * 0.512).toFixed(2)} kWh`);
            $("#ghgCurrentDayValue").html(`${(totalEnergyConsumption.y  * 0.512).toFixed(2)} kWh`);
            $("#ghgCurrentDay").css('width', (totalEnergyConsumption.y  * 0.512).toFixed(2));
        }

        if (chartID === "dailyEnergyConsumptionPerMeter") {
            let totalValuePerArea = {};
            data.forEach(sensorData => {
                let sensorLocationID = $(`#energyConsumptionPerArea${sensorData.location_id}`);
                if (!totalValuePerArea[sensorData.location_id]) {
                    totalValuePerArea[sensorData.location_id] = 0;
                }
                totalValuePerArea[sensorData.location_id] += sensorData.daily_consumption;
                sensorLocationID.html(totalValuePerArea[sensorData.location_id].toFixed(2));
            });
        }

    };

    const fetchData = (request, chartID, url, columnName, refetch = false) => {

        $.ajax({
            type: "GET",
            url: url,
            data: request,
            success: function (data) {
                processData(data, refetch, chartID, columnName);
            },
            error: function (error) {
                console.log(error);
            }
        })
    };

    const setIntervalAtFiveMinuteMarks = (callback) => {
        const now = new Date();
        const delay = (5 - (now.getMinutes() % 5)) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
        setTimeout(() => {
            console.log(delay);
            callback();
            setInterval(callback, 5 * 60 * 1000);
        }, delay);
    };

    const processPandPEnergyConsumption = () => {

        const initPandPEnergyConsumption = () => {
            return {
                exportEnabled: true,
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "Top Oil Reserves",
                    fontSize: 20,
                    margin: 30
                },
                axisY: {
                    title: "Reserves(MMbbl)"
                },
                legend: {
                    cursor: "pointer",
                    // itemclick: explodePie,
                    verticalAlign: "bottom",
                    horizontalAlign: "bottom"
                },
                data: [
                    {
                        type: "column",
                        indexLabel: "{y} kWh",
                        indexLabelFontColor: "#000",
                        indexLabelFontSize: 15,
                        indexLabelPlacement: "inside",
                        dataPoints: []
                    }
                ]
            }
        }

        const pandpEnergyConsumption = initPandPEnergyConsumption();
        const pandpEnergyConsumptionRequest = {
            interval: 2,
            groupBy: "reading_date",
            select: "reading_date, ROUND(SUM((end_energy - start_energy)), 2) AS daily_consumption"
        };
        charts["pandpEnergyConsumption"] = { options: pandpEnergyConsumption };
        fetchData(pandpEnergyConsumptionRequest, "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date");

        setIntervalAtFiveMinuteMarks(function () {
            console.log("refetching...");
            fetchData(pandpEnergyConsumptionRequest, "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date", true);
            charts["pandpEnergyConsumption"].render();
        });
    }

    const processDailyEnergyConsumptionPerMeter = () => {

        const initDailyEnergyConsumptionPerMeter = () => {
            return {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light2",
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
                data: [
                    {
                        type: "bar",
                        //indexLabel: "{y}", //Shows y value on all Data Points
                        showInLegend: false,
                        indexLabelFontColor: "#000",
                        indexLabelFontSize: 15,
                        indexLabelPlacement: "inside",
                        indexLabel: "{y} kWh",
                        dataPoints: []
                    }
                ]
            }
        }

        const dailyEnergyConsumptionPerMeter = initDailyEnergyConsumptionPerMeter();
        const dailyEnergyConsumptionPerMeterRequest = {
            select: `description as sensor_description,
                    location_id,
                    sensor_id,
                    reading_date,ROUND((end_energy - start_energy), 2) AS daily_consumption`
        };
        charts["dailyEnergyConsumptionPerMeter"] = { options: dailyEnergyConsumptionPerMeter };
        fetchData(dailyEnergyConsumptionPerMeterRequest, "dailyEnergyConsumptionPerMeter", "/getDailyEnergyConsumptionPerMeter", "sensor_description");

        setIntervalAtFiveMinuteMarks(function () {
            console.log("refetching...");
            fetchData(dailyEnergyConsumptionPerMeterRequest, "dailyEnergyConsumptionPerMeter", "/getDailyEnergyConsumptionPerMeter", "sensor_description", true);
            charts["dailyEnergyConsumptionPerMeter"].render();
        });
    }

    // Process for the Previous and Present energy consumption calculation
    processPandPEnergyConsumption();

    // Process for the Daily energy consumption per meter calculation
    processDailyEnergyConsumptionPerMeter();


    // -----------------------------------------------------------------------------------------------


    // Separate process for no charts

    // Process for the Daily energy consumption per meter calculation



    const fetchDataNoneCharts = () => {

        $.ajax({
            type: "GET",
            url: "/getMonthlyEnergyConsumption",
            success: function (data) {
                $("#currentMonthEnergyConsumptionValue").html(data.daily_consumption);
                $("#currentMonthEnergyConsumptionStartDate").html(formatDate(data.start_date));
                $("#currentMonthEnergyConsumptionEndDate").html(formatDate(data.end_date));

                $("#ghgCurrentMonth").html(`${(data.daily_consumption  * 0.512).toFixed(2)} kWh`);
                $("#ghgCurrentMonthValue").html(`${(data.daily_consumption  * 0.512).toFixed(2)} kWh`);
                $("#ghgCurrentMonth").css('width', (data.daily_consumption  * 0.512).toFixed(2));
            },
            error: function (error) {
                console.log(error);
            }
        })
    };

    const processCurrentMonthEnergyConsumption = () => {

        fetchDataNoneCharts();
        setIntervalAtFiveMinuteMarks(function () {
            console.log("refetching...");
            fetchDataNoneCharts();
        });
    };

    processCurrentMonthEnergyConsumption();



}
