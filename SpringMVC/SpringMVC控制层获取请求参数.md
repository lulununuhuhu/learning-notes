# SpringMVC获取请求参数

## 1.通过获取servletAPI获取

将HttpServletRequest作为控制器方法的形参，此时HttpServletRequest类型的参数表示封装了当前请求的请求报文的对象。

```xml
<a th:href="@{/hello/testServlet(username='admin',password='123456')}">访问测试servlet的API页面</a>
```

```java
@Controller
@RequestMapping("/hello")
public class RequestMappingController {
    @RequestMapping("/testServlet")
    public String testServlet(HttpServletRequest request){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println("username:"+username+"password:"+password);
        return "testServlet";
    }    
}

```

## 2.通过控制器方法的形参获取请求参数

```xml
<form th:action="@{/hello/testParam}" method="get">
    用户名:<input type="text" name="username"><br>
    密码:<input type="password" name="password"><br>
    爱好:<input type="checkbox" name="hobby" value="a">a
        <input type="checkbox" name="hobby" value="b">b
        <input type="checkbox" name="hobby" value="c">c<br>
        <input type="submit" value="测试使用控制器的形参获取请求参数">
</form>
```

```java
@Controller
@RequestMapping("/hello")
public class RequestMappingController {
	@RequestMapping("/testParam")
    public String testParam(String username,String password,String hobby){
        System.out.println("username:"+username+"password:"+password+"hobby:"+hobby);
        return "testParam";
    }
}
```

## 3.@RequestParam

在浏览器请求中的参数与控制器方法的形参不同的情况下，可以使用@RequestParam修饰控制器方法的形参建立起映射关系。

@RequestParam有三个属性:

value:表示待建立映射关系的请求参数名

required:表示该请求参数是否必须，如果设置required=true，没有在浏览器设置该请求参数的值且没有设置defaultValue参数的情况下，会报400异常。

defaultValue:设定该请求参数的默认初始值

```java
@RequestMapping("/testParam")
public String testParam(
        //required属性表示是否强制要求传送
        //defaultValue属性表示传输请求参数的默认值，在没有指定user_name请求参数的情况下默认是"hehe"
         @RequestParam(value = "user_name", required = false,defaultValue = "hehe")String username,String password, String[] hobby){
    System.out.println("username:"+username+"password:"+password+"hobby:"+ Arrays.toString(hobby));
    return "testParam";
}
```

## 4. @RequestHeader

@RequestHeader是将**请求头信息**和控制器方法形参创建映射关系。

@RequestHeader的属性和用法和@RequestParam相同。

```java
@RequestMapping("/testParam")
public String testParam(
        //required属性表示是否强制要求传送
        //defaultValue属性表示传输请求参数的默认值，在没有指定user_name请求参数的情况下默认是"hehe"
        @RequestParam(value = "user_name", required = false,defaultValue = "hehe")String username,
        String password, String[] hobby,
        @RequestHeader(value = "Host")String host)
{
    System.out.println("username:"+username+"password:"+password+"hobby:"+ Arrays.toString(hobby));
    System.out.println("host:"+host);
    return "testParam";
}
```

## 5. @ReuqestBody



## 5.@PathVariable

将url中的请求变量映射到控制器方法的形参中

```java
@RequestMapping(value="/users/{userId}/topics/{topicId}")  
public String test(  
       @PathVariable(value="userId") int userId,   
       @PathVariable(value="topicId") int topicId)
```

{userId}的值与形参中的userId绑定，{topicId}的值与形参中的topicId绑定。

## 5.@CookieValue

@CookieValue是将请求信息中的Cookie数据与控制器方法的形参建立起映射关系。

```java
@RequestMapping("/testParam")
public String testParam(
        //required属性表示是否强制要求传送
        //defaultValue属性表示传输请求参数的默认值，在没有指定user_name请求参数的情况下默认是"hehe"
        @RequestParam(value = "user_name", required = false,defaultValue = "hehe")String username,
        String password, String[] hobby,
        @RequestHeader(value = "Host")String host,
        @CookieValue(value = "JSESSIONID") String JSESSIONID
)
{
    System.out.println("username:"+username+"password:"+password+"hobby:"+ Arrays.toString(hobby));
    System.out.println("host:"+host);
    System.out.println("JSESSIONID:"+JSESSIONID);
    return "testParam";
}
```

## 6.通过POJO获取请求参数

可以在控制器方法的形参位置设置一个实体类类型的形参，此时若浏览器传输的请求参数的参数名和实体类中的属性名一致，那么请求参数就会为此属性赋值。

```xml
<form th:action="@{/hello/testBean}" method="get">
    用户名:<input type="text" name="username"><br>
    密码:<input type="password" name="password"><br>
    年龄:<input type="text" name="age"><br>
    性别:<input type="radio" name="sex" value="男">男
        <input type="radio" name="sex" value="女">女<br>
    邮箱:<input type="text" name="email"><br>
    <input type="submit" value="测试使用通过pojo获取请求参数">
</form>
```

创建一个bean实体类，属性与请求参数名对应。

```java
public class User {
    private Integer id;
    private String username;
    private String password;
    private Integer age;
    private String sex;
    private String email;

    public User() {
    }
    public User(Integer id, String username, String password, Integer age, String sex, String email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.age = age;
        this.sex = sex;
        this.email = email;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```

```java
@Controller
@RequestMapping("/hello")
public class RequestMappingController {
    @RequestMapping("/testBean")
    public String testParam(User user){
        System.out.println(user);
        return "success";
    }
}
```

## 7.解决获取请求参数的乱码问题

当表单元素的请求方式是post时，如果请求参数中有中文的话，控制器方法接收到的中文参数会有乱码。需要在web.xml中提前定义一个过滤器，并对编码设置进行初始化。

```xml
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
        <param-name>forceResponseEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

