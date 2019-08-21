<?php
//Whole file from Course Wiki
session_start();

// Get the filename and make sure it is valid
$filename = basename($_FILES['pubuploadedfile']['name']);
if( !preg_match('/^[\w_\.\-]+$/', $filename) ){
	echo "Invalid filename";
	exit;
}

// Get the username and make sure it is valid
$username = $_SESSION['thisusername'];


if(!preg_match('/^[\w_\-]+$/', $username)){
	echo "Invalid username";
	exit;
}

$full_path = sprintf("/home/3180290SB/userUpload/publicupload/%s", $filename);


if(move_uploaded_file($_FILES['pubuploadedfile']['tmp_name'], $full_path)){
	header("Location: main.php");
	exit;
}else{
	header("Location: uploadFailed.html");
	exit;
}

?>