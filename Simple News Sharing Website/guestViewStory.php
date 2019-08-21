<!DOCTYPE HTML>

<html lang='en'>
<head>
	<meta charset = utf-8>
	<title>Guest Login to view already existed story</title>
</head>

<body>
<?php
        require 'database.php';
        session_start();
		$user = $_SESSION['user'];
		
		$stmt = $mysqli->prepare("select title, story_content from story");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->execute();
		$stmt->bind_result($title, $content);
		echo("Title, Content, Comment(Story Format)<br />");
		while($stmt->fetch()){
			echo "Title: ".$title."<br />";
			echo "Content: ".$content."<br /><br />";
        }
		$stmt->close();
	?>
</body>
</html>
