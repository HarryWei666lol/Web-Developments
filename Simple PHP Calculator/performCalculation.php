<?php
    $num1 = (float)$_GET['num1'];
    $num2 = (float)$_GET['num2'];
    $operation = $_GET['operation'];

    if($num1 != "" || $num2 != "" || $operation !=""){
        switch($operation){
            case "addition":
                $result = $num1 + $num2;
                echo "$num1 + $num2 = $result";
                break;
            case "subtraction":
                $result = $num1 - $num2;
                echo "$num1 - $num2 = $result";
                break;
            case "multiplication":
                $result = $num1 * $num2;
                echo "$num1 * $num2 = $result";
                break;
            case "division":
                if($num2 != 0){
                    $result = $num1 / $num2;
                    echo "$num1 / $num2 = $result";
                    break;
                }
                else{
                    echo "The second number can't be 0!!";
                    exit();
                }
        }
    }
    else{
        echo("All fields required! Please enter the missing number!!");
        exit();
    }
?>


    