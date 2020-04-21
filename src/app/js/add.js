/* ----------------------------------------------------------------
*   AUTHOR:         Jorge Grau
*   FILE:           add.js
*   DATE:           19/04/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */     


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


function anyadirVariosFields(evento) {
evento.preventDefault();
// Confirmacion preventiva
let conf = confirm("¿Está seguro que quiere añadir las parcelas seleccionadas?");
if (conf == true) {
    // Si se acepta se buscan todos los checkbox marcados
    let check = document.querySelectorAll("input[type='checkbox']:checked");
    let tam=check.length;
    if(tam>0){
        // Si el tamaño es mayor que 0 se envian a añadir
     for (let i = 0; i < tam; i++) {
            let formData = new FormData(document.getElementById('fieldAddForm'));
            formData.append("id", check[i].getAttribute('data-ide'));
            fetch('../api/v1.0/add_fields', {
            method: 'post',
            credentials: "same-origin",
            body: formData
            }).then(function(respuesta) {
                if (respuesta.status == 200) {
                    if (i==tam-1) document.location.href = 'app.html';
                }
            });
    }
   // Si el tamaño es 0 se cierra el formulario     
  } else closeFieldsaddForm();
 
}
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