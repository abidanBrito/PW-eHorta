<?php

    if(isset($_POST)){
        
        error_log(json_encode($_POST));
        // Compruebo que opciones se han marcado y cuales no.
        
        if (isset($_POST['campo'])) $field = $_POST['campo'];
        else $field= -1;
        
        if (isset($_POST['fecha'])) $datetime = $_POST['fecha'];
        else $datetime= "";
        
        if (isset($_POST['humidity'])) $humidity = 1;
        else $humidity = 0;
        if (isset($_POST['salinity'])) $salinity = 1;
        else $salinity = 0;
        if (isset($_POST['luminosity'])) $luminosity = 1;
        else $luminosity = 0;
        if (isset($_POST['temperature'])) $temperature = 1;
        else $temperature = 0;
        if (isset($_POST['rainfall'])) $rain = 1;
        else $rain = 0;
        
        // Para filtrar por magnitudes : thresholds.magnitude = $magnitud
        // Para filtrar por fecha : measurements.datetime = $datetime
        // Para filtrar por campo : plot.id = $field
        
        session_start();
        $user = $_SESSION["user_id"];
        
        $medidas="";
        $newfield="";
        
        // Busco las que están marcadas, si son "verdaderas", las añado, si hay una que se ha añadido antes que ellas, añado un OR delante.
        if ($humidity) $medidas .= " thresholds.magnitude='humidity' ";
        if ($salinity) {
            if (!empty($medidas)) $medidas .= " OR ";
            $medidas .= " thresholds.magnitude='salinity' ";
        }
        if ($luminosity) {
            if (!empty($medidas)) $medidas .= " OR ";
            $medidas .= " thresholds.magnitude='luminosity' ";
        }
        if ($temperature) {
            if (!empty($medidas)) $medidas .= " OR ";
            $medidas .= " thresholds.magnitude='temperature' ";
        }
        if ($rain) {
            if (!empty($medidas)) $medidas .= " OR ";
            $medidas .= " thresholds.magnitude='rain' ";
        }
        
        // Finalmente construyo la frase final y lanzo el sql.
        if (!empty($medidas)) $medidas = " AND (".$medidas.")";
        if ($field > 0) $newfield = " AND (plots.id = ".$field.")";
        if (!empty($datetime)) $datetime = " AND (DATE(measurements.datetime) = '".$datetime."')";
       
        
        $sql="SELECT thresholds.max, thresholds.min, thresholds.magnitude, measurements.position, measurements.salinity, measurements.rain, measurements.humidity, measurements.luminosity, measurements.temperature, `users-plots`.plot, plots.name, measurements.datetime,DATE_FORMAT(measurements.datetime, '%d de %M') as fecha1, DATE_FORMAT(measurements.datetime, '%H:%i') as hora1 FROM thresholds, positions, measurements, `users-plots`, plots WHERE `users-plots`.user=$user AND thresholds.plot=`users-plots`.plot AND positions.plot=`users-plots`.plot AND measurements.position=positions.id AND plots.id=`users-plots`.`plot`";
        $sql .= $medidas;
        $sql .= $newfield;
        $sql .= $datetime;
        $sql .= " order by measurements.datetime DESC, `users-plots`.plot, measurements.position, thresholds.magnitude ";
    
error_log($sql);
// Send SQL query to the active database
$res = mysqli_query($conn, $sql);

while($row = mysqli_fetch_assoc($res)) {
    array_push($output, $row);
}
// Successful HTTP request
$http_code = 200;
    }
else
    $http_code = 400;
?>