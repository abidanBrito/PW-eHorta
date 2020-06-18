// Abre las opciones de filtrado en versión base
function faqFilter(selectedid){
    
    console.log(selectedid);
   
    
    if(selectedid=="faq_sondas"){
        document.getElementById("faq_sondas").style.fontWeight = "bold";
        document.getElementById("faq_sondas").style.borderBottom = "#3D96E8 solid 2px";
        
        document.getElementById("faq_servicio").style.fontWeight = "normal";
        document.getElementById("faq_servicio").style.borderBottom = "#3D96E8 solid 0px";
        
        document.getElementById("faq_contacto").style.fontWeight = "normal";
        document.getElementById("faq_contacto").style.borderBottom = "#3D96E8 solid 0px";
        
        document.getElementById("faq_sondas_preguntas").style.display = "flex";
        document.getElementById("faq_servicio_preguntas").style.display = "none";
        document.getElementById("faq_contacto_preguntas").style.display = "none";
    }
    
    if(selectedid=="faq_servicio"){
        document.getElementById("faq_sondas").style.fontWeight = "normal";
        document.getElementById("faq_sondas").style.borderBottom = "#3D96E8 solid 0px";
        
        document.getElementById("faq_servicio").style.fontWeight = "bold";
        document.getElementById("faq_servicio").style.borderBottom = "#3D96E8 solid 2px";
        
        document.getElementById("faq_contacto").style.fontWeight = "normal";
        document.getElementById("faq_contacto").style.borderBottom = "#3D96E8 solid 0px";
        
        document.getElementById("faq_sondas_preguntas").style.display = "none";
        document.getElementById("faq_servicio_preguntas").style.display = "flex";
        document.getElementById("faq_contacto_preguntas").style.display = "none";
    }
    
    if(selectedid=="faq_contacto"){
        document.getElementById("faq_sondas").style.fontWeight = "normal";
        document.getElementById("faq_sondas").style.borderBottom = "#3D96E8 solid 0px";
        
        document.getElementById("faq_servicio").style.fontWeight = "normal";
        document.getElementById("faq_servicio").style.borderBottom = "#3D96E8 solid 0px";
        
        document.getElementById("faq_contacto").style.fontWeight = "bold";
        document.getElementById("faq_contacto").style.borderBottom = "#3D96E8 solid 2px";
        
        document.getElementById("faq_sondas_preguntas").style.display = "none";
        document.getElementById("faq_servicio_preguntas").style.display = "none";
        document.getElementById("faq_contacto_preguntas").style.display = "flex";
    }
    
    
}