<?php
// Start new or resume existing session
session_start();

// Check access authorization
if (!isset($_SESSION['registrado']) || $_SESSION['registrado'] != 'sesion_registrada') {
    http_response_code(401);
    die('{"error":"No autorizado"}');
}
else {
    http_response_code(200);
}
?>