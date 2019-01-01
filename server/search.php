<?php
/*
 if ( isset($_POST) ) {

    $search = $_POST["search"];
   
    require "db.php";
   

    // SELECT
    // SELECT * FROM users WHERE year LIKE "%19%";
    // $sql = `SELECT * FROM utenti WHERE firstname LIKE search %$str%`; 
    $sql = "SELECT * FROM utenti WHERE firstname LIKE '%{$search}%'"; 

    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        
        $data = $result->fetch_all( MYSQLI_ASSOC );

        echo json_encode($data);

        $result->free();
    } else {
       
       echo '{ "status": "empty", "empty": "Database Vuoto!" }';
    }
    $mysqli->close();


   
} else {
    header("Location: index.html");
}*/


if ( isset($_POST) ) {
function pagination($totalRows, $rowForPage=5, $currentPage=1){ 
   
    require "db.php";

    for ($i=0, $rowStart=-$rowForPage; $i<$currentPage; $rowStart+=$rowForPage, $i++);

    $pageLast = ceil($totalRows / $rowForPage);

    $sql = "SELECT * FROM utenti WHERE firstname LIKE '%{$search}%' LIMIT {$rowStart}, {$rowForPage}"; // SELECT * FROM utenti LIMIT '0', '2'

    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        
        $data = $result->fetch_all( MYSQLI_ASSOC ); //   $data->view = 'modal';  //  print_r($data);

        echo json_encode($data);

        $result->free();
    } else {
  
        echo '{ "status": "empty", "empty": "pageLast: '.$pageLast.' rowStart: '.$rowStart.' rowForPage: '.$rowForPage.'" }'; die;
    } 
}






$str = $_POST["search"]; 

$obj = json_decode($str);

$totalRows = $obj->totalRows;
$rowForPage = $obj->rowForPage;
$currentPage = $obj->currentPage;

// echo '{ "status": "empty", "empty": "rowForPage: '.$rowForPage.' currentPage: '.$currentPage.'" }'; die;

pagination($totalRows, $rowForPage, $currentPage); 

} else {
    header("Location: index.html");
}