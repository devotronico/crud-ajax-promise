<?php

 if ( isset($_POST) ) {

    $id = $_POST["select"];

    require "db.php";
   
    $sql = "SELECT * FROM utenti WHERE id = '{$id}'"; 

    if ( $result = $mysqli->query($sql)) {
        
        $data = $result->fetch_object(); // fetch_row() / fetch_object() / fetch_array

        $data->view = 'modal';  //  print_r($data);
     
        echo json_encode($data);

        $result->free();
    } else {
       
       echo '{ "status": "empty", "empty": "Database Vuoto!" }';
    }
    $mysqli->close();

} else {
    header("Location: index.html");
}

