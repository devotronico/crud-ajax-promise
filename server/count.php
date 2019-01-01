<?php

 if ( isset($_POST) ) {

  //  $rowForPage = $_POST["rowForPage"];



$str = $_POST["count"];

$obj = json_decode($str);

// $pagenum = $obj->pagenum;
$rowForPage = $obj->rowForPage;
$search =  $obj->search;

   
    require "db.php";
   
   /**
     * GET ROWS NUMBER
     * Otteniamo il numero totale delle righe presenti nella tabella 'utenti'    
     * Lo scopo è quello di calcolare il numero di righe per ogni pagina   
     * es. se abbiamo 30 righe e vogliamo che vengano visualizzate 3 righe ogni pagina     
     * allora faremo 30 righe / 3 che ci darà 10 pagine. in questo modo potremo fare la paginazione              
     */

    if (empty($search)) {

        $sql = "SELECT COUNT(*) FROM utenti";
    } else {

        $sql = "SELECT COUNT(*) FROM utenti WHERE firstname LIKE '%{$search}%'";
    }

 //   $result = $mysqli->query($sql);
     if ( $result = $mysqli->query($sql) ){
        
        $row = $result->fetch_row();
        
        $totalRows = $row[0];
    //    if ($totalRows > 0) {

        $pageLast = ceil($totalRows / $rowForPage);

        echo '{ "status": "count", "count": "ci sono '.$totalRows.' righe", "totalRows": "'.$totalRows.'", "rowForPage": "'.$rowForPage.'", "pageLast": "'.$pageLast.'" }';
    } else {

        echo '{ "status": "error", "error": "Error in file count.php!" }';
    }
    


   
} else {
    header("Location: index.html");
}

