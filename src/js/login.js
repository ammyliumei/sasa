require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
            console.log('login.js链接成功')
            $('.header').load('./load.html .header_box');
            $('.list_nav').load('./load.html .nav_category',function(){

                console.log($('.nav all_category_title_box'))
                $('.nav all_category_title_box').css('display','none');
            });
            $('.footer').load('./load.html .footer_box');
            $('.siderbar').load('./load.html .sidebar-box');
            require(['common'],function(){
                // 聚焦时的样式
                $('.x-input').focus(function(){
                    $(this).addClass('focus').closest('.form-item').siblings('.form-item').find('.x-input').removeClass('focus');
                })
                // 验证码生成
                 $('.verify-code').html(vCode());
                 $('.login_btn').click(function(){
                    // 用户名
                    var username = $('.username').val();
                    console.log(username)
                    // 密码
                    var password  = $('.auto-password-check-handle').val();

                    // 验证码验证
                    var userVC = $('.verify-input').val();

                    // 请求验证
                    $.ajax({
                        url:'/api/login.php',
                        type:'get',
                        data:{'username':username,'password':password},
                        async:true,
                        success:function(data){
                           if(data && userVC==$('.verify-code').html()){
                            console.log(444);
                            Cookie.set('user',username,expires(),'/');
                            history.back();
                            location.href=Cookie.get('recordurl');
                           } 
                        }
                    })
                 })
               
                
            })
       })
    })
});






