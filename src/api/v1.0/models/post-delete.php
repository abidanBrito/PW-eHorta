<?php

    if((isset($_POST['id']) && $_POST['id'] !== 0 )){
        
        $id = $_POST['id'];
        
         //$datos = "SELECT id, name, type FROM fields WHERE name = '$name' AND type = '$type' AND id = $id";
        
        $del = "DELETE FROM `plots` WHERE `plots`.`id` = $id";
        mysqli_query($conn, $del);
        error_log();
        $http_code = 200;   //Todo okey            
    }else{
        $http_code = 400; //Petición mal formulada
    }