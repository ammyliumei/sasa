console.log('load.js链接成功')
// 1.利用对象封装
var Cookie = {
	/**
	 * [设置cookie]
	 * @param {String} name    [cookie名]
	 * @param {String} val     [cookie值]
	 * @param {[Date]} expires [有效期.日期]
	 * @param {[String]} path    [cookie路径]
	 */
	set:function(name,val,expires,path){
		// document.cookie = 'cartlist=1234;expires=' + now
		var cookieStr = name + '=' + val;
		// 有效期
		if(expires){
			cookieStr += ';expires=' + expires.toUTCString();
		}
		// 设置路径
		if(path){
			cookieStr += ';path=' + path;
		}
		// 写入
		document.cookie = cookieStr;
	},
	get:function(name){
		// 先获取所有cookie
		var cookie = document.cookie;
		if(cookie.length === 0){
			return '';
		}
		// 拆分成数组
		cookie = cookie.split('; ');

		// 遍历cookie，找到想要的cookie值
		var res = '';
		cookie.forEach(function(item){
			var arr = item.split('=');
			if(arr[0] === name){
				res = arr[1];
			}
		});
		return  res;
	},
	remove:function(name){
		// 利用设置过期时间达到删除的效果。
		var now = new Date();
		now.setDate(now.getDate()-100);
		// document.cookie = name +'=xxx;expires=' + now.toUTCString();
		Cookie.set(name,null,now);
	}
}	
// 2.侧边栏动画
function siderBar($sidersele){
	$sidersele.bind({
		mouseenter:function(){
			$(this).find('.cont').css('display','block');
			$(this).find('.cont').animate({'right':38,'opacity':1},500);
		},
		mouseleave:function(){	
			// console.log($(this));
			$(this).find('.cont').animate({'right':70,'opacity':0},500);
			setTimeout(function(){
				$(this).find('.cont').css('display','none');
			},500);
		}
	});
}
// 3.侧边栏动画
siderBar($('.side_item'));
function getBuyCart(){
		// 购物车内的数据
		var buyername = Cookie.get('user')+'table';
		$.ajax({
			url:'/api/buycart.php',
			type:'get',
			data:{'buycartname':buyername},
			async:true,
			success:function(data){
	           var kinddata=$.parseJSON(data).data;
	           // console.log(kinddata); 
	           var totalQty=0;
               var totalParice =0;
	           var res;
	           kinddata.forEach(function(item){	
	           		res  += `<div class="ui-sidecart-product-basic clearfix">
		   			    <input class="ui-sidecart-product-checkbox" type="checkbox">
		   			    <div class="ui-sidecart-product-imgcont">
		   			     	<div class="ui-sidecart-product-img">
			   			        <a href="/html/goodsdetails?id=${item.goodsid}" target="_blank">
			   			          <img src="${item.imgurl}" alt="">
			   			        </a>
		   			     	 </div>
		   			    </div>
		   			    <div class="ui-sidecart-product-info">
			   			    <div class="ui-sidecart-product-name">
			   			        <a href="/html/goodsdetails?id=&{item.goodsid}" target="_blank">
			   			          	<label class="ui-color-gold">【限时特卖】</label>
			   			          	<span class="small_cart_cont">
			   			          		${item.goodsname} 
				   			         	${item.goodsgg} 
				   			        </span>       
			   			         </a>
			   			    </div>
		   			    	<div class="ui-sidecart-product-other clearfix">
			   			        <div class="ui-sidecart-product-action">
			   			          	<a href="" class="J-cart-remove">
			   			            	<i class="iconfont" title="删除"></i>
			   			          	</a>
			   			        </div>
			   			        <div class="ui-sidecart-product-price">
			   			          	<strong class="ui-color-pink">￥${item.goodsprice}</strong>
			   			        </div>
			   			        <div class="ui-sidecart-product-quantity">x${item.goodsqty}</div>
		   			     	</div>
	   			 		</div>
	   				</div>`;	
					
					totalQty += Number(item.goodsqty);
                    totalParice += Number(item.goodsqty*item.goodsprice);
					$('#js_cartnum').html(totalQty)
	           })
				$('.cartdate').html(res);
                $('.jsbt_total_qty').html(totalQty);
                $('.sider_total_price').html('￥'+ totalParice.toFixed(2));
                // 按钮点击关闭不按钮
                $('.btn-close').click(function(){
                    console.log(44)
                    $(this).closest('.expend_page').css('display','none');
                })
                $('.btn-sidecart').click(function(){
                    window.location.href="/html/buycart.html";
                })
                // 3.侧边展开（购物车及浏览记录）
                $('.sidebar-link').click(function(){
                    getBuyCart();   
                    $(this).closest('.side_item').find('.expend_page').css('display','block').closest('.side_item').siblings('.expend_page').css('display','none');

                })
        // 不要出线
			}
		})

}
getBuyCart();
// 4.顶部hover效果
$('.member-link li').bind({
    mouseenter:function(){
                $(this).find('.hover_show').css('display','block')
                    // console.log(777)
                },
    mouseleave:function(event) {
                $(this).find('.hover_show').css('display','none')
                    // console.log(11)
                }
   
})
$('.member-link li').on('mouseenter',function(){
    $(this).find('.hover_show').css('display','block')
    // console.log(777)
})
	// 5.导航数据生成// 
$.ajax({
	url:'/api/goodskind.php',
	type:'get',
	async:true,
	success:function(data){
		var kinddata=$.parseJSON(data).data;
		$('.all_category_title_box li').each(function(idx,item1){

			// 每个li种类的题目
			var $item=$(item1);
			$appendDiv=$('<div></div>')
			$item.append($appendDiv);
			$appendDiv.addClass('append_div')
			var $itemText=$item.find('a').text();
			// console.log($itemText)
			// 获取对应的数据

			var appendArr = kinddata.filter(function(item2){	
				if($itemText==item2.categroyname){
					return true;
				}
			})
			// console.log(item1,$itemText,appendArr);
			// 每个产品名称分类模块，展开的每个ul
			var goodnamekind=new Set(appendArr.map(function(item3){
					return item3.namekind
			}))
			// console.log(goodnamekind);
			// 生成每个盒子
			goodnamekind.forEach(function(item4){
				var $goodkindbox=$('<div></div>');
				$goodkindbox.addClass('goodkindbox');
				 $appendDiv.append($goodkindbox)
					// 产品专题标题
				var $kindnametitle=$('<h5></h5>');
				$kindnametitle.html(item4);
				$kindnametitle.addClass('kindnametitle');
				$goodkindbox.append($kindnametitle);	
					// 产品分类
				var $goodskind=$('<ul></ul>')
				$goodkindbox.append($goodskind);
				// 创造所有的项目
				// 每个分类的所有产品namekind
				var goodstype=[]
				kinddata.forEach(function(item5){	
					if(item4==item5.namekind){

						goodstype.push(item5.namesmallkind)
					}
				})
				goodstype=new Set(goodstype);
				// console.log(goodstype)
				goodstype.forEach(function(item){
					var $goodlink=$('<a></a>');
					$goodlink.attr('href','/html/type.html');
					var  $goodkindname=$('<li></li>');
					$goodlink.append($goodkindname);
					$goodkindname.html(item)
					$goodskind.append($goodlink);
				})
				
			})
            $('.kindnametitle').click(function(){
                var cate = $(this).text;
                var num1 =$(this).closest('.kindname').index();
                var num = `${num1};1;1`
                selectByType(cate,num);
                localtion.href='/html/type.html';
            });
            // 三级类名
            $('.goodkindbox ul a li').click(function(){
                var cate = $(this).text;
                var num1 =$(this).closest('.kindname').index();
                var num = `${num1};1;1`;
                selectByType(cate,num);
                localtion.href='/html/type.html';
            });
            // 二级类名
            $('.kindnametitle').click(function(){
                var cate = $(this).text;
                var num1 =$(this).closest('.kindname').index();
                var num = `${num1};1`;
                selectByType(cate,num);
                localtion.href='/html/type.html';

            });
            // 一级类名
            $('.kindname').first('a').click(function(){
                var cate = $(this).text;
                var num1 =$(this).closest('.kindname').index();
                var num = `${num1}`;
                selectByType(cate,num);
                localtion.href='/html/type.html';
            });
           
            // ......不要出线
		})
	}
})
	// 6.限时活动的列表商品每排一个商品
function limmitedGoods(qty){
    $.ajax({
        url:'/api/goodslist.php',
        type:'get',
        data:{'qty':qty,'cate':'限时特卖'},
        async:true,
        success:function(data){
            var kinddata=$.parseJSON(data).data;
            // console.log(kinddata);
            kinddata.forEach(function(item,index){
                var $thisGoods=$(`<a target="_blank" href="/html/goodsdetails.html?id=${item.goodsid}"></a>`);
                 $('.limitted_offer_cont').append($thisGoods);
                 // console.log(item)
                 // 现在的价格
                 var currentPrice = (item.goodsprice*item.goodsdiscount*0.1).toFixed(2);
                 // 获取商品图片
                 var goodsImgs= item.goodsimgurl.split(';');
                 // console.log(goodsImgs)
                // 每个限时抢购盒子链接                   
                var simgWrapperCont=`<div class="sasa_limit_item">
                                        <div class="sasa_limit_imgWrapper">
                                            <img class="sasa_limit_img" src="${goodsImgs[0]}"/>
                                            <span class="sasa_limit_count"><span>${item.goodsdiscount}</span> 折</span>
                                        </div>
                                        <div class="sasa_limit_info">
                                            <div class="sasa_limit_countdown" id="timer${item.goodsid}">
                                                剩余<span class="day">00</span>天
                                                <span class="hour">15</span> : 
                                                <span class="minute">51</span> : 
                                                <span class="second">00</span>            
                                            </div>
                                            <div class="sasa_limit_detail">
                                                <div class="sasa_limit_detail_intro">
                                                    <i class="icon iconfont sasa_limit_font_icon"></i>
                                                    ${item.goodsname}
                                                </div>
                                                <div class="sasa_limit_detail_title">
                                                    ${item.goodsname}&nbsp;${item.goodspecification}
                                                </div>   
                                                <div class="sasa_limit_detail_price">
                                                    <div class="sasa_limit_pirce_cur">     
                                                        <span class="sasa_limit_price_cur_sig">￥</span>
                                                        <span class="sasa_limit_price_cur_num"> ${currentPrice}</span>
                                                    </div>
                                                    <div class="sasa_limit_price_old">
                                                      <div class="sasa_limit_price_old_num">￥${item.goodsprice}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="sasa_limit_bottom">
                                              <div class="sasa_limit_sold">已售<span class="sasa_limit_soldnum">${item.goodssaleqty}</span>件</div>
                                              <span class="sasa_limit_btn jumpbox">马上抢</span>
                                            </div> 
                                        </div>
                                    </div> `;                   
                $thisGoods.html(simgWrapperCont); 
                var timerSele=$(`#timer${item.goodsid}`)
                // console.log(timerSele)
                // 定时器
                times(timerSele);
                function times(sele){
                    // 定义一个活动结束的时间字符串
                    var activeday=item.enddate;
                    // console.log(activeday)
                        // 活动开始时间距离1970年的毫秒数
                    var activeDate=Date.parse(activeday);
                        // 现在距离1970年的毫秒数 
                    var nowDate=Date.now()
                    // console.log(nowDate)
                        // 计算差值:***
                    var timeDif=parseInt((activeDate-nowDate)/1000);
                    // if(timeDif<=0){
                    //     clearInterval(this.timer);
                    //     $(sele).css('display','none');
                    // }
                    // 根据差值计算各个数值
                        // 秒
                    var seconds=timeDif%60;
                        // 分
                    var minutes=parseInt(timeDif/60)%60;
                        //小时
                    var hours=parseInt(timeDif/60/60)%24;
                        // 天
                    var days=parseInt(timeDif/60/60/30);
                        // 根据差值显示 
                    var totaltimes=`剩余<span class="day">${days}</span>天
                                    <span class="hour">${ hours}</span> : 
                                    <span class="minute">${minutes}</span> : 
                                    <span class="second">${seconds}</span>` ;
                    sele.html(totaltimes);
                    // console.log(sele);

                }
                this.timer=setInterval(function(){
                    times(timerSele);
                },1000);
            })
            // 绑定时间 当差值为零时停止计算，并将文字消失，图片更换； 
        }
    })
	// console.log(666)
} 
	// 7.一排4个的列表生成
	//传入 生成的数量qty,产品总的大盒子选择器名sele
function fourgoods(qty,sele,type,cate,pageNo){
    $.ajax({
        url:'/api/goodslist.php',
        type:'get',
        data:{'qty':qty,'cate':'新品上市','type':type,'cate':cate,'pageNo':pageNo},
        async:true,
        success:function(data){
            var allkinddata=$.parseJSON(data)
            var kinddata=allkinddata.data;
              // 现在的页码
            var currentPageNo=allkinddata.pageNo;
                // z商品总数
            var totalQty = allkinddata.total;
            // 页码总数
            var totalPageNo =Math.ceil(totalQty/10);
            // 将页码填入页面
            $('.page-current').html(currentPageNo);
            $('.page-total').html(totalPageNo);
            console.log(kinddata);
            pricePx(kinddata);

            console.log($('.action-sort'))
            $('.action-sort').click(function(){
                console.log($('.action-sort'));
                kinddata.sort(function(a,b){  
                    return a.price - b.price;  
                }) 
                pricePx(kinddata);
            }); 
               
                    
           
            function pricePx(arr){
                arr.forEach(function(item,index){
                    var $thisGoods=$('<a class="sasa_new_item" herf="/html/goodsdetails.html?id=${item.goodsid}"></a>');
                    // console.log(sele)
                     $(sele).append($thisGoods);
                    // console.log(item)
                     // 现在的价格
                    var currentPrice = (item.goodsprice*item.goodsdiscount*0.1).toFixed(2);
                     // 获取商品图片
                    var goodsImgs= item.goodsimgurl.split(';');
                     // console.log(goodsImgs)
                    // 每个产品盒子结构 
                    var simgWrapperCont=`<div class="sasa_new_imgWrapper">
                                            <img  class="sasa_new_img" alt="IOPE ${item.goodsname}" src="${goodsImgs[0]}">
                                            <div class="sasa_new_arrival_icon">
                                                <p>新品<br>上市</p>
                                            </div>

                                            <div class="sasa_new_source_icon">
                                                <div class="sasa_new_cty_i sasa_new_cty_i_3">
                                                </div>
                                                <div class="sasa_source_name">
                                                  <span class="sasa_new_nation_name">${item.originplace}品牌</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sasa_new_intro">
                                            <a href="/html/goodsdetails.html?id=${item.goodsid}" target="_blank"> &nbsp;${item.goodsname}&nbsp; #${item.goodspecification}&nbsp;#${item.goodssaleqty}件&nbsp;${item.goodsname}&nbsp;</a>
                                        </div>
                                        <div class="sasa_new_price">
                                            <span class="sasa_new_price_cur_sign">￥</span>
                                            <span class="sasa_new_price_cur_num">${currentPrice}</span>
                                            <span class="sasa_new_price_old"><del>￥${item.goodsprice}</del></span>
                                        </div>
                                         `;                                         
                    $thisGoods.html(simgWrapperCont);   
                })
            }
        }
    })
	// console.log(666)
} 
	// 8.动画的列表页，4个一排
	//传入 生成的数量qty,产品总的大盒子选择器名sele
function fourActive(qty,sele,type,cate,pageNo){
	$.ajax({
	    url:'/api/goodslist.php',
	    type:'get',
	    data:{'qty':qty,'cate':'贵宾专享','pageNo':pageNo},
	    async:true,
	    success:function(data){
             // console.log(data);
	           var allkinddata=$.parseJSON(data)
                   var kinddata=allkinddata.data;
                     // 现在的页码
                   var currentPageNo=allkinddata.pageNo;
                       // z商品总数
                   var totalQty = allkinddata.total;
                   // 页码总数
                   var totalPageNo =Math.ceil(totalQty/10);
                   // 将页码填入页面
                   $('.page-current').html(currentPageNo);
                   $('.page-total').html(totalPageNo);
                   console.log(kinddata);
                    pricePaixu(kinddata);
                       // console.log($('.action-sort'))
                   $('.action-sort').click(function(){
                       // console.log('qian',kinddata);
                       kinddata.sort(function(a,b){  
                           return a.price - b.price;  
                       }) ;
                       // console.log('hou',kinddata);

                       pricePaixu(kinddata);
                   }); 
                  
	       function pricePaixu(arr){
                $(sele).html('');
                arr.forEach(function(item){
                        // 现在的价格
                    var currentPrice = (item.goodsprice*item.goodsdiscount*0.1).toFixed(2);
                     // 获取商品图片
                    var goodsImgs= item.goodsimgurl.split(';');
                        // 每个商品结构
                     // console.log(goodsImgs)
                    var $thisGoods=$(`<li ></li>`)
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
                                                        <a href="/html/goodsdetails.html?id=${item.goodsid}" target="_blank"><img  class="action-goods-img" alt="${item.goodsname}" src="${goodsImgs[1]}"></a>
                                                    </div>
                                                    <div class="sale-price">
                                                        <span class="count fr">${item.goodsdiscount}折</span>
                                                        <span class="price tl">￥${currentPrice}</span>
                                                        <span class="dis tl"><del>￥${item.goodsprice}</del></span>
                                                    </div>
                                                    <div class="arrivals-info">
                                                        <div class="infoconts">
                                                            <div class="des02">
                                                                <a href="/brand.html?brand=${item.brand}" target="_blank">${item.brand}</a>
                                                            </div>
                                                            <p class="des03"><a href="l" target="_blank">${item.goodspecification}</a></p>
                                                            <p class="des04">${item.goodsname}&nbsp;&nbsp${item.brand}</p>
                                                        </div>
                                                        <div class="tags">
                                                            <a  href="/html/goodsdetails.html?id=${item.goodsid}" style="background:#c69a62;color:#ffffff;">直降</a>
                                                        </div>
                                                    </div>
                                                    <div class="btn-buy">
                                                        <a href="/html/goodsdetails.html?id=${item.goodsid}" class="btn btn-major action-addtocart" target="_dialog_minicart" rel="nofollow">
                                                            <span><span class="jumpbox">加入购物车</span></span>
                                                        </a>
                                                    </div>
                                                </div>
                                           </div>
                                            `;
                    $thisGoods.html(simgWrapperCont);
                    // 放入原有的合同内目录结构内
                    $(sele).append($thisGoods);
                })
           }
	        
	        // console.log('abc')
	        // 切换小图；
	        $('.formalpic_list').on('mouseenter','img',function(){
	            var $currentBigBic=$(this).closest('.formall').find('.action-goods-img')
	            // console.log($currentBigBic);
	            $currentBigBic.attr('src',$(this).attr('src'));
	        });
	        // hover每个li时，展示细节图
	        $('li').bind({
	            mouseenter:function(){
	                // console.log(this);
	                $(this).find('.formall').animate({'width': '338'},200);
	                $(this).find('.formall').css('z-index',1000);
                    $(this).find('.formallcont .btn-buy ').css('display','block');

	            },
	            mouseleave:function(){
	                $(this).find('.formall').animate({'width': '253'},200);
	                $(this).find('.formall').css('z-index',0);
                    $(this).find('.formallcont .btn-buy ').css('display','none');

	            }
	        })

	    }
	    
	})
}
	// 9.楼梯
	// 传进来的都是选择器名
	// louti 为悬浮的楼梯盒子，loutiItem是悬浮楼梯下面的li每一层
	// louceng为所有楼层取相同的了类名
function floor(louti,louceng){
	$louti = $(louti);
	$loutiItem = $louti.find('li');
	$louceng = $(louceng);
	console.log($(louceng))
	// 1）window绑定滚动事件
	$(window).on('scroll',function(){
		// console.log('scroll')

		// 获取滚动条滚动过的距离
		var scrollTop = $(window).scrollTop();
		// 2）当滚动到一定距离时，显示楼梯
		if(scrollTop>800){
			$louti.fadeIn();
		}else{
			$louti.fadeOut();
		}
		// 3）如何判断滚动到响应楼层
		// 当滚动到相应的楼层时，楼梯"相应位置"显示高亮
		$louceng.each(function(idx,ele){
			if(scrollTop >= $(ele).offset().top - $(ele).outerHeight()/2){
				$loutiItem.eq(idx).addClass('hover').siblings('li').not('.last').removeClass('hover');
			}
		})
	});
	// 4）点击楼梯跳到对应楼层
	$louti.on('click','li',function(){	
		var targetScrollTop;
		if($(this).hasClass('last')){
			targetScrollTop = 0
		}else{
			var idx = $(this).index();
			// 获取对应楼层所在的偏移量
			targetScrollTop = $louceng.eq(idx).offset().top;
		}
		$('html,body').stop().animate({'scrollTop':targetScrollTop},'slow');
	})
}
	// 10.验证码
	/**
	 * [获取随机验证码]
	 * @return {String} [返回随机验证码]
	 */
function vCode(){
	var arr_char = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');

	var res = '';
	for(var i=0;i<4;i++){
		// 获取随机索引值
		var idx = parseInt(Math.random()*arr_char.length);

		// 根据索引值获取字符，并拼接
		res += arr_char[idx];
	}

	return res;
}
// 11 设置有效期
function expires(){
	var date = new Date();
     date.setDate(date.getDate()+7);
     return date;
}
	// 12 验证是否登陆
if(Cookie.get('user')){
	$('#loginBar_right').css('display','none');
	$('#memberBar_right').css('display','block');
}else{
	$('#loginBar_right').css('display','block');
	$('#memberBar_right').css('display','none');
}
	// 13退出点击后清除cookie
$('#memberBar_right a').click(function(){
	Cookie.remove('user')
})
		// currentUrl();
		// function currentUrl(){
		// 	var currenturl=location.href;
		// 	console.log(currenturl)
		// 	var res=currenturl.indexOf('login')+1||currenturl.indexOf('register')+1;
		// 		console.log(res)
		// 	window.back();
			// if(!res){
			// 	console.log('asdfd')
			// 	Cookie.set('recordurl',currenturl, expires(),'/');
			// }
		// }
	
//14 给马上抢购物车 绑定弹窗事件
// 关闭串口函数
function eleDele(ele){
	$(ele).detach();
} 
// 弹出加入购物车时弹弹窗
function addPopup(eleClassName){
	$('body').append(`<div id="mini_cart_dialog" class=${eleClassName} >
				  	<div class="popup-body">

				     	<div class="popup-header clearfix">
				        	<span>提醒</span>
				        	<span><button type="button" title="关闭" class="popup-btn-close fr" hidefocus=""><i>×</i></button>
				        	</span>
				    	</div>

				    	<div class="popup-content clearfix">
				    		<div class="minicart-infos">

				  				<p><q class="icon">%</q><span class="caution-content">加入购物车成功。</span></p>

								<div class="actions">
						    		<button type="button" class="btn btn-simple popup-btn-close">
						    			<span><span>继续购物</span></span>
						    		</button>    
						    		<a class="btn btn-major" href="/html/buycart"><span><span>进入购物车</span></span></a>
								</div>
							</div>
						</div>
				 	 </div>
				</div>`);

}
// 自动居中弹窗
function autoCenter(ele){
    // 计算left,top
    // console.log(window.innerWidth,window.innerHeight)
    var left = (window.innerWidth - 300)/2;
    var top = (window.innerHeight - 150)/2;
    // console.log(left,top)
    // 居中定位
    $(ele).css({'left':left+'px','top':top+'px'});
}
//15  点击ele 点击事件加入购物车
function addBuycart(ele,goodsid ,goodsname,goodsprice,goodsgg,goodsqty,imgurl){
	// 2得到用户购物车需要的信息
	var buyername =Cookie.get('user');
	var goodsid = goodsid ;
	var goodsname = goodsname;
	var goodsprice = goodsprice;
	var goodsgg =  goodsgg;
	var goodsqty =  goodsqty;
	var imgurl = imgurl;
	console.log(goodsqty, goodsgg,goodsprice)
	$.ajax({
	    url:'/api/buycart.php',
	    type:'get',
	    data:{'buyername':buyername,
	    		'goodsid':goodsid,
	    		'goodsname':goodsname,
	    		'goodsprice':goodsprice,
	    		'goodsgg':goodsgg,
	    		'goodsqty':goodsqty,
	    		'imgurl':imgurl
	    	},
	    async:true,
	    success:function(data){
	    	
	      	console.log(data)
            getBuyCart();
	    }
	})
}		
// 点击删选
function selectByType(cate,num){
    Cookie.set('typename',cate);
    Cookie.set('typenum',num);
}


// 返回顶部
function goUp(){
    var ele =document.querySelector('#goTopBtn');
    window.onscroll = ()=>{
        // 先获取滚动条滚动过的距离
        var scrollTop = window.scrollY;

        if(scrollTop >= 1000){
            // console.log(ele)
            ele.style.display = 'block';
        }else{
            ele.style.display = 'none';
        }
    }
    ele.onclick = ()=>{

        var timer = setInterval(()=>{
            // 先获取滚动条滚动过的距离
            var scrollTop = window.scrollY;

            // 计算速度
            // 可变速度
            var speed = scrollTop/20;

            scrollTop -= speed;

            if(scrollTop <= 0 || speed<=3){
                clearInterval(timer);
                scrollTop = 0;
            }

            window.scrollTo(0,scrollTop);

        },20);
    }
}
// 每个页面又有侧边栏，加载时就调用此函数
goUp();
// 加载更多
function loadMore(ele ,page){
    var scrollLong = $(ele).height();
    if(window.scrollY>= scrollLong){
        fourActive(qty,sele,type,cate,page)
    }
}