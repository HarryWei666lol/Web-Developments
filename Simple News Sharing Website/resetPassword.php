<?php
    session_start();
    require 'database.php';
    $newpassword = trim($_GET['newpassword']);
    $newrepass = trim($_GET['newrepass']);
    
    if($newpassword != $newrepass){
        echo "Please enter the same password";
        exit;
    } 
    else {
        $hashedPass = password_hash($newpassword, PASSWORD_BCRYPT);
        $updateuser = $_SESSION['user'];
        $stmt = $mysqli->prepare("update users set password = ? where username = ?");
        if(!$stmt)
        {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }

        $stmt->bind_param('ss', $hashedPass, $updateuser);
        $stmt->execute();
        $stmt->close();
        header("Location: resetSuccessful.html");
    }
    ?>

