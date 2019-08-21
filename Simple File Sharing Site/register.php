<?php
    // creative idea: register as a new user
    $newusername = $_GET['newusername'];
    //fopen() function taken from https://stackoverflow.com/questions/15130289/php-fwrite-new-line
    $h = fopen("/home/3180290SB/users.txt", "a"); 
    
    $data = "\n". $newusername;
    fwrite($h, $data); // write the name of new user to .txt file stored securely in the server
    $filepath = "/home/3180290SB/userUpload/".$newusername;

    mkdir($filepath, 0777); // create a folder named as the inputted new username
    //chmod($filepath, 0777);
    header("Location:loginpage.php"); // redirect to loginpage
?>
