# SpringBoot整合JDBC的使用

# SpringBoot整合Druid资源

> Druid是阿里巴巴开源平台上一个数据库连接池实现，结合了C3P0、DBCP、PROXOOL等数据库连接池的优点，同时加入了日志监控。
>
> Druid可以很好的监控数据库池连接和SQL的执行情况，主要特点就是它的监控性。
>
> SpringBoot2.0以上默认使用Hikari数据源，也可以在SpringBoot上继承Druid数据源，实现数据库监控。

# SpringBoot整合MyBatis

# SpringSecurity

系统架构设计之前就应该考虑好系统的安全特性。

> SpringSecurity是针对Spring项目的安全框架，也是SpringBoot底层安全模块默认的技术选型，它可以实现强大的Web安全控制。通过引入spring-boot-starter-security模块，进行少量的配置，即可拥有SpringSecurity强大的安全功能。

## 相关依赖

```xml
<!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
    <version>2.5.5</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.thymeleaf.extras/thymeleaf-extras-springsecurity5 -->
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-springsecurity5</artifactId>
    <version>3.0.4.RELEASE</version>
</dependency>
```

## 定义一个继承WebSecurityConfigurerAdapter的类

### 授权:protected void configure(HttpSecurity http)

```java
    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        super.configure(http);
        //自定义访问权限设置:首页所有人可以访问，功能页只有对应有权限的人才能访问
        http.authorizeRequests().antMatchers("/").permitAll()
                .antMatchers("/level1/**").hasRole("vip1") //level1下的页面只有vip1的权限才可以访问
                .antMatchers("/level2/**").hasRole("vip2") //level2下的页面只有vip2的权限才可以访问
                .antMatchers("/level3/**").hasRole("vip3"); //level3下的页面只有vip3的权限才可以访问

        //获取权限的时候会默认跳转到默认的登录页面
//        http.formLogin();

        //定制登录页面（获取权限的页面）
        http.formLogin()
                .loginPage("/views/login.html") //自定义登录页面
                .loginProcessingUrl("/loginxxx"); //自定义的登录url

        //开启注销功能,并指定注销后跳转到的页面
//        http.logout().logoutSuccessUrl("/index");
        http.logout();

        //开启记住我功能 对应的cookie默认有两周存活期
        http.rememberMe().rememberMeParameter("remember");
    }
```

### 认证:protected void configure(AuthenticationManagerBuilder auth)

```java
//自定义认证规则
//需要对密码进行密文处理
@Override
protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication().passwordEncoder(new BCryptPasswordEncoder())
            .withUser("lucheng").password(new BCryptPasswordEncoder().encode("123456")).roles("vip2","vip3")
            .and()
            .withUser("root").password(new BCryptPasswordEncoder().encode("123456")).roles("vip1","vip2","vip3")
            .and()
            .withUser("guest").password(new BCryptPasswordEncoder().encode("123456")).roles("vip1");
}
```

## 登录页面

登录页面有两个要素，表单提交和记住登录状态，通过在表单中输入信息（一般是用户名和密码）来获取不同的权限。

### 原生登录页面

使用`http.formLogin();`SpringSecurity就会生成一个可以跳转到默认的登录页面，默认路径为/login，所有只要保证用于登录的按钮的href的路径指向/login即可。

```java
//获取权限的时候会默认跳转到默认的登录页面
http.formLogin();
```

```html
<a class="item" th:href="@{/login}">
    <i class="address card icon"></i> 登录
</a>
```

默认的登录页面如下：

![image-20220512195022683](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220512195022683.png)

在配置类中添加记住我的状态:

```java
http.rememberMe();
```

页面增加了一个checkbox

![image-20220512195237801](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220512195237801.png)

### 定制登录页面

定制页面的话首先得创建一个页面的html文件：

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>登录</title>
    <!--semantic-ui-->
    <link href="https://cdn.bootcss.com/semantic-ui/2.4.1/semantic.min.css" rel="stylesheet">
</head>
<body>

<!--主容器-->
<div class="ui container">
    <div class="ui segment">
        <div style="text-align: center">
            <h1 class="header">登录</h1>
        </div>
        <div class="ui placeholder segment">
            <div class="ui column very relaxed stackable grid">
                <div class="column">
                    <div class="ui form">
<!--                        自定义登录页面的表单提交要与配置类的loginProcessingUrl中的参数url路径一致-->
                        <form th:action="@{/loginxxx}" method="post">
                            <div class="field">
                                <label>Username</label>
                                <div class="ui left icon input">
                                    <input type="text" placeholder="Username" name="username">
                                    <i class="user icon"></i>
                                </div>
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <div class="ui left icon input">
                                    <input type="password" name="password">
                                    <i class="lock icon"></i>
                                </div>
                            </div>
                            <input type="submit" class="ui blue submit button"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div style="text-align: center">
            <div class="ui label">
                </i>注册
            </div>
            <br><br>
            <small>blog.kuangstudy.com</small>
        </div>
        <div class="ui segment" style="text-align: center">
            <h3>Spring Security Study by 秦疆</h3>
        </div>
    </div>
</div>

<script th:src="@{/qinjiang/js/jquery-3.1.1.min.js}"></script>
<script th:src="@{/qinjiang/js/semantic.min.js}"></script>
</body>
</html>
```

然后在配置类中的授权方法`protected void configure(HttpSecurity http)`中声明定制页面文件的服务器路径以及自定义的url路径。

```java
//定制登录页面（获取权限的页面）
http.formLogin()
        .loginPage("/views/login.html") //自定义登录页面
        .loginProcessingUrl("/loginxxx"); //自定义的登录url
```

> 登录页面中的表单提交的路径一定和自定义的url要一致，否则该页面无法起到授权作用。

定制的页面如果要加上记住登录状态的效果，则首先要在页面中加入一个checkbox，并使用name属性命名。

```html
                        <div class="field">
                            <input type="checkbox" name="remember">记住我
                        </div>
```

然后在配置类中声明记住我功能

```java
http.rememberMe().rememberMeParameter("remember");//开启记住我功能 对应的cookie默认有两周存活期
```

> rememberMeParameter方法中的参数名和name属性名一致。

## 注销功能

注销即表示收回当前用户的权限并退出登录，SpringSecurity中默认的注销路径是/logout，并可以在配置类中配置注销后跳转的指定页面。

```xml
<a class="item" th:href="@{/logout}">
    <i class="sign-out icon"></i> 注销
</a>
```

```java
        //开启注销功能,并指定注销后跳转到的页面
        http.logout().logoutSuccessUrl("/index");
```

