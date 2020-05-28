// Abre las opciones de filtrado en versión base
function openFilter(){
    
    document.getElementById("filterField").style.display = "flex";
    document.getElementById("alert-block").style.display = "none";
}
// Cierra las opciones de filtrado en versión base
function closeFilter(){
    
    document.getElementById("filterField").style.display = "none";
    document.getElementById("alert-block").style.display = "flex";
}

// Filtrar
function filtrar(evento){
    data: []
    evento.preventDefault();
    fetch('../api/v1.0/filter', {
    method: 'post',
    credentials: "same-origin",
    body: new FormData(document.getElementById('filterField'))
    }).then(function(answer) {
            return answer.json();
    }).then(function(jsonData) {
            console.log("FILTRO");
            console.log(jsonData);
            this.data = jsonData;
            // Se representa
            ViewAlertsList.prepare("alertas-bloque-dinamico");
            ViewAlertsList.clean();
            ViewAlertsList.represent(data);
        });
    }

let AlertsModel = {
    data: [],
    controller: {},
    credentials: "same-origin",
    load: function() {
        fetch('../api/v1.0/alert').then(function(answer) {
            // Aqui se envia la url a la api para tener los datos y se pasan a JSON
            return answer.json();
        }).then(function(jsonData) {
            console.log("INICIAL");
            console.log(jsonData);
            this.data = jsonData;
            // Se representa
            ViewAlertsList.represent(data);
        })
    }
};

let ViewAlertsList = {
    div: {},
    prepare: function(divId) {
        this.div = document.getElementById(divId);
    },
    clean: function() { this.div.innerHTML = ''; },
    represent: function(data) {
        var fecha='';
        var capa=null;
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        data.forEach((notification) => {
                            
                // Compruebo que tipo de magnitud he recibido
                if(notification.magnitude=="humidity"){
                if(parseInt(notification.humidity) >= parseInt(notification.max)){
                    var x = notification.humidity;  
                    var y = 'src="img/datalogger/humidity.svg" alt="botón humedad"';
                    var z = '%'; 
                    if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                    
                }
                if(parseInt(notification.humidity) <= parseInt(notification.min)){
                    var x = notification.humidity;  
                    var y = 'src="img/datalogger/humidity.svg" alt="botón humedad"';
                    var z = '%'; 
                    
                 if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                }
                }
           
                else if(notification.magnitude=="salinity"){
                if(parseInt(notification.salinity) >= parseInt(notification.max)){
                    var x = notification.salinity;  
                    var y = 'src="img/datalogger/salinity.svg" alt="botón salinidad"';
                    var z = '%'; 
                    if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                    
                }
                if(parseInt(notification.salinity) <= parseInt(notification.min)){
                    var x = notification.salinity;  
                    var y = 'src="img/datalogger/salinity.svg" alt="botón salinidad"';
                    var z = '%'; 
                 if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                }
            }
                         
                else if(notification.magnitude=="luminosity"){
                if(parseInt(notification.luminosity) >= parseInt(notification.max)){
                    var x = notification.luminosity;  
                    var y = 'src="img/datalogger/luminosity.svg" alt="botón luminosidad"';
                    var z = '%'; 
                    if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                    
                }
                if(parseInt(notification.luminosity) <= parseInt(notification.min)){
                    var x = notification.luminosity;  
                    var y = 'src="img/datalogger/luminosity.svg" alt="botón luminosidad"';
                    var z = '%'; 
                 if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                }
            }
            
                else if(notification.magnitude=="temperature"){
                if(parseInt(notification.temperature) >= parseInt(notification.max)){
                    var x = notification.temperature;  
                    var y = 'src="img/datalogger/temperature.svg" alt="botón temperatura"';
                    var z = 'C'; 
                    if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                    
                }
                if(parseInt(notification.temperature) <= parseInt(notification.min)){
                    var x = notification.temperature;  
                    var y = 'src="img/datalogger/temperature.svg" alt="botón temperatura"';
                    var z = 'C'; 
                 if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                }
            }
            
                else if(notification.magnitude=="rain"){
                if(parseInt(notification.rain) >= parseInt(notification.max)){
                    var x = notification.rain;  
                    var y = 'src="img/datalogger/rainfall.svg" alt="botón temperatura"';
                    var z = 'mm'; 
                    if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                    
                }
                if(parseInt(notification.rain) <= parseInt(notification.min)){
                    var x = notification.rain;  
                    var y = 'src="img/datalogger/rainfall.svg" alt="botón lluvia"';
                    var z = 'mm'; 
                 if(fecha == notification.fecha1){
                        SoloAlerta(capa);
                    } else {
                        fecha = notification.fecha1;
                        CapaSuperiora(this.div);
                        capa = document.getElementById(fecha);
                        DiaYAlerta(capa);
                    }
                }
            }
                
            
            
            // Creo el div que contiene a los elemntos que vayan a entrar.
            function CapaSuperiora(elemento){
                elemento.innerHTML += "<div class='bloque-alert' id='"+`${fecha}`+"'> </div>";
            }
            
            // Si es el primer elemento del dia se añade la fecha
            function DiaYAlerta(elemento){
                elemento.innerHTML += "<h3 class='day'>" + `${notification.fecha1}` + "</h3> <div class='notificacion-alert'> <img class='images-alert' "+`${y}`+"> <label>" + `${notification.name}` + "</label><label class='medida'>" + `${x}` + "" + `${z}` + "</label> <label>" + `${notification.hora1}` + "</label> <label>Max: " + `${notification.max}` + " Min: " + `${notification.min}` + "</label> </div> ";
                y="";
            }
            
            // Si ya existe una alerta del dia no se añade que dia ha ocurrido
            function SoloAlerta(elemento){
                elemento.innerHTML += "<div class='notificacion-alert'> <img class='images-alert' "+`${y}`+"> <label>" + `${notification.name}` + "</label><label class='medida'>" + `${x}` + "" + `${z}` + "</label> <label>" + `${notification.hora1}` + "</label> <label>Max: " + `${notification.max}` + " Min: " + `${notification.min}` + "</label> </div>";
                y="";
            }
          
        // Estructura final html    
        /*<h3>30 de Mayo</h3>
        <div class="notificacion-alert">
            <label>IMG</label>
            <label> Naranjos Paterna 80%</label>
            <label> 12:00 </label>
            <label> Max:20% Min:10%</label>
        </div>*/
            
        })
    }
};

let AlertsController = {
    model: AlertsModel,
    view: ViewAlertsList,
    init: function() {
        this.model.controller = this;
        this.model.load();
    }
};