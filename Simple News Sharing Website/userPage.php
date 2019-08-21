<!DOCTYPE HTML>
<html lang = "en">
    <head>
        <meta charset = utf-8>
        <title>User Page</title>
    </head>
    <body>
        <h1>Welcome, my dear friend!</h1>
        <?php
        require 'database.php';
        session_start();
        $user = $_SESSION['user'];

        $stmt = $mysqli->prepare("select username, title, story_content, link, story_id from story where username=?");
        if(!$stmt)
        {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->bind_param('s', $user);
        $stmt->execute();
        $stmt->bind_result($author, $title, $content, $link, $story_id);
        echo"<h3>A list of stories you have posted:</h3><br /> ";
        echo("<strong>Username, Title, Content(Story Format)</strong>");
        echo "<br /><br />";
        while($stmt->fetch()){
            echo "<i>Username:</i>.$author.<br />";
            echo "<i>Title:</i>.$title.<br />";
            echo "<i>Content:</i>.$content.<br />";
            echo "<i>Link:</i>.$link.<br />";
        }
        $stmt->close();

        echo "<br /><strong>Your have done these comment :</strong><br />";
        $stmt1 = $mysqli->prepare("select comment_content, comment_id from comment where username=?");
        if(!$stmt1)
        {
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt1->bind_param('s', $user);
        $stmt1->execute();
        $stmt1->bind_result($comment_content,  $comment_id);
        while($stmt1->fetch())
        {
            echo "<i>Comment: <i>".$comment_content."<br />";
        }
        echo "=====================================";
        $stmt1->close();
        ?>

        <form action = "resetPassword.html" methods = "GET">
            <input type= "submit" value = "Reset my Password" />
        </form>
    </body>
</html>
