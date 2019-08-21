<?php
    // open .txt file
    $h = fopen("/home/3180290SB/users.txt", "r");

    //get inputted username
    $username = $_GET['username'];

    // read the .txt file line by line until reaching end of line
    while(!feof($h))
    {
        // trim() function taken from https://www.w3schools.com/php/func_string_trim.asp
        $user[] = trim(fgets($h));
    }

    //Found in_array() function at https://www.w3schools.com/php/func_array_in_array.asp
    if(in_array($username, $user))
    // check if a match of inputted username and username in .txt file is found
    {
        session_start();
        $_SESSION['thisusername'] = $username;
        // redirect to main page
        header("Location: main.php");
        fclose($h);
        exit;
    }
    else
    {
        // if there is no match, output error message
        echo " Login unsuccessful.";
    }
?>
