
function delete_sesion() {
    javascript:fetch('../api/v1.0/sesion', {
        method: 'delete' 
    }).then( function(respuesta) {
        if (respuesta.status == 200) location.href = '../index.html';
    })
}
