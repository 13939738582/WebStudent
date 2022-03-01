window.addEventListener("load", fn);
function fn(){
    var that;
    class Tab {
        constructor(id) {
            // 获取元素
            that = this;
            this.main = document.querySelector(id);
            this.init();
        }
        // 获取元素
        updataNode(){
            this.lis = this.main.querySelectorAll('li');
            this.sections = this.main.querySelectorAll('section');
            this.add = this.main.querySelector('.tabadd');
            this.ul = this.main.querySelector('.fisrstnav ul:first-child');
            this.tabscon = this.main.querySelector('.tabscon');
            this.remove = this.main.querySelectorAll('.icon-guanbi');
            this.span = this.main.querySelectorAll('.fisrstnav li span:first-child');
        }
        // 初始化操作 当页面加载完成让相关元素绑定对应事件
        init() {
            this.updataNode();
            for (var i=0;i<this.lis.length;i++){
                this.lis[i].index = i;
                this.lis[i].onclick = this.toggleTab;
                this.remove[i].onclick = this.removeTab;
                this.span[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
            this.add.onclick = this.addTab;
        }
        // 1.切换功能
        toggleTab() {
            that.clearClass();
            this.className = 'liactive';
            that.sections[this.index].className = 'conactive';
        }
        clearClass() {
            for (var i=0;i<this.lis.length;i++){
                this.lis[i].className = '';
                this.sections[i].className = '';
            }
        }
        // 2.添加功能
        addTab() {
            that.clearClass();
            var li = '<li class="liactive"><span>选项卡'+(that.ul.children.length+1)+'</span><span class="iconfont icon-guanbi"></span></li>';
            that.ul.insertAdjacentHTML('beforeend',li);
            var section = '<section class="conactive">内容'+(that.tabscon.children.length+1)+'</section>';
            that.tabscon.insertAdjacentHTML('beforeend',section);
            that.init();
        }
        // 3.删除功能
        removeTab(e) {
            // 阻止事件冒泡 防止li的点击切换
            e.stopPropagation();
            var index = this.parentNode.index;
            // that.ul.removeChild(that.ul.children[index]);
            // that.tabscon.removeChild(that.tabscon.children[index]);
            that.lis[index].remove();
            that.sections[index].remove();
            that.init();
            // 当删除的不是选定状态的li，则选定状态不变
            if (!document.querySelector('.liactive')){
                // 当删除了选中状态了li，让它前面的li处于选定状态
                that.lis[index-1]&&that.lis[index-1].click();
                // 或者
                // if (index!=0){
                //     that.lis[index-1].click();
                // }
            }
        }
        // 4.修改功能
        editTab() {
            // 双击禁止选定文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            var str = this.innerHTML;
            this.innerHTML = '<input type="text">';
            var inp = this.children[0];
            inp.value = str;
            // 文本框的文字处于选定状态
            inp.select();
            // 当文本框失去焦点，把文本框的内容给span
            inp.onblur = function (){
                this.parentNode.innerHTML = this.value;
            };
            inp.onkeyup = function (e){
                if (e.keyCode==13){
                    this.blur();
                }
            }
        }
    }
    var tab = new Tab('#tab');
}