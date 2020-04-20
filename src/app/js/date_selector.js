document.getElementById('end-date').onchange=function() {
    refreshGraphScript();
}
document.getElementById('start-date').onchange=function() {
    refreshGraphScript();
}

function refreshGraphScript(){

    let script = document.createElement("script");
    script.src = 'js/graphic_data.js';
    console.log("Script created");

    document.head.appendChild(script);
    script.parentNode.removeChild(script);
}
