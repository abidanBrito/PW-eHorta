/* ----------------------------------------------------------------
 *   AUTHOR:         ...
 *   FILE:           sesion.js
 *   DATE:           19/02/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/*Send information about sesion */
function enviar(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/sesion', {
        method: 'post',
        body: new FormData(document.getElementById('form-credentials')),
        credentials: "same-origin"  
    }).then(function (answer) {
        if (answer.status == 200) {
            return answer.json();
        } 
        else {
            document.getElementById("error-msg").style.display = "block";
        } 
    }).then(function(jsonData)  {
            if (jsonData[0] == "1") { /*normal user*/
                location.href = 'app.html';
            }
            if (jsonData[0] == "2") { /*Admin user*/
                location.href = 'admin.html';
            }
            if (jsonData[0] == "3") {  /*.... user*/
                location.href = 'app.html';
            }
            if (jsonData[0] == "4") { /* .... user*/
                location.href = 'app.html';
            }
    });
}