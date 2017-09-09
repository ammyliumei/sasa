/* 
* @Author: Marte
* @Date:   2017-09-04 21:48:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-09 20:03:06
*/
require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
            console.log('falsh_sales.js链接成功')
            $('.header').load('/html/load.html .header_box');
            $('.list_nav').load('/html/load.html .nav_category',function(){
                // console.log($('.nav all_category_title_box'))
            $('.nav all_category_title_box').css('display','none');
            });
            $('.footer').load('/html/load.html .footer_box');
            $('.siderbar').load('/html/load.html .sidebar-box');
            require(['common'],function(){
                // 侧边栏
                siderbar($('.side_item'));
                // 楼梯
                floor('.floor_location','.main_li')
                 // 数据请求
                fourActive(20,'.this_week');
                floor('.zk_floor','.vip_floor_cont .floor_cont')
            })        
        })
    })
})
