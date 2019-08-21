<?php
    // destroy session to log out and redirect to login page
    session_start();
    session_destroy();
    header("Location: loginPage.html");
    exit;
?>