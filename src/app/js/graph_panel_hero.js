/* ----------------------------------------------------------------
*   AUTHOR:         Abidán Brito
*   FILE:           graph_panel_hero.js
*   DATE:           14/06/2020
*   STATE:          WIP
*  ---------------------------------------------------------------- */ 

// -------------------------------------------------
// main()
// -------------------------------------------------
// Create a new ChartJS graph at the start

var chartData = {
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
            pointRadius: 5,
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
            pointRadius: 5,
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
            pointRadius: 5,
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
            pointRadius: 5,
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
            pointRadius: 5,
            borderWidth: 0,
            hidden: true
        },
    ]
};

var chartOptions = {
    scales: {
        yAxes: [{
            //los datos se apilan y se suman entre ellos
            stacked: false,
            ticks: {
                beginAtZero: true
            },
            gridLines: {
                lineWidth: 0,
                drawBorder: true
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

var ctx = document.getElementById('myChart');
var myChart = new chartData(ctx, {
    type: 'line',
    data: chartData,
    options: chartOptions
});

/* It opens up the graph view */
function showGraph() {
    // Hide the map
    let map = document.getElementById("map");
    map.style.display = "none";

    // Show the graph
    let graph = document.getElementById("app");
    graph.style.display = "block";
}

/* It opens up the full screen map view */
function showMap() {
    // Hide the graph
    let graph = document.getElementById("app");
    graph.style.display = "none";

    // Show the map
    let map = document.getElementById("map");
    map.style.display = "block";
    
    // Show informative banner on top
    const panel = document.getElementById('map-floating-panel').style.display = 'flex';
}

// Measurement buttons behaviour
function toggleButton(btn) {
    if(btn.className == "measure-btn-active") {
        btn.className = "measure-btn";
    }
    else {
        btn.className = "measure-btn-active";
    }

    filterMeasurements(btn);
}

function displayData(data) {
    for (let i = 0; i < data.length; ++i) {
        if(data[i] != 0) {
            if(allMagnitudes[i] == data[i]) {
                allMagnitudes[i] = 0;
            }
            else {
                allMagnitudes[i] = data[i];
            }
        }
    }

    myChart.update();
}