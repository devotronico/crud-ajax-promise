<?php

if ( !isset($_POST) ) {
    header("Location: index.html");
    die;
} 

if ( !isset($_POST["jsonUpdate"]) ) {
    die('{ "status": "error", "error": "Data not found" }');
}

$str = $_POST["jsonUpdate"];

$obj = json_decode($str);

$id = $obj->id;
$name = $obj->name;
$mail =$obj->mail;

require "db.php";

$sql = "UPDATE utenti SET firstname = '".$name."', email = '".$mail."' WHERE id = '".$id."'";

if ($mysqli->query($sql) ) {

    echo '{ "status": "success", "success": "Riga aggiornata con successo" }';
} else {

    echo '{ "status": "error", "error": "La Riga con id numero '.$id.' NON è stata aggiornata!" }';
}

$mysqli->close();

/*

die( $ );
die( '' );
var_dump( $ );
var_export( $ );
echo '<pre>';print_r( $ );
echo '<pre>';var_dump( $ );

if ( isset( $ )) { var_dump( $ ); echo '<pre>';print_r( $ ); die(); }

$test = "";
if ( is_null( $var )) {$test .= "null, ";}
if ( isset( $var )) { $test .= "settata, "; }
if ( !$var ) {$test .= "false, ";} 
if ( empty( $var )) {$test .= "empty, ";}
echo $test;


*/