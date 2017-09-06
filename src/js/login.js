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
            require(['load'],function(){
            })

       })
    })
});






//推荐注册时只能用手机号码注册 add by zlj 2015-5-6 16:56:25
    if(Cookie.read('refer_member_signup')){
        $$('.J_uname').set('placeholder','请填写手机号');
    }
Module = new Module('page', ['signup']);
var modname = 'page.signup';

var Query = {
    send: function(url, element, data, fn){
        new Request({
            url: url,
            link: 'cancel',
            onSuccess: function(rs) {
                var tips = element.retrieve('tips_instance', new formTips({
                    target: element,
                    where: 'after',
                    single: true,
                    store: true,
                    autohide: false,
                    destroy: true
                })).hide();
                if(rs) {
                    try{
                        rs = JSON.decode(rs);
                    } catch (e) {}
                    if(rs.error) {
                        if(typeof rs.error === 'string') tips.show(rs.error, {type: 'error'});
                    }
                    else {
                        if(typeof rs.success === 'string') tips.show(rs.success, {type: 'success',autohide:3});
                    }
                    fn&&fn.call(this, rs);
                }
            }
        }).post(data);
    }
};

function redirect(url) {
    if(url)
        top.location.href = url;
}

function sendVerify(el, data) {
    var url = el.href;
    var textCont = el.getElement('span span');
    el.addClass('disabled');
    textCont.innerHTML = el.get('text') + '(<i>0</i>)';
    var cd = new countdown(textCont.getElement('i'), {
        start: 120,
        secondOnly: true,
        callback: function(e) {
            el.removeClass('disabled');
            textCont.innerHTML = '重发验证码';
            jQuery('body').find('form .verify-input').val('');            
            jQuery('body').find('form .auto-change-verify-handle').eq(0).trigger('click');            
        }
    });
    Query.send(url, el, data, function(rs) {
        if(rs.error) {
            cd.stop();
            el.removeClass('disabled');
            textCont.innerHTML = '重发验证码';
            var err1 = '请填写图片验证码';
            var err2 = '图片验证码填写错误';
            if(rs.error == err1 || rs.error == err2){
                Module.element(modname, '.action-verifycode').style.display = '';                
            }
            if(rs.error!=err1){
                jQuery('body').find('form .verify-input').val('');            
                jQuery('body').find('form .auto-change-verify-handle').eq(0).trigger('click');
            }
            
            
        }
    });
}

Module.get(modname).getElement('button[type=submit]').store('_ajax_config', {
    progress:function(rs){
        if(rs.error) {
            			if(Module.element(modname, 'img.auto-change-verify-handle'))
            changeCode(Module.element(modname, 'img.auto-change-verify-handle'));
                        return top.Message.error(rs.error,function(){
                redirect(rs.redirect);
            });
        }
        if(rs.success) {
        	//这里发omniture统计 @@david
        	if(typeof(scRegStep2) == 'function'){
                scRegStep2();
            }
            if(typeof(scRegTest) == 'function'){
                scRegTest();
            }
            // console.log('success to register!');
            reglog(rs);
        	
            return top.Message.success(rs.success + '<br><b>系统即将跳转到注册前页面</b>', function () {
                //pinyou Nancy 20170309
                py('event','register' ,rs.data.member_id).track('pr.tU.sq0yROPoU8Mu8C_QVGddjX');
                setTimeout(redirect(rs.redirect), 2000);
            });
        }
        redirect(rs.redirect);
    }
});

Module.get(modname).addEvents({
    'change:relay(.action-account-check)': function(e) {
        var self = this;
        var value = this.value;
        Query.send('/passport-signup_ajax_check_name.html', this, this.name + '=' + this.value, function(rs){
            if(rs.error) return;
            if(validatorMap.mobile[1](self, value)) {
                if(rs.needVerify == 'true') {
                    Module.element(modname, '.mobile-need-verify').style.display = '';
                    Module.element(modname, '.email-need-verify').style.display = 'none';
                    //Module.element(modname, '.action-verifycode').style.display = 'none';
                    // sendVerify(Module.element(modname, '.action-get-verifycode'));
                }
                return;
            }
            if(validatorMap.email[1](self, value)) {
                if(rs.needVerify == 'true') {
                    Module.element(modname, '.email-need-verify').style.display = '';
                	Module.element(modname, '.mobile-need-verify').style.display = 'none';
                }
                return;
            }
            
            Module.element(modname, '.action-need-verify').style.display = 'none';
            //Module.element(modname, '.action-verifycode').style.display = 'none';
        });
    },
    'click:relay(.action-get-verifycode)': function(e) {
        e.preventDefault();
        var el = Module.element(modname, '.action-account-check');
        var verify = Module.element(modname, '.img_input');
        if(this.hasClass('disabled')) return false;
        var data = 'uname=' + el.value + '&type=signup';
        console.log(verify.value);
        if(verify && verify.value){
             data = data+'&sms_vcode='+verify.value;
        }
        sendVerify(this, data);
    }
});

function reglog(input){
	!(function($){
		var _d = input;
 		$.ajax({
	        type: "POST",
	        dataType:"json",
	        url:'/member-ajax_reglog.html',
	        data:_d,
	        success: function(msg){
	       	}
        }); 
	})(window.jQuery);
}