<?php
// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
ini_set("session.cookie_httponly", 1);
header("Content-Type: application/json"); 
require 'database.php';
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
session_start();
$username = $_SESSION["user"];
//Variables can be accessed as such and is equivalent to what I previously did with $_POST['username'] and $_POST['password']
$year = $json_obj["year"];
$month = $json_obj["month"];
$day = $json_obj["day"];
$time = $json_obj['time'];
$events = $json_obj['events'];
$stmt = $mysqli->prepare("INSERT INTO events ( user_name, time, event, year, month, day, public) VALUES (?, ?, ?, ?, ?, ?, '1')");
if(!$stmt){
    //printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities($year)
    ));
    exit;
}
$stmt->bind_param('sssiii', $username, $time, $events, $year, $month, $day);
if(!$stmt->execute()){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        "success" => false,
        "message" => "cannot insert"
    ));
    exit;
}
$stmt->close();
echo json_encode(array(
    "success" => true
));
?>
