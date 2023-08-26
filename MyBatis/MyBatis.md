[TOC]

## MyBatis介绍

> MyBatiis是一款优秀的持久层（ORM）repository框架，在实体类和SQL语句间建立映射关系，用于简化JDBC的开发。其中持久层是指将数据存入数据库的那一层。

## MyBatis特性

1. MyBatis是支持定制化SQL、存储过程以及高级映射的优秀持久层框架
2. MyBatis避免了几乎所有的JDBC代码和手动设置参数以及获取结果集
3. MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO(Plain Old Java Objects,普通的java对象)映射成数据库中的记录
4. MyBatis是一个半自动的ORM(Object Relation Mapping)框架

## MyBatis基本要素

1. mybatis-config.xml:mybatis中的全局配置信息文件，主要用于配置连接数据库的环境以及MyBatis的全局配置信息。
2. xml映射文件(mapper)---实体类
3. SqlSession接口

## MyBatis入门案例

查询user表中的所有数据

1. 创建user表，添加数据

2. pom.xml文件中添加mybatis、mysql的依赖

   ```xml
      <dependencies>
           <!--        mybatis的依赖-->
           <dependency>
               <groupId>org.mybatis</groupId>
               <artifactId>mybatis</artifactId>
               <version>3.5.5</version>
           </dependency>
           <!--        mysql驱动的依赖-->
           <dependency>
               <groupId>mysql</groupId>
               <artifactId>mysql-connector-java</artifactId>
               <version>8.0.21</version>
           </dependency>
       <!--        junit的依赖-->
           <dependency>
               <groupId>junit</groupId>
               <artifactId>junit</artifactId>
               <version>4.13</version>
               <scope>test</scope>
           </dependency>
   
   <!--        添加slf4j日志api-->
           <dependency>
               <groupId>org.slf4j</groupId>
               <artifactId>slf4j-api</artifactId>
               <version>1.7.20</version>
           </dependency>
   <!--        添加logback-classic依赖-->
           <dependency>
               <groupId>ch.qos.logback</groupId>
               <artifactId>logback-classic</artifactId>
               <version>1.2.3</version>
           </dependency>
   <!--        添加logback-core依赖-->
           <dependency>
               <groupId>ch.qos.logback</groupId>
               <artifactId>logback-core</artifactId>
               <version>1.2.3</version>
           </dependency>
       </dependencies>
   ```

3. 编写MyBatis核心配置文件 -->替换连接信息，解决硬编码问题

```xml
 <!--    设置别名-->
    <typeAliases>
        <!-- name:实体类所在的包名,将包下所有的类型设置为默认的类型别名，且别名不区分大小写-->
        <package name="mybatis.pojo"/>
<!--        将pojo中的User实体类设置一个User的别名,以后在其他地方引用该实体类时，可以直接使用别名-->
<!--        <typeAlias type="mybatis.pojo.User" alias="User"></typeAlias>-->
    </typeAliases>
<!--  数据库连接信息-->
   <environments default="development">
<!--      environment: 配置某个具体的环境
          id:该环境的唯一标识，不能重复
-->
        <environment id="development">
<!--     transactionManager:设置事务管理方式,有JDBC和MANAGED两种属性
         JDBC:表示当前环境中，执行SQL时，使用的时JDBC中原生的事务管理方法，事务的提交或者回滚需要手动处理
         MANAGED:被其他框架管理，如Spring
    -->
            <transactionManager type="JDBC"></transactionManager>
<!--            dataSource：配置数据源
                属性:type，设置数据源的类型，有POOLED|UNPOOLED|JNDI
                                POOLED:表示使用数据库连接池缓存数据库连接
                                UNPOOLED:表示不使用数据库连接池
                                JNDI:表示使用上下文中的数据源
-->
            <dataSource type="POOLED">
<!--                设置连接数据库的驱动-->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
<!--                设置连接数据库的连接地址-->
                <property name="url" value="jdbc:mysql://localhost:3306/dbtest5?serverTimezone=GMT"/>
<!--                设置连接数据库的用户名-->
                <property name="username" value="root"/>
<!--                设置连接数据库的密码-->
                <property name="password" value="13921350895lc"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <!--        加载sql映射文件-->
<!--        引入单个映射xml文件-->
<!--        <mapper resource="mappers/UserMapper.xml"></mapper>-->
        <!-- name:sql映射文件所在的包名-->
<!--        1. mapper接口所在的包要和映射文件所在的包一致
            2. mapper接口要和映射文件的名字一致-->
        <package name="mybatis.mapper"/>
    </mappers>
```

4. 编写SQL映射文件 -->统一管理sql语句，解决硬编码问题

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--sql映射文件-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--namespace 名称空间:类似package的作用-->
<!--resultType:将sql结果集转化成java类型，这里是转化为entity.user类 -->
<mapper namespace="test">
    <select id="selectAll" resultType="entity.User">
        select * from user
    </select>
</mapper>
```

5. 编码
   1. 定义数据库的字段实体类
   1. 加载核心配置文件，获取SqlSessionFactory对象
   1. 获取SqlSession对象，执行SQL语句

   4. 释放资源

```java
//1.加载mybatis的核心配置文件，获取SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
// 2. 获取SqlSession对象，用它来执行sql
        SqlSession sqlSession = sqlSessionFactory.openSession();
//  3.执行url
        List<User> list = sqlSession.selectList("test.selectAll");
        list.forEach(System.out::println);

//        4. 释放资源
        sqlSession.close();
```

## Mapper代理开发

### 目的

* 解决选择对应sql语句的硬编码问题
* 简化后期执行sql语句

### 步骤

1. 定义与**SQL映射文件同名**的Mapper接口，并且将Mapper接口和SQL映射文件**放置在同一目录**下。放置在同一目录下的操作不是指在工程项目架构中直接拖入到接口目录中，而是在resources文件中添加一个文件夹，该文件夹的实际路径与Mapper接口文件一致，这样可以做到在工程目录中xml文件放在resources文件夹，mapper接口文件放在java源文件中，而最终导出的target目录中xml文件和对应的mapper接口文件是在同一个目录下的。

   ![image-20211117192011019](https://gitee.com/lulununuhuhu/img/raw/master/img/202203211055168.png)

2. 设置SQL映射文件的namespace属性为Mapper接口全限定名

   ```xml
   <mapper namespace="entity.mapper.UserMapper">
       <select id="selectAll" resultType="entity.User">
           select * from user
       </select>
   </mapper>
   ```

3. 在Mapper接口中定义方法，方法名就是sql映射文件中sql语句的id，并保持参数类型和返回值类型一致。

	```java
public interface UserMapper {
    List<User> selectAll();
}
	```

4. 编码

1. 通过SqlSession的getMapper方法获取Mapper接口的代理对象
2. 调用对应方法完成sql的执行

```java
//1.加载mybatis的核心配置文件，获取SqlSessionFactory
        String resource = "mybatis-config.xml";
        InputStream inputStream = Resources.getResourceAsStream(resource);
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
// 2. 获取SqlSession对象，用它来执行sql
        SqlSession sqlSession = sqlSessionFactory.openSession();

//3. 获取UserMapper的代理对象
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> list = mapper.selectAll();
        list.forEach(System.out::println);

//        4. 释放资源
        sqlSession.close();
```

细节：如果Mapper接口名称和SQL映射文件名称相同并在同一目录下，则可以使用包扫描的方式简化加载过程。

```xml
    <mappers>
<!--        加载sql映射文件-->
<!--        mapper代理方式，加载sql映射文件直接在该文件夹下扫描-->
        <package name="entity.mapper"/>
    </mappers>
```

## Mybats核心配置文件

MyBatis的配置文件会深深影响MyBatis行为的设置和属性。下面介绍几种属性

* <environments>：配置数据库连接环境，可以配置多个environment，通过default指定使用哪个environment
* <dataSoucre> 配置数据库的连接信息包括driver，user，root，url。

具体配置属性介绍：[配置_MyBatis中文网](https://mybatis.net.cn/configuration.html)

**注：配置不同属性时要遵循指定的顺序，否则会报错**

## 使用Mybatis进行增删改查

### 查询

1. 创建sql文件，创建一个tb_brand表

```sql
-- 删除tb_brand表
drop table if exists tb_brand;
-- 创建tb_brand表

create table tb_brand
(
    -- id 主键
    id           int primary key auto_increment,
    -- 品牌名称
    brand_name   varchar(20),
    -- 企业名称
    company_name varchar(20),
    -- 排序字段
    ordered      int,
    -- 描述信息
    description  varchar(100),
    -- 状态：0：禁用  1：启用
    status       int
);
-- 添加数据
insert into tb_brand (brand_name, company_name, ordered, description, status)
values ('三只松鼠', '三只松鼠股份有限公司', 5, '好吃不上火', 0),
       ('华为', '华为技术有限公司', 100, '华为致力于把数字世界带入每个人、每个家庭、每个组织，构建万物互联的智能世界', 1),
       ('小米', '小米科技有限公司', 50, 'are you ok', 1);


select * from tb_brand
```

![image-20211118172517977](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211118172517977.png)

2. 为tb_brand表添加对应的实体类

```java
package entity;

/**
 * Brand实体类
 */
public class Brand {
    private int id;
    private String brandName;
    private String companyName;
    private int ordered;
    private String description;
    private int status;

    public Brand() {
    }

    public Brand(int id, String brandName, String companyName, int ordered, String description, int status) {
        this.id = id;
        this.brandName = brandName;
        this.companyName = companyName;
        this.ordered = ordered;
        this.description = description;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Brand{" +
                "id=" + id +
                ", brandName='" + brandName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", ordered=" + ordered +
                ", description='" + description + '\'' +
                ", status=" + status +
                '}';
    }
}
```

3. 分别创建UserMapper接口和UserMapper.xml（sql映射文件）

```java
public interface UserMapper {
    List<User> selectAll();
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!--sql映射文件-->
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--namespace 名称空间:类似package的作用-->
<mapper namespace="entity.mapper.UserMapper">
    <select id="selectAll" resultType="entity.User">
        select * from user
    </select>
</mapper>
```

4. 编码，依次按照加载mybatis配置文件--->获取sqlSession-->获取Mapper接口的代理对象-->选择接口的对象的执行方法-->关闭sqlSession的步骤进行

```java
//1.加载mybatis的核心配置文件，获取SqlSessionFactory
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//2.获取sqlSession对象
SqlSession sqlSession = sqlSessionFactory.openSession();
//3.获取Mapper接口的代理对象
BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);
//4.执行方法
List<Brand> brandList = mapper.selectAll();
brandList.forEach(System.out::println);

//关闭对象的连接
sqlSession.close();
```

最终结果：![image-20211118174333464](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211118174333464.png)

brandName、companyName两个字段没有查询到数据，原因就是数据表中的字段名和类中的属性名不一致，根据在学JDBC中的经验可知，可以在sql语句中添加别名，使字段名和对应的属性名一致。

在Mybatis中，可以通过配置实现更好的解决方法。

#### 字段和属性名映射

使用<resutltMap>标签进行字段和类属性名之间的映射。

```xml
<!--    id:resultMap的唯一标识
        type:映射的类型，可以用别名
		property:设置映射关系中对应实体类的属性名
		column:设置映射关系中的字段名
-->
<resultMap id="BrandResultMap" type="entity.Brand">
    <result column="brand_name" property="brandName"/>
    <result column="company_name" property="companyName"/>
</resultMap>
```

```xml
<!-- 将resultType替换成resultMap属性，属性值即为对应的id-->    
    <select id="selectAll" resultMap="BrandResultMap">
        select * from tb_brand
    </select>
```

```xml
<resultMap id="EmpResultMap" type="Emp">
    <id column="eid" property="eid"/>   <!--设置主键的映射关系-->
    <result column="emp_name" property="empName"/>  <!--设置普通字段的映射关系-->
</resultMap>
```

```xml
<select id="getAllEmp" resultMap="EmpResultMap">
    select * from t_emp
</select>
```

#### 条件查询

1. 通过id查询对应信息
   * 接口中声明对应的方法

```java
//查询表中指定id的信息
Brand selectById(int id);
```

* 在对应的xml配置文件中添加具体的sql语句

```xml
<select id="selectById" parameterType="int" resultMap="BrandResultMap">
    select * from tb_brand where id = #{id}
</select>
```

* 同理，在测试文件中依次进行调用selectById方法。

注：

1. 当sql语句中需要有占用符时，在xml中有两种表示方式：`#{}`和`${}`。其中：
   * `#{}`在执行SQL时，会将`#{}`占位符替换为?，会对要赋值的属性自动加单引号来自动设置参数值;`${}`是直接和sql进行**硬拼接**，会存在[SQL注入问题](E:/学习笔记/JDBC/获取数据库连接)。
   * 在进行参数传递时，一般使用`#{}`，如果要对表名、列名进行动态设置的话，只能使用`${}`进行sql拼接。
2. 由于在mybatis框架中，sql语句写在xml文件中，在sql语句中的`<``>`等符号在xml语句中会引起语法冲突，所以需进行特殊处理。
   * 转义字符
   * <！[CDATA[特殊字符]]>

#### 多条件查询

> 在多条件的指定以下，可以有三种方式进行sql条件的指定。

本例中以`status` `companyName` `brandName`三种条件进行举例：

1. ```java
   //以注解方式传递条件参数
   List<Brand> selectByCondition(@Param("status")int status,@Param("companyName")String companyName,@Param("brandName")String brandName);
   ```

2. ```java
   //以封装成对象形式传递条件参数
   List<Brand> selectByCondition(Brand brand);
   ```

3. ```java
   //以Map的键值对形式传递，需要保证sql中的参数名和map中的键名一致
   List<Brand> selectByCondition(Map map);
   ```

对应映射文件中的sql查询语句如下:

```xml
    <select id="selectByCondition" resultMap="BrandResultMap">
        select * from tb_brand where
        status = #{status}
        and company_name like "%"#{companyName}"%"
        and brand_name like "%"#{brandName}"%"
    </select>
```

实际开发方式中，方式1和方式2用的最多。

> 总结：mybatis获取参数值，主要有以下几种方式：

![image-20220429094731120](C:/Users/lucheng/AppData/Roaming/Typora/typora-user-images/image-20220429094731120.png)

> 注：常用的@param注解方式中，mybatis在底层实现了一个map集合，分别以@param注解的值为键和param(i)为键，param(i)和第i个@param注解的值是一一对应的。
>
> 举例：一个SQL映射方法的参数是(@Param("username")String username,@Param("password")String password),声明参数为("admin",123456)。在mybatis底层执行后就会有[("username","admin"),("param1","admin"),("password","123456"),("param2","123456")]四个键值对。

#### 模糊查询

模糊查询就是在SQL语句中要使用到LIKE关键字，以及·`%` `_`等一些关键字。然而在使用#{}方式接收传入参数时，字符串不能正确拼接，导致异常。举例如下：

```xml
<select id="getUserByLike"  resultType="mybatis.pojo.User">
    select * from tb_user where userNAME like '%#{username}%'
</select>
```

```java
/**
 * 根据用户名模糊查询用户信息
 * 通过使用@Param注解，将对应的键值对显示的对应起来
 */
User getUserByLike(@Param("username") String username);
```

创建sqlSession调用getUserByLike方法后，报错如下： Cause: org.apache.ibatis.type.TypeException: Could not set parameters for mapping: ParameterMapping{property='username', mode=IN。

问题原因：教程没讲，可能就是模糊查询表达式中#{}占位符会自动在参数上加上单引号，这就导致了%%之间又多了一个单引号导致解析错误。

解决方法1：使用${}代替#{}，这时采用硬注入可以解决问题

```sql
select * from tb_user where userNAME like '%${username}%'
```

解决方法2: 使用concat()方法进行字符串拼接

```sql
select * from tb_user where UserNAME like concat('%',#{username},'%')
```

解决方法3（最常用）：使用双引号直接拼接

```sql
select * from tb_user where UserNAME like "%"#{username}"%"
```

#### 级联属性赋值

级联属性赋值，适用于在多表联查的情况下，需要在主表中声明从表对应的实体引用类，并在xml配置文件中建立级联的映射关系。

本例中，使用emp表和dept表查询员工和对应部门的信息，需要用到联合查询。

```java
private Integer eid;
private String empName;
private Integer age;
private String sex;
private String email;
//在emp实体类中添加引用类型Dept
private Dept dept;
```

```xml
<!--  级联属性赋值  -->
    <resultMap id="empAndDeptResultMapOne" type="Emp">
        <id property="eid" column="eid"></id>
        <result property="empName" column="emp_name"></result>
        <result property="dept.did" column="did"></result>
        <result property="dept.deptName" column="dept_name"></result>
    </resultMap>
```

```xml
<!--    两表联合查询-->
    <select id="getEmpAndDept" resultMap="empAndDeptResultMapOne">
        select * from t_emp
        left join t_dept
        on t_emp.did = t_dept.did
        where t_emp.eid = #{eid}
    </select>
```

#### 动态条件查询

> 当用户只是输入了部分条件时，sql语句会随着用户选择条件的变化而变化，我们称为动态SQL
>
> MyBatis通过使用关键字标签实现sql的动态性，具体可参考文档：[动态 SQL_MyBatis中文网](https://mybatis.net.cn/dynamic-sql.html)

本例中我们有`status` `companyName` `brandName`，通过动态SQL可以实现用户输入不同条件下不同的SQL语句，主要通过<if>标签进行。<if>标签：根据if标签中的test属性的表达式条件决定是否if标签中的查询语句是否添加到sql语句中

```xml
<select id="selectByCondition" resultMap="BrandResultMap">
    select * from tb_brand where
    <if test="status != null and status !=''">
        status = #{status}
    </if>
    <if test="companyName != null and companyName !=''">
        and company_name like "%"#{companyName}"%"
    </if>
    <if test="brandName !=null and brandName != ''">
        and brand_name like "%"#{brandName}"%"
    </if>
</select>
```

> 问题：当用户没输入status条件时，会报错。生成的SQL语句如下：

```sql
select * from tb_brand where  and company_name like ? and brand_name like ?
```

>  答：由于没有status条件，导致不会读入status语句，而从第二个语句开始，导致了SQL语法错误。

> 解决方法:使用<where>标签代替where关键字，该标签可以帮我们把前面的and去掉  
>
> ```xml
> <select id="selectByCondition" resultMap="BrandResultMap">
>     select * from tb_brand
>     <where>
>     <if test="status != null">
>         and status = #{status}
>     </if>
>     <if test="companyName != null and companyName !=''">
>          and company_name like "%"#{companyName}"%"
>     </if>
>     <if test="brandName !=null and brandName != ''">
>          and brand_name like "%"#{brandName}"%"
>     </if>
>     </where>
> </select>
> ```

#### 单条件动态查询

适用于以下应用场景：![image-20211120204517492](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211120204517492.png)

当要查询的字段不确定，且是通过checkbox列框的形式选择的时候，需要对查询的字段做出动态处理。这种情况适合用`choose(when,otherwise)`进行选择，类似于Java中的switch语句,只对一条满足的判断条件里的sql语句动态拼接后后面的语句就不会再拼接了。

```xml
<select id="selectBySingleCondition" resultMap="BrandResultMap">
    select * from tb_brand
    <where>
        <choose>
            <when test="status != null">
                status = #{status}
            </when>
            <when test="companyName != null and companyName !=''">
                company_name like %""#{companyName}"%"
            </when>
            <when test="brandName !=null and brandName != ''">
                brand_name like "%"#{brandName}"%"
            </when>
            <otherwise>
                id = 1
            </otherwise>
        </choose>
    </where>
</select>
```

```xml
 <select id="getEmpByChoose" resultMap="EmpResultMap">
-- 判断条件中满足一个表达式后其他表达式就不会执行了
        select * from t_emp
        <where>
            <choose>
                <when test="empName != null and empName != ''">
                    emp_name = #{empName}
                </when>
                <when test="age != null and age != ''">
                    age = #{age}
                </when>
                <when test="sex != null and sex != ''">
                    sex = #{sex}
                </when>
                <when test="email != null and email != ''">
                    email = #{email}
                </when>
                <otherwise>
                    did = 1
                </otherwise>
            </choose>
        </where>
    </select>
```

### 添加

基本步骤:

1. 编写接口方法：Mapper接口

   * 参数:除了id之外的所有数据

   * 结果：void

2. 编写SQL语句：SQL映射文件

3. 执行方法，测试

   * MyBatis事务
   * openSession():默认关闭自动提交，进行增删改操作后需要使用sqlSession.commit();手动提交事务

添加后需获取某个表中某个主键的值，比如在添加订单信息后获取自动生成的订单id时，在映射文件中添加useGeneratedKeys和keyProperty属性

```xml
<!--使用主键值，将主键值返回给keyProperty设置的属性值id-->
<insert id="add" useGeneratedKeys="true" keyProperty="id" >
    insert into tb_brand(brand_name,company_name,description,status) 
    values(#{brandName},#{companyName},#{description},#{status});
</insert>
```

### 修改

#### 修改全部字段

```xml
<update id="update" useGeneratedKeys="true" keyProperty="description">
    update tb_brand set brand_name=#{brandName},company_name=#{companyName},ordered=#{ordered},description=#{description},status=#{status}
    where id=#{id};
</update>
```

#### 动态修改指定字段

某些场景只需改变几个字段的值，如果使用上一种方法的话，不改变的字段也要再封装到对象中，比较繁琐。可以运用动态查询的思路，实现动态修改指定字段的功能。

```xml
<update id="update">
    update tb_brand
    <set>
        <if test="brandName != null and brandName !='' ">
            brand_name=#{brandName},
        </if>
        <if test="companyName != null and companyName !=''">
            company_name=#{companyName},
        </if>
        <if test="ordered != null">
            ordered=#{ordered},
        </if>
        <if test="description != null and description !=''">
            description=#{description},
        </if>
        <if test="status != null">
            status=#{status}
        </if>
    </set>
    where id=#{id};
</update>
```

### 删除

#### 批量删除

方式一：使用<foreach>标签,属性有

collection:设置需要循环遍历的数组或集合;

item:表示数组或集合中的每一项;

separator：循环体之间的分隔符;

open：foreach标签循环体最开始的开始符号;

close:foreach标签循环体结束的符号

```xml
<delete id="deleteByIds">
    delete from tb_brand where id
    in
    <foreach collection="array" item="id" separator="," open="(" close=")">
        #{id}
    </foreach>
</delete>
```

方式二：使用${}和String参数传参

```java
int deleteMore(@Param("ids") String ids);
```

```xml
<delete id="deleteMore">
    delete from tb_user where id in (${ids})
</delete>
```

```java
SqlSession sqlSession = SqlSessionUtils.getSqlSession();
SqlMapper mapper = sqlSession.getMapper(SqlMapper.class);
int i = mapper.deleteMore("1,2,3");
System.out.println("更新结果:"+i);
```

## 注解开发

## MyBatis的缓存

### MyBatis的一级缓存

一级缓存是**SqlSession级别**的，通过**同一个SqlSession查询的数据会被缓存**，下次查询相同的数据，就会从缓存中直接获取，不会从数据库重新访问。

使一级缓存失效的情况：

1. 不同的SqlSession对应不同的一级缓存
2. 同一个SqlSession但是查询条件不同
3. 同一个SqlSession两次查询期间执行了任何一次增删改操作
4. 同一个SqlSession两次查询期间手动清空了缓存

---
```java
	//同一个sqlSession，不同的mapper对象
	@Test
    public void testCache(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        CacheMapper mapper1 = sqlSession.getMapper(CacheMapper.class);
        User user = mapper1.getUserById(4);
        System.out.println(user);
        User user1 = mapper1.getUserById(4);
        System.out.println(user1);
    }
```

结果:只执行了一次SQL语句

```
Opening JDBC Connection
Created connection 792782299
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userNAME, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
```

---

```java
//不同sqlSession对象
    @Test
    public void testCache2(){
        SqlSession sqlSession1 = SqlSessionUtils.getSqlSession();
        CacheMapper mapper1 = sqlSession1.getMapper(CacheMapper.class);
        User user1 = mapper1.getUserById(4);
        System.out.println(user1);
        SqlSession sqlSession2 = SqlSessionUtils.getSqlSession();
        CacheMapper mapper2 = sqlSession2.getMapper(CacheMapper.class);
        User user2 = mapper2.getUserById(4);
        System.out.println(user2);
    }
```

结果：执行了两次SQL语句

```java
Opening JDBC Connection
Created connection 1988644427.
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userNAME, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
    
Opening JDBC Connection
Created connection 1068945248.
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userNAME, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
```

---

```java
   //同一个sqlSession，但是查询条件不同
	@Test
    public void testCache1(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        CacheMapper mapper1 = sqlSession.getMapper(CacheMapper.class);
        User user = mapper1.getUserById(4);
        System.out.println(user);
        User user1 = mapper1.getUserById(5);
        System.out.println(user1);
    }
```

结果：执行了两次SQL语句

```
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userNAME, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 5(Integer)
<==    Columns: id, userNAME, password, age, sex, email
<==        Row: 5, 李四, 123456, 25, 女, 15261809883@qq.com
<==      Total: 1
```

---

```java
//两个相同条件的查询之间添加了一个插入语句	
@Test
public void testCache1(){
    SqlSession sqlSession = SqlSessionUtils.getSqlSession();
    CacheMapper mapper1 = sqlSession.getMapper(CacheMapper.class);
    User user = mapper1.getUserById(4);
    System.out.println(user);
    int i = mapper1.insertUser(new User(null, "鹿丸", "1078496642", 23, "男", "15261809883@163.com"));
    System.out.println("执行结果:"+i);
    User user1 = mapper1.getUserById(4);
    System.out.println(user1);
}
```

结果：执行了两次相同查询条件的sql语句

```
pening JDBC Connection
Created connection 726408598.
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userName, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}
==>  Preparing: insert into tb_user values (?,?,?,?,?,?)
==> Parameters: null, 鹿丸(String), 1078496642(String), 23(Integer), 男(String), 15261809883@163.com(String)
<==    Updates: 1
执行结果:1
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userName, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}
```

---

```java
//两次查询期间进行清空缓存
@Test
public void testCache3(){
    SqlSession sqlSession = SqlSessionUtils.getSqlSession();
    CacheMapper mapper = sqlSession.getMapper(CacheMapper.class);
    User user = mapper.getUserById(4);
    System.out.println(user);
    sqlSession.clearCache();//清空缓存，只对一级缓存有效
    User user1 = mapper.getUserById(4);
    System.out.println(user1);
}
```

```
Opening JDBC Connection
Created connection 726408598.
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userName, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userName, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}

```

### Mybatis的二级缓存

二级缓存是**SqlSessionFactory级别**的，通过同一个SqlSessionFactory创建的SqlSession查询的结果会被缓存；此后若再次执行相同的查询语句，结果就会从缓存中获取。

二级缓存开启的条件：

1. 在核心配置文件中，设置全局配置属性cacheEnabled="true",默认为true，不需要设置
2. 在映射文件中设置标签<cache />
3. 二级缓存必须在**SqlSession关闭或提交之后有效**
4. 查询的数据所转换的实体类类型必须实现序列化接口Serializable
5. 必须使用的是同一个SqlSessionFactory

二级缓存失效的情况：

两次查询之间执行了任意的增删改，会使一级和二级缓存同时失效。

```java
@Test
public void testTowCache(){
    try
    {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        //保证同一个SqlSessionFactory
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
        SqlSession sqlSession1 = sqlSessionFactory.openSession(true);
        CacheMapper mapper1 = sqlSession1.getMapper(CacheMapper.class);
        System.out.println(mapper1.getUserById(4));
        sqlSession1.close();//关闭sqlsession对话
        SqlSession sqlSession2 = sqlSessionFactory.openSession(true);
        CacheMapper mapper2 = sqlSession2.getMapper(CacheMapper.class);
        System.out.println(mapper2.getUserById(4));
        sqlSession2.close();//关闭sqlsession对话
    }
    catch (IOException e){
        e.printStackTrace();
    }
}
```

结果：第二次查询直接从二级缓存中获取

```
Opening JDBC Connection
Created connection 1033917063.
==>  Preparing: select * from tb_user where id = ?
==> Parameters: 4(Integer)
<==    Columns: id, userName, password, age, sex, email
<==        Row: 4, 张三, 13921350895lc, 23, 男, 1078496642@qq.com
<==      Total: 1
User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}
Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@3da05287]
Returned connection 1033917063 to pool.
Cache Hit Ratio [mybatis.mapper.CacheMapper]: 0.5
User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}
```

### MyBatis缓存查询的顺序

> 先查询二级缓存，然后查询一级缓存。二级缓存的内容中有多个sqlsession，一级缓存对应一个sqlsession

* 先查询二级缓存，因为二级缓存中可能会有其他程序已经查出来的数据，可以拿来直接使用
* 如果二级缓存没有命中，再查询一级缓存
* 如果一级缓存也没有命中，则再查询数据库
* SqlSession关闭之后，一级缓存中的数据会写入二级缓存

## MyBatis的逆向工程

正向工程:先创建Java实体类，由框架负责根据实体类生成数据库表。Hibernate是支持正向工程的。

逆向工程：先创建数据库表，由框架负责根据数据库表，反向生成如下资源：Java实体类、Mapper接口、Mapper映射文件。

### 创建逆向工程的步骤

1. 添加依赖和插件

   ```xml
   <!--        MyBatis generator 逆向工程-->
           <dependency>
               <groupId>org.mybatis.generator</groupId>
               <artifactId>mybatis-generator-core</artifactId>
               <version>1.3.5</version>
           </dependency>
   ```

2. 编写MyBatis逆向工程的配置文件

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE generatorConfiguration
           PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
           "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
   <!--targetRuntime:执行生成的逆向工程的版本
       MyBatis3Simple:生成基本的CURD语句(简洁版)
       MyBatis3:生成带条件的CRUD（完整版）
   -->
   <generatorConfiguration>
       <context id="DB2Tables" targetRuntime="MyBatis3">
           <commentGenerator>
               <property name="suppressAllComments" value="true"/>
           </commentGenerator>
   <!--   配置数据库连接     -->
           <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                           connectionURL="jdbc:mysql://localhost:3306/ssm_crud?serverTimezone=GMT"
                           userId="root"
                           password="13921350895lc">
           </jdbcConnection>
   
           <javaTypeResolver >
               <property name="forceBigDecimals" value="false" />
           </javaTypeResolver>
   
   <!--        指定JavaBean生成的位置-->
           <javaModelGenerator targetPackage="crud.bean" targetProject=".\src\main\java">
               <property name="enableSubPackages" value="true" />
               <property name="trimStrings" value="true" />
           </javaModelGenerator>
   
   <!--        指定sql映射文件生成的位置-->
           <sqlMapGenerator targetPackage="mapper"  targetProject=".\src\main\resources">
               <property name="enableSubPackages" value="true" />
           </sqlMapGenerator>
   
   <!--        指定dao接口生成的位置,mapper接口类-->
           <javaClientGenerator type="XMLMAPPER" targetPackage="crud.dao"  targetProject=".\src\main\java">
               <property name="enableSubPackages" value="true" />
           </javaClientGenerator>
   
   <!--        table指定每个表的生成策略-->
           <table tableName="tbl_emp" domainObjectName="Employee"></table> <!--tb1_emp对应的类是Employee类-->
           <table tableName="tbl_dept" domainObjectName="Department"></table><!--tb1_dept对应的类是Department类-->
   
       </context>
   </generatorConfiguration>
   ```

3. 生成工程文件

   ```java
   @Test
   public void testMBG() throws XMLParserException, IOException, SQLException, InterruptedException, InvalidConfigurationException {
       List<String> warnings = new ArrayList<String>();
       boolean overwrite = true;
       File configFile = new File("mbg.xml");
       ConfigurationParser cp = new ConfigurationParser(warnings);
       Configuration config = cp.parseConfiguration(configFile);
       DefaultShellCallback callback = new DefaultShellCallback(overwrite);
       MyBatisGenerator myBatisGenerator = new MyBatisGenerator(config, callback, warnings);
       myBatisGenerator.generate(null);
   }
   ```

### 生成结果

Bean包中生成了Department、DepartmentExample、Employee、EmployeeExample四个类，Mapper包中生成了DepartmentMapper、EmployeeMapper两个接口类，resources目录下生成了两个DepartmentMapper.xml和EmployeeMapper.xml两个映射文件。

### 生成结果方法分析

查询:

```java
Employee selectByPrimaryKey(Integer empId);
List<Employee> selectAll();
Employee selectByPrimaryKey(Integer empId);
List<Employee> selectByExample(EmpExample example);
```

其中selectByExample可以通过EmpExample类定义查询的条件包括Between、等于大小、IN之类的。

修改：

```java
int updateByExampleSelective(@Param("record") Emp record,@Param("example")EmpExample example);
int updateByExample(@Param("record")Emp record,@Param("example")EmpExample example);
int updateByPrimaryKeySelective(Emp record);
int updateByPrimaryKey(Emp record);
```

其中updateByExampleSelective是根据插入的对象的条件进行有选择的更改，如果传入的参数是null，那么该字段不会被修改，而updateByExample是根据形参的所有对象的值（不管是不是null）都进行更改。

updateByPrimaryKeySelective和updateByPrimaryKey同理。

4. 测试生成的mapper文件

   ```java
   //查询所有数据
   List<Emp> list = mapper.selecyByExample(null);
   
   //根据条件查询(QBC方式)
   EmpExample example = new EmpExample();
   example.createCriteria().andEmpNameEqualTo("张三");//创建条件，查找员工名为张三的信息
   List<Emp> list = mapper.selectByExample(example);
   example.createCriteria().andEmpNameEqualTo("张三").andAgeGreaterThanOrEqual(25);//创建条件，查找员工名为张三且年龄大于25的信息
   List<Emp> list = mapper.selectByExample(example);
   example.or().andDidIsNotNull();//在上述and条件的基础下增加or条件Did非空
   
   ```

## 分页插件

### 分页插件使用步骤

1. 添加依赖

   ```xml
   <dependency>
       <groupId>com.github.pagehelper</groupId>
       <artifactId>pagehelper</artifactId>
       <version>5.2.0</version>
   </dependency>
   ```

2. 在mybatis全局配置文件中配置分页插件

   ```xml
       <plugins>
   <!--        设置分页插件-->
           <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
       </plugins>
   ```

### 分页插件的使用

```java
/**
 * limit index,pageSize
 * index:当前页的起始索引
 * pageSize:每页显示的条数
 * pageNum:当前页的页码
 *index = (pageNum-1)*pageSize
 */
    @Test
    public void PageHelperTest(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        limitMapper mapper = sqlSession.getMapper(limitMapper.class);
        PageHelper.startPage(1,2);//设定当前页码为1，每页数量是2
        List<User> allUser = mapper.getAllUser();
        PageInfo<User> pageInfo = new PageInfo<>(allUser, 5);//配置分页导航的信息区间大小为5页
        System.out.println(pageInfo);
        //System.out.println(allUser);
    }
```

```
PageInfo{pageNum=1, pageSize=2, size=2, startRow=1, endRow=2, total=7, pages=4, list=Page{count=true, pageNum=1, pageSize=2, startRow=0, endRow=2, total=7, pages=4, reasonable=false, pageSizeZero=false}[User{id=4, userName='张三', password='13921350895lc', age=23, sex='男', email='1078496642@qq.com'}, User{id=5, userName='李四', password='123456', age=25, sex='女', email='15261809883@qq.com'}], prePage=0, nextPage=2, isFirstPage=true, isLastPage=false, hasPreviousPage=false, hasNextPage=true, navigatePages=5, navigateFirstPage=1, navigateLastPage=4, navigatepageNums=[1, 2, 3, 4]}
```

上述结果信息中，显示了多个分页属性信息

* pageNum:当前页
* pageSize:每页数量
* startRow,endRow:开始索引和起始索引
* total:字段数总数
* pages:页面数量
* prePage:上一页的页码数
* nextPage:下一页的页码数
* isFirstPage/isLastPage:是否为第一页/最后一页
* hasPreviousPage/hasNextPage:是否有前一页/后一页
* navigatePages:导航分页的页码数
* navigatepageNums:导航分页的页码范围
