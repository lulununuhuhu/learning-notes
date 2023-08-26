## Spring集成MyBatis

> 将MyBatis与Spring进行整合，主要解决的问题就是将SqlSessionFactory对象交由Spring来管理。所以，该整合只需要将SqlSessionFactory的对象生成器SqlSessionFactoryBean注册在Spring容器中，再将其注入给Dao的实现类即可完成整合。
>
> 实现Spring与MyBatis的常用整合方法：扫描的Mapper动态代理。
>
> 总之，使用Spring集成MyBatis的核心思想就是通过Spring的IOC技术，将MyBatis原本需手动创建的对象（service对象、dao对象、工具类对象等）统一交给Spring容器创建和管理。

### Spring和MyBatis组合使用的一个项目demo

基本步骤：

1. 新建maven项目

2. 加入maven的依赖(spring依赖；mybatis依赖；mysql驱动；spring的事务的依赖；mybatis和spring集成的依赖，用来在spring项目中创建mybatis的SqlSessionFactory，dao对象)

   ```xml
     <dependencies>
       <dependency>
         <groupId>junit</groupId>
         <artifactId>junit</artifactId>
         <version>4.11</version>
         <scope>test</scope>
       </dependency>
       <dependency>
         <groupId>mysql</groupId>
         <artifactId>mysql-connector-java</artifactId>
         <version>8.0.21</version>
       </dependency>
       <dependency>
         <groupId>org.mybatis</groupId>
         <artifactId>mybatis</artifactId>
         <version>3.5.1</version>
       </dependency>
       <dependency>
         <groupId>org.springframework</groupId>
         <artifactId>spring-webmvc</artifactId>
         <version>5.3.16</version>
       </dependency>
       <dependency>
         <groupId>org.springframework</groupId>
         <artifactId>spring-jdbc</artifactId>
         <version>5.3.15</version>
       </dependency>
       <dependency>
         <groupId>org.aspectj</groupId>
         <artifactId>aspectjweaver</artifactId>
         <version>1.9.6</version>
       </dependency>
       <dependency>
         <groupId>org.mybatis</groupId>
         <artifactId>mybatis-spring</artifactId>
         <version>2.0.6</version>
       </dependency>
     </dependencies>
   
     <build>
       <!--      将src/main/java中的xml文件包含进来，输出结果到classes目录中-->
       <resources>
         <resource>
           <directory>src/main/resources</directory>
           <includes>
             <include>**/*.xml</include>
             <include>**/*.properties</include>
           </includes>
           <filtering>true</filtering>
         </resource>
       </resources>
     </build>
   ```
   
3. 创建实体类

   创建一个domain包，创建实体类employees

   ```java
   package org.example.domain;
   
   public class employees {
       private int id;
       private String name;
   
       public employees() {
       }
       public employees(int id, String name) {
           this.id = id;
           this.name = name;
       }
       public int getId() {
           return id;
       }
       public void setId(int id) {
           this.id = id;
       }
       public String getName() {
           return name;
       }
       public void setName(String name) {
           this.name = name;
       }
       @Override
       public String toString() {
           return "employees{" +
                   "id=" + id +
                   ", name='" + name + '\'' +
                   '}';
       }
   }
   ```
   
4. 创建dao接口和对应的mapper文件（dao接口文件创建在java/org/example/mapper中，mapper的配置文件在resources文件夹中创建）

   ```java
   /*
   	dao接口文件
   */
   package org.example.mapper;
   
   import org.example.domain.employees;
   
   import java.util.List;
   
   public interface EmployeesDao {
       public List<employees> queryEmployeesInfo();
   }
   ```

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!--sql映射文件-->
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <!--namespace 名称空间:类似package的作用，指向所在dao接口的全路径-->
   <mapper namespace="org.example.mapper.EmployeesDao">
       <select id="queryEmployeesInfo" resultType="org.example.domain.employees">
           select * from employees
       </select>
   </mapper>
   ```

5. 创建mybatis主配置文件

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!--mybatis的核心配置文件，解决JDBC中对数据库连接的硬编码问题 -->
   <!DOCTYPE configuration
           PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-config.dtd">
   <configuration>
       <!-- mybatis的全局配置文件-->
       <settings>
           <!--        设置mybatis输出日志-->
           <setting name="logImpl" value="STDOUT_LOGGING"/>
       </settings>
   
       <!--    设置别名-->
       <typeAliases>
           <!--        name:实体类所在的包名-->
           <package name="org.example.domain"/>
       </typeAliases>
   
       <mappers>
           <!--        加载sql映射文件-->
           <!-- name:sql映射文件所在的包名-->
           <package name="org.example.mapper"/>
       </mappers>
   </configuration>
   ```

6. 创建employees接口的实现类，声明引用类型属性`SqlSessionTemplate`(实现自SqlSession接口)

   ```java
   package org.example.mapper;
   
   import org.example.domain.employees;
   import org.mybatis.spring.SqlSessionTemplate;
   import java.util.List;
   
   public class EmployeeDaoImpl implements  EmployeesDao{
       private SqlSessionTemplate sqlSession;
       //使用set方法进行spring的set注入
       public void setSqlSessionTemplate(SqlSessionTemplate sqlSession) {
           this.sqlSession = sqlSession;
       }
   
       @Override
       public List<employees> queryEmployeesInfo() {
           EmployeesDao mapper = sqlSession.getMapper(EmployeesDao.class);
           return mapper.queryEmployeesInfo();
       }
   }
   ```

7. 创建spring的配置文件：声明mybatis的对象交给spring创建，包括数据源、SqlSessionFactory、Dao对象、声明自定义的service

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:context="http://www.springframework.org/schema/context"
          xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
       <context:property-placeholder location="classpath:jdbc.properties"/>
       <bean id="myDataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
           <property name="driverClassName"  value="${jdbc.driver}"/>
           <property name="url" value="${jdbc.url}"/>
           <property name="username" value="${jdbc.username}"/>
           <property name="password" value="${jdbc.passwd}"/>
       </bean>
   
       <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
           <property name="dataSource" ref="myDataSource"/>
   <!--        绑定mybatis配置文件-->
           <property name="configLocation" value="classpath:mybatis-config.xml"/>
       </bean>
   
   <!--    sqlSessionTemplate：就是我们使用的sqlSession-->
       <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
   <!--        只能使用构造器注入sqlSessionFactory，因为它没有set方法-->
           <constructor-arg index="0" ref ="sqlSessionFactory"/>
       </bean>
   
       <bean id="employeesMapper" class="org.example.mapper.EmployeeDaoImpl">
           <property name="sqlSessionTemplate" ref="sqlSession"/>
       </bean>
   </beans>
   ```
   
8. 创建测试类，获取service对象，通过service调用dao完成数据库的访问

	```java
	public class MyTest {
	    /**
        * 测试查询结果
        */
       @Test
       public void test1(){
           String config = "spring-config.xml";
           ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
           EmployeesDao mapper = context.getBean("employeesMapper", EmployeesDao.class);
           for (employees employees : mapper.queryEmployeesInfo()) {
	            System.out.println(employees);
	        }
	    }
	
	    /**
	     * 测试插入结果
	     */
	    @Test
	    public void testInsert(){
	        String config = "spring-config.xml";
	        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(config);
	        EmployeesDao mapper = context.getBean("employeesMapper", EmployeesDao.class);
	        int i = mapper.insertInfo(new employees(1004, "张三"));
	        System.out.println("插入结果："+i);
	    }
	}
	```

## Spring的事务

> 事务在MySQL中指的是一组sql语句的集合。这些sql语句集合执行时是作为一个整体执行，要么一起执行成功，要么一起执行失败。
>
> 当操作中涉及到多个表的多个sql语句的操作，需要保证这些语句都是成功才能完成最终功能实现。

在使用JDBC访问数据库处理事务时，通常使用`Connection conn; conn.commit();conn.rollback();`的操作；在使用mybatis访问数据库处理事务时，通常时`SqlSession.commit()`;`SqlSession.rollback();`

在不同的数据库中，访问操作事务的方法和原理都有不同之处。spring提供一种处理事务的统一模型，能使用统一步骤和方式完成多种不同数据库访问技术的事务处理。通过使用spring的事务处理机制，可以完成mybatis、hibernate等其他数据库的访问。

Spring通过声明式事务的方式，将事务相关的资源和内容都提供给了spring，spring就能处理事务提交、回滚。

Spring中的接口`PlatformTransactionManager`，定义了事务重要方法`commit`和`rollback`

不同的数据库对应着不同的实现方法。

mybatis访问数据库对应的是`DataSourceTransactionManager`实现类,`hibernate`访问数据库对应的是`HibernateTransactionManager`实现类。

### 常见的事务类型

1. 事务的隔离级别，有4个值

   DEFAULT:采用DB默认的事务隔离级别。MySql的默认为REPAETABLE_READ（可重复度）；Oracle默认为READ_COMMITTED(读已提交)。

   * READ_UNCOMMITTED:读未提交。未解决任何并发问题
   * READ_COMMITTED:读已提交。解决脏读，存在不可重复读和幻读
   * REPEATABLE_READ:可重复读。解决脏读、不可重复读，存在幻读
   * SERIALIZABLE：串行化。不存在并发问题

2. 事务的超时时间：表示一个方法最长的执行时间，如果一个方法执行超过了指定时间，事务就回滚。单位是秒，整数值，默认是-1

3. 事务的传播特性：控制业务方法是不是有事务的，是什么样的事务的。有7个传播行为，表示你的业务方法调用时，事务在方法之间是如何使用的。常见的有`PROPAGATION_REQUIRED` `PROPAGATION_REQUIRES_NEW` `PROPAGATION_SUPPORTSS`.

      * PROPAGATION_REQUIRED：Spring默认的事务传播行为。指定的方法必须在事务内执行，若当前存在事务，就加入到当前事务中；若当前没有事务，则创建一个新事务。

        ![image-20220325165007003](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220325165007003.png)

      * PROPAGATION_SUPPORTS:指定的方法支持当前事务，但若当前没有事务，也可以以非事务方式执行。

        ![image-20220325165112567](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220325165112567.png)

      * PROPAGATION_REQUIRES_NEW：总是新建一个事务，若当前存在事务，就是当前事务挂起，直到新事务执行完毕。 

        ![image-20220325165337811](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220325165337811.png)

4. 提交事务、回滚事务的时机
   1. 当你的业务方法，执行成功，没有异常抛出，当方法执行完毕，spring在方法执行后提交事务
   2. 当你的业务方法抛出运行时异常（RuntimeException和它的子类），spring执行回滚，调用事务管理器的rollback
   3. 当你的业务方法抛出非运行时异常，主要是受查异常(必须处理的异常如IOException、SQLException等)和ERROR时，提交事务

总结：在使用Spring处理事务时，处理事务的是它的实现类。在创建过程中，需要指定要使用的事务管理器实现类，使用<bean>；指定哪些类，哪些方法需要加入事务的功能；指定方法需要的隔离级别，传播行为，超时等参数。

### 使用Spring的事务注解管理事务

通过@Transaction注解方式，可将事务织入到相应public方法中，实现事务管理。

@Transactional的所有可选属性如下所示：

* propagation:用于设置事务传播属性。该属性类型为Propagation枚举，默认值为Propagation.REQUIRED
* isolation:用于设置事务的隔离级别，。该属性类型为Isolation枚举，默认值为Isolation.DEFAULT
* readOnly:用于设置该方法对数据库的操作是否只是只读的。该属性为boolean，默认值为false
* timeout：用于设置本操作与数据库连接的超时时限。单位为秒，类型为int，默认值为-1，即没有时限。
* rollbackFor：指定需要回滚的异常类。类型为Class[],默认值为空数组。当然，若只有一个异常类时，可以不使用数组。
* rollbackForClassName：指定需要回滚的异常类类名，类型为String[]，默认值为空数组。当然若只有一个异常类，可以不使用数组。
* noRollbackFor:指定不需要回滚的异常类。类型为Class[]，默认值为空数组。当然，若只有一个异常类时，可以不使用数组。
* noRollbackForClassName：指定不需要回滚的异常类类名。类型为String[]，默认值为空数组，当然若只有一个异常类时，可以不使用数组。

## 实战案例搭建

实现一个购买商品的trans_sale项目。本例要实现购买商品，模拟用户下订单，向订单表添加销售记录，从商品表减少库存。

### Step0：创建数据库表

使用navicat建立相关的商品表和销售表。

1. 使用sql语言，创建goods表。

```sql
CREATE TABLE goods(
	id INT PRIMARY KEY NOT NULL,
	name VARCHAR(80) ,
	amount INT,
	price FLOAT
);
```

使用`DESCRIBE goods`查询表结构如下：

![image-20220326153240387](https://gitee.com/lulununuhuhu/img/raw/master/img/202203261532462.png)

2. 使用sql语言，向goods表中插入两个字段数据

