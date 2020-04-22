/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito Clavijo, Luis Belloch Martinez
*   FILE:           map.js
*   DATE:           25/03/2020
*   STATE:          WIP
*   ---------------------------------------------------------------- */

function initMap() {
    // Initial map settings
    let options = {
        center: {lat: 28.493408, lng: -14.019035}, // Map center coordinates
        zoom: 17,
        tilt: 0,
        mapTypeId: 'satellite',
        styles: [
            // Hide museums, monuments, etc.
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            },

            // Hide stations, bus stops, etc.
            {
                featureType: 'transit',
                stylers: [{visibility: 'off'}]
            }
        ],
        rotateControl: false,
        mapTypeControl: false,
        streetViewControl: false
    };

    // The map, centered at options
    let map = new google.maps.Map(document.getElementById('map'), options);

    // The polygons, around the markers
    drawTerrain(map);

    // Refresh/update graph
    refreshGraphScript();
}

/**
 *
 * @param selectedPlot
 */
function centerPlot(selectedPlot) {
    fetch('../api/v1.0/plots').then(function (plots) {
        return plots.json();
    }).then(function (plotsJson) {
        let rightPlot = {};
        data.forEach((plot) => {
            // Comparamos el id recibido de la tabla con el de cada parcela recibida del fetch y lo devolvemos a la siguiente funcion
            if (plot.id == selectedPlot) {
                rightPlot = plot;
            }
        });
        let lati = parseFloat(rightPlot.latitude);
        let long = parseFloat(rightPlot.longitude);
        console.log(lati + "," + long)

        // New map settings (centered around the field)
        let options = {
            zoom: 18,
            tilt: 0,
            center: {lat: lati, lng: long},
            mapTypeId: 'satellite',
            styles: [
                // Hide museums, monuments, etc.
                {
                    featureType: 'poi',
                    stylers: [{visibility: "off"}]
                },

                // Hide stations, bus stops, etc.
                {
                    featureType: 'transit',
                    stylers: [{visibility: "off"}]
                }
            ],
            rotateControl: false,
            mapTypeControl: false,
            streetViewControl: false
        };


        // Apply new settings to the map
        let map = new google.maps.Map(document.getElementById('map'), options);

        // Draw probes markers
        showPositions(rightPlot, map);

        // Draw field polygons
        drawTerrain(map, rightPlot.id);
    });
}

/**
 *
 * @param map
 * @param selectedPlotID
 */
function drawTerrain(map, selectedPlotID = null) {

    fetch('../api/v1.0/polygons')
        .then(function (response) {
            // Error checking
            if (response.ok) {
                return response.json();
            }
            else {
                alert('Something went wrong fetching!');
            }
        })
        .then(function (plotJson) {
            let bounds = new google.maps.LatLngBounds();
            plotJson.forEach((plot) => {
                let polygon = new google.maps.Polygon({
                    paths: JSON.parse(plot.plotPath),
                    strokeColor: '#ff8000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2.5,
                    fillColor: '#ff8000',
                    fillOpacity: 0.35,
                    map: map
                });

                if(selectedPlotID !== null) {

                    if (plot.id == selectedPlotID) {
                        polygon.strokeColor = '#00a5ff';
                        polygon.fillColor = '#00a5ff';
                    };
                }

                polygon.getPath().getArray().forEach(function (vertex) {
                    bounds.extend(vertex);
                });
            });
        });
}

function showPositions(selectedPlot, map) {
    // Recoge todas las posiciones de la base de datos
    fetch('../api/v1.0/positions').then(function (data) {
        return data.json();
    }).then(function (dataJson) {
        let plotPositions = [];

        // Guarda en un array las posiciones de la parcela seleccionada y los muestra como marcadores
        dataJson.forEach((pos) => {
            if (`${pos.plot}` == selectedPlot.id) {
                plotPositions.push(pos);
                // Se guarda la posición
                let newPos = new google.maps.LatLng(`${pos.latitude}`, `${pos.longitude}`)
                // Se crean los marcadores
                let marker = new google.maps.Marker({
                    position: newPos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    title: `${pos.id}`,
                });

                marker.addListener('click', function () {
                    // Pone el marcador en marcado
                    document.getElementById('selected-probe').innerHTML = this.title;
                    // Refresca la gráfica
                    refreshGraphScript();
                });
            }
        })

        console.log(plotPositions);
    })
}

function refreshGraphScript() {
    let script = document.createElement("script");
    script.src = 'js/graphic-data.js';
    console.log("Script created");

    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}