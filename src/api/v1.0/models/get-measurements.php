<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito Clavijo
*   FILE:           get-measurements.php
*   DATE:           01/04/2020
*   STATE:          DONE
*   ----------------------------------------------------------------
*   NOTICE: Copyright (c) 2020 Abidan Brito Clavijo
*   ---------------------------------------------------------------- */

require_once 'acceso.php';

// Get current user
$user = $_SESSION["user_id"];

// Define SQL query
$sql = "SELECT `measurements`.`id`, `measurements`.`position`, `measurements`.`datetime`, `measurements`.`salinity`, 
`measurements`.`rain`, `measurements`.`humidity`, `measurements`.`luminosity`, `measurements`.`temperature`
FROM `measurements`"; 

// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($res)) {
    array_push($salida, $row);
}
    
$http_code = 200;