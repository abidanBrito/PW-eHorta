/* ----------------------------------------------------------------
 *   AUTHOR:         Jorge Grau
 *   FILE:           add.js
 *   DATE:           19/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/*Add user function */
function add_user() {
    let user = new FormData()
    let input = document.getElementById("createUser").getElementsByTagName("div")[1].getElementsByTagName("input");
    user.append("name", input[0].value);
    user.append("surname", input[1].value);
    user.append("email", input[2].value);
    user.append("pass", input[3].value);
    user.append("role", document.getElementById("newUserRoleId").value);

    fetch('../api/v1.0/add_user', {
        method: 'post',
        credentials: "same-origin",
        body: user
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            alert("Usuario añadido correctamente. Haga click en Aceptar para recargar la página");
            location.reload();
        } else {
            alert("Ha habido un error. Vuelva a intentarlo más tarde");
            location.reload();
        }
    })
}

var latitudes = [];
var longitudes = [];
var counterVertex = 0;
var counterProbes = 0;

var plotID;

fetch('../api/v1.0/plots_all').then(function(answer) {

    return answer.json();
}).then(function(jsonData) {
    plotID = jsonData.length + 1;
    console.log(plotID)
})

function addCoord(userId, typeCoord) {
    let div = document.getElementById("createPlot" + userId).getElementsByTagName("div")[1];

    let coordDiv;
    let counter;
    let listDiv;
    if (typeCoord == "vertex") {
        coordDiv = div.getElementsByTagName("div")[1];
        counter = div.getElementsByTagName("div")[2].getElementsByTagName("span")[0];
        listDiv = document.getElementById("user" + userId + "-info").getElementsByTagName("div")[21];
    } else {
        coordDiv = div.getElementsByTagName("div")[4];
        counter = div.getElementsByTagName("div")[5].getElementsByTagName("span")[0];
        listDiv = document.getElementById("user" + userId + "-info").getElementsByTagName("div")[22];
    }

    let input = coordDiv.getElementsByTagName("input");

    if (isNaN(parseFloat(input[0].value)) || isNaN(parseFloat(input[1].value))) {
        alert("No puede haber un campo vacío")
    } else {
        listDiv.innerHTML += "<input class='input-login' type='text' name='latitude' placeholder='Latitud' value='" + input[0].value + "' required><input class='input-login' type='text' name='longitude' placeholder='Longitud' value='" + input[1].value + "' required>";

        coordDiv.innerHTML = "<input class='input-login' type='text' name='latitude' placeholder='Latitud' required><input class='input-login' type='text' name='longitude' placeholder='Longitud' required>";
        if (typeCoord == "vertex") {
            counterVertex++;
            counter.innerHTML = "Vértices: " + counterVertex + " (mín:3)";
        } else {
            counterProbes++;
            counter.innerHTML = "Sondas: " + counterProbes + " (mín:1)";
        }
    }
}

function addPlot(plotFormId, coordsId, userId) {
    let plotName = document.getElementById(plotFormId).getElementsByTagName("div")[1].getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
    let input_plot = document.getElementById(coordsId).getElementsByTagName("div")[1].getElementsByTagName("input");

    if (input_plot.length < 6) {
        alert("Un campo no puede tener menos de 3 puntos.")
    } else {

        let probes = document.getElementById(coordsId).getElementsByTagName("div")[2].getElementsByTagName("input");

        for (let i = 0; i < probes.length; i++) {
            let probeData = new FormData
            if (probes[i].value == "") {
                alert("Necesita haber una sonda al menos");
            }
        }

        let plotData = new FormData();
        plotData.append("name", plotName);
        plotData.append("centerLat", 0)
        plotData.append("centerLng", 0)
        fetch('../api/v1.0/add_field', {
            method: 'post',
            credentials: "same-origin",
            body: plotData
        }).then(function() {
            let userPlotData = new FormData;
            userPlotData.append("userId", userId);
            userPlotData.append("plotID", plotID);
            fetch('../api/v1.0/add_user_plot', {
                method: 'post',
                credentials: "same-origin",
                body: userPlotData
            }).then(function(respuesta) {
                console.log(respuesta)
                if (respuesta.status != 200) {
                    alert("Ha habido un error al añadir la parcela. Por favor, vuelva a intentarlo más tarde");
                } else {
                    alert("Parcela añadida correctamente");
                    location.reload();
                }
            })
        })
    }
}