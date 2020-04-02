//Obtener las medidas del servidor
fetch('../api/v1.0/measurements').then(function (r) {
    return r.json();
}).then(function (j) {
    // Get selected position
    let probe = document.getElementById('selectedProbe');
    let id = parseInt(probe.textContent);
    
    // Get start and end dates
    let startDate = document.getElementById('startDate').value;
    let endDate = document.getElementById('endDate').value;
    
    dataProcess(j, id, startDate, endDate);
    
});

function dataProcess(data, positionId, startDate, endDate) {
    console.log("Graphic started");
    data = data.sort(function (a, b) {
        if (a.datetime < b.datetime) return -1;
        if (a.datetime > b.datetime) return 1;
        return 0;
    });

    console.log(positionId);
    
    // Default dates
    if(endDate == "") {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        
        endDate = today;
    }
    
    console.log(startDate);
    console.log(endDate);
    
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
    datos.datasets[0].data = salinity;
    datos.datasets[1].data = salinity;
    datos.datasets[2].data = humidity;
    datos.datasets[3].data = luminosity;
    datos.datasets[4].data = temperature;
    
    CrearGrafica();
}

var datos = {
    // 0 = salinity
    // 1 = rain
    // 2 = humidty
    // 3 = luminosity
    // 4 = temperature
    datasets: [
        {
            label: 'Salinidad',
            data: [],
            fill: false,
            backgroundColor: 'rgba(156, 157, 181, 0.6)',
            borderColor: 'rgb(156, 157, 181)',
            //lineas rectas
            lineTension: 0,
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
        },
        {
            label: 'Lluvia',
            data: [],
            fill: false,
            backgroundColor: 'rgba(26, 29, 112, 0.6)',
            borderColor: 'rgb(26, 29, 112)',
            //lineas rectas
            lineTension: 0,
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
        },
        {
            label: 'Humedad',
            data: [],
            fill: false,
            backgroundColor: 'rgba(38, 47, 255, 0.6)',
            borderColor: 'rgb(38, 47, 255)',
            //lineas rectas
            lineTension: 0,
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
        },
        {
            label: 'Luminosidad',
            data: [],
            fill: false,
            backgroundColor: 'rgba(247, 181, 0, 0.6)',
            borderColor: 'rgb(247, 181, 0)',
            //lineas rectas
            lineTension: 0,
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
        },
        {
            label: 'Temperatura',
            data: [],
            fill: false,
            backgroundColor: 'rgba(247, 70, 0, 0.6)',
            borderColor: 'rgb(247, 70, 0)',
            //lineas rectas
            lineTension: 0,
            //tipo de punto
            pointStyle: 'circle',
            //tamaño del punto
            pointRadius: 10,
        },
    ]
};

var opciones = {
    scales: {
        yAxes: [{
            //los datos se apilan y se suman entre ellos
            stacked: false
        }]
    },
    legend: {
        position: 'bottom',
        align: 'center',
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

function CrearGrafica() {
    let ctx = document.getElementById('chart');
    let chart = new Chart(ctx, {
        type: 'line',
        data: datos,
        options: opciones
    });
    chart.update();
}