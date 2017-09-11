/* 
* @Author: Marte
* @Date:   2017-09-04 21:48:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 15:39:14
*/
require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
            console.log('falsh_sales.js链接成功')
            $('.header').load('/html/load.html .header_box');
            $('.list_nav').load('/html/load.html .nav_category');
                // console.log($('.nav all_category_title_box'))
            $('.nav all_category_title_box').css('display','none');
           
            $('.footer').load('/html/load.html .footer_box');
            $('.siderbar').load('/html/load.html .sidebar-box');
            require(['common'],function(){
                
                // 楼梯
                floor('.floor_location','.main_li')
                 // 数据请求
                fourActive(20,'.this_week',1);
                var page = 0;
                window.onscroll = ()=>{
                    // 先获取滚动条滚动过的距离
                    var scrollTop = window.scrollY;
                    var targetTop=$('.vip_floor_cont').height();
                    if(scrollTop >= targetTop-50){
                        page++
                        if(page==1){
                            fourActive(10,'.flash3','','贵宾专享',1); 
                        }else if(page==2){
                                 fourActive(10,'.flash4','','贵宾专享',2);
                        }else if(page==3){
                            fourActive(10,'.flash5','','贵宾专享',3);
                        }else if(page==4){
                             fourActive(10,'.flash6','','贵宾专享',4);
                        }else if(page==5){
                             fourActive(10,'.flash7','','贵宾专享',5);
                        }
                    }
                }
                floor('.zk_floor','.vip_floor_cont .flash7');
            })        
        })
    })
})
