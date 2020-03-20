<?php
    $serverNombre = "localhost";
    //$userNombre = "abricla_admin";
    //$password = "_MT9PzKPte,qT~5h";
    //$dbNombre = "abricla_users_db";
    $userNombre = "root";
    $password = "";
    $dbNombre = "users_db";
    // Crear la conexión
    $conn = mysqli_connect($serverNombre,$userNombre, $password, $dbNombre);
    mysqli_query($conn, 'SET NAMES utf8');
