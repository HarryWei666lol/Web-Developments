<?php
	require 'database.php';
	$username = trim($_GET['username']);

	if(!preg_match('/^[\w_\.\-]+$/', $username))
	{
		echo $username."Invalid username";
		exit;
	}

	$password = trim($_GET['password']);
	$repass = trim($_GET['repass']);

	if($password != $repass){
		echo "Please enter the same password";
		exit;
	} 

	else {
		$hashedPass = password_hash($password, PASSWORD_BCRYPT);;
		$stmt = $mysqli->prepare("insert into users(username, password) values (?, ?)");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('ss', $username, $hashedPass);
		$stmt->execute();
		$stmt->close();
		header("Location: login.html");
	}
?>
