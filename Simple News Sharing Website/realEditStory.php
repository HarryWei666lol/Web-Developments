<?php
    require 'database.php';
    session_start();
    $loginuser=$_SESSION['user'];
    $story_id = $_GET['story_id'];
    $story_content = $_GET['content'];
    $link = $_GET['link'];

    $stmt1 = $mysqli->prepare("update story set story_content=?, link = ? where story_id=?");
    if(!$stmt1){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt1->bind_param('ssi', $story_content, $link, $story_id);
    $stmt1->execute();
    $stmt1->close();
    header("Location: main.php");
?>
