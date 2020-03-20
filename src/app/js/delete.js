function borrar(i) {
let formData = new FormData();

    formData.append('id', i);
   
    let conf = confirm("¿Borrar parcela?");
    
    if(conf == true){
       
       fetch('../api/v1.0/delete', {
        method: 'post',
        credentials:"same-origin",
        body: formData
    }).then(function(respuesta) {
        if (respuesta.status == 200) {
            location.href = 'app.html';
        }
    });
       
       }if(conf == false){
         location.href = 'app.html';  
       } 
}