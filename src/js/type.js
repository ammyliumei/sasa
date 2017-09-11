/* 
* @Author: Marte
* @Date:   2017-09-10 21:06:39
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 20:05:15
*/

require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
            console.log('type.js链接成功')
            $('.header').load('/html/load.html .header_box');
            $('.list_nav').load('/html/load.html .nav_category');
            $('.footer').load('/html/load.html .footer_box');
            $('.siderbar').load('/html/load.html .sidebar-box');
            require(['common'],function(){
                // console.log($('.all_category_title_box'));
                // 头部导航隐藏
                $('.all_category_title_box').css('display','none');
                $('.all_category_head').mouseenter(function(){
                    $('.all_category_title_box').css('display','block');
                });
                $('.all_category_title_box').mouseleave(function(){
                    $('.all_category_title_box').css('display','none');
                    $('.type_left .all_category_title_box ').css('display','block');
                });
                // 生成左边数据
                $.ajax({
                    url:'/api/goodskind.php',
                    type:'get',
                    async:true,
                    success:function(data){
                        var kinddata=$.parseJSON(data).data;
                        $('.all_type_box li').each(function(idx,item1){
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


                            var $nameKindsBox = $('<div class ="kinds_box"></div>');
                            $appendDiv.append($nameKindsBox);
                            // 每个产品名称分类模块，展开的每个ul
                            var goodnamekind=new Set(appendArr.map(function(item3){
                                    return item3.namekind
                            }))
                            // console.log(goodnamekind);
                            // 生成每个盒子
                            goodnamekind.forEach(function(item4){
                                var $goodkindbox=$('<div></div>');
                                $goodkindbox.addClass('goodkindbox');
                                 $nameKindsBox.append($goodkindbox)


                                    // 产品专题标题
                                var $kindnametitle=$('<h5></h5>');
                                $kindnametitle.html(item4);
                                $kindnametitle.addClass('kindnametitle');
                                $goodkindbox.append($kindnametitle);
                                    


                                    // 产品分类
                                var $goodskind=$('<ul></ul>');

                                $goodkindbox.append($goodskind);
                                var $kindnameCont = $('<div class="kindnameCont"></div>')
                                $goodskind.append($kindnameCont);

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
                                    $kindnameCont.append($goodlink);
                                })
                                
                            })
                        })
                        
                        // 隐藏数据
                        // console.log($('.type_left .all_type_box .kindname.append_div ul li'));
                        // 隐藏第三类分类
                         $('.type_left .all_type_box .make_up .append_div ul li').css('display','none');
                         $('.type_left .all_type_box .facial_care .append_div ul li').css('display','none');
                         $('.make_up').nextAll('.kindname').find('.kindnametitle').remove();
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
                         // 隐藏第二类分类
                          //获取CooKie的值，知道点那个种类进来的，唇进来一个序列号
                        function appendTypeDiv(){
                            $('.kindname .iconfont').click(function(){
                                var appendHeight =$(this).closest('.kindname').find('.kinds_box').height();
                                var appendDivHeight = $(this).closest('.kindname').find('.append_div').height()
                                if(appendDivHeight){
                                    $(this).closest('.kindname').find('.append_div').animate({'height':0});
                                }else{
                                    $(this).closest('.kindname').find('.append_div').animate({'height':appendHeight});
                                }    
                            });
                        };
                        // 填写到上部的种类名；
                        function inputDetailType(TypeArr){
                            var detailTypeArr = [];
                            TypeArr.each(function(index,item){
                                // console.log(item);
                                detailTypeArr.push(item.text);

                            })
                                // console.log(detailTypeArr);
                              detailTypeArr.forEach(function(item){
                                $('.detail_type').append(`<a class = "new_detail_type_name">${item}</a>`);
                              })  
                        }
                        // 类型数字组合
                        var currentType = Cookie.get('typenum');
                        if(!currentType){
                            $('.facial_care').siblings('.kindname').find('.append_div').css('height',0);
                            appendTypeDiv();
                            // 得到上部数据
                            var  face_detail_a= $('.facial_care .append_div .kinds_box .goodkindbox').eq(0).find('ul a')
                            
                              inputDetailType(face_detail_a);   
                        }else{
                            // 隐藏其他的
                            $('.kindname').siblings('.kindname').find('.append_div').css('height',0);
                            // 可能的情况1，
                            //  1，1
                            // 1 ，1 ，1
                            var TypeArr =  Cookie.get('type').split(';');
                            var  TypeArrTextEle= $('.kindname').eq(TypeArr[0]).find('.kinds_box .goodkindbox').eq(0).find('ul a');
                                    inputDetailType(TypeArrTextEle);    
                        }
                        // 生成数据写入页面
                        var typeTextArr = Cookie.get('typename').split(';');
                            var cate;
                        if(typeTextArr){
                            if(typeTextArr.length==1){
                                cate = typeTextArr[0];
                                fourActive(20,'.goods_box','goodstype',cate);
                            }else if(typeTextArr.length==2){
                                 cate = typeTextArr[1];
                                fourActive(20,'.goods_box','goodstypeone',cate);
                            }else{
                                cate = typeTextArr[3];
                                fourActive(20,'.goods_box','goodstypetwo',cate);
                            }
                        }else{
                             fourActive(20,'.goods_box','goodstype','洁面');
                        }
                        // 分页
                         var resPageNo;
                        $('.page-action .icon-sanjiaoxing-copy').click(function(){
                            var currentQty = Number( $(this).siblings('.page-count').find('.page-current').html());
                            var totalQty = Number( $(this).siblings('.page-count').find('.page-total').html());
                            if( currentQty<totalQty){
                                $(this).siblings('.page-count').find('.page-current').html(currentQty+1);
                                resPageNo = currentQty+1;
                                fourActive(10,'.goods_box','','',resPageNo)

                            }
                            
                        })
                        $('.page-action .icon-triangle').click(function(){
                             var currentQty = Number( $(this).siblings('.page-count').find('.page-current').html());
                            if(currentQty>1){
                                resPageNo = currentQty - 1;
                                  $(this).siblings('.page-count').find('.page-current').html(resPageNo);
                            }
                            fourActive(10,'.goods_box','','',resPageNo)
                        });
                        // 
                    // 不要出此括号
                    }
                })      
            })
            
            
            
        })
    })
})
