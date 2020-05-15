/* ----------------------------------------------------------------
 *   AUTHOR:        Daniel Burruchaga Sola 
 *   FILE:           thresholds.js
 *   DATE:           07/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

//console.log("SCRIPT Funciona");
//Init data

let ThresholdsInit = {
    data: [],
    controller: {},
    credentials: "same-origin",
    load: function () {
        fetch('../api/v1.0/thresholds').then(function (ans) {
            return ans.json();
        }).then(function (jsonData) {
            //console.log(jsonData);    
            this.data = jsonData;
                
            // Filter by id 
            let filteredData = jsonData.filter(function (thresholds) {
                return (thresholds.plot == 1);
            });
            // Filter by measure 
            let filteredRain = filteredData.filter(function (recor) {
                return (recor.magnitude == "rain");
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
            let plotName = filteredData.filter(function (recor) {
                return (recor.name);
            });
            //Put data in view
            document.getElementById("plot_name_form").innerHTML = plotName[0].name;

            document.getElementById("maxHumedity").value = filteredHumidity[0].max;
            document.getElementById("minHumedity").value = filteredHumidity[0].min;

            document.getElementById("maxTemperature").value = filteredTemperature[0].max;
            document.getElementById("minTemperature").value = filteredTemperature[0].min;

            document.getElementById("maxLuminosity").value = filteredLuminosity[0].max;
            document.getElementById("minLuminosity").value = filteredLuminosity[0].min;

            document.getElementById("maxPrecipitation").value = filteredRain[0].max;
            document.getElementById("minPrecipitation").value = filteredRain[0].min;

            document.getElementById("maxSalinity").value = filteredSalinity[0].max;
            document.getElementById("minSalinity").value = filteredSalinity[0].min;


        })
    }
};

ThresholdsInit.load();

// Scripts for adaptative View

function close_form_thresholdLoad() {
    if (screen.width < 740) {
        location.reload();
        document.getElementById("thresholds_form").style.display = "none";
        document.getElementById("search_and_table").style.display = "flex";
        document.getElementById("threshold_h2").style.display = "flex";
    } else {
        location.reload();
        document.getElementById("thresholds_form").style.display = "flex";
        document.getElementById("search_and_table").style.display = "flex";
        document.getElementById("threshold_h2").style.display = "flex";
    }
}

function close_form_thresholdClose() {
    if (screen.width < 745) {

        document.getElementById("thresholds_form").style.display = "none";
        document.getElementById("search_and_table").style.display = "flex";
        document.getElementById("threshold_h2").style.display = "flex";
    } else {

        document.getElementById("thresholds_form").style.display = "flex";
        document.getElementById("search_and_table").style.display = "flex";
        document.getElementById("threshold_h2").style.display = "flex";
    }
}

function close_form_thresholdOpen() {
    if (screen.width < 745) {
        document.getElementById("threshold_form").style.display = "flex";
        document.getElementById("search_and_table").style.display = "none";
        document.getElementById("threshold_h2").style.display = "none";
    } else {

        document.getElementById("threshold_form").style.display = "flex";
        document.getElementById("search_and_table").style.display = "flex";
        document.getElementById("threshold_h2").style.display = "flex";
    }
}

//****  CLICK ON A LINK OF TABLE ***==============================================================

function charge_thresholds_values(id) {
    close_form_thresholdOpen();


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

               // console.log(plotName[0].name);
                //View data
                document.getElementById("plot_name_form").innerHTML = plotName[0].name;

                document.getElementById("maxHumedity").value = filteredHumidity[0].max;
                document.getElementById("minHumedity").value = filteredHumidity[0].min;

                document.getElementById("maxTemperature").value = filteredTemperature[0].max;
                document.getElementById("minTemperature").value = filteredTemperature[0].min;

                document.getElementById("maxLuminosity").value = filteredLuminosity[0].max;
                document.getElementById("minLuminosity").value = filteredLuminosity[0].min;

                document.getElementById("maxPrecipitation").value = filteredRain[0].max;
                document.getElementById("minPrecipitation").value = filteredRain[0].min;

                document.getElementById("maxSalinity").value = filteredSalinity[0].max;
                document.getElementById("minSalinity").value = filteredSalinity[0].min;

                document.getElementById("threshold_id_plot").value = id;
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

    //console.log(data);

    //console.log("SE ENVÍA EL OBJETO: ");

    //SEND DATA TO BBDD
    fetch('../api/v1.0/thresholds', {
        method: 'post',
        credentials: "same-origin",
        body: data
    }).then(function (respuesta) {
        if (respuesta.status == 200) {
            //console.log("SE HA ACTUALIZADO BBDD");
        } else {
            //document.getElementById("").style.display = "";
        }
    })

});
//=========================================================================================//


//=========================================================================================//