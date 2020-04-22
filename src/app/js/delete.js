function deleteUsersPlots(i, url) {
    let formData = new FormData();
    formData.append("id", i)
    fetch(url, {
        method: 'post',
        credentials: "same-origin",
        body: formData
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.reload();
        }
    });
}

function showCheckbox() {
    let input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        if (input[i].getAttribute('type') == "checkbox") {
            input[i].style.visibility = "visible";

        }
    }
}

function deleteAdmin() {
    //Función para el botón de admin, el cual muestra los checkbox y, si ya están mostrados, llama a las funciones de borrar
    let input = document.getElementsByTagName('input')
    let checkbox = [];

    for (let i = 0; i < input.length; i++) {
        //Recoge todos los checkbox
        if (input[i].getAttribute('type') == 'checkbox') {
            checkbox.push(input[i])
        }
    }
    if (checkbox[0].style.visibility == "") {
        showCheckbox();
    } else {
        //Recoge todas las filas de la tabla
        let tr = document.getElementsByTagName("tr");
        let td;

        //Recoge aquellas donde está la información que nos interesa
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
        }
        // Llama a la función correspondiente
        if (td.getAttribute("name") == "user") {
            deleteUsers();
        } else {
            deletePlots();
        }
    }
}

function deletePlots() {
    let url = '../api/v1.0/delete_plot';
    let conf = confirm("¿Está seguro que quiere borrar las parcelas seleccionadas? Esta acción no se puede revertir");
    //Se buscan todos los checkbox y se borran aquellas parcelas que tengan el checkbox activado
    if (conf == true) {
        let input = document.getElementsByTagName('input');
        for (let i = 0; i < 10000; i++) {
            if (input[i].getAttribute('type') == "checkbox") {
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

function deleteUser() {
    let url = '../api/v1.0/delete_user';
    let conf = confirm("¿Está seguro que quiere borrar los usuarios seleccionados? Esta acción no se puede revertir");
    //Se buscan todos los checkbox y se borran aquellos usuarios que tengan el checkbox activado
    if (conf == true) {
        let input = document.getElementsByTagName('input');
        for (let i = 0; i < 10000; i++) {
            if (input[i].getAttribute('type') == "checkbox") {
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