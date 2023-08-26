[TOC]

## Javaweb

> JavaWeb是用java技术来解决相关互联网领域的技术栈。web包括web服务器和web客户端两种。
>
> B/S架构：Browser/Server架构，浏览器/服务器架构模式。B/S架构的特点是客户端只需要浏览器、应用程序的逻辑和数据都存储在服务器端。浏览器只需要请求服务器获得Web资源，服务器把Web资源发送给浏览器即可。优点：易于维护升级：服务端升级后，客户端无须任何部署就可以使用新的版本。
>

### JavaWeb技术栈

![image-20211122154748214](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211122154748214.png)

​																		JavaWeb技术框架

## HTTP

### 概念

> HTTP:HyperText Transfer Protocol:超文本传输协议，定义了浏览器和服务器之间传输数据的规则。

### HTTP协议特点

1. 基于TCP协议：面向连接，安全
2. 基于请求-响应模型的：一次请求对应一次响应
3. HTTP协议是无状态的协议，对于上一次的事务处理没有记忆能力，每次请求都是独立的。在Javaweb中，使用Session和Cookie来解决这个问题。

### HTTP请求数据格式

HTTP请求数据分为3部分：

1. 请求行：有显示get还是post方法，显示请求资源路径，显示HTTP协议版本

2. 请求头：

   ![image-20211122161525961](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211122161525961.png)

   常见的HTTP请求头如：

   * Host：表示请求的主机名
   * User-Agent:浏览器版本号，我使用的浏览器是`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 Edg/95.0.1020.53`
   * Accept:表示浏览器能接受的资源类型：如**text/* ,image/**分别表示能接受文本和图片类习惯的资源。

3. 请求体：post最后一部分，如果是post方法的话，存放请求参数

### GET请求和POST请求的区别

| 请求方式 | 请求参数位置 | 请求url特点      | 请求参数大小限制 |
| -------- | ------------ | ---------------- | ---------------- |
| GET      | 请求行       | 包含请求参数数据 | 有限制           |
| POST     | 请求体       | 隐藏请求参数数据 | 无限制           |

### HTTP响应数据格式

响应数据包含3部分：

1. 响应行：响应数据的第一行。

2. 响应头：第二行开始，格式为key：value形式

   常见的HTTP响应头有：

   * Content-Type:表示该响应内容的类型，例如text/html,image/jpeg
   * Content-Length:表示该响应内容的长度（字节数）
   * Content-Encoding:表示该响应的压缩算法
   * Cache-Control:只是客户端应如何缓存，例如max-age=300，表示最多缓存300秒

3. 响应体：最后一部分，存储响应数据

### 状态码大类

| 状态码分类 | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| 1xx        | **响应中**——临时状态码，表示请求已经接受，告诉客户端应该继续请求或者如果它已经完成则忽略它 |
| 2xx        | **成功**——表示请求已经被成功接收，处理已完成                 |
| 3xx        | **重定向**——重定向到其它地方：它让客户端再发起一个请求以完成整个处理。 |
| 4xx        | **客户端错误**——处理发生错误，责任在客户端，如：客户端的请求一个不存在的资源，客户端未被授权，禁止访问等 |
| 5xx        | **服务器端错误**——处理发生错误，责任在服务端，如：服务端抛出异常，路由出错，HTTP版本不支持等 |

状态码大全：https://cloud.tencent.com/developer/chapter/13553 

### 常见的响应状态码

| 状态码 | 英文描述                               | 解释                                                         |
| ------ | -------------------------------------- | ------------------------------------------------------------ |
| 200    | **`OK`**                               | 客户端请求成功，即**处理成功**，这是我们最想看到的状态码     |
| 302    | **`Found`**                            | 指示所请求的资源已移动到由`Location`响应头给定的 URL，浏览器会自动重新访问到这个页面 |
| 304    | **`Not Modified`**                     | 告诉客户端，你请求的资源至上次取得后，服务端并未更改，你直接用你本地缓存吧。隐式重定向 |
| 400    | **`Bad Request`**                      | 客户端请求有**语法错误**，不能被服务器所理解                 |
| 403    | **`Forbidden`**                        | 服务器收到请求，但是**拒绝提供服务**，比如：没有权限访问相关资源 |
| 404    | **`Not Found`**                        | **请求资源不存在**，一般是URL输入有误，或者网站资源被删除了  |
| 428    | **`Precondition Required`**            | **服务器要求有条件的请求**，告诉客户端要想访问该资源，必须携带特定的请求头 |
| 429    | **`Too Many Requests`**                | **太多请求**，可以限制客户端请求某个资源的数量，配合 Retry-After(多长时间后可以请求)响应头一起使用 |
| 431    | **` Request Header Fields Too Large`** | **请求头太大**，服务器不愿意处理请求，因为它的头部字段太大。请求可以在减少请求头域的大小后重新提交。 |
| 405    | **`Method Not Allowed`**               | 请求方式有误，比如应该用GET请求方式的资源，用了POST          |
| 500    | **`Internal Server Error`**            | **服务器发生不可预期的错误**。服务器出异常了，赶紧看日志去吧 |
| 503    | **`Service Unavailable`**              | **服务器尚未准备好处理请求**，服务器刚刚启动，还未初始化好   |
| 511    | **`Network Authentication Required`**  | **客户端需要进行身份验证才能获得网络访问权限**               |

## Tomcat

> Web服务器是一类应用程序，该种程序可以对HTTP协议的操作进行封装，使得程序员不必直接对协议打交道。Tomcat是目前全世界最流行的一种开源Web服务器。支持Servlet/JSP和少量[^JavaEE]规范。Tomcat也被称为Web容器，Servlet容器。Servlet必须依赖于Tomcat才能够运行。

[^JavaEE]: Java Enterprise Edition，java企业版。指Java企业级开发的技术规范总和。包含13项技术规范：JDBC、JDNI、EJB、RMI、JSP、Servlet、XML、JMS、Java IDL、JTS、JTA、JavaMail、JAF

###  Tomcat部署

> 将[^项目]放置到webapps目录下，即可部署完成。

[^项目]: 一般JavaWeb项目会被打包成war包，然后将war包放到webapps目录下，Tomcat会自动解压缩war文件

### Tomcat-Web项目结构

Web项目结构：

![image-20211124103812727](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211124103812727.png)

经过打包后可部署的JavaWeb项目结构：

![image-20211124103854011](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211124103854011.png)

* 编译后的java字节码文件和resources的资源文件，放到WEB-INF下的classes目录下
* pom.xml中依赖坐标对应的jar包，放入WEB-INF下的lib目录下

### 使用IDEA创建Maven-Web项目

一、使用骨架

![image-20211124105503860](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211124105503860.png)

二、不使用骨架

1. 选择Maven进行创建项目
2. 在生成的pom.xml中添加打包方式为war
3. 并按以下目录结构进行补齐

![image-20211124110746329](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211124110746329.png)

​	依次添加webapp目录，WEB-INF，和web.xml文件，其中web.xml文件内容是

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
</web-app>
```

## IDEA中使用tomcat

目前为止，我们需要使用tomcat服务打开本地项目，需要在项目中生成war包，然后将war包扔到tomcat的webapp目录中，然后打开tomcat服务startup.bat，再在浏览器中根据war的路径填写url。这样的步骤很繁琐，尤其在web项目编写中，经常要看下实时效果，进行调试。所以idea支持将tomcat集成到本地项目中去，将上述的步骤省略掉。

### 方式一：将tomcat集成到本地IDEA

由于我使用的是社区版，所以本身没有集成tomcat，所以准备通过插件的方式集成到idea社区版中，其中插件用的是SmartTomcat。(配置完成后运行始终有问题，最终没成)

### 方式二：使用Tomcat中的Maven插件

1. 在pom.xml中添加插件：

```xml
<!--            tomcat插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.2</version>
            </plugin>
```

2. 刷新pom添加插件成功后，右击module-->RUN Maven-->Tomcat7：run。

![image-20211124145019889](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211124145019889.png)

出现以下信息，即表示运行成功，并且可直接点击蓝色连接：进行访问最新生成的war包文件。http://localhost:8080/war包名/文件名

3. 可以在插件中添加配置信息，使得每次访问变得更方便，在pom.xml中加入如下配置信息:

   ```xml
                   <configuration>
   <!--                    默认端口号-->
                       <port>8080</port>
   <!--                    默认项目访问路径-->
                       <path>/</path>
                   </configuration>
   ```

即可在链接中省略端口号和war包名，直接加上文件名即可，即http://localhost/文件名，即可.

![image-20211124145840412](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211124145840412.png)

## Servlet

### Request对象

#### Request体系结构

![image-20211126160156552](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211126160156552.png)

1. Tomcat需要解析请求数据，封装为request对象，并且创建request对象传递到service方法中
2. 使用request对象，查阅JavaEE API文档的HttpServletRequest接口

#### Request获取请求数据

请求数据分为3部分：

1. 请求行   例：GET/request-demo/req1?username=zhangsan HTTP/1.1
   * String getMethod():获取请求方式：GET
   * String getContextPath():获取虚拟目录(项目访问路径)：/request-demo
   * StringBuffer getRequestURL():获取URL(统一资源定位符):http://localhost:8080/request-demo/req1
   * String getRequestURI():获取URI(获取统一资源标识符)：/request-demo/req1
   * String getQueryString():获取（GET方式）请求参数：username=zhangsan&password=123

2. 请求头：
   * String getHeader(String name):根据请求头名称，获取值
3. 请求体：对于以post方式的请求参数获取的位置
   * ServletInputStream getInputStream():获取字节输入流
   * BufferedReader getRead():获取字符输入流

#### Request通用方式获取请求参数

由于不同的请求方式在底层使用不同的方法获取请求参数，GET使用的是getQueryString()方法，而POST方法使用的是文件流的方式读取，需要通过不同的判断进行的处理逻辑。

在Request对象中有**通用方法对两种方式都可以获取请求参数**

* Map<String,String[]> getParameterMap():获取所有参数的map集合(其中key是String型，value是String[]类型)
* String[] getParameterValue(String name):获取name参数的值,可能有多个值，所以以String数组方式返回
* String getParameter(String name):根据名称获取参数值

```java
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");//解决post方式下的中文乱码问题,get请求方式无法解决
        //get是通过getQueryString()方法，默认使用的是tomcat的ISO-8859-1解码，而http对中文的编码是UFT-8
        Map<String, String[]> parameterMap = req.getParameterMap();//获取请求参数的map集合
        for (String key: parameterMap.keySet()) {
            System.out.print(key+":");
            String[] strings = parameterMap.get(key);
            for (String s: strings) {
                //适用于get和post方式下的解决中文编解码不一致的问题
                s = new String(s.getBytes(StandardCharsets.ISO_8859_1),StandardCharsets.UTF_8);
                System.out.print(s+";");
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);//doPost的处理方式和doGet方式相同了
    }
```

#### Request请求转发

> 请求转发（forward）：一种在服务器内部的资源跳转方式。

![image-20211127145019497](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211127145019497.png)

 Servlet实现方式：

​	`req.getRequestDispatcher("资源B路径").forward(req,resp)`

通过请求转发资源，可以实现在不同servlet对象中共享数据。其中设置资源数据的方式由：

* `void setAttribute(String name,Object o)`:存储数据到request域中
* `Object getAttribute(String name)`:根据key，获取值
* `void removwAttribute(String name)`:根据key，删除该键值对

请求转发的特点：

* 浏览器在转发到另一个servlet对象后，浏览器的url路径不会改变
* 只能转发到当前服务器的**内部资源**
* **一次请求**，可以在转发的资源中使用request共享数据

### Response对象

> Response对象是用来设置响应数据的。

体系结构：

![image-20211127160713424](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211127160713424.png)

#### Response设置响应数据功能介绍

响应数据可以分为3部分：

* 响应行：（HTTP/1.1 200 OK）

 `void setStatus(int is)`:设置响应状态码

* 响应头: (Content-Type:text/html)

`void setHeader(String name,String value)`:设置响应头键值对

* 响应体：(具体的响应内容如一些html标签元素)

`PrintWriter getWriter()`:获取字符输出流

`ServletOutputStream getOutputStream()`:获取字节输出流

#### Response完成重定向

> 重定向是另外一种资源跳转方式。

![image-20211127161232950](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211127161232950.png)

实现方法:

​	`resp.setStatus(302);`

​	`resp.setHeader("location","资源B的路径")`

重定向特点：

* 浏览器地址栏路径在重定向后会**改变**
* 可以重定向到**任意位置的资源**（服务器内外部均可）

* 两次请求，不能在多个资源使用request共享数据

#### 目录问题

由于在重定位和申明Servlet对象位置时，有时需要再添加上虚拟目录的信息（一般在和浏览器端交互时要告诉浏览器虚拟目录，也可在导入依赖时进行配置），目前采取的都是直接写死目录的方式，不利于后期维护。可以使用getContextPath()方法动态获取虚拟目录。

#### 响应字符数据

基本步骤：

1. 通过Response对象获取字符输出流	

​	`PrintWriter writer = resp.getWriter();`

2. 写数据

​	`writer.writer("aaa")`

3. 设置浏览器解析字符数据的解码方式，以及使用html解析引擎

​	`resp.setContentType("text/html;charset=utf-8")`

注：该输出流不需要关闭，因为随着响应结束，response对象销毁，由服务器自动关闭。

#### 响应字节数据

基本步骤：

1. 通过Response对象获取字符输出流

​	`ServletOutputStream os = resp.getOutputStream()`

2. 写数据

​	`os.write(字节数据)`

```java
//1.获取文件字节流
FileInputStream fis = new FileInputStream("C:\\Users\\wwwlu\\Pictures\\Camera Roll\\girl.jpg");
//2.获取response的字节输出流
ServletOutputStream os = resp.getOutputStream();
//3.将字节流copy到输出流中去
byte[] buff = new byte[1024];
int len = 0;
while ((len=fis.read(buff))!=-1){
    os.write(buff,0,len);
}
fis.close();
```

简化步骤：

导入依赖commons-io，使用依赖中的IOUtils.copy方法

```xml
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.6</version>
</dependency>
```

```java
  FileInputStream fis = new FileInputStream("C:\\Users\\wwwlu\\Pictures\\Camera Roll\\girl.jpg");
  ServletOutputStream os = resp.getOutputStream();
  IOUtils.copy(fis,os);
  fis.close();
```

### 案例 :用户登录和注册

用户登录
1. 用户填写用户名密码，提交到LoginServlet
2. 在LoginServlet中使用MyBatis查询数据库，验证用户名密码是否正确
3. 如果正确，响应“登录成功”，如果错误，响应登录失败

![image-20211212200447065](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212200447065.png)

​																	登录和注册的时序图

具体步骤：

 1. 按照创建web项目的流程进行项目创建tomcat的web项目。[创建web项目](#使用IDEA创建Maven-Web项目)
 2. 将登录注册有关的html、css等文件放入到webapp目录中
 3. 开始配置mybatis，具体配置过程见[mybatis配置案例](D:/学习笔记/MyBatis/Mybatis)
 4. 创建处理登录信息的servlet对象loginServlet文件，将login.html中的action对象定向到该文件
 5. 在loginServlet中创建loginServlet类，继承自HttpServlet类并重写doGet和doPost方法
```java
@WebServlet("/loginServlet")
public class loginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        User user1 = new User(username,password);
        //调用mybatis完成查询
        String resources = "mybatis-config.xml";
            //1.获取SqlSessionFactory对象
        InputStream resourceAsStream = Resources.getResourceAsStream(resources);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
            //2.获取SqlSession对象
        SqlSession sqlSession = sqlSessionFactory.openSession();
            //3.获取mapper对象
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
            //4.利用mapper对象调用方法
        User user = mapper.select(user1);
            //5.关闭SqlSession对象
        sqlSession.close();
        //获取字符输出流，并设置输出编码格式
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter writer = resp.getWriter();
        //判断是否为空
        if(user != null){
            writer.write("登录成功!");
        }else{
            writer.write("登录失败!");
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}
```

用户注册

1. 用户填写用户名、密码等信息，点击注册按钮，提交到RegisterServlet
2. 在RegisterServlet中使用Mybatis保存数据
3. 保存前，需要判断用户名是否已经存在：根据用户名查询数据库

## JSP

> 全称Java Server Pages,Java服务端页面。是一种动态的网页技术，其中既可以定义HTML、JS、CSS等静态内容，还可以定义Java代码的动态内容。可以说JSP=HTML+Java。可以简化开发，避免在servlet中写html标签。
>
> **JSP本质上就是一个Servlet**
>
> JSP在被访问时，由JSP容器(Tomcat)将其转换为Java文件(Servlet)，再由JSP容器(Tomcat)将其编译，最终对外提供服务的其实就是这个编译出来的字节码文件。

![image-20211127180700640](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211127180700640.png)

![image-20211130104819243](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211130104819243.png)

### JSP快速入门

1. 导入JSP坐标
2. 创建JSP文件
3. 编写HTML标签和Java代码

### JSP脚本

> JSP脚本用于早JSP页面内定义Java代码。

JSP脚本分类：

1. <%...%>:内容会直接放到_jspService()方法之中
2. <%=...%>:内容会放到out.print()中，作为out.print()的参数
3. <%!...%>:内容会放到_jspService()方法之外，被类直接包含

### JSP缺点

由于JSP页面内，既可以定义HTML页面又可以写Java，会造成以下问题：

1. 书写麻烦：特别是复杂的页面
2. 阅读麻烦
3. 复杂度高：运行需要依赖于各种环境：JRE、JSP容器、JavaEE
4. 占内存和磁盘：JSP自动生成.java和.class文件占磁盘，运行的是.class文件占内存
5. 调试困难：出错后需要找到自动生成的Java文件进行测试

现在jsp已被HTML和AJAX（异步的JavaScript）取代。

### EL表达式

> Expression Language 表达式语言，用于简化JSP页面内的Java代码。

主要功能：获取数据

#### 语法

`${expression}`:获取域中存储的key为expression的数据

JavaWeb中的四大域对象：

1. page：当前页面有效
2. request:当前请求有效
3. session：当前会话有效
4. application：当前应用有效

el表达式获取数据，会依次从这4个域中寻找，直到找到为止。

## MVC和三层架构

###  MVC

MVC是一种分层开发的模式，其中

* M：Model，业务模型，负责业务逻辑的处理
* V：View，视图，进行界面展示
* C：Controller，控制器，处理请求，调用模型和视图

![image-20211201133440565](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211201133440565.png)

### 三层架构

![image-20211201134005109](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211201134005109.png)

* 数据访问层：对数据库进行基本的CRUD操作
* 业务逻辑层：对业务逻辑进行封装，组合数据访问层中基本功能，形成复杂的业务逻辑功能
* 表现层：接受请求，封装数据；调用业务逻辑层，返回响应数据

### 案例：品牌信息展示

基本实现功能：完成一个可以查询品牌数据库信息并以图表形式在浏览器页面上展示出来的页面，并且能在页面上对品牌信息实现增删改查并同步到数据库中。其中tomcat作为web服务器，servlet处理用户请求逻辑，使用mybatis对数据库进行操作。

![image-20211212201738753](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212201738753.png)

![image-20211212204900185](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212204900185.png)

​														 			Brand项目结构

## 会话跟踪技术

> 用户打开浏览器，访问web服务器的资源，就会建立会话。会话一直持续到一方断开连接。在一次会话中，可以包含多次请求和响应。

会话跟踪：一种维护浏览器状态的方法，服务器需要识别多次请求是否来自于同一浏览器，以便在**同一个会话**的多次请求间**<u>共享数据</u>**。

由于HTTP协议是**无状态**的，每次浏览器向服务器请求时，服务器都会将请求视为新的请求，所以在协议层面是实现同一个会话之间的数据共享的。

实现会话数据共享的方式有两种：

* 客户端会话跟踪技术：Cookie
* 服务端会话跟踪技术：Session

### Cookie

#### Cookie的基本使用

> Cookie:客户端会话技术，将数据保存到客户端，以后每次请求都携带Cookie数据进行访问

在浏览器端第一次发出请求时，服务器端会在发出响应前创建一个cookie，并设置好对应的数据(还可以设置cookie的属性如存活时间等)，然后附加到响应请求中返回给浏览器端；浏览器端接收到cookie将cookie数据保存在本地；当同一个会话再次发出请求时，会携带cookie进行访问。

发送cookie

1. 创建Cookie对象，设置数据

   ```java
   Cookie cookie = new Cookie("username",value);
   ```

2. 发送Cookie到客户端：使用response对象

   ```java
   resp.addCookie(cookie);
   ```

获取cookie

1. 获取浏览器端所有的cookie数组

   ```java
   Cookie[] cookies = req.getCookies();
   ```

2. 遍历数组，找到指定的cookie对象

3. 使用cookie对象方法获取对应的值

      ```java
      for(Cookie cookie:cookies){
          String name = cookie.getName();
          if("username".equals(name)){
              String value = cookie.getValue();
              value = URLDecoder.decode(value,"utf-8");
              System.out.println(name+":"+value);
              break;
          }
      }
      ```

#### Cookie的原理&细节

Cookie使用细节：

* Cookie存活时间：默认情况下，Cookie存储在浏览器内存中，当浏览器关闭，内存释放，则Cookie也被销毁。可以通过`setMaxAge(int seconds)`:设置Cookie存活时间.
  1. 正数：将Cookie写入浏览器所在的电脑磁盘，持久化存储，到时间自动删除
  2. 负数：默认值，Cookie在当前浏览器内存中，当浏览器关闭时或者浏览关闭对话时，则Cookie被销毁
  3. 零：删除对应Cookie

* Cookie使用中文：tomcat8之前Cookie不支持直接存储中文,设置前需用utf-8进行编码，在获取cookie后需要用utf-8进行解码。

### Session

> 服务器会话跟踪技术：将数据保存到服务端；JavaEE提供HttpSession接口来实现**一次对话的多次请求**间数据共享功能。

#### Session基本使用

1. 获取Session对象

​		`HttpSession session = request.getSession();`

2. Session对象功能：

* `void setAttribute(String name ,Object o)`:存储数据到session域中
* `Object getAttribute(String name)`:根据key的值返回value
* `void removeAttributes(String name)`:根据key，删除键值对

#### Session原理

Session是基于Cookie实现的，在第一次创建Session对象时会在Cookie中创建一个key为JSESSIONID的对象给浏览器端，然后浏览器端保存该Cookie，下次浏览器发送请求时会把Cookie作为请求头发送给服务器。这样就可保证同一个会话中不同的请求获得的Session对象都是相同的。

![image-20211204215947920](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211204215947920.png)

#### Session细节

* Session钝化、活化：

  * 钝化：在服务器正常关闭后，Tomcat会自动将Session数据写入硬盘的文件中
  * 活化：再次启动服务器后，从文件中加载数据到Session中

* Session销毁：

  * 默认情况下，无操作的情况下，30分钟销毁

  ![image-20211204220855149](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211204220855149.png)

  * 调用Session对象的invalidate方法

### Cookie和Session的比较

* 存储位置：Cookie是将数据存储在客户端，Session将数据存储在服务端
* 安全性：Cookie不安全，Session安全
* 数据大小：Coolie最大3KB,Session大小无限制
* 存储时间：Cookie可以长期存储，Session默认是30分钟
* 服务器性能：Cookie不占服务器资源，Session占用服务器资源

### 案例

在[用户登录和注册](#案例 :用户登录和注册)的基础上，在用户首次登录成功后，将用户名和密码作为cookie发送到浏览器端，长久化存储到本地，在下一次登陆时，可以将用户名和密码自动填充到登录栏上。并在查询品牌页中，根据同步用户名动态的显示xx，欢迎您字样。

![image-20211212205832774](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212205832774.png)

![image-20211212211617354](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212211617354.png)

![image-20211212213222845](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212213222845.png)

## Filter

> Filter表示过滤器，是JavaWeb三大组件（Servlet、Filter、Listener）之一。过滤器可以把对资源的请求拦截下来，从而实现一些特殊的功能。
>
> 过滤器一般完成一些通用的操作，比如权限控制、统一编码处理、敏感字符处理等待。

![image-20211206174009780](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211206174009780.png)

ab -n 1000 -c 100 -p ~/postfile -T application/x-www-form-urlencoded http://10.101.152.163:8080/miaoshaDemo_war/doseckill

### 快速入门

1. 定义类，实现Filter接口，并重写其所有方法

   ```java
   public class FilterDemo implements Filter {
       @Override
       public void init(FilterConfig filterConfig) throws ServletException {
       }
       @Override
       public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
       }
       @Override
       public void destroy() {
       }
   }
   ```

   2. 设置拦截的资源类型

   ```java
   @WebFilter("/*")//对于任意资源都进行拦截
   public class FilterDemo implements Filter{
       
   }
   ```

3. 重写doFilter方法，进行资源拦截后的处理与验证

   ```java
   @Override
   public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
       System.out.println("this is filter demo");
       //放行：对拦截的资源进行验证处理后进行放行
       filterChain.doFilter(servletRequest,servletResponse);
   }
   ```

### Filter执行流程

![image-20211206175703661](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211206175703661.png)

所以执行流程就是：执行前逻辑--->放行--->访问资源--->执行放行后的逻辑

在实际开发中，我们一般在放行前获取request对象进行处理，然后放行，放行后，对respnose对象进行处理。

```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    System.out.println("this is filter demo");
    //放行前，一般要对request数据进行处理
    filterChain.doFilter(servletRequest,servletResponse); //放行：对拦截的资源进行验证处理后进行放行
    //放行后会获取到response数据，可以对response进行处理
    System.out.println("after filter...");
}
```

### Filter使用细节

1. Filter拦截路径配置

​	可以拦截不同的资源路径：

* 拦截具体的资源 `/index.jsp`
* 后缀名拦截 `*.jsp`:后缀名为jsp的资源都会被拦截
* 目录拦截 `/user/*`:访问/user下的所有资源，都会被拦截
* 拦截所有 `/*`：所有资源类型都会被拦截

2. 过滤器链

​	一个web应用，可以配置多个过滤器，这多个过滤器成为过滤器链。

![image-20211206181414271](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211206181414271.png)

对于过滤器的顺序，是按照类名的自然排序进行的。

### 案例

在[Cookie](#案例)案例的基础上，使用filter对所有与非登录有关的资源拦截，保证在访问服务端资源前必须是用户登录的状态。

![image-20211212213646781](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212213646781.png)

![image-20211212214043317](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211212214043317.png)

## Listener

> 监听器，就是在可以监听application、session、requests三个对象创建、销毁或者往其中添加修改删除属性时自动执行代码的功能组件。
>
> 在Javaweb中，有8个监听器。

![image-20211206183519267](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211206183519267.png)

### ServletContextListener的使用

![image-20211206192801439](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211206192801439.png)

## AJAX

> AJAX,全程Asynchronous JavaScript And XML:异步的JavaScript和XML。

AJAX的作用：

1. 与服务器进行数据交换：通过AJAX可以给服务器发送请求，并获取服务器响应的数据
2. 通过AJAX和服务器进行通信，可以使用HTML+AJAX来替换JSP页面，实现前后端的分离。
3. 异步交互：可以在**不重新加载整个页面**的情况下，局部与服务器进行更新数据通信和更新部分网页的技术，常见的如搜索联想、用户名有效性验证等。

### AJAX的工作原理

![image-20211207201616955](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211207201616955.png)

### 同步和异步

在web的场景下，同步就是客户端发起请求并等待服务器响应这段时间内网页上不能进行其他操作；异步就是在等待服务器响应期间可以做其他操作。

![image-20211206201005615](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211206201005615.png)

### AJAX快速入门

1. 编写AjaxServlet，并使用response输出字符串

2. 创建XMLHttpRequest对象：用于和服务器交换数据

   ```javascript
   var xhttp;
   if (window.XMLHttpRequest) {
       xhttp = new XMLHttpRequest();
   } else {
       // code for IE6, IE5
       xhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }
   ```

3. 向服务器发送请求

   ```java
   xhttp.open("GET", "http://localhost:8080/AjaxDemo/AjaxServlet", true);
   xhttp.send();
   ```

4. 获取服务器响应数据

   ```javascript
   xhttp.onreadystatechange = function() {
       if (xhttp.readyState == 4 && xhttp.status == 200) {
           document.getElementById("ajax").value =
               xhttp.responseText;
           alert(xhttp.responseText);
       }
   };
   ```

### 案例：用户注册页面判断用户名是否已注册

需求：在用户名输入框输入username并在丢失焦点之后判断，通过ajax判断用户名是否已经注册过，如果已注册过，给出提示信息。

### Axios

> axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，本质上也是对原生XHR的封装，只不过它是Promise的实现版本，符合最新的ES规范。

1. 引入axios的js文件

   ```javascript
   <script src="js/axios-0.18.0.js"></script>
   ```

2. 使用axios发送请求，并获取响应结果

![image-20211213133432669](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211213133432669.png)

## JSON

> JSON,全称JavaScript Object Notation。JavaScript对象表示法。

### JSON基础语法

```json
var 变量名 = {"key1":value1,
          	"key2":value2,
          	 ...
          	};
```

其中value的数据类型为：

* 数字(整数或浮点数)
* 字符串(在双引号中)
* 逻辑值(true或false)
* 数组(在方括号中)
* 对象(在花括号中)
* null

示例：

```json
var json = {"name":"zhangsan",
            "age":23,
            "addr":["北京"，"上海","西安"]  
};
```

### JSON数据和Java对象转换

![image-20211213135901030](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211213135901030.png)

`Fastjson`是阿里巴巴提供的一个Java语言编写的高性能功能完善的JSON库，是目前Java语言中最快的JSON库，可以实现Java对象和Json字符串的互相转换。

## Vue

> Vue是一套前端框架，免除原生JavaScript中的DOM操作，简化书写。基于MVVM(Model-View-ViewModel)思想，实现数据的**双向绑定**，将编程的关注点放在数据在。

![image-20211214173346438](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211214173346438.png)

### Vue快速入门

1. 新建HTML页面，引入Vue.js文件

   ```javascript
   <script src="js/vue.js"></script>
   ```

2. 在JS代码区域，创建Vue核心对象，进行数据绑定

   ```javascript
   new Vue({
       el:"#app",
       data(){
           return{
               username:""
           }
       }
   });
   ```

3. 编写视图

   ```html
   <!--    实现模型和数据的双向绑定-->
       <input v-model="username">
   <!--    插值表达式-->
       {{username}}
   ```

### Vue常用指令

> Vue常用指令是哪些HTML标签上带有v-前缀的特殊属性，不同指令具有不同含义。

![image-20211214174941668](C:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211214174941668.png)

* `v-bind`和`v-model`

​	通过v-bind和v-model，可以实现表单元素上标签的值和另外标签上属性值实现绑定。

```html
<!--    实现模型和数据的双向绑定-->
    <input v-model="username">
<!--    插值表达式-->
    {{username}}
    <br>
    <a v-bind:href = "url">点击一下</a>
    <br>
    <input v-model="url">
```

```javascript
new Vue({
    el:"#app",
    data(){
        return{
            username:"",
            url:"https://www.baidu.com"
        }
    }
});
```

效果：

<img src="https://gitee.com/lulununuhuhu/img/raw/master/img/动画2.gif" width="600" height="400" />

* `v-on`

  ```javascript
  new Vue({
      el:"#app",
      data(){
          return{
              username:"",
              url:"https://www.baidu.com"
          }
      },
      methods:{
          show(){
              alert("我被点了");
          }
      }
  });
  ```

```html
<div id="app">
    <input type="button" value="点我" v-on:click="show()">
    <br>
    <input type="button" value="点我" @click="show()">
</div>
```

### Vue生命周期

Vue的生命周期有8个阶段：每触发一个生命周期事件，会自动执行一个生命周期方法（钩子）

![image-20211214202326813](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211214202326813.png)

其中最常用的就是`mounted`:当挂载完成时，Vue初始化成功，HTML页面渲染成功时，该方法会发送一个异步请求并加载数据。

### 案例：使用Vue添加查询品牌功能
