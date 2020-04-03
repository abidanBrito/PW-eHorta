function borrar(i) {
    let formData = new FormData();
    formData.append("id", i)
    fetch('../api/v1.0/delete-fields', {
        method: 'post',
        credentials: "same-origin",
        body: formData
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href = 'app.html';
        }
    });
}

function borrarVariosPlot() {
    let conf = confirm("¿Está seguro que quiere borrar las parcelas seleccionadas? Esta acción no se puede revertir");
    if (conf == true) {
        if (document.getElementById("select-css-fields").style.display != "none") {
            console.log("ENTRA" + document.getElementById("select-css-fields").value)
            borrar(document.getElementById("select-css-fields").value)
        } else {
            let input = document.getElementsByTagName('input');
            for (let i = 0; i < 10000; i++) {
                if (input[i].getAttribute('type') == "checkbox") {
                    if (input[i].checked == true) {
                        borrar(input[i].value)
                    }
                }
            }
        }
        if (conf == false) {
            location.href = 'app.html';
        }
    }
}
function borrarVariosUser() {
    let conf = confirm("¿Está seguro que quiere borrar las parcelas seleccionadas? Esta acción no se puede revertir");
    if (conf == true) {
        if (document.getElementById("select-css-user").style.display != "none") {
            console.log("ENTRA" + document.getElementById("select-css-user").value)
            borrar(document.getElementById("select-css-user").value)
        } else {
            let input = document.getElementsByTagName('input');
            for (let i = 0; i < 10000; i++) {
                if (input[i].getAttribute('type') == "checkbox") {
                    if (input[i].checked == true) {
                        borrar(input[i].value)
                    }
                }
            }
        }
        if (conf == false) {
            location.href = 'app.html';
        }
    }
}