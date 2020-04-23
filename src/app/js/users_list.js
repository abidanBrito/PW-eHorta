/* ----------------------------------------------------------------
 *   AUTHOR:         Pablo Enguix   Daniel Burruchaga 
 *   FILE:           users_list.js
 *   DATE:           01/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/*Model for users*/
let UsersModel = {
    data: [],
    controller: {},
    credentials: "same-origin",
    load: function () {
        fetch('../api/v1.0/users').then(function (answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(function (jsonData) {
            //console.log(jsonData);
            this.data = jsonData;
            // Se representa
            ViewUsersList.represent(data);
        }).then(function () {
            let tr = document.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                tr[i].style.display = "table-row";
            }
        })
    }
};

/*View User in table*/
let ViewUsersList = {
    table: {},
    selector: {},
    prepare: function (tableId, selectId) {
        this.table = document.getElementById(tableId);
        this.selector = document.getElementById(selectId);
    },
    represent: function (data) {
        this.table.innerHTML += "<tbody></tbody>"
        let tbody = this.table.getElementsByTagName('tbody')[0];
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        data.forEach((user) => {
            // plot es cada campo y tienen los parametros (name, longitude, latitude) y se escriben como `${plot.name}` para mostrarlo.
            // Para concatenar texto se pone un + => "Nombre del campo: " + `${plot.name}` + "<br>";

            tbody.innerHTML += "<tr class='content_row admintr' ><td><img src='img/user.svg' alt='Usuario' style='width: 15px;height: 15px;'><td data-label='Empresa' name='user'><input type='checkbox' name='checkUsers' style='margin:5px;' value='" + `${user.id}` + "' /><a class='links_usuarios' 'id='user_" + `${user.id}` + "'>" + `${user.name}` + '</td><td></a>' + "</a></td></tr>";
        })
    }
};

/*Check checkbox for delete*/
function showCheckboxAdminClients() {
    //Busca todos los inputs y mira si se tienen name=checkUsers
    let input = document.getElementsByTagName("input")
    for (let i = 0; i < input.length; i++) {
        if (input[i].name == "checkUsers") {
            input[i].style.visibility = "visible";
        }
    }
};

let UsersController = {
    model: UsersModel,
    view: ViewUsersList,
    init: function () {
        this.model.controller = this;
        this.model.load();
    }
};

function userEnab_mapDisab() {

    //Cambia de color blanco a morado el botón de usuario
    document.getElementById("button_user_filter").style.display = "none";
    document.getElementById("button_user_filter_activated").style.display = "initial";

    //Proceso inverso para el de parcelas
    document.getElementById("button_map_filter").style.display = "initial";
    document.getElementById("button_map_filter_activated").style.display = "none";

    //Cambia el botón de añadir
    document.getElementById("button_Add_customer").style.display = "initial";
    document.getElementById("button_Add_plot").style.display = "none";

    //Se crea la tabla de usuarios, destruyendo la de parcelas
    let table = document.getElementById("admin_table");
    table.removeChild(table.getElementsByTagName("tbody")[0])
    table.innerHTML == "<tbody></tbody>";
    ViewUsersList.prepare("admin_table");
    UsersController.init();
}
