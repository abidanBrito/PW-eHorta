<?php

// Gets access to globals
require_once 'acceso.php';

    $user = $_SESSION["user_id"];

    $sql = "SELECT `plots`.`name`, `plots`.`longitude`, `plots`.`latitude`, `plots`.`id` FROM `plots` INNER JOIN `users-plots` WHERE `plots`.`id` = `users-plots`.`plot` AND `users-plots`.`user` = $user";
    
    $res = mysqli_query($conn, $sql);

    while($row = mysqli_fetch_assoc($res)) {
        array_push($salida, $row);
    }
    
    $http_code = 200;