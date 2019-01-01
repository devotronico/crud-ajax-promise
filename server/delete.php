<?php

if ( isset($_POST) ) {

    $id = $_POST["id"];
   
    //$obj = json_decode($str);

    require "db.php";

    $sql = "DELETE FROM utenti WHERE id=$id";

    if ($mysqli->query($sql) === TRUE) {

        echo '{ "status": "success", "success": "La riga con id '.$id.' è stata cancellata" }';
    } else {

        echo '{ "status": "error", "error": "La riga con id '.$id.' NON è stata cancellata!" }';
    }

    $mysqli->close();
} else {
    header("Location: index.html");
}



