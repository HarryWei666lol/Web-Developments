<?php
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
ini_set("session.cookie_httponly", 1);
header("Content-Type: application/json");
require 'database.php';
ini_set("session.cookie_httponly", 1);
session_start();
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
//Variables can be accessed as such:
$username = $_SESSION["user"];
$year = $json_obj['year'];
$month = $json_obj['month'];
$stmt = $mysqli->prepare("select event_id, day, time, event from events where user_name = ? OR public = '1' AND year = ? AND month = ?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt->bind_param('sii',$username, $year, $month);
$stmt->execute();
$stmt->bind_result($event_id, $event_day, $event_time, $event_name);
$result = array();
while($stmt->fetch()){
    $event_id = htmlentities($event_id);
    $event_date = htmlentities($event_day);
    $event_time = htmlentities($event_time);
    $event_name = htmlentities($event_name);
    $object =array( "id" => $event_id,
        "day" => $event_day,
        "time" => $event_time,
        "name" => $event_name
    );
    array_push($result,$object);
}
echo json_encode($result);