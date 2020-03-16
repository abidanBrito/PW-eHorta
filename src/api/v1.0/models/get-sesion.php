<?php
require_once 'acceso.php';

session_start();
if (isset($_SESSION['registered']) && $_SESSION['registered'] == 'ok') {
    $http_code = 200;
}
else {
    $http_code = 401;
}