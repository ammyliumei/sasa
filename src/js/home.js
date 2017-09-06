// [内的js文件相对于data-main设置路径，不可加后缀名。如果加了相对于此js放入的html设置路径]
require(['config'],function(){
	require(['jquery'],function($){
		$(function($){
			$('.header').load('html/load.html .header_box');
			$('.nav').load('html/load.html .nav_category');
			$('.footer').load('html/load.html .footer_box');
			$('.sasa_promise_center').load('html/load.html .sasa_promise_wrapper');
			$('.siderbar').load('html/load.html .sidebar-box');
			require(['load'],function(){
				 	// 导航
					var $imgQty=$('.banner_container').find('img').length;
					// 轮播图
					$('.banner_container').css('height',$('.banner_container img').height());
					// 轮播点
					for(var i=0;i<$imgQty;i++){
						$('.banner_dot').append('<li></li>');
					}

					var $imgArr=$('.banner_container').children();
					var $dotArr=$('.banner_dot').children();
					
					// 轮播图片
					var $index=0;
					$dotArr.eq($index).addClass('dotactive');
					autoPlay();
					// 移入轮播图
					$('.banner_dot li').bind({
						mouseenter:function(e){
							$(this).addClass('dotactive').siblings('li').removeClass('dotactive');
							$(this).stop();
							$index=$(this).index();
							show();
						}
					})
					$('.banner_container').bind({
						mouseenter:function(){
							stop();
						},
						mouseleave:function(){
						 	autoPlay()
						}
					})
					function autoPlay(){
						window.timer=setInterval(function(){
							play()
						},4000)
					}
					function play(){
						$index++;
							show();
					}
					function show(){
						
							if($index==$imgQty){
								$index=0;	
							};
								$imgArr.eq($index).fadeIn(1000).siblings('img').fadeOut(1000);
								$dotArr.eq($index).addClass('dotactive').siblings('li').removeClass('dotactive');
								
						
					}
					function stop(){
						clearInterval(window.timer);
					}
					console.log($('.sidebar-box'));
			})
		})
	})
});
