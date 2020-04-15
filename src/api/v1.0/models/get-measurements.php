<?php
// Resume session
require_once 'access.php';

// Define SQL query
$sql = "SELECT `measurements`.`id`, `measurements`.`position`, `measurements`.`datetime`, `measurements`.`salinity`, 
`measurements`.`rain`, `measurements`.`humidity`, `measurements`.`luminosity`, `measurements`.`temperature`
FROM `measurements`"; 

// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
}
    
// Successful HTTP request
$http_code = 200;
?>