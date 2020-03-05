<?php
require_once '../includes/connect.php';
define('API_VERSION', 'v1.0');
/***************************
1.‐ Parsear la URL...
***************************/
// 1.1.‐ Obtenemos la parte del path que va después de la versión de la API
$uri = explode(API_VERSION.'/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))[1];
// 1.2.‐ Lo covertimos en un array ...
$uri_array = explode('/',$uri);
/***************************
2.‐ Obtener el recurso solicitado...
***************************/
$recurso = array_shift($uri_array);
/***************************
3.‐ Obtener el tipo de operación solicitada...
***************************/
$operacion = strtolower($_SERVER['REQUEST_METHOD']);
/***************************
4.- Preparar la salida
***************************/
$salida = array();
$vista = 'json';
$http_code = 404;
// modelo
include "models/$operacion-$recurso.php";
// vista
include "views/$vista.php";