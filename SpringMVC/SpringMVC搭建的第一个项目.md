[TOC]

## SpringMVC搭建的第一个项目

相关环境：MAVEN 3.8.3       TOMCAT 8.5.78

1. 新建一个MAVEN工程项目，在pom.xml中导入相关依赖

   ```xml
   <dependencies>
           <dependency>
               <groupId>org.springframework</groupId>
               <artifactId>spring-webmvc</artifactId>
               <version>5.3.1</version>
           </dependency>
   
   <!--        日志-->
           <dependency>
               <groupId>ch.qos.logback</groupId>
               <artifactId>logback-classic</artifactId>
               <version>1.2.3</version>
           </dependency>
   <!--Servlet的API-->
           <dependency>
               <groupId>javax.servlet</groupId>
               <artifactId>javax.servlet-api</artifactId>
               <version>3.1.0</version>
               <scope>provided</scope>
           </dependency>
   <!--        Spring和Thymeleaf整合包-->
           <dependency>
               <groupId>org.thymeleaf</groupId>
               <artifactId>thymeleaf-spring5</artifactId>
               <version>3.0.12.RELEASE</version>
           </dependency>
       </dependencies>
   ```

2. 由于创建的是web项目，需要在pom.xml指明打包方式是war包

   ```xml
   <packaging>war</packaging>
   ```

3. 在maven项目架构的基础上手动添加webapp的目录，并在子目录下添加WEB-INF和web.xml文件,文件架构如下

   ![image-20220414161550174](https://gitee.com/lulununuhuhu/img/raw/master/img/202204141615417.png)

4. 配置web.xml

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0">
   
   <!--    配置SpringMVC的前端控制器，对浏览器发送的请求进行统一处理-->
       <servlet>
           <servlet-name>SpringMVC</servlet-name>
           <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
   
   <!--        配置SpringMVC配置文件的位置和名称-->
           <init-param>
               <param-name>contextConfigLocation</param-name>
               <param-value>classpath:springMVC.xml</param-value>
           </init-param>
   <!--        将前端控制器的初始化时间提前到服务器启动时-->
           <load-on-startup>1</load-on-startup>
       </servlet>
   
       <servlet-mapping>
           <servlet-name>SpringMVC</servlet-name>
   <!--        /所能匹配的请求可以是/login或.html或.js或.css方式的请求路径,但是/不能匹配.jsp请求路径的请求-->
           <url-pattern>/</url-pattern>
       </servlet-mapping>
   </web-app>
   ```

5. 在resource中的springMVC.xml中配置组件扫描器和Thymeleaf视图解析器

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                              http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
   
   <!--    扫描组件-->
           <context:component-scan base-package="controller"></context:component-scan>
   
   <!--    配置Thymeleaf视图解析器-->
       <bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
           <property name="order" value="1"/>
           <property name="characterEncoding" value="UTF-8"/>
           <property name="templateEngine">
               <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
                   <property name="templateResolver">
                       <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
   <!--                        视图前缀-->
                           <property name="prefix" value="/WEB-INF/templates/"/>
   <!--                        视图后缀-->
                           <property name="suffix" value=".html"/>
                           <property name="templateMode" value="HTML5"/>
                           <property name="characterEncoding" value="UTF-8"/>
                       </bean>
                   </property>
               </bean>
           </property>
       </bean>
   </beans>
   ```

6. 创建控制器并使用注解配置request映射,返回视图名称

   ```java
   package controller;
   
   import org.springframework.stereotype.Controller;
   import org.springframework.web.bind.annotation.RequestMapping;
   
   @Controller
   public class HelloController {
   
       @RequestMapping(value = "/")
       public String index(){
           //返回视图名称
           return "index";
       }
   
       @RequestMapping(value = "/target")
       public String toTarget(){
           return "target";
       }
   }
   ```

7. 在html中声明相关标签

   ```html
   <!DOCTYPE html>
   <html lang="en" xmlns:th="http://www.thymeleaf.org">
   <head>
       <meta charset="UTF-8">
       <title>首页</title>
   </head>
   <body>
   <h1>首页</h1>
   <!--使用Thymeleaf自动填充上下文路径-->
   <a th:href="@{/target}">访问目标页面target.html</a>
   </body>
   </html>
   
   
   <!DOCTYPE html>
   <html lang="en" xmlns:th="http://www.thymeleaf.org">
   <head>
       <meta charset="UTF-8">
       <title>SpringMVC</title>
   </head>
   <body>
   <h1>你好，这里是SpringMVC</h1>
   </body>
   </html>
   ```

### 运行效果

初始运行index.html

![image-20220414163050531](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220414163050531.png)

点击超链接后，重定向到target.html

![image-20220414163205907](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220414163205907.png)

### 总结

> 整个项目的运行流程就是浏览器发送请求，若请求地址符合前端控制器的url-pattern，该请求就会被前端控制器DispatcherService处理。前端控制器就会读取SpringMVC的核心配置文件，通过扫描组件找到控制器，将请求地址和控制器中@RequestMapping注解的value属性值进行匹配，若匹配成功，该注解所标识的控制器方法就是处理请求的方法。处理请求的方法需要返回一个字符串类型的视图名称，该视图名称会被视图解析器解析，加上前缀和后缀组成视图的路径，通过Thymeleaf对视图进行渲染，最终转发到视图所对应的页面。