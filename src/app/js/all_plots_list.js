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
        data.forEach((plot) => {
            // plot es cada campo y tienen los parametros (name, longitude, latitude) y se escriben como `${plot.name}` para mostrarlo.
            // Para concatenar texto se pone un + => "Nombre del campo: " + `${plot.name}` + "<br>";

            this.text.innerHTML += "<tr class='content_row'><td  data-label='Empresa'><input type='checkbox' style='margin:5px;' name='checkPlots' value='" + `${plot.id}` + "'><a class='links_usuarios' 'id='user_" + `${plot.id}` + "'>" + `${plot.name}` + '</td><td></a>' + "<a class='edit-button' href='javascript:openFieldForm()' title='Editar' margin='50px'><img src='img/edit.PNG' width='30' height='30' class='NoImage'/></a></td></tr>"

            this.selector.innerHTML += "<option value=" + '"' + `${plot.id}` + '"' + ">" + `${plot.name}` + "</option>";
        })
    }
};

function showCheckboxAdminAllPlots() {
    let input = document.getElementsByTagName("input")
    for (let i = 0; i < input.length; i++) {
        if (input[i].name == "checkPlots") {
            input[i].style.visibility = "visible";
            input[i].style.visibility = "inlin";
        }
    }
    document.getElementById("deletePlots").style.display = "none";
    document.getElementById("trashPlots").style.display = "inline";
};

let AllPlotsController = {
    model: AllPlotsModel,
    view: ViewAllPlotsList,
    init: function() {
        this.model.controller = this;
        this.model.load();
    }
};