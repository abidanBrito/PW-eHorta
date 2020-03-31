<?php

// Gets access to globals
require_once 'acceso.php';

    $sql = "SELECT `positions`.`plot`, `positions`.`longitude`, `positions`.`latitude` FROM `positions`";
    
    $res = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_assoc($res)) {
        array_push($salida, $row);
    }
    
    $http_code = 200;