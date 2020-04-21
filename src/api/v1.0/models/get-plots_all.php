<?php
// Resume session
require_once 'access.php';

// Define SQL query
$sql = "SELECT `plots`.`name`, `plots`.`longitude`, `plots`.`latitude`, `plots`.`id` FROM `plots`";

// Send SQL query to the active database    
$res = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
}
    
// Successful HTTP request
$http_code = 200;
?>