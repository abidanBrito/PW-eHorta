<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito Clavijo
*   FILE:           get-polygons.php
*   DATE:           08/04/2020
*   STATE:          DONE
*   ----------------------------------------------------------------
*   NOTICE: Copyright (c) 2020 Abidan Brito Clavijo
*   ---------------------------------------------------------------- */

require_once 'acceso.php';

// Get current user
$user = $_SESSION["user_id"];

// Define SQL query
$sql = "SELECT p.*, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('lat', v.latitude, 'lng', v.longitude)), ']') 
AS plotPath FROM `plots` AS p INNER JOIN `vertex` AS v ON p.id = v.plot GROUP BY p.id";

// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($res)) {
    array_push($salida, $row);
}

$http_code = 200;
?>