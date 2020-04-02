<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito Clavijo
*   FILE:           get-polygons.php
*   DATE:           25/03/2020
*   STATE:          DONE
*   ----------------------------------------------------------------
*   NOTICE: Copyright (c) 2020 Abidan Brito Clavijo
*   ---------------------------------------------------------------- */

require_once 'acceso.php';

// Get current user
$user = $_SESSION["user_id"];

// Define SQL query
$sql = "SELECT `vertex`.`id`, `vertex`.`plot`, `vertex`.`latitude`, `vertex`.`longitude` 
FROM `vertex`"; 
/*INNER JOIN `users-plots` 
WHERE `vertex`.`plot` = `users-plots`.`plot` 
AND `users-plots`.`user` = $user";
*/

// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($res)) {
    array_push($salida, $row);
}
    
$http_code = 200;