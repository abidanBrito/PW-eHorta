let UsersModel = {
    data: [],
    controller: {},
    credentials: "same-origin",
    load: function() {
        fetch('../api/v1.0/users').then(function(answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(function(jsonData) {
            //console.log(jsonData);
            this.data = jsonData;
            // Se representa
            ViewUsersList.represent(data);
        })
    }
};

let ViewUsersList = {
    table: {},
    selector: {},
    prepare: function(tableId, selectId) {
        this.table = document.getElementById(tableId);
        this.selector = document.getElementById(selectId);
    },
    represent: function(data) {
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        data.forEach((user) => {
            // plot es cada campo y tienen los parametros (name, longitude, latitude) y se escriben como `${plot.name}` para mostrarlo.
            // Para concatenar texto se pone un + => "Nombre del campo: " + `${plot.name}` + "<br>";

            this.table.innerHTML += "<tr class='content_row admintr'>" + '<td  data-label="Empresa">' + "<input type='checkbox' name='checkUsers' style='margin:5px;' value='" + `${user.id}` + "' /><a class='links_usuarios' 'id='user_" + `${user.id}` + "'>" + `${user.name}` + '</td><td></a>' + "<a class='edit-button' href='javascript:openUserForm()' title='Editar' margin='50px'><img src='img/edit.PNG' width='30' height='30'/></a></td></tr>"

            this.selector.innerHTML += "<option value=" + '"' + `${user.id}` + '"' + ">" + `${user.name}` + "</option>";


        })
    }
};

function showCheckboxAdminClients() {
    let input = document.getElementsByTagName("input")
    for (let i = 0; i < input.length; i++) {
        if (input[i].name == "checkUsers") {
            input[i].style.visibility = "visible";
        }
    }
    document.getElementById("deleteUsers").style.display = "none";
    document.getElementById("trashUsers").style.display = "inline";
};

let UsersController = {
    model: UsersModel,
    view: ViewUsersList,
    init: function() {
        this.model.controller = this;
        this.model.load();
    }
};