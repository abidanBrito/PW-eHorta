function data_filter(dataType) {
    document.getElementById("humidity").style.display = ""
    document.getElementById("salinity").style.display = ""
    document.getElementById("rainfall").style.display = ""
    document.getElementById("temperature").style.display = ""
    document.getElementById("pressure").style.display = ""

    document.getElementById(dataType).style.display = "block"
}