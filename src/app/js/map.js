function initMap() {
    // The location of the initial zone in the map
    let options = {
        zoom: 0,
        center: { lat: 39.497875, lng: -0.441465 },
        mapTypeId: 'hybrid',
        styles: [{
                featureType: 'poi',
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: 'transit',
                stylers: [{ visibility: "off" }]
            }
        ]
    };
    // The map, centered at options
    let map = new google.maps.Map(document.getElementById('map'), options);
    // The markers, positioned at options
    addMarkers(map);
    // The polygons, around the markers
    addPaths(map);
    // Refresca la gráfica
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
        })
        let lati = parseFloat(rightPlot.latitude);
        let long = parseFloat(rightPlot.longitude);
        console.log(lati + "," + long)
        // Modificamos el mapa para centrarlo en la parcela
        let options = {
            zoom: 18,
            center: { lat: lati, lng: long },
            mapTypeId: 'hybrid',
            styles: [{
                featureType: 'poi',
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: 'transit',
                stylers: [{ visibility: "off" }]
            }
            ]
        };
        // The map, centered at options
        let map = new google.maps.Map(document.getElementById('map'), options);
        // Show probes markers
        showPositions(rightPlot,map);
        // The polygons, around the markers
        addPaths(map);
    })
}

function addPaths(map) {
    fetch('../api/v1.0/positions').then(function(positions) {
        return positions.json()
    }).then(function(pos) {
        let newPos = [];
        for (let i = 0; i < pos.length; i++) {
            newPos[i] = new google.maps.LatLng(pos[i].longitude, pos[i].latitude);
        }
        let polygon = new google.maps.Polygon({
            paths: newPos,
            strokeColor: "#ff8000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#ff8000",
            fillOpacity: 0.35,
            map: map
        });
        polygon.setMap(map);
    })
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