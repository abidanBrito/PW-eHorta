function borrar(i) {
    let formData = new FormData();
    formData.append("id", i)
    fetch('../api/v1.0/delete', {
        method: 'post',
        credentials: "same-origin",
        body: formData
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href = 'app.html';
        }
    });
}

function borrarVarios() {
    let input = document.getElementsByTagName('input');
    let conf = confirm("¿Está seguro que quiere borrar las parcelas seleccionadas? Esta acción no se puede revertir");
    if (conf == true) {
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