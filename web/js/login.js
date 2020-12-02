  /**
   * 使用DOMContentLoaded的方式注意：
   * 因为是在加载完css之前调用函数，所以在获取元素的style属性值时，定义在css样式表中的值有可能获取不到
   */
  
  document.addEventListener("DOMContentLoaded",function(){
    var username = document.querySelector(".username input")
    var password = document.querySelector(".password input")
    var remember_password = document.querySelector(".remember_password_rec")
    var login_btn = document.querySelector(".login_btn")
    /**
     * 输入用户名和密码
     */
    username.onfocus = function() {
        console.log(this.style.color)
        if(this.value == "请输入用户名" && this.style.color == "rgb(201, 201, 201)")
        {
            this.value = ""
            this.style.color = "#333"
        }
    }
    username.onblur = function(){
        if(this.value == "")
        {
            this.value = "请输入用户名"
            this.style.color = "#c9c9c9"
        }
    }
    password.onfocus = function() {
       if(this.value == "请输入密码" && this.style.color == "rgb(201, 201, 201)")
       {
        this.value = ""
        this.style.color = "#333"
       }
    }
    password.onblur = function(){
        if(this.value == "")
        {
            this.value = "请输入密码"
            this.style.color = "#c9c9c9"
        }
    }
    /** 待添加：记住密码,设置localStorage或者cookie
     * 记住密码
     */
    remember_password.onclick = function(){
        
        if(this.children[0].style.display == "inline")
        {
            this.children[0].style.display = "none"
            this.style.backgroundColor = "#fff"
        }
        else {
            this.children[0].style.display = "inline"
            this.style.backgroundColor = "#d5d5d5"
        }
    }

    /** 待添加 ：点击登录按钮 -- 进行表单校验
     * 
     */
    login_btn.addEventListener("click",function () {
        ajax({
            type:"post",
            url:"/loginS",
            data:{username:username.value,password:password.value},
            success:function (resp,xhr) {
                console.log(resp)
                if(resp["u"] == 1)
                    location.replace("/index.html")
                else alert("用户名或密码错误")
            },
            error:function (resp,xhr) {
                
            }
        })
    })
    
  })










  /*ajax函数*/
  function ajax (options) {
      // 存储的是默认值
      var defaults = {
          type: 'get',
          url: '',
          data: {},
          header: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function () {},
          error: function () {}
      };

      // 使用options对象中的属性覆盖defaults对象中的属性
      Object.assign(defaults, options);

      // 创建ajax对象
      var xhr = new XMLHttpRequest();
      // 拼接请求参数的变量
      var params = '';
      // 循环用户传递进来的对象格式参数
      for (var attr in defaults.data) {
          // 将参数转换为字符串格式
          params += attr + '=' + defaults.data[attr] + '&';
      }
      // 将参数最后面的&截取掉
      // 将截取的结果重新赋值给params变量
      params = params.substr(0, params.length - 1);
      // 判断请求方式
      if (defaults.type == 'get') {
          defaults.url = defaults.url + '?' + params;
      }
      // 配置ajax对象
      xhr.open(defaults.type, defaults.url,true);
      // 如果请求方式为post
      if (defaults.type == 'post') {
          // 用户希望的向服务器端传递的请求参数的类型
          var contentType = defaults.header['Content-Type']
          // 设置请求参数格式的类型
          xhr.setRequestHeader('Content-Type', contentType);
          // 判断用户希望的请求参数格式的类型
          // 如果类型为json
          if (contentType == 'application/json') {
              // 向服务器端传递json数据格式的参数
              xhr.send(JSON.stringify(defaults.data))
          }else {
              // 向服务器端传递普通类型的请求参数
              xhr.send(params);
          }

      }else {
          // 发送请求
          xhr.send();
      }
      // 监听xhr对象下面的onload事件
      // 当xhr对象接收完响应数据后触发
      xhr.onload = function () {

          // xhr.getResponseHeader()
          // 获取响应头中的数据
          var contentType = xhr.getResponseHeader('Content-Type');
          // 服务器端返回的数据
          var responseText = xhr.responseText;

          // 如果响应类型中包含applicaition/json
          if (contentType.includes('application/json')) {
              // 将json字符串转换为json对象
              responseText = JSON.parse(responseText)
          }

          // 当http状态码等于200的时候
          if (xhr.status == 200) {
              // 请求成功 调用处理成功情况的函数
              defaults.success(responseText, xhr);
          }else {
              // 请求失败 调用处理失败情况的函数
              defaults.error(responseText, xhr);
          }
      }
  }
