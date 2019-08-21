<!DOCTYPE HTML>
<html lang = "en">
    <head>
        <meta charset = utf-8>
        <title>Edit Story</title>
    </head>
    <body>
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
            if (!$stmt->execute()){
                echo "failed to get username";
            }
            $stmt->bind_result($author);
            $stmt->fetch();
            $stmt->close();

            if ($loginuser!=$author){
                echo "You can only edit the story you created!!!";
                header("Location: main.php");
            }
        ?>
        <form action = "realEditStory.php" methods = "POST">
            <label>Edit your story content below: </label>

            <br />

            <textarea rows="6" cols="100" placeholder="Please type the story here... Remember to limit your story to 255 characters" name="content" id="content"></textarea>
            <label>Link:</label>
            <input type="text" name="link" id="link" />

            <input type='hidden' name='story_id' value='<?php echo "$story_id";?>'/>
            
            <br />

            <input type= "submit" value = "POST" />
        </form>
    </body>
</html>
