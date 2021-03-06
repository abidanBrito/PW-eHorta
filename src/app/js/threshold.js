/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           thresholds.js
 *   DATE:           07/04/2020
 *   STATE:          WIP
 *  ---------------------------------------------------------------- */


//General CSS Modifications

if (screen.width < 745) {
    document.getElementById("map").style.position = "absolute";
    document.getElementById("map").style.height = "inherit";


} else {
    document.getElementById("map-floating-panel").style.display = "none";

}
//****  COLOR FILTER***==============================================================
function colorFilter() {
    if (screen.width < 745) {

        document.getElementById("temperature_white").style.display = "none";
        document.getElementById("temperature_black").style.display = "flex";

        document.getElementById("luminosity_white").style.display = "none";
        document.getElementById("luminosity_black").style.display = "flex";

        document.getElementById("rainfall_white").style.display = "none";
        document.getElementById("rainfall_black").style.display = "flex";

        document.getElementById("salinity_white").style.display = "none";
        document.getElementById("salinity_black").style.display = "flex";

        document.getElementById("humidity_white").style.display = "none";
        document.getElementById("humidity_black").style.display = "flex";

    } else {
        document.getElementById("temperature_white").style.display = "flex";
        document.getElementById("temperature_black").style.display = "none";

        document.getElementById("luminosity_white").style.display = "flex";
        document.getElementById("luminosity_black").style.display = "none";

        document.getElementById("rainfall_white").style.display = "flex";
        document.getElementById("rainfall_black").style.display = "none";

        document.getElementById("salinity_white").style.display = "flex";
        document.getElementById("salinity_black").style.display = "none";

        document.getElementById("humidity_white").style.display = "flex";
        document.getElementById("humidity_black").style.display = "none";


    }
}
colorFilter();
//****  CLICK ON A LINK FOR CLOSE ***==============================================================
function close() {
    document.getElementById("map-container").style.display = "block";
    document.getElementById("threshold_form").style.display = "none";
    document.getElementById("map").style.display = "flex";
}
//===============================================================
//****  CLICK ON PLOT***==============================================================
function charge_thresholds_values(id) {
    document.getElementById("p_ok").style.display = "none";
//css changes 
    if (screen.width < 745) {
        document.getElementById("map-container").style.display = "none";
        document.getElementById("threshold_form").style.display = "flex";
        document.getElementById("map").style.display = "none";
        document.getElementById("threshold_close").style.display = "flex";

    } else {
        document.getElementById("threshold_close").style.display = "none";

    }
//Take threshhold and put on views
    let AllThresholds = {
        data: [],
        controller: {},
        credentials: "same-origin",
        load: function () {
            fetch('../api/v1.0/thresholds').then(function (ans) {
                return ans.json();
            }).then(function (jsonData) {
                console.log(jsonData);
                this.data = jsonData;

                //Filter Data by plot

                let filteredData = jsonData.filter(function (thresholds) {
                    return (thresholds.plot == id);
                });
                //Filter Data by measure

                let filteredRain = filteredData.filter(function (recor) {
                    return (recor.magnitude == "rain");
                });
                let plotName = filteredData.filter(function (recor) {
                    return (recor.name);
                });

                let filteredTemperature = filteredData.filter(function (recor) {
                    return (recor.magnitude == "temperature");
                });
                let filteredLuminosity = filteredData.filter(function (recor) {
                    return (recor.magnitude == "luminosity");
                });
                let filteredHumidity = filteredData.filter(function (recor) {
                    return (recor.magnitude == "humidity");
                });
                let filteredSalinity = filteredData.filter(function (recor) {
                    return (recor.magnitude == "salinity");
                });
			// put dates on view
                $("#slider-range0").slider({
                    range: true,
                    min: 0,
                    max: 100,
                    values: [(filteredHumidity[0].min), (filteredHumidity[0].max)],
                    slide: function (event, ui) {
                        $("#minHumedity").val(ui.values[0]);
                        $("#maxHumedity").val(ui.values[1]);
                    }
                });
                $("#slider-range1").slider({
                    range: true,
                    min: 0,
                    max: 100,
                    values: [filteredTemperature[0].min, filteredTemperature[0].max],
                    slide: function (event, ui) {
                        $("#minTemperature").val(ui.values[0]);
                        $("#maxTemperature").val(ui.values[1]);
                    }
                });

                $("#slider-range2").slider({
                    range: true,
                    min: 0,
                    max: 100,
                    values: [filteredLuminosity[0].min, filteredLuminosity[0].max],
                    slide: function (event, ui) {
                        $("#minLuminosity").val(ui.values[0]);
                        $("#maxLuminosity").val(ui.values[1]);
                    }
                });

                $("#slider-range3").slider({
                    range: true,
                    min: 0,
                    max: 100,
                    values: [filteredRain[0].min, filteredRain[0].max],
                    slide: function (event, ui) {
                        $("#minPrecipitation").val(ui.values[0]);
                        $("#maxPrecipitation").val(ui.values[1]);
                    }
                });

                $("#slider-range4").slider({
                    range: true,
                    min: 0,
                    max: 100,
                    values: [filteredSalinity[0].min, filteredSalinity[0].max],
                    slide: function (event, ui) {
                        $("#minSalinity").val(ui.values[0]);
                        $("#maxSalinity").val(ui.values[1]);
                    }
                });
                $("#minHumedity").val($("#slider-range0").slider("values", 0));
                $("#maxHumedity").val($("#slider-range0").slider("values", 1));

                $("#minTemperature").val($("#slider-range1").slider("values", 0));
                $("#maxTemperature").val($("#slider-range1").slider("values", 1));

                $("#minLuminosity").val($("#slider-range2").slider("values", 0));
                $("#maxLuminosity").val($("#slider-range2").slider("values", 1));

                $("#minPrecipitation").val($("#slider-range3").slider("values", 0));
                $("#maxPrecipitation").val($("#slider-range3").slider("values", 1));

                $("#minSalinity").val($("#slider-range4").slider("values", 0));
                $("#maxSalinity").val($("#slider-range4").slider("values", 1));

                document.getElementById("plot_name_form").innerHTML = plotName[0].name;

                document.getElementById("threshold_id_plot").value = id;

                document.getElementById("threshold_form").style.display = "flex";
                document.getElementById("selection_plot_p").style.display = "none";

            })
        }
    };
    AllThresholds.load();
}
//**** DETECT CLICK ON SUBMIT ****===============================================================
let formulario = document.getElementById('threshold_form');
document.getElementById('btn_submit_threshold').addEventListener('click', function (e) {
    //console.log("CLICK ON SUBMIT");
    // evitar que envie parametros by url
    e.preventDefault();
    let data = new FormData(formulario);
    //console.log("SE ENVÍA EL OBJETO: ");

    //SEND DATA TO BBDD
    fetch('../api/v1.0/thresholds', {
        method: 'post',
        credentials: "same-origin",
        body: data
    }).then(function (respuesta) {
        if (respuesta.status == 200) {
            document.getElementById("p_ok").style.display = "flex";
        } else {}
    })

});

//=========================================================================================//
