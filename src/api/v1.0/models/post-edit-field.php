<?php

/* ----------------------------------------------------------------
*   AUTHOR:         Jorge Grau
*   FILE:           post-edit-field.js
*   DATE:           19/04/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */    

require_once 'acceso.php';

        $id_field = $_POST['id'];
        $id_name = $_POST['name'];
        $id_longitude = $_POST['longitude'];
        $id_latitude = $_POST['latitude'];
        
        error_log($id_field);      
// Uso actualiza para completar la secuencia poco a poco, permitiendo así modificar los
// apartados que se requieran en el momento.
$actualiza = "";
if (!empty($id_name)) $actualiza .= "`name`='$id_name'";
if (!empty($id_longitude)) {
    if (!empty($actualiza)) $actualiza .= ",";
    $actualiza .= "`longitude`='$id_longitude'";
}
if (!empty($id_latitude)) {
    if (!empty($actualiza)) $actualiza .= ",";
    $actualiza .= "`latitude`='$id_latitude'";
}
            
            if (!empty($actualiza)) {
                $ins = "UPDATE `plots` SET $actualiza WHERE `id` = $id_field";
                mysqli_query($conn, $ins);
                error_log($ins);
            }
            $http_code = 200;   //Todo okey





