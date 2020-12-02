//获取时间参数
function getParams()
{
    var pagenum = document.querySelector("#pagenum").value
    var cityName = document.querySelector(".userinfo").innerText
    var yearFrom = document.querySelector(".select_from .select_year").children[0].innerText
    var monthFrom = document.querySelector(".select_from .select_month").children[0].innerText
    var dayFrom = document.querySelector(".select_from .select_day").children[0].innerText
    var yearTo = document.querySelector(".select_to .select_year").children[0].innerText
    var monthTo = document.querySelector(".select_to .select_month").children[0].innerText
    var dayTo = document.querySelector(".select_to .select_day").children[0].innerText
    var dataType = document.querySelector(".menu_checked").id
    var checked = "";
    if(document.querySelector("#checked"))
        checked = document.querySelector("#checked").innerText
    params = {"yearFrom":yearFrom,monthFrom:monthFrom,dayFrom:dayFrom,yearTo:yearTo,monthTo:monthTo,dayTo:dayTo,
                pagenum:pagenum,cityName:cityName,dataType:dataType,checked:checked}

    return params;
}





/**
 * 表数据更新，搜索按钮点击后触发
 */
window.onload = function(){


    //显示数据的表，不包括表头（表的第一行），从第二行数据行开始
    var trs = document.querySelectorAll(".data-table tr:nth-child(n+2)")

    var search = document.querySelector(".search")
    var pagenum = document.querySelector("#pagenum")
    //点击搜索按钮，发送请求，更新数据
    search.addEventListener("click",function () {

        var params = getParams()
        ajax({
            type:"post",
            url:"/initialData",
            data:{yearFrom:params["yearFrom"],monthFrom:params["monthFrom"],dayFrom:params["dayFrom"],
                  yearTo:params["yearTo"],monthTo:params["monthTo"],dayTo:params["dayTo"],pagenum:"1",cityName:params["cityName"],
                  dataType:params["dataType"],checked:params["checked"] },
            success:function (resp,xhr) {
                var dataList = resp["dataList"]
                if(dataList.length < trs.length)
                {
                    for(var i = 0; i < trs.length; ++i)
                    {
                        trs[i].children[0].innerHTML = ""
                        trs[i].children[1].innerHTML = ""
                        trs[i].children[2].innerHTML = ""
                        trs[i].children[3].innerHTML = ""
                        trs[i].children[4].innerHTML = ""
                        trs[i].children[5].innerHTML = ""
                    }
                }
                for(var i = 0; i < dataList.length; ++i)
                {
                    trs[i].children[0].innerHTML = dataList[i]["date"]
                    trs[i].children[1].innerHTML = dataList[i]["t"]
                    trs[i].children[2].innerHTML = dataList[i]["po"]
                    trs[i].children[3].innerHTML = dataList[i]["u"]
                    trs[i].children[4].innerHTML = dataList[i]["vv"]
                    trs[i].children[5].innerHTML = dataList[i]["td"]
                }
                pagenum.value = "1"
                var pageCount = document.querySelector(".pageCount")
                pageCount.innerText = resp["pageCount"]

                var table = document.querySelector(".data-table")
                var make_interval = document.querySelector(".make_interval")
                table.setAttribute("data-ok","ok")
                make_interval.style.backgroundColor = "#eee"
                make_interval.style.opacity = "1"
                make_interval.style.color = "#4977fc"


            },
            error:function (resp,xhr) {
                alert("出错了")
            }


        })
    })

    /**
     * 页码不能为空
     */
    var initialPageNum;
    pagenum.addEventListener("keydown",function(){
        initialPageNum = pagenum.value
    })

    pagenum.addEventListener("blur",function () {
        if(pagenum.value == "")
        {
            alert("页码不能为空")
            pagenum.value = initialPageNum
        }

    })


    /**
     * prev,next,goto 事件绑定
     */
    var prev = document.querySelector(".prev")
    var next = document.querySelector(".next")
    var goto = document.querySelector(".goto")
    var pageCount = document.querySelector(".pageCount")
    prev.addEventListener("click",function () {

        var p = parseInt(pagenum.value)
        if(p < 2)
        {
            alert("已经是最前页了")
        }
        else {
            pagenum.value = String(p - 1)
            var params = getParams()
            ajax({
                type:"post",
                url:"/initialData",
                data:params,
                success:function (resp,xhr) {
                    var dataList = resp["dataList"]
                    if(dataList.length < trs.length)
                    {
                        for(var i = 0; i < trs.length; ++i)
                        {
                            trs[i].children[0].innerHTML = ""
                            trs[i].children[1].innerHTML = ""
                            trs[i].children[2].innerHTML = ""
                            trs[i].children[3].innerHTML = ""
                            trs[i].children[4].innerHTML = ""
                            trs[i].children[5].innerHTML = ""
                        }
                    }
                    for(var i = 0; i < trs.length; ++i)
                    {
                        trs[i].children[0].innerHTML = dataList[i]["date"]
                        trs[i].children[1].innerHTML = dataList[i]["t"]
                        trs[i].children[2].innerHTML = dataList[i]["po"]
                        trs[i].children[3].innerHTML = dataList[i]["u"]
                        trs[i].children[4].innerHTML = dataList[i]["vv"]
                        trs[i].children[5].innerHTML = dataList[i]["td"]
                    }
                },
                error:function (resp,xhr) {
                    alert("出错了")
                }

            })
        }


    })
    next.addEventListener("click",function () {

        var p = parseInt(pagenum.value)
        if(p >= parseInt(pageCount.innerText))
        {
            alert("已经是最后页了")
        }
        else {
            pagenum.value = String(p + 1)
            var params = getParams()
            ajax({
                type:"post",
                url:"/initialData",
                data:params,
                success:function (resp,xhr) {
                    var dataList = resp["dataList"]
                    if(dataList.length < trs.length)
                    {
                        for(var i = 0; i < trs.length; ++i)
                        {
                            trs[i].children[0].innerHTML = ""
                            trs[i].children[1].innerHTML = ""
                            trs[i].children[2].innerHTML = ""
                            trs[i].children[3].innerHTML = ""
                            trs[i].children[4].innerHTML = ""
                            trs[i].children[5].innerHTML = ""
                        }
                    }
                    for(var i = 0; i < trs.length; ++i)
                    {
                        trs[i].children[0].innerHTML = dataList[i]["date"]
                        trs[i].children[1].innerHTML = dataList[i]["t"]
                        trs[i].children[2].innerHTML = dataList[i]["po"]
                        trs[i].children[3].innerHTML = dataList[i]["u"]
                        trs[i].children[4].innerHTML = dataList[i]["vv"]
                        trs[i].children[5].innerHTML = dataList[i]["td"]
                    }
                },
                error:function (resp,xhr) {
                    alert("出错了")
                }
            })
        }
    })
    goto.addEventListener("click",function () {
        var params = getParams()
        var pn = parseInt(pagenum.value)
        if(pn < 1)
        {
            alert("页码不能小于1")
            return;
        }
        else if( pn > parseInt(pageCount.innerText))
        {
            alert("最大页码为" + pageCount.innerText)
            return;
        }
        ajax({
            type:"post",
            url:"/initialData",
            data:params,
            success:function (resp,xhr) {
                var dataList = resp["dataList"]
                if(dataList.length < trs.length)
                {
                    for(var i = 0; i < trs.length; ++i)
                    {
                        trs[i].children[0].innerHTML = ""
                        trs[i].children[1].innerHTML = ""
                        trs[i].children[2].innerHTML = ""
                        trs[i].children[3].innerHTML = ""
                        trs[i].children[4].innerHTML = ""
                        trs[i].children[5].innerHTML = ""
                    }
                }
                for(var i = 0; i < trs.length; ++i)
                {
                    trs[i].children[0].innerHTML = dataList[i]["date"]
                    trs[i].children[1].innerHTML = dataList[i]["t"]
                    trs[i].children[2].innerHTML = dataList[i]["po"]
                    trs[i].children[3].innerHTML = dataList[i]["u"]
                    trs[i].children[4].innerHTML = dataList[i]["vv"]
                    trs[i].children[5].innerHTML = dataList[i]["td"]
                }
            },
            error:function (resp,xhr) {
                alert("出错了")
            }
        })
    })



}