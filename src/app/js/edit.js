/* ----------------------------------------------------------------
 *   AUTHOR:         Jorge Grau
 *   FILE:           edit.js
 *   DATE:           19/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/*Function for modify users plots*/

function modify_plot(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/edit_field', {
        method: 'post',
        credentials: "same-origin",
        body: new FormData(document.getElementById('fieldModForm'))
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href = "admin.html" //Clicked page
        } else {
            document.getElementById("error_msg").style.display = "block";
        }
    })
}