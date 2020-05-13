<?php
// Resume session
require_once 'access.php';

// Get current user
$user = $_SESSION["user_id"];

// Define SQL query
$sql = "SELECT `plots`.`name`, `plots`.`longitude`, `plots`.`latitude`, `plots`.`id`, `plots`.`codmun` FROM `plots` INNER JOIN `users-plots` WHERE `plots`.`id` = `users-plots`.`plot` AND `users-plots`.`user` = $user";

// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
}

// Successful HTTP request
$http_code = 200;
?>