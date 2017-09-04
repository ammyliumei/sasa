/* 
* @Author: Marte
* @Date:   2017-09-04 21:48:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-04 22:58:55
*/

jQuery(function($){
    console.log('falsh_sales.js链接成功')
    $('.header').load('./load.html .header_box');
    $('.nav').load('./load.html .nav_category');
    $('.footer').load('./load.html .footer_box');
    $('.siderbar').load('./load.html .sidebar-box');
})
