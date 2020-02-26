<?php

require_once '../includes/conexion.php';

define('API_VERSION', 'v1.0'); // definimos una constante con la versión de la API

// Parsear la URL... Obtenemos la parte del path que va después de la versión de la API mediante parse_url(), ya que  nos permite obtener el path de la petición
$uri = explode(API_VERSION.'/', parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH))[1];

    //  Lo covertimos en un array mediante explode, ya que convierte la cadena en un array y devuelve el segundo elemento // i.e.: “ventas/vendedor/i” -> [“ventas”, “vendedor”, “1”] //
$uri_array = explode('/',$uri);

//  Obtener el recurso solicitado... Con array_shift() extraemos de ese array el primer elemento, que será el recurso solicitado
$recurso = array_shift($uri_array);

//  Obtener el tipo de operación solicitada*/ Obtenemos el método HTTP usado en la petición, y  lo convertimos a minúsculas para garantizar coherencia
$operacion = strtolower($_SERVER['REQUEST_METHOD']);

switch ($operacion) {  // evaluamos la operacion que se solicita y en caso de que sea get se procede a contruir la sentencia, ejecutarla y por cada registro devuelto creamos un elemento en un array.
    case 'get':
        $sql = 'SELECT * FROM `ventas`';
        $res = mysqli_query($conexion, $sql);
        $resultado = array();
        while($fila = mysqli_fetch_assoc($res)){
            array_push($resultado, $fila);
        }
        break;
    case 'post'   :
        $sql = 'SELECT * FROM `usuarios`'; // USUARIOS PARA LOGEARSE ** //EN TEORIA ESTO ES PARA BUSCAR EN LOS USUARIOS CUANDO DETECTE UN POST
        $res = mysqli_query($conexion,$sql);
        $resultado = array();
        while($fila = mysqli_fetch_assoc($res)){
            array_push($resultado, $fila);
        }
        break;
}

////Con la función header() configuramos los  ncabezados de la respuesta HTTP para permitir peticiones desde cualquier dominio ,
/// permitir peticiones por metodos put post get y delete e indicar que lo que se devuelve es un JSON

header("Access‐Control‐Allow‐Origin: *");
header('Access‐Control‐Allow‐Methods: PUT, GET, POST, DELETE');
header('Content‐Type: application/json; charset=utf‐8');
echo json_encode($resultado);


$sql = 'SELECT vendedores.nombre as nombreVendedor, vendedores.apellidos as
apellidosVendedor,clientes.nombre as nombreCliente, ventas.* FROM `ventas`,
vendedores, clientes WHERE ventas.vendedor = vendedores.id AND
ventas.cliente = clientes.id';

$res = mysqli_query($conexion, $sql);

$resultado = array();
while($fila = mysqli_fetch_assoc($res)){
    $vendedor = array("id" => $fila["vendedor"], "nombre" =>
    $fila["nombreVendedor"], "apellidos" => $fila["apellidosVendedor"]);
    $cliente = array("id" => $fila["cliente"], "nombre" =>
    $fila["nombreCliente"]);
    $fila["vendedor"] = $vendedor;
    $fila["cliente"] = $cliente;
    unset($fila["nombreVendedor"]);
    unset($fila["apellidosVendedor"]);
    unset($fila["nombreCliente"]);
    array_push($resultado, $fila);
}