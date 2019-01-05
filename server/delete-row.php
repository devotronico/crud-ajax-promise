<?php

if ( !isset($_POST) ) {
header("Location: index.html");
die;
} 

if ( !isset($_POST["rows"]) ) {
    die('{ "status": "error", "error": "Data not found" }');
}


$rowToDelete = $_POST["rows"];


require "db.php";


$result = $mysqli->query("SELECT COUNT(*) FROM utenti");
$row = $result->fetch_row();
$rowNumber = $row[0];
//  die( '{ "status": "error", "error": "Le righe sono: '.$rowNumber.'" }');

$rowNumber = intval($rowNumber);
if ( $rowNumber < $rowToDelete ){
    $rowToDelete = $rowNumber;
}


$sql = "DELETE FROM utenti ORDER BY id DESC LIMIT $rowToDelete";
//   $sql = "DELETE FROM utenti ORDER BY id DESC LIMIT '".$rowToDelete."'";

if ($mysqli->query($sql) === TRUE) {

    echo '{ "status": "success", "success": "Cancellate '.$rowToDelete.' righe con successo" }';
} else {

echo '{ "status": "error", "error": "Le righe non sono state cancellate" }';
}

$mysqli->close();
    

   




/*



// SELECT 
if ($result = $mysqli->query("SELECT firstname FROM utenti LIMIT 10")) {
    printf("Select returned %d rows.\n", $result->num_rows);


    $result->close();
}

$mysqli->close();


*/