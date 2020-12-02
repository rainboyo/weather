document.addEventListener("DOMContentLoaded",function(){

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

    /*区间化样式 mouseover mouseout绑定 */

    var make_interval = document.querySelector('.make_interval')
    make_interval.addEventListener('mouseover', function(){

        var table = document.querySelector('.data-table')
        if(table.getAttribute("data-ok") == "ok"){

            make_interval.style.backgroundColor = "#d7d7d7";
            make_interval.style.color = "#4977fc";
            make_interval.style.cursor = "pointer";
        }

    })
    make_interval.addEventListener('mouseout', function(){

        var table = document.querySelector('.data-table')
        if(table.getAttribute("data-ok") == "ok"){

            make_interval.style.backgroundColor = "#eee";
            make_interval.style.color = "#4977fc";
            make_interval.style.cursor = "";
        }

    })
    /**
     * 区间化 集成 事件绑定 -- 创建新表
     */

    var checked = document.querySelector("#checked")
    make_interval.addEventListener("click",function () {

        if(this.children[1].innerText == "区间化")
            this.children[1].innerText = "集层"
        if(checked.innerText == "原始数据")
            checked.innerText = "日区间"
        else if(checked.innerText == "日区间")
            checked.innerText = "月区间"
        else checked.innerText = "年区间"
    })



})