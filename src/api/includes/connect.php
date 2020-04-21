<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Abidan Brito
*   FILE:           connect.php
*   DATE:           16/04/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */ 

    // Crear la conexión
    $conn = mysqli_connect($serverNombre, $userNombre, $password, $dbNombre);
    mysqli_query($conn, 'SET NAMES utf8');

// Establish connection
$conn = mysqli_connect($serverName, $userName, $password, $dbName);
mysqli_query($conn, 'SET NAMES utf8');
?>