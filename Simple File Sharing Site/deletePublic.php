<?php
    // these code pertains to public file in the public folder named "publicupload"
    session_start();
    $username = $_SESSION['thisusername'];
    $fileToBeDeleted = $_POST['deletePublicFile'];
    
    // check if the file exist in the directory given
    $deleteDir = sprintf("/home/3180290SB/userUpload/publicupload/%s",  $fileToBeDeleted);

    if(unlink($deleteDir))
    // if the file exists in the directory, delete it.
    {
       header("Location: main.php");
        exit;
    }
    else
    // if not, output error message
    {
        echo "Delete unsuccessful";
    }

?>
