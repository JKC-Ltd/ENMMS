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
        console.log(chartID);
        charts[chartID] = new CanvasJS.Chart(chartID, config);
        charts[chartID].render();
    }

    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    const processData = (data, refetch, chartID, columnName) => {

        const voltageValues = ['voltage_ab', 'voltage_bc', 'voltage_ca'];
        const currentValues = ['current_a', 'current_b', 'current_c'];

        voltageValues.forEach(v => {
            charts[`voltageProfile${chartID}`].options.data.push({
                type: "line",
                name: `${v}`,
                showInLegend: true,
                markerSize: 2,
                dataPoints: []
            });
        });

        voltageValues.forEach(v => {
            data.forEach(item => {
                charts[`voltageProfile${chartID}`].options.title.text = `Voltage Profile: ${item.description}`;

                let existingSensor = charts[`voltageProfile${chartID}`].options.data.find(sensor => sensor.name === v)
                existingSensor.dataPoints.push({
                    label: item[columnName],
                    y: item[v] ?? 0
                });

            });
        });

        currentValues.forEach(c => {
            charts[`currentProfile${chartID}`].options.data.push({
                type: "line",
                name: `${c}`,
                showInLegend: true,
                markerSize: 2,
                dataPoints: []
            });
        });

        currentValues.forEach(c => {
            data.forEach(item => {
                charts[`currentProfile${chartID}`].options.title.text = `Current Profile: ${item.description}`;
                let existingSensor = charts[`currentProfile${chartID}`].options.data.find(sensor => sensor.name === c)
                existingSensor.dataPoints.push({
                    label: item[columnName],
                    y: item[c] ?? 0
                });

            });
        });


        // if (refetch) {
        //     charts[`voltageProfile${chartID}`].render();
        // } else {
        renderChart(`voltageProfile${chartID}`, charts[`voltageProfile${chartID}`].options);
        renderChart(`currentProfile${chartID}`, charts[`currentProfile${chartID}`].options);
        // }

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

    const processVoltageCurrentProfile = (id) => {

        const initVoltageProfile = () => {

            return {
                exportEnabled: true,
                animationEnabled: true,
                theme: "light2",
                zoomEnabled: true,
                title: {
                    text: "",
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
                    verticalAlign: "bottom",
                    horizontalAlign: "bottom",
                    itemclick: (e) => toggleDataSeries(e, `voltageProfile${id}`),
                    dockInsidePlotArea: true,
                },
                data: [],
            }
        }

        const voltageProfile = initVoltageProfile();

        const initCurrentProfile = () => {

            return {
                exportEnabled: true,
                animationEnabled: true,
                theme: "light2",
                zoomEnabled: true,
                title: {
                    text: "",
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
                    verticalAlign: "bottom",
                    horizontalAlign: "bottom",
                    itemclick: (e) => toggleDataSeries(e, `currentProfile${id}`),
                    dockInsidePlotArea: true,
                },
                data: [],
            }
        }

        const currentProfile = initCurrentProfile();

        const toggleDataSeries = (e, chartID) => {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            charts[chartID].render();
        }

        // setIntervalAtFiveMinuteMarks(function () {
        //     console.log("refetching...");
        //     fetchData(pandpEnergyConsumptionRequest, "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date", true);
        //     charts["pandpEnergyConsumption"].render();
        // });
        [startDate, endDate] = getStartEndDate(9, 7, 'week', 1);

        const voltageCurrentProfileRequest = {
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
        charts[`voltageProfile${id}`] = { options: voltageProfile };
        charts[`currentProfile${id}`] = { options: currentProfile };

        fetchData(voltageCurrentProfileRequest, id, "/getPower", "datetime_created");


    }

    // Process for the Previous and Present energy consumption calculation

    $('.nav-link').on('click', function () {

        let activePowerProfileDataId = $(this).data('id');

        processVoltageCurrentProfile(activePowerProfileDataId);

    });

    // if ($('#sensor-details-line').length) {
    //     let activePowerProfileDataId = $('#sensor-details-line').data('id');
    //     console.log(activePowerProfileDataId);
    //     processVoltageCurrentProfile(activePowerProfileDataId);
    // }

}
