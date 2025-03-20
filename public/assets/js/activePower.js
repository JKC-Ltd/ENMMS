import { fetchData, setIntervalAtFiveMinuteMarks, charts, formatDate, renderChart, getStartEndDate, colorScheme } from "./shared/main.js";

colorScheme();

const processData = (data, refetch, chartID, dataOptions, columnName) => {
    console.log(`Processing data for chart: ${chartID}`);

    let dateToday = new Date();
    dateToday.setHours(dateToday.getHours() - 9); // Deduct 9 hours
    dateToday = formatDate(dateToday);

    data.forEach((reading) => {
        let existingSensor = charts[chartID].options.data.find(chartData => chartData.name === "Real Power");

        if (existingSensor) {
            existingSensor.dataPoints.push(
                { y: reading.real_power, label: reading[columnName] },
            );
        } else {
            dataOptions.dataPoints.push(
                { y: reading.real_power, label: reading[columnName] },
            );

            charts[chartID].options.data.push(dataOptions);
        }
    });

    renderChart(chartID, charts[chartID].options);
};

const processActivePowerProfile = (id) => {
    console.log(`Processing active power profile for sensor: ${id}`);

    const activePowerProfile = () => {

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
            data: [],
        }
    }

    const activePowerProfileDataOptions = () => {

        return {
            type: "line",
            name: `Real Power`,
            markerSize: 0,
            dataPoints: [],
        }
    }

    const [startDate, endDate] = getStartEndDate(9, 24, 'month', 1);

    const activePowerProfileRequest = {
        select: "real_power, datetime_created, sensor_id",
        startDate: startDate,
        endDate: endDate,
        where:
        {
            field: "sensor_id",
            operator: "=",
            value: id,
        }
    };
    charts[`activePowerProfile${id}`] = { options: activePowerProfile() };
    fetchData(activePowerProfileRequest, activePowerProfileDataOptions(), `activePowerProfile${id}`, "/getPower", "datetime_created", processData);

}

// Process for the Previous and Present energy consumption calculation

$('.nav-link').on('click', function () {
    console.log('Nav link clicked');

    let activePowerProfileDataId = $(this).data('id');
    console.log(`Active power profile data ID: ${activePowerProfileDataId}`);

    processActivePowerProfile(activePowerProfileDataId);

});

export { processActivePowerProfile };