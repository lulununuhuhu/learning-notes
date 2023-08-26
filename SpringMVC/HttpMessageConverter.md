# HttpMessageConverter

HttpMessageConverter,报文信息转换器，将请求报文转换为Java对象，或者将Java对象转换为响应报文。

HttpMessageConverter提供了两个注解和两个类型:@RequestBody,@ResponseBody,RequestEntity,ResponseEntity。

## 1、@RequestBody

@RequestBody可以获取请求体，需要在控制器方法设置一个形参，使用@RequestBody进行标识，当前请求的请求体就会为当前注解所标识的形参赋值。

```html
<form th:action="@{/testRequestBody}" method="post">
    <input type="text" name="username">
    <input type="text" name="password">
    <input type="submit" value="测试@RequestBody">
</form>
```

```java
@RequestMapping("/testRequestBody")
public String testRequestBody(@RequestBody String requestBody){
    System.out.println("RequestBody:"+requestBody);
    return "success";
}
```

输出结果:

```
RequestBody:username=dasdas&password=sdadassd
```

## 2、RequestEntity

RequestEntity封装请求报文的一种类型，需要在控制器方法的形参中设置该类型的形参，当前请求的请求报文就会赋值给该形参，可以通过getHeader()获取请求头信息，通过getBody()获取请求体信息。

```html
<form th:action="@{/testRequestEntity}" method="post">
    <input type="text" name="username">
    <input type="text" name="password">
    <input type="submit" value="测试testRequestEntity">
</form>
```

```java
@RequestMapping("/testRequestEntity")
public String testRequestEntity(RequestEntity<String> requestEntity){
    //requestEntity表示整个请求报文的信息
    System.out.println("请求头:"+requestEntity.getHeaders());
    System.out.println("请求体:"+requestEntity.getBody());
    return "success";
}
```

输出结果：

```
请求头:[host:"localhost:8080", connection:"keep-alive", content-length:"34", cache-control:"max-age=0", sec-ch-ua:"" Not A;Brand";v="99", "Chromium";v="100", "Microsoft Edge";v="100"", sec-ch-ua-mobile:"?0", sec-ch-ua-platform:""Windows"", origin:"http://localhost:8080", upgrade-insecure-requests:"1", dnt:"1", user-agent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.50", accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", sec-fetch-site:"same-origin", sec-fetch-mode:"navigate", sec-fetch-user:"?1", sec-fetch-dest:"document", referer:"http://localhost:8080/HttpMessageConverter_SpringMVC_war/", accept-encoding:"gzip, deflate, br", accept-language:"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6", cookie:"Idea-af3af072=c3d69577-d258-48d9-9a5b-761ea7e7d21e", Content-Type:"application/x-www-form-urlencoded;charset=UTF-8"]

请求体:username=adsasddas&password=sdaasd
```

## 3、@ResponseBody

@ResponseBody用于标识一个控制器方法，可以将该方法的返回值直接作为响应报文的响应体响应到浏览器。

```java
@RequestMapping("/testResponseBody")
@ResponseBody//用ResponseBody注解标志过的方法返回的是响应报文内容，不再是视图名称
public String testResponseBody(){
    return "success";
}
```

## 4、@ResonseBody处理json

1. 导入jackson的依赖

2. 在SpringMVC的核心配置文件中开启mvc的注解驱动，此时在`HandlerAdaptor`中会自动装配一个消息转换器：`MappingJackson2HttpMessageConverter`，可以将相应到浏览器的java对象转换为json格式的字符串。

   ```xml
   <mvc:annotation-driven />
   ```

3. 在处理器方法上使用@ResponseBody注解进行标识

4. 将java对象作为返回值，就会自动转化为json格式的字符串

   ```xml
   <!--管理json对象的包-->
   <dependency>
       <groupId>com.fasterxml.jackson.core</groupId>
       <artifactId>jackson-databind</artifactId>
       <version>2.12.5</version>
   </dependency>
   ```

   ```java
       @RequestMapping("/testResponseUser")
       @ResponseBody
       public User testResponseUser(){
   //        在导入jackson-databind的包后以json对象返回
           return new User(1001,"admin","13921350895lc",23,"男");
       }
   ```

显示效果为:

```
{"id":1001,"username":"admin","password":"13921350895lc","age":23,"sex":"男"}
```

## 5、处理AJAX

1. 在webapp目录下创建static目录存放静态资源，放入vue.js、axios.min.js。

```html
<div id="app">
    <a @click = "testAxios" th:href="@{/testAxios}">SpringMVC处理ajax</a>
</div>
<script type="text/javascript" th:src="@{/static/js/vue.js}"></script>
<script type="text/javascript" th:src="@{/static/js/axios.min.js}"></script>
<script type="text/javascript">
    var vue = new Vue({
        e1:"#app",
        methods:{
            testAxios:function (event) {
                axios({
                    methods:"post",
                    url:event.target.href,
                    params:{
                        username:"admin",
                        password:"123456"
                    }
                }).then(function (response) {
                    alert(response.data);
                });
                event.preventDefault();//取消超链接的默认行为
            }
        }
    })
</script>
```

```java
@RequestMapping("/testAxios")
@ResponseBody
public String testAxios(String username,String password){
    System.out.println(username+":"+password);
    return "hello_axios";
}
```

## 6、RestController注解

@RestController注解是springMVC提供的一个复合注解，标识在控制器的类上，就相当于为类添加了@Controller注解，并且为其中的每个方法添加了@ResponseBody注解。

