<?php
    require('connect.php');
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $sql = "select * from milk where id='$id'";
    $result = $conn->query($sql);
    $res = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($res,JSON_UNESCAPED_UNICODE);
?>