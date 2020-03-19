let PlotsModel = {
    data : [],
    controller : {},
    load : function(){
        fetch('../api/v1.0/plots').then(function(answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(function(jsonData) {
            console.log(jsonData);
            this.data = jsonData;
            // Se representa
            ViewPlotsList.represent(data);
        })
    }
};

let ViewPlotsList = {
    text: {},
    prepare: function(selectId) {
        this.text = document.getElementById(selectId);
    },
    represent : function (data) {
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        data.forEach((plot) => {
            // plot es cada campo y tienen los parametros (name, longitude, latitude) y se escriben como `${plot.name}` para mostrarlo.
            // Para concatenar texto se pone un + => "Nombre del campo: " + `${plot.name}` + "<br>";
            this.text.innerHTML += "Nombre del campo: " + `${plot.name}` + "<br>";
        })
    }
};

let PlotsController = {
    model: PlotsModel,
    view: ViewPlotsList,
    init: function() {
        this.model.controller = this;
        this.model.load();
    }
};