<?php
/*
 if ( isset($_POST) ) {

     $str = $_POST["select"];
   
     require "db.php";
   */



    // SELECT
    $sql = "SELECT * FROM utenti"; 

    
    $res = $mysqli->query($sql);

    if ($res->num_rows > 0) {
        
        $data = $result->fetch_all( MYSQLI_ASSOC );

        echo json_encode($data);

        $res->free();
    } else {
       
       echo '{ "status": "success", "success": "Data is empty" }';
    }
  //  $mysqli->close();


 /*  
} else {
    die("NO");
}
*/


/*



// SELECT 
if ($result = $mysqli->query("SELECT firstname FROM utenti LIMIT 10")) {
    printf("Select returned %d rows.\n", $result->num_rows);


    $result->close();
}

$mysqli->close();


*/