<!DOCTYPE HTML>
<html lang = "en">
    <head>
        <meta charset = utf-8>
        <title>Edit Comment</title>
    </head>
    <body>
        <?php
            require 'database.php';
            session_start();
            $loginuser=$_SESSION['user'];
            $comment_id = $_GET['val'];
            $story_id = $_GET['story'];

            $stmt = $mysqli->prepare("select username from comment where comment_id=?");
            if(!$stmt)
            {
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $stmt->bind_param('i', $comment_id);
            if (!$stmt->execute()){
                echo "failed to get username.";
            }
            $stmt->bind_result($author);
            $stmt->fetch();
            $stmt->close();

            if ($loginuser!=$author)
            {
                echo "You can only edit the comment you created";
                header("Location: viewStory.php?val=$story_id");
            }
        ?>
        <form action = "realEditComment.php" methods = "POST">
            <label>Edit your comment content below:</label>

            <br />

            <textarea rows="6" cols="100" placeholder="Please comment here... Remember, try to limit your story to 255 characters" name="content" id="content"></textarea>
            <input type='hidden' name='comment_id' value='<?php echo "$comment_id";?>'/>
            <input type='hidden' name='story_id' value='<?php echo "$story_id";?>'/>
            <input type= "submit" value = "POST" />
        </form>
    </body>
</html>
