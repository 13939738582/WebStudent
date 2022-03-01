window.addEventListener("load", fn);
// 封装一个动画函数
function animate(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        var step = (target-obj.offsetLeft)/10;
        step = step >0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft==target){
            clearInterval(obj.timer);
            // if (callback){
            //     callback();
            // }
            callback && callback();//短路运算
        }else {
            obj.style.left = obj.offsetLeft+step+'px';
        }
    },20);
}
function fn() {
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // 鼠标经过focus左右箭头显示，离开隐藏
    var arrowL = focus.querySelector('.arrow-l');
    var arrowR = focus.querySelector('.arrow-r');
    focus.addEventListener('mouseenter',function (){
        arrowL.style.display='block';
        arrowR.style.display='block';
        // 鼠标经过停止定时器
        clearInterval(timer);
        timer=null;//清除定时器
    });
    focus.addEventListener('mouseleave',function (){
        arrowL.style.display='none';
        arrowR.style.display='none';
        // 鼠标离开 开启定时器
        timer = setInterval(function (){
            arrowR.click();
        },2000);
    });
    for (var i=0;i<ul.children.length;i++){
        var li = document.createElement('li');
        li.setAttribute('index',i);//给小圆圈添加索引
        ol.appendChild(li);
        //鼠标点击小圆圈，让小圆圈变色
        li.addEventListener("click", function (){
            // 排他思想
            for (var j =0;j<ol.children.length;j++){
                ol.children[j].className='';
            }
            this.className = 'current';
            num=this.getAttribute('idnex');//点击小圆圈与箭头同步
            // 鼠标点击第几个小圆圈，让图片滑动到第几个  需要给小圆圈添加索引然后利用索引乘以每个图片的大小的到图片移动的距离  在上面
            // ul进行移动  因为是向做进行移动,所以目标值为负
            animate(ul,-this.getAttribute('index')*focus.offsetWidth);
        });
    }
    // 默认选中第一个
    ol.children[0].className = 'current';

    // 点击右箭头让图片向右移动
    // 无缝移动
    // 首先在最后的图片后面在拷贝一个第一张的图片,然后当滑倒最后在点击的时候,让ul的left值为0
    var first = ul.children[0].cloneNode(true);//进行深度拷贝
    // 添加到ul的最后面
    ul.appendChild(first);
    // 这里图片移动需要有一个变量,用来记录是第几个图片,然后计算移动距离
    var num =0;//代表初始位置即第一个图片的位置
    // 添加节流阀
    var flag = true;
    arrowR.addEventListener('click',function (){
        if (flag){
            // 关闭节流阀
            flag=false;
            // 当移动到最后一个图片的时候
            if (num==ul.children.length-1){
                num=0;
                ul.style.left=0;
            }
            num++;
            animate(ul,-num*focus.offsetWidth,function (){
                // 打开节流阀
                flag=true;
            });
            // 让小圆圈和图片同步
            for (var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            if (num==ul.children.length-1){
                ol.children[0].className='current';
            }else {
                ol.children[num].className='current';
            }
        }
    });
    // 点击左箭头让图片向左移动
    arrowL.addEventListener('click',function (){
        if (flag){
            // 关闭节流阀
            flag=false;
            // 当移动到最后一个图片的时候
            if (num==0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focus.offsetWidth + 'px';
            }
            num--;
            animate(ul,-num*focus.offsetWidth,function (){
                // 打开节流阀
                flag=true;
            });
            // 让小圆圈和图片同步
            for (var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            if (num==ul.children.length-1){
                ol.children[0].className='current';
            }else {
                ol.children[num].className='current';
            }
        }
    });
    // 自动播放
    // 鼠标经过停止  鼠标离开接着播放
    var timer = setInterval(function (){
        arrowR.click();
    },2000);
}
