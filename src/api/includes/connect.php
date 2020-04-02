<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito Clavijo
*   FILE:           connect.php
*   DATE:           06/03/2020
*   STATE:          DONE
*   ----------------------------------------------------------------
*   NOTICE: Copyright (c) 2020 Abidan Brito Clavijo
*   ---------------------------------------------------------------- */

// Database access credentials
$serverName = "localhost";
$userName = "abricla_admin";
$password = "_MT9PzKPte,qT~5h";
$dbName = "abricla_users_db";

// Establish connection
$conn = mysqli_connect($serverName, $userName, $password, $dbName);
mysqli_query($conn, 'SET NAMES utf8');
