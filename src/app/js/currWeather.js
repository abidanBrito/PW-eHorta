/* ----------------------------------------------------------------
*   AUTHOR:         Luis Belloch
*   FILE:           currWeather.js
*   DATE:           05/05/2020
*   STATE:          WIP
*  ---------------------------------------------------------------- */ 

// ----------------------------------------------------------------
// startWeatherPrediction() -> [T]
// Consulta la BDD y recoje los campos del usuario. Los filtra para recoger solo los codigos de municipio únicos
// ----------------------------------------------------------------
function startWeatherPrediction() {
    fetch('../api/v1.0/plots').then(function(answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(function(jsonData) {
        
        console.log(jsonData);
        
        let uniquePlots = [];
        // filtro para buscar codigos de municipio repetidos
        for(plot of jsonData) {
            let rep = 0;
            for(let i = 0; i < jsonData.length; i++) {
                if(plot.codmun == jsonData[i].codmun) {
                    rep++;
                }
            } // for
            if(rep < 2) {
                uniquePlots.push(plot.codmun);
            } // if
        } // for
        for(let i = 0; i < uniquePlots.length; i++) {
            sendRequest(uniquePlots[i]);
        } // for
    }) // then
} // ()

// ----------------------------------------------------------------
// T -> sendRequest()
// Recibe el codigo de municipio y envía la consulta a AEMET
// ----------------------------------------------------------------

function sendRequest(code) {
    
    // en data estaran los datos a enviar
    var data = null;
    
    // se prepara el objeto XML y se configura
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    // cuando se hayan recibido los datos, los envia a readTextFile()
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            readTextFile(this.responseText);
        }
    });
    
    // se prepara el objeto a enviar
    xhr.open("GET", "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/" + code + "?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWlzLmJlbGxvY2htYXJ0aW5lekBnbWFpbC5jb20iLCJqdGkiOiI3MTRkYzA3My0xNDNjLTQyZjMtYjdkMS1hZWMyMGZlMzA2NDEiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTU4ODUyMzY2MCwidXNlcklkIjoiNzE0ZGMwNzMtMTQzYy00MmYzLWI3ZDEtYWVjMjBmZTMwNjQxIiwicm9sZSI6IiJ9.swVtn6pOlDS4maJ6n2Uv7J_RTDxdv88-w3gYTDymZC4");
    // se preparan las cabeceras
    xhr.setRequestHeader("cache-control", "no-cache");
    // se envia
    xhr.send(data);
    
} // ()

// ----------------------------------------------------------------
// T -> readTextFile() -> T
// Recibe la respuesta de la BD de AEMET, lee el archivo de "datos" 
// que recibe en JSON y muestra en consola los datos completos
// ----------------------------------------------------------------

function readTextFile(response) {
    // convierte a json el texto recibido para poder analizarlo mejor
    response = JSON.parse(response);

    // el elemento datos del json es el que nos interesa
    let file = response.datos;
    
    // aqui se guardan los datos recibidos del archivo datos
    var data;
    
    // se crea la consulta al enlace que viene en datos
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    // cuando se han leido los datos, se asignan de forma asincrona a "data" como objeto JSON para poder analizarlo mejor
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                data = allText;
                // Envia los datos recibidos para mostrar
                showData(data);
            }
        }
    }
    rawFile.send(null);
}

// ----------------------------------------------------------------
// T -> showData()
// Recibe el texto con los datos, lo convierte en JSON y lo maqueta
// ----------------------------------------------------------------
function showData(data) {
    
    let dataJson = JSON.parse(data);
    console.log(dataJson);
    
    // Aqui se crearan las tarjetas de predicciones
    let container = document.getElementById("predictionsContainer");
    
    // Se analiza el json y se establecen los datos a mostrar
    // Nombre del municipio
    let locationName = dataJson[0].nombre;
    
    // Elige el icono para el dia
    // >= 11 es nublado y < 11 es soleado
    let weatherStates = dataJson[0].prediccion.dia[0].estadoCielo;
    let date = new Date();
    let hour = date.getHours();
    let weatherState = weatherStates[0].value;
    for(let i = 0; i < weatherStates.length; i++) {
        // Si encuentra la franja horaria correcta o si llega al final
        if(weatherStates[i].periodo >= hour || i == weatherStates.length - 1) {
            weatherState = parseInt(weatherStates[i].value);
            break;
        }
    } // for
    let iconToday = "";
    if(parseInt(weatherState.value) >= 11) {
        iconToday = "img/datalogger/rainfall.svg";
    } else {
        iconToday = "img/datalogger/luminosity.svg";
    }
    
    // Establece la temperatura actual
    let temperatures = dataJson[0].prediccion.dia[0].temperatura;
    let temperature = temperatures[0].value;
    for(let i = 0; i < temperatures.length; i++) {
        // Si encuentra la franja horaria correcta o si llega al final
        if(temperatures[i].periodo >= hour || i == temperatures.length - 1) {
            temperature = temperatures[i].value;
            break;
        }
    } // for
    
    //Establece la precipitacion maxima estimada
    let dayRainfall = dataJson[0].prediccion.dia[0].precipitacion;
    let totalRainfall = 0;
    for(let i = 0; i < dayRainfall.length; i++) {
        // Sometimes letters appear instead of numbers
        if(parseInt(dayRainfall[i].value) >= 0) {
            totalRainfall += parseFloat(dayRainfall[i].value);
        }
    } // for
    
    // Establece las temperaturas maxima y minima
    let maxTemperature = temperatures[0].value;
    for(let i = 0; i < temperatures.length; i++) {
        if(temperatures[i].value > maxTemperature) {
            maxTemperature = temperatures[i].value;
        }
    } // for
    
    let minTemperature = temperatures[0].value;
    for(let i = 0; i < temperatures.length; i++) {
        if(temperatures[i].value < minTemperature) {
            minTemperature = temperatures[i].value;
        }
    } // for
    
    //Establece la probabilidad de precipitacion
    let rainfallProb = dataJson[0].prediccion.dia[0].probPrecipitacion;
    let maxRainfallProb = 0;
    for(let i = 0; i < rainfallProb.length; i++) {
        if(rainfallProb[i].value > maxRainfallProb) {
            maxRainfallProb = rainfallProb[i].value;
        }
    } // for
    
    // Se establecen los estados de las predicciones de los dos proximos dias
    // >= 11 es nublado y < 11 es soleado
    let weatherStatesTomorrow = dataJson[0].prediccion.dia[1].estadoCielo;
    let weatherStateTomorrow = weatherStatesTomorrow[0].value;
    for(let i = 0; i < weatherStatesTomorrow.length; i++) {
        // Si encuentra la franja horaria correcta o si llega al final
        if(weatherStatesTomorrow[i].periodo >= hour || i == weatherStatesTomorrow.length - 1) {
            weatherStateTomorrow = parseInt(weatherStatesTomorrow[i].value);
            break;
        }
    } // for
    let iconTomorrow = "";
    if(parseInt(weatherStateTomorrow.value) >= 11) {
        iconTomorrow = "img/datalogger/rainfall.svg";
    } else {
        iconTomorrow = "img/datalogger/luminosity.svg";
    }
    
    let weatherStatesAfter = dataJson[0].prediccion.dia[1].estadoCielo;
    let weatherStateAfter = weatherStatesAfter[0].value;
    for(let i = 0; i < weatherStatesAfter.length; i++) {
        // Si encuentra la franja horaria correcta o si llega al final
        if(weatherStatesAfter[i].periodo >= hour || i == weatherStatesAfter.length - 1) {
            weatherStateAfter = parseInt(weatherStatesAfter[i].value);
            break;
        }
    } // for
    let iconAfter = "";
    if(parseInt(weatherStateTomorrow.value) >= 11) {
        iconAfter = "img/datalogger/rainfall.svg";
    } else {
        iconAfter = "img/datalogger/luminosity.svg";
    }
    
    // Toma la temperatura minima y maxima de mañana y pasado
    let temperaturesTomorrow = dataJson[0].prediccion.dia[1].temperatura;
    let maxTemperatureTomorrow = temperaturesTomorrow[0].value;
    for(let i = 0; i < temperaturesTomorrow.length; i++) {
        if(temperaturesTomorrow[i].value > maxTemperatureTomorrow) {
            maxTemperatureTomorrow = temperaturesTomorrow[i].value;
        }
    } // for
    let minTemperatureTomorrow = temperaturesTomorrow[0].value;
    for(let i = 0; i < temperaturesTomorrow.length; i++) {
        if(temperaturesTomorrow[i].value < minTemperatureTomorrow) {
            minTemperatureTomorrow = temperaturesTomorrow[i].value;
        }
    } // for
    
    let temperaturesAfter = dataJson[0].prediccion.dia[2].temperatura;
    let maxTemperatureAfter = temperaturesAfter[0].value;
    for(let i = 0; i < temperaturesAfter.length; i++) {
        if(temperaturesAfter[i].value > maxTemperatureAfter) {
            maxTemperatureAfter = temperaturesAfter[i].value;
        }
    } // for
    let minTemperatureAfter = temperaturesAfter[0].value;
    for(let i = 0; i < temperaturesAfter.length; i++) {
        if(temperaturesAfter[i].value < minTemperatureAfter) {
            minTemperatureAfter = temperaturesAfter[i].value;
        }
    } // for
    
    // Se crea la tarjeta en el container
    /* ESTRUCTURA
    <section id="predictionsContainer">
        <!-- Tajetas con las predicciones -->
        <section class="container">
            <div class="predictionLocation">Ademuz</div>
            <section class="todayData">
                <img class="todayIcon" src="img/datalogger/luminosity.svg">
                <div class="secondDataColumn">
                    <div class="predictionTemperature">
                        <img src="img/datalogger/temperature.svg">11 ºC
                    </div>
                    <div class="predictionRainfall">
                        <img src="img/datalogger/rainfall.svg">0 L/m2</div></div><div class="thirdDataColumn">
                    <div class="maxTemperature">MAX: 9ºC</div>
                    <div class="minTemperature">MIN: 10ºC</div>
                    <div class="rainfallProbability">PROB: 55%</div>
                </div>
            </section>
            <div class="weatherSeparator"></div>
            <section class="weatherPredictions">
                <div class="tomorrowPrediction">
                    <div class="tomorrowDay">Mañana</div>
                    <img class="tomorrowIcon" src="">
                    <div class="tomorrowTemp">12|21ºC</div>
                </div>
                <div class="afterPrediction">
                    <div class="afterDay">Mañana</div>
                    <img class="afterIcon" src="">
                    <div class="afterTemp">12|21ºC</div>
                </div>
                
            </section>
        </section>
    </section>
    */
    container.innerHTML += 
        '<section class="container">' + 
        '<div class="predictionLocation">' + locationName + '</div><section class="todayData"><img class="todayIcon" src="' + iconToday + '"><div class="secondDataColumn"><div class="predictionTemperature"><img src="img/datalogger/temperature.svg">' + temperature + ' ºC</div><div class="predictionRainfall"><img src="img/datalogger/rainfall.svg">' + totalRainfall + ' L/m2</div></div>' + 
        '<div class="thirdDataColumn"><div class="maxTemperature">MAX: ' + maxTemperature + 'ºC</div><div class="minTemperature">MIN: ' + minTemperature + 'ºC</div><div class="rainfallProbability">PROB: ' + maxRainfallProb + '%</div>' +   
        '</div>' +
        '</section><div class="weatherSeparator"></div>' + 
        '<section class="weatherPredictions"><div class="tomorrowPrediction"><div class="tomorrowDay">Mañana</div><img src="' + iconTomorrow + '"><div class="tomorrowTemp">' + maxTemperatureTomorrow + '|' + minTemperatureTomorrow + 'ºC</div></div><div class="afterPrediction"><div class="afterDay">Pasado mañana</div><img src="' + iconAfter + '"><div class="afterTemp">' + minTemperatureAfter + '|' + maxTemperatureAfter + 'ºC</div></div>'
        +
        '</section></section>';
}