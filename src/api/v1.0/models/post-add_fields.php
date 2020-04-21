<?php

/* ----------------------------------------------------------------
*   AUTHOR:         Jorge Grau
*   FILE:           post-add_fields.js
*   DATE:           19/04/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */    

require_once 'acceso.php';

        $id_field = $_POST['id'];

        if (!isset($_SESSION)) session_start();
        $id_user = $_SESSION["user_id"];

        // Replace me permite añadir las relaciones usuario-campo no creadas y "modificar" las ya creadas
        // es decir en la base de datos no aparecen dos 1,7 porque el segundo ha modificado al primero
        // "modificando" al 1 con otro 1 y al 7 con otro 7
        $ins = "REPLACE INTO `users-plots`(`user`, `plot`) VALUES ($id_user,$id_field)";
        mysqli_query($conn, $ins);
        error_log($ins);
        $http_code = 200;   //Todo okey  

?>