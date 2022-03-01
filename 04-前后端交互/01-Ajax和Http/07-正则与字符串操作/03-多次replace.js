var str = '<div>{{name}}今年{{  age  }}岁了</div>';
var reg = /{{\s*([a-zA-Z]+)\s*}}/;
var data = {
        name: '张三',
        age: 18
    }
    // 多次使用replace函数进行替换
    // 第一次匹配
    // var regResult = reg.exec(str);
    // str = str.replace(regResult[0], regResult[1]);
    // console.log(str);
    // // 第二次匹配
    // var regResult = reg.exec(str);
    // str = str.replace(regResult[0], regResult[1]);
    // console.log(str);
    // // 第三次匹配为null代表匹配结束
    // console.log(reg.exec(str));

// 利用循环完成上诉操作
var regResult = null;
while (regResult = reg.exec(str)) {
    // 替换为真值
    str = str.replace(regResult[0], data[regResult[1]]);
}
console.log(str);