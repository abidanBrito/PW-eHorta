/* ----------------------------------------------------------------
 *   AUTHOR:        .... 
 *   FILE:           edit.js
 *   DATE:           09/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/* delete function for users plot*/
function deleteUsersPlots(i, url) {
    let formData = new FormData();
    formData.append("id", i)
    fetch(url, {
        method: "post",
        credentials: "same-origin",
        body: formData
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.reload();
        }
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            alert("Usuario/parcela eliminado correctamente. Haga click en Aceptar para recargar la página");
            location.reload();
        } else {
            alert("Ha habido un error. Vuelva a intentarlo más tarde");
            location.reload();
        }
    });
}

function deleteAdmin() {
    // Function for the admin button, which shows the checkboxes and, if they are already shown, calls the delete functions    
    let input = document.getElementsByTagName('input')
    let checkbox = [];

    for (let i = 0; i < input.length; i++) {
        //Check Clicked checkboxes
        if (input[i].getAttribute('type') == 'checkbox') {
            checkbox.push(input[i])
        }
    }
    if (checkbox[0].style.visibility == "") {
        showCheckbox();
    } else {

        // Collect all the rows of the table
        let tr = document.getElementsByTagName("tr");
        let td;


        // Collect those where the information that interests us is        
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
        }
        //filter for delete users or plots
        if (td.getAttribute("name") == "user") {
            deleteUsers();
        } else {
            deletePlots();
        }
    }
}


function deletePlots() {
    let url = '../api/v1.0/delete_plots';
    let conf = confirm("¿Está seguro que quiere borrar esta parcela? Esta acción no se puede revertir");
    //Se buscan todos los checkbox y se borran aquellos usuarios que tengan el checkbox activado
    if (conf == true) {
        let input = document.getElementsByTagName('input');
        for (let i = 0; i < input.length; i++) {
            if (input[i].getAttribute("type") == "checkbox") {
                if (input[i].checked == true) {
                    deleteUsersPlots(input[i].value, url)
                }
            }
        }
        if (conf == false) {
            location.reload();
        }
    }
}

function deleteUser(userId) {
    let url = '../api/v1.0/delete_user';
    let conf = confirm("¿Está seguro que quiere borrar este usuario? Esta acción no se puede revertir");
    if (conf) {
        deleteUsersPlots(userId, url);
    } else {
        location.reload();
    }
}