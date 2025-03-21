import { fetchData, setIntervalAtFiveMinuteMarks, charts, formatDate, renderChart, getStartEndDate, colorScheme } from "./shared/main.js";

colorScheme();

const processData = (data, refetch, chartID, dataOptions, columnName) => {
    let totalEnergyConsumption = 0;

    let uniqueDates = [...new Set(data.map(item => item.reading_date))];

    data.forEach((reading) => {
        totalEnergyConsumption += reading.daily_consumption;

        let existingSensor = charts[chartID].options.data.find(sensor => sensor.name === reading.description);

        if (!existingSensor) {
            let newDataOptions = {
                ...dataOptions,
                name: reading.description,
                dataPoints: uniqueDates.map(date => {
                    let dataItem = data.find(d => d.reading_date === date && d.description === reading.description);
                    return {
                        name: dataItem?.description,
                        label: formatDate(date),
                        y: dataItem ? dataItem.daily_consumption : null
                    };
                })
            };

            charts[chartID].options.data.push(newDataOptions);
        }
    });

    $('#monthlyEnergyConsumption').html(totalEnergyConsumption.toLocaleString());

    if (refetch) {
        charts[chartID].render();
    } else {
        renderChart(chartID, charts[chartID].options);
    }

};

const processDailyEnergyConsumptionAllMeters = () => {

    let select = "*, ROUND((end_energy - start_energy), 2) AS daily_consumption";
    const [startDate, endDate] = getStartEndDate(9, 24, 'month', 1);

    const dailyEnergyConsumptionAllMeters = () => {

        return {
            animationEnabled: true,
            theme: "light2",
            colorSet: "DailyEnergyColorSet",
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
            toolTip: {
                // content: "{name}: {y} kWh"
                shared: true,
                content: (e) => toolTipContent(e),
            },
            legend: {
                cursor: "pointer",
                horizontalAlign: "center",
                itemclick: (e) => toggleDataSeries(e, "dailyEnergyConsumptionAllMeters"),
                fontSize: 15,
            },
            data: [],
        }
    }

    const dailyEnergyConsumptionAllMetersDataOptions = () => {

        return {
            type: "stackedColumn",
            name: "",
            showInLegend: true,
            dataPoints: []
        }
    }

    const toolTipContent = (e) => {

        // console.log(e.entries[0].dataPoint.label);

        const totalConsumption = e.entries.reduce((total, item) => total + item.dataPoint.y, 0);
        const label = "<span style = \"color:DodgerBlue;\">Date:<strong> " + e.entries[0].dataPoint.label + "</strong></span><br/>";
        const total = "<span style = \"color:Tomato\">Total:</span><strong> " + totalConsumption.toLocaleString() + "</strong><br/>";
        let sensors = "";

        e.entries.forEach(entry => {
            sensors += `<span style="color: ${entry.dataSeries.color}"> ${entry.dataSeries.name}: </span> <strong>${entry.dataPoint.y}</strong><br/>`
        });

        return (label.concat(sensors)).concat(total);
    }

    const toggleDataSeries = (e, chartID) => {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        charts[chartID].render();
    }

    const dailyEnergyConsumptionAllMetersRequest = {
        select: select,
        startDate: startDate,
        endDate: endDate

    };
    charts["dailyEnergyConsumptionAllMeters"] = { options: dailyEnergyConsumptionAllMeters() };
    fetchData(dailyEnergyConsumptionAllMetersRequest, dailyEnergyConsumptionAllMetersDataOptions(), "dailyEnergyConsumptionAllMeters", "/getEnergyConsumption", "reading_date", processData);

    setIntervalAtFiveMinuteMarks(function () {
        console.log("refetching...");
        fetchData(dailyEnergyConsumptionAllMetersRequest, dailyEnergyConsumptionAllMetersDataOptions(), "dailyEnergyConsumptionAllMeters", "/getEnergyConsumption", "reading_date", processData, true);
        charts["dailyEnergyConsumptionAllMeters"].render();
    });
}

// Process for the Monthly energy consumption calculation
processDailyEnergyConsumptionAllMeters();

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
            let totalValue = {};
            totalValue[divID] = data.reduce((total, item) => total + item.daily_consumption, 0);

            $(`#${divID}`).html(totalValue[divID].toLocaleString());
            // console.log(totalValue);

        },
        error: function (error) {
            console.log(error);
        }
    })
};

const processCurrentWeekEnergyConsumption = () => {
    let select = "*, ROUND((end_energy - start_energy), 2) AS daily_consumption";

    setIntervalAtFiveMinuteMarks(function () {
        const [startDate, endDate] = getStartEndDate(9, 7, 'week', 1);
        console.log("refetching...");
        fetchDataNoneCharts(select, startDate, endDate, "weeklyEnergyConsumption");
    });

    // Initial fetch
    const [startDate, endDate] = getStartEndDate(9, 7, 'week', 1);
    fetchDataNoneCharts(select, startDate, endDate, "weeklyEnergyConsumption");
};

const processCurrentDayEnergyConsumption = () => {

    let select = "*, ROUND((end_energy - start_energy), 2) AS daily_consumption";

    setIntervalAtFiveMinuteMarks(function () {
        const [startDate, endDate] = getStartEndDate(9, 1, 'day', 1);
        console.log("refetching...");
        fetchDataNoneCharts(select, startDate, endDate, "dailyEnergyConsumption");
    });

    const [startDate, endDate] = getStartEndDate(9, 1, 'day', 1);
    fetchDataNoneCharts(select, startDate, endDate, "dailyEnergyConsumption");

};

processCurrentWeekEnergyConsumption();

processCurrentDayEnergyConsumption();