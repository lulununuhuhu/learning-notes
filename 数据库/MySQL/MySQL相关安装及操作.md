## MySQL服务的停止和启动

### 方法一

步骤：打开计算机管理-->服务和应用程序-->服务，右健属性中可以设置启动类型为自动、手动和禁用。

![image-20220320150850105](https://gitee.com/lulununuhuhu/img/raw/master/img/202203201508171.png)

在这里可以选择自动、手动或者禁止启动。

### 方法二

使用管理员身份打开cmd窗口，通过使用`net stop 服务名称` `net start 服务名称`

进行启动和停止。

## MySQL服务端的登录和退出

使用**管理员身份**打开cmd窗口，使用``mysql -uroot -p` 命令行输入密码。

![image-20220320151722482](https://gitee.com/lulununuhuhu/img/raw/master/img/202203201517548.png)

## MySQL常见语法

登录数据库

```sql
mysql -uroot -p(密码) -h(数据库所在主机的ip地址)
```

查看当前所有的数据库

```sql
show databases;
```
打开指定的数据库
```sql
use 库名;
```
查看当前库的所有表
```sql
show tables;
```
查看其他库的所有表
```sql
show tables from 库名;
```
创建表
```sql
create table 表名(
    列名 数据类型 [列级完整性约束定义],
    ......
    列名 数据类型 [列级完整性约束定义]
);
```
查看表结构
```sql
desc 表名;
```
查询表中的某个字段
```sql
select 字段名1,字段名2  from 表名;
```
查询表中的所有字段
```sql
select * from 表名;
```

