<?php
    $serverNombre = "localhost";
    $userNombre = "root";
    $password = "";
    $dbNombre = "users_db";
    // Crear la conexión
    $conn = mysqli_connect($serverNombre,$userNombre, $password, $dbNombre);
    mysqli_query($conn, 'SET NAMES utf8');