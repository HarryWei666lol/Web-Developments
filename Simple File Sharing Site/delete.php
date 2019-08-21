<?php
    // these code pertains to private file in each user's private folder(cannot be viewed by everyone)
    session_start();
    $username = $_SESSION['thisusername'];
    $fileToBeDeleted = $_POST['deleteFile'];

    // check if the file exist in the directory given
    $deleteDir = sprintf("/home/3180290SB/userUpload/%s/%s", $username, $fileToBeDeleted);

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
