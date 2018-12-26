<?php

 if ( isset($_POST) ) {

    // $str = $_POST["select"];
   
     require "db.php";
   



    // SELECT
    $sql = "SELECT * FROM utenti"; 

    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        
        $data = $result->fetch_all( MYSQLI_ASSOC );

        echo json_encode($data);

        $result->free();
    } else {
       
       echo '{ "status": "error", "error": "Database Vuoto!" }';
    }
    $mysqli->close();


   
} else {
    echo '{ "status": "error", "error": "Database not found" }';
}



/*



// SELECT 
if ($result = $mysqli->query("SELECT firstname FROM utenti LIMIT 10")) {
    printf("Select returned %d rows.\n", $result->num_rows);


    $result->close();
}

$mysqli->close();


*/