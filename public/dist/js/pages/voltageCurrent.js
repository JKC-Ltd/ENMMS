window.onload = function () {
    let chart = null;

    let voltageCurrentProfile = [];

    // const voltageValues = ['voltage_ab', 'voltage_bc', 'voltage_ca'];
    // const currentValues = ['current_a', 'current_b', 'current_c'];
    const currentProfile = ['voltage_ab', 'voltage_bc', 'voltage_ca', 'current_a', 'current_b', 'current_c'];

    // multiSeriesVoltageAndCurrent();

    $('.nav-link').on('click', function () {
        let voltageCurrentProfileDataId = $(this).data('id');
        let voltageCurrentProfileDataKey = $(this).data('key');

        $('.sensorSelection').remove();
        $('.spinner').attr('hidden', false);

        $.ajax({
            url: '/getVoltageCurrentProfile',
            type: 'GET',
            data: {
                sensor_id: voltageCurrentProfileDataKey
            },
            success: function (data) {
                voltageCurrentProfile = [];
                
                currentProfile.forEach(data => {
                    voltageCurrentProfile.push({
                        type: "line",
                        name: `${data}`,
                        showInLegend: true,
                        markerSize: 2,
                        dataPoints: []
                    });
                });

                currentProfile.forEach(currentProfileData => {
                    data.forEach(item => {
                        let existingSensor = voltageCurrentProfile.find(sensor => sensor.name === currentProfileData)
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

                let voltageCurrentProfileChart = {
                    animationEnabled: true,
                    theme: "light2",
                    zoomEnabled: true,
                    title: {
                        text: `Voltage & Current Profile - ${data[0].gateway.customer_code} EMS: ${data[0].description}`,
                        fontSize: 20,
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
                    data: voltageCurrentProfile,
                };

                voltageAndCurrentProfile(voltageCurrentProfileDataId, voltageCurrentProfileChart)
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

    function voltageAndCurrentProfile(voltageCurrentProfileDataId, voltageCurrentProfileChart) {

        setTimeout(function () {
            chart = new CanvasJS.Chart(voltageCurrentProfileDataId, voltageCurrentProfileChart);
            chart.render();
            $('.spinner').attr('hidden', true);
        }, 800);

    }

}