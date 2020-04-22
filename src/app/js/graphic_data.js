/* ----------------------------------------------------------------
*   AUTHOR:         Luis Belloch
*   FILE:           graphic_data.js
*   DATE:           14/04/2020
*   STATE:          WIP
*  ---------------------------------------------------------------- */ 

//Abrir mapa
function openMap() {
    console.log("Opening map");
    // Open the map and close the graph
    let graph = document.getElementById("app");
    graph.style.display = "none";
    let map = document.getElementById("map");
    map.style.display = "block";
}

//Cerrar mapa
function closeMap() {
    console.log("Closing map");
    // Open the graph and close the map
    let graph = document.getElementById("app");
    graph.style.display = "block";
    let map = document.getElementById("map");
    map.style.display = "none";
}

// Measurement buttons behaviour
function activateButton(btn) {
    if(btn.className == "measure-btn") {
        let activeButtons = document.getElementsByClassName("measure-btn-active");
        let i;
        for (i = 0; i < activeButtons.length; i++) {
            activeButtons[i].className = "measure-btn";
        } 
        btn.className = "measure-btn-active";
    }
    filterMeasurements(btn);
}

// Recoger qué botón de medidas está activado y devuelve el índice correspondiente
// 0 Humedad
// 1 Tempertaura
// 2 Luminosidad
// 3 Precipitación
// 4 Salinidad
function filterMeasurements(btn) {
    if(btn.id == "mobile-btn-hum" || btn.id == "desktop-btn-hum") {
        updateFilter(0)
    }
    if(btn.id == "mobile-btn-tem" || btn.id == "desktop-btn-tem") {
        updateFilter(1)
    }
    if(btn.id == "mobile-btn-lum" || btn.id == "desktop-btn-lum") {
        updateFilter(2)
    }
    if(btn.id == "mobile-btn-rai" || btn.id == "desktop-btn-rai") {
        updateFilter(3)
    }
    if(btn.id == "mobile-btn-sal" || btn.id == "desktop-btn-sal") {
        updateFilter(4)
    }
}

// Actualiza el filtro de datos
function updateFilter(dataType) {
    console.log("Data type: " + dataType);
    // Se muestra solo el dato deseado
    for(let i = 0; i < 5; i++) {
        datos.datasets[i].hidden = true;
    }
    datos.datasets[dataType].hidden = false;
    
    CrearGrafica();
}

//Obtener las medidas del servidor
function getMeasurements() {
    fetch('../api/v1.0/measurements').then(function (r) {
        return r.json();
    }).then(function (j) {
    
        // Get selected position
        let probe = document.getElementById('selected-probe');
        let id = parseInt(probe.textContent);
        console.log("Current position: " + id);
    
        // Get start and end dates
        let startDate = document.getElementById('start-date').value;
        let endDate = document.getElementById('end-date').value;
    
        // Close map in mobile mode when a probe is selected
        if(window.innerWidth <= 775 && id >= 0) {
            closeMap();
        }
    
        dataProcess(j, id, startDate, endDate);
    
    });
}


// Asocia los datos a los medidores de la gráfica
function dataProcess(data, positionId, startDate, endDate) {
    console.log("Graphic started");
    data = data.sort(function (a, b) {
        if (a.datetime < b.datetime) return -1;
        if (a.datetime > b.datetime) return 1;
        return 0;
    });
    
    // Default dates
    if(endDate == "") {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        
        endDate = today;
    }
    
    console.log("Dates: " + startDate + " | " + endDate);
    
    // filter only the data from de selected position
    let posData = [];
    data.forEach(function (dataJson) {
        if(dataJson.position == positionId && dataJson.datetime > startDate && dataJson.datetime < endDate) {
            posData.push(dataJson);
        }
    });
    
    console.log(posData);

    // recorrer los datos
    let times = [];
    let salinity = [];
    let rain = [];
    let humidity = [];
    let luminosity = [];
    let temperature = [];
    posData.forEach(function (dataJson) {
        let i = times.indexOf(dataJson.fecha);
        // Si es -1 es que no existe en el array y por tanto lo creamos tanto en fechas como totales.
        if(i < 0) {
            times.push(dataJson.datetime);
            // El dato es un string, así que se tiene que convertir a float primero
            salinity.push(parseFloat(dataJson.salinity));
            rain.push(parseFloat(dataJson.rain));
            humidity.push(parseFloat(dataJson.humidity));
            luminosity.push(parseFloat(dataJson.luminosity));
            temperature.push(parseFloat(dataJson.temperature));
            
        } else {
            salinity[i] += parseFloat(dataJson.salinity);
            rain[i] += parseFloat(dataJson.rain);
            humidity[i] += parseFloat(dataJson.humidity);
            luminosity[i] += parseFloat(dataJson.luminosity);
            temperature[i] += parseFloat(dataJson.temperature);
        }
    });
    // asignamos los datos
    datos.labels = times;
    datos.datasets[0].data = humidity;
    datos.datasets[1].data = temperature;
    datos.datasets[2].data = luminosity;
    datos.datasets[3].data = rain;
    datos.datasets[4].data = salinity;
    
    updateFilter(0);
    
    CrearGrafica();
}

var datos = {
    // 0 = humidity
    // 1 = temperature
    // 2 = luminosity
    // 3 = rainfall
    // 4 = salinity
    datasets: [
        {
            label: '%',
            data: [],
            fill: true,
            //lineas rectas
            lineTension: 0,
            //colores
            backgroundColor: 'rgb(0, 157, 217, 0.5)',
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
            hidden: true
        },
        {
            label: 'ºC',
            data: [],
            fill: true,
            //lineas rectas
            lineTension: 0,
            //colores
            backgroundColor: 'rgb(0, 157, 217, 0.5)',
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
            hidden: true
        },
        {
            label: '%',
            data: [],
            fill: true,
            //lineas rectas
            lineTension: 0,
            //colores
            backgroundColor: 'rgb(0, 157, 217, 0.5)',
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
            hidden: true
        },
        {
            label: 'L/m2',
            data: [],
            fill: true,
            //lineas rectas
            lineTension: 0,
            //colores
            backgroundColor: 'rgb(0, 157, 217, 0.5)',
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
            hidden: true
        },
        {
            label: 'g/L',
            data: [],
            fill: true,
            //lineas rectas
            lineTension: 0,
            //colores
            backgroundColor: 'rgb(0, 157, 217, 0.5)',
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
            hidden: true
        },
    ]
};

var opciones = {
    scales: {
        yAxes: [{
            //los datos se apilan y se suman entre ellos
            stacked: false,
            ticks: {
                // Pone la magnitud correspondiente en el eje Y
                callback: function(value, index, values) {
                    for(let i = 0; i < 5; i++) {
                        if(datos.datasets[i].hidden != true) {
                            return (value + datos.datasets[i].label);
                        }
                    }
                }
            }
        }],
        xAxes: [{
            ticks: {
                display: false //this will remove only the label
            }
        }]
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
    maintainAspectRatio: false
    
};
/* Crea la gráfica */
function CrearGrafica() {
    let ctx = document.getElementById('chart');
    let chart = new Chart(ctx, {
        type: 'line',
        data: datos,
        options: opciones
    });
    chart.update();
}

// ------------------------------
// main()
// ------------------------------
getMeasurements();