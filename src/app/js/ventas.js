let ModeloVentas = {
    url: '../api/v1.0/ventas',
    cargar : function (url = "") {
        if(url === ""){
            url = this.url
        }
        fetch(url).then(function (respuesta) {
            return respuesta.json();
        }).then((json) => {
            this.datos = json;
            this.controlador.representar(this.datos);
        })
    },
    datos: [],
    controlador: {},
    filtros: {
        vendedor: 0,
        cliente: 0,
        inicio: 0,
        fin: 0
    },
    filtrar: function(parametro, valor){
        this.filtros[parametro] = valor;

        let queryParams = [];
        if(this.filtros.vendedor != 0)queryParams.push('vendedor=' + this.filtros.vendedor);
        if(this.filtros.cliente != 0)queryParams.push('cliente=' + this.filtros.cliente);
        if(this.filtros.inicio != 0)queryParams.push('inicio=' + this.filtros.inicio);
        if(this.filtros.fin != 0) queryParams.push('fin=' + this.filtros.fin);
        if(queryParams.length > 0 ){
            let query = queryParams.join('&');
            this.cargar(this.url + '?' + encodeURI(query));
        }else{
            this.cargar();
        }
    }
};

let VistaTablaVentas = {
    tabla: {},
    preparar: function(selectId) {
        this.tabla = document.getElementById(selectId);
        
    },
    representar : function (datos) {
        let contador = 25;
        this.tabla.innerHTML = "";
        datos.forEach((venta) => {
            contador --;  
            if(contador > 0){
                this.tabla.innerHTML += `
                                        <tr>
                                            <td>${venta.vendedor.apellidos}, ${venta.vendedor.nombre}</td>
                                            <td>${venta.cliente.nombre}</td>
                                            <td>${venta.fecha}</td>
                                            <td>${venta.importe}</td>
                                        </tr>
                                        `
            }
        })
    }
};

let ControladorVentas = {
    modelo : ModeloVentas,
    vista: VistaTablaVentas,
    iniciar : function() {
        this.modelo.controlador = this;
        this.modelo.cargar();
    },
    representar: function (datos) {
        this.vista.representar(datos);
    }
};