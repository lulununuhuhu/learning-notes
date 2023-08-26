# RequestMapping注解

> RequestMapping注解的功能就是将请求和处理请求的控制器方法关联起来，建立起映射关系。
>
> SpringMVC接收到指定的请求，就回来找到在映射关系中对应的控制器方法来处理这个请求。
>
> RequestMapping注解中的不同属性，包括value、method等，这些定义了url和控制器方法匹配的规则。

## @RequestMapping注解的位置

`@RequestMapping`表示一个类：设置该类中所有方法映射请求的请求路径的前缀初始信息

`@RequestMapping`标识一个方法：设置对应方法映射请求请求路径的具体信息

如果在类和方法都定义了`RequestMapping`注解之后，会**先匹配类的注解信息，然后再匹配方法的注解信息**。

```xml
<!--先匹配类映射hello，再匹配testRequestMapping映射s-->
<a th:href="@{/hello/testRequestMapping}">跳转到success页面</a>
```

```java
@Controller
@RequestMapping("/hello")
public class RequestMappingController {
    @RequestMapping("/testRequestMapping")
    public String success(){
        return "success";
    }
}
```

## @RequestMapping注解的value属性

@RequestMapping注解的value属性指明了请求的请求地址匹配。

@RequestMapping注解的value属性是一个字符串类型的数组，表示该请求映射能够匹配数组中多个地址的请求。

```java
@Controller
@RequestMapping("/hello")
public class RequestMappingController {
    @RequestMapping(value = {"/testRequestMapping","/test"})
    public String success(){
        return "success";
    }
}
```

```xml
<a th:href="@{/hello/testRequestMapping}">跳转到success页面使用testRequestMapping映射</a>
<a th:href="@{/hello/test}">跳转到success页面使用test映射</a>
```

## @RequestMapping注解的method属性

@RequestMapping注解的method属性指定获得请求的请求方式(get还是post)匹配请求映射

@RequestMapping注解的method属性是一个RequestMethod类型的数组，表示该请求映射能够匹配多种请求方式的请求

若当前请求的请求地址满足请求映射的value属性，但是请求方式不满足method属性，则浏览器报错405：Request method ’POST‘ not supported。

```xml
<!--声明post方式的请求表单-->
<form th:action="@{/hello/test}" method="post">
    <input type="submit" value="测试RequestMaping注解的method属性-->post">
</form>
```

```java
@Controller
@RequestMapping("/hello")
public class RequestMappingController {
    @RequestMapping(
            value = {"/testRequestMapping","/test"},
            method = {RequestMethod.GET} //指定匹配的请求方式是get
    )
    public String success(){
        return "success";
    }
}
```

![image-20220419194501107](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220419194501107.png)

> 注：
>
> 1. 对于处理指定请求方式的控制器方法，SpringMVC中提供了@RequestMapping的派生注解
>    * @GetMapping：处理get请求的映射
>    * @PostMapping:处理post请求的映射
>    * @PutMapping:处理put请求的映射
>    * @DeleteMapping:处理delete请求的映射
> 2. 常用的请求方式有get、post、put、delete。目前浏览器只支持get和post，若在form表单提交时，为method设置了其他请求方式的字符串（put或delete），则按照默认的请求方式get处理。若要发送put和delete请求，则需要通过spring提供的过滤器HiddenHttpMethodFilter，在restful部分会讲到。

## SpringMVC支持ant风格的路径

1. ?:表示匹配任意的单个字符
2. *:表示匹配任意的0个或多个字符
3. **:表示匹配任意的一层或多层目录

注：在使用`**`时，只能使用/**/xx的形式。

## SpringMVC支持路径中的占位符（重点）

原始方式：/deleteUser?id=1

rest方式:/deleteUser/1

SpringMVC路径中的占位符常用于restful风格中，当请求路径中将某些数据通过路径的方式传输到服务器中，就可以在相应的@RequestMapping注解的value属性中通过占位符(xxx)表示传输的数据，再通过@PathVariable注解，将占位符所表示的数据赋值给控制器方法的形参。

```xml
<a th:href="@{/hello/testRest/1/admin}">测试路径中的占位符</a>
```

```java
public class RequestMappingController {
    @RequestMapping("/testRest/{id}/{username}")
    public String testRest(@PathVariable("id")String id,@PathVariable("username") String username){
        System.out.println("id:"+id+"username:"+username);
        return "success";
    }
}
```

