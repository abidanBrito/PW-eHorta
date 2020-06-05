/* ----------------------------------------------------------------
*   AUTHOR:         Luis Belloch
*   FILE:           graphic_weather.js
*   DATE:           28/05/2020
*   STATE:          WIP
*  ---------------------------------------------------------------- */ 

// Measurement buttons behaviour
function activateWeatherButton(btn) {

    if(btn.className == "weather-button") {
        let activeButtons = document.getElementsByClassName("weather-button-active");
        console.log(activeButtons);
        let i;
        for (i = 0; i < activeButtons.length; i++) {
            activeButtons[i].className = "weather-button";
        }
        btn.className = "weather-button-active";
    }
}

// ----------------------------------------------------------------
// getData() -> T
// Envia el codigo de municipio y devuelve los datos en formato JSON
// ----------------------------------------------------------------
async function getData() {
    
    // Busca en el documento el selector de municipios
    let selector = await document.getElementById("select-weather");
    // Consigue el codigo de municipio seleccionado
    let code = await selector.options[selector.selectedIndex].value;
    // Envia el codigo a curr_weather.js
    let response = await sendRequest(code);
    
    let data = await readTextFile(response);
    
    let dataJson = JSON.parse(data);
    
    return(dataJson);
}

// ----------------------------------------------------------------
// showTemperature()
// muestra la temperatura en la grafica
// ----------------------------------------------------------------
async function showTemperature(button) {
    
    activateWeatherButton(button);
    
    let dataJson = await getData();
    
    let tempValues = [];
    let temperatures = dataJson[0].prediccion.dia[0].temperatura;
    for(let i = 0; i < temperatures.length; i++) {
        tempValues.push(temperatures[i].value);
    } // for
    
    let hours = [];
    for(let i = 0; i < temperatures.length; i++) {
        hours.push(temperatures[i].periodo + "h");
    } // for
    
    datos.datasets[0].data = tempValues;
    
    console.log(tempValues);
    
    datos.labels = hours;
    
    datos.datasets[0].label = "ºC";
    
    CrearGrafica();
}

// ----------------------------------------------------------------
// showRainfall()
// muestra la lluvia en la grafica
// ----------------------------------------------------------------
async function showRainfall(button) {
    
    activateWeatherButton(button);
    
    let dataJson = await getData();
    
    let rainValues = [];
    let rainfall = dataJson[0].prediccion.dia[0].precipitacion;
    for(let i = 0; i < rainfall.length; i++) {
        rainValues.push(rainfall[i].value);
    } // for
    
    let hours = [];
    for(let i = 0; i < rainfall.length; i++) {
        hours.push(rainfall[i].periodo + "h");
    } // for
    
    datos.datasets[0].data = rainValues;
    
    datos.labels = hours;
    
    datos.datasets[0].label = "mm";
    
    CrearGrafica();
}

// ----------------------------------------------------------------
// showHumidty()
// muestra la humedad en la grafica
// ----------------------------------------------------------------
async function showHumidity(button) {
    
    activateWeatherButton(button);
    
    let dataJson = await getData();
    
    let humValues = [];
    let humidity = dataJson[0].prediccion.dia[0].humedadRelativa;
    for(let i = 0; i < humidity.length; i++) {
        humValues.push(humidity[i].value);
    } // for
    
    let hours = [];
    for(let i = 0; i < humidity.length; i++) {
        hours.push(humidity[i].periodo + "h");
    } // for
    
    datos.datasets[0].data = humValues;
    
    datos.labels = hours;
    
    datos.datasets[0].label = "%";
    
    CrearGrafica();
}

// ----------------------------------------------------------------
// showWind()
// muestra la racha de viento en la grafica
// ----------------------------------------------------------------
async function showWind(button) {
    
    activateWeatherButton(button);
    
    let dataJson = await getData();
    
    let windValues = [];
    let wind = dataJson[0].prediccion.dia[0].vientoAndRachaMax;
    for(let i = 0; i < wind.length; i++) {
        windValues.push(wind[i].value);
    } // for
    
    let hours = [];
    for(let i = 0; i < wind.length; i++) {
        hours.push(wind[i].periodo + "h");
    } // for
    
    datos.datasets[0].data = windValues;
    
    datos.labels = hours;
    
    datos.datasets[0].label = "km/h";
    
    CrearGrafica();
}

let datos = {
    datasets: [
        {
            fill: true,
            backgroundColor: 'rgba(51,51,51, 0.6)',
            borderColor: 'rgb(51,51,51)',
            //lineas rectas
            lineTension: 0,
            //tipo de punto
            pointStyle: 'round',
            //tamaño del punto
            pointRadius: 10,
        },
    ]
};
var opciones = {
    scales: {
        yAxes: [{
            //los datos se apilan y se suman entre ellos
            stacked: false,
        }],
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
    },
    layout: {
        padding: {
            // To prevent data circles to be cut
            top: 20,
            right: 20
        }
    },
    legend: {
        display: false
    },
    title: {
        display: false
    },
    tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#000',
        titleAlign: 'center',
        bodyFontColor: '#333',
        borderColor: '#666',
        borderWidth: 1,
    },
    responsive: true,
    maintainAspectRatio: false,
    
};

function CrearGrafica() {
    // Borra el canvas anterior y crea uno nuevo
    let oldCanvas = document.getElementById('chart');
    oldCanvas.remove();
    let fatherContainer = document.getElementById('weather-chart-container');
    fatherContainer.innerHTML += '<canvas id="chart" name="gráfica de medidas de hoy"></canvas>'
    
    let ctx = document.getElementById('chart');
    
    let miGrafica = new Chart(ctx, {
        type: 'line',
        data: datos,
        options: opciones
    });
}