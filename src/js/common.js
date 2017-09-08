

	console.log('load.js链接成功')
	
	// 1.侧边栏动画
	function siderbar($sidersele){
		// consoleG.log($sidersele)
		$sidersele.bind({
			mouseenter:function(){
				$(this).find('.cont').css('display','block');
				$(this).find('.cont').animate({'right':38,'opacity':1},500);
			},
			mouseleave:function(){	
				console.log($(this));
				$(this).find('.cont').animate({'right':70,'opacity':0},500);
				setTimeout(function(){
					$(this).find('.cont').css('display','none');
				},500)
			}
		});
	}
	// 2.导航数据生成
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
						$goodlink.attr('href','goodslist.html');
						var  $goodkindname=$('<li></li>');
						$goodlink.append($goodkindname);
						$goodkindname.html(item)
						$goodskind.append($goodlink);
					})
					
				})
			})
		}
	})

	// 3.限时活动的列表商品每排一个商品
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
	                 var currentPrice = item.goodsprice*item.goodsdiscount*0.1;
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
	                                              <span class="sasa_limit_btn">马上抢</span>
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
	                    if(timeDif<=0){
	                        clearInterval(this.timer);
	                        sele.style.display='none';
	                    }
	                    // 根据差值计算各个数值
	                        // 秒
	                    var seconds=timeDif%60;
	                        // 分
	                    var minutes=parseInt(timeDif/60)%60;
	                        //小时
	                    var hours=parseInt(timeDif/60/60)%60;
	                        // 天
	                    var days=parseInt(timeDif/60/60/60);
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
	// 4.一排4个的列表生成
	//传入 生成的数量qty,产品总的大盒子选择器名sele
	function fourgoods(qty,sele){
	    $.ajax({
	        url:'/api/goodslist.php',
	        type:'get',
	        data:{'qty':qty,'cate':'新品上市'},
	        async:true,
	        success:function(data){
	            var kinddata=$.parseJSON(data).data;
	            // console.log(kinddata);
	            kinddata.forEach(function(item,index){
	                var $thisGoods=$('<a class="sasa_new_item" herf="/html/goodsdetails.html?id=${item.goodsid}"></a>');
	                // console.log(sele)
	                 $(sele).append($thisGoods);
	                // console.log(item)
	                 // 现在的价格
	                var currentPrice = item.goodsprice*item.goodsdiscount*0.1;
	                 // 获取商品图片
	                var goodsImgs= item.goodsimgurl.split(';');
	                 // console.log(goodsImgs)
	                // 每个产品盒子结构 
	                var simgWrapperCont=`<div class="sasa_new_imgWrapper">
							                <img  class="sasa_new_img" alt="IOPE ${item.goodsname} " src="${goodsImgs[0]}">
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
						                    <a href="" target="_blank"> &nbsp;${item.goodsname}&nbsp; #${item.goodspecification}&nbsp;#${item.goodssaleqty}件&nbsp;${item.goodsname}&nbsp;</a>
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
	    })
		// console.log(666)
	} 
	// 5.动画的列表页，4个一排
	//传入 生成的数量qty,产品总的大盒子选择器名sele
	function fourActive(qty,sele){
		$.ajax({
		    url:'/api/goodslist.php',
		    type:'get',
		    data:{'qty':qty,'cate':'贵宾专享'},
		    async:true,
		    success:function(data){
		        var kinddata=$.parseJSON(data).data;
		        // console.log(kinddata);
		        kinddata.forEach(function(item){
		                // 现在的价格
		            var currentPrice = item.goodsprice*item.goodsdiscount*0.1;
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
		                                                    <span><span>加入购物车</span></span>
		                                                </a>
		                                            </div>
		                                        </div>
		                                   </div>
		                                    `;
		            $thisGoods.html(simgWrapperCont);
		            // 放入原有的合同内目录结构内
		            $(sele).append($thisGoods);
		        })
		        console.log('abc')
		        // 切换小图；
		        $('.formalpic_list').on('mouseenter','img',function(){
		            var $currentBigBic=$(this).closest('.formall').find('.action-goods-img')
		            // console.log($currentBigBic);
		            $currentBigBic.attr('src',$(this).attr('src'));
		        });
		        // hover每个li时，展示细节图
		        $('.floor_cont li').bind({
		            mouseenter:function(){
		                // console.log(this);
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
	}
	// 6.楼梯
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
	// 7.验证码
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
	// 8.cookie
	/*
		封装Cookie的增删查改
			* 添加 setCookie()
			* 删除 removeCookie()
			* 读取 getCookie()
			* 修改 利用setCookie()
		利用对象封装
			Cookie
				* set()
				* get()
				* remove()
	 */

	// 利用对象封装
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
	function expires(){
		var date = new Date();
         date.setDate(date.getDate()+7);
         return date;
	}
	// 验证是否存有保留了登陆信息

		if(Cookie.get('user')){
			$('#loginBar_right').css('display','none');
			$('#memberBar_right').css('display','block');

		}else{
			$('#loginBar_right').css('display','block');
			$('#memberBar_right').css('display','none');
		}
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
