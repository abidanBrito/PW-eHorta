fetch('../api/v1.0/sesion').then(function(res) {
    if (res.status != 200) {
        location.href = 'login.html';
    }
})