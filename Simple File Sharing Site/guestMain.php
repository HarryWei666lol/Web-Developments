<!DOCTYPE html>
<html lang = 'en'>
<head>
    <title>Main Page</title>
</head>


<body>
    <?php
        session_start();

        $username = $_SESSION['thisusername'];

        echo "Hello, guest! Below are the files present in the PUBLIC folder:";
        echo"<br />";

        // To list the files present under the directory: /home/3180290SB/userUpload/publicupload
        $pubdir = sprintf('/home/3180290SB/userUpload/publicupload');

        // opendir() function taken from http://www.php.net/manual/en/function.opendir.php
        $pubresource = opendir($pubdir);

        // Got the code from https://www.youtube.com/watch?v=IeJYRhumEtA
        while(($pubentry = readdir($pubresource))!== FALSE)
        { // list out all the files in publicupload folder
            if($pubentry != '.' && $pubentry != '..' ){
            echo $pubentry."<br/>";

        }
        }
        //End of citation
    ?>


    <!--From Course Wiki-->


    
    <form action="viewPublicFile.php" method="GET">
        <p>
            <label for="viewPublicFile">Type in the name of file you want to view(from PUBLIC folder):</label>
            <input type="text" name="viewPublicFile" id="viewPublicFile" />
            <input type="submit" name="viewFile" value="View" />
        </p>
    </form>

    <!--End of Citation from Course Wiki-->
    
    <!--To log out of the current user-->
    <form action = "logout.php" method = "POST">
        <p>
            <input type = "submit" name="log out" value = "logout">
        </p>
    </form>
    

</body>
</html>
