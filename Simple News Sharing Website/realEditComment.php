<?php
    require 'database.php';
    session_start();
    $loginuser=$_SESSION['user'];
    $story_id = $_GET['story_id'];
    $comment_id = $_GET['comment_id'];
    $content = $_GET['content'];

    $stmt1 = $mysqli->prepare("update comment set comment_content=? where comment_id=?");
    if(!$stmt1){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt1->bind_param('si', $content, $comment_id);
    $stmt1->execute();
    $stmt1->close();
    header("Location: viewStory.php?val=$story_id");
?>
