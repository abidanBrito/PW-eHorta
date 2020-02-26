<?php
$bbdd_server = 'localhost';
$bbdd_user = 'root';
$bbdd_password = '';
$bbdd = 'control_ventas';
$conexion = mysqli_connect($bbdd_server,$bbdd_user,$bbdd_password,$bbdd);
mysqli_query($conexion, 'SET NAMES utf8');