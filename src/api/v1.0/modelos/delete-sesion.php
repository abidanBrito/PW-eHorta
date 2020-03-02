<?php
    session_start(); /*Iniciar una nueva sesión o reanudar la existente*/
    unset($_SESSION['registrado']); /*Destruye una variable especificada*/
    session_destroy(); /*Destruye toda la información registrada de una sesión*/
    $http_code = 200;