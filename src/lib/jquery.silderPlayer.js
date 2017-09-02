/**
 * by:lfp
 * time:2017年8月26日
 * time:2017年8月30日
 * name:面向对象轮播图
 */
/*
是否自动轮播
是否显示小图
是否显示左右按钮
可设置轮播间隔时间
轮播类型: 	fade:淡入淡出, vertial:垂直滚动, 
			horizontal:水平滚动, show:幻灯片
默认显示第几张图片
 */

	function  FadeCarousel(options){
		var defaults={
			imgContainer:".banner_container",//轮播图容器

			index : 0
		}
		// 对象扩展
		var opt = jQuery.extend({},defaults,options);
		this.imgQty=opt.imgQty;
		this.imgContainer=opt.imgContainer;
		this.bannerContainer=opt.bannerContainer;

		

	}
	// 原型对象
	FadeCarousel.prototype = {
		_init(){
			this.imgQty=$(this.imgContainer).length();
			this.$imgArr=$(this.imgContainer).children();
			this.$dotArr=$(this.dotContainer).children();
			this.bannerHeight=$(this.imgContainer).find('img').height();
			// 轮播点
			this.$banner_dot=$('</ul>')
			this.$banner_dot.addClass('banner_dot')
			$('this.bannerContainer').append(this.$banner_dot);
			for(var i=0;i<this.imgQty;i++){
				this.imgQty.append('<li></li>');
			}
			//初始状态（增加高亮）
			this.$dotArr.eq(this.index).addClass('dotactive'); 
			play();
		},
		// 显示
		show(){
			// $imgArr.eq(idx).fadeIn(1000).siblings('img').fadeOut(1000);
			// $dotArr.eq(idx).addClass('dotactive').siblings('li').removeClass('dotactive');
		},
		// 隐藏
		hide(){

		},
		// 开始轮播
		play(){
			this.timer=setInterval(function(){
				this.index++;
				if(this.index==$imgQty){
					this.index=0;			
				};
				this.$imgArr.eq(this.index).fadeIn(1000).siblings('img').fadeOut(1000);
				this.$dotArr.eq(this.index).addClass('dotactive').siblings('li').removeClass('dotactive');
			
			},4000)
		
			return this;
		},
		//暂停轮播
		stop(){
			clearInterval(this.timer);
			return this
		}
	}

	new FadeCarousel._init().play();
	