<?php
// Resume session
require_once 'access.php';

// Get current user
$user = $_SESSION["user_id"];

// Define SQL query
$sql="SELECT thresholds.max, thresholds.min, thresholds.magnitude, measurements.position, measurements.salinity, measurements.rain, measurements.humidity, measurements.luminosity, measurements.temperature, `users-plots`.plot, plots.name, measurements.datetime,DATE_FORMAT(measurements.datetime, '%d de %M') as fecha1, DATE_FORMAT(measurements.datetime, '%H:%i') as hora1 FROM thresholds, positions, measurements, `users-plots`, plots WHERE `users-plots`.user=$user AND thresholds.plot=`users-plots`.plot AND positions.plot=`users-plots`.plot AND measurements.position=positions.id AND plots.id=`users-plots`.`plot` order by measurements.datetime DESC, `users-plots`.plot, measurements.position, thresholds.magnitude";
    
error_log($sql);
// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
}
error_log(json_encode($output));
// Successful HTTP request
$http_code = 200;
?>