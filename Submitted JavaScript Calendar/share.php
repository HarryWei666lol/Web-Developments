<?php
// Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
require 'database.php';
ini_set("session.cookie_httponly", 1);

header("Content-Type: application/json");

//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
session_start();
$username = $_SESSION["user"];
//Variables can be accessed as such:
$newUserName = $json_obj["newUserName"];
$year = $json_obj["year"];
$month = $json_obj["month"];
$day = $json_obj["day"];
$newTime = $json_obj["newTime"];
$name = $json_obj["name"];
//$stmt2 = $mysqli->prepare("UPDATE events SET event=?, day=?, month = ?, year = ?, time=? where event = ?");
$stmt = $mysqli->prepare("INSERT INTO events ( user_name, year, month, day, time, event, public) VALUES (?, ?, ?, ?, ?, ?, NULL)");
if(!$stmt){
    //printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities($year)
    ));
    exit;
}
$stmt->bind_param('siiiss', $newUserName, $year, $month, $day , $newTime, $name);

if(!$stmt->execute()){
    //printf("Query Prep Failed: %s\n", $mysqli->error);
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
