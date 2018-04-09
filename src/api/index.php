<?php
    require('connect.php');
    $sql = "select * from ml_goods_cat where cat_id=1";
    $result = $conn->query($sql);
    $res = $result->fetch_assoc();
    echo json_encode($res);
?>