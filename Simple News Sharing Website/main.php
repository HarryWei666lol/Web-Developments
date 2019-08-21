<!DOCTYPE HTML>
<html lang = "en">
<head>
    <meta charset = utf-8>
	<title>News Stories and Comments</title>
</head>
    <body>
        <?php
            require 'database.php';
            session_start();
            $user = $_SESSION['user'];

            $stmt = $mysqli->prepare("select username, title, story_content, link, story_id from story");
            if(!$stmt)
            {
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $stmt->execute();
            $stmt->bind_result($author, $title, $content, $link, $story_id);
            echo"<h1>A list of current stories and comments</h1><br /> ";
            echo "Hi, <i>".$user."</i> ! Welcome to the News Sharing Site!!<br />";
            echo"Username, Title, Content(Story Format)";
            echo "<br /><br />";
            
            while($stmt->fetch()){//https://stackoverflow.com/questions/11772493/how-to-pass-a-value-via-href-php
                printf("%s,%s,%s,%s<br />", htmlspecialchars($author), htmlspecialchars($title), htmlspecialchars($content), htmlspecialchars($link));
                echo "<a href=viewStory.php?val=$story_id>View Comments</a>";
                echo "&nbsp&nbsp&nbsp&nbsp&nbsp";
                echo "<a href=deleteStory.php?val=$story_id>Delete Story with its comments</a>";
                echo "&nbsp&nbsp&nbsp&nbsp&nbsp";
                echo "<a href=editStory.php?val=$story_id>Edit Story content</a>";
                echo "<br /><br />";
            }
            $stmt->close();
        ?>
        <h2>Please post new stories here.</h2>
        <form action = "createStory.php" methods = "POST">
            <label>New Story Title:</label>
            <input type="text" name="newtitle" id="newtitle" />

            <br />

            <label>Add your story content below:</label>

            <br />

            <textarea rows="6" cols="100" placeholder="Please type the story here... Remember, try to limit your story to 255 characters" name="content" id="content"></textarea>

            <label>Link:</label>
            <input type="text" name="link" id="link" />

            <br />

            <input type= "submit" value = "POST" />
        </form>

        <br />

        <form action = "userPage.php" method = "POST">
            <input type="hidden" name="token" value="<?php echo $_SESSION['token'];?>" />
            <input type= "submit" value = "View your User Page" />
        </form>
        <form action = "logout.php" methods = "GET">
            <input type= "submit" value = "Log out" />
        </form>
    </body>
</html>
