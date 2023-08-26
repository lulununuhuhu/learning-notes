## Spring框架

>  Spring是一个针对bean生命周期的开源的轻量级的JavaEE开发框架,解决了企业应用开发中事务的复杂性。

Spring有两个核心部分：

1. IOC:控制反转，把创建对象过程交给Spring容器进行集中处理
2. Aop：面向切面，在修改添加功能时不需要修改源代码

总结：Spring就是一个轻量级的控制反转（IOC）和面向切面编程（AOP）的框架。

## Spring的组成

![image-20220331164240586](https://gitee.com/lulununuhuhu/img/raw/master/img/202203311642804.png)

## Sring容器的工作原理

![image-20220408204338887](https://gitee.com/lulununuhuhu/img/raw/master/img/202204082043004.png)

## Spring入门案例

### 基本步骤

1. 下载Spring5框架
2. 在idea创建Java普通工程
3. 导入Spring5相关的jar包

​	![image-20220228120229694](https://gitee.com/lulununuhuhu/img/raw/master/img/202202281909491.png)

4. 创建一个普通类User，并写一个普通方法add()

```java
package com.spring5;

public class User {
    public void add(){
        System.out.println("add...");
    }
}
```

5. 创建xml配置文件，使用xml配置文件进行对象的创建

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
<!--配置User对象创建-->
    <bean id="user" class="com.spring5.User"></bean>
</beans>
```

6. 进行测试代码的编写,测试案例能否正常运行

## IOC

> IOC,中文名称是控制反转，就是把对象创建和对象之间的调用过程等管理工作，交给Spring进行管理，从而使代码的耦合度降低。其中反转的意思是区别与传统的由开发人员进行new对象的模式，由spring专门的容器代替开发人员创建和管理对象。

### IOC的技术实现

DI是ioc的技术实现，DI全称Dependency Injection：依赖注入，只需要在程序中提供要使用的对象名称就可以，至于对象如何在容器中创建、赋值、查找等都由容器内部实现。

在servlet中ioc的体现，一个使用servlet的场景：

1. 创建类继承HttpServlet
2. 在web.xml注册servlet：通过使用<servlet-name>标签以及<servlet-class>标签进行实现

在这个场景中，没有显式的创建Servlet对象即MyServlet myservlet = new MyServlet()。而是由Tomcat服务器进行创建了，因而Tomcat也被称为容器，它可以存放Servlet对象，Listener对象，Filter对象。

### IOC过程

1. xml配置文件，配置创建的对象

   ```xml
   <bean id="dao" class="com.atguigu.UserDao"></bean>
   ```

2. 有service类和dao类，创建工厂类

   ```java
   class UserFactory{
       public static UserDao getDAO(){
   		String classValue = class属性值;//通过xml解析得到
           Class clazz = Class.forName(classValue);//通过反射创建对象
           return (UserDao)clazz.newInstance();
       }
   }
   ```

### 基于maven结构实现spring的一个demo

1. 基于骨架创建一个maven项目

   ​	![image-20220313121224562](https://gitee.com/lulununuhuhu/img/raw/master/img/202203131212662.png)

2. 创建好接口和相应的实现类

   ```java
   package org.example.service;
   
   public interface SomeService {
       public void doSome();
   }
   ```

   ```java
   ackage org.example.service;
   
   public class SomeServiceImpl implements SomeService {
       @Override
       public void doSome() {
           System.out.println("执行了SomeServiceImpl中的doSome方法");
       }
   }
   ```

3. 创建spring的xml配置文件，添加bean标签进行对象声明

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!--
       1. beans标签是根标签，spring中把java对象作为bean
       2. spring.beans.xsd是定义约束文件的url，进行对配置文件语法的限定，类似于mybatis指定dld是一样的
   -->
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
   <!--    一个bean标签声明一个对象
          id：对象的自定义名称，唯一值。sprin通过这个名称找到对象
          class:类的全限定名称（必须是类）
          通过声明id和class，spring实际上在底层完成了SomeService someService = new SomeServiceImpl()
          然后将创建好的对象放入到map中 springMap.put(id的值，对象);
          此处就是springMap.put(id的值,对象),即springMap.put("someService",new SomeServiceImpl())
   -->
       <bean id="someService" class="org.example.service.SomeServiceImpl"></bean>
   </beans>
   ```

4. 创建测试文件，进行对象测试

   ```java
   public class MyTest {
   
       @Test
       public void test1(){
           String config = "beans.xml";
           //ClassPathXmlApplicationContext表示类的相对路径
           //spring创建对象的时机：spring在创建容器时，会创建配置文件中所有的对象
           ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
           SomeServiceImpl service = context.getBean("someService", SomeServiceImpl.class);
           service.doSome();
       }
   }
   ```

![image-20220302111850501](https://gitee.com/lulununuhuhu/img/raw/master/img/202203021118679.png)

### IOC的Bean管理

#### 使用bean创建自定义对象

```xml
<bean id="someService" class="org.example.service.SomeServiceImpl"></bean>
```

```java
public class SomeServiceImpl implements SomeService {
    public SomeServiceImpl() {
        System.out.println("SomeServiceImpl的无参数构造方法");
    }

    @Override
    public void doSome() {
        System.out.println("执行了SomeServiceImpl中的doSome方法");
    }
}
```

#### 使用bean创建java常用类对象

以java.util.Date为例：

```xml
<!--  创建一个java常用类的对象  -->
    <bean id="date" class="java.util.Date"></bean>
```

```java
public void test3(){
    String config = "beans.xml";
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
    Date date = context.getBean("date", Date.class);
    System.out.println(date);//Sun Mar 13 15:40:03 CST 2022
}
```

#### bean的作用域

bean的作用域有五种：

| 来源        | 说明                                                     |
| ----------- | -------------------------------------------------------- |
| singleton   | 默认Spring Bean作用域，一个BeanFactory中有且只有一个实例 |
| prototype   | 原型作用域，每次依赖查找和依赖注入都会生成新的Bean对象   |
| request     | 将Spring bean存储在ServletRequest中                      |
| session     | 将Spring bean存储在HttpSession中                         |
| application | 将Spring bean存储在ServletContext中                      |

其中最常使用的是singleton和prototype。

### DI依赖注入

DI:Dependency injection，表示创建对象，给属性赋值。DI的实现有两种，分别是基于XML的DI实现和基于注解的DI实现。DI的语法也可分为两种，分别是set注入（设置注入），构造注入。

#### set设置注入

spring**调用类的set方法**，可以在set方法中完成属性赋值。

1. 简单类型的set注入:

```xml
<bean id="xx" class="yyy">
	<property name="属性名字" value="此属性的值">	</property>
</bean>
```

例:

```java
public class Student {
    private String name;
    private int age;

    public void setName(String name) {
        System.out.println("setName:"+name);
        this.name = name;
    }
    public void setAge(int age) {
        System.out.println("setAge:"+age);
        this.age = age;
    }
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```xml
<bean id="myStudent" class="org.example.ba01.Student">
<!--        set属性注入-->
    <property name="age" value="18"/>
    <property name="name" value="陆诚"/>
</bean>
```

```java
public class StudentTest {
    @Test
    public void testStudent(){
        String config = "ba01/applicationContext.xml";
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
        Student student = context.getBean("myStudent", Student.class);
        System.out.println("Student="+student);
        //setAge18
		//setName陆诚
		//Student=Student{name='陆诚', age=18}
    }
}
```

注：在spring实现属性注入的过程中，调用了类中的setName和setAge方法，从输入结果中可看出。

2. 有引用类型的set注入

   ```xml
   <bean id="xxx" class='yyy'>
   	<property name="属性名称" ref="bean的id(对象的名称)"/>
   </bean>
   ```

   例：

   ```java
   public class School {
       private String address;
       private String name;
       public void setAddress(String address) {
           this.address = address;
       }
       public void setName(String name) {
           this.name = name;
       }
       @Override
       public String toString() {
           return "School{" +
                   "address='" + address + '\'' +
                   ", name='" + name + '\'' +
                   '}';
       }
   }
   ```

    ```java
    public class Student {
        private String name;
        private int age;
        private School school;
   
        public void setName(String name) {
            this.name = name;
        }
        public void setAge(int age) {
            this.age = age;
        }
   
        public void setSchool(School school) {
            this.school = school;
        }
   
        @Override
        public String toString() {
            return "Student{" +
                    "name='" + name + '\'' +
                    ", age=" + age +
                    ", school=" + school +
                    '}';
        }
        public void setEmail(String email) {
            System.out.println("setEmail:"+email);
        }
    }
    ```

    ```xml
    <!--    创建Student对象-->
        <bean id="myStudent" class="org.example.ba02.Student">
        <!--        set属性注入-->
            <property name="age" value="18"/>   <!--setAge(18) -->
            <property name="name" value="陆诚"/>  <!--setName("陆诚") -->
            <property name="school" ref="mySchool"/> <!--setSchool(mySchool) -->
        </bean>
        <bean id="mySchool" class="org.example.ba02.School">
            <property name="name"   value="清华大学"/>
            <property name="address" value="光华路110号"/>
        </bean>
    ```

#### 构造注入

spring调用**类的有参数构造方法**，在创建对象的同时，在构造方法中给属性赋值。构造注入使用<constructor-arg>标签。

<constructor-arg>标签：一个<constructor-arg>表示构造方法的一个参数。标签属性有：

name:表示构造方法的形参名

index:表示构造方法的参数的位置，参数从左往右位置是0，1，2的顺序

value：构造方法的形参类型是简单类型的，使用value

ref：构造方法的形参类型是引用类型的，使用ref。

name和index是两种构造注入的方式。一般建议使用name，可读性更高。

至此，可以总结使用spring框架的步骤：

1. maven的配置文件中导入依赖

2. 创建类、接口、实现类或者没有接口的类
3. 创建spring的配置文件，使用<bean>声明对象
4. 通过ApplicationContext接口和他的实现类ClassPathXmlApplicationContext的方法getBean方法

#### 引用类型属性自动注入

1. byName(按名称注入)：Java类中引用类型的属性名和spring容器中（配置文件）<bean>的id名称一样，且数据类型是一致的，这样的容器中的bean、spring能够赋值给引用类型。

​		语法：

```xml
<bean id="xx" class="yyy" autowire="byName">
	简单类型属性赋值
</bean>
```

​		例：

```xml
    <bean id="myStudent" class="org.example.ba03.Student" autowire="byName">
    <!--        set属性注入-->
        <property name="age" value="18"/>   <!--setAge(18) -->
        <property name="name" value="陆诚"/>  <!--setName("陆诚") -->
    <!--使用引用类型的自动注入：spring框架根据某些规则可以给引用类型赋值，不用你再给引用类型赋值了，
        使用的规则常用的是byName，byType-->
    </bean>
    <bean id="school" class="org.example.ba03.School">
        <property name="name"   value="清华大学"/>
        <property name="address" value="光华路110号"/>
    </bean>
```

2. byType(按类型注入):java类中引用类型的数据类型和spring容器中（配置文件）<bean>的class属性是同源关系的，这样的bean能够赋值给引用类型。同源包括以下几种

   1. java类中引用类型的数据类型和bean的class的值是一样的
   2. java类中引用类型的数据类型和bean的class的值父子类关系的
   3. java类中引用类型的数据类型和bean的class的值接口和实现类关系的

   注意：只能由一个符合条件的bean，否则会报错

   语法：

   ```xml
   <bean id="xx" class="yyy" autowire="byName">
   	简单类型属性赋值
   </bean>

#### 基于注解的DI

使用注解的基本步骤：

1. 使用注解进行DI必须使用spring-aop的依赖，在你加入spring-context的同时，可以间接导入spring-aop的依赖
2. 在类中加入spring的注解（多个不同功能的注解）
3. 在spring的配置文件中，加入一个**组件扫描器**的标签，说明注解在你的项目中的位置

组件扫描器的标签形式:

```xml
<context:component-scan base-package="指定注解类所在的包的路径"/>
```

component-scan工作方式：spring会扫描遍历base-package指定的包，把包中和子包中的所有类，找到类中的注解，按照注解的作用创建对象或者给属性赋值。

加入component-scan标签需要在配置文件中加入新的约束文件spring-context.xsd，并给这个新的约束文件起个命名空间的名称。

```java
package org.example.ba01;

import org.springframework.stereotype.Component;

/**
 * @Compent可以起到和<bean>标签一样创建对象的作用
 * 属性：value就是对象的名称，等同于bean的id值，value的值唯一，创建的对象在整个spring容器中就一个
 */
@Component(value = "myStudent")
public class Student {
    private String name;
    private Integer age;
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
<!-- 声明组件扫描器(component-scan)，组件就是java对象
    base-package:指定注解在你的项目中的包名
    component-scan工作方式：spring会扫描遍历base-package指定的包，
    把包中和子包中的所有类，找到类中的注解，按照注解的功能创建对象或给属性赋值
-->

    <context:component-scan base-package="org.example.ba01"/>

</beans>
```

```java
package org.example.ba01;

import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class StudentTest {
    @Test
    public void testStu(){
        String config = "ba01/applicationContext.xml";
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
        Student student = context.getBean("myStudent", Student.class);
        System.out.println(student);
    }
}
```

Spring中和@Component功能一致，创建对象的注解还有:

1. @Repository(用在持久层类的上面)：放在dao的实现类上面，表示创建dao对象，dao对象是能访问数据库的
2. @Service(用在业务层类的上面)：放在service的实现类上面，创建service对象，service对象是做业务处理，可以有事务等功能的。
3. @Controller(用在控制器的上面)：放在控制器（处理器）类的上面，创建控制器对象的，控制器对象，能够接受用户提交的参数，显示请求的处理结果

以上三个注解的使用语法和@Component一样的，都能创建对象，但是这三个注解还有额外的功能。@Repository、@Service、Controller在不同的项目结构层中有专门的应用。



组件扫描器指定多个包的三种方式：

1. 每个包使用一个<context:component-scan>标签进行指定
2. 不同包的路径之间使用,或者;进行分隔多个包名
3. 如果多个包属于同一个父包，那么可以直接指定父包的路径

##### 简单类型属性注入@Value

@Value：简单类型的属性赋值

1. 属性：value是string类型的，表示简单类型的属性值

2. 位置：在属性定义的上面，无需set方法，推荐使用；或者在set方法的上面 ，调用setXXX方法

例:

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @Compent可以起到和<bean>标签一样创建对象的作用
 * 属性：value就是对象的名称，等同于bean的id值，value的值唯一，创建的对象在整个spring容器中就一个
 */
@Component(value = "myStudent")

public class Student {
    @Value(value = "陆诚") //简洁写法：@Value("陆诚")
    private String name;
    @Value(value = "24")   //简介写法:@Value("24" )
    private Integer age;

    public Student() {
        System.out.println("调用Student类的无参构造方法");
    }
    
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
<!-- 声明组件扫描器(component-scan)，组件就是java对象
    base-package:指定注解在你的项目中的包名
    component-scan工作方式：spring会扫描遍历base-package指定的包，
    把包中和子包中的所有类，找到类中的注解，按照注解的功能创建对象或给属性赋值
-->

    <context:component-scan base-package="org.example.ba02"/>

</beans>
```

```java
import org.example.ba02.Student;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class StudentTest {
    @Test
    public void testStu(){
        String config = "ba02/applicationContext.xml";
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
        Student student = context.getBean("myStudent", Student.class);
        System.out.println(student);
    }
}
```

##### byType自动注入@Autowired

@Autowired:实现引用类型的赋值。Spring中通过注解给引用类型赋值，使用的是自动注入原理，支持byName，byType。@Autowired默认使用的是byType自动注入。

​	属性：

​	required，是一个boolean类型的，默认true

​	required=true:表示引用类型赋值失败的情况下，程序报错并终止执行

​	required=false：表示引用类型如果赋值失败，程序正常执行，引用类型是null。

使用位置：

1. 在属性定义的上面，无需set方法，推荐使用
2. 在set方法的上面

如果要使用byName方式，需要做的是

1. 在属性上面加入@Autowired
2. 在属性上面加入@Qualifier（value="创建对象的id值"）:表示使用指定名称的bean完成赋值

例:

```java
@Component(value = "myStudent")
public class Student {
    @Value("陆诚")
    private String name;
    @Value("25")
    private Integer age;

    @Autowired
    private School school;

    public Student() {
    }
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", school=" + school +
                '}';
    }
}
```

```java
@Component("mySchool")
public class School {
    @Value("北京海淀区")
    private String address;
    @Value("北京大学")
    private String name;

    @Override
    public String toString() {
        return "School{" +
                "address='" + address + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="org.example.ba03"/>
</beans>
```

```java
public class StudentTest {
    @Test
    public void testStu(){
        String config = "ba03/applicationContext.xml";
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
        Student student = context.getBean("myStudent", Student.class);
        System.out.println(student);
    }
}
```

##### JDK注解@Resource自动注入

Spring提供了对jdk中@Resource注解的支持。@Resource注解既可以按名称匹配Bean，也可以按类型匹配Bean。**默认是按名称注入**。使用该注解，要求JDK必须是6及以上版本。@Resource可在属性上，也可在set方法上。

使用Resource注解需要在maven中先导入依赖。

```xml
<dependency>
  <groupId>javax.annotation</groupId>
  <artifactId>jsr250-api</artifactId>
  <version>1.0</version>
</dependency>
```

```java
@Resource //默认先按名称查找，如果没查找到，就按类型
@Resource(name = "bean的id或者对象名称")
@Resource(type = 引用对象类型)
```

##### 常见面试题：说一下@Autowired和@Resource这两个注解

1. @Autowired是Spring提供的注解，@Resource是JDK提供的注解
2. @Autowired是只能按类型注入，@Resource默认按名称注入，也支持按类型注入
3. @Autowired按类型装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许null值，可以设置它required属性为false，如果我们想使用按名称装配，可以结合@Qualifier注解一起使用。@Resource有两个重要的属性：name和type。name属性指定byName，如果没有指定name属性，当注解标注在字段上，即默认取字段的名称作为bean名称寻找依赖对象，当注解标注在属性的setter方法上，即默认取属性名作为bean名称寻找依赖对象。需要注意的是，@Resource如果没有指定name属性，并且按照默认的名称仍然找不到依赖对象时， @Resource注解会回退到按类型装配。但一旦指定了name属性，就只能按名称装配了

## AOP

> 中文名称是面向切面编程，利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。
>
> 在传统软件开发方式中，需要添加新功能时，需要在源代码上进行修改，可维护性不高。通过AOP，可以在不更改源代码的情况下插入新功能模块。

### AOP底层原理

### 动态代理

> 动态代理是指**程序在整个运行过程中根本就不存在目标类的代理类**，目标对象的代理对象只是由代理生成工具（不是真实定义的类）在程序运行时由JVM根据反射等机制动态生成的。代理对象与目标对象的代理关系在程序运行时才确立。

#### AOP底层使用动态代理

1. 使用JDK动态代理，通过使用jdk中的Proxy、Method、InvocationHandler创建代理对象。jdk动态代理要求**目标类必须实现接口**。

   ![image-20220312181952208](https://gitee.com/lulununuhuhu/img/raw/master/img/202203121819365.png)

​	

2. 没有接口情况，使用CGLIB动态代理：第三方的工具库，创建代理对象，原理是继承。通过继承目标类，创建子类。子类就是代理对象。**要求是目标类不能是final的，方法也不能是final的**。

   ![image-20220312182103138](https://gitee.com/lulununuhuhu/img/raw/master/img/202203121821229.png)

动态代理的好处：

1. 在目标类源代码不改变的情况下，增加功能
2. 减少代码的重复
3. 专注业务逻辑代码
4. 通过让业务功能和其他非业务功能分离实现解耦合

AOP（Aspect orient programming）就是面向切面编程，基于动态代理的，将动态代理的流程规范化，让开发人员用一种统一的方式，使用动态代理。

#### JDK动态代理实现步骤

jdk动态代理实现步骤：

1. 创建目标类，SomeServiceImpl目标类，给它的doSome，doOther增加输出时间、事务。
2. 创建InvocationHandler接口的实现类，在这个类实现给目标方法增加功能
3. 使用jdk中类Proxy，创建代理对象。实现创建对象的能力

例：

将事务类和非事务类进行分离。

```java
public interface SomeService {
    public void doSome();
    public void doOther();
}
```

```java
public class SomeServiceImpl implements SomeService {
    @Override
    public void doSome() {
        System.out.println("执行事务中的doSome()方法");
    }

    @Override
    public void doOther() {
        System.out.println("执行事务中的doOther()方法");
    }
}
```

创建InvocationHandler接口的实现类

```java
public class myInvationHandler implements InvocationHandler {
    //目标对象
    Object target;//这里是SomeServiceImp类

    public myInvationHandler(Object target) {
        this.target = target;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        //通过代理对象执行方法时，会调用执行这个invoke()
        System.out.println("执行MyInvocationHandler中的invoke()");
        System.out.println("执行的方法是:"+method.getName());
        Object res = null;
        serviceTools.doLog();
        //执行目标类的方法，通过Method类实现
        res = method.invoke(target,args);//执行SomeServiceImpl的doOther和doSome方法
        serviceTools.doTrans();
        return res;
    }
}
```

```java
public class testSomeService {
    @Test
    public void SomeServiceTest(){
        //使用jdk的Proxy创建代理对象

        //创建目标对象
        SomeServiceImpl target = new SomeServiceImpl();
        myInvationHandler handler = new myInvationHandler(target);

        //使用Proxy创建代理
        SomeService proxy = (SomeService) Proxy.newProxyInstance(target.getClass().getClassLoader(), target.getClass().getInterfaces(),handler);

        //通过代理执行方法，会调用handler中的invoke()方法
        proxy.doSome();
    }
}
```

#### AOP编程术语

切面（aspect）：可以理解为给目标类增加的功能。如上例中用到的日志、事务都是切面，还有统计信息、权限验证等。切面的特点：一般都是非业务方法，进行独立使用。

连接点(joinPoint):指可以被切面织入并获取具体参数的具体方法。通常业务接口中的方法均为连接点。

切入点（Pointcut）:指声明的一个或多个连接点的集合。如果项目中有多个切入点表达式是重复可以复用的，通过切入点指定一组方法。当使用@Pointcut定义在一个方法的上面时此时这个方法的名称就是切入点表达式的别名。其他切面方法使用同样的切入点表达式时就可以使用这个别名来代替切入点表达式了。被标记为final的方法是不能作为连接点与切入点的。因为final方法是不能被修改和增强的。

通知（advice）:就是按照约定的流程下的方法，分为前置通知、后置通知、环绕通知、事后返回通知和异常通知，它会根据约定织入流程中

织入（weaving）：它是一个通过动态代理技术，为原有服务对象生成代理对象，然后将与切点定义匹配的连接点拦截，并按约定将各类通知织入约定流程的过程

正确的理解面向切面编程，需要：

1. 在分析项目功能时，找出切面
2. 合理的安排切面的执行时间（在目标方法前或目标方法后）
3. 合理的安全切面执行位置，在哪个类，给哪个方法增加功能

#### 使用AspectJ的AOP配置管理事务

aspectJ:一个开源的专门做aop的框架。spring框架中集成了aspectj框架，通过spring就能使用aspectj的功能。

1. 使用xml的配置文件：配置全局事务
2. 使用注解，我们在项目中要做aop功能

首先说明下aspectJ框架的常见属性：

1. 切面的执行时间，这个执行时间在规范中叫做Advice(通知，增强)。在aspectJ框架中使用注解表示的，也可以使用xml配置文件中的标签。
   - @Before：前置通知，在目标方法之前先执行切面的功能
     1. 在目标方法之前执行的
     2. 不会改变目标方法的执行结果
     3. 不会影响目标方法的执行
   - @AfterReturning：后置通知，在目标方法之后执行的，能够获取到目标方法的返回值
     1. 在目标方法之后执行
     2. 能够获取到目标方法的返回值，可以根据这个返回值做不同的处理功能
     3. 可以修改这个返回值
   - @Around：环绕通知，在目标方法前和后都能增强功能，控制目标方法的访问，修改访问值
   - @AfterThrowing:异常通知，在目标方法抛出异常后执行的通知
   - @After 最终通知，总是会被执行的代码
2. AspectJ定义了专门的表达式用于指定切入点。表达式的原型是：

![image-20220318202036873](https://gitee.com/lulununuhuhu/img/raw/master/img/202203182020033.png)

切入点表达式要匹配的对象就是目标方法的方法名。所以execution表示式中明显就是方法的签名。注意，表达式中黑色文字表示可省略部分，各部分间用空格分开。在其中可以使用以下符号。

| 符号 | 意义                                                         |
| ---- | ------------------------------------------------------------ |
| *    | 0至多个任意字符                                              |
| ..   | 用在方法参数中，表示任意多个参数<br />用在包名后，表示当前包及其子包路径 |
| +    | 用在类名后，表示当前类及其子类<br />用在接口后，表示当前接口及其实现类 |

例：

```java
execution(public * *(..))
```

表示指定切入点为：任意公共方法

```java
execution(* set*(..))
```

表示切入点为：任何一个以set开始的方法

```java
execution(* com.xyz.service.*.*(..))
```

表示切入点为：定义在service包里的任意类的任意方法

```java
excution(* com.xyz.service..*.*(..))
```

表示切入点为：定义在service包或者子包里的任意类的任意方法。“..”出现在类名中时，后面必须跟"*"，表示包、子包下的所有类。

```java
execution(* *..service.*.*(..))
```

表示切入点为：所有包下的service子包下所有类（接口）中所有方法为切入点

#### AspectJ的开发环境

##### @Before

使用aspectJ实现aop的基本步骤：

1. 新建maven项目

2. 加入依赖，spring依赖、aspectJ依赖、junit单元测试

   ```xml
   <dependencies>
     <dependency>
       <groupId>junit</groupId>
       <artifactId>junit</artifactId>
       <version>4.11</version>
       <scope>test</scope>
     </dependency>
     <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-context</artifactId>
       <version>5.3.15</version>
     </dependency>
     <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-aspects</artifactId>
       <version>5.3.15</version>
     </dependency>
   </dependencies>
   ```

3. 创建目标类：接口和它的实现类。要做的是给类中的方法增加功能

   ```java
   public interface SomeService {
       public void doSome(String name,Integer age);
   }
   ```

   ```java
   public class SomeServiceImpl implements SomeService{
       @Override
       public void doSome(String name, Integer age) {
           System.out.println("===执行doSome()方法===");
       }
   }
   ```

4. 创建切面类：普通类

   1. 在类的上面加入@Aspect
   2. 在类中定义方法，方法就是切面要执行的功能代码。在方法的上面加入aspectJ中的通知注解，例如@Before，表示前置通知，有需要指定切入点表示式execution()

   ```java
   /**
    * @Aspect:是aspectJ框架中的注解
    *        作用：表示当前类是切面类
    *        切面类：是用来给业务方法增加功能的类，在这个类中有切面的功能代码
    *        位置：在类定义的上面
    */
   @Aspect
   public class MyAspect {
       /**
        * 定义实现切面功能的方法。
        * 方法的定义要求有：公共方法public、方法没有返回值、方法名称自定义、方法可以有参数也可没有参数，如果有参数参数不是自定义的，有几个参数类型可使用
        */
   
       /**
        * @Before:前置通知注解
        *  属性：value，是切入点表达式，表示切面的功能执行的位置 execution()表达式
        *  位置：在方法的上面
        *
        *  特点：1.在目标方法之前先执行的 2. 不会改变目标方法的执行结果 3. 不会影响目标方法的执行
        */
       //注：如果execution表达式无法找到对应的类的指定方法，将无法加入切面类的功能
       @Before(value = "execution(public void org.example.ba01.SomeServiceImpl.doSome(String,Integer))")
       public void myBefore(){
           //就是你切面要执行的功能代码
           System.out.println("前置通知，切面功能：在目标方法之前输出执行时间："+new Date());
       }
   }
   ```

5. 创建spring的配置文件：声明对象，把对象交给容器统一管理。声明对象你可以使用注解或者xml配置文件<bean>标签,包括声明目标对象，声明切面类对象，声明aspectJ框架中的自动代理生成器标签。自动代理生成器：用来完成代理对象的自动创建功能。

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:aop="http://www.springframework.org/schema/aop"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans.xsd
          http://www.springframework.org/schema/aop
           https://www.springframework.org/schema/aop/spring-aop.xsd">
   <!--把对象交给spring容器，由spring容器统一创建，管理对象-->
   <!--    声明目标对象-->
       <bean id="someService" class="org.example.ba01.SomeServiceImpl"/>
   <!--    声明切面类对象-->
       <bean id="myAspect" class="org.example.ba01.MyAspect"/>
   
   <!--
           声明自动代理生成器：使用aspectJ框架内部的功能，创建目标对象的代理对象。
           创建代理对象是在内存中实现的，修改目标对象在内存中的结构，创建为代理对象。
           所以目标对象就是被修改后的代理对象。
   -->
       <aop:aspectj-autoproxy/>
   </beans>
   ```

6. 创建测试类，从spring容器中获取目标对象（实际就是代理对象）。通过代理执行方法，实现aop的功能增强。

   ```java
   public class test {
       @Test
       public void testMyAspect(){
           String config = "applicationContext.xml";
           ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
           SomeService proxy =  context.getBean("someService",SomeService.class);
   
           //通过代理的方法proxy，实现目标方法执行时，增强了功能
           proxy.doSome("陆诚",25);
       }
   }
   ```

​		最终结果：

```
前置通知，切面功能：在目标方法之前输出执行时间：Sat Mar 19 19:13:37 CST 2022
===执行doSome()方法===
```

如果要在切面类中获取业务方法的参数，需要用到JoinPoint。

JoinPoint的作用是可以在通知方法中获取方法执行时的信息，例如方法名称、方法的实参。如果你的切面功能中需要用到方法的信息，就加入JoinPoint。这个JoinPoint参数的值由框架赋予，且**必须是第一个位置的参数**。

在上例中的myBefore()方法中添加JoinPoint参数。

```java
public void myBefore(JoinPoint jp){
    //获取方法的完整定义
    System.out.println("方法的签名（定义）="+jp.getSignature());
    System.out.println("方法的名称="+jp.getSignature().getName());
    //获取方法的实参
    Object[] args = jp.getArgs();
    for (Object arg :args) {
        System.out.println("参数="+arg);
    }
    //就是你切面要执行的功能代码
    System.out.println("2=======前置通知，切面功能：在目标方法之前输出执行时间："+new Date());
}
```

最终结果：

```
方法的签名（定义）=void org.example.ba01.SomeService.doSome(String,Integer)
方法的名称=doSome
参数=陆诚
参数=25
2=======前置通知，切面功能：在目标方法之前输出执行时间：Sun Mar 20 16:29:15 CST 2022
===执行doSome()方法===
Process finished with exit code 0
```

##### @AfterReturning

```java
/**
 * @AfterReturning:后置通知
 *  属性：1、value 切入点表达式
 *       2、 returning 自定义的变量，表示目标方法的返回值的。
 *          自定义变量名必须和通知方法的形参名一样
 *  位置:在方法定义的上面
 */
@AfterReturning(value = "execution(* *..SomeServiceImpl.doOther(..))",returning = "res")
public void myAfterReturning(Object res){
    //Object res:是目标方法执行后的返回值，根据返回值做你的切面的功能处理
    System.out.println("后置通知：在目标方法之后执行的，返回值是："+res);
}

@AfterReturning(value = "execution(* *..SomeServiceImpl.doOther2(..))",returning = "res")
public void myAfterReturning1(Object res){
    System.out.println("后置通知：在目标方法之后执行的，返回值是："+res);
}
```

```java
public class test {
    @Test
    public void testAfterReturning(){
        String config = "ba02/applicationContext.xml";
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
        SomeService proxy = context.getBean("someService", SomeService.class);
        String s = proxy.doOther("陆诚", 25);
        Student student = proxy.doOther2("陆耀南", 57);
        System.out.println(student);
    }
}
```

执行结果：

```
===执行doOther()方法===
后置通知：在目标方法之后执行的，返回值是：abcd
===执行doOther2()方法===
后置通知：在目标方法之后执行的，返回值是：org.example.ba02.Student@58e1d9d
```

##### @Around环绕通知

```java
/**
 * @Aspect:是aspectJ框架中的注解
 *        作用：表示当前类是切面类
 *        切面类：是用来给业务方法增加功能的类，在这个类中有切面的功能代码
 *        位置：在类定义的上面
 */
@Aspect
public class MyAspect {
    /**
     * 环绕通知方法的定义格式
     * 1.public 2.必须有一个返回值，推荐使用Object 3、方法名称自定义 4.方法有参数，固定的参数ProceedingJoinPoint
     */
    /**
     * @Around:环绕通知
     *  属性：value 切入点表达式
     *  位置：在方法的定义上面
     * 特点:
     *  1. 它是功能最强的通知
     *  2.在目标方法的前和后都能增强功能
     *  3. 控制目标方法是否被调用执行
     *  4. 修改原来的目标方法的执行结果。影响最后的调用结果
     *
     *  环绕通知，实现的作用等同于jdk动态代理的InvocationHandler接口
     *  ProceedingJoinPoint等同于invoke方法中的Method参数
     *  返回值：就是目标方法的执行结果，可以被修改
     */
    @Around(value = "execution(* *..SomeServiceImpl.doFirst(..))")
    public Object myAround(ProceedingJoinPoint pjp) throws Throwable {
        //实现环绕通知
        Object res = null;
        System.out.println("环绕通知：在目标方法之前，输出时间："+new Date());
        //调用目标方法(通过方法参数进行判断是否执行)
        String name = null;
        Object[] args = pjp.getArgs();
        if(args != null && args.length >1 ){
            name = (String) args[0];
        }
        if("陆诚".equals(name))
            res = pjp.proceed();//相当于res = doFirst();

        System.out.println("环绕通知：在业务方法之后调用非业务方法"+new Date());
        res = "hello myAspectJ框架";//改变目标方法的执行结果
        return res;
    }
}
```

```java
public class test {
    @Test
    public void testAround(){
        String config = "ba03/applicationContext.xml";
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
        SomeService proxy = context.getBean("someService", SomeService.class);
        String s = proxy.doFirst("陆诚", 22);
        System.out.println(s);
    }
}
```

执行结果:

```
环绕通知：在目标方法之前，输出时间：Sun Mar 20 19:55:07 CST 2022
===执行doFirst()方法===
环绕通知：在业务方法之后调用非业务方法Sun Mar 20 19:55:07 CST 2022
hello myAspectJ框架
```

