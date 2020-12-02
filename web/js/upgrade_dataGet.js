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
    var dataType = document.querySelector(".menu_checked").id // 原始数据? 区间数据! ...
    var checked = ""; // 日区间 月区间 年区间
    if(document.querySelector("#checked"))
        checked = document.querySelector("#checked").innerText
    params = {"yearFrom":yearFrom,monthFrom:monthFrom,dayFrom:dayFrom,yearTo:yearTo,monthTo:monthTo,dayTo:dayTo,
                pagenum:pagenum,cityName:cityName,dataType:dataType,checked:checked}

    return params;
}

function setTable(checked,trs,pagenum,pageCount,dataType) {
    var params = getParams()
    ajax({
        type:"post",
        url:"/upgrade",
        data:{yearFrom:params["yearFrom"],monthFrom:params["monthFrom"],dayFrom:params["dayFrom"],
            yearTo:params["yearTo"],monthTo:params["monthTo"],dayTo:params["dayTo"],cityName:params["cityName"],
            dataType:dataType,checked:checked},
        success:function (resp,xhr) {
            var dataList = resp["dataList"]
            if(checked == "日区间")
                dayList = dataList
            else if(checked == "月区间")
                monthList = dataList
            else yearList = dataList

            if(checked == "日中值")
                dayList = dataList
            else if(checked == "月中值")
                monthList = dataList
            else yearList = dataList


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
                for(var i = 0; i < dataList.length; ++i)
                {
                    trs[i].children[0].innerHTML = dataList[i]["date"]
                    trs[i].children[1].innerHTML = dataList[i]["t"]
                    trs[i].children[2].innerHTML = dataList[i]["po"]
                    trs[i].children[3].innerHTML = dataList[i]["u"]
                    trs[i].children[4].innerHTML = dataList[i]["vv"]
                    trs[i].children[5].innerHTML = dataList[i]["td"]
                }
            }
            else {
                for(var i = 0; i < trs.length; ++i)
                {
                    trs[i].children[0].innerHTML = dataList[i]["date"]
                    trs[i].children[1].innerHTML = dataList[i]["t"]
                    trs[i].children[2].innerHTML = dataList[i]["po"]
                    trs[i].children[3].innerHTML = dataList[i]["u"]
                    trs[i].children[4].innerHTML = dataList[i]["vv"]
                    trs[i].children[5].innerHTML = dataList[i]["td"]
                }
            }
            pagenum.value = "1"
            pageCount.innerText = resp["pageCount"]
        },
        error:function (resp,xhr) {
            alert("setTable出错了")
        }
    })
}

function prevClick(pagenum,trs,dataList){

    var p = parseInt(pagenum.value)
    if(p < 2)
    {
        alert("已经是最前页了")
    }
    else {
        pagenum.value = String(p - 1)
        var beginIdx = (pagenum.value - 1) * 9
        if(beginIdx + 9 >= dataList.length)
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
        for(var i = beginIdx; i < beginIdx + 9 && i < dataList.length; ++i)
        {
            trs[i-beginIdx].children[0].innerHTML = dataList[i]["date"]
            trs[i-beginIdx].children[1].innerHTML = dataList[i]["t"]
            trs[i-beginIdx].children[2].innerHTML = dataList[i]["po"]
            trs[i-beginIdx].children[3].innerHTML = dataList[i]["u"]
            trs[i-beginIdx].children[4].innerHTML = dataList[i]["vv"]
            trs[i-beginIdx].children[5].innerHTML = dataList[i]["td"]
        }

    }

}

function nextClick(pagenum, trs, pageCount, dataList) {

    var p = parseInt(pagenum.value)
    if(p >= parseInt(pageCount.innerText))
    {
        alert("已经是最后页了")
    }
    else {
        pagenum.value = String(p + 1)
        var beginIdx = (pagenum.value - 1) * 9
        if(beginIdx + 9 >= dataList.length)
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
        for(var i = beginIdx; i < beginIdx + 9 && i < dataList.length; ++i)
        {
            trs[i-beginIdx].children[0].innerHTML = dataList[i]["date"]
            trs[i-beginIdx].children[1].innerHTML = dataList[i]["t"]
            trs[i-beginIdx].children[2].innerHTML = dataList[i]["po"]
            trs[i-beginIdx].children[3].innerHTML = dataList[i]["u"]
            trs[i-beginIdx].children[4].innerHTML = dataList[i]["vv"]
            trs[i-beginIdx].children[5].innerHTML = dataList[i]["td"]
        }

    }
}



var initialList = []
var yearList = []
var monthList = []
var dayList = []
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
            url:"/upgrade",
            data:{yearFrom:params["yearFrom"],monthFrom:params["monthFrom"],dayFrom:params["dayFrom"],
                  yearTo:params["yearTo"],monthTo:params["monthTo"],dayTo:params["dayTo"],pagenum:"1",cityName:params["cityName"],
                  dataType:"initial",checked:"" },
            success:function (resp,xhr) {
                var dataList = resp["dataList"]
                initialList = dataList
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
                    for(var i = 0; i < dataList.length; ++i)
                    {
                        trs[i].children[0].innerHTML = dataList[i]["date"]
                        trs[i].children[1].innerHTML = dataList[i]["t"]
                        trs[i].children[2].innerHTML = dataList[i]["po"]
                        trs[i].children[3].innerHTML = dataList[i]["u"]
                        trs[i].children[4].innerHTML = dataList[i]["vv"]
                        trs[i].children[5].innerHTML = dataList[i]["td"]
                    }
                }
                else {
                    for(var i = 0; i < trs.length; ++i)
                    {
                        trs[i].children[0].innerHTML = dataList[i]["date"]
                        trs[i].children[1].innerHTML = dataList[i]["t"]
                        trs[i].children[2].innerHTML = dataList[i]["po"]
                        trs[i].children[3].innerHTML = dataList[i]["u"]
                        trs[i].children[4].innerHTML = dataList[i]["vv"]
                        trs[i].children[5].innerHTML = dataList[i]["td"]
                    }
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
     * 待选定表的prev,next,goto 事件绑定
     */
    var prev = document.querySelector(".prev")
    var next = document.querySelector(".next")
    var goto = document.querySelector(".goto")
    var pageCount = document.querySelector(".pageCount")
    prev.addEventListener("  ",function () {

        var p = parseInt(pagenum.value)
        if(p < 2)
        {
            alert("已经是最前页了")
        }
        else {
            pagenum.value = String(p - 1)
            var beginIdx = (pagenum.value - 1) * 9
            if(beginIdx + 9 >= initialList.length)
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
            for(var i = beginIdx; i < beginIdx + 9 && i < initialList.length; ++i)
            {
                trs[i-beginIdx].children[0].innerHTML = initialList[i]["date"]
                trs[i-beginIdx].children[1].innerHTML = initialList[i]["t"]
                trs[i-beginIdx].children[2].innerHTML = initialList[i]["po"]
                trs[i-beginIdx].children[3].innerHTML = initialList[i]["u"]
                trs[i-beginIdx].children[4].innerHTML = initialList[i]["vv"]
                trs[i-beginIdx].children[5].innerHTML = initialList[i]["td"]
            }

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
            var beginIdx = (pagenum.value - 1) * 9
            if(beginIdx + 9 >= initialList.length)
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
            for(var i = beginIdx; i < beginIdx + 9 && i < initialList.length; ++i)
            {
                trs[i-beginIdx].children[0].innerHTML = initialList[i]["date"]
                trs[i-beginIdx].children[1].innerHTML = initialList[i]["t"]
                trs[i-beginIdx].children[2].innerHTML = initialList[i]["po"]
                trs[i-beginIdx].children[3].innerHTML = initialList[i]["u"]
                trs[i-beginIdx].children[4].innerHTML = initialList[i]["vv"]
                trs[i-beginIdx].children[5].innerHTML = initialList[i]["td"]
            }

        }
    })
    goto.addEventListener("click",function () {
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
        var beginIdx = (pn - 1) * 9
        if(beginIdx + 9 >= initialList.length)
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
        for(var i = beginIdx; i < beginIdx + 9 && i < initialList.length; ++i)
        {
            trs[i-beginIdx].children[0].innerHTML = initialList[i]["date"]
            trs[i-beginIdx].children[1].innerHTML = initialList[i]["t"]
            trs[i-beginIdx].children[2].innerHTML = initialList[i]["po"]
            trs[i-beginIdx].children[3].innerHTML = initialList[i]["u"]
            trs[i-beginIdx].children[4].innerHTML = initialList[i]["vv"]
            trs[i-beginIdx].children[5].innerHTML = initialList[i]["td"]
        }
    })

    /**
     * 区间化 集层事件绑定
     */
    var make_interval = document.querySelector(".make_interval")
    make_interval.addEventListener("click", function () {
        var checked = document.querySelector("#checked")
        if(checked.innerText == "日区间")
        {
            var trs = document.querySelectorAll("#dayDataTable tr:nth-child(n+2)")
            var pagenum = document.querySelector(".dayChecked .pagenum")
            var pageCount = document.querySelector(".dayChecked .pageCount")
            setTable("日区间",trs,pagenum,pageCount,"interval")


            trs = document.querySelectorAll(".data-table tr:nth-child(n+2)")
            pagenum = document.querySelector("#pagenum")
            pageCount = document.querySelector(".pageCount")
            setTable("日区间",trs,pagenum,pageCount,"interval")

        }
        else if(checked.innerText == "月区间")
        {
            var trs = document.querySelectorAll("#monthDataTable tr:nth-child(n+2)")
            var pagenum = document.querySelector(".monthChecked .pagenum")
            var pageCount = document.querySelector(".monthChecked .pageCount")
            setTable("月区间",trs,pagenum,pageCount,"interval")


            trs = document.querySelectorAll(".data-table tr:nth-child(n+2)")
            pagenum = document.querySelector("#pagenum")
            pageCount = document.querySelector(".pageCount")
            setTable("月区间",trs,pagenum,pageCount,"interval")
        }
        else if(checked.innerText == "年区间")
        {
            var trs = document.querySelectorAll("#yearDataTable tr:nth-child(n+2)")
            var pagenum = document.querySelector(".yearChecked .pagenum")
            var pageCount = document.querySelector(".yearChecked .pageCount")
            setTable("年区间",trs,pagenum,pageCount,"interval")


            trs = document.querySelectorAll(".data-table tr:nth-child(n+2)")
            pagenum = document.querySelector("#pagenum")
            pageCount = document.querySelector(".pageCount")
            setTable("年区间",trs,pagenum,pageCount,"interval")

        }
    })


    /**
     * 已选定数据的表的 prev和next绑定事件
     */
    var dayPrev = document.querySelector(".dayChecked .prev")
    var monthPrev = document.querySelector(".monthChecked .prev")
    var yearPrev = document.querySelector(".yearChecked .prev")
    var dayNext = document.querySelector(".dayChecked .next")
    var monthNext = document.querySelector(".monthChecked .next")
    var yearNext = document.querySelector(".yearChecked .next")

    dayPrev.addEventListener("click", function () {
        var pagenum = document.querySelector(".dayChecked .pagenum")
        var trs = document.querySelectorAll(".dayChecked .checked-data-table tr:nth-child(n+2)")
        prevClick(pagenum,trs,dayList)
    })
    monthPrev.addEventListener("click", function () {
        var pagenum = document.querySelector(".monthChecked .pagenum")
        var trs = document.querySelectorAll(".monthChecked .checked-data-table tr:nth-child(n+2)")
        prevClick(pagenum,trs,monthList)
    })
    yearPrev.addEventListener("click", function () {
        var pagenum = document.querySelector(".yearChecked .pagenum")
        var trs = document.querySelectorAll(".yearChecked .checked-data-table tr:nth-child(n+2)")
        prevClick(pagenum,trs,yearList)
    })
    dayNext.addEventListener("click",function () {
        var pagenum = document.querySelector(".dayChecked .pagenum")
        var pageCount = document.querySelector(".dayChecked .pageCount")
        var trs = document.querySelectorAll("#dayDataTable tr:nth-child(n+2)")
        nextClick(pagenum,trs,pageCount,dayList)
    })
    monthNext.addEventListener("click",function () {
        var pagenum = document.querySelector(".monthChecked .pagenum")
        var pageCount = document.querySelector(".monthChecked .pageCount")
        var trs = document.querySelectorAll("#monthDataTable tr:nth-child(n+2)")
        nextClick(pagenum,trs,pageCount,monthList)
    })
    yearNext.addEventListener("click",function () {
        var pagenum = document.querySelector(".yearChecked .pagenum")
        var pageCount = document.querySelector(".yearChecked .pageCount")
        var trs = document.querySelectorAll("#yearDataTable tr:nth-child(n+2)")
        nextClick(pagenum,trs,pageCount,yearList)
    })

    /**
     * 中值
     */
    var middle = document.querySelector("#middle")
    middle.addEventListener("click",function(){

            var trs1 = document.querySelectorAll("#dayDataTable tr:nth-child(n+2)")
            var pagenum1 = document.querySelector(".dayChecked .pagenum")
            var pageCount1 = document.querySelector(".dayChecked .pageCount")
            setTable("日中值",trs1,pagenum1,pageCount1,"middle")


            var trs2 = document.querySelectorAll("#monthDataTable tr:nth-child(n+2)")
            var pagenum2 = document.querySelector(".monthChecked .pagenum")
            var pageCount2 = document.querySelector(".monthChecked .pageCount")
            setTable("月中值",trs2,pagenum2,pageCount2,"middle")


            var trs3 = document.querySelectorAll("#yearDataTable tr:nth-child(n+2)")
            var pagenum3 = document.querySelector(".yearChecked .pagenum")
            var pageCount3 = document.querySelector(".yearChecked .pageCount")
            setTable("年中值",trs3,pagenum3,pageCount3,"middle")

    })

    /**
     * 归一化
     */


    /**
     * 选定数据集
     */

    var dataChecked = document.querySelector(".dataChecked")
    dataChecked.addEventListener("click",function () {
        alert("数据集已选定")
    })

}