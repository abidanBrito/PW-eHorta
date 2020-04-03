<?php

    if((isset($_POST['name']) && $_POST['name'] !== '' )&&(isset($_POST['latitude']) && $_POST['latitude'] !== '' )&&(isset($_POST['longitude']) && $_POST['longitude'] !== '' )){
       
        $name = $_POST['name'];
        $latitude = $_POST['latitude'];
        $longitude = $_POST['longitude'];
        
        session_start();
        $id_user = $_SESSION["user_id"];
        
        $sql = "SELECT id FROM plots WHERE latitude = $latitude AND  longitude = $longitude";
        
        $res = mysqli_query($conn, $sql);
        if(mysqli_num_rows($res)==0){
            $ins = "INSERT INTO `plots`(`id`, `name`, `latitude`, `longitude`) VALUES (NULL,'$name',$latitude,$longitude)";
            mysqli_query($conn, $ins);
            
            
            /*
            $last_id = mysqli_insert_id($conn);
            $ins = "INSERT INTO `users-plots`(`user`, `plot`) VALUES ($id_user,$last_id)";
            mysqli_query($conn, $ins);
            */
            
            $http_code = 200;   //Todo okey            
        }else{
            $http_code = 401;   // Unauthorized
        }
        
        
    }else{
        $http_code = 400; //Petición mal formulada
    }