function anyadir(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/add', {
        method: 'post',
        credentials:"same-origin",
        body: new FormData(document.getElementById('formField'))
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href = 'app.html'; //Pagina de los datos
        } else {
            document.getElementById("error_msg").style.display = "block";
        }
    })
}