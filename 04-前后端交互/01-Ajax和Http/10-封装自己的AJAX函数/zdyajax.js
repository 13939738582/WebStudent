// 封装查询字符串函数
function resolveData(data) {
    var arr = [];
    for (var key in data) {
        arr.push(key + '=' + data[key]);
    }
    return arr.join('&');
}
// 测试 resolveData(data) 函数
// var obj = {
//     name: '张三',
//     age: 18,
//     sex: '男'
// }
// var str = resolveData(obj);
// console.log(str);

function itheima(options) {
    var xhr = new XMLHttpRequest();

    // 把传递过来的参数对象转换为查询字符串
    var str = resolveData(options.data);

    // 判断请求类型
    if (options.method.toUpperCase() === 'GET') {
        // 发起get请求
        xhr.open(options.method, options.url + '?' + str);
        xhr.send();
    } else if (options.method.toUpperCase() === 'POST') {
        // 发起post请求
        xhr.open(options.method, options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(str);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }
}