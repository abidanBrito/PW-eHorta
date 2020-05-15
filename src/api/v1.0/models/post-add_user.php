<?php

/* ----------------------------------------------------------------
*   AUTHOR:         Pablo Enguix
*   FILE:           post-add_user.php
*   DATE:           14/05/2020
*   STATE:          DONE
*  ---------------------------------------------------------------- */ 

    if((isset($_POST['name']) && $_POST['name'] !== '' )&&(isset($_POST['surname']) && $_POST['surname'] !== '' )&&(isset($_POST['email']) && $_POST['email'] !== '' )&&(isset($_POST['pass']) && $_POST['pass'] !== '' )&&(isset($_POST['role']) && $_POST['role'] !== '' )){
       
        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $email = $_POST['email'];
        $pass = $_POST['pass'];
        $rol = $_POST['role'];
        
        session_start();
        $id_user = $_SESSION["user_id"];
        
        $sql = "SELECT id FROM users WHERE email = $email";
        
        $res = mysqli_query($conn, $sql);
        if(mysqli_num_rows($res)==0){
            $ins = "INSERT INTO `users`(`id`, `name`, `surname`, `email`, `password`, `roleId`) VALUES (NULL,'$name','$surname','$email','$pass' ,$rol)";
            mysqli_query($conn, $ins);         
            $http_code = 200;   //Todo okey            
        }else{
            $http_code = 401;   // Unauthorized
        }
        
        
    }else{
        $http_code = 400; //Petición mal formulada
    }