<?php
    require 'database.php';
    $user = $_GET['username'];

    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));

    $stmt = $mysqli->prepare("select username, password from users where username=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }

    $stmt->bind_param('s', $user);
    $stmt->execute();
    $stmt->bind_result($username, $pwd_hash);
    $stmt->fetch();

    $pwd_guess = $_GET['password'];
    if(password_verify($pwd_guess, $pwd_hash)){
        // Login succeeded
        session_start();
	    $_SESSION['user'] = $username;
        header("Location: main.php");
    } else {
        // Login failed
	    echo "Passwords Don't Match!";
    }
    $stmt->close();

?>
