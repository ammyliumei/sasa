/* 
* @Author: Marte
* @Date:   2017-09-05 19:08:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-09 21:17:51
*/
require(['config'],function(){
    require(['jquery'],function($){
        jQuery(function($){
            console.log('buycart.js链接成功');
            $('.cart_head_link').load('./load.html .topbar'); 
            $('.footer').load('./load.html .footer_box');
            $('.siderbar').load('./load.html .sidebar-box');
            require(['common'],function(){
                var buyername = Cookie.get('user')+'table';
                console.log(buyername);
                $.ajax({
                    url:'/api/buycart.php',
                    type:'get',
                    data:{'buycartname':buyername},
                    async:true,
                    success:function(data){
                            // console.log(data);
                        var kinddata=$.parseJSON(data).data;
                        console.log(kinddata);
                        if(kinddata.length){
                            // 显示盒子切换
                            $('#main').css('display','block');
                        
                            $('.small-page').css('display','none');
                               // 结构生成
                            kinddata.forEach(function(item){
                                // console.log(item.goodsid);
                                var cartItme = $(`<li class="cart-product " id=${item.goodsid}></li>`)
                                var goodsItem=`<div class="carttable-td1 fl">
                                            <input class="select-goods-normal fl" type="checkbox" name="selectcb"> 
                                            <div class="cart-pimg fl">
                                              <a href="" target="_blank">
                                                <img src="${item.imgurl}" class="cartgoodsimg" alt="Bioisland DHA海藻油">
                                              </a>
                                            </div>
                                        </div>
                                        <div class="carttable-td2 fl">
                                            <div>
                                              <a href="#" target="_blank">
                                                ${item.goodsname}</a>
                                            </div>
                                            <div class="carttable-spec">${item.goodsgg}&nbsp;</div>
                                            <div class="active_name"></div>
                                        </div>
                                        <div class="cart_goods-price fl">￥${item.goodsprice}</div>
                                        <div class="buy_goods_qty">
                                            <span class="p-quantity">
                                                <a href="" class="btn-decrease">-</a>
                                                <input type="text"  value="${item.goodsqty}">
                                                <a href="" class="btn-increase">+</a>
                                            </span>
                                        </div>
                                        <div class="subtotal red fl">￥${item.goodsprice*item.goodsqty}</div>
                                        <div class="btnDelete fl"><a href="#" class="carttable-action">删除</a></div>`;
                                        // console.log(goodsItem);
                                        cartItme.html(goodsItem);
                                        console.log(cartItme);
                                        

                                        console.log($('.cart_allgoods'));
                                    $('.cart_allgoods').append(cartItme);  
                            })
                        
                        }else{
                            $('#main').css('display','none').siblings('.small-page').css('display','block');
                        }
                        
                        
                    }
                })
            })
        })
    })
})