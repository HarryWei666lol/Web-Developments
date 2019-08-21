<?php
    require 'database.php';
    session_start();
    $loginuser=$_SESSION['user'];
    $story_id = $_GET['val'];

    $stmt = $mysqli->prepare("select username from story where story_id=?");
    if(!$stmt){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt->bind_param('i', $story_id);
    $stmt->execute();
    $stmt->bind_result($author);
    $stmt->fetch();
    $stmt->close();

    if ($loginuser!=$author){
        echo "You can only delete the story you created";
        header("Location: main.php");
        exit;
    } 
    else {
        $stmt1 = $mysqli->prepare("delete from comment where story_id=?");
        if(!$stmt1){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt1->bind_param('i', $story_id);
        $stmt1->execute();
        $stmt1->close();
        header("Location: main.php");
    }

    $stmt2 = $mysqli->prepare("delete from story where story_id=?");
    if(!$stmt2){
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt2->bind_param('i', $story_id);
    $stmt2->execute();
    $stmt2->close();
?>
