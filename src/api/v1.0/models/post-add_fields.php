<?php

require_once 'acceso.php';

        $id_field = $_POST['id'];
        
        session_start();
        $id_user = $_SESSION["user_id"];
            
            $ins = "INSERT INTO `users-plots`(`user`, `plot`) VALUES ($id_user,$id_field)";
            mysqli_query($conn, $ins);
            error_log($ins);
            $http_code = 200;   //Todo okey            