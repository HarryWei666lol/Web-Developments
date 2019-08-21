<?php
// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
ini_set("session.cookie_httponly", 1);
session_start();
header("Content-Type: application/json");
require 'database.php';
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
//Variables can be accessed as such and is equivalent to what I previously did with $_POST['username'] and $_POST['password']
$event= $json_obj["delete_events"];
$stmt2 = $mysqli->prepare("DELETE FROM events WHERE event = ?");
if(!$stmt2){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
$stmt2->bind_param('s', $event);
$stmt2->execute();
$stmt2->close();
echo json_encode(array(
    "success" => true
));
exit;
?>