window.onload = function () {
    console.log('activePower.js is loaded');

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
        console.log(`Rendering chart: ${chartID}`);
        charts[chartID] = new CanvasJS.Chart(chartID, config);
        charts[chartID].render();
    }

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    const processData = (data, refetch, chartID, columnName) => {
        console.log(`Processing data for chart: ${chartID}`);

        let dateToday = new Date();
        dateToday.setHours(dateToday.getHours() - 9); // Deduct 9 hours
        dateToday = formatDate(dateToday);

        data.forEach((reading) => {
            let existingSensor = charts[chartID].options.data[0].dataPoints.find(chartData => chartData.label === reading[columnName]);
            charts[chartID].options.title.text = reading.description;
            if (existingSensor) {
                existingSensor.y = reading.real_power;
            } else {
                charts[chartID].options.data[0].dataPoints.push(
                    { y: reading.real_power, label: reading[columnName] },
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
        console.log(`Fetching data for chart: ${chartID}`);

        $.ajax({
            type: "GET",
            url: url,
            data: request,
            success: function (data) {
                // console.log(data);
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

    const processActivePowerProfile = (id) => {
        console.log(`Processing active power profile for sensor: ${id}`);

        const initActivePowerProfile = () => {

            return {
                exportEnabled: true,
                animationEnabled: true,
                theme: "light2",
                zoomEnabled: true,
                title: {
                    text: "Active Power Profile",
                    fontSize: 20,
                },
                axisX: {
                    labelAngle: -90,
                    margin: 30,
                    labelFontSize: 12,
                    interval: 50,
                    // intervalType: "day",
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    verticalAlign: "top",
                    horizontalAlign: "center",
                    dockInsidePlotArea: true,
                },
                data: [
                    {
                        type: "line",
                        name: "",
                        markerSize: 0,
                        dataPoints: [],
                    },
                ],
            }
        }

        const activePowerProfile = initActivePowerProfile();

        // setIntervalAtFiveMinuteMarks(function () {
        //     console.log("refetching...");
        //     fetchData(pandpEnergyConsumptionRequest, "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date", true);
        //     charts["pandpEnergyConsumption"].render();
        // });
        [startDate, endDate] = getStartEndDate(9, 24, 'month', 1);

        const activePowerProfileRequest = {
            select: "*",
            startDate: startDate,
            endDate: endDate,
            where:
            {
                field: "sensor_id",
                operator: "=",
                value: id,
            }
        };
        charts[`activePowerProfile${id}`] = { options: activePowerProfile };
        fetchData(activePowerProfileRequest, `activePowerProfile${id}`, "/getPower", "datetime_created");

    }

    // Process for the Previous and Present energy consumption calculation

    $('.nav-link').on('click', function () {
        console.log('Nav link clicked');

        let activePowerProfileDataId = $(this).data('id');
        console.log(`Active power profile data ID: ${activePowerProfileDataId}`);

        processActivePowerProfile(activePowerProfileDataId);

    });

}
