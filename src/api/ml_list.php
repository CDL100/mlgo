<?php
    require('connect.php');
    $low = isset($_GET['low']) ? $_GET['low'] : null;
    $upper = isset($_GET['upper']) ? $_GET['upper'] :1000;
    $acording = isset($_GET['acording']) ? $_GET['acording'] : null;
    $type = isset($_GET['type']) ? $_GET['type'] : null;
    $acording = isset($_GET['acording']) ? $_GET['acording'] : null;
    $page = isset($_GET['page']) ? $_GET['page'] : 1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 10;
    //获取总数
    $sql1 = "select * from milk ";
    $result1 = $conn->query($sql1);
    $total = $result1->num_rows;
    $idx = ($page-1)*$qty;

    
    if($type==='hot_sale'){
        $sql = "select * from milk order by sale desc limit 0,8";
        $result = $conn->query($sql);
        $res = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
        $result->close();
    }
    if($type==='hot_com'){
        $sql = "select * from milk order by comment desc limit 0,8";
        $result = $conn->query($sql);
        $res = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
        $result->close();
    }
    if($type=='list'){
        if($acording==='synthesize'){
            $sql = "select * from milk order by id limit $idx,$qty";
            $result = $conn->query($sql);
        }else if($acording==='sell_asc'){
            $sql = "select * from milk order by sale limit $idx,$qty";
            $result = $conn->query($sql);
        }else if($acording === 'sell_desc'){
            $sql = "select * from milk order by sale desc limit $idx,$qty";
            $result = $conn->query($sql);
        }else if($acording === 'price_asc'){
            $sql = "select * from milk order by special limit $idx,$qty";
            $result = $conn->query($sql);
        }else if($acording === 'price_desc'){
            $sql = "select * from milk order by special desc limit $idx,$qty";
            $result = $conn->query($sql);
        }else if($acording === 'comment_asc'){
            $sql = "select * from milk order by comment limit $idx,$qty";
            $result = $conn->query($sql);
        }else if($acording === 'comment_desc'){
            $sql = "select * from milk order by comment desc limit $idx,$qty";
            $result = $conn->query($sql);
        }else if($acording === 'search'){
            $sql = "select * from milk where special >= '$low' and special <= '$upper' order by special limit $idx,$qty";
            $result = $conn->query($sql);
            $sql1 = "select * from milk where special >= '$low' and special <= '$upper'";
            $result1 = $conn->query($sql1);
            $total = $result1->num_rows;
        };
        //得到总数
        $data = $result->fetch_all(MYSQLI_ASSOC);
        json_encode($data,JSON_UNESCAPED_UNICODE);
            $res = array(
                "total" => $total,
                "data" => $data,
                "qty" => $qty*1,
                "page" => $page*1
            );
        echo json_encode($res,JSON_UNESCAPED_UNICODE);
    }
?>