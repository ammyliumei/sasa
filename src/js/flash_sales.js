/* 
* @Author: Marte
* @Date:   2017-09-04 21:48:13
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 23:00:46
*/
require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
            console.log('falsh_sales.js链接成功')
            $('.header').load('./load.html .header_box');
            $('.list_nav').load('./load.html .nav_category',function(){

                console.log($('.nav all_category_title_box'))
                $('.nav all_category_title_box').css('display','none');
            });
            $('.footer').load('./load.html .footer_box');
            $('.siderbar').load('./load.html .sidebar-box');
            // 操作头部及当行
            require(['load'],function(){
                $.ajax({
                    url:'/api/vip.php',
                    type:'get',
                    data:{'qty':10},
                    async:true,
                    success:function(data){
                        var kinddata=$.parseJSON(data).data;
                        console.log(kinddata);
                        kinddata.forEach(function(item,index){
                            var $thisGoods=$('<a target="_blank"></a>');
                             $('.limitted_offer_cont').append($thisGoods);
                             console.log(item)
                             // 现在的价格
                             var currentPrice = item.goodsprice*item.goodsdiscount*0.1;
                             // 获取商品图片
                             var goodsImgs= item.goodsimgurl.split(';');
                             console.log(goodsImgs)
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
                                console.log(nowDate)
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
                                console.log(sele);

                            }
                            this.timer=setInterval(function(){
                                times(timerSele);
                            },1000);
                            

                        })
                        
                        // 绑定时间 当差值为零时停止计算，并将文字消失，图片更换； 
                    }
                })
            })
            
            /*$.ajax({
                url:'/api/vip.php',
                type:'get',
                data:{'qty':50,'cate':'限时特卖'},
                async:true,
                success:function(data){
                    var kinddata=$.parseJSON(data).data;
                    // console.log(kinddata);
                }
            })*/
           
        })
    })
});