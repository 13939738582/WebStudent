window.addEventListener("load", fn);
function fn(){
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1.当鼠标经过preview_img就显示遮罩层和大盒子
    preview_img.addEventListener('mouseover',function (){
       mask.style.display = 'block';
       big.style.display = 'block';
    });
    preview_img.addEventListener('mouseout',function (){
        mask.style.display = 'none';
        big.style.display = 'none';
    });
    // 2.遮罩层跟随鼠标移动
    preview_img.addEventListener('mousemove',function (e){
        // 计算鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // 让黄色的盒子跟着鼠标走，然后鼠标在盒子的中间
        // 限制mask的移动距离
        var maskX = x-mask.offsetWidth/2;
        var maskY = y-mask.offsetHeight/2;
        if (maskX<=0){
            maskX=0;
        }else if (maskX>=preview_img.offsetWidth-mask.offsetWidth) {
            maskX=preview_img.offsetWidth-mask.offsetWidth;
        }
        if(maskY<=0){
            maskY=0;
        }else if (maskY>=preview_img.offsetHeight-mask.offsetHeight){
            maskY=preview_img.offsetHeight-mask.offsetHeight;
        }
        mask.style.left = maskX+'px';
        mask.style.top = maskY+'px';

        // big跟随mask进行移动
        var maskMax = preview_img.offsetWidth-mask.offsetWidth;//遮罩层最大移动距离
        // 获取大图
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;//大图的最大移动距离
        // 大图的移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        // 大图和遮罩层的移动是相反的所以需要取反
        bigImg.style.left = -bigX +'px';
        bigImg.style.top = -bigY +'px';
    })
}