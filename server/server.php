<?php

if ( isset($_POST) ) {

    require "db.php";

    foreach($_POST as $key => $val) {

        switch($key){

            case "jsonData": //  echo $key."<br>"; 
            

                $str = $_POST["jsonData"];

                $obj = json_decode($str);
        
                // INSERT
                $sql = "INSERT INTO utenti ( firstname, email) VALUES "; 
            
                foreach( $obj as $o ){
            
                    $sql .=  "( '$o->name', '$o->mail'),";
                }
            
                $sql = rtrim($sql, ', ');
            
                
                if ( $mysqli->query($sql) ) {

                    echo "New record created successfully";
                } else {

                    echo "Error";
                }
            
                $mysqli->close();

            break;


            case "delete": // echo $key."<br>";

                // sql to delete a record
                $sql = "DELETE FROM utenti WHERE id=3";

                if ($mysqli->query($sql) === TRUE) {
                    echo "Record deleted successfully";
                } else {
                    echo "Error deleting record: " . $mysqli->error;
                }

                $mysqli->close();
            
            break;
        }
       
    }
  
   





    /*
    $obj = json_decode($str);
    echo '<pre>';var_dump( $obj ); // object(stdClass)

 
*/

   
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