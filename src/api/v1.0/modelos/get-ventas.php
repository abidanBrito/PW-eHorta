<?php
    session_start();
    if(isset($_SESSION['registrado']) && $_SESSION['registrado'] == "sesion_registrada"){
        $sql = 'SELECT vendedores.nombre as nombreVendedor,
            vendedores.apellidos as apellidosVendedor,
            clientes.nombre as nombreCliente, ventas.*
            FROM `ventas`, vendedores, clientes
            WHERE ventas.vendedor = vendedores.id AND ventas.cliente = clientes.id ';

        $filtros = array();
        if(isset($_GET['vendedor']))array_push($filtros, ' ventas.vendedor =' . $_GET['vendedor']);
        if(isset($_GET['cliente']))array_push($filtros, ' ventas.cliente =' . $_GET['cliente']);
        if(isset($_GET['inicio']))array_push($filtros, ' ventas.fecha >= "' . $_GET['inicio']. '"');
        if(isset($_GET['fin']))array_push($filtros, ' ventas.fecha <= "' . $_GET['fin']. '"');

        if(count($filtros) > 0) $sql .= 'AND' . join(' AND ', $filtros);

        $res = mysqli_query($conn, $sql);

        while($fila = mysqli_fetch_assoc($res)){
            $vendedor = array("id" => $fila["vendedor"],
            "nombre" => $fila["nombreVendedor"],
            "apellidos" => $fila["apellidosVendedor"]);
            $cliente = array("id" => $fila["cliente"],
            "nombre" => $fila["nombreCliente"]);
            $fila["vendedor"] = $vendedor;
            $fila["cliente"] = $cliente;
            unset($fila["nombreVendedor"]);
            unset($fila["apellidosVendedor"]);
            unset($fila["nombreCliente"]);
            array_push($salida, $fila);
        }

        $http_code = 200;
}else{
    http_response_code(401);
    die('{"error": "Not authorized"}');
}