<?php
 //echo "SERVER"; die;
 
if ( !isset($_POST) ) {
   header("Location: index.html");
   die;
} 

if ( !isset($_POST["jsonData"]) ) {
    die('{ "status": "error", "error": "Data not found" }');
}


$str = $_POST["jsonData"];

$obj = json_decode($str);

// echo '<pre>';var_dump( $obj ); die;// object(stdClass)

require "db.php";

// INSERT
$sql = "INSERT INTO utenti ( firstname, email) VALUES "; 

foreach( $obj as $o ){

        $sql .=  "( '$o->name', '$o->mail'),";
}

$sql = rtrim($sql, ', ');


if ($mysqli->query($sql) ) {

     echo '{ "status": "success", "success": "Inserite nuove righe nel database" }';
    // $result->close();
} else {
    // echo "Error";
    echo '{ "status": "error", "error": "Impossibile inserire nuove righe nel database" }';
}

$mysqli->close();





 

   

