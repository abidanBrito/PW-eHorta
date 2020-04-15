<?php
// Resume session
require_once 'access.php';

// Define SQL query
$sql = "SELECT p.*, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('lat', v.latitude, 'lng', v.longitude)), ']') 
AS plotPath FROM `plots` AS p INNER JOIN `vertex` AS v ON p.id = v.plot GROUP BY p.id";

// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
}

// Successful HTTP request
$http_code = 200;
?>