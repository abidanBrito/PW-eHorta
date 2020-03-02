<?php
    $serverNombre = "localhost";
    $userNombre = "root";
    $password = "";
    $dbNombre = "Control_de_ventanas";
    // Crear la conexión
    $conn = mysqli_connect($serverNombre,$userNombre, $password, $dbNombre);

    mysqli_query($conn, 'SET NAMES utf8');