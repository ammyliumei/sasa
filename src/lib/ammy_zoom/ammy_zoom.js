// 建立构造函数，并进行描述
function AmmyZoom(option){
	// defaults默认
	var defaults={
		// 放大图显示区域的宽高
		width:200,
		height:300,
		// 放大图的显示位置
		position:'right',
		// 放大图于原图之间的间隙
		gap:15,
		// 放大镜的类选择器
		ele:'.originalbox'

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