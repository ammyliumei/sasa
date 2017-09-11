/* 
* @Author: Marte
* @Date:   2017-09-05 19:08:12
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 14:37:28
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
                // console.log(buyername);
                $.ajax({
                    url:'/api/buycart.php',
                    type:'get',
                    data:{'buycartname':buyername},
                    async:true,
                    success:function(data){
                            // console.log(data);
                        var kinddata=$.parseJSON(data).data;
                        // console.log(kinddata);
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
                                              <a href="/html/goodsdetails.html?id=${item.goodsid}" target="_blank">
                                                ${item.goodsname}</a>
                                            </div>
                                            <div class="carttable-spec">${item.goodsgg}&nbsp;</div>
                                            <div class="active_name"></div>
                                        </div>
                                        <div class="cart_goods-price fl">￥${item.goodsprice}</div>
                                        <div class="buy_goods_qty">
                                            <span class="p-quantity">
                                                <a class="btn-decrease">-</a>
                                                <input class="goodsQty" type="text"  value="${item.goodsqty}"/>
                                                <a  class="btn-increase">+</a>
                                            </span>
                                        </div>
                                        <div class="subtotal red fl">￥${item.goodsprice*item.goodsqty}</div>
                                        <div class="btnDelete fl"><a href="#" class="carttable-action">删除</a></div>`;
                                        // console.log(goodsItem);
                                        cartItme.html(goodsItem);
                                        // console.log(cartItme);
                                        

                                        // console.log($('.cart_allgoods'));
                                    $('.cart_allgoods').append(cartItme);  
                            })
                        
                        }else{
                            $('#main').css('display','none').siblings('.small-page').css('display','block');
                        }
                       
                        $('.btn-increase').click(function(){
                            var currentQty = Number( $(this).siblings('input').val());
                            $(this).siblings('input').val(currentQty + 1);
                        })
                        $('.btn-decrease').click(function(){
                            var currentQty = Number( $(this).siblings('input').val());
                            if(currentQty<=1){
                                $(this).siblings('input').val( 1);
                            }else{
                                 $(this).siblings('input').val(currentQty - 1);
                            }
                        });
                        function changeCart(){
                            var buycartname =Cookie.get('user')+'table';
                            var goodsid = $(this).closest('.cart-product').attr('id');
                            $.ajax({
                                url:'/api/buycart.php',
                                type:'get',
                                data:{
                                        'buycartname':buycartname,
                                        'cartgoodsid':goodsid,
                                        'goodsqty':goodsqty
                                    },
                                async:true,
                                success:function(data){console.log(data);
                                    getBuyCart()
                                }
                            })
                        }

                       $('.buy_goods_qty input').change(function(){
                            var goodsqty =  $(this).val();
                            console.log(goodsqty);
                            if(goodsqty <= 0){
                                $(this).val(1);
                                goodsqty =  1;
                            }
                            // changeCart();
                            var buycartname =Cookie.get('user')+'table';
                            var goodsid = $(this).closest('.cart-product').attr('id');
                            $.ajax({
                                url:'/api/buycart.php',
                                type:'get',
                                data:{
                                        'buycartname':buycartname,
                                        'cartgoodsid':goodsid,
                                        'goodsqty':goodsqty
                                    },
                                async:true,
                                success:function(data){console.log(data);
                                    getBuyCart()
                                }
                            })
                        });
                        $('.p-quantity a').click(function(){
                            var goodsqty =  $(this).siblings('input').val();
                            console.log(goodsqty);
                            // changeCart()
                            var buycartname =Cookie.get('user')+'table';
                            var goodsid = $(this).closest('.cart-product').attr('id');
                            $.ajax({
                                url:'/api/buycart.php',
                                type:'get',
                                data:{
                                        'buycartname':buycartname,
                                        'cartgoodsid':goodsid,
                                        'goodsqty':goodsqty
                                    },
                                async:true,
                                success:function(data){console.log(data);
                                    getBuyCart()
                                }
                            })
                        }) ;   

                        $('.btnDelete').click(function(){
                            console.log(666)
                            var goodsid = $(this).closest('.cart-product').attr('id');
                            var buycartname =Cookie.get('user')+'table';
                            var dele ='true';
                            console.log(goodsid,buycartname,dele)
                            $.ajax({
                                url:'/api/buycart.php',
                                type:'get',
                                data:{
                                        'buycartname':buycartname,
                                        'cartgoodsid':goodsid,
                                        'dele':dele
                                    },
                                async:true,
                                success:function(data){
                                    console.log(data);
                                    $(this).closest('.cart-product').remove();
                                    getBuyCart();
                                }
                            })
                        })
                        $('.clear_cart').click(function(){
                            $(this).closest('.cart_goods').find('.cart_allgoods').remove();
                            $('#main').css('display','none');
                            $('.small-page').css('display','block');

                            var buycartname =Cookie.get('user')+'table';
                            var deleall =true;
                            $.ajax({
                                url:'/api/buycart.php',
                                type:'get',
                                data:{
                                        'buycartname':buycartname,
                                        'deleall':deleall
                                    },
                                async:true,
                                success:function(data){
                                    getBuyCart();
                                     $(this).closest('.cart-product').remove();
                                    console.log(data);
                                }
                            })
                        })
// 。。。。。。。。。。。。。。。。。。。不要超出
                
                    }

                })
                
                
                
                

//不要出来
            })
        })
    })
})