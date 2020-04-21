function enviar(evento) {
    evento.preventDefault();
    fetch('../api/v1.0/sesion', {
        method: 'post',
        body: new FormData(document.getElementById('form-credentials')),
        credentials: "same-origin"  
    }).then(function (answer) {
        if (answer.status == 200) {
            return answer.json();
        } 
        else {
            document.getElementById("error-msg").style.display = "block";
        } 
    }).then(function(jsonData)  {
            if (jsonData[0] == "1") {
                location.href = 'app.html';
            }
            if (jsonData[0] == "2") {
                location.href = 'admin.html';
            }
            if (jsonData[0] == "3") {
                location.href = 'app.html';
            }
            if (jsonData[0] == "4") {
                location.href = 'app.html';
            }
    });
}