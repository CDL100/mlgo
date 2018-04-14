<?php
    require('connect.php');
    $sql = "select * from type";
    $result = $conn->query($sql);
    $res = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>