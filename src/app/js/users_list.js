/* ----------------------------------------------------------------
 *   AUTHOR:         Pablo Enguix, Daniel Burruchaga 
 *   FILE:           users_list.js
 *   DATE:           01/04/2020
 *   STATE:          DONE
 *  ---------------------------------------------------------------- */

/*Model for users*/
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
        }).then(function() {
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
    prepare: function(tableId, selectId) {
        this.usersList = document.getElementById(tableId);
        this.selector = document.getElementById(selectId);
    },
    represent: function(data) {
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        data.forEach((user) => {
            let role = 0;
            if (`${user.roleId}` == 1) {
                role = "Usuario";
            }
            if (`${user.roleId}` == 2) {
                role = "Administrador";
            }
            if (`${user.roleId}` == 3) {
                role = "Cliente-administrador";
            }
            if (`${user.roleId}` == 4) {
                role = "Técnico";
            }
            let vertex = 'vertex';
            let probe = 'probe';
            // plot es cada campo y tienen los parametros (name, longitude, latitude) y se escriben como `${plot.name}` para mostrarlo.
            // Para concatenar texto se pone un + => "Nombre del campo: " + `${plot.name}` + "<br>";¡
            this.usersList.innerHTML += "<div id='user" + `${user.id}` + "-info' class='user-info'><div class='general_info'><div class='user-data'><p style='margin:12px auto;' data-toggle='collapse' data-target='#moreInfo" + `${user.id}` + "' aria-expanded='false' aria-controls='moreInfo" + `${user.id}` + "'>" + `${user.email}` + "</p></div><div class='options'><img src='img/edit.svg' data-toggle='collapse' data-target='#editUser" + `${user.id}` + "' aria-expanded='false' aria-controls='editUser" + `${user.id}` + "' style='width:18px;'><img src='img/close.svg' width='14px' style='margin:auto; margin-left:4px;'  onclick='deleteUser(" + `${user.id}` + ")'></i></div></div><div class='collapse moreInfo' id='moreInfo" + `${user.id}` + "' class='moreInfo'><hr size='1'><div><div><p>" + `${user.name}` + " " + `${user.surname}` + "</p><p>" + role + "</p></div><button class='button' data-toggle='collapse' data-target='#moreInfo" + `${user.id}` + ", #plotList" + `${user.id}` + "' aria-expanded='false' aria-controls='editUser" + `${user.id}` + ", plotList" + `${user.id}` + "' style='margin-left:auto;'>Mis parcelas</button></div></div><div class='collapse' id='plotList" + `${user.id}` + "' class='plotList'><hr size='1'><div class='title'><i class='fas fa-angle-left' data-toggle='collapse' data-target='#plotList" + `${user.id}` + "' aria-expanded='false' aria-controls='plotList" + `${user.id}` + "'></i><h3>Parcelas de " + `${user.name}` + "</h3></div><div class='plots'><table id='plotTable" + `${user.id}` + "'><tbody></tbody></table></div><button class='button' style='width: 223px; margin-left:1.5rem;' data-toggle='collapse' data-target='#createPlot" + `${user.id}` + ", #plotList" + `${user.id}` + "' aria-expanded='false' aria-controls='createPlot" + `${user.id}` + ", plotList" + `${user.id}` + "'>Nueva parcela</button></div><div class='createPlot collapse' id='createPlot" + `${user.id}` + "'><hr size='1'><div class='title'><i class='fas fa-angle-left' data-toggle='collapse' data-target='#createPlot" + `${user.id}` + ", #plotList" + `${user.id}` + "' aria-expanded='false' aria-controls='createPlot" + `${user.id}` + ", plotList" + `${user.id}` + "'></i><h3>Nueva parcela</h3></div><div class='plotForm'><div><input class='input-login' type='text' name='plotName' placeholder='Nombre de la parcela' required><span class='counter'>Vértices</span><div class='polygonInfo'><input class='input-login' type='text' name='latitude' placeholder='Latitud' required><input class='input-login' type='text' name='longitude' placeholder='Longitud' required></div><div class='addVertex'><button onclick='addCoord(" + `${user.id}` + ", \"" + vertex + "\")'>Añadir punto</button><span class='undo-changes'>Vértices: 0 (mín:3)</span></div></div><div><span class='counter'>Sondas</span><div class='probeInfo'><input class='input-login' type='text' name='latitude' placeholder='Latitud' required><input class='input-login' type='text' name='longitude' placeholder='Longitud' required></div><div class='addProbe'><button onclick='addCoord(" + `${user.id}` + ", \"" + probe + "\")'>Añadir sonda</button> <span class='undo-changes'>Sondas: 0 (mín:1)</span></div></div></div><div class='buttons' style='margin-top:1.25rem;' ><button class='button' data-toggle='collapse' data-target='#createPlot" + `${user.id}` + ", #vertexList" + `${user.id}` + "' aria-expanded='false' aria-controls='createPlot, vertexList'>Coordenadas</button><button class='button' onclick ='addPlot(`createPlot" + `${user.id}` + "`, `vertexList" + `${user.id}` + "`, " + `${user.id}` + ")'>Crear</button></div></div><div id='vertexList" + `${user.id}` + "' class='vertexList collapse'><hr size='1'><div class='title'><i class='fas fa-angle-left' data-toggle='collapse' data-target='#createPlot" + `${user.id}` + ", #vertexList" + `${user.id}` + "' aria-expanded='false' aria-controls='createPlot" + `${user.id}` + "'></i><h3>Lista de coordenadas</h3></div><span>Puntos de la parcela</span><div class='vertexPlotList'></div><span>Sondas</span><div class='vertexProbeList'></div></div><div class='collapse editUser' id='editUser" + `${user.id}` + "'><hr size='1'><div class='title'><i class='fas fa-angle-left' data-toggle='collapse' data-target='#editUser" + `${user.id}` + "' aria-expanded='false' aria-controls='editUser" + `${user.id}` + "'></i><h3>Editar usuario</h3></div><div class='editData'><input class='input-login' type='text' name='userName' placeholder='Nombre' value='" + `${user.name}` + "' required><input class='input-login' type='text' name='userSurname' placeholder='Apellidos' value='" + `${user.surname}` + "' required><input class='input-login' type='text' name='userEmail' placeholder='Correo electrónico' value='" + `${user.email}` + "' required><input class='input-login' type='text' name='userPassword' placeholder='Contraseña' value='" + `${user.password}` + "' required><select name='roleId' id='role" + `${user.id}` + "Id' class='roleId' value='" + `${user.roleId}` + "' onchange='value=this.value'><option>Rol</option><option>----------------------------------------------</option><option value='1'>Cliente</option><option value='2'>Administrador</option><option value='3'>Cliente-administrador</option><option value='4'>Técnico</option></select><button type='button' class='button editUserButton' style='width: 252px; margin: 20px auto;'>Aplicar cambios</button></div></div></div></div>"
        })

    }
};

let UsersController = {
    model: UsersModel,
    view: ViewUsersList,
    init: function() {
        this.model.controller = this;
        this.model.load();
    }
};