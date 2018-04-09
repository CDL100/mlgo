<?php
    require('connect.php');
    $username = isset($_GET['username']) ? $_GET['username'] : null;
    $password = isset($_GET['password']) ? $_GET['password'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;

    // 查找数据库判断用户名是否存在
    $sql = "select username from user where username='$username'";
    $result = $conn->query($sql);
    if($result->num_rows>0){
        echo "fail";
    }else{
        if($type === 'reg'){
            $password = md5($password);
            $sql = "insert into user(username,password) values('$username','$password')";
            $res = $conn->query($sql);
            if($res){
                echo "success";
            }else{
                echo "fail";
            }
        }else{
            echo "success";
        }
    }
?>