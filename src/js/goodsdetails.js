/* 
* @Author: Marte
* @Date:   2017-09-05 17:04:26
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-07 22:58:31
*/
require(['config'],function(){
    require(['jquery'],function($){
        $(function($){
            console.log('goodsdetails.js链接成功')
            $('.header').load('./load.html .header_box');
            $('.list_nav').load('./load.html .nav_category');
            $('.footer').load('./load.html .footer_box');
            $('.siderbar').load('./load.html .sidebar-box');
            require(['common'],function(){
               // 2.得到商品id
               // 网址转变成数组信息写入盒子内部；
                var params = location.search.substring(1).split('&');
                var goodsid;
                params.forEach(function(i){
                    var idArr=i.split('=');
                     if(idArr[0]=='id'){
                        // console.log(idArr[1]);
                        goodsid=idArr[1];
                     }
                }) ;
                // 3.根据商品id请求数据      
                $.ajax({
                    url:'/api/goodsinfo.php',
                    type:'get',
                    data:{'cate':goodsid},
                    async:true,
                    success:function(data){
                        var kinddata=$.parseJSON(data).data[0];
                        // console.log(kinddata)
                    }
                });
                // 4.吸顶楼梯
                $(window).on('scroll',function(){
                    var scrollTop = $(window).scrollTop();
                    // console.log(scrollTop,$('.product-tags ').offset().top)
                    // 1.吸顶
                    if(scrollTop>=$('.product-tags-nav').offset().top){
                       
                        $('.product-tags').css({'position':'fixed','top':0,'box-shadow':'2px 4px 5px rgba(0, 0, 0, 0.2)','width':'811px'})
                    }else{
                        // console.log(666)
                        $('.product-tags').css({'position':'relative','top':0,'box-shadow':0,'width':'920px'})
                    }
                    // 自动
                        // console.log($('.tags-hd'))
                    $('.product-section').each(function(idx,ele){
                        if(scrollTop >= $(ele).offset().top - $(ele).outerHeight()/3){
                            console.log(idx,$(ele))
                            $('.tags-hd').eq(idx).addClass('hover').siblings('.tags-hd').not('.last').removeClass('hover');
                        }
                    })
                    // 点击相应table跳到对应内容
                    $('.product-tags').on('click','.tags-hd',function(){  
                        // console.log($(this))
                        var targetScrollTop;
                        var idx = $(this).index();
                        console.log(idx )
                        // 获取对应楼层所在的偏移量
                        // console.log($('.product-section').eq(idx))
                        targetScrollTop = $('.product-section').eq(idx).offset().top-50;
                        console.log(targetScrollTop)
                        $('html,body').stop().animate({'scrollTop':targetScrollTop},'slow');
                    })
                });
                // 5。放大镜
                new AmmyZoom().init();
            }) 
        })
    })
})