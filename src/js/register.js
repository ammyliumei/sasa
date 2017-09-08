/* 
* @Author: Marte
* @Date:   2017-09-06 23:19:11
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-08 22:31:42
*/

require(['config'],function(){
    require(['jquery'],function($){ 
        $(function($){
             console.log('register.js链接成功')
            $('.header').load('./load.html .header_box');
            $('.list_nav').load('./load.html .nav_category',function(){

                console.log($('.nav all_category_title_box'))
                $('.nav all_category_title_box').css('display','none');
            });
            $('.footer').load('./load.html .footer_box');
            $('.siderbar').load('./load.html .sidebar-box');
            require(['common'],function(){

                $('.x-input').focus(function(){
                    $(this).addClass('focus').closest('.form-item').siblings('.form-item').find('.x-input').removeClass('focus');
                })
                // 获取随机验证码
                $('.sj_code').html(vCode())
                $('.verify-code').on('click',function(){
                    $('.sj_code').html(vCode())
                })
                // 用户名验证
                var reg1 = /^[\w\-\.]+@[\da-z\-]+(\.[a-z]{2,}){1,2}$/i;
                var reg2 = /^1[34578]\d{9}$/;
                /*
                    密码  
                        长度大于6位小于16位 
                        不能包含空格
                 */
                var reg3 = /^\S{6,15}$/;
                
                $('#userid').blur(function(){
                    userid();
                });
                $('#login_password').blur(function(){
                    password();
                });
                $('#psw_confirm').blur(function(){
                    psw_confirm();
                });
                $('#verify').blur(function(){
                     verify();
                });
                // 绑定事件
                $('.register_btn' ).click('.register_btn',function(){
                    var userid_res= userid();
                    var password_res = password();
                    var psw_confirm_res=psw_confirm();
                    var verify_res=verify();
                    console.log(userid_res , password_res , psw_confirm_res, verify_res )
                     var username =$('#userid').val();
                   // 如果满足所有条件进行跳转并且存入数据库
                    if(userid_res && password_res && psw_confirm_res && verify_res){
                        var date = new Date();
                        date.setDate(date.getDate()+7);
                        var username =$('#userid').val();
                        console.log(username);
                        Cookie.set('user',username,date,'/');
                        window.location.href='/index.html';
                        var ture_password = $('#login_password').val();
                        $.ajax({
                            url:'/api/reg.php',
                            type:'get',
                            data:{'username':username,'password':ture_password},
                            async:true,
                            success:function(data){
                               console.log(data);
                            }
                        })
                    }
                    
                })
                function userid(){
                    var username = $('#userid').val();
                    $.ajax({
                            url:'/api/reg.php',
                            type:'get',
                            data:{'username':username},
                            async:true,
                            success:function(data){
                                if(data){
                                    console.log('用户名不合法');
                                    $('#userid').closest('.form-act').find('.exchange').css('display','block');
                                }else{
                                     $('#userid').closest('.form-act').find('.exchange').css('display','none')
                                }
                                
                            }
                    })
                    if(!reg2.test(username)){
                       console.log('用户名不合法');
                       $('#userid').closest('.form-act').find('.caution').css('display','block');
                       return false;
                   }else if(!reg2.test(username)){
                        $('#userid').closest('.form-act').find('.caution').css('display','block')
                        return false;
                   }else{
                        $('#userid').closest('.form-act').find('.caution').css('display','none')
                        return true;
                    }

                                
                }
                function password(){
                    var password = $('#login_password').val();
                    if(!reg3.test(password)){
                        console.log('密码不合法');
                       $('#login_password').closest('.form-act').find('.caution').css('display','block')
                        return false;
                    }else{
                        $('#login_password').closest('.form-act').find('.caution').css('display','none')
                        return true;
                    }
                }
                function psw_confirm(){
                    var confirm_pwd = $('#psw_confirm').val();
                    var password = $('#login_password').val();

                    // console.log($('#psw_confirm'),confirm_pwd,password)
                    if(confirm_pwd != password){
                        // console.log('两次输入密码不相等');
                        $('#psw_confirm').closest('.form-act').find('.caution').css('display','block')
                        return false;
                    }else{
                        $('#psw_confirm').closest('.form-act').find('.caution').css('display','none')
                        return true;
                    }
                }
                function verify(){
                    if($('.verify-input').val()!= $('.sj_code').html()){
                            $('#userid').closest('.form-act').find('.caution').css('display','block');
                            return false;
                    } else{
                         $('#userid').closest('.form-act').find('.caution').css('display','none')
                            return true;
                    }
                }
            })
       })
    })
});
