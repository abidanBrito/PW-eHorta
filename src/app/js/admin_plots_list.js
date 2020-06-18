let AdminPlotsModel = {
    controller: {},
    credentials: "same-origin",
    load: function() {
        fetch('../api/v1.0/admin_plots').then(function(answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(function(plotData) {
            // Se representa
            AdminViewPlotsList.represent(plotData);
        })
    }
};

let AdminViewPlotsList = {
    table: {},
    selector: {},
    represent: function(data) {
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        let users = document.getElementById("usersList").getElementsByClassName("user-info")
        for (let i = 1; i < users.length + 1; i++) {
            data.forEach((plot) => {
                // plot es cada campo y tienen los parametros (name, longitude, latitude) y se escriben como `${plot.name}` para mostrarlo.
                // Para concatenar texto se pone un + => "Nombre del campo: " + `${plot.name}` + "<br>";
                if (i == `${plot.user}`) {
                    let plotTable = document.getElementById("plotList" + i).getElementsByTagName("div")[1].getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
                    plotTable.innerHTML += "<tr><td>" + `${plot.name}` + "</td></tr>";
                }
            })
        }
    }
};

let AdminPlotsController = {
    model: AdminPlotsModel,
    view: AdminViewPlotsList,
    init: function() {
        this.model.controller = this;
        this.model.load();
    }
};