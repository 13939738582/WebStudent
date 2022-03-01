$(function (){
    load();
    // 1.按下回车 把完整的数据 存储到本地存储中
    $('#title').on('keydown',function (e){
        if ($(this).val()!=''){
            if (e.keyCode==13){
                // 先读取本地存储原来的数据
                var local = getDate();
                // 把local数据进行更新
                local.push({
                    title:$(this).val(),
                    done:false
                });
                // 把该数组存储到本地存储中
                saveDate(local);
                // 把本地存储的数据渲染到页面中
                load();
                $(this).val('');
            }
        }else {
            alert('输入的内容不能为空');
        }
    });
    // 2.todolist删除操作
    $('ol,ul').on('click','a',function (){
       // 获取本地存储
       var data = getDate();
       // 修改数据
        var idnex = $(this).attr('data-id');
        data.splice(idnex,1);
        // 把修改完成的数据从新保存到本地存储
        saveDate(data);
        // 重新渲染
        load();
    });
    // 3.正在进行 已经完成功能
    $('ol,ul').on('click','input',function (){
        // 获取本地存储
        var data = getDate();
        // 修改数据
        var idnex = $(this).siblings('a').attr('data-id');
        data[idnex].done = $(this).prop('checked');
        // 把修改完成的数据从新保存到本地存储
        saveDate(data);
        // 重新渲染
        load();
    });

    // 读取本地存储原来的数据
    function getDate(){
        var data = localStorage.getItem('todolist');
        if (data != null){
            // 如果本地存储的数据不为空，就返回 但是返回前需要先把本地存储的字符串格式的数据转换为对象格式
            return JSON.parse(data);
        }else {
            return [];
        }
    }
    // 更新本地存储
    function saveDate(arr){
        localStorage.setItem('todolist',JSON.stringify(arr));
    }
    // 渲染加载数据
    function load(){
        // 先清空ol里面原来的li
        $('ol,ul').empty();
        var data = getDate();
        // 从新加载
        // 统计完成和为完成的个数
        var todoCount = 0;
        var doneCount = 0;
        $.each(data,function (i,e){
            if (e.done){
                doneCount++;
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>'+e.title+'</p><a href="javascript:;" data-id="'+i+'"></a></li>');
            }else {
                todoCount++;
                $('ol').prepend('<li><input type="checkbox"><p>'+e.title+'</p><a href="javascript:;" data-id="'+i+'"></a></li>');
            }
        });
        $('#todocount').text(todoCount);
        $('#donecount').text(doneCount);
    }
});