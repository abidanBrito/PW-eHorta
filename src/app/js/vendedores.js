let ModeloVendedores = {
    cargar : function () {
        fetch('../api/v1.0/vendedores').then(function (respuesta) {
            return respuesta.json();
        }).then((json) => {
            this.datos = json;
            this.controlador.representar(this.datos);
        })
    },
    datos: [],
    controlador: {}
};

let VistaSelectorVendedores = {
    selector: {},
    preparar: function(selectId) {
        this.selector = document.getElementById(selectId);
        this.selector.innerHTML = "<option value='0'>Todos</option>";
    },
    representar : function (datos) {
        datos.forEach((vendedor) => {
            this.selector.innerHTML += `<option value="${vendedor.id}">
            ${vendedor.apellidos}, ${vendedor.nombre}
            </option>`;
        })
    }
};

let ControladorVendedores = {
    modelo : ModeloVendedores,
    vista: VistaSelectorVendedores,
    iniciar : function() {
        this.modelo.controlador = this;
        this.modelo.cargar();
    },
    representar: function (datos) {
        this.vista.representar(datos);
    }
};


