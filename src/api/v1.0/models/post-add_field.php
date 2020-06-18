
<?php

/* ----------------------------------------------------------------
*   AUTHOR:         Pablo Enguix
*   FILE:           post-add_fields.php
*   DATE:           14/05/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */ 

if( (isset($_POST["name"]) && $_POST["name"] !== "" )&&
    (isset($_POST["centerLat"]) && $_POST["centerLat"] !== "" )&&
    (isset($_POST["centerLng"]) && $_POST["centerLng"] !== "" )) {

    session_start();
        $name = $_POST['name'];
        $centerLat = $_POST['centerLat'];
        $centerLng = $_POST['centerLng'];

        $plot = "INSERT INTO `plots`(`id`, `name`, `latitude`, `longitude`) VALUES (NULL,'$name',$centerLat,$centerLng)";
        
       mysqli_query($conn, $plot);
       $http_code = 200;             
}
