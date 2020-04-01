function showCheckbox() {
    let input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        if (input[i].getAttribute('type') == "checkbox") {
            input[i].style.display = "inherit";
            document.getElementById("delete").style.display = "none";
            document.getElementById("trash").style.display = "block";

        }
    }
}