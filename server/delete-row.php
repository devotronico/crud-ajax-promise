<?php

if ( isset($_POST) ) {

    require "db.php";

    $rowToDelete = 3;

    $result = $mysqli->query("SELECT COUNT(*) FROM utenti");
    $row = $result->fetch_row();
    $rowNumber = $row[0];
    die( '{ "status": "error", "error": "Le righe sono: '.$numeroRighe.'" }');

   $rowNumber = intval($rowNumber);
    if ( $rowNumber < $rowToDelete ){
        $rowToDelete = $rowNumber;
    }

  //  $sql = "SELECT COUNT(*) FROM utenti";


    // INSERT
          // sql to delete a record
          $sql = "DELETE FROM utenti ORDER BY id DESC LIMIT $rowToDelete";
        //   $sql = "DELETE FROM utenti ORDER BY id DESC LIMIT '".$rowToDelete."'";

          if ($mysqli->query($sql) === TRUE) {
        
              echo '{ "status": "success", "success": "Cancellate 5 righe con successo" }';
          } else {

            echo '{ "status": "error", "error": "Le righe non sono state cancellate" }';
          
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