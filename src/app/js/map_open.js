

function openMap() {
    console.log("Opening map");
    
    // Hide elements from date selector, graph and buttons
    let graph = document.getElementById("app");
    graph.style.display = "none";
    
    //Show map
    let map = document.getElementById("map");
    map.style.display = "block";
}