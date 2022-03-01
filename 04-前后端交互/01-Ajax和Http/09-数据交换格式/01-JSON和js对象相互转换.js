var jsonObj = '{"a":"hello","b":"world"}';
// 使用JSON.parse方法把JSON转换为js对象
var obj = JSON.parse(jsonObj);
console.log(jsonObj);
console.log(obj);
// 将对象转换为json
console.log(JSON.stringify(obj));