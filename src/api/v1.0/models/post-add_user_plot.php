<?php
session_start();

$plotID = $_POST["plotID"];
$userId = $_POST["userId"];

$sql = "INSERT INTO `users-plots` VALUES($userId, $plotID)";
mysqli_query($conn, $sql);
$http_code = 200;