<?php

if((isset($_POST['pass']) && $_POST['pass'] !== '') && (isset($_POST['user']) && $_POST['user'] !== '')) {      
    $user = $_POST['user'];
    $key = $_POST['pass'];
        
    //$sql = "SELECT * FROM `users` WHERE email = $user AND  password = $key";
    $sql = "SELECT
    users.id,
    users.email,
    users.name,
    users.roleId,
    roles.name
        FROM
    users,
    roles
        WHERE
    users.email = '$user' AND users.roleId = roles.id AND users.password = '$key'";

    $res = mysqli_query($conn, $sql);
    $array_sql = mysqli_fetch_assoc($res);
    //var_dump($array_sql);

    if(mysqli_num_rows($res) > 0) {
        session_start();
            
        $_SESSION['registrado'] = "sesion_registrada";
        $_SESSION["user_id"]= $array_sql["id"];
        $_SESSION["user_email"]=$array_sql["email"];
        $_SESSION["user_name"]=$array_sql["name"];
        $_SESSION["user_roleId"]=$array_sql["roleId"];
        //var_dump($_SESSION["user_id"]);
        //var_dump( $_SESSION["user_email"]);
        
        $http_code = 200;   // All good            
    }
    else {
        $http_code = 401;   // Unauthorized
    }
}
else {
    $http_code = 400; // Poorly formulated request
}