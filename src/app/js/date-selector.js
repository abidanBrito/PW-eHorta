document.getElementById('endDate').onchange=function() {
    refreshGraphScript();
}
document.getElementById('startDate').onchange=function() {
    refreshGraphScript();
}

function refreshGraphScript(){
    
    let script = document.createElement("script");
    script.src = 'js/graphic-data.js';
    console.log("Script created");
    
    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}