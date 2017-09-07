/* 
* @Author: Marte
* @Date:   2017-09-04 21:48:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-07 11:53:48
*/
require(['config'],function(){
    // 引入jq
    require(['jquery'],function($){ 
        $(function($){
            // 检测是否成功
            console.log('falsh_sales.js链接成功')
            $('.header').load('./load.html .header_box');
            $('.list_nav').load('./load.html .nav_category');
            $('.footer').load('./load.html .footer_box');
            $('.siderbar').load('./load.html .sidebar-box');
           // 引入公共js
            require(['common'],function(){
                siderbar($('.side_item'));
                 // 操作头部及当行
                console.log($('.nav all_category_title_box'))
                $('.nav all_category_title_box').css('display','none')
                limmitedGoods(10)
            })
            /*$.ajax({
                url:'/api/vip.php',
                type:'get',
                data:{'qty':50,'cate':'限时特卖'},
                async:true,
                success:function(data){
                    var kinddata=$.parseJSON(data).data;
                    // console.log(kinddata);
                }
            })*/
           
        })
    })
});