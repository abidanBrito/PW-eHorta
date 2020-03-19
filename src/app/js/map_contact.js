/* ----------------------------------------------------------------
 *   AUTHOR:         Abidan Brito Clavijo
 *   FILE:           map_contact.js
 *   DATE:           16/03/2020
 *   STATE:          DONE
 *   ----------------------------------------------------------------
 *   NOTICE: Copyright (c) 2020 Abidan Brito Clavijo
 *   ---------------------------------------------------------------- */

let map;
let infoWindow;

// This function initializes and adds the map
function initMap() {
    // EPSG location
    let epsg = {
        lat: 38.996497,
        lng: -0.166144
    };

    // Center map around EPSG
    let map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 18,
            tilt: 0,
            center: epsg,
            mapTypeId: 'roadmap',
            rotateControl: false,
            mapTypeControl: false
        });

    // Place a marker on top of EPSG
    let marker = new google.maps.Marker({
        position: epsg,
        map: map
    });

    infoWindow = new google.maps.InfoWindow();

    // Info window  on click
    marker.addListener('click', function () {
        openInfoWindow("<h4>UPV - Escuela Politécnica Superior de Gandia</h4> C/ Paranimf, 1, Edificio F <br> 46730 Grau de Gandia, Valencia, España", marker);
    });
}

// This function creates an opens an info window
function openInfoWindow(content, position) {
    infoWindow.setContent(content);
    infoWindow.open(map, position);
}
