$(function (){
    toggleTool();
    var flag = true;// 添加互斥锁
    // 1.先让导航模块(fixedtool)隐藏 当页面滚动到今日推荐模块(recommend),就让它显示出来
    $(window).scroll(function (){
        toggleTool();
        // 3.滚动页面对应的导航显示到对应的位置
        if (flag){
            $('.floor .w').each(function (i,e){
                if ($(document).scrollTop()>=$(e).offset().top){
                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass('current');
                }
            });
        }
    });
    function toggleTool(){
        if ($(document).scrollTop()>=$('.recommend').offset().top){
            $('.fixedtool').fadeIn();
        }else {
            $('.fixedtool').fadeOut();
        }
    }
    // 2.点击导航页面滚动到对应位置
    $('.fixedtool li').click(function (){
        // 思路:先确定点击的是第几个导航,记录下该位置的索引号,然后对应页面中的索引号,在让页面滚动到该位置即可
        flag = false;
        var index = $(this).index();
        var top = $('.floor .w').eq(index).offset().top;
        $('body,html').stop().animate({
            scrollTop:top
        },function (){
            flag = true;
        })
        $(this).addClass('current').siblings().removeClass('current');
    });
});