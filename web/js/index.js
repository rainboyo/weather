document.addEventListener("DOMContentLoaded",function(){
    /* 左边菜单选项改变选中状态*/
    var menu = document.querySelector(".menu ul");
    var menulist = menu.children;
    for(var i = 0; i < menulist.length; ++i)
    {
        //设置菜单项mouseover事件
        menulist[i].addEventListener("mouseover",function(){
            for(var j = 0; j < menulist.length; ++j)
            {

                if(menulist[j].className.indexOf("menu_checked") != -1)//如果是被选中的菜单项，不要改变样式
                    continue;
                menulist[j].className = ""
            }
            if(this.className.indexOf("menu_checked") == -1)  // 如果不是被选中的菜单项，变为mouseover样式
            this.className = "mouseover"
        })
        //设置菜单项mouseout事件
        menulist[i].addEventListener("mouseout",function(){
            if(this.className.indexOf("menu_checked") == -1) // 如果不是选中的菜单项，变为最原始样式
                this.className = ""
        })
        //设置菜单项click事件,鼠标点击后变为menu_checked样式
        menulist[i].addEventListener("click",function(){
            for(var k = 0; k < menulist.length; ++k)
            {
                menulist[k].className = ""
            }
            this.className = "menu_checked"
        })
    }

    /**
     * 左边菜单项点击后的内容切换
     */
    var menu_initial = document.getElementById("initial")
    var menu_interval = document.getElementById("interval")
    var menu_middle = document.getElementById("middle")

    var select_interval = document.querySelector(".select_interval")
    var select_middle = document.querySelector(".select_middle")
    menu_initial.addEventListener("click",function(){

        select_interval.style.display = "none"
        select_middle.style.display = "none"


    })
    menu_interval.addEventListener("click", function () {
        select_interval.style.display = "block"
        select_middle.style.display = "none"
    })
    menu_middle.addEventListener("click", function () {
        select_middle.style.display = "block"
        select_interval.style.display = "none"
    })

    /**
     * 区间和中值类型数据事件绑定
     */
    var select_interval = document.querySelector(".select_interval")
    var intervals = select_interval.children
    var select_middle = document.querySelector(".select_middle")
    var middles = select_middle.children

    for(var i = 0; i < intervals.length; ++i)
    {
        intervals[i].addEventListener("click", function(){
            for(var j = 0; j < intervals.length; ++j)
            {
                intervals[j].id = ""
                middles[j].id = ""
            }
            this.id = "checked"
        })
    }

    for(var i = 0; i < middles.length; ++i)
    {
        middles[i].addEventListener("click", function(){
            for(var j = 0; j < intervals.length; ++j)
            {
                intervals[j].id = ""
                middles[j].id = ""
            }
            this.id = "checked"
        })
    }


    /**
     * 时间选择框事件绑定
     */
    var select_common = document.querySelectorAll('.select_common')
    for(var i = 0; i < select_common.length; ++i)
    {

        select_common[i].addEventListener("mouseover",function(){
            this.children[1].style.display = "block"
        })

        select_common[i].addEventListener("mouseout", function(){
            this.children[1].style.display = "none"
        })

        var lis = select_common[i].querySelectorAll("li")
        for(var j = 0; j < lis.length; ++j)
        {
            lis[j].addEventListener("click",function () {
                this.parentNode.previousElementSibling.innerText = this.innerText
            })
        }
    }









})