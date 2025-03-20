import { fetchData, setIntervalAtFiveMinuteMarks, charts, formatDate, renderChart, getStartEndDate, colorScheme } from "./shared/main.js";

colorScheme();

const processData = (data, refetch, chartID, dataOptions, columnName) => {

    const voltageValues = ['voltage_ab', 'voltage_bc', 'voltage_ca'];
    const currentValues = ['current_a', 'current_b', 'current_c'];


    voltageValues.forEach(v => {
        data.forEach(reading => {

            let existingSensor = charts[`voltageProfile${chartID}`].options.data.find(sensor => sensor.name === v)

            if (existingSensor) {
                existingSensor.dataPoints.push({
                    label: reading[columnName],
                    y: reading[v] ?? 0
                });
            } else {
                let newDataOptions = {
                    ...dataOptions,
                    name: `${v}`,
                    type: "line",
                    showInLegend: true,
                    markerSize: 2,
                    dataPoints: [
                        {
                            label: reading[columnName],
                            y: reading[v] ?? 0
                        }
                    ]
                };

                charts[`voltageProfile${chartID}`].options.data.push(newDataOptions);
            }

        });
    });

    currentValues.forEach(c => {
        data.forEach(reading => {

            let existingSensor = charts[`currentProfile${chartID}`].options.data.find(sensor => sensor.name === c)

            if (existingSensor) {
                existingSensor.dataPoints.push({
                    label: reading[columnName],
                    y: reading[c] ?? 0
                });
            } else {
                let newDataOptions = {
                    ...dataOptions,
                    name: `${c}`,
                    type: "line",
                    showInLegend: true,
                    markerSize: 2,
                    dataPoints: [
                        {
                            label: reading[columnName],
                            y: reading[c] ?? 0
                        }
                    ]
                };

                charts[`currentProfile${chartID}`].options.data.push(newDataOptions);
            }

        });
    });


    renderChart(`voltageProfile${chartID}`, charts[`voltageProfile${chartID}`].options);
    renderChart(`currentProfile${chartID}`, charts[`currentProfile${chartID}`].options);

};


const processVoltageCurrentProfile = (id) => {

    const voltageProfile = () => {

        return {
            exportEnabled: true,
            animationEnabled: true,
            theme: "light2",
            zoomEnabled: true,
            title: {
                text: "Voltage Profile",
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

    const currentProfile = () => {

        return {
            exportEnabled: true,
            animationEnabled: true,
            theme: "light2",
            zoomEnabled: true,
            title: {
                text: "Current Profile",
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



    const toggleDataSeries = (e, chartID) => {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        charts[chartID].render();
    }

    const [startDate, endDate] = getStartEndDate(9, 24, 'month', 1);

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
    charts[`voltageProfile${id}`] = { options: voltageProfile() };
    charts[`currentProfile${id}`] = { options: currentProfile() };

    fetchData(voltageCurrentProfileRequest, "", id, "/getPower", "datetime_created", processData);


}

// Process for the Previous and Present energy consumption calculation

$('.nav-link').on('click', function () {

    let activePowerProfileDataId = $(this).data('id');

    processVoltageCurrentProfile(activePowerProfileDataId);

});

export { processVoltageCurrentProfile };