<?php
    require('connect.php');
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    
    //把数据返回前端
    if($type==='get'){
        $sql = "select * from cart";
        $result = $conn->query($sql);
        $res = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
        $result->close();
    }
?>