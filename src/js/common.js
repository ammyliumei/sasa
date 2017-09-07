

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
	// 建立构造函数，并进行描述
	function AmmyZoom(option){
		// defaults默认
		var defaults={
			// 放大图显示区域的宽高
			width:100,
			height:100,
			// 放大图的显示位置
			position:'right',
			// 放大图于原图之间的间隙
			gap:15,
			// 放大镜的类选择器
			ele:'.album-preview-container'

		}
		// 将传入的属性跟默认属性综合成一个对象
		var opt =Object.assign({},defaults,option);
		// 将这些属性都传到实例，方便后期调用
		this.width = opt.width;
	    this.height = opt.height;
	    this.position = opt.position;
	  
	    this.gap = opt.gap;
	    this.ele = opt.ele;
	};
	// 构造函数的原型对象存放方法
	AmmyZoom.prototype={
		// 1.初始方法
			// *生成结构
			// *绑定事件
		init(){
			// 1.获取元素和生成元素
				// 原图容器
			var smallContainer = document.querySelector(this.ele);
	        var smallImg = smallContainer.children[0];
	        smallContainer.style.width=smallImg.offsetWidth+'px';
	        	// 	放大镜
	        var zoom=document.createElement('div');
	        zoom.className='minzoom';
	        smallContainer.appendChild(zoom);
	        	// 放大图容器
	        var bigContainer = document.createElement('div');
	        bigContainer.className = 'ammyzoom-big';
	        	// 定 义放大后的图片显示大小
	        bigContainer.style.width=this.width+'px';
	        bigContainer.style.height=this.height+'px';
	        	// 生成放大图片
	        var  bigImg=new Image();
	        bigImg.src=smallImg.src;
	        bigContainer.appendChild(bigImg);
	        	// 放大图片容器的定位
	          // console.log(this.position)
	        // smallImg.onload = ()=>{
		    	// if(this.position==='right'){
		    	// 	// console.log(bigContainer)
		    	// 	bigContainer.style.left=smallImg.offsetLeft+smallImg.offsetWidth+this.gap+'px';
		    	// 	bigContainer.style.top=smallContainer.offsetTop+this.gap+'px';
		    	// 	console.log(bigContainer.style.left,bigContainer.style.top)

		    	// }
	    	// }
	    	 smallImg.onload = ()=>{
	    	 	var left,top;
	    		if(this.position === 'right'){
	                left = smallContainer.offsetLeft + smallImg.offsetWidth + this.gap;
	                top = smallContainer.offsetTop;
	                console.log(smallContainer.offsetTop)
	                console.log(top)
	            }else if(this.position === 'left'){
	                left = smallContainer.offsetLeft - this.width - this.gap;
	                top = smallContainer.offsetTop;
	            }else if(this.position === 'top'){
	                left = smallContainer.offsetLeft;
	                top = smallContainer.offsetTop - this.height - this.gap;
	            }else if(this.position === 'bottom'){
	                left = smallContainer.offsetLeft;
	                top = smallContainer.offsetTop + smallContainer.offsetHeight + this.gap;
	            }

	            bigContainer.style.left = left + 'px';
	            bigContainer.style.top = top + 'px';
	        }
	        // 将大容器放入页面
	        document.body.appendChild(bigContainer);
	        // 2.绑定是事件
	        	// 绑定在图片容器上，若绑在图片上，鼠标移进图片，会立马显示放大镜，又闪到移除事件，移动鼠标就会出现移进移出的闪动；
	        smallContainer.onmouseenter = ()=>{
	            this.show();
	            // 放大镜移动的x,y
	        };
	        smallContainer.onmouseleave = ()=>{
	            this.hide();
	        };
	        smallContainer.onmousemove = e=>{
			var left =  e.clientX- smallContainer.offsetLeft - zoom.offsetWidth/2 ;
	        var top = e.clientY - smallContainer.offsetTop- zoom.offsetHeight/2 ;
	         if(left<0){
	                left = 0;
	            }else if(left > smallImg.offsetWidth - zoom.offsetWidth){
	                left = smallImg.offsetWidth - zoom.offsetWidth;
	            };
	        if(top<0){
	            top = 0;
	        }else if(top > smallImg.offsetHeight - zoom.offsetHeight){
	            top = smallImg.offsetHeight - zoom.offsetHeight
	        };
	        this.setPosition(left,top);
		};
	        // 将元素传给实例
	        this.big=bigContainer;
	        this.bigImg = bigImg;
	        this.small=smallContainer;
	         this.smallImg = smallImg;
	        this.zoom = zoom;
		},
		// 放大镜的移动
		// 2.显示（只有在显示的时候才能获取元素的宽度）
		show(){
			this.big.style.display="block";
		 	this.zoom.style.display="block";
		 	// 计算放大比例
		 	this.ratio=this.bigImg.offsetWidth/this.smallImg.offsetWidth;
		 	// 根据比例得出在原图中放大镜显示区域的大小
		 	this.zoom.style.width = this.width/this.ratio + 'px';
	        this.zoom.style.height = this.height/this.ratio + 'px';
		},
		// 3.隐藏
		hide(){
			this.big.style.display = 'none';
	        this.zoom.style.display = 'none';
		},
		setPosition(x,y){
			// 放大镜移动
	        this.zoom.style.left = x + 'px';
	        this.zoom.style.top = y + 'px'; 
	        // 放大后的图片在容器中的移动
	        this.bigImg.style.left = -x*this.ratio + 'px';
	        this.bigImg.style.top = -y*this.ratio + 'px';
		}
	};
	// 4.添加constructor属性
	Object.defineProperty(AmmyZoom.prototype,'constructor',{
		value:AmmyZoom
	});