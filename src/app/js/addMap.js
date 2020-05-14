function updateMap() {
    document.getElementById("addPlot").style.display = "none";
    document.getElementById("preview").style.display = "block";
    initMap();
}

function closeMap() {
    document.getElementById("addPlot").style.display = "block";
    document.getElementById("preview").style.display = "none";
}

function initMap() {

    // Initial map settings
    let options = { // Map center coordinates
        zoom: 5,
        tilt: 0,
        mapTypeId: 'satellite',
        styles: [
            // Hide museums, monuments, etc.
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            },

            // Hide stations, bus stops, etc.
            {
                featureType: 'transit',
                stylers: [{ visibility: 'off' }]
            }
        ],
        rotateControl: false,
        mapTypeControl: false,
        streetViewControl: false
    };

    let map = new google.maps.Map(document.getElementById('addMap'), options);

    navigator.geolocation.getCurrentPosition(function(position) {
        center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        map.setCenter(center);
    });


    // The map, centered at options

    addPlots(map);
    addProbes(map);

}

function addPlots(map) {

    let input = document.getElementsByName("polygons");
    let pos = [];

    let actualPos = {
        lat: null,
        lng: null
    };

    for (let i = 0; i < input.length; i = i + 2) {
        actualPos = new google.maps.LatLng(input[i].value, input[i + 1].value);
        pos.push(actualPos);
    }

    let polygon = new google.maps.Polygon({
        paths: pos,
        strokeColor: '#ff8000',
        strokeOpacity: 0.8,
        strokeWeight: 2.5,
        fillColor: '#ff8000',
        fillOpacity: 0.35,
        map: map
    });
    centerPlot();
}

function addProbes(map) {

    let input = document.getElementsByName("probe");
    let pos = [];
    for (let i = 0; i < input.length; i = i + 2) {
        pos = new google.maps.LatLng(input[i].value, input[i + 1].value);
        let marker = new google.maps.Marker({
            position: pos,
            map: map,
            animation: google.maps.Animation.DROP
        });
    }

}


function centerPlot(plot) {
    let center = {
        lat: null,
        lng: null
    };
    let totalLat = 0;
    let totalLng = 0;
    for (let i = 0; i < plot.length; i = i + 2) {
        totalLat = totalLat + plot[i].lat;
        totalLng = totalLng + plot[i].lng;
    }

    center.lat = totalLat / plot.length;
    center.lng = totalLng / plot.length;

    let lati = parseFloat(center.lat);
    let long = parseFloat(center.lng);

    let options = {
        center: { lat: lati, lng: long }, // Map center coordinates
        zoom: 18,
        tilt: 0,
        mapTypeId: 'satellite',
        styles: [
            // Hide museums, monuments, etc.
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            },

            // Hide stations, bus stops, etc.
            {
                featureType: 'transit',
                stylers: [{ visibility: 'off' }]
            }
        ],
        rotateControl: false,
        mapTypeControl: false,
        streetViewControl: false
    };
    let map = new google.maps.Map(document.getElementById('addMap'), options);
    addProbes(map);
}