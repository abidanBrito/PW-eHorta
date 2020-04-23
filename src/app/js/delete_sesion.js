/* ----------------------------------------------------------------
 *   AUTHOR:        .... 
 *   FILE:           delete_sesion.js
 *   DATE:           12/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/*Function for delete sesion */
function delete_sesion() {
    javascript:fetch('../api/v1.0/sesion', {
        method: 'delete' 
    }).then( function(respuesta) {
        if (respuesta.status == 200) location.href = '../index.html';
    })
}
