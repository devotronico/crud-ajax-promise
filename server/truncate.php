<?php

if ( isset($_POST) ) {

    require "db.php";

    $sql = "TRUNCATE TABLE utenti"; //    TRUNCATE TABLE table_name

    if ($mysqli->query($sql) === TRUE) {

        echo '{ "status": "success", "success": "Tutte le righe sono state cancellate!" }';
    } else {

        echo '{ "status": "error", "error": "Le righe NON sono state cancellate!" }';
    }

    $mysqli->close();
} else {
    header("Location: index.html");
}



/*



// SELECT 
if ($result = $mysqli->query("SELECT firstname FROM utenti LIMIT 10")) {
    printf("Select returned %d rows.\n", $result->num_rows);


    $result->close();
}

$mysqli->close();


*/