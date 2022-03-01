$(function() {
    // 定义过滤器
    template.defaults.imports.fn = function(date) {
            var dt = new Date(date)
            var year = dt.getFullYear();
            var mon = dt.getMonth() + 1;
            mon = mon < 10 ? '0' + mon : mon;
            var dates = dt.getDate();
            dates = dates < 10 ? '0' + date : dates;
            var hours = dt.getHours();
            hours = hours < 10 ? '0' + hours : hours;
            var minutes = dt.getMinutes();
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var seconds = dt.getSeconds();
            seconds = seconds < 10 ? '0' + seconds : seconds;
            return year + '年' + mon + '月' + dates + '日' + hours + '时' + minutes + '分' + seconds + '秒';
        }
        // 获取新闻列表
    function getNewsList() {
        $.ajax({
            method: 'get',
            url: 'http://www.liulongbin.top:3006/api/news',
            success: function(res) {
                if (res.status != 200) {
                    return alert('获取新闻数据失败');
                } else {
                    // 字符串分割成为数据
                    for (let i = 0; i < res.data.length; i++) {
                        res.data[i].tags = res.data[i].tags.split(',');
                    }
                    var str = template('news', res);
                    $('#news-list').html(str);
                }
            }
        });
    }
    getNewsList();
});