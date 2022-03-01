window.addEventListener("load", fn);
function fn(){
    var reg_form = document.querySelector('.reg_form');
    var inps = reg_form.querySelectorAll('input');
    var spans = reg_form.querySelectorAll('span');
    // 手机号正则
    tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    inps[0].onblur = function (){
        if (tel.test(this.value)){
            spans[0].innerHTML = `<i class="success_ico"></i>手机号码输入正确`;
            spans[0].className = 'success';
        }else {
            spans[0].innerHTML = `<i class="error_icon"></i>手机号码输入不正确，请从新输入`;
            spans[0].className = 'error';
        }
    };
    // 昵称正则
    username = /^[\u4e00-\u9fa5]{2,8}$/;
    inps[1].onblur = function (){
        if (username.test(this.value)){
            spans[1].innerHTML = `<i class="success_ico"></i>昵称输入正确`;
            spans[1].className = 'success';
        }else {
            spans[1].innerHTML = `<i class="error_icon"></i>昵称输入不正确，请从新输入`;
            spans[1].className = 'error';
        }
    };
    // 短信验证
    msg = /^\d{6}$/;
    inps[2].onblur = function (){
        if (msg.test(this.value)){
            spans[2].innerHTML = `<i class="success_ico"></i>验证码输入正确`;
            spans[2].className = 'success';
        }else {
            spans[2].innerHTML = `<i class="error_icon"></i>验证码输入不正确，请从新输入`;
            spans[2].className = 'error';
        }
    };
    // 密码验证正则
    password = /^[A-Za-z0-9_-]{6,16}$/;
    inps[3].onblur = function (){
        if (password.test(this.value)){
            spans[3].innerHTML = `<i class="success_ico"></i>密码输入正确`;
            spans[3].className = 'success';
        }else {
            spans[3].innerHTML = `<i class="error_icon"></i>密码输入不正确，请从新输入`;
            spans[3].className = 'error';
        }
    };
    // 确认密码
    inps[4].onblur = function (){
        if (inps[3].value == this.value){
            spans[4].innerHTML = `<i class="success_ico"></i>确认密码输入正确`;
            spans[4].className = 'success';
        }else {
            spans[4].innerHTML = `<i class="error_icon"></i>两次密码不一致，请从新输入`;
            spans[4].className = 'error';
        }
    };
}