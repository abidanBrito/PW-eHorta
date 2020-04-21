<?php
// Start new or resume existing session
session_start();

// Destroy specified variable
unset($_SESSION['registrado']);

// Destroy stored session data
session_destroy();

// Successful HTTP request
$http_code = 200;
?>