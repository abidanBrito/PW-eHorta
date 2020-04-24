fetch('../api/v1.0/sesion').then(function(res) {
    if (res.status != 200) {
        location.href = 'access_error.html';
    }
    else {
        document.body.style.display = "block";
    }
})