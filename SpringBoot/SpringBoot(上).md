# SpringBoot简介

> SpringBoot框架是在Spring框架的基础上，用于快速、便捷的开发新一代基于Spring框架的应用程序。SpringBoot遵循**约定大于配置**的核心思想，默认帮助我们进行了很多自动化的配置，同时SpringBoot又集成了很多常用的第三方配置（Redis、MongoDB、Jpa、RabbitMQ等等）。
>
> 一句话总结SpringBoot就是：SpringBoot将原来的多种框架整合在一起，并通过固定性的配置将多种框架的功能又能体现出来。

# SpringBoot的特点

* 快速构建一个应用，build everything
* 为所有Spring学习者提供更快的入门
* **开箱即用**，提供各种默认配置来简化项目配置
* 内嵌式容器简化Web项目
* 没有冗余代码生成和XML文件的配置要求

# SpringBoot项目组成

## pom.xml

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.6.7</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

在SpringBoot的pom.xml文件中，使用了<parent>标签继承了父工程的核心依赖，在接下来自己工程的依赖中不需指定依赖的具体版本。下面来说下pom.xml中导入依赖的具体作用：

```xml
       <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
```

`starter`就是启动器，比如sring-boot-starter-web，会帮我们导入所有web环境所需的依赖；spring-boot-starter-test，会帮我们导入有关测试所需的依赖。

## 主程序application

```java
//@SpringBootApplication标志这个类是一个springboot应用
@SpringBootApplication
public class SpringBootHelloWorldApplication {

    public static void main(String[] args) {
        //启动springboot应用
        SpringApplication.run(SpringBootHelloWorldApplication.class, args);
    }
}
```

SpringApplication这个类主要做了以下四件事情：

1. 推断应用的类型是普通的项目还是web项目
2. 查找并加载所有可用的初始化容器，设置到initializers属性中
3. 找出所有的应用程序监听器，设置到listener属性中
4. 推断并设置main方法的定义类，找到运行的主类

## 全局配置文件

SpringBoot项目中的全局配置文件有两种：application.yaml和application.properties。其中application.yml的语法结构是key: **空格** value;application.properties的语法结构：key=value。yaml的语法格式更多变更灵活，且可以通过空格缩进的方式定义层级，为不同的类型都能注入属性；properties只能采用键值对的方式。

该配置文件的作用是修改SpringBoot自动配置的默认值。

下面以案例形式介绍一下yaml配置文件的使用方法：

```yaml
person:
  name: qinjiang
  age: 3
  happy: false
  birth: 2022/05/05
  maps: {k1:v1,k2;v2}
  lists:
    - code
    - music
    - girl
  dog:
    name: 旺财
    age: 3
```

实体类为：

```java
package com.example.pojo;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
@ConfigurationProperties(prefix = "person")
public class Person {
    private String name;
    private Integer age;
    private Boolean happy;
    private Date birth;
    private Map<String,Object> maps;
    private List<Object> lists;
    private Dog dog;

    public Person() {
    }

    public Person(String name, Integer age, Boolean happy, Date birth, Map<String, Object> maps, List<Object> lists, Dog dog) {
        this.name = name;
        this.age = age;
        this.happy = happy;
        this.birth = birth;
        this.maps = maps;
        this.lists = lists;
        this.dog = dog;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getHappy() {
        return happy;
    }

    public void setHappy(Boolean happy) {
        this.happy = happy;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Map<String, Object> getMaps() {
        return maps;
    }

    public void setMaps(Map<String, Object> maps) {
        this.maps = maps;
    }

    public List<Object> getLists() {
        return lists;
    }

    public void setLists(List<Object> lists) {
        this.lists = lists;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", happy=" + happy +
                ", birth=" + birth +
                ", maps=" + maps +
                ", lists=" + lists +
                ", dog=" + dog +
                '}';
    }
}
```

在实体类中上，使用@ConfigurationProperties注解，将yaml中的值与类中的属性进行绑定。

测试类中测试：

```java
@SpringBootTest
class SpringBoot02ConfigApplicationTests {

    @Autowired
    private Person person;
    @Test
    void contextLoads() {
        System.out.println(person);
    }

}
```

```
Person{name='qinjiang', age=3, happy=false, birth=Thu May 05 00:00:00 CST 2022, maps={k1v1=, k2v2=}, lists=[code, music, girl], dog=Dog{name='旺财', age=3}}
```

通过yaml配置还可以进行SpingBoot的多套环境配置并随时切换。profile是Spring对不同环境提供不同配置功能的支持，可以通过激活不同的环境版本，实现快速切换环境。

```yaml
server:
  port: 8081
spring:
  profiles:
    active: dev
---
server:
  port: 8082
spring:
  profiles: dev
---
server:
  port: 8083
spring:
  profiles: test
```

当要使用test的生产环境时，active属性为test；当要使用dev的生产环境时，active属性为dev

## 常见注解

* `@SpringBootApplication`:标注这个类是一个SpringBoot的应用，启动类下的所有资源被导入
  * `@SpringBootConfiguration`:springboot的配置
  * `Configuration`:Spring配置类
  * `Component`:这也是一个Spring的组件
* `EnableAutoConfiguration`:自动配置
  * `AutoConfigurationPackage`:自动配置包
    * `Import(AutoConfigurationPackage.Registrar.class)`:自动配置包注册
  * `Import(AutoConfigurationImportSelector.class)`:自动配置导入选择

## SpringBoot的自动装配--为什么SpringBoot不需要配置依赖和xml了？

SpringBoot的所有自动配置都是在启动的时候扫描并加载：`spring.factories`所有的自动配置类都在里面，但是不一定生效，要判断条件是否成立，只要导入了对应的start，就有对应的启动器了，有了启动器，我们的自动装配就会生效，从而配置成功。

1. springboot在启动的时候，从类路径下/META-INF/spring.factories获取指定的值
2. 将这些自动配置的类导入容器，自动配置就会生效，进行自动配置
3. 关于解决方案和自动配置的东西都在spring-boot-autoconfigure-2.2.0.RELEASE.jar这个包下
4. 把所有需要导入的组件，以类名的方式返回，这些组件就会被添加到容器
5. 容器中也会存在非常多的xxxAutoConfiguration的文件(@Bean)，就是这些类给容器中导入了这个场景需要的所有组件，并自动配置。![自动装配原理分析](https://gitee.com/lulununuhuhu/img/raw/master/img/202205061510581.png)



# SpringBoot的自动装配

1. SpringBoot启动会加载大量的自动配置类
2. 我们看我们需要的功能有没有在SpringBoot默认写好的自动配置类当中
3. 我们再来看这个自动配置类中到底配置了哪些组件；如果我们要用的组件存在其中，我们就不需要再手动配置
4. 给容器中自动配置类添加组件的时候，会从properties类中获取某些属性。我们只需要再配置文件中指定这些属性的值即可
5. xxxAutoConfiguration:自动配置类，给容器中添加组件；xxxPropertites:封装配置文件中相关属性

# SpringBoot Web开发

在SpringBoot开发中，常见的开发过程包括

* 导入静态资源
* 首页
* 模板引擎Thymeleaf
* 装配扩展SpringMVC
* 增删改查
* 拦截器
* 国际化

## 静态资源导入

关于静态资源的导入设置，源码体现在WebMvcAutoConfiguration类中的addResourceHandlers方法中。

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
   if (!this.resourceProperties.isAddMappings()) {
      logger.debug("Default resource handling disabled");
      return;
   }
   addResourceHandler(registry, "/webjars/**", "classpath:/META-INF/resources/webjars/");
   addResourceHandler(registry, this.mvcProperties.getStaticPathPattern(), (registration) -> {
      registration.addResourceLocations(this.resourceProperties.getStaticLocations());
      if (this.servletContext != null) {
         ServletContextResource resource = new ServletContextResource(this.servletContext, SERVLET_LOCATION);
         registration.addResourceLocations(resource);
      }
   });
}
```

静态资源除了可以存放在自动生成的static目录下，还可以存放在resources目录下的public目录、resources目录以及在jar包中的META-INF/resources目录下。创建的资源是以原路径/资源名的方法访问的。

其中不同文件夹的静态资源有访问优先级，为resources>static(默认)>public。

## 首页定制

首页的名称必须是index.html，同样可以放在static、resources、public目录下，通过根路径即可打开index.html。

## Thymeleaf模板引擎

```java
private static final Charset DEFAULT_ENCODING = StandardCharsets.UTF_8;
public static final String DEFAULT_PREFIX = "classpath:/templates/";
public static final String DEFAULT_SUFFIX = ".html";
```

导入依赖：

```xml
<!--        Spring和Thymeleaf整合包-->
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring5</artifactId>
    <version>3.0.12.RELEASE</version>
</dependency>
```

Thymeleaf在SpringBoot中必须放在templates目录下，且后缀是html。通过Controller方法的@RequetsMapping进行视图解析并返回视图名称。

一些thymeleaf的基本用法：

```java
@Controller
public class indexController {
    @RequestMapping("/test")
    public String test(Model model){
        model.addAttribute("msg","<h1>this is from thymeleaf</h1>");
        model.addAttribute("list", Arrays.asList("lucheng","star"));
        return "test";
    }
}
```

```xml
<h1>测试</h1>
<h1 th:text="${msg}"></h1><!-- th:text特殊字符不转义-->
<h1 th:utext="${msg}"></h1><!--th:utext 对特殊字符转义-->

<div th:each="item:${list}" th:text="${item}">
</div>
```

## 国际化

1. 创建一个internationalization包存放国际化的配置文件，写入login.properties、login_en_US.properties、login_zh_CN.properties，分别表示中文的语言文件和英文的语言文件。其中login.properties表示当前使用的语言文件配置。

   ```properties
   #当前使用的配置文件
   login.btn=登录
   login.tip=还不是会员?
   login.remember=记住我
   login.username=用户名
   login.password=密码
   login.tip2=忘记密码
   ```

   ```properties
   #英文的配置文件
   login.btn=log in
   login.tip=Not a member yet?
   login.remember=Remember me
   login.username=Username
   login.password=Password
   login.tip2=Forget password
   ```

   ```properties
   # 中文的配置文件
   login.btn=登录
   login.tip=还不是会员?
   login.remember=记住我
   login.username=用户名
   login.password=密码
   ```

 2. 使用#{}解析配置文件中的值

    ```xml
    <input type="checkbox" th:value="#{login.remember}" th:text="#{login.remember}">
    <span class="pull-right">
        <a data-toggle="modal" href="#myModal" th:text="#{login.tip2}"></a>
    </span>
    ```

 3. html中的href标签中加入请求关于语言的请求参数

    ```html
    <a class="btn btn-sm" th:href="@{/index.html(l='zh_CN')}">中文</a>
    <a class="btn btn-sm" th:href="@{/index.html(l='en_US')}">English</a>
    ```

 4. 定义国际化组件，该组件实现LocaleResolver接口，解析请求参数

    ```java
    public class MyLocalResolver implements LocaleResolver {
        //解析请求
        @Override
        public Locale resolveLocale(HttpServletRequest request) {
            //获取url请求中的国际化参数
            String language = request.getParameter("l");
    
            Locale locale = Locale.getDefault();//如果没有就使用默认的
    
            //如果请求的链接携带了国际化的参数,解析出来并加入到Locale对象中
            if(!StringUtils.isEmpty(language)){
                //zh_CN
                String[] strings = language.split("_");
                //国家，地区
                locale = new Locale(strings[0], strings[1]);
            }
            return locale;
        }
    
        @Override
        public void setLocale(HttpServletRequest request, HttpServletResponse response, Locale locale) {
    
        }
    }
    ```

5. 在配置中使用@bean将自己写的组件配置到spring容器中

  ```java
  //使自定义的国际化组件生效,使用@Bean将对象放到spring容器进行管理
  @Bean
  public LocaleResolver localeResolver(){
   return new MyLocalResolver();
  }


  ```

