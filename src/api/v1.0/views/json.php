<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Daniel Burruchaga, Abidan Brito
*   FILE:           json.php
*   DATE:           16/04/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */ 

// Prepare to send HTTP headers
http_response_code($http_code);
    
// Send raw HTTP headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Content-Type: application/json; charset=utf-8");
    
// Output string in JSON format
echo json_encode($output);
?>