/* 
* @Author: Marte
* @Date:   2017-09-05 19:08:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 22:53:01
*/
require(['config'],function(){
    require(['jquery'],function($){
        jQuery(function($){
            console.log('buycart.js链接成功');
            $('.cart_head_link').load('./load.html .topbar'); 
            $('.footer').load('./load.html .footer_box');
            $('.siderbar').load('./load.html .sidebar-box');
            require(['load'],function(){
            })
        })
    })
})