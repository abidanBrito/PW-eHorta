<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito
*   FILE:           connect.php
*   DATE:           16/04/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */ 

// Database access credentials
$serverName = "localhost";
$userName = "abricla_admin";
$password = "_MT9PzKPte,qT~5h";
$dbName = "abricla_users_db";

// Establish connection
$conn = mysqli_connect($serverName, $userName, $password, $dbName);
mysqli_query($conn, 'SET NAMES utf8');
?>