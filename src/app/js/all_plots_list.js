let AllPlotsModel = {
    data: [],
    controller: {},
    credentials: "same-origin",
    load: function() {
        fetch('../api/v1.0/plots_all').then(function(answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(function(jsonData) {
            //console.log('TODOS ' + jsonData);
            this.data = jsonData;
            // Se representa
            ViewAllPlotsList.represent(data);
        })
    }
};

let ViewAllPlotsList = {
    text: {},
    selector: {},
    prepare: function(tableId, selectId) {
        this.text = document.getElementById(tableId);
        if (selectId != "") {
            this.selector = document.getElementById(selectId);
        }
    },
    represent: function(data) {
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        this.text.innerHTML += "<tbody></tbody>";
        let tbody = this.text.getElementsByTagName('tbody')[0];
        data.forEach((plot) => {
            // plot es cada campo y tienen los parametros (name, longitude, latitude) y se escriben como `${plot.name}` para mostrarlo.
            // Para concatenar texto se pone un + => "Nombre del campo: " + `${plot.name}` + "<br>";

            tbody.innerHTML += "<tr class='content_row admintr' style='display:none;' name='plot'><td><img src='img/mapi.png' alt='Parcela' style='width: 15px;height: 15px;'></td><td data-label='Empresa' name='plot'><input type='checkbox' style='margin:5px;' name='checkPlots' value='" + `${plot.id}` + "'><a class='links_usuarios' 'id='user_" + `${plot.id}` + "'>" + `${plot.name}` + '</td><td></a>' + "<a class='edit-button' href='javascript:openFieldForm()' title='Editar' margin='50px'></a></td></tr>"
        })
    }
};

function showCheckboxAdminAllPlots() {
    //Busca todos los inputs y mira si se tienen name=checkPlots
    let input = document.getElementsByTagName("input")
    for (let i = 0; i < input.length; i++) {
        if (input[i].name == "checkPlots") {
            input[i].style.visibility = "visible";
            input[i].style.visibility = "inline";
        }
    }
};

let AllPlotsController = {
    model: AllPlotsModel,
    view: ViewAllPlotsList,
    init: function() {
        this.model.controller = this;
        this.model.load();
        setTimeout(() => {
            let tr = document.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                tr[i].style.display = "table-row";
            }
        }, 20);
    }
};

function userDisab_mapEnab() {

    //Cambia de color blanco a morado el botón de parcelas
    document.getElementById("button_user_filter").style.display = "initial";
    document.getElementById("button_user_filter_activated").style.display = "none";

    //Proceso inverso para el de parcelas
    document.getElementById("button_map_filter").style.display = "none";
    document.getElementById("button_map_filter_activated").style.display = "initial";

    //Cambia el botón de añadir
    document.getElementById("button_Add_customer").style.display = "none";
    document.getElementById("button_Add_plot").style.display = "initial";

    //Se crea la tabla de parcelas, destruyendo la de usuarios
    let table = document.getElementById("admin_table");
    table.removeChild(table.getElementsByTagName("tbody")[0])
    ViewAllPlotsList.prepare("admin_table");
    AllPlotsController.init();
}