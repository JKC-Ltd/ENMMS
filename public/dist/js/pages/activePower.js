window.onload = function () {

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

                let activePowerProfile = [];

                data.forEach(item => {
                    let existingSensor = activePowerProfile.find(sensor => sensor.name === item.description);
                    if (existingSensor) {
                        existingSensor.dataPoints.push({ label: item.datetime_created, y: item.real_power });
                    } else {
                        activePowerProfile.push({
                            type: "line",
                            name: `${item.description}`,
                            showInLegend: true,
                            markerSize: 0,
                            dataPoints: [{ label: item.datetime_created, y: item.real_power }]
                        });
                    }
                });

                console.log(activePowerProfile);

                let activePowerProfileChart = {
                    animationEnabled: true,
                    theme: "light2",
                    zoomEnabled: true,
                    title: {
                        text: data[0].description,
                        fontSize: 20,
                    },
                    axisX: {
                        labelAngle: -90,
                        margin: 30,
                        labelFontSize: 12,
                        interval: 1,
                        // intervalType: "month",
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
                    data: activePowerProfile
                };

                getActivePowerProfile(activePowerProfileDataId, activePowerProfileChart)
            }
        });

        // function toogleDataSeries(e) {
        //     if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        //         e.dataSeries.visible = false;
        //     } else {
        //         e.dataSeries.visible = true;
        //     }
        //     chart.render();
        // }

        function getActivePowerProfile(activePowerProfileDataId, activePowerProfileChart) {
            let chart = null;
            setTimeout(function () {
                chart = new CanvasJS.Chart(activePowerProfileDataId, activePowerProfileChart);
                chart.render();
            }, 800);
        }

    });
}