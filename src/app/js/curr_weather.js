/* ----------------------------------------------------------------
*   AUTHOR:         Luis Belloch
*   FILE:           currWeather.js
*   DATE:           05/05/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */

// ----------------------------------------------------------------
// startWeatherPrediction() -> [T]
// Consulta la BDD y recoje los campos del usuario. Los filtra para recoger solo los codigos de municipio únicos
// ----------------------------------------------------------------
function startWeatherPrediction() {
    fetch('../api/v1.0/plots').then(function(answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(async function(jsonData) {

        let uniquePlots = [];
        // filtro para buscar codigos de municipio repetidos
        for(plot of jsonData) {
            if(contains(plot.codmun, uniquePlots) == false) {
                uniquePlots.push(plot.codmun);
            }
        } // for
        
        // Pasa cada codigo de municipio y lo añade al selector
        for(plotCode of uniquePlots) {
            await addOption(plotCode);
        }
        
        // Siempre se queda el primero del selector seleccionado
        showData(uniquePlots[0]);
        // La grafica se inicia con el mismo en la temperatura como base
        showTemperature(uniquePlots[0]);
        
    })
} // ()

// ----------------------------------------------------------------
// T, [T] -> contains() -> T/F
// Returns true if the element is in the list and false if not
// ----------------------------------------------------------------
function contains(input, list) {
    for(let i = 0; i < list.length; i++) {
        if(input == list[i]) {
            return true;
        }
    } // for
    return false;
}

// ----------------------------------------------------------------
// T -> sendRequest()
// Recibe el codigo de municipio y envía la consulta a AEMET.
// ----------------------------------------------------------------

function sendRequest(code) {

    return new Promise(resolve => {
        // en data estaran los datos a enviar
        let data = null;

        // se prepara el objeto XML y se configura
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        // cuando se hayan recibido los datos, los envia a readTextFile()
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                resolve(this.responseText);
            }
        });

        // se prepara el objeto a enviar
        xhr.open("GET", "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/" + code + "?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsdWlzLmJlbGxvY2htYXJ0aW5lekBnbWFpbC5jb20iLCJqdGkiOiI3MTRkYzA3My0xNDNjLTQyZjMtYjdkMS1hZWMyMGZlMzA2NDEiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTU4ODUyMzY2MCwidXNlcklkIjoiNzE0ZGMwNzMtMTQzYy00MmYzLWI3ZDEtYWVjMjBmZTMwNjQxIiwicm9sZSI6IiJ9.swVtn6pOlDS4maJ6n2Uv7J_RTDxdv88-w3gYTDymZC4");
        // se preparan las cabeceras
        xhr.setRequestHeader("cache-control", "no-cache");
        // se envia
        xhr.send(data);
    });
} // ()

// ----------------------------------------------------------------
// T -> readTextFile() -> T
// Recibe la respuesta de la BD de AEMET, lee el archivo de "datos"
// que recibe en JSON y muestra en consola los datos completos
// ----------------------------------------------------------------

function readTextFile(response) {
    
    return new Promise(resolve => {
        // convierte a json el texto recibido para poder analizarlo mejor
        response = JSON.parse(response);

        // el elemento datos del json es el que nos interesa
        let file = response.datos;

        // aqui se guardan los datos recibidos del archivo datos
        let data;

        // se crea la consulta al enlace que viene en datos
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        // cuando se han leido los datos, se asignan de forma asincrona a "data" como objeto JSON para poder analizarlo mejor
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    let allText = rawFile.responseText;
                    data = allText;
                    // Separa si es para mostrar o para el selector
                    resolve(data);
                }
            }
        }
        rawFile.send(null);
    });
} // ()

// ----------------------------------------------------------------
// T -> addOption()
// Recibe el texto con los datos, lo convierte en JSON y lo añade al selector
// ----------------------------------------------------------------
async function addOption(code) {
    
    let response = await sendRequest(code);
    
    let data = await readTextFile(response)
    
    let dataJson = JSON.parse(data);
    
    let selector = document.getElementById("select-weather");
    
    // Se analiza el json y se establecen los datos a mostrar
    // Nombre del municipio y su provincia
    let locationName = dataJson[0].nombre;
    let provinceName = dataJson[0].provincia;
    
    // Fecha y hora de las medidas tomadas
    let measuresTimestamp = dataJson[0].elaborado;
    
    selector.innerHTML += '<option name="' + locationName + ' (' + provinceName + ')' + '" value="' + code + '">' + locationName + ' (' + provinceName + ')' + "</option>";
    
    return;
}

// ----------------------------------------------------------------
// T -> showData()
// Recibe el texto con los datos, lo convierte en JSON y lo maqueta
// ----------------------------------------------------------------
async function showData(code) {
    
    let response = await sendRequest(code);
    
    let data = await readTextFile(response)

    let dataJson = JSON.parse(data);
    console.log(dataJson);

    // Aqui se crearan las tarjetas de predicciones
    let container = document.getElementById("predictions-container");

    // Se analiza el json y se establecen los datos a mostrar
    // Nombre del municipio y su provincia
    let locationName = dataJson[0].nombre;
    let provinceName = dataJson[0].provincia;
    
    // Fecha y hora de las medidas tomadas
    let measuresTimestamp = dataJson[0].elaborado;

    // --------------------------------------------------
    /* TODAY */
    // --------------------------------------------------
    
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
        if(parseFloat(dayRainfall[i].value) >= 0) {
            totalRainfall += parseFloat(dayRainfall[i].value);
        }
    } // for
    totalRainfall = totalRainfall.toFixed(0);

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
    
    // Los valores de viento estan alternados en los indices pares. Averiguamos la racha maxima
    let wind = dataJson[0].prediccion.dia[0].vientoAndRachaMax;
    let maxWind = 0;
    for(let i = 0; i < wind.length; i++) {
        if(i%2 == 0) {
            if(wind[i].velocidad[0] > maxWind) {
            maxWind = wind[i].velocidad[0];
            }
        }
    } // for
    
    // De la humedad averiguamos su valor medio
    let humidity = dataJson[0].prediccion.dia[0].humedadRelativa;
    let totalHum = 0;
    for(let i = 0; i < humidity.length; i++) {
        totalHum += parseFloat(humidity[i].value);
    } // for
    let avgHum = (totalHum/(humidity.length)).toFixed(0);
    
    // --------------------------------------------------
    /* TOMORROW */
    // --------------------------------------------------

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
    // Establece la temperatura de mañana a esta hora
    let temperatureTomorrow = temperaturesTomorrow[0].value;
    for(let i = 0; i < temperatures.length; i++) {
        // Si encuentra la franja horaria correcta o si llega al final
        if(temperaturesTomorrow[i].periodo >= hour || i == temperaturesTomorrow.length - 1) {
            temperatureTomorrow = temperaturesTomorrow[i].value;
            break;
        }
    } // for
    
    //Establece la precipitacion maxima estimada
    let tomorrowRainfall = dataJson[0].prediccion.dia[1].precipitacion;
    let totalRainfallTomorrow = 0;
    for(let i = 0; i < tomorrowRainfall.length; i++) {
        // Sometimes letters appear instead of numbers
        if(parseFloat(tomorrowRainfall[i].value) >= 0) {
            totalRainfallTomorrow += parseFloat(tomorrowRainfall[i].value);
        }
    } // for
    totalRainfallTomorrow = totalRainfallTomorrow.toFixed(0);
    
    //Establece la probabilidad de precipitacion
    let rainfallProbTomorrow = dataJson[0].prediccion.dia[1].probPrecipitacion;
    let maxRainfallProbTomorrow = 0;
    for(let i = 0; i < rainfallProbTomorrow.length; i++) {
        if(rainfallProbTomorrow[i].value > maxRainfallProbTomorrow) {
            maxRainfallProbTomorrow = rainfallProbTomorrow[i].value;
        }
    } // for
    
    // Los valores de viento estan alternados en los indices pares. Averiguamos la racha maxima
    let windTomorrow = dataJson[0].prediccion.dia[1].vientoAndRachaMax;
    let maxWindTomorrow = 0;
    for(let i = 0; i < windTomorrow.length; i++) {
        if(i%2 == 0) {
            if(windTomorrow[i].velocidad[0] > maxWindTomorrow) {
            maxWindTomorrow = windTomorrow[i].velocidad[0];
            }
        }
    } // for
    
    // De la humedad averiguamos su valor medio
    let humidityTomorrow = dataJson[0].prediccion.dia[1].humedadRelativa;
    let totalHumTomorrow = 0;
    for(let i = 0; i < humidityTomorrow.length; i++) {
        totalHumTomorrow += parseFloat(humidityTomorrow[i].value);
    } // for
    let avgHumTomorrow = (totalHumTomorrow/(humidityTomorrow.length)).toFixed(0);
    
    // --------------------------------------------------
    /* AFTER */
    // --------------------------------------------------
    
    // Se establecen los estados de las predicciones de los dos proximos dias
    // >= 11 es nublado y < 11 es soleado
    let weatherStatesAfter = dataJson[0].prediccion.dia[2].estadoCielo;
    let weatherStateAfter = weatherStatesAfter[0].value;
    for(let i = 0; i < weatherStatesAfter.length; i++) {
        // Si encuentra la franja horaria correcta o si llega al final
        if(weatherStatesAfter[i].periodo >= hour || i == weatherStatesAfter.length - 1) {
            weatherStateAfter = parseInt(weatherStatesAfter[i].value);
            break;
        }
    } // for
    let iconAfter = "";
    if(parseInt(weatherStateAfter.value) >= 11) {
        iconAfter = "img/datalogger/rainfall.svg";
    } else {
        iconAfter = "img/datalogger/luminosity.svg";
    }

    // Toma la temperatura minima y maxima de mañana y pasado
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
    // Establece la temperatura de mañana a esta hora
    let temperatureAfter = temperaturesAfter[0].value;
    for(let i = 0; i < temperatures.length; i++) {
        // Si encuentra la franja horaria correcta o si llega al final
        if(temperaturesAfter[i].periodo >= hour || i == temperaturesAfter.length - 1) {
            temperatureAfter = temperaturesAfter[i].value;
            break;
        }
    } // for
    
    //Establece la precipitacion maxima estimada
    let AfterRainfall = dataJson[0].prediccion.dia[2].precipitacion;
    let totalRainfallAfter = 0;
    for(let i = 0; i < AfterRainfall.length; i++) {
        // Sometimes letters appear instead of numbers
        if(parseFloat(AfterRainfall[i].value) >= 0) {
            totalRainfallAfter += parseFloat(AfterRainfall[i].value);
        }
    } // for
    totalRainfallAfter = totalRainfallAfter.toFixed(0);
    
    //Establece la probabilidad de precipitacion
    let rainfallProbAfter = dataJson[0].prediccion.dia[2].probPrecipitacion;
    let maxRainfallProbAfter = 0;
    for(let i = 0; i < rainfallProbAfter.length; i++) {
        if(rainfallProbAfter[i].value > maxRainfallProbAfter) {
            maxRainfallProbAfter = rainfallProbAfter[i].value;
        }
    } // for
    
    // Los valores de viento estan alternados en los indices pares. Averiguamos la racha maxima
    let windAfter = dataJson[0].prediccion.dia[2].vientoAndRachaMax;
    let maxWindAfter = 0;
    for(let i = 0; i < windAfter.length; i++) {
        if(i%2 == 0) {
            if(windAfter[i].velocidad[0] > maxWindAfter) {
            maxWindAfter = windAfter[i].velocidad[0];
            }
        }
    } // for
    
    // De la humedad averiguamos su valor medio
    let humidityAfter = dataJson[0].prediccion.dia[2].humedadRelativa;
    let totalHumAfter = 0;
    for(let i = 0; i < humidityAfter.length; i++) {
        totalHumAfter += parseFloat(humidityAfter[i].value);
    } // for
    let avgHumAfter = (totalHumAfter/(humidityAfter.length)).toFixed(0);
    

    // Se crea la tarjeta en el container
    /* ESTRUCTURA
    <section class="predictions-container">
        <div class="prediction-location">Valencia (Valencia)</div>
            <div class="weather-separator"></div>
            <section class="day-data">
                <div class="first-data-column>
                    <img class="day-icon white-filter" src="img/datalogger/luminosity.svg">
                    
                </div>
                <div class="second-data-column">
                    <div class="prediction-temperature">
                        <img src="img/datalogger/temperature.svg" class="white-filter">
                    </div>
                    <div class="prediction-rainfall">
                        <img src="img/datalogger/rainfall.svg" class="white-filter">
                    </div>
                </div>
                <div class="third-data-column">
                    <div class="max-temperature-today">max: 9ºC</div>
                    <div class="min-temperature-today">min: 10ºC</div>
                    <div class="rainfall-probability-today">prob: 55%</div>
                </div>
            </section>
            <div class="weather-separator"></div>
            <section class="day-data">
                <img class="day-icon white-filter" src="img/datalogger/luminosity.svg">
                <div class="second-data-column">
                    <div class="prediction-temperature">
                        <img src="img/datalogger/temperature.svg" class="white-filter">
                    </div>
                    <div class="prediction-rainfall">
                        <img src="img/datalogger/rainfall.svg" class="white-filter">
                    </div>
                </div>
                <div class="third-data-column">
                    <div class="max-temperature-today">max: 9ºC</div>
                    <div class="min-temperature-today">min: 10ºC</div>
                    <div class="rainfall-probability-today">prob: 55%</div>
                </div>
            </section>
            <div class="weather-separator"></div>
            <section class="day-data">
                <img class="day-icon white-filter" src="img/datalogger/luminosity.svg">
                <div class="second-data-column">
                    <div class="prediction-temperature">
                        <img src="img/datalogger/temperature.svg" class="white-filter">
                    </div>
                    <div class="prediction-rainfall">
                        <img src="img/datalogger/rainfall.svg" class="white-filter">
                    </div>
                </div>
                <div class="third-data-column">
                    <div class="max-temperature-today">max: 9ºC</div>
                    <div class="min-temperature-today">min: 10ºC</div>
                    <div class="rainfall-probability-today">prob: 55%</div>
                </div>
            </section>
            <div class="timestamp"></div>
    </section>
    */
    container.innerHTML =
            '<div class="day-text"><span class="lang" id="today">Hoy</span></div>'+
            '<section class="day-data">'+
                '<div class="first-data-column">'+
                    '<img class="day-icon white-filter" alt="tiempo de hoy" src="' + iconToday + '"><span class="curr-temp">'+
                    temperature + ' ºC</span>'+
                '</div>' +
                '<div class="second-data-column">'+
                    '<div class="prediction-temperature">'+
                        '<img src="img/datalogger/temperature.svg" class="white-filter" alt="temperatura de hoy">' +
                        '<span class="max-min-temp">' +
                            maxTemperature + ' ºC<br>' +
                            minTemperature + ' ºC' +
                        '</span>' +
                    '</div>'+
                    '<div class="prediction-rainfall">'+
                        '<img src="img/datalogger/rainfall.svg" class="white-filter" alt="lluvia de hoy">'+
                        totalRainfall +' mm'+
                    '</div>'+
                '</div>'+
                '<div class="third-data-column">'+
                    '<div class="misc-data"><span class="lang" id="prob">prob</span>: ' +           
                        maxRainfallProb + '%<br>'+
                    '<span class="lang" id="wind">viento</span>: ' + maxWind + ' km/h<br>' +
                    '<span class="lang" id="humidty">vumedad</span>: '+ avgHum + '%<br>' +
                    '</div>' +
                '</div>'+
            '</section>'+
            '<div class="weather-separator"></div>' + 
            '<div class="day-text"><span class="lang" id="tomorrow">Mañana</span></div>'+
            '<section class="day-data">'+
                '<div class="first-data-column">'+
                    '<img class="day-icon white-filter" alt="tiempo de mañana" src="' + iconTomorrow + '"><span class="curr-temp">'+
                    temperatureTomorrow + ' ºC</span>'+
                '</div>' +
                '<div class="second-data-column">'+
                    '<div class="prediction-temperature">'+
                        '<img src="img/datalogger/temperature.svg" class="white-filter" alt="temperatura de mañana">' +
                        '<span class="max-min-temp">' +
                            maxTemperatureTomorrow + ' ºC<br>' +
                            minTemperatureTomorrow + ' ºC' +
                        '</span>' +
                    '</div>'+
                    '<div class="prediction-rainfall">'+
                        '<img src="img/datalogger/rainfall.svg" class="white-filter" alt="lluvia de mañana">'+
                        totalRainfallTomorrow +' mm'+
                    '</div>'+
                '</div>'+
                '<div class="third-data-column">'+
                    '<div class="misc-data"><span class="lang" id="prob">prob</span>: ' +           
                        maxRainfallProbTomorrow + '%<br>'+
                    '<span class="lang" id="wind">viento</span>: ' + maxWindTomorrow + ' km/h<br>' +
                    '<span class="lang" id="humidty">vumedad</span>: '+ avgHumTomorrow + '%<br>' +
                    '</div>' +
                '</div>'+
            '</section>'+
            '<div class="weather-separator"></div>' + 
            '<div class="day-text"><span class="lang" id="after_tomorrow">Pasado Mañana</span></div>'+
            '<section class="day-data">'+
                '<div class="first-data-column">'+
                    '<img class="day-icon white-filter" alt="tiempo de pasado mañana" src="' + iconAfter + '"><span class="curr-temp">'+
                    temperatureAfter + ' ºC</span>'+
                '</div>' +
                '<div class="second-data-column">'+
                    '<div class="prediction-temperature">'+
                        '<img src="img/datalogger/temperature.svg" class="white-filter" alt="temperatura de pasado mañana">' +
                        '<span class="max-min-temp">' +
                            maxTemperatureAfter + ' ºC<br>' +
                            minTemperatureAfter + ' ºC' +
                        '</span>' +
                    '</div>'+
                    '<div class="prediction-rainfall">'+
                        '<img src="img/datalogger/rainfall.svg" class="white-filter" alt="lluvia de pasado mañana">'+
                        totalRainfallAfter +' mm'+
                    '</div>'+
                '</div>'+
                '<div class="third-data-column">'+
                    '<div class="misc-data"><span class="lang" id="prob">prob</span>: ' +           
                        maxRainfallProbAfter + '%<br>'+
                    '<span class="lang" id="wind">viento</span>: ' + maxWindAfter + ' km/h<br>' +
                    '<span class="lang" id="humidty">vumedad</span>: '+ avgHumAfter + '%<br>' +
                    '</div>' +
                '</div>'+
            '</section>'+
        '<div class="timestamp">' + measuresTimestamp + '</div>';
    
    // Translate new added 
    prepareTranslation();
}

//
// main()
//
startWeatherPrediction();