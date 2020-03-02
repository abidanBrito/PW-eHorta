<?php
    $sql = 'SELECT * FROM `vendedores`';
    $res = mysqli_query($conn, $sql);
    while($fila = mysqli_fetch_assoc($res)){
    array_push($salida, $fila);
    }
    $http_code = 200;