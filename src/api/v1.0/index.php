<?php
/* ----------------------------------------------------------------
*   AUTHOR:         Daniel Burruchaga, Abidan Brito
*   FILE:           index.php
*   DATE:           16/04/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */ 

// Connect to database
require_once '../includes/connect.php';

// Current API version
define('API_VERSION', 'v1.0');

// Truncate url (everything after API version)
$uri = explode(API_VERSION.'/', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))[1];

// Convert to array
$uri_array = explode('/', $uri);

// Get required resource
$resource = array_shift($uri_array);

// Get required operation
$operation = strtolower($_SERVER['REQUEST_METHOD']);

// Prepare output array
$output = array();
$view = 'json';
$http_code = 404;

// Including the model
include "models/$operation-$resource.php";

// Including the view
include "views/$view.php";
?>