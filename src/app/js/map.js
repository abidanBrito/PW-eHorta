/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito Clavijo, Luis Belloch Martinez
*   FILE:           map.js
*   DATE:           25/03/2020
*   STATE:          WIP
*   ---------------------------------------------------------------- */

function initMap() {
    // Initial map settings
	let options = {
		center: { lat: 36.052448, lng: -1.7467878 }, // Map center coordinates
        zoom: 4,
        tilt: 0,
		mapTypeId: 'satellite',
		styles: [
			// Hide museums, monuments, etc.
			{
				featureType: 'poi',
				stylers: [ { visibility: 'off' } ]
			},

			// Hide stations, bus stops, etc.
			{
				featureType: 'transit',
				stylers: [ { visibility: 'off' } ]
			}
        ],
        rotateControl: false,
		mapTypeControl: false,
		streetViewControl: false
    };
    
    // The map, centered at options
    let map = new google.maps.Map(document.getElementById('map'), options);
    
    // The markers, positioned at options
    addMarkers(map);

	// The polygons, around the markers
	drawTerrain(map);

    // Refresh/update graph
    refreshGraphScript();
}

function centerPlot(selectedPlot) {
    fetch('../api/v1.0/plots').then(function(plots) {
        return plots.json();
    }).then(function(plotsJson) {
        let rightPlot = {};
        data.forEach((plot) => {
            // Comparamos el id recibido de la tabla con el de cada parcela recibida del fetch y lo devolvemos a la siguiente funcion
            if(plot.id == selectedPlot){
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
            center: { lat: lati, lng: long },
            mapTypeId: 'satellite',
            styles: [
                // Hide museums, monuments, etc.
                {
                    featureType: 'poi',
                    stylers: [{ visibility: "off" }]
                },

                // Hide stations, bus stops, etc.
                {
                    featureType: 'transit',
                    stylers: [{ visibility: "off" }]
                }
            ],
            rotateControl: false,
            mapTypeControl: false,
            streetViewControl: false
        };

        // Apply new settings to the map
        let map = new google.maps.Map(document.getElementById('map'), options);

		// Draw probes markers
        showPositions(rightPlot,map);

		// Draw field polygons
		drawTerrain(rightPlot.id, map);
    });
}

function drawTerrain(selectedPlotID, map) {
	// Log trace
	console.log(selectedPlotID);

	fetch('../api/v1.0/polygons')
		.then(function(response) {
			// Error checking
			if (response.ok) {
				return response.json();
			} else {
				alert('Something went wrong fetching!');
			}
		})
		.then(function(verticesJSON) {
			// Empty array to store terrain bounds (vertices)
			let terrainPath = [];

			verticesJSON.forEach((vertex) => {
				if (vertex.plot == selectedPlotID) {
					let lat = parseFloat(vertex.latitude);
					let lng = parseFloat(vertex.longitude);

					let currVertex = new google.maps.LatLng(lat, lng);

					terrainPath.push(currVertex);
				}
			});
			console.log(terrainPath);

			let polygon = new google.maps.Polygon({
				paths: terrainPath,
				strokeColor: '#ff8000',
				strokeOpacity: 0.8,
				strokeWeight: 2.5,
				fillColor: '#ff8000',
				fillOpacity: 0.35,
				map: map
			});

			polygon.setMap(map);
		});
}

function addMarkers(map) {
    fetch('../api/v1.0/plots').then(function(j) { return j.json() }).then(function(pos) {
        pos.forEach((plot) => {
            let newPos = new google.maps.LatLng(`${plot.latitude}`, `${plot.longitude}`);
            
            let marker = new google.maps.Marker({
                position: newPos,
                map: map,
                animation: google.maps.Animation.DROP,
                title: `${plot.name}`
            });
        })
    });
}

function showPositions(selectedPlot, map) { 
    // Recoge todas las posiciones de la base de datos 
    fetch('../api/v1.0/positions').then(function(data) { 
        return data.json(); 
    }).then(function(dataJson) { 
        let plotPositions = []; 
         
        // Guarda en un array las posiciones de la parcela seleccionada y los muestra como marcadores 
        dataJson.forEach((pos) => {
            if(`${pos.plot}` == selectedPlot.id) { 
                plotPositions.push(pos); 
                // Se guarda la posición 
                let newPos = new google.maps.LatLng(`${pos.latitude}`, `${pos.longitude}`) 
                // Se crean los marcadores 
                let marker = new google.maps.Marker({ 
                    position: newPos, 
                    map: map, 
                    animation: google.maps.Animation.DROP,
                    title: `${pos.id}`
                });
                marker.addListener('click', function() {
                    // Pone el marcador en marcado
                    document.getElementById('selectedProbe').innerHTML = this.title;
                    // Refresca la gráfica
                    refreshGraphScript();
                });
            } 
        }) 
         
        console.log(plotPositions); 
    }) 
}

function refreshGraphScript(){
    
    let script = document.createElement("script");
    script.src = 'js/graphic-data.js';
    console.log("Script created");
    
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}