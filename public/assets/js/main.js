window.onload = function () {

    let charts = [];

    CanvasJS.addColorSet("DailyEnergyColorSet",
        [
            '#e57c10', // Medium Orange
            '#4a8fc2', // Medium Blue
            '#bca184', // Warm Taupe
            '#7a8b4e', // Olive Green
            '#d67c6e', // Muted Coral
            '#4e5b7e', // Dark Slate Blue
            '#9b4d82', // Soft Plum
            '#b57e1f',  // Dark Mustard
            '#5d737e', // Dusty Teal

        ]);

    const renderChart = (chartID, config) => {
        charts[chartID] = new CanvasJS.Chart(chartID, config);
        charts[chartID].render();
    }

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
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
            $("#totalEnergyConsumptionValue").html(totalEnergyConsumption.y ?? 0);

            // $("#ghgCurrentDay").html(`${(totalEnergyConsumption.y * 0.512).toFixed(2)} kWh`);
            $("#ghgCurrentDayValue").html(`${(totalEnergyConsumption.y * 0.512).toFixed(2)} kWh`);
            $("#ghgCurrentDay").css('width', (totalEnergyConsumption.y * 0.512).toFixed(2));
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

    const getStartEndDate = (hours, days, period, duration) => {
        let now = moment();
        let dateToday = now.clone().startOf(period).add(hours, 'hours');

        if (period === 'month') {
            dateToday.add(days, 'days');
        }

        let formattedStartDate, formattedEndDate;

        if (now.isSameOrAfter(dateToday)) {
            formattedStartDate = dateToday.clone().format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = dateToday.clone().add(duration, period).format('YYYY-MM-DD HH:mm:ss');
        } else {
            formattedStartDate = dateToday.clone().subtract(duration, period).format('YYYY-MM-DD HH:mm:ss');
            formattedEndDate = dateToday.clone().format('YYYY-MM-DD HH:mm:ss');
        }

        return [formattedStartDate, formattedEndDate];
    };

    const fetchData = (request, chartID, url, columnName, refetch = false) => {

        $.ajax({
            type: "GET",
            url: url,
            data: request,
            success: function (data) {
                console.log(data);
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
                colorSet: "DailyEnergyColorSet",
                title: {
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
                    labelFontSize: 12,
                    minimum: 10,
                    labelFontWeight: "bold",

                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "bottom",
                    horizontalAlign: "bottom"
                },
                data: [
                    {
                        type: "column",
                        indexLabel: "{y}",
                        indexLabelMaxWidth: 60,
                        indexLabelFontColor: "#FFF",
                        indexLabelFontSize: 15,
                        indexLabelPlacement: "inside",
                        indexLabelTextAlign: "center",
                        dataPoints: []
                    }
                ]
            }
        }

        const pandpEnergyConsumption = initPandPEnergyConsumption();

        setIntervalAtFiveMinuteMarks(function () {
            console.log("refetching...");
            fetchData(pandpEnergyConsumptionRequest, "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date", true);
            charts["pandpEnergyConsumption"].render();
        });

        const pandpEnergyConsumptionRequest = {
            groupBy: "reading_date",
            select: "DATE_FORMAT(reading_date, '%M %d, %Y') as reading_date, ROUND(SUM((end_energy - start_energy)), 2) AS daily_consumption",
        };
        charts["pandpEnergyConsumption"] = { options: pandpEnergyConsumption };
        fetchData(pandpEnergyConsumptionRequest, "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date");

    }

    const processDailyEnergyConsumptionPerMeter = () => {

        const initDailyEnergyConsumptionPerMeter = () => {

            return {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light2",
                colorSet: "DailyEnergyColorSet",
                title: {
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
                        indexLabel: "{y} kWh",
                        showInlegend: false,
                        indexLabelFontColor: "#FFF",
                        indexLabelFontSize: 15,
                        indexLabelPlacement: "inside",
                        dataPoints: []
                    }
                ]
            }
        }

        const dailyEnergyConsumptionPerMeter = initDailyEnergyConsumptionPerMeter();
        charts["dailyEnergyConsumptionPerMeter"] = { options: dailyEnergyConsumptionPerMeter };

        setIntervalAtFiveMinuteMarks(function () {
            console.log("refetching...");

            // Get updated dates dynamically
            const [startDate, endDate] = getStartEndDate(9, 1, 'day', 1);

            const dailyEnergyConsumptionPerMeterRequest = {
                select: `description as sensor_description,
                        location_id,
                        sensor_id,
                        reading_date,
                        ROUND((end_energy - start_energy), 2) AS daily_consumption`,
                startDate: startDate,
                endDate: endDate
            };

            fetchData(dailyEnergyConsumptionPerMeterRequest, "dailyEnergyConsumptionPerMeter", "/getEnergyConsumption", "sensor_description", true);
            charts["dailyEnergyConsumptionPerMeter"].render();
        });

        // Initial Fetch with Dynamic Dates
        [startDate, endDate] = getStartEndDate(9, 1, 'day', 1);

        const dailyEnergyConsumptionPerMeterRequest = {
            select: `description as sensor_description,
                    location_id,
                    sensor_id,
                    reading_date,
                    ROUND((end_energy - start_energy), 2) AS daily_consumption`,
            startDate: startDate,
            endDate: endDate
        };

        fetchData(dailyEnergyConsumptionPerMeterRequest, "dailyEnergyConsumptionPerMeter", "/getEnergyConsumption", "sensor_description");

    }

    // Process for the Previous and Present energy consumption calculation
    processPandPEnergyConsumption();

    // Process for the Daily energy consumption per meter calculation
    processDailyEnergyConsumptionPerMeter();


    // -----------------------------------------------------------------------------------------------


    // Separate process for no charts

    // Process for the Daily energy consumption per meter calculation

    const fetchDataNoneCharts = (select, startDate, endDate, divID) => {

        $.ajax({
            type: "GET",
            url: "/getEnergyConsumption",
            data: {
                select: select,
                startDate: startDate,
                endDate: endDate
            },
            success: function (data) {
                data = data[0];
                $(`#${divID}Value`).html(data.daily_consumption);
                $(`#${divID}StartDate`).html(formatDate(startDate));
                $(`#${divID}EndDate`).html(formatDate(endDate));

                // $("#ghgCurrentMonth").html(`${(data.daily_consumption * 0.512).toFixed(2)} kWh`);
                $("#ghgCurrentMonthValue").html(`${(data.daily_consumption * 0.512).toFixed(2)} kWh`);
                $("#ghgCurrentMonth").css('width', (data.daily_consumption * 0.512).toFixed(2));

            },
            error: function (error) {
                console.log(error);
            }
        })
    };

    const processCurrentMonthEnergyConsumption = () => {
        select = `
            ROUND(SUM((end_energy - start_energy)), 2) AS daily_consumption
        `;

        setIntervalAtFiveMinuteMarks(function () {
            [startDate, endDate] = getStartEndDate(9, 24, 'month', 1);
            console.log("refetching...");
            fetchDataNoneCharts(select, startDate, endDate, "currentMonthEnergyConsumption");
        });

        // Initial fetch
        [startDate, endDate] = getStartEndDate(9, 24, 'month', 1);
        fetchDataNoneCharts(select, startDate, endDate, "currentMonthEnergyConsumption");
    };

    processCurrentMonthEnergyConsumption();



}
