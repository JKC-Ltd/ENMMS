const charts = [];

const colorScheme = () => {
    return CanvasJS.addColorSet("DailyEnergyColorSet",
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
};


const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const renderChart = (chartID, config) => {
    charts[chartID] = new CanvasJS.Chart(chartID, config);
    charts[chartID].render();

    console.log(config)

    // if (charts[chartID].get("exportEnabled")) {
    //     const toolbarClass = $(`#${chartID}`).find('.canvasjs-chart-toolbar')[0];

    //     var exportCSV = document.createElement('div');
    //     var text = document.createTextNode("Export as CSV");
    //     exportCSV.setAttribute("style", "padding: 12px 8px; background-color: white; color: black")
    //     exportCSV.appendChild(text);

    //     exportCSV.addEventListener("mouseover", function () {
    //         exportCSV.setAttribute("style", "padding: 12px 8px; background-color: #2196F3; color: white")
    //     });
    //     exportCSV.addEventListener("mouseout", function () {
    //         exportCSV.setAttribute("style", "padding: 12px 8px; background-color: white; color: black")
    //     });
    //     exportCSV.addEventListener("click", function () {
    //         console.log(config.chartName);
    //         console.log(config.chartProps.processUrl);

    //         // $.ajax({
    //         //     type: "GET",
    //         //     url: config.chartProps.processUrl,
    //         //     data: config.chartProps.request,
    //         //     success: function (data) {
    //         //         console.log(data);
    //         //     },
    //         //     error: function (error) {
    //         //         console.log(error);
    //         //     }
    //         // });
    //         // downloadCSV({ filename: "chart-data.csv", chart: chart })
    //     });
    //     toolbarClass.lastChild.appendChild(exportCSV);
    // }

}

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

const fetchData = (request, dataOptions, chartID, url, columnName, processData, refetch = false) => {
    $.ajax({
        type: "GET",
        url: url,
        data: request,
        success: function (data) {
            processData(data, refetch, chartID, dataOptions, columnName);
        },
        error: function (error) {
            console.log(error);
        }
    });
};

// const setIntervalAtFiveMinuteMarks = (callback) => {
//     const now = new Date();
//     const delay = (5 - (now.getMinutes() % 5)) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
//     setTimeout(() => {
//         console.log(delay);
//         callback();
//         setInterval(callback, 5 * 60 * 1000);
//     }, delay);
// };

const setIntervalAtFiveMinuteMarks = (callback) => {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    // Calculate the delay to the next 5-minute mark + 10 seconds
    const delay = ((5 - (minutes % 5)) * 60 + (30 - seconds)) * 1000 - milliseconds;

    setTimeout(() => {
        callback();
        setInterval(callback, 5 * 60 * 1000 + 30 * 1000);
    }, delay);
};

const exportFn = (request, url) => {
    console.log(request, url);
}


export { colorScheme, formatDate, renderChart, getStartEndDate, fetchData, setIntervalAtFiveMinuteMarks, exportFn, charts };