function template(id, data) {
    var str = document.getElementById(id).innerHTML;
    var reg = /{{\s*([a-zA-Z]+)\s*}}/;

    var regResult = null;
    while (regResult = reg.exec(str)) {
        str = str.replace(regResult[0], data[regResult[1]]);
    }
    return str;
}