<?php

    if((isset($_POST['name']) && $_POST['name'] !== '' )&&(isset($_POST['email']) && $_POST['email'] !== '' )&&(isset($_POST['pass']) && $_POST['pass'] !== '' )){
       
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $rol = $_POST['rolList'];
        
        session_start();
        $id_user = $_SESSION["user_id"];
        
        $sql = "SELECT id FROM users WHERE email = $email";
        
        $res = mysqli_query($conn, $sql);
        if(mysqli_num_rows($res)==0){
            $ins = "INSERT INTO `users`(`id`, `name`, `surname`, `email`, `password`, `roleId`) VALUES (NULL,'$name','$surname','$email','$pass' ,$rol)";
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