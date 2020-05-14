<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Daniel Burruchaga Sola
*   FILE:           get-thresholds.php
*   DATE:           08/05/2020
*   STATE:          pending
*  ---------------------------------------------------------------- */ 

// Resume session
require_once 'access.php';

// Define SQL query
$sql = "SELECT `thresholds`.`plot`, `thresholds`.`magnitude`, `thresholds`.`min`, `thresholds`.`max`, `plots`.`name`
FROM `thresholds` 
	LEFT JOIN `plots` ON `thresholds`.`plot` = `plots`.`id`;"; //
// SELECT * FROM `thresholds` WHERE plot = 2 
// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
}

// Successful HTTP request
$http_code = 200;
?>