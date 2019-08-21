<?php
    require 'database.php';
    session_start();
    $username = $_SESSION['user'];
    $content = $_POST['content'];
    $story_id = $_POST['story_id'];

    $stmt = $mysqli->prepare("insert into comment(story_id, comment_content, username) values (?, ?, ?)");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('sss', $story_id, $content, $username);
    $stmt->execute();
    $stmt->close();
    header("Location: viewStory.php?val=$story_id");
?>
