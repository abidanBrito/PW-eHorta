function showCheckbox() {
    let input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        if (input[i].getAttribute('type') == "checkbox") {
            input[i].style.visibility = "visible";
            document.getElementById("delete").style.display = "none";
            document.getElementById("trash").style.display = "inline";

        }
    }
}