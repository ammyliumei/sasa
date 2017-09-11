<?php

    include 'connect.php';
    $username = isset($_GET['username']) ? $_GET['username'] : '';
    // 商品加入的时候有用;
    $buyername = isset($_GET['buyername']) ? $_GET['buyername'] : '';
    $goodsid = isset($_GET['goodsid']) ? $_GET['goodsid'] : '';
    $goodsname = isset($_GET['goodsname']) ? $_GET['goodsname'] : '';
    $goodsprice = isset($_GET['goodsprice']) ? $_GET['goodsprice'] : '';
    $goodsgg = isset($_GET['goodsgg']) ? $_GET['goodsgg'] : '';
    $imgurl = isset($_GET['imgurl']) ? $_GET['imgurl'] : '';

    // 改动购物车信息
    $goodsqty = isset($_GET['goodsqty']) ? $_GET['goodsqty'] : '';
    // 获取所有购物车信息、改动购物车信息
    $buycartname = isset($_GET['buycartname']) ? $_GET['buycartname'] : '';
    // 购物车改动
    $cartgoodsid = isset($_GET['cartgoodsid']) ? $_GET['cartgoodsid'] : '';
    // 删除购物车
    $dele = isset($_GET['$dele']) ? $_GET['dele'] : '';
    $deleall = isset($_GET['$deleall']) ? $_GET['deleall']:'';

    // 1.传入购物车表名
    if($buycartname){
        // 1.1拿到所有购物车数据
        $sql = "select * from  $buycartname";
        // echo ($sql);
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
            // 1.2大购物车内改动数量
            // echo($cartgoodsid);
            if($cartgoodsid){
                $sql = "update  $buycartname  set goodsqty='$goodsqty' where goodsid='$cartgoodsid'";
                    $result = $conn->query($sql);
                    if ($result) {
                        echo "购物车内修改数量成功";
                    }else{
                        // 1.1 删除一条数据
                      
                        if($dele){
                              $sql = "DELETE FROM $buycartname where id=$goodsid";
                                // 获取查询结果
                              echo($sql);
                            $result = $conn->query($sql);
                            if ($result ) {
                                    echo "删除商品成功";
                                    
                            } else {
                                    echo "Error: " . $sql . "<br>" . $conn->error;
                            }
                        }
                    }           
            }
            else if($deleall){
                // 1.2删除所有数据
                    $sql = "detele * from $buycartname";
                    // 获取查询结果
                    $result = $conn->query($sql);
                    if($result){
                        echo "全部删除成功";
                        
                    }else {
                        echo "Error: " . $sql . "<br>" . $conn->error;
                    }
            }
        }else{
            echo 'flase';
        }               
    }
    //1.4 注册时建表
    else if($username){
        // 密码md5加密
            $tablename = $username.'table';
            $password = md5($password);
            $sql = "create table  $tablename(
                    id int unsigned auto_increment primary key, 
                    goodsid varchar(225) not null, 
                    goodsname varchar(225) not null,
                    goodsprice float(2) not null , 
                    goodsgg varchar(20) not null,
                    goodsqty  int not null,
                    imgurl varchar(225) not null)
                    DEFAULT CHARSET=utf8";     
            // 获取查询结果
            $result = $conn->query($sql);
            if ($result ) {
                echo "建立表格成功";
                
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
    }
    else if($buyername){
        $tablename = $buyername.'table';
        // 语句改为读取再写入
        // $sqlifExist = "select goodsqty from $tablename where goodsid=$goodsid";
        // $ExistResult = $conn->query($sqlifExist);
        // if($ExistResult){
        //     $qty= $ExistResult + $goodsqty;
        //     $repair ="update  $tablename  set goodsqty = $qty where goodsid='$goodsid'";
        //     $repairResult = $conn->query($repair);
        //     if ($repairResult) {
        //         echo "修改数量成功";
        //     } else {
        //         echo "Error: " . $repair . "<br>" . $conn->error;
        //     }        
        // }
        // else{
            $sql2 = "insert into $tablename (goodsid,goodsname,goodsprice,goodsgg,goodsqty,imgurl) values('$goodsid','$goodsname','$goodsprice','$goodsgg','$goodsqty','$imgurl')";
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