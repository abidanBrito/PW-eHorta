/* ----------------------------------------------------------------
*   AUTHOR:         Luis Belloch
*   FILE:           graphic_weather.js
*   DATE:           28/05/2020
*   STATE:          WIP
*  ---------------------------------------------------------------- */ 
// ----------------------------------------------------------------
// T -> startGraph()
// Recibe el texto con los datos, lo convierte en JSON y lo añade al selector
// ----------------------------------------------------------------
async function startGraph(code) {
    
    let response = await sendRequest(code);
    
    let data = await readTextFile(response)
    
    let dataJson = JSON.parse(data);
    
    procesarDatos(dataJson)
}

function procesarDatos(dataJson) {
    
    let tempValues = [];
    let temperatures = dataJson[0].prediccion.dia[0].temperatura;
    for(let i = 0; i < temperatures.length; i++) {
        tempValues.push(temperatures[0].value);
    } // for
    
    datos.datasets[0] = tempValues;
    
    CrearGrafica();
}

let datos = {
    datasets: [
        {
            label: 'ventas',
            data: [],
            fill: true,
            backgroundColor: 'rgba(255,69,34, 0.6)',
            borderColor: 'rgb(255,110,86)',
            //linea punteada
            borderDash: [5,2],
            //lineas rectas
            lineTension: 0,
            //tipo de punto
            pointStyle: 'rectRot',
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
    }
    
};

function CrearGrafica() {
    let ctx = document.getElementById('chart');
    let miGrafica = new Chart(ctx, {
        type: 'line',
        data: datos,
        options: opciones
    });
}