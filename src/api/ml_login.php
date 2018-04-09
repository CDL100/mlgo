<?php
    require('connect.php');
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    $sql = "select * from user where username='$username'";
    $result = $conn->query($sql);
    if($result->num_rows == 0){
        echo "fail";
    }
    else{
        if($type=='login'){
            $password = md5($password);
            $sql = "select * from user where username = '$username'and password='$password'";
            $res = $conn->query($sql);
            if($res->num_rows > 0){
                echo "success";
            }else{
                echo "fail";
            }
        }
    }
?>