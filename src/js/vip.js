/* 
* @Author: Marte
* @Date:   2017-09-04 21:48:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 23:10:21
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
            // 数据请求
            $.ajax({
                url:'/api/vip.php',
                type:'get',
                data:{'qty':20,'cate':'贵宾专享'},
                async:true,
                success:function(data){
                    var kinddata=$.parseJSON(data).data;
                    console.log(kinddata);
                    kinddata.forEach(function(item){
                            // 现在的价格
                        var currentPrice = item.goodsprice*item.goodsdiscount*0.1;
                         // 获取商品图片
                        var goodsImgs= item.goodsimgurl.split(';');
                            // 每个商品结构
                         // console.log(goodsImgs)
                        var $thisGoods=$('<li></li>')
                        var simgWrapperCont=`<div class="formall" >
                                                    <div class="formalpic fr">
                                                        <dl class="formalpic_list">
                                                            <dd class="active" key="0">
                                                                <img src="${goodsImgs[2]}" alt="Audacious纵欲惹火唇膏 #Natalie" >
                                                            </dd>
                                                            <dd key="0">
                                                             <img src="${goodsImgs[3]}" alt="Audacious纵欲惹火唇膏 #Natalie">
                                                            </dd>
                                                            <dd key="">
                                                                <img src="${goodsImgs[4]}" alt="Audacious纵欲惹火唇膏 #Natalie" >
                                                            </dd>
                                                        </dl>
                                                    </div>
                                                    <div class="formallcont">
                                                        <div class="arrivals-pic">
                                                            <dl class="">
                                                            <dd><i class="icountry"><img src=""></i>欧美品牌</dd>
                                                            </dl>
                                                            <a href="" target="_blank"><img  class="action-goods-img" alt="${item.goodsname}" src="${goodsImgs[1]}"></a>
                                                        </div>
                                                        <div class="sale-price">
                                                            <span class="count fr">${item.goodsdiscount}折</span>
                                                            <span class="price tl">￥${currentPrice}</span>
                                                            <span class="dis tl"><del>￥${item.goodsprice}</del></span>
                                                        </div>
                                                        <div class="arrivals-info">
                                                            <div class="infoconts">
                                                                <div class="des02">
                                                                    <a href="/brand/nars" target="_blank">${item.brand}</a>
                                                                </div>
                                                                <p class="des03"><a href="l" target="_blank">${item.goodspecification}</a></p>
                                                                <p class="des04">${item.goodsname}&nbsp;&nbsp${item.brand}</p>
                                                            </div>
                                                            <div class="tags">
                                                                <a  style="background:#c69a62;color:#ffffff;">直降</a>
                                                            </div>
                                                        </div>
                                                        <div class="btn-buy">
                                                            <a href="" class="btn btn-major action-addtocart" target="_dialog_minicart" rel="nofollow">
                                                                <span><span>加入购物车</span></span>
                                                            </a>
                                                        </div>
                                                    </div>
                                               </div>
                                                `;
                        $thisGoods.html(simgWrapperCont);
                        // 放入原有的合同内目录结构内
                        $('.this_week').append($thisGoods);
                    })
                    console.log('abc')
                    // 切换小图；
                    $('.formalpic_list').on('mouseenter','img',function(){
                        var $currentBigBic=$(this).closest('.formall').find('.action-goods-img')
                        console.log($currentBigBic);
                        $currentBigBic.attr('src',$(this).attr('src'));
                    });
                    // hover每个li时，展示细节图
                    $('.floor_cont li').bind({
                        mouseenter:function(){
                            console.log(this);
                            $(this).find('.formall').animate({'width': '338'},200);
                            $(this).find('.formall').css('z-index',1000);
                        },
                        mouseleave:function(){
                            $(this).find('.formall').animate({'width': '253'},200);
                            $(this).find('.formall').css('z-index',0);
                        }
                    })

                }
                
            })
              
               
        })
    })
})
