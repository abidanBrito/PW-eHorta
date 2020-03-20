function enviar(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/sesion', {
        method: 'post',
        body: new FormData(document.getElementById('formKey')),
        credentials: "same-origin"
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href = 'app.html';
        } else {
            document.getElementById("error_msg").style.visibility = "visible";
            location.href = 'access_error.html';
            document.getElementById("error_msg").style.display = "block";
        }
    })
}