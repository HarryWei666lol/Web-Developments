<?php
    require 'database.php';
    session_start();
    $loginuser=$_SESSION['user'];
    $comment_id = $_GET['val'];
    $story_id = $_GET['story'];

    $stmt = $mysqli->prepare("select username from comment where comment_id=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('i', $comment_id);
    if (!$stmt->execute()){
        echo "Failed to get username!!!";
    }
    $stmt->bind_result($author);
    $stmt->fetch();
    $stmt->close();

    if ($loginuser!=$author){
        echo "You can only delete the comment you created";
        header("Location: viewStory.php?val=$story_id");
        exit;
    } 
    else {
        $stmt = $mysqli->prepare("delete from comment where comment_id=?");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->bind_param('i', $comment_id);
        $stmt->execute();
        $stmt->close();
        header("Location: viewStory.php?val=$story_id");
    }
?>