# SpringMVC的异常处理器

## 1、基于配置的异常处理

SpringMVC提供了一个处理控制器方法执行过程中所出现的异常的接口：HandlerExceptionResolover。

HandlerExceptionResovler接口的实现类有：DefaultHandlerExceptionResolver和SimpleMappingExceptionResolver。

![image-20220427191942809](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220427191942809.png)

SpringMVC提供了自定义的异常处理器SimpleMappingExceptionResolver，通过该自定义的异常处理器，可以对指定的异常设置自定义的错误提示视图。

```xml
    <bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
        <property name="exceptionMappings">
            <props>
<!--        properties的键表示处理器方法执行过程中出现的异常
            properties的值表示若出现指定异常时，设置一个新的视图名称，跳转到指定页面，这里是error.html
-->
                <prop key="java.lang.ArithmeticException">error</prop>
            </props>
        </property>
<!--        设置将异常信息共享在请求域中的键-->
        <property name="exceptionAttribute" value="ex"></property>
    </bean>
```

```html
<body>
出现异常
<!--解析异常的具体信息-->
<p th:text="${ex}"></p>
</body>
```

## 2、基于注解的异常处理

```java
@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(value = {ArithmeticException.class,NullPointerException.class})
    public String testException(Exception ex, Model model){
        model.addAttribute("ex",ex);
        return "error";
    }
}
```