<?php

/* ----------------------------------------------------------------
*   AUTHOR:         Daniel Burruchaga Sola
*   FILE:           post-thresholds.php
*   DATE:           08/05/2020
*   STATE:          pending

UPDATE thresholds SET min= %VALOR_FORM_MIN% WHERE plot= %ID_PLOT% AND magnitude = %FORM_MAGNITUD%

*  ---------------------------------------------------------------- */    

require_once 'access.php';

/*
DEFINIR VALORES DEL OBJETO:::: 
    maxHumedity
    minHumedity
    maxTemp
    minTemp
      ....
*/
        $maxHumedity = $_POST['maxHumedity'];
        $minHumedity = $_POST['minHumedity'];
        $maxTemperature = $_POST['maxTemperature'];
        $minTemperature = $_POST['minTemperature'];
        $maxPrecipitation = $_POST['maxPrecipitation'];
        $minPrecipitation = $_POST['minPrecipitation'];
        $maxLuminosity = $_POST['maxLuminosity'];
        $minLuminosity = $_POST['minLuminosity'];
        $maxSalinity = $_POST['maxSalinity'];
        $minSalinity = $_POST['minSalinity'];
        $id_plot = $_POST['threshold_id_plot'];

      
       $upd0 = "REPLACE INTO thresholds(id, plot, magnitude, min, max) VALUES (NULL,'.$id_plot.','humidity','.$minHumedity.','.$maxHumedity.');";
         $upd1 = "REPLACE INTO thresholds(id, plot, magnitude, min, max) VALUES (NULL,'.$id_plot.','temperature','.$minTemperature.','.$maxTemperature.');";
         $upd2 = "REPLACE INTO thresholds(id, plot, magnitude, min, max) VALUES (NULL,'.$id_plot.','rain','.$minPrecipitation.','.$maxPrecipitation.');";
         $upd3 = "REPLACE INTO thresholds(id, plot, magnitude, min, max) VALUES (NULL,'.$id_plot.','luminosity','.$minLuminosity.','.$maxLuminosity.');";
         $upd4 = "REPLACE INTO thresholds(id, plot, magnitude, min, max) VALUES (NULL,'.$id_plot.','salinity','.$minSalinity.','.$maxSalinity.');";

         mysqli_query($conn, $upd0);
       //  error_log($upd0);

         mysqli_query($conn, $upd1);
         mysqli_query($conn, $upd2);
         mysqli_query($conn, $upd3);
         mysqli_query($conn, $upd4);
            
        $http_code = 200;   //ALL RIGHT
 
        /* Cierra la conexión */
        $mysqli->close();