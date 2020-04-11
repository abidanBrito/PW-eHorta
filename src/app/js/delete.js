function borrar(i, url) {
    let formData = new FormData();
    formData.append("id", i)
    fetch(url, {
        method: 'post',
        credentials: "same-origin",
        body: formData
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.reload();
        }
    });
}

function borrarVariosPlot() {
    let url = '../api/v1.0/deletePlot';
    let conf = confirm("¿Está seguro que quiere borrar las parcelas seleccionadas? Esta acción no se puede revertir");
    if (conf == true) {
        if (window.innerWidth <= 740) {
            borrar(document.getElementById("select-css-fields").value, url)
        } else {
            let input = document.getElementsByTagName('input');
            for (let i = 0; i < 10000; i++) {
                if (input[i].getAttribute('type') == "checkbox") {
                    if (input[i].checked == true) {
                        borrar(input[i].value, url)
                    }
                }
            }
        }
        if (conf == false) {
            location.reload();
        }
    }
}

function borrarVariosUser() {
    let url = '../api/v1.0/deleteUser';
    let conf = confirm("¿Está seguro que quiere borrar las parcelas seleccionadas? Esta acción no se puede revertir");
    if (conf == true) {
        if (window.innerWidth <= 740) {
            borrar(document.getElementById("select-css-users").value, url)
        } else {
            let input = document.getElementsByTagName('input');
            for (let i = 0; i < 10000; i++) {
                if (input[i].getAttribute('type') == "checkbox") {
                    if (input[i].checked == true) {
                        borrar(input[i].value, url)
                    }
                }
            }
        }
        if (conf == false) {
            location.reload();
        }
    }
}