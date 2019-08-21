<!DOCTYPE HTML>
<html lang = "en">
	<head>
		<title>View Story</title>
	</head>
	<body>
		<?php
			require 'database.php';
			session_start();
			$story_id = $_GET['val'];
			
			$stmt = $mysqli->prepare("select title, story_id, username, story_content, link from story where story_id=?");
			if(!$stmt){
				printf("Query Prep Failed: %s\n", $mysqli->error);
				exit;
			}
			$stmt->bind_param('i', $story_id);
			$stmt->execute();
			$stmt->bind_result($title, $story_id, $username, $story_content, $link);
			while($stmt->fetch()){//https://stackoverflow.com/questions/11772493/how-to-pass-a-value-via-href-php
				echo "Title: ".$title."<br />";
				echo "Created by user: ".$username."<br />";
				echo "Story Content:".$story_content."<br />";
				echo "Link: ".$link."<br />";
			}
			$stmt->close();
			echo "<hr>";

			echo "Comments below:<br />";
			$stmt1 = $mysqli->prepare("select comment_content, username, comment_id from comment where story_id=?");
			if(!$stmt1){
				printf("Query Prep Failed: %s\n", $mysqli->error);
				exit;
			}
			$stmt1->bind_param('i', $story_id);
			$stmt1->execute();
			$stmt1->bind_result($comment_content, $comment_username, $comment_id);
			while($stmt1->fetch()){
				echo "User: ".$comment_username.": <br />";
				echo "Comment Content: ".$comment_content."<br />";
				echo "<a href=editComment.php?val=$comment_id&story=$story_id>Edit</a>";
				echo "&nbsp;&nbsp;";
				echo "<a href=deleteComment.php?val=$comment_id&story=$story_id>Delete</a>";
				echo "<br />";
			}
			$stmt1->close();
		?>
		<form name ="addcomment" action ="createComment.php" method="POST">
			<hr>
			<label>Type your comment here: </label>

			<br />

			<textarea rows="5" cols="60" placeholder="Please type the comment here... Remember, try to limit your story to 255 characters" name="content" id="content"></textarea>
			
			<br />
			
			<!--https://stackoverflow.com/questions/18431638/pass-a-php-variable-value-through-an-html-form-->
			<input type='hidden' name='story_id' value='<?php echo "$story_id";?>'/>
			<input type='submit' name='submitComment' value='submit' />
		</form>
	</body>
</html>