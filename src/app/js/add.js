/* ----------------------------------------------------------------
 *   AUTHOR:         Jorge Grau
 *   FILE:           add.js
 *   DATE:           19/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

function addPlotPage() {
    let plotName = document.getElementsByTagName("input").namedItem("plotName").value;

    window.location = "addPlot.html?" + plotName;
}

/*Add user function */
function add_user() {
    let user = new FormData()
    let input = document.getElementById("formUser").getElementsByTagName("input");
    user.append("name", input[0].value)
    user.append("surname", input[1].value)
    user.append("email", input[2].value)
    user.append("pass", input[3].value)
    user.append("role", document.getElementById("selectRole").value)

    fetch('../api/v1.0/add_user', {
        method: 'post',
        credentials: "same-origin",
        body: user
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            //location.href = "javascript:window.history.back();" //clicked page
        } else {
            // document.getElementById("error_msg").style.display = "block";
        }
    })
}

var latitudes = [];
var longitudes = [];
var counterVertex = 0;
var counterProbes = 0;

function addCoord(typeCoord) {
    let div = document.getElementById(typeCoord);
    let input = div.getElementsByTagName("input");
    console.log(parseFloat(input[0].value))
    console.log(parseFloat(input[1].value))
    if (isNaN(parseFloat(input[0].value)) || isNaN(parseFloat(input[1].value))) {
        alert("No puede haber un campo vacío")
    } else {
        for (let i = 0; i < input.length; i++) {
            let add = document.getElementsByName(typeCoord)[0];
            add.onclick = function() {
                if (typeCoord == "div-polygons") {
                    counterVertex++;
                    add.getElementsByTagName("p")[1].innerHTML = "Vértices: " + counterVertex;
                } else {
                    counterProbes++;
                    add.getElementsByTagName("p")[1].innerHTML = "Sondas: " + counterProbes
                }
            }
            if (i % 2 == 0) {
                latitudes.push(parseFloat(input[i].value));
            } else {
                longitudes.push(parseFloat(input[i].value))
            }
            div.innerHTML = "<input type='text' class='polygons input-login' placeholder='Latitud'><input type='text' class='polygons input-login' placeholder='Longitud'>";
        }
    }
}

function addPlot() {
    let plot = document.getElementById("addPlot");
    let input = document.getElementById("div-polygons").getElementsByTagName("input");

    latitudes.push(parseFloat(input[0].value));
    longitudes.push(parseFloat(input[1].value));
    if (latitudes.length < 3 || longitudes.length < 3) {
        alert("Un campo no puede tener menos de 3 puntos.")
        latitudes.pop();
        longitudes.pop();
    } else {

        let plotData = new FormData();
        plotData.append("name", plot.getElementsByTagName("input").namedItem("plotName").value);



        let totalLat = 0;
        let totalLng = 0;

        totalLat = latitudes.reduce((accumulator, currentValue) => accumulator + currentValue)
        totalLng = longitudes.reduce((accumulator, currentValue) => accumulator + currentValue)

        totalLat = totalLat / latitudes.length;
        totalLng = totalLng / longitudes.length;

        plotData.append("centerLat", totalLat);
        plotData.append("centerLng", totalLng);
        plotData.append("latitude", latitudes);
        plotData.append("longitude", longitudes);

        let probes = document.getElementById("div-probes").getElementsByTagName("input");
        let probeLats = [];
        let probeLngs = [];

        for (let i = 0; i < probes.length; i++) {
            if (probes[i].value == "") {
                alert("Necesita haber una sonda al menos");
            } else {
                if (i % 2 == 0) {
                    probeLats.push(probes[i].value);
                } else {
                    probeLngs.push(probes[i].value);
                }
            }
        }

        plotData.append("probeLats", probeLats);
        plotData.append("probeLngs", probeLngs);

        console.log(plotData.getAll("name"));
        console.log("Centro=" + plotData.get("centerLat") + "," + plotData.get("centerLng"));
        console.log(plotData.getAll("latitude"));
        console.log(plotData.getAll("longitude"));
        console.log(plotData.getAll("probeLats"));
        console.log(plotData.getAll("probeLngs"));

        fetch('../api/v1.0/add_field', {
            method: 'post',
            credentials: "same-origin",
            body: plotData
        }).then(function(respuesta) {
            if (respuesta.status != 200) {
                document.getElementById("error_msg").style.display = "block";
            } else {

            }
        })
    }
}


/* Old version */
/*Add Event function 
function anyadir(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/add_field', {
        method: 'post',
        credentials: "same-origin",
        body: new FormData(document.getElementById('formField'))
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href = "javascript:window.history.back();" //clicked page
        } else {
            document.getElementById("error_msg").style.display = "block";
        }
    })
}


function anyadirVariosFields(evento) {
    evento.preventDefault();
    // preventive confirmation

    let conf = confirm("¿Está seguro que quiere añadir las parcelas seleccionadas?");
    if (conf == true) {
        // If true, all checked checkboxes are searched
        let check = document.querySelectorAll("input[type='checkbox']:checked");
        let tam = check.length;
        if (tam > 0) {
            // If the size is greater than 0 they are sent to add
            for (let i = 0; i < tam; i++) {
                let formData = new FormData(document.getElementById('fieldAddForm'));
                formData.append("id", check[i].getAttribute('data-ide'));
                fetch('../api/v1.0/add_fields', {
                    method: 'post',
                    credentials: "same-origin",
                    body: formData
                }).then(function(respuesta) {
                    if (respuesta.status == 200) {
                        if (i == tam - 1) document.location.href = 'app.html';
                    }
                });
            }

            // If the size is 0 the form is closed  } else closeFieldsaddForm();

        }
    }

    */