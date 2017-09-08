/* 
* @Author: Marte
* @Date:   2017-09-05 17:04:26
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-08 13:58:41
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
                        console.log(kinddata)
                         // 5.生成数据
                         // 大图片
                         // console.log(data.goodsimgurl)
                         
                        var imgArr=kinddata.goodsimgurl.split(';')
                        $('.album-preview-container img').attr({'src':imgArr[0]});
                        // 详图盒子
                        imgArr.forEach(function(item){
                        console.log(item)
                             $('.thumbnail-list ul').append(`
                                                <li>
                                                <div class="arrow arrow-top"><i class="below"></i></div>
                                                <div class="thumbnail">
                                                    <a href="">
                                                        <img src="${item}" alt="${kinddata.goodsname}" width="60" height="60">
                                                    </a>
                                                </div>
                                            </li>`);
                        })
                        // 标题
                        $('.product-titles').append(`<i class="icon iconfont"></i>${kinddata.goodsname}`)
                        // 品牌
                         $('.product-titles2 a').html(`${kinddata.brand}&nbsp;`)
                         // 规格
                         $('product—titles3').html(`${kinddata.goodsname}&nbsp;${kinddata.goodspecification}`)

                         // 现价价格
                         $('.action-price').html(`￥${(kinddata.goodsprice*kinddata.goodsdiscount*0.1).toFixed(2)}`);
                         // 旧的价格
                         $('.action-mktprice').html(`￥${kinddata.goodsprice}`);
                        

                            // 6。放大镜
                            // 生成大图片及大容器
                            var $bigCont = $('<div class="big_img_cont"></div>');
                            $bigCont.css({'width':'400px','height':'300px','border':'1px solid #cccccc'});
                            var  $bigImg=$('<img class="big_img"/>');
                            var $smallImg=$('.album-preview-container img');
                            $bigImg.attr('src',$smallImg.attr('src'));

                            $bigImg.css({'width':'600px','height':'600px'});
                            $bigCont.append($bigImg);
                            $('body').append($bigCont);
                             $smallImg.change(function(){
                                var left = $smallCont.offset().left + smallImg.offsetWidth + 10;
                                var  top = $smallCont.offset().top;
                                bigContainer.css({'left ':left,'top':top});
                                console.log(left)
                            })

                            var $smallCont=$('.album-preview-container');
                            // 放大镜显示隐藏（半透明） 
                           
                            var $zoom=$('.album-zooms-handle');
                            // 计算放大比例  
                            var ratio=$bigImg.width()/$smallImg.width();
                            $smallCont.mouseenter(function(){
                                
                                show();
                                // 放大镜移动的x,y
                            });
                            $smallCont.mouseleave(function(){
                                hide();
                            });
                            // 放大镜移动
                            $smallCont.mousemove(function(e){
                                var left_x = $smallCont.offset().left + $smallImg.width() + 10;
                                var  top_x = $smallCont.offset().top;

                                $bigCont.css({'left':left_x,'top':top_x});
                               
                               
                                var left =  e.clientX- $smallCont.offset().left - $zoom.width()/2 ;
                                var top = e.clientY - $zoom.height()/2 ;
                                 if(left<0){
                                        left = 0;
                                    }else if(left > $smallImg.width() - $zoom.width()){
                                        left = $smallImg.width()- $zoom.width();
                                    };
                                    console.log(e.clientY, $smallCont.offset().top,$zoom.height()/2,top);
                                if(top<0){
                                    top = 0;
                                }else if(top > $smallImg.height() - $zoom.height()){
                                    top = $smallImg.height() - $zoom.height()
                                };
                               setPosition(left,top);
                            });       
                            // 放大镜的移动
                            // 2.显示（只有在显示的时候才能获取元素的宽度）
                            function show(){
                                $bigCont.css('display','block');
                                $zoom.css('display','block');
                                // 根据比例得出在原图中放大镜显示区域的大小
                                $zoom.css('width',$bigCont.width()/ratio + 'px');
                                $zoom.css('height',$bigCont.height()/ratio + 'px');
                            };
                            // 3.隐藏
                            function hide(){
                                $bigCont.css('display','none');
                                $zoom.css('display','none');
                            };
                            function setPosition(x,y){

                                // 放大镜移动
                                $zoom.css('left', x + 'px');
                                $zoom.css('top', y + 'px');
                                // 放大后的图片在容器中的移动
                                $bigImg.css({'left':`${-x*ratio}px`,'top':`${-y*ratio}px`})
                            };
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
                            // console.log(idx,$(ele))
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
                
                 // 
                
               
            }) 
        })
    })
})