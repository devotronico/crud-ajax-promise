<?php

if ( isset($_POST) ) {

    $id = $_POST["id"];
   
    //$obj = json_decode($str);

    


    require "db.php";


    // INSERT
    // sql to delete a record
    $sql = "DELETE FROM utenti WHERE id=$id";

    if ($mysqli->query($sql) === TRUE) {

        echo '{ "status": "success", "success": "Riga cancellata con successo" }';
    } else {

        echo '{ "status": "error", "error": "La Riga con id numero '.$id.' NON è stata cancellata!" }';
    }

    $mysqli->close();
} else {
    die("NO");
}



/*



// SELECT 
if ($result = $mysqli->query("SELECT firstname FROM utenti LIMIT 10")) {
    printf("Select returned %d rows.\n", $result->num_rows);


    $result->close();
}

$mysqli->close();


*/