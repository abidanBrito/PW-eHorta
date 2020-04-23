/* ----------------------------------------------------------------
 *   AUTHOR:         Jorge Grau
 *   FILE:           add.js
 *   DATE:           19/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/*Add Event function */
function anyadir(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/add_field', {
        method: 'post',
        credentials: "same-origin",
        body: new FormData(document.getElementById('formField'))
    }).then(function (respuesta) {
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
                }).then(function (respuesta) {
                    if (respuesta.status == 200) {
                        if (i == tam - 1) document.location.href = 'app.html';
                    }
                });
            }

            // If the size is 0 the form is closed  } else closeFieldsaddForm();

        }
    }

/*Add user function*/
    function anyadir_usuario(evento) {
        evento.preventDefault();
        fetch('../api/v1.0/add_user', {
            method: 'post',
            credentials: "same-origin",
            body: new FormData(document.getElementById('formUser'))
        }).then(function (respuesta) {
            if (respuesta.status == 200) {
                location.href = "javascript:window.history.back();" //clicked page
            } else {
                document.getElementById("error_msg").style.display = "block";
            }
        })
    }
