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
        var contador_expand=0;
        var color="";
        // Esto recorre cada campo recibido y hace la misma accion para cada uno
        data.forEach((notification) => {
            
            contador_expand++;
                            
                // Compruebo que tipo de magnitud he recibido
                if(notification.magnitude=="humidity"){
                if(parseInt(notification.humidity) >= parseInt(notification.max)){
                    var x = notification.humidity;  
                    var y = 'src="img/datalogger/humidity.svg" alt="botón humedad"';
                    var z = '%';
                    var util = x-notification.max;
                    if(util > 20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
                    
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
                    var util= x - notification.min;
                    if(util < -20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
                    
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
                    var util = x-notification.max;
                    if(util > 20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
                    var util= x - notification.min;
                    if(util < -20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
                    var util = x-notification.max;
                    if(util > 20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
                    var util= x - notification.min;
                    if(util < -20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
                    var util = x-notification.max;
                    if(util > 20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
                    var util= x - notification.min;
                    if(util < -20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
                    var util = x-notification.max;
                    if(util > 20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
                    var util= x - notification.min;
                    if(util < -20){
                        color = "#ED4141";
                    }
                    else color = "#EDA241";
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
            
            function DiaYAlerta(elemento){
                elemento.innerHTML +="<h3 class='day'>" + `${notification.fecha1}` + "</h3> <div class='alert_container'><div class='alert_div'><span class='alert_span' type='button' data-toggle='collapse' data-target='#collapseExample" + `${contador_expand}` + "' aria-expanded='false' aria-controls='collapseExample" + `${contador_expand}` + "'><p class='alert_p'><span><img class='images-alert white-filter' "+`${y}`+"> <label class='medida' style='color:" + `${color}` + ";'>" + `${x}` + "" + `${z}` + "</label></span> <label>" + `${notification.name}` + "</label> <label>" + `${notification.hora1}` + "</label></p></span><div class='collapse alert_message' id='collapseExample" + `${contador_expand}` + "'><label> min: " + `${notification.min}` + "</label><label>max: " + `${notification.max}` + "</label></div></div></div>";
                y="";
            }
            
            // Si ya existe una alerta del dia no se añade que dia ha ocurrido
            function SoloAlerta(elemento){    
                elemento.innerHTML +="<div class='alert_container'><div class='alert_div'><span class='alert_span' type='button' data-toggle='collapse' data-target='#collapseExample" + `${contador_expand}` + "' aria-expanded='false' aria-controls='collapseExample" + `${contador_expand}` + "'><p class='alert_p'><span><img class='images-alert white-filter' "+`${y}`+"> <label class='medida' style='color:" + `${color}` + ";'>" + `${x}` + "" + `${z}` + "</label></span> <label>" + `${notification.name}` + "</label> <label>" + `${notification.hora1}` + "</label></p></span><div class='collapse alert_message' id='collapseExample" + `${contador_expand}` + "'><label> min: " + `${notification.min}` + "</label><label>max: " + `${notification.max}` + "</label></div></div></div>";
                y="";    
            }
            
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