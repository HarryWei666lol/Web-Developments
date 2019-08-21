<?php
    require 'database.php';
    session_start();
    $username = $_SESSION['user'];
    $content = $_GET['content'];
    $link = $_GET['link'];
    $title = $_GET['newtitle'];

    $stmt = $mysqli->prepare("insert into story(username, story_content, link, title) values (?, ?, ?, ?)");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('ssss', $username, $content, $link, $title);
    if (!$stmt->execute()){
        echo "Fail to post";
    }
    $stmt->close();
    header("Location: main.php");
?>
