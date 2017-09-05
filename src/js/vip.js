/* 
* @Author: Marte
* @Date:   2017-09-04 21:48:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-05 09:43:13
*/

jQuery(function($){
    console.log('falsh_sales.js链接成功')
    $('.header').load('./load.html .header_box');
    $('.list_nav').load('./load.html .nav_category',function(){

        console.log($('.nav all_category_title_box'))
        $('.nav all_category_title_box').css('display','none');
    });
    $('.footer').load('./load.html .footer_box');
    $('.siderbar').load('./load.html .sidebar-box');


   
})
