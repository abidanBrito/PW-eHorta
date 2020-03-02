<?php

    session_start();
    if(isset($_SESSION['registrado']) && $_SESSION['registrado'] == "sesion_registrada"){ //Evalúa los inicios de sesión
        $http_code = 200;
    }else{
        $http_code = 401;
    }