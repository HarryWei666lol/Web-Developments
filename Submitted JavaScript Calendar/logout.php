<?php
	session_start();
	$username = $_SESSION['Username'];
    session_destroy();
	echo json_encode(array(
        "success" => true
    ));
    exit;
?>
