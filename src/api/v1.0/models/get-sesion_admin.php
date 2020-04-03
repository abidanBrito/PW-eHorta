<?php
require_once 'acceso.php';
session_start();
if($_SESSION["user_roleId"] == 2){
    $http_code = 200;
}