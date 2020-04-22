<?php

require_once 'access.php';

$id = $_POST['id'];
$sql = "DELETE FROM plots WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    $http_code = 200;
} else {
    echo "Error deleting record: " . $conn->error;
}