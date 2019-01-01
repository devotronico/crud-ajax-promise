<?php

 if ( isset($_POST) ) {
   
 
/**
 * PAGINATION
 * [First] [Previous] [.] [4] [5] (6) [7] [8] [.] [Next] [Last]
 * $currentPage: è il numero della pagina in cui ci troviamo
 * Con getRowsNumber() Otteniamo tutte le row di una pagina    
 * Se otteniamo almeno una row...TO-DO
 * 
 * 
 * $pageLast: è il numero dell' ultima pagina
 * se il numero di row è 30 e il numero di row per pagina è 5
 * l'ultima pagina è 6 
 * si ottiene facendo 30 row diviso 5 row per ogni pagina 
 * es.: $pageLast = ceil($totalRows / $rowForPage);
 * 
 * $activeLink: sono i bottoni che numerati che rappresentano le pagine
 * Se settiamo $activeLink = 3 e siamo alla pagina numero 5
 * allora verranno mostrati: 
 * i 3 bottoni precedenti all'attuale pagina e
 * i 3 bottoni successivi all'attuale pagina  
 * es.: [2] [3] [4] (5) [6] [7] [8]
 * 
 * 
 * codice ciclo for:  for ($i=0, $rowStart=-$rowForPage; $i<$currentPage; $rowStart+=$rowForPage, $i++);
 * $rowStart:  (offset) è la riga della tabella da cui cominciare a contare per prelevare i dati dalla tabella
 * $rowForPage: (count) è il numero di row che dovranno esserci in in ogni pagina
 * con il comando LIMIT offset , count
 * possiamo decidere che per popolare la pagina: da quale riga della tabella cominciare a prelevare (offset);  e quante righe dalla tabella vogliamo ottenere (count); 
 * Se siamo alla pagina [1]: 
 * offset dovrà avere valore 0: in questo modo comincerà a prelevare dalla riga numero 1
 * count è il numero di righe che viene prelevato, dovrà avere un valore numerico intero costante a nostra scelta: facciamo 5
 * quindi se offset è uguale a 0, e count è uguale a 5: verranno prelevate dalla tabella 
 * le righe: {1} {2} {3} {4} {5}  che popoleranno la pagina [1]
 * 
 * Se siamo alla pagina [2]: 
 * offset dovrà avere valore 5: in questo modo comincerà a prelevare dalla riga numero {6}
 * count avrà sempre valore 5
 * quindi se offset è uguale a 5, e count è uguale a 5: verranno prelevate dalla tabella 
 * le righe: {6} {7} {8} {9} {10}  che popoleranno la pagina [2]
 * 
 * Se siamo alla pagina [3]: 
 * offset dovrà avere valore 10: in questo modo comincerà a prelevare dalla riga numero {11}
 * count avrà sempre valore 5
 * quindi se offset è uguale a 10, e count è uguale a 5: verranno prelevate dalla tabella 
 * le righe: {11} {12} {13} {14} {15}  che popoleranno la pagina [3]
 */
    function pagination($totalRows, $rowForPage=5, $currentPage=1, $search){ 
   
        require "db.php";

        for ($i=0, $rowStart=-$rowForPage; $i<$currentPage; $rowStart+=$rowForPage, $i++);

        $pageLast = ceil($totalRows / $rowForPage);

        if (empty($search)) {
    
            $sql = "SELECT * FROM utenti LIMIT {$rowStart}, {$rowForPage}"; // SELECT * FROM utenti LIMIT '0', '2'

        } else {
         //  echo '{ "status": "error", "error": "search: '.$search.'" }'; die;
            $sql = "SELECT * FROM utenti WHERE firstname LIKE '%{$search}%' LIMIT {$rowStart}, {$rowForPage}"; // SELECT * FROM utenti LIMIT '0', '2'
        }

        $result = $mysqli->query($sql);

        if ($result->num_rows > 0) {
            
            $data = $result->fetch_all( MYSQLI_ASSOC ); //   $data->view = 'modal';  //  print_r($data);

            echo json_encode($data);

            $result->free();
        } else {
            
            echo '{ "status": "empty", "empty": "Database Vuoto 2!" }';
           // echo '{ "status": "empty", "empty": "pageLast: '.$pageLast.' rowStart: '.$rowStart.' rowForPage: '.$rowForPage.'" }'; die;
        } 
    }






    $str = $_POST["pages"]; 

    $obj = json_decode($str);

    $totalRows = $obj->totalRows;
    $rowForPage = $obj->rowForPage;
    $currentPage = $obj->currentPage;
    $search = $obj->search;
    // echo '{ "status": "empty", "empty": "rowForPage: '.$rowForPage.' currentPage: '.$currentPage.'" }'; die;
   
    pagination($totalRows, $rowForPage, $currentPage, $search); 










}



   /*
    $sql = "SELECT id, firstname, email FROM utenti"; 

    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        
        $data = $result->fetch_all( MYSQLI_ASSOC ); //   $data->view = 'modal';  //  print_r($data);

        //print_r($data);
        echo json_encode($data);

        $result->free();
    } else {
       
       echo '{ "status": "empty", "empty": "Database Vuoto!" }';
    }
    $mysqli->close();

} else {
    header("Location: index.html");


*/
