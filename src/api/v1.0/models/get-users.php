<?php

// Gets access to globals
require_once 'acceso.php';

    $user = $_SESSION["user_id"];

    $sql = "SELECT `users`.`name`, `users`.`id` FROM `users`";
    
    $res = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_assoc($res)) {
        array_push($salida, $row);
    }
    
    $http_code = 200;