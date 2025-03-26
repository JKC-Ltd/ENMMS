import { fetchData, setIntervalAtFiveMinuteMarks, charts, formatDate, renderChart, getStartEndDate, colorScheme } from "./shared/main.js?v=1.0";

colorScheme();
const processData = (data, refetch, chartID, dataOptions, columnName) => {

    data.forEach((reading) => {
        let existingSensor = charts[chartID].options.data.find(sensor => sensor.name === chartID);

        if (!existingSensor) {
            dataOptions.dataPoints.push({
                y: reading.daily_consumption,
                label: reading[columnName]
            })

            charts[chartID].options.data.push(dataOptions);
        } else {

            let existingDataOptions = existingSensor.dataPoints.find(dp => dp.label === reading[columnName]);

            if (!existingDataOptions) {
                existingSensor.dataPoints.push({
                    y: reading.daily_consumption,
                    label: reading[columnName]
                });
            } else {
                existingDataOptions.y = reading.daily_consumption;
            }
        }
    });

    if (refetch) {
        charts[chartID].render();
    } else {
        renderChart(chartID, charts[chartID].options);
    }

    let dateToday = new Date();
    dateToday.setHours(dateToday.getHours() - 9);
    dateToday = formatDate(dateToday);

    data.forEach((reading) => {
        let existingSensor = charts[chartID].options.data[0].dataPoints.find(chartData => chartData.label === reading[columnName]);
        if (existingSensor) {
            existingSensor.y = reading.daily_consumption;
        } else {
            charts[chartID].options.data[0].dataPoints.push(
                { y: reading.daily_consumption, label: reading[columnName] }
            );
        }
    });

    if (chartID === "pandpEnergyConsumption") {
        let totalEnergyConsumption = charts[chartID].options.data[0].dataPoints.find(date => formatDate(date.label) === formatDate(dateToday));
        $("#totalEnergyConsumptionValue").html(totalEnergyConsumption?.y ?? 0);
        $("#ghgCurrentDayValue").html(`${(totalEnergyConsumption.y * 0.512).toLocaleString()} kWh`);
        $("#ghgCurrentDay").css('width', (totalEnergyConsumption.y * 0.512).toLocaleString());
    }

    if (chartID === "dailyEnergyConsumptionPerMeter") {
        let totalValuePerArea = {};
        data.forEach(sensorData => {
            let sensorLocationID = $(`#energyConsumptionPerArea${sensorData.location_id}`);
            if (!totalValuePerArea[sensorData.location_id]) {
                totalValuePerArea[sensorData.location_id] = 0;
            }
            totalValuePerArea[sensorData.location_id] += sensorData.daily_consumption;
            sensorLocationID.html(totalValuePerArea[sensorData.location_id].toLocaleString());
        });
    }
};


const processPandPEnergyConsumption = () => {
    const pandPEnergyConsumptionOptions = () => ({
        exportEnabled: true,
        animationEnabled: true,
        theme: "light2",
        colorSet: "DailyEnergyColorSet",
        title: { fontSize: 20, margin: 30 },
        axisY: {
            title: "Energy (kWh)",
            titlePadding: { top: 1, bottom: 15 },
            titleFontSize: 15,
            labelFontSize: 12,
            minimum: 10,
            labelFontWeight: "bold",
        },
        legend: { cursor: "pointer", verticalAlign: "bottom", horizontalAlign: "bottom" },
        data: []
    });

    const pandPEnergyConsumptionDataOptions = () => ({
        type: "column",
        name: "pandpEnergyConsumption",
        indexLabel: "{y}",
        indexLabelMaxWidth: 60,
        indexLabelFontColor: "#FFF",
        indexLabelFontSize: 15,
        indexLabelPlacement: "inside",
        indexLabelTextAlign: "center",
        dataPoints: []
    });

    const pandpEnergyConsumptionRequest = {
        groupBy: "reading_date",
        select: "DATE_FORMAT(reading_date, '%M %d, %Y') as reading_date, ROUND(SUM((end_energy - start_energy)), 2) AS daily_consumption, sensor_id",
    };

    setIntervalAtFiveMinuteMarks(() => {
        console.log("Refetching...");
        fetchData(pandpEnergyConsumptionRequest, pandPEnergyConsumptionDataOptions(), "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date", processData, true);
        charts["pandpEnergyConsumption"].render();
    });

    charts["pandpEnergyConsumption"] = { options: pandPEnergyConsumptionOptions() };
    fetchData(pandpEnergyConsumptionRequest, pandPEnergyConsumptionDataOptions(), "pandpEnergyConsumption", "/getDailyEnergyConsumption", "reading_date", processData);
};

const processDailyEnergyConsumptionPerMeter = () => {

    const dailyEnergyConsumptionPerMeterOptions = () => {

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
                labelFontSize: 12,
                interval: 1,
            },
            data: [

            ]
        }
    }

    const dailyEnergyConsumptionPerMeterDataOptions = () => {
        return {
            type: "bar",
            name: "dailyEnergyConsumptionPerMeter",
            indexLabel: "{y} kWh",
            showInlegend: false,
            indexLabelFontColor: "#fff",
            indexLabelFontSize: 13,
            indexLabelPlacement: "inside",
            dataPoints: []
        }
    };

    charts["dailyEnergyConsumptionPerMeter"] = { options: dailyEnergyConsumptionPerMeterOptions() };

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

        fetchData(dailyEnergyConsumptionPerMeterRequest, dailyEnergyConsumptionPerMeterDataOptions(), "dailyEnergyConsumptionPerMeter", "/getEnergyConsumption", "sensor_description", processData, true);
        charts["dailyEnergyConsumptionPerMeter"].render();
    });

    // Initial Fetch with Dynamic Dates
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

    fetchData(dailyEnergyConsumptionPerMeterRequest, dailyEnergyConsumptionPerMeterDataOptions(), "dailyEnergyConsumptionPerMeter", "/getEnergyConsumption", "sensor_description", processData);

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

            let endDateMoment = moment(endDate);
            let endDateSub = endDateMoment.clone().subtract(1, "day").format('YYYY-MM-DD HH:mm:ss');

            // console.log(endDateSub);
            $(`#${divID}Value`).html(data.daily_consumption.toLocaleString());
            $(`#${divID}StartDate`).html(formatDate(startDate));
            $(`#${divID}EndDate`).html(formatDate(endDateSub));

            // $("#ghgCurrentMonth").html(`${(data.daily_consumption * 0.512).toLocaleString()} kWh`);
            $("#ghgCurrentMonthValue").html(`${Number((data.daily_consumption * 0.512).toFixed(2)).toLocaleString()
                } kWh`);
            $("#ghgCurrentMonth").css('width', (data.daily_consumption * 0.512).toFixed(2));

        },
        error: function (error) {
            console.log(error);
        }
    })
};

const processCurrentMonthEnergyConsumption = () => {
    const select = `
            ROUND(SUM((end_energy - start_energy)), 2) AS daily_consumption
        `;

    setIntervalAtFiveMinuteMarks(function () {
        const [startDate, endDate] = getStartEndDate(9, 25, 'month', 1);
        console.log("refetching...");
        fetchDataNoneCharts(select, startDate, endDate, "currentMonthEnergyConsumption");
    });

    // Initial fetch
    const [startDate, endDate] = getStartEndDate(9, 25, 'month', 1);
    fetchDataNoneCharts(select, startDate, endDate, "currentMonthEnergyConsumption");
};

processCurrentMonthEnergyConsumption();
