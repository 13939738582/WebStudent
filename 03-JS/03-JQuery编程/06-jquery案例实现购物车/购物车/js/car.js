$(function (){
    // 5.总计模块
    getsum();
    // 1.全选 全不选模块
    // 思路就是把全选按钮(checkall)(有上下两个)的状态赋值给下面三个小按钮(j-checkbox) 并且上下的全选按钮同步
    $('.checkall').change(function (){
        $('.j-checkbox,.checkall').prop('checked',$(this).prop('checked'));
        // 7.选定商品添加背景
        if ($(this).prop('checked')){
            $('.cart-item').addClass('check-cart-item');
        }else {
            $('.cart-item').removeClass('check-cart-item');
        }
    });
    // 2.如果所有的小复选框都被选中，则全选按钮也要选中，否者全选按钮不选
    $('.j-checkbox').change(function (){
        if ($('.j-checkbox:checked').length==$('.j-checkbox').length){
            $('.checkall').prop('checked',true);
        }else {
            $('.checkall').prop('checked',false);
        }
        // 7.选定商品添加背景
        if ($(this).prop('checked')){
            $(this).parents('.cart-item').addClass('check-cart-item');
        }else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    });
    // 3.增减商品数量
    // 思路：首先声明一个变量 当点击+号(increment)时，让(itxt)数量加一，点击-号(decrement)时，让(itxt)数量减一
    // 加
    $('.increment').click(function (){
        var num = $(this).siblings('.itxt').val();
        num++;
        $(this).siblings('.itxt').val(num);
        // 4.计算商品小计 思路：先拿到单价(p-price) 然后用个数乘以单价在赋值给(p-sum)
        var str = $(this).parents('.p-num').siblings(".p-price").text();
        str = str.substr(1);
        $(this).parents('.p-num').siblings(".p-sum").text('￥'+(str*num).toFixed(2));
        // 5.总计模块
        getsum();
    });
    // 减
    $('.decrement').click(function (){
        var num = $(this).siblings('.itxt').val();
        // 商品数量为一就不能在减
        if (num==1){
           return false;
        }
        num--;
        $(this).siblings('.itxt').val(num);
        // 4.计算商品小计 思路：先拿到单价(p-price) 然后用个数乘以单价在赋值给(p-sum)
        var str = $(this).parents('.p-num').siblings(".p-price").text();
        str = str.substr(1);
        $(this).parents('.p-num').siblings(".p-sum").text('￥'+(str*num).toFixed(2));
        // 5.总计模块
        getsum();
    });
    // 表单内容的变化
    $('.itxt').change(function (){
        var num = $(this).val();
        if (num<=1){
            num = 1;
            $(this).val(num);
        }
        var str = $(this).parents('.p-num').siblings(".p-price").text();
        str = str.substr(1);
        $(this).parents('.p-num').siblings(".p-sum").text('￥'+(str*num).toFixed(2));
        // 5.总计模块
        getsum();
    });
    // 5.总计模块
    function getsum(){
        var sum = 0;
        var money = 0;
        $('.itxt').each(function (i,e){
            sum+=parseInt($(e).val());
        });
        $('.amount-sum em').text(sum);
        $('.p-sum').each(function (i,e){
            money+=parseFloat($(e).text().substr(1));
        });
        $('.price-sum em').text('￥'+money.toFixed(2));
    }
    // 6.删除商品模块
    // 点击删除按钮(p-action 里面的a)删除当前商品
    $('.p-action a').click(function (){
        $(this).parents('.cart-item').remove();
        getsum();
    });
    // 点击删除选定的商品按钮(remove-batch)删除所有选定的商品
    $('.remove-batch').click(function (){
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getsum();
    });
    // 点击清理购物车删除所有的商品
    $('.clear-all').click(function (){
        $('.cart-item').remove();
        getsum();
    });
});