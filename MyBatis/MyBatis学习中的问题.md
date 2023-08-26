



 ## 报错：java.sql.SQLException:The server time zone value XXXXXXXX

![image-20211116142935985](https://gitee.com/lulununuhuhu/img/raw/master/img/202203021128783.png)

问题情况描述：使用的数据库版本是MySQL8.0，在指定url连接时需指定对应的时区，否则默认的时区与数据库系统不匹配就会出现这种异常。

解决方法：在url中加上serverTimezone属性参数即可解决。

`jdbc:mysql://localhost:3306/mybatis?serverTimezone=GMT`

[(39条消息) 解决mysql java.sql.SQLException: The server time zone value‘XXXXXX' is unrecognized or represents..._LuoLiangDSGA的博客-CSDN博客](https://blog.csdn.net/oppo5630/article/details/52162783)

## idea安装database插件

![image-20211117144451571](C:\Users\lucheng\AppData\Roaming\Typora\typora-user-images\image-20211117144451571.png)

在插件商场搜索Database Navigator插件，安装后进行连接配置。

1. DB Navigator-->DB Browser
2. 点击new Collection，选择MySQL

![image-20211117144848062](C:\Users\lucheng\AppData\Roaming\Typora\typora-user-images\image-20211117144848062.png)

3. 点击test connection后出现错误提示框如下

![image-20211117144930833](C:\Users\lucheng\AppData\Roaming\Typora\typora-user-images\image-20211117144930833.png)

经查询，错误原因如下：由于MySQL版本的原因，MySQL驱动的默认时区是标准时区UTC，而中国是东八区，，所以失去问题导致连接失败。因此需要在Property中将severTimezone属性修改为GMT。

![image-20211117145323670](F:\Users\wwwlu\AppData\Roaming\Typora\typora-user-images\image-20211117145323670.png)

4. 设置好属性后连接成功

## mbg逆向工程中连接数据库报错：Client does not support authentication protocol requested by server; consider upgrading MySQL client

解决过程：

按照[Mysql_新建连接报错：Client does not support authentication protocol requested by server ;consider upgrading Mysql client - 翻滚的小强 - 博客园 (cnblogs.com)](https://www.cnblogs.com/rychh/p/13878094.html)该博客在cmd管理权限命令行下输入了:

```
ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY '你自己的密码'; 
FLUSH PRIVILEGES; #刷新权限
```

结果再次连接MySQL5.7时显示Access Denied for User ‘root’@’localhost。

根据报错信息，参照[How to Fix MySQL Error: Access Denied for User 'root'@'localhost' - Database Star](https://www.databasestar.com/access-denied-for-user-root-at-localhost/#:~:text= How to Fix MySQL Error%3A Access Denied,If the above solution did not... More )中的solution2解决了该问题，可以在navicat上重新连接，然后执行mybatis逆向工程时仍然是Client does not support authentication protocol requested by server问题。

最后使用了MySQL-connector-java8版本的jar包，没有使用MySQL5.7，使用了MySQL8.0。

总结原因：

##  报错：Error updating database.  Cause: java.sql.SQLException: Field 'emp_id' doesn't have a default value

在使用Spring整合mybatis框架后，测试dao层的mapper文件，向数据表tbl_emp中插入数据

```java
@Autowired
EmployeeMapper employeeMapper;
//插入员工
int i = employeeMapper.insertSelective(new Employee(null, "jerry", "M", "jerry@163.com", 1));
System.out.println(i!=0?"插入成功":"插入失败");
```

报了上述错误，原因就是new的对象的empId是null，虽然该是数据表的主键，但是没有设置自增加，所以插入时会找不到默认值。

解决方法：1.自己手动赋值  2.将表中字段加入自动增加的属性

结论：字段是主键+自增长的情况下，才能让他自己赋值；只是主键的情况下，需要手动赋值
