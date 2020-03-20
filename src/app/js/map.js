function initMap(centerPos) {
    console.log(centerPos)
    if (centerPos == undefined || centerPos == 1) {
        centerPos = new google.maps.LatLng(39.497875, -0.441465)
    } else {
        centerPos = new google.maps.LatLng(39.1388436, -0.5051008)

    }
    // The location of the initial zone in the map
    var options = {
        zoom: 15,
        center: centerPos,
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
    var map = new google.maps.Map(document.getElementById('map'), options);
    // The markers, positioned at options
    addMarkers(map);
    // The polygons, around the markers
    addPaths(map);
}

function addPaths(map) {
    fetch('../api/v1.0/positions').then(function(parcelas) {
        return parcelas.json()
    }).then(function(par) {
        var newPos = [];
        for (let i = 0; i < par.length; i++) {
            newPos[i] = new google.maps.LatLng(par[i].longitude, par[i].latitude);
        }
        var polygon = new google.maps.Polygon({
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
            var newPos = new google.maps.LatLng(`${plot.longitude}`, `${plot.latitude}`)
            var marker = new google.maps.Marker({
                position: newPos,
                map: map,
                animation: google.maps.Animation.DROP
            });
        })
    });
}