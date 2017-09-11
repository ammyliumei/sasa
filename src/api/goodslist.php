<?php
//引入其他php文件
    include 'connect.php';
//请求传参
$pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
$category = isset($_GET['category']) ? $_GET['category'] : 'facialcare';
$qty = isset($_GET['qty']) ? $_GET['qty'] : "10";

$cate = isset($_GET['cate']) ? $_GET['cate'] : '';


$type = isset($_GET['type ']) ? $_GET['type '] : '';
//编写sql语句
 $sql = "select  * from facialcare ";
if($type){
    $sql .="where $type LIKE '%$cate' or $type LIKE '$cate%'  ";
   
}else{
    $sql .="where active LIKE '%$cate' or active LIKE '$cate%' ";
}
    $startIdx = $qty*($pageNo-1);
    $sql .= " limit $startIdx,$qty";
    // var_dump($sql);
    //查询前设置编码，放置输出乱码
    $conn->set_charset('utf8');

    //获取查询结果集
    $result = $conn->query($sql);
    // var_dump($result);
    //使用查询结果集(得到json字符串)
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // var_dump($row);

    //释放查询结果集
    $result->close();
    // 格式化数据
    // 关联数组
    $res = array(
        'pageNo'=>$pageNo,
        'qty'=>$qty,
        'total'=>$conn->query("select count(*) from $category" )->fetch_row()[0],
        'data'=>$row,
        'status'=>200,
        'msg'=>'success'
    );



    //把结果输出到前台
    echo json_encode($res,JSON_UNESCAPED_UNICODE);

    // 关闭数据库
    $conn->close();

    
?> 