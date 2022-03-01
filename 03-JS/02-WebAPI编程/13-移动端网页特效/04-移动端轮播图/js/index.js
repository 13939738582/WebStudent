window.addEventListener("load", fn);
function fn() {
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    var w = focus.offsetWidth;
    // // 根据图片的个数添加小圆圈
    for (var i=0;i<ul.children.length;i++){
        var li = document.createElement('li');
        ol.appendChild(li);
    }
    ol.children[0].classList.add('current');
    // 复制第一个图片添加到末尾 在复制最后一个图片添加到首位
    var first = ul.children[0].cloneNode(true);
    var end = ul.children[ul.children.length-1].cloneNode(true);
    ul.appendChild(first);
    ul.insertBefore(end,ul.children[0]);
    // 利用定时器轮播图片
    var index = 0;
    var flag = false;//用来判断用户是否移动
    var timer = setInterval(function (){
        index++;
        var translateX = -index*w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX('+translateX+'px)';
    },2000);
    // 等待过度完成之后在判断
    ul.addEventListener("transitionend", function (){
        // 正向走
        if (index>=3){
            index=0;
            ul.style.transition = 'none';
            var translateX = -index*w;
            ul.style.transform = 'translateX('+translateX+'px)';
        }  else if (index<0){//反向走
            index=2;
            ul.style.transition = 'none';
            var translateX = -index*w;
            ul.style.transform = 'translateX('+translateX+'px)';
        }
        // 小圆圈跟随变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });
    // 手指滑动轮播图
    var startX = 0;
    // 触摸时获取手指的初始坐标
    ul.addEventListener("touchstart", function (e){
        startX = e.targetTouches[0].pageX;
        // 手指触摸时停止定时器
        clearInterval(timer);
    });
    // 移动手指计算手指的滑动距离
    var moveX = 0;
    ul.addEventListener("touchmove", function (e){
        // 计算移动距离
        moveX = e.targetTouches[0].pageX-startX;
        var translateX = -index*w+moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX('+translateX+'px)';
        flag = true;
        e.preventDefault();//取消默认行为  屏幕滚动效果
    });
    // 手指离开
    ul.addEventListener("touchend", function (){
        if (flag){
            // 如果移动距离大于50就播放上一张或下一张
            if (Math.abs(moveX)>50){
                if (moveX>0){
                    index--;
                }else {
                    index++;
                }
                var translateX = -index*w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX('+translateX+'px)';
            }else {
                var translateX = -index*w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX('+translateX+'px)';
            }
            flag = false;
        }
        // 手指离开开启定时器
        clearInterval(timer);
        timer = setInterval(function (){
            index++;
            var translateX = -index*w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX('+translateX+'px)';
        },2000);
    });
    // 返回顶部
    var goBack = document.querySelector('.goBack');
    var nav = document.querySelector('nav');
    window.addEventListener('scroll',function (){
        if (window.pageYOffset>=nav.offsetTop){
            goBack.style.display = 'block';
        }else {
            goBack.style.display = 'none';
        }
    });
    goBack.addEventListener('click',function (){
        window.scroll(0,0);
    })
}