<?php

 if ( isset($_POST) ) {

  //  $rowForPage = $_POST["rowForPage"];



$str = $_POST["count"];

$obj = json_decode($str);

$pagenum = $obj->pagenum;
$rowForPage = $obj->rowForPage;


   
    require "db.php";
   
   /**
     * GET ROWS NUMBER
     * Otteniamo il numero totale delle righe presenti nella tabella 'utenti'    
     * Lo scopo è quello di calcolare il numero di righe per ogni pagina   
     * es. se abbiamo 30 righe e vogliamo che vengano visualizzate 3 righe ogni pagina     
     * allora faremo 30 righe / 3 che ci darà 10 pagine. in questo modo potremo fare la paginazione              
     */
    $sql = 'SELECT COUNT(*) FROM utenti';

    if ( $result = $mysqli->query($sql) ){

        $row = $result->fetch_row();

        $totalRows = $row[0];

        $pageLast = ceil($totalRows / $rowForPage);

        echo '{ "status": "count", "count": "ci sono '.$totalRows.' righe", "totalRows": "'.$totalRows.'", "pagenum": "'.$pagenum.'", "rowForPage": "'.$rowForPage.'", "pageLast": "'.$pageLast.'" }';
    } else {
        echo '{ "status": "empty", "empty": "Database Vuoto 2!" }';
    }
    


   
} else {
    header("Location: index.html");
}

