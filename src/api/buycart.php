<?php

    include 'connect.php';
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    // 商品加入的时候有用;
    $buyername = isset($_GET['buyername']) ? $_GET['buyername'] : '';
    $goodsid = isset($_GET['goodsid']) ? $_GET['goodsid'] : '';
    $goodsname = isset($_GET['goodsname']) ? $_GET['goodsname'] : '';
    $goodsprice = isset($_GET['goodsprice']) ? $_GET['goodsprice'] : '';
    $goodsgg = isset($_GET['goodsgg']) ? $_GET['goodsgg'] : '';
    $goodsqty = isset($_GET['goodsqty']) ? $_GET['goodsqty'] : '';
    $buycartname = isset($_GET['buycartname']) ? $_GET['buycartname'] : '';
    if($buycartname){

        $sql = "select * from  $buycartname";
        // $sql = "select * from  17620808179table";
         //查询前设置编码，放置输出乱码
        $conn->set_charset('utf8');
        // echo $sql;
        //获取查询结果集
        $result = $conn->query($sql);
        if($result){
            // var_dump($result);
            //使用查询结果集(得到json字符串)
            $row = $result->fetch_all(MYSQLI_ASSOC);
            // var_dump($row);
            //释放查询结果集
            $result->close();

            $res = array(
                
                'total'=>$conn->query("select count(*) from $buycartname" )->fetch_row()[0],
                'data'=>$row,
                'status'=>200,
                'msg'=>'success'
            );
            //把结果输出到前台
            echo json_encode($res,JSON_UNESCAPED_UNICODE);
        }else{
            echo 'flase';
        }
        
            
    }else if($username){
        // 密码md5加密
            $tablename = $username.'table';
            $password = md5($password);
            $sql = "create table  $tablename(
                    id int unsigned auto_increment primary key, 
                    goodsid int unsigned, 
                    goodsname varchar(225) not null,
                    goodsprice float(2) unsigned , 
                    goodsgg varchar(20) not null,
                    goodsqty  int unsigned,
                    imgurl varchar(225) not null,
                    reg_date timestamp)
                    DEFAULT CHARSET=utf8";     
            // 获取查询结果
            $result = $conn->query($sql);
            if ($result ) {
                echo "建立表格成功";
                
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
    }else{
        $tablename = $buyername.'table';
        // $sqlifExist = "select goodsid from $tablename where goodsid=$goodsid";
        // $ExistResult = $conn->query($sqlifExist);
        // if($ExistResult){
        //     $repair ="update  $tablename  set goodsqty=$goodsqty where goodsid='$goodsid'";
        //     $repairResult = $conn->query($repair);
        //     if ($repairResult) {
        //         echo "修改数量成功";
        //     } else {
        //         echo "Error: " . $repair . "<br>" . $conn->error;
        //     }        
        // }else{
            $sql2 = "insert into $tablename (goodsid,goodsname,goodsprice,goodsgg,goodsqty) values('$goodsid','$goodsname','$goodsprice','$goodsgg','$goodsqty')";
             // 获取插入结果
             $result2 = $conn->query($sql2);
             if ($result2) {
                 echo "写入购物车成功";
             } else {
                 echo "Error: " . $sql2 . "<br>" . $conn->error;
             }          
        // }
        
    }

    //关闭连接
    $conn->close();
?>