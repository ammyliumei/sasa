
jQuery(function($){    
	console.log('load.js链接成功')
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
	// 侧边栏动画
	console.log($('.sidebar-box'));
	$('.siderar-box').bind({
		mouseenter:function(){
			$(this).find('.cont').css('display','block');
			console.log(this);
		},
		mouleave:function(){
			$(this).find('.cont').css('display','none');
		}
	});
}) 