    function anyadir(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/add_field', {
        method: 'post',
        credentials:"same-origin",
        body: new FormData(document.getElementById('formField'))
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href="javascript:window.history.back();" //Pagina desde donde se ha clickado añadir
        } else {
            document.getElementById("error_msg").style.display = "block";
        }
    })
}   

  
    function anyadir_usuario(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/add_user', {
        method: 'post',
        credentials:"same-origin",
        body: new FormData(document.getElementById('formUser'))
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href="javascript:window.history.back();" //Pagina desde donde se ha clickado añadir
        } else {
            document.getElementById("error_msg").style.display = "block";
        }
    })
}   
