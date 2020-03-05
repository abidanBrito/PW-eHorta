<?php
session_start();
if (!isset($_SESSION['registrado']) || $_SESSION['registrado'] != 'sesion_registrada') {
http_response_code(401);
die('{"error":"No autorizado"}');
}
else{
    http_response_code(200);
}