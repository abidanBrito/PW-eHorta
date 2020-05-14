<?php

    if( (isset($_POST['name']) && $_POST['name'] !== '' )&&
        (isset($_POST['centerLat']) && $_POST['centerLat'] !== '' )&&
        (isset($_POST['centerLng']) && $_POST['centerLng'] !== '' )&&
        (isset($_POST['latitude']) && $_POST['latitude'] !== [] )&&
        (isset($_POST['longitude']) && $_POST['longitude'] !== [] )&&
        (isset($_POST['probeLats']) && $_POST['probeLats'] !== [""] )&&
        (isset($_POST['probeLngs']) && $_POST['probeLngs'] !== [""] )){
       
        $name = $_POST['name'];
        $centerLat = $_POST['centerLat'];
        $centerLng = $_POST['centerLng'];
        
        session_start();
        $id_user = $_SESSION["user_id"];
        
        $id_plot = "SELECT id FROM plots WHERE latitude = $latitude AND  longitude = $longitude";
        
        $res = mysqli_query($conn, $id_plot);
        if(mysqli_num_rows($res)==0){
            $plot = "INSERT INTO `plots`(`id`, `name`, `latitude`, `longitude`) VALUES (NULL,'$name',$centerLat,$centerLng)";
            mysqli_query($conn, $plot);          
            
            /*
            $last_id = mysqli_insert_id($conn);
            $ins = "INSERT INTO `users-plots`(`user`, `plot`) VALUES ($id_user,$last_id)";
            mysqli_query($conn, $ins);
            */
            if ($conn->query($sql) === TRUE) {
                $allLats = $_POST["allLats"];
                $allLngs = $_POST["allLngs"];
                $plotID = "SELECT LAST `id` FROM `plots`";
                for ($i=0; $i < sizeof($allLats); $i++) { 
                    $pos = "INSERT INTO `vertex` (`id`, `plot`, `latitude`, `longitude`) VALUES (NULL, '$plotID', '$allLats[i]', '$allLngs[i]')";
                    mysqli_query($conn, $pos);
                    if ($conn->query($pos) === FALSE) {
                        $del = "DELETE * FROM `vertex` WHERE `plot=`'$plotID'";
                        mysqli_query($conn, $del);
                        $http_code = 400;
                    }
                }
                if ($conn->query($pos) === TRUE) {
                    $probeLats = $_POST["probeLats"];
                    $probeLngs = $_POST["probeLngs"];

                    for ($i=0; $i < sizeof($probeLats); $i++) { 
                        $pos = "INSERT INTO `positions` (`id`, `plot`, `latitude`, `longitude`) VALUES (NULL, '$plotID', '$probleLats[i]', '$probeLngs[i]')";
                    mysqli_query($conn, $pos);
                    if ($conn->query($pos) === TRUE) {
                        $lastPos = "SELECT LAST `id` FROM `positions`";
                        mysqli_query($conn, $lastPos);
                        $probe = "INSERT INTO `probe` (`position`, `serial`) VALUES ($lastPos, NULL)";
                        mysqli_query($conn, $probe);
                        if ($conn->query($probe) === FALSE) {
                            $del = "DELETE * FROM `probe` WHERE `plot=`'$plotID'";
                            mysqli_query($conn, $del);
                            $http_code = 400;
                        }
                    } 
                    else {
                        $del = "DELETE * FROM `positions` WHERE `plot=`'$plotID'";
                        mysqli_query($conn, $del);
                        $http_code = 400;
                    }
                    }
                }
            }         
            $http_code = 200;   //Todo okey   
        }else{
            $http_code = 401;   // Unauthorized
        }
        
        
    }else{
        $http_code = 400; //Petición mal formulada
    }