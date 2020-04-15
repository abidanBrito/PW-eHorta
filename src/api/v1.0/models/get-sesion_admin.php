<?php
require_once 'acceso.php';
if($_SESSION["user_roleId"] == 2){
    $http_code = 200;
}