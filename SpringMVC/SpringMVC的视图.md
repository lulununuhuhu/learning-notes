# SpringMVC的视图

SpringMVC中的视图是View接口，视图的作用渲染数据，将模型Model中的数据展示给用户。

SpringMVC视图的种类很多，默认有转发视图InternalResourceView和重定向视图RedirectView。

当工程引入jstl的依赖时，转发视图就会自动转换为jstlView；若使用的视图技术为Thymeleaf，在SpringMVC的配置文件中配置了Thymeleaf的视图解析器，由此视图解析器被解析之后所得到的是ThymeleafView。

## ThymeleafView

当控制器方法中所设置的视图名称没有任何前缀时（前几节所使用的都是使用没有任何前缀的方法），此时的视图名称会被SpringMVC配置文件中所配置的视图解析器解析，视图名称拼接视图前缀和视图后缀所得到的最终路径，会通过转发的方式实现跳转。

```java
@Controller
public class viewController {
    @RequestMapping("/testThymeleafView")
    public String testThymeleafView(){
        return "success";
    }
}
```

## 转发视图

SpringMVC中默认的转发视图是InternalResourceView

SpringMVC中创建转发视图的情况：

当控制器方法中所设置的视图名称以`forward:`为前缀时，创建internalResourceView视图，此时的视图名称不会被SpringMVC配置文件中所配置的视图解析器解析，而是会将前缀`forward:`去掉，剩余部分作为最终路径通过转发的方式实现跳转。

```java
@RequestMapping("/testThymeleafView")
public String testThymeleafView(){
    return "success";
}

@RequestMapping("/testForward")
public String testForward(){
    return "forward:/testThymeleafView";//视图名称前使用forward前缀，会使用转发视图InternalResourceView转发到testThymeleafView对应的方法中
}
```

## 重定向视图

SpringMVC中默认的重定向视图是RedirectView

当控制器方法中所设置的视图名称以`redirect:`为前缀时，创建RedirectView视图，此时的视图名称不会被SpringMVC配置文件中所配置的视图解析器解析，而是会将前缀`redirect:`去掉，剩余部分作为最终路径通过重定向的方式实现跳转。

```java
@RequestMapping("/testRedirect")
public String testRedirect(){
    return "redirect:/testThymeleafView";//使用redirect前缀，会重定向到testThymeleafView请求
}
```

## 视图控制器view-controller

当控制器方法中，仅仅用来实现页面跳转，即只需要设置视图名称时，可以将处理器方法使用view-controller标签进行表示。

```xml
<!--
	path:设置处理的请求地址
	view-name:设置请求地址所对应的视图名称
-->
<mvc:view-controller path="/testView" view-name="success"></mvc:view-controller>
```

> 注：当在SpringMVC的配置文件中设置了任何一个view-controller,则其他控制器中的请求映射将会全部失效，此时需要在SpringMVC核心配置文件中设置开启mvc注解驱动的标签。
>
> <mvc:annotation-driven />