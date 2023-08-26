# SpringBoot学习中遇到的问题

## 使用SpringInitializr创建SpringBoot项目时无法创建，显示Initialization failed for 'https://start.spring.io' Please check URL, network and proxy settings

解决方法：按提示所说，去ideaSetting中将https://start.spring.io自动配置入HTTP Proxy中。参考教程：[(56条消息) Initialization failed for 'https://start.spring.io' Please check URL, network and proxy settings解决办法_，稳步前进的博客-CSDN博客](https://blog.csdn.net/qq_42815122/article/details/85551956)

## 启动项目后运行一个Controller方法根据requestMapping输入url后报错，404

原因：启动类需要放在项目上下文的根目录下，否则无法找到该路径。

深度原因：涉及了**SpringBoot的自动配置的知识点**

解决方法：将启动类拉到上一级目录下，与controller包同级。

# 使用的前端模板文件的css样式无法导入

```java
/**
 * 自定义MVC视图配置
 */
@Configuration
@EnableWebMvc
public class MyMvcConfig implements WebMvcConfigurer {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("login");
        registry.addViewController("/index").setViewName("login");
    }
}
```

在将@EnableWebMvc注解注释后，即可获得css样式。

关于@EnableWebMvc注解作用：

# 映射器器返回视图时，报错：Exception evaluating SpringEL expression: "session.loginUser.userName"

原因是返回的main.html中有引用common.html的模板，其中

```xml
[[${session.loginUser.userName}]]
```

这个EL表达式loginUser由于没有值，会报异常，所以需要在该值前加个判断空的判断

```
[[${session.loginUser?.userName}]]
```

增加一个问号后，可以正确返回指定的页面。

# 业务逻辑：在登录页面login.html处理登录请求参数后，如果返回登录页面login.html，会丢失css样式

![image-20220509112501981](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220509112501981.png)

如上所示，所有的css样式丢失。

解决过程：[(56条消息) SpringBoot 跳转页面css样式丢失_Zhac的博客-CSDN博客_springboot样式丢失](https://blog.csdn.net/zhaihao1996/article/details/104792643)

该博客提到的问题和我的类似，都是第一次进入页面样式正常，而第二次进入页面样式丢失。

问题原因：

```xml
<link th:href="@{css/style.css}" rel="stylesheet">
<link th:href="@{css/style-responsive.css}" rel="stylesheet">
```

使用的thymeleaf的语法，而其中**@{css/style.css}**的路径解析中前面没有加/,这导致该路径是**一个绝对路径**,而在第二次跳转该页面是通过controller方法返回视图名称进行的，所以需要在路径前加/作为相对路径。

解决方法：

```java
<link th:href="@{/css/style.css}" rel="stylesheet">
<link th:href="@{/css/style-responsive.css}" rel="stylesheet">
```

还有相关的js资源也采用上述方式。

---

## 关于thymeleaf中相对路径和绝对路径的问题：

# EL1008E: Property or field 'userName' cannot be found on object of type 'java.lang.String' - maybe not public or not valid

该问题是在controller方法中采用HttpSession的setAttribute()方法定义session值时，定义名称为userName的session就出现这个问题。导致页面重定向到dashboard页面后又无法显示。

```java
           session.setAttribute("loginUser", username);
           session.setAttribute("loginPassword", password);
```

只要将前一个loginUser的定义注释掉，就可以

```java
//            session.setAttribute("loginUser", username);
            session.setAttribute("loginPassword", password);
```

后来，将attribute属性的key改了一个值，就可以了。可能是该值与html资源中某个属性重合导致冲突了吧？

# SpingSecurity中报错：Invalid property 'principal.getAuthorities()' of bean class [org.springframework.security.authentication.AnonymousAuthenticationToken]

出错位置是在：

```html
<a class="item">
    用户名:<span sec:authentication="name"></span>
    角色:<span sec:authentication="principal.getAuthorities()"></span>
</a>
```

解决过程：[(56条消息) springsecurity报错NotReadablePropertyException: Invalid property 'principal.originAdmin' of bean class_precious。。。的博客-CSDN博客](https://blog.csdn.net/qq_43308851/article/details/105225722)

原因：由于加入了security权限限制，需要使用用户名和密码后才能登录页面；如果一开始直接输入localhost:8080/登录index页面，spring无法找到对应的authorities属性导致空指针异常。

## 关于springframework和jdk版本不匹配导致无法成功启动项目的问题

错误场景：

`Failed to read candidate component class: file [E:\Java实战项目\VBlog\VBlog\blogserver\target\classes\org\sang\BlogserverApplication.class];`

`nested exception is org.springframework.core.NestedIOException: ASM ClassReader failed to parse class file - probably due to a new Java class file version that isn't supported yet: file`

解决思路：确定该项目的springframework版本号，然后在网上查找该版本与目前的jdk版本是否兼容，如果不兼容的话，将module相关的jdk设置都要修改到所兼容的jdk版本。

1. 写个测试方法查看下当前springframework的版本号

   ```java
   @Test
   public void SpringVersionTest(){
       String version = SpringVersion.getVersion();
       System.out.println("当前使用的Spring版本是:"+version);
   }
   ```

2. 查看springframework和jdk的版本匹配关系

   ![image-20220531221744250](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220531221744250.png)

3. 由于我的springframwork的版本是5.2.6.RELEASE，无法匹配JDK16，需要在项目配置中更改JDK版本

4. 在settting中修改module的jdk版本为1.8

   ![image-20220531222100027](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220531222100027.png)

![image-20220531222141988](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220531222141988.png)

![image-20220531222216004](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220531222216004.png)

![image-20220531222329133](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220531222329133.png)

参考文章：[(56条消息) Spring Framework与JDK版本对应关系_行者无疆_ty的博客-CSDN博客_springframework版本](https://blog.csdn.net/a321123b/article/details/123568578)

[(56条消息) probably due to a new Java class file version that isn‘t supported yet_Jack魏的博客-CSDN博客](https://blog.csdn.net/WeiHao0240/article/details/109326902)

[解决方案：ASM ClassReader failed to parse class file - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/359578389)

