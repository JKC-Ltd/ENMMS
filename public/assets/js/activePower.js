window.onload = function () {
    let chart = null;

    let activePowerProfile = [];
    const currentProfile = ['voltage_ab', 'voltage_bc', 'voltage_ca', 'current_a', 'current_b', 'current_c'];

    // multiSeriesVoltageAndCurrent();

    $('.nav-link').on('click', function () {
        let activePowerProfileDataId = $(this).data('id');
        let activePowerProfileDataKey = $(this).data('key');

        $('.sensorSelection').remove();
        $('.spinner').attr('hidden', false);

        $.ajax({
            url: '/getActivePowerProfile',
            type: 'GET',
            data: {
                sensor_id: activePowerProfileDataKey
            },
            success: function (data) {
                activePowerProfile = [];
                currentProfile.forEach(data => {
                    activePowerProfile.push({
                        type: "line",
                        name: `${data}`,
                        showInLegend: true,
                        markerSize: 2,
                        dataPoints: []
                    });
                });

                currentProfile.forEach(currentProfileData => {
                    data.forEach(item => {
                        let existingSensor = activePowerProfile.find(sensor => sensor.name === currentProfileData)
                        const newDate = new Date(item.date_created);
                        const formattedDate = newDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });
                        existingSensor.dataPoints.push({
                            label: formattedDate,
                            y: item[currentProfileData]
                        });

                    });
                });

                let activePowerProfileChart = {
                    animationEnabled: true,
                    theme: "light2",
                    zoomEnabled: true,
                    title: {
                        text: `Voltage & Current Profile - ${data[0].gateway.customer_code} EMS: ${data[0].description}`,
                    },
                    axisX: {
                        labelAngle: -90,
                        margin: 30,
                        labelFontSize: 12,
                        interval: 1,
                    },
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor: "pointer",
                        horizontalAlign: "center",
                        itemclick: toogleDataSeries
                    },
                    data: activePowerProfile,
                };

                voltageAndCurrentProfile(activePowerProfileDataId, activePowerProfileChart)
            }
        });
    });

    function toogleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }

    function voltageAndCurrentProfile(activePowerProfileDataId, activePowerProfileChart) {

        setTimeout(function () {
            chart = new CanvasJS.Chart(activePowerProfileDataId, activePowerProfileChart);
            chart.render();
            $('.spinner').attr('hidden', true);
        }, 800);

    }


    // Active Power Profile per Sensors

    // function multiSeriesVoltageAndCurrent() {

    //     let chart = new CanvasJS.Chart('multiSeriesVoltageAndCurrent', {
    //         title: {
    //             text: "House Median Price"
    //         },
    //         axisX: {
    //             labelAngle: -90,
    //             margin: 30,
    //             labelFontSize: 12,
    //             interval: 1,
    //         },
    //         toolTip: {
    //             shared: true
    //         },
    //         legend: {
    //             cursor: "pointer",
    //             horizontalAlign: "center",
    //             itemclick: toogleDataSeries2
    //         },
    //         data: [{
    //             type: "line",
    //             axisYType: "secondary",
    //             name: "San Fransisco",
    //             showInLegend: true,
    //             markerSize: 0,
    //             dataPoints: [
    //                 { label: '2024-08-24', y: 850 },
    //                 { label: '2024-08-25', y: 889 },
    //             ]
    //         },]
    //     });
    //     chart.render();

    //     function toogleDataSeries2(e) {
    //         if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    //             e.dataSeries.visible = false;
    //         } else {
    //             e.dataSeries.visible = true;
    //         }
    //         chart.render();
    //     }

    // }

}