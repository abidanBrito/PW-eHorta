<?php
// Fire up a session (or resume an existing one)
require_once 'access.php';

// Check if the existing session is an admin user
if ($_SESSION["user_roleId"] == 2) {
    // Successful HTTP request
    $http_code = 200;
}
?>