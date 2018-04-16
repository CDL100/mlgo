<?php
    require('connect.php');
    $mlid = isset($_GET['mlid']) ? $_GET['mlid'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;


    //存入数据库
    if($type==='add'){
        //通过id获取数据
        $sql1 = "select * from milk where ml_id = '$mlid'";
        $result1 = $conn->query($sql1);
        $arr = $result1->fetch_all(MYSQLI_ASSOC);
        $mlname = $arr[0]['mlname'];
        $special = $arr[0]['special'];
        $market = $arr[0]['market'];
        $sale = $arr[0]['sale'];
        $img = $arr[0]['Bimgurl1'];
        
        //查看购物车是否存在相应商品
        $sql2 = "select count from record where ml_id = '$mlid'";
        $result2 = $conn->query($sql2);

        if($result2->num_rows === 0){
            $sql = "insert into record(ml_id,mlname,special,market,sale,img,count) values('$mlid','$mlname','$special','$market','$sale','$img',1)";
            $res = $conn->query($sql);
            if($res){
                echo 'success';
            }
        }else if($result2->num_rows > 0){
            $res = $result2->fetch_row();
            $count = $res[0]*1+1;
            $sql = "update record set count = '$count' where ml_id = '$mlid'";
            $res = $conn->query($sql);
            if($res){
                echo 'success';
            }
        };
    };


    //删除对应商品
    if($type==='del'){
        $sql = "delete from cart where ml_id = '$mlid'";
        $res = $conn->query($sql);
        //删除成功时echo成功，前端把当前数据删除;
        if($res){
            echo 'success';
        }
    }

    //清空所有商品
    if($type==='clear'){
        $sql = "delete from cart";
        $res = $conn->query($sql);
        if($res){
            echo 'success';
        };
    }

    //把数据返回前端
    if($type==='get'){
        $sql = "select * from record";
        $result = $conn->query($sql);
        $res = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
        $result->close();
    }

?>