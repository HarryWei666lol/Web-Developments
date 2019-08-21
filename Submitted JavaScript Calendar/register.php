<?php
header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
ini_set("session.cookie_httponly", 1);
require 'database.php';
//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
//Variables can be accessed as such:
$username = $json_obj['username'];
$password = $json_obj['password'];
$repass = $json_obj['repass'];
//This is equivalent to what you previously did with $_POST['username'] and $_POST['password']
if($password != $repass)
	{
		echo "Please enter the same password";
		exit;
    } 
$hashedPass = password_hash($password, PASSWORD_BCRYPT);
$stmt = $mysqli->prepare("INSERT INTO users (user_name, user_password) VALUES (?, ?)");
if(!$stmt){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username or Password"
    ));
    exit;
}
$stmt->bind_param('ss', $username, $hashedPass);
$stmt->execute();
$stmt->close();
?>