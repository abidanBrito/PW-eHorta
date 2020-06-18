/* ----------------------------------------------------------------
 *   AUTHOR:         Abidan Brito Clavijo, Luis Belloch Martinez, 
 *                   Daniel Burruchaga (threshold)
 *   FILE:           map.js
 *   DATE:           25/03/2020
 *   STATE:          WIP
 *   ---------------------------------------------------------------- */

// It initializes a google maps instance and draws all user fields(plots).
function initMap() {
    // Initial map settings
    let zoomLevel = 17; 
    if (window.innerWidth < 740) {
        zoomLevel = 18;
    }
    let options = {
        center: {
            lat: 28.493408,
            lng: -14.019035
        }, // Map center coordinates

        zoom: zoomLevel,
        tilt: 0,
        mapTypeId: 'satellite',
        styles: [
            // Hide museums, monuments, etc.
            {
                featureType: 'poi',
                stylers: [{
                    visibility: 'off'
                }]
            },

            // Hide stations, bus stops, etc.
            {
                featureType: 'transit',
                stylers: [{
                    visibility: 'off'
                }]
            }
        ],
        rotateControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
    };

    // The map, centered at options
    let map = new google.maps.Map(document.getElementById('map'), options);

    // The polygons, around the markers
    drawTerrain(map);

    // Refresh/update graph
    refreshGraphScript();
}

// It updates the map by centering it around the selected field(plot).
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

        // New map settings (centered around the field)
        let options = {
            zoom: 18,
            tilt: 0,
            center: {
                lat: lati,
                lng: long
            },
            mapTypeId: 'satellite',
            styles: [
                // Hide museums, monuments, etc.
                {
                    featureType: 'poi',
                    stylers: [{
                        visibility: "off"
                    }]
                },

                // Hide stations, bus stops, etc.
                {
                    featureType: 'transit',
                    stylers: [{
                        visibility: "off"
                    }]
                }
            ],
            rotateControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
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

// It draws all fields (polygons) in orange, and the selected field in blue
function drawTerrain(map, selectedPlotID = null) {
    // Unique to threshold page, no changes are made on the panel hero
    let threshold_Form = document.getElementById('threshold_form');
    if (threshold_Form != null)  {
        threshold_bool = true;
    }

    // Get fields from database
    fetch('../api/v1.0/polygons')
        .then(function (response) {
            // Error checking
            if (response.ok) {
                return response.json();
            } else {
                alert('Something went wrong fetching!');
            }
        })
        .then(function (plotJson) {
            // Create new bounds object
            let bounds = new google.maps.LatLngBounds();
            plotJson.forEach((plot) => {
                // Default polygon configuration
                let polygon = new google.maps.Polygon({
                    paths: JSON.parse(plot.plotPath),
                    strokeColor: '#fc852f',
                    strokeOpacity: 0.8,
                    strokeWeight: 2.25,
                    fillColor: '#fc852f',
                    fillOpacity: 0.3,
                    map: map
                });

                // Draw the selected polygon in blue
                if (selectedPlotID !== null) {
                    if (plot.id == selectedPlotID) {
                        polygon.strokeColor = '#2fbffc';
                        polygon.fillColor = '#2fbffc';
                    };
                }

                // Extend the bounds to fit, based on the given vertices
                polygon.getPath().getArray().forEach(function (vertex) {
                    bounds.extend(vertex);
                });

                polygon.addListener('click', function () {
                    // Open Threshold
                    if (threshold_Form) {
                        charge_thresholds_values(`${plot.id}`);
                    } 

                    else {
                        // Update helper text
                        let actionDescription = document.getElementById("actionText");
                        actionDescription.textContent = 'Seleccione una sonda o campo';
                        centerPlot(`${plot.id}`);
                    }
                });
            });
        });
}

// It draws all probe markers
function showPositions(selectedPlot, map) {
    // Gets all positions from database
    fetch('../api/v1.0/positions').then(function (data) {
        return data.json();
    }).then(function (dataJson) {
        let plotPositions = [];

        // Store all positions of the selected field in an array and show them as markers
        dataJson.forEach((pos) => {
            if (`${pos.plot}` == selectedPlot.id) {
                plotPositions.push(pos);
                
                // Se guarda la posición
                let newPos = new google.maps.LatLng(`${pos.latitude}`, `${pos.longitude}`)
                
                // Se crean los marcadores
                let iconURL = 'https://i.ibb.co/Wc92F9w/pin.png';
                let marker = new google.maps.Marker({
                    position: newPos,
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: iconURL,
                    title: `${pos.id}`
                });
                
                marker.addListener('click', function () {
                    // Selected marker (probe)
                    document.getElementById('selected-probe').innerHTML = this.title;

                    // Hide informative floating panel
                    document.getElementById('map-floating-panel').style.display = 'none';
                    // Update the graph
                    refreshGraphScript();
                });
            }
        })
    })
}

// It updates the graph that lies underneath the map
function refreshGraphScript() {
    let script = document.createElement("script");
    script.src = 'js/graph_panel_hero.js';
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}
