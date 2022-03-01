$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    // 为发送按钮绑定事件
    $('#btnSend').on('click',function (){
       var text = $('#ipt').val().trim();
       if (text.length<=0){
           return $('#ipt').val('');
       }else {
           // 如果用户输入了聊天内容，则添加到页面
           $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>'+text+'</span></li>');
           $('#ipt').val('');
           // 添加完成后重置滚动条
           resetui();
       }
       getMsg(text);
    });
    // 为文本框绑定按下回车发送事件
    $('#ipt').on('keyup',function (e){
        if (e.keyCode === 13){
            $('#btnSend').click();
        }
    });
    // 发起请求获取聊天信息
    function getMsg(text){
        $.ajax({
           method:'get',
           url:'http://www.liulongbin.top:3006/api/robot',
            data:{
               spoken:text
            },
            success:function (res){
                if (res.message == 'success'){
                    // 接收聊条消息
                    var msg = res.data.info.text;
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /><span>'+msg+'</span></li>');
                    resetui();
                    getVoice(msg);
                }
            }
        });
    }
    // 将聊天内容转换为语音
    function getVoice(text){
        $.ajax({
            method:'get',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function (res){
                if (res.status == 200){
                    $('#voice').attr('src',res.voiceUrl);
                }
            }
        })
    }
})