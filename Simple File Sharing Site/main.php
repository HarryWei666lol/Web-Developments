<!DOCTYPE html>
<html lang = 'en'>
<head>
    <title>Main Page</title>
</head>


<body>
    <?php
        session_start();

        $username = $_SESSION['thisusername'];

        echo "Hello, " . $username . ". You can see the file you uploaded and upload new file here";
        echo ("<hr>");

        echo "Below is a list of files present in the PRIVATE folder:";
        echo "<br />";

        //view a list of files in private folder
        $dir = sprintf('/home/3180290SB/userUpload/%s/', $username);
        $resource = opendir($dir);

        // Get the code from https://www.youtube.com/watch?v=IeJYRhumEtA
        while(($entry = readdir($resource))!== FALSE)
        // output the list of file already uploaded
        {
            if($entry != '.' && $entry != '..' ){
            echo $entry."<br/>";

        }
        }
        echo ("<hr>");
        //End of citation

        echo "Below is a list of files present in the PUBLIC folder:";
        echo "<br />";
        
        //view a list of files in public folder
        $pubdir = sprintf('/home/3180290SB/userUpload/publicupload');
        $pubresource = opendir($pubdir);
        // Get the code from https://www.youtube.com/watch?v=IeJYRhumEtA
        while(($pubentry = readdir($pubresource))!== FALSE)
        // output the list of file already uploaded
        {
            if($pubentry != '.' && $pubentry != '..' ){
            echo $pubentry."<br/>";

        }
        }
        echo ("<hr>");
    ?>


    <!--From Course Wiki-->
        <!--To upload file to private folder-->
        <form enctype="multipart/form-data" action="uploader.php" method="POST">
        <p>
            <input type="hidden" name="MAX_FILE_SIZE" value="50000000" />
            <label for="uploadfile_input">Choose a file to upload to PRIVATE(your own) folder:</label> 
            <input name="uploadedfile" type="file" id="uploadfile_input" />
            <input type="submit" value="Upload File" />
        </p>
        </form>

        <!--To upload file to public folder-->
        <form enctype="multipart/form-data" action="publicUploader.php" method="POST">
        <p>
            <input type="hidden" name="MAX_FILE_SIZE" value="50000000" />
            <label for="pubuploadfile_input">Choose a file to upload to PUBLIC folder:</label> 
            <input name="pubuploadedfile" type="file" id="pubuploadfile_input" />
            <input type="submit" value="Upload File" />
        </p>
        </form>
	


        <!--To view file in the private folder-->
        <form action="viewPrivateFile.php" method="GET">
        <p>
            <label for="viewPrivateFile">Type in the name of file you want to view(from PRIVATE folder):</label>
            <input type="text" name="viewPrivateFile" id="viewPrivateFile" />
            <input type="submit" name="viewFile" value="View" />
        </p>
        </form>

        <!--To view file in the public folder-->
        <form action="viewPublicFile.php" method="GET">
        <p>
            <label for="viewPublicFile">Type in the name of file you want to view(from PUBLIC folder):</label>
            <input type="text" name="viewPublicFile" id="viewPublicFile" />
            <input type="submit" name="viewFile" value="View" />
        </p>
        </form>

        <!--To delete file in the private folder-->
        <form action="delete.php" method="POST">
        <p>
            <label for="deleteFile">Type in the name of file you want to delete(from PRIVATE folder):</label>
            <input type="text" name="deleteFile" id="deleteFile" />
            <input type="submit" name="Delete" value="Delete" />
        </p>
        </form>
        
        <!--To delete file in the public folder-->
        <form action="deletePublic.php" method="POST">
        <p>
            <label for="deleteFile">Type in the name of file you want to delete(from PUBLIC folder):</label>
            <input type="text" name="deletePublicFile" id="deletePublicFile" />
            <input type="submit" name="Delete" value="Delete" />
        </p>
        </form>
        
    <!--To log out-->
    <form action = "logout.php" method = "POST">
    <p>
        <input type = "submit" name="log out" value = "logout">
    </p>
    </form>
    

</body>
</html>
