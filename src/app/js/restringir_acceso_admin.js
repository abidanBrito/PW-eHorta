fetch('../api/v1.0/sesion_admin').then(function(res) {
    if (res.status != 200) {
        location.href = 'access_error.html';
    }
})