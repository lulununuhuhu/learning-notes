# RESTFul

## 1.RESTFul简介

REST:Representational State Transfer,表现层资源状态转移。简而言之，RESTFul就是一种url设计风格。

### 资源

服务器可以看作是由很多离散的资源组成的实体。每个资源是服务器上一个可命名的抽象概念，因为资源是一个抽象的概念，可以是服务器文件系统中的一个文件、数据库中的一张表等具体化东西，也可以一系列功能组成抽象设计。资源是以名词为核心来组织的，首先关注的是名词。资源可以由一个或者多个URI来标识，URI既是资源的名称，也是资源在web上的地址。对某个资源感兴趣的客户端应用，可以通过资源的URI与其进行交互。

### 资源的表述

资源的表述是一段对于资源在某个特定时刻的状态的描述。可以在客户端-服务端之间转移（交换）。资源的表述可以有多种格式，例如HTML/XML/JSON/纯文本/图片/视频等。资源的表述格式可以通过协商机制来确定。请求-响应方向的表述通常使用不同的格式。 

### 状态转移

状态转移说的是：在客户端和服务端之间转移(transfer)代表资源状态的表述。通过转移和操作资源的表述，来间接实现操作资源的目的。

## 2.RESTFul的实现

具体说，就是HTTP协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。

他们分别对应四种操作：GET用来获取资源，POST用来新建资源，PUT用来更新资源，DELETE用来删除资源。

REST风格提倡URL地址使用统一的风格设计，从前到后各个单词使用斜杠分开，不使用问号键值对携带请求参数，而是将要发送给服务器的数据作为URL地址的一部分，以保证整体风格的一致性。

| 操作     | 传统方式         | REST风格                |
| -------- | ---------------- | ----------------------- |
| 查询操作 | getUserById?id=1 | user/1-->get请求方式    |
| 保存操作 | saveUser         | user-->post请求方式     |
| 删除操作 | deleteUser?id=1  | user/1-->delete请求方式 |
| 更新操作 | updateUser       | user-->put请求方式      |

* 使用get方式的REST请求风格

  ```java
      @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
      public String getUserById(){
          System.out.println("根据id查询所有用户信息");
          return "success";
      }
  ```

  ```xml
  <a th:href="@{/user/1}">根据id查询用户信息</a>
  ```

* 使用post方式的REST请求风格

  ```java
      @RequestMapping(value = "/user",method = RequestMethod.POST)
      public String insertUser(String username,String password){
          System.out.println("添加用户信息"+username+","+password);
          return "success";
      }
  ```

  ```xml
  <form th:action="@{/user}" method="post">
      用户名：<input type="text" name="username"><br>
      密码:<input type="password" name="password"><br>
      <input type="submit" value="添加"><br>
  </form>
  ```

* 使用put方式的REST请求风格

  在使用put方式的请求时，需要在web.xml中配置HiddenHttpMethodFilter

  ```xml
     <!--    配置HiddenHttpMethodFilter-->
  	<filter>
          <filter-name>HiddenHttpMethodFilter</filter-name>
          <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
      </filter>
      <filter-mapping>
          <filter-name>HiddenHttpMethodFilter</filter-name>
          <url-pattern>/*</url-pattern>
      </filter-mapping>
  ```

  ```java
      @RequestMapping(value = "/user",method = RequestMethod.PUT)
      public String modifyUser(String username,String password){
          System.out.println("修改用户信息"+username+","+password);
          return "success";
      }
  ```

  ```xml
  <form th:action="@{/user}" method="post">
      <input type="hidden" name="_method" value="PUT">
      用户名：<input type="text" name="username"><br>
      密码:<input type="password" name="password"><br>
      <input type="submit" value="修改"><br>
  </form>
  ```

> 注：在web.xml中配置过滤器规则时，要将配置编码过滤器的过滤器放在最前面，否则仍会导致post请求中的中文参数出现乱码。

## 3.HiddenHttpMethodFilter

通过`HiddenHttpMethodFilter`的配置，可以解决put、delete请求方式的请求无法被对应的控制器方法所匹配的问题。

```xml
<!--    配置HiddenHttpMethodFilter-->
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

# RESTFul案例

## 搭建好基本框架

1. 先按照之前的方法创建maven框架，设置pom.xml导入相关依赖；导入webapp中的web.xml，注册前端控制器；导入springmvc.xml,配置好thymeleaf视图解析器。

2. 按照mvc思想，在java文件中创建好controller、bean、dao包。bean包是本次Employee的一个javabean类；controller包存放@Controller注解类，类中的方法作为控制层方法匹配浏览器的请求并调用dao包中的业务逻辑然后返回视图名称；dao包存放@Repository注解的类，用来与数据库进行交互。（本案例中没有用到数据库，所以使用map进行模拟数据的操作）

   ```java
   package bean;
   
   public class Employee {
       private Integer id;
       private String lastName;
       private String email;
       private Integer gender;//1 male  0 female
   
       public Employee() {
       }
   
       public Employee(Integer id, String lastName, String email, Integer gender) {
           this.id = id;
           this.lastName = lastName;
           this.email = email;
           this.gender = gender;
       }
   
       public Integer getId() {
           return id;
       }
   
       public void setId(Integer id) {
           this.id = id;
       }
   
       public String getLastName() {
           return lastName;
       }
   
       public void setLastName(String lastName) {
           this.lastName = lastName;
       }
   
       public String getEmail() {
           return email;
       }
   
       public void setEmail(String email) {
           this.email = email;
       }
   
       public Integer getGender() {
           return gender;
       }
   
       public void setGender(Integer gender) {
           this.gender = gender;
       }
   
       @Override
       public String toString() {
           return "Employee{" +
                   "id=" + id +
                   ", lastName='" + lastName + '\'' +
                   ", email='" + email + '\'' +
                   ", gender=" + gender +
                   '}';
       }
   }
   ```

	```
	@Repository
	public class EmployeeDao {
    //使用map来模拟数据库的不同操作
    private static Map<Integer, Employee> employees = null;
	
    static {
        employees = new HashMap<Integer,Employee>();
	
        employees.put(1001,new Employee(1001,"E-AA","aa@163.com",1));
        employees.put(1002,new Employee(1002,"E-BB","bb@163.com",0));
        employees.put(1003,new Employee(1003,"E-CC","cc@163.com",1));
        employees.put(1004,new Employee(1004,"E-DD","dd@163.com",0));
        employees.put(1005,new Employee(1005,"E-EE","ee@163.com",1));
    }
    private static Integer initId = 1006;
    //查
    public Employee get(Integer id){
        return employees.get(id);
    }
    //删
    public void delete(Integer id){
        employees.remove(id);
    }
    public Collection<Employee> getAll(){
        return employees.values();
    }
    //增
    public void save(Employee employee){
        if(employee.getId() == null){
            employee.setId(initId++);
        }
        employees.put(employee.getId(),employee);
    }
	}
	```

## 基本功能清单

| 功能               | URL地址         | 请求方式                  |
| ------------------ | --------------- | ------------------------- |
| 访问首页           | /               | GET                       |
| 查询全部数据       | /employee       | GET                       |
| 删除               | /deleteEmployee | DELETE(实际上使用的是GET) |
| 跳转到添加数据页面 | /toAdd          | GET                       |
| 添加数据并执行保存 | /employee       | POST                      |
| 跳转到更新数据页面 | /employee/2     | GET                       |
| 执行更新           | /employee       | PUT(也可以用POST)         |

## 访问首页

在SpringMVC.xml中，在视图控制器中将index视图与项目初始路径建立起映射来

```xml
<mvc:view-controller path="/" view-name="index"></mvc:view-controller>
```

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
</head>
<body>
<h1>首页</h1>
<a th:href="@{/employee}">查看员工信息</a>
</body>
</html>
```

## 实现列表功能

新建一个employee_list.html，使用table标签建立起表和字段

```html
<table id="dataTable" border="1" cellspacing="0" cellpadding="0" style="text-align:center">
    <tr>
        <th colspan="5">Employee Info</th>
    </tr>
    <tr>
        <th>id</th>
        <th>lastName</th>
        <th>email</th>
        <th>gender</th>
        <th>options(<a th:href="@{/toAdd}">add</a>)</th>
    </tr>
</table>
```

## 查询全部数据

1. 控制器中建立一个映射值为`/employee`的方法，通过调用employeeDao中的getAll方法获取所有数据,使用model对象向request共享域共享数据，返回视图名称`employee_list`

   ```java
   @RequestMapping(value = "employee")
   public String getAll(Model model){
       Collection<Employee> employeeList= employeeDao.getAll();
       model.addAttribute("employeeList",employeeList);
       return "employee_list";
   }
   ```

2. 在employee_list.html中使用<tr th:each="employee : ${employeeList}">的方式，对域中的对象进行渲染展示。

   ```html
           <tr th:each="employee : ${employeeList}">
               <td th:text="${employee.id}"></td>
               <td th:text="${employee.lastName}"></td>
               <td th:text="${employee.email}"></td>
               <td th:text="${employee.gender}"></td>
           </tr>
   ```

## 删除指定数据

1. 在表中加入删除功能的超链接元素标签，并使用RESTFul风格对链接中加入请求参数

   ```html
   <td>
   <!--                处理带有请求参数的超链接的两种方式-->
     <a @click="deleteEmployee" th:href="@{/employee/}+${employee.id}">delete</a>-->
     <a @click="deleteEmployee" th:href="@{'/deleteEmployee/'+${employee.id}}">delete</a>
   </td>
   ```

2. 添加vue.js，使用vue来为超链接绑定一个deleteEmployee点击事件,并且添加一个隐藏表单，请求方式为get(应该使用post或delete请求方式更好，但总是报405错误，暂没搞明白原因)，使用该表单来发起删除指定数据的请求。对应的控制层方法完成删除数据后使用重定向到employee请求对应的控制层方法上重现显示数据列表。

   ```html
   <form id="deleteForm" method="get">
       <input type="hidden" name="_method" th:value="delete">
   </form>
   ```

   ```html
   <script type="text/javascript" th:src="@{/static/js/vue.js}"></script>
   <script type="text/javascript">
       var vue = new Vue({
           e1:"#dataTable",
           methods:{
               deleteEmployee:function (event) {
                   //根据id获取表单元素
                   var deleteForm = document.getElementById("deleteForm");
                   //将触发点击事件的超链接的href属性赋值给表单的action,action属性内容表示表单内容提交的位置
                   deleteForm.action = event.target.href;
                   //提交表单
                   deleteForm.submit();
                   //取消超链接的默认行为
                   event.preventDefault();
               }
           }
       })
   ```

   ```java
   @RequestMapping(value = "/deleteEmployee/{id}",method = RequestMethod.GET)
   public String deleteEmployee(@PathVariable("id") Integer id){
       employeeDao.delete(id);
       return "redirect:/employee";//重定向到employee
   }
   ```

## 添加数据并执行保存

1. 前端添加一个添加按钮

   ```html
   <th>options(<a th:href="@{/toAdd}">add</a>)</th>
   ```

2. 在视图控制器中建立视图映射

   ```xml
   <mvc:view-controller path="/toAdd" view-name="employee_add"></mvc:view-controller>
   ```

3. 在employee_add中添加表单，请求方式为post，请求指向为`/employee`

   ```html
   <form th:action="@{/employee}" method="post">
       <input type="hidden" name="_method" value="put">
       <input type="hidden" name="id" th:value="${employee.id}">
       姓名:<input type="text" name="lastName" th:value="${employee.lastName}"><br>
       邮箱:<input type="text" name="email" th:value="${employee.email}"><br>
       性别:<input type="radio" name="gender" value="1" th:field="${employee.gender}">男
           <input type="radio" name="gender" value="0" th:field="${employee.gender}">女<br>
       <input type="submit" value="update"><br>
   </form>
   ```

4. 所匹配的控制器方法

   ```java
   @RequestMapping(value = "/employee",method = RequestMethod.POST)
   public String addEmployee(Employee employee){
       employeeDao.save(employee);
       return "redirect:/employee";
   }
   ```

## 更新数据

1. 添加超链接，在请求参数中表明id

   ```xml
   <a th:href="@{'/employee/'+${employee.id}}">update</a>
   ```

2. 在控制器方法中，使用@PathVariable注解将请求中的id和形参建立映射关系,然后根据id获取到employee的信息，然后添加到request共享域中，重定向到employee_update视图

   ```java
   @RequestMapping(value = "/employee/{id}",method = RequestMethod.GET)
   public String getEmployeeById(@PathVariable("id") Integer id,Model model){
       Employee employee = employeeDao.get(id);
       model.addAttribute("employee",employee);
       return "employee_update";
   }
   ```

3. 根据renquest共享域中的数据，以表格的形式用${}将数据渲染出来，实现数据回显的功能

   ```html
   <form th:action="@{/employee}" method="post">
       <input type="hidden" name="_method" value="put">
       <input type="hidden" name="id" th:value="${employee.id}">
       姓名:<input type="text" name="lastName" th:value="${employee.lastName}"><br>
       邮箱:<input type="text" name="email" th:value="${employee.email}"><br>
       性别:<input type="radio" name="gender" value="1" th:field="${employee.gender}">男
           <input type="radio" name="gender" value="0" th:field="${employee.gender}">女<br>
       <input type="submit" value="update"><br>
   </form>
   ```

4. 表单数据修改好后,重新调用employee的控制器方法执行数据显示功能

   ```java
   @RequestMapping(value = "employee")
   public String getAll(Model model){
       Collection<Employee> employeeList= employeeDao.getAll();
       model.addAttribute("employeeList",employeeList);
       return "employee_list";
   }
   ```

