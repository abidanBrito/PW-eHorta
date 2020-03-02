<?php

    if(isset($_POST['key']) && $_POST['key'] !== '' ){
        $key = $_POST['key'];
        if($key == "key"){
            session_start();
            $_SESSION['registrado'] = "sesion_registrada";
            $http_code = 200;   //ALl right
        }else{
            $http_code = 401;   // No all right
        }
    }else{
        $http_code = 400; //Mal formulada
    }


    